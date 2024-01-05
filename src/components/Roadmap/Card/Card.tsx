import React, { useState, type ReactNode, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

type Feature = {
  title?: string;
  description?: string;
};
export interface Horizon {
  threemos?: Feature[];
  ninemos?: Feature[];
  twelvemos?: Feature[];
}

export interface Props {
  title: string;
  description?: string;
  horizon?: Horizon;
  module: string;
}

function CardContainer({
  children,
  module,
}: {
  children: ReactNode;
  module: string;
}): JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, element: any) => {
    focusInput(element);
  };
  useEffect(() => {
    const element = document.getElementById("cd");
    if (element) {
      element.focus();
    }
  }, []);
  const element = useRef<HTMLDivElement>(null);

  const focusInput = (element: any) => {
    element.current.focus();
  };

  return (
    <Link to={`roadmap/#${module}`}>
      <div
        id={module}
        ref={element}
        onClick={(e) => handleClick(e, element)}
        className={clsx(
          "card padding--lg",
          styles.cardContainer,
          styles[module]
        )}
        tabIndex={0} // Allow the div to receive focus
      >
        {children}
      </div>
    </Link>
  );
}

function CardLayout({
  title,
  description,
  horizon,
  module,
}: // hadleClick,
Props): JSX.Element {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <CardContainer module={module}>
      <img src={`${baseUrl}img/icon_${module}.svg`} />
      <h2 className={clsx("text--truncate", styles.cardTitle)} title={title}>
        {title}
      </h2>
      {description && (
        <p
          className={clsx("text--truncate", styles.cardDescription)}
          title={description}
        >
          {description}
        </p>
      )}
    </CardContainer>
  );
}

export default function DocCard({
  title,
  description,
  horizon,
  module,
}: // handleClick,
Props): JSX.Element {
  return (
    <CardLayout
      title={title}
      description={description}
      horizon={horizon}
      module={module}
    />
  );
}
