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