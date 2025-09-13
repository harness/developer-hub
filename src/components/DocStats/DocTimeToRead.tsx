import React, {useEffect, useRef, useState} from 'react';

function countWordsFromContainer(): number {
  const el = document.querySelector('.theme-doc-markdown');
  if (!el) return 0;
  const text = el.textContent || '';
  const words = (text.trim().match(/\S+/g) || []).length;
  return words;
}

export default function DocTimeToRead({wpm = 200}: {wpm?: number}) {
  const [minutes, setMinutes] = useState<number>(1);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const compute = () => {
      const words = countWordsFromContainer();
      const mins = Math.max(1, Math.round(words / wpm));
      setMinutes(mins);
    };

    // Initial compute after hydration
    compute();

    // Recompute if the page content swaps (route change/HMR)
    const target = document.querySelector('.theme-doc-markdown');
    if (target) {
      observerRef.current?.disconnect();
      observerRef.current = new MutationObserver(() => compute());
      observerRef.current.observe(target, {childList: true, subtree: true});
    }

    return () => observerRef.current?.disconnect();
  }, [wpm]);

  const label = `${minutes} minute read`;
  return <span className="docStat docStat--ttr">{label}</span>;
}