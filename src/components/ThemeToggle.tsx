"use client";
import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  function toggle() {
    const next = dark ? "iftar" : "iftar-dark";
    document.documentElement.setAttribute("data-theme", next);
    setDark(!dark);
  }

  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Toggle light and dark theme">
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
      )}
    </button>
  );
}
