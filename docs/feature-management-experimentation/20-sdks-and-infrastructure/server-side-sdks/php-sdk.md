---
title: PHP SDK
sidebar_label: PHP SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our PHP SDK. All of our SDKs are open source. Go to our [PHP SDK GitHub repository](https://github.com/splitio/php-client) to learn more.

## Language support

The PHP SDK supports PHP language version 7.3 and later.

## Initialization
 
### SDK architecture

The PHP SDK is architected differently from our other SDKs. This is because of the **share nothing** nature of PHP, which means that you need to leverage a remote data store that your processes can share to ensure that your customers are served consistent treatments from our SDK. The SDK has three components.

#### SDK factory client

The SDK factory client is embedded within your PHP app. It decides which treatment to show to a customer for a particular feature flag.

#### Split Synchronizer

The Split Synchronizer service fetches data from the Harness servers so it can evaluate what treatment to show to a customer. This is a background service that can run on one machine on a schedule via your scheduling system. Refer to the [Split Synchronizer documentation](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) for more information.

#### Cache 

The Synchronizer Service stores its fetched data in the cache component. The SDK comes pre-packaged with a Redis Cache Adapter. It is critical that Redis is configured **to never evict**. 

Now that you have a sense of how this SDK is structured, follow the steps below to set up the SDK in your code base:

### 1. Import the SDK into your project

```php title="PHP 7.3+"
composer require splitsoftware/split-sdk-php:7.3.0
```

The public release is available at [packagist.org/packages/splitsoftware/split-sdk-php](https://packagist.org/packages/splitsoftware/split-sdk-php).

:::warning[If using Synchronizer with Redis - Synchronizer 2.x required after SDK Version 3.x]
Since version 2.0.0 of the split-synchronizer, we use a more efficient scheme to store impressions in Redis. This approach is faster and easier on your Redis instances, since it yields better throughput of impressions to the backend. If you use this SDK with the Synchronizer in Redis or Proxy mode, you  need the newest versions of our Split Synchronizer. It is recommended that once you're using SDK versions compatible with Split-Sync 2.0 on all your applications pointing to the redis instance maintained by the Split-Sync, you disable backwards compatibility. This is as easy as changing a parameter to `true` on the JSON config or an environment variable to `on` if you're using the docker image.
:::

### 2. Set up the synchronizer service

When the composer is done, follow the steps in our [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) documents to get everything set to sync data to your Redis cache. After you do that, come back to set up the SDK in consumer mode!

### 3. Instantiate the SDK and create a new SDK factory client

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Use the code snippet below to instantiate the client in your code base. You need to provide your Redis details and your SDK API key.

Configure the SDK with the SDK API key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a server-side SDK API key. See [API keys](/docs/feature-management-experimentation/management-and-administration/account-settings/api-keys) to learn more.

Do all of this as a part of the startup sequence of your application. 
 
```php title="PHP"
<?php
 
$parameters = ['scheme' => 'tcp', 
               'host' => REDIS_HOST, 
               'port' => REDIS_PORT, 
               'timeout' => 881
              ];
 
$options = ['prefix' => ''];
 
$sdkConfig = array(
    'cache' => array('adapter' => 'predis', 
                     'parameters' => $parameters, 
                     'options' => $options
                    )
);
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $sdkConfig);
$splitClient = $splitFactory->client();
```

## Using the SDK
 
### Basic use

After you instantiate the SDK factory client, use the `getTreatment` method of the SDK factory client to decide what version of your feature flags your customers are served. The method requires the `FEATURE_FLAG_NAME` attribute that you want to ask for a treatment and a unique `key` attribute that corresponds to the end user that you want to serve the feature flag to.

From there, you need to use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning [the control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment).

```php title="PHP"
<?php
// The key here represents the ID of the user/account/etc you're trying to evaluate a treatment for
$treatment = $splitClient->getTreatment('key','FEATURE_FLAG_NAME');
 
if ($treatment === 'on') {
    // insert code here to show on treatment
} elseif ($treatment === 'off') {
    // insert code here to show off treatment
} else {
    // insert your control treatment code here
}
```

### Attribute syntax 

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/targeting/target-with-custom-attributes), the SDK's `getTreatment` method needs to pass an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `getTreatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `getTreatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are: 

* **Strings:** Use type String.
* **Numbers:** Use type Integer.
* **Dates:** Express the value in `seconds since epoch`. Use a timestamp represented by an Integer. 
* **Booleans:** Use type Boolean.
* **Sets:** Use type Array. 
 
```php title="PHP"
<?php
 
$attributes["plan_type"] = "growth";
$attributes["registered_date"] = (new DateTime("now", new DateTimeZone("UTC")))->getTimestamp();
$attributes["deal_size"] = 10000;
$attributes["paying_customer"] = True;
$attributes["permissions"] = array("gold","silver","platinum");
 
$treatment = $splitClient->getTreatment('key', 'FEATURE_FLAG_NAME', $attributes);
 
if ($treatment === 'on') {
    // insert code here to show on experience
} elseif ($treatment === 'off') {
    // insert code here to show off experience
} else {
    // insert your control treatment code here to show no reporting
}
```

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flags at once. Use the different variations of `getTreatments` from the SDK factory client to do this.
* `getTreatments`: Pass a list of the feature flag names you want treatments for. 
* `getTreatmentsByFlagSet`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `getTreatmentsByFlagSets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.
 
<Tabs>
<TabItem value="getTreatments">

```php
$treatments = $splitClient->getTreatments('key', ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2']);
 
echo json_encode($treatments);
```

</TabItem>
<TabItem value="getTreatmentsByFlagSet">

```php
$treatments = $splitClient->getTreatmentsByFlagSet('key', 'backend');
 
echo json_encode($treatments);
```

</TabItem>
<TabItem value="getTreatmentsByFlagSets">

```php
$treatments = $splitClient->getTreatmentsByFlagSets('key', ['backend', 'server_side']);
 
echo json_encode($treatments);
```

</TabItem>
</Tabs>

You can also use the [Split Manager](#manager) to get all of your treatments at once.

### Get Treatments with Configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/setup/dynamic-configurations), you should use the `getTreatmentWithConfig` method. This method returns an object containing the treatment and associated configuration.

The config element is a stringified version of the configuration JSON defined in Harness FME. If there is no configuration defined for a treatment, the SDK returns `null` for the config parameter.

This method takes the exact same set of arguments as the standard `getTreatment` method. See below for examples on proper usage:

```php title="PHP"
$result = $splitClient->getTreatmentWithConfig("KEY", "FEATURE_FLAG_NAME", attributes);
$config = json_decode($result["config"], true);
$treatment = $result["treatment"];
```

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [getTreatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to SplitResult instead of strings. See example usage below:

<Tabs>
<TabItem value="getTreatmentsWithConfig">

```php
$TreatmentResults = $splitClient->getTreatmentsWithConfig('KEY', array('FEATURE_FLAG_NAME_1' 'FEATURE_FLAG_NAME_2'), attributes);
// TreatmentResults will have the following form: 
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }
```

</TabItem>
<TabItem value="getTreatmentsWithConfigByFlagSet">

```php
$treatments = $splitClient->getTreatmentsWithConfigByFlagSet('KEY', 'backend')
// $treatments will have the following form: 
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }
```

</TabItem>
<TabItem value="getTreatmentsWithConfigByFlagSets">

```php
$treatments = $splitClient->getTreatmentsWithConfigByFlagSets('KEY', ['backend', 'server_side'])
// $treatments will have the following form: 
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }
```

</TabItem>
</Tabs>

### Shutdown

Due to the nature of PHP and the way HTTP requests are handled, the client is instantiated on every request and automatically destroyed when the request lifecycle comes to an end. The data is stored in Redis, which is populated by an external synchronization tool, so it does not make sense to provide a shutdown method within the PHP client. If desired, you can manually start or stop the Split Synchronizer and flush the Redis database.

## Track 

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to  and allows you to measure the impact of your feature flags on your users’ actions and metrics.

Refer to the [Events](/docs/feature-management-experimentation/release-monitoring/events/) documentation for more information about using track events in feature flags. 

In the examples below you can see that the `.track()` method can take up to five arguments. The proper data type and syntax for each are:

* **key:** The `key` variable used in the `getTreatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) that you have defined in FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period. 
     * This is the regular expression we use to validate the value:<br />`[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**. 
* **PROPERTIES:** (Optional) An Map of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

:::warning[Redis Support]
If you are using our SDK with Redis, you need Split Synchronizer v2.3.0 version at least in order to support *properties* in the `track` method.
:::

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK was able to successfully queue the event to be sent back to Harness servers on the next event post. The SDK will return `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method has been provided.

