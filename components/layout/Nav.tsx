"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport (home only).
  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }
    const sections = navLinks
      .map((l) => document.getElementById(l.href.split("#")[1]))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isHome]);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close the sheet on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors duration-200",
          scrolled
            ? "border-line bg-bg/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <nav
          className="container-px flex h-14 items-center justify-between md:h-16"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-text"
            aria-label={`${siteConfig.name} — home`}
          >
            Rehan Ashraf
            <span className="ml-2 hidden font-mono text-xs font-normal text-dim sm:inline">
              / Full-Stack &amp; AI
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.split("#")[1];
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors",
                      active === id
                        ? "text-text"
                        : "text-muted hover:text-text"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="ml-2">
              <Link
                href="/#contact"
                className="rounded-lg bg-text px-4 py-2 text-sm font-medium text-void transition-colors hover:bg-white"
              >
                Start a project
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-line text-text md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={cn(
                  "block h-px w-4 bg-current transition-transform duration-200",
                  open && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-current transition-opacity duration-200",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-current transition-transform duration-200",
                  open && "-translate-y-[6px] -rotate-45"
                )}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-40 bg-bg md:hidden">
          <div className="container-px flex h-full flex-col pt-24">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-xl font-medium tracking-tight text-text"
                  >
                    <span className="font-mono text-xs text-dim">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-text px-5 py-3.5 text-sm font-medium text-void"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
