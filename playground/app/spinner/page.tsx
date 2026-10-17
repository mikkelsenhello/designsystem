import { Button, Heading, Spinner } from "../../../src";
import { Preview } from "../Preview";

const sizes = ["2xs", "xs", "sm", "md", "lg", "xl"] as const;

export default function SpinnerPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Spinner
      </Heading>
      <Preview title="sizes 2xs–xl">
        {sizes.map((size) => (
          <Spinner key={size} size={size} aria-label="Laster" />
        ))}
      </Preview>
      <Preview title="colors">
        <Spinner aria-label="Laster" color="primary" />
        <Spinner aria-label="Laster" color="success" />
        <Spinner aria-label="Laster" color="danger" />
      </Preview>
      <Preview title="Button loading">
        <Button loading>Lagrer …</Button>
        <Button loading variant="secondary">
          Lagrer …
        </Button>
        <Button loading icon aria-label="Lagrer" variant="tertiary" />
      </Preview>
    </>
  );
}
