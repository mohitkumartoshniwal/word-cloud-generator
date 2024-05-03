import { memo, useEffect, useRef, useState } from "react";
import cloud from "d3-cloud";
import { BaseType, ValueFn, select } from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { useWordCloud } from "@/contexts/WordCloud";
import { toJpeg, toPng, toSvg } from "html-to-image";
import { DOWNLOAD_FORMATS } from "@/constants";

export interface Word extends cloud.Word {
  text: string;
  value: number;
}

type WordCloudProps = {
  font?: string | ((word: Word, index: number) => string);
  fontSize?: number | ((word: Word, index: number) => number);
  rotate?: number | ((word: Word, index: number) => number);
  spiral?:
    | "archimedean"
    | "rectangular"
    | ((size: [number, number]) => (t: number) => [number, number]);
  padding?: number | ((word: Word, index: number) => number);
  random?: () => number;
  fill?: ValueFn<SVGTextElement, Word, string>;
  onWordClick?: (
    this: BaseType,
    event: React.MouseEvent<SVGTextElement, MouseEvent>,
    d: Word
  ) => void;
  onWordMouseOver?: (
    this: BaseType,
    event: React.MouseEvent<SVGTextElement, MouseEvent>,
    d: Word
  ) => void;
  onWordMouseOut?: (
    this: BaseType,
    event: React.MouseEvent<SVGTextElement, MouseEvent>,
    d: Word
  ) => void;
};

const defaultScaleOrdinal = scaleOrdinal(schemeCategory10);

const _WordCloud = ({
  // font = "serif",
  fontSize = (d) => d.value,
  rotate = () => Math.random() * 120 - 60,
  spiral = "archimedean",
  padding = 2,
  random = Math.random,
  fill = (_, i) => defaultScaleOrdinal(i.toString()),
  onWordClick,
  onWordMouseOver,
  onWordMouseOut,
}: WordCloudProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const { processedData, font, format, setFormat, backgroundColor } =
    useWordCloud();
  const [generatedData, setGeneratedData] = useState<Word[]>([]);

  useEffect(() => {
    const visibleData: Word[] = processedData
      .filter((data) => data.isVisible)
      .map((data) => {
        return {
          text: data.word,
          value: data.frequency * 25,
        };
      });
    setGeneratedData(visibleData);
  }, [processedData]);

  useEffect(() => {
    if (!svgRef.current) return;

    svgRef.current.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  useEffect(() => {
    function handleResize() {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    }

    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;
    setDimensions({ width: initialWidth, height: initialHeight });

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!format) return;

    if (svgRef.current === null) {
      return;
    }

    if (format === DOWNLOAD_FORMATS[0]) {
      toPng(svgRef.current as unknown as HTMLElement, {
        cacheBust: true,
        backgroundColor,
      })
        .then((dataUrl) => download(dataUrl))
        .catch((err: Error) => {
          console.error(err);
        });
    } else if (format === DOWNLOAD_FORMATS[1]) {
      toJpeg(svgRef.current as unknown as HTMLElement, {
        cacheBust: true,

        backgroundColor,
      })
        .then((dataUrl) => download(dataUrl))
        .catch((err: Error) => {
          console.error(err);
        });
    } else if (format === DOWNLOAD_FORMATS[2]) {
      toSvg(svgRef.current as unknown as HTMLElement, {
        cacheBust: true,
        backgroundColor,
      })
        .then((dataUrl) => download(dataUrl))
        .catch((err: Error) => {
          console.error(err);
        });
    }

    setFormat("");

    function download(dataUrl: string) {
      const link = document.createElement("a");
      link.download = `word-cloud.${format}`;
      link.href = dataUrl;
      link.click();
    }
  }, [format, setFormat]);

  useEffect(() => {
    if (!svgRef.current) return;

    const layout = cloud<Word>()
      .size([dimensions.width, dimensions.height])
      .words(generatedData)
      .font(font)
      .fontSize(fontSize)
      .rotate(rotate)
      .spiral(spiral)
      .padding(padding)
      .random(random)
      .on("end", draw);

    layout.start();

    function draw(words: Word[]) {
      const svg = select(svgRef.current);

      svg.selectAll("*").remove();

      const texts = svg
        .append("g")
        .attr(
          "transform",
          `translate(${dimensions.width / 2},${dimensions.height / 2})`
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style(
          "font-family",
          ((d) => d.font) as ValueFn<SVGTextElement, Word, string>
        )
        .style(
          "font-style",
          ((d) => d.style) as ValueFn<SVGTextElement, Word, string>
        )
        .style(
          "font-weight",
          ((d) => d.weight) as ValueFn<SVGTextElement, Word, string | number>
        )
        .style(
          "font-size",
          ((d) => `${d.size}px`) as ValueFn<SVGTextElement, Word, string>
        )

        .style("fill", fill)
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
        )
        .text((d) => d.text);

      if (onWordClick) {
        texts.on("click", onWordClick);
      }

      if (onWordMouseOver) {
        texts.on("mouseover", onWordMouseOver);
      }

      if (onWordMouseOut) {
        texts.on("mouseout", onWordMouseOut);
      }
    }
  }, [dimensions.width, dimensions.height, generatedData]);

  return (
    <svg
      ref={svgRef}
      className="wordcloud-container border-2 rounded-sm shadow-lg"
    />
  );
};

export const WordCloud = memo(_WordCloud);
