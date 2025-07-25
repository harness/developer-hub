---
title: Split Synchronizer
sidebar_label: Split Synchronizer
sidebar_position: 4
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360019686092-Split-Synchronizer </button>
</p>

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

By default, FME's SDKs keep segment and feature flag data synchronized as users navigate across disparate systems, treatments, and conditions. However, some languages, do not have a native capability to keep a shared local cache of this data to properly serve treatments. For these cases, we built the Split Synchronizer service.

This tool coordinates the sending and receiving of data to a remote datastore that all of your processes can share to pull data for the evaluation of treatments. Out of the box, FME supports Redis as a remote datastore, and so the Split Synchronizer uses Redis as the cache for your SDKs when evaluating treatments. It also posts impression and event data and metrics generated by the SDKs back to Harness servers, for exposure in the user interface or sending to the data integration of your choice. The Synchronizer service runs as a standalone process in dedicated or shared servers and it does not affect the performance of your code, or FME's SDKs.

:::info[Split Synchronizer version 5.0 available!]
Since version 5.0.0 of the split-synchronizer, there's only one operation mode. What was once `proxy mode` is now a separate tool called [**Split proxy**](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-proxy). This version includes a more performant way to evict impressions & events from redis that allows customers to handle much greater volumes of data, while protecting your flags from being evicted if the redis instance runs low on memory.

Currently, the SDKs supported by this versions are:
Ruby 6.0.0
PHP 6.0.0
Node.js 10.6.0
Go 3.0.0
Python 7.0.0
.NET 4.0.0
Java 4.4.0
:::

:::warning
If you are upgrading from Split Synchronizer version 4.x or below to 5.x, some of the configuration and environment parameter names have been changed. Refer to the Configuration section and modify the parameters names accordingly.
:::

## Supported SDKs

The Split Synchronizer works with most of the languages that FME supports. 

* [PHP SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-sdk)
* [Python SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/python-sdk)
* [.NET SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/net-sdk)
* [Node.js SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/nodejs-sdk)
* [Ruby SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/ruby-sdk)
* [Go SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/go-sdk)
* [Java SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/java-sdk)

If you are looking for a language that is not listed here, contact the support team at [support@split.io](mailto:support@split.io) to discuss your options.

## Overall Architecture

**The service performs five actions:**

* **Fetch feature flags:** Retrieve the feature flag definitions.
* **Fetch segments:** Retrieve your set segments lists.
* **Post impressions:** Send to Harness servers the generated impressions by the SDK.
* **Post telemetry:** Send to Harness servers different metrics of the SDK, such as latencies.
* **Post events:** Send to Harness servers the generated events by the SDK `.track` method.

:::info[Split-Sync v5.0.0 pipelined data eviction]
Starting with split-sync v5.0.0, we've introduced a new approach to impressions and events eviction. This replaces the previous approach of periodically fetching & posting impressions and events. Our new approch feature flags this task in 3 parts, a thread dedicated to fetching data from redis and placing it in a buffer, N threads (where N is derived from the number of available CPU cores) dedicated to parsing, formatting the data and placing it in a second buffer, and N (configurable) threads that pick the data and post it to Harness servers. The result is a significant increase in throughput, that will better suit customers which operate on big volumes of data.
:::

### Architecture

![](./static/split-proxy-architecture.png)

## Setup

### Docker (recommended)

The service is available via Docker or command line and its source code is available at https://github.com/splitio/split-synchronizer.

 * Pull the image: `docker pull splitsoftware/split-synchronizer`
 * Run as:

<Tabs>
  <TabItem value="Running as Synchronizer">

```bash
docker run --rm --name split-synchronizer \
 -p 3010:3010 \
 -e SPLIT_SYNC_APIKEY="your-sdk-key" \
 -e SPLIT_SYNC_REDIS_HOST=<your-redis-host> \
 -e SPLIT_SYNC_REDIS_PORT=<your_redis_port> \
 splitsoftware/split-synchronizer
```

  </TabItem>
  <TabItem value="Running as Synchronizer with Sentinel">

```bash
docker run --rm --name split-synchronizer \
 -p 3010:3010 \
 -e SPLIT_SYNC_APIKEY="your-sdk-key" \
 -e SPLIT_SYNC_REDIS_SENTINEL_REPLICATION="true" \
 -e SPLIT_SYNC_REDIS_SENTINEL_MASTER="MASTER_SERVICE_NAME" \
 -e SPLIT_SYNC_REDIS_SENTINEL_ADDRESSES="SENTINEL_HOST_1:SENTINEL_PORT_1,SENTINEL_HOST_2:SENTINEL_PORT_2" \
 splitsoftware/split-synchronizer
```

  </TabItem>
  <TabItem value="Running as Synchronizer with Cluster">

