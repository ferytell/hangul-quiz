# 한 Hangul Quiz

Practice reading Korean hangul consonants and vowels.

## Features

- All consonants: basic (ㄱ–ㅈ), aspirated (ㅊ ㅋ ㅌ ㅍ ㅎ), tense/doubled (ㄲ ㄸ ㅃ ㅆ ㅉ)
- All vowels: basic (ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ), compound (ㅐ ㅔ ㅘ ㅙ...)
- 5 Korean font styles
- Multiple accepted answers (e.g. g/k for ㄱ)
- Streak, accuracy, pool size tracking
- Dark / light theme
- All settings saved via localStorage — no server required

## Getting Started

```bash
npm install
npm run dev
```

## Character Groups

### Consonants

| Group     | Characters                 |
| --------- | -------------------------- |
| Basic     | ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ |
| Aspirated | ㅊ ㅋ ㅌ ㅍ ㅎ             |
| Tense     | ㄲ ㄸ ㅃ ㅆ ㅉ             |

### Vowels

| Group    | Characters                       |
| -------- | -------------------------------- |
| Basic    | ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ    |
| Compound | ㅐ ㅒ ㅔ ㅖ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ |

### Answer Tips

Some consonants have multiple valid romanizations — either is accepted:

- ㄱ → `g` or `k`
- ㄷ → `d` or `t`
- ㄹ → `r` or `l`
- ㅂ → `b` or `p`
- ㅇ → `ng` or `silent`
