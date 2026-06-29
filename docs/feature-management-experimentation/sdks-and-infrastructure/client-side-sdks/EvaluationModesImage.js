import { useColorMode } from '@docusaurus/theme-common';

import EvalLight from '@site/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/static/fme-evaluation-modes-light.svg';
import EvalDark from '@site/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/static/fme-evaluation-modes-dark.svg';

const EvaluationModesImage = () => {
  const { colorMode } = useColorMode();
  return colorMode === 'dark'
    ? <EvalDark width='100%' height='100%' />
    : <EvalLight width='100%' height='100%' />;
};

export default EvaluationModesImage;
