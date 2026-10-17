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

export function XMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 1 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 0 0-1.06-1.06L12 10.94z" />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2.25A5.75 5.75 0 0 0 5.25 8c0 .052-.017.1-.074.157a.66.66 0 0 1-.325.158A3.25 3.25 0 0 0 5.5 14.75a.75.75 0 0 0 0-1.5 1.75 1.75 0 0 1-.35-3.465c.745-.151 1.6-.747 1.6-1.785a4.25 4.25 0 0 1 8.076-1.854c.288.593.896 1.104 1.68 1.104h.744a3 3 0 0 1 1 5.83.75.75 0 1 0 .5 1.414 4.501 4.501 0 0 0-1.5-8.744h-.745c-.09 0-.236-.066-.33-.26A5.746 5.746 0 0 0 11 2.25m.47 8.22a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 1 1-1.06 1.06l-2.22-2.22v7.69a.75.75 0 0 1-1.5 0v-7.69l-2.22 2.22a.75.75 0 0 1-1.06-1.06z"
      />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        d="M3.25 4A.75.75 0 0 1 4 3.25h16a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75zM11 7.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0m-1.25 3a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 .75.75v4.75h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75v-4h-.75a.75.75 0 0 1-.75-.75"
      />
    </svg>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2.25a.75.75 0 0 1 .66.39l9.52 17.25a.75.75 0 0 1-.65 1.11H2.47a.75.75 0 0 1-.65-1.11l9.52-17.25a.75.75 0 0 1 .66-.39m0 6.5a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75m-1 7.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0"
      />
    </svg>
  );
}

export function SuccessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        d="M12 21.75a9.75 9.75 0 1 0 0-19.5 9.75 9.75 0 0 0 0 19.5m4.95-12.47a.81.81 0 0 0-1.24-1.05l-5.39 6.36-2.62-2.62a.81.81 0 0 0-1.15 1.15l3.25 3.25a.81.81 0 0 0 1.2-.05z"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M9.47 5.97a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 1 1-1.06-1.06L14.44 12 9.47 7.03a.75.75 0 0 1 0-1.06" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M14.53 5.97a.75.75 0 0 1 0 1.06L9.56 12l4.97 4.97a.75.75 0 1 1-1.06 1.06l-5.5-5.5a.75.75 0 0 1 0-1.06l5.5-5.5a.75.75 0 0 1 1.06 0" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2.25A4.75 4.75 0 0 0 7.25 7v2.25H7A1.75 1.75 0 0 0 5.25 11v9c0 .41.34.75.75.75h12a.75.75 0 0 0 .75-.75v-9A1.75 1.75 0 0 0 17 9.25h-.25V7A4.75 4.75 0 0 0 12 2.25m3.25 7V7a3.25 3.25 0 0 0-6.5 0v2.25zM12 13a1.5 1.5 0 0 0-.75 2.8V17a.75.75 0 0 0 1.5 0v-1.2A1.5 1.5 0 0 0 12 13"
      />
    </svg>
  );
}

export function MagnifyingGlassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M10.5 3.25a7.25 7.25 0 1 0 4.57 12.88l5.41 5.41a.75.75 0 1 0 1.06-1.06l-5.41-5.41A7.25 7.25 0 0 0 10.5 3.25M4.75 10.5a5.75 5.75 0 1 1 11.5 0 5.75 5.75 0 0 1-11.5 0" />
    </svg>
  );
}
