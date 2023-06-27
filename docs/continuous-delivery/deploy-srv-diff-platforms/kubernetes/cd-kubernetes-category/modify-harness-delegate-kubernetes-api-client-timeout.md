---
title: Modify Harness Delegate's Kubernetes API client timeout
description: Modify the read and connection timeouts for Kubernetes API client within Harness Delegate.
sidebar_position: 10
---


Harness Delegate uses Kubernetes Java client to make programmatic API calls to the Kubernetes server. For example, CRUD API calls for Kubernetes objects like ConfigMaps, Secrets, and so on.


## Configuration

The API client uses an OkHttp client whose default [read timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/read-timeout/) and [connect timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/connect-timeout/) values are set to 120 and 60 seconds respectively.

These values can be configured using environment variables by modifying the delegate's container environment. 

These values must be specified in seconds. 

The environment variables for these timeouts are:

 - Read timeout: `K8S_API_CLIENT_READ_TIMEOUT`.
 - Connect timeout: `K8S_API_CLIENT_CONNECT_TIMEOUT`.
