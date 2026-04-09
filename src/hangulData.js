export const consonants = [
  { char: "ㄱ", romaji: "g/k", sound: "g", group: "basic-consonants" },
  { char: "ㄴ", romaji: "n", sound: "n", group: "basic-consonants" },
  { char: "ㄷ", romaji: "d/t", sound: "d", group: "basic-consonants" },
  { char: "ㄹ", romaji: "r/l", sound: "r", group: "basic-consonants" },
  { char: "ㅁ", romaji: "m", sound: "m", group: "basic-consonants" },
  { char: "ㅂ", romaji: "b/p", sound: "b", group: "basic-consonants" },
  { char: "ㅅ", romaji: "s", sound: "s", group: "basic-consonants" },
  { char: "ㅇ", romaji: "ng/silent", sound: "ng", group: "basic-consonants" },
  { char: "ㅈ", romaji: "j", sound: "j", group: "basic-consonants" },
  { char: "ㅊ", romaji: "ch", sound: "ch", group: "aspirated-consonants" },
  { char: "ㅋ", romaji: "k", sound: "k", group: "aspirated-consonants" },
  { char: "ㅌ", romaji: "t", sound: "t", group: "aspirated-consonants" },
  { char: "ㅍ", romaji: "p", sound: "p", group: "aspirated-consonants" },
  { char: "ㅎ", romaji: "h", sound: "h", group: "aspirated-consonants" },
  { char: "ㄲ", romaji: "kk", sound: "kk", group: "tense-consonants" },
  { char: "ㄸ", romaji: "tt", sound: "tt", group: "tense-consonants" },
  { char: "ㅃ", romaji: "pp", sound: "pp", group: "tense-consonants" },
  { char: "ㅆ", romaji: "ss", sound: "ss", group: "tense-consonants" },
  { char: "ㅉ", romaji: "jj", sound: "jj", group: "tense-consonants" },
];

export const vowels = [
  { char: "ㅏ", romaji: "a", sound: "a", group: "basic-vowels-vertical" },
  { char: "ㅑ", romaji: "ya", sound: "ya", group: "basic-vowels-vertical" },
  { char: "ㅓ", romaji: "eo", sound: "eo", group: "basic-vowels-vertical" },
  { char: "ㅕ", romaji: "yeo", sound: "yeo", group: "basic-vowels-vertical" },
  { char: "ㅣ", romaji: "i", sound: "i", group: "basic-vowels-vertical" },

  { char: "ㅗ", romaji: "o", sound: "o", group: "basic-vowels-horizontal" },
  { char: "ㅛ", romaji: "yo", sound: "yo", group: "basic-vowels-horizontal" },
  { char: "ㅜ", romaji: "u", sound: "u", group: "basic-vowels-horizontal" },
  { char: "ㅠ", romaji: "yu", sound: "yu", group: "basic-vowels-horizontal" },
  { char: "ㅡ", romaji: "eu", sound: "eu", group: "basic-vowels-horizontal" },

  { char: "ㅐ", romaji: "ae", sound: "ae", group: "compound-vowels-vertical" },
  {
    char: "ㅒ",
    romaji: "yae",
    sound: "yae",
    group: "compound-vowels-vertical",
  },
  { char: "ㅔ", romaji: "e", sound: "e", group: "compound-vowels-vertical" },
  { char: "ㅖ", romaji: "ye", sound: "ye", group: "compound-vowels-vertical" },

  {
    char: "ㅘ",
    romaji: "wa",
    sound: "wa",
    group: "compound-vowels-horizontal",
  },
  {
    char: "ㅙ",
    romaji: "wae",
    sound: "wae",
    group: "compound-vowels-horizontal",
  },
  {
    char: "ㅚ",
    romaji: "oe",
    sound: "oe",
    group: "compound-vowels-horizontal",
  },
  {
    char: "ㅝ",
    romaji: "wo",
    sound: "wo",
    group: "compound-vowels-horizontal",
  },
  {
    char: "ㅞ",
    romaji: "we",
    sound: "we",
    group: "compound-vowels-horizontal",
  },
  {
    char: "ㅟ",
    romaji: "wi",
    sound: "wi",
    group: "compound-vowels-horizontal",
  },
  {
    char: "ㅢ",
    romaji: "ui",
    sound: "ui",
    group: "compound-vowels-horizontal",
  },
];

export const groupLabels = {
  "basic-consonants": "Basic consonants (g k n d t r l m b p s ng j)",
  "aspirated-consonants": "Aspirated (ch k t p h)",
  "tense-consonants": "Tense / doubled (kk tt pp ss jj)",
  "basic-vowels-vertical": "Basic vowels (a ya eo yeo i)",
  "basic-vowels-horizontal": "Basic vowels (o yo u yu eu)",
  "compound-vowels-vertical": "Compound vowels (ae yae e ye)",
  "compound-vowels-horizontal": "Compound vowels (wa wae oe wo we wi ui)",
};

export const fonts = [
  { id: "default", label: "Default", family: "'Noto Sans KR', sans-serif" },
  { id: "serif", label: "Serif", family: "'Noto Serif KR', serif" },
  { id: "gothic", label: "Gothic", family: "'Black Han Sans', sans-serif" },
  { id: "dotum", label: "Dotum", family: "'Nanum Gothic', sans-serif" },
  { id: "myungjo", label: "Myungjo", family: "'Nanum Myeongjo', serif" },
];

export const ALL_GROUPS = Object.keys(groupLabels);

export const allChars = { consonants, vowels };
