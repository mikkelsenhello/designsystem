import { Alert, Heading, Link, Paragraph } from "../../../src";
import type { ColorFamily } from "../../../src";
import { Preview } from "../Preview";

const colors: ColorFamily[] = ["info", "success", "warning", "danger", "neutral", "primary"];

export default function AlertPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Alert
      </Heading>
      <Preview title="text only, each color">
        <div className="flex w-full flex-col gap-4">
          {colors.map((color) => (
            <Alert key={color} color={color}>
              color=&quot;{color}&quot;: Påmeldingen stenger fredag kl. 12.
            </Alert>
          ))}
        </div>
      </Preview>
      <Preview title="with heading (icon aligned to the heading)">
        <div className="flex w-full flex-col gap-4">
          <Alert color="warning">
            <Heading level={2} size="xs" className="mb-2">
              Arrangementet er flyttet
            </Heading>
            <Paragraph>
              Konserten er flyttet til Kulturhuset. Les mer på <Link href="#">arrangementssiden</Link>.
            </Paragraph>
          </Alert>
          <Alert color="danger">
            <Heading level={2} size="2xs" className="mb-2">
              Noe gikk galt
            </Heading>
            <Paragraph>Vi kunne ikke lagre annonsen. Prøv igjen om litt.</Paragraph>
          </Alert>
        </div>
      </Preview>
    </>
  );
}
