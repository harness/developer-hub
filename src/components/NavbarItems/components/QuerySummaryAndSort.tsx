import {
  buildDateSortCriterion,
  buildRelevanceSortCriterion,
  QuerySummaryState,
  SortByDate,
  SortByRelevancy,
  SortOrder,
  SortState,
} from '@coveo/headless';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const QuerySummaryAndSort = (props) => {
  const { summaryController, sortController } = props;
  const [summaryState, setSummaryState] = useState<QuerySummaryState>(
    summaryController.state
  );
  useEffect(() => {
    const unsubscribe = summaryController.subscribe(() => {
      setSummaryState(summaryController.state);
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

  const [sortState, setSortState] = useState<SortState>(sortController.state);
  useEffect(() => {
    const unsubscribe = sortController.subscribe(() => {
      setSortState(sortController.state);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    sortController.sortBy(relevanceSortCriterion);
  }, []);
  const [isSortDate, setIsSortDate] = useState(false);
  const [isDateAscending, setIsDateAscending] = useState(true);
  function handleSort(criterion: string) {
    switch (criterion) {
      case 'relevance':
        setIsSortDate(false);
        sortController.sortBy(relevanceSortCriterion);
        break;
      case 'date':
        setIsSortDate(true);
        if (isDateAscending) {
          sortController.sortBy(dateAscendingSortCriterion);
        } else {
          sortController.sortBy(dateDescendingSortCriterion);
        }
        setIsDateAscending(!isDateAscending);
        break;
      default:
        console.log('Error');
    }
  }

  return (
    <div className={styles.QuerySummaryAndSort}>
      <div className={styles.summary}>
        <p>
          Results{' '}
          <b>
            {summaryState.firstResult} - {summaryState.lastResult}
          </b>{' '}
          of <b>{summaryState.total}</b> for{' '}
          <strong>{summaryState.query}</strong> in{' '}
          <b>{summaryState.durationInSeconds}</b> seconds
        </p>
      </div>
      <div className={styles.sort}>
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
          {isDateAscending ? (
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
