import type { ReactNode } from "react";
import { ErrorIcon } from "./icons";

/** Error text under a form field, with designsystemet's error icon. Referenced by the field's aria-describedby. */
export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex gap-2 text-body-md text-danger-subtle">
      <span className="flex h-lh shrink-0 items-center">
        <ErrorIcon className="size-6" />
      </span>
      <span>{children}</span>
    </p>
  );
}
