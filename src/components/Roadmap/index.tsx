import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import roadmap from "./data/roadmapData";
import HorizonCard from "./HorizonCard";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";

const Roadmap = () => {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const modules = [
    { value: "cd", name: "Continuous Delivery & GitOps" },
    { value: "ci", name: "Continuous Integration" },
    { value: "ff", name: "Feature Flags" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(roadmap[0]);
  const [key, setKey] = useState(Object.keys(roadmap[0].horizon));
  const [selectedDropdownModule, setSelectedDropdownModule] = useState({
    value: "cd",
    name: "Continuous Delivery & GitOps",
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        useEffect(() => {
          const currentURL = window.location.href;
          const url = new URL(currentURL);
          const target = url.hash.slice(1);
          console.log(target);
          roadmap.map((mod) => {
            if (mod.module == target) {
              setSelectedModule(mod);
              setKey(Object.keys(mod.horizon));
            }
          });
          modules.map((mod) => {
            if (mod.value == target) {
              setSelectedDropdownModule(mod);
            }
          });
        }, []);

        const handleModuleSelect = (module: {
          value: string;
          name: string;
        }) => {
          roadmap.map((mod) => {
            if (mod.module == module.value) {
              setSelectedModule(mod);
              setKey(Object.keys(mod.horizon));
            }
          });
          setSelectedDropdownModule(module);
          setIsDropdownOpen(false);
        };
        return (
          <div className={styles.roadmap}>
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                {selectedDropdownModule && (
                  <div>
                    <img
                      src={`${baseUrl}img/icon_${selectedDropdownModule.value}.svg`}
                      alt={selectedDropdownModule.name}
                    />
                    <p>{selectedDropdownModule.name}</p>
                  </div>
                )}
                <i className="fa-solid fa-chevron-down"></i>
              </div>
              {isDropdownOpen && (
                <ul className={styles.dropdownList}>
                  {modules.map((module) => (
                    <Link to={`/roadmap/#${module.value}`}>
                      <li
                        key={module.value}
                        onClick={() => handleModuleSelect(module)}
                      >
                        <img
                          src={`${baseUrl}img/icon_${module.value}.svg`}
                          alt={module.name}
                        />
                        <p> {module.name}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
            <h1>
              <span>{selectedDropdownModule.value} </span>Overall Strategy
            </h1>
            <p>{selectedModule.description}</p>

            {selectedModule && (
              <div className={styles.RoadmapSection}>
                <div className={styles.section}>
                  <div className={styles.sectionDescription}>
                    <div className={styles.titleLine}>
                      <h4>{key[0]}</h4>
                      <p>
                        {Object.keys(selectedModule.horizon).length > 0 &&
                          selectedModule.horizon[
                            Object.keys(selectedModule.horizon)[0]
                          ].description}
                      </p>
                    </div>
                  </div>
                  {Object.keys(selectedModule.horizon).length > 0 &&
                    selectedModule.horizon[
                      Object.keys(selectedModule.horizon)[0]
                    ].feature.map((feature, index) => (
                      <HorizonCard
                        module={selectedModule.module}
                        tag={feature.tag}
                        title={feature.title}
                        description={feature.description}
                      />
                    ))}
                </div>
                <div className={styles.section}>
                  <div className={styles.sectionDescription}>
                    <div className={styles.titleLine}>
                      <h4>{key[1]}</h4>
                      <p>
                        {Object.keys(selectedModule.horizon).length > 0 &&
                          selectedModule.horizon[
                            Object.keys(selectedModule.horizon)[1]
                          ].description}
                      </p>
                    </div>
                  </div>
                  {Object.keys(selectedModule.horizon).length > 0 &&
                    selectedModule.horizon[
                      Object.keys(selectedModule.horizon)[1]
                    ].feature.map((feature, index) => (
                      <HorizonCard
                        module={selectedModule.module}
                        tag={feature.tag}
                        title={feature.title}
                        description={feature.description}
                      />
                    ))}
                </div>
                <div className={styles.verticalLine}></div>
                <div className={styles.section}>
                  <div className={styles.sectionDescription}>
                    <div className={styles.titleLine}>
                      <h4>{key[2]}</h4>
                      <p>
                        {Object.keys(selectedModule.horizon).length > 0 &&
                          selectedModule.horizon[
                            Object.keys(selectedModule.horizon)[2]
                          ].description}
                      </p>
                    </div>
                  </div>
                  {Object.keys(selectedModule.horizon).length > 0 &&
                    selectedModule.horizon[
                      Object.keys(selectedModule.horizon)[2]
                    ].feature.map((feature, index) => (
                      <HorizonCard
                        module={selectedModule.module}
                        tag={feature.tag}
                        title={feature.title}
                        description={feature.description}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
};

export default Roadmap;
