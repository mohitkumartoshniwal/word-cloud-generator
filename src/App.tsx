import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import Configuration from "./components/Configuration";
import { WordCloud } from "./components/WordCloud";

const App = () => {
  return (
    <div className="w-full flex flex-col items-center  md:p-5 gap-3 ">
      <div className="md:w-4/5 mt-4 md:mt-0 flex justify-end gap-2">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mohitkumartoshniwal"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/mohitkumartoshniwal/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={30} color="blue" />
        </a>
        <a
          href="https://x.com/MohitToshniwal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={30} color="blue" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCZwpQ59mtSdFzKYEnk3cbeA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube size={30} color="red" />
        </a>
      </div>
      <Configuration />
      <WordCloud
      // onWordClick={(_event, d) => {
      //   console.log(`onWordClick: ${d.text}`);
      // }}
      />
    </div>
  );
};

export default App;
