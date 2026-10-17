"use client";

import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type SwitchProps = Omit<ComponentPropsWithRef<"input">, "type" | "size" | "color"> & {
  /** Visible label, clickable: what the switch turns on ("Varsle meg på e-post"). */
  label: ReactNode;
  /** Smaller help text under the label. */
  description?: ReactNode;
  /** start = switch before the label, end = after it, pushed to the row's end (settings lists). Default: start. */
  position?: "start" | "end";
  /** Color family when on. Default: primary. */
  color?: ColorFamily;
};

/**
 * An on/off setting that takes effect right away (designsystemet's Switch): a native checkbox with
 * role="switch", so screen readers say "on/off" and forms submit it like a checkbox.
 */
export function Switch({ label, description, position = "start", color = "primary", id, className, onClick, onChange, ...props }: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const describedBy = [descriptionId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;
  const locked = props.disabled || props.readOnly;

  return (
    <div
      data-color={color}
      className={cx(
        "group flex gap-switch-gap text-body-md",
        position === "end" ? "flex-row-reverse justify-between" : "w-fit",
        className,
      )}
    >
      <span className="flex h-lh shrink-0 items-center">
        <input
          {...props}
          type="checkbox"
          role="switch"
          id={inputId}
          aria-describedby={describedBy}
          // Native checkboxes ignore readonly: keep the value by cancelling the click, as designsystemet does.
          onClick={(event) => {
            if (props.readOnly) event.preventDefault();
            onClick?.(event);
          }}
          onChange={(event) => {
            if (!props.readOnly) onChange?.(event);
          }}
          className="switch focus-ring"
        />
      </span>
      <div className="flex flex-col">
        <label htmlFor={inputId} className={cx("text-neutral-default", locked ? "cursor-default" : "cursor-pointer")}>
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-body-sm text-neutral-subtle">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
