"use client";

import { createContext, useContext, useEffect, useId, useRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";
import { mergeRefs } from "../../utils/mergeRefs";
import { Heading } from "../Heading/Heading";
import type { HeadingProps } from "../Heading/Heading";
import { Link } from "../Link/Link";
import type { LinkProps } from "../Link/Link";
import { ListItem, ListUnordered } from "../List/List";
import type { ListItemProps, ListUnorderedProps } from "../List/List";

const HeadingId = createContext<string | undefined>(undefined);

export type ErrorSummaryProps = ComponentPropsWithRef<"div">;

/**
 * List of everything to fix in a form, shown after a submit fails (designsystemet's ErrorSummary). Gets
 * focus when it appears, so screen readers read it; named by its ErrorSummaryHeading. Each
 * ErrorSummaryLink points at a field's id (href="#email"), so following it moves to the field.
 */
export function ErrorSummary({ className, ref, hidden, ...props }: ErrorSummaryProps) {
  const own = useRef<HTMLDivElement>(null);
  const headingId = useId();

  useEffect(() => {
    if (!hidden) own.current?.focus();
  }, [hidden]);

  const named = props["aria-label"] || props["aria-labelledby"];
  return (
    <HeadingId.Provider value={headingId}>
      <div
        ref={mergeRefs(own, ref)}
        role="group"
        tabIndex={-1}
        hidden={hidden}
        aria-labelledby={named ? undefined : headingId}
        className={cx("error-summary focus-ring", className)}
        {...props}
      />
    </HeadingId.Provider>
  );
}

/** "Rett opp disse feilene før du sender". Level 2 by default. */
export function ErrorSummaryHeading({ level = 2, size = "2xs", id, ...props }: HeadingProps) {
  const headingId = useContext(HeadingId);
  return <Heading level={level} size={size} id={id ?? headingId} {...props} />;
}

export function ErrorSummaryList(props: ListUnorderedProps) {
  return <ListUnordered {...props} />;
}

export function ErrorSummaryItem(props: ListItemProps) {
  return <ListItem {...props} />;
}

/** A Link to the field with the error: href="#<field id>". */
export function ErrorSummaryLink({ color = "neutral", ...props }: LinkProps) {
  return <Link color={color} {...props} />;
}
