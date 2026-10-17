"use client";

import { Checkbox, Heading, Paragraph, Popover, PopoverTrigger, PopoverTriggerContext } from "../../../src";
import { Preview } from "../Preview";

export default function PopoverPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Popover
      </Heading>
      <Preview title="open by default: top, bottom-start tinted; inline trigger">
        <div className="flex w-full flex-wrap items-start gap-10 pt-30 pb-30">
          <PopoverTriggerContext defaultOpen>
            <PopoverTrigger variant="secondary" size="sm">
              Tilpass
            </PopoverTrigger>
            <Popover>
              <Heading level={3} size="2xs" className="mb-2">
                Tilpass annonsen
              </Heading>
              <Checkbox label="Vis logo" />
            </Popover>
          </PopoverTriggerContext>
          <PopoverTriggerContext defaultOpen>
            <PopoverTrigger variant="secondary" size="sm">
              Bottom start
            </PopoverTrigger>
            <Popover placement="bottom-start" variant="tinted" color="info">
              Tinted, info color.
            </Popover>
          </PopoverTriggerContext>
          <Paragraph>
            Prisen er per{" "}
            <PopoverTriggerContext>
              <PopoverTrigger inline>uke</PopoverTrigger>
              <Popover placement="bottom">Mandag til søndag, sendes søndag kveld.</Popover>
            </PopoverTriggerContext>
            .
          </Paragraph>
        </div>
      </Preview>
    </>
  );
}
