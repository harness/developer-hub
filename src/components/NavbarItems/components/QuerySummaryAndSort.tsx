import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  buildQuerySummary,
  QuerySummary as QuerySummaryType,
  QuerySummaryState,
  Sort as SortType,
  SortState,
  buildSort,
  buildRelevanceSortCriterion,
  buildDateSortCriterion,
  SortOrder,
  SortByRelevancy,
  SortByDate,
} from '@coveo/headless';
import headlessEngine from '../Engine';
import styles from './styles.module.scss';

const QuerySummaryAndSort = () => {
  const headlessQuerySummary: QuerySummaryType =
    buildQuerySummary(headlessEngine);
  const [summaryState, setSummaryState] = useState<QuerySummaryState>(
    headlessQuerySummary.state
  );
  useEffect(() => {
    const unsubscribe = headlessQuerySummary.subscribe(() => {
      setSummaryState(headlessQuerySummary.state);
    });

    return () => unsubscribe();
  }, []);

  const relevanceSortCriterion: SortByRelevancy = buildRelevanceSortCriterion();
  const dateDescendingSortCriterion: SortByDate = buildDateSortCriterion(
    SortOrder.Descending
  );
  const dateAscendingSortCriterion: SortByDate = buildDateSortCriterion(
    SortOrder.Ascending
  );

  const headlessSort: SortType = buildSort(headlessEngine, {
    initialState: {
      criterion: relevanceSortCriterion,
    },
  });
  const [sortState, setSortState] = useState<SortState>(headlessSort.state);
  useEffect(() => {
    const unsubscribe = headlessSort.subscribe(() => {
      setSortState(headlessSort.state);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    headlessSort.sortBy(relevanceSortCriterion);
  }, []);
  const [isSortDate, setIsSortDate] = useState(false);
  const [isDateAscending, setIsDateAscending] = useState(true);
  function handleSort(criterion: string) {
    switch (criterion) {
      case 'relevance':
        setIsSortDate(false);
        headlessSort.sortBy(relevanceSortCriterion);
        break;
      case 'date':
        setIsSortDate(true);
        if (isDateAscending) {
          headlessSort.sortBy(dateAscendingSortCriterion);
        } else {
          headlessSort.sortBy(dateDescendingSortCriterion);
        }
        setIsDateAscending(!isDateAscending);
        break;
      default:
        console.log('Error');
    }
  }

  return (
    <div className={styles.QuerySummaryAndSort}>
      <p>
        Results{' '}
        <b>
          {summaryState.firstResult} - {summaryState.lastResult}
        </b>{' '}
        of {summaryState.total} for {summaryState.query} in{' '}
        {summaryState.durationInSeconds} seconds
      </p>
      <div>
        <button
          className={!isSortDate ? styles.selectedButton : ''}
          onClick={() => handleSort('relevance')}
        >
          Relevance
        </button>
        <button
          className={isSortDate ? styles.selectedButton : ''}
          onClick={() => handleSort('date')}
        >
          Date{' '}
          {false ? (
            <i className="fa-solid fa-chevron-down" key="down"></i>
          ) : (
            <i className="fa-solid fa-chevron-up" key="up"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuerySummaryAndSort;
