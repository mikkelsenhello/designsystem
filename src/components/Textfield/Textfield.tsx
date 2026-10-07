"use client";

import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { FieldError } from "../../internal/FieldError";
import { cx } from "../../utils/cx";
import { Label } from "../Label/Label";

export type TextfieldProps = Omit<ComponentPropsWithRef<"input">, "size"> & {
  /** Visible label. Required: placeholder text is not a label. */
  label: ReactNode;
  /** Help text between label and input. */
  description?: ReactNode;
  /** Error message. When set, the field is marked invalid and the message is announced. */
  error?: ReactNode;
};

export function Textfield({ label, description, error, id, className, ...props }: TextfieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx("flex flex-col gap-textfield-gap", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      {description && (
        <p id={descriptionId} className="text-body-md">
          {description}
        </p>
      )}
      <input
        type="text"
        {...props}
        id={inputId}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={describedBy}
        className={cx(
          "w-full min-h-textfield-height px-textfield-padding-x py-textfield-padding-y",
          "rounded-textfield border-width-textfield border-neutral-default",
          "bg-neutral-surface-default text-neutral-default text-body-md placeholder:text-neutral-subtle",
          "focus-ring textfield-hover aria-invalid:border-danger-strong",
          "disabled:cursor-not-allowed disabled:opacity-disabled",
        )}
      />
      {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}
