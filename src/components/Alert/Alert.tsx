import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type AlertProps = Omit<ComponentPropsWithRef<"div">, "color"> & {
  /** info (default), success, warning, danger. Each has its own icon; other families use the info icon. */
  color?: ColorFamily;
};

/**
 * A message box drawing attention to important information (designsystemet's Alert). Start it with a
 * Heading to align the icon to the heading. No live region by default: add role="alert" only when it
 * appears without a page load and must interrupt (an error after submitting).
 */
export function Alert({ color = "info", className, ...props }: AlertProps) {
  return <div data-color={color} className={cx("alert", className)} {...props} />;
}
