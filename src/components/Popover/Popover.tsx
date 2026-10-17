"use client";

import * as RadixPopover from "@radix-ui/react-popover";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { splitPlacement } from "../../internal/placement";
import type { Placement } from "../../internal/placement";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

export type PopoverTriggerContextProps = {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Called with the new state when it opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Open on first render (uncontrolled). */
  defaultOpen?: boolean;
};

/** Ties a PopoverTrigger to its Popover. Holds the open state (controlled with open / onOpenChange). */
export function PopoverTriggerContext({ children, ...props }: PopoverTriggerContextProps) {
  return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
}

export type PopoverTriggerProps = ButtonProps & {
  /** A word in running text with a dotted underline instead of a Button (for a definition or explanation). */
  inline?: boolean;
};

/** The Button that opens and closes the Popover. aria-expanded and aria-controls are set for you. */
export function PopoverTrigger({ inline = false, className, ...props }: PopoverTriggerProps) {
  if (inline) {
    const { children, type = "button", onClick, disabled, id, "aria-label": ariaLabel } = props;
    return (
      <RadixPopover.Trigger
        type={type}
        onClick={onClick}
        disabled={disabled}
        id={id}
        aria-label={ariaLabel}
        className={cx("popover-inline-trigger focus-ring", className)}
      >
        {children}
      </RadixPopover.Trigger>
    );
  }
  return (
    <RadixPopover.Trigger asChild>
      <Button className={className} {...props} />
    </RadixPopover.Trigger>
  );
}

export type PopoverProps = Omit<ComponentPropsWithRef<"div">, "color"> & {
  /** Where it opens, relative to the trigger. Default: top. */
  placement?: Placement;
  /** Flip/shift to stay on screen. Default: true. */
  autoPlacement?: boolean;
  /** default = surface, tinted = tinted surface. Default: default. */
  variant?: "default" | "tinted";
  /** Color family. Default: the surrounding data-color context. */
  color?: ColorFamily;
};

/**
 * A small non-modal panel next to its trigger (designsystemet's Popover): a few settings, a short
 * explanation. Opening moves focus into it; Escape, a click outside or the trigger closes it and focus goes
 * back to the trigger. Rendered in place (not in a portal), so it keeps the page's color scheme and context.
 */
export function Popover({ placement = "top", autoPlacement = true, variant = "default", color, className, children, ...props }: PopoverProps) {
  const { side, align } = splitPlacement(placement);
  return (
    <RadixPopover.Content
      side={side}
      align={align}
      avoidCollisions={autoPlacement}
      collisionPadding={8}
      data-variant={variant}
      data-color={color}
      className={cx("popover", className)}
      {...props}
    >
      {children}
      {/* Size matches --ds-popover-arrow-size (12px square: 17px wide, 8.5px tall); Radix needs numbers to position it. */}
      <RadixPopover.Arrow asChild width={17} height={8}>
        <span className="floating-arrow" />
      </RadixPopover.Arrow>
    </RadixPopover.Content>
  );
}
