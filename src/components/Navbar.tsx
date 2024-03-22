import React from "react";

export const Navbar = () => {
  return (
    <nav
      id="nav-bar"
      className="w-full flex items-center h-3vw justify-between p-4 bg-purple-800 text-white"
    >
      <a hx-boost="true" className="font-bold text-lg" href="/app">
        Convozi
      </a>
      <div className="gap-4 flex" hx-boost="true">
        <a href="/">About</a>

        <div
          hx-boost="true"
          hx-get="/api/me"
          hx-trigger="load every 2s"
          hx-preserve="true"
          id="nav-button-wrapper"
        >
          <a id="login-nav-button" href="/login">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};
