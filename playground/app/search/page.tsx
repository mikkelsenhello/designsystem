"use client";

import { useState } from "react";
import { Heading, Paragraph, Search, SearchButton, SearchClear, SearchInput } from "../../../src";
import { Preview } from "../Preview";

export default function SearchPage() {
  const [query, setQuery] = useState("konsert");
  return (
    <>
      <Heading level={1} size="lg">
        Search
      </Heading>
      <Preview title="input + clear + button (controlled)">
        <form role="search" className="flex w-full max-w-md flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <Search>
            <SearchInput aria-label="Søk i arrangementer" value={query} onChange={(e) => setQuery(e.target.value)} />
            <SearchClear />
            <SearchButton />
          </Search>
          <Paragraph size="sm">query: {JSON.stringify(query)}</Paragraph>
        </form>
      </Preview>
      <Preview title="input + clear only (live filter), secondary button">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Search>
            <SearchInput aria-label="Filtrer" placeholder="Filtrer liste" />
            <SearchClear />
          </Search>
          <Search>
            <SearchInput aria-label="Søk" />
            <SearchButton variant="secondary" />
          </Search>
        </div>
      </Preview>
    </>
  );
}
