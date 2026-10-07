import type { ReactNode } from "react";
import NextLink from "next/link";
import { Link } from "../../src";
import "./globals.css";

export const metadata = { title: "Designsystem playground" };

const pages = ["button", "heading", "paragraph", "label", "link", "textfield", "checkbox", "card", "badge", "accordion"];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-body">
        <nav className="flex flex-wrap gap-4 border-b border-subtle px-8 py-4 text-body-sm">
          <Link asChild color="neutral" className="font-semibold">
            <NextLink href="/">Playground</NextLink>
          </Link>
          {pages.map((p) => (
            <Link key={p} asChild>
              <NextLink href={`/${p}`}>{p}</NextLink>
            </Link>
          ))}
        </nav>
        <main className="flex flex-col gap-12 px-8 py-10">{children}</main>
      </body>
    </html>
  );
}
