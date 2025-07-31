---
title: Sending Segment Events to Harness FME With Additional Traffic Types
description: Learn how to send Segment events to Harness FME with additional traffic types.
sidebar_position: 3
sidebar_label: Sending Segment Events
---

## Overview

When you configure Split as a Segment destination, you map Segment identity types (`userId` and `anonymousId`) to Split traffic types. This allows Segment events to feed metrics for feature flags when those IDs are passed to `getTreatment`. 

To support measuring feature flags for other traffic types—such as `account` or `job`—the Split/Segment integration includes a feature that lets you create Split events of an additional traffic type by adding a special property to the Segment event.

This PAGE presumes you have already configured the Split/Segment integration to define [Harness FME as a Segment destination](/docs/feature-management-experimentation/integrations/segment#harness-fme-as-a-destination). Typically in such a configuration, you will map the Segment userId to the Split user traffic type and the Segment anonymousId to the traffic type you use for anonymous users.

Now, what do you do if you want to use events from Segment in a metric for a feature flag that is not one of those two traffic types? For instance, let's say we have an auction site and we're testing out a new minimum bid algorithm with a feature flag that randomly assigns one of two algorithms to each auction. 

The traffic type in this case is auction, because we are passing the auction id to getTreatment to determine which algorithm should be assigned. To measure the results we need events of auction traffic type where the id in the event is the auction id to which that action applied (these events might include bid-placed and auction-settled). How do we pass that information (traffic type and id) to Segment's track method?

The Split/Segment integration allows you to pass that information in the properties of a tracked event, with a property named split. The value of that property should be an array of key-value pairs, where they key is the name of the traffic type and the value of the key is the id to be associated with the traffic type. So, a Segment call to register an event for the completion of an auction, where the auction id is "abcd-1234" would be

```bash
analytics.track("Auction_complete", {closingPrice: 550.00, split: [{auction: "abcd-1234"}]});
```

If the integration was configured to map both userId and anonymousId from Segment to Split traffic types and both identities were known at the time of the track call (i.e. analytics.identify had been called), then this event would show up three times in Split: once with traffic type user, once with traffic type anonymous, and once with traffic type auction. For traffic type auction, the id associated with the event would be "abcd-1234".

If for some reason, you had more than one additional traffic type for the event, you would pass each traffic type/id pair as a separate element in the array for the feature flag property, like

```bash
analytics.track("Auction_complete", {closingPrice: 450.00, split: [{auction: "abcd-1234"}, {partner: "Auc-5678"}]});
```

This form would create two extra events in Split: one with traffic type auction and one with traffic type partner. While the ids associated with the traffic types are shown in the examples as literals, in your code, they most likely would appear as variables holding the appropriate values.