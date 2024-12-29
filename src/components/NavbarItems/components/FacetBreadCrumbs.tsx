import React, { useEffect, useState } from 'react';
import {
  BreadcrumbManager as BreadcrumbManagerType,
  BreadcrumbManagerState,
  buildBreadcrumbManager,
} from '@coveo/headless';
import headlessEngine from '../Engine';
import styles from './styles.module.scss';

export default function FacetBreadcrumbs() {
  const breadcrumbManager: BreadcrumbManagerType =
    buildBreadcrumbManager(headlessEngine);
  const [state, setState] = useState<BreadcrumbManagerState>(
    breadcrumbManager.state
  );

  useEffect(() => {
    const unsubscribe = breadcrumbManager.subscribe(() => {
      setState(breadcrumbManager.state);
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
          {state.facetBreadcrumbs.map((breadcrumb) => (
            <div>
              <p className={styles.field}>
                {mapBreadCrumbField[breadcrumb.field]}:{' '}
              </p>
              <div className={styles.FacetBreadCrumbsValues}>
                {breadcrumb.values.map((value) => (
                  <p onClick={() => value.deselect()}>
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
            onClick={breadcrumbManager.deselectAll}
          >
            Clear All Filters
          </button>
        )}
      </div>
      {state.hasBreadcrumbs && <div className={styles.hrLine}></div>}
    </>
  );
}
