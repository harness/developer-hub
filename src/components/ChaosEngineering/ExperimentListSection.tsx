import Link from "@docusaurus/Link";
import React from "react";
import styles from "./ExperimentListSection.module.scss";
import { getCategoryDetails, getFaultDetails } from "./utils/helper";

export type ExperimentDetails = {
  name: string;
  description: string;
  category: string;
  tags?: string[];
  link?: string;
};

export default function ExperimentListSection({
  experiments,
}: {
  experiments: ExperimentDetails[];
}) {
  const [showAll, setShowAll] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [filteredExperiments, setFilteredExperiments] =
    React.useState(experiments);

  React.useEffect(() => {
    if (search === "" || search.match(/(\s)/g)) {
      setFilteredExperiments(experiments);
      setPage(0);
    } else {
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

  return (
    <div className={styles.experimentListSectionContainer}>
      {experiments.length > 6 && (
        <div className={styles.experimentListSectionHeader}>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Faults by Name or Tag"
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
            <span>Show {showAll ? "less" : "all"}</span>
          </button>
        </div>
      )}
      {filteredExperiments.length > 0 ? (
        <div className={styles.experimentListSectionContent}>
          {filteredExperiments
            .sort()
            .slice(
              showAll ? 0 : page * 6,
              showAll ? filteredExperiments.length : page * 6 + 6
            )
            .map((experiment, index) => (
              <Link
                to={
                  experiment.link ??
                  `#${
                    getFaultDetails(experiment.category, experiment.name)
                      .anchorLink
                  }`
                }
              >
                <div key={index} className={styles.experimentCard}>
                  <div className={styles.experimentCardHeader}>
                    <img
                      src={getCategoryDetails(experiment.category).icon}
                      alt={experiment.name}
                      height={40}
                      width={40}
                      draggable={false}
                    />

                    <p className={styles.title}>{experiment.name}</p>
                  </div>
                  <div className={styles.experimentCardContent}>
                    <p className={styles.description}>
                      {experiment.description}
                    </p>

                    <div className={styles.experimentCardTags}>
                      {experiment.tags &&
                        experiment.tags.map((tag, index) => (
                          <span
                            style={{
                              background:
                                index % 2 === 0 ? "#76AF34" : "#0092E4",
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
      ) : (
        <div className={styles.noExperimentFound}>
          No experiments match the search criteria
        </div>
      )}

      {!showAll && filteredExperiments.length > 0 && (
        <div className={styles.experimentListSectionFooter}>
          {page > 0 ? (
            <img src="/img/chaos/prev.svg" onClick={() => setPage(page - 1)} />
          ) : (
            <div />
          )}
          <p>
            Page {filteredExperiments.length === 0 ? 0 : page + 1} of{" "}
            {Math.ceil(filteredExperiments.length / 6)}
          </p>
          {page < Math.ceil(filteredExperiments.length / 6) - 1 ? (
            <img src="/img/chaos/next.svg" onClick={() => setPage(page + 1)} />
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
