import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import type { Prompt } from './data/types';
import { getDataset } from './data';
import PromptDetail from './PromptDetail';
import PromptDrawer from './PromptDrawer';

interface PromptLibraryContextValue {
  open: (promptId: string) => void;
  close: () => void;
  /** All prompts in the active dataset. */
  prompts: Prompt[];
  /** Resolve a prompt by id within the active dataset. */
  getPromptById: (id: string) => Prompt | undefined;
  /** Resolve a placeholder tooltip by parsed name within the active dataset. */
  getPlaceholderTooltip: (name: string) => string | undefined;
}

const PromptLibraryContext = createContext<PromptLibraryContextValue | null>(null);

export function usePromptLibrary(): PromptLibraryContextValue | null {
  return useContext(PromptLibraryContext);
}

interface PromptLibraryProviderProps {
  /**
   * Key of the dataset to load from the data registry (`data/index.ts`),
   * e.g. `"resilience-testing"`.
   */
  datasetId: string;
  children: React.ReactNode;
}

function PromptLibraryProviderInner({ datasetId, children }: PromptLibraryProviderProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const open = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  const value = useMemo<PromptLibraryContextValue>(() => {
    const dataset = getDataset(datasetId);
    if (!dataset) {
      console.warn(
        `[PromptLibrary] Unknown datasetId "${datasetId}". Register it in src/components/PromptLibrary/data/index.ts.`,
      );
    }
    const prompts = dataset?.prompts ?? [];
    const tooltips = dataset?.placeholderTooltips ?? {};
    return {
      open,
      close,
      prompts,
      getPromptById: (id: string) => prompts.find((p) => p.id === id),
      getPlaceholderTooltip: (name: string) => tooltips[name],
    };
  }, [datasetId, open, close]);

  const openPrompt = openId ? value.getPromptById(openId) : undefined;

  return (
    <PromptLibraryContext.Provider value={value}>
      {children}
      <PromptDrawer
        isOpen={openId !== null && Boolean(openPrompt)}
        onClose={close}
        title={openPrompt?.title ?? ''}
      >
        {openPrompt ? <PromptDetail prompt={openPrompt} /> : null}
      </PromptDrawer>
    </PromptLibraryContext.Provider>
  );
}

export default function PromptLibraryProvider({ datasetId, children }: PromptLibraryProviderProps) {
  return (
    <BrowserOnly fallback={<>{children}</>}>
      {() => (
        <PromptLibraryProviderInner datasetId={datasetId}>
          {children}
        </PromptLibraryProviderInner>
      )}
    </BrowserOnly>
  );
}
