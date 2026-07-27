import { useEffect, useRef, useState } from "react";

/**
 * Pause animations when the element leaves the viewport. SSR-safe: the
 * observer is only created inside useEffect, which never runs on the
 * server, and IntersectionObserver is feature-detected for older engines.
 *
 * Shared across all onboarding illustrations so offscreen heroes do not
 * keep painting, without every illustration re-declaring the same hook.
 */
export function usePauseWhenOffscreen<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
