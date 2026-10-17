"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, ComponentPropsWithRef, ReactNode } from "react";
import { FieldError } from "../../internal/FieldError";
import { cx } from "../../utils/cx";
import { Label } from "../Label/Label";

export type TextfieldCounter = {
  /** Characters allowed. Going over is possible but marks the field invalid (a soft limit, like designsystemet). */
  limit: number;
  /** Text while under the limit; %d = characters left. Default: "%d tegn igjen". */
  under?: string;
  /** Text while over the limit; %d = characters too many. Default: "%d tegn for mye". */
  over?: string;
};

type SharedProps = {
  /** Visible label. Required: placeholder text is not a label. */
  label: ReactNode;
  /** Help text between label and input. */
  description?: ReactNode;
  /** Error message. When set, the field is marked invalid and the message is announced. */
  error?: ReactNode;
  /** Character counter under the field: a limit, or { limit, under, over } to change its texts. */
  counter?: number | TextfieldCounter;
};

type InputProps = SharedProps & Omit<ComponentPropsWithRef<"input">, "size"> & { multiline?: false };
type TextareaProps = SharedProps & ComponentPropsWithRef<"textarea"> & {
  /** Multi-line text (a <textarea>). Grows with its content unless `rows` is set. */
  multiline: true;
};

export type TextfieldProps = InputProps | TextareaProps;

// Wait this long after the last keystroke before announcing the count, so screen readers aren't
// interrupted while typing (designsystemet: 800ms on Windows for NVDA, 200ms elsewhere).
const ANNOUNCE_DELAY = 800;

export function Textfield(allProps: TextfieldProps) {
  const { label, description, error, counter, id, className, ...props } = allProps;
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const counterId = counter ? `${inputId}-counter` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, counterId, errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  const initial = String(props.value ?? props.defaultValue ?? "");
  const [length, setLength] = useState(initial.length);
  const currentLength = props.value !== undefined ? String(props.value).length : length;

  const limits = typeof counter === "number" ? { limit: counter } : counter;
  const left = limits ? limits.limit - currentLength : 0;
  const over = !!limits && left < 0;
  const counterText = limits
    ? (over ? (limits.over ?? "%d tegn for mye") : (limits.under ?? "%d tegn igjen")).replace("%d", String(Math.abs(left)))
    : "";

  // Debounced live announcement of the count, only while the user is typing in this field.
  const [announcement, setAnnouncement] = useState("");
  const typing = useRef(false);
  useEffect(() => {
    if (!limits || !typing.current) return;
    const timer = setTimeout(() => setAnnouncement(counterText), ANNOUNCE_DELAY);
    return () => clearTimeout(timer);
    // limits is a new object each render; counterText already changes whenever it matters.
  }, [counterText]); // eslint-disable-line react-hooks/exhaustive-deps

  const invalid = !!error || over;
  const fieldProps = {
    id: inputId,
    "aria-invalid": invalid ? true : props["aria-invalid"],
    "aria-describedby": describedBy,
  };
  const fieldClasses = cx(
    "w-full px-textfield-padding-x py-textfield-padding-y",
    "rounded-textfield border-width-textfield border-neutral-default",
    "bg-neutral-surface-default text-neutral-default text-body-md placeholder:text-neutral-subtle",
    "focus-ring textfield-hover transition-colors aria-invalid:border-danger-strong",
    "disabled:cursor-not-allowed disabled:opacity-disabled",
  );

  function track(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    typing.current = true;
    setLength(event.target.value.length);
  }

  let field: ReactNode;
  if (allProps.multiline) {
    const { multiline: _multiline, onChange, ...rest } = props as Omit<TextareaProps, keyof SharedProps | "id" | "className">;
    field = (
      <textarea
        {...rest}
        {...fieldProps}
        onChange={(event) => {
          track(event);
          onChange?.(event);
        }}
        className={cx(
          fieldClasses,
          "block min-h-textfield-multiline-min-height resize-y",
          rest.rows === undefined && "field-sizing-content",
        )}
      />
    );
  } else {
    const { multiline: _multiline, onChange, ...rest } = props as Omit<InputProps, keyof SharedProps | "id" | "className">;
    field = (
      <input
        type="text"
        {...rest}
        {...fieldProps}
        onChange={(event) => {
          track(event);
          onChange?.(event);
        }}
        className={cx(fieldClasses, "min-h-textfield-height")}
      />
    );
  }

  return (
    <div className={cx("flex flex-col gap-textfield-gap", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      {description && (
        <p id={descriptionId} className="text-body-md">
          {description}
        </p>
      )}
      {field}
      {limits &&
        (over ? (
          <FieldError id={counterId!}>{counterText}</FieldError>
        ) : (
          <p id={counterId} className="text-body-md">
            {counterText}
          </p>
        ))}
      {limits && (
        <span className="sr-only" aria-live="polite">
          {announcement}
        </span>
      )}
      {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}
