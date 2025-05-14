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
    controller.subscribe(() => setState(controller.state));
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const query = params.get('q');
    if (query) {
      controller.updateText(query);
      controller.submit();
      props.onSearch(query);
      setIsUrlParamsLoaded(true);
    }
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
        if (highlightedIndex !== null && state.suggestions[highlightedIndex]) {
          event.preventDefault();
          controller.selectSuggestion(state.suggestions[highlightedIndex].rawValue);
          setShowSuggestions(false);
          props.onSearch(state.suggestions[highlightedIndex].rawValue);
          setHighlightedIndex(null);
        } else {
          controller.submit();
          props.onSearch(inputValue);
          setInputValue(state.value);
        }
        break;
      case ' ':
        if (highlightedIndex !== null && state.suggestions[highlightedIndex]) {
          event.preventDefault();
          controller.selectSuggestion(state.suggestions[highlightedIndex].rawValue);
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
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            console.log('search', e.target.value);
            if (e.target.value.trim() !== '') {
              controller.updateText(e.target.value);
              setIsUrlParamsLoaded(false);
              setHighlightedIndex(null);
              setShowSuggestions(true);
            }
          }}
          onKeyDown={handleKeyDown}
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
