import CoveoSearch from '@site/src/components/NavbarItems/coveo';
import Kapa from '@site/src/components/NavbarItems/kapa';
import AuthButtons from '@site/src/components/NavbarItems/AuthButtons';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';

export default {
  ...ComponentTypes,
  'custom-kapa-search': Kapa,
  'custom-coveo-search': CoveoSearch,
  'custom-auth-buttons': AuthButtons,
};
