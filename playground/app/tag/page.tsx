import { Heading, Link, Tag } from "../../../src";
import type { ColorFamily } from "../../../src";
import { Preview } from "../Preview";

const colors: ColorFamily[] = ["primary", "neutral", "info", "success", "warning", "danger"];

export default function TagPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Tag
      </Heading>
      <Preview title="default, each color">
        {colors.map((color) => (
          <Tag key={color} color={color}>
            {color}
          </Tag>
        ))}
      </Preview>
      <Preview title="outline, each color">
        {colors.map((color) => (
          <Tag key={color} color={color} variant="outline">
            {color}
          </Tag>
        ))}
      </Preview>
      <Preview title="asChild link (hover + focus)">
        <Tag asChild>
          <Link href="#">Konsert</Link>
        </Tag>
      </Preview>
    </>
  );
}
