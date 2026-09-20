# The Memory Master Series

A collector's album of learning games for American history. Master a subject, flip the cards, complete the collection.

**Play it now:** https://frozensun11.github.io/Memory-Master/

Works in any modern browser on phone, tablet, or desktop. On a phone you can install it to your home screen and play it like an app (see below).

## The games

| Series | Game | What you master |
|---|---|---|
| No. 1 | [The Presidents](https://frozensun11.github.io/Memory-Master/presidents/) | All 47 presidencies. Quizzes, timelines, trivia, full dossiers, a mystery hunt, and 47 portrait cards to earn. |
| No. 2 | [The States](https://frozensun11.github.io/Memory-Master/States/) | All 50 states in order of admission to the Union. Quizzes, timeline challenges, and a postage-stamp card for every state. |
| No. 3 | [The Supreme Court](https://frozensun11.github.io/Memory-Master/Supreme%20Court/) | 17 Chief Justices and the 9 sitting justices. Landmark dossiers and the human stories behind the case names. |

Each game is built around spaced repetition: items you miss come back sooner, items you know drift out of rotation, and mastering an item earns its card in your collection.

## Installing on your phone

The site is a Progressive Web App (PWA), so it can live on your home screen with its own icon and open full-screen without browser chrome.

- **iPhone / iPad (Safari):** open the site, tap the Share button, then **Add to Home Screen**.
- **Android (Chrome):** open the site, tap the three-dot menu, then **Install app** or **Add to Home screen**. Chrome may also show an install banner on its own.
- **Desktop (Chrome / Edge):** click the install icon in the address bar.

Once installed, the pages you have visited keep working offline. Portraits, flags, and maps come from Wikimedia Commons and need a connection the first time they are shown.

## How progress is saved

Progress lives only in your browser, in `localStorage`, under one key per game. Nothing is sent to a server and there are no accounts. Clearing site data, or switching browsers or devices, starts you fresh.

## How the project is organized

There is no build step, bundler, or framework. Every page is a single self-contained HTML file with its own styles, data, and script inline.

```
index.html              Landing page: the album shelf linking to each series
presidents/index.html   Series No. 1: The Presidents
States/index.html       Series No. 2: The States
Supreme Court/index.html  Series No. 3: The Supreme Court
manifest.webmanifest    PWA manifest (name, icons, colors, start URL)
sw.js                   Service worker: offline caching for visited pages
icons/                  App icons (SVG and PNG at the sizes phones expect)
```

Fonts load from Google Fonts. Images load from Wikimedia Commons by file name, so no media is stored in this repository.

## Running locally

Open `index.html` directly in a browser, or serve the folder so the service worker and relative links behave exactly as they do on GitHub Pages:

```
python -m http.server 8000
```

Then visit http://localhost:8000/.

## Deployment

The `main` branch is published automatically by GitHub Pages. Pushing to `main` is the deploy. After a change to `sw.js` or the cached files, bump the cache version string at the top of `sw.js` so installed copies pick up the new files.

## License

Copyright (c) Kelly McCarty. All rights reserved.

You are welcome to play the games at the link above. The code, text, quiz content, and design may not be copied, modified, redistributed, or reused without written permission. See [LICENSE](LICENSE) for the full terms.
