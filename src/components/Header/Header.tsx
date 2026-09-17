"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

const NAV_ITEMS = [
  { label: "Косметология", href: "#", hasDropdown: true, active: false },
  { label: "Лазерная эпиляция", href: "#", hasDropdown: true, active: false },
  { label: "Массаж", href: "#", hasDropdown: true, active: false },
  { label: "Специалисты", href: "#", hasDropdown: false, active: false },
  { label: "Консультация", href: "#", hasDropdown: false, active: false },
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
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.549968 5.50833L14.0083 5.50833M9.04997 0.549995L14.0083 5.50833L9.04997 10.4667" stroke="#F4F2F1" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  );
}

/** Matches Figma header band (logo/nav sit within ~y 15–76 on 750 artboard). */
export const HEADER_HEIGHT = 91;

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Mayer Aesthetics Group"
        >
          <Image
            src="/logo.svg"
            alt="Mayer Aesthetics Group"
            width={87}
            height={61}
            priority
            className={styles.logoImage}
          />
        </Link>

        <nav className={`${styles.glass} ${styles.nav}`} aria-label="Основное меню">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${item.active ? styles.navLinkActive : ""}`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown ? (
                    <ChevronDown className={styles.chevron} />
                  ) : null}
                </Link>
              </li>
            ))}
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
    </header>
  );
}
