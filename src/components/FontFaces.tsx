import { withBase } from "@/lib/basePath";

/** @font-face with basePath so fonts work on GitHub Pages (/mayer/...). */
export default function FontFaces() {
  const faces = `
@font-face {
  font-family: "CoFo Sans Pro Hebrew Trial";
  src: url("${withBase("/fonts/CoFoSansProHebrewTrial-Medium.otf")}") format("opentype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "CoFo Sans Pro Hebrew Trial";
  src: url("${withBase("/fonts/CoFoSansProHebrewTrial-Regular.otf")}") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Moisette";
  src: url("${withBase("/fonts/Moisette-Italic.otf")}") format("opentype");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: "Moisette";
  src: url("${withBase("/fonts/Moisette-Light.otf")}") format("opentype");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "CoFo Holz Trial";
  src: url("${withBase("/fonts/CoFoHolzTrial-Regular.otf")}") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Salina Trial";
  src:
    url("${withBase("/fonts/SalinaTrial-Book.woff2")}") format("woff2"),
    url("${withBase("/fonts/SalinaTrial-Book.woff")}") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`.trim();

  return <style dangerouslySetInnerHTML={{ __html: faces }} />;
}
