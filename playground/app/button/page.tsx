import { Button, Heading } from "../../../src";
import type { ButtonVariant, ColorFamily } from "../../../src";
import { Preview } from "../Preview";

const variants: ButtonVariant[] = ["primary", "secondary", "tertiary"];
const colors: ColorFamily[] = ["primary", "neutral", "danger", "success", "warning", "info"];

export default function ButtonPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Button
      </Heading>
      {colors.map((color) => (
        <Preview key={color} title={`color="${color}"`}>
          {variants.map((variant) => (
            <Button key={variant} color={color} variant={variant}>
              {variant}
            </Button>
          ))}
          <Button color={color} disabled>
            disabled
          </Button>
        </Preview>
      ))}
      <Preview title="sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="lg" variant="secondary">
          Large secondary
        </Button>
      </Preview>
      <Preview title="fullWidth">
        <Button fullWidth>Subscribe</Button>
      </Preview>
    </>
  );
}
