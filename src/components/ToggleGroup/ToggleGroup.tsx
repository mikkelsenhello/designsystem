"use client";

import { createContext, useContext, useId, useState } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type ToggleGroupSize = "sm" | "md";
export type ToggleGroupVariant = "primary" | "secondary";

type GroupContext = {
  name: string;
  value?: string;
  select: (value: string) => void;
  size: ToggleGroupSize;
  variant: ToggleGroupVariant;
};
const ToggleGroupContext = createContext<GroupContext | null>(null);

type Labelled = { "aria-label": string; "aria-labelledby"?: never } | { "aria-labelledby": string; "aria-label"?: never };

export type ToggleGroupProps = Omit<ComponentPropsWithRef<"fieldset">, "onChange" | "defaultValue" | "color" | "aria-label" | "aria-labelledby"> &
  Labelled & {
    /** Selected item's value (controlled). Use with onChange. */
    value?: string;
    /** Initially selected item (uncontrolled). */
    defaultValue?: string;
    /** Called with the newly selected item's value. */
    onChange?: (value: string) => void;
    /** Name of the radio inputs underneath. Default: generated. Note: inside a <form> the selection is submitted under it. */
    name?: string;
    /** sm = 40px, md = 48px (Button sizes). Default: md. */
    size?: ToggleGroupSize;
    /** primary = selected item filled; secondary = tinted bar, selected item raised white. Default: primary. */
    variant?: ToggleGroupVariant;
    /** Color family. Default: primary. */
    color?: ColorFamily;
  };

/**
 * A few mutually exclusive buttons in one bar that switch a view or mode (designsystemet's ToggleGroup).
 * Built on radio inputs, so arrow keys move between items and screen readers hear "1 of 2".
 */
export function ToggleGroup({
  value,
  defaultValue,
  onChange,
  name,
  size = "md",
  variant = "primary",
  color = "primary",
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const autoName = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = value !== undefined ? value : uncontrolled;
  const select = (next: string) => {
    if (value === undefined) setUncontrolled(next);
    onChange?.(next);
  };

  return (
    <ToggleGroupContext.Provider value={{ name: name ?? autoName, value: current, select, size, variant }}>
      <fieldset
        {...props}
        data-color={color}
        className={cx(
          "m-0 flex w-fit max-w-full min-w-0 overflow-x-auto border-none p-0 rounded-toggle-group",
          size === "sm" ? "h-toggle-group-height-sm" : "h-toggle-group-height-md",
          variant === "primary" ? "bg-surface-default toggle-group-outline" : "bg-surface-tinted toggle-group-outline-subtle",
          className,
        )}
      >
        {children}
      </fieldset>
    </ToggleGroupContext.Provider>
  );
}

export type ToggleGroupItemProps = Omit<ComponentPropsWithRef<"label">, "children"> & {
  /** Value reported to onChange when this item is selected. */
  value: string;
  /** Visible text (or an icon with an aria-label on it). */
  children: ReactNode;
  disabled?: boolean;
};

export function ToggleGroupItem({ value, children, disabled, className, ...props }: ToggleGroupItemProps) {
  const group = useContext(ToggleGroupContext);
  if (!group) throw new Error("ToggleGroupItem must be inside a ToggleGroup");
  const selected = group.value === value;
  const primary = group.variant === "primary";

  return (
    <label
      {...props}
      className={cx(
        "relative inline-flex h-full min-w-fit shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap",
        "rounded-toggle-group border-width-default font-button leading-short transition-colors focus-ring-within-inset",
        group.size === "sm" ? "px-toggle-group-padding-x-sm text-body-sm" : "px-toggle-group-padding-x-md text-body-md",
        selected
          ? primary
            ? "isolate border-transparent bg-base-default text-base-contrast-default hover:bg-base-hover active:bg-base-active"
            : "isolate border-default bg-surface-default text-default"
          : "border-transparent bg-transparent text-default hover:bg-surface-hover active:bg-surface-active",
        disabled && "pointer-events-none cursor-not-allowed opacity-disabled",
        className,
      )}
    >
      <input
        type="radio"
        name={group.name}
        value={value}
        checked={selected}
        disabled={disabled}
        onChange={() => group.select(value)}
        className="sr-only"
      />
      {children}
    </label>
  );
}
