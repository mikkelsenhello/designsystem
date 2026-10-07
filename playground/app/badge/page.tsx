import { Badge, Heading } from "../../../src";
import type { ColorFamily } from "../../../src";
import { Preview } from "../Preview";

const colors: ColorFamily[] = ["primary", "neutral", "danger", "success", "warning", "info"];

export default function BadgePage() {
  return (
    <>
      <Heading level={1} size="lg">
        Badge
      </Heading>
      <Preview title='variant="base"'>
        {colors.map((color) => (
          <Badge key={color} color={color}>
            {color}
          </Badge>
        ))}
        <Badge>3</Badge>
        <Badge color="danger">12</Badge>
      </Preview>
      <Preview title='variant="tinted"'>
        {colors.map((color) => (
          <Badge key={color} color={color} variant="tinted">
            {color}
          </Badge>
        ))}
        <Badge variant="tinted">3</Badge>
      </Preview>
    </>
  );
}
