export enum MODULES {
    ci = 'ci',
    cd = 'cd',
    ccm = 'ccm',
    ff = 'ff',
    sto = 'sto',
    srm = 'srm',
    ce = 'ce',
    platform= 'platform'
}
export const MODULE_DISPLAY_NAME = {
    [MODULES.ci]: 'Continuous Integration',
    [MODULES.cd]: 'Continuous Delivery',
    [MODULES.ccm]: 'Cloud Cost Management',
    [MODULES.ff]: 'Feature Flags',
    [MODULES.sto]: 'Security Testing Orchestration',
    [MODULES.srm]: 'Service Reliability Management',
    [MODULES.ce]: 'Chaos Engineering',
    [MODULES.platform]: 'Harness Platform'
}