import { Heading, Paragraph, SkipLink } from "../../../src";

export default function SkipLinkPage() {
  return (
    <>
      <Heading level={1} size="lg">
        SkipLink
      </Heading>
      <div className="flex flex-col gap-2">
        <Paragraph>Click here, then press Tab: the skip link appears below.</Paragraph>
        <SkipLink href="#main-content">Hopp til hovedinnhold</SkipLink>
        <div data-color-scheme="dark" className="bg-background-default p-4">
          <SkipLink href="#main-content">Hopp til hovedinnhold (dark)</SkipLink>
        </div>
      </div>
      <div id="main-content" tabIndex={-1}>
        <Paragraph>Main content.</Paragraph>
      </div>
    </>
  );
}
