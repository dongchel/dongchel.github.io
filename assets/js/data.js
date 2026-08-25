// ---------------------------------------------------------------
// data.js — ALL editable content lives here.
//
// To add a news item: copy an entry in NEWS and paste it at the top
// (order doesn't matter, it's sorted by date automatically).
//
// To add a publication: copy an entry in PUBLICATIONS and paste it
// anywhere in the array (also auto-sorted, and auto-grouped by year
// on publications.html). Set selected:true to feature it on the
// homepage (only the 4 most recent selected papers show there).
//
// Text fields support light markdown:
//   **bold**      -> <b>bold</b>        (use for your own name in authors)
//   _italic_      -> <em>italic</em>
//   [text](url)   -> link that opens in a new tab
//   ^*^           -> superscript *      (put right after an author's name)
//   ^dagger^      -> superscript †      (co-first author marker)
//
// Author order is "Initials Family" (e.g. "D.-C. Shin"), separated by commas.
// Mark a corresponding author with ^*^ and a co-first author with ^dagger^
// right after their name, e.g. "Y.-J. Kim^*^" or "G. Kang^dagger^". A legend
// explaining the marks is shown automatically under the author list whenever
// at least one author on that paper uses one — no need to add it by hand.
//
// After editing, just save — no build step, refresh the page to see it.
// ---------------------------------------------------------------

const NEWS = [
  {
    date: "2026-05-10",
    tag: "Paper",
    body: "Comb-to-comb synchronization appeared in _Optics & Laser Technology_. [Read it →](https://www.sciencedirect.com/science/article/abs/pii/S0030399226008777)"
  },
  {
    date: "2025-08-23",
    tag: "Internship",
    body: "Joined NTT Research PHI Lab as a research intern. [Learn more →](https://ntt-research.com/phi-lab/)"
  },
  {
    date: "2025-07-24",
    tag: "Award",
    body: "Awarded the 2025 MathWorks Engineering Fellowship."
  },
  {
    date: "2025-04-01",
    tag: "Paper",
    body: "Laser cooling of a torsional oscillator appeared in _Optica_. [Paper](https://opg.optica.org/optica/fulltext.cfm?uri=optica-12-4-473&id=569884) · [MIT News](https://news.mit.edu/2025/is-gravity-quantum-0520)"
  },
  {
    date: "2025-03-20",
    tag: "Conference",
    body: "Attended the 2025 APS March Meeting."
  },
  {
    date: "2024-07-03",
    tag: "Award",
    body: "Awarded the 2024 MathWorks Engineering Fellowship."
  },
  {
    date: "2024-03-08",
    tag: "Conference",
    body: "Attended the 2024 GRC Mechanical Systems in the Quantum Regime."
  },
  {
    date: "2023-02-11",
    tag: "Paper",
    body: "Ultra-stable THz synthesis appeared in _Nature Communications_. [Read it →](https://www.nature.com/articles/s41467-023-36507-y)"
  },
];

