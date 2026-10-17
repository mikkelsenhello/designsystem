import NextLink from "next/link";
import { Avatar, AvatarStack, Heading } from "../../../src";
import { Preview } from "../Preview";

const sizes = ["xs", "sm", "md", "lg"] as const;

export default function AvatarPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Avatar
      </Heading>
      <Preview title="sizes xs / sm / md / lg: icon, initials">
        {sizes.map((size) => (
          <Avatar key={size} size={size} aria-label="Ukjent person" />
        ))}
        {sizes.map((size) => (
          <Avatar key={size} size={size} aria-label="Ola Nordmann" initials="ON" />
        ))}
      </Preview>
      <Preview title="colors, square, as link">
        <Avatar aria-label="Kari" initials="KN" color="neutral" />
        <Avatar aria-label="Kari" initials="KN" color="success" />
        <Avatar aria-label="Kari" initials="KN" color="danger" />
        <Avatar aria-label="Kulturhuset" initials="KH" variant="square" />
        <Avatar asChild aria-label="Profil" initials="PR">
          <NextLink href="#" />
        </Avatar>
      </Preview>
      <Preview title="AvatarStack: default, sm with suffix, expandable, expandable fixed">
        <AvatarStack aria-label="Deltakere">
          <Avatar aria-label="Ola" initials="ON" />
          <Avatar aria-label="Kari" initials="KN" color="success" />
          <Avatar aria-label="Per" initials="PH" color="warning" />
          <Avatar aria-label="Ukjent" color="neutral" />
        </AvatarStack>
        <AvatarStack aria-label="Deltakere" size="sm" suffix="+5">
          <Avatar aria-label="Ola" initials="ON" />
          <Avatar aria-label="Kari" initials="KN" color="success" />
          <Avatar aria-label="Per" initials="PH" color="warning" />
        </AvatarStack>
        <AvatarStack aria-label="Deltakere" expandable>
          <Avatar aria-label="Ola" initials="ON" />
          <Avatar aria-label="Kari" initials="KN" color="success" />
          <Avatar aria-label="Per" initials="PH" color="warning" />
        </AvatarStack>
        <AvatarStack aria-label="Deltakere" expandable="fixed" suffix="+2">
          <Avatar aria-label="Ola" initials="ON" />
          <Avatar aria-label="Kari" initials="KN" color="success" />
          <Avatar aria-label="Per" initials="PH" color="warning" />
        </AvatarStack>
      </Preview>
    </>
  );
}
