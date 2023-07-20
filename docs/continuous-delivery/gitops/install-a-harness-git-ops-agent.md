---
title: Harness GitOps Agent
description: This topic describes how to install a worker process that runs in your environment and performs tasks.
sidebar_position: 4
helpdocs_topic_id: 52r3l5q67u
helpdocs_category_id: 013h04sxex
helpdocs_is_private: false
helpdocs_is_published: true
---

GitOps Agent is a worker process that runs in your environment, makes secure, outbound connections to Harness SaaS, and performs all the GitOps tasks you request in Harness.

Typically, you install the Agent in the target cluster, but you can install it any cluster and it can connect to remote clusters using the credentials you provide.

## Requirements

The Harness GitOps Agent has the following requirements:

* **vCPUs, Memory, Disk Size:** the Agent only needs 1vCPUs, 2GB memory, 20GB disk, but you'll also be running Kubernetes and your deployed services. Consider the total CPU and memory needs for the Agent and the applications and services in your cluster.
* **Networking:** outbound HTTPS connection to **app.harness.io**, **github.com**, and **hub.docker.com**. Allow TCP port 22 for SSH.
* A **Kubernetes service account** should be configured with the necessary permissions to establish the desired system state. To enable the Agent to function properly, it must have either cluster-admin or admin privileges within the designated namespace. These permissions are required for the following actions:
	+ Creating Deployments, Services, StatefulSets, Network Policies, Service Accounts, Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, ConfigMaps, and Secrets. 
	+ Authorization to apply CustomResourceDefinitions.
	For more information, see [User-Facing Roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) from Kubernetes.
* **Namespace:** The target namespace in the cluster must already exist. Harness will not create the namespace for you.

## Installing an Agent

1. In **Getting started with Harness GitOps**, you have the option of installing a new Harness GitOps Agent with or without an existing Argo CD instances.
  
   If you already have an existing Argo CD instance, proceed with [Onboard to Harness GitOps with your own Argo](harness-git-ops-byoa.md).
   If not, select **No**, and then click **Start**.

2. In **Name**, enter the name for the new Agent. In **Namespace**, enter the namespace where you want to install the Harness GitOps Agent.

3. Select **Next**. The **Download YAML** or **Download Helm Chart** settings appear. The **YAML** option lets you download the manifest YAML and the **Helm Chart** option lets you download a `helm-chart` file for the Agent.

   Select your preferred option and click **Continue**

4. Select **Download & Continue**. You will be prompted to save the file.

   Open a terminal and navigate to the folder where you downloaded the file. In the same terminal, log into the Kubernetes cluster where you want to install the Agent.

   For example, here's a typical GKE login:

    ```
    gcloud container clusters get-credentials <cluster_name> --zone us-central1-c --project <project_name>
    ```

    In case of **YAML**, run the following command to apply the YAML file you downloaded (in this example, the namespace entered in the **Namespace** setting is `default`):

    ```
    kubectl apply -f gitops-agent.yaml -n default
    ```

    In case of **Helm Chart**, run the following command to install the `helm-chart` file you downloaded (in this example, the namespace entered in the **Namespace** setting is `default`):

    ```
    helm install gitops-agent ./gitops-agent.tgz -n default
    ```

    In the following output example you can see all of the Harness GitOps objects created in Kubernetes.

    ```
    % kubectl apply -f harness-gitops-agent.yaml -n default  
    customresourcedefinition.apiextensions.k8s.io/applications.argoproj.io created  
    customresourcedefinition.apiextensions.k8s.io/appprojects.argoproj.io created  
    serviceaccount/argocd-application-controller created  
    serviceaccount/argocd-redis created  
    serviceaccount/example-agent created  
    role.rbac.authorization.k8s.io/example-agent created  
    role.rbac.authorization.k8s.io/argocd-application-controller created  
    clusterrole.rbac.authorization.k8s.io/argocd-application-controller-default created  
    clusterrole.rbac.authorization.k8s.io/example-agent created  
    rolebinding.rbac.authorization.k8s.io/argocd-application-controller created  
    rolebinding.rbac.authorization.k8s.io/argocd-redis created  
    clusterrolebinding.rbac.authorization.k8s.io/argocd-application-controller-default created  
    rolebinding.rbac.authorization.k8s.io/example-agent created  
    clusterrolebinding.rbac.authorization.k8s.io/example-agent created  
    configmap/argocd-cm created  
    configmap/argocd-cmd-params-cm created  
    configmap/argocd-gpg-keys-cm created  
    configmap/argocd-rbac-cm created  
    configmap/argocd-ssh-known-hosts-cm created  
    configmap/argocd-tls-certs-cm created  
    secret/argocd-secret created  
    service/argocd-metrics created  
    service/argocd-redis created  
    service/argocd-repo-server created  
    deployment.apps/argocd-redis created  
    deployment.apps/argocd-repo-server created  
    statefulset.apps/argocd-application-controller created  
    networkpolicy.networking.k8s.io/argocd-application-controller-network-policy created  
    networkpolicy.networking.k8s.io/argocd-redis-network-policy created  
    networkpolicy.networking.k8s.io/argocd-repo-server-network-policy created  
    secret/example-agent created  
    configmap/example-agent created  
    deployment.apps/example-agent created  
    configmap/example-agent-upgrader created  
    role.rbac.authorization.k8s.io/example-agent-upgrader created  
    rolebinding.rbac.authorization.k8s.io/example-agent-upgrader created  
    serviceaccount/example-agent-upgrader created  
    Warning: batch/v1beta1 CronJob is deprecated in v1.21+, unavailable in v1.25+; use batch/v1 CronJob  
    cronjob.batch/example-agent-upgrader created
    ```
    :::note

    If the Harness GitOps Agent is being deployed to a cluster running Kubernetes v1.21 or less, Harness requires you replace `apiVersion: apiextensions.k8s.io/v1` with `apiVersion: apiextensions.k8s.io/v1beta1` in the deployment YAML file.

    :::

