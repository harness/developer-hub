import mixpanelLib from "mixpanel-browser";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
const isBrowser = ExecutionEnvironment.canUseDOM;
// Use global window.mixpanel if available (set by client module), otherwise use the imported library
const mixpanel = isBrowser && window.mixpanel ? window.mixpanel : mixpanelLib;
// Export the mixpanel instance
export default mixpanel;