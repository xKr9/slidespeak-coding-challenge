import { FC } from 'react';
import {PdfIcon} from "@/icons/PdfIcon";
import {CheckIcon} from "@/icons/CheckIcon";

type DownloadFileStepProps = {
  // TODO: Add the required props.
};

export const DownloadFileStep: FC<DownloadFileStepProps> = () => {
  // TODO: Replace with the actual compressed file URL from S3.
  const result = 'https://google.com';

  const onConvertAgain = () => {
    // TODO: Implement the logic to go back to the first step.
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full items-center flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <PdfIcon />
        <div className="mt-[-16px]">
          <CheckIcon />
        </div>
        <p className="text-lg font-semibold text-gray-800">File converted successfully!</p>
      </div>
      <div className="flex w-full gap-3">
        <button
          type="button"
          title="Compress another presentation."
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
          onClick={onConvertAgain}
        >
          Convert another
        </button>
        <a
          href={result}
          type="button"
          title="Compress this PowerPoint document."
          className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
          id="download-button"
        >
          Download file
        </a>
      </div>
    </div>
  );
};
