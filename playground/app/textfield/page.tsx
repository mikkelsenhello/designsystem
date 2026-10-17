import { Heading, Textfield } from "../../../src";
import { Preview } from "../Preview";

export default function TextfieldPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Textfield
      </Heading>
      <Preview title="default, with description, placeholder">
        <div className="flex w-full flex-col gap-6">
          <Textfield label="Name" />
          <Textfield
            label="Email"
            type="email"
            description="We send one email a week."
            placeholder="you@example.com"
          />
        </div>
      </Preview>
      <Preview title="error, disabled">
        <div className="flex w-full flex-col gap-6">
          <Textfield label="Email" type="email" defaultValue="not-an-email" error="Enter a valid email address." />
          <Textfield label="Disabled" defaultValue="Can't edit this" disabled />
        </div>
      </Preview>
      <Preview title="multiline: grows with content; rows=4 + counter 300; over the limit">
        <div className="flex w-full flex-col gap-6">
          <Textfield multiline label="Kommentar" description="Grows as you type (no rows)." />
          <Textfield multiline rows={4} label="Beskrivelse" counter={300} defaultValue="Lær å dreie din egen kopp." />
          <Textfield multiline label="For lang" counter={10} defaultValue="Dette er altfor langt" />
          <Textfield label="Single-line with counter" counter={{ limit: 20, under: "%d characters left", over: "%d too many" }} />
        </div>
      </Preview>
      <Preview title="prefix / suffix, readOnly">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Textfield label="Nettside (https://)" prefix="https://" defaultValue="hvaskjer.no" />
          <Textfield label="Pris i kroner" suffix="kr" inputMode="numeric" defaultValue="1500" />
          <Textfield label="Beløp" prefix="NOK" suffix="per uke" defaultValue="500" />
          <Textfield label="Ordrenummer" readOnly defaultValue="HS-2026-0042" />
        </div>
      </Preview>
    </>
  );
}
