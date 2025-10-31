---
title: PHP Thin Client SDK
sidebar_label: PHP Thin Client SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our PHP Thin SDK. All of our SDKs are open source. Go to our [PHP Thin SDK GitHub repository](https://github.com/splitio/php-thin-client) to learn more.

## Language support

The PHP Thin SDK supports PHP language version 7.3 and later.

## Architecture

The PHP Thin SDK depends on the [Split Daemon (splitd)](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-daemon-splitd) which should be set up on the same host. The PHP Thin SDK factory client uses splitd to maintain the local cached copy of the FME definitions and return feature flag evaluations.

## Initialization

### 1. Import the SDK into your project

```php title="PHP"
composer require splitsoftware/thin-sdk:1.5.0
```

The public release of the PHP Thin SDK is available at [packagist.org](https://packagist.org/packages/splitsoftware/thin-sdk).

### 2. Set up the splitd service

When the composer is done, follow the guidance of our [Split Daemon (splitd)](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-daemon-splitd) doc to integrate splitd into your application infrastructure.

### 3. Instantiate the SDK and create a new SDK factory client

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

```php title="PHP"
<?php

require_once '../vendor/autoload.php';

use \SplitIO\ThinSdk\Factory;

$factory = Factory::withConfig([
    'transfer' => ['address' => 'path/to/socket/file.sock'],
    'logging' => ['level' => \Psr\Log\LogLevel::INFO],
]);

$client = $factory->client();
```

## Using the SDK
 
### Basic use

After you instantiate the SDK factory client, you can start using the `getTreatment` method of the SDK factory client to decide what version of your features your customers are served. The method requires the `FEATURE_FLAG_NAME` attribute that you want to ask for a treatment and a unique `key` attribute that corresponds to the end user that you want to serve the feature to.

From there, you simply need to use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning [the control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment).

```php title="PHP"
<?php
// The key here represents the ID of the user/account/etc you're trying to evaluate a treatment for
$treatment = $client->getTreatment('key', 'bucketingKey', 'FEATURE_FLAG_NAME', null);
 
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
 
$treatment = $client->getTreatment('key', 'bucketingKey', 'FEATURE_FLAG_NAME', $attributes);
 
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
$treatments = $client->getTreatments('key', 'bucketingKey', ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'], null);

echo json_encode($treatments);
```

</TabItem>
<TabItem value="getTreatmentsByFlagSet">

```php
$treatments = $client->getTreatmentsByFlagSet('key', 'bucketingKey', 'backend', null);

echo json_encode($treatments);
```

</TabItem>
<TabItem value="getTreatmentsByFlagSets">

```php
$treatments = $client->getTreatmentsByFlagSets('key', 'bucketingKey', ['backend', 'server_side'], null);

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
$result = $splitClient->getTreatmentWithConfig("KEY", null, "FEATURE_FLAG_NAME", attributes);
$config = json_decode($result["config"], true);
$treatment = $result["treatment"];
```

If you need to get multiple evaluations at once, you can also use the `getTreatmentsWithConfig` methods. These methods take the exact same arguments as the [`getTreatments`](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to SplitResult instead of strings. See example usage below:

```php title="PHP"
$TreatmentResults = $splitClient->getTreatmentsWithConfig("KEY", null, ["FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2"], attributes);
// TreatmentResults will have the following form: 
// {
//   FEATURE_FLAG_NAME_1: {treatment: 'on',
//                  config: "{ 'color' : 'red'}}",
//   FEATURE_FLAG_NAME_2: {treatment: 'v2',
//                  config: "{ 'copy' : 'better copy'}}",
// }
```

### Shutdown

Due to the nature of PHP and the way HTTP requests are handled, the client is instantiated on every request and automatically destroyed when the request lifecycle comes to an end. The data is synchronized by an external tool and stored in memory, so the SDK factory client does not need to invoke any shutdown tasks.

## Track 

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to  and allows you to measure the impact of your feature flags on your users’ actions and metrics.

Refer to the [Events](/docs/feature-management-experimentation/release-monitoring/events/) documentation for more information about using track events in feature flags.

In the examples below you can see that the `.track()` method can take up to five arguments. The proper data type and syntax for each are:

* **key:** The `key` variable used in the `getTreatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) that you have defined in Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value:<br />`[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) A Map of key value pairs that can be used to filter your metrics. Learn more about event property capture in the [Events](/docs/feature-management-experimentation/release-monitoring/events/#event-properties) guide. FME currently supports three types of properties: strings, numbers, and booleans.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the event was successfully queued to be sent back to Harness servers on the next event post. The SDK will return `false` if the current queue on the Split Daemon is full or if an incorrect input to the `track` method has been provided.

In the case that a bad input has been provided, you can read more about our SDK's expected behavior in the [Events documentation](/docs/feature-management-experimentation/release-monitoring/events/).

```php title="PHP 7.3+"
<?php

// If you would like to send an event without a value
$trackEvent = $splitClient->track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", null, null);
// Example
$trackEvent = $splitClient->track("john@doe.com", "user", "page_load_time", null, null);

// If you would like to associate a value to an event
$trackEvent = $splitClient->track("KEY", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, null);
// Example
$trackEvent = $splitClient->track("john@doe.com", "user", "page_load_time", 83.334, null);

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
| transfer | IPC socket parameters (type, address, timeouts) | 
| logging | Logging parameters |
| utils | Instance of an impression listener to send impression data to a custom location |

```php title="PHP"
<?php
 
$sdkConfig = [
   'transfer' => ['address' => '/var/run/splitd.sock'],
   'logging' => ['psr-instance' => $myLogger],
];
 
$splitFactory = \SplitIO\ThinSdk\Factory::withConfig($sdkConfig);
$splitClient = $splitFactory->client();
```

### Impressions data

By default, the SDK sends small amounts of information to the Harness servers indicating the reason for each treatment returned from a feature flag. An example would be that a user saw the `on` treatment because they are `in segment all`.

## Manager
 
Use the Split Manager to get a list of feature flags available to the SDK factory client.

To instantiate a Manager in your code base, use the same factory that you used for your client.

```php title="Manager"
<?php

$splitManager = $splitFactory->manager();
```

The Manager then has the following methods available.

```php title="PHP"
<?php

namespace SplitIO\ThinSdk;

use SplitIO\ThinSdk\SplitView;

interface ManagerInterface
{
    /**
     * Retrieves the names of feature flags that are currently registered with the
     * SDK.
     *
     * @return array of strings
     */
    function splitNames(): array;

/**
     * Returns the feature flags registered with the SDK of this name.
     *
     * @param $featureFlagName
     * @return \SplitIO\ThinSdk\SplitView
     */
    function split(string $featureFlagName): ?SplitView;

/**
     * Retrieves the feature flags that are currently registered with the
     * SDK.
     *
     * @return array of \SplitIO\ThinSdk\SplitView
     */
    function splits(): array;
}
```

The `SplitView` object referenced above has the following structure.

```php title="PHP"
<?php
namespace SplitIO\ThinSdk;
 
class SplitView
{
    private $name;
    private $trafficType; // the name of the traffic type
    private $killed;
    private $treatments;
    private $changeNumber;
    private $configs;
    private $defaultTreatment;
    private $sets;
  
  // Getter and Setter methods have been omitted
}
```

## Listener
    
FME SDKs send impression data back to Harness servers periodically when evaluating feature flags. To send this information to a location of your choice, define an *impression listener*. Use the `impressionListener` parameter, where you can provide an implementation of an `ImpressionListener`. This implementation **must** define the `accept` method, with the signature `public function accept(Impression $impression, ?array $attributes)` and with parameters as defined below.

| **Name** | **Type** | **Description** |
| --- | --- | --- | 
| impression | SplitIO\ThinSdk\Models\Impression | Impression object that has the feature name, treatment result, label, etc. |
| attributes | ?array | A list of attributes passed by the client. |

## Implement a custom impression listener

Here is an example of how to implement a custom impression listener.

```php title="PHP"
use \SplitIO\ThinSdk\Utils\ImpressionListener;
use \SplitIO\ThinSdk\Models\Impression;

class CustomListener implements ImpressionListener
{
    public function accept(Impression $i, ?array $a)
    {
        echo "got an impression for: key=".$i->getKey()
            ." feat=".$i->getFeature()
            ." treatment=".$i->getTreatment()
            ." label=".$i->getLabel()
            ." cn=".$i->getChangeNumber()
            ." #attrs=".(($a == null) ? 0 : count($a))."\n";
    }
}
```

### Attach a custom impression listener 

Here is an example of how to attach a custom impression listener.

```php title="PHP"
$sdkConfig = [
   'transfer' => ['address' => '/var/run/splitd.sock'],
   'logging' => ['psr-instance' => $myLogger],
   'utils' => ['impressionListener' => new \App\Utils\CustomListener()], ## <-- custom listener
];
 
$splitFactory = \SplitIO\ThinSdk\Factory::withConfig($sdkConfig);
$splitClient = $splitFactory->client();
```

## Logging
 
The SDK provides a custom logger that implements the [PSR-3 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md). **By default, the SDK logs to stdout at the INFO log level.** To configure the logger, set the adapter and the desired log level.

:::warning[Production environments]
For production environments, we strongly recommend passing a proper `psr-instance` parameter with a PSR3 compliant logger (or custom wrapper for a non-cmpliant one).
:::

```php title="PHP - Logger configuration"
<?php
$sdkConfig = [
   'logging' => ['level' => \Psr\Log\LogLevel::DEBUG],
);
 
$splitFactory = \SplitIO\ThinSdk\Factory::withConfig($sdkConfig);
$splitClient = $splitFactory->client();
```

The log configuration parameters are described below.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- | 
| level | The log level message. According the [PSR-3 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md) the supported levels are:<ul><li>emergency</li><li>alert</li><li>critical</li><li>error</li><li>warning</li><li>notice</li><li>info</li><li>debug</li><li>info</li></ul>
| psr-instance | Your custom logger instance that implements the [PSR-3 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md) | null 

#### Custom logging

You can integrate a third-party logger to format logging or to push logging info to a configurable location.

##### Zend logger

The [Zend logger](https://docs.zendframework.com/zend-log/) can be integrated with the SDK as shown below.

```php title="PHP"
<?php
 
$zendLogLogger = new Zend\Log\Logger;
$psrLogger = new Zend\Log\PsrLoggerAdapter($zendLogLogger);
 
/** SDK options */
$sdkConfig = [
    'logging'   => ['psr-instance' => $psrLogger],
];
 
/** Create the client instance. */
$splitFactory = \SplitIO\ThinSdk\Factory::withConfig($sdkConfig);
$splitClient = $splitFactory->client();
```

##### Monolog

[Monolog](https://github.com/Seldaek/monolog) sends your logs to files, sockets, inboxes, databases, and various web services. See the complete list of handlers in the [Monolog documentation](https://github.com/Seldaek/monolog/blob/master/doc/02-handlers-formatters-processors.md).

The following is a demonstration of Monolog integration for the SDK.

```php title="PHP"
<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
 
/** create a log channel */
$psrLogger = new Logger('SplitIO');
$psrLogger->pushHandler(new StreamHandler('path/to/your.log', Logger::WARNING));
 
/** SDK options */
$sdkConfig = [
    'logging'   => ['psr-instance' => $psrLogger],
];
 
/** Create the client instance. */
$splitFactory = \SplitIO\ThinSdk\Factory::withConfig($sdkConfig);
$splitClient = $splitFactory->client();
```