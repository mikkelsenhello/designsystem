"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type { ComponentPropsWithRef, ReactNode, RefObject } from "react";
import { XMarkIcon } from "../../internal/icons";
import { cx } from "../../utils/cx";
import { mergeRefs } from "../../utils/mergeRefs";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";

const DialogRef = createContext<RefObject<HTMLDialogElement | null> | null>(null);

/** Connects a DialogTrigger to the Dialog next to it, so the trigger can open it without state. */
export function DialogTriggerContext({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  return <DialogRef.Provider value={ref}>{children}</DialogRef.Provider>;
}

/** A Button that opens the Dialog in the same DialogTriggerContext. */
export function DialogTrigger({ onClick, ...props }: ButtonProps) {
  const ref = useContext(DialogRef);
  return (
    <Button
      aria-haspopup="dialog"
      onClick={(event) => {
        onClick?.(event);
        const dialog = ref?.current;
        if (event.defaultPrevented || !dialog || dialog.open) return;
        if (dialog.dataset.modal === "false") dialog.show();
        else dialog.showModal();
      }}
      {...props}
    />
  );
}

export type DialogProps = Omit<ComponentPropsWithRef<"dialog">, "onClose" | "open"> & {
  /** Controlled: open or close it from state. Without it, use DialogTrigger (or the ref's showModal()). */
  open?: boolean;
  /** Called when the user closes it (close button, Escape, backdrop). Not called when `open` turns false. */
  onClose?: (event: Event) => void;
  /** Modal (default): the page behind is inert and dimmed. false: a dialog people can work next to. */
  modal?: boolean;
  /** center (default), or a drawer from an edge: top, bottom, left, right. */
  placement?: "center" | "top" | "bottom" | "left" | "right";
  /** Name of the × button for screen readers; false hides the button. Default: "Lukk dialogvindu". */
  closeButton?: string | false;
  /** What closes it: "closerequest" = Escape and the × (default), "any" = also a click on the backdrop, "none" = only your own buttons. */
  closedby?: "none" | "closerequest" | "any";
};

/**
 * A window over the page for a task that needs full attention: confirm, a short form (designsystemet's
 * Dialog, on a native <dialog>: focus is trapped and returned, Escape closes). Name it with a Heading inside
 * (aria-labelledby) or aria-label. DialogBlock splits it into sections with dividers.
 */
export function Dialog({
  open,
  onClose,
  modal = true,
  placement = "center",
  closeButton = "Lukk dialogvindu",
  closedby = "closerequest",
  className,
  ref,
  onCancel,
  onClick,
  children,
  ...props
}: DialogProps) {
  const contextRef = useContext(DialogRef);
  const own = useRef<HTMLDialogElement>(null);
  const skipClose = useRef(false);

  useEffect(() => {
    const dialog = own.current;
    if (!dialog || open === undefined || open === dialog.open) return;
    if (open) {
      if (modal) dialog.showModal();
      else dialog.show();
    } else {
      skipClose.current = true;
      dialog.close();
    }
  }, [open, modal]);

  return (
    <dialog
      ref={mergeRefs(own, contextRef ?? undefined, ref)}
      data-dialog=""
      data-placement={placement}
      data-modal={modal}
      className={cx("dialog", className)}
      onClose={(event) => {
        if (event.target !== event.currentTarget) return;
        if (!skipClose.current) onClose?.(event.nativeEvent);
        skipClose.current = false;
      }}
      onCancel={(event) => {
        onCancel?.(event);
        if (closedby === "none") event.preventDefault();
      }}
      onClick={(event) => {
        onClick?.(event);
        const dialog = event.currentTarget;
        if (closedby !== "any" || event.defaultPrevented || event.target !== dialog) return;
        // A click on the dialog element itself outside its box is a click on the backdrop.
        const box = dialog.getBoundingClientRect();
        const outside =
          event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
        if (outside) dialog.close();
      }}
      {...props}
    >
      {closeButton !== false && (
        <Button
          data-dialog-close=""
          icon
          variant="tertiary"
          color="neutral"
          aria-label={closeButton}
          onClick={() => own.current?.close()}
        >
          <XMarkIcon className="size-6" />
        </Button>
      )}
      {children}
    </dialog>
  );
}

/** A section of a Dialog with its own padding; blocks get a divider between them (header, body, footer). */
export function DialogBlock({ className, ...props }: ComponentPropsWithRef<"div">) {
  return <div data-dialog-block="" className={className} {...props} />;
}
