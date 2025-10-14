---
title: Ruby SDK
sidebar_label: Ruby SDK
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/ruby-sdk-error-uninitialized-constant/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/ruby-sdk-upgrading-from-4-to-5-plus/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/ruby-sdk-close-wait-tcp-connections-in-puma/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Ruby SDK. All of our SDKs are open source. Go to our [Ruby SDK GitHub repository](https://github.com/splitio/ruby-client) to learn more.

:::tip[Rule-based segments support]
Rule-based segments are supported in SDK versions 8.6.0 and above. No changes are required to your SDK implementation, but updating to a supported version is required to ensure compatibility.

Older SDK versions will return the control treatment for flags using rule-based segments and log an impression with a special label for unsupported targeting rules.
:::

## Initialization

### 1. Import the SDK into your project

<Tabs>
<TabItem value="Ruby">

```ruby
gem install splitclient-rb -v '~> 8.9.0'
```

</TabItem>
<TabItem value="JRuby">

```ruby
gem install splitclient-rb -v '~> 8.9.0'
```

</TabItem>
</Tabs>

:::warning[If using Synchronizer with Redis - Synchronizer 2.x required after SDK Version 3.x]

Since version 2.0.0 of the split-synchronizer, we use a more efficient scheme to store impressions in Redis. This approach is faster and easier on your Redis instances, since it yields better throughput of impressions to the backend. If you use this SDK with the Synchronizer in Redis or Proxy mode, you need the newest versions of our Split Synchronizer. We recommend that once you're using SDK versions compatible with Split-Sync 2.0 on all your applications pointing to the redis instance maintained by the Split-Sync, you disable backwards compatibility. This is as easy as changing a parameter to `true` on the JSON config or an environment variable to `on` if you're using the docker image.
:::

### 2. Instantiate the SDK and create a new SDK factory client

When the SDK is instantiated, it starts background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds, depending on the size of data. If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while its in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the SDK does not fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment).

To make sure the SDK is properly loaded before asking it for a treatment, block it until the SDK is ready. You can do this by using the `block_until_ready` method of the SDK factory client (or Manager) as part of the instantiation process of the SDK as shown below. Do this as a part of the startup sequence of your application.

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Configure the SDK with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a server-side SDK API key. See [API keys](/docs/feature-management-experimentation/management-and-administration/account-settings/api-keys) to learn more.

```ruby title="Ruby" 
require 'splitclient-rb'

split_factory = SplitIoClient::SplitFactory.new('YOUR_SDK_KEY')
split_client = split_factory.client

begin
  split_client.block_until_ready
rescue SplitIoClient::SDKBlockerTimeoutExpiredException
  puts 'SDK is not ready. Decide whether to continue or abort execution'
end
```

### Configure the SDK for use with Rails

Our SDK is compatible with Ruby on Rails. There are a few extra steps for the initialization. You can configure the SDK to work with Rails with the code snippet below.

```ruby title="Ruby" 
split_factory = SplitIoClient::SplitFactory.new('YOUR_SDK_KEY')
Rails.configuration.split_client = split_factory.client
```

To access the SDK factory client in your controllers, use the code snippet below:

```ruby title="Ruby" 
Rails.application.config.split_client
```

Now you can start asking the SDK to evaluate treatments for your customers.

### SDK Server Compatibility

The Ruby SDK has been tested as a standalone app using the following web servers:
* Puma
* Passenger
* Unicorn

For other setups, contact [support@split.io](mailto:support@split.io).

#### Unicorn and Puma in cluster mode

**Note:** This is only applicable when using "memory storage".

During the start of your application, the SDK spawns multiple threads. Each thread has an infinite loop inside, which is used to fetch feature flags/segments or send impressions/events to the FME service continuously. When using Unicorn or Puma in cluster mode (i.e. with `workers` > 0) the application server will spawn multiple child processes, but they won't recreate the threads that existed in the parent process. So, if your application is running in Unicorn or Puma in cluster mode you need to make two small extra steps.

For both servers, you need to have the following line in your `config/initializers/splitclient.rb`:

```ruby
Rails.configuration.split_factory = factory
```

Find below the specific setup for each one:

#### Unicorn

