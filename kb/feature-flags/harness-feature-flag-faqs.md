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

#### What is the purpose of the auth-secret setting in the Harness Relay Proxy configuration?

The auth-secret setting in the Harness Relay Proxy configuration is used to provide an authentication secret that is utilized by the proxy to sign the JSON Web Tokens (JWTs) it sends to the SDKs. This signing process adds a layer of security by ensuring that the SDKs are using valid and authorized JWTs, preventing the use of spoofed tokens.

#### How does the auth-secret work with the SDK authentication process?

When the SDK performs authentication, it receives a JWT. By signing this JWT with the auth-secret, the proxy can validate the authenticity of the JWT. This prevents unauthorized access and ensures that the SDK is using a valid token for authentication.

#### The documentation mentions adding a secret manager. Is using a secret manager mandatory for configuring the auth-secret?

Yes, using a secret manager is a requirement when configuring the auth-secret. The secret manager ensures that sensitive information like the authentication secret is securely stored and managed. You can find detailed instructions on setting up a secret manager [here](/docs/feature-flags/relay-proxy/configuration/#auth)

#### If I have targets set and then do a percentage rollout on a feature flag, does the percentage include those already opted in, effectively stacking percentages?

No, target-specific overrides take priority. The rollout percentage applies to users without target-specific overrides. If you have 100 targets and 5 have overrides, the pool for the rollout is 95. If you do a 10% rollout, it means 9 or 10 new targets (total 14 or 15). Actual numbers may vary due to weights, not exact percentages, as each target has a chance of getting true or false in a rollout.

#### Is there a document explaining the behavior after an SDK's feature flag change?

Yes, you can find a detailed overview of how Harness Feature Flags' SDKs behave after a flag change in the provided chart [here](/docs/feature-flags/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags/)

#### For target groups with a criteria of type "Target based on condition" is there any way of seeing which targets are actually part of the group?

No since the criteria might pertain to attributes. Evaluations are done in realtime based on what the attributes are sent, so it’s totally possible to have the same target match or not match based on an individual SDK’s usage

#### Is support for multi-variable JSON flags consistent across all SDKs?

Yes, multi-variable JSON flags are supported across all SDKs.

#### Does the relay proxy offer both Polling and Streaming options for communication?

Yes, the Relay Proxy provides configuration choices for both Streaming and Polling communication methods.

#### What data is transmitted when configuring the eventUrl for posting metrics to the Feature Flag service?

The eventUrl, used by the Metrics service, sends a metrics payload that includes a map of Flags, Targets, and Evaluation results. This data serves to populate the Targets list with targets that may not have been previously created on the UI. It's important to note that this endpoint is enabled by default but can be configured for disabling if needed.

#### For Server side SDK are multiple calls needed to retrieve configurations for Feature Flags and Target Groups?

No, only one call each is required to fetch all Feature Flag configurations and Target Group configurations for the environment.

#### How does the server-side SDK handle polling mode?

In polling mode, the SDK periodically polls the server for configuration updates (default interval of 60 seconds) and updates the cache accordingly.

#### What happens during client-side SDK initialization?

The SDK is initialized for a specific target, enabling personalized flag evaluations.

#### What do I need in order to get started with Harness Feature Flag?

First, you will need a GitHub account
An editor such as an IDE
Harness Feature Flag account
The ability to run NPM install in your local environment


#### What is the link to the NPM install?

Install NPM package at this link: [https://docs.npmjs.com/cli/v7/commands/npm-install]


#### How to get started with GitHub/ Git and Feature Flags?

You will need to clone the repository on your machine by leveraging GIT clone '''git clone https://github.com/google-pay/react-store.git''' 

### How to add a Feature Flags SDK to the project?

An example of adding an SDK to a project can be found at this link: [https://developer.harness.io/tutorials/feature-flags/typescript-react#adding-the-feature-flags-sdk-to-the-project]


#### How to configure the source code for feature flags?

You need to have the source code level setup so that the application can communcate witih Harness Feature Flags. A great source of information on setting this up can be found at this Harness docs site: [https://developer.harness.io/tutorials/feature-flags/typescript-react#configure-your-source-code-for-feature-flags]
