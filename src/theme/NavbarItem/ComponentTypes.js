import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import CoveoSearch from "@site/src/components/NavbarItems/CoveoSearch";
import { SignInButton, SignUpButton } from "@site/src/components/NavbarItems/Button";

export default {
  ...ComponentTypes,
  // add CoveoSearch as a navbar item
  "custom-coveo-search": CoveoSearch,
  "custom-signin":SignInButton,
  "custom-signup":SignUpButton
};
