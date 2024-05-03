export const languageMap = {
  afr: "Afrikaans",
  ara: "Arabic, Macrolanguage",
  hye: "Armenian",
  eus: "Basque",
  ben: "Bengali",
  bre: "Breton",
  bul: "Bulgarian",
  cat: "Catalan, Valencian",
  zho: "Chinese, Macrolanguage",
  hrv: "Croatian",
  ces: "Czech",
  dan: "Danish",
  nld: "Dutch",
  eng: "English",
  epo: "Esperanto",
  est: "Estonian, Macrolanguage",
  fin: "Finnish",
  fra: "French",
  glg: "Galician",
  deu: "German",
  ell: "Greek, Modern",
  guj: "Gujarati",
  hau: "Hausa",
  heb: "Hebrew",
  hin: "Hindi",
  hun: "Hungarian",
  ind: "Indonesian",
  gle: "Irish",
  ita: "Italian",
  jpn: "Japanese",
  kor: "Korean",
  kur: "Kurdish, Macrolanguage",
  lat: "Latin",
  lav: "Latvian, Macrolanguage",
  lit: "Lithuanian",
  lgg: "Lugbara",
  lggNd: "Lugbara, No diacritics",
  msa: "Malay, Macrolanguage",
  mar: "Marathi",
  mya: "Myanmar (Burmese)",
  nob: "Norwegian bokmål",
  fas: "Persian (Farsi)",
  pol: "Polish",
  por: "Portuguese",
  porBr: "Portuguese-Brazilian",
  panGu: "Punjabi (Panjabi), Gurmukhi script",
  ron: "Romanian (Moldavian, Moldovan)",
  rus: "Russian",
  slk: "Slovak",
  slv: "Slovenian",
  som: "Somali",
  sot: "Sotho, Southern",
  spa: "Spanish",
  swa: "Swahili, Macrolanguage",
  swe: "Swedish",
  tgl: "Tagalog (Filipino)",
  tha: "Thai",
  tur: "Turkish",
  ukr: "Ukrainian",
  urd: "Urdu",
  vie: "Vietnamese",
  yor: "Yoruba",
  zul: "Zulu",
};

export const fonts = [
  "Arial",
  "Helvetica",
  "Verdana",
  "Impact",
  "Georgia",
  "Courier",
  "Monaco",
] as const;

// Define a type for the font values
export type FontType = (typeof fonts)[number];

export const DOWNLOAD_FORMATS = ["png", "jpeg", "svg"] as const;

export type DownloadFormatType = (typeof DOWNLOAD_FORMATS)[number];

export const initalCloudData = `
A word cloud visually represents the frequency of words in a text document, with more frequent words appearing larger and less frequent ones smaller. It's often used in data analysis, content summarization, and visualization.

Use Case: Sentiment Analysis of Product Reviews

Imagine you're analyzing customer reviews of a product to understand sentiments. You have a large dataset of reviews and want to quickly identify the most common themes mentioned by customers.

Data Collection: Gather customer reviews from various sources, such as online platforms or surveys.
Text Processing: Clean the text data by removing punctuation, stop words, and irrelevant terms.
Word Frequency Analysis: Count the frequency of each word in the reviews. Words like "great", "quality", or "service" might appear more frequently in positive reviews, while "poor", "problem", or "slow" might appear more in negative ones.
Word Cloud Generation: Generate a word cloud based on the word frequency data. The size of each word in the cloud corresponds to its frequency in the reviews. Common themes or frequently mentioned aspects of the product will appear larger and more prominent.
Visualization: Display the word cloud to visualize the most common words or themes. This provides a quick overview of customer sentiments and allows you to identify key areas for improvement or strengths of the product.
Insights and Action: Analyze the word cloud to gain insights into customer opinions. For example, if the word "excellent" appears prominently, it indicates positive feedback on product quality. Conversely, if "issues" or "broken" stand out, it suggests areas needing attention.
By using a word cloud in this scenario, you can efficiently summarize large volumes of text data, identify patterns, and make data-driven decisions to enhance product quality or address customer concerns.
`;
