"use client";

import { useState } from "react";
import {
  Button,
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryItem,
  ErrorSummaryLink,
  ErrorSummaryList,
  Heading,
  Textfield,
} from "../../../src";
import { Preview } from "../Preview";

export default function ErrorSummaryPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <Heading level={1} size="lg">
        ErrorSummary
      </Heading>
      <Preview title="static">
        <ErrorSummary className="w-full">
          <ErrorSummaryHeading>Rett opp disse feilene før du sender</ErrorSummaryHeading>
          <ErrorSummaryList>
            <ErrorSummaryItem>
              <ErrorSummaryLink href="#navn">Navn må fylles ut</ErrorSummaryLink>
            </ErrorSummaryItem>
            <ErrorSummaryItem>
              <ErrorSummaryLink href="#epost">E-posten mangler @</ErrorSummaryLink>
            </ErrorSummaryItem>
          </ErrorSummaryList>
        </ErrorSummary>
      </Preview>
      <section className="flex max-w-md flex-col gap-4">
        <Heading level={2} size="2xs" className="text-subtle">
          appears on submit and takes focus (light only)
        </Heading>
        {submitted && (
          <ErrorSummary>
            <ErrorSummaryHeading>Rett opp disse feilene før du sender</ErrorSummaryHeading>
            <ErrorSummaryList>
              <ErrorSummaryItem>
                <ErrorSummaryLink href="#navn2">Navn må fylles ut</ErrorSummaryLink>
              </ErrorSummaryItem>
            </ErrorSummaryList>
          </ErrorSummary>
        )}
        <Textfield id="navn2" label="Navn" error={submitted ? "Navn må fylles ut" : undefined} />
        <Button onClick={() => setSubmitted(true)}>Send</Button>
      </section>
    </>
  );
}
