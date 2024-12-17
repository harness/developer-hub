---
title: mParticle
sidebar_label: mParticle
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360038306272-mParticle </button>
</p>

mParticle is a customer data platform that allows you to centralize, manage, and activate your customer and engagement data across any channel.

Use this integration to: 
* Send data from the Split platform as a feed input in mParticle. When configured, Split sends traffic impression data for feature flags to mParticle.
* Send data to the Split platform as an event output in mParticle. When configured, Split processes and displays mParticle event data in the Split platform for analysis. 

This guide explains how you can set up and test different configurations within the mParticle integration.

# Split as a feed input

## In mParticle

Before you begin, within your mParticle account, set up Split using the Integration Directory to receive your API key and secret. Copy and save these 2 strings. Refer to [mParticle documentation](https://docs.mparticle.com/integrations/split/feed/) for more information. 

<img src="https://help.split.io/hc/article_attachments/360046876712/Screen_Shot_2020-01-10_at_2.13.41_PM.png" alt="Screen_Shot_2020-01-10_at_2.13.41_PM.png" />

## In Split 

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Find mParticle from the integration list, click **Add** and select the Split project for which you would like to configure the integration.
4. Under Configure as a partner feed input in mParticle, select **Add configuration**.
5. Select the environment type in mParticle you want to send your data to. You can select either: 
    * Development 
    * Production 
6. Select how you want to map Split traffic types to mParticle identities. You can select: 
    * customer_id
    * email
    * facebook
    * twitter
    * google
    * microsoft
    * yahoo
    * other
    * other_id_2
    * other_id_3
    * other_id_4
7. Split impressions display as *get_treatment* in mParticle by default or you can customize this event name with a maximum of 256 characters. 
8. Paste the server to server key and secret from your mParticle account and click **Save**.
9. Once you save the configuration, send a test event from Split into mParticle.

Repeat this process for each environment and traffic type you want to configure. 

# Split as an event output 

## In Split 

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Find mParticle in the integration list, click **Add** and select the Split project for which you would like to configure the integration.
4. Under Configure as an events output in mParticle, select **Add configuration**.
5. Select the environment type in mParticle you would your data to be sent to. You can select either: 
    * Development 
    * Production 
6. Select how you want to map Split traffic types to mParticle identities. You can select: 
    * mpid
    * customer_id
    * email
    * facebook
    * twitter
    * google
    * microsoft
    * yahoo
    * other
    * other_id_2
    * other_id_3
    * other_id_4
7. Enable identify to **On** if you want Split to capture the user attributes in your mParticle events using an [identify call](https://help.split.io/hc/en-us/articles/360020529772-Identifying-customers).
8. Enable events to **On** if you want Split to capture mParticle events sent to Split. 
9. Click **Save**.
10. Copy the generated key and use it to configure the events integration settings in mParticle. 
 
## In mParticle
Within mParticle, select Split from the integration directory and configure the events integration. When prompted, enter the integration key provided by Split. Refer to[mParticle documentation](https://docs.mparticle.com/integrations/split/event/) for more information. 

# User identity mapping 

## Logged in and anonymous mapping

If you want to map logged in and anonymous traffic, we recommend mapping your logged-in traffic type in Split to `customer_id` in mParticle. For mapping an anonymous traffic type, pass any anonymous ID to Split for targeting and use a `other_id` field in the user identities to reserve for Split anonymous traffic.

If you are unsure of which mParticle identifier to map your Split traffic to, reach out to your mParticle solutions consultant or contact [support@split.io](mailto:support@split.io).

## Multiple identity mapping

In general, it is recommended to map a single mParticle identity to a single traffic type in Split. If you require mapping multiple mParticle identities to a single traffic type in Split, contact [support@split.io](mailto:support@split.io) so we can provide guidance on best practices. If an event contains two mParticle identities that are mapped to a single Split traffic type, two events are generated.

For example, if we have `customer_id` = 123 and `other_id` = 456 as mParticle identities in an event and both are mapped to user traffic type in Split. It becomes two events in Split, both with traffic type as user and event one has `key` = 123 and event two has `key` = 456. Other fields remain the same.

# Event data mapping

From mParticle, we accept the following events types:

* commerce event
* custom event
* session start
* session end
* screen view 

See the following section to learn more about how fields and properties are mapped in Split for each event type.

## Commerce event

For the commerce event, Split accepts product-based events. These events have a product action field populated. Split does not accept promotion-based or impression-based commerce events. If multiple products are included in the product action event, the number of products are equal to the number of events generated in Split.

Event fields are mapped as shown below: 

|**mParticle field**| **Mapped field in Split**|
|---|---|
| event type | eventTypeId |
| eventid | foreignId |
| timestamp | timestamp |
| session id source message id|properties |
| [Product action fields](https://docs.mparticle.com/developers/server/json-reference/#product_action): action transaction id total amount tax amount shipping amount currency code affiliation | properties |
| [Location fields](https://docs.mparticle.com/developers/server/json-reference/#product_action): location latitude location longitude location accuracy | properties |
| [Product fields](https://docs.mparticle.com/developers/server/json-reference/#product_action): product id product name product brand product category product variant product position product price product quantity product coupon code product total amount| properties (These fields are prepended with *product* in the event property field in Split) |
| custom attributes | properties (These fields are prepended with *attribute* in the event property field in Split.) | 

## Custom event

Event fields are mapped as shown below:

|**mParticle field**| **Mapped field in Split**|
|---|---|
| event name | eventTypeId |
| event id | foreignId |
| timestamp | timestamp |
| session id source message id | properties |
| [Location fields](https://docs.mparticle.com/developers/server/json-reference/#custom_event): location latitude location longitude location accuracy | properties | 
| custom attributes | properties (These fields are prepended with *attribute* in the event property field in Split.) |

## Session start event

Event fields are mapped as shown below:

|**mParticle field**| **Mapped field in Split**|
|---|---|
| event type| eventTypeId |
| event id | foreignId |
| timestamp | timestamp |
| session id source id | properties |
| [Location fields](https://docs.mparticle.com/developers/server/json-reference/#session_start): location latitude location longitude location accuracy | properties | 
| custom attributes | properties (These fields are prepended with *attribute* in the event property field in Split.) |

## Session end event

Event fields are mapped as shown below: 

|**mParticle field**| **Mapped field in Split**|
|---|---|
| event type| eventTypeId |
| event id | foreignId |
| timestamp | timestamp |
| session id source id | properties |
| [Location fields](https://docs.mparticle.com/developers/server/json-reference/#session_end): location latitude location longitude location accuracy | properties | 
| [Other session end fields](https://docs.mparticle.com/developers/server/json-reference/#session_end): session length ms | properties | 
| custom attributes | properties (These fields are prepended with *attribute* in the event property field in Split.) |


## Screen view

Event fields are mapped as shown below: 

|**mParticle field**| **Mapped field in Split**|
|---|---|
| event type| eventTypeId |
| event id | foreignId |
| timestamp | timestamp |
| session id source id | properties |
| [Location fields](https://docs.mparticle.com/developers/server/json-reference/#screen_view): location latitude location longitude location accuracy | properties | 
| [Other sessionview fields](https://docs.mparticle.com/developers/server/json-reference/#screen_view): screen name | properties | 
| custom attributes | properties (These fields are prepended with *attribute* in the event property field in Split.) |

Note that Split doesn't accept the following event types from mParticle: 

* uninstall
* crash report
* opt out
* push registration
* application state transition
* push message
* network performance
* breadcrumb
