---
title: Using the Ruby SDK with Rails and Sidekiq Service
sidebar_position: 9
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-server-side-sdks/ruby-sdk-example-using-sdk-with-rails-and-sidekiq-service/
---

## Overview

This example demonstrates a basic usage of the Ruby SDK integrated with a Rails application and Sidekiq background service to evaluate feature flags asynchronously.

This [example project](https://github.com/sanzmauro/poc-test-split-io/tree/split-with-sidekiq) requires an environment with Ruby 2.7.5.

## Setup

Follow the README instructions in the repo for detailed setup steps.

Running Sidekiq:

```bash
bundle exec sidekiq -e ${RACK_ENV:-development} -r ./sidekiq/config/application.rb -C ./sidekiq/config/sidekiq.yml
```

Running Rails Server:

```bash
rails s
```

## Testing the Feature Flag Evaluation

Send an HTTP request to the Rails server endpoint:

```bash
http://localhost:3030/test_global_feature_flag?key=<SOME-VALUE>&split_name=<YOUR-SPLIT-NAME>
```

After sending the request, check the Sidekiq console logs to see the result of the feature flag evaluations.

This example illustrates how to combine Split's Ruby SDK with Rails and Sidekiq to handle feature flag evaluations in a background job, enabling scalable and asynchronous flag checks.