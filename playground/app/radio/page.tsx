"use client";

import { useState } from "react";
import { Fieldset, Heading, Paragraph, Radio, RadioGroup, Textfield } from "../../../src";
import { Preview } from "../Preview";

export default function RadioPage() {
  const [kind, setKind] = useState("aktivitet");
  return (
    <>
      <Heading level={1} size="lg">
        Radio
      </Heading>
      <Preview title="RadioGroup controlled, with description">
        <div className="flex flex-col gap-4">
          <RadioGroup legend="Hva vil du annonsere?" value={kind} onChange={setKind}>
            <Radio value="aktivitet" label="Aktivitet" description="Kurs, konsert, arrangement" />
            <Radio value="produkt" label="Produkt eller tjeneste" />
          </RadioGroup>
          <Paragraph size="sm">value: {kind}</Paragraph>
        </div>
      </Preview>
      <Preview title="uncontrolled, group description, group error, disabled">
        <div className="flex flex-col gap-8">
          <RadioGroup legend="Hvordan vil du lage annonsen?" description="Du kan bytte senere." defaultValue="lenke">
            <Radio value="lenke" label="Lim inn lenke" />
            <Radio value="selv" label="Lag den selv" />
          </RadioGroup>
          <RadioGroup legend="Hvordan vil du lage annonsen?" error="Velg ett alternativ.">
            <Radio value="lenke" label="Lim inn lenke" />
            <Radio value="selv" label="Lag den selv" />
          </RadioGroup>
          <RadioGroup legend="Disabled" disabled defaultValue="a">
            <Radio value="a" label="Checked" />
            <Radio value="b" label="Unchecked" />
          </RadioGroup>
        </div>
      </Preview>
      <Preview title="Fieldset with other fields">
        <Fieldset legend="Kontakt" description="Vi svarer innen to dager." className="w-full">
          <Textfield label="Navn" />
          <Textfield label="E-post" type="email" />
        </Fieldset>
      </Preview>
    </>
  );
}
