"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HEADER_HEIGHT } from "@/components/Header";
import { useAssetsReady } from "@/components/PreloadGate";
import {
  CENTER_FRAME,
  CENTER_ZOOM,
  layoutWidth as mapFrameW,
  layoutX,
  pctH,
  pctW,
  pctX,
  pctY,
  SATELLITE_IMAGES,
  SLIDER_CAPTIONS,
  SLIDER_IMAGES,
  STAGE_GUTTER,
} from "./hero-images";
import styles from "./hero.module.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDE_INTERVAL_MS = 6800;
/** Page-turn wipe — panels scale hard (images stay cover, no Ken Burns) */
const SLIDE_DURATION = 1.3;
const OUT_SHIFT = -26;
const IN_SHIFT = 36;
/** Aggressive panel motion: incoming “comes” from small; outgoing punches up */
const OUT_PANEL_SCALE = 1.18;
const IN_PANEL_SCALE = 0.78;
const IMAGE_RADIUS = CENTER_FRAME.radius;
const SLIDE_COUNT = SLIDER_IMAGES.length;

/** Outer ring r≈29.75; inner progress ellipse r=25 (Figma circle-in-circle) */
const PAGER_R = 25;
const PAGER_C = 2 * Math.PI * PAGER_R;

const LETTER_STAGGER_MS = 22;
const LINE_GAP_MS = 70;
const CAPTION_START_MS = 60;

function lineStartDelay(lines: readonly string[], lineIndex: number) {
  let delay = CAPTION_START_MS;
  for (let i = 0; i < lineIndex; i++) {
    const len = Math.max(lines[i].length, 1);
    /* Next line starts soon after previous letters begin — still sequential, not wait-for-finish */
    delay += (len - 1) * LETTER_STAGGER_MS + LINE_GAP_MS;
  }
  return delay;
}

