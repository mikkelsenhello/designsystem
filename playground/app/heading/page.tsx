import { Heading } from "../../../src";
import type { HeadingSize } from "../../../src";
import { Preview } from "../Preview";

const sizes: HeadingSize[] = ["2xl", "xl", "lg", "md", "sm", "xs", "2xs"];

export default function HeadingPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Heading
      </Heading>
      <Preview title="sizes">
        <div className="flex flex-col gap-3">
          {sizes.map((size) => (
            <Heading key={size} level={3} size={size}>
              {size}: The quick brown fox
            </Heading>
          ))}
        </div>
      </Preview>
    </>
  );
}
