---
title: Elixir Thin Client SDK
sidebar_label: Elixir Thin Client SDK
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/26988707417869-Elixir-Thin-Client-SDK </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Elixir Thin SDK. All of our SDKs are open source. Go to our [Elixir Thin SDK GitHub repository](https://github.com/splitio/elixir-thin-client) to learn more.

## Language support

The Elixir Thin SDK supports Elixir language version v1.14.0 and later.

## Architecture

The Elixir Thin SDK depends on the [Split Daemon (splitd)](https://help.split.io/hc/en-us/articles/18305269686157) which should be set up on the same host. The Elixir Thin SDK factory client uses splitd to maintain the local cached copy of the FME definitions and return feature flag evaluations.

## Initialization

### 1. Install the SDK into your project

The package can be installed by adding `split_thin_sdk` to your list of dependencies in `mix.exs`:

<Tabs>
<TabItem value="mix.exs">
```elixir
def deps do
  [
    {:split, "~> 1.0.0", hex: :split_thin_sdk}
  ]
end
```
</TabItem>
</Tabs>

The public release of the Elixir Thin SDK is available at [hex.pm](https://hex.pm/packages/split_thin_sdk), and API Reference is available at [hexdocs.pm](https://hexdocs.pm/split_thin_sdk/).

### 2. Set up the splitd service

Follow the guidance of our [Split Daemon (splitd)](https://help.split.io/hc/en-us/articles/18305269686157) doc to integrate splitd into your application infrastructure.

:::warning[Supported link type]
The Elixir Thin SDK requires the Splitd daemon to be running with link type `unix-stream`. Update the `splitd.yaml` configuration file to include the following:

```yaml
link:
    type: unix-stream
```
:::

### 3. Start the SDK

To start the Elixir Thin SDK, you need to start its supervisor, either in your Application's supervision tree, as a supervised child, or start it manually as an independent supervisor.

<Tabs>
<TabItem value="Supervised Child">
```elixir
defmodule MyApp.Application do
  use Application

  def start(_type, _args) do
    children = [
      {Split, address: "/var/run/split.sock"}
      ## other supervised children ...
    ]

    opts = [strategy: :one_for_one, name: MyApp.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
```
</TabItem>
<TabItem value="Independent Supervisor">
```elixir
defmodule MyApp.Application do
  use Application

  def start(_type, _args) do
    Split.Supervisor.start_link(address: "/var/run/splitd.sock")

    children = [
      ## supervised children ...
    ]

    opts = [strategy: :one_for_one, name: MyApp.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
```
</TabItem>
</Tabs>

## Using the SDK
 
### Basic use

After you start the SDK, you can use the `Split.get_treatment/3` function to decide what version of your features your customers are served. The function requires the `FEATURE_FLAG_NAME` argument that you want to ask for a treatment and a unique `key` argument that corresponds to the end user that you want to serve the feature to.

From there, you simply need to use an if-else-if or case statement block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

```elixir title="Elixir"
## The key here represents the string ID of the user/account/etc you're trying to evaluate a treatment for
treatment = Split.get_treatment(key, feature_flag_name)
case treatment do
  "on" ->
    ## Feature flag is enabled for this user
  "off" ->
    ## Feature flag is disabled for this user
  _ ->
    ## "control" treatment. For example, when feature flag is not found or Elixir SDK wasn't able to connect to Splitd
end
```

### Attribute syntax 

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the SDK's `get_treatment` function needs to pass an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `get_treatment` call in a map. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `get_treatment` function supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are: 

* **Strings:** Use type String.
* **Numbers:** Use type Integer.
* **Dates:** Express the value in `seconds since epoch`. Use a timestamp represented by an Integer. 
* **Booleans:** Use type Boolean.
* **Sets:** Use type List. 
 
```elixir title="Elixir"
attributes = %{
  "plan_type" => "growth",
  "registered_date" => DateTime.to_unix(~U[2019-10-31 19:59:03Z], :second),
  "deal_size" => 10000,
  "paying_customer" => true,
  "permissions" => ["gold", "silver", "platinum"]
};

treatment = Split.get_treatment("key", "FEATURE_FLAG_NAME", attributes);
```

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `get_treatments` from the SDK factory client to do this.
* `get_treatments`: Pass a list of the feature flag names you want treatments for.
* `get_treatments_by_flag_set`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `get_treatments_by_flag_sets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

<Tabs>
<TabItem value="get_treatments">
```elixir
treatments = Split.get_treatments("key", ["FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2"], nil);

IO.inspect(treatments);
```
</TabItem>
<TabItem value="get_treatments_by_flag_set">
```elixir
treatments = Split.get_treatments_by_flag_set("key", "backend", nil);

IO.inspect(treatments);
```
</TabItem>
<TabItem value="get_treatments_by_flag_sets">
```elixir
treatments = Split.get_treatments_by_flag_sets("key", ["backend", "server_side"], nil);

IO.inspect(treatments);
```
</TabItem>
</Tabs>

You can also use the [Split Manager](#manager) to get all of your treatments at once.

### Get Treatments with Configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), you should use the `Split.get_treatment_with_config/3` function. This function returns an `Split.TreatmentWithConfig` struct containing the treatment and associated configuration.

The config element is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the SDK returns `nil` for the config parameter.

This function takes the exact same set of arguments as the standard `Split.get_treatment/3` function. See below for examples on proper usage:

```elixir title="Elixir"
treatment_with_config = Split.get_treatment_with_config("KEY", "FEATURE_FLAG_NAME", attributes);

%Split.TreatmentWithConfig{ treatment: treatment_value, config: config_json } = treatment_with_config;

{:ok, config_map } = Jason.decode(config_json);
```

If you need to get multiple evaluations at once, you can also use the `Split.get_treatments_with_config/3` function. This function takes the exact same arguments as the [`get_treatments`](#multiple-evaluations-at-once) functions but return a map of feature flag names to `Split.TreatmentWithConfig` structs instead of strings. See example usage below:

```elixir title="Elixir"
treatments_with_config = Split.get_treatments_with_config("KEY", ["FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2"], attributes);
## treatments_with_config will have the following form: 
## %{
##   "FEATURE_FLAG_NAME_1" => %Split.TreatmentWithConfig{treatment: "on", config: ~s({ "color": "red"})},
##   "FEATURE_FLAG_NAME_2" => %Split.TreatmentWithConfig{treatment: "v2", config: ~s({ "copy" : "better copy"})},
## }
```

### Shutdown

Due to the nature of the Elixir SDK, which uses the Split Daemon, there is no need to invoke any shutdown tasks. The data is stored and synchronized by the Split Daemon.

## Track 

Use the `Split.track/5` function to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to  and allows you to measure the impact of your feature flags on your users’ actions and metrics.

Refer to the [Events](https://help.split.io/hc/en-us/articles/360020585772) documentation for more information about using track events in feature flags.

In the examples below you can see that the `Split.track/5` function can take up to five arguments. The proper data type and syntax for each are:

* **key:** The `key` variable used in the `get_treatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined in Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value:<br />`[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as `nil` or `0` if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) A Map of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` function returns a boolean value of `true` or `false` to indicate whether or not the event was successfully queued to be sent back to Harness servers on the next event post. The SDK will return `false` if it wasn't able to connect to the Split Daemon, or if the current queue on the Split Daemon is full, or if an incorrect input to the `track` function has been provided.

In the case that a bad input has been provided, you can read more about our SDK's expected behavior in the [Events documentation](https://help.split.io/hc/en-us/articles/360020585772-Track-events)

```elixir title="Elixir"
// If you would like to send an event without a value
tracked? = Split.track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE");
// Example
tracked? = Split.track("john@doe.com", "user", "page_load_time");

// If you would like to associate a value to an event
tracked? = Split.track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE);
// Example
tracked? = Split.track("john@doe.com", "user", "page_load_time", 83.334);

// If you would like to associate just properties to an event
tracked? = Split.track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", nil, PROPERTIES);

// If you would like to associate a value and properties to an event
tracked? = Split.track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, PROPERTIES);
// Example
properties = %{
  "package" => "premium",
  "admin" => true,
  "discount" => 50
}
tracked? = Split.track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", 83.334, properties);
```

## Configuration

The SDK takes a number of keyword arguments as options when the supervisor is started. The following options are available:

- `:address`: **OPTIONAL** The path to the Splitd socket file. Default is `"/var/run/splitd.sock"`.
- `:pool_size`: **OPTIONAL** The size of the pool of connections to the Splitd daemon. Default is the number of online schedulers in the [Erlang VM](https://www.erlang.org/doc/apps/erts/erl_cmd.html).
- `:connect_timeout`: **OPTIONAL** The timeout in milliseconds to connect to the splitd daemon. Default is `1000`.

```elixir title="Elixir"
opts = [
  address: "/var/run/splitd.sock",
  pool_size: 1,
  connect_timeout: 1000
];
 
Split.Supervisor.start_link(opts);
```

## Manager
 
Use the SDK Manager functions to get a list of available feature flags.

You can access these functions through the `Split` module, as explained below:

```elixir title="Manager functions"
## Retrieves the names of feature flags that are currently registered with the SDK
list_of_feature_flag_names = Split.split_names();
## Example
## list_of_feature_flag_names = ["FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2"];

## Returns the feature flag view for a given feature flag name
feature_flag_view = Split.split("FEATURE_FLAG_NAME");
## Example
## feature_flag_view = %Split.SplitView{ name: "FEATURE_FLAG_NAME", ... };

## Retrieves the views of feature flags that are currently registered with the SDK.
list_of_feature_flag_views = Split.splits();
## Example
## list_of_feature_flag_views = [%Split.SplitView{ name: "FEATURE_FLAG_NAME_1", ... }, %Split.SplitView{ name: "FEATURE_FLAG_NAME_2", ... }];
```

The `Split.SplitView` struct referenced above has the following structure:

```elixir title="SplitView struct"
@type t :: %Split.SplitView{
  name: String.t(),
  traffic_type: String.t(),
  killed: boolean(),
  treatments: [String.t()],
  change_number: integer(),
  configs: %{String.t() => String.t() | nil},
  default_treatment: String.t(),
  sets: [String.t()],
  impressions_disabled: boolean()
}
```

<!-- @TODO Add '## Listener' section when feature is implemented  -->

<!-- @TODO Add '## Logging' section when feature is implemented  -->

## Example app

* [Elixir app example](https://github.com/splitio/example-elixir)