In the case that a bad input has been provided, you can read more about our SDK's expected behavior in the [Events documentation](/docs/feature-management-experimentation/release-monitoring/events/). 

```php title="PHP 7.3+"
<?php
 
// If you would like to send an event without a value 
$trackEvent = $splitClient->track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE");
// Example
$trackEvent = $splitClient->track("john@doe.com", "user", "page_load_time");

// If you would like to associate a value to an event
$trackEvent = $splitClient->track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE);
// Example  
$trackEvent = $splitClient->track("john@doe.com", "user", "page_load_time", 83.334);

// If you would like to associate just properties to an event
$trackEvent = $splitClient->track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", null, {PROPERTIES});

// If you would like to associate a value and properties to an event
$trackEvent = $splitClient->track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES});
// Example
$properties = array(
    "package" => "premium",
    "admin" => true,
    "discount" => 50
);
$trackEvent = $splitClient->track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", 83.334, $properties);
```

## Configuration
 
With the SDK architecture, there is a set of options that you can configure to get everything connected and working as expected.

| **Option** | **Description** | 
| --- | --- | 
| labelsEnabled | Enable a descriptive label for each generated impression. Refer to the [Impressions data](#impressions-data) section below. |
| ipAddress | Manually set the IP address of your server to attach as metadata when impressions are sent. |
| log | Configure the log adapter and level. Refer to the [Logging](#logging) section. |
| cache | Configure the Redis cache adapter. Refer to the [Redis cache](#redis-cache) section. |
| impressionListener | Instance of an impression listener to send impression data to a custom location. |
| IPAddressesEnabled | Flag to disable IP addresses and host name from being sent to the Harness servers. |

```php title="PHP"
<?php
 
$sdkConfig = array(
   'labelsEnabled' => false,
   'ipAddress' => '15.2.34.123',
   'log' => array(...),
   'cache' => array(...),
);
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $sdkConfig);
$splitClient = $splitFactory->client();
```

### Impressions data

By default, our SDK sends small amounts of information to our backend about why your customer saw a given treatment from your app. An example would be that a user saw the `on` treatment because they were `in segment all`. This information can be useful for experiments and debugging. However, if you prefer to not send this information to our servers, you can turn it off by setting the SDK configuration option `labelsEnabled`.

### Redis cache

The Synchronizer Service stores its fetched data in the cache component. The SDK requires `predis` as the Redis cache adapter. For more information about `predis`, refer to the [Predis project](https://github.com/nrk/predis). 

```php title="PHP"
<?php
 
$parameters = ['scheme' => 'tcp', 
               'host' => REDIS_HOST, 
               'port' => REDIS_PORT, 
               'timeout' => 881
              ];
 
$options = ['prefix' => ''];
 
$sdkConfig = array(
    'cache' => array('adapter' => 'predis', 
                     'parameters' => $parameters, 
                     'options' => $options
                    )
);
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $sdkConfig);
$splitClient = $splitFactory->client();
```

#### Redis Sentinel

The SDK also supports Redis with Sentinel v2 replication. The client can be configured to operate with a single master and multiple slaves to provide high availability. The current version of Sentinel is 2. A stable release of Sentinel has been shipped since Redis 2.8. For further information about Sentinel, refer to the [Sentinel documentation](https://redis.io/topics/sentinel).

Use the following configuration for Redis in Sentinel mode.

| **Variable** | **Type** | **Description** |
| --- | --- | --- | 
| distributedStrategy | string | The strategy to be used. For Sentinel mode, the strategy is `sentinel`. |
| sentinels | array | The list of sentinels for replication service. |
| service | string | The name of master service. |

```php title="PHP"
<?php
 
$sentinels = array(
    'tcp://SENTINEL_HOST_1:SENTINEL_PORT_1?timeout=10',
    'tcp://SENTINEL_HOST_2:SENTINEL_PORT_2?timeout=10',
    'tcp://SENTINEL_HOST_3:SENTINEL_PORT_3?timeout=10'
);
 
$options = array(
    'distributedStrategy' => 'sentinel',
    'service' => 'SERVICE_MASTER_NAME',
    'prefix' => ''
);
 
$sdkConfig = array(
    'cache' => array('adapter' => 'predis',
                     'sentinels' => $sentinels,
                     'options' => $options
                    )
);
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $sdkConfig);
$splitClient = $splitFactory->client();
```

#### Redis cluster support

The SDK supports Redis with Cluster. Note that a stable release of Cluster has shipped since Redis 3.0. For further information about Redis Cluster, refer to the [Cluster documentation](https://redis.io/topics/cluster-spec).

Use the following configuration for Redis in Cluster mode.

| **Variable** | **Type** | **Description** |
| --- | --- | --- | 
| distributedStrategy | string | The strategy to be used. For Cluster mode, the strategy is `cluster`. |
| clusterNodes | array | The list of cluster nodes. | 
| keyHashTag | string | Custom hashtag to be used. Default value is `{SPLITIO}`. |
| keyHashTags | array | List of custom hashtags from which the SDK randomly picks one to use on the generated instance. If this is set, the tag on `keyHashTag` config is ignored. |

```php title="PHP"
<?php
 
$clusterNodes = array(
    'tcp://CLUSTER_NODE_1:CLUSTER_PORT_1?timeout=10',
    'tcp://CLUSTER_NODE_2:CLUSTER_PORT_2?timeout=10',
    'tcp://CLUSTER_NODE_3:CLUSTER_PORT_3?timeout=10'
);
 
$options = array(
    'distributedStrategy' => 'cluster',
    'prefix' => ''
);
 
$sdkConfig = array(
    'cache' => array('adapter' => 'predis',
                     'clusterNodes' => $clusterNodes,
                     'options' => $options
                    )
);
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $sdkConfig);
$splitClient = $splitFactory->client();
```

:::info[Redis Cluster]
The PHP SDK performs multi-key operations in certain methods such as `mget` (to return values of all specified keys) or `keys` (to return all the keys that matches a particular pattern) to avoid multiple calls to Redis. Redis Cluster does not allow these operations unless you use hashtags. Hashtags ensure that multiple keys are allocated in the same hash slot. The SDK allows you to use a custom key hashtag for storing keys. If this option is missing, it uses a default hashtag of `{SPLITIO}` when `cluster` mode is specified in the configuration. Keep in mind that multi-key operations may become unavailable during a resharding of the hash slots, calls to `getTreatments`, or `manager.splitNames()`, causing `featureFlagKeys` to fail.
:::

#### TLS Support

The client can leverage TLS/SSL encryption to connect to a secured remote Redis instance by using `tls` scheme and `ssl` options. 

```php title="PHP"
<?php
 
$parameters = [
                'scheme' => 'tls', 
                'ssl' => array(), 
                'host' => REDIS_HOST, 
                'port' => REDIS_PORT, 
            ];
 
$options = ['prefix' => ''];
 
$sdkConfig = array(
    'cache' => array('adapter' => 'predis', 
                     'parameters' => $parameters, 
                     'options' => $options
                    )
);
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $sdkConfig);
$splitClient = $splitFactory->client();
```

## Localhost mode

For testing, a developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, the SDK can be started in **localhost** mode (aka off-the-grid mode). In this mode, the SDK neither polls nor updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the features. 

To use the SDK in localhost mode, replace the SDK Key with "localhost", as shown in the example below:

```php title="PHP"
<?php
 
$splitFactory = \SplitIO\Sdk::factory('localhost');
$splitClient = $splitFactory->client();
```

In this mode, the SDK loads a mapping of feature flag name to treatment from a file at `$HOME/.split`. For a given feature flag, the treatment specified in the file is returned for every customer. 

`getTreatment` calls for a feature flag only return the one treatment that you defined in the file. You can then change the treatment as necessary for your testing in the file. Any feature flag that is not provided in the `featureFlags` map returns [the control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment) if the SDK is asked to evaluate them.

The format of this file is two columns separated by a whitespace. The left column is the feature flag name, and the right column is the treatment name. Here is a sample `.split` file.

```bash title="Shell"
## this is a comment
 
## sdk.getTreatment(*, reporting_v2) will return 'on'
reporting_v2 on
 
## sdk.getTreatment(*, double_writes_to_cassandra) will return 'off'
double_writes_to_cassandra off
 
## sdk.getTreatment(*, new-navigation) will return 'v3'
new-navigation v3
```

Since version 6.1.0, our SDK supports a new type of localhost feature flag definition file, using the YAML format. This new format allows the user to map different keys to different treatments within a single feature flag, and also adds configurations to them. The new format is a list of single-key maps (one per mapping feature-flag-keys-config), defined as follows:

```yaml title="YAML"
## - feature_flag_name:
##     treatment: "treatment_applied_to_this_entry"
##     keys: "single_key_or_list"
##     config: "{\"desc\" : \"this applies only to ON treatment\"}"
- my_feature:
    treatment: "on"
    keys: "key"
    config: "{\"desc\" : \"this applies only to ON treatment\"}"
- some_other_feature:
    treatment: "off"
- my_feature:
    treatment: "off"
```

In the example above, we have 3 entries:
 * The first entry defines that for feature flag `my_feature`, the key `key` returns the treatment `on` and the `on` treatment is tied to the configuration `{"desc" : "this applies only to ON treatment"}`.
 * The second entry defines that the feature flag `some_other_feature` always returns the `off` treatment and no configuration.
 * The third entry defines that `my_feature` always returns `off` for all keys that don't match another entry (in this case, any key other than `key`).


## Manager
 
Use the Split Manager to get a list of feature flags available to the SDK factory client.

To instantiate a Manager in your code base, use the same factory that you used for your client.

```php title="Manager"
<?php
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $options);
$splitManager = $splitFactory->manager();
```

The Manager then has the following methods available.

```php title="PHP"
<?php
namespace SplitIO\Sdk\Manager;
 
interface SplitManagerInterface
{
    /**
     * Retrieves the feature flags that are currently registered with the
     * SDK.
     *
     * @return array of \SplitIO\Sdk\Manager\SplitView
     */
    public function splits();
 
    /**
     * Returns the feature flags registered with the SDK of this name.
     *
     * @param $featureFlagName
     * @return \SplitIO\Sdk\Manager\SplitView
     */
    public function split($featureFlagName);
}
```

The `SplitView` object referenced above has the following structure.

```php title="PHP"
<?php
namespace SplitIO\Sdk\Manager;
 
class SplitView
{
    private $name;
    private $trafficType; // the name of the traffic type
    private $killed;
    private $treatments;
    private $changeNumber;
    private $configs;
  
  // Getter and Setter methods have been omitted
}
```

## Listener

FME SDKs send impression data back to Harness servers periodically when evaluating feature flags. To send this information to a location of your choice, define and attach an *impression listener*. Use the SDK's `impressionListener` parameter, where you can add an implementation of `ImpressionListener`. This implementation **must** define the `logImpression` method. It receives data in the following schema.

| **Name** | **Type** | **Description** |
| --- | --- | --- | 
| impression | impression | Impression object that has the feature flag name, treatment result, label, etc. |
| attributes | array | A list of attributes passed by the client. |
| instance-id | string | The IP address of the machine running the SDK. |
| sdk-language-version | string | The version of the SDK. In this case the language is `php` plus the version. |

## Implement a custom impression listener

Here is an example of how to implement a custom impression listener.

```php title="PHP"
// Implementation Sample for a Custom Impression Listener
class CustomImpressionListener implements \SplitIO\Sdk\ImpressionListener
{
    public function logImpression($data)
    {
        // Custom Behavior
    }
}
```

### Attach a custom impression listener 

Here is an example of how to attach a custom impression listener.

```php title="PHP"
$sdkConfig = array(
    'log' => ...
    'cache' => ...
    'impressionListener' => new CustomImpressionListener(),
);
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $sdkConfig);
$splitClient = $splitFactory->client();
```

## Logging
 
The SDK provides a custom logger that implements the [PSR-3 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md). **By default, the SDK logs to syslog and a WARNING log level.** To configure the logger, set the adapter and the desired log level.

:::warning[Production environments]
For production environments, we strongly recommend setting the adapter to **syslog** and avoid using the `echo` adapter. Even better, set your own custom adapter. See [Custom logging](#custom-logging) below.
:::

```php title="PHP - Logger configuration"
<?php
$sdkConfig = array(
    'log' => array('adapter' => 'syslog', 'level' => 'error')
);
 
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $sdkConfig);
$splitClient = $splitFactory->client();
```

The log configuration parameters are described below.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- | 
| adapter | The logger adapter. The SDK supports:<ul><li>**stdout:** Write log messages to standard output (php://stdout)</li><li>**syslog:** Generate a log message that is distributed by the system logger.</li><li>**void:** Prevent log writes.</li><li>**echo:** Echo messages to output. Note that the output could be the web browser.</li></ul> | syslog |
| level | The log level message. According the [PSR-3 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md) the supported levels are:<ul><li>emergency</li><li>alert</li><li>critical</li><li>error</li><li>warning</li><li>notice</li><li>info</li><li>debug</li></ul> | warning |
| psr3-instance | Your custom logger instance that implements the [PSR-3 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md) | null 

#### Custom logging

To integrate a third-party logger, follow this example of including the Zend logger.

```php title="PHP"
<?php
 
$zendLogLogger = new Zend\Log\Logger;
$psrLogger = new Zend\Log\PsrLoggerAdapter($zendLogLogger);
 
/** SDK options */
$options = [
    'log'   => ['psr3-instance' => $psrLogger],
];
 
/** Create the SDK factory client instance. */
$splitFactory = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $options);
$splitClient = $splitFactory->client();
```

Another example is [Monolog](https://github.com/Seldaek/monolog). Monolog sends your logs to files, sockets, inboxes, databases, and various web services. See the complete list of handlers in the [Monolog documentation](https://github.com/Seldaek/monolog/blob/master/doc/02-handlers-formatters-processors.md).

```php title="PHP"
<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
 
/** create a log channel */
$psrLogger = new Logger('SplitIO');
$psrLogger->pushHandler(new StreamHandler('path/to/your.log', Logger::WARNING));
 
/** SDK options */
$options = [
    'log'   => ['psr3-instance' => $psrLogger],
];
 
/** Create the client instance. */
$splitClient = \SplitIO\Sdk::factory('YOUR_SDK_KEY', $options);
```