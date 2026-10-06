import { Heading, Paragraph } from "../../../src";
import type { ParagraphSize, ParagraphVariant } from "../../../src";
import { Preview } from "../Preview";

const sizes: ParagraphSize[] = ["xl", "lg", "md", "sm", "xs"];
const variants: ParagraphVariant[] = ["short", "default", "long"];
const text =
  "Every Friday we send a short list of things worth doing this weekend. No ads, no spam, unsubscribe any time.";

export default function ParagraphPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Paragraph
      </Heading>
      <Preview title="sizes">
        <div className="flex flex-col gap-4">
          {sizes.map((size) => (
            <Paragraph key={size} size={size}>
              {size}: {text}
            </Paragraph>
          ))}
        </div>
      </Preview>
      <Preview title="variants (line height)">
        <div className="grid gap-6 md:grid-cols-3">
          {variants.map((variant) => (
            <Paragraph key={variant} variant={variant}>
              {variant}: {text}
            </Paragraph>
          ))}
        </div>
      </Preview>
      <Preview title='subtle (className="text-subtle")'>
        <Paragraph size="sm" className="text-subtle">
          Sent every Friday.
        </Paragraph>
      </Preview>
    </>
  );
}
