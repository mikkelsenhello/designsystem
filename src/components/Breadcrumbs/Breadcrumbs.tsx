"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";
import { mergeRefs } from "../../utils/mergeRefs";
import { Link } from "../Link/Link";
import type { LinkProps } from "../Link/Link";

export type BreadcrumbsProps = ComponentPropsWithRef<"div"> & {
  /** Name of the navigation landmark. Default: "Du er her:". */
  "aria-label"?: string;
};

/**
 * Where the current page sits in the site's hierarchy (designsystemet's Breadcrumbs). Children: a
 * BreadcrumbsList of BreadcrumbsItem > BreadcrumbsLink, last item = the current page. Optionally a
 * BreadcrumbsLink placed directly inside: a back link ("Tilbake til Arkiv"), shown instead of the list on
 * narrow screens. The last link gets aria-current="page"; while only the back link shows, the element is
 * not a navigation landmark (as designsystemet's web component does it).
 */
export function Breadcrumbs({ "aria-label": label = "Du er her:", className, ref, ...props }: BreadcrumbsProps) {
  const own = useRef<HTMLDivElement>(null);
  const [listShown, setListShown] = useState(true);

  useEffect(() => {
    const self = own.current;
    if (!self) return;
    const update = () => {
      const links = self.getElementsByTagName("a");
      const last = links[links.length - 1];
      const lastInList = last && last.parentElement !== self ? last : null;
      for (const link of links) {
        if (link === lastInList) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      }
      setListShown(!!lastInList?.offsetHeight);
    };
    update();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 100);
    };
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(update);
    observer.observe(self, { childList: true, subtree: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={mergeRefs(own, ref)}
      role={listShown ? "navigation" : undefined}
      aria-label={listShown ? label : undefined}
      className={cx("breadcrumbs", className)}
      {...props}
    />
  );
}

export function BreadcrumbsList(props: ComponentPropsWithRef<"ol">) {
  return <ol {...props} />;
}

export function BreadcrumbsItem(props: ComponentPropsWithRef<"li">) {
  return <li {...props} />;
}

/** A Link (all its props, including `asChild` for router links). */
export function BreadcrumbsLink(props: LinkProps) {
  return <Link {...props} />;
}
