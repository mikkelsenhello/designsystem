import type { ComponentPropsWithRef } from "react";
import type { ColorFamily } from "../../types";
import { SpinnerSvg } from "../../internal/SpinnerSvg";

export type SpinnerSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

export type SpinnerProps = Omit<ComponentPropsWithRef<"svg">, "color"> & {
  /** 12 / 20 / 32 / 44 / 60 / 88px. Default: md. */
  size?: SpinnerSize;
  /** Color family. Default: the surrounding data-color context. */
  color?: ColorFamily;
} & (
    | {
        /** What is loading, read by screen readers ("Laster arrangementer"). */
        "aria-label": string;
      }
    | {
        /** Decorative: text next to it already says what is loading. */
        "aria-hidden": true | "true";
        "aria-label"?: string;
      }
  );

/** Loading indicator for an unknown wait (designsystemet's Spinner): an svg with role="img". */
export function Spinner({ size = "md", color, ...props }: SpinnerProps) {
  return <SpinnerSvg role="img" data-size={size} data-color={color} {...props} />;
}
