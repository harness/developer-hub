import { buildSearchBox, SearchBoxState } from '@coveo/headless';
import React, { useEffect, useRef, useState } from 'react';
import SearchBox from './components/SearchBox';
import InitializeCoveo from './Engine';
import SearchResultBox from './components/SearhResultBox';
const CoveoSearch = () => {
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [searchBoxController, setSearchBoxController] = useState<any>(null);
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
  const [engine, setEngine] = useState<any>(null);
  useEffect(() => {
    async function Initialize() {
      const engine = await InitializeCoveo();
      setEngine(engine);
      const SearchBoxController = buildSearchBox(engine);
      setSearchBoxController(SearchBoxController);
    }
    Initialize();
  }, []);

  if (!searchBoxController) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <SearchBox controller={searchBoxController} onSearch={handleSearch} />
      <SearchResultBox ref={searchBoxRef} open={open} engine={engine} />
    </div>
  );
};

export default CoveoSearch;
