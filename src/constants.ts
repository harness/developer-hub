import gs from "./components/Docs/GettingStarted";


export enum MODULES {
  ci = 'ci',
  cd = 'cd',
  ccm = 'ccm',
  ff = 'ff',
  sto = 'sto',
  srm = 'srm',
  ce = 'ce',
  sei = 'sei',
  cet = 'cet',
  ssca = 'ssca',
  idp = 'idp',
  iacm = 'iacm',
  gitness = 'gitness',
  platform = 'platform',
  cv = 'cv',
  smp = "smp"
}

export const MODULE_DISPLAY_NAME = {
    [MODULES.ci]: 'Continuous Integration',
    [MODULES.cd]: 'Continuous Delivery',
    [MODULES.ccm]: 'Cloud Cost Management',
    [MODULES.ff]: 'Feature Flags',
    [MODULES.sto]: 'Security Testing Orchestration',
    [MODULES.srm]: 'Service Reliability Management',
    [MODULES.ce]: 'Chaos Engineering',
    [MODULES.sei]: 'Software Engineering Insights',
    [MODULES.cet]: 'Continuous Error Tracking',
    [MODULES.ssca]: 'Software Supply Chain Assurance',
    [MODULES.idp]: 'Internal Developer Portal',
    [MODULES.iacm]: 'Infrastructure as Code Management',
    [MODULES.gitness]: 'Gitness',
    [MODULES.platform]: 'Harness Platform',
    [MODULES.smp]: 'Harness Self-Managed Enterprise Edition',
    [MODULES.cv]: 'Continuous Verification',
}

export const MODULE_ICON = {
    [MODULES.ci]: 'img/icon_ci.svg',
    [MODULES.cd]: 'img/icon_cd.svg',
    [MODULES.ccm]: 'img/icon_ccm.svg',
    [MODULES.ff]: 'img/icon_ff.svg',
    [MODULES.sto]: 'img/icon_sto.svg',
    [MODULES.srm]: 'img/icon_srm.svg',
    [MODULES.ce]: 'img/icon_ce.svg',
    [MODULES.sei]: 'img/icon_sei.svg',
    [MODULES.cet]: 'img/icon_cet.svg',
    [MODULES.ssca]: 'img/icon_ssca.svg',
    [MODULES.idp]: 'img/icon_idp.svg',
    [MODULES.iacm]: 'img/icon_iacm.svg',
    [MODULES.gitness]: 'img/icon_gitness.svg',
    [MODULES.platform]: 'img/icon_harness.svg',
    [MODULES.smp]: 'img/icon_harness.svg',
    [MODULES.cv]: 'img/icon_cv.svg',
}