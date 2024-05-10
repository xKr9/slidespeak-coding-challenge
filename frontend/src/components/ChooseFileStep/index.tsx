import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@/icons/UploadIcon';

type ChooseFileStepProps = {
  // TODO: Add the required props.
};

const MAX_POWERPOINT_COMPRESS_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const ChooseFileStep: FC<ChooseFileStepProps> = () => {
  const handleFileDrop = (files: File[]) => {
    if (files.length > 0) {
      // TODO: Handle the file drop event.
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback(handleFileDrop, []),
    accept: {
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    },
    maxSize: MAX_POWERPOINT_COMPRESS_FILE_SIZE,
    maxFiles: 1,
  });

  return (
    <div
      className="group cursor-pointer rounded-xl border border-dashed border-gray-400 bg-white px-6 py-16"
      {...getRootProps()}
    >
      <input {...getInputProps()} id="choose-file-input" />
      <div className="flex shrink-0 grow-0 flex-col items-center gap-2">
        <div className="mb-2 rounded-full bg-gray-100 p-2">
          <div className="grid place-items-center rounded-full bg-gray-200 p-2 [&>svg]:size-8">
            <UploadIcon />
          </div>
        </div>
        <p className="text-sm leading-8 text-gray-600">
          Drag and drop a PowerPoint file to reduce its file size.
        </p>
        <button
          type="button"
          title="Choose a PowerPoint file to optimize."
          className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm text-blue-700 transition-colors group-hover:bg-blue-100"
        >
          Choose file
        </button>
      </div>
    </div>
  );
};
