"use client";

import { useState } from "react";
import { Heading, Table, TableBody, TableCell, TableFoot, TableHead, TableHeaderCell, TableRow } from "../../../src";
import { Preview } from "../Preview";

const rows = [
  { week: 42, ads: 3, price: 1500 },
  { week: 43, ads: 5, price: 2500 },
  { week: 44, ads: 1, price: 500 },
];

export default function TablePage() {
  const [sort, setSort] = useState<"ascending" | "descending" | "none">("none");
  const sorted = sort === "none" ? rows : [...rows].sort((a, b) => (sort === "ascending" ? a.ads - b.ads : b.ads - a.ads));
  const next = () => setSort(sort === "ascending" ? "descending" : "ascending");
  const head = (
    <TableHead>
      <TableRow>
        <TableHeaderCell>Uke</TableHeaderCell>
        <TableHeaderCell sort={sort} onClick={next}>
          Annonser
        </TableHeaderCell>
        <TableHeaderCell>Pris</TableHeaderCell>
      </TableRow>
    </TableHead>
  );
  const body = (
    <TableBody>
      {sorted.map((r) => (
        <TableRow key={r.week}>
          <TableCell>Uke {r.week}</TableCell>
          <TableCell>{r.ads}</TableCell>
          <TableCell>{r.price} kr</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
  return (
    <>
      <Heading level={1} size="lg">
        Table
      </Heading>
      <Preview title="default, caption, sortable column, footer">
        <Table>
          <caption>Bestillinger</caption>
          {head}
          {body}
          <TableFoot>
            <TableRow>
              <TableCell>Sum</TableCell>
              <TableCell>9</TableCell>
              <TableCell>4500 kr</TableCell>
            </TableRow>
          </TableFoot>
        </Table>
      </Preview>
      <Preview title="border + zebra + hover">
        <Table border zebra hover>
          {head}
          {body}
        </Table>
      </Preview>
    </>
  );
}
