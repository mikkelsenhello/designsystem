"use client";

import { useState } from "react";
import { Button, Dialog, DialogBlock, DialogTrigger, DialogTriggerContext, Heading, Paragraph, Textfield } from "../../../src";
import { Preview } from "../Preview";

export default function DialogPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Heading level={1} size="lg">
        Dialog
      </Heading>
      <Preview title="DialogTrigger (uncontrolled), blocks with backdrop click, drawer">
        <DialogTriggerContext>
          <DialogTrigger>Avbestill annonse</DialogTrigger>
          <Dialog aria-labelledby="d1">
            <Heading level={2} size="xs" id="d1" className="mb-2">
              Vil du avbestille?
            </Heading>
            <Paragraph className="mb-6">Annonsen fjernes fra uke 42. Du får pengene tilbake.</Paragraph>
            <Button color="danger">Avbestill</Button>
          </Dialog>
        </DialogTriggerContext>
        <DialogTriggerContext>
          <DialogTrigger variant="secondary">With blocks</DialogTrigger>
          <Dialog aria-labelledby="d2" closedby="any">
            <DialogBlock>
              <Heading level={2} size="xs" id="d2">
                Kontakt oss
              </Heading>
            </DialogBlock>
            <DialogBlock>
              <Textfield label="E-post" type="email" />
            </DialogBlock>
            <DialogBlock>
              <Button>Send</Button>
            </DialogBlock>
          </Dialog>
        </DialogTriggerContext>
        <DialogTriggerContext>
          <DialogTrigger variant="tertiary">Drawer right</DialogTrigger>
          <Dialog aria-label="Filter" placement="right">
            <Heading level={2} size="xs">
              Filter
            </Heading>
          </Dialog>
        </DialogTriggerContext>
      </Preview>
      <section className="flex flex-col gap-3">
        <Heading level={2} size="2xs" className="text-subtle">
          controlled (open / onClose)
        </Heading>
        <div>
          <Button onClick={() => setOpen(true)}>Open controlled</Button>
          <Dialog open={open} onClose={() => setOpen(false)} aria-label="Controlled">
            <Paragraph className="mb-4">open = {String(open)}</Paragraph>
            <Button onClick={() => setOpen(false)}>Close from state</Button>
          </Dialog>
        </div>
      </section>
    </>
  );
}
