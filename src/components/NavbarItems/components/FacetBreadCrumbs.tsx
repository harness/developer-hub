import { BreadcrumbManagerState } from '@coveo/headless';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function FacetBreadcrumbs(props) {
  const { controller } = props;
  const [state, setState] = useState<BreadcrumbManagerState>(controller.state);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setState(controller.state);
    });
    return () => unsubscribe();
  }, []);

  const mapBreadCrumbField = {
    commonsource: 'Source',
    commonmodule: 'Module',
    categoryname: 'Content Type',
  };
  return (
    <>
      <div className={styles.FacetBreadCrumbs}>
        <div>
          {state.facetBreadcrumbs.map((breadcrumb, index) => (
            <div key={index}>
              <p className={styles.field}>
                {mapBreadCrumbField[breadcrumb.field]}:{' '}
              </p>
              <div className={styles.FacetBreadCrumbsValues}>
                {breadcrumb.values.map((value, i) => (
                  <p key={i} onClick={() => value.deselect()}>
                    {value.value.value} <i className="fa-solid fa-xmark"></i>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        {state.hasBreadcrumbs && (
          <button
            className={styles.clearButton}
            onClick={controller.deselectAll}
          >
            Clear All Filters
          </button>
        )}
      </div>
      {state.hasBreadcrumbs && <div className={styles.hrLine}></div>}
    </>
  );
}
