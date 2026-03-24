import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const listener = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);
  return prefersReducedMotion;
}

const EXAMPLE_QUESTIONS = [
  'How do I update Harness delegate?',
  'Can I save my filter settings?',
  'How do I set up a CI pipeline?',
  'How do I configure GitOps?',
];

const TYPING_MS = 70;
const PAUSE_AFTER_TYPE_MS = 4200; // Longer pause so slower readers can read the full question
const DELETING_MS = 35;
const PAUSE_AFTER_DELETE_MS = 400;

type KapaProps = {
  variant?: 'default' | 'landing';
};

function useTypingAnimation(phrases: string[], enabled: boolean) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || phrases.length === 0) return;
    const phrase = phrases[phraseIndex];
    if (!phrase) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < phrase.length) {
            setDisplayText(phrase.slice(0, displayText.length + 1));
          } else {
            setIsDeleting(true);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(phrase.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((i) => (i + 1) % phrases.length);
          }
        }
      },
      isDeleting
        ? displayText.length === 0
          ? PAUSE_AFTER_DELETE_MS
          : DELETING_MS
        : displayText.length === phrase.length
          ? PAUSE_AFTER_TYPE_MS
          : TYPING_MS
    );
    return () => clearTimeout(timeout);
  }, [enabled, phraseIndex, displayText, isDeleting, phrases]);

  // When reduced motion: show first example as static text (no animation)
  if (!enabled) return phrases[0] ?? '';
  return displayText;
}

const Kapa = ({ variant = 'default' }: KapaProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animateTyping = !prefersReducedMotion;
  const typingText = useTypingAnimation(EXAMPLE_QUESTIONS, animateTyping);
  const gradientId = React.useId().replace(/:/g, '-');

  if (variant === 'landing') {
    return (
      <button
        type="button"
        className={`${styles.navbar__search_kapa} ${styles.navbar__search_kapa_landing} navbar__search_kapa ${prefersReducedMotion ? styles.reducedMotion : ''}`}
        aria-label="Open Ask AI search. Press Command K to open from anywhere."
      >
        <span className={styles.landing_inner}>
          {/* Decorative typing animation: hidden from screen readers; purpose is in aria-label */}
          <span className={styles.landing_typing} aria-hidden="true">
            <span className={styles.landing_icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M18.5 7.84656v-5M5.5 20.8466v-5M16 5.34656h5M3 18.3466H8M6.5 1.84656 5.71554 3.41547c-.26549.53098-.39823.79647-.57557 1.02653C4.98261 4.64615 4.79959 4.82917 4.59545 4.98653c-.23007.17734-.49555.31008-1.02653.57557L2 6.34656l1.56892.78446c.53098.26549.79646.39823 1.02653.57557C4.79959 7.86395 4.98261 8.04696 5.13997 8.25111c.17734.23006.31008.49555.57557 1.02653L6.5 10.8466l.78446-1.56896C7.54995 8.74666 7.68269 8.48117 7.86003 8.25111 8.01739 8.04696 8.20041 7.86395 8.40455 7.70659 8.63462 7.52925 8.9001 7.3965 9.43108 7.13102L11 6.34656 9.43108 5.5621c-.53098-.26549-.79646-.39823-1.02653-.57557C8.20041 4.82917 8.01739 4.64615 7.86003 4.442c-.17734-.23006-.31008-.49555-.57557-1.02653L6.5 1.84656zM17 11.8466l-.9511 1.9022C15.7834 14.2798 15.6506 14.5453 15.4733 14.7753 15.3159 14.9795 15.1329 15.1625 14.9288 15.3199 14.6987 15.4972 14.4332 15.6299 13.9023 15.8954L12 16.8466l1.9023.9511C14.4332 18.0632 14.6987 18.1959 14.9288 18.3733 15.1329 18.5306 15.3159 18.7136 15.4733 18.9178c.177300000000001.23.3101.4955.5756 1.0265L17 21.8466l.9511-1.9023C18.2166 19.4133 18.3494 19.1478 18.5267 18.9178 18.6841 18.7136 18.8671 18.5306 19.0712 18.3733 19.3013 18.1959 19.5668 18.0632 20.0977 17.7977L22 16.8466 20.0977 15.8954C19.5668 15.6299 19.3013 15.4972 19.0712 15.3199 18.8671 15.1625 18.6841 14.9795 18.5267 14.7753 18.3494 14.5453 18.2166 14.2798 17.9511 13.7488L17 11.8466z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
            <span className={styles.landing_typing_text_wrapper}>
              Ask AI: <span className={styles.landing_typing_text}>{typingText}</span>
              <span className={styles.landing_typing_cursor} aria-hidden>|</span>
            </span>
          </span>
          <kbd className={styles.landing_shortcut} aria-hidden="true">⌘K</kbd>
        </span>
      </button>
    );
  }

  const sparklePath =
    'M18.5 7.84656v-5M5.5 20.8466v-5M16 5.34656h5M3 18.3466H8M6.5 1.84656 5.71554 3.41547c-.26549.53098-.39823.79647-.57557 1.02653C4.98261 4.64615 4.79959 4.82917 4.59545 4.98653c-.23007.17734-.49555.31008-1.02653.57557L2 6.34656l1.56892.78446c.53098.26549.79646.39823 1.02653.57557C4.79959 7.86395 4.98261 8.04696 5.13997 8.25111c.17734.23006.31008.49555.57557 1.02653L6.5 10.8466l.78446-1.56896C7.54995 8.74666 7.68269 8.48117 7.86003 8.25111 8.01739 8.04696 8.20041 7.86395 8.40455 7.70659 8.63462 7.52925 8.9001 7.3965 9.43108 7.13102L11 6.34656 9.43108 5.5621c-.53098-.26549-.79646-.39823-1.02653-.57557C8.20041 4.82917 8.01739 4.64615 7.86003 4.442c-.17734-.23006-.31008-.49555-.57557-1.02653L6.5 1.84656zM17 11.8466l-.9511 1.9022C15.7834 14.2798 15.6506 14.5453 15.4733 14.7753 15.3159 14.9795 15.1329 15.1625 14.9288 15.3199 14.6987 15.4972 14.4332 15.6299 13.9023 15.8954L12 16.8466l1.9023.9511C14.4332 18.0632 14.6987 18.1959 14.9288 18.3733 15.1329 18.5306 15.3159 18.7136 15.4733 18.9178c.177300000000001.23.3101.4955.5756 1.0265L17 21.8466l.9511-1.9023C18.2166 19.4133 18.3494 19.1478 18.5267 18.9178 18.6841 18.7136 18.8671 18.5306 19.0712 18.3733 19.3013 18.1959 19.5668 18.0632 20.0977 17.7977L22 16.8466 20.0977 15.8954C19.5668 15.6299 19.3013 15.4972 19.0712 15.3199 18.8671 15.1625 18.6841 14.9795 18.5267 14.7753 18.3494 14.5453 18.2166 14.2798 17.9511 13.7488L17 11.8466z';

  return (
    <button className={`${styles.navbar__search_kapa} navbar__search_kapa`}>
      <span className={styles.search_text}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className={styles.sparkle_icon}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#FF99C9" />
              <stop offset="0.5" stopColor="#926EF7" />
              <stop offset="1" stopColor="#6EEEF7" />
            </linearGradient>
          </defs>
          <path
            d={sparklePath}
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <p>Ask AI</p>
      </span>
    </button>
  );
};

export default Kapa;
