---
title: Modify Harness delegate's Kubernetes API client timeout
description: Modify the read and connection timeouts for Kubernetes API client within Harness delegate
sidebar_position: 10
---


Harness delegate uses Kubernetes java client to make programmatic API calls to the provided Kubernetes server. For example, some common API calls include various CRUD calls for Kubernetes objects like ConfigMaps, Secrets etc.


## Configuration

The API client uses a okhttp client whose default [read timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/read-timeout/) and [connect timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/connect-timeout/) values are set to 120 and 60 seconds respectively.

These values can be configured using environment variables, modifying the delegate's container environment. Values should be specified in SECONDS. 

The environment variables for these timeouts are:

 - Read timeout: `K8S_API_CLIENT_READ_TIMEOUT`
 - Connect timeout: `K8S_API_CLIENT_CONNECT_TIMEOUT`