If you’re using Unicorn in cluster mode, you’ll need to include these lines in your Unicorn config (likely `config/unicorn.rb`):

```ruby
before_fork do |server, worker|
  ## keep your existing before_fork code if any
  Rails.configuration.split_factory.stop!
end
after_fork do |server, worker|
  ## keep your existing after_fork code if any
  Rails.configuration.split_factory.resume!
end
```

#### Puma

If using Puma in cluster mode, add these lines to your Puma config (likely `config/puma.rb`):

```ruby
before_fork do
  ## keep your existing before_fork code if any
  Rails.configuration.split_factory.stop!
end
on_worker_boot do
  ## keep your existing on_worker_boot code if any
  Rails.configuration.split_factory.resume!
end
```

By doing the above, the SDK recreates the threads for each new worker and prevents the master process (that doesn't handle requests) from needlessly querying the service.

:::danger[Server spawning method]
If you are running NGINX with `thread_spawn_method = 'smart'`, use our Redis integration with the [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) or contact [support@split.io](mailto:support@split.io) for alternatives to run FME.
:::

## Using the SDK

### Basic use

After you instantiate the SDK factory client, you can start using the `get_Treatment` method of the SDK factory client to decide what version of your features your customers are served. The method requires the `FEATURE_FLAG_NAME` attribute that you want to ask for a treatment and a unique `KEY` attribute that corresponds to the end user that you want to serve the feature to.

From there, you simply need to use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning [the control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment).

```ruby title="Ruby" 
## The key here represents the ID of the user, account, etc. you're trying to evaluate a treatment for
treatment = split_client.get_treatment('KEY', 'FEATURE_FLAG_NAME');

if treatment == 'on'
  ## insert code here to show on treatment
elsif treatment == 'off'
  ## insert code here to show off treatment
else
  ## insert your control treatment code here
end
```

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/targeting/target-with-custom-attributes), the SDK's `get_treatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `get_treatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `get_treatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type `long` or `int`.
* **Dates:** Express the value as `seconds since epoch` and as objects of class `DateTime`.
* **Booleans:** Use type Boolean.
* **Sets:** Use type `List<string>`.

