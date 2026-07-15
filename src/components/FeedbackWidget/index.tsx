import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Tooltip from 'rc-tooltip';
import styles from './styles.module.css';

export type FeedbackSource = 'docs' | 'university';
type FeedbackType = 'bug' | 'missing-info' | 'suggestion' | 'praise';
type Step = 'feedback' | 'contact' | 'done';

interface FeedbackWidgetProps {
  source?: FeedbackSource;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FEEDBACK_TYPES: { id: FeedbackType; label: string }[] = [
  { id: 'bug', label: 'Something is wrong' },
  { id: 'missing-info', label: "Info is missing" },
  { id: 'suggestion', label: 'Suggestion' },
  { id: 'praise', label: 'Praise' },
];

// Line icons matching the Docs 3.0 iconography (thin currentColor strokes,
// no fill) instead of native emoji, which render as colourful platform
// glyphs and clash with the rest of the 3.0 visual language. currentColor
// means each icon automatically follows .typeChip / .typeChipActive text
// colour - no separate icon colour styling needed.
function FeedbackTypeIcon({ type }: { type: FeedbackType }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none' as const,
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
    className: styles.typeIcon,
  };

  switch (type) {
    case 'bug':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 4.75V8.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.75" fill="currentColor" />
        </svg>
      );
    case 'missing-info':
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.3" />
          <path d="M10.25 10.25L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case 'suggestion':
      return (
        <svg {...common}>
          <path
            d="M8 1.75C5.65279 1.75 3.75 3.65279 3.75 6C3.75 7.55 4.6 8.85 5.85 9.6C6.15 9.78 6.35 10.08 6.35 10.42V11.25H9.65V10.42C9.65 10.08 9.85 9.78 10.15 9.6C11.4 8.85 12.25 7.55 12.25 6C12.25 3.65279 10.3472 1.75 8 1.75Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6.5 13H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M6.85 14.25H9.15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'praise':
      return (
        <svg {...common}>
          <path
            d="M2.5 8.75H4.75V13.5H2.5C2.086 13.5 1.75 13.164 1.75 12.75V9.5C1.75 9.086 2.086 8.75 2.5 8.75Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.75 8.75L7.4 2.9C7.53 2.62 7.86 2.5 8.14 2.63C8.98 3.02 9.5 3.87 9.5 4.8V6.5H12.4C13.02 6.5 13.49 7.06 13.38 7.67L12.63 12.42C12.54 12.99 12.05 13.5 11.48 13.5H4.75"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

// Best-effort, no extra network round trip: pulls a readable module name out
// of the URL path so the drafted Ask AI question has some context, mirroring
// the same /docs|3k-docs|university/<slug>/ convention the n8n workflow
// already uses server-side. This is a display heuristic, not a source of
// truth - if it guesses wrong, the reader edits the question before it's
// sent, since we prefill but never auto-submit.
function deriveModuleLabel(url: string): string {
  try {
    const path = new URL(url).pathname;
    const match = path.match(/\/(?:docs|3k-docs|university)\/([^/]+)/);
    if (!match) return 'Harness Developer Hub';
    return match[1]
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch {
    return 'Harness Developer Hub';
  }
}

function buildAskAIQuery(feedbackText: string, url: string): string {
  const moduleLabel = deriveModuleLabel(url);
  return `On the ${moduleLabel} documentation (${url}), a reader said: "${feedbackText}". Can you help answer their question or point me to the right information?`;
}

function FeedbackModal({
  source,
  onClose,
}: {
  source: FeedbackSource;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>('feedback');
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [wantsReply, setWantsReply] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Tracks which submit action is in flight/completed, so the auto-dismiss
  // timer below only applies to a plain submit - the Ask AI path closes
  // itself once the Kapa widget actually opens (see openAskAIAndClose).
  const [askAIRequested, setAskAIRequested] = useState(false);

  // Escape closes the modal from any step.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Auto-dismiss a couple seconds after the thank-you state for a plain
  // submit; cancelled on unmount/early close per the project's
  // timer-cleanup convention. Skipped for the Ask AI path, which closes via
  // openAskAIAndClose instead.
  useEffect(() => {
    if (step !== 'done' || askAIRequested) return undefined;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [step, askAIRequested, onClose]);

  const canContinueFeedback = feedbackType !== null && feedbackText.trim().length > 0;
  // Reply path only requires a valid email now - the explicit per-field
  // consent checkbox was folded into the general disclaimer shown on both
  // steps (see .disclaimer below) at Richard's request.
  const canSubmit = !submitting && (!wantsReply || EMAIL_RE.test(email.trim()));

  // Bug/missing-info/suggestion all share the same "help me find this"
  // framing, but praise isn't a problem to solve - Ask AI there is framed as
  // an invitation to explore further, not a fallback for unmet needs.
  const askAINote =
    feedbackType === 'praise'
      ? "Thanks for the kind words! Want to know more? Submit and Ask AI will open Ask AI so you can explore the Harness Developer Hub further."
      : 'Not finding what you need? Submit and Ask AI will draft a question from your feedback and open Ask AI, searching the entire Harness Developer Hub.';

  const handleContinueFromFeedback = useCallback(() => {
    if (!canContinueFeedback) return;
    setStep('contact');
  }, [canContinueFeedback]);

  // Opens the real Kapa Ask AI widget with a drafted (but unsent) question,
  // then closes this modal the moment Kapa's own onModalOpen event fires -
  // per Richard's call, the close is driven by the widget actually opening,
  // not an arbitrary timer. An 8s fallback closes anyway if the widget
  // script is blocked or slow, so the reader is never stuck on this screen.
  //
  // The question itself is drafted server-side by Gemini (falls back to the
  // plain template on any error/timeout) rather than just wrapping the raw
  // feedback text - see ask_ai_question_draft.mts for why a template alone
  // isn't a real rephrasing.
  const openAskAIAndClose = useCallback(async () => {
    const kapa = typeof window !== 'undefined' ? (window as any).Kapa : undefined;
    if (typeof kapa !== 'function') {
      onClose();
      return;
    }

    const url = window.location.href;
    const moduleLabel = deriveModuleLabel(url);
    const trimmedFeedback = feedbackText.trim();
    let question = buildAskAIQuery(trimmedFeedback, url);

    try {
      const res = await fetch('/api/ask_ai_question_draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackText: trimmedFeedback, moduleLabel, url }),
      });
      if (res.ok) {
        const data: { question?: string } = await res.json();
        if (data.question) question = data.question;
      }
    } catch {
      // Network error - keep the template-based fallback question.
    }

    let settled = false;
    let fallbackTimer: ReturnType<typeof setTimeout>;

    const handleModalOpen = () => {
      if (settled) return;
      settled = true;
      clearTimeout(fallbackTimer);
      kapa('onModalOpen', handleModalOpen, 'remove');
      onClose();
    };

    fallbackTimer = setTimeout(() => {
      if (settled) return;
      settled = true;
      kapa('onModalOpen', handleModalOpen, 'remove');
      onClose();
    }, 8000);

    kapa('onModalOpen', handleModalOpen, 'add');
    kapa('open', { mode: 'ai', query: question, submit: false });
  }, [feedbackText, onClose]);

  const handleSubmit = useCallback(
    async (askAI: boolean) => {
      if (!canSubmit) return;
      setSubmitting(true);
      setSubmitError(null);
      setAskAIRequested(askAI);
      try {
        const res = await fetch('/api/feedback_submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            feedbackType,
            feedbackText: feedbackText.trim(),
            wantsReply,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            currentUrl: window.location.href,
            source,
            kapaAssistShown: askAI,
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => null);
          throw new Error(errBody?.error || `Request failed (${res.status})`);
        }
        setStep('done');
        if (askAI) {
          void openAskAIAndClose();
        }
      } catch (err) {
        setAskAIRequested(false);
        setSubmitError(
          err instanceof Error ? err.message : 'Something went wrong. Please try again.'
        );
      } finally {
        setSubmitting(false);
      }
    },
    [
      canSubmit,
      feedbackType,
      feedbackText,
      wantsReply,
      firstName,
      lastName,
      email,
      source,
      openAskAIAndClose,
    ]
  );

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-widget-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Dismiss feedback form"
          onClick={onClose}
        >
          &times;
        </button>


        {step === 'feedback' && (
          <>
            <div className={styles.badgeRow}>
              <span className={styles.badge}>1</span>
              <h2 id="feedback-widget-title" className={styles.title} style={{ margin: 0 }}>
                Provide feedback
              </h2>
            </div>
            <p className={styles.subtitle}>
              What's this about? Pick one, then tell us more.
            </p>

            <div className={styles.typeRow}>
              {FEEDBACK_TYPES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  className={clsx(styles.typeChip, feedbackType === t.id && styles.typeChipActive)}
                  onClick={() => setFeedbackType(t.id)}
                  aria-pressed={feedbackType === t.id}
                >
                  <FeedbackTypeIcon type={t.id} />
                  {t.label}
                </button>
              ))}
            </div>

            <textarea
              className={styles.textarea}
              maxLength={500}
              placeholder="Your feedback here."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className={styles.counter}>{feedbackText.length} / 500</div>

            <div className={styles.actionsRow}>
              <button
                type="button"
                className={styles.primaryButton}
                disabled={!canContinueFeedback}
                onClick={handleContinueFromFeedback}
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === 'contact' && (
          <>
            <div className={styles.badgeRow}>
              <button
                type="button"
                className={styles.backButton}
                aria-label="Back to feedback details"
                onClick={() => setStep('feedback')}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M11 4L5.5 9L11 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className={styles.badge}>2</span>
              <h2 id="feedback-widget-title" className={styles.title} style={{ margin: 0 }}>
                Almost done
              </h2>
            </div>
            <p className={styles.subtitle}>
              Your feedback is submitted anonymously unless you'd like us to follow up.
            </p>

            <label className={styles.replyToggle}>
              <input
                type="checkbox"
                checked={wantsReply}
                onChange={(e) => setWantsReply(e.target.checked)}
              />
              I'd like a reply about this
            </label>

            {wantsReply && (
              <div className={styles.replyFields}>
                <label className={styles.label} htmlFor="feedback-first-name">
                  First Name
                </label>
                <input
                  id="feedback-first-name"
                  className={styles.input}
                  placeholder="Jane"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className={styles.label} htmlFor="feedback-last-name">
                  Last Name
                </label>
                <input
                  id="feedback-last-name"
                  className={styles.input}
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <label className={styles.label} htmlFor="feedback-email">
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  className={styles.input}
                  placeholder="you@awesome.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            {submitError && <p className={styles.error}>{submitError}</p>}

            <p className={styles.askAINote}>{askAINote}</p>

            <div className={styles.actionsRow}>
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={!canSubmit}
                onClick={() => handleSubmit(true)}
              >
                {!(submitting && askAIRequested) && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 1.5C8 1.5 8.6 5.2 10 6.6C11.4 8 15.1 8.5 15.1 8.5C15.1 8.5 11.4 9 10 10.4C8.6 11.8 8 15.5 8 15.5C8 15.5 7.4 11.8 6 10.4C4.6 9 0.9 8.5 0.9 8.5C0.9 8.5 4.6 8 6 6.6C7.4 5.2 8 1.5 8 1.5Z" />
                  </svg>
                )}
                {submitting && askAIRequested ? 'Sending…' : 'Submit and Ask AI'}
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                disabled={!canSubmit}
                onClick={() => handleSubmit(false)}
              >
                {submitting && !askAIRequested ? 'Sending…' : 'Submit feedback'}
              </button>
            </div>
          </>
        )}

        {step === 'done' && (
          <>
            <div className={styles.doneIcon} aria-hidden="true">
              ✓
            </div>
            <h2 id="feedback-widget-title" className={styles.title}>
              Thank you!
            </h2>
            <p className={styles.subtitle}>Your feedback has been submitted.</p>
            {askAIRequested && (
              <div className={styles.askAIOpening}>
                <span className={styles.spinner} aria-hidden="true" />
                <span>Opening Ask AI…</span>
              </div>
            )}
          </>
        )}

        {step !== 'done' && (
          <>
            <p className={styles.disclaimer}>
              By submitting, you agree to Harness&apos;s{' '}
              <a href="https://harness.io/legal/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              .
            </p>
            <div className={styles.progress}>
              <span
                className={clsx(
                  styles.progressDot,
                  step === 'feedback' && styles.progressDotActive
                )}
              />
              <span
                className={clsx(
                  styles.progressDot,
                  step === 'contact' && styles.progressDotActive
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function FeedbackWidget({ source = 'docs' }: FeedbackWidgetProps) {
  const [open, setOpen] = useState(false);

  return (
    <BrowserOnly fallback={<div />}>
      {() => (
        <>
          <Tooltip placement="left" overlay="Leave feedback to help us improve">
            <button type="button" className="feedback" onClick={() => setOpen(true)}>
              <img
                src="/img/icon-feedback-outline.svg"
                alt="Feedback"
                width={18}
                height={18}
                className="feedback-img"
              />
              <span className="feedback-span">Feedback</span>
            </button>
          </Tooltip>
          {open && <FeedbackModal source={source} onClose={() => setOpen(false)} />}
        </>
      )}
    </BrowserOnly>
  );
}
