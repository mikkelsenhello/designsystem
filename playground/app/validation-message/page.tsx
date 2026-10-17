import { Heading, ValidationMessage } from "../../../src";
import { Preview } from "../Preview";

export default function ValidationMessagePage() {
  return (
    <>
      <Heading level={1} size="lg">
        ValidationMessage
      </Heading>
      <Preview title="danger / success / warning / info">
        <div className="flex flex-col gap-2">
          <ValidationMessage>E-posten mangler @</ValidationMessage>
          <ValidationMessage color="success">Brukernavnet er ledig</ValidationMessage>
          <ValidationMessage color="warning">Passordet er svakt</ValidationMessage>
          <ValidationMessage color="info">Du kan endre dette senere</ValidationMessage>
        </div>
      </Preview>
    </>
  );
}
