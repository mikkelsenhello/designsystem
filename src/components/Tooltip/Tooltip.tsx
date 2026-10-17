"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";
import { splitPlacement } from "../../internal/placement";
import type { Placement } from "../../internal/placement";

export type TooltipProps = {
  /** The element it explains (a Button, an Avatar, an icon button), or plain text (made focusable). */
  children: ReactElement | string;
  /** The tooltip text. Short, plain text. */
  content: string;
  /** Where it shows, relative to the element. Default: top. */
  placement?: Placement;
  /** Flip/shift to stay on screen. Default: true. */
  autoPlacement?: boolean;
  /** Controlled: force it open or closed. */
  open?: boolean;
  /**
   * describedby (default): extra info, read after the element's own name. labelledby: the tooltip IS the
   * name, for icon-only buttons (sets aria-label to `content`).
   */
  type?: "describedby" | "labelledby";
};

/**
 * Short text shown on hover and keyboard focus (designsystemet's Tooltip), after 150ms. Never put
 * anything people must read or click in it: it can't be reached on touch screens.
 */
export function Tooltip({ children, content, placement = "top", autoPlacement = true, open, type = "describedby" }: TooltipProps) {
  const { side, align } = splitPlacement(placement);
  let trigger = typeof children === "string" ? <span tabIndex={0}>{children}</span> : children;
  if (type === "labelledby" && isValidElement<{ "aria-label"?: string }>(trigger)) {
    trigger = cloneElement(trigger, { "aria-label": content });
  }
  return (
    <RadixTooltip.Provider delayDuration={150}>
      <RadixTooltip.Root open={open}>
        <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={side}
          align={align}
          avoidCollisions={autoPlacement}
          collisionPadding={8}
          className="tooltip"
        >
          {content}
          {/* Size matches --ds-tooltip-arrow-size (8px square: 11px wide, 5.7px tall). */}
          <RadixTooltip.Arrow asChild width={11} height={6}>
            <span className="floating-arrow" />
          </RadixTooltip.Arrow>
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
