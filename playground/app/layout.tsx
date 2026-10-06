import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata = { title: "Designsystem playground" };

const pages = ["button", "heading", "paragraph", "label"];

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
          <Link href="/" className="font-semibold">
            Playground
          </Link>
          {pages.map((p) => (
            <Link key={p} href={`/${p}`} className="text-primary-default underline">
              {p}
            </Link>
          ))}
        </nav>
        <main className="flex flex-col gap-12 px-8 py-10">{children}</main>
      </body>
    </html>
  );
}
