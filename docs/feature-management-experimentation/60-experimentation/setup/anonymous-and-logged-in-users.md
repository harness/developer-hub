---
title: Anonymous and logged in users
sidebar_position: 70
---

## Successfully experiment with anonymous and logged-in users

### Introduction

One of the most frequent questions asked by FME's customers is How do I deal with anonymous and logged-in users? This article addresses the most common concerns around this subject as it applies to experimentation, with practical steps to take to maintain the integrity of your experiments. This article concentrates on experimentation, but for our feature flag customers who want to know how to maintain consistency when working with anonymous and logged-in users, see this [video](https://help.split.io/hc/en-us/articles/360029915971-Consistent-experience-from-anonymous-to-logged-In).

First, some terminology and assumptions. By an anonymous user, we mean an id (i.e. key) assigned in the absence of other identifying information. For a browser-based application this may be generated each session, or stored in a cookie for repeated use. In the case of a mobile application, it could be an id returned from a call such as iOS's identifierForVendor. 

In contrast, the id for a logged-in user is presumed to be a durable association between a person and that id. The id is consistent, regardless of what device is used or how long it has been since the user’s last session.

In nearly all cases where anonymous traffic is used, after a user logs in they will still have an anonymous id. The session or device id doesn't go away just because they logged in. The question becomes "Which id do I pass to getTreatment() and track()?"

### Considerations and Best Practices

#### Events

If you are using both user and anonymous traffic types for targeting, a best practice is to always send events with both user and anonymous traffic types with the respective keys for those traffic types whenever those keys are available. (Obviously if the user is not logged in you will not have a user key to pass to track.) That way events will be available for metrics of both traffic types and you won't have to know ahead of time which events are available for user and which events are available for anonymous when creating metrics. If you have integrated Harness FME as a segment destination and are mapping Segment's anonymousId and userId appropriately, then Segment events for which there is both an anonymousId and a userId will automatically show up in Harness FME as two events: one with traffic type anonymous and one with traffic type user.

#### Feature flags

When creating a feature flag, you choose which type of id (i.e., traffic type) will be passed to `getTreatment` for that feature flag. The factors that influence the decision of what traffic type to choose are:

- Which traffic types can be exposed to the feature?
- Over what population do you want to test your feature?
- Is the feature one that can be tested over a user’s session without concerns about consistency in subsequent sessions (e.g. alterations to a search algorithm)?

If the feature is on pages such as an account management flow shown only to logged-in users, then the user traffic type is the appropriate choice for the feature flag. If the feature is something like a sales promotion that every visitor will be exposed to, whether logged-in or not, and you only need consistency for the lifetime of the anonymous id (session or specific cookie), then roll out that feature for the anonymous traffic type.

Some features such as changes in product display pages are visible to customers both while anonymous and after logging in. If it is important to have consistency across multiple visits (or different devices), this consistency can only be guaranteed by a feature flag with the logged-in traffic type. An anonymous identifier is used when the customer is not logged-in, so the treatment shown to a user while anonymous may be different from the previous behavior Harness FME assigned to their logged in identifier. Passing the user’s logged-in id ensures consistent behavior across sessions and devices but sacrifices consistency of behavior before and after that log in occurs. 

If consistency within a session (rather than across visits) is most important, then roll out the feature flag using the anonymous traffic type. Storing the anonymous ID within a cookie can extend that consistency to multiple sessions, without needing to tie it back to the logged in identifier.

If you prefer consistency for the logged-in user (while logged-in), you will need to decide if it is more important to measure the feature for anonymous or logged-in users. Set the behavior of the group on which you are not experimenting to a consistent default in the code while the experiment runs.

It may be tempting to try and experiment with the same feature across logged-in and anonymous traffic types within a single feature flag or even by having one feature flag for each traffic type. An anonymous user gets a treatment from the feature flag based on their anonymous id and a logged-in user gets a treatment from the feature flag based on their logged-in id. However, this could lead to statistical confusion because a user may see one treatment based on their anonymous id and then after they login see a different treatment based on their logged-in id. When a user has seen both treatments, it is unclear which treatment is responsible for their behavior. For this reason, simultaneous testing of the same experiment across different traffic types should be avoided unless you can guarantee that a user will only encounter one of the feature flags.

## Practical Implications

If you are running the FME SDK server-side, then there are no special considerations involved in dealing with both anonymous and logged-in users. Pass the appropriate key to getTreatment, as needed. Because client-side FME SDKs such as JavaScript and iOS have you specify the traffic type and key as part of the initialization of the SDK client, you will need to create separate clients for both anonymous and user traffic types. This topic is covered in general in this [video](https://help.split.io/hc/en-us/articles/360018594051-SDK-Implementation-and-Troubleshooting#multiple_splits_and_keys) and specifically for [JavaScript](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk#instantiate-multiple-sdk-clients), and [iOS](https://github.com/Split-Community/Split-SDKs-Examples/tree/main/iOS-Objective-C-SDK).

## Conclusion

Deciding how to work with both anonymous and logged-in users when experimenting can initially seem confusing. Break through that confusion by considering exactly what your experiment is intended to measure and over what specific population(s), and then setting up your feature flags appropriately. Don’t overcomplicate. Cover your metric bases by reporting all events with each traffic type and associated id, when available.