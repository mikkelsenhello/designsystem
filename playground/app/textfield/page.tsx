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
    </>
  );
}
