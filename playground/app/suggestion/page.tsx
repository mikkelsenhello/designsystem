"use client";

import { useState } from "react";
import { Heading, Paragraph, Suggestion, SuggestionOption } from "../../../src";
import { Preview } from "../Preview";

const places = ["Kulturhuset", "Biblioteket", "Idrettshallen", "Kino", "Kirka", "Torget", "Ungdomshuset"];

export default function SuggestionPage() {
  const [value, setValue] = useState<string | null>("Kino");
  return (
    <>
      <Heading level={1} size="lg">
        Suggestion
      </Heading>
      <Preview title="controlled, pre-selected; error; disabled">
        <div className="flex w-full max-w-md flex-col gap-6 pb-40">
          <Suggestion label="Sted" value={value} onValueChange={(v) => setValue(v)} name="sted">
            {places.map((p) => (
              <SuggestionOption key={p} value={p}>
                {p}
              </SuggestionOption>
            ))}
          </Suggestion>
          <Paragraph size="sm">value: {JSON.stringify(value)}</Paragraph>
          <Suggestion label="Sted" description="Skriv for å filtrere" error="Velg et sted fra listen">
            {places.map((p) => (
              <SuggestionOption key={p} value={p}>
                {p}
              </SuggestionOption>
            ))}
          </Suggestion>
          <Suggestion label="Disabled" disabled>
            <SuggestionOption value="a">A</SuggestionOption>
          </Suggestion>
        </div>
      </Preview>
    </>
  );
}
