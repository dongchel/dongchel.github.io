// render.js — turns data.js into DOM. No build step: edit data.js, refresh.

function mdInline(str) {
  // very small markdown subset: **bold**, *italic*, [text](url)
  return str
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function fmtDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

function newsCard(item) {
  const el = document.createElement("div");
  el.className = "news-card";
  el.innerHTML = `
    <span class="news-tag">${item.tag}</span>
    <span class="news-date">${fmtDate(item.date)}</span>
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
  el.innerHTML = `
    <div class="pub-thumb"><img src="${pub.preview}" alt="" loading="lazy"></div>
    <div>
      <div class="pub-year">${pub.year} &middot; ${pub.venue}</div>
      <h3 class="pub-title"><a href="${primaryUrl}" target="_blank" rel="noopener">${mdInline(pub.title)}</a></h3>
      <p class="pub-authors">${mdInline(pub.authors)}</p>
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
  // ---- homepage: news rail ----
  const rail = document.getElementById("news-rail");
  if (rail) {
    sortedNews().forEach((item) => rail.appendChild(newsCard(item)));
  }

  // ---- homepage: selected publications (max 4, most recent) ----
  const selectedWrap = document.getElementById("selected-pub-list");
  if (selectedWrap) {
    sortedPubs()
      .filter((p) => p.selected)
      .slice(0, 4)
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
        list.dataset.stagger = "";
        byYear[year].forEach((p) => list.appendChild(pubCard(p)));
        group.appendChild(list);
        fullWrap.appendChild(group);
      });
  }

  // let site.js's reveal-on-scroll pick up anything just inserted
  document.dispatchEvent(new Event("content-rendered"));
});
