---
title: Split Daemon (Splitd)
sidebar_label: Split Daemon
description: IPC interface (via Unix sockets) for caching FME feature flag definitions
---

Splitd is a daemon that communicates with the Split backend. It keeps an up-to-date snapshot of the Split rollout plan for a specific Split environment. The rollout plan is accessed by a Split Thin SDK instance (via splitd) to consume feature flags in your code.

Splitd can be used if you are working in a language that does not have native capability to keep a shared local cache, such as PHP. You can use splitd in combination with a Split Thin SDK (see [Supported Thin SDKs](#supported-thin-sdks)) as an alternative to using Split Synchronizer and Redis with a non-thin Split SDK. Splitd easily scales to high traffic volumes.

Splitd is a daemon designed to be deployed in the same host as the application, and works as an offloaded evaluation engine running on a separate process. Splitd relies on the host machine's memory to store the cache and offers an IPC interface via Unix sockets (both stream and sequenced packet sockets supported). Consumer applications (that hold Split Thin SDK instances) connect to splitd and send evaluation requests for Split feature flags as remote procedure calls. Impressions are generated on the daemon and can be backfed to the client to trigger an impression listener.

## Supported Thin SDKs

Splitd currently works with the following Split Thin SDKs:

* [PHP Thin Client SDK](https://help.split.io/hc/en-us/articles/18305128673933)

If you are looking for a language that is not listed here, contact the support team at [support@split.io](mailto:support@split.io).

## Overall Architecture

The service performs three actions:

* **Fetch targeting rules:** Fetch feature flags and segments from the Split servers.
* **Perform evaluations:** Split Thin SDKs will establish a connection to splitd and send evaluation requests that splitd will service.
* **Post impressions and events:** Impressions (data about a customer's feature flag evaluations) and events will be temporarily stored in the daemon's memory and periodically sent to Split servers.

### Architecture

<p>
<img src="https://help.split.io/hc/article_attachments/18307487829901" alt="splitd_arch.drawio.svg" />
</p>

## Setup

Splitd can be set up locally to the consumer application or be deployed as a sidecar to the consumer application container. These approaches are described below.

### Local deployment (recommended)

The following diagram illustrates a local setup where splitd is on the same server instance as the consumer application. It shows how splitd communicates with the application via IPC/Unix socket connections.

<p>
<img src="https://help.split.io/hc/article_attachments/18307487833869" alt="splitd_shared_instance.drawio.svg" />
</p>

Since the service relies on interprocess communication (IPC) with thin clients, which happens on the operating system's kernel, the two processes need to be on the same host. The most straightforward way to achieve this is by having both the daemon and the application that bundles the Split Thin SDK in the same server/instance/container.

To set up splitd on the same host as the Split Thin SDK, follow the steps below:

#### 1. Get a copy of splitd

You can get a copy of splitd using one of the following options:

* Github release:
`wget https://github.com/splitio/splitd/releases/download/v1.4.0/splitd-<OS>-<ARCH>-1.4.0.bin` where OS in [linux, darwin] and ARCH in [amd64, arm]

* `go install` command (requires a Go development environment):
`go install github.com/splitio/splitd/cmd/splitd@v1.4.0`

* Build from source (requires a Go development environment and GNU Make):
`git clone github.com/splitio/splitd && cd splitd && make splitd`

#### 2. Create a configuration file

Using [splitd.yaml.tpl](https://github.com/splitio/splitd/blob/main/splitd.yaml.tpl) as a template, create your own configuration with at least a valid API key and a path for the IPC socket where both the daemon and the application have read-write access.

If you have the `yq` command installed, you can get an initial config with the following command:

```bash
export SDK_KEY="your_apikey"
wget https://raw.githubusercontent.com/splitio/splitd/main/splitd.yaml.tpl \
    -O /dev/stdout 2> /dev/null \
    | yq '.sdk.apikey = env(SDK_KEY)' > splitd.yaml
```

:::warning[OSX & Unix sockets]
Keep in mind that seqpacket-type sockets only work on the Linux operating system. If you're running a proof of concept on a Mac, you need to set the link type to `unix-stream` in both the daemon and the Split SDK configurations. For more information on socket types, see the [Advanced configuration](#advanced-configuration) section.
:::

:::info[Configuration file location]
By default, splitd searches for the configuration file at `/etc/splitd.yaml`. This behaviour can be overridden by setting the `SPLITD_CONF_FILE` environment variable.
:::

#### 3. Running splitd

To start splitd, execute the binary `splitd`. This will find and parse the splitd configuration file and start the splitd daemon. Applications using a Split Thin SDK should now be able to connect to the socket created by splitd.

When integrating splitd with an application on a server, you will want the daemon to run at system startup and be managed by a background process. The process should automatically restart splitd if it is killed (for example, by the kernel’s memory management). Two popular options are deploying the splitd as a systemd unit or as a supervisord program. These approaches are described below.

##### a. Deploying splitd as a systemd unit

Below is an example of a unit file with configuration directives that can be used to deploy splitd as a systemd unit.

```ini
[Unit]
Description=Split daemon for feature flagging
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=simple
User=splitd
Group=http
UMask=002
Environment=SPLITD_CONF_FILE="/opt/splitd/splitd.yaml"
PIDFile=/run/splitd.pid
ExecStart=/opt/bin/splitd
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

##### b. Deploying splitd as a supervisord program

[Supervisord](http://supervisord.org/) is a client/server system to monitor and control a number of processes on UNIX-like operating systems. Below is an example configuration for supervisord to manage splitd.

```ini
[group:splitd]
programs=splitd
priority=20

[program:splitd]
user = splitd
umask = 002
command = /opt/splitd/splitd
process_name=%(program_name)s
startsecs = 0
autostart = true
autorestart = true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
environment = SPLITD_CONF_FILE="/opt/splitd/splitd.yaml"
```

This example configuration instructs supervisord to use a UNIX user account with the name 'splitd' to run the opt/splitd/splitd executable. You’ll need to create this UNIX user account before running this script, and run supervisord as the root user. See the [supervisord documentation](http://supervisord.org/) for the full Configuration File spec.

:::warning[Socket & permissions]
Special care should be taken to make the folder containing the IPC socket files read-writable by both splitd and the consumer application, as well as setting a umask parameter (so that sockets created in the folder inherit appropriate permissions).
:::

### Containerized sidecar

Since communication happens at a kernel level, containers running on the same host are able to connect via IPC. This means you can have a multi-container setup where splitd and the consumer application live in separate containers and use a shared mount volume to access the IPC socket handle. For this purpose we provide a sidecar-ready image which can be downloaded and easily integrated into an existing Docker Compose or Kubernetes infrastructure.

The following image illustrates architecture when splitd is running in a sidecar container.

<p>
<img src="https://help.split.io/hc/article_attachments/18307665471757" alt="splitd_sidecar.drawio.svg" />
</p>

#### 1. Pull the image

You can pull the image using the following command:

`docker pull splitsoftware/splitd-sidecar:latest`

#### 2. Setup a multi-container infrastructure

A multi-container infrastructure can be set up using Docker or Kubernetes. Both approaches are outlined below.

##### a. Setup splitd using Docker Compose

Below is an example of Docker Compose running splitd as a sidecar for a consumer application, using a mount volume to store the IPC socket, accessible by both the daemon and the application.

```yaml
version: "3.9"

services:

  splitd-sidecar:
    image: splitsoftware/splitd-sidecar
    volumes:
      - ${HOME}/uds:/shared
    environment:
      SPLITD_APIKEY: "MY_APIKEY"
      SPLITD_LINK_ADDRESS: "/shared/splitd.sock"

  application:
    depends_on:
      - "splitd-sidecar"
    image: organization/application:latest
    volumes:
      - ${HOME}/uds:/shared
    environment:
      SPLIT_IPC_SOCKET_ADDRESS: "/shared/splitd.sock"
    ports:
      - 80
```

:::warning[splitd configuration environment variables]
For a more comprehensive list of environment variables accepted by the splitd daemon, see the [Advanced Configuration](#advanced-configuration) section.
:::

##### b. Set up splitd using Kubernetes

Below is an example of a Kubernetes deployment file, using the sidecar pattern to attach an extra container to an application pod. The socket is made available by splitd to the application using a shared mount volume between both containers.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
  name: application-main
spec:
  replicas: 1
  strategy:
    type: Recreate
  selector:
    matchLabels:
      name: application-main
  template:
    metadata:
      labels:
        name: application-main
    spec:
      volumes:
        - name: splitd-app-shared-volume
          emptyDir: {}
      containers:
        - name: app
          image: someOrg/application-main
          volumeMounts:
            - mountPath: "/shared"
              name: splitd-app-shared-volume
              readOnly: false
          env:
            - name: SPLITD_LINK_ADDRESS
              value: "/shared/splitd.sock"
            - name: SPLITD_LINK_TYPE
              value: "unix-seqpacket"
          ports:
            - containerPort: 80
              name: app
          resources:
            requests:
              cpu: "200m"
              memory: "128Mi"
            limits:
              cpu: "1000m"
              memory: "512Mi"
          startupProbe:
            tcpSocket:
              port: app
            initialDelaySeconds: 25
            timeoutSeconds: 5
            periodSeconds: 5
            successThreshold: 1
            failureThreshold: 3
          livenessProbe:
            tcpSocket:
              port: app
            timeoutSeconds: 5
            periodSeconds: 5
            successThreshold: 1
            failureThreshold: 3

        - name: splitd
          image: splitsoftware/splitd-sidecar
          volumeMounts:
            - mountPath: "/shared"
              name: splitd-app-shared-volume
              readOnly: false
          env:
            - name: SPLITD_APIKEY
              valueFrom:
                secretKeyRef:
                  name: app-main
                  key: SPLIT_APIKEY
              value: "https://streaming.split.io/sse"
            - name: SPLITD_LINK_ADDRESS
              value: "/shared/splitd.sock"
            - name: SPLITD_LINK_TYPE
              value: "unix-seqpacket"
          resources:
            requests:
              cpu: "200m"
              memory: "128Mi"
            limits:
              cpu: "1000m"
              memory: "512Mi"
      imagePullSecrets:
        - name: docker-registry
      securityContext:
        fsGroup: 65534
```

## Advanced configuration

The daemon has several configuration options that can be tuned to make the deployment work in different situations. We offer a template [splitd.yaml.tpl](https://raw.githubusercontent.com/splitio/splitd/main/splitd.yaml.tpl) that can be used as a starting point with reasonable defaults for most use cases. It can then be tailored to suit more specific needs such as supporting larger payloads, higher concurrency, etc.

:::info[Configuration for container-based environments]
For container-based deployment, our image uses an entrypoint.sh shell executable file that captures environment variables and uses them to generate a yaml file at startup, before executing the daemon.
:::

:::info[Configuration for local installations]
For non-container based deployments, you must ensure that both the splitd binary and the final yaml configuration are placed on the server. The location of the configuration file defaults to `/etc/splitd.yaml` and can be specified by the `SPLITD_CONF_FILE` environment variable.
:::

```yaml title="splitd.yaml"
logging:
    level: error
    output: /dev/stdout
sdk:
    apikey: <server-side-sdk-apikey>
    impressions:
        mode: optimized
        queueSize: 8192
    events:
        queueSize: 8192
link:
    type: unix-seqpacket
    address: /var/run/splitd.sock
    bufferSize: 1024
```

### YAML Configuration options and its equivalents in environment variables

| **YAML option** | **Environment variable (container-only)** | **Description** | **Default** | **Since** |
| --- | --- | --- | --- | --- |
| sdk.apikey | SPLITD_APIKEY | **(required always)** Server-side Split API key | EMPTY | 1.0.0 |
| sdk.streamingEnabled | SPLITD_STREAMING_ENABLED | Whether to enable streaming | `true` | 1.0.0 |
| sdk.labelsEnabled | SPLITD_LABELS_ENABLED | Whether to send labels on impressions | `true` | 1.0.0 |
| sdk.featureFlags.splitRefreshSeconds | SPLITD_FEATURE_FLAGS_SPLIT_REFRESH_SECS | Refresh rate when operating in polling (seconds) | `30` | 1.0.1 |
| sdk.featureFlags.segmentRefreshSeconds | SPLITD_FEATURE_FLAGS_SEGMENT_REFRESH_SECS | Refresh rate for segments when operating in polling (seconds) | `60` | 1.0.1 |
| sdk.impressions.mode | SPLITD_IMPRESSIONS_MODE | Impressions handling strategy [`optimized`/`debug`] | `optimized` | 1.0.1 |
| sdk.impressions.refreshRateSeconds | SPLITD_IMPRESSIONS_REFRESH_SECS | How often to flush impressions to Split servers | 1800 | 1.0.1 |
| sdk.impressions.queueSize | SPLITD_IMPRESSIONS_QUEUE_SIZE | How many impressions (per client) to accumulate before flushing | `8192` | 1.0.1 |
| sdk.events.refreshRateSeconds | SPLITD_EVENTS_REFRESH_SECS | How often to flush events to Split servers | `60` | 1.0.1 |
| sdk.events.queueSize | SPLITD_EVENTS_QUEUE_SIZE | How many events (per client) to accumulate before flushing | `8192` | 1.0.1 |
| sdk.flagSetsFilter | SPLITD_FLAG_SETS_FILTER | This setting allows the Split Synchronizer to synchronize only the feature flags in the specified flag sets. All other flags are not synchronized, resulting in a reduced payload. | empty | 1.2.0 |
| sdk.urls.auth | SPLITD_AUTH_URL | Auth Endpoint | `https://auth.split.io/` | 1.0.0 |
| sdk.urls.sdk |SPLITD_SDK_URL | SDK Targeting Rules Endpoint | `https://sdk.split.io/api` | 1.0.0 |
| sdk.urls.events | SPLITD_EVENTS_URL | Events and Impressions Endpoint | `https://events.split.io/api` | 1.0.0 |
| sdk.urls.streaming | SPLITD_TELEMETRY_URL | Telemetry Endpoint  | `https://telemetry.split.io/api/v1`| 1.0.0 |
| sdk.urls.telemetry | SPLITD_STREAMING_URL | Streaming Endpoint | `https://streaming.split.io/sse` | 1.0.0 |
| link.type | SPLITD_LINK_TYPE | Type of socket to use [`unix-stream`/`unix-seqpacket`] | `unix-seqpacket` | 1.0.0 |
| link.serialization | SPLITD_LINK_SERIALIZATION | Serialization mechanism to use. Only messagepack currently supported | `msgpack` | 1.0.0
| link.maxSimultaneousConns | SPLITD_LINK_MAX_CONNS | Maximum number of clients that can be attached at the same time | `1024` | 1.0.0
| link.readTimeoutMS | SPLITD_LINK_READ_TIMEOUT_MS | Socket read timeout in milliseconds | `1000` | 1.0.0 |
| link.writeTimeoutMS |SPLITD_LINK_WRITE_TIMEOUT_MS | Socket write timeout in milliseconds | `1000` | 1.0.0 |
| link.acceptTimeoutMS | SPLITD_LINK_ACCEPT_TIMEOUT_MS | Socket accept timeout in milliseconds | `1000` | 1.0.0 |
| logging.level | SPLITD_LOG_LEVEL | Log level [`error`/`warning`/`info`/`debug`/`verbose`] | `error` | 1.0.0 |
| logging.output | SPLITD_LOG_OUTPUT | Log output | `/dev/stdout` | 1.0.1 |


### A word on IPC socket types

`splitd` currently supports listenting for connection on two types of unix sockets: `STREAM` and `SEQPACKET`.

Stream-based sockets operate in a similar fashion to TCP-based sockets, without message boundaries and with support for partial reads. Sequenced packet sockets, on the other hand, preserve message boundaries and require the reader to consume the whole package at once (with properly preallocated buffers on the reader side). Since sequenced packet sockets do not require framing/unframing and read with a single syscall, they tend to perform better than stream-based sockets, but they have limited support for large message sizes. With current splitd support for SDK `client.getTreatment()` and `client.getTreatments()` function calls, message size limits are not an issue, but once the manager functionality for querying Split feature flags or dynamic configs become available, it's possible to hit message size limits with the Split Thin SDK `client.getTreatmentsWithConfig()` or `manager.Splits()` function calls.

For handling large payloads, the following options can be considered:
* Use `unix-stream` type sockets. (Note that configuration should be set on both splitd and the consumer application).
* Update the OS buffer sizes (`/proc/sys/net/core/wmem_max` and `/proc/sys/net/core/rmem_max`). An example can be seen [here](https://www.ibm.com/docs/de/smpi/10.2?topic=mpi-tuning-your-linux-system).

## Using a network proxy

If you need to use a network proxy, configure proxies by setting the environment variables **HTTP_PROXY** and **HTTPS_PROXY**. The internal HTTP client reads those variables and uses them to perform the server request.


```bash title="Example: Environment variables"
$ export HTTP_PROXY="http://10.10.1.10:3128"
$ export HTTPS_PROXY="http://10.10.1.10:1080"
```

### Splitd service shutdown

The splitd daemon handles `SIGTERM` gracefully, flushing all queued data to the backend before the application exits, and removing the socket file. Alternately a `SIGKILL` can be used to abort execution.
