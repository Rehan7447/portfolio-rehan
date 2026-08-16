"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

/**
 * Copyable code block. Used on the agent docs page, where the whole point is
 * that a reader — human or the person driving an agent — can lift a payload
 * out and run it without retyping.
 */
export function CodeBlock({
  code,
  label,
  className,
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context, denied permission) — the text is
      // still selectable, so there's nothing useful to report here.
    }
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-void ${className ?? ""}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-dim">
          {label ?? "Request"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-dim transition-colors hover:bg-surface hover:text-text"
        >
          {copied ? (
            <>
              <FiCheck className="h-3 w-3 text-ok" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <FiCopy className="h-3 w-3" aria-hidden />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed">
        <code className="font-mono text-muted">{code}</code>
      </pre>
    </div>
  );
}
