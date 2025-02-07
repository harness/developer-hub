---
title: Split Evaluator
sidebar_label: Split Evaluator
---

Using Split involves using one of our SDKs. The Split team builds and maintains these SDKs for some of the most popular language libraries and the SDKs are available under open source licenses. For languages where there is no native SDK support, Split offers the [Split Evaluator](https://github.com/splitio/split-evaluator), a small service capable of evaluating some or all available features for a given customer via a REST endpoint.

## Setup
The service is available via Docker or command line and its source code is available at [https://github.com/splitio/split-evaluator]( https://github.com/splitio/split-evaluator).

### Docker (recommended)
 * Pull the image: `docker pull splitsoftware/split-evaluator`
 * Run as:
```bash
docker run \
  -e SPLIT_EVALUATOR_API_KEY={YOUR_SDK_KEY} \
  -p 7548:7548 splitsoftware/split-evaluator
```

:::note
See the configuration section for details on port usage, specifically the use of the `SPLIT_EVALUATOR_SERVER_PORT` environment variable.
:::

:::info[Docker ports]
In the example above, the service can be reached via curl using port 7548.
:::

### Command line
To install the service via command line:

1. Clone the repository: `git clone https://github.com/splitio/split-evaluator`
2. Prepare the sources: `npm install`

:::info[Previous Versions]
Split Evaluator `2.0.0` is a breaking change. This version adds supports for all the APIs that our current SDKs have but be aware of using some deprecated APIs if you continue to use an older version of this service.
:::

```bash
SPLIT_EVALUATOR_API_KEY=<YOUR_SDK_KEY> \
SPLIT_EVALUATOR_AUTH_TOKEN=<YOUR_CUSTOM_AUTHENTICATION> \
npm start
```

## Endpoints
The following section will describe the APIs that evaluator can manage. There are grouped in four different resources depending on what they want to achieve.
* **Client:** it corresponds to the APIs used to send impressions (get treatments) and track events.
* **Manager:** it corresponds to the APIs that will give you information of the available feature flags.
* **Admin:** it corresponds to the APIs that will give you information of the Split Evaluator itself.
* **api-docs:** it will contain the [Swagger](https://swagger.io/) specification of Split Evaluator.

### api-docs

#### Swagger
Split Evaluator uses Swagger to document all API endpoints available in this service. They are available by default in this url: [http://localhost:7548/api-docs](http://localhost:7548/api-docs).
If the port has been modified from the default(7548), make sure to set the environment variable SPLIT_EVALUATOR_SWAGGER_URL to match it.

### Client APIs
Corresponds to the Client APIs that is generating impressions and tracking events.
 * get-treatment
 * get-treatments
 * get-treatments-by-sets
 * get-treatment-with-config
 * get-treatments-with-config
 * get-treatments-with-config-by-sets
 * get-all-treatments
 * get-all-treatments-with-config
 * track

#### /client/get-treatment
Evaluates a single feature flag for a single key.

##### Query params
 *  **key:** The key used in the `getTreatment` call.
 *  **split-name:** The name of the feature flag you want to include in the `getTreatment` call.
 *  **bucketing-key:** (*Optional*) The bucketing key used in the `getTreatment` call.
 *  **attributes:** (*Optional*) A JSON string of the attributes to include in the `getTreatment` call of the SDK.

Example:

```bash
curl 'http://localhost:7548/client/get-treatment?key=my-customer-key&split-name=FEATURE_FLAG_NAME_1&attributes=\{"attribute1":"one","attribute2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
    "splitName": "FEATURE_FLAG_NAME_1",
    "treatment": "on"
  }
```

#### /client/get-treatments
Provides a way of doing multiple evaluations at once.

##### Query params
 *  **key:** The key used in the `getTreatments` call.
 *  **split-names:** The names of the feature flags you want to include in the `getTreatments` call separated by commas.
 *  **bucketing-key:** (*Optional*) The bucketing key used in the `getTreatments` call.
 *  **attributes:** (*Optional*) A JSON string of the attributes to include in the `getTreatments` call of the SDK.

Example:

```bash
curl 'http://localhost:7548/client/get-treatments?key=my-customer-key&split-names=FEATURE_FLAG_NAME_1,FEATURE_FLAG_NAME_2&attributes=\{"attribute1":"one","attribute2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
    "FEATURE_FLAG_NAME_1": {
      "treatment": "on"
    },
    "FEATURE_FLAG_NAME_2": {
      "treatment": "off"
    }
  }
```

#### /client/get-treatments-by-sets
Evaluates all flags that are part of the provided set names and are cached on the SDK instance.

##### Query params
 *  **key:** The key used in the `getTreatmentsBySets` call.
 *  **flag-sets:** The names of the flag sets you want to include in the `getTreatmentsBySets` call separated by commas.
 *  **bucketing-key:** (*Optional*) The bucketing key used in the `getTreatmentsBySets` call.
 *  **attributes:** (*Optional*) A JSON string of the attributes to include in the `getTreatmentsBySets` call of the SDK.

Example:

```bash
curl 'http://localhost:7548/client/get-treatments-by-sets?key=my-customer-key&flag-sets=backend,server_side&attributes=\{"attribute1":"one","attribute2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
    "FEATURE_FLAG_NAME_1": {
      "treatment": "on"
    },
    "FEATURE_FLAG_NAME_2": {
      "treatment": "off"
    }
  }
```

#### /client/get-treatment-with-config
Evaluates a single feature flag for a single key and adds config in the result.

##### Query params
 *  **key:** The key used in the `getTreatmentWithConfig` call.
 *  **split-name:** The name of the feature flag you want to include in the `getTreatmentWithConfig` call.
 *  **bucketing-key:** (*Optional*) The bucketing key used in the `getTreatmentWithConfig` call.
 *  **attributes:** (*Optional*) A JSON string of the attributes to include in the `getTreatmentWithConfig` call of the SDK.

Example:

```curl 'http://localhost:7548/client/get-treatment-with-config?key=my-customer-key&split-name=FEATURE_FLAG_NAME_1&attributes=\{"attribute1":"one","attribute2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:
```json
  {
    "splitName": "FEATURE_FLAG_NAME_1",
    "treatment": "on",
    "config": "{/"color/": /"black/" }"
  }
```

#### /client/get-treatments-with-config
Provides a way of doing multiple evaluations at once and attaches configs for each feature flag evaluated.

##### Query params
 *  **key:** The key used in the `getTreatmentsWithConfig` call.
 *  **split-names:** The names of the feature flags you want to include in the `getTreatmentsWithConfig` call separated by commas.
 *  **bucketing-key:** (*Optional*) The bucketing key used in the `getTreatmentsWithConfig` call.
 *  **attributes:** (*Optional*) A JSON string of the attributes to include in the `getTreatmentsWithConfig` call of the SDK.

Example:
```bash
curl 'http://localhost:7548/client/get-treatments-with-config?key=my-customer-key&split-names=FEATURE_FLAG_NAME_1,FEATURE_FLAG_NAME_2&attributes=\{"attribute1":"one","attribute2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
    "FEATURE_FLAG_NAME_1": {
      "treatment": "on",
      "config": "{/"color/": /"black/" }"
    },
    "FEATURE_FLAG_NAME_2": {
      "treatment": "off",
      "config": null
    }
  }
```

#### /client/get-treatments-with-config-by-sets
Provides a way of doing multiple evaluations at once and attaches configs for each feature flag that are part of the provided set names.

##### Query params
 *  **key:** The key used in the `getTreatmentsWithConfigBySets` call.
 *  **flag-sets:** The names of the flag sets you want to include in the `getTreatmentsWithConfigBySets` call separated by commas.
 *  **bucketing-key:** (*Optional*) The bucketing key used in the `getTreatmentsWithConfigBySets` call.
 *  **attributes:** (*Optional*) A JSON string of the attributes to include in the `getTreatmentsWithConfigBySets` call of the SDK.

Example:

```bash
curl 'http://localhost:7548/client/get-treatments-with-config-by-sets?key=my-customer-key&flag-sets=backend,server_side&attributes=\{"attribute1":"one","attribute2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
    "FEATURE_FLAG_NAME_1": {
      "treatment": "on",
      "config": "{/"color/": /"black/" }"
    },
    "FEATURE_FLAG_NAME_2": {
      "treatment": "off",
      "config": null
    }
  }
```

#### /client/get-all-treatments
Performs multiple evaluations at once. In this case it will match all the feature flags for a given traffic-type and will perform a `getTreatments` call with the key provided. You can send more than one `{matchingKey,bucketingKey,trafficType}` object.

##### Query params
 * **keys:** The array of keys to be used in the `getTreatments` call. Each key should specify `matchingKey` and `trafficType`. You can also specify `bucketingKey`.
 * **attributes:** (*optional*) A JSON string of the attributes to include in the `getTreatments` call of the SDK.

Example:

```bash
curl 'http://localhost:7548/client/get-all-treatments?keys=\[\{"matchingKey":"my-first-key","trafficType":"account"\},\{"matchingKey":"my-second-key","bucketingKey":"my-bucketing-key","trafficType":"user"\}\]&attributes=\{"attribute1":"one","attribute2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
{
  "account": {
    "FEATURE_FLAG_NAME_1": {
      "treatment": "on"
    },
    "FEATURE_FLAG_NAME_2": {
      "treatment": "off"
    }
  },
  "user": {
    "FEATURE_FLAG_NAME_3": {
      "treatment": "off"
    }
  }
}
```

#### /client/get-all-treatments-with-config
Performs multiple evaluations at once. In this case it will match all the feature flags for a given traffic-type and will perform a `getTreatmentsWithConfig` call with the key provided. You can send more than one `{matchingKey,bucketingKey,trafficType}` object. This endpoint will also adds the configurations for particular feature flag.

##### Query params
 * **keys:** The array of keys to be used in the `getTreatmentsWithConfig` call. Each key should specify `matchingKey` and `trafficType`. You can also specify `bucketingKey`.
 * **attributes:** (*optional*) A JSON string of the attributes to include in the `getTreatmentsWithConfig` call of the SDK.

Example:

```bash
curl 'http://localhost:7548/client/get-all-treatments-with-config?keys=\[\{"matchingKey":"my-first-key","trafficType":"account"\},\{"matchingKey":"my-second-key","bucketingKey":"my-bucketing-key","trafficType":"user"\}\]&attributes=\{"attribute1":"one","attribute2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
{
  "account": {
    "FEATURE_FLAG_NAME_1": {
      "treatment": "on",
       "config": "{/"color/": /"black/" }"
    },
    "FEATURE_FLAG_NAME_2": {
      "treatment": "off",
      "config": null
    }
  },
  "user": {
    "FEATURE_FLAG_NAME_3": {
      "treatment": "off",
      "config": "{/"copy/": /"better copy/" }"
    }
  }
}
```

#### /client/track
Records any actions your customers perform. Each action is known as an event and corresponds to an event type. Calling track allows you to measure the impact of your feature flags on your users' actions and metrics.

##### Query params
 *  **key:** The key used in the `track` call.
 *  **traffic-type:** The traffic type of the key that you want to include in the `track` call.
 *  **event-type:** The event type that this event should correspond to the `track` call of the SDK.
 *  **value:** (*Optional*) value to be used in creating the metric.
 *  **properties:** (*Optional*) A JSON string of the properties to include in the `track` call of the SDK for filtering your metrics.

Example:

```bash
curl 'http://localhost:7548/client/track?key=my-customer-key&event-type=my-event&traffic-type=account&properties=\{"prop1":"one","prop2":2,"attribute3":true\}' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:
`Successfully queued event`

### Manager APIs
Provides information of all the available feature flags.
 * split
 * splits
 * names

#### /manager/split
Provides information of one particular feature flag.

##### Query params
 *  **split-name:** The name of the feature flag you want to have information. It uses `split` call of the SDK.

Example:

```bash
curl 'http://localhost:7548/manager/split?split-name=FEATURE_FLAG_NAME_1' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
    "name": "FEATURE_FLAG_NAME_1",
    "trafficType": "user",
    "killed": false,
    "changeNumber": 1563394983932,
    "treatments": ["on", "off"],
    "configs": {
      "on": "{/"color/": /"black/" }",
      "off": "{/"color/": /"red/" }"
    },
    "sets": [
      "backend",
      "server_side"
    ],
    "defaultTreatment": "off"
  }
```

#### /manager/splits
Provides information of all the available feature flags by calling `splits` method from the SDK.

Example:

```bash
curl 'http://localhost:7548/manager/splits' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
    "splits": [{
      "name": "FEATURE_FLAG_NAME_1",
      "trafficType": "user",
      "killed": false,
      "changeNumber": 1563394983932,
      "treatments": ["on", "off"],
      "configs": {
        "on": "{/"color/": /"black/" }",
        "off": "{/"color/": /"red/" }"
      },
      "sets": [
        "backend",
        "server_side"
      ],
      "defaultTreatment": "off"
  }
    }, {
      "name": "FEATURE_FLAG_NAME_2",
      "trafficType": "user",
      "killed": false,
      "changeNumber": 1563394983933,
      "treatments": ["on", "off"],
      "configs": {
        "on": "{/"color/": /"yellow/" }",
        "off": "{/"color/": /"green/" }"
      },
      "sets": [
        "backend"
      ],
      "defaultTreatment": "on"
  }
    }]
  }
```

#### /manager/names
Provides the names of the available feature flags. It calls `names` of the SDK.

Example:

```bash
curl 'http://localhost:7548/manager/names' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
    "splits": ["FEATURE_FLAG_NAME_1", "FEATURE_FLAG_NAME_2"]
  }
```

### Admin
Provides information about Split Evaluator itself.
 * ping
 * uptime
 * healthcheck
 * version
 * machine
 * stats

#### /admin/ping
A ping endpoint to monitor the service status. If the service is running, it responds with `pong` and the HTTP status code `200`.

Example:

```bash
curl 'http://localhost:7548/admin/ping'
```

#### /admin/uptime
Returns the uptime of the service in a human-readable string.

Example:

```bash
curl 'http://localhost:7548/admin/uptime'
```

Response:

```json
"5d 3h 36m 39s"
```

#### /admin/healthcheck
Checks that everything is working as expected before sending evaluations. It returns a status code of either `200` or `500`, depending on the result of the check, along with a message explaining the status.

Example:

```bash
curl 'http://localhost:7548/admin/healthcheck'
```

Response:

```json
// For 200 status code
"Split Evaluator working as expected."
// For 500 status code
"Split evaluator engine not evaluating traffic properly."
```

#### /admin/version
Version information for the evaluator and the SDK within.

Example:

```bash
curl 'http://localhost:7548/admin/version'
```

Response:

```json
  {
    "version": "1.0.2",
    "sdk": "nodejs",
    "sdkVersion": "9.3.4"
  }
```

#### /admin/machine
Returns the data for the machine where this service is running.

Example:

```bash
curl 'http://localhost:7548/admin/machine'
```

Response:

```json
  {
    "ip": "10.0.0.125",
    "name": "machine_name"
  }
```

#### /admin/stats
Returns information about evaluator like uptime and versions and the following stats from every environment:
 * splitCount: Number of feature flags.
 * segmentCount: Number of segments.
 * lastSynchronization:
     * splits: timestamp for last feature flags synchronization.
     * segments: timestamp for last segments synchronization.
     * impressions: timestamp for last impressions synchronization.
     * impressionCount: timestamp for last impressionCount synchronization.
     * events: timestamp for last events synchronization.
     * telemetry: timestamp for last telemetry synchronization.
     * token: timestamp for last token synchronization.
 * timeUntilReady: time elapsed until environment reached ready state.
 * httpErrors: information about http errors.
 * ready: environment readiness status.
 * impressionsMode: environment impressions mode.

Example:

```bash
curl 'http://localhost:7548/admin/stats' -H 'Authorization: {SPLIT_EVALUATOR_AUTH_TOKEN}'
```

Response:

```json
  {
  "uptime": "10d 2h 1m 4s",
  "healthcheck": {
    "version": "2.3.0",
    "sdk": "nodejs",
    "sdkVersion": "10.22.0"
  },
  "environments": {
    "######tkn1": {
      "splitCount": 20,
      "segmentCount": 5,
      "lastSynchronization": {
        "splits": 1674855033186,
        "segments": 1674855033286,
        "mySegments": 1674855033386,
        "impressions": 1674855033486,
        "impressionCount": 1674855033586,
        "events": 1674855033686,
        "telemetry": 1674855033786,
        "token": 1674855033886
      },
      "timeUntilReady": 833,
      "httpErrors": {},
      "ready": true,
      "impressionsMode": "OPTIMIZED"
    },
    "######tkn2": {
      "splitCount": 0,
      "segmentCount": 0,
      "lastSynchronization": {},
      "timeUntilReady": 0,
      "httpErrors": {
        "telemetry": {
          "401": 1
        }
      },
      "ready": false,
      "impressionsMode": "OPTIMIZED"
    }
  }
}
```

## Impression listener

The Split Evaluator provides an impression listener (`SPLIT_EVALUATOR_IMPRESSION_LISTENER_ENDPOINT`) that bulks post impressions to a user-defined HTTP endpoint. The endpoint should expect a POST request, containing a JSON body with the following format.

If an impression listener is provided when the Split Evaluator is initialized, a task runs in background that posts impressions. There are two ways of posting impressions to the provided endpoint:

* Every 30 seconds by the Evaluator.
* When the queue of impressions reached the max amount of impressions.

For more information about how to configure the impression listener, refer to [Configuration](#configuration) section of this guide.

```json
  {
    "impressions": [
      {
        "testName": "my-experiment",
        "keyImpressions": [
          {
            "keyName": "key-experiment",
            "treatment": "on",
            "time": 987654321,
            "changeNumber": 987654321,
            "label": "label"
          }
        ]
      },
      {
        "testName": "my-experiment-2",
        "keyImpressions": [
          {
            "keyName": "key-experiment",
            "treatment": "off",
            "time": 123456789,
            "changeNumber": 123456789,
            "label": "default rule"
          }
        ]
      }
    ]
  }
```

## Multiple environments support

Split Evaluator allows you to set more than one environment. This means that it's possible to evaluate treatments for many Split SDK Keys. To use this feature, the evaluator requires that each Split SDK Key is paired with a custom authorization token (which can be any string) in the environment variable SPLIT_EVALUATOR_ENVIRONMENTS as is shown in the following example:

```bash
SPLIT_EVALUATOR_ENVIRONMENTS='[{"API_KEY":"<SDK_KEY_env1>","AUTH_TOKEN":"<CUSTOM_AUTHENTICATION_1>"},{"API_KEY":"<SDK_KEY_env2>","AUTH_TOKEN":"<CUSTOM_AUTHENTICATION_2>"}]' npm start
```

The previous command line example initializes the Split Evaluator connected to two environments. To evaluate or retrieve flags on env1 using \{SDK_KEY_env1\}, the requests should be done with \{CUSTOM_AUTHENTICATION_1\} set as the Authorization header.

Example:

#### /manager/splits (For environment 1)

This provides information of all the available feature flags by calling the `splits` method from the SDK initialized with \<YOUR_SDK_KEY_1\>.

Example:

```bash
curl 'http://localhost:7548/manager/splits' -H 'Authorization: {YOUR_CUSTOM_AUTHENTICATION_1}'
```

#### /manager/splits (For environment 2)

This provides information of all the available feature flags by calling the `splits` method from the SDK initialized with \<YOUR_SDK_KEY_2\>.

Example:

```bash
curl 'http://localhost:7548/manager/splits' -H 'Authorization: {YOUR_CUSTOM_AUTHENTICATION_2}'
```

:::info
To configure flag sets when running multiple environments, flag set names must be defined in `FLAG_SET_FILTER` property of `SPLIT_EVALUATOR_ENVIRONMENTS` object

Example:

```bash
SPLIT_EVALUATOR_ENVIRONMENTS='[{"API_KEY":"<SDK_KEY_env1>","AUTH_TOKEN":"<CUSTOM_AUTHENTICATION_1>","FLAG_SET_FILTER":"backend"},{"API_KEY":"<SDK_KEY_env2>","AUTH_TOKEN":"<CUSTOM_AUTHENTICATION_2>","FLAG_SET_FILTER":"backend,server_side"}]' npm start
```
:::

## Global config

The SDK exposes configuration parameters that you can use to optimize SDK performance. Each parameter is preset to a reasonable default. You can optionally override these default values when instantiating the SDK.

| **Configuration** | **Description** | **Default value** |
| --- | --- | --- |
| scheduler.featuresRefreshRate | The SDK polls Split servers for changes to feature rollout plans. This parameter controls this polling period in seconds. | 60 |
| scheduler.segmentsRefreshRate  | The SDK polls Split servers for changes to segment definitions. This parameter controls this polling period in seconds. | 60  |
| scheduler.impressionsRefreshRate  | The SDK sends information on who got what treatment at what time back to Split servers to power analytics. This parameter controls how often this data is sent to Split servers. The parameter is in seconds. | 300 |
| scheduler.impressionsQueueSize | The max amount of impressions we queue. If the queue is full, the SDK flushes the impressions and resets the timer. | 30000 |
| scheduler.eventsPushRate  | The SDK sends tracked events to Split servers. This setting controls that flushing rate in seconds. | 60  |
| scheduler.eventsQueueSize  | The max amount of events we queue. If the queue is full, the SDK flushes the events and resets the timer. | 500  |
| scheduler.telemetryRefreshRate | The SDK caches diagnostic data that it periodically sends to Split servers. This configuration controls how frequently this data is sent back to Split servers in seconds. | 3600 seconds (1 hour) |
| startup.requestTimeoutBeforeReady  | Time to wait for a request before the SDK is ready. If this time expires, Node.js SDK tries again `retriesOnFailureBeforeReady` times before notifying its failure to be `ready`. Zero means no timeout.  | 15  |
| startup.retriesOnFailureBeforeReady  | Number of quick retries we do while starting up the SDK.  | 1  |
| startup.readyTimeout  | Maximum amount of time in seconds to wait before notifying a timeout. Zero means no timeout, so no `SDK_READY_TIMED_OUT` event is fired. | 15  |
| sync.splitFilters | Filter specific feature flags to be synced and evaluated by the SDK. This is formed by a type string property and a list of string values for the given criteria. Using the types 'bySet' (recommended, flag sets are available in all tiers) or 'byName', pass an array of strings defining the query. If empty or unset, all feature flags are downloaded by the SDK. | [] |
| sync.impressionsMode | This configuration defines how impressions (decisioning events) are queued on the SDK. Supported modes are OPTIMIZED, NONE, and DEBUG. In OPTIMIZED mode, only unique impressions are queued and posted to Split. This is the recommended mode for experimentation use cases. In NONE mode, no impression is tracked in Split and only minimum viable data to support usage stats is, so never use this mode if you are experimenting with that instance impressions. Use NONE when you want to optimize for feature flagging only use cases and reduce impressions network and storage load. In DEBUG mode, ALL impressions are queued and sent to Split; this is useful for validations. This mode doesn't impact the impression listener which receives all generated impressions locally. | `OPTIMIZED` |
| debug  | Boolean flag or log level string ('ERROR', 'WARN', 'INFO', or 'DEBUG') for activating SDK logs. | false |
| streamingEnabled | Boolean flag to enable the streaming service as default synchronization mechanism. In the event of an issue with streaming, the SDK falls back to the polling mechanism. If false, the SDK polls for changes as usual without attempting to use streaming. | true |

To set each of the parameters defined above, use the following syntax:

Example:

```bash
docker run \
  -e SPLIT_EVALUATOR_ENVIRONMENTS='[{"API_KEY":"<SDK_KEY_env1>","AUTH_TOKEN":"<CUSTOM_AUTHENTICATION_1>","FLAG_SET_FILTER":"backend,server_side"}]' \
  -e SPLIT_EVALUATOR_GLOBAL_CONFIG='{
      scheduler: {
        featuresRefreshRate:     60,
        segmentsRefreshRate:     60,
        impressionsRefreshRate: 300,
        impressionsQueueSize: 30000,
        eventsPushRate:          60,
        eventsQueueSize:        500,
        telemetryRefreshRate:  3600
      },
      startup: {
        readyTimeout: 5
      },
      sync: {
        impressionsMode: 'OPTIMIZED'
      },
      debug: false
   }'
  -p 7548:7548 splitsoftware/split-evaluator
```

## Configuration

The available configuration variables are listed below. Always use `-e <VARIABLE>=<VALUE>` with Docker.

:::note
For those configurations available on global config and environment variables (for example, refresh rates), the environment variable configuration takes precedence over global configuration.**
:::

| **Variable** | **Description** | **Default** |
| --- | --- | --- |
| SPLIT_EVALUATOR_ENVIRONMENTS | String list of environments `"API_KEY":string, "AUTH_TOKEN":string}[]` | - |
| SPLIT_EVALUATOR_API_KEY | Split SDK key to authenticate against Split services. | - |
| SPLIT_EVALUATOR_AUTH_TOKEN | Authentication key used to authenticate every request via the Authorization header. This is **not** a Split SDK key but an arbitrary value defined by the user. | No authentication |
| SPLIT_EVALUATOR_GLOBAL_CONFIG | String SDK config for every environment. | - |
| SPLIT_EVALUATOR_LOG_LEVEL | Use for setting the log level for service (NONE|INFO|DEBUG|WARN|ERROR). | - |
| SPLIT_EVALUATOR_SERVER_PORT | TCP port of the server inside the container. When using in Docker, make sure to match the right side of `-p <ext_port>:<internal_port>` with the value of this variable. | 7548 |
| SPLIT_EVALUATOR_IMPRESSION_LISTENER_ENDPOINT | Use it for providing a webhook to send a bulk of Impressions | - |
| SPLIT_EVALUATOR_SPLITS_REFRESH_RATE | The SDK polls Split servers for changes to feature roll-out plans. This parameter controls this polling period in seconds. | 60 |
| SPLIT_EVALUATOR_SEGMENTS_REFRESH_RATE | 	The SDK polls Split servers for changes to segment definitions. This parameter controls this polling period in seconds. | 60 |
| SPLIT_EVALUATOR_METRICS_POST_RATE | The SDK sends diagnostic metrics to Split servers. This parameters controls this metric flush period in seconds. | 60 |
| SPLIT_EVALUATOR_IMPRESSIONS_POST_RATE | The SDK sends information on who got what treatment at what time back to Split servers to power analytics. This parameter controls how often this data is sent to Split servers. The parameter should be in seconds. | 60 |
| SPLIT_EVALUATOR_EVENTS_POST_RATE | The SDK sends tracked events to Split servers. This setting controls that flushing rate in seconds. | 60 |
| SPLIT_EVALUATOR_EVENTS_QUEUE_SIZE | The max amount of events we queue. If the queue is full, the SDK flushes the events and reset the timer. | 500 |
| SPLIT_EVALUATOR_SWAGGER_URL | The url used as base for any Swagger test curl commands. | http://localhost:7548 |
| SPLIT_EVALUATOR_IP_ADDRESSES_ENABLED | Flag to disable IP addresses and host name from being sent to the Split backend.  | 'true' |

## HTTPS/SSL

This service does not currently support a secured connection. We recommend running this service in a redundant manner behind a load balancer such as AWS ELB or Nginx, with SSL termination.

Contact [support@split.io](mailto:support@split.io) if you have questions.