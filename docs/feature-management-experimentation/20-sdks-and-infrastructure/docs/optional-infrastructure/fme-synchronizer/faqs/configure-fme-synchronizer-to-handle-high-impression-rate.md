---
title: How to handle high impression rate with Split Synchronizer?
sidebar_label: How to handle high impression rate with  Split Synchronizer?
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016299232-Configure-Split-Synchronizer-to-handle-high-impression-rate </button>
</p>

## Question

When using a server-side Split SDK with the Split Synchronizer and Redis, what is the best configuration for Synchronizer to handle a high load of incoming impressions?

## Answer

The Split Synchronizer (version 1.6.0 and above) has configuration parameters that can be set to achieve this.

The Synchronizer documentation shows the [configuration parameter details](https://docs.split.io/docs/split-synchronizer#section-advanced-configuration). The specific parameters that control the performance are:
* impressionsMaxSize
* impressionsRefreshRate
* impressionsThreads
* impressionsPerPost

The impressionsMaxSize and impressionsPerPost parameters are configured according to the expected rate of incoming impressions. Since the Synchronizer is a multi-threaded process, increasing impressionsThreads can help shorten the time it takes to post impressions.

Below is a full configuration setting for Synchronizer that can post 100,000 impressions per minute.

Please make sure to update the JSON with the relevant API Key, Redis host, port and database number before applying it.

```
{
  "apiKey": "YOUR_API_KEY",
  "proxy": {
    "port": 3000,
    "adminPort": 3010,
    "adminUsername": "",
    "adminPassword": "",
    "dashboardTitle": "",
    "persistInFilePath": "",
    "impressionsMaxSize": 10485760,
    "eventsMaxSize": 10485760,
    "auth": {
      "sdkAPIKeys": [
        "SDK_API_KEY"
      ]
    }
  },
  "redis": {
    "host": "localhost",
    "port": 6379,
    "db": 0,
    "password": "",
    "prefix": "",
    "network": "tcp",
    "maxRetries": 0,
    "dialTimeout": 5,
    "readTimeout": 10,
    "writeTimeout": 5,
    "poolSize": 10,
    "sentinelReplication": false,
    "sentinelAddresses": "",
    "sentinelMaster": ""
  },
  "sync": {
    "admin": {
      "adminPort": 3010,
      "adminUsername": "",
      "adminPassword": "",
      "dashboardTitle": ""
    }
  },
  "log": {
    "verbose": false,
    "debug": false,
    "stdout": false,
    "file": "/tmp/split-agent.log",
    "fileMaxSizeBytes": 2000000,
    "fileBackupCount": 3,
    "slackChannel": "",
    "slackWebhookURL": ""
  },
  "impressionListener": {
    "endpoint": ""
  },
  "splitsRefreshRate": 60,
  "segmentsRefreshRate": 60,
  "impressionsRefreshRate": 20,
  "impressionsPerPost": 10000,
  "impressionsThreads": 5,
  "eventsPushRate": 60,
  "eventsConsumerReadSize": 10000,
  "eventsConsumerThreads": 1,
  "metricsRefreshRate": 60,
  "httpTimeout": 60
}
```

##See also

For more information on setup and configuration, see [Split Synchronizer Runbook](https://help.split.io/hc/en-us/articles/360018343391-Split-Synchronizer-Runbook).