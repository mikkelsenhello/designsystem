"use client";

import { Slot } from "@radix-ui/react-slot";
import { useLayoutEffect, useRef } from "react";
import type { ClipboardEvent, ComponentPropsWithRef, DragEvent, FormEvent, KeyboardEvent, ReactElement } from "react";
import { cx } from "../../utils/cx";

export type InlineEditableProps = Omit<
  ComponentPropsWithRef<"span">,
  "children" | "onChange" | "defaultValue" | "contentEditable" | "aria-label"
> & {
  /** Current text (controlled). */
  value: string;
  /** Called with the new plain text on every edit. */
  onChange: (value: string) => void;
  /** Accessible name, e.g. "Tittel". Required: the text itself is the value, not a label. */
  "aria-label": string;
  /** Shown faded while empty, e.g. "Skriv en tittel". */
  placeholder?: string;
  /** Allow line breaks (Enter). Default: single line, Enter does nothing. */
  multiline?: boolean;
  /** Most characters allowed. Typing and pasting stop there. */
  maxLength?: number;
  /** Also submit the text with a form, under this name (a hidden input). */
  name?: string;
  /** Edit inside your own element instead of a span: pass it as the only child, with no children of its own. */
  asChild?: boolean;
  /** With asChild: the element to edit in, e.g. <strong /> or <p />. */
  children?: ReactElement;
};

/** Plain text of the element: innerText keeps line breaks; a lone trailing newline is the browser's filler. */
function readText(el: HTMLElement, multiline: boolean) {
  const text = el.innerText.replace(/\n$/, "");
  return multiline ? text : text.replace(/\n/g, " ");
}

/**
 * Text that looks exactly like the final text (it inherits font, size, weight and color) but can be edited in
 * place (extension: designsystemet has no inline editor). Plain text only: pasted formatting is dropped.
 */
export function InlineEditable({
  value,
  onChange,
  placeholder,
  multiline = false,
  maxLength,
  name,
  asChild = false,
  className,
  onKeyDown,
  onPaste,
  ref,
  children,
  ...props
}: InlineEditableProps) {
  const elRef = useRef<HTMLElement>(null);
  const Component = asChild ? Slot : "span";

  // contentEditable is uncontrolled DOM: write the value in only when it differs, so the caret stays put while typing.
  useLayoutEffect(() => {
    const el = elRef.current;
    if (el && readText(el, multiline) !== value) el.textContent = value;
  }, [value, multiline]);

  function insert(text: string) {
    const el = elRef.current;
    if (!el) return;
    let insertText = multiline ? text.replace(/\r\n?/g, "\n") : text.replace(/[\r\n]+/g, " ");
    if (maxLength !== undefined) {
      const selected = window.getSelection()?.toString().length ?? 0;
      const room = maxLength - (readText(el, multiline).length - selected);
      insertText = insertText.slice(0, Math.max(0, room));
    }
    // execCommand keeps the browser's undo history; it is deprecated but still the only way to do that.
    if (insertText) document.execCommand("insertText", false, insertText);
  }

  function handleBeforeInput(event: FormEvent<HTMLElement>) {
    const native = event.nativeEvent as InputEvent;
    if (native.inputType === "insertText" && native.data && maxLength !== undefined) {
      event.preventDefault();
      insert(native.data);
    }
    if (!multiline && (native.inputType === "insertParagraph" || native.inputType === "insertLineBreak")) {
      event.preventDefault();
    }
  }

  function handleInput() {
    const el = elRef.current;
    if (!el) return;
    let text = readText(el, multiline);
    // Backstop for edits that skip beforeinput (autocomplete, spellcheck replacements, execCommand).
    if (maxLength !== undefined && text.length > maxLength) {
      text = text.slice(0, maxLength);
      el.textContent = text;
      window.getSelection()?.selectAllChildren(el);
      window.getSelection()?.collapseToEnd();
    }
    if (text === "" && el.childNodes.length) el.textContent = ""; // drop a leftover <br>, so the placeholder shows
    onChange(text);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    onKeyDown?.(event as KeyboardEvent<HTMLSpanElement>);
    if (!multiline && event.key === "Enter") event.preventDefault();
    if (multiline && event.key === "Enter" && !event.defaultPrevented) {
      // A plain newline, not the <div>/<br> the browser would add.
      event.preventDefault();
      insert("\n");
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLElement>) {
    onPaste?.(event as ClipboardEvent<HTMLSpanElement>);
    event.preventDefault();
    insert(event.clipboardData.getData("text/plain"));
  }

  return (
    <>
      <Component
        {...props}
        ref={(node: HTMLElement | null) => {
          elRef.current = node;
          if (typeof ref === "function") ref(node as HTMLSpanElement);
          else if (ref) ref.current = node as HTMLSpanElement;
        }}
        role="textbox"
        aria-multiline={multiline || undefined}
        aria-placeholder={placeholder}
        contentEditable="plaintext-only"
        suppressContentEditableWarning
        spellCheck={props.spellCheck ?? true}
        data-placeholder={placeholder}
        data-empty={value === "" ? "" : undefined}
        onBeforeInput={handleBeforeInput}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onDrop={(event: DragEvent<HTMLElement>) => event.preventDefault()} // dropped text could carry formatting or exceed maxLength
        children={asChild ? children : undefined}
        className={cx(
          // pre-wrap: typed spaces and newlines show as typed, and long single-line text still wraps like the final text.
          "inline-edit cursor-text whitespace-pre-wrap wrap-break-word rounded-inline-edit focus-ring transition-colors",
          className,
        )}
      />
      {name !== undefined && <input type="hidden" name={name} value={value} />}
    </>
  );
}
