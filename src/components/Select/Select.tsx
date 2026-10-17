"use client";

import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { FieldError } from "../../internal/FieldError";
import { LockIcon } from "../../internal/icons";
import { inputClasses } from "../../internal/inputClasses";
import { cx } from "../../utils/cx";
import { Label } from "../Label/Label";

export type SelectProps = Omit<ComponentPropsWithRef<"select">, "multiple" | "size"> & {
  /** Visible label. Required. */
  label: ReactNode;
  /** Help text between label and select. */
  description?: ReactNode;
  /** Error message. When set, the select is marked invalid and the message is announced. */
  error?: ReactNode;
  /** Shown and submitted, but can't be changed (a lock icon marks the label). */
  readOnly?: boolean;
  /** full = the container's width, auto = as wide as the longest option. Default: full. */
  width?: "full" | "auto";
};

/**
 * Pick one option from a native dropdown list (designsystemet's Select inside a Field, with label,
 * description and error built in like Textfield). Children: SelectOption / SelectOptgroup.
 */
export function Select({
  label,
  description,
  error,
  readOnly,
  width = "full",
  id,
  className,
  onKeyDown,
  onMouseDown,
  children,
  ...props
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [descriptionId, errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx("flex flex-col gap-textfield-gap", className)}>
      <Label htmlFor={selectId}>
        {readOnly && <LockIcon className="me-1 inline-block h-lh w-6 align-bottom" />}
        {label}
      </Label>
      {description && (
        <p id={descriptionId} className="text-body-md">
          {description}
        </p>
      )}
      <select
        {...props}
        id={selectId}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={describedBy}
        aria-readonly={readOnly || undefined}
        // A native select has no readonly: block opening and keyboard changes, keep Tab.
        onKeyDown={(event) => {
          if (readOnly && event.key !== "Tab") event.preventDefault();
          onKeyDown?.(event);
        }}
        onMouseDown={(event) => {
          if (readOnly) event.preventDefault();
          onMouseDown?.(event);
        }}
        className={cx(
          inputClasses.replace("w-full ", ""),
          "min-h-textfield-height select-chevron",
          width === "auto" ? "w-auto max-w-full self-start" : "w-full",
        )}
      >
        {children}
      </select>
      {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

/** One choice in a Select (a native <option>). */
export function SelectOption(props: ComponentPropsWithRef<"option">) {
  return <option {...props} />;
}

/** A labelled group of options in a Select (a native <optgroup>). */
export function SelectOptgroup(props: ComponentPropsWithRef<"optgroup">) {
  return <optgroup {...props} />;
}
