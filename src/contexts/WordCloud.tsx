import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FontType, DownloadFormatType } from "../constants";
import { Datum } from "@/types";

type WordCloud = {
  processedData: Datum[];
  setProcessedData: Dispatch<SetStateAction<Datum[]>>;

  font: FontType;
  setFont: Dispatch<SetStateAction<FontType>>;

  format: DownloadFormatType | "";
  setFormat: Dispatch<SetStateAction<DownloadFormatType | "">>;

  backgroundColor: string;
  setBackgroundColor: Dispatch<SetStateAction<string>>;

  removeNumbers: boolean;
  setRemoveNumbers: Dispatch<SetStateAction<boolean>>;

  removeSpecialChars: boolean;
  setRemoveSpecialChars: Dispatch<SetStateAction<boolean>>;
};

const initialValues: WordCloud = {
  processedData: [],
  setProcessedData: () => {},

  font: "Arial",
  setFont: () => {},

  format: "",
  setFormat: () => {},

  backgroundColor: "",
  setBackgroundColor: () => {},

  removeNumbers: true,
  setRemoveNumbers: () => {},

  removeSpecialChars: true,
  setRemoveSpecialChars: () => {},
};

const WordCloudContext = createContext<WordCloud>(initialValues);

export const WordCloudProvider = ({ children }: PropsWithChildren) => {
  const [processedData, setProcessedData] = useState<Datum[]>([]);
  const [font, setFont] = useState<FontType>("Arial");
  const [format, setFormat] = useState<DownloadFormatType | "">("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [removeNumbers, setRemoveNumbers] = useState(true);
  const [removeSpecialChars, setRemoveSpecialChars] = useState(true);

  return (
    <WordCloudContext.Provider
      value={{
        processedData,
        setProcessedData,

        font,
        setFont,

        format,
        setFormat,

        backgroundColor,
        setBackgroundColor,

        removeNumbers,
        setRemoveNumbers,

        removeSpecialChars,
        setRemoveSpecialChars,
      }}
    >
      {children}
    </WordCloudContext.Provider>
  );
};

export const useWordCloud = () => {
  return useContext(WordCloudContext);
};
