import { ChipCheckbox, ChipGroup, ChipRadio, Heading } from "../../../src";
import { Preview } from "../Preview";

export default function ChipPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Chip
      </Heading>
      <Preview title="ChipCheckbox in a ChipGroup (multi-choice)">
        <ChipGroup legend="Målgruppe">
          <ChipCheckbox value="student" defaultChecked>
            Student
          </ChipCheckbox>
          <ChipCheckbox value="familie">Familie</ChipCheckbox>
          <ChipCheckbox value="voksen" defaultChecked>
            Ung voksen / voksen
          </ChipCheckbox>
          <ChipCheckbox value="pensjonist">Pensjonist</ChipCheckbox>
        </ChipGroup>
      </Preview>
      <Preview title="ChipRadio (single choice; ChipGroup groups them)">
        <ChipGroup legend="Tidspunkt">
          <ChipRadio value="alle" defaultChecked>
            Hele uka
          </ChipRadio>
          <ChipRadio value="idag">I dag</ChipRadio>
          <ChipRadio value="helg">Helg</ChipRadio>
        </ChipGroup>
      </Preview>
      <Preview title='color="neutral", disabled'>
        <ChipGroup legend="Type" color="neutral">
          <ChipCheckbox defaultChecked>Konsert</ChipCheckbox>
          <ChipCheckbox>Teater</ChipCheckbox>
          <ChipCheckbox disabled>Utsolgt</ChipCheckbox>
          <ChipCheckbox disabled defaultChecked>
            Låst
          </ChipCheckbox>
        </ChipGroup>
      </Preview>
    </>
  );
}
