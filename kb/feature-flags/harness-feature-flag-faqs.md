---
title: Feature Flags (FF) FAQs
description: This article addresses some frequently asked questions about Harness Feature Flags (FF).
sidebar_position: 2
---

## Licenses, installation, and initial setup

### What do I need in order to get started with Harness Feature Flag?

You need a GitHub account, and IDE or text editor, a Harness account with the Feature Flag module, and the ability to run `npm install` in your local environment.

### How do I install NPM?

Go to the [npm-install documentation](https://docs.npmjs.com/cli/v7/commands/npm-install) for information about installing NPM.

### How to get started with GitHub/Git and Feature Flags?

You need to clone your Git repository on your local machine using a `git clone` command, such as `git clone https://github.com/MY_ORG/MY_REPO.git`

### Can my development team generate and control feature flags solely through Git and Harness pipelines?

Yes, Harness offers a powerful Git-based workflow for FF management, providing flexibility and control to development teams.  The Harness Git Experience provides a seamless way to manage feature flags using Git. Here's how it works:

- **Git Experience with Feature Flags:** You can manage your Feature Flags directly from a YAML file in your Git repository. This approach allows you to leverage Git for FF management alongside the Harness Platform.
- **Two-Way Synchronization:** With Git Experience enabled, any changes you make to FF on the Harness Platform are committed to Git automatically. Similarly, any commits made in Git for FF are reflected in the Harness Platform. This two-way synchronization ensures that you can work on FF entirely within Git, within the Harness Platform, or even both simultaneously. Your changes are kept in sync across both platforms.

For instructions and more information, go to [Manage Feature Flags in Git Repositories](https://developer.harness.io/docs/feature-flags/manage-featureflags-in-git-repos).

If you have any further questions or need assistance, contact [Harness Support](mailto:support@harness.io) for additional guidance.

### How do I add a Feature Flags SDK to my project?

For an example of adding an SDK to a project, follow [this FF tutorial](https://developer.harness.io/tutorials/feature-flags/typescript-react#adding-the-feature-flags-sdk-to-the-project).

### How do I configure the source code for feature flags?

You need to have the source code level setup so that the application can communicate with Harness Feature Flags. For a walkthrough, follow [this FF tutorial](https://developer.harness.io/tutorials/feature-flags/typescript-react#configure-your-source-code-for-feature-flags).

### Is there a way to see MAU utilization at the project level?

Currently, license utilization is shown at the account level only.

### Flag creation keeps failing

Make sure the feature flag ID (identifier) doesn't have illegal characters. The regex used for feature flag IDs is `^[a-zA-Z0-9_][a-zA-Z0-9._$-]*$`.

### Can I recover a deleted Feature Flags project?

We can't recover (undelete) deleted Feature Flags projects due to GDPR Data Retention rules that state that *personal data should never be retained longer than strictly necessary to accomplish the set business purpose.*

### I paid by credit card and my credit card expired. I've updated the card but I didn't get a bill. What could be the issue?

Your bill will be generated at your next billing date. You can [check your billing date in the Harness UI](https://app.harness.io/ng/account/replaceWithYourAccountIDHere/settings/billing).

## FF permissions and users

### What's the difference between the Feature Flag Create/Edit and Toggle permissions?

The **Create/Edit** permission allows the user to create and edit feature flags. The user can't turn the flag on for users without the **Toggle** permission.

The **Toggle** permission allows users to turn flags on and off for users.

This separation of permission allows you to follow the security principle of least privilege. For example, internally you can have multiple people who create flags, several who can toggle flags in QA, and only a few who can toggle flags in production.

### I want to block toggling of feature flags through the FF UI exclusively in the production environment. How can I do this with Harness OPA Policy or RBAC?

We suggest using [Harness RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) for this requirement.

OPA exists to assert if the current state of a flag is allowed by the policy or not, regardless of what change was just made. RBAC exists to decide if someone is allowed to perform a certain change or not, such as toggling a flag in the production environment.

## SDKs

### Is support for multi-variable JSON flags consistent across all SDKs?

Yes, multi-variable JSON flags are supported across all SDKs.

### For the server-side SDK, are multiple calls needed to retrieve configurations for Feature Flags and Target Groups?

No, only one call each is required to fetch all Feature Flag configurations and Target Group configurations for the environment.

### How does the server-side SDK handle polling mode?

In polling mode, the SDK periodically polls the server for configuration updates (default interval of 60 seconds) and updates the cache accordingly.

### What happens during client-side SDK initialization?

The SDK is initialized for a specific target, enabling personalized flag evaluations.

### I am looking for an explanation of the behavior after an SDK's feature flag changes.

You can find a detailed overview of how Harness Feature Flags' SDKs behave after a flag change in the following table: [Communication loop between Harness and the SDKs](https://developer.harness.io/docs/feature-flags/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags/#polling).

### CanI call initialize more than once to update attributes?

Currently, FF doesn't have an option to update attributes without closing the SDK. You need to close and reinitialize the SDK to update attributes.

## FF auth-secret

### What is the purpose of the auth-secret setting in the Harness Relay Proxy configuration?

The auth-secret setting in the Harness Relay Proxy configuration is used to provide an authentication secret that is utilized by the proxy to sign the JSON Web Tokens (JWTs) it sends to the SDKs. This signing process adds a layer of security by ensuring that the SDKs are using valid and authorized JWTs, preventing the use of spoofed tokens.

### How does the auth-secret work with the SDK authentication process?

When the SDK performs authentication, it receives a JWT. By signing this JWT with the auth-secret, the proxy can validate the authenticity of the JWT. This prevents unauthorized access and ensures that the SDK is using a valid token for authentication.

### Do I have to use a secret manager to configuring the auth-secret?

Yes, you must [set up a secret manager](/docs/feature-flags/relay-proxy/configuration/#auth) to configure the auth-secret. The secret manager ensures that sensitive information, like the authentication secret, is securely stored and managed.

## FF Jira integration

### When configuring the Jira integration with a Harness token I am get an invalid API token error.

If the Jira integration setup causes a `Harness API token is invalid` error, make sure the token has the `Account Viewer` role. The user account you use to create the token must have this role in order for the token to inherit it.

### With FF Jira integration, does this app record any data?

Harness stores the following data:

* The install details sent to Harness by Jira, which includes a shared secret so Harness can authenticate and a Client ID (which is just a UUID).
* The ticket IDs you have linked to a flag, such as `Flag_1 links to ticket ABC-1234`.

Harness stores the minimum essential data needed to link flags to tickets. If the user searches for a ticket through the Harness UI, Harness requests from Jira a list of tickets matching the search term. Harness gets back a list of ticket IDs and their summaries to display in the Harness UI. However, Harness stores only the ticket ID of the selected ticket.

### Is the FF Jira integration free for Enterprise-level usage or there is any license term?

The FF Jira integration doesn't include any added cost.

## FF APIs and endpoints

### In the metrics available by API, can I determine that a target has evaluated a FF?

Currently, the API returns the total number of evals.

### What data is transmitted when configuring the eventUrl for posting metrics to the Feature Flag service?

The `eventUrl`, used by the Metrics service, sends a metrics payload that includes a map of Flags, Targets, and Evaluation results. This data is used to populate the Targets list with targets that might not exist in the UI. This endpoint is enabled by default, and you can disable it, if needed.

### What is the purpose of the stream endpoint? How does it maintain its connection state? Can I expect disruptions or issues with it?

The `/stream` endpoint serves as a long-lived connection using server-sent events (SSE) to maintain its connection state. A `keepalive` signal is dispatched every 20 seconds to ensure that the connection remains active and open. The primary purpose of the `/stream` connection is to remain continuously open and receptive to events. You should not experience disruptions or issues. Its role is to detect changes in a designated flag and provide updated values as needed.

### Can I expect to see data transmission on the stream endpoint, and how should I maintain its livelines?

While using the `/stream` endpoint, you can't observe data transmission. To keep the connection alive, a `keepalive` signal must be sent at the network level. This ensures that the connection remains open and responsive to events.

### Is there a maximum duration for the stream connection, and what happens if it's terminated?

The `/stream` connection is automatically terminated by the load balancer every 24 hours. In such cases, the FF SDK is designed to promptly reestablish the connection to ensure continuous operation.

## FF targets

### If I set targets and then do a percentage rollout on a feature flag, does the percentage include those already opted in, effectively stacking percentages?

No, target-specific overrides take priority. The rollout percentage applies to users without target-specific overrides.

For example, if you have 100 targets and 5 have overrides, the pool for the rollout is 95. If you do a 10% rollout, it means 9 or 10 new targets (14 or 15 total). Actual numbers may vary due to weights, not exact percentages, as each target has a chance of getting `true` or `false` in a rollout.

### For target groups with the "Target based on condition" criteria type, can I see which targets belong to the group?

No, since the criteria might pertain to attributes. Evaluations are done in real time based on what attributes are sent. It's possible to have the same target match or not match based on an individual SDK's usage.

### In Optimizely, we had complex rules with "OR" conditions for target groups. Does Harness support similar complex rules or "OR" rules in general?

Currently, Harness supports "OR" rules for defining target groups. However, if you require complex "AND" rules or more intricate rule combinations, you can achieve this by providing an additional attribute that combines the criteria you need. For example, you can create a new attribute that combines both the "name1" and "name2" fields to meet your specific conditions.

If you find that your use case requires enhanced rule capabilities beyond what is currently available, we encourage you to open an Enhancement Request. Our Product team reviews these requests and works to enhance the platform based on user feedback and requirements, so your input can help shape future features and improvements.

<details>
<summary>Complex ruleset JSON example</summary>

```json
[
  "and",
  [
    "or",
    [
      "or",
      {
        "match_type": "exact",
        "name": "name1",
        "type": "custom_attribute",
        "value": "123"
      }
    ],
    [
      "or",
      {
        "match_type": "exact",
        "name": "name1",
        "type": "custom_attribute",
        "value": "1234"
      }
    ],
    [
      "or",
      {
        "match_type": "exact",
        "name": "name1",
        "type": "custom_attribute",
        "value": "1235"
      }
    ],
    [
      "and",
      {
        "match_type": "exact",
        "name": "name1",
        "type": "custom_attribute",
        "value": "1234"
      },
      {
        "match_type": "exact",
        "name": "name2",
        "type": "custom_attribute",
        "value": "321"
      }
    ]
  ]
]
```

</details>

## Does the relay proxy offer both Polling and Streaming options for communication?

Yes, the Relay Proxy provides configuration choices for both Streaming and Polling communication methods.

## What is an appropriate or optimal way to add a hard refresh for mobile browsers?

The latest version of the FF SDK has a `refreshEvaluations` function that you can call to manually refresh evaluations on demand. For more information, go to the [mobile device support documentation in the FF SDK GitHub repository](https://github.com/harness/ff-javascript-client-sdk/blob/HEAD/mobile_device_support.md).

It is not recommended to reload on `Event.ERROR`, because this can be triggered by minor or irrelevant issues such as a poor cellular connection. For more nuanced error types, go to the documentation in the FF SDK GitHub repo about [listening to events from the client instance](https://github.com/harness/ff-javascript-client-sdk/tree/ec5bc61e69fae761a0372fa81c4395519ebb32cd#listening-to-events-from-the-client-instance).

For mobile browsers (e.g. non-webview), our testing found that the following event triggered most consistently across various browsers and operating systems when the browser comes to the foreground:

```
document.addEventListener('visibilitychange', (event) => {
  // See https://developer.chrome.com/blog/page-lifecycle-api/
  cf.refreshEvaluations();
});
```
