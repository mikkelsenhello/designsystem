"use client";

import { useState } from "react";
import { Button, Card, Heading, Paragraph } from "../../../src";
import { Preview } from "../Preview";

export default function MotionPage() {
  const [run, setRun] = useState(0);
  return (
    <>
      <Heading level={1} size="lg">
        Motion
      </Heading>
      <Paragraph>
        Durations, easing and distances are theme tokens (<code>--ds-motion-*</code>). With reduced motion turned on in
        the OS, entrances only fade, and press and accordion happen instantly.
      </Paragraph>
      <div>
        <Button variant="secondary" onClick={() => setRun((r) => r + 1)}>
          Replay
        </Button>
      </div>
      <Preview title="animate-enter, staggered with delay-stagger-N">
        <div key={run} className="flex flex-col gap-3">
          <Heading level={2} size="md" className="animate-enter">
            This week in town
          </Heading>
          <Paragraph className="animate-enter delay-stagger-1">Fifteen events, three of them free.</Paragraph>
          <div className="animate-enter delay-stagger-2">
            <Button>Subscribe</Button>
          </div>
        </div>
      </Preview>
      <Preview title="success message entering">
        <Card key={run} color="success" variant="tinted" className="animate-enter">
          <Paragraph>You're subscribed. See you Friday.</Paragraph>
        </Card>
      </Preview>
    </>
  );
}
