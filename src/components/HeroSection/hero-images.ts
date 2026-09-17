/** Figma: Mayer_Aesthetics_Hero_Section_Zoom_01 1440×750 (file 6uZTE2uDTOAnMI5Dcu5DNu) */

import { withBase } from "@/lib/basePath";

export const DESIGN_W = 1440;
export const DESIGN_H = 750;

export const HERO_IMAGES = {
  center: withBase("/hero-section/a3883001594f82540870a6bc0412fba03f0a4c33.webp"),
  rect633: withBase("/hero-section/e51cd084c290e274f02ce275901ce2bd24c3f821.webp"),
  rect634: withBase("/hero-section/f578429f15775fefbebff207f3a7ae4d27293055.webp"),
  rect639: withBase("/hero-section/64a8b3bf24cc872deeda2844244161c8610e18b6.webp"),
  rect638: withBase("/hero-section/63b4f2c9c876e7239955d6e29e2d7458728768eb.webp"),
  rect640: withBase("/hero-section/3f84cf35ab8714ab44846efc32f6c9309e15a252.webp"),
  rect637: withBase("/hero-section/04606df5123b40c8751779f6ed8c69aec4c3f461.webp"),
} as const;

/** All hero assets to wait for before revealing the page */
export const PRELOAD_ASSETS = [
  ...Object.values(HERO_IMAGES),
  withBase("/logo.svg"),
] as const;

export const SLIDER_IMAGES = [
  HERO_IMAGES.center,
  HERO_IMAGES.rect638,
  HERO_IMAGES.rect640,
  // HERO_IMAGES.rect633,
  // HERO_IMAGES.rect639,
] as const;

/** Per-slide caption lines (italic / light / offset) */
export const SLIDER_CAPTIONS = [
  {
    italic: "Совершенство",
    light: "не придумывают.",
    offset: "Его делают заметным",
  },
  {
    italic: "Красота",
    light: "не кричит.",
    offset: "Она говорит шёпотом",
  },
  {
    italic: "Образ",
    light: "не собирают.",
    offset: "Его чувствуют",
  },
] as const;

/** Satellite tiles — Zoom_01 nodes 27:12–27:17. `fly` = scroll exit speed.
 *  `crop` = Figma image inset (absolute % inside overflow frame). */
export const SATELLITE_IMAGES = [
  {
    id: "rect633",
    src: HERO_IMAGES.rect633,
    x: 237,
    y: -19,
    w: 274,
    h: 298,
    fly: 2,
  },
  {
    id: "rect639",
    src: HERO_IMAGES.rect639,
    x: 521,
    y: 91,
    w: 234,
    h: 188,
    fly: 1.8,
  },
  {
    id: "rect638",
    src: HERO_IMAGES.rect638,
    x: 1061,
    y: 31,
    w: 329,
    h: 313,
    fly: 1.7,
    /** Figma 27:16 — image shifted in frame */
    crop: { left: "-48.45%", width: "196.91%", top: "0%", height: "100%" },
  },
  {
    id: "rect634",
    src: HERO_IMAGES.rect634,
    x: 50,
    y: 289,
    w: 329,
    h: 180,
    fly: 1.5,
  },
  {
    id: "rect640",
    src: HERO_IMAGES.rect640,
    x: 730,
    y: 630,
    w: 321,
    h: 180,
    fly: 1.1,
  },
  {
    id: "rect637",
    src: HERO_IMAGES.rect637,
    x: 1061,
    y: 354,
    w: 272,
    h: 337,
    fly: 1.5,
    /** Figma 27:15 — image shifted in frame (was wrong with object-cover) */
    crop: { left: "-52.78%", width: "220.26%", top: "0%", height: "100%" },
  },
] as const;

/** Center slider — Figma Zoom_01 collapsed (27:19) */
export const CENTER_FRAME = {
  x: 389,
  y: 289,
  w: 662,
  h: 331,
  radius: 10,
} as const;

/** Expanded slider — Figma node 27:80 */
export const CENTER_ZOOM = {
  insetX: 50,
  insetBottom: 50,
  /** keep rounded corners (do not go to 0) */
  radius: 10,
  captionSize: 34,
  captionSizeStart: 26,
  insetInner: 50,
  dividerBottom: 90,
  /** space between caption block and divider */
  captionToDivider: 35,
  captionBottom: 125, // 90 + 35
  /** space between pager bottom edge and divider */
  pagerToDivider: 52,
  pagerSize: 60,
} as const;

export function pctX(x: number) {
  return `${(x / DESIGN_W) * 100}%`;
}

export function pctY(y: number) {
  return `${(y / DESIGN_H) * 100}%`;
}

export function pctW(w: number) {
  return `${(w / DESIGN_W) * 100}%`;
}

export function pctH(h: number) {
  return `${(h / DESIGN_H) * 100}%`;
}
