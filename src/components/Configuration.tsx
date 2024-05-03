import InputDataCard from "./InputDataCard";
import OptionsCard from "./OptionsCard";
const Configuration = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row md:w-4/5 gap-3 p-4 md:p-0">
      <InputDataCard />
      <OptionsCard />
    </div>
  );
};

export default Configuration;
