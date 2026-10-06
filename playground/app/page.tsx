import { Heading, Paragraph } from "../../src";

export default function Home() {
  return (
    <div className="flex max-w-prose flex-col gap-4">
      <Heading level={1} size="xl">
        Designsystem playground
      </Heading>
      <Paragraph>
        Visual QA for every component and variant, in light and dark. Pick a component above.
      </Paragraph>
    </div>
  );
}
