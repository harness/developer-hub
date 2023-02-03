import React from "react";
import MDXComponents from "@theme/MDXComponents";
import styles from "./Accordion.module.scss";
import clsx from "clsx";

export default function Accordion({ children, color }) {
	return (
		<MDXComponents.details
			className={clsx({
				[styles.accordionGreen]: color === "green",
			})}
		>
			{children}
		</MDXComponents.details>
	);
}
