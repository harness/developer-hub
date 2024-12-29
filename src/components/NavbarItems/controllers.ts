import { buildFacet } from '@coveo/headless';
import buildEngine from './Engine';

export const categorynameFacetController = buildFacet(buildEngine, {
  options: { field: 'categoryname', numberOfValues: 10 },
});
export const commonsourceFacetController = buildFacet(buildEngine, {
  options: { field: 'commonsource', numberOfValues: 10 },
});

export const commonmoduleFacetController = buildFacet(buildEngine, {
  options: { field: 'commonmodule', numberOfValues: 10 },
});
