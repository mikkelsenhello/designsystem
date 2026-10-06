import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";

export type HeadingSize = "2xl" | "xl" | "lg" | "md" | "sm" | "xs" | "2xs";

export type HeadingProps = ComponentPropsWithRef<"h2"> & {
  /** HTML heading level (h1–h6), for document structure. Default: 2. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Visual size, independent of level. Default: md. */
  size?: HeadingSize;
};

const sizeClasses: Record<HeadingSize, string> = {
  "2xl": "text-heading-2xl",
  xl: "text-heading-xl",
  lg: "text-heading-lg",
  md: "text-heading-md",
  sm: "text-heading-sm",
  xs: "text-heading-xs",
  "2xs": "text-heading-2xs",
};

export function Heading({ level = 2, size = "md", className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cx("font-heading", sizeClasses[size], className)} {...props} />;
}
