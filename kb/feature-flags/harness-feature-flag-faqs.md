---
title: Feature Flags (FF) FAQs
description: This article addresses some frequently asked questions about Harness Feature Flags (FF).
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# FAQ


### Below are some potential issues and fixes for Feature Flags

#### Flag creation keeps failing

When creating a feature flag it could be that the identifier has a character that's not permitted.  The regex used for flag identifiers is:

```
^[a-zA-Z0-9_][a-zA-Z0-9._$-]*$
```

#### Do you support undeleting a Feature Flags project?

Undeleting a Feature Flags project is unsupported due to GDPR.  Because of GDPR the general guideline is:

GDPR Data Retention rules state that personal data should never be retained longer than strictly necessary to accomplish the set business purpose.

#### What is an appropriate/optimal way to add hard refresh for mobile browsers?

Reloading on Event.ERROR is WAAAAAY overkill as that error can be triggered by someone having poor cellular connection.
The latest version of the SDK has a new function refreshEvaluations that can be called to manually refresh evaluations (hence the name) on demand.
 
We have some guidelines here on using it in a web view :
```
https://github.com/harness/ff-javascript-client-sdk/blob/HEAD/mobile_device_support.md
```
Also, for reference, the ERROR error type is kind of a catch-all for network issues.
There are some more nuanced error types as well just under it here :
```
https://github.com/harness/ff-javascript-client-sdk/tree/ec5bc61e69fae761a0372fa81c4395519ebb32cd#listening-to-events-from-the-client-instance
``` 
For mobile browsers (e.g. non-webview) We found that the follow event works well when the browser comes to the foreground.
```
document.addEventListener('visibilitychange', (event) => {
  // See https://developer.chrome.com/blog/page-lifecycle-api/
  cf.refreshEvaluations();
});
```
We tested it on Android/Chrome, iPad/Safari, iPad/Chrome and Desktop Chrome it seems to work ok when the app comes to the foreground.
There are other events like “focus” but they don’t seem to work as consistently as ‘visibilitychange’ across browsers.
