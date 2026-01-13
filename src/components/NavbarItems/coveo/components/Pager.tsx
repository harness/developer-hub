import { Pager } from '@coveo/headless';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
interface PagerProps {
  controller: Pager;
}

const Pager: React.FC<PagerProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const unsubscribe = controller.subscribe(() => {
      setState(controller.state);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    controller.selectPage(1);
  }, []);
  return (
    <nav className={styles.pager}>
      <button
        disabled={!state.hasPreviousPage}
        onClick={() => {
          controller.previousPage();
          setActivePage((prevPage) => prevPage - 1);
        }}
      >
        {'<'}
      </button>
      {state.currentPages.map((page) => (
        <button
          className={page == activePage ? styles.active : ''}
          key={page}
          disabled={controller.isCurrentPage(page)}
          onClick={() => {
            controller.selectPage(page);
            setActivePage(page);
          }}
        >
          {page}
        </button>
      ))}
      <button
        disabled={!state.hasNextPage}
        onClick={() => {
          controller.nextPage();
          setActivePage((prevPage) => prevPage + 1);
        }}
      >
        {'>'}
      </button>
    </nav>
  );
};

export default Pager;
