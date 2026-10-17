"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type TabsProps = Omit<ComponentPropsWithRef<"div">, "onChange" | "defaultValue" | "dir" | "color"> & {
  /** Selected tab (controlled). */
  value?: string;
  /** Selected tab on first render (uncontrolled). */
  defaultValue?: string;
  /** Called with the newly selected tab's value. */
  onChange?: (value: string) => void;
  /** Color of the selected tab. Default: primary. */
  color?: ColorFamily;
};

/**
 * Switch between panels of related content in one place (designsystemet's Tabs, on Radix: arrow keys move
 * between tabs, Tab moves into the panel). Children: TabsList of TabsTab, then one TabsPanel per tab.
 */
export function Tabs({ value, defaultValue, onChange, color = "primary", className, ...props }: TabsProps) {
  return (
    <RadixTabs.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      data-color={color}
      className={cx("tabs", className)}
      {...props}
    />
  );
}

export function TabsList(props: ComponentPropsWithRef<"div">) {
  return <RadixTabs.List {...props} />;
}

export type TabsTabProps = Omit<ComponentPropsWithRef<"button">, "value"> & {
  /** Matches the TabsPanel it shows. */
  value: string;
};

export function TabsTab(props: TabsTabProps) {
  return <RadixTabs.Trigger {...props} />;
}

export type TabsPanelProps = ComponentPropsWithRef<"div"> & {
  /** Matches its TabsTab. */
  value: string;
};

export function TabsPanel(props: TabsPanelProps) {
  return <RadixTabs.Content {...props} />;
}
