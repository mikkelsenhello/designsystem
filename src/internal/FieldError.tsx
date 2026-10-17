import type { ReactNode } from "react";
import { ValidationMessage } from "../components/ValidationMessage/ValidationMessage";

/** Error text under a form field. Referenced by the field's aria-describedby. */
export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return <ValidationMessage id={id}>{children}</ValidationMessage>;
}
