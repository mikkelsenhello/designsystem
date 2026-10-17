"use client";

import { useState } from "react";
import {
  FileUpload,
  Heading,
  InlineEditable,
  NewsletterAd,
  NewsletterAdAdvertiser,
  NewsletterAdBody,
  NewsletterAdCode,
  NewsletterAdImage,
  NewsletterAdLabel,
  NewsletterAdMeta,
  NewsletterAdOffer,
  NewsletterAdText,
  NewsletterAdTitle,
  Skeleton,
} from "../../../src";
import { Preview } from "../Preview";

function Example() {
  return (
    <NewsletterAd className="w-full max-w-xl">
      <NewsletterAdLabel>Annonse</NewsletterAdLabel>
      <NewsletterAdImage>
        <Skeleton static aspectRatio="16 / 9" />
      </NewsletterAdImage>
      <NewsletterAdText>
        <NewsletterAdTitle href="https://hva-skjer-norge.no">Meld deg på keramikkurs</NewsletterAdTitle>
        <NewsletterAdMeta>Torsdager 18:00 på Leirverkstedet</NewsletterAdMeta>
        <NewsletterAdBody>
          Lær å dreie din egen kopp eller skål fra bunnen av – ingen erfaring nødvendig, bare skitne hender og god
          stemning. Kr 450 per kveld.
        </NewsletterAdBody>
      </NewsletterAdText>
      <NewsletterAdOffer>
        20 % avslag med kode <NewsletterAdCode>AGS323</NewsletterAdCode>
      </NewsletterAdOffer>
      <NewsletterAdAdvertiser>Annonsør: Leirverkstedet</NewsletterAdAdvertiser>
    </NewsletterAd>
  );
}

function Editor() {
  const [ad, setAd] = useState({ title: "", meta: "", body: "", code: "", advertiser: "" });
  const [image, setImage] = useState<File | null>(null);
  const set = (key: keyof typeof ad) => (value: string) => setAd((prev) => ({ ...prev, [key]: value }));
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Skeleton static height={64} />
      <NewsletterAd>
        <NewsletterAdLabel>Annonse</NewsletterAdLabel>
        <NewsletterAdImage>
          <FileUpload label="Bilde" hideLabel aspectRatio="16 / 9" value={image} onChange={setImage}>
            Trykk for å velge bilde
          </FileUpload>
        </NewsletterAdImage>
        <NewsletterAdText>
          <NewsletterAdTitle>
            <InlineEditable aria-label="Tittel" placeholder="Tittel" value={ad.title} onChange={set("title")} maxLength={80} />
          </NewsletterAdTitle>
          <NewsletterAdMeta>
            <InlineEditable aria-label="Tid og sted" placeholder="Tid på sted (valgfritt)" value={ad.meta} onChange={set("meta")} />
          </NewsletterAdMeta>
          <NewsletterAdBody>
            <InlineEditable
              aria-label="Beskrivelse"
              placeholder="Kort beskrivelse av tilbudet, maks et par setninger."
              multiline
              maxLength={300}
              value={ad.body}
              onChange={set("body")}
            />
          </NewsletterAdBody>
        </NewsletterAdText>
        <NewsletterAdOffer>
          20 % avslag med kode{" "}
          <NewsletterAdCode>
            <InlineEditable aria-label="Rabattkode" placeholder="KODE" value={ad.code} onChange={set("code")} maxLength={20} />
          </NewsletterAdCode>
        </NewsletterAdOffer>
        <NewsletterAdAdvertiser>
          Annonsør:{" "}
          <InlineEditable aria-label="Annonsør" placeholder="Bedriftsnavn" value={ad.advertiser} onChange={set("advertiser")} />
        </NewsletterAdAdvertiser>
      </NewsletterAd>
      <Skeleton static height={64} />
    </div>
  );
}

export default function NewsletterAdPage() {
  return (
    <>
      <Heading level={1} size="lg">
        NewsletterAd
      </Heading>
      <Preview title="template example 1 (always light, also in the dark panel)">
        <Example />
      </Preview>
      <Preview title="editor: InlineEditable + FileUpload inside, Skeleton posts around">
        <Editor />
      </Preview>
    </>
  );
}
