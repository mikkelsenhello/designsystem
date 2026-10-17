"use client";

import { createContext, useContext, useId, useRef } from "react";
import type { ChangeEvent, ComponentPropsWithRef, MouseEvent, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { FieldError } from "../../internal/FieldError";
import { cx } from "../../utils/cx";
import { Fieldset, fieldsetIds } from "../Fieldset/Fieldset";
import type { FieldsetProps } from "../Fieldset/Fieldset";

type GroupContext = {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  invalid: boolean;
  errorId?: string;
  color?: ColorFamily;
};
const RadioGroupContext = createContext<GroupContext | null>(null);

export type RadioGroupProps = Omit<FieldsetProps, "onChange" | "defaultValue" | "color"> & {
  /** What the form submits the chosen value as. Default: a generated name. */
  name?: string;
  /** Chosen value (controlled). Use with onChange. */
  value?: string;
  /** Initially chosen value (uncontrolled). */
  defaultValue?: string;
  /** Called with the chosen Radio's value. */
  onChange?: (value: string) => void;
  /** One option must be chosen before the form submits. */
  required?: boolean;
  /** Color family of the checked radios. Default: primary. */
  color?: ColorFamily;
};

/**
 * One choice among a few options, all visible (designsystemet's Fieldset + Radio, with useRadioGroup's
 * name/value handling built in). The group error marks every radio invalid and is read out with each.
 */
export function RadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  required,
  disabled,
  color,
  error,
  description,
  id,
  children,
  ...props
}: RadioGroupProps) {
  const autoId = useId();
  const groupId = id ?? autoId;
  const { errorId } = fieldsetIds(groupId, { description, error });
  return (
    <RadioGroupContext.Provider
      value={{ name: name ?? `${groupId}-name`, value, defaultValue, onChange, required, disabled, invalid: !!error, errorId, color }}
    >
      <Fieldset {...props} id={groupId} disabled={disabled} description={description} error={error}>
        {children}
      </Fieldset>
    </RadioGroupContext.Provider>
  );
}

export type RadioProps = Omit<ComponentPropsWithRef<"input">, "type" | "size" | "value" | "color"> & {
  /** Visible label, clickable. */
  label: ReactNode;
  /** Smaller help text under the label. */
  description?: ReactNode;
  /** What the form submits when this radio is chosen. Required inside a RadioGroup. */
  value: string;
  /** Error for this radio alone. In a RadioGroup, use the group's `error` instead. */
  error?: ReactNode;
  /** Color family of the checked circle. Default: the RadioGroup's color, else primary. */
  color?: ColorFamily;
};

export function Radio({ label, description, value, error, color, id, className, onChange, ...props }: RadioProps) {
  const group = useContext(RadioGroupContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy =
    [descriptionId, errorId, group?.errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;
  const invalid = !!error || !!group?.invalid;
  const disabled = props.disabled ?? group?.disabled;

  const checkedProps = group
    ? group.value !== undefined
      ? { checked: group.value === value }
      : group.defaultValue !== undefined
        ? { defaultChecked: group.defaultValue === value }
        : {}
    : {};

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    if (event.target.checked) group?.onChange?.(value);
  }

  // The whole row is clickable, like designsystemet's field: a click on the description chooses the radio too.
  function handleRowClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("input, label, a, button")) return;
    inputRef.current?.click();
  }

  return (
    <div data-color={invalid ? "danger" : (color ?? group?.color ?? "primary")} className={cx("flex flex-col gap-2 text-body-md", className)}>
      <div className={cx("group flex w-fit gap-radio-gap", disabled ? "cursor-not-allowed" : "cursor-pointer")} onClick={handleRowClick}>
        <span className="relative flex h-lh shrink-0 items-center">
          <input
            name={group?.name}
            required={group?.required}
            {...checkedProps}
            {...props}
            ref={(node) => {
              inputRef.current = node;
              const { ref } = props;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            type="radio"
            id={inputId}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={invalid ? true : props["aria-invalid"]}
            aria-describedby={describedBy}
            className={cx(
              "m-0 size-radio-size shrink-0 cursor-pointer appearance-none rounded-full",
              "border-width-radio border-neutral-default bg-neutral-surface-default text-base-contrast-default",
              "checked:border-base-default checked:bg-base-default radio-dot transition-colors",
              "focus-ring radio-hover aria-invalid:border-danger-strong",
              "disabled:cursor-not-allowed disabled:opacity-disabled",
            )}
          />
        </span>
        <div className="flex flex-col">
          <label htmlFor={inputId} className={cx("text-neutral-default", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
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
