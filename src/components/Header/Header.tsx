"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { withBase } from "@/lib/basePath";
import {
  COSMETOLOGY_MENU,
  getFeaturedCards,
  type MenuCard,
  type MenuCategory,
} from "./cosmetology-menu";
import styles from "./header.module.css";

const NAV_ITEMS = [
  { id: "cosmetology", label: "Косметология", href: "#", hasDropdown: true },
  { id: "laser", label: "Лазерная эпиляция", href: "#", hasDropdown: true },
  { id: "massage", label: "Массаж", href: "#", hasDropdown: true },
  { id: "specialists", label: "Специалисты", href: "#", hasDropdown: false },
  { id: "consult", label: "Консультация", href: "#", hasDropdown: false },
] as const;

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="6"
      viewBox="0 0 9.54167 5.15549"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.15506 0.369898C9.33046 0.536074 9.33795 0.812983 9.17177 0.988391L5.93538 4.40458C5.30266 5.07246 4.23901 5.07246 3.60629 4.40458L0.369898 0.98839C0.203721 0.812982 0.211205 0.536073 0.386614 0.369897C0.562022 0.203721 0.83893 0.211205 1.00511 0.386613L4.24149 3.8028C4.5291 4.10638 5.01257 4.10638 5.30018 3.8028L8.53656 0.386614C8.70274 0.211206 8.97965 0.203722 9.15506 0.369898Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0.549968 5.50833L14.0083 5.50833M9.04997 0.549995L14.0083 5.50833L9.04997 10.4667"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CategoryArrow({ active }: { active: boolean }) {
  return (
    <span
      className={`${styles.catArrow} ${active ? styles.catArrowActive : ""}`}
      aria-hidden
    >
      <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6709 5.63958C14.6709 5.78047 14.6149 5.9156 14.5153 6.01523L9.55697 10.9736C9.3495 11.181 9.01313 11.181 8.80566 10.9736C8.5982 10.7661 8.5982 10.4297 8.80566 10.2223L12.8571 6.17083L0.681316 6.17083C0.387915 6.17083 0.150066 5.93298 0.150066 5.63958C0.150066 5.34618 0.387915 5.10833 0.681316 5.10833L12.8571 5.10833L8.80566 1.05689C8.5982 0.849429 8.5982 0.51306 8.80566 0.305594C9.01313 0.0981276 9.3495 0.0981276 9.55697 0.305594L14.5153 5.26393C14.6149 5.36356 14.6709 5.49868 14.6709 5.63958Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function FeatureCard({
  card,
  variant = "first",
}: {
  card: MenuCard;
  variant?: "first" | "second";
}) {
  return (
    <Link href="#" className={styles.featureCard}>
      <div className={styles.featureMedia}>
        <Image
          src={card.image}
          alt=""
          fill
          sizes="310px"
          className={styles.featureImage}
        />
        <div
          className={
            variant === "second"
              ? `${styles.featureScrim} ${styles.featureScrimSecond}`
              : styles.featureScrim
          }
        />
      </div>
      <div className={styles.featureCopy}>
        <p className={styles.featureTitle}>{card.title}</p>
        <div className={styles.featureRule} aria-hidden />
        <p className={styles.featureDesc}>{card.description}</p>
      </div>
    </Link>
  );
}

/** Matches Figma header band (logo/nav sit within ~y 15–76 on 750 artboard). */
export const HEADER_HEIGHT = 91;

export default function Header() {
  const panelId = useId();
  const closeTimer = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(COSMETOLOGY_MENU[0].id);
  const [itemId, setItemId] = useState(COSMETOLOGY_MENU[0].defaultItemId);
  const [cardsKey, setCardsKey] = useState(0);

  const category =
    COSMETOLOGY_MENU.find((c) => c.id === categoryId) ?? COSMETOLOGY_MENU[0];
  const categoryIndex = Math.max(
    0,
    COSMETOLOGY_MENU.findIndex((c) => c.id === category.id),
  );
  const activeItem =
    category.items.find((i) => i.id === itemId) ?? category.items[0];
  const previewCards = getFeaturedCards(category);

  const clearCloseTimer = () => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setCategoryId(COSMETOLOGY_MENU[0].id);
    setItemId(COSMETOLOGY_MENU[0].defaultItemId);
    setCardsKey((k) => k + 1);
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  const selectCategory = (next: MenuCategory) => {
    setCategoryId(next.id);
    setItemId(next.defaultItemId);
    setCardsKey((k) => k + 1);
  };

  const selectItem = (id: string) => {
    if (id === itemId) return;
    setItemId(id);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Mayer Aesthetics Group"
        >
          <Image
            src={withBase("/logo.svg")}
            alt="Mayer Aesthetics Group"
            width={87}
            height={61}
            priority
            className={styles.logoImage}
          />
        </Link>

        <nav
          className={`${styles.glass} ${styles.nav}`}
          aria-label="Основное меню"
          onMouseLeave={scheduleClose}
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const isCosmetology = item.id === "cosmetology";
              const isActive = isCosmetology && open;

              return (
                <li
                  key={item.id}
                  className={styles.navItem}
                  onMouseEnter={() => {
                    if (isCosmetology) openMenu();
                    else scheduleClose();
                  }}
                >
                  {isCosmetology ? (
                    <button
                      type="button"
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => {
                        open ? setOpen(false) : openMenu();
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={styles.chevron} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      onFocus={scheduleClose}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown ? (
                        <ChevronDown className={styles.chevron} />
                      ) : null}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="#" className={`${styles.glass} ${styles.cta}`}>
            <span>Ваш будущий образ</span>
            <ArrowRight className={styles.ctaArrow} />
          </Link>

          <button
            type="button"
            className={`${styles.glass} ${styles.menuButton}`}
            aria-label="Открыть меню"
          >
            <span className={styles.menuLines} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className={`${styles.mega} ${open ? styles.megaOpen : ""}`}
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
        aria-hidden={!open}
      >
        <div className={styles.megaPanel}>
          <div className={styles.megaGrid}>
            <div className={styles.megaCats} role="tablist" aria-label="Разделы">
              <div className={styles.catStack}>
                <div
                  className={styles.catHighlight}
                  style={{
                    transform: `translateY(${categoryIndex * 37}px)`,
                  }}
                  aria-hidden
                />
                {COSMETOLOGY_MENU.map((cat) => {
                  const active = cat.id === category.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={`${styles.catBtn} ${active ? styles.catBtnActive : ""}`}
                      onMouseEnter={() => selectCategory(cat)}
                      onFocus={() => selectCategory(cat)}
                      onClick={() => selectCategory(cat)}
                    >
                      <span>{cat.label}</span>
                      <CategoryArrow active={active} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.megaDivider} aria-hidden />

            <ul className={styles.megaList} key={category.id}>
              {category.items.map((item) => {
                const active = item.id === activeItem.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`${styles.subLink} ${active ? styles.subLinkActive : ""}`}
                      onMouseEnter={() => selectItem(item.id)}
                      onFocus={() => selectItem(item.id)}
                    >
                      <span className={styles.subBullet} aria-hidden />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className={styles.megaDivider} aria-hidden />

            <div className={styles.megaCards} key={cardsKey}>
              {previewCards.map((card, index) => (
                <FeatureCard
                  key={`${cardsKey}-${card.title}-${card.image}`}
                  card={card}
                  variant={index === 1 ? "second" : "first"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
