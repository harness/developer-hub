---
title: Policy Engine Error (TypeError- e.takeUntil is not a function) when Accessing Project Tab
---

## Issue
Users may encounter the following error when accessing the ```Projects Tab``` in the Spinnaker Console UI, while the Policy Engine plugin is enabled:
```
TypeError: e.takeUntil is not a function
    at Hr.componentDidMount (https://testapi.armory.io/plugins/deck/Armory.PolicyEngine/0.2.0-rc/index.js:18:39048)
    at Ji (https://test.armory.io/3.js:370968:132)
    at Sj (https://test.armory.io/3.js:371011:229)
    at push.exports.unstable_runWithPriority (https://test.armory.io/3.js:371086:467)
    at cg (https://test.armory.io/3.js:370878:325)
    at Jj (https://test.armory.io/3.js:371004:370)
    at yj (https://test.armory.io/3.js:370995:376)
    at https://test.armory.io/3.js:370879:115
    at push.exports.unstable_runWithPriority (https://test.armory.io3.js:371086:467)
    at cg (https://test.armory.io/3.js:370878:325)
```
## Cause
Code changes need to be made to Policy Engine to make it compatible changes in Spinnaker

