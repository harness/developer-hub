---
title: Kubernetes Traffic Routing Step
description: This topic describes how to route traffic in pipelines using the traffic routing step.
sidebar_position: 11
---

For a video of demo on traffic shifting see:

<DocVideo src="https://www.loom.com/share/b1cf1db3300946b9b8fe48ae85bbfc26?sid=bef8f5d9-af26-4f24-a7ad-f244ac724572" />

This page is a reference sheet for the K8s Traffic Routing Step. These same configuration options can be found in the Blue/Green (B/G) Deployment Step as well as the Canary Deployment Step. 

## Traffic Routing Step Parameters

#### Name

Name of the step

#### Config Type

Specify your configuration type here. Currently there are two choices:

1. **New Config**: Indicates that you would like to specify a new configuration for traffic routing in this step.
2. **Inherit**: Tells the traffic routing step to inherit a configuration from a previous B/G, Canary, or Traffic Routing Step. 

#### Provider

Specify your service mesh provider. Currently, the options are: 

1. **Service Mesh Interface (SMI)**
2. **Istio**

Each provider has a different configuration options as described below. 

## Service Mesh Interface (SMI)

Before you begin, make sure you have an understanding on what SMI is and how it works by [visiting their site](https://smi-spec.io/). 

### Parameters

**Resource Name:** Name of your resource
**Root Service:** Specify your root Service

### Configure Routes

Currently, only the `http` route type is supported.

#### Route Rules

Route rules filter incoming requests. Here are the currently supported route rule types for `http` routes.

**uri**
1. **Match Type**: Specifies the way you want to match incoming requests to filter them.
2. **Value**: Enter the value that you want matched using the match type specified above. 


**method**
1. **Rule Value**: Specify the request method type you want.

**header**
1. **Values**
    - **Key**: Specify the key of the request header
    - **Value**: Specify the value you want for this key
    - **Match Type**: Specify how you want the value to match they key. 

:::warning
**header** route rules are only available for SMI versions `v1alpha2` and onwards.
:::

#### Destinations

Specify your destinations here.

- **Host**: Specify the name of one of your destination hosts here.
- **Weight**: Specify the percentage of traffic that will reach this host. The weight should be a number from 0 - 100.

:::note
If the total of all the weights for all host destinations doesn't equal 100, the weight values will be normalized into a percentage and the pipeline will run with a warning.
:::

## Istio

Before you begin, make sure you have an understanding of Istio and how it works by referring to [their website](https://istio.io/latest/about/service-mesh/).

### Parameters

**Resource Name**: The name of your resource. 

### Configure Routes

Currently, only the `http` route type is supported.

#### Route Rules

Route rules filter incoming requests. Here are the currently supported route rule types for `http` routes.

**uri**
1. **Match Type**: Specifies the way you want to match incoming requests to filter them.
2. **Value**: Enter the value that you want matched using the match type specified above. 


**method**
1. **Rule Value**: Specify the request method type you want.

**header**
1. **Values**
    - **Key**: Specify the key of the request header
    - **Value**: Specify the value you want for this key
    - **Match Type**: Specify how you want the value to match they key. 

**scheme**
1. **Match Type**: Specifies how you want to match the scheme to the URI.
2. **Rule Value**: Specifies which URI scheme you want to match with.

**authority**
1. **Match Type**: Specifies how you want to match the authority.
2. **Rule Value**: Specifies which authority you want to match with.

**port**
1. **Rule Value**: Specifies the port of the http request.

#### Destinations

Specify your destinations here.

- **Host**: Specify the name of one of your destination hosts here.
- **Weight**: Specify the percentage of traffic that will reach this host. The weight should be a number from 0 - 100.

:::note
If the total of all the weights for all host destinations doesn't equal 100, the weight values will be normalized into a percentage and the pipeline will run with a warning.
:::

### Hosts

Specify your host. [Learn more about istio host field here](https://istio.io/latest/docs/concepts/traffic-management/#the-hosts-field).

### Gateway

Specify your Istio gateway. [Learn more about istio gateways here](https://istio.io/latest/docs/reference/config/networking/gateway/).

## Advanced

See the following topics for these settings:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)