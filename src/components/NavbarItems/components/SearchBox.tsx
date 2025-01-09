import React from 'react';
import { useState, useEffect } from 'react';
import { SearchBox as SearchBoxController } from '@coveo/headless';
import styles from './styles.module.scss';
interface SearchBoxProps {
  controller: SearchBoxController;
  onSearch: (input: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);
  const [inputValue, setInputValue] = useState(controller.state.value);
  const [isUrlParamsLoaded, setIsUrlParamsLoaded] = useState(false);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const query = params.get('q');
    if (query) {
      console.log(query);
      controller.updateText(query);
      controller.submit();
      props.onSearch(query);
      setIsUrlParamsLoaded(true);
    }
  }, []);

  return (
    <div className={styles.searchBoxMain} id="coveo-search-main">
      <div className={styles.searchBox}>
        <input
          placeholder="search ..."
          value={state.value}
          onChange={(e) => {
            controller.updateText(e.target.value);
            setInputValue(e.target.value);
            setIsUrlParamsLoaded(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              controller.submit();
              props.onSearch(inputValue);
            }
          }}
          type="search"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {!isUrlParamsLoaded && state.suggestions.length > 0 && (
        <ul>
          {state.suggestions.map((suggestion) => {
            const value = suggestion.rawValue;
            return (
              <li
                key={value}
                onClick={() => {
                  controller.selectSuggestion(value);
                  props.onSearch(suggestion.rawValue);
                }}
              >
                <p>{value}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
