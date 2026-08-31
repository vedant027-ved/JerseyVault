/* JerseyHub — vector jersey generator
   Produces a consistent, premium, stylised jersey graphic (front view) for any
   club/country/colour combination, used everywhere a "product photo" is needed.
   This keeps every product card visually consistent (like a real catalogue shoot)
   without depending on external photography. */

function jerseySVG(opts) {
  const {
    primary = "#1a1a1a",
    secondary = "#ffffff",
    trim = "#E31C25",
    stripes = false,
    hoops = false,
    sash = false,
    number = "10",
    crest = "JH",
    id = Math.random().toString(36).slice(2)
  } = opts;

  const clipId = "clip-" + id;
  const bodyPath =
    "M108,14 C120,28 138,34 150,34 C162,34 180,28 192,14 L246,40 L268,96 L232,118 L216,78 L216,326 L84,326 L84,78 L68,118 L32,96 Z";

  let pattern = "";
  if (stripes) {
    let bars = "";
    for (let x = 60; x < 260; x += 24) {
      bars += `<rect x="${x}" y="0" width="12" height="340" fill="${secondary}"/>`;
    }
    pattern = `<g clip-path="url(#${clipId})">${bars}</g>`;
  } else if (hoops) {
    let bars = "";
    for (let y = 20; y < 330; y += 34) {
      bars += `<rect x="0" y="${y}" width="300" height="17" fill="${secondary}"/>`;
    }
    pattern = `<g clip-path="url(#${clipId})">${bars}</g>`;
  } else if (sash) {
    pattern = `<g clip-path="url(#${clipId})"><polygon points="20,10 90,10 260,320 190,320" fill="${secondary}"/></g>`;
  }

  return `
  <svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jersey ${crest} ${number}">
    <defs>
      <clipPath id="${clipId}"><path d="${bodyPath}"/></clipPath>
      <linearGradient id="shade-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#000000" stop-opacity="0.12"/>
        <stop offset="0.5" stop-color="#000000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.18"/>
      </linearGradient>
    </defs>
    <path d="${bodyPath}" fill="${primary}"/>
    ${pattern}
    <path d="${bodyPath}" fill="url(#shade-${id})"/>
    <path d="M108,14 C120,28 138,34 150,34 C162,34 180,28 192,14 L192,26 C180,38 162,44 150,44 C138,44 120,38 108,26 Z" fill="${trim}"/>
    <rect x="68" y="94" width="24" height="10" fill="${trim}" clip-path="url(#${clipId})"/>
    <rect x="208" y="94" width="24" height="10" fill="${trim}" clip-path="url(#${clipId})"/>
    <circle cx="118" cy="62" r="16" fill="${secondary}" stroke="${primary}" stroke-width="2"/>
    <text x="118" y="67" font-family="Manrope, Arial, sans-serif" font-size="11" font-weight="800" fill="${primary}" text-anchor="middle">${crest}</text>
    <text x="150" y="230" font-family="'Bebas Neue', Arial, sans-serif" font-size="110" font-weight="700" fill="${secondary}" text-anchor="middle" stroke="${primary}" stroke-width="2">${number}</text>
  </svg>`;
}

function jerseyDataUri(opts) {
  const svg = jerseySVG(opts);
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
