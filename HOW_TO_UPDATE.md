# How to update this site

All editable content — news items and publications — lives in one file:

    assets/js/data.js

There's no build step. Edit that file, save, and refresh the page (or just push
to GitHub — Pages serves the file as-is).

## Add a news item

Copy an entry inside the `NEWS` array and paste it anywhere in the list
(it's sorted by date automatically, newest first):

```js
{
  date: "2026-08-25",
  tag: "Award",
  body: "Won a thing. [Read more →](https://example.com)"
},
```

`tag` is a short label like Paper / Award / Conference / Internship.
`body` supports: `**bold**`, `*italic*`, and `[link text](url)`.

## Add a publication

Copy an entry inside the `PUBLICATIONS` array:

```js
{
  year: 2026,
  venue: "Nature Photonics",
  title: "Some great result",
  authors: "**Shin, D.**, Coauthor, A., Coauthor, B.",
  preview: "assets/img/publication_preview/your-image.png",
  links: [
    { label: "Paper", url: "https://..." },
    { label: "DOI", url: "https://doi.org/..." },
  ],
  selected: true,   // true = also show on the homepage (top 4 most recent shown)
},
```

- It automatically appears on `publications.html`, grouped under the right year.
- If `selected: true`, it also shows in the "Selected Publications" section on
  the homepage (only the 4 most recent `selected` papers are shown there).
- Drop the preview image into `assets/img/publication_preview/` first.
- Wrap your own name in `**...**` so it renders bold in the author list.

## Everything else

- Profile photo / bio text: edit the `#about` section directly in `index.html`.
- CV: replace the PDF at `assets/pdf/` and update the filename referenced in
  `cv.html` (the "Download CV" button's `href`).
- Hero headline / quote / nav links: edit directly in `index.html` /
  `publications.html` / `cv.html` (they're plain HTML).
