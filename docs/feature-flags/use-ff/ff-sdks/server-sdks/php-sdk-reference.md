---
title: PHP SDK reference
description: This topic describes how to use the Harness Feature Flags PHP SDK for your PHP application. For getting started quickly, you can use our sample code from the PHP SDK README. You can also clone and ru…
sidebar_position: 60
helpdocs_topic_id: 3qrik15pkz
helpdocs_category_id: kkiqy1f6d7
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/server-sdks/php-sdk-reference
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpno />

This topic describes how to use the Harness Feature Flags PHP SDK for your PHP application.

For getting started quickly, you can use our [sample code from the PHP SDK README](https://github.com/harness/ff-php-client-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [PHP SDK GitHub Repository.](https://github.com/harness/ff-php-client-sdk)

Important: The PHP SDK Github repository was previously known as `ff-php-server-sdk` it has since been renamed to `ff-php-client-sdk`. This is to make it clearer that the SDK requires a client SDK key.
The published package is still named `ff-server-sdk` this will change in a future release.


## Before You Begin

Make sure you've read and understood:

* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Client-Side and Server-Side SDKs](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-php-client-sdk/releases)

## Requirements

To use this SDK, make sure you:  

* Install [PHP](https://www.php.net/) version 7.4 or newer
* Install [Composer](https://getcomposer.org/)
* [Download the SDK from our GitHub repository](https://github.com/harness/ff-php-client-sdk)
* Create a PHP application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-php-server-sample).
* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key)

## Install the SDK

Use Composer to install the SDK as a dependency in your application, for example: 


```
composer require harness/ff-server-sdk
```
##  Initialize the SDK

To initialize the PHP SDK, you need to:

1. Add your Client SDK key to connect to your Harness Environment.
2. Add a Target that you want to Evaluate against a Feature Flag.
3. (Optional) Configure the SDK.
4. Complete the initialization using the Client SDK Key, Target, and any Configuration parameters you set.

### Add the Client SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Client SDK Key from that Environment. 

Input the Client SDK Key into the `SDK_KEY` parameter, for example:


```
$SDK_KEY = getenv("SDK_KEY") ?: "";
```
### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.
</details>

For more information about Targets, go to [Targeting Users With Flags](/docs/feature-flags/use-ff/ff-target-management/targeting-users-with-flags).


To add a Target, build it and pass in arguments for the following:



|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| `identifier` | Unique ID for the Target.Read Regex requirements for Target names and identifiers below for accepted characters. | Required | `"identifier" => "HT_1"` |
| `name` | Name for this Target. This does not have to be unique. Note: If you don’t provide a value, the name will be the same as the identifier.Read Regex requirements for Target names and identifiers below for accepted characters. | Optional**Note**: If you don't want to send a name, don't send the parameter. Sending an empty argument will cause an error. | `“name" => "Harness_Target_1",` |
| `attributes` | Additional data you can store for a Target, such as email addresses or location. | Optional | `“attributes" =>    [“email” => “sample@sample.com”]` |

 
<details>
<summary> Regex requirements for Target names and identifiers </summary>

**Identifier** 

Regex: `^[A-Za-z0-9.@_-]*$`  
Must consist of only alphabetical characters, numbers, and the following symbols:  
. (period)  
@ (at sign)  
-(dash)  
\_ (underscore)  
  
The characters can be lowercase or uppercase but cannot include accented letters, for example `Cafe_789`.  
  
**Name**
Regex: `^[\\p{L}\\d .@_-]*$`  
  
Must consist of only alphabetical characters, numbers, and the following symbols:  
. (period)  
@ (at sign)  
-(dash)  
\_ (underscore)  
 (space)  
  
The characters can be lowercase or uppercase and can include accented letters, for example `Café_123`.

</details>

### Configure the SDK

When initializing the SDK, you also have the option of providing alternative configuration by passing in the configuration options to the `cfClient`. 

You can configure the following base features of the SDK:



|  |  |  |
| --- | --- | --- |
| **Name** | **Description** | **Default Value** |
| base_url | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: `http://localhost:7000` | No default, provide your own value. |
| events_url | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000` | No default, provide your own value. |
| expireAfter | The amount of time in seconds that data is removed from the cache. | `60` (seconds) |
| metricsEnabled | Set to `true` to enable analytics.Set to `false` to disable analytics.**Note**: When enabled, analytics data is posted every 60 seconds. | `true` |

 

For example:


```
$cfClient = new Client($SDK_KEY, new Target(["name" => "harness", "identifier" => "harness"]), [  
    "base_url" => "http://ff-proxy:7000",  
    "events_url" => "http://ff-proxy:7000",  
    “metricsEnabled” => “false”,
]); 
```
### Complete the Initialization

To complete the initialization, create an instance of the `Client` and pass in the `SDK_Key` and `Target`, for example: 


```
$client = new Client($SDK_KEY, new Target(["name" => "harness", "identifier" => "harness"]));
```
### Sample of Initializing the SDK


```
$SDK_KEY = getenv("SDK_KEY") ?: "";  // you can put your SDK key inside the env variable, or you can provide in the code  
$FLAG_NAME = "harnessappdemodarkmode";  
$client = new Client($SDK_KEY, new Target(["name" => "harness", "identifier" => "harness"]));
```
## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The default Variation

For example:


```
$result = $client->evaluate($FLAG_NAME, false);
```
## Test Your App is Connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

<Sixty />

## Close the SDK client

<Closeclient />

## Sample Code for a PHP Application

Here is a sample code for integrating with the PHP SDK: 


```
<?php   
  
require_once realpath("vendor/autoload.php");   
  
use Harness\Client;  
use OpenAPI\Client\Model\Target;  
  
$SDK_KEY = getenv("SDK_KEY") ?: "";  // you can put your key in env variable or you can provide in the code  
$FLAG_NAME = "harnessappdemodarkmode";  
  
$client = new Client($SDK_KEY, new Target(["name" => "Harness_Target_1", "identifier" => "HT_1"]));  
$result = $client->evaluate($FLAG_NAME, false);  
  
echo "Evaluation value for flag '".$FLAG_NAME."' with target 'harness': ".json_encode($result);
```
