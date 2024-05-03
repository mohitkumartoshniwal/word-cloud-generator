import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { WordCloudProvider } from "./contexts/WordCloud.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WordCloudProvider>
      <App />
    </WordCloudProvider>
  </React.StrictMode>
);
