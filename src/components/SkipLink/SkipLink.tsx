import type { ComponentPropsWithRef, ReactNode } from "react";
import { cx } from "../../utils/cx";

export type SkipLinkProps = ComponentPropsWithRef<"a"> & {
  /** Id of the main content, with #: "#main". The target should be focusable (<main id="main" tabIndex={-1}>). */
  href: string;
  /** "Hopp til hovedinnhold". */
  children: ReactNode;
};

/**
 * First thing in <body>: hidden until a keyboard user tabs to it, then a full-width bar that jumps past the
 * navigation to the main content (designsystemet's SkipLink).
 */
export function SkipLink({ className, ...props }: SkipLinkProps) {
  return (
    <a
      className={cx(
        "sr-only focus:not-sr-only focus:grid focus:place-items-center focus:px-4 focus:pt-4 focus:pb-5",
        "bg-surface-hover text-default link-underline focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
