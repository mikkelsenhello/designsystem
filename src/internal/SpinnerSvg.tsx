import type { ComponentPropsWithRef } from "react";
import { cx } from "../utils/cx";

/** designsystemet's spinner drawing: a ring and a turning arc (tokens/utilities/spinner.css). Sized by the caller. */
export function SpinnerSvg({ className, ...props }: ComponentPropsWithRef<"svg">) {
  return (
    <svg viewBox="0 0 50 50" className={cx("spinner", className)} {...props}>
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </svg>
  );
}
