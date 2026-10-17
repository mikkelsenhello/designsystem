import { Children } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { AvatarSize } from "./Avatar";

export type AvatarStackProps = ComponentPropsWithRef<"ul"> & {
  /** Size of every avatar in the stack. Default: md. */
  size?: AvatarSize;
  /** Spread the avatars out on hover and keyboard focus. "fixed": without changing the stack's width. */
  expandable?: boolean | "fixed";
  /** Text after the avatars, e.g. "+5" for people not shown. */
  suffix?: ReactNode;
};

/**
 * Overlapping Avatars (designsystemet's AvatarStack): a list, each avatar cut out behind the next.
 * Children: Avatar elements; each is wrapped in an <li>. Give the list an aria-label ("Deltakere").
 */
export function AvatarStack({ size = "md", expandable, suffix, className, children, tabIndex, ...props }: AvatarStackProps) {
  return (
    <ul
      data-size={size === "md" ? undefined : size}
      data-expandable={expandable === true ? "" : expandable || undefined}
      tabIndex={tabIndex ?? (expandable ? 0 : undefined)}
      className={cx("avatar-stack focus-ring", className)}
      {...props}
    >
      {Children.map(children, (child) => (child == null || child === false ? null : <li>{child}</li>))}
      {suffix != null && <li>{suffix}</li>}
    </ul>
  );
}
