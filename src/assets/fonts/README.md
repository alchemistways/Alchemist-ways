# Fonts

Self-hosted, subset to Basic Latin plus typographic punctuation (’ “ ” — – … · →) with
`pyftsubset` to keep the page light. All are SIL Open Font License 1.1 (Google Fonts):

| File                                    | Family                        | Used for                                  |
| --------------------------------------- | ----------------------------- | ----------------------------------------- |
| figtree-latin-wght-*.woff2              | Figtree (variable 300–900)    | headlines (800), body, buttons            |
| newsreader-latin-wght-*.woff2           | Newsreader (variable 200–800) | hero / Map headlines, red italic emphasis |
| dm-mono-latin-400-normal.woff2          | DM Mono 400                   | founder pill, footer wordmark             |
| barlow-condensed-latin-600-italic.woff2 | Barlow Condensed 600 italic   | Reactivity word stream                    |

If new copy needs characters outside that set (accents, etc.), re-export from
@fontsource / Google Fonts with a wider `--unicodes` range.
