---
title: Segment
sidebar_label: Segment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020742532-Segment <br /> ✘ images still hosted on help.split.io </button>
</p>

Segment allows you to easily manage integrations with multiple analytics services. By tracking events and users via Segment’s API and libraries, you can send your product’s data to all of your analytics and marketing platforms, with minimal instrumentation code. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.
 
Use this integration to:

* Send data from the Split platform as a source in Segment. When configured Split sends traffic impression data for feature flags to Segment.

* Send data to the Split platform as a destination in Segment. When configured, Split processes and displayes Segment event data in the Split platform for analysis. Split supports the `identify`, `group`, `track`, `page` and `screen` specs. Split and Segment let you change these integration settings via your Segment and Split dashboards without having to touch any code. 
 
This documentation provides additional details on the different types of Segment integrations you can use, how they affect your data in Split, and instructions for setting up the integration. 

:::warning[Important]
If you use both the `anonymousId` and `userId` fields on Segment's `track` call to differentiate between logged in and anonymous traffic find out how to [verify your Segment events](https://help.split.io/hc/en-us/articles/360035701011-Segment-Verifying-Segment-Events-in-Split) in Split or learn how to [successfully experiment with anonymous and logged-in users](https://help.split.io/hc/en-us/articles/360035494011-Successfully-Experiment-with-Anonymous-and-Logged-in-Users). 
:::

# Split as a source
 
## In Segment

