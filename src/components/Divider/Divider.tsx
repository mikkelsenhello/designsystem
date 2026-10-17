import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";

export type DividerProps = ComponentPropsWithRef<"hr">;

/** Horizontal line between blocks of content (designsystemet's Divider). Hidden from screen readers: purely visual. */
export function Divider({ className, ...props }: DividerProps) {
  return <hr aria-hidden="true" className={cx("divider", className)} {...props} />;
}
