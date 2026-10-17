"use client";

import { useState } from "react";
import { Heading, Pagination, Paragraph } from "../../../src";
import { Preview } from "../Preview";

const toHref = (page: number) => "?side=" + page;

export default function PaginationPage() {
  const [page, setPage] = useState(4);
  return (
    <>
      <Heading level={1} size="lg">
        Pagination
      </Heading>
      <Preview title="buttons (onChange), 10 pages">
        <div className="flex flex-col gap-2">
          <Pagination current={page} total={10} onChange={setPage} />
          <Paragraph size="sm">current: {page}</Paragraph>
        </div>
      </Preview>
      <Preview title="links (href), first page: previous hidden">
        <Pagination current={1} total={5} href={toHref} />
      </Preview>
      <Preview title="size sm, last page of 20">
        <Pagination size="sm" current={20} total={20} href={toHref} />
      </Preview>
    </>
  );
}
