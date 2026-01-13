import { ResultsPerPage } from '@coveo/headless';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
interface ResultsPerPageProps {
  controller: ResultsPerPage;
}
const ResultsPerPage: React.FC<ResultsPerPageProps> = (props) => {
  const { controller } = props;
  const options = [10, 25, 50, 100];

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
