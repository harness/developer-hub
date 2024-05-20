---
title: General GitOps FAQs
description: Frequently asked questions about Harness GitOps.
sidebar_position: 1000
---

### What is the easiest way to determine the ArgoCD version using a GitOps agent?

An easy method to identify the ArgoCD version is by creating a GitOps agent and inspecting the associated manifest.


### Does the Harness GitOps Agent support high availability and scalability?

A: Yes, the Harness GitOps Agent supports high availability and scalability by allowing you to deploy multiple agents across different clusters. This ensures redundancy and load distribution.


### Which versions of ArgoCd that the latest version of the GitOps agent support? 
We currently support v2.8.2
 

### The GitOps agent updater, can you advise that this will update the agent, argocd and redis? Is this also true if use the option to bring our own ArgoCd?
 
It is used to update agents only whenever a new version is available. The Argo CD components upgrade must be done manually

 

### Also, is it possible to automate the provisioning of the GitOps agent using a helm chart without having to register/create the agent in the UI first? At the moment it looks like you need to create the agent in the UI which then generates the yaml or helm chart for you.
Yes, using Terraform, it is possible to automate the provisioning of the GitOps agent without having to register/create an agent in the UI.


### Do we support OCI repository and automation for adding a new repository in our gitops approach?

Yes, Please refer more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/oci-support/helm-oci-repository-aws-ecr)


### What is Harness GitOps?

Harness GitOps lets you perform GitOps deployments in Harness. You define the desired state of the service you want to deploy in your Git manifest, and then use Harness GitOps to sync the state with your live Kubernetes cluster.
For more details please see [here](https://developer.harness.io/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics/)


### Can one manage Flux applications with Harness GitOps ?

Yes  one can manage Flux applications with Harness GitOps. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/use-flux/)


### Does Harness provides drift detection for k8s non-gitops pipelines ?

No, this feature is still under development and not yet supported. We hope to deliver this soon !


### The user is getting this error while adding GitOps agent: "failed to create cluster in argo: createClusterInArgo: rpc error: code = InvalidArgument desc = cannot register cluster: in- cluster has been disabled". What needs to be enabled?
The user needs to make the required changes in the config map ( cluster.inClusterEnabled: 'true' ).


### Do we have a way of adding certificate at project/org level to be consumed by gitops agent ?

We do not have a way to add certificates at different scope for project/org/account level for gitops agent. This is an agent side configuration and need to be done at the agent itself reference doc [link](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/harness-git-ops-agent-with-self-signed-certificates)


### Is there a method to configure the Harness GitOps agent auto updater to utilize our Artifactory proxy for Docker Hub, considering policy of not allowing Kubernetes clusters to access the public internet directly ?

Organizations can import the GitOps Image from the specified [Docker Hub repository](https://hub.docker.com/r/harness/gitops-agent/tags) into their JFrog Artifactory. However, utilizing the auto updater feature may not be feasible in this scenario. Nonetheless, manual copying of the image to the Artifactory and subsequent pulling from there remains an alternative approach.
Please read more on Harness GitOps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent/)


### How does the requirement for all applications within an ArgoCD appset to be managed by the same AGENT, despite links being able to connect to multiple clusters, affect the usability of ArgoCD Application Sets?

The requirement that all applications within an ArgoCD appset must be managed by the same AGENT, despite the capability of links to connect to multiple clusters, is indeed recognized as a limitation of ArgoCD Application Sets.
Please read more on ArgoCD ApplicationSet in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/applicationsets/appset-basics/)


### What is the optimal number of ArgoCD instances required for bootstrapping environments and managing GitOps infrastructure?

The installation of the ArgoCD reconciler concurrently with environment creation streamlines the execution of GitOps practices at scale, thus mitigating the complexities associated with bootstrapping environments and managing GitOps infrastructure.
Please read more on this in our blog on [ArgoCD, Terraform and Harness](https://www.harness.io/blog/argocd-terraform-and-harness)


### Why is the GitOps Sync step failing with the error, "Application does not correspond to the service(s) selected in the pipeline execution"?
```
Application{name: '$APP_NAME', agentIdentifier: '$AGENT_ID', errorMessage: 'Application does not correspond to the service(s) selected in the pipeline execution.'}
```
This error is caused by an inconsistency in the service(s) used in the deploy stage and the selected application. GitOps cannot sync a service that isn't correlated to the application. To fix this, go to the Continuous Delivery module, and select **GitOps** > **Applications** and then select the application. In **App Details**, check if the service configured for the application is the same as the service configured in the pipeline's deploy stage.


### How do I setup TLS in GitOps Agent?

To setup TLS in the GitOps Agent, mount the certificates onto the Agent deployment:

```
containers:
  volumeMounts:
  - mountPath: /path/to/cert
    name: your-tls-cert-volume
volumes:
- name: your-tls-cert-volume
  configMap:
    name: your-tls-cert-configMap
    defaultMode: 420
```

Next, set the `SSL_CERT_FILE` environment variable in the Agent deployment manifest:

```
containers:
- command:
    - /app/agent
  name: gitops-agent
  image: harness/gitops-agent:v0.72.0
  imagePullPolicy: Always
  env:
    - SSL_CERT_FILE: "/path/to/cert/crt.pem"
```

This environment variable will tell the Agent to look at the file specified in the given path. In this example, the Agent will look at `/path/to/cert/cert/crt.pem` and use it for TLS.


### Can I pass sensitive data in a Harness GitOps deployment?

You can use [Mozilla SOPS](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/sops), which enables you to securely manage sensitive data by encrypting it before storing it in your Git repository.

Once encrypted, SOPS decrypts the data during deployment using the keys stored as Kubernetes secrets, ensuring that your sensitive information remains protected.


### How to disable pushing logs from the GitOps Agent to Stackdriver?
To disable logging to Stackdriver in GitOps, set `GITOPS_AGENT_ENABLE_STACK_DRIVER_LOGGER` to False in the the agent ConfigMap.


