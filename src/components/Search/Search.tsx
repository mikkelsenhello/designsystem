"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ComponentPropsWithRef, Dispatch, RefObject, SetStateAction } from "react";
import { XMarkIcon } from "../../internal/icons";
import { inputClasses } from "../../internal/inputClasses";
import { cx } from "../../utils/cx";
import { mergeRefs } from "../../utils/mergeRefs";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

type SearchContext = {
  hasValue: boolean;
  setHasValue: Dispatch<SetStateAction<boolean>>;
  input: RefObject<HTMLInputElement | null>;
};
const Ctx = createContext<SearchContext | null>(null);

export type SearchProps = ComponentPropsWithRef<"div">;

/**
 * Search field (designsystemet's Search): SearchInput with a magnifying glass, an optional SearchClear
 * (×, shown while there is text) and an optional SearchButton joined to the end. Put it in a
 * <form role="search"> that handles the submit, or react to the input's onChange for live filtering.
 */
export function Search({ className, ...props }: SearchProps) {
  const [hasValue, setHasValue] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  return (
    <Ctx.Provider value={{ hasValue, setHasValue, input }}>
      <div className={cx("search", className)} {...props} />
    </Ctx.Provider>
  );
}

export type SearchInputProps = Omit<ComponentPropsWithRef<"input">, "type" | "size" | "readOnly"> & {
  /** Default: search. */
  type?: "search" | "text";
  /** Name for screen readers when there is no visible label ("Søk i arrangementer"). */
  "aria-label"?: string;
};

export function SearchInput({ type = "search", className, ref, onChange, ...props }: SearchInputProps) {
  const ctx = useContext(Ctx);
  const setHasValue = ctx?.setHasValue;
  const controlled = props.value !== undefined;
  const value = String(props.value ?? props.defaultValue ?? "");
  useEffect(() => {
    if (controlled || !ctx?.input.current) setHasValue?.(value !== "");
    else setHasValue?.(ctx.input.current.value !== "");
    // Re-check whenever a controlled value changes.
  }, [controlled, value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <input
      {...props}
      ref={mergeRefs(ctx?.input, ref)}
      type={type}
      onChange={(event) => {
        setHasValue?.(event.target.value !== "");
        onChange?.(event);
      }}
      className={cx(inputClasses, "min-h-textfield-height", className)}
    />
  );
}

export type SearchClearProps = Omit<ComponentPropsWithRef<"button">, "children"> & {
  /** Default: "Fjern tekst". */
  "aria-label"?: string;
};

/** The × inside the input's end. Empties the input (firing its onChange) and puts focus back in it. */
export function SearchClear({ "aria-label": label = "Fjern tekst", onClick, ...props }: SearchClearProps) {
  const ctx = useContext(Ctx);
  return (
    <button
      type="button"
      aria-label={label}
      data-search-clear=""
      hidden={!ctx?.hasValue}
      className="focus-ring"
      onClick={(event) => {
        onClick?.(event);
        const input = ctx?.input.current;
        if (event.defaultPrevented || !input) return;
        // Set the value the way typing does, so React's onChange (and a controlled value) follow.
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
        setter?.call(input, "");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.focus();
      }}
      {...props}
    >
      <XMarkIcon />
    </button>
  );
}

export type SearchButtonProps = ButtonProps & {
  /** Default: primary. */
  variant?: "primary" | "secondary";
};

/** Submit button joined to the input. Text defaults to "Søk". */
export function SearchButton({ children = "Søk", variant = "primary", ...props }: SearchButtonProps) {
  return (
    <Button type="submit" variant={variant} data-search-button="" {...props}>
      {children}
    </Button>
  );
}
