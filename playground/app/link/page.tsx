import NextLink from "next/link";
import { Heading, Link, Paragraph } from "../../../src";
import { Preview } from "../Preview";

export default function LinkPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Link
      </Heading>
      <Preview title="in text, neutral, asChild with next/link">
        <div className="flex flex-col gap-4">
          <Paragraph>
            Read our <Link href="#privacy">privacy policy</Link> before you subscribe.
          </Paragraph>
          <Paragraph size="sm">
            <Link color="neutral" href="#contact">
              Contact
            </Link>
          </Paragraph>
          <Paragraph>
            <Link asChild>
              <NextLink href="/button">Go to the Button page (client-side routing)</NextLink>
            </Link>
          </Paragraph>
        </div>
      </Preview>
    </>
  );
}
