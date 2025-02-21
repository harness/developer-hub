---
title: "Why is PHP unable to write impressions to Redis"
sidebar_label: "Why is PHP unable to write impressions to Redis"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360018635072-Why-is-PHP-unable-to-write-impressions-back-to-Redis-throwing-error-NOAUTH-Authentication-required </button>
</p>

### Question

Why is PHP unable to write impressions to Redis throwing error "NOAUTH Authentication required"?

### Problem

Using PHP SDK, Redis and Split Synchronizer setup, when SDK code calls getTreatment function, an exception occurred:
```
Fetching item ** SPLITIO.split.test ** from cache getTreatment method is throwing exceptions NOAUTH Authentication required.
```

### Root cause

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

### Solution

Since the Split PHP SDK uses predis library, we can add the password parameter to the configuration structure:
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