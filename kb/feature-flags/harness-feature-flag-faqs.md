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

For instructions and more information, go to [Manage Feature Flags in Git Repositories](https://developer.harness.io/docs/feature-flags/use-ff/ff-creating-flag/manage-featureflags-in-git-repos).

If you have any further questions or need assistance, contact [Harness Support](mailto:support@harness.io) for additional guidance.

### How do I add a Feature Flags SDK to my project?

For an example of adding an SDK to a project, go to [Get started with an SDK](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/java-quickstart).

### How do I configure the source code for feature flags?

You need to have the source code level setup so that the application can communicate with Harness Feature Flags. For a walkthrough, go to [Get started with an SDK](https://developer.harness.io/docs/feature-flags/get-started/java-quickstart).

### Is there a way to see MAU utilization at the project level?

Currently, license utilization is shown at the account level only.

### Flag creation keeps failing

Make sure the feature flag ID (identifier) doesn't have illegal characters. The regex used for feature flag IDs is `^[a-zA-Z0-9_][a-zA-Z0-9._$-]*$`.

### Can I recover a deleted Feature Flags project?

We can't recover (undelete) deleted Feature Flags projects due to GDPR Data Retention rules that state that *personal data should never be retained longer than strictly necessary to accomplish the set business purpose.*

### I paid by credit card and my credit card expired. I've updated the card but I didn't get a bill. What could be the issue?

Your bill will be generated at your next billing date. You can [check your billing date in the Harness UI](https://app.harness.io/ng/account/replaceWithYourAccountIDHere/settings/billing).

### Can I associate tags with feature flags?

Yes, you can attach tags to feature flags.

## FF permissions and users

### What's the difference between the Feature Flag Create/Edit and Toggle permissions?

The **Create/Edit** permission allows the user to create and edit feature flags. The user can't turn the flag on for users without the **Toggle** permission.

The **Toggle** permission allows users to turn flags on and off for users.

This separation of permission allows you to follow the security principle of least privilege. For example, internally you can have multiple people who create flags, several who can toggle flags in QA, and only a few who can toggle flags in production.

### Can I block users from toggling feature flags in certain environments, such as QA or production environments?

Harness suggests using [Harness RBAC](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness) to restrict users from toggling flags in certain environments.

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

You can find a detailed overview of how Harness Feature Flags' SDKs behave after a flag change in the following table: [Communication loop between Harness and the SDKs](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags#polling).

### CanI call initialize more than once to update attributes?

Currently, FF doesn't have an option to update attributes without closing the SDK. You need to close and reinitialize the SDK to update attributes.

## FF auth-secret

### What is the purpose of the auth-secret setting in the Harness Relay Proxy configuration?

The auth-secret setting in the Harness Relay Proxy configuration is used to provide an authentication secret that is utilized by the proxy to sign the JSON Web Tokens (JWTs) it sends to the SDKs. This signing process adds a layer of security by ensuring that the SDKs are using valid and authorized JWTs, preventing the use of spoofed tokens.

### How does the auth-secret work with the SDK authentication process?

When the SDK performs authentication, it receives a JWT. By signing this JWT with the auth-secret, the proxy can validate the authenticity of the JWT. This prevents unauthorized access and ensures that the SDK is using a valid token for authentication.

### Do I have to use a secret manager to configuring the auth-secret?

Yes, you must [set up a secret manager](/docs/feature-flags/use-ff/relay-proxy/configuration/#auth) to configure the auth-secret. The secret manager ensures that sensitive information, like the authentication secret, is securely stored and managed.

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

#### Can I use an API to export all feature flag states?

Yes, you can use the [Get all Feature Flags for the Project endpoint](https://apidocs.harness.io/tag/Feature-Flags#operation/GetAllFeatures).

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

### Does the relay proxy offer both Polling and Streaming options for communication?

Yes, the Relay Proxy provides configuration choices for both Streaming and Polling communication methods.

### What is an appropriate or optimal way to add a hard refresh for mobile browsers?

The latest version of the FF SDK has a `refreshEvaluations` function that you can call to manually refresh evaluations on demand. For more information, go to the [mobile device support documentation in the FF SDK GitHub repository](https://github.com/harness/ff-javascript-client-sdk/blob/HEAD/mobile_device_support.md).

It is not recommended to reload on `Event.ERROR`, because this can be triggered by minor or irrelevant issues such as a poor cellular connection. For more nuanced error types, go to the documentation in the FF SDK GitHub repo about [listening to events from the client instance](https://github.com/harness/ff-javascript-client-sdk/tree/ec5bc61e69fae761a0372fa81c4395519ebb32cd#listening-to-events-from-the-client-instance).

For mobile browsers (e.g. non-webview), our testing found that the following event triggered most consistently across various browsers and operating systems when the browser comes to the foreground:

```
document.addEventListener('visibilitychange', (event) => {
  // See https://developer.chrome.com/blog/page-lifecycle-api/
  cf.refreshEvaluations();
});
```

For more information, go to [Make flags resilient during a mobile web browser refresh](https://developer.harness.io/docs/feature-flags/get-started/mobile-browser-refresh).

### How do you include a target using custom data?

To include a target, initialize the JavaScript SDK with your target's details and desired attributes. For example:

```
const cf = initialize('api_key', {
  identifier: 'Harness',
  attributes: {
    lastUpdated: Date(),
    host: location.href
  }
});
```

This setup allows you to use ``lastUpdated`` and ``host`` in creating group rules.

### Is it secure to store the client-sdk-key in session storage?

Yes, it is secure. Read [SDK Types documentation](https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks#sdk-types) for more information.

### What can a client do with client-sdk-key besides evaluating feature flags?

The client SDK keys are intended only for evaluation purposes on Harness servers and do not allow users to extract data from their Harness account. This means that even if someone inspects a web application and obtains the client SDK key, they cannot access any confidential information stored in Harness.

#### Can we call initialize more than once to update attributes?

We do not have a option to do update without closing the sdk. So ee will need to close the SDK and re-init it in the mean time, to force the attributes to update.
### We specify that a percentage rollout gets hashed to create a number between 1-100 which is used for the percentage rollout. Does the attribute get combined with the flagID at all
We don’t involve the flag ID in the hash. However you can choose to hash on different target attributes, you can change it in the UI when setting the percentage rollouts.

### Would a target always be in the same bucket regardless of the feature flag? What I mean by that is if I roll out multiple flags which are entirely independent of 10% TRUE, I would expect a different 10% to be used for both flags, otherwise, the first x% of targets would be the first to see new features which seems unintended.
Yeah, a target will generally always be in the same bucket. a target with the identifier “test” will always come out as 57. so a 50/50 split will always be false.

### How do I configure the bucket behaviour so that I can release two features simultaneously to two different buckets? I.e. I want to deliver true to buckets 1-10 for flag 1 and true to buckets 10-20 for another feature.

For your 1-10 flag you could create a “Multivariate” with the variations: “variant”, “excluded” and “control” and set to serve 10% “variant“ and 90% to exclude with 0 to control. 

for your 10-20 flag you could create a “Multivariate” with the variations: “excluded”, “variant” and “control” and set it to serve 10% “excluded “, 10% to “variant” and 80% to control. 

### Is there a way to configure what buckets to use for TRUE and false? There are cases where I don't want the same targets always to get the feature rollout, especially if I am trying to experiment with different flags and I don't want both targets to overlap.
Yeah, the buckets are fairly static. so 50/50 on a boolean flag will always have true in the first 50 and false in the second 50. You can, however, create a “Multivariate” flag and what order you add the variations is what order the buckets are created. so Creating a “string” flag with “false” first and “true” second will switch the order. You can also use this to add control groups. Some users would create a flag with 3 variations: “control”, “excluded” and “variant” as a way to mix what users see.

### Is there a reason you are not concatenating the feature flag ID along with the identifier before hashing to identify the bucket?
Regarding concatenating the feature flag ID along with the identifier before hashing to identify the bucket, this is not currently a feature in Harness.

### Is there a way to check in Harness UI what variation a target got served? Say I need to validate what flags a customer is seeing is there a way to do that?
To check what variation a target got served in Harness UI, you can go to the Feature Flags dashboard, select the flag you want to check, and then click on the Analytics tab. From there, you can filter by target and see which variation was served to that target.

#### How to fetch stale flags in org and projects?

You can use the API https://apidocs.harness.io/tag/Feature-Flags#operation/GetAllFeatures to fetch stale FF, you need to use status=potentially-stale in the API.

#### Why am I getting a target segment not found error?
```
target segment not found%!(EXTRA string-some-target-here)
```

This error occurs if a user is trying to add a target group that does not exist as a target to a Feature Flag.

#### Why am I getting a target not created error?

```
target not created 'target'
```

This error occurs if a user is trying to add a target that already exists.

#### How to retrieve the feature flag state for a specific target via API?
The best approach today to achieve this usecase is if you want to know what a specific target will get for a specific flag, you can instantiate one of the SDKs, connect with an SDK key and evaluate that target. It’s the most reliable way of doing it since it’s exactly what the target will be doing.

#### How does the client SDK handle target creation when a service restarts and authenticates?

When a service restarts and authenticates, it must supply the target information itself. The SDK does not store or manage targets on the Harness side. Therefore, the customer's application is responsible for providing the target and its associated data during authentication. Typically, this information would be retrieved from a session if it pertains to a user, or fetched from a user store. This ensures that the service has the necessary target data upon restarting and re-authenticating.

#### Does deleting a Flag in one environment delete it from all other environments?

Yes, deleting a flag in one environment does delete it from all environments.

#### Why weren't delete actions included in the Feature Flag Admin role?

Deleting a flag can lead to catastrophic consequences. To safeguard against this, we want our users to think carefully about permissions. The Feature Flag Admin role can do almost everything except delete to prevent accidental or unintended deletions.

#### How can I grant delete permissions to a user if the Feature Flag Admin role does not include it?

If you need to grant delete permissions to a user, you have two options:

1. Use one of the out-of-the-box roles: Project Admin, Org Admin, or Account Admin. All of these roles include the delete flag permission and allow users to perform all necessary actions.
2. Create a specific role that includes the delete permission and assign that role to your users. This way, you can tailor permissions to your exact needs while maintaining control over potentially destructive actions.

#### What does warning NU1701 mean?

The warning NU1701 is a common issue encountered in .NET projects when there are compatibility problems between the project and the NuGet packages it depends on. This warning typically indicates that a referenced package was restored using a target framework that does not fully support the target framework of the project.

#### How can I resolve the issue where the `ff-service` cannot connect to the database, resulting in the error `FATAL: database 'cf_db'` does not exist (SQLSTATE 3D000)"?

In the event that the `ff-service` is unable to connect to the database due to this error, it is likely due to the migration failing. You can resolve this issue by following these steps:

 1. Delete the Migration Job:

 - Identify and delete the migration job that was created during the initial setup. This can usually be done through your Kubernetes management tool or command line interface.
 2. Reinstall the Helm Chart:

 - Reinstalling the Helm chart will re-trigger the migration and setup process, ensuring that the database is created correctly. By deleting the failed migration job and reinstalling the Helm chart, you can resolve the database connection issue and ensure the ff-service connects to the newly created database.

#### Why is my feature flag returning the default variation for a specific target always?

The default variation is returned when the feature flag evaluation either fails or does not match the defined conditions for the target. This can happen due to misconfigured targeting rules, SDK integration issues, or incorrect environment setup.

#### Why does the feature flag work for one target but not another?

This discrepancy may occur due to differences in the way the targets are configured. Targeting rules, audience segmentation, or SDK setup might differ between targets, causing the flag to behave differently for each.

#### What does it mean when the feature flag evaluation fails?

This may happen if the target doesn't meet any conditions, if there's a problem fetching the flag, or if the evaluation logic encounters an error.

#### What steps can I take to resolve the issue of the default variation being served?

1. Compare the flag configuration and targeting rules between targets.
2. Ensure the SDK is correctly initialized and integrated with the environment.
3. Check logs for errors or issues in the flag evaluation process.
4. Verify the target meets the necessary conditions to receive the intended variation.
5. Confirm the correct flag version is deployed to the right environment.

#### What would be the best practice for targeting large user groups(in millions)?

The best practice is to use attribute-based targeting. Assign an attribute (e.g., emailWhitelist) to users in the large group and create a rule based on that attribute. This approach avoids performance issues and ensures a more manageable solution.

#### How does targeting a large group impact the client-side SDKs?

Client-side SDKs will need to fetch larger documents, increasing data transfer time and affecting overall evaluation speed. This can cause noticeable delays on the client-side due to limited processing power and resources compared to server-side environments. These performance bottlenecks can lead to poor user experience.

#### Why is it recommended to use attributes instead of targeting users directly?

Using attributes (like emailWhitelist: true) helps:
1. Improve performance by using more efficient lookup methods (e.g., equals instead of in).
2. Avoid UI management issues, since you don’t have to manually manage such a large list of users.

####  What does the error "FF-SDK Streaming: SSE read timeout" mean?

This error indicates that the Server-Sent Events (SSE) stream used by the Harness SDK has been disconnected, typically due to network issues or other interruptions. It is a normal occurrence in varied network conditions.

#### Is the "FF-SDK Streaming: SSE read timeout" a critical issue?

In most cases, this error is not critical. Starting from version 1.26.2 of the Harness FF JavaScript Client SDK, this timeout is logged at a debug level to indicate that disconnections are expected and normal. The system will attempt to reconnect, and in the meantime, it uses polling as a fallback.

#### What can I do to prevent SSE read timeouts?

Since occasional SSE disconnections are normal, there's no need to prevent them. However, ensuring a stable network connection can help reduce the frequency of timeouts. You should only investigate further if timeouts happen frequently or if the SDK fails to reconnect after multiple attempts.

#### When adding Target Group, is there a way of adding multiple Ids in one copy ?

You can use the api and provide multiple values in one go

#### Is there a way to create a Target group in one environment and then promote it across the other environments?

We have APIs to create target groups  [API](https://apidocs.harness.io/tag/Target-Groups), which can further be automated using pipelines.

#### Can we manage targets and target groups using Git Sync? is it possible to move targets between target groups using Git Sync?

No, Git Sync is only used for managing flag configurations. Targets and target groups cannot be managed or moved between groups through Git Sync.

#### Why shouldn't I use a server-side SDK key in client-side applications?

Using a server-side SDK key in client-side applications (like browser or mobile apps) is not secure because client-side environments can be easily inspected and compromised by users. Attackers can use browser developer tools or unpack mobile apps to access sensitive information, including the SDK key. Server-side SDK keys should only be used in secure server environments.

#### How do I enable verbose logging to view these details?

To see these logs, you need to set your logger level to debug. Keep in mind that debug-level logs may not be suitable for production environments, as they can generate a significant amount of information.

#### Can I see which target group rule evaluated to true to return the flag value in the .NET SDK logs?

Yes, in the .NET SDK, verbose logging can provide detailed information about which target group rules were evaluated and whether they matched. To access these logs, your logging level should be set to debug.
