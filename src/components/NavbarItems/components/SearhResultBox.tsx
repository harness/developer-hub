import React, { ForwardedRef, forwardRef, useEffect } from 'react';
import buildEngine from '../Engine';
import Facet from './Facet';
import FacetBreadcrumbs from './FacetBreadCrumbs';
import Pager from './Pager';
import QuerySummaryAndSort from './QuerySummaryAndSort';
import ResultList from './ResultList';
import ResultsPerPage from './ResultsPerPage';
import styles from './styles.module.scss';
import {
  categorynameFacetController,
  commonsourceFacetController,
  commonmoduleFacetController,
} from '../controllers';

interface SearchResultBoxProps {
  open: boolean;
}

const SearchResultBox = forwardRef<HTMLDivElement, SearchResultBoxProps>(
  ({ open }, ref) => {
    return (
      <>
        {open && (
          <div ref={ref} className={styles.SearchResultBox}>
            <div className={styles.left}>
              <Facet title="Source" controller={commonsourceFacetController} />
              <Facet
                title="Content Type"
                controller={categorynameFacetController}
              />
              <Facet title="Module" controller={commonmoduleFacetController} />
            </div>
            <div className={styles.right}>
              <FacetBreadcrumbs />
              <QuerySummaryAndSort />
              <div className={styles.hrLine}></div>
              <ResultList />
              <div className={styles.bottom}>
                <Pager />
                <ResultsPerPage />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default SearchResultBox;
