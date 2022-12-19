import React from "react";
import styles from "./Buttons.module.scss";
import clsx from "clsx";
import Link from "@docusaurus/Link";

interface LinkProps {
  href: string;
  isExternal?: boolean;
}

const BackToTopButton = (props: LinkProps): React.ReactElement => {
  return (
    <Link
      href={props.href}
      target={props.isExternal ? "_blank" : "_self"}
      rel={props.isExternal ? "noopener noreferrer" : ""}
      className={styles.backToTopButton}
    >
      Back to top{" "}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 8L11.9895 4V20L12 4L16 8"
          stroke="#0278D5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Link>
  );
};

const ViewDetails = (props: LinkProps): React.ReactElement => {
  return (
    <Link
      to={props.href}
      target={props.isExternal ? "_blank" : "_self"}
      rel={props.isExternal ? "noopener noreferrer" : ""}
      className={clsx(styles.viewDetailsButton, styles.backToTopButton)}
    >
      View details{" "}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 8L20 12H4H20L16 16"
          stroke="#0278D5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Link>
  );
};

export { BackToTopButton, ViewDetails };
