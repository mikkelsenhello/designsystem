import { Slot, Slottable } from "@radix-ui/react-slot";
import { Children, isValidElement } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export type AvatarProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  /** 36 / 42 / 48 / 56px. Default: md. Inside an AvatarStack, the stack's size wins. */
  size?: AvatarSize;
  /** circle (people) or square (organisations). Default: circle. */
  variant?: "circle" | "square";
  /** Letters shown when there is no image or icon, e.g. "OM". */
  initials?: string;
  /** Color family of the fill. Default: primary. */
  color?: ColorFamily;
  /** Render the single child (a Link, a button) as the avatar, e.g. a link to a profile. */
  asChild?: boolean;
  children?: ReactNode;
} & (
    | {
        /** Who it is ("Ola Nordmann"). */
        "aria-label": string;
      }
    | {
        /** Decorative: the name is written next to it. */
        "aria-hidden": true | "true";
        "aria-label"?: string;
      }
  );

/**
 * A person's or organisation's picture, initials or a person icon (designsystemet's Avatar). Children: an
 * <img alt=""> or an icon; nothing for the person icon. role="img", named by aria-label.
 */
export function Avatar({
  size = "md",
  variant,
  initials,
  color = "primary",
  asChild = false,
  className,
  children,
  ...props
}: AvatarProps) {
  const shared = {
    "data-avatar": "",
    "data-size": size === "md" ? undefined : size,
    "data-variant": variant,
    "data-color": color,
    className: cx("avatar focus-ring", className),
    ...props,
  };
  if (asChild) {
    const child = Children.only(children);
    const childHasContent = isValidElement<{ children?: ReactNode }>(child) && child.props.children != null;
    return (
      <Slot {...shared}>
        <Slottable>{children}</Slottable>
        {childHasContent ? null : initials}
      </Slot>
    );
  }
  return (
    <span role="img" {...shared}>
      {children ?? initials}
    </span>
  );
}
