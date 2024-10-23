---
title: Stacktrace Error appears on the Functions Display
---

## Issue
When a new application with a single function is created, the Deck UI will show a Stacktrace error as follows:The Stacktrace (for example) shows the following:
TypeError: Cannot destructure property 'application' of 'this.state' as it is null.
    at FunctionActions_FunctionActions.render (https://preprod.spinnaker.armory.io/3.js:112515:203011)
    at gi (https://preprod.spinnaker.armory.io/3.js:222406:192)
    at fi (https://preprod.spinnaker.armory.io/3.js:222405:224)
    at Rj (https://preprod.spinnaker.armory.io/3.js:222487:490)
    at Qj (https://preprod.spinnaker.armory.io/3.js:222470:265)
    at Kj (https://preprod.spinnaker.armory.io/3.js:222470:194)
    at yj (https://preprod.spinnaker.armory.io/3.js:222463:172)
    at https://preprod.spinnaker.armory.io/3.js:222347:115
    at push.exports.unstable_runWithPriority (https://preprod.spinnaker.armory.io/3.js:222554:467)
The issue occurs frequently with AWS Lambda, preventing Lambda details from loading. 

## Cause

The following PR addresses the issue:[https://github.com/spinnaker/deck/pull/9199](https://github.com/spinnaker/deck/pull/9199)


