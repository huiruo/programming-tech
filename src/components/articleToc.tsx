"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ListTree, X } from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./articleToc.module.css";

type TocHeading = {
  id: string;
  level: 1 | 2 | 3;
  text: string;
};

const MOBILE_QUERY = "(max-width: 768px)";

function createSlug(value: string) {
  return value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[/?#[\]@!$&'()*+,;=:%"<>\\^`{|}~.]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") || "section";
}

function readArticleHeadings(article: HTMLElement): TocHeading[] {
  const usedIds = new Set(
    Array.from(document.querySelectorAll<HTMLElement>("[id]"), (element) => element.id),
  );

  return Array.from(article.querySelectorAll<HTMLHeadingElement>("h1, h2, h3")).map(
    (heading) => {
      const text = heading.textContent?.replace(/\s+/g, " ").trim() || "未命名章节";

      if (!heading.id) {
        const baseId = createSlug(text);
        let nextId = baseId;
        let duplicateIndex = 1;

        while (usedIds.has(nextId)) {
          nextId = `${baseId}-${duplicateIndex}`;
          duplicateIndex += 1;
        }

        heading.id = nextId;
        usedIds.add(nextId);
      }

      return {
        id: heading.id,
        level: Number(heading.tagName.slice(1)) as TocHeading["level"],
        text,
      };
    },
  );
}

function headingsAreEqual(current: TocHeading[], next: TocHeading[]) {
  return current.length === next.length && current.every((heading, index) => {
    const nextHeading = next[index];
    return nextHeading
      && heading.id === nextHeading.id
      && heading.level === nextHeading.level
      && heading.text === nextHeading.text;
  });
}

export function ArticleToc() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeToc = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".article");
    if (!article) return;

    let animationFrame = 0;
    const updateHeadings = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const nextHeadings = readArticleHeadings(article);
        setHeadings((current) => headingsAreEqual(current, nextHeadings) ? current : nextHeadings);
      });
    };

    updateHeadings();
    const observer = new MutationObserver(updateHeadings);
    observer.observe(article, { childList: true, subtree: true, characterData: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (headings.length < 2) {
      setIsOpen(false);
      setActiveId("");
      return;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const updateActiveHeading = () => {
      const current = elements.reduce<HTMLElement | null>((active, element) => {
        return element.getBoundingClientRect().top <= 96 ? element : active;
      }, elements[0] || null);

      if (current) setActiveId(current.id);
    };

    updateActiveHeading();

    const observer = new IntersectionObserver(updateActiveHeading, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    });
    elements.forEach((element) => observer.observe(element));
    window.addEventListener("hashchange", updateActiveHeading);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateActiveHeading);
    };
  }, [headings]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeToc();
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        closeToc(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [closeToc, isOpen]);

  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, isOpen]);

  if (headings.length < 2) return null;

  return (
    <div className={styles.root} data-article-toc>
      <button
        ref={triggerRef}
        className={styles.trigger}
        type="button"
        aria-label={isOpen ? "关闭文章目录" : "打开文章目录"}
        aria-controls="article-toc-panel"
        aria-expanded={isOpen}
        onClick={() => isOpen ? closeToc(false) : setIsOpen(true)}
      >
        <ListTree size={20} aria-hidden="true" />
        <span>目录</span>
      </button>

      {isOpen && (
        <>
          <button
            className={styles.backdrop}
            type="button"
            aria-label="关闭文章目录"
            onClick={() => closeToc()}
          />
          <aside
            ref={panelRef}
            id="article-toc-panel"
            className={styles.panel}
            role="dialog"
            aria-modal={isMobile || undefined}
            aria-labelledby="article-toc-title"
          >
            <header className={styles.header}>
              <h2 id="article-toc-title">文章目录</h2>
              <button
                ref={closeButtonRef}
                className={styles.closeButton}
                type="button"
                aria-label="关闭文章目录"
                onClick={() => closeToc()}
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <nav className={styles.navigation} aria-label="文章章节">
              <ol className={styles.list}>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      className={`${styles.link} ${styles[`level${heading.level}`]} ${activeId === heading.id ? styles.active : ""}`}
                      href={`#${encodeURIComponent(heading.id)}`}
                      aria-current={activeId === heading.id ? "location" : undefined}
                      onClick={() => {
                        setActiveId(heading.id);
                        if (isMobile) closeToc();
                      }}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </>
      )}
    </div>
  );
}
