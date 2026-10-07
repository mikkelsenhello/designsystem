import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Paths from designsystemet.no (MIT), see NOTICE.md.
export function ErrorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        d="M7.74 2.47a.75.75 0 0 1 .53-.22h7.46a.75.75 0 0 1 .53.22l5.27 5.27c.14.14.22.33.22.53v7.46a.75.75 0 0 1-.22.53l-5.27 5.27a.75.75 0 0 1-.53.22H8.27a.75.75 0 0 1-.53-.22l-5.27-5.27a.75.75 0 0 1-.22-.53V8.27a.75.75 0 0 1 .22-.53zm1.29 5.5a.75.75 0 0 0-1.06 1.06L10.94 12l-2.97 2.97a.75.75 0 1 0 1.06 1.06L12 13.06l2.97 2.97a.75.75 0 1 0 1.06-1.06L13.06 12l2.97-2.97a.75.75 0 0 0-1.06-1.06L12 10.94z"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M5.97 9.47a.75.75 0 0 1 1.06 0L12 14.44l4.97-4.97a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 0 1 0-1.06" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 12.5l4 4 8-9" />
    </svg>
  );
}
