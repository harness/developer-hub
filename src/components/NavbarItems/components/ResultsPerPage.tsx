import {
  buildResultsPerPage,
  ResultsPerPage as HeadlessResultsPerPage,
} from '@coveo/headless';
import React, { FunctionComponent, useEffect, useState } from 'react';
import buildEngine from '../Engine';
import styles from './styles.module.scss';

const ResultsPerPage: FunctionComponent = () => {
  const options = [10, 25, 50, 100];
  const controller = buildResultsPerPage(buildEngine, {
    initialState: { numberOfResults: options[0] },
  });

  const [state, setState] = useState(options[0]);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {});

    return () => {
      unsubscribe();
    };
  }, [controller]);

  const handleChange = (numberOfResults: number) => {
    controller.set(numberOfResults);
    setState(numberOfResults);
  };

  return (
    <div className={styles.resultPerPage}>
      <p>Results per page</p>
      <ul>
        {options.map((numberOfResults) => (
          <li key={numberOfResults}>
            <button
              className={state == numberOfResults ? styles.active : ''}
              disabled={state == numberOfResults}
              onClick={() => handleChange(numberOfResults)}
            >
              {numberOfResults}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPerPage;
