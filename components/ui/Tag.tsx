import { cn } from "@/lib/utils";

/** Small mono chip used for stack/tech labels. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-bg px-2 py-1 font-mono text-[11px] leading-none text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

export function TagList({
  items,
  limit,
  className,
}: {
  items: readonly string[];
  limit?: number;
  className?: string;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
      {rest > 0 && (
        <li>
          <Tag className="text-dim">+{rest}</Tag>
        </li>
      )}
    </ul>
  );
}
