---
title: With Split Synchronizer Docker image, control is always returned by getTreatment
sidebar_label: With Split Synchronizer Docker image, control is always returned by getTreatment
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360026249172-Using-SDK-with-Synchronizer-docker-getTreatment-is-always-returning-control </button>
</p>

## Issue

After installing the Split Synchronizer docker instance and running it successfully with Redis instance, then configuring SDK to use Redis, the getTreatment call is always returning 'control'.

## Root Cause

Synchronizer docker instance use a prefix for the Redis keys by default, if the SDK does not specify the same prefix in its redis configuration, it will not be able to read the Redis keys.

## Solution

1. Verify if the Synchronizer is using a prefix, run the commands below:
```
redis-cli
Keys *
```

2. Verify if there is any text before "SPLITIO" in the key names, the example below suggest "myprefix" is used:
```
127.0.0.1:6379> keys *
 1) "myprefix.SPLITIO.split.Split1"
 2) "myprefix.SPLITIO.splits.till"
 3) "myprefix.SPLITIO.split.Split2"
 4) "myprefix.SPLITIO.split.nico_test"
 5) "myprefix.SPLITIO.split.coach_matching_v1"
 6) "myprefix.SPLITIO.split.clients_on"
 7) "myprefix.SPLITIO.split.Split3"
 8) "myprefix.SPLITIO.split.sample_feature"
 9) "myprefix.SPLITIO.segments.registered"
10) "myprefix.SPLITIO.split.Demo_split"
11) "myprefix.SPLITIO.split.clients"
```

3. In your SDK code, add the configuration parameter for the redis-prefix, as shown in the example below for PHP SDK:
```php
from splitio import get_factory
config = {
  'redisHost' : 'localhost', 
  'redisPort' : 6379, 
  'redisDb' : 0, 
  'redisPassword' : 'somePassword',
  'redisPrefix' : 'myprefix'
}
```