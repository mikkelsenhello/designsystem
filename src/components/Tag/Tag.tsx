import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type TagVariant = "default" | "outline";

export type TagProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  /** default = tinted fill, outline = tinted fill with a subtle border. Default: default. */
  variant?: TagVariant;
  /** Color family. Default: primary. */
  color?: ColorFamily;
  /** Render the single child (a Link, a router link, a button) with the tag look; it gets hover and focus styles. */
  asChild?: boolean;
};

/** A label that categorizes something: a category, a type, a status in words (designsystemet's Tag). */
export function Tag({ variant = "default", color = "primary", asChild = false, className, ...props }: TagProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-color={color}
      className={cx(
        "inline-flex h-fit min-h-tag-height w-max shrink-0 items-center px-tag-padding-x align-middle",
        "rounded-tag border-width-tag bg-surface-tinted text-default text-body-sm font-regular leading-short no-underline",
        variant === "outline" ? "border-subtle" : "border-transparent",
        "focus-ring [&_svg]:size-6 [&_svg]:shrink-0",
        "[&:is(a,button,[role=button])]:cursor-pointer [&:is(a,button,[role=button])]:transition-colors [&:is(a,button,[role=button])]:hover:bg-surface-hover",
        className,
      )}
      {...props}
    />
  );
}