1. Add a new HTTP API source.<br />Segment docs can be found [here](https://segment.com/docs/sources/server/http/).
2. Enter a name.
3. Copy the Write key provided for this new source.

<p>
  <img src="https://help.split.io/hc/article_attachments/360017439291/Segment_writekey_Copy.png" alt="Segment_writekey_Copy.png" />
</p>

## In Split

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Find Segment in the integration list, click **Add** and select the Split project for which you want to configure the integration.
4. Select the environments that you want the data sent from.
5. Select how you would like to map Split traffic types to Segment identities.
6. Paste the write key you copied in step 3 of the _In Segment_ instructions and click **Save**.

<p>
  <img src="https://help.split.io/hc/article_attachments/360027193812/image1.png" alt="image1.png" />
</p>

If you have different Split environments that correspond to different Segment workspaces, you can click **Add configuration** to configure the integration to send with a different write key.

When configured properly, data begins flowing in Segment as a `track` type with the event name `get_treatment` as shown below.

<p>
  <img src="https://help.split.io/hc/article_attachments/360021770372/seg2.png" alt="seg2.png" />
</p>

# Split as a destination

## In Split

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Find Segment in the integration list, click **Add** and select the Split project for which you want to configure the integration.
4. Under Configure as a destination in Segment, click **Add configuration**.
5. Configure the following fields:
    * **Select environment**: Select the environment from where you want impressions sent to Segment.
    * **Map identities**: Select which Segment identity should be used when mapping Segment identities to Split traffic types. (Either Segments User ID or Anonymous ID)
    * **Enable identify**: When enabled, identities captured in Segment is mapped to the traffic types you selected above and then be displayed in Split.
    * **Enable track**: When enabled, events captured in Segment is sent to Split. Map your event data using the field mapping below.
        * **eventTypeId**: This field can be customized, but is most likely maps to the event field in the segment track call.
        * **Value**: Optionally, if you want to create a sum or average metric, be sure to send this field.
    * **Track named pages**: Track events to Split for page method calls that have a name associated with them, e.g., page(‘signup’) translated to view_signup_page.
    * **Track named screens**: Tracks events to Split for screen method calls that have a name associated with them, e.g., screen(‘signup’) translated to viewed_signup_screen.
6. Once you’ve configured the above fields, click **Save**.
7. Your integration is now configured. Copy the key or click **Enable with Segment**.

<p>
   <img src="https://help.split.io/hc/article_attachments/360045121112/Screen_Shot_2019-12-10_at_2.37.26_PM.png" alt="Screen_Shot_2019-12-10_at_2.37.26_PM.png" width="745" /><br />
</p>

## In Segment

1. Select the source you want to send data from to Split.
2. Click **Add destination** and select Split. 
3. Paste the key provided from Split within Segment in the API key field.
4. Click **Save** and be sure to toggle the destination to on.

<p>
  <img src="https://help.split.io/hc/article_attachments/360022706052/destination_settings_in_segment.png" alt="destination_settings_in_segment.png" />
</p>

# Split as a destination (via webhook)

## In Split

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Find Segment in the integration list, click **Add** and select the Split project for which you want to configure the integration.
4. Under Configure as a destination in Segment, click **Add configuration**.
5. Configure the following fields:
    * **Select environment**: Select the environment from where you want impressions sent to Segment.
    * **Map identities**: Select which Segment identity to use when mapping Segment identities to Split traffic types (either Segments User ID or Anonymous ID).
    * **Enable identify**: When enabled, identities captured in Segment are mapped to the traffic types you selected above and displayed in Split.
    * **Enable track**: When enabled, events captured in Segment are sent to Split.  Map your event data using the field mapping below.
        * **eventTypeId**: this field can be customized, but is most likely maps to the event field in the segment track call.
        * **Value**: Optionally, if you want to create a sum or average metric, be sure to send this field.
    * **Track named pages**: Track events to Split for page method calls that have a name associated with them, e.g., page(‘signup’) translated to view_signup_page.
    * **Track named screens**: Tracks events to Split for screen method calls that have a name associated with them, e.g., screen(‘signup’) translated to viewed_signup_screen.
6. Once you’ve configured the above fields, click **Save**.
7. Your integration is now configured. Copy the webhook URL and secret provided.

<p>
  <img src="https://help.split.io/hc/article_attachments/360027194012/image2.png" alt="image2.png" />
</p>

## In Segment

1. Select the source you’d like to send data from to Split.
2. Click **Add destination** and select webhook*. (Segment docs on this can be found [here](https://segment.com/docs/destinations/split/))
3. Paste the webhook URL provided from Split within Segment in the webhook URL field.
4. Paste the secre* provided from Split within Segment under Headers as an Authorization.
5. Click **Save**.

<p>
  <img src="https://help.split.io/hc/article_attachments/360021770332/seg4.png" alt="seg4.png" />
</p>

# Segment spec details 

## Identify

The `identify` call lets you tie a user to their actions and record traits about them. When you enable in Split and call the `identify` function, Segment passes that ID's information to Split with `userId` (or `anonymousId`) as the Split traffic type you selected when configuring the integration. Traits are mapped to traffic type attributes in Split. Learn more about attributes in Split [here](https://help.split.io/hc/en-us/articles/360020529772-Identifying-customers).

Read more on Segment's `identify` spec [here](https://segment.com/docs/spec/identify/).

## Track
The `track` call lets you record any actions your users perform, along with any properties that describe the action. When you enable in Split and call the `track` function, Split records events within Split. Learn more about Split's events [here](https://help.split.io/hc/en-us/articles/360020585772).

Read more on Segment's `track` spec [here](https://segment.com/docs/spec/track/).

## Page
The `page` call lets you record whenever a user sees a page of your website, along with any optional properties about the page. When you enable in Split and call the `page` function Split records events for `page` method calls that have a name associated with them. For example, `page('signup')` translates to `view_signup_page`.

Read more on Segment's `page` spec [here](https://segment.com/docs/spec/page/).

## Screen
The `screen` call lets you record whenever a user sees a screen, the mobile equivalent of page, in your mobile app, along with any properties about the screen. When you enable in Split and call the `screen` function, Split records events for `screen` method calls that have a name associated with them. For example, `screen('signup')` translates to `view_signup_screen`.

Read more on Segment's `screen` spec [here](https://segment.com/docs/spec/screen/).

## Group
The `group` call allows you to associate an individual user with a group of users. Split associates a group with the particular traffic type you configure. Learn more about using the group methods in the advanced functionality below. 

Read more on Segment's `group` spec [here](https://segment.com/docs/spec/group/).

# Advanced functionality

## Set event-level groups via .track()
To support mapping events across multiple traffic types (for example, fire a `track` event for a user and an account), Split supports setting event-level groups. The group designation only applies for the specific event being logged. To specify these groups, provide an integration-specific property with key-value pairs corresponding to traffic type name in Split and the ID of the customer in Split. An example call is shown below. 

```json
{
  "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
  ...
  "messageId": "ajs-f8ca1e4de5024d9430b3928bd8ac6b96",
  "properties": {
        "split": [{
            "account": "4d3405a0-9ca5-11e5-9706-16a11fb02dec" ## key
        }],
 ...
  "type": "track",
  "userId": "41e51150-6825-11e8-9f57-0acd31e5aef0",
  "originalTimestamp": "2015-12-12T19:11:01.152Z"
}
```

### Identify additional traffic types in Split via .group()

Split supports the ability to identify multiple traffic types (for example, identifying accounts) within Split via Segment's `group` method. To specify these groups, provide an integration-specific trait with key-value pair corresponding to traffic type name in Split and the ID of the customer in Split that you want to identify. If Split can identify a Split traffic type in the traits, all additional traits are created as attributes of the traffic type and the values mapped to the key provided.

```json
{
  "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c89",
  ...
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  ...
  "traits": {
     "split": {
           "account": "4d3405a0-9ca5-11e5-9706-16a11fb02dec" ## key
         },    
     ...
     }
  "type": "group",
  "userId": "7f244b10-9ca5-11e5-9706-16a11fb02dec",
  "groupId": "4d3405a0-9ca5-11e5-9706-16a11fb02dec",
  ...
}
```

# FAQs

### What happens if the eventTypeId field has spaces in Segment?
If the name has a space, Split replaces the space with an underscore changing `sample event` to `sample_event` when it appears in the Split user interface.

### What does Split do if the eventTypeId field is not mapped correctly?
The `eventTypeId` field is required, so if name does not map correctly or does not match the configuration settings, the event is dropped.

### What does Split do if the eventTypeId field is mapped correctly, but the value field is not?
The `value` field is optional. If `eventTypeId` is mapped correctly but the `value` field does not align with the configuration settings, the `value` field is null in Split.

### What happens in Split if we have traits.company in our identify call?
Passing `traits.company` is received as a string version of the object in Split as an attribute `company`. We recommend flattening the object if you want to see this data in Split.

### What size limits does Split have on trait values?
Trait values are limited to 255 characters. 