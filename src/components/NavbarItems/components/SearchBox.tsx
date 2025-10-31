import React, { useState, useEffect, useRef } from 'react';
import { SearchBox as SearchBoxController } from '@coveo/headless';
import styles from './styles.module.scss';

interface SearchBoxProps {
  controller: SearchBoxController;
  onSearch: (input: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {
  const { controller } = props;
  const suggestionRef = useRef<HTMLUListElement | null>(null);
  const [state, setState] = useState(controller.state);
  const [inputValue, setInputValue] = useState(controller.state.value);
  const [isUrlParamsLoaded, setIsUrlParamsLoaded] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  useEffect(() => {
    const unsubscribe = controller.subscribe(() => setState(controller.state));
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const query = params.get('q');
    if (query) {
      controller.updateText(query);
      controller.submit();
      props.onSearch(query);
      setIsUrlParamsLoaded(true);
    }
    return unsubscribe;
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const suggestionCount = state.suggestions.length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(
          highlightedIndex === null ? 0 : (highlightedIndex + 1) % suggestionCount,
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(
          highlightedIndex === null
            ? suggestionCount - 1
            : (highlightedIndex - 1 + suggestionCount) % suggestionCount,
        );
        break;
      case 'Enter':
        const selected = highlightedIndex !== null ? state.suggestions[highlightedIndex] : null;
        event.preventDefault();
        if (selected) {
          controller.selectSuggestion(state.suggestions[highlightedIndex].rawValue);
          props.onSearch(state.suggestions[highlightedIndex].rawValue);
          setInputValue(state.suggestions[highlightedIndex].rawValue);
        } else {
          controller.submit();
          props.onSearch(inputValue);
          setInputValue(state.value);
        }
        setShowSuggestions(false);
        setHighlightedIndex(null);
        break;

      default:
        break;
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    controller.updateText(e.target.value);
    setIsUrlParamsLoaded(false);
    setHighlightedIndex(null);
    setShowSuggestions(true);
  };
  return (
    <div className={styles.searchBoxMain} id="coveo-search-main">
      <div className={styles.searchBox}>
        <input
          placeholder="search ..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (inputValue.trim() == '') return;
            handleKeyDown(e);
          }}
          type="text"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {!isUrlParamsLoaded && state.suggestions.length > 0 && showSuggestions && (
        <ul ref={suggestionRef}>
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
                  setInputValue(suggestion.rawValue);
                  setHighlightedIndex(null);
                  setShowSuggestions(false);
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
