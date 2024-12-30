import { Facet as FacetController } from '@coveo/headless';
import React, { useEffect, useState } from 'react';
import { moduleIconAndColor } from '../data';
import styles from './styles.module.scss';
interface FacetProps {
  controller: FacetController;
  title: string;
}
const Facet: React.FC<FacetProps> = (props) => {
  const { controller } = props;
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
    if (controller.state.facetId == 'commonsource') {
      controller.toggleSelect({
        numberOfResults: 3279,
        state: 'selected',
        value: 'Developer Hub',
      });
    }
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
                onChange={() => controller.toggleSelect(value)}
                disabled={state.isLoading}
              />
              <div>
                {moduleIconAndColor[value.value]?.iconUrl && (
                  <img
                    src={moduleIconAndColor[value.value]?.iconUrl || ''}
                    alt={value.value}
                  />
                )}
                <p
                  style={{
                    fontWeight: controller.isValueSelected(value)
                      ? 'bold'
                      : 'normal',
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
