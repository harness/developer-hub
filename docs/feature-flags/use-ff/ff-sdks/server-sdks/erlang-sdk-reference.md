---
title: Erlang SDK reference
description: This topic describes how to use the Harness Feature Flags Erlang SDK. For getting started quickly, you can use our sample code from the Erlang SDK README.
sidebar_position: 15
redirect_from:
  - /docs/feature-flags/ff-sdks/server-sdks/erlang-sdk-reference
---

import Sixty from '/docs/feature-flags/shared/p-sdk-run60seconds.md'

import Smpno from '../shared/note-smp-not-compatible.md'

import Closeclient from '../shared/close-sdk-client.md'


<Smpno />

This topic describes how to use the Harness Feature Flags Erlang SDK for your Erlang or Elixir based application. 

For getting started quickly:

1. For **Erlang** based applications, you can clone our sample Erlang application in [GitHub](https://github.com/harness-apps/ff-erlang-server-sample).
2. For **Elixir** based applications, you can clone our sample Elixir application in [GitHub](https://github.com/harness/ff-elixir-server-sample).

## Before you begin

Make sure you read and understand:

* [Feature Flags Overview](/docs/feature-flags/get-started/overview.md)
* [Getting Started with Feature Flags](/docs/feature-flags/get-started/onboarding-guide)
* [Client-Side and Server-Side SDKs](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks)
* [Communication Strategy Between SDKs and Harness Feature Flags](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/communication-sdks-harness-feature-flags)

## Version

Latest SDK version can be found on [GitHub Release Page](https://github.com/harness/ff-erlang-server-sdk/releases)

## Requirements

* **For Erlang** applications, install:

  * Erlang/OTP 24 or later
  * Rebar3 3.20.0 or later
  * Important, since version 2.0.0 the SDK depends on an Elixir hashing library, so the following is also required for Erlang applications:
    * Elixir 1.13.4 or later available on your build system
    * Rebar3 `rebar_mix` plugin installed in your Rebar3 plugins

* **For Elixir** applications, install:
  * Elixir version 1.13.4 or later
  * OTP 24 or later

To follow along with our test code sample, make sure you:

* [Create a Feature Flag](/docs/feature-flags/use-ff/ff-creating-flag/create-a-feature-flag) on the Harness Platform called `harnessappdemodarkmode`.
* [Create a server SDK key](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project#create-an-sdk-key) and made a copy of it.

## Install the SDK

### For Erlang applications

To install the SDK for Erlang based applications: 

1. Add the SDK as a dependency to your `rebar.config` file:

  ```erlang
  {deps, [{cfclient, "1.0.0", {pkg, harness_ff_erlang_server_sdk}}]}.
  ```
    
2. Add the `rebar_mix` plugin to your `rebar.config` file:

  ```erlang
  {project_plugins, [rebar_mix]}.
  ```

  Imporatant: for this plugin to work ensure you have Elixir 1.13.4 or later installed onto your build system

3. Add the dependency to your project's `app.src`.

  ```erlang
  {applications,
    [kernel, stdlib, cfclient]
  },
  ```


### For Elixir applications

To install the SDK for Elixir based applications: 

* Add the SDK as a dependency to `mix.exs` `deps()`:

  ```
    defp deps do
      [
          {:cfclient, "~> 2.0.0", hex: :harness_ff_erlang_server_sdk}
      ]
  ```

## Initialize the SDK

To initialize the Erlang SDK:

1. Add your server SDK key to connect to your Harness environment.
1. Add a target that you want to evaluate against a Feature Flag.
1. (Optional) Configure the SDK.
1. Complete the initialization with the SDK using the server SDK key, target, and configuration parameters you set.

### Add the server SDK key

* **Add the server SDK key for Erlang applications**

  To connect to the correct environment that you set up on the Harness Platform, add the server SDK key from that environment. 
  Input the server SDK key into the `api_key` tuple, for example:

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

* **Add the server SDK key for Elixir applications**

  To connect to the correct environment that you set up on the Harness Platform, add the server SDK key from that environment.
  Input the server SDK key into the `api_key` key, for example:

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

### Add a target for Erlang and Elixir applications

<details>
<summary>What is a target?</summary> 
Targets are used to control which users see which variation of a Feature Flag. For example, if you want to do internal testing, you can enable the flag for some users but not others. When creating a target, you give it a name and a unique identifier. Targets are often users, but you can create a target from anything that can be uniquely identified, such as an app or a machine.
</details>

For more information about targets, go to [Target Users With Flags](/docs/feature-flags/use-ff/ff-target-management/targeting-users-with-flags).

To create a target, create a map and add the following keys:

| Parameter      | Description                                                                                                                                                                                                                                                                                                                                               | Required? | Example                                                                                                                                                                                                                                                                                                             |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Identifier** | Unique ID for the Target<br /><br />**Key:** atom<br />**Value:** bitstring / atom / string                                                                                                                                                                                                                                                               | Required  | `identifier => <<"HT_1">>`                                                                                                                                                                                                                                                                                          |
| **Name**       | Name for this target. This does not have to be unique. **Note:** If you don’t provide a value, Harness uses the ID as the name. <br/> Value: bitstring / atom / string                                                                                                                                                                                    | Optional  | `name => <<"Harness_Target_1">>`                                                                                                                                                                                                                                                                                    |
| **Attributes** | Additional data you can store for a target, such as email addresses or location.<br /><br />**Key:** atom<br />**Value:** bitstring / atom / list of bitstrings or atom <br /><br />**Note:** lists of strings are not supported. <br/> See [Erlang SDK GitHub Repository](https://github.com/harness/ff-erlang-server-sdk#targets-with-custom-attributes) for more information. | Optional  | `%% Bitstring`<br />`attributes => #{beta => <<"beta_group_1">>}`<br /><br />`%% Atom `<br />`attributes => #{alpha => alpha_group_1}`<br/><br/>`%% Atom in Elixir syntax` <br/>`attributes => #{alpha => :alpha_group_1}`<br /><br />`%% List`<br />`attributes => #{beta => [<<"beta_group_1">>, beta_group_2}]}` |

### Configure the SDK

When initializing the SDK, you have the option of providing alternative configuration. 

* **Configure Erlang applications** 

  Configure Erlang applications using the `config/sys.config` file, for example:

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

* **Configure Elixir applications** 

  Configure Elixir applications using the `config/config.exs` file, for example:

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

You can configure the following base options of the SDK:

| Name                 | Erlang Example                                         | Elixir Example                                       | Description                                                                                                                                  | Default value                          |
|----------------------|--------------------------------------------------------|:-----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| **ConfigURL**        | `{config_url, "https://config.ff.harness.io/api/1.0"}` | `config_url: "https://config.ff.harness.io/api/1.0"` | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: <br />`http://localhost:7000`                    | `https://config.ff.harness.io/api/1.0` |
| **EventUrl**         | `{events_url, "https://events.ff.harness.io/api/1.0"}` | `events_url: "https://events.ff.harness.io/api/1.0"` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: <br />`http://localhost:7000`      | `https://events.ff.harness.io/api/1.0` |
| **PollingInterval**  | `{poll_interval, 60000}`                               | `poll_interval: 60000`                               | The interval in seconds that we poll for changes when you are using stream mode.                                                             | `60` (seconds)                         |
| **AnalyticsEnabled** | `{analytics_enabled, true}`                            | `analytics_enabled: true`                            | Set to true to enable analytics. Set to false to disable analytics. <br />**Note:** When enabled, analytics data is posted every 60 seconds. | `true`                                 |

### Complete the initialization 

To complete the initialization, provide the `api_key` and any optional configuration options. The SDK will then boot along with your application at run time.

## Evaluate a flag

Evaluating a flag is when the SDK processes all flag rules and returns the correct variation of that flag for the target you provide. If a matching flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different variation types and for each method you need to pass in:
* Identifier of the flag you want to evaluate
* The target object you want to evaluate against
* The default variation

Below are examples of evaluating different types of flag variations for Erlang and Elixir applications.

### Examples for Erlang applications

* **Boolean variation**

  ```
  cfclient:bool_variation(FlagIdentifier, Target, false).
  ```

* **Number variation:** 

  ```
  cfclient:number_variation(FlagIdentifier, Target, -1).
  ```

* **String variation:**

  ```
  cfclient:string_variation(FlagIdentifier, Target, "default_string").
  ```

* **JSON variation:**

  ```
  cfclient:json_variation(FlagIdentifier, Target, #{dark_mode => <<”false”>>}).
  ```

### Examples for Elixir applications

* **Boolean variation**

  ```
  :cfclient:bool_variation(FlagIdentifier, Target, false)
  ```

* **Number variation:**

  ```
  :cfclient:number_variation(FlagIdentifier, Target, -1)
  ```

* **String variation:**

  ```
  :cfclient:string_variation(FlagIdentifier, Target, "default_string")
  ```

* **JSON variation:**

  ```
  :cfclient:json_variation(FlagIdentifier, Target, #{dark_mode => <<”false”>>})
  ```

## Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the flag on and off. The SDK polls for changes every 60 seconds by default. Check your app after this interval to verify if the flag variation displayed is updated with the variation you toggled. 

<Sixty />

## Close the SDK client

<Closeclient />

To close the SDK, run one of the following commands: 

* **For Erlang applications:**

  ```
  %% Close the default instance
  cfclient:close().
  
  %% Close a named instance
  cfclient:close(instance_name_1).
  ```

* **For Elixir applications:**

  ```
  # Close the default instance
  :cfclient.close()
  
  # Close a named instance
  :cfclient.close(:instance_name_1)
  ```

## Additional options

### Set log level of the SDK

Optionally, you may set the required log level of the SDK. If a log level is not provided, the SDK defaults to `warning`.

#### Elixir logging configuration example
```elixir
config :cfclient,
  # Set the log level of the SDK to debug
    log_level: :debug
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

#### Erlang logging configuration example

```erlang
[{cfclient, [
    %% Set the log level of the SDK to debug
    {log_level, debug},
    {api_key, {envrionment_variable, "YOUR_API_KEY_ENV_VARIABLE"},
    {config, [
        {config_url, "https://config.ff.harness.io/api/1.0"},
        {events_url, "https://config.ff.harness.io/api/1.0"},
        {poll_interval, 60},
        {analytics_enabled, true},
    ]},
    ]}]
```

### Enable verbose evaluation logs

Evaluation logs contain statements relating to flag evaluations. These logs are set at `debug` level by default. 
If required, you can change the evaluation log level to `info`, for example, if your production environment doesn't use `debug` level, but you need to see verbose evaluation logs.

The examples below set `log_level` to `error`, but override that for the evaluation logs, which are set to `info` (more verbose). 

:::info note 
This will only affect evaluation log statements. The `log_level` you set applies to all other log statements.
:::

**To enable verbose evaluation logs:** 

* Set `verbose_evaluation_logs: true`. 

  This changes the evaluation log level to `info`. Other log levels are unaffected. 

  **Elixir example**

  ```elixir
  config :cfclient,
      log_level: :error,
      verbose_evaluation_logs: true,
      [api_key: System.get_env("FF_API_KEY_0"),
      config: [
        poll_interval: 60000
      ]]
  ```
   
  **Erlang example**

  ```erlang
  [{cfclient, [
      {log_level, error},
      {verbose_evaluation_logs, true},
      {api_key, {envrionment_variable, "YOUR_API_KEY_ENV_VARIABLE"},
      {config, [
        {poll_interval, 60}
      ]},
      ]}]
  ```

### Run multiple instances of the SDK

The SDK by default starts up a single instance called `default` which is configured with your project API key.
If different parts of your application need to use 
specific [projects](/docs/feature-flags/use-ff/ff-creating-flag/create-a-project/), you can start up additional client instances using by defining additional configuration for each unique project.

:::info note
If the default instance fails to start, for example, due to an authentication error with the API key, then the SDK fails to boot and any additional instances do not start. To prevent the default instance from starting, 
go to [Erlang project config](#erlang-project-config) and [Elixir project config](#elixir-project-config).
:::

#### Erlang Project Config
 
1. Create project configurations for each new instance you would like to start in your `config/sys.config` file.
   The additional project config is defined in `sys.config`

    The following `sys.config` snippet starts up two additional instances along with the default instance:

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
      ]},
      
      {harness_project_2_config, [
        {cfclient, [
          {config, [
            {name, instance_name_2}
          ]},
          {api_key, {environment_variable, "PROJECT_2_API_KEY"}}]
        }
      ]},
    
      {cfclient, [
        {api_key, {environment_variable, "FF_API_KEY"}},
        {config, [
          {config_url, "https://config.ff.harness.io/api/1.0"},
          {events_url, "https://config.ff.harness.io/api/1.0"}
        ]},
        {analytics_push_interval, 60000}
      ]
    }].
    ```
    
   If you don't require the default instance to be started up, you can do:

    ```erlang
      
      % ... additional project config
      
      {cfclient, [
        {start_default_instance, false},
        %% The remaining tuples will be ignored, so you can choose to include or omit them.
        {api_key, {environment_variable, "FF_API_KEY"}},
        {config, [
          {config_url, "https://config.ff.harness.io/api/1.0"},
          {events_url, "https://config.ff.harness.io/api/1.0"}
        ]},
        {analytics_push_interval, 60000}
      ]
    },
    ```

2. In your application supervisor, for example, `src/myapp_sup.erl`, start up a `cfclient_instance`
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

3. To use a specific SDK instance, provide the instance name to the public function you are calling. For example, use `bool_variation/4` instead of `bool_variation/3` - see the following code sample:

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
    
  ```
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

  If you don't require the default instance to be started up, you can do:

  ```
  # Config for "project 1"
  config :elixirsample,  project1:
         [
          start_default_instance: false,
          # The remaining tuples will be ignored, so you can choose to include or omit them.
          api_key: System.get_env("FF_API_KEY_1"),
          config: [name: :project1]
         ]
  ```

2. In your application supervisor, for example, `lib/myapp/supervisor.ex`, start up `cfclient_instance` for each of the project configurations you provided above:

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

3. To use a specific SDK instance, you provide the instance name to the public function you are calling. For example, use `bool_variation/4` instead of `bool_variation/3` - see the following code sample:

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
   
        # Default instance
        default_project_flag = "defaultflag"
        default_project_result = :cfclient.bool_variation(default_project_flag, target, false)
    
        Logger.info(
          "Default instance: Variation for Flag #{default_project_flag} with Target #{inspect(target)} is: #{default_project_result}"
        )
    
        Process.sleep(10000)
        getFlagLoop()
      end
    end
    ```

### Use the Relay Proxy

When using your Feature Flag SDKs with a [Harness Relay Proxy](/docs/feature-flags/use-ff/relay-proxy/deploy-relay-proxy) you must change the default URL and events URL to `http://localhost:7000` when initializing the SDK. 

To do this, pass the new URLs in when initializing the SDK, as shown below.

* **Erlang exmaple:**

  ```erlang
  [{cfclient, [
      {api_key, {envrionment_variable, "YOUR_API_KEY_ENV_VARIABLE"},
      {config, [
          {config_url, "http://localhost:7000"},
          {events_url, "http://localhost:7000"},
      ]},
      ]}]
  ```

* **Elixir exmaple:** 

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

## Sample code 

* **Sample code for Erlang applications**

  Ensure you have configured your application by following the steps in [Initialize the SDK](#initialize-the-sdk) above.

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
You can also find a sample Erlang apllication that uses the Erlang SDK in [GitHub](https://github.com/harness-apps/ff-erlang-server-sample).
  
* **Sample code for Elixir applications**

  You can find a sample Elixir application that uses the Erlang SDK in [GitHub](https://github.com/harness/ff-elixir-server-sample).
































