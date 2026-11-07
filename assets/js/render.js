// render.js — turns data.js into DOM. No build step: edit data.js, refresh.

function mdInline(str) {
  // very small markdown subset: **bold**, _italic_, [text](url), ^*^ / ^dagger^ superscript
  return str
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    .replace(/\^dagger\^/g, "<sup>&dagger;</sup>")
    .replace(/\^([^^]+)\^/g, "<sup>$1</sup>");
}

// does an authors string use a ^*^ or ^dagger^ marker?
function authorsUseMarkers(authors) {
  return /\^(\*|dagger)\^/.test(authors);
}

function fmtDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

const NEWS_VISIBLE = 5; // items shown before "Show all"

function newsItem(item) {
  const el = document.createElement("li");
  el.className = "news-item";
  el.innerHTML = `
    <span class="news-date">${fmtDate(item.date)}</span>
    <span class="news-tag">${item.tag}</span>
    <p class="news-body">${mdInline(item.body)}</p>
  `;
  return el;
}

function pubCard(pub) {
  const el = document.createElement("div");
  el.className = "pub-card";
  const primaryUrl = (pub.links && pub.links[0] && pub.links[0].url) || "#";
  const linksHtml = (pub.links || [])
    .map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
    .join("");
  const legend = authorsUseMarkers(pub.authors)
    ? `<p class="pub-legend">${pub.authors.includes("^*^") ? "* corresponding author" : ""}${pub.authors.includes("^*^") && pub.authors.includes("^dagger^") ? " &middot; " : ""}${pub.authors.includes("^dagger^") ? "&dagger; co-first author" : ""}</p>`
    : "";
  el.innerHTML = `
    <div class="pub-thumb"><img src="${pub.preview}" alt="" width="240" height="176" loading="lazy" decoding="async"></div>
    <div>
      <div class="pub-year">${pub.year} &middot; ${pub.venue}</div>
      <h3 class="pub-title"><a href="${primaryUrl}" target="_blank" rel="noopener">${mdInline(pub.title)}</a></h3>
      <p class="pub-authors">${mdInline(pub.authors)}</p>
      ${legend}
      <div class="pub-links">${linksHtml}</div>
    </div>
  `;
  return el;
}

function sortedNews() {
  return [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

function sortedPubs() {
  return [...PUBLICATIONS].sort((a, b) => b.year - a.year);
}

document.addEventListener("DOMContentLoaded", () => {
  // ---- homepage: news list (first NEWS_VISIBLE, rest behind "Show all") ----
  const list = document.getElementById("news-list");
  if (list) {
    const items = sortedNews().map(newsItem);
    items.forEach((el, i) => {
      if (i >= NEWS_VISIBLE) el.hidden = true;
      list.appendChild(el);
    });
    if (items.length > NEWS_VISIBLE) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "news-more";
      btn.setAttribute("aria-expanded", "false");
      const label = () => `Show all ${items.length} updates ↓`;
      btn.textContent = label();
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") !== "true";
        items.forEach((el, i) => { if (i >= NEWS_VISIBLE) el.hidden = !open; });
        btn.setAttribute("aria-expanded", String(open));
        btn.textContent = open ? "Show fewer ↑" : label();
      });
      list.after(btn);
    }
  }

  // ---- homepage: selected publications (every selected:true, newest first) ----
  const selectedWrap = document.getElementById("selected-pub-list");
  if (selectedWrap) {
    sortedPubs()
      .filter((p) => p.selected)
      .forEach((p) => selectedWrap.appendChild(pubCard(p)));
  }

  // ---- publications.html: full list grouped by year ----
  const fullWrap = document.getElementById("pub-year-groups");
  if (fullWrap) {
    const byYear = {};
    sortedPubs().forEach((p) => {
      (byYear[p.year] = byYear[p.year] || []).push(p);
    });
    Object.keys(byYear)
      .sort((a, b) => b - a)
      .forEach((year) => {
        const group = document.createElement("div");
        group.className = "pub-year-group reveal";
        const head = document.createElement("h2");
        head.className = "pub-year-head";
        head.textContent = year;
        group.appendChild(head);
        const list = document.createElement("div");
        list.className = "pub-list";
              byYear[year].forEach((p) => list.appendChild(pubCard(p)));
        group.appendChild(list);
        fullWrap.appendChild(group);
      });
  }

  // let site.js's reveal-on-scroll pick up anything just inserted
  document.dispatchEvent(new Event("content-rendered"));
});
