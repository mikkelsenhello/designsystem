import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";
import type { ColorFamily } from "../../types";
import { ChevronLeftIcon, ChevronRightIcon } from "../../internal/icons";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import type { ButtonSize } from "../Button/Button";

export type PaginationProps = Omit<ComponentPropsWithRef<"nav">, "onChange" | "color"> & {
  /** The page shown now, from 1. */
  current: number;
  /** Number of pages. */
  total: number;
  /** How many items to show between the previous and next buttons, ellipses included. Default: 7. */
  show?: number;
  /** Buttons: called with the page to go to. */
  onChange?: (page: number) => void;
  /** Links instead of buttons: the URL of a page, e.g. (page) => `?side=${page}`. */
  href?: (page: number) => string;
  /** Element for the links, e.g. Next.js `Link`. Default: <a>. Used with `href`. */
  linkAs?: ElementType;
  /** Default: md. */
  size?: ButtonSize;
  /** Color family of the current page. Default: primary. */
  color?: ColorFamily;
  /** Name of the navigation landmark. Default: "Bla i sider". */
  "aria-label"?: string;
  /** Screen reader name of the previous button. Default: "Forrige side". */
  prevLabel?: string;
  /** Screen reader name of the next button. Default: "Neste side". */
  nextLabel?: string;
};

/**
 * Which pages to show (designsystemet's pagination logic): 0 marks an ellipsis. The first and last page
 * stay visible, the current page stays near the middle.
 */
export function paginationSteps(current: number, total: number, show = 7) {
  const offset = (show - 1) / 2;
  const start = Math.max(Math.min(current - Math.floor(offset), total - show + 1), 1);
  const end = Math.min(Math.max(current + Math.ceil(offset), show), total);
  const pages = Array.from({ length: end + 1 - start }, (_, i) => i + start);
  if (show > 4 && start > 1) pages.splice(0, 2, 1, 0);
  if (show > 3 && end < total) pages.splice(-2, 2, 0, total);
  return pages;
}

/**
 * Navigation between pages of a long list (designsystemet's Pagination): previous, page numbers with
 * ellipses, next. The current page is a primary Button (aria-current), the others tertiary. Buttons with
 * `onChange`, or links with `href`.
 */
export function Pagination({
  current,
  total,
  show = 7,
  onChange,
  href,
  linkAs: LinkComp = "a",
  size = "md",
  color = "primary",
  "aria-label": label = "Bla i sider",
  prevLabel = "Forrige side",
  nextLabel = "Neste side",
  className,
  ...props
}: PaginationProps) {
  const prev = current > 1 ? current - 1 : 0;
  const next = current < total ? current + 1 : 0;

  function item(page: number, content: ReactNode, extra: { label?: string; isCurrent?: boolean; icon?: boolean }) {
    const missing = page === 0;
    const common = {
      variant: extra.isCurrent ? ("primary" as const) : ("tertiary" as const),
      size,
      color,
      icon: extra.icon,
      "aria-label": extra.label,
      "aria-hidden": missing || undefined,
      tabIndex: missing ? -1 : undefined,
      className: missing ? "invisible" : undefined,
    };
    if (href) {
      return (
        <Button asChild {...common}>
          <LinkComp href={missing ? undefined : href(page)} aria-current={extra.isCurrent ? "page" : undefined}>
            {content}
          </LinkComp>
        </Button>
      );
    }
    return (
      <Button {...common} aria-current={extra.isCurrent ? "true" : undefined} onClick={missing ? undefined : () => onChange?.(page)}>
        {content}
      </Button>
    );
  }

  return (
    <nav aria-label={label} className={className} {...props}>
      <ul className="m-0 flex flex-wrap items-center gap-pagination-gap p-0">
        <li>{item(prev, <ChevronLeftIcon className="size-6" />, { label: prevLabel, icon: true })}</li>
        {paginationSteps(current, total, show).map((page, index) => (
          <li key={`${page}-${index}`}>
            {page === 0 ? (
              <Button asChild variant="tertiary" size={size} color={color} className="pointer-events-none">
                <span aria-hidden="true">…</span>
              </Button>
            ) : (
              item(page, page, { isCurrent: page === current })
            )}
          </li>
        ))}
        <li>{item(next, <ChevronRightIcon className="size-6" />, { label: nextLabel, icon: true })}</li>
      </ul>
    </nav>
  );
}
