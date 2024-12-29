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

  useEffect(() => {
    controller.subscribe(() => setState(controller.state));
  }, [controller]);

  return (
    <div className={styles.searchBoxMain}>
      <div className={styles.searchBox}>
        <input
          placeholder="Search ..."
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
      {state.suggestions.length > 0 && (
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
