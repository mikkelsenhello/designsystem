import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type LinkProps = ComponentPropsWithRef<"a"> & {
  /** Color family. Default: primary. Use neutral for footers and low-emphasis links. */
  color?: ColorFamily;
  /** Render the single child element (e.g. Next.js `<Link>`) with Link's styling instead of an `<a>`. */
  asChild?: boolean;
};

export function Link({ color = "primary", asChild = false, className, ...props }: LinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-color={color}
      className={cx("link-underline text-subtle hover:text-default active:text-default focus-ring", className)}
      {...props}
    />
  );
}
