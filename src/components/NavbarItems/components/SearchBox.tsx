import React, { useState, useEffect } from 'react';
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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const suggestionCount = state.suggestions.length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(
          highlightedIndex === null
            ? 0
            : (highlightedIndex + 1) % suggestionCount
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(
          highlightedIndex === null
            ? suggestionCount - 1
            : (highlightedIndex - 1 + suggestionCount) % suggestionCount
        );
        break;
      case 'Enter':
        if (highlightedIndex !== null && state.suggestions[highlightedIndex]) {
          event.preventDefault();
          controller.selectSuggestion(
            state.suggestions[highlightedIndex].rawValue
          );
          props.onSearch(state.suggestions[highlightedIndex].rawValue);
          setHighlightedIndex(null);
        } else {
          controller.submit();
          props.onSearch(inputValue);
        }
        break;
      case ' ':
        if (highlightedIndex !== null && state.suggestions[highlightedIndex]) {
          event.preventDefault();
          controller.selectSuggestion(
            state.suggestions[highlightedIndex].rawValue
          );
          props.onSearch(state.suggestions[highlightedIndex].rawValue);
          setHighlightedIndex(null);
        }
        break;
      default:
        break;
    }
  };

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
            setHighlightedIndex(null);
          }}
          onKeyDown={handleKeyDown}
          type="search"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {!isUrlParamsLoaded && state.suggestions.length > 0 && (
        <ul>
          {state.suggestions.map((suggestion, index) => {
            const value = suggestion.rawValue;
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={isHighlighted}
                tabIndex={0}
                key={value}
                onClick={() => {
                  controller.selectSuggestion(value);
                  props.onSearch(suggestion.rawValue);
                  setHighlightedIndex(null);
                }}
                onKeyDown={handleKeyDown}
                className={isHighlighted ? styles.highlighted : ''}
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
