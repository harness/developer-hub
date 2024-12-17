---
title: MTK usage and comparing counts
sidebar_label: MTK usage and comparing counts
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/26978089134349-MTK-Usage-and-Comparing-Counts </button>
</p>

Split has a wide variety of support for sending impressions data that it collects to downstream systems. This data can then be used for further correlational analysis or validation that data matches other analytics or user tracking tools. This guide outlines situations where the data may differ and possible solutions.

## What is an MTK?

Split tracks usage for our customers based upon what are called MTKs. MTK stands for **Monthly Tracked Keys**. For a more detailed description see our page on [Account Usage Data](https://help.split.io/hc/en-us/articles/360034159232-Account-usage-data#usage-data). When counting anonymous users, the MTK count may be inflated due to any of the circumstances described below.

If a user with the key “John” sees three different feature flags within a month, "John" would be counted as a single MTK. If “John” sees the same feature flag 100 times within a month, "John" would still be counted as a single MTK. If John also has an anonymous cookie id “ABC-123,” and that ID is evaluated with Split, then that is an additional MTK because it is a different key value. If "ABC-123" continues to have impressions, that is still just one additional MTK, for a total of two. Now if "John" clears his cookies, or visits as an anonymous user from a different device, then that would be an additional key used by the SDK, and as a result, an additional (third) MTK.

## What can affect the MTK count?

There are a few reasons why the MTK count might be significantly different from expected site traffic:

### getTreatment calls when the SDK is not ready

If there are getTreatment calls happening when the SDK is not ready, all of those impressions get sent to Split. If some of those happen to be for feature flags that don’t exist, then those will still be counted as impressions. This could potentially increase MTK count if these are for anonymous flags and the user navigates away before hitting any other flags.

To remediate this issue, ensure that the SDK is ready before calling getTreatment.

*Example scenario:*

Split is integrated and the SDK is called directly after creating the factory and without waiting for the SDK_READY event.

```
# Pseudocode:
factory = new SplitFactory(settings);
client = factory.client();
treatment = client.getTreatment('SPLIT_NAME');
```

Notice here that there is no block until ready. All code examples provided by Split on our Help Center include the best practice of blocking until ready. If not blocking, this will cause extra MTKs if done on feature flags that have been deleted from Split’s UI but still remain in code. Normally, deleting a flag from the UI would mean that the SDK does not recognize the flag and will not compute anything. However, when the SDK is not ready, it does not know which flags are configured or not configured, so it sends everything to Split’s backend, counting as MTKs.

### getTreatment calls on killed flags or flags with 0% traffic allocation

A feature flag that is killed or ramped down to 0% allocation still evaluates treatments, and those MTKs still get sent back to Split. To resolve this, the flag will have to be removed from code so that getTreatment is not called for them.

*Example Scenario:*

A team is working on a new feature. After putting it into production, they immediately notice a significant performance degradation and proceed to kill the feature flag. Killing the flag does not stop the evaluation of the flag - those <span class="mark">getTreatment</span> calls still count as MTKs.

### Automated testing or load testing tools

Discrepancies can occur when using automated testing or load testing tools that hit your application or website. In general, our recommendation for automated testing is to use localhost mode to ensure that impressions for these tests do not get sent back to the Split Cloud and are not counted as MTKs. Setting the SDK to use localhost mode will allow you to use any number of keys for testing purposes. If that is not possible, then another recommendation we have is to test by cycling through a fixed set of keys. The size of this set will depend on your load test. Usually the total number of keys is recommended to be the number of concurrent users on the site. This is also called [pooling](#pooling).

*Example Scenario:*

A team is doing an automated load test of a backend service. The SDK is not set to use localhost mode. The load testing tool generates 100,000 users and creates a session and some usage for each. This creates 100,000 new MTKs. It’s important to note that the Split SDK does local evaluation. It does not make external API calls for each feature flag treatment evaluation, so your load test will still be valid even when using localhost mode and defining the flag treatments in a file.

### Use of unstable IDs

Having getTreatment called from a device ID or a randomized UUID can create a significantly different MTK count when compared to a count of unique ‘users.’ This is especially true when not using a cookie or some other way to stabilize the IDs.

*Example Scenario:*

A company is using Split for both anonymous and logged in users. Anonymous users are given a new UUID each time they navigate to the site. This UUID is not stored in a cookie. This means that each time a user navigates to the site and before they log in, a new MTK will be generated. Setting this UUID in a cookie, and checking for the existence of this cookie first, will cut down on MTK generation. Alternatively, a device ID can be used on mobile apps.

### Different engineering teams using different IDs for the same user

In large organizations, it is entirely possible that multiple teams are using Split and sending impressions using Split’s SDK or Evaluator. It is important to ensure that these teams are using the same ID for the same users. If teams are using different IDs for the same ‘person’ then this would inflate MTK usage.

*Example Scenario:*

A large e-commerce company sells both grocery items and retail goods. There are separate development teams for each section of the site. Split is integrated in both sections and used by both teams. They are doing anonymous experimentation based upon a cookie ID. Each section of the site sets their own individual cookie and anonymous id. In this scenario, without any centralized governance, their MTKs could be up to two times what they should be because of users navigating to both sections of the site and getting the two different cookies for their anonymous IDs. Centralizing to a unified anonymous id set once would resolve this.

## Improving your MTK efficiency

In addition to resolving the possible issues outlined above, there are several ways to proactively decrease the amount of MTKs sent to Split in order to maximize the efficiency of MTK usage.

### Use a more consistent ID as an anonymous ID

In many cases you will be experimenting on anonymous IDs. One approach to reduce MTK counts for anonymous logins is to use a device id or some other kind of ID tied to the browser or machine, rather than using a purely random anonymous ID that you are generating. Using IDs stored in cookies or in browser localStorage are also options when doing anonymous experiments. This will reduce your MTK count as the same ID will be used for repeat visitors from the same device when using a mobile or browser SDK. On browsers, it is important to note that clearing cookies or using multiple browsers from the same device can create additional anonymous ID MTKs.

For users that are both anonymous and have a user account, an additional approach for reducing MTKs and keeping the experience consistent on those anonymous feature flags is to have the user ID associated with one single anonymous id in a backend key/value store. This way that single anonymous ID can be fed to all anonymous flags, reducing the MTKs and keeping the experience consistent for that logged in user. Storing this ID in a cookie or local storage will also help in the situation where they are logged out, eliminating the need to generate new anonymous IDs on a device or browser when a user with an account has logged out.

### Timing the getTreatment call

The call to getTreatment is the generator of MTKs, so it should be called as close as possible to the usage of the returned treatment in code. This way you can ensure best as possible that the treatment call is being used and not wasting an MTK. This is especially relevant for anonymous feature flags. Calling <span class="mark">getTreatment</span> and not using it for a logged in user ID flag is less likely to create an additional MTK simply because it is likely that other flags would be using that logged in user ID as well.

### Non-ID based targeting

If a feature flag is being rolled out as a purely on/off without percentage-based targeting, or is being targeted exclusively via passed-in attributes, then another option for reducing the count of MTKs is to simply pass in a hardcoded, constant key for the flag. If not using (or planning to use) a percentage-based rollout, then automated monitoring and experimentation are not available, so there is no loss of functionality by using a constant key.

### Exclude bots and crawlers

For more details, see this article: [Handling Bots](https://docs.google.com/document/d/1VXfq3RC6tIB10YAz3rmQwn0RibRNHHFSddeVvpeqZlI/edit). Client-side SDKs require JavaScript which most crawlers and bots do not evaluate. Confirm you are using a server-side SDK in this scenario. Also review [the bots or web crawlers](#bots-or-web-crawlers) section of this document.

### Removing flags that are 100% rolled out

Check for feature flags that are 100% rolled out and remove them from code. Split’s [rollout board](https://help.split.io/hc/en-us/articles/4405016480269-Use-the-rollout-board) can be beneficial for examining and reviewing the rollout statuses of flags.

### Sampling

For anonymous experiments, if you are getting a significant amount of MTKs to [power your experiments](https://help.split.io/hc/en-us/articles/360034040851-Sample-size-and-sensitivity-calculators), you could consider sampling keys. This is something that would have to be done with code outside of Split’s getTreatment call. Non-sampled traffic will not be part of the experiment and will be given a hardcoded treatment. If using this approach, it is not recommended to sample by something such as a time of day, attribute, region, first come/first serve, etc. The recommended approach is to use a mathematical hashing function with a test that can be used to filter out anonymous keys on a percentage basis from Split’s track and getTreatment calls.

#### Code Example for getTreatment

```
let murmur = require("murmurhash-js")
const SAMPLE_RATE = 0.1
const SEED = 199
const MAX_32BIT_INT = 4294967295


if((murmur.murmur3(key, SEED)/MAX_32BIT_INT) < SAMPLE_RATE) {
let treatment = split.getTreatment(key, "SPLIT_NAME")
} else {
let treatment = "off"
}
```

#### Code Example for tracking events

```
if(converted  && ((murmur.murmur3(key, SEED)/MAX_32BIT_INT) < SAMPLE_RATE)) {
let track = split.track(key,"TRAFFIC_TYPE","EVENT")
}
```

Having more users and events will increase the power of your experiment, i.e. you are more likely to detect a statistically significant effect if one exists. Sampling can reduce the power of tests; for example, sampling 1% of keys means that an underpowered test on anonymous traffic can take up to 100 times longer. It might take even longer for logged-in users, as they create new accounts less often than they come back. This is not a problem with millions of views, so keep this in mind when considering sampling to reduce MTK counts.

It is entirely possible that you may want to limit experimentation only to certain regions, devices, or other axes of your data. Rather than doing that partitioning in Split, you may also filter by these attributes. Similar to sampling, those that are in the population have getTreatment called, and those that are not in the population would receive a hardcoded treatment value.

### Pooling

Sometimes called bucketing, this method can be used to group keys into a certain number of buckets or keys. Every anonymous key in the same bucket would be the same MTK from Split’s perspective. This can be used for gradual or percentage-based rollouts, *but should not be used for experimentation*. Bucket sizes are not guaranteed to have equal numbers of users or ids in them, making conversion metrics not useful for comparison. This is a common practice that is recommended for [load testing an app using Split](#automated-testing-or-load-testing-tools).

#### Code Example for getTreatment:

```
let murmur = require("murmurhash-js")
const NUM_BUCKETS = 10000
const SEED = 199

let bucket_key = (murmur.murmur3(key, SEED)) % NUM_BUCKETS</mark></p>

let treatment = split.getTreatment(bucket_key, "SPLIT_NAME")</mark></p>
```

#### Code Example for track:

```
if(converted ) {  
let track = split.track(bucket_key,"TRAFFIC_TYPE","EVENT")  
}

```

## Why counts in Split may differ from other applications

### Sampling

Tools such as Google Analytics sample data in common configurations, sending a representative subset of the data instead of the entire data set. This results in a potentially dramatic difference in what you see when comparing numbers. Google Analytics will warn you if the data is being sampled. You can configure the precision/speed ratio or reduce the timeframe over which data is sampled to avoid it all together.

### Filtering

Many tools allow you to set filtering criteria to include or exclude specific traffic, perhaps blocking internal traffic, spam, bots, excluding time ranges or IP addresses, etc. Make sure to use the same filtering logic across all tools or at least account for the differences.

### Time zones and time windows

Some analytics tools use the user's location while others may default to UTC or another time zone. This affects the day boundary for reporting. Also, the start time of an experiment may not coincide neatly with the output from another tool. Make sure you are looking at the same window of time when comparing data.

### Attribution and exclusion

Because different attribution logic is used by various tools, it's not uncommon for values of a similar metric to vary by 10-15%. It's important to understand how things like omni-channel conversions are handled. For example, a user may get an impression/treatment on one device, perhaps an ad on a phone, and then convert or perform some other tracked action from a browser.

When experimenting, Split will exclude users from results under certain circumstances. For example, a user that switches targeting rules more than once within the same version of an experiment will be excluded from experimental analysis. This is not a usual circumstance and the number of users excluded for these reasons may be small, but there are cases where the design of a test or misconfigured targeting rules could lead to significant exclusions. Note that while exclusions do impact experiment results, they do not change the MTK count. For more information, review the [Attribution and exclusion guide](https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion).

Split's [metric details and trends](https://help.split.io/hc/en-us/articles/360025376251-Metric-Details-and-Trends) feature highlights any excluded users.

### Client-side device connectivity

Implementation of Split on the browser or mobile device can impact the collection of data. This is exacerbated by the relative lack of control over user interaction. Abruptly closing a browser window or a mobile app can impede or delay data being captured.

Ad/content blockers are becoming more common as users seek to avoid ads and more attention is placed on privacy concerns. These blockers can impact a wide range of client-side trackers, not just ads, and not just Split. Depending on what is blocked, the results computed by various analytic tools may differ. Some ways to resolve this issue with Split include [moving Split evaluation to the backend](https://help.split.io/hc/en-us/articles/360025281872-Moving-Splits-to-the-Back-End), or using [Split Proxy](https://help.split.io/hc/en-us/articles/4415960499213-Split-Proxy), where the proxy is hosted from the same DNS root as your site or application.

Be aware that moving feature flags to the backend may exacerbate the difference in counts if content blockers come into play and client-side flags still exist, because client-side content blocking doesn't impact server-side flags.

When using the JavaScript or mobile SDKs, configuration options (such as [these](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#configuration) for JavaScript) can be tuned to ensure you capture the greatest possible number of impressions and/or events. In particular, the RefreshRates can have a significant impact when lowered.

A number of articles in the Help Center describe why you may be missing or getting improper impression counts in Split, and how to avoid some of these issues:

- [<span class="mark">Block traffic until the SDK is ready</span>](https://help.split.io/hc/en-us/articles/360006667012-Block-traffic-until-the-SDK-is-ready)

- [<span class="mark">Why are Impressions not showing in Split?</span>](https://help.split.io/hc/en-us/articles/360007632132-Why-are-Impressions-not-showing-in-Split-)

- [<span class="mark">Javascript SDK on slow networks</span>](https://help.split.io/hc/en-us/articles/360012551371-Why-does-the-Javascript-SDK-return-Not-Ready-status-in-Slow-Networks-)

- [<span class="mark">Always getting 'Control' treatments</span>](https://help.split.io/hc/en-us/articles/360020863412-General-SDK-Always-getting-Control-treatments)

### Bots or web crawlers

This is more likely when using server-side SDKs deployed on your site, due to the fact that crawlers don’t typically evaluate JavaScript, such as that used by our browser SDK. If bots or crawlers are determined to be the issue, Split can help by sending reports on the ‘key’ value length used to see if the bots are throwing nonsensical user IDs to Split. Split can also send reports on MTKs by feature flag to see if certain flags are more prone to vastly inflated numbers. To combat bots or crawlers, you typically need to work with your hosting or CDN provider, as they can help with enabling bot protection and providing other analysis tools. If bots can be identified, then you can use a control flow statement to skip evaluation of those users, or you can use a hardcoded key value.

## When to be concerned about differences

As outlined above, there are many cases that could lead to differences in the numbers of unique key counts, that may not be cause for concern. However, there are a few situations where mismatches are problematic, and should be addressed.

If a sample ratio mismatch is detected in one system but not the other, then investigation is likely needed to determine why one treatment is more likely to be returned than another. If the key count difference varies significantly between feature flags, then there is also a need to investigate why some flags are more likely than others to have their evaluation returned to Split, or to the other third-party system.

For troubleshooting, it is likely helpful to export impressions and events from the data hub for analysis. Note that Split deduplicates incoming impressions, so the impression count may be significantly different from other systems or counts of SDK function calls, for example.

Split's SDKs maintain an internal LRU cache (last recently used) to keep impressions sent under reasonable limits. This cache is maintained for the life of the SDK instance. When an impression is generated we check the LRU cache to see if a matching impression has been registered before. If so, we don't queue the impression and only send it with the [impression listener](https://help.split.io/hc/en-us/articles/360020037072-Split-Evaluator#impression-listener), if it is set. If the impression hasn't been seen before, we add it to the queue.

By operating the SDK in "optimized" mode, which is the default, we are able to lower the number of impressions. These impressions are then deduplicated an additional time, server-side, over a 1-hour window before posting downstream to serve integrations such as Amplitude, Segment, mParticle, and the webhooks. It is important to note that neither Split's SDKs nor Split's servers maintain state for a particular key. We do our best to deduplicate across a particular SDK instance and over logical time windows.

Split always does some basic de-duplication prior to sending impressions, even if not in optimized mode. For example, if an identical impression comes from the same key and the same SDK instance within a minute we always discard that impression as a duplicate.

While a user may hit a feature flag multiple times, Split only keeps and sends back the first impression. If you change the version of the flag within the hour window, we will send impressions for each version, which is important for experimentation.

Ultimately, if the difference is consistent across feature flags and treatments between Split and another system, then it can likely be explained by one of the above reasons. In general, a small amount of discrepancy is normal and should be fairly small (&lt;%).

Split can provide you with additional reports to help understand unexpectedly high MTK results. These include:

1.  MTK count per flag: All feature flags and the number of unique keys each flag received in a month. The total across flags will exceed MTKs since the same key used on different flags is only counted once.

2.  Unique characters MTK count: The number of unique keys broken down by their character length. This can surface anomalies if you’re sending us different character length keys for load testing or different traffic types.

3.  MTKs per flag by unique key length: All feature flags and the number of unique keys broken out by their character length that each flag received for the month. This will show if you are passing different types of keys for the same flag.

## Comparing events and metric results

When comparing events and metric results, it is important to ensure that consistent filters are being applied:
* Time frame: Ensure that your feature flag version matches the time frame that you expect to evaluate events.
* Targeting rule: Ensure that the number of impressions and events being compared are for users that hit the specific targeting rule selected.

For more information on Metrics review these videos and articles:

- [<u>All About Split Metrics</u>](https://help.split.io/hc/en-us/articles/360042967172-All-About-Split-Metrics)

- [<u>Metrics Impact</u>](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact)
