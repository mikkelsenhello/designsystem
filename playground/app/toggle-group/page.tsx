"use client";

import { useState } from "react";
import { Heading, Paragraph, ToggleGroup, ToggleGroupItem } from "../../../src";
import { Preview } from "../Preview";

export default function ToggleGroupPage() {
  const [view, setView] = useState("annonse");
  return (
    <>
      <Heading level={1} size="lg">
        ToggleGroup
      </Heading>
      <Preview title="md, controlled">
        <div className="flex flex-col gap-3">
          <ToggleGroup aria-label="Visning" value={view} onChange={setView}>
            <ToggleGroupItem value="annonse">I annonsen</ToggleGroupItem>
            <ToggleGroupItem value="skjema">Som skjema</ToggleGroupItem>
          </ToggleGroup>
          <Paragraph size="sm">value: {view}</Paragraph>
        </div>
      </Preview>
      <Preview title="sm, three items, uncontrolled; secondary; disabled item">
        <div className="flex flex-col gap-4">
          <ToggleGroup aria-label="Periode" size="sm" defaultValue="uke">
            <ToggleGroupItem value="dag">Dag</ToggleGroupItem>
            <ToggleGroupItem value="uke">Uke</ToggleGroupItem>
            <ToggleGroupItem value="mnd">Måned</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup aria-label="Visning" variant="secondary" defaultValue="a">
            <ToggleGroupItem value="a">I annonsen</ToggleGroupItem>
            <ToggleGroupItem value="b">Som skjema</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup aria-label="Med deaktivert" defaultValue="a">
            <ToggleGroupItem value="a">På</ToggleGroupItem>
            <ToggleGroupItem value="b" disabled>
              Av
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Preview>
    </>
  );
}
