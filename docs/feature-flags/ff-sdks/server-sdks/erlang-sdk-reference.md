---
title: Erlang SDK Reference
description: This topic describes how to use the Harness Feature Flags Erlang SDK. For getting started quickly, you can use our sample code from the Erlang SDK README.
sidebar_position: 15
---

This topic describes how to use the Harness Feature Flags Erlang SDK for your Erlang or Elixir based application. 

For getting started quickly:

1. If your application is Erlang based you can use the provided [sample code](#Sample Code for Erlang Applications).
2. If your application is ELixir based you can clone our sample Elixir application from the following GitHub repository: https://github.com/harness/ff-elixir-server-sample

## Before you begin

Make sure you read and understand:

* [Feature Flags Overview](/docs/feature-flags/ff-onboarding/cf-feature-flag-overview)
* [Getting Started with Feature Flags](/docs/feature-flags/ff-onboarding/ff-getting-started/getting-started-with-feature-flags)
* [Client-Side and Server-Side SDKs](/docs/feature-flags/ff-sdks/sdk-overview/client-side-and-server-side-sdks)
* [Communication Strategy Between SDKs and Harness Feature Flags](/docs/feature-flags/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags)

## Version

The current version of this SDK is **1.0.0**. 

## Requirements

To use this SDK for Erlang applications, make sure you've:

* Installed Erlang/OTP 24 or later
* Installed Rebar3

To use this SDK for Elixir applications, make sure you've:

* Installed Elixir version 1.11.4 or later

To follow along with our test code sample, make sure you’ve:

* Created a Feature Flag on the Harness Platform called harnessappdemodarkmode
* Created a server SDK key and made a copy of it


### Install the SDK for Erlang based applications

Add the SDK as a dependency to your `rebar.config` file:

```
{deps, [{cfclient, {git, "https://github.com/harness/ff-erlang-server-sdk", {tag, "1.0.0"}}}]}.
```

Add the dependency to your project's `app.src`.
```erlang
{applications,
  [kernel, stdlib, cfclient]
},
```

### Install the SDK for Elixir based applications

Add the SDK as a dependency to `mix.exs` `deps()`:

```
  defp deps do
    [
        {:cfclient, github: "harness/ff-erlang-server-sdk", tag: "1.0.0"}
    ]
```

## Initialize the SDK

To initialize the Erlang SDK:

1. Add your Server SDK key to connect to your Harness Environment.
1. Add a Target that you want to Evaluate against a Feature Flag.
1. (Optional) Configure the SDK.
1. Complete the initialization with the SDK using the Server SDK Key, Target, and Configuration parameters you set.

### Add the Server SDK Key for Erlang based applications

To connect to the correct Environment that you set up on the Harness Platform, add the Server SDK Key from that Environment. 
Input the Server SDK Key into the `api_key` tuple, for example:

Provide your API key in `config/sys.config` using an environment variable:

```erlang
[
  {cfclient, [
    {api_key, {environment_variable, "YOUR_API_KEY_ENV_VARIABLE"},
  ]}
].
```

Or you may provide the API key directly if required:

```erlang
[
  {cfclient, [
      {api_key, "YOUR_API_KEY"},
  ]}
].
```

### Add the Server SDK Key for Elixir based applications

To connect to the correct Environment that you set up on the Harness Platform, add the Server SDK Key from that Environment.
Input the Server SDK Key into the `api_key` key, for example:

Provide your API key in `config/config.exs` using an environment variable:

```elixir
config :cfclient,
  api_key: System.get_env("YOUR_API_KEY_ENVIRONMENT_VARIABLE")
```

Or you may provide the API key directly if required:

```elixir
config :cfclient,
  api_key: "YOUR_API_KEY"
```

### Add a Target for Erlang and Elixir based applications

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.  
  </details>

For more information about Targets, go to [Target Users With Flags](/docs/feature-flags/ff-using-flags/ff-target-management/targeting-users-with-flags).

To create a Target, create a map and add the following keys:

| Parameter      | Description                                                                                                                                                                                                                                                                                                                                               | Required? | Example                                                                                                                                                                                                                                                                                                             |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identifier** | Unique ID for the Target<br /><br />**Key:** atom<br />**Value:** bitstring / atom / string                                                                                                                                                                                                                                                               | Required  | `identifier => <<"HT_1">>`                                                                                                                                                                                                                                                                                          |
| **Name**       | Name for this Target. This does not have to be unique. **Note:** If you don’t provide a value, Harness uses the ID as the name. <br/> Value: bitstring / atom / string                                                                                                                                                                                    | Optional  | `name => <<"Harness_Target_1">>`                                                                                                                                                                                                                                                                                    |
| **Attributes** | Additional data you can store for a Target, such as email addresses or location.<br /><br />**Key:** atom<br />**Value:** bitstring / atom / list of bitstrings or atom * lists of strings not supported * <br/> See [Erlang SDK GitHub Repository](https://github.com/harness/ff-erlang-server-sdk#targets-with-custom-attributes) for more information. | Optional  | `%% Bitstring`<br />`attributes => #{beta => <<"beta_group_1">>}`<br /><br />`%% Atom `<br />`attributes => #{alpha => alpha_group_1}`<br/><br/>`%% Atom in Elixir syntax` <br/>`attributes => #{alpha => :alpha_group_1}`<br /><br />`%% List`<br />`attributes => #{beta => [<<"beta_group_1">>, beta_group_2}]}` |

### Configure the SDK for Erlang and Elixir based applications

When initializing the SDK, you also have the option of providing alternative configuration. 

Erlang applications should be configued using the `config/sys.config` file, for example:

```erlang
[{cfclient, [
    {api_key, {envrionment_variable, "YOUR_API_KEY_ENV_VARIABLE"},
    {config, [
        {config_url, "https://config.ff.harness.io/api/1.0"},
        {events_url, "https://config.ff.harness.io/api/1.0"},
        {poll_interval, 60},
        {analytics_enabled, true},
    ]},
    ]}]
```

Elixir applications should be configured using the `config/config.exs` file, for example:

```elixir
import Config
config :cfclient,
       [api_key: System.get_env("FF_API_KEY_0"),
       # For additional config you can pass in, see Erlang SDK docs: https://github.com/harness/ff-erlang-server-sdk/blob/main/docs/further_reading.md#further-reading
       # we are just using the main config url here as an example.
        config: [
          config_url: "https://config.ff.harness.io/api/1.0",
          events_url: "https://events.ff.harness.io/api/1.0",
          poll_interval: 60000,
          analytics_enabled: true
        ]]
```

You can configure the following base features of the SDK:

| Name                 | Erlang Example                                         | Elixir Example                                       | Description                                                                                                                                  | Default value                          |
|----------------------|--------------------------------------------------------|:-----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| **ConfigURL**        | `{config_url, "https://config.ff.harness.io/api/1.0"}` | `config_url: "https://config.ff.harness.io/api/1.0"` | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: <br />`http://localhost:7000`                    | `https://config.ff.harness.io/api/1.0` |
| **EventUrl**         | `{events_url, "https://events.ff.harness.io/api/1.0"}` | `events_url: "https://events.ff.harness.io/api/1.0"` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: <br />`http://localhost:7000`      | `https://events.ff.harness.io/api/1.0` |
| **PollingInterval**  | `{poll_interval, 60000}`                               | `poll_interval: 60000`                               | The interval in seconds that we poll for changes when you are using stream mode.                                                             | `60` (seconds)                         |
| **AnalyticsEnabled** | `{analytics_enabled, true}`                            | `analytics_enabled: true`                            | Set to true to enable analytics. Set to false to disable analytics. <br />**Note:** When enabled, analytics data is posted every 60 seconds. | `true`                                 |

### Complete the initialization 

To complete the initialization, provide the `api_key` and any optional configuration options. The SDK will then boot along
with your application at run time.

## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:
* Identifier of the Flag you want to evaluate
* The Target object you want to evaluate against
* The default Variation

Here are examples of evaluating different types of Variations for Erlang and Elixir based applications:

### Examples for Erlang based applications

* **Boolean Variation**

  ```
  cfclient:bool_variation(FlagIdentifier, Target, false).
  ```

* **Number Variation:** 

  ```
  cfclient:number_variation(FlagIdentifier, Target, -1).
  ```

* **String Variation:**

  ```
  cfclient:string_variation(FlagIdentifier, Target, "default_string").
  ```

* **JSON Variation:**

  ```
  cfclient:json_variation(FlagIdentifier, Target, #{dark_mode => <<”false”>>}).
  ```

### Examples for Elixir based applications

* **Boolean Variation**

  ```
  :cfclient:bool_variation(FlagIdentifier, Target, false)
  ```

* **Number Variation:**

  ```
  :cfclient:number_variation(FlagIdentifier, Target, -1)
  ```

* **String Variation:**

  ```
  :cfclient:string_variation(FlagIdentifier, Target, "default_string")
  ```

* **JSON Variation:**

  ```
  :cfclient:json_variation(FlagIdentifier, Target, #{dark_mode => <<”false”>>})
  ```

## Test your app is connected Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. The SDK will poll for changes by default every 60 seconds, check your app after this time to verify if the Flag Variation displayed is updated with the Variation you toggled. 

## Close the SDK

To help prevent memory leaks, we recommend closing the SDK when it’s not in use. 

Erlang applications should run the following command:

```
cfclient:close().
```

Elixir applications should run the following command:

```
:cfclient:close()
```

## Additional Options

### Run multiple instances of the SDK
Normally there is a single [project](https://developer.harness.io/docs/feature-flags/ff-using-flags/ff-creating-flag/create-a-project/) per application. If different parts of your
application need to use specific projects, you can start up additional client instances using a `project_config` for each unique project.

#### Erlang Project Config
 
1. Create project configurations for each new instance you would like to start in your `config/sys.config` file:

    ```erlang
    [
      %% Project config name: This is an arbitrary identifier, but it must be unique per project config you define.
      {harness_project_1_config, [
        {cfclient, [
          {config, [
            %% Instance name: This must be unique across all of the project configs. E.g. it cannot be the same as an instance name
            %% in another project config.
            %% It will be the name you use when calling SDK API functions like `bool_variation/4`, 
            {name, instance_name_1}
          ]},
          %% The API key for the Harness project you want to use with this SDK instance.
          {api_key, {environment_variable, "PROJECT_1_API_KEY"}}]
        }
      ]
    },
      {harness_project_2_config, [
        {cfclient, [
          {config, [
            {name, instance_name_2}
          ]},
          {api_key, {environment_variable, "PROJECT_2_API_KEY"}}]
        }
      ]].
    ```

2. In your application supervisor, e.g. `src/myapp_sup.erl`, start up a `cfclient_instance`
   for each of the project configurations you provided above:

    ```erlang
    init(Args) ->
      HarnessProject1Args = application:get_env(harness_project_1_config, cfclient, []),
      HarnessProject2Args = application:get_env(harness_project_2_config, cfclient, []),
      
      ChildSpec1 = #{id => project1_cfclient_instance, start => {cfclient_instance, start_link, [HarnessProject1Args]}},
      ChildSpec2 = #{id => project2_cfclient_instance, start => {cfclient_instance, start_link, [HarnessProject2Args]}},
    
      MaxRestarts = 1000,
      MaxSecondsBetweenRestarts = 3600,
      SupFlags = #{strategy => one_for_one,
        intensity => MaxRestarts,
        period => MaxSecondsBetweenRestarts},
    
      {ok, {SupFlags, [ChildSpec1, ChildSpec2]}}.
    ```

3. To use a specific SDK instance, you provide the instance name to the public function you are calling. For example use `bool_variation/4` instead of `bool_variation/3` - see the following code sample:

    ```erlang
    -module(multi_instance_example).
    
    -export([multi_instance_evaluations/0]).
    
    multi_instance_evaluations() ->
      Target = #{
        identifier => "Harness_Target_1",
        name => "HT_1",
        attributes => #{email => <<"demo@harness.io">>}
      },
    
      %% Instance 1
      Project1Flag = <<"harnessappdemodarkmodeproject1">>,
      Project1Result = cfclient:bool_variation(instance_name_1, Project1Flag, Target, false),
      logger:info("Instance Name 1 : Variation for Flag ~p with Target ~p is: ~p~n",
        [Project1Flag, maps:get(identifier, Target), Project1Result]),
    
      %% Instance 2
      Project2Flag = <<"harnessappdemodarkmodeproject2">>,
      Project2Result = cfclient:bool_variation(instance_name_2, Project2Flag, Target, false),
      logger:info("Instance name 2 Variation for Flag ~p with Target ~p is: ~p~n",
      [Project2Flag, maps:get(identifier, Target), Project2Result]).
    ```

#### Elixir project config

1. Create project configurations for each new instance you would like to start in your `config/config.exs` file:

    ```elixir
    # Config for "project 1"
    config :elixirsample,  project1:
           [
            api_key: System.get_env("FF_API_KEY_1"),
            config: [name: :project1]
           ]
    
    # Config for "project 2"
    config :elixirsample,  project2:
      [
      api_key: System.get_env("FF_API_KEY_2"),
      config: [name: :project2]
    ]
    ```

2. In your application supervisor, e.g. `lib/myapp/supervisor.ex`, start up `cfclient_instance` for each of the project configurations you provided above:

    ```elixir
      def init(_opts) do
        project_1_config = Application.get_env(:elixirsample, :project1, [])
        project_2_config = Application.get_env(:elixirsample, :project2, [])
        children = [
          %{
            id: :project1_cfclient_instance,
            start: {:cfclient_instance, :start_link, [project_1_config]},
            type: :supervisor
          },
          %{
            id: :project2_cfclient_instance,
            start: {:cfclient_instance, :start_link, [project_2_config]},
            type: :supervisor
          },
        ]
        Supervisor.init(children, strategy: :one_for_one)
      end
    ```

3. To use a specific SDK instance, you provide the instance name to the public function you are calling. For example use `bool_variation/4` instead of `bool_variation/3` - see the following code sample:

    ```elixir
    defmodule ElixirSample.EvaluationSample do
      require Logger
    
      def getFlagLoop() do
        target = %{
          identifier: "harness",
          name: "Harness",
          anonymous: false,
          attributes: %{}
        }
    
        # Default instance
        flag = "projectflag"
        result = :cfclient.bool_variation(flag, target, false)
    
        Logger.info(
          "SVariation for Flag #{flag} with Target #{inspect(target)} is: #{result}"
        )
    
        # Instance 1
        project_1_flag = "project1flag"
        project_1_result = :cfclient.number_variation(:project1, project_1_flag, target, 3)
    
        Logger.info(
          "SDK instance 1: Variation for Flag #{project_1_flag} with Target #{inspect(target)} is: #{project_1_result}"
        )
    
        # Instance 2
        project_2_flag = "project2flag"
        project_2_result = :cfclient.bool_variation(:project2, project_2_flag, target, false)
    
        Logger.info(
          "SDK instance 2: Variation for Flag #{project_2_flag} with Target #{inspect(target)} is: #{project_2_result}"
        )
    
        Process.sleep(10000)
        getFlagLoop()
      end
    end
    ```

### Use the Relay Proxy

When using your Feature Flag SDKs with a [Harness Relay Proxy](/docs/feature-flags/ff-using-flags/relay-proxy/) you need to change the default URL and events URL to `http://localhost:7000` when initializing the SDK. To do this:

Pass the new URLs in when initializing the SDK.

Erlang exmaple:
```erlang
[{cfclient, [
    {api_key, {envrionment_variable, "YOUR_API_KEY_ENV_VARIABLE"},
    {config, [
        {config_url, "http://localhost:7000"},
        {events_url, "http://localhost:7000"},
    ]},
    ]}]
```

Elixir exmaple:
```elixir
config :cfclient,
       [api_key: System.get_env("FF_API_KEY_0"),
       # For additional config you can pass in, see Erlang SDK docs: https://github.com/harness/ff-erlang-server-sdk/blob/main/docs/further_reading.md#further-reading
       # we are just using the main config url here as an example.
        config: [
          config_url: "http://localhost:7000",
          events_url: "http://localhost:7000",
        ]]
```

## Sample Code for Erlang Applications
Ensure you have configured your application by following the steps in [Initialize the SDK](#Initialize the SDK)

```
-module(getting_started).

get_flag_loop() ->
  Target = #{identifier => "Harness_Target_1",
    name => "HT_1",
    %% Attribute keys must be atoms. 
    %% Values must be either bitstrings, atoms, or a list of bitstrings/atoms - see Targets with custom attributes section below.
    attributes => #{email => <<"demo@harness.io">>}
  },
  FlagIdentifier = "harnessappdemodarkmode",
  Result = cfclient:bool_variation(FlagIdentifier, Target, false),
  logger:info("Varaion for Flag ~p witih Target ~p is: ~p~n", [FlagIdentifier, maps:get(identifier, Target), Result]),
  timer:sleep(10000),
  get_flag_loop().

```

## Sample Code for Elixir Applications

A sample Elixir appliction which uses the Erlang SDK can be found at: https://github.com/harness/ff-elixir-server-sample
































