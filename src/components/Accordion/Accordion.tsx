"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import type { ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { ChevronDownIcon } from "../../internal/icons";
import { cx } from "../../utils/cx";

export type AccordionProps = {
  /** AccordionItem elements. */
  children: ReactNode;
  /** Allow several items open at once. Default: false (opening one closes the others). */
  multiple?: boolean;
  /** Values of the items open on first render. */
  defaultOpen?: string[];
  /** Color family. Default: neutral. */
  color?: ColorFamily;
  className?: string;
};

export function Accordion({ children, multiple = false, defaultOpen = [], color = "neutral", className }: AccordionProps) {
  const classes = cx("divide-y divide-subtle border-y border-subtle", className);
  return multiple ? (
    <RadixAccordion.Root type="multiple" defaultValue={defaultOpen} data-color={color} className={classes}>
      {children}
    </RadixAccordion.Root>
  ) : (
    <RadixAccordion.Root type="single" collapsible defaultValue={defaultOpen[0]} data-color={color} className={classes}>
      {children}
    </RadixAccordion.Root>
  );
}

export type AccordionItemProps = {
  /** Unique id of the item within its Accordion. */
  value: string;
  /** Always-visible header text, e.g. the FAQ question. */
  title: ReactNode;
  /** Revealed content, e.g. the FAQ answer. */
  children: ReactNode;
  /** Heading level wrapping the header button, for document structure. Default: 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

export function AccordionItem({ value, title, children, headingLevel = 3 }: AccordionItemProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <RadixAccordion.Item value={value}>
      <RadixAccordion.Header asChild>
        <Heading>
          <RadixAccordion.Trigger
            className={cx(
              "group flex w-full cursor-pointer items-start gap-accordion-gap text-left",
              "min-h-accordion-header-height p-accordion-header-padding",
              "bg-surface-default text-default text-body-md",
              "hover:bg-surface-tinted aria-expanded:bg-surface-tinted focus-ring-inset",
            )}
          >
            <span className="flex h-lh shrink-0 items-center">
              <ChevronDownIcon className="size-6 group-aria-expanded:rotate-180" />
            </span>
            <span>{title}</span>
          </RadixAccordion.Trigger>
        </Heading>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="bg-surface-default p-accordion-content-padding text-default text-body-md">
        {children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}
