import { Heading, Select, SelectOptgroup, SelectOption } from "../../../src";
import { Preview } from "../Preview";

export default function SelectPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Select
      </Heading>
      <Preview title="default, description, optgroup">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Select label="Kategori" defaultValue="">
            <SelectOption value="" disabled>
              Velg kategori
            </SelectOption>
            <SelectOption value="konsert">Konsert</SelectOption>
            <SelectOption value="kurs">Kurs</SelectOption>
            <SelectOption value="foredrag">Foredrag</SelectOption>
          </Select>
          <Select label="Sted" description="Hvor skjer det?">
            <SelectOptgroup label="Sentrum">
              <SelectOption>Kulturhuset</SelectOption>
              <SelectOption>Biblioteket</SelectOption>
            </SelectOptgroup>
            <SelectOptgroup label="Utenfor sentrum">
              <SelectOption>Idrettshallen</SelectOption>
            </SelectOptgroup>
          </Select>
        </div>
      </Preview>
      <Preview title="error, readOnly, disabled, width auto">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Select label="Kategori" error="Velg en kategori" defaultValue="">
            <SelectOption value="">Velg kategori</SelectOption>
          </Select>
          <Select label="Uke" readOnly defaultValue="42">
            <SelectOption value="42">Uke 42</SelectOption>
            <SelectOption value="43">Uke 43</SelectOption>
          </Select>
          <Select label="Disabled" disabled>
            <SelectOption>Konsert</SelectOption>
          </Select>
          <Select label="Width auto" width="auto">
            <SelectOption>Kort</SelectOption>
            <SelectOption>Et litt lengre valg</SelectOption>
          </Select>
        </div>
      </Preview>
    </>
  );
}
