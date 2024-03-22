import React from "react";
import { Input } from "../components/Input";
import { Layout } from "./Layout";

export const Login = () => {
  return (
    <Layout title="Login">
      <div className="flex w-full h-full items-center content-center justify-center">
        <div className="w-96  bg-slate-900 p-8 rounded-lg flex flex-col gap-12">
          <div className="">
            <h2>Login to use Convozi</h2>
          </div>
          <div className="w-full">
            <form hx-post="/api/auth/login" className="flex flex-col gap-6">
              <Input type="email" name="email" placeholder="email" />
              <Input type="password" name="password" placeholder="password" />
              <input type="submit" value={"Submit"}>
                Login
              </input>
            </form>
          </div>
          <div>
            <a href="/register">Register instead</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
