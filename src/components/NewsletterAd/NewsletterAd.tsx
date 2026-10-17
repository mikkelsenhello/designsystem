import type { ComponentPropsWithRef } from "react";
import { cx } from "../../utils/cx";

// The ad box from the Hva skjer e-mail template (annonse-mal.md), part for part. Values are fixed in
// tokens/components/newsletter-ad.css: not themed, never dark. Order inside the box, as in the template:
// Label → Image → Text (Title, Meta, Body) → Offer (with Code) → Advertiser.

export type NewsletterAdProps = ComponentPropsWithRef<"div">;

/** The box. Always light (e-mails are light), so design system components inside render light too. */
export function NewsletterAd({ className, ...props }: NewsletterAdProps) {
  return (
    <div
      data-color-scheme="light"
      className={cx(
        "rounded-newsletter-ad border-width-newsletter-ad border-newsletter-ad bg-newsletter-ad p-newsletter-ad-padding",
        "font-newsletter-ad text-newsletter-ad-body text-newsletter-ad",
        className,
      )}
      {...props}
    />
  );
}

/** "ANNONSE" or "SPONSET", top left. */
export function NewsletterAdLabel({ className, ...props }: ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cx("m-0 mb-newsletter-ad-label-gap text-newsletter-ad-label uppercase text-newsletter-ad-muted", className)}
      {...props}
    />
  );
}

/** Holds the image (an <img className="block w-full"> or a FileUpload), with the template's corners and gap. */
export function NewsletterAdImage({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div className={cx("mb-newsletter-ad-image-gap overflow-hidden rounded-newsletter-ad-image", className)} {...props} />
  );
}

/** The 18px paragraph holding Title, Meta and Body, one per line. */
export function NewsletterAdText({ className, ...props }: ComponentPropsWithRef<"p">) {
  return <p className={cx("m-0 mb-newsletter-ad-body-gap text-newsletter-ad-body text-newsletter-ad", className)} {...props} />;
}

export type NewsletterAdTitleProps = ComponentPropsWithRef<"a">;

/** Title: bold, underlined, accent color. A link when `href` is set (as in the e-mail), plain text otherwise (editor). */
export function NewsletterAdTitle({ className, href, ...props }: NewsletterAdTitleProps) {
  const classes = cx("block font-newsletter-ad-title text-newsletter-ad-accent underline", className);
  return href ? <a href={href} className={classes} {...props} /> : <span className={classes} {...props} />;
}

/** Optional time/place line, in italics. */
export function NewsletterAdMeta({ className, ...props }: ComponentPropsWithRef<"span">) {
  return <span className={cx("block italic", className)} {...props} />;
}

/** Short description. */
export function NewsletterAdBody({ className, ...props }: ComponentPropsWithRef<"span">) {
  return <span className={cx("block", className)} {...props} />;
}

/** Optional promo code box: "20 % avslag med kode <NewsletterAdCode>AGS323</NewsletterAdCode>". */
export function NewsletterAdOffer({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cx(
        "mt-newsletter-ad-offer-gap w-fit rounded-newsletter-ad-offer border-width-newsletter-ad-offer border-newsletter-ad-muted",
        "px-newsletter-ad-offer-padding-x py-newsletter-ad-offer-padding-y text-newsletter-ad-offer text-newsletter-ad",
        className,
      )}
      {...props}
    />
  );
}

/** The code inside an Offer: bold, spaced out, accent color. */
export function NewsletterAdCode({ className, ...props }: ComponentPropsWithRef<"span">) {
  return (
    <span className={cx("font-newsletter-ad-code tracking-newsletter-ad-code text-newsletter-ad-accent", className)} {...props} />
  );
}

/** "Annonsør: …" / "Avsender: …", bottom line. */
export function NewsletterAdAdvertiser({ className, ...props }: ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cx("m-0 mt-newsletter-ad-advertiser-gap text-newsletter-ad-advertiser text-newsletter-ad-muted", className)}
      {...props}
    />
  );
}
