"use client";

import { createContext, useContext, useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { CheckIcon, XMarkIcon } from "../../internal/icons";
import { cx } from "../../utils/cx";

type GroupContext = { name?: string; color?: ColorFamily };
const ChipGroupContext = createContext<GroupContext>({});

export type ChipGroupProps = Omit<ComponentPropsWithRef<"fieldset">, "color"> & {
  /** Visible name of the group, e.g. "Målgruppe". Read out with every chip, so screen readers know what it filters. */
  legend: ReactNode;
  /** Shared `name` for the chips inside (what a form submits). Default: a generated one, so ChipRadios in a group are always one single-choice group. */
  name?: string;
  /** Color family of every chip inside (a chip's own `color` wins). Default: primary. */
  color?: ColorFamily;
};

/** Labelled group of chips: a fieldset with a visible legend, chips wrapping onto new lines. */
export function ChipGroup({ legend, name, color, className, children, ...props }: ChipGroupProps) {
  const autoName = useId();
  return (
    <ChipGroupContext.Provider value={{ name: name ?? autoName, color }}>
      <fieldset className={cx("min-w-0", className)} {...props}>
        <legend className="mb-chip-group-gap font-body font-semibold text-body-md">{legend}</legend>
        <div className="flex flex-wrap gap-chip-group-gap">{children}</div>
      </fieldset>
    </ChipGroupContext.Provider>
  );
}

// Shared by every chip, after designsystemet's .ds-chip: 32px tall, 1px border, one line of small text
// (long text is cut off with an ellipsis rather than wrapping).
const chipBase = cx(
  "relative inline-flex min-w-0 max-w-full shrink-0 cursor-pointer select-none items-center align-middle",
  "min-h-chip-height border-width-chip px-chip-padding-x font-body text-body-sm leading-short whitespace-nowrap",
  "transition-colors",
);

// Unselected look: tinted surface with a subtle border.
const chipIdle = "bg-surface-tinted border-subtle text-default";
// Selected look (checked input, or a removable chip): solid base fill, no visible border.
const chipOn = "bg-base-default border-transparent text-base-contrast-default";

function useChipColor(color?: ColorFamily) {
  const group = useContext(ChipGroupContext);
  return { group, dataColor: color ?? group.color ?? "primary" };
}

type ChipInputProps = Omit<ComponentPropsWithRef<"input">, "type" | "size" | "children" | "color"> & {
  /** Visible text of the chip. Keep it to a word or two. */
  children: ReactNode;
  /** Color family. Default: the ChipGroup's color, else primary. */
  color?: ColorFamily;
};

function ChipInput({ type, children, color, name, className, ...props }: ChipInputProps & { type: "checkbox" | "radio" }) {
  const { group, dataColor } = useChipColor(color);
  const isCheckbox = type === "checkbox";
  return (
    <label
      data-color={dataColor}
      className={cx(
        chipBase,
        chipIdle,
        // Room for the visible box/circle: same inset on its left and between it and the text.
        "gap-chip-input-inset ps-chip-input-inset focus-ring-within",
        isCheckbox ? "rounded-chip-checkbox" : "rounded-chip",
        "has-checked:border-transparent has-checked:bg-base-default has-checked:text-base-contrast-default",
        // Hover/press only while enabled; the extra :has() makes checked states outrank unchecked ones.
        "has-enabled:hover:bg-surface-hover has-enabled:active:bg-surface-active",
        "has-enabled:has-checked:hover:bg-base-hover has-enabled:has-checked:active:bg-base-active",
        "has-disabled:cursor-not-allowed has-disabled:opacity-disabled",
        className,
      )}
    >
      <span className="relative flex shrink-0">
        {/* Visible native input, like designsystemet: outlined when off, a light box/circle with a mark in the chip's color when on. */}
        <input
          {...props}
          type={type}
          name={name ?? group.name}
          className={cx(
            "peer m-0 size-chip-input-size shrink-0 cursor-pointer appearance-none outline-none",
            "border-width-chip-input border-current bg-transparent text-subtle",
            "checked:bg-current checked:text-base-contrast-default disabled:cursor-not-allowed",
            isCheckbox ? "rounded-chip-input" : "rounded-full",
          )}
        />
        {isCheckbox ? (
          <CheckIcon className="pointer-events-none absolute inset-0 m-auto hidden size-chip-input-size text-base-default peer-checked:block" />
        ) : (
          <span className="pointer-events-none absolute inset-0 m-auto hidden size-chip-radio-dot-size rounded-full bg-base-default peer-checked:block" />
        )}
      </span>
      <span className="min-w-0 truncate">{children}</span>
    </label>
  );
}

export type ChipCheckboxProps = ChipInputProps;

/** Toggle chip: any number of chips in a group can be on. For multi-choice filters. */
export function ChipCheckbox(props: ChipCheckboxProps) {
  return <ChipInput {...props} type="checkbox" />;
}

export type ChipRadioProps = ChipInputProps;

/** Single-choice chip: exactly one chip with the same `name` is on. For "pick one" filters. */
export function ChipRadio(props: ChipRadioProps) {
  return <ChipInput {...props} type="radio" />;
}

export type ChipButtonProps = Omit<ComponentPropsWithRef<"button">, "color"> & {
  /** Visible text of the chip. */
  children: ReactNode;
  /** Color family. Default: the ChipGroup's color, else primary. */
  color?: ColorFamily;
};

/** Chip-styled button for a small action that doesn't toggle, e.g. a suggested search. */
export function ChipButton({ children, color, type = "button", className, ...props }: ChipButtonProps) {
  const { dataColor } = useChipColor(color);
  return (
    <button
      {...props}
      type={type}
      data-color={dataColor}
      className={cx(
        chipBase,
        chipIdle,
        "rounded-chip focus-ring",
        "enabled:hover:bg-surface-hover enabled:active:bg-surface-active",
        "disabled:cursor-not-allowed disabled:opacity-disabled",
        className,
      )}
    >
      <span className="min-w-0 truncate">{children}</span>
    </button>
  );
}

export type ChipRemovableProps = ChipButtonProps & {
  /** Added to the accessible name after the text, so screen readers know pressing removes it. Default: "Trykk for å fjerne". */
  removeLabel?: string;
};

/** Selected-looking chip with a ×: pressing it removes that value, e.g. an active filter. Handle it in `onClick`. */
export function ChipRemovable({ children, color, removeLabel = "Trykk for å fjerne", type = "button", className, ...props }: ChipRemovableProps) {
  const { dataColor } = useChipColor(color);
  return (
    <button
      {...props}
      type={type}
      data-color={dataColor}
      className={cx(
        chipBase,
        chipOn,
        // Room for the ×: same inset on its right and between the text and it.
        "gap-chip-input-inset pe-chip-input-inset rounded-chip focus-ring",
        "enabled:hover:bg-base-hover enabled:active:bg-base-active",
        "disabled:cursor-not-allowed disabled:opacity-disabled",
        className,
      )}
    >
      <span className="min-w-0 truncate">{children}</span>
      <span className="sr-only">, {removeLabel}</span>
      <XMarkIcon className="size-chip-input-size shrink-0" />
    </button>
  );
}