```bash
docker run --rm --name split-synchronizer \
 -p 3010:3010 \
 -e SPLIT_SYNC_APIKEY="your-sdk-key" \
 -e SPLIT_SYNC_REDIS_CLUSTER_MODE="true" \
 -e SPLIT_SYNC_REDIS_CLUSTER_NODES="CLUSTER_NODE_1:CLUSTER_PORT_1,CLUSTER_NODE_2:CLUSTER_PORT_2,CLUSTER_NODE_3:CLUSTER_PORT_3" \
 splitsoftware/split-synchronizer
```

  </TabItem>
  <TabItem value="Running as Synchronizer with AWS Redis Cluster">

```bash
docker run --rm --name split-synchronizer \
 -p 3010:3010 \
 -e SPLIT_SYNC_APIKEY="your-sdk-key" \
 -e SPLIT_SYNC_REDIS_CLUSTER_MODE="true" \
 -e SPLIT_SYNC_REDIS_CLUSTER_NODES="Cluster Entry Host" \
 splitsoftware/split-synchronizer
```

  </TabItem>
</Tabs>

:::info[Synchronizer mode with local redis instance]
Sometimes, when building POCs or testing the synchronizer locally, you might want to launch our docker container image, pointing to a local redis server (or another container with redis, whose port has been mapped to a local one). In such case, you should consider adding the option `--network="host"` (appending it to the command shown above) when launching the synchronizer. This will allow you to use `-e SPLIT_SYNC_REDIS_HOST="localhost"`, with the split-synchronizer container properly reaching your local redis server.
:::

