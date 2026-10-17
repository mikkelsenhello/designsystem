# Tabs, TabsList, TabsTab, TabsPanel

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "designsystem";
```

After designsystemet's Tabs, on Radix Tabs: a row of tabs with a line under the selected one, each showing its panel. Arrow keys move between tabs, Tab moves into the panel.

**Use for:** switching between panels of related content in the same place ("Denne uka" / "Neste uke" / "Arkiv").

**Don't use for:** navigating to other pages (links in the site navigation); switching a mode or view of one thing right away with no separate panels (ToggleGroup); steps in a process.

## Props

`Tabs`: `value` / `onChange` (controlled), `defaultValue`, `color` (selected tab, default `primary`).
`TabsTab`: `value` (matches a panel), `disabled`, `<button>` props. Icons inside are 24px.
`TabsPanel`: `value`.
`TabsList`: wraps the tabs; scrolls sideways when they don't fit.

## Example

```tsx
// Wrong: ToggleGroup/Buttons that swap content, no tab roles
<ToggleGroup value={tab} onChange={setTab}>…</ToggleGroup>{tab === "uke" && <List />}

// Right
<Tabs defaultValue="uke">
  <TabsList>
    <TabsTab value="uke">Denne uka</TabsTab>
    <TabsTab value="neste">Neste uke</TabsTab>
  </TabsList>
  <TabsPanel value="uke">…</TabsPanel>
  <TabsPanel value="neste">…</TabsPanel>
</Tabs>
```

Tokens: `tokens/components/tabs.css` (padding, indicator, border); styles in `tokens/utilities/tabs.css`.
