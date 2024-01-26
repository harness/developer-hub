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
    { value: "platform", name: "Platform" },
    { value: "cd", name: "Continuous Delivery & GitOps - Coming Soon" },
    { value: "ci", name: "Continuous Integration - Coming Soon" },
    { value: "ff", name: "Feature Flags - Coming Soon" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(roadmap[0]);
  const [key, setKey] = useState(Object.keys(roadmap[0].horizon));
  const [mobileViewHorizon, setMobileViewHorizon] = useState(
    Object.entries(selectedModule.horizon)[0]
  );

  const [selectedDropdownModule, setSelectedDropdownModule] = useState(
    modules[0]
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSwitchTab = (key: any) => {
    Object.entries(selectedModule.horizon).map((val) => {
      if (key === val[0]) {
        setMobileViewHorizon(val);
      }
    });
  };
  useEffect(() => {
    setMobileViewHorizon(Object.entries(selectedModule.horizon)[0]);
  }, [selectedModule]);
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        useEffect(() => {
          const currentURL = window.location.href;
          const url = new URL(currentURL);
          const target = url.hash.slice(1);
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

            <div className={styles.RoadmapSectionMobile}>
              <ul className={styles.tabItems}>
                {key &&
                  key.map((key, index) => (
                    <div
                      className={`${styles.listTabItems} ${
                        mobileViewHorizon[0] === key ? styles.active : ""
                      }`}
                      onClick={() => handleSwitchTab(key)}
                    >
                      <li key={index}>{key}</li>
                    </div>
                  ))}
              </ul>
              <div className={styles.mobileRoadmapColumn}>
                {mobileViewHorizon &&
                  mobileViewHorizon[1].feature.map((feature) => (
                    <HorizonCard
                      module={selectedModule.module}
                      tag={feature.tag}
                      title={feature.title}
                      description={feature.description}
                    />
                  ))}
              </div>
            </div>
          </div>
        );
      }}
    </BrowserOnly>
  );
};

export default Roadmap;
