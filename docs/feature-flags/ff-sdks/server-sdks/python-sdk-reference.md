---
title: Python SDK reference
description: This topic explains how to use the Harness Feature Flags SDK in your Python application.
sidebar_position: 70
helpdocs_topic_id: hwoxb6x2oe
helpdocs_category_id: kkiqy1f6d7
helpdocs_is_private: false
helpdocs_is_published: true
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'

<Smpno />

This topic describes how to use the Harness Feature Flags Java SDK for your Java application.

For getting started quickly, you can use our [sample code from the Python SDK README](https://github.com/harness/ff-python-server-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [Python SDK GitHub Repository.](https://github.com/harness/ff-python-server-sdk)

## Before You Begin

You should read and understand the following:

* [Feature Flags Overview](../../ff-onboarding/cf-feature-flag-overview.md)
* [Getting Started with Feature Flags](/docs/feature-flags/ff-onboarding/getting-started-with-feature-flags)
* [Client-Side and Server-Side SDKs](../sdk-overview/client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../sdk-overview/communication-sdks-harness-feature-flags.md)

## Version

The current version of this SDK is **1.2.2**.

## Requirements

To use this SDK, make sure you:  

* Install [Python 3.7](https://www.python.org/downloads/) or newer
* Install [pip](https://packaging.python.org/en/latest/tutorials/installing-packages/#id12)
* [Download the SDK from our GitHub repository](https://github.com/harness/ff-python-server-sdk)
* Create a Java application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-python-server-sdk).
* [Create a Feature Flag on the Harness Platform](/docs/feature-flags/ff-creating-flag/create-a-feature-flag). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`
* [Create an SDK key and make a copy of it](/docs/feature-flags/ff-creating-flag/create-a-project#create-an-sdk-key)

## Install the SDK

Install the python SDK using pip


```
python -m pip install harness-featureflags
```
## Initialize the SDK

To initialize the Python SDK, you need to:

1. Add your Server SDK Key to connect to your Harness Environment.
2. Add a Target that you want to Evaluate against a Feature Flag.
3. (Optional) Configure the SDK options. For more details on what features you can configure for this SDK, go to [Configure the SDK](python-sdk-reference.md#configure-the-sdk).

:::info note
If the SDK fails to authenticate with the Feature Flags service and cannot initialise, the SDK will operate in a "limited" mode and will only serve the default values you provide in variation calls.
:::

### Add the Server SDK Key

To connect to the correct Environment that you set up on the Harness Platform, you need to add the Server SDK Key from that Environment. Input the Server SDK Key into the `api_key` parameter. For example:


```
"""  
Put the API Key here from your environment  
"""  
api_key = "YOUR_API_KEY";  
  
cf = CfClient(api_key);
```
### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.  
  </details>

For more information about Targets, go to [Targeting Users With Flags](/docs/feature-flags/ff-target-management/targeting-users-with-flags).

To add a Target, build it and pass in arguments for the following:



|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| `identifier` | Unique ID for the Target.Read **Regex requirements for Target names and identifiers** below for accepted characters. | Required | `identifier='HT_1'` |
| `name` | Name for this Target. This does not have to be unique. **Note**: If you don’t provide a value, the name will be the same as the identifier.Read **Regex requirements for Target names and identifiers** below for accepted characters. | Optional**Note**: If you don't want to send a name, don't send the parameter. Sending an empty argument will cause an error. | `name="Harness_Target_1"` |
| `attributes` | Additional data you can store for a Target, such as email addresses or location. | Optional | `attributes={"email": "demo@harness.io"}` |

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

For example:


```
 target = Target(identifier='HT_1', name="Harness_Target_1", attributes={"email": "demo@harness.io"})
```
### Configure the SDK

You can configure the following features of the SDK:



|                  |                                                           |                                                                                                                                          |                                        |
|------------------|-----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| **Name**         | **Example**                                               | **Description**                                                                                                                          | **Default Value**                      |
| **baseUrl**          | `with_base_url("https://config.ff.harness.io/api/1.0")`   | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: `http://localhost:7000`                      | `https://config.ff.harness.io/api/1.0` |
| **eventUrl**         | `with_events_url("https://events.ff.harness.io/api/1.0")` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000`        | `https://events.ff.harness.io/api/1.0` |
| **pollInterval**     | `Config(pull_interval=60)`                                | The interval **in seconds** that we poll for changes when you are using stream mode.                                                     | `60` (seconds)                         |
| **streamEnabled**    | `with_stream_enabled(True)`                               | Set to ``True`` to enable streaming mode. Set to `False` to disable streaming mode.                                                       | `True`                                 |
| **analyticsEnabled** | `with_analytics_enabled(True)`                            | Set to `True` to enable analytics. Set to `False` to disable analytics. <br />**Note**: When enabled, analytics data is posted every 60 seconds. | `True`                                 |
| **maxAuthRetries**   | with_max_auth_retries(10)                                 | The number of retry attempts to make if client authentication fails on a retryable HTTP error                                            | 10                                     |


For example:


```
# Create a Feature Flag Client  
    client = CfClient(apiKey,  
                      with_base_url("https://config.ff.harness.io/api/1.0"),  
                      with_events_url("https://events.ff.harness.io/api/1.0"),  
                      with_stream_enabled(True),  
                      with_analytics_enabled(True),  
                      Config(pull_interval=60))
```
## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide.

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned, and an error is logged.

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The Target object you want to evaluate against
* The default Variation

For example:

### Evaluate a boolean Variation


```
result = cf.bool_variation("identifier_of_your_bool_flag", target, False);  
```
### Evaluate a string Variation


```
result = client.string_variation('identifier_of_your_string_flag', target, "")
```
### Evaluate a number Variation


```
result = client.number_variation('identifier_of_your_number_flag', target, -1)
```
### Evaluate a JSON Variation


```
client.json_variation('identifier_of_your_json_flag', target, {})
```
## Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

<Sixty />

## Close the SDK Client

<Closeclient />

To close the SDK client:

* Assuming you have initialized an SDK client instance named `client`, call the following function:

    ```
    client.close()
    ```

## Additional options

### Configure your logger

The SDK provides a logger that wraps the standard Python logging package. You can import and use it with the following:


```
from featureflags.util import log  
log.info("Hello, World!")
```
To change the default log level, you can use the standard logging levels


```
from featureflags.util import log  
import logging  
  
log.setLevel(logging.WARN)
```
### Use the Relay Proxy

When using your Feature Flag SDKs with a [Harness Relay Proxy](/docs/feature-flags/relay-proxy/) you need to change the default URL and events URL to `http://localhost:7000` when initializing the SDK. To do this:

1. Import the URL helper functions, for example:
```
from featureflags.config import with_base_url  
from featureflags.config import with_events_url
```
2. Pass the new URLs in when initializing the SDK, for example:
```
    client = CfClient(api_key,  
                      with_base_url("https://config.feature-flags.uat.harness.io/api/1.0"),  
                      with_events_url("https://event.feature-flags.uat.harness.io/api/1.0"))
```

## Sample code for a Python application

Here is a sample code for integrating with the Python SDK:


```
import time  
  
from featureflags.evaluations.auth_target import Target  
from featureflags.client import CfClient  
from featureflags.util import log  
from featureflags.config import with_base_url  
from featureflags.config import with_events_url  
  
  
def main():  
    log.debug("Starting example")  
    api_key = "Your API key"  
    client = CfClient(api_key,  
                      with_base_url("https://config.ff.harness.io/api/1.0"),  
                      with_events_url("https://events.ff.harness.io/api/1.0"))  
  
    target = Target(identifier='HT_1', name="Harness_Target_1", attributes={"location": "emea"})
  
    while True:  
        result = client.bool_variation('harnessappdemodarkmode', target, False)  
        log.debug("Result %s", result)  
        time.sleep(10)  
  
if __name__ == "__main__":  
    main()
```

## Troubleshooting 
The SDK logs the following codes for certain lifecycle events, for example authentication, which can aid troubleshooting.

| **Code** | **Description**                                                                          |
|----------|:-----------------------------------------------------------------------------------------|
| **1000** | Successfully initialized                                                                 |
| **1001** | Failed to initialize due to authentication error                                         |
| **1002** | Failed to initialize due to a missing or empty API key                                   |
| **1003** | `wait_for_initialzation` was called and the SDK is waiting for initialzation to complete |
| **2000** | Successfully authenticated                                                               |
| **2001** | Authentication failed with a non recoverable error                                       |
| **2002** | Authentication failed and is retrying                                                    |
| **2003** | Authentication failed and max retries have been exceeded                                 |
| **3000** | SDK Closing                                                                              |
| **3001** | SDK closed successfully                                                                  |
| **4000** | Polling service started                                                                  |
| **4001** | Polling service stopped                                                                  |
| **5000** | Streaming service started                                                                |
| **5001** | Streaming service stopped                                                                |
| **5002** | Streaming event received                                                                 |
| **5003** | Streaming disconnected and is retrying to connect                                        |
| **5004** | Streaming stopped                                                                        |
| **5005** | Stream is still retrying to connect after 4 attempts                                     |
| **6000** | Evaluation was successfully                                                              |
| **6001** | Evaluation failed and the default value was returned                                     |
| **7000** | Metrics service has started                                                              |
| **7001** | Metrics service has stopped                                                              |
| **7002** | Metrics posting failed                                                                   |
| **7003** | Metrics posting success                                                                  |
| **7004** | Metrics max target size exceeded                                                         |
| **7005** | Metrics batch targets sending success                                                    |
| **7006** | Metrics batch targets sending failed                                                     |

