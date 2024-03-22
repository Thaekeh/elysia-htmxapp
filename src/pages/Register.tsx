import React from "react";
import { Input } from "../components/Input";
import { Layout } from "./Layout";

export const Register = () => {
  return (
    <Layout title="Login">
      <div className="flex w-full h-full items-center content-center justify-center">
        <div className="w-96  bg-slate-900 p-8 rounded-lg flex flex-col gap-12">
          <div className="">
            <h2>Register</h2>
          </div>
          <div className="w-full">
            <form hx-post="/api/auth/signup" className="flex flex-col gap-6">
              <Input type="email" name="email" placeholder="email" />
              <Input type="password" name="password" placeholder="password" />
              <input type="submit" value={"Submit"}>
                Register
              </input>
            </form>
          </div>

          <a href="/login">Login instead</a>

          <button hx-post="/users/delete">Delete all</button>
        </div>
      </div>
    </Layout>
  );
};
