import { useColorMode } from '@docusaurus/theme-common';

import FmeLight from '@site/docs/feature-management-experimentation/10-getting-started/docs/static/fme-architecture-objects-light.svg';
import FmeDark  from '@site/docs/feature-management-experimentation/10-getting-started/docs/static/fme-architecture-objects-dark.svg' ;

const LightVersion = () => {
  return <FmeLight  width='100%' height='100%' />;
};

const DarkVersion = () => {
  return <FmeDark  width='100%' height='100%' />;
};

const FMEArchitectureObjectsImage = () => {
   const { isDarkTheme } = useColorMode();
   return isDarkTheme ? <DarkVersion /> : <LightVersion />;
};

export default FMEArchitectureObjectsImage;





/*
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

<ThemedImage
  alt="Docusaurus themed image"
  sources={{
    light: useBaseUrl('assets/images/sdk-data-flow-light-2ae3bd92f4f35c68fd843a9ea5d7b56a.svg'),
    dark:  useBaseUrl('assets/images/Fsdk-data-flow-dark.svg'),
  }}
/>
*/