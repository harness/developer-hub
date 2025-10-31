---
title: Traffic types
description: "Learn about traffic types and creating feature flags with traffic types in Harness FME."
sidebar_position: 10
redirect_from:
- /docs/feature-management-experimentation/feature-management/faqs/can-a-feature-flags-traffic-type-be-modified
---

## Overview

When you create a feature flag, you must specify a traffic type. The traffic type denotes the nature of the keys that are passed to *getTreatment* for that feature flag. 

A traffic type identifies the type of key you're using to split traffic. Does the key identify a known logged-in user? A device? Is the key a UUID generated for an anonymous visitor and stored in a cookie on the visitor’s browser?

You can customize traffic types to your use cases. You should have a traffic type for each type of key you plan to pass to *getTreatment*. 

### Common traffic types

The most commonly used traffic types are:

* **user**: The key uniquely identifies a known, logged-in user. This is typically some numeric identifier that is the primary key in the table you use to store user information.

* **anonymous**: The key is a randomly generated identifier, like a UUID, that identifies a visitor using a particular mobile device or browser, where it is typically stored as a cookie.

* **account/customer**: The key identifies the customer account or group to which the (logged-in) user belongs to. This traffic type maintains consistent behavior for all visitors from a given company or account.

It is also possible, but much less common, for a traffic type to identify something other than a visitor. For instance, a realty site might use *listing* as a traffic type if they wanted to explore the possibility of having a single visitor see different appearances for different property listings. For that traffic type, the code passes to *getTreatment* the id of the listing being displayed.

For some feature flags, you may want to randomize by `sessionId` rather than `userId`, so **session** is another possible traffic type. Because there will be more sessions than users, with this traffic type, you end up with a higher number of unique keys being sent to Harness.

## Traffic Types and Impressions

Traffic types are used to match events with impressions so that user events are correlated to treatments served to the same users.

Impressions have their traffic type determined by the traffic type was assigned to that feature flag when it was created. You cannot specify a traffic type for an impression, it is determined by the feature flag definition and is immutable. 

When evaluating a feature flag it is implied that the key you provided is of the correct traffic type (e.g. if you are evaluating a FF of ‘user’ traffic type, then you’d be passing a user ID). The SDK does not perform any kind of traffic type validation.

## Traffic Types and Events

A traffic type must be specified when sending events. When using a server-side SDK there is no specific key associated with the SDK instance so for every treatment evaluation you need to pass in the key, and for every event that is tracked you need to pass both the key and the traffic type. 

Client-side SDKs are typically tied to one or a handful of keys (typically keys for different traffic types, like my userId, userAccountId, etc). That’s why you don’t need to specify the key when evaluating flags or tracking events. You can optionally pass a traffic type when instantiating a client so you don’t need to specify the traffic type every time you track an event using that client. It has no implications in terms of feature flag evaluations or their corresponding impressions’ traffic type.

## Customizing a traffic type

You can customize traffic types as needed at any time, but it is a best practice to do so during your initial account setup, taking into consideration your anticipated needs. Once a feature flag is created with a given traffic type, that traffic type cannot be changed, so it is important to get it right the first time.

FME allows you to have up to 10 traffic types per project. All environments within a project share the same set of traffic types. By default, a project has one traffic type named `user`. You can customize your traffic types as needed during your account setup.

## Create a traffic type

To create traffic types, do the following:

1. From the left hand navigation, click the **profile button** at the bottom and select **Admin settings**. The **Projects** page appears.
2. Select the project that you want to edit traffic types for. 
3. To add more traffic types to the selected project, click **View** and then the **Traffic types** tab. 
4. Click the **Actions** button and then **Add traffic types** in the list. The Create traffic type panel appears.
5. Enter a name and click **Save**. A new traffic type is created.

:::note
Once a feature flag is created with a specific traffic type, it cannot be edited. This is intentional to prevent your experiment data from being mixed across different traffic types, which could skew your results.

To change a traffic type, create a feature flag with the appropriate traffic type.
:::

## Delete a traffic type

You can delete a traffic type from this same location in the user interface with the **Delete** link in the **Actions** column but only if it is no longer in use by any feature flags or metrics.

If you need assistance with traffic types, contact support at [support@split.io](mailto:support@split.io).
