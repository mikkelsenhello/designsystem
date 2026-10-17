import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";

export type SkeletonVariant = "rectangle" | "circle" | "text";

export type SkeletonProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  /** rectangle = image/block (default), circle = avatar, text = stand-in for a run of text. */
  variant?: SkeletonVariant;
  /** Width (CSS length or px number). Rectangle default: full width. Ignored by text (use `characters`). */
  width?: string | number;
  /** Height (CSS length or px number). Default: one line of the surrounding text (1.3em). */
  height?: string | number;
  /** CSS aspect ratio, e.g. "16 / 9". Use with width for image blocks; overrides the default height. */
  aspectRatio?: string;
  /** text only: how many characters of placeholder text. Wraps like text, so the last line ends up shorter. Default: 1. */
  characters?: number;
  /** Turn the pulse off: a still grey shape. */
  static?: boolean;
};

const variantClasses: Record<SkeletonVariant, string> = {
  rectangle: "block w-full rounded-skeleton",
  circle: "block aspect-square size-skeleton-height rounded-full",
  // Smaller font with wider letters: same line length as real text, with gaps between the lines.
  text: "inline rounded-full text-transparent skeleton-text box-decoration-clone wrap-break-word",
};

/**
 * Decorative placeholder for content that isn't there yet (designsystemet's Skeleton). Always hidden from
 * screen readers: announce loading elsewhere if it matters.
 */
export function Skeleton({
  variant = "rectangle",
  width,
  height,
  aspectRatio,
  characters = 1,
  static: isStatic = false,
  className,
  style,
  ...props
}: SkeletonProps) {
  const isText = variant === "text";
  return (
    <span
      aria-hidden="true"
      data-variant={variant}
      className={cx(
        "pointer-events-none select-none bg-neutral-surface-tinted forced-color-adjust-none",
        !isStatic && "skeleton-pulse",
        variantClasses[variant],
        variant === "rectangle" && !aspectRatio && "h-skeleton-height",
        className,
      )}
      // ds-allow: sizes are per-instance values from props, like designsystemet's width/height props
      style={isText ? style : { width, height: height ?? (variant === "circle" ? width : undefined), aspectRatio, ...style }}
      {...props}
    >
      {isText ? "-".repeat(Math.max(1, characters)) : null}
    </span>
  );
}
