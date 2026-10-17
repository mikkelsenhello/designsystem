/** designsystemet's placement names ("bottom-end"), split into Radix's side and align. */
export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export function splitPlacement(placement: Placement) {
  const [side, align = "center"] = placement.split("-") as [
    "top" | "bottom" | "left" | "right",
    ("start" | "end" | "center")?,
  ];
  return { side, align };
}
