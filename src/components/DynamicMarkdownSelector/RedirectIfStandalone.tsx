import { useEffect } from "react";

interface RedirectIfStandaloneProps {
  label: string;
  targetPage: string;
  matchSegment?: string;
}

export default function RedirectIfStandalone({
  label,
  targetPage,
  matchSegment,
}: RedirectIfStandaloneProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathname = window.location.pathname;
    const lastSegment = matchSegment || pathname.split("/").pop() || "";

    const normalize = (s: string) =>
      s.toLowerCase().replace(/[^a-z0-9]/g, ""); // remove dashes, etc.

    const normLabel = normalize(label);
    const normSegment = normalize(lastSegment);

    const isDirectLoad = pathname.includes("/content/") || pathname.includes("/supported-formats/");

    if (isDirectLoad && (normSegment === normLabel || normSegment.startsWith(normLabel))) {
      const redirectTo = `${targetPage}#${normLabel}`;
      window.location.replace(redirectTo);
    }
  }, [label, targetPage, matchSegment]);

  return null;
}