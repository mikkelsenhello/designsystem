import type { ReactNode } from "react";
import { Heading } from "../../src";

/** Renders the same content in a light and a dark panel, side by side. */
export function Preview({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <Heading level={2} size="2xs" className="text-subtle">
        {title}
      </Heading>
      <div className="grid gap-4 lg:grid-cols-2">
        {(["light", "dark"] as const).map((scheme) => (
          <div
            key={scheme}
            data-color-scheme={scheme}
            className="flex flex-wrap items-center gap-4 rounded-lg border-width-default border-subtle bg-background-default p-6 text-default"
          >
            {children}
          </div>
        ))}
      </div>
    </section>
  );
}
