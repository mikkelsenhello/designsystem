"use client";

import { useState } from "react";
import { Heading, Paragraph, Switch } from "../../../src";
import { Preview } from "../Preview";

export default function SwitchPage() {
  const [on, setOn] = useState(true);
  return (
    <>
      <Heading level={1} size="lg">
        Switch
      </Heading>
      <Preview title="off, on (controlled), description, colors">
        <div className="flex flex-col gap-4">
          <Switch label="Varsle meg på e-post" />
          <Switch label="Vis bare gratis arrangementer" checked={on} onChange={(e) => setOn(e.target.checked)} />
          <Paragraph size="sm">checked: {String(on)}</Paragraph>
          <Switch label="Mørk modus" description="Følger ikke systeminnstillingen" defaultChecked />
          <Switch label="success" color="success" defaultChecked />
        </div>
      </Preview>
      <Preview title="position end, disabled, readOnly">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Switch label="Nyhetsbrev" position="end" defaultChecked />
          <Switch label="Disabled" disabled />
          <Switch label="Disabled on" disabled defaultChecked />
          <Switch label="Read only" readOnly defaultChecked />
        </div>
      </Preview>
    </>
  );
}
