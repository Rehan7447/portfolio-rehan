"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

/**
 * Mobile-only conversion bar.
 *
 * On a phone the nav's "Start a project" button lives behind the menu button,
 * so the primary action disappears the moment someone scrolls. This brings it
 * back — and gets out of the way once the contact section or the footer is on
 * screen, where it would be redundant or covering real content.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let scrolledPast = false;
    let nearEnd = false;

    const sync = () => setVisible(scrolledPast && !nearEnd);

    const onScroll = () => {
      scrolledPast = window.scrollY > 700;
      sync();
    };

    // The contact form and the footer both already carry the action.
    const targets = [
      document.getElementById("contact"),
      document.querySelector("footer"),
    ].filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      () => {
        nearEnd = targets.some((t) => {
          const rect = t.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
        sync();
      },
      { threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 backdrop-blur-md transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      // Hidden from assistive tech while off-screen; the same action is in the
      // nav and the contact section, so nothing is lost.
      aria-hidden={!visible}
    >
      <div className="container-px flex items-center justify-between gap-4 py-3">
        <span className="flex flex-col">
          <span className="text-sm font-medium text-text">
            Free 30-min consult
          </span>
          <span className="text-xs text-dim">Reply within 1 business day</span>
        </span>
        <Link
          href="/#contact"
          tabIndex={visible ? undefined : -1}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-text px-4 py-2.5 text-sm font-medium text-void"
        >
          Start a project
          <FiArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
