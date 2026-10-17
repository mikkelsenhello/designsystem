"use client";

import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import { splitPlacement } from "../../internal/placement";
import type { Placement } from "../../internal/placement";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

export type DropdownTriggerContextProps = {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** Ties a DropdownTrigger to its Dropdown and holds the open state. */
export function DropdownTriggerContext({ children, ...props }: DropdownTriggerContextProps) {
  return (
    <RadixMenu.Root modal={false} {...props}>
      {children}
    </RadixMenu.Root>
  );
}

/** The Button that opens the menu. Enter, Space and Arrow Down open it with the first item focused. */
export function DropdownTrigger(props: ButtonProps) {
  return (
    <RadixMenu.Trigger asChild>
      <Button {...props} />
    </RadixMenu.Trigger>
  );
}

export type DropdownProps = ComponentPropsWithRef<"div"> & {
  /** Where it opens, relative to the trigger. Default: bottom-end. */
  placement?: Placement;
  /** Flip/shift to stay on screen. Default: true. */
  autoPlacement?: boolean;
};

/**
 * A menu of actions or links opened from a button (designsystemet's Dropdown, with Radix's menu keyboard
 * behavior: arrow keys move, Enter picks, Escape closes and returns focus, typing a letter jumps).
 * Children: DropdownHeading, DropdownList > DropdownItem > DropdownButton.
 */
export function Dropdown({ placement = "bottom-end", autoPlacement = true, className, ...props }: DropdownProps) {
  const { side, align } = splitPlacement(placement);
  return (
    <RadixMenu.Content
      side={side}
      align={align}
      sideOffset={8}
      avoidCollisions={autoPlacement}
      collisionPadding={8}
      className={cx("dropdown", className)}
      {...props}
    />
  );
}

/** A title over a group of items ("Del arrangementet"). Not focusable. */
export function DropdownHeading({ className, ...props }: ComponentPropsWithRef<"div">) {
  return <RadixMenu.Label data-dropdown-heading="" className={cx("font-semibold", className)} {...props} />;
}

/** A group of items. */
export function DropdownList(props: ComponentPropsWithRef<"div">) {
  return <RadixMenu.Group {...props} />;
}

export type DropdownItemProps = {
  /** One DropdownButton (or a Link / router link) that does the action. */
  children: ReactElement;
  /** Called when picked (click or Enter); the menu then closes. Prevent the event to keep it open. */
  onSelect?: (event: Event) => void;
  disabled?: boolean;
};

/** One entry of the menu: makes its child a menu item (focusable with the arrow keys). */
export function DropdownItem({ children, onSelect, disabled }: DropdownItemProps) {
  return (
    <RadixMenu.Item asChild onSelect={onSelect} disabled={disabled}>
      {children}
    </RadixMenu.Item>
  );
}

/** The look of a menu item: a full-width tertiary Button. Use `asChild` to wrap a link. */
export function DropdownButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="tertiary" static fullWidth {...props} />;
}
