"use client";

import { useState } from "react";
import { ChooseFileStep } from "@/components/ChooseFileStep";
import { ConvertFileStep } from "../ConvertFileStep";
import { DownloadFileStep } from "@/components/DownloadFileStep";

type Step = "CHOOSE_FILE" | "CONVERT" | "DOWNLOAD";

export const PowerPointToPdfConverter = () => {
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<Step>("CHOOSE_FILE");
  const [file, setFile] = useState<File | null>(null);

  switch (currentStep) {
    case "CHOOSE_FILE":
      return (
        <ChooseFileStep
          onFileDrop={(file) => {
            setFile(file);
            setCurrentStep("CONVERT");
          }}
        />
      );
    case "CONVERT":
      return (
        <ConvertFileStep
          onConvertSuccess={(url) => {
            setDownloadLink(url);
            setCurrentStep("DOWNLOAD");
          }}
          currentFile={file}
          onCancel={() => {
            setFile(null);
            setCurrentStep("CHOOSE_FILE");
          }}
        />
      );
    case "DOWNLOAD":
      return (
        <DownloadFileStep
          downloadUrl={downloadLink}
          onConvertAgain={() => {
            setFile(null);
            setDownloadLink("");
            setCurrentStep("CHOOSE_FILE");
          }}
        />
      );
  }
};
