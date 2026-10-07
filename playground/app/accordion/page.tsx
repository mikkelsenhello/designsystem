import { Accordion, AccordionItem, Heading, Paragraph } from "../../../src";
import { Preview } from "../Preview";

const faq = [
  ["often", "How often do you send it?", "Once a week, every Friday morning."],
  ["cost", "Does it cost anything?", "No. The newsletter is free, and always will be."],
  ["stop", "How do I unsubscribe?", "Every email has an unsubscribe link at the bottom. One click and you're out."],
];

export default function AccordionPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Accordion
      </Heading>
      <Preview title="single (default), first item open">
        <Accordion defaultOpen={["often"]} className="w-full">
          {faq.map(([value, q, a]) => (
            <AccordionItem key={value} value={value} title={q}>
              <Paragraph>{a}</Paragraph>
            </AccordionItem>
          ))}
        </Accordion>
      </Preview>
      <Preview title='multiple, color="primary"'>
        <Accordion multiple color="primary" className="w-full">
          {faq.map(([value, q, a]) => (
            <AccordionItem key={value} value={value} title={q}>
              <Paragraph>{a}</Paragraph>
            </AccordionItem>
          ))}
        </Accordion>
      </Preview>
    </>
  );
}
