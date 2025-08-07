---
title: Block traffic until the SDK is ready
sidebar_label: Block traffic until the SDK is ready
sidebar_position: 5
---

## Question

When the SDK is instantiated, it kicks off background tasks to update an in-memory cache with small amounts of data fetched from Harness servers. This process can take up to a few hundred milliseconds, depending on the size of data. While the SDK is in this intermediate state, if it is asked to evaluate which treatment to show to a customer for a specific feature flag, it may not have data necessary to run the evaluation. In this circumstance, the SDK does not fail, rather it returns the Control treatment. How can I avoid this?

## Answer

You can wait to send traffic by blocking until the SDK is ready. This is best done as part of the startup sequence of your application. Here is an example in Ruby:

```
require 'splitclient-rb'options = {block_until_ready:10 }
begin  split_factory = SplitIoclient::SplitFactoryBuilder.build("YOUR_API_KEY", options)  split_client = split_factory.client
rescue SplitIoClient::SDKBlockerTimeoutExpiredException
  puts "SDK Failed to initialize in the time requested"
end
```