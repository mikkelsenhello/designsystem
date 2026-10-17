import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink, BreadcrumbsList, Heading, Paragraph } from "../../../src";
import { Preview } from "../Preview";

function Trail() {
  return (
    <BreadcrumbsList>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Forside</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Arkiv</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="#">Uke 42</BreadcrumbsLink>
      </BreadcrumbsItem>
    </BreadcrumbsList>
  );
}

export default function BreadcrumbsPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Breadcrumbs
      </Heading>
      <Preview title="list (last item = current page)">
        <Breadcrumbs>
          <Trail />
        </Breadcrumbs>
      </Preview>
      <Preview title="back link + list: narrow screens (< 650px) show only the back link">
        <div className="flex flex-col gap-2">
          <Breadcrumbs>
            <BreadcrumbsLink href="#">Tilbake til Arkiv</BreadcrumbsLink>
            <Trail />
          </Breadcrumbs>
          <Paragraph size="sm">Make the window narrow to see the switch.</Paragraph>
        </div>
      </Preview>
      <Preview title="back link only">
        <Breadcrumbs>
          <BreadcrumbsLink href="#">Tilbake til Arkiv</BreadcrumbsLink>
        </Breadcrumbs>
      </Preview>
    </>
  );
}
