"use client";

import { useState } from "react";
import { Heading, InlineEditable, Paragraph } from "../../../src";
import { Preview } from "../Preview";

export default function InlineEditablePage() {
  const [title, setTitle] = useState("Meld deg på keramikkurs");
  const [body, setBody] = useState("");
  return (
    <>
      <Heading level={1} size="lg">
        InlineEditable
      </Heading>
      <Preview title="inherits Heading / Paragraph; empty shows placeholder; maxLength 40 / 300">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Heading level={2} size="md">
            <InlineEditable aria-label="Tittel" placeholder="Skriv en tittel" value={title} onChange={setTitle} maxLength={40} />
          </Heading>
          <Paragraph>
            <InlineEditable
              aria-label="Beskrivelse"
              placeholder="Kort beskrivelse, maks et par setninger."
              multiline
              maxLength={300}
              value={body}
              onChange={setBody}
            />
          </Paragraph>
          <Paragraph size="sm" className="text-subtle">
            {title.length}/40 · {body.length}/300
          </Paragraph>
        </div>
      </Preview>
    </>
  );
}
