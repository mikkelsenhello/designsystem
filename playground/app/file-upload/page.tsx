"use client";

import { useState } from "react";
import { FileUpload, Heading, Paragraph } from "../../../src";
import { Preview } from "../Preview";

export default function FileUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Heading level={1} size="lg">
        FileUpload
      </Heading>
      <Preview title="controlled, aspect ratio 16 / 9 (pick an image to see the preview)">
        <div className="flex w-full max-w-md flex-col gap-2">
          <FileUpload label="Bilde" hideLabel name="image" aspectRatio="16 / 9" value={file} onChange={setFile}>
            Trykk for å velge bilde
          </FileUpload>
          <Paragraph size="sm">file: {file ? `${file.name} (${file.size} bytes)` : "none"}</Paragraph>
        </div>
      </Preview>
      <Preview title="label + description, content height; error; disabled">
        <div className="flex w-full max-w-md flex-col gap-6">
          <FileUpload label="Logo" description="PNG eller JPG, maks 2 MB.">
            Slipp bildet her, eller trykk for å velge
          </FileUpload>
          <FileUpload label="Bilde" error="Bildet er større enn 2 MB.">
            Trykk for å velge bilde
          </FileUpload>
          <FileUpload label="Deaktivert" disabled>
            Trykk for å velge bilde
          </FileUpload>
        </div>
      </Preview>
    </>
  );
}
