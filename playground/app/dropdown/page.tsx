"use client";

import { useState } from "react";
import {
  Dropdown,
  DropdownButton,
  DropdownHeading,
  DropdownItem,
  DropdownList,
  DropdownTrigger,
  DropdownTriggerContext,
  Heading,
  Paragraph,
} from "../../../src";
import { Preview } from "../Preview";

export default function DropdownPage() {
  const [last, setLast] = useState("–");
  return (
    <>
      <Heading level={1} size="lg">
        Dropdown
      </Heading>
      <Preview title="heading + items, one disabled (click to open)">
        <div className="flex w-full flex-col items-end gap-2 pb-60">
          <DropdownTriggerContext>
            <DropdownTrigger variant="secondary">Del</DropdownTrigger>
            <Dropdown>
              <DropdownHeading>Del arrangementet</DropdownHeading>
              <DropdownList>
                <DropdownItem onSelect={() => setLast("Kopier lenke")}>
                  <DropdownButton>Kopier lenke</DropdownButton>
                </DropdownItem>
                <DropdownItem onSelect={() => setLast("E-post")}>
                  <DropdownButton>Send på e-post</DropdownButton>
                </DropdownItem>
                <DropdownItem disabled>
                  <DropdownButton>Facebook (av)</DropdownButton>
                </DropdownItem>
              </DropdownList>
            </Dropdown>
          </DropdownTriggerContext>
          <Paragraph size="sm">last: {last}</Paragraph>
        </div>
      </Preview>
    </>
  );
}
