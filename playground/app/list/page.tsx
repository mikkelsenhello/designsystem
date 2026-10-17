import { Heading, ListItem, ListOrdered, ListUnordered } from "../../../src";
import { Preview } from "../Preview";

export default function ListPage() {
  return (
    <>
      <Heading level={1} size="lg">
        List
      </Heading>
      <Preview title="unordered, with a nested list">
        <ListUnordered>
          <ListItem>Konserter</ListItem>
          <ListItem>
            Kurs
            <ListUnordered>
              <ListItem>Matlaging</ListItem>
              <ListItem>Keramikk</ListItem>
            </ListUnordered>
          </ListItem>
          <ListItem>Foredrag</ListItem>
        </ListUnordered>
      </Preview>
      <Preview title="ordered">
        <ListOrdered>
          <ListItem>Velg uke</ListItem>
          <ListItem>Lag annonsen</ListItem>
          <ListItem>Betal</ListItem>
        </ListOrdered>
      </Preview>
    </>
  );
}