:::info[Docker configuration]
The [Advanced configuration section](#advanced-configuration) includes additional Docker information in the column **Docker environment variable**.
:::

### Command line

To install and run the service from command line, follow the steps below depending of your platform.

#### Linux

On Linux systems, the Synchronizer service install script is invoked with this.

```bash
curl -L -o install_linux.bin 'https://downloads.split.io/synchronizer/install_split_sync_linux.bin' && chmod 755 install_linux.bin && ./install_linux.bin
```

#### OSX

On OSX systems, the Synchronizer service install script is invoked with this.

```bash
curl -L -o install_osx.bin 'https://downloads.split.io/synchronizer/install_split_sync_osx.bin' && chmod 755 install_osx.bin && ./install_osx.bin
```

#### Windows

On Microsoft Windows systems, follow these steps:

1. Download the app from [https://downloads.split.io/synchronizer/split_sync_windows.zip](https://downloads.split.io/synchronizer/split_sync_windows.zip).

2. Unzip the downloaded file.

3. Run it!

:::info[Download previous versions]
The links above point to the latest version. To download a previous version of split-sync, go to [https://downloads.split.io/synchronizer/downloads.sync.html](https://downloads.split.io/synchronizer/downloads.sync.html).
:::

### Run the service

To run the service, paste the snippet below into your command line terminal and add in your **SDK-Key**.

#### Linux/Mac

```bash
split-sync -apikey "your_sdk_key"
```

#### Windows

Open the cmd terminal or the PowerShell terminal, go to (cd) unzipped Split Synchronizer folder, and type:

```bash
split-sync.exe -apikey "your_sdk_key"
```

:::warning[Redis instance]
On the samples above, Redis is running as a local service with **default host: localhost** and **default port: 6379**. For further information, see [Advanced configuration](#advanced-configuration).
:::

:::warning[Redis database]
To maximize performance and isolation, we recommend connecting to a Redis database dedicated to the Split Synchronizer. For further information, see [Advanced configuration](#advanced-configuration).
:::

:::info[Redis Sentinel support]
Split Synchronizer also supports Redis Sentinel (v2) replication. For further information about Redis Sentinel, refer to the [Sentinel Documentation](https://redis.io/topics/sentinel).
:::

:::info[Redis Cluster support]
Split Synchronizer supports Redis Cluster with Redis^3.0.0. For further information about Redis Cluster, refer to the [Cluster Documentation](https://redis.io/topics/cluster-spec).
:::

#### Recommended configuration for production

You can run the service with the simple steps above, but the system is more stable in your production environment when you run the job with a scheduling system. We recommend starting the synchronizer via [supervisord](http://supervisord.org), a daemon that launches other processes and ensures they stay running.

To use supervisord, make sure that it is installed on your machine. You can get help on the installation at the [official Supervisord documentation](http://supervisord.org/installing.html).

When supervisord is installed into your project, copy and paste the program below anywhere into the `supervisord.conf` file that should now be in your project.

```ini title="supervisord configuration file (sample)
[program:splitio_sync]
command=/usr/local/bin/split-sync -config /path/to/your/config.file.json
process_name = SplitIO
numprocs = 1
autostart=true
autorestart=true
user = your_user
stderr_logfile=/var/log/splitio.err.log
stderr_logfile_maxbytes = 1MB
stdout_logfile=/var/log/splitio.out.log
stdout_logfile_maxbytes = 1MB
``` 

## Advanced configuration

The Synchronizer service has a number of knobs for configuring performance. Each knob is tuned to a reasonable default, however, you can override the default values by changing a `splitio.config.json` file or by setting your customer values as parameters of `-config` in the command line option. In this section, we lay out all the different knobs you can configure for performance, Redis, and logging.

The `splitio.config.json` file provided via the `-config` option lets you control how often the synchronizer fetches data from Harness servers. You can create a sample JSON file automatically with default values by running this command.

```bash
./split-sync -write-default-config "/home/someuser/splitio.config.json"
```

:::info[Configuration path file]
Save the JSON config file on your server in your desired folder. For instance, on Linux systems, it could be saved in the `etc` folder.
Remember to set the right path as the `-config` parameter.
:::

<Tabs>
  <TabItem value="splitio.config.json">

```json
{
  "apikey": "YOUR_SDK_KEY",
  "ipAddressEnabled": true,
  "initialization": {
    "timeoutMS": 10000,
    "forceFreshStartup": false
  },
  "storage": {
    "type": "redis",
    "redis": {
      "host": "localhost",
      "port": 6379,
      "db": 0,
      "username": "",
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
      "sentinelMaster": "",
      "clusterMode": false,
      "clusterNodes": "",
      "keyHashTag": "",
      "enableTLS": false,
      "tlsServerName": "",
      "caCertificates": null,
      "tlsSkipNameValidation": false,
      "tlsClientCertificate": "",
      "tlsClientKey": ""
    }
  },
  "sync": {
    "splitRefreshRateMs": 60000,
    "segmentRefreshRateMs": 60000,
    "impressionsMode": "optimized",
    "advanced": {
      "streamingEnabled": true,
      "httpTimeoutMs": 30000,
      "internalTelemetryRateMs": 3600000,
      "telemetryPushRateMs": 60000,
      "impressionsFetchSize": 0,
      "impressionsProcessConcurrency": 0,
      "impressionsProcessBatchSize": 0,
      "impressionsPostConcurrency": 0,
      "impressionsPostSize": 0,
      "impressionsAccumWaitMs": 0,
      "eventsFetchSize": 0,
      "eventsProcessConcurrency": 0,
      "eventsProcessBatchSize": 0,
      "eventsPostConcurrency": 0,
      "eventsPostSize": 0,
      "eventsAccumWaitMs": 0
    }
  },
  "admin": {
    "host": "0.0.0.0",
    "port": 3010,
    "username": "",
    "password": "",
    "secureChecks": false
  },
  "integrations": {
    "impressionListener": {
      "endpoint": "",
      "queueSize": 100
    },
    "slack": {
      "webhook": "",
      "channel": ""
    }
  },
  "logging": {
    "level": "info",
    "output": "stdout",
    "rotationMaxFiles": 10,
    "rotationMaxSizeKb": 0
  },
  "healthcheck": {
    "app": {
      "storageCheckRateMs": 3600000
    }
  }
}
```

  </TabItem>
  <TabItem value="splitio.sentinel.config.json">

```json
{
  "apikey": "YOUR_SDK_KEY",
  "ipAddressEnabled": true,
  "initialization": {
    "timeoutMS": 10000,
    "forceFreshStartup": false
  },
  "storage": {
    "type": "redis",
    "redis": {
      "host": "localhost",
      "port": 6379,
      "db": 0,
      "username": "",
      "password": "",
      "prefix": "",
      "network": "tcp",
      "maxRetries": 0,
      "dialTimeout": 5,
      "readTimeout": 10,
      "writeTimeout": 5,
      "poolSize": 10,
      "sentinelReplication": true,
      "sentinelAddresses": "SENTINEL_HOST_1:SENTINEL_PORT_1, SENTINEL_HOST_2:SENTINEL_PORT_2,SENTINEL_HOST_3:SENTINEL_PORT_3",
      "sentinelMaster": "MASTER_SERVICE_NAME",
      "clusterMode": false,
      "clusterNodes": "",
      "keyHashTag": "",
      "enableTLS": false,
      "tlsServerName": "",
      "caCertificates": null,
      "tlsSkipNameValidation": false,
      "tlsClientCertificate": "",
      "tlsClientKey": ""
    }
  },
  "sync": {
    "splitRefreshRateMs": 60000,
    "segmentRefreshRateMs": 60000,
    "impressionsMode": "optimized",
    "advanced": {
      "streamingEnabled": true,
      "httpTimeoutMs": 30000,
      "internalTelemetryRateMs": 3600000,
      "telemetryPushRateMs": 60000,
      "impressionsFetchSize": 0,
      "impressionsProcessConcurrency": 0,
      "impressionsProcessBatchSize": 0,
      "impressionsPostConcurrency": 0,
      "impressionsPostSize": 0,
      "impressionsAccumWaitMs": 0,
      "eventsFetchSize": 0,
      "eventsProcessConcurrency": 0,
      "eventsProcessBatchSize": 0,
      "eventsPostConcurrency": 0,
      "eventsPostSize": 0,
      "eventsAccumWaitMs": 0
    }
  },
  "admin": {
    "host": "0.0.0.0",
    "port": 3010,
    "username": "",
    "password": "",
    "secureChecks": false
  },
  "integrations": {
    "impressionListener": {
      "endpoint": "",
      "queueSize": 100
    },
    "slack": {
      "webhook": "",
      "channel": ""
    }
  },
  "logging": {
    "level": "info",
    "output": "stdout",
    "rotationMaxFiles": 10,
    "rotationMaxSizeKb": 0
  },
  "healthcheck": {
    "app": {
      "storageCheckRateMs": 3600000
    }
  }
}
```

  </TabItem>
  <TabItem value="splitio.cluster.config.json">

```json
{
  "apikey": "",
  "ipAddressEnabled": true,
  "initialization": {
    "timeoutMS": 10000,
    "forceFreshStartup": false
  },
  "storage": {
    "type": "redis",
    "redis": {
      "host": "localhost",
      "port": 6379,
      "db": 0,
      "username": "",
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
      "sentinelMaster": "",
      "clusterMode": true,
      "clusterNodes": "CLUSTER_NODE_1:CLUSTER_PORT_1, CLUSTER_NODE_2:CLUSTER_PORT_2,CLUSTER_NODE_3:CLUSTER_PORT_3",
      "keyHashTag": "",
      "enableTLS": false,
      "tlsServerName": "",
      "caCertificates": null,
      "tlsSkipNameValidation": false,
      "tlsClientCertificate": "",
      "tlsClientKey": ""
    }
  },
  "sync": {
    "splitRefreshRateMs": 60000,
    "segmentRefreshRateMs": 60000,
    "impressionsMode": "optimized",
    "advanced": {
      "streamingEnabled": true,
      "httpTimeoutMs": 30000,
      "internalTelemetryRateMs": 3600000,
      "telemetryPushRateMs": 60000,
      "impressionsFetchSize": 0,
      "impressionsProcessConcurrency": 0,
      "impressionsProcessBatchSize": 0,
      "impressionsPostConcurrency": 0,
      "impressionsPostSize": 0,
      "impressionsAccumWaitMs": 0,
      "eventsFetchSize": 0,
      "eventsProcessConcurrency": 0,
      "eventsProcessBatchSize": 0,
      "eventsPostConcurrency": 0,
      "eventsPostSize": 0,
      "eventsAccumWaitMs": 0
    }
  },
  "admin": {
    "host": "0.0.0.0",
    "port": 3010,
    "username": "",
    "password": "",
    "secureChecks": false
  },
  "integrations": {
    "impressionListener": {
      "endpoint": "",
      "queueSize": 100
    },
    "slack": {
      "webhook": "",
      "channel": ""
    }
  },
  "logging": {
    "level": "info",
    "output": "stdout",
    "rotationMaxFiles": 10,
    "rotationMaxSizeKb": 0
  },
  "healthcheck": {
    "app": {
      "storageCheckRateMs": 3600000
    }
  }
}
```

  </TabItem>
</Tabs>
  

:::info[Command line parameters]
All the options available in the JSON file are also included as command line options. Run the command followed by the `-help` option to see more details, or just keep reading this documentation page.
:::

### Methods to configure the Split Synchronizer

You can configure the Split Synchronizer service using the command line or by directly editing the above mentioned **JSON** configuration file. 

:::info[Config values priority]
All config values are set with a default value that you can see in the example **JSON** file above. You can overwrite the default value from the JSON config file, and you can overwrite the JSON config file from the command line. See a sample below for how to do that via command line.
:::

```bash
split-sync -config "/etc/splitio.config.json" -log-level "debug" -redis-pass "somePass" 
```

### CLI Configuration options and its equivalents in JSON & Environment variables

:::warning[Split Synchronizer version 5.0 boolean options change]
In order to reduce the issues because of typos and confusion due to "multiple words & case meaning the same", since version 5.0.0 of the split-synchronizer, the only accepted values for boolean flags are "true" & "false" in lowercase. Things like "enabled", "on", "yes", "tRue" will result in an error at startup. This applies to JSON, CLI arguments & environment variables.
:::


| **Command line option** | **JSON option** | **Environment variable (container-only)** | **Description** |
| --- | --- | --- | --- |
| log-level | level | SPLIT_SYNC_LOG_LEVEL | Log level (error&#124;warning&#124;info&#124;debug&#124;verbose) |
| log-output | output | SPLIT_SYNC_LOG_OUTPUT | Where to output logs (defaults to stdout) |
| log-rotation-max-files | rotationMaxFiles | SPLIT_SYNC_LOG_ROTATION_MAX_FILES | Max number of files to keep when rotating logs |
| log-rotation-max-size-kb | rotationMaxSizeKb | SPLIT_SYNC_LOG_ROTATION_MAX_SIZE_KB | Max file size before rotating log files. |
| admin-host | host | SPLIT_SYNC_ADMIN_HOST | Host where the admin server will listen |
| admin-port | port | SPLIT_SYNC_ADMIN_PORT | Admin port where incoming connections will be accepted |
| admin-username | username | SPLIT_SYNC_ADMIN_USERNAME | HTTP basic auth username for admin endpoints |
| admin-password | password | SPLIT_SYNC_ADMIN_PASSWORD | HTTP basic auth password for admin endpoints |
| admin-secure-hc | secureChecks | SPLIT_SYNC_ADMIN_SECURE_HC | Secure Healthcheck endpoints as well. |
| admin-tls-enabled | enabled | SPLIT_SYNC_ADMIN_TLS_ENABLED | Enable HTTPS on proxy endpoints. |
| admin-tls-client-validation | clientValidation | SPLIT_SYNC_ADMIN_TLS_CLIENT_VALIDATION | Enable client cert validation. |
| admin-tls-server-name | serverName | SPLIT_SYNC_ADMIN_TLS_SERVER_NAME | Server name as it appears in provided server-cert. |
| admin-tls-cert-chain-fn | certChainFn | SPLIT_SYNC_ADMIN_TLS_CERT_CHAIN_FN | X509 Server certificate chain. |
| admin-tls-private-key-fn | privateKeyFn | SPLIT_SYNC_ADMIN_TLS_PRIVATE_KEY_FN | PEM Private key file name. |
| admin-tls-client-validation-root-cert | clientValidationRootCertFn | SPLIT_SYNC_ADMIN_TLS_CLIENT_VALIDATION_ROOT_CERT | X509 root cert for client validation. |
| admin-tls-min-tls-version | minTlsVersion | SPLIT_SYNC_ADMIN_TLS_MIN_TLS_VERSION | Minimum TLS version to allow X.Y. |
| admin-tls-allowed-cipher-suites | allowedCipherSuites | SPLIT_SYNC_ADMIN_TLS_ALLOWED_CIPHER_SUITES | Comma-separated list of cipher suites to allow. |
| impression-listener-endpoint | endpoint | SPLIT_SYNC_IMPRESSION_LISTENER_ENDPOINT | HTTP endpoint to forward impressions to |
| impression-listener-queue-size | queueSize | SPLIT_SYNC_IMPRESSION_LISTENER_QUEUE_SIZE | max number of impressions bulks to queue |
| slack-webhook | webhook | SPLIT_SYNC_SLACK_WEBHOOK | slack webhook to post log messages |
| slack-channel | channel | SPLIT_SYNC_SLACK_CHANNEL | slack channel to post log messages |
| apikey | apikey | SPLIT_SYNC_APIKEY | Split Server-side SDK  api-key |
| ip-address-enabled | ipAddressEnabled | SPLIT_SYNC_IP_ADDRESS_ENABLED | Bundle host's ip address when sending data to Harness FME |
| timeout-ms | timeoutMS | SPLIT_SYNC_TIMEOUT_MS | How long to wait until the synchronizer is ready |
| snapshot | snapshot | SPLIT_SYNC_SNAPSHOT | Snapshot file to use as a starting point |
| force-fresh-startup | forceFreshStartup | SPLIT_SYNC_FORCE_FRESH_STARTUP | Wipe storage before starting the synchronizer |
| storage-type | type | SPLIT_SYNC_STORAGE_TYPE | Storage driver to use for caching feature flags and segments and user-generated data |
| split-refresh-rate-ms | splitRefreshRateMs | SPLIT_SYNC_SPLIT_REFRESH_RATE_MS | How often to refresh feature flags |
| segment-refresh-rate-ms | segmentRefreshRateMs | SPLIT_SYNC_SEGMENT_REFRESH_RATE_MS | How often to refresh segments |
| impressions-mode | impressionsMode | SPLIT_SYNC_IMPRESSIONS_MODE | whether to send all impressions for debugging |
| streaming-enabled | streamingEnabled | SPLIT_SYNC_STREAMING_ENABLED | Enable/disable streaming functionality |
| http-timeout-ms | httpTimeoutMs | SPLIT_SYNC_HTTP_TIMEOUT_MS | Total http request timeout |
| internal-metrics-rate-ms | internalTelemetryRateMs | SPLIT_SYNC_INTERNAL_METRICS_RATE_MS | How often to send internal metrics |
| telemetry-push-rate-ms | telemetryPushRateMs | SPLIT_SYNC_TELEMETRY_PUSH_RATE_MS | how often to flush sdk telemetry |
| impressions-fetch-size | impressionsFetchSize | SPLIT_SYNC_IMPRESSIONS_FETCH_SIZE | Impression fetch bulk size |
| impressions-process-concurrency | impressionsProcessConcurrency | SPLIT_SYNC_IMPRESSIONS_PROCESS_CONCURRENCY | #Threads for processing imps |
| impressions-process-batch-size | impressionsProcessBatchSize | SPLIT_SYNC_IMPRESSIONS_PROCESS_BATCH_SIZE | Size of imp processing batchs |
| impressions-post-concurrency | impressionsPostConcurrency | SPLIT_SYNC_IMPRESSIONS_POST_CONCURRENCY | #concurrent imp post threads |
| impressions-post-size | impressionsPostSize | SPLIT_SYNC_IMPRESSIONS_POST_SIZE | Max #impressions to send per POST |
| impressions-accum-wait-ms | impressionsAccumWaitMs | SPLIT_SYNC_IMPRESSIONS_ACCUM_WAIT_MS | Max ms to wait to close an impressions bulk |
| events-fetch-size | eventsFetchSize | SPLIT_SYNC_EVENTS_FETCH_SIZE | How many impressions to pop from storage at once |
| events-process-concurrency | eventsProcessConcurrency | SPLIT_SYNC_EVENTS_PROCESS_CONCURRENCY | #Threads for processing imps |
| events-process-batch-size | eventsProcessBatchSize | SPLIT_SYNC_EVENTS_PROCESS_BATCH_SIZE | Size of imp processing batchs |
| events-post-concurrency | eventsPostConcurrency | SPLIT_SYNC_EVENTS_POST_CONCURRENCY | #concurrent imp post threads |
| events-post-size | eventsPostSize | SPLIT_SYNC_EVENTS_POST_SIZE | Max #impressions to send per POST |
| events-accum-wait-ms | eventsAccumWaitMs | SPLIT_SYNC_EVENTS_ACCUM_WAIT_MS | Max ms to wait to close an events bulk |
| redis-host | host | SPLIT_SYNC_REDIS_HOST | Redis server hostname |
| redis-port | port | SPLIT_SYNC_REDIS_PORT | Redis Server port |
| redis-db | db | SPLIT_SYNC_REDIS_DB | Redis DB |
| redis-pass | password | SPLIT_SYNC_REDIS_PASS | Redis password |
| redis-user | username | SPLIT_SYNC_REDIS_USER | Redis username |
| redis-prefix | prefix | SPLIT_SYNC_REDIS_PREFIX | Redis key prefix |
| redis-network | network | SPLIT_SYNC_REDIS_NETWORK | Redis network protocol |
| redis-max-retries | maxRetries | SPLIT_SYNC_REDIS_MAX_RETRIES | Redis connection max retries |
| redis-dial-timeout | dialTimeout | SPLIT_SYNC_REDIS_DIAL_TIMEOUT | Redis connection dial timeout |
| redis-read-timeout | readTimeout | SPLIT_SYNC_REDIS_READ_TIMEOUT | Redis connection read timeout |
| redis-write-timeout | writeTimeout | SPLIT_SYNC_REDIS_WRITE_TIMEOUT | Redis connection write timeout |
| redis-pool | poolSize | SPLIT_SYNC_REDIS_POOL | Redis connection pool size |
| redis-sentinel-replication | sentinelReplication | SPLIT_SYNC_REDIS_SENTINEL_REPLICATION | Redis sentinel replication enabled. |
| redis-sentinel-addresses | sentinelAddresses | SPLIT_SYNC_REDIS_SENTINEL_ADDRESSES | List of redis sentinels |
| redis-sentinel-master | sentinelMaster | SPLIT_SYNC_REDIS_SENTINEL_MASTER | Name of master |
| redis-cluster-mode | clusterMode | SPLIT_SYNC_REDIS_CLUSTER_MODE | Redis cluster enabled. |
| redis-cluster-nodes | clusterNodes | SPLIT_SYNC_REDIS_CLUSTER_NODES | List of redis cluster nodes. |
| redis-cluster-key-hashtag | keyHashTag | SPLIT_SYNC_REDIS_CLUSTER_KEY_HASHTAG | keyHashTag for redis cluster. |
| redis-tls | enableTLS | SPLIT_SYNC_REDIS_TLS | Use SSL/TLS for connecting to redis |
| redis-tls-server-name | tlsServerName | SPLIT_SYNC_REDIS_TLS_SERVER_NAME | Server name to use when validating a server public key |
| redis-tls-ca-certs | caCertificates | SPLIT_SYNC_REDIS_TLS_CA_CERTS | Root CA certificates to connect to a redis server via SSL/TLS |
| redis-tls-skip-name-validation | tlsSkipNameValidation | SPLIT_SYNC_REDIS_TLS_SKIP_NAME_VALIDATION | Blindly accept server's public key. |
| redis-tls-client-certificate | tlsClientCertificate | SPLIT_SYNC_REDIS_TLS_CLIENT_CERTIFICATE | Client certificate signed by a known CA |
| redis-tls-client-key | tlsClientKey | SPLIT_SYNC_REDIS_TLS_CLIENT_KEY | Client private key matching the certificate. |
| storage-check-rate-ms | storageCheckRateMs | SPLIT_SYNC_STORAGE_CHECK_RATE_MS | How often to check storage health |
| flag-sets-filter | flagSetsFilter | SPLIT_SYNC_FLAG_SETS_FILTER | This setting allows the Split Synchronizer to only synchronize the feature flags in the specified flag sets, avoiding unused or unwanted flags from being synced on the Split Synchronizer instance, bringing all the benefits from a reduced payload. |

## Listener

The Split Synchronizer provides an impression listener that bulks post impressions to a user-defined HTTP endpoint.

The endpoint should expect a POST request, containing a JSON body with the following format.

```json title="JSON Impression"
{
 "impressions": [
  {
   "testName": "feature1",
   "keyImpressions": [
    {
     "keyName": "user1",
     "treatment": "on",
     "time": 1502754901182,
     "changeNumber": -1,
     "label": ""
    },
    {
     "keyName": "user2",
     "treatment": "off",
     "time": 1502754876144,
     "changeNumber": -1,
     "label": ""
    }
   ]
  }
 ],
 "sdkVersion": "php-5.2.2",
 "machineIP": "208.63.222.7",
 "MachineName": ""
}
```

Currently, the configuration options are available in the `integrations.impressionListener` section of the JSON configuration file detailed in [Advanced configuration](#advanced-configuration).

## Using a network proxy

If you need to use a network proxy, configure proxies by setting the environment variables **HTTP_PROXY** and **HTTPS_PROXY**. The internal HTTP client reads those variables and uses them to perform the server request.

```bash title="Example: Environment variables"
$ export HTTP_PROXY="http://10.10.1.10:3128"
$ export HTTPS_PROXY="http://10.10.1.10:1080"
```

## Admin tools

### Endpoints

The `split-sync` service has a set of endpoints and a dashboard to let DevOps and infra team monitor its status and cached data in real-time. By default the port is `3010` and for security reason supports HTTP Basic Authentication configured by the user.

**/info/ping**

A ping endpoint to monitor the service status. If the service is running, it sends the text response `pong` and the HTTP status code `200`.

**/info/version**

Returns the `split-sync` version in JSON format.

```json
{
  "version" : "1.1.0"
}
```

**/info/uptime**

Returns the uptime string representation in JSON format.

```json
{
  "uptime" : "5d 3h 36m 39s"
}
```

**/info/config**
Returns a JSON object describing the current configuration of the Synchronizer.

```json
{
  "config": {
    "apikey": "*",
    "ipAddressEnabled": true,
    "initialization": {
      "timeoutMS": 10000,
      "forceFreshStartup": false
    },
    "storage": {
      "type": "redis",
      "redis": {
        "host": "localhost",
        "port": 6379,
        "db": 0,
        "username": "",
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
        "sentinelMaster": "",
        "clusterMode": false,
        "clusterNodes": "",
        "keyHashTag": "",
        "enableTLS": false,
        "tlsServerName": "",
        "caCertificates": null,
        "tlsSkipNameValidation": false,
        "tlsClientCertificate": "",
        "tlsClientKey": ""
      }
    },
    "sync": {
      "splitRefreshRateMs": 60000,
      "segmentRefreshRateMs": 60000,
      "impressionsMode": "optimized",
      "advanced": {
        "streamingEnabled": true,
        "httpTimeoutMs": 30000,
        "internalTelemetryRateMs": 3600000,
        "telemetryPushRateMs": 60000,
        "impressionsFetchSize": 0,
        "impressionsProcessConcurrency": 0,
        "impressionsProcessBatchSize": 0,
        "impressionsPostConcurrency": 0,
        "impressionsPostSize": 0,
        "impressionsAccumWaitMs": 0,
        "eventsFetchSize": 0,
        "eventsProcessConcurrency": 0,
        "eventsProcessBatchSize": 0,
        "eventsPostConcurrency": 0,
        "eventsPostSize": 0,
        "eventsAccumWaitMs": 0
      }
    },
    "admin": {
      "host": "0.0.0.0",
      "port": 3010,
      "username": "",
      "password": "",
      "secureChecks": false
    },
    "integrations": {
      "impressionListener": {
        "endpoint": "",
        "queueSize": 100
      },
      "slack": {
        "webhook": "",
        "channel": ""
      }
    },
    "logging": {
      "level": "info",
      "output": "stdout",
      "rotationMaxFiles": 10,
      "rotationMaxSizeKb": 0
    },
    "healthcheck": {
      "app": {
        "storageCheckRateMs": 3600000
      }
    }
  }
}
```

**/health/application**
Returns a JSON object describing whether the synchronizer is healthy or not.

```json
{
  "healthy": true,
  "healthySince": "2021-11-20T19:04:46.528242-03:00",
  "items": [
    {
      "name": "Splits",
      "healthy": true,
      "lastHit": "2021-11-20T19:04:49.079956-03:00"
    },
    {
      "name": "Segments",
      "healthy": true,
      "lastHit": "2021-11-20T19:04:49.268349-03:00"
    },
    {
      "name": "Storage",
      "healthy": true
    }
  ]
}

```

**/health/dependencies**
Returns a JSON object describing whether the servers the synchronizer depends on are healthy or not.

```json
{
  "serviceStatus": "healthy",
  "dependencies": [
    {
      "service": "https://telemetry.split.io/health",
      "healthy": true,
      "healthySince": "2021-11-20T19:04:46.528262-03:00"
    },
    {
      "service": "https://auth.split.io/health",
      "healthy": true,
      "healthySince": "2021-11-20T19:04:46.528264-03:00"
    },
    {
      "service": "https://sdk.split.io/api/version",
      "healthy": true,
      "healthySince": "2021-11-20T19:04:46.528265-03:00"
    },
    {
      "service": "https://events.split.io/api/version",
      "healthy": true,
      "healthySince": "2021-11-20T19:04:46.528266-03:00"
    },
    {
      "service": "https://streaming.split.io/health",
      "healthy": true,
      "healthySince": "2021-11-20T19:04:46.528266-03:00"
    }
  ]
}
```

### Admin Dashboard

Split-sync has a web admin UI out of the box that exposes all available endpoints. Browse to `/admin/dashboard` to see it.

![](./static/split-synchronizer-dashboard-main.png)

![](./static/split-synchronizer-dashboard-stats.png)

The dashboard is organized in four sections for ease of visualization:

* **Dashboard:** Tile-sorted summary information, including these metrics:
    - *Uptime:* Uptime metric
    - *Healthy Since:* Time passed without errors
    - *Logged Errors:* Total count of error messages
    - *SDKs Total Hits:* Total SDKs requests
    - *Backend Total Hits:* Total backend requests between split-sync and Harness servers
    - *Cached Feature flags:* Number of feature flags cached in memory
    - *Cached Segments:* Number of segments cached in memory
    - *Impressions Queue Size*: shows the total amount of Impressions stored in Redis (only Producer Mode).
    - *Impressions Lambda*: shows the eviction rate for Impressions (only Producer Mode).
    - *Events Queue Size*: shows the total amount of Events stored in Redis (only Producer Mode).
    - *Events Lambda*: shows the eviction rate for Events (only Producer Mode).
    - *SDK Server*: displays the status of Split server for SDK.
    - *Events Server*: displays the status of Split server for Events.
    - Streaming Server*: displays the status of Split streaming service
    - Auth Server*: displays the status of Split server for initial streaming authentication
    - Telemetry Server*: displays the status of Split server for telemetry capturing.
    - *Storage*: (only Sync mode) displays the status of the storage.
    - *Sync*: displays the status of the Synchronizer.
    - *Last Errors Log:* List of the last 10 error messages
* **SDK stats:** Metrics numbers and a latency graph, measured between SDKs requests integration and proxy.
* **Data inspector:** Cached data showing feature flags and segments; filters to find keys and feature flag definitions.
* **Queue Manager:** expose sizes of Impressions and Events queues.

![](./static/split-synchronizer-dashboard-queue-manager.png)

:::warning[Dashboard refresh rate]
The dashboard numbers are committed every 60 seconds. The `Logged Errors`, `Last Errors Log` tiles, and the `Data inspector` section are populated each time the dashboard is refreshed.
For Impressions and Events Queue size the numbers are refreshed every 10 seconds.
:::

### Service shutdown

The `split-sync` service can catch a `kill sig` command and start a graceful shutdown, flushing all cached data progressively. Additionally, you can perform `graceful stop` and `force stop (kill -9)` with one click from the admin dashboard.

![](./static/split-proxy-shutdown.png)

If you have configured a Slack channel and the Slack Webhook URL, an alert is sent to the channel when and initialization or shutdown is performed.

![](./static/split-synchronizer-slack.png)