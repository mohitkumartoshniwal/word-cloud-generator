import { removeStopwords, eng } from "stopword";

import { useWordCloud } from "@/contexts/WordCloud";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Button } from "./ui/button";
import { generateWordCloud } from "@/utils";

const InputDataCard = () => {
  const [inputData, setInputData] = useState("");
  const { setProcessedData, removeNumbers, removeSpecialChars } =
    useWordCloud();

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputData(e.target.value);
    // const data = removeSpecialCharacters(e.target.value);
  }

  function processData() {
    let regex;

    if (!removeNumbers && !removeSpecialChars) {
      regex = /[\t\n ]+/;
    } else if (!removeNumbers) {
      regex = /[\W\t\n ]+/;
    } else if (!removeSpecialChars) {
      regex = /[\d\t\n ]+/;
    } else {
      regex = /[\W\d\t\n ]+/;
    }

    const filteredData = removeStopwords(inputData.split(regex), eng);
    const processedData = generateWordCloud(filteredData);
    setProcessedData(processedData);
  }

  function clear() {
    setInputData("");
    setProcessedData([]);
  }

  return (
    <Card className="flex-1 bg-purple-100 w-full ">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <span>Type/Paste Text</span>
            <Button
              className="py-0 font-semibold"
              variant={"ghost"}
              onClick={clear}
            >
              &#10005;
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Paste or type your text to generate your free word cloud
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          className="resize-none h-28 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-border"
          value={inputData}
          onChange={handleChange}
        />
        <div className="mt-4 flex justify-center">
          <Button
            variant={"ghost"}
            className="border-2 border-black"
            onClick={processData}
          >
            Visualize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InputDataCard;
