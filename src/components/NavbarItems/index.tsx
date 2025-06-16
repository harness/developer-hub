import { buildSearchBox, SearchEngine } from '@coveo/headless';
import React, { useEffect, useRef, useState } from 'react';
import SearchBox from './components/SearchBox';
import InitializeCoveo, { isTokenExpired } from './Engine';
import SearchResultBox from './components/SearhResultBox';
const CoveoSearch = () => {
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchBoxController, setSearchBoxController] = useState<any>(null);
  const [engine, setEngine] = useState<SearchEngine | null>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function Initialize() {
      try {
        const newEngine = await InitializeCoveo();
        if (newEngine) {
          setEngine(newEngine);
          const SearchBoxController = buildSearchBox(newEngine);
          setSearchBoxController(SearchBoxController);
          setVersion((v) => v + 1);
        }
      } catch (error) {
        console.error('Error initializing Coveo:', error);
      }
    }
    Initialize();

    const interval = setInterval(async () => {
      if (isTokenExpired()) {
        await Initialize();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim().length > 0) {
      setOpen(true);
      setSearchValue(searchValue);
    }
  };

  if (!engine || !searchBoxController) {
    return null;
  }

  return (
    <div key={version}>
      <SearchBox controller={searchBoxController} onSearch={handleSearch} />
      <SearchResultBox ref={searchBoxRef} open={open} engine={engine} searchValue={searchValue} />
    </div>
  );
};

export default CoveoSearch;
