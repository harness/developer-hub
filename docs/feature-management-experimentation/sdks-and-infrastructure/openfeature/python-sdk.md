---
title: OpenFeature Provider for Python SDK
sidebar_label: Python OpenFeature Provider
sidebar_position: 8
description: Integrate OpenFeature with Harness FME in your Python applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your Python applications with Harness FME using the <Tooltip id="fme.openfeature.provider">Python OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME Python SDK.

This page walks you through installing, configuring, and using the Python OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your Python applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project  
- Python 3.9 or later  
- Access to `pip` to install dependencies  

### Version compatibility

| Component                                | Minimum Version |
| ---------------------------------------- | ---------------- |
| Python                                   | 3.9 +            |
| `@splitsoftware/split-openfeature-provider` | ≥ 1.0.0    |
| OpenFeature Python SDK                  | ≥ 0.8.1          |

## Install the provider and dependencies

Install the Harness FME OpenFeature provider using `pip`:

```bash
pip install split-openfeature-provider==1.0.0
```

## Configure the provider

You can register the provider with OpenFeature in one of several ways, depending on your setup.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="configure-provider-selection">
<TabItem value="sdk" label="SDK API Key">

This example demonstrates how to use the `SplitProvider`:

```python
from openfeature import api
from split_openfeature_provider import SplitProvider
config = {
      'impressionsMode': 'OPTIMIZED',
      'impressionsRefreshRate': 30,
    }
provider = SplitProvider({"SdkKey": "<YOUR_SDK_API_KEY>", "ConfigOptions": config, "ReadyBlockTime": 5})
api.set_provider(provider)
```

</TabItem>
<TabItem value="advanced" label="Split Client">

If you want access to [additional initialization options](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/python-sdk/#configuration), you can provide a Split client to the constructor:

```python
from openfeature import api
from split_openfeature_provider import SplitProvider
from splitio import get_factory

config = {
      'impressionsMode': 'OPTIMIZED',
      'impressionsRefreshRate': 30,
    }
factory = get_factory("<YOUR_SDK_API_KEY>", config=config)
factory.block_until_ready(5)
api.set_provider(SplitProvider({"SplitClient": factory.client()}))
```

</TabItem>
</Tabs>

## Construct an evaluation context

Provide an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip> with a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip> to evaluate flags. The evaluation context passes targeting information such as user IDs, email addresses, or plan types for flag targeting.

For example:

```python
from openfeature import api
from openfeature.evaluation_context import EvaluationContext

client = api.get_client("CLIENT_NAME")

context = EvaluationContext(targeting_key="TARGETING_KEY")
value = client.get_boolean_value("FLAG_NAME", False, context)
```

If the same targeting key is reused across evaluations, set the context at the client level:

```python
context = EvaluationContext(targeting_key="TARGETING_KEY")
client.context = context
```

Or at the API level: 

```python
context = EvaluationContext(targeting_key="TARGETING_KEY")
api.set_evaluation_context(context)
```

Once the context is set at the client or API level, you don't need to provide it for each evaluation.

## Asyncio mode

The Harness FME OpenFeature provider also supports [`asyncio` mode](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/python-sdk/#initialization-asyncio-mode).

For example: 

```python
from openfeature import api
from split_openfeature_provider import SplitProviderAsync
config = {
      'impressionsMode': 'OPTIMIZED',
      'impressionsRefreshRate': 30,
    }
provider = SplitProvider({"SdkKey": "<YOUR_SDK_API_KEY>", "ConfigOptions": config, "ReadyBlockTime": 5})
await provider.create()
api.set_provider(provider)
```

To create a Split client externally for `asyncio`:

```python
from openfeature import api
from split_openfeature_provider import SplitProviderAsync
from splitio import get_factory_async

config = {
      'impressionsMode': 'OPTIMIZED',
      'impressionsRefreshRate': 30,
    }
factory = get_factory_async("<YOUR_SDK_API_KEY>", config=config)
await factory.block_until_ready(5)
provider = SplitProviderAsync({"SplitClient": factory.client()})
await provider.create()
api.set_provider(provider)
```

For `asyncio` flag evaluation:

```python
from openfeature import api
from openfeature.evaluation_context import EvaluationContext

client = api.get_client("CLIENT_NAME")

context = EvaluationContext(targeting_key="TARGETING_KEY")
value = await client.get_boolean_value_async("FLAG_NAME", False, context)
```

## Logging

The Harness FME OpenFeature provider uses Python's [`logging` library](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/python-sdk/#logging). 

For example, this code sample sets all libraries using `logging` (including the provider itself) to use `DEBUG` mode:

```python
import logging

logging.basicConfig(level=logging.DEBUG)
```

## Shutting down the Split SDK factory

Before terminating the OpenFeature object, ensure the internal Split client shuts down properly.

For example: 

```python
from threading import Event

destroy_event = Event()
provider._split_client_wrapper._factory.destroy(destroy_event)
destroy_event.wait()
```

For `asyncio` mode:

```python
await provider._split_client_wrapper._factory.destroy()
```

For more information, go to the [Harness FME Python OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-python).