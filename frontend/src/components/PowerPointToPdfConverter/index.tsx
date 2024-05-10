'use client';

import {useState} from "react";
import {ChooseFileStep} from "@/components/ChooseFileStep";
import {ConvertFileStep} from "@/components/CompressFileStep";
import {DownloadFileStep} from "@/components/DownloadFileStep";

type Step = 'CHOOSE_FILE' | 'CONVERT' | 'DOWNLOAD';

export const PowerPointToPdfConverter = () => {
  const [currentStep, setCurrentStep] = useState<Step>('CHOOSE_FILE')

  // TODO: Implement all of the logic to switch between steps and share the application state between the steps.

  switch (currentStep) {
    case 'CHOOSE_FILE':
      return <ChooseFileStep />
    case 'CONVERT':
      return <ConvertFileStep />
    case 'DOWNLOAD':
      return <DownloadFileStep />
  }
}