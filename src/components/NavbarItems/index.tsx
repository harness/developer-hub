import React, { useEffect, useRef, useState } from 'react';
import { buildSearchBox, SearchBoxOptions } from '@coveo/headless';
import SearchBox from './components/SearchBox';
import buildEngine from './Engine';
import SearchResultBox from './components/SearhResultBox';

const CoveoSearch = () => {
  const options: SearchBoxOptions = { numberOfSuggestions: 8 };
  const controller = buildSearchBox(buildEngine, { options });
  const SearchBoxController = buildSearchBox(buildEngine);

  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim().length > 0) {
      setOpen(true);
    }
  };

  return (
    <div>
      <SearchBox controller={SearchBoxController} onSearch={handleSearch} />

      <SearchResultBox ref={searchBoxRef} open={open} />
    </div>
  );
};

export default CoveoSearch;
