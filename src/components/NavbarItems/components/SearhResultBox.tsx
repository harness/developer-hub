import {
  BreadcrumbManager as BreadcrumbManagerType,
  buildBreadcrumbManager,
  buildFacet,
  buildPager,
  buildQuerySummary,
  buildRelevanceSortCriterion,
  buildResultList,
  buildResultsPerPage,
  buildSort,
  PagerOptions,
  QuerySummary as QuerySummaryType,
  SortByRelevancy,
  Sort as SortType,
} from '@coveo/headless';
import React, { forwardRef, useEffect, useState } from 'react';
import Facet from './Facet';
import FacetBreadcrumbs from './FacetBreadCrumbs';
import Pager from './Pager';
import QuerySummaryAndSort from './QuerySummaryAndSort';
import ResultList from './ResultList';
import ResultsPerPage from './ResultsPerPage';
import styles from './styles.module.scss';
interface SearchResultBoxProps {
  open: boolean;
  engine: any;
  searchValue: string;
}
interface ShareLinkValue {
  facetId: string;
  value: string;
}
const SearchResultBox = forwardRef<HTMLDivElement, SearchResultBoxProps>(
  ({ open, engine, searchValue }, ref) => {
    const [shareLinkValues, setShareLinkValues] = useState<ShareLinkValue[]>([
      { facetId: 'commonsource', value: 'Developer Hub' },
    ]);
    const [copyUrl, setCopyUrl] = useState('');
    const [showFacet, setShowFacet] = useState(false);
    const [categorynameFacetController, setCategorynameFacetController] =
      useState<any>(null);
    const [commonmoduleFacetController, setCommonmoduleFacetController] =
      useState<any>(null);
    const [commonsourceFacetController, setCommonsourceFacetController] =
      useState<any>(null);
    const [facetBreadCrumbsController, setFacetBreadCrumbsController] =
      useState<any>(null);
    const [resultListController, setResultListController] = useState<any>(null);
    const [summaryController, setSummaryController] = useState<any>(null);
    const [sortController, setSortController] = useState<any>(null);
    const [pagerController, setPagerController] = useState<any>(null);
    const [resultsPerPageController, setResultsPerPageController] =
      useState<any>(null);

    useEffect(() => {
      async function Initialize() {
        const categorynameFacetController = buildFacet(engine, {
          options: { field: 'categoryname', numberOfValues: 10 },
        });

        const commonsourceFacetController = buildFacet(engine, {
          options: { field: 'commonsource', numberOfValues: 10 },
        });

        const commonmoduleFacetController = buildFacet(engine, {
          options: { field: 'commonmodule', numberOfValues: 10 },
        });

        const facetBreadCrumbsController: BreadcrumbManagerType =
          buildBreadcrumbManager(engine);

        const resultListController = buildResultList(engine, {
          options: {
            fieldsToInclude: ['categoryname', 'commonmodule', 'commonsource'],
          },
        });

        const summaryController: QuerySummaryType = buildQuerySummary(engine);
        const relevanceSortCriterion: SortByRelevancy =
          buildRelevanceSortCriterion();
        const sortController: SortType = buildSort(engine, {
          initialState: {
            criterion: relevanceSortCriterion,
          },
        });

        const options: PagerOptions = { numberOfPages: 5 };
        const pagerController = buildPager(engine, { options });

        const resultsPerPageController = buildResultsPerPage(engine, {
          initialState: { numberOfResults: 10 },
        });
        setCategorynameFacetController(categorynameFacetController);
        setCommonmoduleFacetController(commonmoduleFacetController);
        setCommonsourceFacetController(commonsourceFacetController);
        setFacetBreadCrumbsController(facetBreadCrumbsController);
        setResultListController(resultListController);
        setSummaryController(summaryController);
        setSortController(sortController);
        setPagerController(pagerController);
        setResultsPerPageController(resultsPerPageController);
      }
      Initialize();
    }, []);

    useEffect(() => {
      function generateQueryString(data: ShareLinkValue[]) {
        const grouped = data.reduce((acc, { facetId, value }) => {
          if (!acc[facetId]) {
            acc[facetId] = [];
          }
          acc[facetId].push(value);
          return acc;
        }, {} as Record<string, string[]>);

        const queryString = Object.entries(grouped)
          .map(([facetId, values]) => {
            const encodedValues = values
              .map((value) => encodeURIComponent(value))
              .join(','); // Join values with commas
            return `f-${facetId}=${encodedValues}`;
          })
          .join('&');

        return queryString;
      }
      const queryString = generateQueryString(shareLinkValues);
      const rootUrl = window.location.href.split('/').slice(0, 3).join('/');
      const fullUrl = `${rootUrl}?q=${encodeURIComponent(
        searchValue
      )}&${queryString}`;
      // console.log(fullUrl);
      setCopyUrl(fullUrl);
    }, [shareLinkValues]);

    function toggleShowFacet() {
      setShowFacet(!showFacet);
    }

    function updateShareLinkValues(facetId: string, value: string) {
      setShareLinkValues((prev) => {
        const isPresent = prev.findIndex((item) => item.value === value);
        console.log({ isPresent });

        if (isPresent !== -1) {
          return prev.filter((item) => item.value !== value);
        } else {
          return [...prev, { facetId: facetId, value: value }];
        }
      });
    }
    return (
      <>
        {open && (
          <div ref={ref} className={styles.SearchResultBox}>
            <div className={styles.left}>
              <Facet
                title="Source"
                controller={commonsourceFacetController}
                updateShareLinkValues={updateShareLinkValues}
              />
              <Facet
                title="Content Type"
                controller={categorynameFacetController}
                updateShareLinkValues={updateShareLinkValues}
              />
              <Facet
                title="Module"
                controller={commonmoduleFacetController}
                updateShareLinkValues={updateShareLinkValues}
              />
            </div>
            <div className={styles.right}>
              <button className={styles.filterBtn} onClick={toggleShowFacet}>
                Filter
              </button>
              {showFacet && (
                <div className={styles.responsiveFacet}>
                  <Facet
                    title="Source"
                    controller={commonsourceFacetController}
                    updateShareLinkValues={updateShareLinkValues}
                  />
                  <Facet
                    title="Content Type"
                    controller={categorynameFacetController}
                    updateShareLinkValues={updateShareLinkValues}
                  />
                  <Facet
                    title="Module"
                    controller={commonmoduleFacetController}
                    updateShareLinkValues={updateShareLinkValues}
                  />
                </div>
              )}

              <FacetBreadcrumbs controller={facetBreadCrumbsController} />
              <QuerySummaryAndSort
                copyUrl={copyUrl}
                summaryController={summaryController}
                sortController={sortController}
              />
              <div className={styles.hrLine}></div>
              <ResultList controller={resultListController} />
              <div className={styles.hrLine}></div>
              <div className={styles.bottom}>
                <Pager controller={pagerController} />
                <ResultsPerPage controller={resultsPerPageController} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default SearchResultBox;
