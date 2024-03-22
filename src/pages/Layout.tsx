import { ReactNode } from "react";
import { Navbar } from "../components/Navbar";

export function Layout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <html className="h-full bg-slate-800 text-white">
      <head>
        <title>{title}</title>
        <meta
          name="description"
          content="A demo app using Bun + HTMX + TailwindCSS + DaisyUI, deployed on Fly.io"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <script src="https://cdn.tailwindcss.com"></script>
        <script
          src="https://unpkg.com/htmx.org@1.9.11"
          integrity="sha384-0gxUXCCR8yv9FM2b+U3FDbsKthCI66oH5IA9fHppQq9DDMHuMauqq1ZHBpJxQ0J0"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="h-screen max-h-screen overflow-y-hidden">
        <Navbar />
        <main className="max-w-screen-md h-full mx-auto flex flex-col gap-8">
          {children}
        </main>
      </body>
    </html>
  );
}
