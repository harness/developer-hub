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
  const [searchPresent, setSearchPresent] = useState(false);

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');

    if (search) {
      setSearchPresent(true);
      controller.updateText(search);
      controller.submit();
      props.onSearch(search);
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
      {!searchPresent && state.suggestions.length > 0 && (
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
