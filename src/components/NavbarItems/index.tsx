import { buildSearchBox, SearchBoxState } from '@coveo/headless';
import React, { useEffect, useRef, useState } from 'react';
import SearchBox from './components/SearchBox';
import InitializeCoveo from './Engine';
import SearchResultBox from './components/SearhResultBox';
const CoveoSearch = () => {
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchBoxController, setSearchBoxController] = useState<any>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function Initialize() {
      const engine = await InitializeCoveo();
      setEngine(engine);
      if (engine) {
        const SearchBoxController = buildSearchBox(engine);
        setSearchBoxController(SearchBoxController);
      }
    }
    Initialize();

    const interval = setInterval(() => {
      if (isTokenExpired()) {
        Initialize();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const isTokenExpired = (): boolean => {
    const storedToken = localStorage.getItem('coveo_token');
    const data = JSON.parse(storedToken);
    if (data && data.expiry) {
      return data.expiry <= Date.now();
    }
    return true;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim().length > 0) {
      setOpen(true);
      setSearchValue(searchValue);
    }
  };
  const [engine, setEngine] = useState<any>(null);

  if (!engine) {
    return <></>;
  }
  if (!searchBoxController) {
    return <div></div>;
  }
  return (
    <div>
      <SearchBox controller={searchBoxController} onSearch={handleSearch} />
      <SearchResultBox
        ref={searchBoxRef}
        open={open}
        engine={engine}
        searchValue={searchValue}
      />
    </div>
  );
};

export default CoveoSearch;
