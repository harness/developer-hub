---
title: Erlang SDK Reference
description: This topic describes how to use the Harness Feature Flags Erlang SDK. For getting started quickly, you can use our sample code from the Erlang SDK README.
sidebar_position: 15
---

This topic describes how to use the Harness Feature Flags Erlang SDK for your Erlang application.

For getting started quickly, you can use our sample code from the Erlang SDK [README](https://github.com/harness/ff-erlang-server-sdk#readme).

## Before you begin

Make sure you read and understand:

* [Feature Flags Overview](/docs/feature-flags/ff-onboarding/cf-feature-flag-overview)
* [Getting Started with Feature Flags](/docs/feature-flags/ff-onboarding/ff-getting-started/getting-started-with-feature-flags)
* [Client-Side and Server-Side SDKs](/docs/feature-flags/ff-sdks/sdk-overview/client-side-and-server-side-sdks)
* [Communication Strategy Between SDKs and Harness Feature Flags](/docs/feature-flags/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags)

## Version

The current version of this SDK is **1.0.0**. 

## Requirements

To use this SDK, make sure you:

* Install Erlang/OTP 24 or later
* Install Rebar3
* Download the SDK from our GitHub repository
* Create an Erlang application, or clone our sample application.
* Create a Feature Flag on the Harness Platform. If you are following along with the SDK README sample code, make sure your flag is called harnessappdemodarkmode.
* Create an SDK key and make a copy of it

## Install the SDK

### Install using rebar3

Add the SDK as a dependency to your `rebar.config` file:

```
{deps, [{ffclient, {git, "https://github.com/harness/ff-erlang-server-sdk", {tag, "0.4.0-beta.2"}}}]}.
```

### Install using mix

Add the SDK to your `mix.exs` file:

```
  defp deps do
    [
      {:ffcfclient, git: "https://github.com/harness/ff-erlang-server-sdk", tag: "0.4.0-beta.2"}
    ]
```

## Initialize the SDK

To initialize the Erlang SDK:

1. Add your Server SDK key to connect to your Harness Environment.
1. Add a Target that you want to Evaluate against a Feature Flag.
1. (Optional) Configure the SDK.
1. Complete the initialization with the SDK using the Server SDK Key, Target, and Configuration parameters you set.

### Add the Server SDK Key

To connect to the correct Environment that you set up on the Harness Platform, add the Server SDK Key from that Environment. Input the Server SDK Key into the `sdkKey` parameter, for example:

```
  case ffclient:start(“sdkkey”) of
    ok ->
      ok
    {not_ok, Error} ->
      {Not_ok, Error}
  end.
```

### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.  
  </details>

For more information about Targets, go to [Target Users With Flags](/docs/feature-flags/ff-using-flags/ff-target-management/targeting-users-with-flags).

To create a Target, create a map and add the following keys:

| Parameter | Description | Required? | Example |
|-----------|-------------|-----------|---------|
| **Identifier** | Unique ID for the Target<br /><br />**Key:** atom<br />**Value:** bitstring | Required | `identifier => <<"HT_1">>` |
| **Name** | Name for this Target. This does not have to be unique. **Note:** If you don’t provide a value, Harness uses the ID as the name. | Optional | `name => <<"Harness_Target_1">>` |
| **Attributes** | Additional data you can store for a Target, such as email addresses or location.<br /><br />**Key:** atom<br />**Value:** bitstring/atom. If using a list then each element must be a bitstring/atom. Go to the Harness [Erlang SDK github repository](https://github.com/harness/ff-erlang-server-sdk#targets-with-custom-attributes) for more information. | Optional | `%% Bitstring`<br />`attributes => #{beta => <<"beta_group_1">>}`<br /><br />`%% Atom`<br />`attributes => #{alpha => 'alpha_group_1'}`<br /><br />`%% List`<br />`attributes => #{beta => [<<"beta_group_1">>, 'beta_group_2'}]}` |

### Configure the SDK

When initializing the SDK, you also have the option of providing alternative configuration by using the Client map. Note: keys should be atoms and values should be strings.

You can configure the following base features of the SDK:

| Name | Example | Description | Default value |
|------|---------|-------------|---------------|
| **ConfigURL** | `config_url =>` <br />`"https://config.ff.harness.io/api/1.0"` | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: <br />`http://localhost:7000` | `https://config.ff.harness.io/api/1.0` |
| **EventUrl** | `events_url =>` <br />`"https://events.ff.harness.io/api/1.0"` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: <br />`http://localhost:7000` | `https://events.ff.harness.io/api/1.0` |
| **PollingInterval** | `poll_interval => 60000` | The interval in seconds that we poll for changes when you are using stream mode. | `60` (seconds) |
| **StreamEnabled** | Not available in Beta | Set to true to enable streaming mode. Set to false to disable streaming mode. | `true` |
| **AnalyticsEnabled** | `analytics_enabled => true` | Set to true to enable analytics. Set to false to disable analytics. <br />**Note:** When enabled, analytics data is posted every 60 seconds. | `true` |

For example:
``` 
ffclient:start("sdkkey", 
  #{
    config_url => "https://config.ff.harness.io/api/1.0",
    events_url => "https://events.ff.harness.io/api/1.0",
    polling_interval => 60000,
    analytics_enabled => true
    }
)
```

### Complete the initialization 

To complete the initialization, create an instance of the Erlang SDK Client and pass in the sdkKey and any optional configuration options.

## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:
* Identifier of the Flag you want to evaluate
* The Target object you want to evaluate against
* The default Variation

Here are examples of evaluating different types of Variations:

* **Boolean Variation**

  ```
  ffclient:bool_variation(FlagIdentifier, Target, false)
  ```

* **Number Variation:** 

  ```
  ffclient:number_variation(FlagIdentifier, Target, -1).
  ```

* **String Variation:**

  ```
  ffclient:string_variation(FlagIdentifier, Target, "default_string").
  ```

* **JSON Variation:**

  ```
  ffclient:json_variation(FlagIdentifier, Target, #{dark_mode => <<”false”>>}).
  ```

## Listen for events

This method provides a way to listen to the different events that might be triggered by the SDK, indicating a specific change in the SDK.

*TBA -- Is this specific to the type of SDK?*

## Test your app is connected Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

## Close the SDK

To help prevent memory leaks, we recommend closing the SDK when it’s not in use. To do this, run the following command: 

```
ffclient:stop().
```

## Additional options

*Are there any other options specific to Erlang?*

### Develop on your local environment

By default, you are connected to the Harness environment but you can use a local connector to develop in your local environment, for example:

*Add example*

### Configure your logger

*Add example*


### Use the Relay Proxy

When using your Feature Flag SDKs with a [Harness Relay Proxy](/docs/feature-flags/ff-using-flags/relay-proxy/) you need to change the default URL and events URL to `http://localhost:7000` when initializing the SDK. To do this:

1. Import the URL helper functions, for example:

  ```
  from featureflags.config import with_base_url  
  from featureflags.config import with_events_url
  ```
1. Pass the new URLs in when initializing the SDK, for example:

  ```
  client = CfClient(api_key,  
                    with_base_url("https://config.feature-flags.uat.harness.io/api/1.0"),  
                    with_events_url("https://event.feature-flags.uat.harness.io/api/1.0"))
  ```

## Sample code for an Erlang application

```
-module(getting_started).
%% API
-export([start/0]).


start(SDKKey) ->
  logger:set_primary_config(level, info),
  case ffcfclient:start("sdkkey", #{
      config_url => "https://config.ff.harness.io/api/1.0",
      events_url => "https://events.ff.harness.io/api/1.0",
      polling_interval => 60000,
      analytics_enabled => true})
 of
    ok ->
      logger:info("Erlang SDK Successfully Started"),
      get_flag_loop();
    {not_ok, Error} ->
      logger:error("Error when starting Erlang SDK: ~p~n", [Error]),
      not_ok
  end.


get_flag_loop() ->
  Target = #{identifier => "Harness_Target_1",
    name => "HT_1",
    %% Attribute keys must be atoms. 
    %% Values must be either bitstrings, atoms, or a list of bitstrings/atoms - see Targets with custom attributes section below.
    attributes => #{email => <<"demo@harness.io">>}
  },
  FlagIdentifier = "harnessappdemodarkmode",
  Result = ffcfclient:bool_variation(FlagIdentifier, Target, false),
  logger:info("Varaion for Flag ~p witih Target ~p is: ~p~n", [FlagIdentifier, maps:get(identifier, Target), Result]),
  timer:sleep(10000),
  get_flag_loop().

```

































