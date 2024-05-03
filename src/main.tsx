import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { WordCloudProvider } from "./contexts/WordCloud.tsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WordCloudProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </WordCloudProvider>
  </React.StrictMode>
);
