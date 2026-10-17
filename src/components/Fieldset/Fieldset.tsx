"use client";

import { useId } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { FieldError } from "../../internal/FieldError";
import { cx } from "../../utils/cx";

export type FieldsetProps = ComponentPropsWithRef<"fieldset"> & {
  /** Visible question or group name, e.g. "Hva vil du annonsere?". Read out with each field inside. */
  legend: ReactNode;
  /** Help text under the legend. */
  description?: ReactNode;
  /** Error for the group as a whole ("Velg ett alternativ"). Shown under the fields. */
  error?: ReactNode;
};

/** Ids Fieldset gives its description and error, so a group component can link its fields to them. */
export function fieldsetIds(id: string, { description, error }: { description?: ReactNode; error?: ReactNode }) {
  return {
    descriptionId: description ? `${id}-description` : undefined,
    errorId: error ? `${id}-error` : undefined,
  };
}

/**
 * Groups related fields under a legend (designsystemet's Fieldset): legend, optional description right
 * under it, 16px between fields, a group error at the bottom. Renders a native <fieldset>.
 */
export function Fieldset({ legend, description, error, id, className, children, ...props }: FieldsetProps) {
  const autoId = useId();
  const fieldsetId = id ?? autoId;
  const { descriptionId, errorId } = fieldsetIds(fieldsetId, { description, error });
  const describedBy = [descriptionId, errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      {...props}
      id={fieldsetId}
      aria-describedby={describedBy}
      className={cx("m-0 min-w-0 border-none p-0", className)}
    >
      <legend className="p-0 font-body font-semibold text-body-md text-neutral-default">{legend}</legend>
      {description && (
        <p id={descriptionId} className="text-body-md text-neutral-default">
          {description}
        </p>
      )}
      <div className="mt-fieldset-gap flex flex-col gap-fieldset-gap">{children}</div>
      {error && errorId && (
        <div className="mt-fieldset-gap">
          <FieldError id={errorId}>{error}</FieldError>
        </div>
      )}
    </fieldset>
  );
}
