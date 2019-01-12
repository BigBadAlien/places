import * as React from 'react';
import { ChangeEvent } from "react";

interface Props {
  onLoad: (content: string | ArrayBuffer | null) => void;
  onError: (error: ProgressEvent) => void;
}

export const InputFile: React.SFC<Props> = (props) => {
  const handleFileChosen = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const file = changeEvent.target.files && changeEvent.target.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        props.onLoad(fileReader.result);
      };

      fileReader.onerror = (event) => {
        props.onError(event);
      };
      fileReader.readAsText(file);
    }
  };

  return <input
    type="file"
    accept=".csv"
    onChange={handleFileChosen}
  />;
};
