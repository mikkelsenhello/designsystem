import { Divider, Heading, Paragraph } from "../../../src";
import { Preview } from "../Preview";

export default function DividerPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Divider
      </Heading>
      <Preview title="between paragraphs">
        <div className="w-full">
          <Paragraph>Konsert i Kulturhuset, fredag kl. 20.</Paragraph>
          <Divider />
          <Paragraph>Quiz på Biblioteket, lørdag kl. 18.</Paragraph>
        </div>
      </Preview>
    </>
  );
}
