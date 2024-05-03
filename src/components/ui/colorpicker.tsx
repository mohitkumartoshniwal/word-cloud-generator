import { useRef } from "react";

type Props = {
  color: string;
  setColor: (color: string) => void;
};

const ColorPicker = ({ color, setColor }: Props) => {
  const colorPickerRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="flex items-center relative">
      <div
        className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => {
          colorPickerRef.current?.click();
        }}
      ></div>
      <input
        type="color"
        ref={colorPickerRef}
        className="absolute top-4 opacity-0"
        value={color}
        onChange={handleChange}
      />
    </div>
  );
};
export default ColorPicker;
