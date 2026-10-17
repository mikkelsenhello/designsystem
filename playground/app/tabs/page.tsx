"use client";

import { Heading, Paragraph, Tabs, TabsList, TabsPanel, TabsTab } from "../../../src";
import { Preview } from "../Preview";

export default function TabsPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Tabs
      </Heading>
      <Preview title="default (primary) with a disabled tab; neutral">
        <div className="flex w-full flex-col gap-8">
          <Tabs defaultValue="uke">
            <TabsList>
              <TabsTab value="uke">Denne uka</TabsTab>
              <TabsTab value="neste">Neste uke</TabsTab>
              <TabsTab value="arkiv">Arkiv</TabsTab>
              <TabsTab value="av" disabled>
                Av
              </TabsTab>
            </TabsList>
            <TabsPanel value="uke">
              <Paragraph>12 arrangementer denne uka.</Paragraph>
            </TabsPanel>
            <TabsPanel value="neste">
              <Paragraph>Neste uke.</Paragraph>
            </TabsPanel>
            <TabsPanel value="arkiv">
              <Paragraph>Arkiv.</Paragraph>
            </TabsPanel>
          </Tabs>
          <Tabs defaultValue="b" color="neutral">
            <TabsList>
              <TabsTab value="a">Første</TabsTab>
              <TabsTab value="b">Andre</TabsTab>
            </TabsList>
            <TabsPanel value="a">A</TabsPanel>
            <TabsPanel value="b">B</TabsPanel>
          </Tabs>
        </div>
      </Preview>
    </>
  );
}
