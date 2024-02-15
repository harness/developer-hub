---
title: Kubernetes Traffic Routing Step
description: This topic describes how to route traffic in pipelines using the traffic routing step.
sidebar_position: 6
---

This topic describes the Kubernetes Traffic Routing step. These configuration options can be found in the Blue Green (BG) Deployment step as well as the Canary Deployment step. 

Here is a video demo of traffic shifting in a Kubernetes deployments.

<DocVideo src="https://www.loom.com/share/b1cf1db3300946b9b8fe48ae85bbfc26?sid=bef8f5d9-af26-4f24-a7ad-f244ac724572" />

## Traffic Routing Step Parameters

### Name
 
Name of the step.

### Config Type

Specify your configuration type here. Currently there are two choices:

* **New Config**: Select this option if you want to specify a new configuration for traffic routing in this step.
* **Inherit**: Select this option if you want the traffic routing step to inherit a configuration from a previous Blue Green, Canary, or Traffic Routing step.  

### Provider

Specify your service mesh provider. Harness currently supports Service Mesh Interface (SMI) and Istio. 

Each provider will have some common configuration options and some provider specific ones. We have listed all configuration options for each provider so you should only have to look at the one relevant to you.

#### Service Mesh Interface (SMI)

Before you begin, make sure you have an understanding on what SMI is and how it works by [visiting their website](https://smi-spec.io/). 

:::note
Currently, we only support specs.smi-spec.io/v1alpha3 and specs.smi-spec.io/v1alpha4 resources.
:::

* **Parameters**:
    * **Resource Name:** This name will be used to generate a kubernetes name for traffic resources. Hence the name needs to be kubernetes resource name compliant. 
    * **Root Service:** Specify your root service.

* **Configure Routes**: Currently, Harness supports only the `http` route type.

* **Route Rules**: Route rules filter incoming requests. Here are the supported route rule types for `http` routes.

    * **uri**:
        * **Match Type**: One of three values (exact, prefix, regex). Used to determine how the `value` below is being matched against the incoming request.
        * **Value**: Enter the value that you want matched using the match type specified above. 

    * **method**:
        * **Rule Value**: Specify the request method type you want.

    * **header**:
        * **Values**:
            - **Key**: Specify the key of the request header
            - **Value**: Specify the value you want for this key
            - **Match Type**: Specify how you want the value to match they key. 

* **Destinations**: Specify the destinations here.

    * **Host**: Should be the name of the Kubernetes service resource.

    :::note 
    For Blue/Green deployments we recommend using the placeholder `stable` and `stage` resource names.

    For Canary deployments we recommend using the placeholder `stable` and `canary` resource names.

    These names will be replaced by the actual Kubernetes service resource names which were generated during the B/G or canary deployment.
    :::

    * **Weight**: Specify the percentage of traffic that will reach this host. The weight should be a number from 0 - 100.

    :::note
    If the total weights for all host destinations is not equal to 100, the weight values will be normalized into a percentage, and the pipeline will run with a warning.
    :::

#### Istio

Before you begin, make sure you have an understanding of Istio and how it works by referring to [their website](https://istio.io/latest/about/service-mesh/).

* **Parameters**:
    * **Resource Name:** This name will be used to generate a kubernetes name for traffic resources. Hence the name needs to be kubernetes resource name compliant. 

* **Configure Routes**: Currently, Harness supports only the `http` route type.

* **Route Rules**: Route rules filter incoming requests. Here are the supported route rule types for `http` routes.

    * **uri**:
        * **Match Type**: One of three values (exact, prefix, regex). Used to determine how the `value` below is being matched against the incoming request.
        * **Value**: Enter the value that you want matched using the match type specified above. 

    * **method**:
        * **Rule Value**: Specify the request method type you want.

    * **header**:
        * **Values**:
            - **Key**: Specify the key of the request header
            - **Value**: Specify the value you want for this key
            - **Match Type**: Specify how you want the value to match they key. 
    
    * **scheme**:
        * **Match Type**: Specify how you want to match the scheme to the URI.
        * **Rule Value**: Specify which URI scheme you want to match with.

    * **authority**:
        * **Match Type**: Specify how you want to match the authority.
        * **Rule Value**: Specify which authority you want to match with.

    * **port**: 
        * **Rule Value**: Specify the port of the `http` request.
  
* **Destinations**: Specify the destinations here.

    * **Host**: Should be the name of the Kubernetes service resource.

    :::note 
    For Blue/Green deployments we recommend using the placeholder `stable` and `stage` resource names.

    For Canary deployments we recommend using the placeholder `stable` and `canary` resource names.

    These names will be replaced by the actual Kubernetes service resource names which were generated during the B/G or canary deployment.
    :::

    * **Weight**: Specify the percentage of traffic that will reach this host. The weight should be a number from 0 - 100.

    :::note
    If the total weights for all host destinations is not equal to 100, the weight values will be normalized into a percentage, and the pipeline will run with a warning.
    :::

* **Hosts**: Specify your host. Learn more about Istio host field [here](https://istio.io/latest/docs/concepts/traffic-management/#the-hosts-field).

* **Gateway**: Specify your Istio gateway. Learn more about Istio gateways [here](https://istio.io/latest/docs/reference/config/networking/gateway/).

### Advanced

See the following topics for advanced settings:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)