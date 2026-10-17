import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";

type AsChild = {
  /** Render the single child with the list's styling (e.g. a <menu>). */
  asChild?: boolean;
};

export type ListUnorderedProps = ComponentPropsWithRef<"ul"> & AsChild;
export type ListOrderedProps = ComponentPropsWithRef<"ol"> & AsChild;
export type ListItemProps = ComponentPropsWithRef<"li"> & AsChild;

/** Bulleted list (designsystemet's List.Unordered): order doesn't matter. */
export function ListUnordered({ asChild = false, className, ...props }: ListUnorderedProps) {
  const Comp = asChild ? Slot : "ul";
  return <Comp className={cx("list-spacing", className)} {...props} />;
}

/** Numbered list (designsystemet's List.Ordered): steps, rankings. `start` and `reversed` work as on <ol>. */
export function ListOrdered({ asChild = false, className, ...props }: ListOrderedProps) {
  const Comp = asChild ? Slot : "ol";
  return <Comp className={cx("list-spacing", className)} {...props} />;
}

/** One item in a ListUnordered or ListOrdered. Can hold a nested list. */
export function ListItem({ asChild = false, ...props }: ListItemProps) {
  const Comp = asChild ? Slot : "li";
  return <Comp {...props} />;
}
