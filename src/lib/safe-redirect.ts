// Accept only same-origin paths, including when URL parsers normalize slashes.
export function safeRedirect(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  try {
    const base = "https://iftarshare.invalid";
    const url = new URL(value, base);
    return url.origin === base ? `${url.pathname}${url.search}${url.hash}` : "/";
  } catch {
    return "/";
  }
}
