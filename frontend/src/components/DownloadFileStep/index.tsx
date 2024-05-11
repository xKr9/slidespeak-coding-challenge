import { FC } from "react";
import { PdfIcon } from "@/icons/PdfIcon";
import { CheckIcon } from "@/icons/CheckIcon";

type DownloadFileStepProps = {
  downloadUrl: string;
  onConvertAgain: () => void;
};

export const DownloadFileStep: FC<DownloadFileStepProps> = ({
  onConvertAgain,
  downloadUrl,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex w-full items-center flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center">
        <PdfIcon />
        <div className="mt-[-16px]">
          <CheckIcon />
        </div>
        <p className="text-lg font-semibold text-gray-800">
          File converted successfully!
        </p>
      </div>
      <div className="flex w-full gap-3">
        <button
          type="button"
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
          onClick={onConvertAgain}
        >
          Convert another
        </button>
        <a
          href={downloadUrl}
          download={downloadUrl}
          type="button"
          className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
        >
          Download file
        </a>
      </div>
    </div>
  );
};