5. Select **Continue**.

   Harness will indicates that the Agent is registered.

   ![](./static/install-a-harness-git-ops-agent-90.png)

6. Select **Finish**.  
   When you are finished, the **Agents** list shows the new Agent as **Healthy** and **Connected**.

   ![](./static/install-a-harness-git-ops-agent-91.png)

Now you have the Harness GitOps Agent installed, registered, and running.

## Upgrading an Agent

The GitOps Agent comes with an upgrader service that performs upgrades and automatically detects when an upgrade is available.  
If you disable automatic upgrades, we recommend you manually update often since Harness is actively rolling out newer enhancements and bug fixes.

## GitOps Agent FAQs

Here are some answers to commonly asked GitOps Agent questions.

### What version of GitOps Agent supports what version of Repo server, Redis cache, and ApplicationSet?

GitOps Agent v0.56.0 supports redis:7.0.8-alpine, Repo server [argocd:v2.7.8](http://quay.io/argoproj/argocd:v2.7.8), and [argocd-applicationset:v0.4.1](http://quay.io/argoproj/argocd-applicationset:v0.4.1).

### How long is a GitOps Agent version supported?

Harness supports GitOps Agent versions that support Argo CD versions n to n-2 minor version (e.g 2.5.4, 2.4.4 2.3.4).

### How does the project mapping happen between Harness and Argo CD?

The GitOps Agent comes with an upgrader service that performs upgrades and automatically detects when an upgrade is needed.  
If you disable automatic upgrades, we recommend you manually update often since Harness is actively rolling out newer enhancements and bug fixes.

### Does Harness GitOps Agent work with proxy?

Yes, the Harness GitOps Agent can also work on environments where traffic is routed through a proxy. Perform the following steps to configure proxy support for the agent.

1. Make sure that the agent is running in HTTP mode.  
   To verify, check if the property/config `GITOPS_SERVICE_PROTOCOL` value is set to `HTTP1` in the `configmap({agentname}-agent)` present in the YAML after you create the agent.  
   `GITOPS_SERVICE_PROTOCOL: HTTP1`
2. Add a property/config `HTTPS_PROXY`, and add proxy details, such as URL, port, and auth details as its value in the configmap mentioned in Step 1. For example, `HTTPS_PROXY: "https://squid.proxy-test:3128"`.
3. Add an environment variable `NO_PROXY` in the Harness GitOps Agent deployment with the following value.  
   ```
   localhost,argocd-repo-server,argocd-dex-server,argocd-redis,127.0.0.1,$(KUBERNETES_SERVICE_HOST)
   ```

## References

* [Harness GitOps Basics](harness-git-ops-basics.md)
* [Harness CD GitOps Quickstart](harness-cd-git-ops-quickstart.md)