function StaggerLine({
  text,
  className,
  startDelayMs,
}: {
  text: string;
  className: string;
  startDelayMs: number;
}) {
  return (
    <p className={className} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span key={`${i}-${char}`} className={styles.letterMask} aria-hidden>
          <span
            className={styles.letter}
            style={{
              animationDelay: `${startDelayMs + i * LETTER_STAGGER_MS}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </p>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<SVGCircleElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(0);
  const isSlidingRef = useRef(false);
  const assetsReady = useAssetsReady();

  const goToSlide = (index: number, animate = true, onDone?: () => void) => {
    const slides = slideRefs.current;
    const from = activeSlideRef.current;
    const next = (index + SLIDE_COUNT) % SLIDE_COUNT;
    if (next === from && animate) {
      onDone?.();
      return;
    }

    const fromEl = slides[from];
    const toEl = slides[next];
    if (!toEl) return;

    activeSlideRef.current = next;
    setActiveSlide(next);

    const fromMedia = fromEl?.querySelector<HTMLElement>(`.${styles.slideMedia}`);
    const toMedia = toEl.querySelector<HTMLElement>(`.${styles.slideMedia}`);

    const resetSlide = (el: HTMLDivElement | null, visible: boolean) => {
      if (!el) return;
      const media = el.querySelector<HTMLElement>(`.${styles.slideMedia}`);
      gsap.set(el, {
        autoAlpha: visible ? 1 : 0,
        zIndex: visible ? 2 : 0,
        clipPath: "inset(0 0% 0 0%)",
        scale: 1,
        xPercent: 0,
      });
      if (media) {
        gsap.set(media, { xPercent: 0, scale: 1 });
      }
    };

    if (!animate || !fromEl || from === next) {
      slides.forEach((el, i) => resetSlide(el, i === next));
      onDone?.();
      return;
    }

    isSlidingRef.current = true;
    gsap.killTweensOf([fromEl, toEl, fromMedia, toMedia].filter(Boolean));

    /* Current page stays under; next page peels in from the right */
    gsap.set(fromEl, {
      autoAlpha: 1,
      zIndex: 1,
      clipPath: "inset(0 0% 0 0%)",
      scale: 1,
      xPercent: 0,
      transformOrigin: "50% 50%",
    });
    gsap.set(toEl, {
      autoAlpha: 1,
      zIndex: 2,
      clipPath: "inset(0 0% 0 100%)",
      scale: IN_PANEL_SCALE,
      xPercent: IN_SHIFT * 0.15,
      transformOrigin: "100% 50%",
    });
    if (fromMedia) gsap.set(fromMedia, { xPercent: 0, scale: 1 });
    if (toMedia) gsap.set(toMedia, { xPercent: 0, scale: 1 });

    const tl = gsap.timeline({
      defaults: { duration: SLIDE_DURATION, ease: "power3.inOut" },
      onComplete: () => {
        isSlidingRef.current = false;
        slides.forEach((el, i) => {
          if (i !== next) resetSlide(el, false);
        });
        gsap.set(toEl, {
          autoAlpha: 1,
          zIndex: 2,
          clipPath: "inset(0 0% 0 0%)",
          scale: 1,
          xPercent: 0,
        });
        if (toMedia) gsap.set(toMedia, { xPercent: 0, scale: 1 });
        onDone?.();
      },
    });

    /* Sharp edge moves right → left (like turning a page) */
    tl.to(
      toEl,
      { clipPath: "inset(0 0% 0 0%)", ease: "power3.inOut" },
      0,
    );

    /* Incoming panel “comes” forward hard (scale up into place) */
    tl.to(
      toEl,
      {
        scale: 1,
        xPercent: 0,
        ease: "power3.out",
      },
      0,
    );

    /* Previous panel punches up + drifts as it yields */
    tl.to(
      fromEl,
      {
        scale: OUT_PANEL_SCALE,
        xPercent: OUT_SHIFT * 0.45,
        ease: "power3.in",
      },
      0,
    );

    /* Mild parallax shift on images only — no image scale */
    if (fromMedia) {
      tl.to(
        fromMedia,
        { xPercent: OUT_SHIFT, ease: "power2.in" },
        0,
      );
    }
    if (toMedia) {
      tl.fromTo(
        toMedia,
        { xPercent: IN_SHIFT },
        { xPercent: 0, ease: "power2.out" },
        0,
      );
    }
  };

  useEffect(() => {
    goToSlide(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const circle = progressRef.current;
    if (!circle || !assetsReady) return;

    gsap.set(circle, {
      strokeDasharray: PAGER_C,
      strokeDashoffset: PAGER_C,
    });

    const tween = gsap.to(circle, {
      strokeDashoffset: 0,
      duration: SLIDE_INTERVAL_MS / 1000,
      ease: "none",
      onComplete: () => {
        if (isSlidingRef.current) return;
        goToSlide(activeSlideRef.current + 1);
      },
    });

    return () => {
      tween.kill();
    };
    // Restart 0→100% whenever the active slide changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsReady, activeSlide]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const collage = collageRef.current;
    const center = centerRef.current;
    const divider = dividerRef.current;
    if (!section || !stage || !collage || !center) return;

    const ctx = gsap.context(() => {
      const satellites = satelliteRefs.current.filter(Boolean);

      const applyZoom = (progress: number) => {
        const stageW = Math.min(
          stage.getBoundingClientRect().width || stage.clientWidth,
          document.documentElement.clientWidth,
        );
        const stageH =
          stage.getBoundingClientRect().height || stage.clientHeight;

        /* 50px L/R locked; relative Figma gaps preserved */
        const startW = mapFrameW(CENTER_FRAME.w, stageW);
        const startH = (CENTER_FRAME.h / 750) * stageH;
        const startL = layoutX(CENTER_FRAME.x, stageW);
        const startT = (CENTER_FRAME.y / 750) * stageH;

        const endL = STAGE_GUTTER;
        const endB = CENTER_ZOOM.insetBottom;
        const endT = HEADER_HEIGHT;
        const endW = stageW - STAGE_GUTTER * 2;
        const endH = stageH - endT - endB;

        /* Smooth from the first pixel of scroll (no flat “lag” at start) */
        const eased = gsap.parseEase("power1.inOut")(progress);

        const captionSize = gsap.utils.interpolate(
          CENTER_ZOOM.captionSizeStart,
          CENTER_ZOOM.captionSize,
          eased,
        );
        const captionBottom = gsap.utils.interpolate(
          30,
          CENTER_ZOOM.captionBottom,
          eased,
        );
        const pagerBottomEnd =
          CENTER_ZOOM.dividerBottom + CENTER_ZOOM.pagerToDivider;
        const pagerBottom = gsap.utils.interpolate(36, pagerBottomEnd, eased);

        gsap.set(center, {
          left: gsap.utils.interpolate(startL, endL, eased),
          top: gsap.utils.interpolate(startT, endT, eased),
          width: gsap.utils.interpolate(startW, endW, eased),
          height: gsap.utils.interpolate(startH, endH, eased),
          borderRadius: gsap.utils.interpolate(
            IMAGE_RADIUS,
            CENTER_ZOOM.radius,
            eased,
          ),
          "--zoom": eased,
          "--caption-size": `${captionSize}px`,
          "--caption-left": `${gsap.utils.interpolate(30, CENTER_ZOOM.insetInner, eased)}px`,
          "--caption-bottom": `${captionBottom}px`,
          "--pager-right": `${gsap.utils.interpolate(30, CENTER_ZOOM.insetInner, eased)}px`,
          "--pager-bottom": `${pagerBottom}px`,
          "--caption-pad-1": `${gsap.utils.interpolate(26, 34, eased)}px`,
          "--caption-pad-3": `${gsap.utils.interpolate(33, 43, eased)}px`,
        } as gsap.TweenVars);

        if (divider) {
          gsap.set(divider, {
            opacity: eased,
            y: gsap.utils.interpolate(48, 0, eased),
            scaleX: gsap.utils.interpolate(0.35, 1, eased),
          });
        }

        const cardCx = startL + startW / 2;
        const cardCy = startT + startH / 2;
        const EXIT_PAD = 64;

        satellites.forEach((el, index) => {
          const item = SATELLITE_IMAGES[index];
          const satL = layoutX(item.x, stageW);
          const satT = (item.y / 750) * stageH;
          const satW = mapFrameW(item.w, stageW);
          const satH = (item.h / 750) * stageH;
          const satCx = satL + satW / 2;
          const satCy = satT + satH / 2;

          let dx = satCx - cardCx;
          let dy = satCy - cardCy;
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
            dx = satCx < stageW / 2 ? -1 : 1;
            dy = satCy < stageH / 2 ? -1 : 1;
          }
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len;
          const uy = dy / len;

          /* Distance to fully leave the page */
          const radius = Math.hypot(satW, satH) / 2 + EXIT_PAD;
          const candidates: number[] = [];
          if (ux < -1e-6) candidates.push((satCx + radius) / -ux);
          if (ux > 1e-6) candidates.push((stageW - satCx + radius) / ux);
          if (uy < -1e-6) candidates.push((satCy + radius) / -uy);
          if (uy > 1e-6) candidates.push((stageH - satCy + radius) / uy);
          const exitDist = candidates.length
            ? Math.min(...candidates)
            : stageW * 0.6;

          /* Same smooth ease as zoom; fly (1.1–1.8) = relative speed */
          const satEased = gsap.parseEase("power1.inOut")(
            Math.min(1, progress * (item.fly / 1.1)),
          );
          const travel = exitDist * satEased;

          gsap.set(el, {
            x: ux * travel,
            y: uy * travel,
            left: satL,
            top: satT,
            width: satW,
            height: satH,
            borderRadius: IMAGE_RADIUS,
          });
        });
      };

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        pin: stage,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          applyZoom(self.progress);
        },
        onRefresh: (self) => {
          applyZoom(self.progress);
        },
      });

      applyZoom(st.progress);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        applyZoom(st.progress);
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [assetsReady]);

  const caption = SLIDER_CAPTIONS[activeSlide];
  const captionLines = [caption.italic, caption.light, caption.offset] as const;

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Hero">
      <div ref={stageRef} className={styles.stage}>
        <div aria-hidden className={styles.bgLayer1} />
        <div aria-hidden className={styles.bgRadial} />

        <div ref={collageRef} className={styles.collage}>
          {SATELLITE_IMAGES.map((item, index) => {
            const crop = "crop" in item ? item.crop : undefined;
            const isRight = item.id === "rect637" || item.id === "rect638";

            return (
              <div
                key={item.id}
                ref={(el) => {
                  satelliteRefs.current[index] = el;
                }}
                className={`${styles.satellite} ${isRight ? styles.satelliteRight : ""}`}
                style={{
                  left: pctX(item.x),
                  top: pctY(item.y),
                  width: pctW(item.w),
                  height: pctH(item.h),
                  borderRadius: IMAGE_RADIUS,
                }}
              >
                {crop ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt=""
                    className={styles.imageCropped}
                    style={{
                      left: crop.left,
                      width: crop.width,
                      top: crop.top,
                      height: crop.height,
                    }}
                    decoding="async"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="30vw"
                    className={styles.imageCover}
                    priority={index < 4}
                  />
                )}
              </div>
            );
          })}

          <div
            ref={centerRef}
            className={styles.center}
            style={{
              left: pctX(CENTER_FRAME.x),
              top: pctY(CENTER_FRAME.y),
              width: pctW(CENTER_FRAME.w),
              height: pctH(CENTER_FRAME.h),
              borderRadius: IMAGE_RADIUS,
            }}
          >
            <div className={styles.sliderViewport}>
              {SLIDER_IMAGES.map((src, index) => (
                <div
                  key={src}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  className={styles.slide}
                >
                  <div className={styles.slideMedia}>
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="100vw"
                      className={styles.imageCover}
                      priority={index === 0}
                    />
                  </div>
                  <div className={styles.slideOverlay} />
                </div>
              ))}

              <div className={styles.caption}>
                <StaggerLine
                  key={`${activeSlide}-italic`}
                  text={captionLines[0]}
                  startDelayMs={lineStartDelay(captionLines, 0)}
                  className={`${styles.captionLine} ${styles.captionItalic}`}
                />
                <StaggerLine
                  key={`${activeSlide}-light`}
                  text={captionLines[1]}
                  startDelayMs={lineStartDelay(captionLines, 1)}
                  className={`${styles.captionLine} ${styles.captionLight}`}
                />
                <StaggerLine
                  key={`${activeSlide}-offset`}
                  text={captionLines[2]}
                  startDelayMs={lineStartDelay(captionLines, 2)}
                  className={`${styles.captionLine} ${styles.captionOffset}`}
                />
              </div>

              <div ref={dividerRef} className={styles.zoomDivider} aria-hidden />

              <div className={styles.pager} aria-hidden>
                <svg
                  className={styles.pagerSvg}
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  {/* Outer static circle */}
                  <circle
                    className={styles.pagerRing}
                    cx="30"
                    cy="30"
                    r="29.75"
                  />
                  {/* Inner ellipse — progress 0→100% until next slide */}
                  <circle
                    ref={progressRef}
                    className={styles.pagerProgress}
                    cx="30"
                    cy="30"
                    r={PAGER_R}
                    fill="none"
                    stroke="url(#pagerGrad)"
                    strokeWidth="1"
                    strokeDasharray={PAGER_C}
                    strokeDashoffset={PAGER_C}
                    strokeLinecap="butt"
                    transform="rotate(-90 30 30)"
                  />
                  <defs>
                    <linearGradient
                      id="pagerGrad"
                      gradientUnits="userSpaceOnUse"
                      x1="30.2857"
                      y1="60"
                      x2="0.6122"
                      y2="28.7755"
                    >
                      <stop offset="0.2413" stopColor="#8C7669" />
                      <stop offset="0.7491" stopColor="#E5DACE" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className={styles.pagerText}>
                  <span className={styles.pagerNum}>{activeSlide + 1}</span>
                  <span className={styles.pagerSlash}>/</span>
                  <span className={styles.pagerNum}>{SLIDE_COUNT}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
