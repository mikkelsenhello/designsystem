import { Heading, Paragraph, Skeleton } from "../../../src";
import { Preview } from "../Preview";

export default function SkeletonPage() {
  return (
    <>
      <Heading level={1} size="lg">
        Skeleton
      </Heading>
      <Preview title="rectangle (aspect ratio), circle, text (characters=120): pulsing">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Skeleton aspectRatio="16 / 9" />
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={40} />
            <Skeleton variant="text" characters={20} />
          </div>
          <Paragraph>
            <Skeleton variant="text" characters={120} />
          </Paragraph>
        </div>
      </Preview>
      <Preview title="static: placeholder newsletter post">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Skeleton static height={120} />
          <Heading level={3} size="xs">
            <Skeleton static variant="text" characters={24} />
          </Heading>
          <Paragraph>
            <Skeleton static variant="text" characters={140} />
          </Paragraph>
        </div>
      </Preview>
    </>
  );
}
