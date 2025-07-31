---
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 3
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025918571-Troubleshooting </button>
</p>

## Overview

Our SDKs have a standardized interface for inputs to every method. If you have issues getting up and running with any of our SDKs or aren't getting the expected return from any method or to the Split UI, you can find a detailed view of the types of validation that our SDK performs for each method below.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab-number">
<TabItem value="1" label="GetTreatment Method Validation">

Below are the expected input data types for the method `getTreatment(key, split_name, attributes)`:

* key: `string` that is less than or equal to 250 characters
* split_name: `string`
* attributes: `dictionary`

:::info
For iOS, Android, and JavaScript, this method also has a signature of `getTreatment(split_name, attributes)`. If you are troubleshooting any of these SDKs, feel free to skip the Key Validations section below.
:::

## Key Validations

key == null || key undefined (or similar for each language)
SDK will return control
SDK will log the following error to the console “getTreatment: you passed a null or undefined key, the key must be a non-empty string”
no Impression will be logged back to Split servers
key is longer than 250 characters
SDK will return control
SDK will log the error “getTreatment: key too long - must be 250 characters or less”
no Impression will be logged back to Split servers
key is of type number and is finite
SDK will perform best effort to stringify the input and return a treatment for the converted response
SDK will log the error “getTreatment: key too long - must be 250 characters or less”
key is not of type string or finite number or object type
SDK will return control
SDK will log the error “getTreatment: you passed an invalid key type, key must be a non-empty string”
no Impression will be logged back to Split servers
key is an empty string
SDK will return control
SDK will log the error “getTreatment: you passed an empty string, key must be a non-empty string”
no Impression will be logged back to Split servers

## Split Name Validations

split_name == null || undefined
SDK will return control
SDK will log the error “getTreatment: you passed a null or undefined split name, split name must be a non-empty string”
no Impression will be logged back to Split servers
split_name is not of type string
SDK will return control
SDK will log the error “getTreatment: you passed an invalid split name, split name must be a non-empty string”
no Impression will be logged back to Split servers
split_name is an empty string
SDK will return control
SDK will log the error “getTreatment: you passed an invalid split name, split name must be a non-empty string”
no Impression will be logged back to Split servers
split_name has whitespace at the end or beginning of the string
SDK will evaluate with the trimmed version of the split name.
SDK will log the warning “getTreatment: split name “X” has extra whitespace, trimming”
An Impression will be logged with the trimmed split_name.

## Attributes Validations

attributes is not of type dictionary
SDK will return control
SDK will log the error “getTreatment: attributes must be of type dictionary”
no Impression will be logged back to Split servers

</TabItem>
<TabItem value="2" label="Track Method Validation">

Below are the errors and expected behavior you can expect from the SDK on the `track(key, traffic_type_name, event_type, value)` method.

:::info
For iOS, Android, and JavaScript, this method also has signatures without a `traffic_type_name` or `key`. If you are troubleshooting any of these SDKS, feel free to skip the Key and Traffic Type Validations sections below.
:::

## Key Validations

key == null || undefined
SDK will return false
SDK will log the error “track: you passed a null or undefined key, key must be a non-empty string”
no event will be logged back to Split servers
key is of type number

Log warning “track: key X is not of type string, converting to string”
Store key As String

SDK will stringify the key.
SDK will log the error warning “track: key X is not of type string, converting to string”
key is not of type string or number
SDK will return false
SDK will log the error “track: you passed and invalid key, key must be a non-empty string”
no event will be logged back to Split servers
key is an empty string
SDK will return false
SDK will log the error “track: you passed an empty key, key must be a non-empty string”
no event will be logged back to Split servers
key is longer than 250 chars
SDK will return false
SDK will log the error “track: key too long - must be 250 characters or less”
no event will be logged back to Split servers

## Event Type Validations

event_type is an empty string
SDK will return false
SDK will log the error “track: you passed an empty event_type, event_type must be a non-empty String”
no event will be logged back to Split servers
event_type == null
SDK will return false
SDK will log the error “track: you passed a null or undefined event_type, event_type must be a non-empty String”
no event will be logged back to Split servers
event_type not type string
SDK will return false
SDK will log the error “track: you passed an invalid event_type, event_type must be a non-empty String”
no event will be logged back to Split servers
event_type does not conform with reg exp
Regular expression is: ^[a-zA-Z0-9][-_.:a-zA-Z0-9]{0,79}$
SDK will return false
SDK will log the error track: you passed “EVENT_TYPE_VALUE”, event name must adhere to the regular expression [a-zA-Z0-9][-_.:a-zA-Z0-9]{0,79}. This means an event name must be alphanumeric, cannot be more than 80 characters long, and can only include a dash, underscore, period, or colon as separators of alphanumeric characters”
no event will be logged back to Split servers

## Traffic Type Validations

