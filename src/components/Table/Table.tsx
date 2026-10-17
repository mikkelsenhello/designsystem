import type { AriaAttributes, ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { cx } from "../../utils/cx";

export type TableProps = Omit<ComponentPropsWithRef<"table">, "border" | "color"> & {
  /** Striped rows. */
  zebra?: boolean;
  /** Keep the header row visible while scrolling (put the table in a scrolling container). */
  stickyHeader?: boolean;
  /** Frame with rounded corners. */
  border?: boolean;
  /** Highlight the row under the pointer, for tables where rows are acted on. */
  hover?: boolean;
  /** Color family of lines, stripes and hover. Default: the surrounding data-color context. */
  color?: ColorFamily;
};

/**
 * Data in rows and columns (designsystemet's Table): a native <table>. Build it from TableHead, TableBody,
 * TableFoot, TableRow, TableHeaderCell and TableCell; a <caption> as first child names it.
 */
export function Table({ zebra, stickyHeader, border, hover, color, className, ...props }: TableProps) {
  return (
    <table
      data-zebra={zebra || undefined}
      data-sticky-header={stickyHeader || undefined}
      data-border={border || undefined}
      data-hover={hover || undefined}
      data-color={color}
      className={cx("table-ds", className)}
      {...props}
    />
  );
}

export function TableHead(props: ComponentPropsWithRef<"thead">) {
  return <thead {...props} />;
}

export function TableBody(props: ComponentPropsWithRef<"tbody">) {
  return <tbody {...props} />;
}

export function TableFoot(props: ComponentPropsWithRef<"tfoot">) {
  return <tfoot {...props} />;
}

export function TableRow(props: ComponentPropsWithRef<"tr">) {
  return <tr {...props} />;
}

export function TableCell(props: ComponentPropsWithRef<"td">) {
  return <td {...props} />;
}

export type TableHeaderCellProps = ComponentPropsWithRef<"th"> & {
  /**
   * Makes the column sortable: the header becomes a button with a sort icon. "none" = sortable, not sorted.
   * Handle the click with onClick on this cell and update `sort` yourself.
   */
  sort?: AriaAttributes["aria-sort"];
};

export function TableHeaderCell({ sort, children, ...props }: TableHeaderCellProps) {
  return (
    <th aria-sort={sort} {...props}>
      {sort ? <button type="button">{children}</button> : children}
    </th>
  );
}
