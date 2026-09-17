"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./preload-gate.module.css";

const AssetsReadyContext = createContext(false);

export function useAssetsReady() {
  return useContext(AssetsReadyContext);
}

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(() => resolve()).catch(() => resolve());
      } else {
        resolve();
      }
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

export default function PreloadGate({
  children,
  urls,
}: {
  children: React.ReactNode;
  urls: readonly string[];
}) {
  const [ready, setReady] = useState(false);
  const [removed, setRemoved] = useState(false);
  const urlKey = useMemo(() => urls.join("|"), [urls]);

  useEffect(() => {
    let cancelled = false;
    const unique = [...new Set(urlKey.split("|").filter(Boolean))];

    const failSafe = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, 12000);

    Promise.all(unique.map(loadImage)).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
    };
  }, [urlKey]);

  useEffect(() => {
    document.documentElement.classList.toggle("assets-loading", !ready);
    return () => document.documentElement.classList.remove("assets-loading");
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(() => setRemoved(true), 650);
    return () => window.clearTimeout(id);
  }, [ready]);

  return (
    <AssetsReadyContext.Provider value={ready}>
      <div
        className={styles.content}
        data-ready={ready ? "true" : "false"}
        aria-busy={!ready}
      >
        {children}
      </div>

      {!removed && (
        <div
          className={`${styles.gate} ${ready ? styles.gateOut : ""}`}
          aria-hidden={ready}
        />
      )}
    </AssetsReadyContext.Provider>
  );
}
