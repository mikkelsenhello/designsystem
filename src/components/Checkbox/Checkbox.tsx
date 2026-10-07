"use client";

import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { FieldError } from "../../internal/FieldError";
import { CheckIcon } from "../../internal/icons";
import { cx } from "../../utils/cx";

export type CheckboxProps = Omit<ComponentPropsWithRef<"input">, "type" | "size"> & {
  /** Visible label, clickable. */
  label: ReactNode;
  /** Smaller help text under the label. */
  description?: ReactNode;
  /** Error message. When set, the checkbox is marked invalid and turns danger-colored. */
  error?: ReactNode;
  /** Color family of the checked box. Default: primary. */
  color?: ColorFamily;
};

export function Checkbox({ label, description, error, color = "primary", id, className, ...props }: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  return (
    <div data-color={error ? "danger" : color} className={cx("flex flex-col gap-2 text-body-md", className)}>
      <div className="flex gap-checkbox-gap">
        <span className="relative flex h-lh shrink-0 items-center">
          <input
            {...props}
            type="checkbox"
            id={inputId}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={describedBy}
            className={cx(
              "peer size-checkbox-size cursor-pointer appearance-none rounded-checkbox",
              "border-width-checkbox border-neutral-default bg-neutral-surface-default",
              "checked:border-base-default checked:bg-base-default",
              "focus-ring enabled:not-checked:not-aria-invalid:hover:border-neutral-strong aria-invalid:border-danger-strong",
              "disabled:cursor-not-allowed disabled:opacity-disabled",
            )}
          />
          <CheckIcon className="pointer-events-none absolute inset-0 m-auto hidden size-checkbox-size text-base-contrast-default peer-checked:block" />
        </span>
        <div className="flex flex-col">
          <label htmlFor={inputId} className={cx("text-neutral-default", props.disabled ? "cursor-not-allowed" : "cursor-pointer")}>
            {label}
          </label>
          {description && (
            <p id={descriptionId} className="text-body-sm text-neutral-subtle">
              {description}
            </p>
          )}
        </div>
      </div>
      {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}
