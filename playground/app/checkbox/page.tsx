import { Checkbox, Heading } from "../../../src";
import { Preview } from "../Preview";

export default function CheckboxPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Checkbox
      </Heading>
      <Preview title="unchecked, checked, with description">
        <div className="flex flex-col gap-4">
          <Checkbox label="Send me the weekly newsletter" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox
            label="I agree to receive emails"
            description="You can unsubscribe at any time."
            defaultChecked
          />
        </div>
      </Preview>
      <Preview title="error, disabled, color">
        <div className="flex flex-col gap-4">
          <Checkbox label="I agree to the terms" error="You must agree to continue." />
          <Checkbox label="Error, checked" error="Still invalid." defaultChecked />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled, checked" disabled defaultChecked />
          <Checkbox label='color="success"' color="success" defaultChecked />
        </div>
      </Preview>
    </>
  );
}
