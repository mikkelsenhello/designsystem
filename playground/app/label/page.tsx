import { Heading, Label } from "../../../src";
import { Preview } from "../Preview";

export default function LabelPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Label
      </Heading>
      <Preview title="sizes">
        <Label size="sm">Email (sm)</Label>
        <Label size="md">Email (md)</Label>
        <Label size="lg">Email (lg)</Label>
      </Preview>
    </>
  );
}
