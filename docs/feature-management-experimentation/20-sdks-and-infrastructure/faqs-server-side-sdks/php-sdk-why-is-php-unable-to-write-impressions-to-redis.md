---
title: "Why is PHP unable to write impressions to Redis throwing error \"NOAUTH Authentication required\"?"
sidebar_label: "Why is PHP unable to write impressions to Redis throwing error \"NOAUTH Authentication required\"?"
sidebar_position: 20
---

## Question

Why is PHP unable to write impressions to Redis throwing error "NOAUTH Authentication required"?

## Problem

Using PHP SDK, Redis and Split Synchronizer setup, when SDK code calls getTreatment function, an exception occurred:
```
Fetching item ** SPLITIO.split.test ** from cache getTreatment method is throwing exceptions NOAUTH Authentication required.
```

## Root cause

Redis instance requires authentication, the PHP code is missing the password parameter in the Redis configuration structure.
```
$options = ['prefix' => ''];
$sdkConfig = array(
  'cache' => array('adapter' => 'predis', 
                  'parameters' => $parameters, 
                  'options' => $options
                  )
);
```

## Solution

Since the PHP SDK uses Redis library, we can add the password parameter to the configuration structure:
```
$options = [
  'prefix' => '',
  'parameters' => [
      'password' => 'REDISPASSWORD'
  ],
];
$sdkConfig = array(
  'cache' => array('adapter' => 'predis', 
                  'parameters' => $parameters, 
                  'options' => $options
                  )
);
```