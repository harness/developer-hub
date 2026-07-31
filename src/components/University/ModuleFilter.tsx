import React, { useEffect, useId, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import type { ModuleFilterOption } from "./data/moduleFilters";
import styles from "./ModuleFilter.module.scss";

type ModuleFilterProps = {
  options: ModuleFilterOption[];
  selected: string;
  onChange: (value: string) => void;
  /** Accessible label for the control. */
  label?: string;
};

export default function ModuleFilter({
  options,
  selected,
  onChange,
  label = "Filter by Module",
}: ModuleFilterProps) {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = `module-filter-${useId()}`;

  const selectedOption =
    options.find((option) => option.value === selected) ?? options[0];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className={styles.moduleFilter} ref={containerRef}>
      <span className={styles.label} id={`${listboxId}-label`}>
        {label}
      </span>
      <div className={styles.dropdownContainer}>
        <button
          type="button"
          ref={buttonRef}
          className={styles.dropdownHeader}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-labelledby={`${listboxId}-label`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.optionValue}>
            {selectedOption?.icon && (
              <img src={`${baseUrl}${selectedOption.icon}`} alt="" />
            )}
            <span className={styles.optionLabel}>{selectedOption?.label}</span>
          </span>
          <i
            className={clsx(
              "fa-solid",
              isOpen ? "fa-chevron-up" : "fa-chevron-down"
            )}
          ></i>
        </button>
        {isOpen && (
          <ul className={styles.dropdownList} id={listboxId} role="listbox">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === selected}
                tabIndex={0}
                className={clsx({
                  [styles.selected]: option.value === selected,
                })}
                onClick={() => handleSelect(option.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelect(option.value);
                  }
                }}
              >
                {option.icon && (
                  <img src={`${baseUrl}${option.icon}`} alt="" />
                )}
                <span className={styles.optionLabel}>{option.label}</span>
                <span className={styles.count}>{option.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
