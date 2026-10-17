"use client";

import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import type { ComponentPropsWithRef, KeyboardEvent, ReactNode } from "react";
import { FieldError } from "../../internal/FieldError";
import { XMarkIcon } from "../../internal/icons";
import { inputClasses } from "../../internal/inputClasses";
import { cx } from "../../utils/cx";
import { Label } from "../Label/Label";

type Ctx = {
  filterText: string;
  filter: boolean;
  selected: string | null;
  activeId: string | null;
  select: (value: string, label: string) => void;
};
const SuggestionContext = createContext<Ctx | null>(null);

export type SuggestionProps = Omit<ComponentPropsWithRef<"input">, "value" | "defaultValue" | "onChange" | "size" | "prefix"> & {
  /** Visible label. Required. */
  label: ReactNode;
  /** Help text between label and input. */
  description?: ReactNode;
  /** Error message; marks the input invalid. */
  error?: ReactNode;
  /** Chosen option's value (controlled). null = nothing chosen. */
  value?: string | null;
  /** Chosen option's value on first render (uncontrolled). */
  defaultValue?: string;
  /** Called with the chosen value (null when the text no longer matches a choice) and its label. */
  onValueChange?: (value: string | null, label: string) => void;
  /** Hide options that don't contain the typed text. Default: true. Set false when you filter yourself (search results from a server). */
  filter?: boolean;
  /** Called on every keystroke with the typed text, e.g. to fetch options. */
  onInputChange?: (text: string) => void;
  /** Shown in the list when no option matches. Default: "Ingen treff". */
  emptyText?: ReactNode;
  /** Screen reader name of the clear button. Default: "Fjern tekst". */
  clearLabel?: string;
  /** SuggestionOption elements. */
  children: ReactNode;
};

/**
 * Type to narrow a list, then pick one (designsystemet's Suggestion, single choice): an input with
 * role="combobox" and a listbox under it. Arrow keys move through the options, Enter picks, Escape closes.
 * `name` submits the chosen value (not the typed text).
 */
export function Suggestion({
  label,
  description,
  error,
  value,
  defaultValue,
  onValueChange,
  filter = true,
  onInputChange,
  emptyText = "Ingen treff",
  clearLabel = "Fjern tekst",
  children,
  id,
  name,
  className,
  onKeyDown,
  onBlur,
  ...props
}: SuggestionProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const listId = `${inputId}-list`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [own, setOwn] = useState<{ value: string | null; label: string }>({ value: defaultValue ?? null, label: "" });
  const selected = value !== undefined ? value : own.value;
  const [text, setText] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  // Show the chosen option's label in the input (also for a value set from outside).
  useEffect(() => {
    if (selected == null) return;
    const option = listRef.current?.querySelector<HTMLElement>(`[data-value="${CSS.escape(selected)}"]`);
    const optionLabel = option?.dataset.label ?? own.label;
    setSelectedLabel(optionLabel);
    setText(optionLabel);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  // While the text is the chosen label, show every option; otherwise filter by the text.
  const filterText = selected != null && text === selectedLabel ? "" : text;

  const visibleOptions = () => [...(listRef.current?.querySelectorAll<HTMLElement>('[role="option"]:not([hidden])') ?? [])];
  useEffect(() => {
    setCount(visibleOptions().length);
    if (activeId && !document.getElementById(activeId)?.matches(":not([hidden])")) setActiveId(null);
  }, [filterText, open, children]); // eslint-disable-line react-hooks/exhaustive-deps

  function select(optionValue: string, optionLabel: string) {
    setOwn({ value: optionValue, label: optionLabel });
    setSelectedLabel(optionLabel);
    setText(optionLabel);
    setOpen(false);
    setActiveId(null);
    onValueChange?.(optionValue, optionLabel);
  }

  function type(next: string) {
    setText(next);
    setOpen(true);
    onInputChange?.(next);
    if (selected != null && next !== selectedLabel) {
      setOwn({ value: null, label: "" });
      onValueChange?.(null, "");
    }
  }

  function move(step: 1 | -1) {
    const options = visibleOptions();
    if (!options.length) return;
    const index = options.findIndex((o) => o.id === activeId);
    const next = options[(index + step + options.length) % options.length] ?? options[0];
    setActiveId(next.id);
    next.scrollIntoView({ block: "nearest" });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) setOpen(true);
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && open && activeId) {
      event.preventDefault();
      document.getElementById(activeId)?.click();
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setActiveId(null);
    }
  }

  const hasText = text !== "";
  return (
    <SuggestionContext.Provider value={{ filterText, filter, selected, activeId, select }}>
      <div className={cx("flex flex-col gap-textfield-gap", className)}>
        <Label htmlFor={inputId}>{label}</Label>
        {description && (
          <p id={descriptionId} className="text-body-md">
            {description}
          </p>
        )}
        <div className="suggestion">
          <input
            {...props}
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={open && activeId ? activeId : undefined}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={describedBy}
            value={text}
            onChange={(event) => type(event.target.value)}
            onClick={() => setOpen((o) => !o)}
            onKeyDown={handleKeyDown}
            onBlur={(event) => {
              onBlur?.(event);
              setOpen(false);
              setActiveId(null);
            }}
            className={cx(inputClasses, "min-h-textfield-height")}
          />
          {name && <input type="hidden" name={name} value={selected ?? ""} />}
          <button
            type="button"
            data-search-clear=""
            aria-label={clearLabel}
            hidden={!hasText || props.disabled || props.readOnly}
            className="focus-ring"
            onClick={() => {
              type("");
              inputRef.current?.focus();
            }}
          >
            <XMarkIcon />
          </button>
          <div ref={listRef} role="listbox" id={listId} hidden={!open} aria-label={typeof label === "string" ? label : undefined}>
            {children}
            {count === 0 && <div data-suggestion-empty="">{emptyText}</div>}
          </div>
          <span className="sr-only" aria-live="polite">
            {open ? `${count} forslag` : ""}
          </span>
        </div>
        {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    </SuggestionContext.Provider>
  );
}

export type SuggestionOptionProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** What is chosen (and submitted with `name`). */
  value: string;
  /** The option's text; matched against what's typed. */
  children: string;
};

/** One option of a Suggestion. */
export function SuggestionOption({ value, children, className, ...props }: SuggestionOptionProps) {
  const ctx = useContext(SuggestionContext);
  const id = useId();
  const matches = !ctx?.filter || children.toLowerCase().includes((ctx?.filterText ?? "").trim().toLowerCase());
  return (
    <div
      {...props}
      id={id}
      role="option"
      data-value={value}
      data-label={children}
      data-active={ctx?.activeId === id ? "" : undefined}
      aria-selected={ctx?.selected === value}
      hidden={!matches}
      className={className}
      // Keep focus in the input while clicking an option.
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => ctx?.select(value, children)}
    >
      {children}
    </div>
  );
}
