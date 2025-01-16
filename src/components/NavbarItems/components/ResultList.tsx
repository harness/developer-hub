import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { contentTypeData, moduleIconAndColor } from '../data';
import { ResultList as ResultListController } from '@coveo/headless';
interface ResultListProps {
  controller: ResultListController;
}
const ResultList: React.FC<ResultListProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () =>
      controller.subscribe(() => {
        setState(controller.state);
      }),
    []
  );
  if (!state.results.length) {
    return <div>No results</div>;
  }
  function handleClick(url: string) {
    window.location.href = url;
  }
  return (
    <div className={styles.resultList}>
      <ul>
        {state.results.map((result) => (
          <li
            key={result.uniqueId}
            onClick={() => handleClick(result.clickUri)}
          >
            <article>
              {result?.raw?.commonsource ? (
                <div className={styles.tagTop}>
                  <div>{result?.raw?.commonsource as string}</div>
                </div>
              ) : (
                <></>
              )}
              <div className={styles.heading}>
                <h2>{result.title}</h2>
                <a
                  href={result.clickUri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.clickUri.length > 100
                    ? `${result.clickUri.substring(0, 70)}...`
                    : result.clickUri}
                </a>
              </div>
              <p>{result.excerpt}</p>
              <div className={styles.tagBottom}>
                {Array.isArray(result?.raw?.commonmodule) &&
                result.raw.commonmodule.length > 0
                  ? (result?.raw?.commonmodule as Array<string>)?.map(
                      (module) => (
                        <div
                          key={module}
                          style={{
                            border: `1px solid var(${moduleIconAndColor[module]?.colors.border})`,
                            backgroundColor: ` var(${moduleIconAndColor[module]?.colors.backgroundColor})`,
                          }}
                        >
                          <img
                            src={moduleIconAndColor[module]?.iconUrl || ''}
                            alt={module}
                          />

                          <p
                            style={{
                              color: ` var(${moduleIconAndColor[module]?.colors.color})`,
                            }}
                          >
                            {module}
                          </p>
                        </div>
                      )
                    )
                  : null}

                {result?.raw?.categoryname && (
                  <div
                    className={styles.contentType}
                    style={{
                      backgroundColor: `var(${
                        contentTypeData[result?.raw?.categoryname as string]
                          ?.backgroundColor
                      })`,
                      border: `var(${
                        contentTypeData[result?.raw?.categoryname as string]
                          ?.border
                      })`,
                    }}
                  >
                    {result?.raw?.categoryname as string}
                  </div>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultList;
