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
  ({ open, engine }, ref) => {
    const [copyUrl, setCopyUrl] = useState('');
    const [clicked, setClicked] = useState(false);
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
      function extractSelectedFacets(data) {
        const result = [];

        for (const key in data) {
          if (
            data[key].request &&
            Array.isArray(data[key].request.currentValues)
          ) {
            const facetId = data[key].request.facetId;

            data[key].request.currentValues.forEach((item) => {
              if (item.state === 'selected') {
                result.push({
                  facetId: facetId,
                  value: item.value,
                });
              }
            });
          }
        }
        return result;
      }

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
              .join(',');
            return `f-${facetId}=${encodedValues}`;
          })
          .join('&');

        return queryString;
      }

      setTimeout(() => {
        const shareLinkValues = extractSelectedFacets(engine.state.facetSet);
        // console.log(shareLinkValues);

        const queryString = generateQueryString(shareLinkValues);
        const rootUrl = window.location.href.split('/').slice(0, 3).join('/');
        const fullUrl = `${rootUrl}?q=${encodeURIComponent(
          engine.state.query.q
        )}&${queryString}`;

        setCopyUrl(fullUrl);
      }, 3000);

    }, [clicked, open]);

    function toggleShowFacet() {
      setShowFacet(!showFacet);
    }
    function toggleClicked() {
      setClicked(!clicked);
    }
    return (
      <>
        {open && (
          <div ref={ref} className={styles.SearchResultBox}>
            <div className={styles.left}>
              <Facet
                title="Source"
                controller={commonsourceFacetController}
                toggleClicked={toggleClicked}
              />
              <Facet
                title="Content Type"
                controller={categorynameFacetController}
                toggleClicked={toggleClicked}
              />
              <Facet
                title="Module"
                controller={commonmoduleFacetController}
                toggleClicked={toggleClicked}
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
                    toggleClicked={toggleClicked}
                  />
                  <Facet
                    title="Content Type"
                    controller={categorynameFacetController}
                    toggleClicked={toggleClicked}
                  />
                  <Facet
                    title="Module"
                    controller={commonmoduleFacetController}
                    toggleClicked={toggleClicked}
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
