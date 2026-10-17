"use client";

import { Avatar, Button, Heading, Tooltip } from "../../../src";
import { Preview } from "../Preview";

export default function TooltipPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Tooltip
      </Heading>
      <Preview title="open: top, bottom; hover/focus: labelledby icon button, avatar, text">
        <div className="flex w-full flex-wrap items-center gap-10 pt-12 pb-12">
          <Tooltip content="Kopierer lenken" open>
            <Button variant="secondary">Del</Button>
          </Tooltip>
          <Tooltip content="Under knappen" placement="bottom" open>
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Neste side" type="labelledby">
            <Button icon variant="tertiary">
              →
            </Button>
          </Tooltip>
          <Tooltip content="Ola Nordmann">
            <Avatar aria-hidden initials="ON" tabIndex={0} />
          </Tooltip>
          <Tooltip content="Forklaring">Hover me</Tooltip>
        </div>
      </Preview>
    </>
  );
}
