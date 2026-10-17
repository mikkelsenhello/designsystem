"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, ComponentPropsWithRef, ReactNode } from "react";
import { FieldError } from "../../internal/FieldError";
import { UploadIcon, XMarkIcon } from "../../internal/icons";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import { Label } from "../Label/Label";

export type FileUploadProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "multiple" | "size" | "children"
> & {
  /** Label of the field. Required, also when hidden. */
  label: ReactNode;
  /** Keep the label for screen readers only, e.g. when the area itself explains it (an ad image). */
  hideLabel?: boolean;
  /** Help text between label and area. */
  description?: ReactNode;
  /** Error under the area; marks the input invalid and the border danger. */
  error?: ReactNode;
  /** Text inside the empty area, e.g. "Trykk for å velge bilde". */
  children: ReactNode;
  /** Chosen file (controlled). null = none. Images show as a preview filling the area. */
  value?: File | null;
  /** Called with the chosen file, or null when it is removed. Check size and type here: a dropped file skips `accept`. */
  onChange?: (file: File | null) => void;
  /** Area's aspect ratio, e.g. "16 / 9". Default: as tall as its content. */
  aspectRatio?: string;
  /** Accessible text of the remove button. Default: "Fjern fil". */
  removeLabel?: string;
};

/**
 * Pick one file by clicking or dropping it on a dashed area (designsystemet's FileUpload), extended with an
 * image preview and a remove button. A real <input type="file"> covers the area, so `name` submits the file.
 */
export function FileUpload({
  label,
  hideLabel = false,
  description,
  error,
  children,
  value,
  onChange,
  aspectRatio,
  removeLabel = "Fjern fil",
  accept = "image/*",
  id,
  className,
  disabled,
  ref,
  ...props
}: FileUploadProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  const inputRef = useRef<HTMLInputElement>(null);
  const [uncontrolled, setUncontrolled] = useState<File | null>(null);
  const file = value !== undefined ? value : uncontrolled;
  const [dragging, setDragging] = useState(false);

  // Keep the real input's files in step with `value`, so a form submits the file even when this instance
  // was mounted after it was chosen (e.g. switching between two views of the same data).
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    if (!file) {
      input.value = "";
    } else if (input.files?.[0] !== file && typeof DataTransfer !== "undefined") {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
    }
  }, [file]);

  const previewUrl = usePreviewUrl(file);

  function choose(next: File | null) {
    if (value === undefined) setUncontrolled(next);
    onChange?.(next);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDragging(false);
    const next = event.target.files?.[0];
    if (next) choose(next); // a cancelled dialog keeps the current file
  }

  return (
    <div className={cx("flex flex-col gap-textfield-gap", className)}>
      <Label htmlFor={inputId} className={hideLabel ? "sr-only" : undefined}>
        {label}
      </Label>
      {description && (
        <p id={descriptionId} className="text-body-md">
          {description}
        </p>
      )}
      <div
        className={cx(
          "relative flex flex-col items-center justify-center overflow-hidden rounded-file-upload text-center text-body-md",
          "select-none transition-colors focus-ring-within",
          previewUrl
            ? "bg-surface-tinted"
            : cx(
                "border-width-file-upload px-file-upload-padding-x py-file-upload-padding-y",
                error ? "border-danger-default" : "border-default",
                dragging ? "bg-surface-tinted" : "bg-surface-default",
                !disabled && "hover:bg-surface-tinted",
              ),
          disabled ? "cursor-not-allowed opacity-disabled" : "cursor-pointer",
        )}
        // ds-allow: per-instance aspect ratio from a prop
        style={aspectRatio ? { aspectRatio } : undefined}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
      >
        {previewUrl ? (
          // Decorative: the input (labelled) is what screen readers interact with; its value names the file.
          <img src={previewUrl} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <>
            <UploadIcon className="mb-file-upload-icon-gap size-file-upload-icon-size shrink-0 text-subtle" />
            <span className="text-default">{children}</span>
            {file && <span className="mt-1 text-body-sm text-subtle">{file.name}</span>}
          </>
        )}
        <input
          {...props}
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type="file"
          id={inputId}
          accept={accept}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={describedBy}
          // Covers the whole area: a click opens the dialog, a dropped file lands on the input natively.
          className="file-upload-input absolute inset-0 z-1 m-0 size-full"
        />
        {file && !disabled && (
          <Button
            size="sm"
            color="neutral"
            static
            aria-label={removeLabel}
            onClick={() => choose(null)}
            className="absolute end-file-upload-remove-inset top-file-upload-remove-inset z-2"
          >
            <XMarkIcon className="size-5" />
          </Button>
        )}
      </div>
      {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

/** Object URL for an image file, revoked when it changes or unmounts. */
function usePreviewUrl(file: File | null) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setUrl(undefined);
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  return url;
}
