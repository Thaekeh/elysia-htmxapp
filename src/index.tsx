import { Elysia } from "elysia";
import { html } from "./response";
import { Root } from "./pages/Root";
import jwt from "@elysiajs/jwt";
import { Login } from "./pages/Login";
import { db } from "./db/db";
import { eq, sql } from "drizzle-orm";
import cookie from "@elysiajs/cookie";
import { MergedSchema } from "./db/mergedSchema";
import { DbUser } from "./db/UserSchema";
import { Register } from "./pages/Register";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { Dashboard } from "./pages/Dashboard";

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .use(cookie())
  .use(isAuthenticated)
  .get("/", () => {
    const query = sql`select "hello world" as text`;
    const result = db.get<{ text: string }>(query);
    console.log(result);

    return html(<Root />);
  })
  .get("/about", () => html(<div>about</div>))
  .get("/login", ({}) => {
    return html(<Login />);
  })
  .get("/register", () => html(<Register />))
  .post("/api/auth/login", async ({ body, set, jwt, cookie, headers }) => {
    const { email, password } = body;

    if (!email || !password) {
      set.status = 400;
      return html(<p>Couldn't login</p>);
    }

    const users = await db
      .select()
      .from(MergedSchema.users)
      .where(eq(MergedSchema.users.email, email));
    const user = users[0];

    const passwordMatches = await Bun.password.verify(password, user.password);

    if (!user || !passwordMatches) {
      set.status = 500;
      return html(<p>Couldn't login</p>);
    }

    const accessToken = await jwt.sign({
      userId: user.id,
    });

    cookie["access_token"].set({
      maxAge: 60 * 60, // 60 minutes
      value: accessToken,
      path: "/",
    });

    return html(<div>Cool</div>, 200, {
      "HX-Location": "/app",
    });

    return;
  })
  .post("/api/auth/signup", async ({ body, set }) => {
    try {
      const { email, password } = body;

      if (!email || !password) {
        set.status = 400;
        return html(<p>Couldn't register</p>);
      }

      const emailExists = await db
        .select()
        .from(MergedSchema.users)
        .where(eq(MergedSchema.users.email, email));

      console.log(emailExists);

      if (emailExists.length) {
        set.status = 403;
        return html(<p>A user with this email already exists</p>);
      } else {
        console.log("user doesn't exist yet");
      }

      const hashedPassword = await Bun.password.hash(password);

      const user: Omit<DbUser, "id"> = {
        email: email,
        password: hashedPassword,
      };

      const newUser = await db.insert(MergedSchema.users).values([user]);

      return html(<div>Signed up</div>);
    } catch (error) {
      console.log(error);
    }
  })
  .get("/api/me", ({ user }) => {
    // console.log("user", user);
    if (user) {
      return html(<a href="/app">Dashboard</a>, 200);
    }

    return html(<a href="/login">Login</a>, 200);
  })
  .post("/users/delete", async () => {
    await db.delete(MergedSchema.users);

    return html(<div>Deleted all</div>);
  })
  .get("/app", ({ user, set }) => {
    if (!user) {
      console.log("attempting redirect");
      return html(<Login />, 403, {
        "HX-Location": "/login",
      });
    }

    return html(<Dashboard />);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
