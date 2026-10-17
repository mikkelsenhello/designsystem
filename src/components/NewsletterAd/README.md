# NewsletterAd

```tsx
import {
  NewsletterAd, NewsletterAdLabel, NewsletterAdImage, NewsletterAdText, NewsletterAdTitle,
  NewsletterAdMeta, NewsletterAdBody, NewsletterAdOffer, NewsletterAdCode, NewsletterAdAdvertiser,
} from "designsystem";
```

**Extension**, not a designsystemet component: the ad box from the Hva skjer e-mail template (`Hva skjer/Dokumentasjon/annonse-mal.md`), part for part, so a preview on the site matches the e-mail exactly. Values (colors, system font stack, sizes, spacing) are copied into `tokens/components/newsletter-ad.css`. They are **not themed and never dark**: the box sets `data-color-scheme="light"`, so design system components inside it (InlineEditable, FileUpload) render light too.

**Use for:** showing or editing an ad as it will look in the newsletter (the /annonsor preview and editor).

**Don't use for:** ads or promos on the site itself (Card); anything else that should follow the site's theme or dark mode; restyling its parts with your own colors or sizes (change the tokens file, which must stay in step with the e-mail template).

## Parts, in template order

| Part | Element | Template |
|---|---|---|
| `NewsletterAd` | `div` | Box: `#f2f7f5`, 1px `#cfe3dc` border, 6px corners, 20px padding, system font |
| `NewsletterAdLabel` | `p` | "ANNONSE" / "SPONSET": 14px bold, 0.5px tracking, uppercase, muted `#4a7a6b`, 8px below |
| `NewsletterAdImage` | `div` | Holds an `<img className="block w-full">` or a `FileUpload`; 4px corners, 12px below |
| `NewsletterAdText` | `p` | 18px black paragraph holding the next three, 4px below |
| `NewsletterAdTitle` | `a` with `href`, else `span` | Bold, underlined, accent `#007c89` |
| `NewsletterAdMeta` | `span` (block) | Time/place line, italic (optional) |
| `NewsletterAdBody` | `span` (block) | Short description |
| `NewsletterAdOffer` | `div` | Promo box: 16px, 1px dashed muted border, 4px corners, 10px / 14px padding, 12px above (optional) |
| `NewsletterAdCode` | `span` | Code inside Offer: bold, 1px tracking, accent |
| `NewsletterAdAdvertiser` | `p` | "Annonsør: …": 13px muted, 8px above |

All parts take their element's native props. Line height is `normal`: the template sets none.

## Example

```tsx
// Wrong: hex values and sizes copied into the page
<div style={{ background: "#f2f7f5", border: "1px solid #cfe3dc" }}>…</div>

// Right: an editable preview
<NewsletterAd>
  <NewsletterAdLabel>Annonse</NewsletterAdLabel>
  <NewsletterAdImage>
    <FileUpload label="Bilde" hideLabel aspectRatio="16 / 9" value={image} onChange={setImage}>Trykk for å velge bilde</FileUpload>
  </NewsletterAdImage>
  <NewsletterAdText>
    <NewsletterAdTitle><InlineEditable aria-label="Tittel" placeholder="Tittel" value={title} onChange={setTitle} /></NewsletterAdTitle>
    <NewsletterAdMeta><InlineEditable aria-label="Tid og sted" placeholder="Tid på sted (valgfritt)" value={meta} onChange={setMeta} /></NewsletterAdMeta>
    <NewsletterAdBody><InlineEditable aria-label="Beskrivelse" multiline maxLength={300} placeholder="Kort beskrivelse" value={body} onChange={setBody} /></NewsletterAdBody>
  </NewsletterAdText>
  <NewsletterAdOffer>20 % avslag med kode <NewsletterAdCode>{code}</NewsletterAdCode></NewsletterAdOffer>
  <NewsletterAdAdvertiser>Annonsør: {advertiser}</NewsletterAdAdvertiser>
</NewsletterAd>
```

If the e-mail template changes, update `tokens/components/newsletter-ad.css` (and this table) in the same release.
