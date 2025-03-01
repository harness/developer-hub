import { useColorMode } from '@docusaurus/theme-common';

import SdkLight from '@site/docs/feature-management-experimentation/20-sdks-and-infrastructure/static/sdk-data-flow-light.svg';
import SdkDark  from '@site/docs/feature-management-experimentation/20-sdks-and-infrastructure/static/sdk-data-flow-dark.svg' ;

const LightVersion = () => {
  return <SdkLight  width='100%' />;
};

const DarkVersion = () => {
  return <SdkDark  width='100%' />;
};

const SDKDataFlowImage = () => {
   const { isDarkTheme } = useColorMode();
   return isDarkTheme ? <DarkVersion /> : <LightVersion />;
};

export default SDKDataFlowImage;





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