---
title: Traffic types
sidebar_label: Traffic types
helpdocs_is_private: false
helpdocs_is_published: true
---

import TrafficType from "@site/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/traffic-types.md";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360019916311-Traffic-types <br /> ✘ images still hosted on help.split.io </button>
</p>

<TrafficType developer='hidden' />

## Traffic types that you may create

Split allows you to have up to 10 traffic types per project. All environments within a project share the same set of traffic types.

:::info
By default, a project has one traffic type named **'user'**. It is most common for our customers to use just this one traffic type.
:::

Some other examples of traffic types that you might choose to create:

| Traffic type | Description |  Key examples |
| --- | --- | --- |
| User | Authenticated users | user ID, profile ID |
| Anonymous | Unauthenticated users <br />(Be careful not to overuse anonymous IDs as this can inflate your [MTK count](/docs/feature-management-experimentation/admin-account-settings/docs/admin-best-practices/account-usage/mtk-efficiency#improving-your-mtk-efficiency).) | UUID, session ID |
| Tenant or organization | An ID that represents a tenant, company, or organization and may cover multiple users | tenant ID, company ID, organization ID |
| Device | An ID that represents a specific device used by your users/customers | deviceID or equivalent |

The traffic types you choose to create depends on multiple factors:

* **Granularity:** How granular do you need to get with your targeting logic? If you typically target based on tenants or companies, but sometimes you want to target down to the user level, then you’ll want a user traffic type.
* **B2B vs. B2C:** B2B organizations will typically require targeting by tenants or companies rather than by individual users. Or they may require both!
* **Authenticated vs. unauthenticated traffic:** Do you plan to run feature flags on a webpages with both types of traffic? Then you’ll want to set up two traffic types to represent the two keys/IDs - typically a UUID and a user ID.
* **Experimentation & Release Monitoring:** If you plan to monitor feature flag impact or run experiments, you will want to consider which identifiers are associated with the events you send to FME. For example, if events are collected in GA4 for authenticated users, you will want to ensure you set up a traffic type passing that same ID. (Read more about attribution logic here.)

## Create a traffic type

You can create traffic types at any time, but it is a best practice to do so **during your initial account setup**, taking into consideration your anticipated needs. Once a feature flag is created with a given traffic type, that traffic type cannot be changed, so it is important to get it right the first time.

To create a traffic type:

1. From the left hand navigation, click the **user's initials** at the bottom and select **Admin settings**. The **Projects** page appears.
2. Select the project that you want to edit traffic types for. 
3. To add more traffic types to the selected project, click **View** and then the **Traffic types** tab. 
4. Click the **Actions** button and then **Create traffic type** in the list. The Create traffic type panel appears.
5. Enter a name for your traffic type. We recommend choosing a name that will be easy for your team to understand. Click **Save** and new traffic type is created.

:::warning
Once a traffic type is created, it cannot be edited.
:::

You can delete a traffic type from this same location in the user interface with the **Delete** link in the Actions column, but only if it is no longer in use by any feature flags or metrics.

If you need assistance with traffic types, contact support at [support@split.io](mailto:support@split.io).

## How your traffic type is used

This section explains how your team will use your traffic type, and how it is used within Split.

The traffic type is a way of categorizing your keys (user IDs), but it also categorizes your feature flags, metrics, and segments.

How it works:
1. In Split UI, when you create a **feature flag**, you select a traffic type (this one traffic type is associated with the flag). You also associate one traffic type when you create a **segment** or **metric** definition.
2. In your application code that your developers write, your application initializes and configures the FME SDK to use one traffic type (the SDK will uses the string `"user"` by default if none is passed in). The SDK fetches [the payload (the **feature flag and segment definitions**)](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/fme-payload.md) **for that traffic type**. The SDK will be able to evalute these feature flags that it just fetched (associated with that one traffic type). Any **key (user ID)** you pass to the SDK client when calling the [getTreatment method](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/gettreatment-call.md) (to evaluate a feature flag) is **associated with the same traffic type** at the moment of evaluation.
3. The SDK will periodically send events and impressions back to Harness. On Harness backend servers, Split will run metric calculations for **metrics** that share the same traffic type as the key (user ID) and feature flag.

Thus, the traffic type you select determines the feature flags, metrics, and segments that you can use together.

## FAQs

### Can one user be represented by multiple traffic types?
Yes. For example, User A may go to a website without logging out and be tracked via UUID. Then once they log in, they have a user ID on top of the UUID. Their profile may also be associated with an organization or company. They may also have a session ID or device ID attached to their visit. Any and all of these identifiers can be passed for evaluation, depending on your organization’s use case.

### What if I want to target large groups of keys/IDs?
You can [create segments](/docs/feature-management-experimentation/40-feature-management/docs/manage-audiences/segments.md#create-a-segment), which are fixed lists of identifiers that you define per environment and can update as needed. Commonly, you’ll see these made for internal teams (e.g. QA team, dev team) or for fixed customer groups (e.g. beta customers). These segments also rely on defining a traffic type.

If these large groups are based on data you have about your users&mdash;e.g. device, company, account type, location&mdash;then you can use attribute-based targeting instead.

### Can I target multiple traffic types in the same feature flag, e.g. both authenticated and unauthenticated IDs?
No, you must choose one traffic type, as this will ensure a consistent user experience. You can hypothetically pass multiple IDs within the same traffic type; however, this may create conflicting user experiences as multiple IDs may represent the same person.

Something else to consider is using [custom attributes](/docs/feature-management-experimentation/40-feature-management/docs/target-with-flags/targeting-rules/target-with-user-attributes/target-with-user-attributes.md). For example, if you want to target users and devices, or users and companies, AND if the user ID has associated data (e.g. device, company), then you can pass the user ID as the traffic type and then use attributes to target groups of user IDs based on device or company. In this case, using the 'user' traffic type allows you the granularity of user, but you can still target groups of these users by whatever information you have about them!

### What if I’m running a feature flag on a webpage that gets authenticated and unauthenticated traffic?
Our recommendation in this case is to use the traffic type that represents the first experience a user has on the webpage. For example, if it’s a homepage where visitors typically land on the page prior to logging in, using the “anonymous” traffic type is best practice to ensure a consistent user experience.

### My organization is B2B and we typically need to target organizations/ tentants/companies. However, we sometimes want to target down to the user level. How should we approach this?
Our typical recommended solution is:
1. Create the user traffic type and pass user ID or equivalent as the traffic key.
2. Use custom attributes to then target the user IDs based on tenant ID or equivalent identifier.

Remember, create traffic types for the granularity you need for targeting and use attributes and segments to group those IDs together for easy targeting!

### I want to start sending events to FME for experimentation. What do I need to consider?
When sending events to FME, the payload will include a traffic key or identifier. This is how our system is able to make the proper attribution for experiments, as we need the key to match between the event (e.g. the action taken by the user) and the impression (e.g. who saw the 'on' or 'off' feature flag treatment).

Please ensure that whatever key is being passed with the event matches the traffic type(s) you plan to use in FME for feature flagging and experimentation.

For example, if you send events tied to user IDs but you’re running experiments on 'unauthenticated' traffic (anonymous), you’ll want to ensure you’re also collecting events associated with the 'unauthenticated' traffic key.