traffic_type_name == null
SDK will return false
SDK will log the error “track: you passed a null or undefined traffic_type_name, traffic_type_name must be a non-empty string”
no event will be logged back to Split servers
traffic_type_name not type string
SDK will return false
SDK will log the error “track: you passed an invalid traffic_type_name”, traffic_type_name must be a non-empty string”
no event will be logged back to Split servers
traffic_type_name empty string
SDK will return false
SDK will log the error “track: you passed an empty traffic_type_name, traffic_type_name must be a non-empty string”
no event will be logged back to Split servers
traffic_type_name has capitalized letters
SDK will log the warner “track: traffic_type_name should be all lowercase - converting string to lowercase"
event will be logged back to Split servers with traffic_type_name lowercased

## Value Validations

Value not null and not a finite number
SDK will return false
SDK will log the error “track: value must be a number”
no event will be logged back to Split servers

</TabItem>
<TabItem value="3" label="Factory Instantiation Validation">

Below is a view of the validation to expect when instantiating the SDK factory

## Validation for `SplitFactoryBuilder.build("YOUR_API_KEY", config);`

api_key == empty string
SDK will log the error “factory instantiation: you passed and empty api_key, api_key must be a non-empty string”
api_key == null || key undefined
SDK will log the error: “factory instantiation: you passed a null or undefined api_key, api_key must be a non-empty string”
(Backend SDKs only) api_key == browser type
SDK will log the error: “factory instantiation: you passed a browser type api_key, please grab an api key from the Split console that is of type sdk”

If any of the above errors are encountered:

Any calls to getTreatment and getTreatments will return control or map of controls
Any calls to track will return false
Any manager methods will return null or an empty collection

## (JS and mobile SDKs only) Instantiation with a Key

key == empty string
SDK will log the error: “factory instantiation: you passed an empty key, key must be a non-empty string”
key == null || key undefined
SDK will log the error: “factory instantiation: you passed a null or undefined key, key must be a non-empty string”
(JS only) key == empty string
SDK will log the error: “client instantiation: you passed an empty key, key must be a non-empty string”
(JS only) key == null || key undefined
SDK will log the error: “client instantiation: you passed a null or undefined key, key must be a non-

If any of the above errors are encountered:

Any calls to getTreatment and getTreatments will return control or map of controls
Any calls to track will return false
Any manager methods will return null or an empty collection

## Validations if ready config is not properly set

Ready == null (Backend SDKs only)

SDK will log the warning: “no ready parameter has been set - incorrect control treatments could be logged” if no ready config has been set when building factory

(JS SDK only) Log warning if there are no proper callbacks for either the event or the ready promise.

SDK will log the warning: “No listeners for SDK Readiness detected. Incorrect control treatments could be logged if you call getTreatment while the SDK is not yet ready”

(JS SDK only) If the readiness events are subscribed to AFTER the SDK is ready:

SDK will log the warning: `A listener was added for {event name} on the SDK, which has already fired and won’t be emitted again. The callback won’t be executed.`

</TabItem>
<TabItem value="4" label="GetTreatments Method Validation">

Below are the expected input data types for the method getTreatments(key, split_names):

key: string that is less than or equal to 250 characters
split_names: array

## Split Names Validations

split_names == null || undefined || not an array
SDK will return null
SDK will log the error “getTreatments: split_names must be a non-empty array”
no Impressions will be logged back to Split servers
split_names == empty array
SDK will return an empty object or collection
SDK will log the error “getTreatments: split_names must be a non-empty array”
no Impressions will be logged back to Split servers

## Validations for each split name in split names Array

All the same checks will be performed for split_name as defined in the get_treatment section above. Our SDK will validate each split name and log the corresponding error for each. It will also filter out any invalid inputs and only include the valid inputs in the returned dictionary.

</TabItem>
<TabItem value="5" label="Manager Interface Validation">

Below are a set of validations for the manager.split(split_name) method:

split_name == null || split_name == undefined
SDK will return null
SDK will log the error “split: you passed a null or undefined split name, split name must be a non-empty string”
split_name == empty string
SDK will return null
SDK will log the error “split: you passed an empty split name, split name must be a non-empty string”
split_name not type string
SDK will return null
SDK will log the error “split: you passed an invalid split name, split name must be a non-empty string”

</TabItem>
</Tabs>

## Validation for a Destroyed Client

Below is the behavior you can expect from the client if it is used after it has been destroyed:

All methods will log the error “Client has already been destroyed - no calls possible”
Any calls to getTreatment and getTreatments will return control or map of controls
Any calls to track will return false
Any manager methods will return null or an empty collection

## Tracked events not showing

Events sent via `client.track()` may not appear in the Harness FME UI even if the call succeeds. This usually happens because the FME Cloud silently rejects requests with invalid data.

Common causes include event type names containing invalid characters, such as spaces (e.g., `client.track("userId", "client", "my conversion");`), or specifying a traffic type that doesn’t exist in your Split organization (e.g., `client.track("userId", "IncorrectTrafficType", "conversion");`).

To resolve this, ensure event type names and traffic types follow the guidelines in the [SDK Overview documentation](/docs/feature-management-experimentation/sdks-and-infrastructure/sdk-overview/), and verify that the traffic types you use are defined in your organization.