const PUBLICATIONS = [
  {
    year: 2026,
    venue: "Nature Communications",
    title: "Nanometre-precision terahertz interferometry for battery electrode metrology",
    authors: "G. Kang, J. Kim, M.-R. Kim, Y. Lee, **D.-C. Shin**, J. Jeon, H. Kim, D. H. Kim, J. Lee, S. Park, Y.-J. Kim",
    preview: "assets/img/publication_preview/battery.png",
    links: [
      { label: "Paper", url: "https://www.nature.com/articles/s41467-026-74193-8" },
      { label: "DOI", url: "https://doi.org/10.1038/s41467-026-74193-8" },
    ],
    selected: true,
  },
  {
    year: 2026,
    venue: "Optics & Laser Technology",
    title: "Compact, robust all-fiber platform for 1-Hz-linewidth synchronization of optical frequency combs using single comb line extraction",
    authors: "**D.-C. Shin**, J. Yang, D. I. Lee, G. Kang, S.-W. Kim, Y.-J. Kim",
    preview: "assets/img/publication_preview/comb-to-comb.png",
    links: [
      { label: "Paper", url: "https://www.sciencedirect.com/science/article/abs/pii/S0030399226008777" },
      { label: "DOI", url: "https://doi.org/10.1016/j.optlastec.2026.115526" },
    ],
    selected: false,
  },
  {
    year: 2026,
    venue: "arXiv preprint",
    title: "Continuum-field quantum optics of frequency comb metrology",
    authors: "**D.-C. Shin**, E. Ng, M.-G. Suh, V. Sudhir",
    preview: "assets/img/publication_preview/quantum-comb.png",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2605.16702" },
      { label: "DOI", url: "https://doi.org/10.48550/ARXIV.2605.16702" },
    ],
    selected: false,
  },
  {
    year: 2025,
    venue: "Optica",
    title: "Active laser cooling of a centimeter-scale torsional oscillator",
    authors: "**D.-C. Shin**, T. M. Hayward, D. Fife, R. Menon, V. Sudhir",
    preview: "assets/img/publication_preview/laser2025.png",
    links: [
      { label: "Paper", url: "https://doi.org/10.1364/OPTICA.548098" },
    ],
    selected: true,
  },
  {
    year: 2024,
    venue: "Review of Scientific Instruments",
    title: "Temperature stabilization of a lab space at 10 mK-level over a day",
    authors: "D. Fife, **D.-C. Shin**, V. Sudhir",
    preview: "assets/img/publication_preview/temp.png",
    links: [
      { label: "Paper", url: "https://doi.org/10.1063/5.0213133" },
    ],
    selected: false,
  },
  {
    year: 2024,
    venue: "PhotoniX",
    title: "Real-time monitoring of fast gas dynamics with a single-molecule resolution by frequency-comb-referenced plasmonic phase spectroscopy",
    authors: "D.-A. Nguyen, D. H. Kim, G. H. Lee, S. Kim, **D.-C. Shin**, J. Park, H.-J. Choi, S.-W. Kim, S. Kim, Y.-J. Kim",
    preview: "assets/img/publication_preview/photonix2024.png",
    links: [
      { label: "Paper", url: "https://photonix.springeropen.com/articles/10.1186/s43074-024-00140-9" },
    ],
    selected: false,
  },
  {
    year: 2023,
    venue: "Nature Communications",
    title: "Photonic comb-rooted synthesis of ultra-stable terahertz frequencies",
    authors: "**D.-C. Shin**, B. S. Kim, H. Jang, Y.-J. Kim, S.-W. Kim",
    preview: "assets/img/publication_preview/ncomm2023.png",
    links: [
      { label: "Paper", url: "https://doi.org/10.1038/s41467-023-36507-y" },
    ],
    selected: true,
  },
  {
    year: 2022,
    venue: "Light: Science & Applications",
    title: "Frequency comb-to-comb stabilization over a 1.3-km free-space atmospheric optical link",
    authors: "J. Yang, D. I. Lee, **D.-C. Shin**, J. Lee, B. S. Kim, H. J. Kang, Y.-J. Kim, S.-W. Kim",
    preview: "assets/img/publication_preview/lsa2022.png",
    links: [
      { label: "Paper", url: "https://doi.org/10.1038/s41377-022-00940-3" },
    ],
    selected: true,
  },
  {
    year: 2019,
    venue: "Sensors and Actuators B: Chemical",
    title: "Centrifuge-based step emulsification device for simple and fast generation of monodisperse picoliter droplets",
    authors: "**D.-C. Shin**, Y. Morimoto, J. Sawayama, S. Miura, S. Takeuchi",
    preview: "assets/img/publication_preview/s&a-b2019.png",
    links: [
      { label: "Paper", url: "https://doi.org/10.1016/j.snb.2019.127164" },
    ],
    selected: false,
  },
];
