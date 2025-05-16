import { Facet as FacetController } from '@coveo/headless';
import React, { useEffect, useState } from 'react';
import { moduleIconAndColor } from '../data';
import styles from './styles.module.scss';
interface FacetProps {
  controller: FacetController;
  title: string;
  toggleClicked: () => void;
}
const Facet: React.FC<FacetProps> = (props) => {
  const { controller, toggleClicked } = props;
  const [state, setState] = useState(controller.state);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setState(controller.state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const QueryCommonmodule = params.get('f-commonmodule');
    const QueryCommonsource = params.get('f-commonsource');
    const QueryCategoryname = params.get('f-categoryname');
    if (QueryCommonmodule && controller.state.facetId == 'commonmodule') {
      const values = QueryCommonmodule.split(',');
      values.forEach((value) => {
        controller.toggleSelect({
          numberOfResults: 0,
          state: 'selected',
          value: value,
        });
      });
    }
    if (QueryCommonsource && controller.state.facetId == 'commonsource') {
      const values = QueryCommonsource.split(',');
      values.forEach((value) => {
        controller.toggleSelect({
          numberOfResults: 0,
          state: 'selected',
          value: value,
        });
      });
    }
    if (QueryCategoryname && controller.state.facetId == 'categoryname') {
      const values = QueryCategoryname.split(',');
      values.forEach((value) => {
        controller.toggleSelect({
          numberOfResults: 0,
          state: 'selected',
          value: value,
        });
      });
    }
    let existingFacets = JSON.parse(localStorage.getItem('coveo-facet') || '[]');
    if (
      !QueryCategoryname &&
      !QueryCommonsource &&
      !QueryCommonmodule &&
      existingFacets.length == 0 &&
      controller.state.facetId == 'commonsource'
    ) {
      controller.toggleSelect({
        numberOfResults: 0,
        state: 'selected',
        value: 'Developer Hub',
      });
    }
    setTimeout(() => {
      if (existingFacets.length > 1) {
        existingFacets.forEach((facet) => {
          if (controller.state.facetId == 'commonsource' && facet.facetId == 'commonsource') {
            controller.toggleSelect({
              numberOfResults: 0,
              state: 'selected',
              value: facet.value,
            });
          }
          if (controller.state.facetId == 'commonmodule' && facet.facetId == 'commonmodule') {
            controller.toggleSelect({
              numberOfResults: 0,
              state: 'selected',
              value: facet.value,
            });
          }
          if (controller.state.facetId == 'categoryname' && facet.facetId == 'categoryname') {
            controller.toggleSelect({
              numberOfResults: 0,
              state: 'selected',
              value: facet.value,
            });
          }
        });
      }
    }, 1000);

    controller.sortBy('alphanumeric');
    controller.showMoreValues();
  }, []);

  if (!state.values.length) {
    return <></>;
  }

  function handleClick() {
    setOpen(!open);
  }

  const showMore = () => {
    controller.showMoreValues();
  };

  const showLess = () => {
    controller.showLessValues();
  };

  function handleFacetSelect(value, facetId) {
    const newFacet = {
      facetId: facetId,
      value: value.value,
    };

    let existingFacets = JSON.parse(localStorage.getItem('coveo-facet') || '[]');

    if (existingFacets.length === 0) {
      existingFacets = [
        {
          facetId: 'commonsource',
          value: 'Developer Hub',
        },
      ];
    }

    if (value.state != 'selected') {
      existingFacets.push(newFacet);
    } else {
      existingFacets = existingFacets.filter(
        (facet) => !(facet.facetId === newFacet.facetId && facet.value === newFacet.value),
      );
    }
    localStorage.setItem('coveo-facet', JSON.stringify(existingFacets));
  }

  return (
    <div className={styles.facet}>
      <div className={styles.facetTop} onClick={handleClick}>
        <h3 className={styles.facetTitle}>{props.title}</h3>
        {open ? (
          <i className="fa-solid fa-chevron-up" key="up"></i>
        ) : (
          <i className="fa-solid fa-chevron-down" key="down"></i>
        )}
      </div>
      <div className={styles.hrLine}></div>

      {open && (
        <ul>
          {state.values.map((value) => (
            <li key={value.value}>
              <input
                type="checkbox"
                checked={controller.isValueSelected(value)}
                onChange={() => {
                  controller.toggleSelect(value);
                  toggleClicked();
                  handleFacetSelect(value, controller.state.facetId);
                }}
                disabled={state.isLoading}
              />
              <div>
                {controller.state.facetId == 'commonmodule' && (
                  <img
                    src={
                      moduleIconAndColor[value.value]
                        ? moduleIconAndColor[value.value].iconUrl
                        : moduleIconAndColor['Harness Platform'].iconUrl
                    }
                    alt={value.value}
                  />
                )}
                <p
                  style={{
                    fontWeight: controller.isValueSelected(value) ? 'bold' : 'normal',
                  }}
                >
                  {value.value}
                </p>
                <span> ({value.numberOfResults})</span>
              </div>
            </li>
          ))}

          {state.canShowMoreValues && (
            <button onClick={showMore}>
              <i className="fa-solid fa-plus"></i> Show More
            </button>
          )}
          {state.canShowLessValues && (
            <button onClick={showLess}>
              <i className="fa-solid fa-minus"></i> Show Less
            </button>
          )}
        </ul>
      )}
    </div>
  );
};

export default Facet;
