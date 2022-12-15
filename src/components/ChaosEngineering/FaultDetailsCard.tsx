import React from "react";
import { BackToTopButton, ViewDetails } from "./Buttons";
import styles from "./FaultDetailsCard.module.scss";

export default function FaultDetailsCard(props) {
	const [heading, ...rest] = props.children;
	return (
		<div className={styles.detailsCard}>
			<div className={styles.headerBar}>
				<div className={styles.logoCont}>
					<img height={30} width={30} src={props.icon} alt={heading} />
					{heading}
				</div>
				<BackToTopButton href="#faults-introduction" />
			</div>
			{rest}
			<ViewDetails href="#faults-introduction" />
		</div>
	);
}