```ruby title="Ruby" 
attributes = {}
attributes[:deal_size] = 10000
attributes[:registered_date] = Time.now.to_i ## any time as seconds since epoch
attributes[:plan_type] = "growth"
attributes[:permissions] = ['read', 'write']
attributes[:paying_customer] = true

treatment = split_client.get_treatment("KEY",
                                       "FEATURE_FLAG_NAME",
                                       attributes)

if treatment == 'on'
    ## insert on code here
 elsif treatment == 'off'
    ## insert off code here
 else
    ## insert control code here
end
```

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flag at once. Use the different variations of `get_treatments` method from the SDK factory client to do this.
* `get_treatments`': Pass a list of the feature flag names you want treatments for.
* `get_treatments_by_flag_set`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `get_treatments_by_flag_sets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

<Tabs>
<TabItem value="get_treatments">

```ruby
attributes = {}
split_client.get_treatments('key', ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'], attributes)
```

</TabItem>
<TabItem value="getTreatments_by_flag_set">

```ruby
attributes = {}
treatments = split.get_treatments_by_flag_set('key', 'backend', attributes)
```

</TabItem>
<TabItem value="getTreatments_by_flag_sets">

```ruby
attributes = {}
treatments = split.get_treatments_by_flag_sets('key', ['backend', 'server_side'], attributes)
```

</TabItem>
</Tabs>

You can also use the [Split Manager](#manager) if you want to get all of your treatments at once.

### Get treatments with configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/setup/dynamic-configurations), you should use the `get_treatment_with_config` method.

This method will return an object containing the treatment and associated configuration.

The config element will be a stringified version of the configuration JSON defined in Harness FME. If there are no configs defined for a treatment, the SDK returns `None` for the config parameter.

This method takes the exact same set of arguments as the standard `get_treatment` method. See below for examples on proper usage:

```ruby title="get_treatment_with_config"
result = client.get_treatment_with_config('key', 'new_boxes', attributes)
configs = JSON.parse(result[:config])
treatment = result[:treatment]
```

If you need to get multiple evaluations at once, you can also use the `get_treatments_with_config` methods.
These methods take the exact same arguments as the [get_treatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to SplitResult objects instead of strings. Example usage below.


<Tabs>
<TabItem value="get_treatments_with_config">

```ruby

feature_flag_names = ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2']
feature_flag_results = client.get_treatments_with_config('KEY', feature_flag_names)

 ## feature_flag_results will have the following format:
 ## {
 ##   'FEATURE_FLAG_NAME_1': ('on', '{"color": "red"}'),
 ##   'FEATURE_FLAG_NAME_2': ('v2', '{"copy": "better copy"}')
 ## }
```

</TabItem>
<TabItem value="get_treatments_with_config_by_flag_set">

```ruby
attributes = {}
result = split.get_treatments_with_config_by_flag_set('key', 'backend', attributes)
result.each do |feature_flag, treatment_with_config|
 configs = JSON.parse(treatment_with_config[:config])
 treatment = treatment_with_config[:treatment]
 puts "Feature: #{feature_flag}, Treatment: #{treatment}, Config: #{configs}"
end
```

</TabItem>
<TabItem value="get_treatments_with_config_by_flag_sets">

```ruby
attributes = {}
result = split.get_treatments_with_config_by_flag_sets('key', ['backend', 'server_side'], attributes)
result.each do |feature_flag, treatment_with_config|
 configs = JSON.parse(treatment_with_config[:config])
 treatment = treatment_with_config[:treatment]
 puts "Feature: #{feature_flag}, Treatment: #{treatment}, Config: #{configs}"
end
```

</TabItem>
</Tabs>

If a flag cannot be evaluated, the SDK returns the fallback treatment value (default `"control"` unless overridden globally or per flag). For more information, see [Fallback treatments](/docs/feature-management-experimentation/feature-management/setup/fallback-treatment/).

### Append properties to impressions

[Impressions](/docs/feature-management-experimentation/feature-management/monitoring-analysis/impressions) are generated by the SDK each time a `getTreatment` method is called. These impressions are periodically sent back to Harness servers for feature monitoring and experimentation.

You can append properties to an impression by passing an object of key-value pairs to the `getTreatment` method. These properties are then included in the impression sent by the SDK and can provide useful context to the impression data.

Three types of properties are supported: strings, numbers, and booleans.

```ruby
# Define impression properties
evaluation_option = SplitIoClient::Engine::Models::EvaluationOptions.new = ({
  :userType => 'premium',  # string
  :loginCount => 42,       # number
  :isAdmin => true         # boolean
}

# Get treatment with properties
treatment = split_client.get_treatment('KEY', 'FEATURE_FLAG_NAME', {}, evaluation_option)

if treatment == 'on'
  # Show ON treatment
elsif treatment == 'off'
  # Show OFF treatment
else
  # Control treatment
end
```

### Shutdown

Call the `.destroy` method before letting a process using the SDK exit, as this method gracefully shuts down the SDK by stopping all background threads, clearing caches, closing connections, and flushing the remaining unpublished impressions.

```ruby title="Ruby" 
client.destroy
```

**Note: Within multi-threaded setups like using Ruby with Rails and Puma, to fully destroy the factory, you need to set it to nil as follows: `Rails.configuration.split_factory = nil`**

:::warning[Important!]
A call to the `destroy()` method also destroys the factory object. When creating new client instance, first create a new factory instance.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to  and allows you to measure the impact of your feature flags on your users’ actions and metrics.

[Learn more](/docs/feature-management-experimentation/release-monitoring/events/) about using track events in feature flags.

In the examples below, you can see that the `.track()` method can take up to four arguments. The proper data type and syntax for each are:

* **key:** The `key` variable used in the `get_treatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) that you have defined in Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value: `[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value used in creating the metric. This field can be sent in as nil or 0 if you intend to only use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) A Hash of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK successfully queued the event to be sent back to Harness servers on the next event post. The SDK returns `false` if the current queue size is equal to the config set by `events_queue_size` or if an incorrect input to the `track` method is provided.

In the case that a bad input has been provided, refer to the [Events](/docs/feature-management-experimentation/release-monitoring/events/) guide for more information about our SDK's expected behavior.

```ruby title="Ruby" 
## If you would like to send an event without a value
track_event = split_client.track('KEY', 'TRAFFIC_TYPE', 'EVENT_TYPE')

## Example
track_event = split_client.track('john@doe.com', 'user', 'page_load_time')

## If you would like to associate a value to an event
track_event = split_client.track('KEY', 'TRAFFIC_TYPE', 'EVENT_TYPE', VALUE)

## Example
track_event = split_client.track('john@doe.com', 'user', 'page_load_time', 83.334)

## If you would like to associate just properties to an event
track_event = split_client.track('KEY', 'TRAFFIC_TYPE', 'EVENT_TYPE', nil, { PROPERTIES })

## If you would like to associate a value and properties to an event
track_event = split_client.track('KEY', 'TRAFFIC_TYPE', 'EVENT_TYPE', VALUE, { PROPERTIES })

## Example
properties = {
  package: 'premium',
  admin: true,
  discount: 50
}

track_event = split_client.track('john@doe.com', 'user', 'page_load_time', nil, properties)
```

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the SDK. The parameters available for configuration are described below:

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| logger | The log implementation to use for warnings and errors from the SDK. | Logs to STDOUT  |
| debug_enabled| Enabled verbose mode. | false  |
| transport_debug_enabled | Super verbose mode that prints network payloads among others. | false  |
| connection_timeout| HTTP client connection timeout (in seconds). | 5s  |
| read_timeout | HTTP socket read timeout (in seconds). | 5s  |
| features_refresh_rate  |The SDK polls Harness servers for changes to feature flags at this period (in seconds). | 5s |
| segments_refresh_rate | The SDK polls Harness servers for changes to segments at this period (in seconds). | 60s  |
| telemetry_refresh_rate | The SDK caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600s  |
| impressions_refresh_rate | How often impressions are sent out (in seconds). | 60s  |
| events_push_rate | How often events are sent out (in seconds). | 60s  |
| cache_adapter| Where to store feature flags and impressions: `:memory` or `:redis` | `:memory`  |
| redis_url | Redis URL or hash with configuration for SDK to connect to. See [http://www.rubydoc.info/github/redis/redis-rb/Redis%3Ainitialize](http://www.rubydoc.info/github/redis/redis-rb/Redis%3Ainitialize) | 'redis://127.0.0.1:6379/0'  |
| mode | Whether the SDK is running in `standalone mode` using memory storage or `consumer mode` using an external storage. See Redis integration. | `:standalone`  |
| redis_namespace | Prefix to add to elements in Redis cache when having to share Redis with other applications. | `"SPLITIO/ruby-#{VERSION}"`  |
| labels_enabled | Disable labels from being sent to the Harness servers. Labels may contain sensitive information. | true  |
| impressions_queue_size | The size of the impressions queue in case of `cache_adapter == :memory`.  | 5000 |
| events_queue_size | The size of the events queue in case of `cache_adapter == :memory`.  | 500 |
| impressions_bulk_size | Max number of impressions to be sent to the backend on each post. | impressions_queue_size  |
| ip_addresses_enabled | Flag to disable IP addresses and host name from being sent to the Harness servers. | true |
| streaming_enabled | Boolean flag to enable the streaming service as default synchronization mechanism. In the event of an issue with streaming, the SDK will fallback to the polling mechanism. If false, the SDK will poll for changes as usual without attempting to use streaming. | true |
| impressions_mode | Defines how impressions are queued on the SDK. Supported modes are OPTIMIZED(`:optimized`), NONE(`:none`), and DEBUG(`:debug`). In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, all impressions are queued and sent to Harness; this is useful for validations. Use DEBUG mode when you want every impression to be logged in Harness when trying to debug your SDK setup. This setting does not impact the impression listener which receives all generated impressions locally. | `:optimized` |
| flag_sets_filter | This setting allows the SDK to only synchronize the feature flags in the specified flag sets, avoiding unused or unwanted flags from being synced on the SDK instance, bringing all the benefits from a reduced payload. | nil |
To set each of these parameters, use the syntax below:

```ruby title="Ruby" 
options = {connection_timeout: 10,
           read_timeout: 5,
           impressions_refresh_rate: 360,
           logger: Logger.new('logfile.log')}

split_factory = SplitIoClient::SplitFactory.new('YOUR_SDK_KEY', options)
split_client = split_factory.client
```

## Sharing state: Redis integration

**Configuring this Redis integration section is optional for most setups. Read the information below to determine if it might be useful for your project.**

By default, the SDK factory client stores the state it needs to compute treatments (rollout plans, segments, and so on) in memory. As a result, it is easy to get set up with FME by instantiating a client and starting to use it. Configuring this Redis integration section is optional for most setups.

This simplicity hides one important detail that is worth exploring. Because each SDK factory client downloads and stores state separately, a change in a feature flag is picked up by every client on its own schedule. Thus, if a customer issues back-to-back requests that are served by two different machines behind a load balancer, the customer can see different treatments for the same feature flag because one SDK factory client may not have picked up the latest change. This drift in clients is natural and usually ignorable as long as each client sets an aggressive value for `features_refresh_rate` and `segments_refresh_rate`. You can learn more about setting these rates in the [Configuration section](#configuration).

However, if your application requires a total guarantee that SDK clients across your entire infrastructure pick up a change in a feature flag at the exact same time, the only way to ensure that is to externalize the state of the SDK factory client in a data store hosted on your infrastructure.

We currently support Redis for this external data store.

To use the Ruby SDK with Redis, set up the Split Synchronizer and instantiate the SDK in consumer mode.

#### Split Synchronizer

Follow the steps in our [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) document to get everything set to sync data to your Redis cache. After you do that, you can set up the SDK in consumer mode.

#### Consumer Mode

In consumer mode, a client can be embedded in your application code and respond to calls to `get_treatment` by retrieving state from the data store (Redis in this case).

Here is how to configure and get treatments for a SDK factory client in consumer mode.

```ruby title="Ruby" 
options = {
  ## Other options here
  cache_adapter: :redis,
  mode: :consumer,
  redis_url: 'redis://127.0.0.1:6379/0'
}

split_factory = SplitIoClient::SplitFactory.new('YOUR_SDK_KEY', options)
split_client = split_factory.client
```

### Configure Redis using Sentinel

Use the syntax below to configure Redis using Sentinel:

```ruby title="Ruby" 
SENTINELS = [{host: '127.0.0.1', port: 26380},
             {host: '127.0.0.1', port: 26381}]

redis_connection = {
  url: 'redis://mymaster',
  sentinels: SENTINELS,
  role: :master
}

options = {
  ## Other options here
  redis_url: redis_connection
}

split_factory = SplitIoClient::SplitFactory.new('YOUR_SDK_KEY', options)
split_client = split_factory.client
```

### Redis Cluster

This functionality is currently not supported for this SDK, but is coming in a future release! Subscribe to our [release notes](https://www.split.io/releases) for updates.

## Localhost mode

Features start their life on one developer's machine. A developer should be able to put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, the SDK can be started in **localhost** mode (aka off-the-grid mode). In this mode, the SDK neither polls nor updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the features.

To use the SDK in localhost mode, replace the SDK Key with "localhost", as shown in the example below:

```ruby title="Ruby" 
require 'splitclient-rb'
split_file = File.expand_path(File.join(File.dirname(__FILE__), '../test_data/local_treatments/split.yaml'))

split_client = split_factory = SplitIoClient::SplitFactory.new('localhost', split_file: split_file).client
```

In this mode, the SDK loads a `.yaml` file containing a simple depiction of a feature flag. eg:

```yaml title="YAML"
- single_key_feature:
    treatment: 'on'
    keys: 'john_doe'
    config: {'desc': 'this applies only to ON and only for john_doe. The rest will receive OFF'}
- single_key_feature:
    treatment: 'off'
    keys:
    config: {'desc': 'this applies only to OFF treatment'}
```

In the example given, a call to `get_treatment` passing `john_doe` as the key renders the `on` treatment, while as any other key receives `off`. Note that configs can be added to test the `_with_config` versions of `get_treatment` and `get_treatments`. Also, you can set multiple keys for the same treatment using an array:


```yaml title="YAML"
- multiple_keys_feature:
    treatment: 'on'
    keys: ['john_doe', 'jane_doe']
    config: {'desc': 'this applies only to ON and only for john_doe and jane_doe. The rest will receive OFF'}
```

Any feature that is not provided in the `split_file` markup map returns [the control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if the SDK is asked to evaluate them.

By default, changes in the file are not automatically picked up without restarting the client. To have the client automatically pick up changes to the file, specify `reload_rate` as the interval in seconds at which changes are picked up. Here is an example of specifying both `split_file` and `reload_rate`.

```ruby title="Ruby" 
factory = SplitIoClient::SplitFactoryBuilder.build('localhost', split_file: '/where/to-look-for/<file_name>', reload_rate: 3)
```

## Manager

Use the Split Manager to get a list of feature flags available to the SDK factory client. To instantiate a Manager in your code base, use the same factory that you used for your client.

```ruby title="Manager"
## Reusing the split_factory created originally.
split_manager = split_factory.manager
```

The `SplitView` object referenced above has the following structure.

```ruby title="Manager"
## returns a List of SplitViews or empty.
list_of_feature_flags = split_manager.splits

## Array of String representing feature flag names
list_of_feature_flag_names = split_manager.split_names

## returns a SplitView of the 'name' specified or empty.
feature_flag = split_manager.split(name)
```

The `feature_flag` object referenced above has the following structure.

```ruby title="Feature flags by Split Manager"
{
 :name=>"new_reporting",
 :traffic_type_name=>"user",
 :killed=>false,
 :treatments=>["v1", "v2", "v3"],
 :change_number=>1469134003507,
 :configs=>{:on=>"{\"size\":15,\"test\":20}"},
 :default_treatment=>"off",
 :sets>=["backend"],
 :impressions_disabled=>false
}
```

## Listener

FME SDKs send impression data back to Harness servers periodically when evaluating feature flags. To send this information to a location of your choice, define and attach an *impression listener*.

The SDK sends the generated impressions to the impression listener right away. However, to avoid blocking the caller thread, use the second parameter to specify the size of the queue acting as a buffer. Refer to the followoing snippet:

If the impression listener is slow at processing the incoming data, the queue fills up and any subsequent impressions are dropped.

```ruby title="Listener"
class MyImpressionListener
  def log(impression)
    Logger.new($stdout).info(impression)
  end
end

options = {
  ## other options
  impression_listener: MyImpressionListener.new ## do remember to initialize your class here
  ## other options
}

factory = SplitIoClient::SplitFactoryBuilder.build(sdk_key, options)
```

## Logging

Our Ruby SDK makes use of Ruby’s stdlib `Logger` class to log errors/events. The default option is shown below:

```ruby title="Ruby" 
Logger.new($stdout)
```

You can configure the following options in the config file.

```ruby title="Ruby" 
{
  ## ...
  ## you can specify your own Logger class instance here:
  logger: Logger.new('logfile.log'),
  ## to enable more verbose logging, including more debug information (false is the default) use:
  debug_enabled: true,
  ## to log transport data (mostly http requests, false is the default) use:
  transport_debug_enabled: true
  ## ...
}
```

## Proxy

Ruby SDK respects the `HTTP_PROXY` environment variable. To use a proxy, assign a proxy address to that variable.

```ruby title="Proxy"
http_proxy=http://username:password@hostname:port
```

## Configure fallback treatments

Fallback treatments let you define a treatment value (and optional configuration) to be returned when a flag cannot be evaluated. By default, the SDK returns `control`, but you can override this globally at the SDK level or for individual flags.

This is useful when you want to:

- Avoid unexpected `control` values in production
- Ensure a predictable user experience by returning a stable treatment (e.g. `off`)
- Customize behavior for specific flags if evaluations fail

### Global fallback treatment

Set a global fallback treatment when initializing the SDK factory. This value is returned whenever any flag cannot be evaluated.

```ruby
// Initialize SDK with global fallback treatment
fallback_config = SplitIoClient::Engine::Models::FallbackTreatmentsConfiguration.new(SplitIoClient::Engine::Models::FallbackTreatment.new("control_fallback_ruby", '{"my_feature": "control"}'))

options = {block_until_ready: 5,
  fallback_treatments: fallback_config
}
split_factory = SplitIoClient::SplitFactoryBuilder.build("SDK API KEY", options)
```

### Flag-level fallback treatment

You can configure fallback treatments for specific flags in the SDK options. When a flag evaluation fails, the SDK returns the corresponding fallback treatment defined for that flag.

```ruby
fallback_config = SplitIoClient::Engine::Models::FallbackTreatmentsConfiguration.new(nil, {:flag_1 => SplitIoClient::Engine::Models::FallbackTreatment.new(
	"flag_1_FALLBACK", 
	'{"my_feature": "collection control"}')
})

options = {block_until_ready: 5,
  fallback_treatments: fallback_config
}
split_factory = SplitIoClient::SplitFactoryBuilder.build("SDK API KEY", options)
split_client = split_factory.client

treatment = split_client.get_treatment_with_config("ruby", "flag_1")
```

For more information, see [Fallback treatments](/docs/feature-management-experimentation/feature-management/setup/fallback-treatment/).

## Troubleshooting

### SSL Certificate Error: OpenSSL::SSL::SSLError on macOS

I am seeing the following certificate error: `OpenSSL::SSL::SSLError`. On OSX, if you see an SSL issue that looks similar to the example below, refer to [this post](https://toadle.me/2015/04/16/fixing-failing-ssl-verification-with-rvm.html) for troubleshooting.

```ruby title="Error message"
OpenSSL::SSL::SSLError: SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed
```

### Error: uninitialized constant caused by Process::RLIMIT_NOFILE in lib/net/http/persistent.rb

When using Ruby SDK on Windows, initializing the SDK factory object causes the following error:

```
uninitialized constant error caused by 'Process::RLIMIT_NOFILE' in lib/net/http/persistent.rb
```

This issue is related to the `net-http-persistent` 3.0 library on Windows OS. This library is a dependency installed automatically with the SDK gem.

Downgrade `net-http-persistent` to version 2.9.4, which is compatible with the Ruby SDK on Windows, by running:

```bash
gem uninstall net-http-persistent
gem install net-http-persistent -v '2.9.4'
```

### Upgrading Ruby SDK from 4.x to 5.x and Above

The Ruby SDK uses a hashing algorithm to divide users across treatments for feature flags (e.g., a 50/50 split between "on" and "off"). Historically, Split has used two hashing algorithms:

* **Legacy Hash (Algorithm 1)**: A simple and fast implementation, but it produces uneven user distributions when user counts are below 100.
* **Murmur Hash (Algorithm 2)**: An industry-standard hashing algorithm that is both fast and provides even distributions regardless of user count.

In Ruby SDK versions 4.x and below, feature flags intended to use the Murmur Hash were incorrectly using the Legacy Hash. This caused inconsistent treatment assignments when compared with other language SDKs.

Starting from Ruby SDK version 5.0.0 and above, this issue is fixed and the SDK correctly uses the Murmur Hash.

When upgrading, if feature flags are in a ramping phase (i.e., partially rolled out), users may experience treatment shifts due to the change in hashing algorithm.

* Ideally, upgrade the Ruby SDK when all experiments are at 100% distribution to avoid user treatment shifts.
* If this is not possible, consider creating new versions of the active feature flags. This resets metric calculations and can lead to users receiving different treatments, but users won’t be excluded from metrics as no treatment changes are recorded within the same flag version.

### Why do CLOSE_WAIT TCP connections in Puma not go down as expected?

When using the Ruby SDK with Puma or Unicorn in cluster mode (multiple workers, single thread each), you may notice an increasing number of CLOSE_WAIT TCP connections when the SDK sends treatment events. Running the following command will confirm this:

```bash
lsof -l | grep CLOSE_WAIT | wc -l
```

If no SDK treatment calls are made, the number of `CLOSE_WAIT` connections does not decrease as expected.

The SDK threads may not be terminating properly, leaving client connections hanging and waiting for the server’s final ACK signal.

Puma spawns a new process for each group of incoming requests. To ensure all SDK threads are terminated before Puma closes the process, add the following to your `config/puma.rb` file:

```ruby
before_fork do
  $split_factory.instance_variable_get(:@config).threads.each { |_, t| t.exit }
end
```

This cleanly shuts down SDK threads, helping close the TCP connections properly.
