"use client";

import { createContext, useContext, useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { CheckIcon } from "../../internal/icons";
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

type ChipInputProps = Omit<ComponentPropsWithRef<"input">, "type" | "size" | "children" | "color"> & {
  /** Visible text of the chip. Keep it to a word or two. */
  children: ReactNode;
  /** Color family. Default: the ChipGroup's color, else primary. */
  color?: ColorFamily;
};

function ChipInput({ type, children, color, name, className, ...props }: ChipInputProps & { type: "checkbox" | "radio" }) {
  const group = useContext(ChipGroupContext);
  return (
    <label
      data-color={color ?? group.color ?? "primary"}
      className={cx(
        "inline-flex w-fit shrink-0 cursor-pointer select-none items-center justify-center gap-chip-gap whitespace-nowrap",
        "min-h-chip-height rounded-chip px-chip-padding-x font-body text-body-sm leading-short",
        "bg-surface-tinted text-default transition-colors focus-ring-within",
        "has-checked:bg-base-default has-checked:text-base-contrast-default",
        // Hover/press only while enabled; the extra :has() makes checked states outrank unchecked ones.
        "has-enabled:hover:bg-surface-hover has-enabled:active:bg-surface-active",
        "has-enabled:has-checked:hover:bg-base-hover has-enabled:has-checked:active:bg-base-active",
        "has-disabled:cursor-not-allowed has-disabled:opacity-disabled",
        className,
      )}
    >
      <input {...props} type={type} name={name ?? group.name} className="peer sr-only" />
      <CheckIcon className="hidden size-chip-icon-size shrink-0 peer-checked:block" />
      <span>{children}</span>
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
