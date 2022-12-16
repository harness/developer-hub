import Link from "@docusaurus/Link";
import React from "react";
import styles from "./ExperimentListSection.module.scss";
import { getCategoryDetails, getFaultDetails } from "./utils/helper";

const experiments = [
	{
		name: "Pod Delete",
		description: "This is a description of experiment 1",
		tags: ["tag1", "tag2"],
		category: "kubernetes",
	},
	{
		name: "Experiment 2",
		description:
			"This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2. This is a description of experiment 2",
		tags: ["tag1", "tag6"],
		category: "kubernetes",
	},
	{
		name: "Experiment 3",
		description: "This is a description of experiment 2",
		tags: ["tag1", "tag2"],
		category: "kubernetes",
	},
	{
		name: "Experiment 4",
		description: "This is a description of experiment 2",
		tags: ["tag1", "tag2"],
		category: "kubernetes",
	},
	{
		name: "Experiment 5",
		description: "This is a description of experiment 2",
		tags: ["tag1", "tag2"],
		category: "kubernetes",
	},
	{
		name: "Experiment 6",
		description: "This is a description of experiment 2",
		tags: ["tag1", "tag2"],
		category: "kubernetes",
	},
	{
		name: "Experiment 7",
		description: "This is a description of experiment 2",
		tags: ["tag1", "tag2"],
		category: "kubernetes",
	},
];

export default function ExperimentListSection() {
	const [showAll, setShowAll] = React.useState(false);
	const [page, setPage] = React.useState(0);
	const [search, setSearch] = React.useState("");
	const [filteredExperiments, setFilteredExperiments] =
		React.useState(experiments);

	React.useEffect(() => {
		if (search === "" || search.match(/(\s)/g))
			setFilteredExperiments(experiments);
		else {
			const filtered = experiments.filter((experiment) => {
				return (
					experiment.name.toLowerCase().includes(search.toLowerCase()) ||
					experiment.tags.some((tag) =>
						tag.toLowerCase().includes(search.toLowerCase())
					)
				);
			});
			setFilteredExperiments(filtered);
		}
	}, [search]);

	console.log(filteredExperiments);

	return (
		<div className={styles.experimentListSectionContainer}>
			<div className={styles.experimentListSectionHeader}>
				<input
					type="text"
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search Faults"
				/>
				<button onClick={() => setShowAll(!showAll)}>
					<svg
						width="10"
						height="6"
						viewBox="0 0 10 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{ transform: showAll ? "rotate(180deg)" : "" }}
					>
						<path
							d="M1 1L4.99161 5L9 1"
							stroke="#0278D5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>{" "}
					Show {showAll ? "less" : "all"}
				</button>
			</div>
			<div className={styles.experimentListSectionContent}>
				{filteredExperiments
					.slice(
						showAll ? 0 : page * 6,
						showAll ? filteredExperiments.length : page * 6 + 6
					)
					.map((experiment, index) => (
						<Link
							to={`#${
								getFaultDetails(experiment.category, experiment.name).link
							}`}
						>
							<div key={index} className={styles.experimentCard}>
								<img
									src={getCategoryDetails(experiment.category).icon}
									alt={experiment.name}
									height={40}
									width={40}
									draggable={false}
								/>
								<div className={styles.experimentCardContent}>
									<div>
										<p className={styles.title}>{experiment.name}</p>
										<p className={styles.description}>
											{experiment.description}
										</p>
									</div>
									<div className={styles.experimentCardTags}>
										{experiment.tags.map((tag, index) => (
											<span
												style={{
													background: index % 2 === 0 ? "#76AF34" : "#0092E4",
												}}
												key={index}
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						</Link>
					))}
			</div>
			{!showAll && experiments.length > 6 && (
				<div className={styles.experimentListSectionFooter}>
					{page > 0 ? (
						<img src="/img/prev.svg" onClick={() => setPage(page - 1)} />
					) : (
						<div />
					)}
					<p>
						Page {filteredExperiments.length === 0 ? 0 : page + 1} of{" "}
						{Math.ceil(filteredExperiments.length / 6)}
					</p>
					{page < Math.ceil(filteredExperiments.length / 6) - 1 ? (
						<img src="/img/next.svg" onClick={() => setPage(page + 1)} />
					) : (
						<div />
					)}
				</div>
			)}
		</div>
	);
}
