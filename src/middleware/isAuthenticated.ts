import { Elysia } from "elysia";
import { db } from "../db/db";
import { MergedSchema } from "../db/mergedSchema";
import { eq } from "drizzle-orm";

export const isAuthenticated = (app: Elysia) =>
  app.derive(async ({ cookie, jwt, set }) => {
    if (!cookie!.access_token.value) {
      console.log("no token");
      return {};
    }

    const { userId } = await jwt.verify(cookie!.access_token.value);
    if (!userId) {
      console.log("no userId");
      //   set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    // todo parse schema id?
    const users = await db
      .select()
      .from(MergedSchema.users)
      .where(eq(MergedSchema.users.id, userId));

    const user = users[0];

    if (!user) {
      console.log("no user");

      //   set.status = 401;
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    console.log("user", user);

    console.log("authenticated");
    return {
      user,
    };
  });
