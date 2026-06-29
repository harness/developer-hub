import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  tokenize,
  uniqueVariables,
  substitute,
  type PlaceholderToken,
} from '@site/src/components/PromptLibrary/lib/placeholders';
import { usePromptLibrary } from '@site/src/components/PromptLibrary/PromptLibraryContext';
import styles from './PromptBuilder.module.scss';

export interface PromptBuilderProps {
  /** Prompt body containing bracketed placeholders, e.g. `[SERVICE_NAME]`, `[FAULT_TYPE - e.g. pod-delete]`. */
  template: string;
  inputsHeading?: string;
  inputsHelpText?: string;
  copyButtonLabel?: string;
}

const DEFAULTS = {
  inputsHeading: 'Fill in your values',
  inputsHelpText:
    'Type a value and watch it appear in the prompt below. The copy button copies the filled-in version.',
  copyButtonLabel: 'Copy prompt',
};

const COPY_SHORTCUT_LABEL = '⌘/Ctrl+C';

function variablePlaceholder(token: PlaceholderToken): string {
  if (token.hint) return token.hint;
  return `Enter ${token.name.toLowerCase()}`;
}

function PromptBuilderInner({
  template,
  inputsHeading = DEFAULTS.inputsHeading,
  inputsHelpText = DEFAULTS.inputsHelpText,
  copyButtonLabel = DEFAULTS.copyButtonLabel,
}: PromptBuilderProps) {
  const library = usePromptLibrary();
  const variables = useMemo(() => uniqueVariables([template]), [template]);
  const tokens = useMemo(() => tokenize(template), [template]);

  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const promptBodyRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    setValues({});
  }, [template]);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
    };
  }, []);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const filledPrompt = useMemo(
    () => substitute(template, values),
    [template, values],
  );

  const selectPromptText = () => {
    const node = promptBodyRef.current;
    if (!node || typeof window === 'undefined') return;
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleCopy = async () => {
    if (copiedTimerRef.current) {
      clearTimeout(copiedTimerRef.current);
    }
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(filledPrompt);
      setCopyError(false);
      setCopied(true);
      copiedTimerRef.current = setTimeout(() => {
        setCopied(false);
        copiedTimerRef.current = undefined;
      }, 1800);
    } catch {
      setCopied(false);
      setCopyError(true);
      selectPromptText();
      copiedTimerRef.current = setTimeout(() => {
        setCopyError(false);
        copiedTimerRef.current = undefined;
      }, 4000);
    }
  };

  const renderedSegments = tokens.map((token, index) => {
    if (token.kind === 'text') {
      return (
        <React.Fragment key={`t-${index}`}>{token.value}</React.Fragment>
      );
    }
    const value = values[token.key];
    if (value && value.trim()) {
      return (
        <span key={`f-${token.key}-${index}`} className={styles.tokenFilled}>
          {value}
        </span>
      );
    }
    return (
      <span key={`e-${token.key}-${index}`} className={styles.tokenEmpty}>
        {token.raw}
      </span>
    );
  });

  return (
    <div className={styles.container}>
      {variables.length > 0 ? (
        <section className={styles.inputsCard} aria-labelledby="prompt-builder-inputs-heading">
          <div className={styles.inputsIntro}>
            <h4 id="prompt-builder-inputs-heading" className={styles.sectionHeading}>
              {inputsHeading}
            </h4>
            {inputsHelpText ? <p className={styles.helpText}>{inputsHelpText}</p> : null}
          </div>
          <div className={styles.inputsGrid}>
            {variables.map((token) => {
              const inputId = `prompt-builder-${token.key.replace(/[^A-Za-z0-9]+/g, '-')}`;
              const tooltip = library?.getPlaceholderTooltip(token.name) ?? token.hint;
              const placeholder = variablePlaceholder(token);
              return (
                <label
                  key={token.key}
                  htmlFor={inputId}
                  className={styles.inputGroup}
                >
                  <span className={styles.inputLabel}>
                    <span className={styles.labelText}>{token.name}</span>
                    {tooltip ? <FieldTooltip text={tooltip} label={token.name} /> : null}
                  </span>
                  <input
                    id={inputId}
                    type="text"
                    className={styles.input}
                    placeholder={placeholder}
                    value={values[token.key] ?? ''}
                    onChange={(e) => handleChange(token.key, e.target.value)}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {token.hint ? <span className={styles.hint}>{token.hint}</span> : null}
                </label>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className={styles.promptCard} aria-label="Prompt to copy">
        <button
          type="button"
          className={`${styles.copyButton} ${copied ? styles.copyButtonSuccess : ''} ${
            copyError ? styles.copyButtonError : ''
          }`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : copyButtonLabel}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? 'Copied!' : copyButtonLabel}</span>
        </button>
        <pre className={styles.promptBody} ref={promptBodyRef}>
          {variables.length === 0 ? template : renderedSegments}
        </pre>
        {copyError ? (
          <p className={styles.copyErrorMessage} role="alert">
            Copy failed — the text is selected, press {COPY_SHORTCUT_LABEL} to copy manually.
          </p>
        ) : null}
      </section>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const TOOLTIP_WIDTH = 256;
const TOOLTIP_GAP = 8;
const VIEWPORT_PADDING = 8;

interface FieldTooltipProps {
  text: string;
  label: string;
}

function FieldTooltip({ text, label }: FieldTooltipProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, arrowLeft: TOOLTIP_WIDTH / 2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const computePosition = () => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const minLeft = VIEWPORT_PADDING;
    const maxLeft = window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_PADDING;
    let left = iconCenterX - TOOLTIP_WIDTH / 2;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;
    const top = rect.top - TOOLTIP_GAP;
    const arrowLeft = Math.max(8, Math.min(TOOLTIP_WIDTH - 8, iconCenterX - left));
    setPos({ top, left, arrowLeft });
  };

  const show = () => {
    computePosition();
    setOpen(true);
  };
  const hide = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onChange = () => computePosition();
    window.addEventListener('scroll', onChange, true);
    window.addEventListener('resize', onChange);
    return () => {
      window.removeEventListener('scroll', onChange, true);
      window.removeEventListener('resize', onChange);
    };
  }, [open]);

  const tooltipStyle: CSSProperties = {
    top: pos.top,
    left: pos.left,
    width: TOOLTIP_WIDTH,
    opacity: open ? 1 : 0,
    transform: `translateY(${open ? '-100%' : 'calc(-100% + 4px)'})`,
  };

  return (
    <span className={styles.tooltipWrap}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={`What is ${label}?`}
        className={styles.tooltipTrigger}
        tabIndex={0}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        <InfoIcon />
      </button>
      {mounted &&
        createPortal(
          <span role="tooltip" className={styles.tooltip} style={tooltipStyle}>
            {text}
            <span
              className={styles.tooltipArrow}
              style={{ left: pos.arrowLeft - 4 }}
            />
          </span>,
          document.body,
        )}
    </span>
  );
}

function InfoIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function StaticFallback({ template }: PromptBuilderProps) {
  return (
    <div className={styles.container}>
      <section className={styles.promptCard}>
        <pre className={styles.promptBody}>{template}</pre>
      </section>
    </div>
  );
}

export default function PromptBuilder(props: PromptBuilderProps) {
  return (
    <BrowserOnly fallback={<StaticFallback {...props} />}>
      {() => <PromptBuilderInner {...props} />}
    </BrowserOnly>
  );
}
