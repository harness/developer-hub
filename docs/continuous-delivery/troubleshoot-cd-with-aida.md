---
title: Troubleshoot CD with AIDA
description: AIDA is the Harness AI Development Assistant.
sidebar_position: 1000
---

:::info

Currently, AIDA for Continuous Delivery (CD) is a beta feature that is behind the feature flag `CD_AI_ENHANCED_REMEDIATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

[The Harness AI Development Assistant (AIDA)](https://harness.io/products/aida) can analyze log files and correlate error messages with known issues. This feature enables developers to troubleshoot and resolve deployment failures quickly, saving them from sifting through millions of log lines. AIDA also suggests fixes and predicts potential errors in the code even before the build is initiated. This feature is designed to work across Harness's CI and CD offerings.

:::info

Go to the [Harness legal page](https://www.harness.io/legal) for legal information about AIDA, including the [AIDA terms](https://www.harness.io/legal/aida-terms) and [AIDA data privacy information](https://www.harness.io/legal/aida-privacy).

:::

<!-- Video: AIDA demo
https://www.youtube.com/watch?v=p-3FZM49RqQ-->
<docvideo src="https://www.youtube.com/watch?v=p-3FZM49RqQ" />

## Using AIDA

AIDA is available if you have the AIDA feature flag enabled and a step in a pipeline failed.

When viewing the failed step's logs, select the **Harness AIDA** dialog to review error analysis and troubleshooting suggestions.

<docimage path={require('./static/aida-launch-button.png')} width="60%" height="60%" title="Click to view full size image" /> 

## Limitations

Currently, AIDA for CD has the following limitations: 
- AIDA is supported for Deployment stages only.
- AIDA is not supported for Custom stages. Harness anticipates providing support for Custom stages in the future. This includes Shell Script step and Run Container step configured within a Custom stage.
- AIDA is not supported for Verify steps.

## Troubleshooting examples

Here're some examples where AIDA is used to troubleshoot issues in CD: 

### Processing the error logs of a failed Kubernetes deployment

AIDA processes the error logs of a failed Kubernetes deployment and provide remediation to help developers figure out how resolve the failures. AIDA helps find resolution to errors within or outside of Harness.

For example, a Kubernetes deployment failed due to a non-existent namespace in a cluster. 

When you select the **Harness AIDA** dialog, AIDA provides you with information about the error, root cause of the error, and possible remediation suggestion as shown in the image below: 

<docimage path={require('./static/aida-troubleshooting-k8s.png')} width="70%" height="70%" title="Click to view full size image" /> 

Here's another example where a Kubernetes resource doesn't exist on the cluster. AIDA reviews the error and suggests possible solutions as shown in the image below: 

<docimage path={require('./static/aida-troubleshooting-k8s-1.png')} width="100%" height="100%" title="Click to view full size image" /> 

### Remediating errors in Harness resources

Apart from troubleshooting and remediating deployment specific errors, AIDA also helps remediate errors related to Harness resources. For example, AIDA can detect service misconfiguration that caused a deployment failure.

Let's see an example where Harness detected multiple errors in a multi-service deployment. Let's see the response for each error.

* In the first stage, the service used in the Deploy stage doesn’t have a service definition. This is a Harness resource related error.
  
  AIDA detects the error and provides a remediation as shown in the image below:  
  
  <docimage path={require('./static/aida-troubleshooting-k8s-2.png')} width="100%" height="100%" title="Click to view full size image" />

* In the subsequent parallel stage, the service used has service definition, but the Kubernetes resource defined in the service definition is not available. This is a Kubernetes resource related error.
  
  AIDA detects the error and provides a remediation as shown in the image below:  

  <docimage path={require('./static/aida-troubleshooting-k8s-3.png')} width="100%" height="100%" title="Click to view full size image" />

Let's see another example where there were no active Harness Delegates in an SSH deployment. 

* In an SSH deployment, there are no active delegates. Harness detects an error that it didn't find any eligible delegates to deploy the application. 
  
  AIDA reviews the context and provide more details about why the delegate was not detected as shown in the image below:  

  <docimage path={require('./static/aida-troubleshooting-k8s-4.png')} width="100%" height="100%" title="Click to view full size image" />


  
