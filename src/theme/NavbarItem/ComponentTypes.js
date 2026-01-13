import CoveoSearch from '@site/src/components/NavbarItems/coveo';
import Kapa from '@site/src/components/NavbarItems/kapa';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';

export default {
  ...ComponentTypes,
  'custom-kapa-search': Kapa,
  'custom-coveo-search': CoveoSearch,
};
