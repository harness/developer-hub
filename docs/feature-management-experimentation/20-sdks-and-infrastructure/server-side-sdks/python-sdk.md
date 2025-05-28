---
title: Python SDK
sidebar_label: Python SDK
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020359652-Python-SDK </button>
</p>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed information about our Python SDK. All of our SDKs are open source. Go to our [Python SDK GitHub repository](https://github.com/splitio/python-client) to learn more.

## Language support

The Python SDK supports Python 3 (3.7.16 or later).

## Multi-thread, multi-process and asyncio modes support

One of Python's great built-in features is the ability to parallelize your code to optimize the execution-performance of any module. You can implement your project in a multi-threaded, multi-process or asyncio mode, depending on what works best for you and your team.

Please note, multiple processes in Python are unable to share memory space, so the setup and instantiation process is different for each mode.

Jump to the setup process for the mode your application is built in:

* [Multi-threaded SDK initialization](#initialization-multi-threaded-mode)
* [asyncio SDK initialization](#initialization-asyncio-mode)
* [Multi-process SDK initialization](#initialization-multi-process-mode)

(Note: Django projects are multi-process by default)

## Initialization: Multi-threaded mode

Set up FME in your code base with two simple steps.

### 1. Import the SDK into your project using pip

```bash title="Shell"
pip install 'splitio_client[cpphash]==10.2.0'
```

### 2. Instantiate the SDK and create a new SDK factory client

:::danger[If upgrading an existing SDK - Block until ready changes]
Starting in version `8.0.0`, readiness has been migrated to a two part implementation. See below for syntax changes you must make if upgrading your SDK to the newest version.
:::

When the SDK is instantiated in `in-memory` mode, it kicks off background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds depending on the size of data. If the SDK is asked to evaluate which treatment to show to a customer for a specific feature flag while its in this intermediate state, it may not have the data necessary to run the evaluation. In this case, the SDK doesn't fail, rather, it returns [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

To make sure the SDK is properly loaded before asking it for a treatment, block until the SDK is ready.
Since version `8.0.0` This is done by calling the `.block_until_ready()` method in the factory object.
This method also accepts a maximum time (in seconds or fractions of it) to wait until the SDK is ready, or throw an exception in case it's not.

We recommend instantiating the SDK factory once as a singleton and reusing it throughout your application.

Configure the SDK with the SDK key for the FME environment that you would like to access. In legacy Split (app.split.io) the SDK key is found on your Admin settings page, in the API keys section. Select a server-side SDK API key. See [API keys](https://help.split.io/hc/en-us/articles/360019916211) to learn more.

```python title="Python"
from splitio import get_factory
from splitio.exceptions import TimeoutException

factory = get_factory('YOUR_SDK_KEY')
try:
    factory.block_until_ready(5) ## wait up to 5 seconds
except TimeoutException:
    ## Now the user can choose whether to abort the whole execution, or just keep going
    ## without a ready client, which if configured properly, should become ready at some point.
    pass
split = factory.client()
```

Now you can start asking the SDK to evaluate treatments for your customers.

## Initialization: asyncio mode

Python's asyncio library had gather lot of attention and support and provides many advantages to multi-threaded programming especially in I/O operations, checkout the [official doc](https://docs.python.org/3/library/asyncio.html) for more info.

Set up FME in your code base with two simple steps.

### 1. Import the SDK into your project using pip

```bash title="Shell"
pip install 'splitio_client[cpphash,asyncio]==10.2.0'
```

### 2. Instantiate the SDK and create a new SDK factory client

:::danger[asyncio support]
Starting in version `10.0.0`, SDK support asyncio library, this required a breaking change to upgrade the python supported version to be 3.7.16 or later.
:::

:::info[asyncio support]
When using the SDK, regardless if the mode is asyncio or Multi-threaded, all the public SDK API are identical, with only one exception; when initializing the factory.
:::

Similar to Multi-threaded mode, when the SDK is instantiated in `in-memory`, it kicks off background asyncio tasks to update an in-memory cache with small amounts of data fetched from Harness servers. To make sure the SDK cache is properly loaded before asking it for a treatment, utilize `block_until_ready()` method.

We recommend instantiating the SDK once as a singleton and reusing it throughout your application.

Use the code snippet below and plug in your API key. The API key is available on your **Organization Settings** page, on the **APIs** tab. The API key is of type `sdk`. For more information, see [Understanding API Keys](https://help.split.io/hc/en-us/articles/360019916211-API-keys).

```python title="Python"
from splitio import get_factory_async
from splitio.exceptions import TimeoutException

async def main():
    factory = await get_factory_async('YOUR_SDK_KEY')
    try:
        await factory.block_until_ready(5) ## wait up to 5 seconds
    except TimeoutException:
        ## Now the user can choose whether to abort the whole execution, or just keep going
        ## without a ready client, which if configured properly, should become ready at some point.
        pass
    split = factory.client()

loop = asyncio.new_event_loop()
loop.run_until_complete(main())
```

For the following sections, please lookup the `asyncio` tab in each code example block.

## Initialization: Multi-process mode

There are a few extra steps for setting up our SDK with Python in multi-process mode, described below. Before hopping into the details, we will quickly review the multi-process mode setup differences.

### SDK architecture

When the application is run in a server that spawns multiple processes (workers) to handle HTTP requests, all of them need to access fetched feature flags and segments as well as queuing up impressions and events. Since processes cannot access each other's memory, using the standalone operation mode will result in several sets of synchronisation tasks (threads) doing the same job (at least one per http worker - possibly more, since workers are often restarted).
To avoid this scenario, the Split.IO SDK for Python supports an alternative operation mode, which uses an external tool called `Split-Synchronizer` and a `redis` cache. Our synchronization tool is responsible for maintaining the FME data updated and flushing impressions, events and metrics to the split servers.
If you are using a preforked-type server such as uWSGI or GUnicorn, we also offer a series of methods that can be attached to the server's "post-fork" hooks in order to ensure synchronization runs properly on the worker process after the master is forked.

The previously mentioned approaches are described in depth below:

* [Redis cache and client setup](#redis-cache-and-client-setup)
* [Preforked client setup](#preforked-client-setup)

### Redis cache and client setup

Before you get started with the cache, download the correct version of Redis to your machine. Our SDK Redis integration requires a Redis version `2.10.5` or later. Also want to make sure to start your Redis server. Refer to the [Redis documentation](https://redis.io/topics/quickstart) for help. After that, there are a few more steps to set up the cache with Redis.

#### 1. Install the SDK into your project

Use `pip install` to install the SDK. Note that the package is different for standard Python and for Django, as shown below.

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```bash
pip install 'splitio_client[redis,cpphash]==10.2.0'
```

</TabItem>
<TabItem value="asyncio">

```bash
pip install 'splitio_client[redis,cpphash,asyncio]==10.2.0'
```

</TabItem>
<TabItem value="Django">

```bash
pip install django_splitio[redis]==2.4.0
```

</TabItem>
</Tabs>

:::warning[If using Synchronizer with Redis - Synchronizer 2.x required for SDK Version `7.0` and onwards]
Since version `2.0.0` of the split-synchronizer, we use a more efficient scheme to store impressions in Redis. This approach is faster and easier on your Redis instances, since it yields better throughput of impressions to the backend. If you use this SDK with the Synchronizer in Redis or Proxy mode, you will need the newest versions of our Split Synchronizer. It is recommended that once you're using SDK versions compatible with Split-Sync 2.0 on all your applications pointing to the redis instance maintained by the Split-Sync, you disable backwards compatibility (this is as easy as changing a parameter to `true` on the JSON config or an environment variable to `on` if you're using the docker image).
:::

#### 2. Set up the Split Synchronizer

Set up the [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) to sync data to a Redis cache. Follow the steps in the [set up article](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer), then come back to this doc and go to step 3 to instantiate the client, below.

#### 3. Instantiate the SDK factory client with Redis enabled

If you are using Django, there is one extra step to add `django_splitio` to `INSTALLED_APPS` in your Django settings and add a SPLITIO dictionary in the Django settings. Input your own SDK key in for `YOUR_SDK_KEY`.

To instantiate the SDK factory client, copy and paste the code snippet below into your code base where you want to use Harness FME to roll out your feature flag. Again, note that the syntax is different for standard Python and for Django.

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
from splitio import get_factory

config = {
  'redisHost' : 'localhost',
  'redisPort' : 6379,
  'redisDb' : 0,
  'redisPassword' : 'somePassword',
  ## if the user access is not the default 'root' user, inlcude parameter below
  'redisUsername' : 'username',
  ## if you've set a redis prefix also include that in the config
  'redisPrefix' : 'your prefix that you defined'
}

factory = get_factory('YOUR_SDK_KEY', config=config)
split = factory.client()
```

</TabItem>
<TabItem value="asyncio">

```python
from splitio import get_factory_async

async def main():
    config = {
    'redisHost' : 'localhost',
    'redisPort' : 6379,
    'redisDb' : 0,
    'redisPassword' : 'somePassword',
    ## if the user access is not the default 'root' user, inlcude parameter below
    'redisUsername' : 'username',
    ## if you've set a redis prefix also include that in the config
    'redisPrefix' : 'your prefix that you defined'
    }

    factory = await get_factory_async('YOUR_SDK_KEY', config=config)
    split = factory.client()

loop = asyncio.new_event_loop()
loop.run_until_complete(main())
```

</TabItem>
<TabItem value="Django">

```python
## In your django config:
INSTALLED_APPS = (
        ...
        'django_splitio',
        ...
    )

SPLITIO = {
    'apiKey': 'YOUR_SDK_KEY',
    'labelsEnabled': True,
    'redisHost': 'localhost',
    'redisPort': 6379,
    'redisDb': 0,
    'redisPassword': 'somePassword'
    ## if the user access is not the default 'root' user, inlcude parameter below
    'redisUsername' : 'username',
    ## if you've set a redis prefix also include that in the config
    'redisPrefix' : 'your prefix that you defined'
}

## -------------------------

## in any module where the sdk is to be used.
from django_splitio import get_factory

factory = get_factory()
client = factory.client()
```

</TabItem>
</Tabs>

Now you can start asking the SDK to evaluate treatments for your customers.

#### Redis Sentinel

The SDK also supports Redis with Sentinel (v2) replication. The client can be configured to operate with single master/multiple slaves to provide high availability. The current version of Sentinel is `2`. A stable release of Sentinel has been shipped since Redis `2.8`. For further information about Sentinel, refer to the [Sentinel documentation](https://redis.io/topics/sentinel).

Use the following configuration for Redis in Sentinel mode.

| **Variable** | **Type** | **Description** |
| --- | --- | --- |
| redisSentinels | array | The list of sentinels for replication service. |
| redisMasterService | string | The name of master service. |

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
from splitio import get_factory

config = {
    'redisDb': 0,
    'redisPrefix': '',
    'redisSentinels': [('SENTINEL_HOST_1', SENTINEL_PORT_1), ('SENTINEL_HOST_2', SENTINEL_PORT_2), ('SENTINEL_HOST_3', SENTINEL_PORT_3)],
    'redisMasterService': 'SERVICE_MASTER_NAME',
    'redisSocketTimeout': 5
}

factory = get_factory('SDK_KEY', config=config)
split = factory.client()
```

</TabItem>
<TabItem value="asyncio">

```python
from splitio import get_factory_async

async def main():
    config = {
        'redisDb': 0,
        'redisPrefix': '',
        'redisSentinels': [('SENTINEL_HOST_1', SENTINEL_PORT_1), ('SENTINEL_HOST_2', SENTINEL_PORT_2), ('SENTINEL_HOST_3', SENTINEL_PORT_3)],
        'redisMasterService': 'SERVICE_MASTER_NAME',
        'redisSocketTimeout': 5
    }

    factory = await get_factory_async('SDK_KEY', config=config)
    split = factory.client()

loop = asyncio.new_event_loop()
loop.run_until_complete(main())
```

</TabItem>
<TabItem value="Django">

```python
## In your django config:
INSTALLED_APPS = (
        ...
        'django_splitio',
        ...
    )

SPLITIO = {
    'apiKey': 'YOUR_SDK_KEY',
    'labelsEnabled': True,
    'redisSentinels': [('SENTINEL_HOST_1', SENTINEL_PORT_1),   ('SENTINEL_HOST_2', SENTINEL_PORT_2), ('SENTINEL_HOST_3', SENTINEL_PORT_3)],
    'redisMasterService': 'SERVICE_MASTER_NAME',
    'redisDb': 0,
    'redisPassword': 'somePassword',
    'redisSocketTimeout': 5
    ## if the user access is not the default 'root' user, inlcude parameter below
    'redisUsername' : 'username'
}

## -------------------------

## in any module where the sdk is to be used.
from django_splitio import get_factory

factory = get_factory()
client = factory.client()
```

</TabItem>
</Tabs>

#### Redis Cluster

This functionality is currently not supported for this SDK, but is planned for a future release. Subscribe to our [release notes](https://www.split.io/releases) for updates.

### Preforked client setup

Since version `8.4.0` we added support for running our SDK in standalone mode in preforked multiprocess servers. With this feature you can take advantage of using FME in preforking servers such as GUnicorn or uWSGI and attaching it to the `postfork` hooks. This can yield significant performance improvements in terms of memory in comparison to use lazy-style initialization and greatly reduced evaluation time in comparison to use Redis + Split Synchronizer approach at the expense of CPU and BG network traffic.
There are two main steps for initializating the SDK by using hooks:
1. `preforkedInitialization`: this is a new configuration option that will tell the SDK that it should initiate the SDK in master mode and it will not start polling nor streaming.
2. `factory.resume()`: this is a new method provided by the factory that should be executed on newly forked http worker processes in order to resume synchronisation.

:::warning
Preforked client is not supported in asyncio mode.
:::

#### Example using uWSGI preforked server

#### Adding postfork handler

There are a few extra steps to set up SDK with `postfork` option.
1. Importing the `uwsgidecorators` module for handling hooks.
2. Set `preforkedInitialization` as true in the sdk configs.
3. Add and use the `postfork` decorator.
5. Call `factory.resume()` method to resume tasks on each forked child process.

**Note:** Make sure to add the parameter `--enable-threads` to enable multi-threading when starting the UWSGI app server. While Python SDK does support UWSGI app server in process based mode, for the SDK to synchronize with Harness FME servers, you need to enable the multi-threading option, as the background threads perform the synching task. For example:

```bash title="Shell"
uwsgi --http :8080 --chdir /var/app --wsgi-file ${WSGI_PATH} ${UWSGI_MODULE} --master
--processes ${UWSGI_NUM_PROCESSES} --uid ${UWSGI_UID} --gid ${UWSGI_GID} -t ${UWSGI_TIMEOUT}
--http-keepalive --add-header ${UWSGI_HEADERS} --buffer-size ${UWSGI_BUFFER_SIZE}
--enable-threads
```

<Tabs groupId="python-mode">
<TabItem value="Standard Python">

```python
import logging
import uwsgi
from uwsgidecorators import postfork  ## Step 1


logging.basicConfig(level=logging.DEBUG)

## more code ...

SPLIT = get_factory(
    'YOUR_SDK_KEY',
    config={
        'preforkedInitialization': True,  ## Step 2
    },
)


@postfork ## Step 3
def post_fork_execution():
    SPLIT.resume()  ## Step 4
    SPLIT.block_until_ready(5)

## more code ...
```

</TabItem>
<TabItem value="Django">

```python
## In your django config:
INSTALLED_APPS = (
        ...
        'django_splitio',
        ...
    )
 SPLITIO = {
        'apiKey': 'YOUR_SDK_KEY',
        'preforkedInitialization': True ## Step 2
    }
## -------------------------
## in setup FME module
from django_splitio import get_factory


global SPLIT


def setup():
    global SPLIT
    if 'SPLIT' in globals():
        return
    SPLIT = get_factory()

## in master module
import logging
import uwsgi
from uwsgidecorators import postfork  ## Step 1
from django_splitio_testapp.split_wrapper import setup


logging.basicConfig(level=logging.DEBUG)
setup()


@postfork ## Step 3
def post_fork():
    from django_splitio_testapp.split_wrapper import SPLIT
    SPLIT.resume() ## Step 4
    SPLIT.block_until_ready(5)

## more code ...

```

</TabItem>
</Tabs>

For further reading about uwsgi decorators and postfork you can take a look at the [official documentation](https://uwsgi-docs.readthedocs.io/en/latest/PythonDecorators.html#uwsgidecorators.postfork)

## Using the SDK

### Basic use

After you instantiate the SDK factory client, you can start using the `get_treatment` method of the SDK factory client to decide what version of your feature flags your customers are served. The method requires the `FEATURE_FLAG_NAME` attribute that you want to ask for a treatment and a unique `key` attribute that corresponds to the end user that you want to serve the feature to.

From there, you simply need to use an if-else-if block as shown below and insert the code for the different treatments that you defined in Harness FME. Remember the final else branch in your code to handle the client returning [the control treatment](/docs/feature-management-experimentation/feature-management/control-treatment).

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
## The key here represents the ID of the user/account/etc you're trying to evaluate a treatment for
treatment = split.get_treatment('key', 'FEATURE_FLAG_NAME')

if treatment == "on":
    ## insert code here to show on treatment
elif treatment == "off":
    ## insert code here to show off treatment
else:
    ## insert your control treatment code here
```

</TabItem>
<TabItem value="asyncio">

```python
## The key here represents the ID of the user/account/etc you're trying to evaluate a treatment for
treatment = await split.get_treatment('key', 'FEATURE_FLAG_NAME')

if treatment == "on":
    ## insert code here to show on treatment
elif treatment == "off":
    ## insert code here to show off treatment
else:
    ## insert your control treatment code here
```

</TabItem>
</Tabs>

:::info[key should be String]
If the `key` attribute is something other than `string`, Python SDK returns `CONTROL` after evaluation.
:::

### Attribute syntax

To [target based on custom attributes](/docs/feature-management-experimentation/feature-management/target-with-custom-attributes), the SDK's `get_treatment` method needs to be passed an attribute map at runtime.

In the example below, we are rolling out a feature flag to users. The provided attributes `plan_type`, `registered_date`, `permissions`, `paying_customer`, and `deal_size` are passed to the `get_treatment` call. These attributes are compared and evaluated against the attributes used in the rollout plan as defined in Harness FME to decide whether to show the `on` or `off` treatment to this account.

The `get_treatment` method supports five types of attributes: strings, numbers, dates, booleans, and sets. The proper data type and syntax for each are:

* **Strings:** Use type String.
* **Numbers:** Use type Integer.
* **Dates: ** Express the value as the number of seconds since the epoch as seconds in UTC. For example, attribute `registered_date` is `arrow.utcnow().timestamp`, which is an integer.
* **Booleans:** Use type Boolean.
* **Sets:** Use type Set.

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
import arrow
from splitio import get_factory

factory = get_factory('YOUR_SDK_KEY')
split = factory.client()

attributes = dict()
attributes['plan_type'] = 'growth'
attributes['registered_date'] = arrow.utcnow().timestamp
attributes['deal_size'] = 1000
attributes['paying_customer'] = True

treatment = split.get_treatment("key", "FEATURE_FLAG_NAME", attributes)

if treatment == "on":
    ## insert on code here
elif treatment == "off":
    ## insert off code here
else:
    ## insert control code here
```

</TabItem>
<TabItem value="asyncio">

```python
import arrow
from splitio import get_factory_async

async def main():
    factory = await get_factory_async('YOUR_SDK_KEY')
    split = factory.client()

    attributes = dict()
    attributes['plan_type'] = 'growth'
    attributes['registered_date'] = arrow.utcnow().timestamp
    attributes['deal_size'] = 1000
    attributes['paying_customer'] = True

    treatment = await split.get_treatment("key", "FEATURE_FLAG_NAME", attributes)

    if treatment == "on":
        ## insert on code here
    elif treatment == "off":
        ## insert off code here
    else:
        ## insert control code here

loop = asyncio.new_event_loop()
loop.run_until_complete(main())
```

</TabItem>
</Tabs>

### Multiple evaluations at once

In some instances, you may want to evaluate treatments for multiple feature flag at once. Use the different variations of `get_treatments` method from the SDK factory client to do this.
* `get_treatments`': Pass a list of the feature flag names you want treatments for.
* `get_treatments_by_flag_set`: Evaluate all flags that are part of the provided set name and are cached on the SDK instance.
* `get_treatments_by_flag_sets`: Evaluate all flags that are part of the provided set names and are cached on the SDK instance.

**Multi-threaded**

<Tabs>
<TabItem value="get_treatments">

```python
treatments = split.get_treatments('key', ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'])

print(treatments)
```

</TabItem>
<TabItem value="get_treatments_by_flag_set">

```python
treatments = split.get_treatments_by_flag_set('key', 'backend')

print(treatments)
```

</TabItem>
<TabItem value="get_treatments_by_flag_sets">

```python
treatments = split.get_treatments_by_flag_sets('key', ['backend', 'server_side'])

print(treatments)
```

</TabItem>
</Tabs>

**asyncio**

<Tabs>
<TabItem value="get_treatments">

```python
treatments = await split.get_treatments('key', ['FEATURE_FLAG_NAME_1', 'FEATURE_FLAG_NAME_2'])

print(treatments)
```

</TabItem>
<TabItem value="get_treatments_by_flag_set">

```python
treatments = await split.get_treatments_by_flag_set('key', 'backend')

print(treatments)
```

</TabItem>
<TabItem value="get_treatments_by_flag_sets">

```python
treatments = await split.get_treatments_by_flag_sets('key', ['backend', 'server_side'])

print(treatments)
```

</TabItem>
</Tabs>

### Get Treatments with Configurations

To [leverage dynamic configurations with your treatments](/docs/feature-management-experimentation/feature-management/dynamic-configurations), you should use the `get_treatment_with_config` method.

This method will return an object containing the treatment and associated configuration.

The config element will be a stringified version of the configuration JSON defined in Harness FME. If there are no configs defined for a treatment, the SDK returns `None` for the config parameter.

This method takes the exact same set of arguments as the standard `get_treatment` method. See below for examples on proper usage:

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python

treatment, raw_config = client.get_treatment_with_config('key', 'FEATURE_FLAG_NAME', attributes)
configs = json.loads(raw_config)

if treatment == 'on':
    ## insert on code here and use configs here as necessary
else if treatment == 'off':
    ## insert off code here and use configs here as necessary
else:
    ## insert control code here
```

</TabItem>
<TabItem value="asyncio">

```python

treatment, raw_config = await client.get_treatment_with_config('key', 'FEATURE_FLAG_NAME', attributes)
configs = json.loads(raw_config)

if treatment == 'on':
    ## insert on code here and use configs here as necessary
else if treatment == 'off':
    ## insert off code here and use configs here as necessary
else:
    ## insert control code here
```

</TabItem>
</Tabs>

If you need to get multiple evaluations at once, you can also use the `get_treatments_with_config` methods.
These methods take the exact same arguments as the [get_treatments](#multiple-evaluations-at-once) methods but return a mapping of feature flag names to SplitResult objects instead of strings. Example usage below:

**Multi-threaded**

<Tabs>
<TabItem value="get_treatments_with_config">

```python
feature_flag_names = ['FEATURE_FLAG_1', 'FEATURE_FLAG_2']
split_results = client.get_treatments_with_config('key', feature_flag_names)

 ## split_results will have the following form:
 ## {
 ##   'FEATURE_FLAG_1': ('on', '{"color": "red"}'),
 ##   'FEATURE_FLAG_2': ('v2', '{"copy": "better copy"}')
 ## }
```

</TabItem>
<TabItem value="get_treatments_with_config_by_flag_set">

```python
attributes = {}
result = split.get_treatments_with_config_by_flag_set('key', 'backend', attributes)
for feature_flag, treatment_with_config in result.items():
  treatment = treatment_with_config[0]
  configs = treatment_with_config[1]
  print("Feature: %s, Treatment: %s, Config: %s" % (feature_flag, treatment, configs))
```

</TabItem>
<TabItem value="get_treatments_with_config_by_flag_sets">

```python
attributes = {}
result = split.get_treatments_with_config_by_flag_sets('key', 'backend', attributes)
for feature_flag, treatment_with_config in result.items():
  treatment = treatment_with_config[0]
  configs = treatment_with_config[1]
  print("Feature: %s, Treatment: %s, Config: %s" % (feature_flag, treatment, configs))
```

</TabItem>
</Tabs>

**asyncio**

<Tabs>
<TabItem value="get_treatments_with_config">

```python
feature_flag_names = ['FEATURE_FLAG_1', 'FEATURE_FLAG_2']
split_results = await client.get_treatments_with_config('key', feature_flag_names)

 ## split_results will have the following form:
 ## {
 ##   'FEATURE_FLAG_1': ('on', '{"color": "red"}'),
 ##   'FEATURE_FLAG_2': ('v2', '{"copy": "better copy"}')
 ## }
```

</TabItem>
<TabItem value="get_treatments_with_config_by_flag_set">

```python
attributes = {}
result = await split.get_treatments_with_config_by_flag_set('key', 'backend', attributes)
for feature_flag, treatment_with_config in result.items():
  treatment = treatment_with_config[0]
  configs = treatment_with_config[1]
  print("Feature: %s, Treatment: %s, Config: %s" % (feature_flag, treatment, configs))
```

</TabItem>
<TabItem value="get_treatments_with_config_by_flag_sets">

```python
attributes = {}
result = await split.get_treatments_with_config_by_flag_sets('key', ['backend'], attributes)
for feature_flag, treatment_with_config in result.items():
  treatment = treatment_with_config[0]
  configs = treatment_with_config[1]
  print("Feature: %s, Treatment: %s, Config: %s" % (feature_flag, treatment, configs))
```

</TabItem>
</Tabs>

### Shutdown

The in-memory implementation of Python uses threads in Multi-threaded mode and tasks in asyncio mode to synchronize feature flags, segments, and impressions. If at any point in the application the SDK factory client is not longer needed, you can disable it by calling the `destroy()` method on the factory object.

This does NOT kill the threads or tasks if they are synchronizing, but prevents them from rescheduling for future executions.

When you call the `.destroy()` method from the client, any subsequent call to `get_treatment()`returns `CONTROL`, and when querying `splits` or `split_names` via the manager interface, an empty list `[]` is returned.

Since version `8.0.0` .destroy() accepts an optinal argument of type `threading.Event`. This allows the user to have control of the shutdown cycle of the SDK.
The user can for example choose to block the application until destroy() has finished, so that all the impressions and events are flushed correctly before the application shuts down.

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
stop_event = threading.Event()
factory.destroy(stop_event)
stop_event.wait()
sys.exit(0)
```

</TabItem>
<TabItem value="asyncio">

```python
await factory.destroy()
sys.exit(0)
```

</TabItem>
</Tabs>

:::warning[Important!]
A call to the `destroy()` method also destroys the factory object. When creating new client instance, first create a new factory instance.
:::

## Track

Use the `track` method to record any actions your customers perform. Each action is known as an `event` and corresponds to an `event type`. Calling `track` through one of our SDKs or via the API is the first step to  and allows you to measure the impact of your feature flags on your users’ actions and metrics.

[Learn more](https://help.split.io/hc/en-us/articles/360020585772) about using track events in splits.

In the examples below you can see that the `.track()` method can take up to five arguments. The proper data type and syntax for each are:

* **key:** The `key` variable used in the `get_treatment` call and firing this track event. The expected data type is **String**.
* **TRAFFIC_TYPE:** The traffic type of the key in the track call. The expected data type is **String**. You can only pass values that match the names of [traffic types](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) that you have defined in Harness FME.
* **EVENT_TYPE:** The event type that this event should correspond to. The expected data type is **String**. Full requirements on this argument are:
     * Contains 63 characters or fewer.
     * Starts with a letter or number.
     * Contains only letters, numbers, hyphen, underscore, or period.
     * This is the regular expression we use to validate the value:<br />`[a-zA-Z0-9][-_\.a-zA-Z0-9]{0,62}`
* **VALUE:** (Optional) The value to be used in creating the metric. This field can be sent in as null or 0 if you intend to purely use the count function when creating a metric. The expected data type is **Integer** or **Float**.
* **PROPERTIES:** (Optional) A Map of key value pairs that can be used to filter your metrics. Learn more about event property capture [in the Events guide](https://help.split.io/hc/en-us/articles/360020585772-Events#event-properties). FME currently supports three types of properties: strings, numbers, and booleans.

**Redis Support:** If you are using our SDK with Redis, you need Split Synchronizer **2.3.0** version at least in order to support *properties* in the `track` method.

The `track` method returns a boolean value of `true` or `false` to indicate whether or not the SDK was able to successfully queue the event to be sent back to Harness servers on the next event post. The SDK will return `false` if the current queue size is equal to the config set by `eventsQueueSize` or if an incorrect input to the `track` method has been provided.

In the case that a bad input has been provided, you can read more about our SDK's expected behavior [here](https://help.split.io/hc/en-us/articles/360020585772-Track-events)

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
# If you would like to send an event without a value
trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE")
# Example
trackEvent = client.track("john@doe.com", "user", "page_load_time")

# If you would like to associate a value to an event
trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE)
# Example
trackEvent = client.track("john@doe.com", "user", "page_load_time", 83.334)

# If you would like to associate just properties to an event
trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", None, {PROPERTIES})

# If you would like to associate a value and properties to an event
trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES})
# Example
properties = {
    "package": "premium",
    "admin": true,
    "discount": 50
}
trackEvent = client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", 83.334, properties)
```

</TabItem>
<TabItem value="asyncio">

```python
# If you would like to send an event without a value
trackEvent = await client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE")
# Example
trackEvent = await client.track("john@doe.com", "user", "page_load_time")

# If you would like to associate a value to an event
trackEvent = await client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE)
# Example
trackEvent = await client.track("john@doe.com", "user", "page_load_time", 83.334)

# If you would like to associate just properties to an event
trackEvent = await client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", None, {PROPERTIES})

# If you would like to associate a value and properties to an event
trackEvent = await client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", VALUE, {PROPERTIES})
# Example
properties = {
    "package": "premium",
    "admin": true,
    "discount": 50
}
trackEvent = await client.track("key", "TRAFFIC_TYPE", "EVENT_TYPE", 83.334, properties)
```

</TabItem>
</Tabs>

## Configuration

The SDK has a number of knobs for configuring performance. Each knob is tuned to a reasonable default. However, you can override the value while instantiating the SDK. The parameters available for configuration are shown below.

| **Configuration** | **Description** | **Default value** | **Applies to** |
| --- | --- | --- | --- |
| featuresRefreshRate | The SDK polls Harness servers for changes to feature flags at this period (in seconds). | 30 seconds | In-memory. |
| segmentsRefreshRate  | The SDK polls Harness servers for changes to segments at this period (in seconds).  | 30 seconds  | In-memory. |
| impressionsRefreshRate | The treatment log captures which customer saw what treatment (on, off, and so on) at what time. This log is periodically flushed back to Harness servers. This configuration controls how quickly the cache expires after a write (in seconds). | 300 seconds | In-memory. |
| metricsRefreshRate | The SDK caches diagnostic data that it periodically sends to Harness servers. This configuration controls how frequently this data is sent back to Harness servers (in seconds). | 3600 seconds | In-memory. |
| eventsPushRate | How often the SDK sends events to the backend. | 10 seconds | In-memory. |
| labelsEnabled | Disable labels from being sent to Harness servers. Labels may contain sensitive information. | true | All operation modes.  |
| connectionTimeout | HTTP client connection timeout (in ms).  | 1500ms | In-memory. |
| apiKey | The SDK key. This entry is mandatory. If `localhost` is supplied as the SDK key, a localhost only client is created when `get_client` is called. | None  | All operation modes. |
| redisHost | The host that contains the Redis instance. | localhost | Redis-based storage setup. |
| redisPort | The port of the Redis instance. | 6379 | Redis-based storage setup. |
| redisDb | The db index on the Redis instance. | 0 | Redis-based storage setup. |
| redisUsername | The user name for Redis. | None | Redis-based storage setup. |
| redisPassword | The password for Redis. | None | Redis-based storage setup. |
| redisPrefix | The prefix for each key written in Redis by the SDK. | None | Redis-based storage setup. |
| redisSsl | Enable encrypted connections to redis. | False | Redis-based storage setup. |
| redisSslKeyfile | Client key used to decrypt incoming responses. | None | Redis-based storage setup. |
| redisSslCertfile | Client certificate to prove client's identity to the server. | None | Redis-based storage setup. |
| redisSslCertReqs | Whether to validate the server public key or blindly accept it and use it. | None | Redis-based storage setup. |
| redisSslCaCerts | CA Root certificates capable of validating the certificate presented by the server. | None | Redis-based storage setup. |
| redisLocalCacheEnabled | Enable a local in-memory cache on top of redis for fetching feature flags. | True | Redis-based storage setup. |
| redisLocalCacheTTL | How long to cache feature flags in memory (in seconds). | 5 | Redis-based storage setup. |
| redisSocketTimeout | Socket Timeout for Redis. | None | Redis-based storage setup. |
| redisSocketConnectTimeout | Socket Connection Timeout for Redis. | None | Redis-based storage setup. |
| redisRetryOnTimeout | If retries for Redis operations would be performed by the SDK if it receives a timeout. | False | Redis-based storage setup. |
| preforkedInitialization | Flag for enabling fork execution (requires extra setup mentioned on the preforked client setup section). | False | Preforked running mode. |
| impressionListener | Custom implementation of impression listener interface. | None | Redis-based storage setup. |
| eventsQueueSize | Max number of events to accumulate before sending them to the backend. | 10000 | In-memory. |
| eventsBulkSize | How many events to package when submiting them to the split servers | 5000 | In-memory. |
| impressionsQueueSize | Max number of impressions to accumulate before sending them to the backend. | 10000 | In-memory. |
| impressionsBulkSize | How many impressions to package when submiting them to the split servers | 5000 | In-memory. |
| IPAddressesEnabled | Flag to disable IP addresses and host name from being sent to the Harness servers.  | True | Redis, In-memory. |
| impressionsMode | This configuration defines how impressions are queued on the SDK. Supported modes are OPTIMIZED, NONE, and DEBUG. In OPTIMIZED mode, only unique impressions are queued and posted to Harness; this is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Harness FME and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. In DEBUG mode, ALL impressions are queued and sent to Harness. Use DEBUG mode when you want every impression to be logged in Harness FME when trying to debug your SDK setup. This setting does not impact the impression listener which will receives all generated impressions. | `'optimized'` | In-memory operation mode. |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism. In the event of an issue with streaming, the SDK will fallback to the polling mechanism. If false, the SDK will poll for changes as usual without attempting to use streaming. | True | In-memory operation mode. |
| flagSetsFilter | This setting allows the SDK to only synchronize the feature flags in the specified flag sets, avoiding unused or unwanted flags from being synced on the SDK instance, bringing all the benefits from a reduced payload. | None |

:::info[Impression listener]
Starting with this version, the SDK removed the `impression_listener` parameter. If this parameter is passed, it is not handled by the SDK. If you want to attach a custom impression listener, send the new `impressionListener` parameter with an implementation of the impression listener interface.
:::

To set each of the parameters defined above, the syntax should be as seen below.

Note that if you are using Standard Python, you pass the configuration parameters as a dictionary to the factory. In Django, plug the configuration parameters in to the SPLITIO dictionary in your Django settings

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
from splitio import get_factory

configuration = {
    'metricsRefreshRate' : 60,
    'impressionsRefreshRate' : 60,
    'ready' : 0,
    'connectionTimeout' : 1500,
    'readTimeout' : 1500,
    'labelsEnabled' : True
}

factory = get_factory('YOUR_SDK_KEY', config=configuration)
split = factory.client()
```

</TabItem>
<TabItem value="asyncio">

```python
from splitio import get_factory_async

async def main():
    configuration = {
        'metricsRefreshRate' : 60,
        'impressionsRefreshRate' : 60,
        'ready' : 0,
        'connectionTimeout' : 1500,
        'readTimeout' : 1500,
        'labelsEnabled' : True
    }

    factory = await get_factory_async('YOUR_SDK_KEY', config=configuration)
    split = factory.client()

loop = asyncio.new_event_loop()
loop.run_until_complete(main())
```

</TabItem>
<TabItem value="Django">

```python
SPLITIO = {
    'apiKey': 'YOUR_SDK_KEY',
    'labelsEnabled': True,
    'redisHost': 'localhost',
    'redisPort': 6379,
    'redisDb': 0,
    'redisPassword': 'somePassword',
    ## if the user access is not the default 'root' user, inlcude parameter below
    'redisUsername' : 'username',
  	'featuresRefreshRate': 5,
    'segmentsRefreshRate' : 60,
    'metricsRefreshRate' : 60,
    'impressionsRefreshRate' : 60,
}
```

</TabItem>
</Tabs>

## Localhost mode

A developer can put code behind feature flags on their development machine without the SDK requiring network connectivity. To achieve this, the SDK can be started in **localhost** mode (aka off-the-grid mode). In this mode, the SDK neither polls nor updates Harness servers. Instead, it uses an in-memory data structure to determine what treatments to show to the logged in customer for each of the features. To use the SDK in localhost mode, replace the SDK Key with "localhost", as shown in the example below:

With this mode, you can instantiate the SDKS using one of the following methods:

* JSON: Full support, for advanced cases or replicating an environment by pulling rules from Harness FME servers (from version `9.4.0`).
* YAML: Supports dynamic configs, individual targets, and default rules (from version `8.0.0`).
* .split: Legacy option, only treatment result.

### JSON

Since version `9.4.0`, our SDK supports localhost mode by using the JSON format. This version allows the user to map feature flags and segment definitions in the same format as the APIs that receive the data. This mode needs the following extra configuration to be set:

| **Name** | **Description** | **Type** |
| --- | --- | --- |
| splitFile | Indicates the path of the feature flag file location to read | string |
| segmentDirectory | Indicates the path where all the segment files are located | string |
| localhostRefreshEnabled | Flag to run synchronization refresh for feature flags and segments in localhost mode. | bool |

#### splitFile

The following splitFile is a JSON that represents a SplitChange:

<Tabs>
<TabItem value="SplitChange Schema">

```python
class SplitChange(object):
    """SplitChange class"""

    @prperty
    def splits(self):
    """return splits"
        return self._splits

    @property
    def since(self):
    """return since epoch time"""
        return self._since

    @property
    def till(self)
    """return till epoch time"""
        return self._till
```

</TabItem>
<TabItem value="Split Schema">

```python
class Split(object):
    """Split model object."""

    @property
    def name(self):
        """Return name."""
        return self._name

    @property
    def seed(self):
        """Return seed."""
        return self._seed

    @property
    def algo(self):
        """Return hash algorithm."""
        return self._algo

    @property
    def killed(self):
        """Return whether the feature flag has been killed."""
        return self._killed

    @property
    def default_treatment(self):
        """Return the default treatment."""
        return self._default_treatment

    @property
    def traffic_type_name(self):
        """Return the traffic type of the feature flag."""
        return self._traffic_type_name

    @property
    def status(self):
        """Return the status of the feature flag."""
        return self._status

    @property
    def change_number(self):
        """Return the change number of the feature flag."""
        return self._change_number

    @property
    def conditions(self):
        """Return the condition list of the feature flag."""
        return self._conditions

    @property
    def traffic_allocation(self):
        """Return the traffic allocation percentage of the feature flag."""
        return self._traffic_allocation

    @property
    def traffic_allocation_seed(self):
        """Return the traffic allocation seed of the feature flag."""
        return self._traffic_allocation_seed
```

</TabItem>
<TabItem value="JSON example">

```json
{
  "splits": [
    {
      "trafficTypeName": "user",
      "name": "feature_flag_1",
      "trafficAllocation": 100,
      "trafficAllocationSeed": -1364119282,
      "seed": -605938843,
      "status": "ACTIVE",
      "killed": false,
      "defaultTreatment": "off",
      "changeNumber": 1660326991072,
      "algo": 2,
      "configurations": {},
      "conditions": [
        {
          "conditionType": "ROLLOUT",
          "matcherGroup": {
            "combiner": "AND",
            "matchers": [
              {
                "keySelector": {
                  "trafficType": "user",
                  "attribute": null
                },
                "matcherType": "IN_SEGMENT",
                "negate": false,
                "userDefinedSegmentMatcherData": {
                  "segmentName": "segment_1"
                },
                "whitelistMatcherData": null,
                "unaryNumericMatcherData": null,
                "betweenMatcherData": null,
                "booleanMatcherData": null,
                "dependencyMatcherData": null,
                "stringMatcherData": null
              }
            ]
          },
          "partitions": [
            {
              "treatment": "on",
              "size": 0
            },
            {
              "treatment": "off",
              "size": 100
            }
          ],
          "label": "in segment segment_1"
        },
        {
          "conditionType": "ROLLOUT",
          "matcherGroup": {
            "combiner": "AND",
            "matchers": [
              {
                "keySelector": {
                  "trafficType": "user",
                  "attribute": null
                },
                "matcherType": "ALL_KEYS",
                "negate": false,
                "userDefinedSegmentMatcherData": null,
                "whitelistMatcherData": null,
                "unaryNumericMatcherData": null,
                "betweenMatcherData": null,
                "booleanMatcherData": null,
                "dependencyMatcherData": null,
                "stringMatcherData": null
              }
            ]
          },
          "partitions": [
            {
              "treatment": "on",
              "size": 50
            },
            {
              "treatment": "off",
              "size": 50
            }
          ],
          "label": "default rule"
        }
      ]
    }
  ],
  "since": -1,
  "till": 1660326991072
}
```

</TabItem>
</Tabs>

#### segmentDirectory

The provided segment directory must have the JSON files of the corresponding segment linked to previous feature flag definitions. According to the Feature flag file sample above: `feature_flag_1` has `segment_1` linked. That means that the segmentDirectory must have `segment_1` definition.

<Tabs>
<TabItem value="SegmentChange Schema">

```python
class SegmentChange(object):
    """SegmentChange object class."""

    @property
    def name(self):
        """Return segment name."""
        return self._name

    @property
    def added(self):
        """Return the segment keys to be added."""
        return self._added

    @property
    def removed(self):
        """Return the segment keys to be removed."""
        return self._removed

    @property
    def since(self):
    """return since epoch time"""
        return self._since

    @property
    def till(self)
    """return till epoch time"""
        return self._till
```

</TabItem>
<TabItem value="JSON example">

```json
{
  "name": "segment_1",
  "added": [
    "example1",
    "example2"
  ],
  "removed": [],
  "since": -1,
  "till": 1585948850110
}
```

</TabItem>
</Tabs>

**Init example**
<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
config = {
            'splitFile': 'parentRoot/splits.json',
            'segmentDirectory': '/parentRoot/segments',
            'localhostRefreshEnabled': True
        }
factory = get_factory('localhost', config = config)

try:
    factory.block_until_ready(5) ## wait up to 5 seconds
except TimeoutException:
    print("SDK TIMED OUT")

```

</TabItem>
<TabItem value="asyncio">

```python
from splitio import get_factory_async

async def main():
    config = {
                'splitFile': 'parentRoot/splits.json',
                'segmentDirectory': '/parentRoot/segments',
                'localhostRefreshEnabled': True
            }
    factory = await get_factory_async('localhost', config = config)

    try:
        await factory.block_until_ready(5) ## wait up to 5 seconds
    except TimeoutException:
        print("SDK TIMED OUT")

loop = asyncio.new_event_loop()
loop.run_until_complete(main())

```

</TabItem>
</Tabs>

### YAML

Since version 8.0.0, our SDK supports a new type of localhost feature flag definition file, using the YAML format. This new format allows the user to map different keys to different treatments within a single feature flag, and also add configurations to them. The new format is a list of single-key maps (one per mapping feature-flag-keys-config), defined as follows:

```yaml title="YAML"
# - feature_flag_name:
#     treatment: "treatment_applied_to_this_entry"
#     keys: "single_key_or_list"
#     config: "{\"desc\" : \"this applies only to ON treatment\"}"

- my_feature_flag:
    treatment: "on"
    keys: "key"
    config: "{\"desc\" : \"this applies only to ON treatment\"}"
- some_other_feature_flag:
    treatment: "off"
- my_feature_flag:
    treatment: "off"
```

In the example above, we have 3 entries:
 * The first entry defines that for feature flag `my_feature_flag`, the key `key` will return the treatment `on` and the `on` treatment will be tied to the configuration `{"desc" : "this applies only to ON treatment"}`.
 * The second entry defines that the feature flag `some_other_feature_flag` will always return the `off` treatment and no configuration.
 * The third entry defines that `my_feature_flag` will always return `off` for all keys that don't match another entry (in this case, any key other than `key`).

### .SPLIT file

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
from splitio import get_factory

factory = get_factory('localhost')
split = factory.client()
```

</TabItem>
<TabItem value="asyncio">

```python
from splitio import get_factory_async

async def main():
    factory = await get_factory_async('localhost')
    split = factory.client()

loop = asyncio.new_event_loop()
loop.run_until_complete(main())
```

</TabItem>
</Tabs>

In this mode, the SDK loads a mapping of Feature Flag name to treatment from a file at `$HOME/.split`. For a given feature flag, the treatment specified in the file is returned for every customer. Should you want to use another file, you just need to set the `splitFile` key in the configuration dictionary passed at instantiation time, to the full path of the desired file.


The following is a sample `.split` file. The format of this file is two columns separated by a whitespace. The left column is the feature flag name, and the right column is the treatment name.

```bash title="Shell"
## sdk.get_treatment(*, reporting_v2) returns 'on'
reporting_v2 on

double_writes_to_cassandra off

new-navigation v3
```

## Manager

Use the Split Manager to get a list of feature flags available to the SDK factory client.

To instantiate a Manager in your code base, use the same factory that you used for your client.

```python title="Manager"
split = factory.client()
manager = factory.manager()
```

The Manager then has the following methods available.

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
class SplitManager(object):
    def split_names(self):
        """Returns the names of feature flags registered with the SDK. Subclasses need to override this method.
        :return: A list of str
        :rtype: list
        """
        raise NotImplementedError()

        def splits(self):
        """Retrieves the feature flags that are currently registered with the SDK. Subclasses need to override this method.
        :return: A List of SplitView.
        :rtype: list
        """
        raise NotImplementedError()

    def split(self, feature_flag_name):
        """Returns the Feature Flag registered with the SDK of this name. Subclasses need to override this method.
        :return: The SplitView instance.
        :rtype: SplitView
        """
        raise NotImplementedError()
```

</TabItem>
<TabItem value="asyncio">

```python
class SplitManagerAsync(object):
    async def split_names(self):
        """Returns the names of feature flags registered with the SDK. Subclasses need to override this method.
        :return: A list of str
        :rtype: list
        """
        raise NotImplementedError()

    async def splits(self):
        """Retrieves the feature flags that are currently registered with the SDK. Subclasses need to override this method.
        :return: A List of SplitView.
        :rtype: list
        """
        raise NotImplementedError()

    async def split(self, feature_flag_name):
        """Returns the Feature Flag registered with the SDK of this name. Subclasses need to override this method.
        :return: The SplitView instance.
        :rtype: SplitView
        """
        raise NotImplementedError()
```

</TabItem>
</Tabs>

The `SplitView` object that you see referenced above has the following structure.

```python title="SplitView"
SplitView = namedtuple('SplitView', ['name', 'traffic_type', 'killed', 'treatments', 'change_number', 'configs', 'default_treatment', 'sets', 'impressions_disabled'])
```

## Listener

FME SDKs send impression data back to Harness servers periodically when evaluating feature flags. To send this information to a location of your choice, define and attach an *impression listener*. Use the SDK's `impressionListener` parameter, where you can add an implementation of `ImpressionListener`. This implementation **must** define the `log_impression` method. It receives data in the following schema.

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| impression | impression | Impression object that has the feature name, treatment result, label, etc. |
| attributes | array | A list of attributes passed by the client. |
| instance-id | string | The IP address of the machine running the SDK. |
| sdk-language-version | string | The version of the SDK. In this case the language is `python` plus the version. |

## Implement a custom impression listener

Here is an example of how implement a custom impression listener.

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
# Import ImpressionListener interface
from splitio.impressions import ImpressionListener

# Implementation Sample for a Custom Impression Listener
class CustomImpressionListener(ImpressionListener)
{
  def log_impression(self, data):
    ## Custom behavior
}
```

</TabItem>
<TabItem value="asyncio">

```python
# Import ImpressionListener interface
from splitio.impressions import ImpressionListener

# Implementation Sample for a Custom Impression Listener
class CustomImpressionListener(ImpressionListener)
{
  async def log_impression(self, data):
    # Custom behavior
}
```

</TabItem>
</Tabs>

## Attach a custom impression listener

Here is an example of how to implement a custom impression listener.

<Tabs groupId="python-mode">
<TabItem value="Multi-threaded">

```python
from splitio import get_factory

factory = get_factory(
  'YOUR_SDK_KEY',
  config={
    ## ...
    'impressionListener': CustomImpressionListener()
  },
  ## ...
)
split = factory.client()
```

</TabItem>
<TabItem value="asyncio">

```python
from splitio import get_factory_async

async def main():
    factory = await get_factory_async(
    'YOUR_SDK_KEY',
    config={
        ## ...
        'impressionListener': CustomImpressionListener()
    },
    ## ...
    )
    split = factory.client()

loop = asyncio.new_event_loop()
loop.run_until_complete(main())
```

</TabItem>
</Tabs>

## Logging

Since version `8.3.0` the loggers use a hierarchical approach, which enable the user to handle all split-sdk related logs either as a whole or as independent components. Each module has it's own logger, the root being `splitio`.
Below is an example of simple usage.

```python title="Multi-threaded"
import logging
logger = logging.getLogger('splitio')
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.WARNING)
```

For asyncio mode, since the SDK uses the same logger library, we suggest to create a custom listener to fetch logging lines in a separate thread to avoid any blocking in asyncio tasks during I/O logging operations, see example below:

```python title="asyncio"
import asyncio
import logging
import logging.handlers
import time
from queue import SimpleQueue
from splitio import get_factory

queue = SimpleQueue()
queue_handler = logging.handlers.QueueHandler(queue)
listener = logging.handlers.QueueListener(
    queue,
    logging.StreamHandler(),
    logging.FileHandler('split.log'),
)
logger = logging.getLogger()
logFormatter = logging.Formatter('%(asctime)s %(name)-12s %(levelname)-8s %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
queue_handler.setFormatter(logFormatter)
logger.addHandler(queue_handler)
logger.setLevel('DEBUG')
logger.propagate = False
lhStdout = logger.handlers[0]
logger.removeHandler(lhStdout)

listener.start()

async def main():
    factory = get_factory('YOUR_SDK_KEY')
    split = factory.client()

try:
    loop = asyncio.new_event_loop()
    loop.run_until_complete(main())
finally:
    listener.stop()
```

For older versions, to set a specific location or logging threshold, use the following syntax.

```python title="Python"
import logging

#Set logging configuration.
logging.basicConfig(filename='example.log',level=logging.WARNING)
```

## Proxy

You can configure proxies by setting the environment variables `HTTP_PROXY` and `HTTPS_PROXY`. The SDK uses those variables to perform the server request.

```python title="Example: Environment variables"
$ export HTTP_PROXY="http://10.10.1.10:3128"
$ export HTTPS_PROXY="http://10.10.1.10:1080"
```
