import { Badge, Button, Card, Heading, Paragraph } from "../../../src";
import { Preview } from "../Preview";

export default function CardPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Card
      </Heading>
      <Preview title="variants and colors">
        <div className="grid w-full gap-4 md:grid-cols-3">
          <Card>
            <Heading level={3} size="xs">
              Default
            </Heading>
            <Paragraph>Plain surface with a subtle border.</Paragraph>
          </Card>
          <Card variant="tinted">
            <Heading level={3} size="xs">
              Tinted
            </Heading>
            <Paragraph>Subtly colored surface.</Paragraph>
          </Card>
          <Card variant="tinted" color="primary">
            <Badge>New</Badge>
            <Heading level={3} size="xs">
              Tinted primary
            </Heading>
            <Paragraph>Everything inside follows the card&apos;s color.</Paragraph>
            <Button size="sm" variant="secondary">
              Read more
            </Button>
          </Card>
        </div>
      </Preview>
    </>
  );
}
