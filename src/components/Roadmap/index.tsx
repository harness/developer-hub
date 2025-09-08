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
    { value: 'platform', name: 'Platform', icon: 'icon_platform.svg' },
    { value: 'aida', name: 'Harness AI', icon: 'icon_aida.svg' },
    { value: 'ata', name: 'AI Test Automation', icon: 'logo-ata.svg' },
    { value: 'code', name: 'Code Repository', icon: 'icon_code.svg' },
    { value: 'ci', name: 'Continuous Integration', icon: 'icon_ci.svg' },
    { value: 'cd', name: 'Continuous Delivery & GitOps', icon: 'icon_cd.svg' },
    { value: 'dbdevops', name: 'Database DevOps', icon: 'icon_dbdevops.svg' },
    {
      value: 'iacm',
      name: 'Infrastructure as Code Management',
      icon: 'icon_iacm.svg',
    },
    { value: 'ff', name: 'Feature Flags', icon: 'icon_ff.svg' },
    {
      value: 'fme',
      name: 'Feature Management & Experimentation',
      icon: 'icon_fme.svg',
    },
    { value: 'ccm', name: 'Cloud Cost Management', icon: 'icon_ccm.svg' },
    {
      value: 'sto',
      name: 'Security Testing Orchestration',
      icon: 'icon_sto.svg',
    },
    { value: 'ssca', name: 'Supply Chain Security', icon: 'icon_ssca.svg' },
    { value: 'ce', name: 'Chaos Engineering', icon: 'icon_ce.svg' },
    { value: 'idp', name: 'Internal Developer Portal', icon: 'icon_idp.svg' },
    {
      value: 'sei',
      name: 'Software Engineering Insights',
      icon: 'icon_sei.svg',
    },
    {
      value: 'cde',
      name: 'Cloud Development Environments',
      icon: 'icon-cde.svg',
    },
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
          icon: string;
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
                      src={`${baseUrl}img/${selectedDropdownModule.icon}`}
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
                          src={`${baseUrl}img/${module.icon}`}
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
              {selectedDropdownModule.name} Roadmap
            </h1>
            <p>{selectedModule.description}</p>

            {selectedModule && (
              <div className={styles.RoadmapSection}>
                {key.map((k, index) => (
                  <div className={styles.section}>
                    <div className={styles.sectionDescription}>
                      <div className={styles.titleLine}>
                        <h4>{k} <span className={styles.featureCount}>{selectedModule.horizon[k].feature.length}</span></h4>
                        <p>
                          {Object.keys(selectedModule.horizon).length > 0 &&
                            selectedModule.horizon[k].description}
                        </p>
                      </div>
                    </div>
                    {Object.keys(selectedModule.horizon).length > 0 &&
                      selectedModule.horizon[k].feature.map((feature, index) => (
                        <HorizonCard
                          module={selectedModule.module}
                          tag={feature.tag}
                          title={feature.title}
                          description={feature.description}
                          link={feature.link}
                          backgroundColorCard={feature.backgroundColor}
                        />
                      ))}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.RoadmapSectionMobile}>
              <ul className={styles.tabItems}>
                {key &&
                  key.map((key, index) => (
                    <div
                      className={`${styles.listTabItems} ${mobileViewHorizon[0] === key ? styles.active : ""
                        }`}
                      onClick={() => handleSwitchTab(key)}
                    >
                      <li key={index}>{key} <span className={styles.featureCount}>{selectedModule.horizon[key].feature.length}</span></li>
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
                      link={feature.link}
                      backgroundColorCard={feature.backgroundColor}
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
