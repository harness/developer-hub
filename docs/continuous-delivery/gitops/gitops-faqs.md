---
title: GitOps FAQs
description: Frequently asked questions about Harness GitOps.
sidebar_position: 1000
---

This article addresses some frequently asked questions about Harness GitOps.


### What is Harness GitOps?

Harness GitOps lets you perform GitOps deployments in Harness. You define the desired state of the service you want to deploy in your Git manifest, and then use Harness GitOps to sync the state with your live Kubernetes cluster.
For more details please see [here](https://developer.harness.io/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics/).

### Can I use Harness GitOps images from a local registry?

Yes. Pulling images from your private registry is possible and can be done by pulling the publicly available images to your private registry and then updating the GitOPS Agent YAML to use the private registry.

### Can I automate the provisioning of the GitOps Agent without creating the agent in the UI first?
Yes. You can use the API or Terraform which will also dynamically generate the YAML that can be applied.


### What is the easiest way to determine the ArgoCD version using a GitOps agent?

An easy method to identify the ArgoCD version is by creating a GitOps agent and inspecting the associated manifest.


### Does the Harness GitOps Agent support High Availability and scalability?

A: Yes, the Harness GitOps Agent supports High Availability and scalability by allowing you to deploy multiple agents across different clusters. This ensures redundancy and load distribution.


### Which versions of ArgoCd that the latest version of the GitOps agent support? 

You can find the latest supported ArgoCD versions in the [GitOps Agent Documentation](/docs/continuous-delivery/gitops/agents/install-a-harness-git-ops-agent/#what-version-of-gitops-agent-supports-what-version-of-repo-server-and-redis-cache).
 

### The GitOps agent updater, can you advise that this will update the Agent, ArgoCD and Redis? Is this also true if use the option to bring our own ArgoCD?
 
It is used to update agents only whenever a new version is available. The ArgoCD components upgrade must be done manually.

 
### Is it possible to automate the provisioning of the GitOps agent using a Helm chart without having to register/create the agent in the UI first? At the moment it looks like you need to create the Agent in the UI which then generates the YAML or Helm chart for you.
Yes, using Terraform, it is possible to automate the provisioning of the GitOps Agent without having to register/create an agent in the UI.


### Do we support OCI repository and automation for adding a new repository in our GitOps approach?

Yes. For more details, go to [Helm OCI repository documentation](https://developer.harness.io/docs/continuous-delivery/gitops/oci-support/helm-oci-repository-aws-ecr).


### Does Harness provides drift detection for Kubernetes non-GitOps pipelines ?

No, this feature is still under development and not yet supported. We hope to deliver this soon!


### The user is getting this error while adding GitOps agent: "failed to create cluster in argo: createClusterInArgo: rpc error: code = InvalidArgument desc = cannot register cluster: in- cluster has been disabled". What needs to be enabled?
The user needs to make the required changes in the config map (cluster.inClusterEnabled: 'true').


### Do we have a way of adding certificate at project/org level to be consumed by GitOps Agent ?

We do not have a way to add certificates at different scope for project/org/account level for GitOps Agent. This is an agent side configuration and need to be done at the agent itself. For more details, go to [Harness GitOps Agent with self-signed certificates](https://developer.harness.io/docs/continuous-delivery/gitops/agents/harness-git-ops-agent-with-self-signed-certificates).


### Is there a method to configure the Harness GitOps agent auto updater to utilize our Artifactory proxy for Docker Hub, considering policy of not allowing Kubernetes clusters to access the public internet directly ?

Organizations can import the GitOps Image from the specified [Docker Hub repository](https://hub.docker.com/r/harness/gitops-agent/tags) into their JFrog Artifactory. However, utilizing the auto updater feature may not be feasible in this scenario. Nonetheless, manual copying of the image to the Artifactory and subsequent pulling from there remains an alternative approach. For more details, go to [Harness GitOps documentation](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent/).


### How does the requirement for all applications within an ArgoCD appset to be managed by the same agent, despite links being able to connect to multiple clusters, affect the usability of ArgoCD Application Sets?

The requirement that all applications within an ArgoCD appset must be managed by the same AGENT, despite the capability of links to connect to multiple clusters, is indeed recognized as a limitation of ArgoCD Application Sets.
For more details, go to [ArgoCD ApplicationSet documentation](https://developer.harness.io/docs/continuous-delivery/gitops/applicationsets/appset-basics/).


### What is the optimal number of ArgoCD instances required for bootstrapping environments and managing GitOps infrastructure?

The installation of the ArgoCD reconciler concurrently with environment creation streamlines the execution of GitOps practices at scale, thus mitigating the complexities associated with bootstrapping environments and managing GitOps infrastructure.
For more details, go to ArgoCD, Terraform, and Harness [blog](https://www.harness.io/blog/argocd-terraform-and-harness).


### Why is the GitOps Sync step failing with the following error? 

```
Application does not correspond to the service(s) selected in the pipeline execution

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

You can use [Mozilla SOPS](https://developer.harness.io/docs/continuous-delivery/gitops/security/sops), which enables you to securely manage sensitive data by encrypting it before storing it in your Git repository.

Once encrypted, SOPS decrypts the data during deployment using the keys stored as Kubernetes secrets, ensuring that your sensitive information remains protected.


### How to disable pushing logs from the GitOps Agent to Stackdriver?
To disable logging to Stackdriver in GitOps, set `GITOPS_AGENT_ENABLE_STACK_DRIVER_LOGGER` to False in the the agent ConfigMap.

### What specific role does the "Add Deployment Repo Manifest" serve within the manifests for a Kubernetes service enabled with GitOps functionality?

The `Add Deployment Repo Manifest` primarily serves as a means to access additional repositories within the PR Pipeline. While the Release Repo is utilized directly by the pipeline, the Deployment Repo facilitates the retrieval of information from another repository, enhancing the pipeline's functionality and flexibility.

### Can I use Harness GitOps images from a local registry?

Yes. Pulling images from your private registry is possible and can be done by pulling the publicly available images to your private registry and then updating the GitOPS Agent YAML to use the private registry.

### Can I automate the provisioning of the GitOps Agent without creating the agent in the UI first?

Yes. You can use the API or Terraform which will also dynamically generate the YAML that can be applied.

### Does Microsoft Teams support full GitOps ?

No, Microsoft Teams does not support GitOps.

### Which RBAC policies or permissions are required to use Harness GitOps?

The minimum RBAC requirements depend on the applications and destination cluster setup. Thus, it is not straightforward to determine the minimum requirements for RBAC/permissions. For this reason, the ArgoCD application controller has wide RBAC permissions by default.

### How can I sync or delete an application or non-deployment resource?

Each resource in our UI has a three dot "kebab menu" that allows you sync or delete the resource. 

### How to get list of all gitops degraded/suspended gitops applications?

To get a list of all degraded/suspended applications, you can call an api to get the list of all the applications along with their health status, here is the API, you can use - 
 
```
curl 'https://app.harness.io/gateway/gitops/api/v1/applications?routingId=SNM_3IzhRa6SFPz6DIV7aA' \
  -H 'accept: */*' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'authorization: Bearer PAT_TOKEN' \

  --data-raw '{"accountIdentifier":"ACCOUNT_ID","orgIdentifier":"ORG_ID","projectIdentifier":"PROJECT_ID"}'
```

### Can I map multiple Argo CD projects to a single Harness project?

No, you cannot map the same Argo CD project to multiple Harness projects. Each Argo CD project must be mapped to a unique Harness project.

### What happens if I add new entities to my Argo CD project after mapping it to Harness?

Any new entities added to the mapped Argo CD project will be automatically imported into the corresponding Harness project, ensuring synchronization between both platforms.

### How can I verify that my Argo CD entities are correctly imported and visible in Harness?

After mapping, navigate to your Harness project, select GitOps, and check under Applications, Repositories, and Clusters to see the imported entities.

### What should I do if I need to upgrade my Argo CD version after setting up the BYOA agent?

If you upgrade your Argo CD to version 2.8.0 or later, you must restart the Harness GitOps agent pods to ensure they pick up the necessary configuration changes.

### How does Harness handle naming for Argo CD repositories when they are imported?

Harness automatically generates names for Argo CD repositories during the import process by removing dashes and appending a unique suffix. This ensures each repository has a distinct name within Harness.

### How can I declaratively create a  GitOps Applications using yaml manifest?

In Harness GitOps, you can achieve a similar approach to ArgoCD by using YAML manifests to define the GitOps applications declaratively. In the GitOps model, Harness allows you to manage the infrastructure and applications as code, keeping the boundaries between Harness metadata and the ArgoCD application clear. 

The actual ArgoCD Application resource will reside in the repo that your Harness GitOps application points to. This keeps a clean separation between Harness’ metadata and the ArgoCD application logic.

**Argo Application YAML**
```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-argo-app
  namespace: argo-cd
  labels:
    harness.io/envRef: harnessEnvId
    harness.io/serviceRef: harnessServiceId
spec:
  project: default
  source:
    repoURL: https://github.com/org/repo
    path: apps/my-app
    targetRevision: HEAD
  destination:
    server: https://kubernetes.default.svc
    namespace: my-app-namespace
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

**apiVersion & Kind**:
- apiVersion: argoproj.io/v1alpha1
- kind: Application These define the resource type as an ArgoCD Application, which ArgoCD uses to track and deploy Kubernetes resources from Git.

**Metadata**:
- name: my-argo-app - This gives your ArgoCD application a name 
- namespace: argocd - specifies the namespace in which the application is deployed.

**Spec**:
- Project: Points to the ArgoCD project (default is commonly used).

**Source**:
- repoURL: The URL of the Git repository where the app's Kubernetes resources live.
- path: The directory in the repo that contains the Kubernetes manifests for your application.
- targetRevision: The Git revision (branch or commit) you want ArgoCD to track.

**Destination**:
- server: The Kubernetes API server URL.
- namespace: The namespace in which to deploy the resources.

**SyncPolicy**:
- automated: Specifies that ArgoCD will automatically sync the app (prune resources and self-heal if necessary).

The project field must be set to an Argo project that is mapped to a Harness project for successful import functionality.

### Where are repository and cluster details stored in ArgoCD or the agent?  
Repository and cluster details are stored as secrets in the namespace where ArgoCD or the agent is installed. ConfigMaps and secrets are used to manage cluster information and repository details, and these are directly saved on the cluster where the agent is deployed.  

### What could cause a 403 Forbidden error when fetching an anonymous token for a repository?  
A 403 Forbidden error typically occurs due to insufficient permissions or incorrect repository configuration. This might mean the credentials used lack the required access or the repository details are misconfigured.  

### How can I verify if the credentials used for a repository are correct?  
To verify credentials:
   - Ensure the correct username and token/SSH key are being used.
   - Check the secret storing the repository credentials in the namespace where ArgoCD or the agent is deployed.
   - Confirm that the repository permissions align with the required access levels.  

### What happens if repository or cluster credentials are incorrect?  
If the credentials are incorrect, operations like fetching repository details, deploying to clusters, or synchronizing changes will fail, often resulting in errors such as 403 Forbidden or authentication failures.  

### How can I fix a 403 Forbidden error for a repository in ArgoCD or the agent?  
To resolve the error:
   - Verify that the repository credentials stored in the secret are correct.
   - Ensure the user or token has the appropriate access permissions for the repository.
   - Check if the repository URL is configured correctly in the repository secret or ConfigMap.

### Why are no clusters available in the Cluster selection menu, even though some are listed in the GUI?  
This typically happens when the clusters are not linked to the environment in your GitOps setup. Ensure the cluster is correctly linked by navigating to Environment > dev > GitOps > Link Clusters Available, then retry the process.  

### How can I resolve the issue of clusters not appearing in the CD pipeline?  
Verify that the agent, cluster, and service are set up correctly. After linking the clusters to your environment in the GitOps section, re-test the pipeline to confirm if the issue is resolved.  

### What steps should I take if the problem persists after linking the clusters?  
Double-check the cluster, agent, and service configurations in both Harness and your GitOps setup. If the issue persists, reach out to your Harness support team with detailed logs or screenshots for further assistance.

### For GitOps Repos, does Bitbucket fall under the umbrella of a supported platform?

Bitbucket is supported any git provider that Argo supports should be supported by us as well [Argo CD Access Token](https://argo-cd.readthedocs.io/en/release-1.8/user-guide/private-repositories/#access-token).

###  How can we address the unexpected behavior of linking a GitOps cluster to an environment when **a link already exists**, resulting in updated entities when we try to create secret/connector/pipeline etc that already exist?

The insert call creates a new link, but there is an update call that updates as well. The update call can be used to update the existing link.

###  How can we address the user's report of a GitOps agent container with errors, specifically the inability to connect to the GitOps server, and the subsequent authentication failures?

The GitOps agent's inability to connect to the server and subsequent authentication failures point to network connectivity or authentication configuration problems. Verify network connectivity between the agent and the server.  Check the agent's configuration for correct server address, port, and authentication credentials.  Review the server logs for any errors related to the agent's connection attempts.  Refer to [Harness Docs](https://developer.harness.io/docs/continuous-delivery/gitops/agents/install-a-harness-git-ops-agent/).

### How can users set up GitOps correctly and avoid configuration errors?  
Users should ensure:
- Correct repository configurations in the GitOps settings.
- Proper sync policies are in place.
- Required access permissions are granted for GitOps agents.

### How can we improve the experience of users getting logged out due to using existing Argo CD when services are prefixed?  
Users should check the following:
- Ensure correct environment variables are set for Redis and Repo connections.
- Validate that the GitOps agent is properly configured and has the necessary permissions.

### How can users resolve the issue of GitOps agents failing to connect to the GitOps server?  
Check the following:
- Ensure the agent config map is correctly set.
- Verify that the `AGENT_HTTP_TARGET` variable is properly defined.
- Restart the agent if configuration changes were made.

### How can users configure Sync Windows for GitOps applications?  
Argo CD allows configuring Sync Windows to control when auto-sync occurs. This can be done via:
- Defining maintenance windows.
- Using Sync Windows APIs to set restricted deployment times.

### How can users implement better control around GitOps Syncs to restrict certain applications?
Enhancement requests for GitOps RBAC improvements have been submitted, but currently, fine-grained GitOps RBAC controls are limited.

### How can a user manage Argo CD Application Sets using a single Argo CD Agent?
ArgoCD ApplicationSets do not fully support project-scoped repositories. While you can create an ApplicationSet, the underlying applications may fail to fetch repository contents due to authentication issues.
Workarounds:
- Use an Organization-scoped or Account-scoped repository instead of a Project-scoped repository.
- Configure repo-cred templates to manage authentication for project-level repositories.
This is a known limitation in [ArgoCD](https://github.com/argoproj/argo-cd/issues/21016).

### How are App Project IDs generated?

Harness uses the following procedure to calculate the app project id:

1. Concatenate the account id, org id, and project id. For example:
2. Generate the `md5` hash for the string in step 1. For example, if the string was `proddefaulttest` then the hash might be `abcdefghijklmnopqrstuvwxyz`
3. The first 8 characters of the hash is the app project id. For example, `abcdefgh`.

##### Example: 
  ```
  accountid: prod
  orgid: default
  projectid: test

  concatenated string: proddefaulttest

  hash: abcdefghijklmnopqrstuvwxyz

  app project id: `abcdefgh`
  ```

### Why does my pipeline error when env/cluster IDs are set as variables?
Harness resolves pipeline variables at runtime. If a required value (like cluster ID) is missing or not passed correctly, internal resolution fails and may result in a NullPointerException, especially if the pipeline expects a static value.

### What causes the "data is null" NullPointerException at the GitOpsClusters step?
This error means that the variable expression for the cluster (or environment/agent) did not resolve to a valid value—leaving the Harness engine with a null data object to process.

### What are the prerequisites for referencing clusters and environments as variables in a pipeline?
The clusters you want to reference must be correctly linked to their respective environments in Harness.

All variable values (env ID, agent ID, cluster ID) must exist in the correct Harness scope and be accessible at runtime.

### How do I ensure GitOps clusters are correctly linked to an environment?
Navigate to your environment in Harness, open the GitOps Clusters tab, and verify or add linked clusters using the Select Cluster option.

Only clusters linked to the selected environment will be available for selection or reference in the pipeline.

### Can I use dynamic expressions (variables) for env/cluster in pipelines?
Yes, but ensure variable names and values are set and passed correctly via pipeline parameters or input sets.

Pipeline will fail with null-related errors if referenced variables are not set or if their values are out of scope.

### What are best practices for defining and passing cluster/environment variables?
Use pipeline-level or input set variables for env, agent, cluster IDs.

Validate expressions like ```<+pipeline.variables.env_id>``` resolve correctly before the GitOpsClusters step.

Always provide default values or validate variable presence to avoid null resolution failures.

### How can I debug which variable is not set (causing 'data is null')?
Add debug steps or echo variable values before the failing step.

Check pipeline execution logs for which variable resolved to null.

Use static values for testing, then incrementally shift to variables once confirmed working.

### How do I link clusters in a reusable, non-hardcoded way?
Link clusters at the environment level and refer to their IDs by variable.

Map environment/cluster names to IDs in a config file or project-level variables for dynamic reference.

### Is there any workaround for Harness requiring pre-linked clusters?
No, clusters must be pre-linked to environments.

You can't link a cluster at runtime via variable if it isn't already associated in Harness; linkage must be done manually or via API before pipeline run.

### If the problem persists, what troubleshooting steps help most?
Double-check that all variables (env, agent, cluster) are non-empty and accessible at the step.

Validate cluster linkage in UI.

Clear cache/restart the Harness UI in case of UI state issues.

Reach out to Harness support with pipeline YAML, error logs, variable settings, and environment/cluster mappings if issue is unresolved

### What does the "app is not allowed in project or project does not exist" error mean?
This error indicates that either:

The specified ArgoCD AppProject does not exist, or

The Application resource is not permitted to join that project, most commonly due to namespace or access misconfiguration13.

### Why does the application namespace matter in Harness and ArgoCD?
The metadata.namespace of your Application resource must match the namespace where the GitOps agent (ArgoCD controller) operates. If these do not match, the application may not be recognised or may not be permitted to join the specified project5.

### What is the correct way to set the Application's namespace?
The metadata.namespace should be the namespace where the GitOps agent is installed (e.g., ccgf-stage-harnessgitops).

This is separate from the destination.namespace in your spec, which refers to where your workloads will be deployed.

### How do I confirm my AppProject exists and is properly mapped in Harness?
Check in Harness UI under GitOps > Projects.

Ensure that the project with ID or name (xxxxxx in the error) exists.

Verify it is mapped correctly for your account and agent, and its sourceNamespaces includes the agent's namespace.

### What if the AppProject exists, but the error persists?
Confirm that the AppProject permits applications from the specific namespace you are using.

In ArgoCD, the AppProject’s spec.sourceNamespaces field must explicitly list your application namespace58.

If missing, update the AppProject to include it.

### Should the Application CR always be in the agent’s namespace?
Yes, unless ArgoCD is explicitly configured to allow Application CRDs in additional namespaces.

By default, only the namespace with the agent/controller is accepted unless extra config allows otherwise56.

### What is the distinction between metadata.namespace and spec.destination.namespace?
metadata.namespace: Where the ArgoCD Application CR itself resides (must match agent namespace unless advanced config is set).

spec.destination.namespace: The target namespace for deploying your Kubernetes workloads can be any namespace accessible by the agent.

### How can I fix the error if the application must be in a different namespace?
If you need the Application CR in a namespace other than the agent's, the ArgoCD deployment must:

Be configured with --application-namespaces to allow additional namespaces.

The AppProject should explicitly list the allowed source namespaces.

Otherwise, move your Application CR definition to the agent’s namespace.
