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
  preview: "assets/img/publication_preview/your-image.webp",
  links: [
    { label: "Paper", url: "https://..." },
    { label: "DOI", url: "https://doi.org/..." },
  ],
  selected: true,   // true = also feature it on the homepage
},
```

- It automatically appears on `publications.html`, grouped under the right year.
- If `selected: true`, it also shows in the "Selected Publications" section on
  the homepage (every `selected` paper is shown, newest first).
- Drop the preview image into `assets/img/publication_preview/` first. Shrink it
  to WebP so the page stays fast (the slot is small):

      cwebp -q 82 -resize 640 0 figure.png -o assets/img/publication_preview/name.webp

- Wrap your own name in `**...**` so it renders bold in the author list.
- Mark corresponding authors with `^*^` and co-first authors with `^dagger^`.

## Everything else

- Header block (name, title, research tags, CV/Scholar/email/LinkedIn buttons),
  About text, and the CV section (education, experience, awards, talks) are
  plain HTML in `index.html`.
- New CV PDF: put it in `assets/pdf/` and update the filename in `index.html`
  (it appears twice: the "CV (PDF)" button and "Download full CV").
- After editing `site.css` or any `.js` file, bump the `?v=...` string on the
  `<link>`/`<script>` tags in `index.html` and `publications.html` so browsers
  fetch the new version instead of a cached one.
- Dark mode follows the visitor's system setting; the moon/sun button overrides it.
