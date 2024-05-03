import { useWordCloud } from "@/contexts/WordCloud";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DOWNLOAD_FORMATS,
  DownloadFormatType,
  FontType,
  fonts,
} from "@/constants";
import ColorPicker from "./ui/colorpicker";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuGroup } from "./ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/columns";
import { Checkbox } from "./ui/checkbox";

const OptionsCard = () => {
  const {
    font,
    setFont,
    setFormat,
    backgroundColor,
    setBackgroundColor,
    processedData,
    removeNumbers,
    setRemoveNumbers,
    removeSpecialChars,
    setRemoveSpecialChars,
  } = useWordCloud();

  const visibleWords = processedData.filter((data) => data.isVisible);

  return (
    <Card className="flex-2 bg-purple-100 ">
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>
          Customize your word cloud with the options below
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-y-4 gap-x-4 md:gap-x-0 ">
        <Select
          defaultValue={font}
          onValueChange={(value) => setFont(value as FontType)}
        >
          <SelectTrigger className="w-[130px] md:w-[180px]">
            <SelectValue placeholder="Select Font" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel>Fonts</SelectLabel>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full flex-1" variant="outline">
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-24 shadow-md rounded-sm ">
            <DropdownMenuGroup>
              {DOWNLOAD_FORMATS.map((format) => (
                <DropdownMenuItem
                  className="text-center cursor-pointer"
                  key={format}
                  onClick={() => setFormat(format as DownloadFormatType)}
                >
                  {format.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-4 md:gap-8">
          <label>Background Color</label>
          <ColorPicker color={backgroundColor} setColor={setBackgroundColor} />
        </div>

        <Dialog>
          <DialogTrigger asChild className="flex-1 ">
            <Button
              variant={"ghost"}
              className={`w-full bg-white `}
              disabled={processedData.length === 0}
            >
              Edit Words
            </Button>
          </DialogTrigger>
          <DialogContent className=" w-[90%] sm:w-4/5 rounded-sm md:max-w-2xl h-3/4 md:h-3/4 gap-2 ">
            <DialogHeader className="w-[90%] sm:w-full ">
              <DialogTitle className="text-center">Words </DialogTitle>
              <DialogDescription className="font-light text-center">
                <span className="flex gap-1 justify-center">
                  <span>
                    <span className="font-bold">{visibleWords.length} </span>
                    words in the word cloud
                  </span>
                  {processedData.length - visibleWords.length > 0 && (
                    <span>
                      | {processedData.length - visibleWords.length} hidden
                    </span>
                  )}
                </span>
              </DialogDescription>
              <DataTable columns={columns} data={processedData} />
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="col-span-2 md:col-span-1 flex items-center gap-2">
          <Checkbox
            id="remove-numbers"
            checked={removeNumbers}
            onCheckedChange={(checked) => setRemoveNumbers(checked as boolean)}
          />
          <label htmlFor="remove-numbers">Remove Numbers</label>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center gap-2 ">
          <Checkbox
            id="remove-special-characters"
            checked={removeSpecialChars}
            onCheckedChange={(checked) =>
              setRemoveSpecialChars(checked as boolean)
            }
          />
          <label htmlFor="remove-special-characters">
            Remove Special Characters
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionsCard;
