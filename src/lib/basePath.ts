/** Empty locally; `/mayer` on GitHub Pages (see next.config + Actions). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
