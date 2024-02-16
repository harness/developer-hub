---
title: Harness Platform FAQs
description: Frequently asked questions about Harness Platform.
# sidebar_position: 2
---

# Harness Platform FAQs

## Delegates

### I can see that a legacy delegate is a statefulset object, what does this mean? and what's the major difference from Deployment type?

**StatefulSet:**
- **Purpose:** StatefulSets are designed for stateful applications that require stable network identities and stable storage.
Instances: StatefulSets maintains a sticky identity for each pod. Each pod has a unique and stable hostname, allowing for persistent storage and network identities.

- **Naming:** Pods in a StatefulSet get named predictably and consistently, which is often based on an index.

- **Scaling:** Scaling stateful applications may involve more complex operations due to the need for stable identities. Pods are typically created in sequential order, and scaling may involve specific considerations for data migration or coordination.

**Key Difference:**
The major difference between a Deployment and a StatefulSet lies in how they handle the identity and state of the pods:

- **StatefulSet** provides stable identities: Pods in a StatefulSet have stable and predictable identities, making them suitable for applications that require persistent storage and network identifiers.
- **Deployment** is more suitable for stateless applications: Deployments are well-suited for applications where each instance is interchangeable, and statelessness is a design principle.

### What is exit status 127 in a delegate pod?

In a Kubernetes context, when you see an exit code of 127, it is typically associated with issues related to the execution of container commands within a pod. Here are some common scenarios in a Kubernetes context:

**Command or Binary Not Found:**
- The container might be trying to execute a command or binary that is not installed or not available in the container's filesystem. Ensure that the necessary commands or binaries are included in the container image.

**Incorrect Path or Command Name:**
- If there's a mistake in the path or the name of the command specified in the Kubernetes pod definition, it could result in a 127 exit code. Double-check the command configuration in your pod specification.

**Permissions Issues:**
- Ensure that the container has the necessary permissions to execute the specified command. This includes both file system permissions within the container and the user permissions under which the container is running.

**Image or Container Initialization Failures:**
- If the container fails to start or initialize properly, it might result in a 127 exit code. Check the container logs for any error messages that might indicate initialization issues.
When debugging a pod with an exit code of 127, you can inspect the pod logs to get more details about what went wrong. Use the following command to view the logs for a specific pod:

```
kubectl logs <pod-name>
```

Replace `<pod-name>` with the actual name of your pod. Examining the logs can provide insights into the specific command or process that failed and help you diagnose and resolve the issue.

### How can I receive a notification when the delegate’s heartbeat connectivity fails?

At present, we do not support direct notifications for failures in the delegate's heartbeat connectivity. However, you can effectively monitor your delegate using Prometheus metrics, which is a functionality we do support.

### Where is the currently set session inactive timeout value located?

You can find this value on the Authentication page (right below the Overview menu on the left), the field will be at the bottom of the page: ```Session Inactivity Timeout (in minutes)```.

### How can I extend the time before a delegate is disconnected from the manager when the API token is revoked?

This is not configurable; once the token is revoked, the delegate will get disconnected immediately. However, you can have a delegate in the account running continuously, which can execute all tasks. This way, when you revoke tokens for other delegates for testing, there will be at least one delegate in the account available to run the task.

### Can we use persistent volume as tmpdir for delegate?

Yes, we can use it.

### How can we remove legacy delegate and use immutable delegate instead of legacy?

You can stop legacy delegate and download new yaml from ui and install immutable delegate as immutable is enabled by default.

### Do we have docs for delegate install and for adding GCP connector?

Yes, we do have docs:

- Installation of delegate : [here](https://developer.harness.io/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp/).
- Addition of GCP connector : [here](https://developer.harness.io/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp/).

### Could we get some specific around when it can be expected for the kubectl version to be update in the default harness/delegate image?

We are in the process of upgrading the Kubectl version. It will be soon reflected.

### What does delegate resource threshold DYNAMIC_REQUEST_HANDLING do?

 By default delegate task capacity is purely based on the number of tasks which is not ideal as some tasks consume far less resources than the others. Enabling `DYNAMIC_REQUEST_HANDLING` would make delegate take tasks based on the available resources (CPU/Memory) instead, so if delegate is overloaded it would reject a task (default is 80% cpu/mem). If either CPU or Mem is at 80% or more, delegate would reject the task.

### What causes the delegate Out-of-memory error, and how can I fix it?

The delegate throws an error indicating `java.lang.OutOfMemoryError` or that the delegate has run out of heap space. The container has run out of memory or the delegate has exceeded heap space. Review the container's memory usage. Harness recommends that you use `Xms` and `Xmx` or `MinRAMPercentage` and `MaxRAMPercentage` JVM arguments to adjust the heap size of the delegate. You can provide these arguments via the `JAVA_OPTS` environment variable when you set up the delegate.

### How can the user remove the single disconnected delegate pod?

The disconnected delegate pod will automatically removed after the 7 days from the disconnection.

### Is there a way the user can run all the steps on one specific delegate pod?

Yes, user can run all the steps on one specific delegate pod. Doc: https://developer.harness.io/docs/platform/delegates/manage-delegates/run-all-pipeline-steps-in-one-pod/

### How do I install Harness delegate using Azure ACI?

You can use the following repository as a sample to install it through Terraform. (Terraform Example)[https://gist.github.com/rssnyder/40ebf23bc352a2fbf75005239367abcd].

### How often does Harness upgrade the kubectl binary version within the delegate?

We don’t have an exact period for when these upgrades occur, but we maintain a list of supported platforms and technologies at [https://developer.harness.io/docs/get-started/supported-platforms-and-technologies/]. Using ```INIT_SCRIPT```, you can also customize the kubectl binary version.

### Can we add Custom Selector in the Harness Delegate chart for legacy delegates?

For legacy delegates we do not have a way to specify delegate selector or delegate tags in the delegate helm chart. We do have an api to get the selectors as well as update it for the delegates. More details can be found here:

https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-delegate-selector-api/


### Why the task_failed_total metric for delegate is not reporting data despite step failure?

The task failed is when something unhandled happens, like a NPE in a task or issue at framework level. A valid failure like shell script exited with error code is not a task failure. Prometheus only shows the metric which are at least once recorded.

### Why do we need core_delegate_delete permission for revoking delegate token?

The api call that we make for revoking the delegate token makes the delegate which are using it not register anymore and hence delete delegate permission is required for revoking the token as well.

### Do we provide customized docker images for delegate?

We do not provide any customized docker images for delegates however we do have our delegate docker file in the public repo below. This can be used as a sample reference to add any utility to the image:
```
https://github.com/harness/delegate-dockerfile/tree/main
```

### Can we use immutable delegate image in the statefulset deployment yaml for delegates?

We can not use immutable delegate image in the statefulset deployment yaml that we had for legacy delegates. Both the delegates are architecturally different. The immutable delegates must be used with their own deployment yaml.

### Is there a way to enable more granular level for delegate logs?

We do not have additional log level settings for delegate than what it logs by default. 

### Can we use custom temp space to be used by delegate?

We can make use of environment variable TMPDIR on the delegate and use any directory as path to be used for temp storage.

```
- name: TMPDIR
  value: /opt/harness-delegate/deployvol/tmp

```

### How is the version of the Immutable Delegate Docker Image managed and released to SMP?

The release of the Immutable Delegate version to SMP involves setting the `IMMUTABLE_DELEGATE_DOCKER_IMAGE` version as an environment variable in the manager. When users download the YAML, this version is read from the environment variable, and SaaS utilizes pipelines to update MongoDB entries. During pod startup in SMP, the environment values are populated in the database, facilitating the direct retrieval of the Immutable Delegate version.

### If the DELEGATE_RESOURCE_THRESHOLD is set to zero, does the delegate reject all tasks?

No, if `DELEGATE_RESOURCE_THRESHOLD` is set to zero, it behaves as if the feature is off, and the delegate acquires tasks as normal without rejection. Also, we have the default `DELEGATE_RESOURCE_THRESHOLD` value as 80.

### Can we add Custom Selector in the harness delegate chart for legacy delegates?

For legacy delegates we do not have a way to specify delegate selector or delegate tags in the delegate helm chart. We do have an api to get the selectors as well as update it for the delegates. More details can be found here:

https://developer.harness.io/docs/first-gen/firstgen-platform/techref-category/api/use-delegate-selector-api/

### How do I inspect my certificates for delegate certificate issues? 

The below commands will hep you inspect your certificates. 

Inspect a certificate chain - x509 PEM file
```
Keytool -printcert -file /path/to/cert
```

```
openssl x509 -text -noout -in certificate.pem
```

Inspect a truststore file

```
keytool -list -v -keystore /path/to/truststore
```

### How do I run a Harness docker delegate in detached mode?

Docker provides a -d flag option for running the containers in detached mode. So when we are running the Harness delegate Docker run command we can add the option to get the console back and the container will continue to run in detach mode. For example below is a sample delegate run command:

```
docker run  --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=xxx \
  -e DELEGATE_TOKEN=xxx= \
  -e DELEGATE_TAGS="" \
  -e LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/ \
  -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:23.11.81406 -d
```

### Why the task_failed_total metric for delegate is not reporting data despite step failure ?

The task failed is when something unhandled happens, like a NPE in a task or issue at framework level. A valid failure like shell script exited with error code is not a task failure. Prometheus only shows the metric which are at least once recorded.

### Why do we need core_delegate_delete permission for revoking delegate token?

The api call that we make for  revoking the delegate token makes the delegate which are using it not register anymore and hence delete delegate permission is required for revoking the token as well.

### Do we provide customized docker images for delegate?

We do not provide any customized docker images for delegates however we do have our delegate docker file in the public repo below. This can be used as a sample reference to add any utility to the image:
```
https://github.com/harness/delegate-dockerfile/tree/main
```

### Can we use immutable delegate image in the statefulset deployment yaml for delegates ?  

We can not use immutable delegate image in the statefulset deployment yaml that we had for legacy delegates. Both the delegates are architecturally different. The immutable delegates must be used with their own deployment yaml.


### Is there a way to enable more granular level for delegate logs?

We do not have additional log level settings for delegate than what it logs by default.

### Delegate fails to register with handshake exceptions. 

While creating a delegate it might start to register and then fail with SSLHandshakeException. 

To resolve the handshake exception, do the following:

Run to the command below to test the certificate chain you used to install Harness Manager.
```
curl -cacerts path/to/ca-certs/file https://<MANAGER_HOST>/api/account/<ACCOUNT_ID>/status
```
Then Install the certificate on the delegate

Reference : https://developer.harness.io/docs/platform/delegates/troubleshooting/certificate-issues#handshake-exception

### Delegate connectivity issues because of proxy IP.

While configuring the delegate proxy , many times we specify the Proxy Host IP and not the PROXY_HOST. 
We always recommend to have the PROXY_HOST and not IP as in case your IP changes to a new IP , your delegate will start to fail causing issues. 

### How can user build debug delegate image ?

You can build and push from local to gcr-play or any other place you want.
 - Copy delegate.jar from local machine (change Dockerfile-minimal in harness core)

``` 
COPY delegate.jar delegate.jar 
```

- Build image:
```./scripts/bazel/build_bazel_delegate.sh immutable
cd dockerization/delegate/
docker build -t us.gcr.io/gcr-play/delegate:<give your tag> -f Dockerfile-minimal .
docker push us.gcr.io/gcr-play/delegate:<your-tag>
```

If you want to publish this in Docker Hub, then in place of gcr use your private Docker Hub, do a docker login before pushing image.
Also there is a GitHub PR trigger to publish immutable delegate from your changes: `trigger publish-delegate`

### Why is kinit (from the krb5-workstation package) not included in our immutable image for non-root users, leading customers to bake it in themselves?

The decision to exclude kinit from our immutable image is primarily driven by concerns related to image bloat. We maintain a specific set of binaries, including Delegate-required SDKs, in the Delegate to address the specific use cases of our Continuous Delivery (CD) customers. By excluding non-essential binaries, we aim to optimize image size and streamline the image for CD workflows. You can refer the [docs](https://developer.harness.io/docs/platform/delegates/delegate-reference/delegate-required-sdks).

### Can customers enable root privileges to add the kinit binary to the image?

Enabling root privileges to add the kinit binary is an option, but it may pose security concerns for some customers. The exclusion of kinit in the immutable image aligns with security considerations and is designed to provide a minimal and secure image for CD use cases. If customers have specific security requirements, they may consider installing the required binaries, such as kinit from the krb5-workstation package, manually, even in an air-gapped environment.
You can refer the [docs](https://developer.harness.io/docs/platform/delegates/install-delegates/enable-root-user-privileges-to-add-custom-binaries).

### Are metrics for the Docker Delegate published, and how can Prometheus scraping be configured?

Yes, metrics for the Docker Delegate are published. To enable Prometheus scraping, you would likely need to open a port on the container and bind it to the Delegate metric port. This allows Prometheus, running separately, to scrape and collect metrics from the Docker Delegate.

### How Do Delegates Share Information Like Helm Chart Contents Within the Same Stage?

The process of sharing information between delegates within the same stage in Harness follows this flow:

1. **Task T1 - Downloading values.yaml File:**
   - Harness Manager creates Task T1, instructing it to download the `values.yaml` file.
   - Delegate1 is assigned Task T1, and it retrieves the `values.yaml` file from the designated source (e.g., Git/Remote).
   - Delegate1 then sends the contents of the `values.yaml` file back to Harness Manager.

2. **Task T2 - Downloading and Applying Manifest Files:**
   - After receiving the `values.yaml` file content, Harness Manager creates Task T2.
   - Task T2 includes the content of the `values.yaml` file.
   - Delegate2 is assigned Task T2.

3. **Delegate2's Actions:**
   - Delegate2 executes the following actions:
     - Downloads the manifest files from the specified source (e.g., Git, Remote, Helm Artifact Source).
     - Utilizes the content of the `values.yaml` file to render the manifest files, customizing them as needed.
     - Applies the rendered manifest files to the target cluster.

**Important Note:** The output of Task T1 (values Fetch task) is the content of the `values.yaml` file. This content is then passed to Task T2, enabling Delegate2 to use it in rendering and applying the manifest files.

This process ensures that delegates effectively share information and utilize it as required for the deployment process within the same stage.

### I want to share delegate from one project to another?

In this case you can install the delegate on org level if both project are under same org, otherwise need to install delegate on Account level. As delegate installed under project has scope limited to same project

### Is it possible to attach delegate to a custom IAM role during installation in the EKS cluster?

Yes, you can refer to [this](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#harness-aws-connector-settings) documentation for details.

### Can we get information about the types of tasks of delegates, what each of them is responsible for?

The task types are internal tasks for various tasks a pipeline generate. We keep introducing new tasks type and remove old ones as documenting each task type is not productive.

### Do these build_source tasks use the delegate task quota?

Build source tasks do use the quota. these are tasks for artifact collections. they are only present in cg and next gen these tasks are never fired.

### How can I perform a load test on a Kubernetes delegate?

You can implement Autoscale using replicas with the steps in this [docs](https://developer.harness.io/docs/platform/delegates/manage-delegates/auto-scale-using-replicas/). The autoscaling will be based on load not on number of tasks Or can do any kind of deployment or simply run shell scripts which uses cpu and memory.

- based on which metric you use for HPA (we recommend cpu/memory) kubernetes will scale up/down the pod.
- when pod is scaled down, the delegate pod will stop taking new task and finish what its executing before terminating.

### Can I set up audit log streaming without using a Delegate agent? Are there options to stream logs directly from the cloud platform using IAM roles or other methods?

For the current streaming workflow, the primary option is to use the AWS connector, which requires the use of a Delegate. Unfortunately, audit log streaming is currently only supported via Delegate, and there is no direct option to stream logs from the cloud platform using IAM roles or other methods.
You can refer to this [documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/) for further information.

### What is the workflow for secrets, especially concerning the potential exposure of production secrets? Do secrets pulled by a delegate ever flow back to the Harness platform?

Yes, the secrets pulled by a delegate during pipeline execution do not make their way back to the Harness platform. Delegates connect to various secret managers as the pipeline progresses, but the secret information itself is not sent to Harness. This ensures that production secrets remain secure and are not exposed within the Harness platform. You can refer to these [docs](https://developer.harness.io/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

### Will we push up the Ubuntu immutable delegate to Dockerhub?

No, our Dockerfiles are made public on GitHub so that you have the option to modify and build them according to your needs. We do not push the Ubuntu immutable delegate images to Docker Hub; instead, you can access and customize the Dockerfiles from our GitHub repository.

### How can we disable version override from specific delegate?

Version override is not controlled from UI. If we need to disable version override it will be for entire account. You can refer [here](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/) to know about delegates upgrades.

### Can I configure an alternate location for delegate logs?

It is not possible to configure the delegate logs path. However, you can create a symlink for the `delegate.log` files and store them in a different directory using the `INIT_SCRIPT` environment variable. To do this, simply replace `YOUR_PATH` with the directory where you want to store your log files in the example below.

```yaml
- name: INIT_SCRIPT
          value: "mkdir YOUR_PATH && ln -s YOUR_PATH/newdelegate.log delegate.log"
```

After you create your delegate, you can verify your log file path.

### Why is the Helm binary path not added to the system's PATH by default for Immutable Delegates?

There are two versions of the Helm binary installed on the delegate, but neither is set to the system's PATH by default. This behavior is currently specific to the Ubuntu image. However, users have the option to set the PATH as desired using the init script in the delegate YAML. Additionally, they can install custom binaries or create their own delegate image to address this.

### Is there a standardized default user access experience across all installation flows (K8S, Docker, Helm, Terraform)?

No, there is currently a variation, with K8S delegates defaulting to root with securityContext, while Docker delegates use a non-root default user (user 1001).

### If a user has a connector with delegate selector X, and the connector uses a secret from a secret manager with delegate selector Y, but delegates with selector X lack access to this secret manager, is this use-case supported?

Our priorities are configured as follows: [Step > Step Group > Stage > Pipeline > Connector]. In this scenario, the user can override at the pipeline (or any higher level), but without that override, it will result in a failure.

### How do I upgrade a legacy Docker delegate to use a new image version?

You can update the image tag by looking into latest tag https://hub.docker.com/r/harness/delegate/tags and can provide that while docker run command

### How do I check to see if the delegate is set to auto upgrade?

You can go to delegate page and on right side check under AUTO UPGRADE Column if its showing ON

### How do I check which delegate was assigned for task

You can select the step under any stage and on right side under details tab you will be able to see delegate assigned as well the delegate selection task logs will provide more details which all delegates were eligible and from where selector was originated etc

### How do I pass xmx and pms value for delegate to use max and min memory allocation pool?

env:
    - name: JAVA_OPTS
      value: "-Xms64M -Xmx2G"


### Can we manually reset the delegate metrics which is being scraped by Prometheus?

Manual reset isn't supported. However all the metrics get reset when the delegate restarts

### We have delegate monitoring setup and we're not clear on what types of tasks delegates are reporting on in the metrics.

The task types are internal tasks for various tasks a pipeline generates. for example, a pipeline can generate tasks for secret decryption during the shell script execution and they are internal to harness. We keep introducing new task types and removing old ones.

### Do these build_source tasks use the delegate task quota? Sometimes their number is really huge.

Build source tasks do use the quota. these are tasks for artifact collections. they are only present in FirstGen and next gen these tasks are never fired.

### How does the system differentiate between delegate name and tag?

A delegate name is a unique identifier for a registered delegate in Harness Manager, while delegate tags are descriptors that are added to the delegate before the registration process. All delegates with the tag are selected when a tag is common for two or more delegates.

### Is there a way to reset the delegate custom metric?

No, all metrics reset when you restart the delegate.

### Why aren't new delegates considered during task execution, leading to potential inefficiencies in scaling for matrix/parallel deployments?

Tasks currently poll for delegates at the start, and if initial delegates are unavailable, they won't be redirected to new ones created by scaling policies. The system broadcasts to eligible delegates determined during task processing. However, not repolling for available delegates during task execution may limit true "task-based scaling for Kubernetes delegates." Consideration for dynamically scaling with new delegates during ongoing tasks could enhance efficiency.

### Do we have grafana dashboard in SMP for monitoring delegate tasks?

No, we do not have these dashboards in SMP yet.

### Can I set an auto cleanup TTL for disconnected delegates to disappear from the user UI?

The TTL (Time To Live) for legacy delegates is set to 7 days. In the case of immutable delegates, deletion occurs automatically upon delegate shutdown.

### Not able to resume pipeline for some time post delegate release

For optimizations we keep a local cache of all connected delegates to execute tasks. The cache is refreshed every 3 minutes currently and hence it takes up to 3 mins for a new delegate to be eligible to execute a task once its connected. Since the delegate rollout is not a very frequent operation the 3 mins window was chosen and is in production for few years.

We can recommend having a grace period between bringing up a new delegate and terminating an old pod. We have minReadySeconds defined in the yaml which ensures that old pods die after 2 mins of new pod being in ready state. SInce this field was added later on, your delegate yaml may not have it. You could check this by downloading a new yaml for a delegate and add it so that the older pod doesn't get killed without new pod getting the traffic.

### What is the impact of having one less delegate instance during a task with a long terminationGracePeriodSeconds for reasons other than upgrades?

Having one less delegate instance during a task with a long `terminationGracePeriodSeconds` for reasons other than upgrades can impact the availability of delegate resources. Other tasks may fail to get scheduled because there are not enough delegates available to handle them. This can lead to inefficiencies and delays in task processing. It's crucial to consider the potential impact on the overall system and task scheduling when using extended termination grace periods.

### If we enable proxy in delegate does that mean it is including all communication of "Connectors" - Artifact Servers, Source Repo Providers, Collaboration Providers? and also Cloud Providers?

Yes that’s correct any outbound connection made via delegate through Harness will use that proxy

### Do we have some documentation to know about the delegate size guidelines ?

You can refer to the following, [documentation](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-sizes) and also [here](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-requirements/).

### Can we point auto update to our helm chart. Can we point auto update to a different registry?

You can set auto upgrade to true in the helm command and control the upgrade and the repository using [this](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

### Can we create a delegate token with the name using which it was previously created and then deleted ?

No it is not possible as same name is not possible within 30 days once it is revoked. There is a ttl for 30 days for deletion after revoke of token.

### What is the expected behavior when a customer aborts a pipeline task, and what actions are taken to ensure a clean state in the system?

When you initiates an abort for a pipeline task, the expected behavior is to take actions to halt the task's execution as promptly as possible.
we have a method, `io.harness.delegate.service.DelegateAgentServiceImpl#abortDelegateTask`, which is used to abort a task. This method typically leverages Thread.interrupt() to initiate the abort process. The key here is to interrupt or cancel the running task effectively.
An abort could leave the system in a potentially inconsistent or 'dirty' state, it's crucial to consider rollback procedures.
Delegate actions, such as canceling or ending running tasks, should play a central role in preventing system inconsistencies and maintaining system integrity.

### How can I automatically start a delegate when running as a Docker container?

Docker provides restart policies to control whether your containers start automatically when they exit, or when Docker restarts. Restart policies start linked containers in the correct order. Docker recommends that you use restart policies, and avoid using process managers to start containers.
Including the flag `--restart` in the docker run command will configure it to always restart, unless the container is explicitly stopped, or the daemon restarts.
If restart policies don't suit your needs, such as when processes outside Docker depend on Docker containers, you can use a process manager such as upstart, systemd, or supervisor instead.
To use a process manager, configure it to start your container or service using the same docker start or docker service command you would normally use to start the container manually. Consult the documentation for the specific process manager for more details.
**Warning:** Don't combine Docker restart policies with host-level process managers, as this creates conflicts.
This information was provided by [Docker documentation](https://docs.docker.com/config/containers/start-containers-automatically/)

### Perpetual Task was not assigned to my delegate, what is most probably cause?

Generally, when a perpetual task wasn't assigned to any delegates, probably you have a conflicting delegate selector. When you use connectors like secret manager, git connector along with a delegate selector in the step, mind that the manager can combine selectors from those connectors and step in order to select the most appropriate delegate selector. Review your configurations in order to make sure the selectors are matching.

### Is there a difference between the NextGen delegates and the FirstGen delegates?

We have many architectural changes between our legacy delegate, which was deployed as a StatefulSet, in comparison to the new-generation delegates, also known as immutable delegates, which are deployed as Deployment-type resources.
Legacy delegates used to have both a watcher and a delegate process; however, immutable delegates only have one delegate process. The base OS has also changed. It was Ubuntu for legacy delegate images, but now it is RHEL for immutable delegate images.
Immutable delegates work with the first generation as well. If you have an immutable delegate installation in your first generation, you can reuse it with your next-generation instance. You will need to regenerate the token in the next generation and enable the "next gen" attribute of the delegate to true.
However, if you have legacy delegates in your first generation, you will require new delegate installations.

### Is it possible to access vault secrets across different regions?

As long as your vault server in a specific region permits access from a delegate in another region, it should function properly. You can even attempt to retrieve secrets directly from this delegate host outside of Harness to resolve any access issues, and it should work with Harness as well. Additionally, you have the option to create separate connectors for each region.

### How can user install without root permission?

Our delegate will get installed without root permissions by default, you don't need to make any changes for that.

### Can user install the docker delegate with rootless docker?

Yes, you can install the rootless docker and after install the docker delegate.

### Can we have multiple docker delegate under same delegate name?

When you have same name for multiple delegates they appear under one group and treated as multiple instances of that specific delegate. Whenever that delegate names get selected any instance registered under the name can be picked for executing the task.

### Can docker delegates be auto upgraded?

Delegate auto upgrade occurs through the cron job that gets created when deploying a helm or a kubernetes delegate. We do not have any such cron in case of docker delegate and hence the image for docker delegate needs to be manually changed for delegate upgrades.

### What is the base OS for delegates with an immutable image type?

Immutable delegates are based on RHEL ubi8 minimal image. On the other hand our legacy delegate were based on Ubuntu.

### Do we have delegate metrics in case of legacy delegates as well?

Custom delegate metrics are only available for immutable delegates, there is no custom metric for legacy delegates. Also for immutable delegates the custom metrics are available from the version 23.05.79311 onwards.

### Where does delegate look for third party client utilities?

The immutable delegates look for the third party client utilities in the PATH location during startup. Hence any third party utility that is installed in delegate is expected to be either present in the default PATH location or the path to the binary added in the environment variable PATH.

### How can I find out which user is running the delegate?

We can exec into the pod and run the below command to find out which user is currently owning the delegate process:

```
ps -ef | grep delegate
```

### How do I check the custom metrics currently being published by delegate?

Delegate has a metrics api end point which we can access on the delegate host for checking the delegate metrics available. Below is the sample curl:

```
curl localhost:30109/api/metrics
```

### What is the health api end point for the immutable delegates?

Immutable delegates has a health api end point on which delegate health related information is related. Below is a sample curl for the same:

```
curl localhost:30109/api/health
```

### How do I pass jvm arguments for watcher process?

Watcher process for delegates uses jvm options from the environment variable WATCHER_JAVA_OPTS. Any custom jvm argument that we want to pass to watcher process can be configured in the WATCHER_JAVA_OPTS variable in the init script.

### How do I pass jvm arguments for delegates process?

Delegate process picks the jvm options from JVM_OPTS environment variable. If we want to pass any custom jvm arguments for the delegate process we can configure it in the JVM_OPTS environment variable. One example is below:

```
env:
  - name: JAVA_OPTS
    value: "-Xms2G"

```

### Does the delegate process write gc logs by default?

Delegate jvm process is not configured to write the gc logs by default. If we need to configure the gc logs we need to pass the jvm arguments for the same. For instance below are sample argument , the options can be modified as per the need for gc logs:

```
JAVA_OPTS='-Xlog:gc*=debug:file=/var/jvm/gc.log'
```

### Can a delegate be connected to FirstGen and NextGen at the same time?

A delegate at one time can be connected to only manager instance. Hence the same delegate can not be connected to both the first gen and next gen instance of the same account.

### Do proxy settings apply to both HTTP delegate commands and raw socket connects during capability checks?

Proxy settings typically work for HTTP delegate commands, enabling you to route HTTP traffic through a proxy server. However, in the case of capability checks, such as raw socket connects, proxy settings might not apply.
`CDS_USE_HTTP_CHECK_IGNORE_RESPONSE_INSTEAD_OF_SOCKET_NG` this feature flag should be enabled to solve the issue.


### Do we have an automatic upgrades for ECS delegates?

No, we don't have auto upgrade for docker delegate so far.

### What needs to follow if the production delegate is down because of using legacy delegate and a old watcher version ?

- Re-deploy legacy delegate by pulling the fresh "latest" image. This will make sure that you get most recent watcher.
- We can revert the delegate version in the ring to unblock.
- You can use immutable delegate.

### How can I resolve the error "not supported by windows" when working in CCM POV?

If this is a mixed node cluster then the delegate needs to run on Linux nodes. You can use selector in your delegate yaml to make sure that Linux nodes are selected. You can refer to this [docs](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) for more information.

### Can the delegate's StatefulSet be scaled?

Yes, you can scale the delegate StatefulSet. For more information, go to [Autoscale using replicas](/docs/platform/delegates/manage-delegates/auto-scale-using-replicas).

### Why is the delegate image based on UBI instead of Ubuntu?

1. Security: UBI is considered a more secure option compared to Ubuntu in today's landscape. It benefits from Red Hat's rigorous security practices and is designed to be more resilient against vulnerabilities.
2. Compatibility: When you are running workloads on OpenShift, using UBI-based images is often the preferred choice. In some scenarios, Red Hat may even mandate the use of UBI-based images. This ensures compatibility and support within the OpenShift environment.
3. Customer Demand: We have received numerous requests from our customers to provide UBI-based images due to their security and compatibility advantages. In response to these requests, we have published UBI-based legacy delegate images.
4. Consistency: We are not only transitioning our delegate to UBI but also all of our SaaS offerings. This provides a consistent and unified environment across our services.
   While UBI is the preferred choice, we want to emphasize that we do provide a Dockerfile for building an Ubuntu-based delegate image if you have specific requirements.

### What is a Resource Group?

Resource groups are an RBAC component that defines the objects that a user or service account can access. Objects are any Harness resource, including projects, pipelines, connectors, secrets, delegates, environments, users, and more.

More information on Harness Resource Group and managing this can be found here: [https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups]

### How can I install Terraform on the delegate?

1. microdnf install yum
2. yum install unzip
3. curl -O -L https://releases.hashicorp.com/terraform/1.6.1/terraform_1.6.1_linux_amd64.zip
4. unzip terraform_1.6.1_linux_amd64.zip
5. mv ./terraform /usr/bin/
6. terraform --version

### How can I install the AWS CLI in delegate?

1. curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

2. microdnf install yum

3. yum install unzip

4. unzip awscliv2.zip

5. ./aws/install

### What Prometheus metrics are exposed on the delegate?

For a list of Prometheus metrics exposed on the Harness Delegate, go to [Delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/).

### The Harness Delegate went down, and I didn't get a notification via Prometheus that it was in a disconnected state. Why not?

When the Harness Delegate pod goes down, its exposed metrics endpoint also goes down. These metrics can be helpful in notifying you of lost connectivity between Harness Manager and the delegate pod. However, it should be noted that your Prometheus server can also notify you of the same issue.

### What API can I use to check the delegate connectivity status?

You can use the [list delegates API](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/listDelegates).

### Legacy delegates aren't starting up and creating a .hprof file in the container. What should I do?

For the statefulset, updating the environment variable `WATCHER_JAVA_OPTS` with `-Xmx512m` might help.

### How do I deploy a delegate in Amazon ECS for Harness NextGen?

The Harness Delegate is a software that gets installed in your environment which connects to Harness Manager and performs Continuous Delivery/Continuous Integration tasks.

In Harness NextGen, ECS delegate can be deployed as a Docker delegate both for ECS and ECS Fargate. This tutorial shows you how to install the Harness Delegate in an ECS cluster as an ECS service to enable the Delegate to connect to your AWS resources.

https://discuss.harness.io/t/how-to-deploy-delegate-in-amazon-ecs-for-harness-ng/13056

### How can we forcibly disconnect a delegate and delete it as admin?

As Harness Delegates are managed by customers in their own infrastructure, Harness doesn't have any control on it.

Harness can't control the delegates on your infrastructure.

In Harness's architecture, the delegates in your infrastructure connect to Harness Manager. For more information, go to [Harness Platform components](/docs/get-started/harness-platform-architecture/#harness-platform-components).

Hence you will need to stop the delegate service in your infrastructure.

There is another way to remove the delegate is, you will need to revoke the token used by the delegate and it will get disconnected and then auto-deleted in 7 days.

### How do I make config changes to increase memory consumption in a delegate YAML?

You will have to make config changes in your delegate YAML to increase memory consumption. This can be done by setting the value in JAVA_OPTS to increase the Xmx value

### What is advisable to retain your current configuration during the Harness installation process?

Harness recommends that you keep your existing Java KeyStore in place during the installation process. Updating the KeyStore may cause issues with your delegate. For more information, go to [Install delegates with custom certs](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

### Is there a way to create delegate tokens via API calls in which we can do the API call for token creation and use in personalized way?

Yes there is way to create delegate tokens via API calls. For more information, go to the [Create delegate token API documentation](https://apidocs.harness.io/tag/Delegate-Token-Resource#operation/createDelegateToken).

### Can we use alphanumeric characters in delegate names?

Yes, you can use alphanumeric characters, but the name shouldn't start or end with a number.

### Can we use expressions in delegate tags in NextGen like we used custom selectors in delegates in FirstGen?

Yes, expressions in delegate selections are supported. You can pass expressions during delegate selection in a pipeline. This will be resolved to the value of that variable. If that value is present as a tag in a delegate, then that delegate will be selected.

### VAULT operation error: Decryption failed after 3 retries for secret

Sometimes, you might encounter errors while executing pipelines. These errors could be due to issues with the network or the delegate's connection to the Vault where the secret is created. The first step is to verify that the delegates are operational and that the connectors used in the pipelines are connected properly. If the connectivity test fails, log in to the delegate and attempt to reach the connector URL from there.

### Problems enabling mTLS - Error [IOException: Unexpected response code for CONNECT: 403]

When mTLS has been enabled for your delegates, you might see the 403 errors, this could be due to the proxy not resolving harness domain app.harness.io from the delegate.

### Delegate Token behavior

Token revocation is done server side. We have a 20 minutes cache, so the delegate will be disconnected within 20 minutes of the token removal on the server side.
The Token is used in heartbeat but is loaded at the delegate process startup. Changing the token delegate side requires a restart of the delegate process (cycle).

### What is difference between terminationGracePeriodSeconds and preStopHook?

- `TerminationGracePeriodSeconds` - This is used to allow the main process (delegate) to delay the shutdown so that this process can perform some cleanup. The key here is that container shutdown is delayed by UP TO the specified duration. This works by delegate specifically handling SIGTERM kill signal.

- `preStopHook` - This is used to allow any other kind of cleanup outside of the main process (e.g. one wants to save files, make database backup etc..). This hook runs IN PARALLEL to the terminationGracePeriodSeconds not before, but before delegate process shutdown is triggered (i.e. before delegate process receives SIGTERM). So if the grace period expires the hook will be killed as well.

### Info of connected delegate when it's started connected to Harness

The delegate initiates communication on its startup to the Harness Platform. There is also a heartbeat connection every 60 seconds from the delegate to the delegate harness to notify that it is running.

### Understand the logic behind the six-letter account identifier that Harness uses while creating the delegate

This identifier refers to your account, without this, we don't know how to link old pod lifecycles and new ones, hence we will treat them differently as pod names and pod IPs change.

### How Harness is able to prevent tampering of artifacts and instructions from the customer infrastructure. Sounds like TLS is used, but what specific integrity checking approach is used to check instructions are not changed in flight?

Details below for the protection details for the below Artifact Sources :

Related to SSH/WinRm NG

Artifactory
For downloading artifacts from Artifactory to delegate, we are using org.jfrog.artifactory.client:artifactory-java-client-api:jar:2.9.1
This is the maven repo : https://mvnrepository.com/artifact/org.jfrog.artifactory.client/artifactory-java-client-services/2.9.1 and we see that there are reported vulnerabilities for this lib version. We are working on updating the above lib to the version without vulnerabilities and we will be secure. If Artifactory URL is https, the calls are secure with TLS

AWS S3
For downloading artifacts from AWS S3 to delegate, we are using com.amazonaws:aws-java-sdk-s3:1.12.261
We don't see any reported vulnerabilities : https://mvnrepository.com/artifact/com.amazonaws/aws-java-sdk-s3/1.12.261 we are secure.
AWS SDK makes HTTP calls in a secure way using TLS

Azure
For downloading artifacts from Azure to delegate, we are using okhttp-4.9.2.jar, we see there are reported vulnerabilities and we are working to update this lib : https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp/4.9.2
One note here is that updating this lib will be a long significant process which could last more weeks.

Jenkins
For downloading artifacts from Jenkins to delegate, we are using com.offbytwo.jenkins:jenkins-client:0.3.9,
Can't find any info related to vulnerabilities.

Nexus
For downloading artifacts from Nexus to delegate, we are using javax.net.ssl.HttpsURLConnection from Java SDK.
When downloading artifacts we are using SSL and we are secure here.

Artifacts will be downloaded on the delegate and it should be safe if the network where delegates are running is secure.

One note here, the chosen cipher suits depend on the remote server. During the SSL handshake the “server hello” message contains the Cipher suite chosen by the server from the list provided by the client (our side).

### How do I check for the listen ports on the delegate if netstat is not installed?

You can run the command `lsof -nP -iTCP -sTCP:LISTEN`, install netstat, or bake it into the delegate image.

### At what port are the delegate Prometheus metrics exposed?

The delegate Prometheus metrics are exposed on the port 3460 in the running delegate container.

### How do I scale delegate replicas?

You can update autoscaling parameters in your `values.yaml` file.

```yaml
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

For more information, go to [Autoscale using replicas](/docs/platform/delegates/manage-delegates/auto-scale-using-replicas/).

### The Harness Delegate config-watcher is causing heavy usage of disk space and causing alerts in prod nodes. How can we increase the watcher memory settings?

You can overwrite the watcher memory setting via `WATCHER_JAVA_OPTS`. If you want to increase the memory for watcher, you can add the following in the delegate YAML env section `- name: WATCHER_JAVA_OPTS value: "-Xmx512M"`.

### Can scope creation happen during delegate install?

Delegate scope is decided by the scope of delegate token. For more information, go to [Delegate scope](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-scope).

### Is it possible to increase the client side timeout when getting pods for a Kubernetes delegate?

Yes, you can increase the step timeout.

### How do I use a custom Helm3 version in the FirstGen legacy delegate?

You can install the latest version and set the env variable to the binary path `HELM3_PATH=/opt/harness-delegate/client-tools/helm`.

### Can I use the delegate image from my immutable image type delegate and replace it in the YAML for the statefulset from the legacy delegate?

This is not supported. Delegates with an immutable image type should be run with delegate YAML generated from the UI, which will generate a deployment if the delegate is [enabled for the account](https://apidocs.harness.io/tag/Accounts#operation/isImmutableDelegateEnabled).

Here is an [example manifest file for NextGen](/docs/platform/delegates/install-delegates/overview/#example-manifest-file).

### Where can I find the source code to the Harness Delegate?

[Here is the link](https://github.com/harness/harness-core/tree/develop/260-delegate) to the source code for the delegate.

### Where can I find the source of the Helm chart for the delegate?

[Here is the source](https://app.harness.io/storage/harness-download/delegate-helm-chart/) of the Helm chart for the delegate.

### Where can I find delegate release notes?

For information about Harness Delegate features, go to the [Delegate release notes](/release-notes/delegate).

### Why is automatic upgrade turned off for my delegate?

It could be it was disabled through `kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>`, or the cronjob was deleted, or the cronjob never existed (the Kubernetes audit logs can help you find out if it exists).

### How can I avoid pulling Harness delegate images from a public repo?

You can add a special Harness Container Image Registry connector to your Harness account. With this connector, the delegate pulls these images from the Harness Container Image Registry only.

For more information, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/)

### What are delegate rings?

Harness uses the ring methodology, which is a popular approach in software release management for delegate releases. There are four rings, and to mitigate any adverse effects that may arise from new delegate releases, each Harness account is assigned a specific ring that corresponds to the latest delegate version for that account.

### I have automatic upgrade on in my delegate. Why is my delegate version behind what's listed as the latest version in Docker Hub?

Harness uses the ring methodology commonly used in software release management for delegate releases. The version for your account can be overridden to use the latest in Docker Hub using the [override delegate image tag API](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/overrideDelegateImageTag).

### What should I do if I want to update an existing User Group in Harness, but I encounter an error preventing me from saving the changes?

If you encounter an error when attempting to save changes to an existing User Group in Harness, particularly an error related to the Harness Identifier, it may be due to a restriction on naming Entity identifiers. According to Harness design specifications, certain characters, such as hyphens (e.g., "-"), are not allowed in Entity identifiers.

### Why is the Harness delegate instance status showing Expiring in 2 months but the latest version is valid for 3 months?

For the delegates with an immutable image type, the instance status will show Expiring in 2 months only, it's the expected behavior.

### When we recommend setting POLL_FOR_TASKS to true in a non production environment?

For customers who do not want to take the web socket path due to any infrastructure challenges, we recommend enabling `POLL_FOR_TASKS`.
For customers with polling enabled, delegate checks with Harness for any task to execute based on the interval set, versus web socket communication being immediate.

### Does polling mode only work for legacy delegates and not delegates with an immutable image type?

Currently, by default polling is only supported for legacy delegates, not for delegates with an immutable type. Polling mode works for delegates with an immutable when you add `POLL_FOR_TASK` as `true` in the delegate YAML.

### What does Delegate Identifier=DETECTING mean?

`Delegate Identifier=DETECTING` is auto upgrade which can be on or off, for more information, go to [Determine if automatic upgrade is enabled](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#determine-if-automatic-upgrade-is-enabled).

### My delegate shows that it will expire in 2 months. Will it shut down after it expires?

Harness follows an N-3 support policy for delegates, which means we support the current version and the three preceding versions. With a new version released approximately every two weeks, each update brings enhanced features and general fixes. For instance, if you have version `24.03.XXXXX` installed, all images from `24.01.XXXXX` to `24.03.XXXXX` are supported. Delegate expiration doesn't imply that the delegate ceases to function. However, it may lead to potential issues if the backend advances significantly, causing the delegate to lose backward compatibility. To avoid this, we recommend upgrading the delegate at least once per quarter if you don't have [automatic upgrades](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#how-automatic-upgrade-works-in-the-kubernetes-manifest) enabled.


### How can I specify my pipeline to select a delegate based on a tag?

In the advanced tab of your pipeline, you can add specific tags in the [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#delegate-tags) field.

### How can I autoscale a delegate using HPA?

By default, Helm delegates have autoscaling disabled, which you can enable by setting the value `autoscaling.enabled=false`. For Kubernetes delegates, you need to write an HPA manifest to scale the delegate's replicas.

### What are the Kubernetes version requirements for delegate installations?

We try to support all the active Kubernetes releases (that’s last 3 releases according to our versioning policy), i.e. we support anything that’s not EOL.

### Are secrets in `values.yaml` files rendered in Harness Manager?

No, these secrets are never rendered in Harness Manager. They are only rendered in the delegate.

### Are customer files stored in the manager during execution while Delegate 1 is communicating directly with Delegate 2?

Harness doesn't store customer manifest files in Harness Manager. Only `values.yaml` files are passed through Harness Manager.

### How do delegates share information like a Helm Chart and its contents on the same stage?

To share information like a Helm Chart and its contents among delegates, there are two steps. First, download the `values.yaml` files on any of the delegates (it could be just one or more depending upon how many `values.yaml` files have been configured) and pass them to the next step. Then, the delegate downloads the Helm chart and uses the `values.yaml` files that were passed by the previous step. For instance, Delegate 1 can execute Fetch Files and pass the values/manifests to Delegate 2 that will execute the Helm Install/Apply.

### How do delegates communicate with each other when they are sharing information?

Delegates don't communicate with each other. They go through Harness Manager to retrieve the result of the tasks performed by another delegate.

### Why are delegates added to the blocklist?

The purpose behind the blocklisting of delegates is to ensure that every delegate task undergoes one or more validation/capability checks. When a task is assigned, we check if we have previously validated the delegate's capabilities. If the validation was done within the past 6 hours, it is considered valid. 

However, if it has been more than 6 hours or if it's the first time, we perform the validation again. If the validation fails, the delegate is blocklisted for 5 minutes for the same criteria. If another task with the same criteria is assigned during these 5 minutes, the delegate will be blocklisted for it as well. So, it's important to check which validation criteria were added to the task and which validation is failing.

### What are the differences between delegate tag formats?

- *`yy.mm.xxxxx.minimal`*: This tag represents the minimal image format, which is recommended for production usage. It stands out due to its absence of high or critical vulnerabilities, making it a secure choice. Furthermore, this image format is lighter than the default option because it doesn't have the default binaries installed.
- *`yy.mm.xxxxx`*: This format corresponds to the standard delegate image. It includes all the default binaries and is a suitable choice for users who are relatively new to Harness and do not have stringent security requirements. This image provides a comprehensive set of tools and functionalities for general usage.
- `1.0.8XXX`X`: This format denotes an older version of the delegate, often referred to as the legacy delegate. New Harness accounts no longer include this delegate version, and users are strongly encouraged to migrate to the standard delegate for better compatibility, performance, and security.

For more information, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

### Is their a way to check which delegates are running at a particular time?

You can review the delegate logs to find the task that it was executing around a given time frame.

### Why am I getting an "IllegalArgumentException: kubectl is not installed for version V1_13. Available versions are: []" error?

You might receive this error if you are using minimal delegate images. Install the kubectl version and check to see if the $PATH is updated correctly.

### Why is the delegate not coming up and returning a no space left error?

When starting delegates, Harness installs some third party binaries(kubectl, Helm, etc.). These binaries require space. Make sure the delegate machine has sufficient remaining disk space.

### Where can we add the env attributes for delegate during Helm chart installation?

Delegate deployment for Helm chart installation is configured to pick the environment variable from ConfigMap. Check the name of the ConfigMap in the chart deployment YAML, the attribute is envFrom and edit the ConfigMap to add the corresponding environment variables.

### How does a delegate identify its scope for registration?

While installing delegates, we do not explicitly configure it to connect at the account, organization, or project scope. It is decided based on the scope of the delegate token. If the token is from the project scope, the delegate will register at the project level. This also applies to the organization and account level.

### Will the delegate continue to work if we delete the delegate token being used?

The delegate registration is only valid till the delegate token with which it has registered is available and not expired/revoked. If the delegate token is deleted, the delegate registration will no longer be valid, and it will fail authorization.

### Can I set the delegate upgrader job to point to a custom private registry?

Yes, the delegate `upgrader` job can be set to point to a custom private registry. For more information, go to [Use automatic upgrade with custom delegate images](/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#use-automatic-upgrade-with-custom-delegate-images).

### Can I set SCM_SKIP_SSL while working on Docker delegate?

Yes, you can add `SCM_SKIP_SSL=true` to the `environment` section of the delegate YAML.

For example, here is the `environment` section of a `docker-compose.yml` file with the `SCM_SKIP_SSL` variable:

```yaml
environment:
      - ACCOUNT_ID=XXXX
      - DELEGATE_TOKEN=XXXX
      - MANAGER_HOST_AND_PORT=https://app.harness.io
      - LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/
      - DEPLOY_MODE=KUBERNETES
      - DELEGATE_NAME=test
      - NEXT_GEN=true
      - DELEGATE_TYPE=DOCKER
      - SCM_SKIP_SSL=true
```

### Is the io_harness_custom_metric_task_execution_time in seconds or milliseconds?

The time it takes to complete a task (in seconds). For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics/#configure-delegate-resource-threshold).

### Delegate mTLS Support

Currently, mTLS is only supported for Kubernetes delegated. We will be adding support for Helm and Docker delegates in the future. Harness supports both Loose and Strict mode.

### Where can we download the Helm chart for delegate manually and not using Helm commands?

The delegate Helm chart is available [here](https://github.com/harness/delegate-helm-chart/tree/main/harness-delegate-ng).

### I have a custom delegate and I'm trying to execute the script, but the script is executing as a root user. How can I change the user?

In the delegate YAML, you need to modify the `runAsUser` field, which is set to 0, indicating that the script runs as the root user.

### How can I list all delegates in account?

You can use the [list delegate API](https://apidocs.harness.io/tag/Delegate-Setup-Resource/#operation/listDelegates).

### Does Harness support auto-upgrade for Docker delegates?

No, auto-upgrade is not an option for Docker delegates. You can update your Docker delegate image when Harness releases a newer version.

### Do we have documentation for installing a custom certificate in a Kubernetes-based delegate?

Yes you can install custom certificates for Kubernetes delegates. For more information, go to [Install delegates with custom certs](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/).

### What happens to tasks rejected by the delegate?

Delegate reject tasks or fail to acquire tasks when CPU and memory reach above a certain threshold if the flag `DYNAMIC_REQUEST_HANDLING` is set as true in the YAML.

### Can we set the delegate to reject new tasks if x% of memory is being consumed?

Yes, you can specify what threshold to reject the task using the flag `DELEGATE_RESOURCE_THRESHOLD`, otherwise, the default value is 80%. For more information, go to [Configure delegate resource threshold](/docs/platform/delegates/manage-delegates/delegate-metrics/#configure-delegate-resource-threshold).


### What is the naming convention used when creating a default delegate token?

The default token is named using the convention of the level at which it is being called, for example, `default_token/org/project`.

### Can I delete my delegate token?

The delegate token cannot be deleted, it can be only revoked. Revoked tokens are deleted after 30 days.

### When we add a delegate tag via API, why does the tag disappear when the delegate is restarted?

The delegate tags disappear because they are not in the original delegate YAML that was used to start the delegate.

### When my delegate is restarting, why do I see "Failed to find field for io.kubernetes.client.openapi.models.V1JSONSchemaProps.x-kubernetes-list-map-keys" in logs?

You should create the delegate with the minimum recommended resources to solve this issue. For more information, go to [Delegate sizes](/docs/platform/delegates/delegate-concepts/delegate-overview#delegate-sizes).

### Are delegate tokens stored in MongoDB?

Yes, the delegate tokens are stored in MongoDB.


### What is the Helm delegate chart name?

The Helm chart name is `harness-delegate-ng`. You can access the metadata and the repo below.

- https://app.harness.io/storage/harness-download/harness-helm-charts/ 
- https://github.com/harness/delegate-helm-chart

### Can I verify if delegates were available at a specific time and check their past connectivity?

Yes, you can check delegate logs for this information.

### Do we have any notification when delegates enter an expired state in NextGen?

We currently do not offer support for this feature. However, it is included in our roadmap for future development.

### Do we have a dashboard where I can track the current status of my delegate?

Yes , you can set up Prometheus to get the metrics. For more information, go to [Configure delegate metrics](/docs/platform/delegates/manage-delegates/delegate-metrics).

### Does delegates logs are only sent to Harness or can I also query delegate logs in my own cloud logging system?

By default, delegate logs are only sent to Harness and it can be enabled/disabled using this env variable - `STACK_DRIVER_LOGGING_ENABLED`. For more information, go to [Delegate environment variables](/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled).


### Is auto-upgrade available for ECS delegates?

No, we only support auto upgrade for Kubernetes delegates.

### When does the old replicas get clear out post getting disconnected for immutable delegates?

They are cleared out in 6 hours after they're disconnected. For more information, go to [Delete replica pods](/docs/platform/delegates/manage-delegates/delete-a-delegate/#delete-replica-pods).

### Do we support auto upgrade in Helm type delegates?

Yes, we support auto upgrade in both these type delegates. This can be achieved by following `upgrader.enabled=true` while running the install command.

### Is there a way to exclude a delegate from taking a task?

There is no way as of now to exclude delegates from picking up tasks for other pipelines.

### What is the difference between the delegate YAMLs of account vs org vs project?

We differentiate the delegate YAML based on the value of `DELEGATE_TOKEN`.

### There are ‘Delegate Profiles’ for delegates in the FirstGen. There are 'Startup Script' in it. What is the equivalent in NextGen?

You can use `INIT_SCRIPT` when launching the delegate. For more information, go to [Install a delegate with third-party tool custom binaries](/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries/).

### How can I securely store my delegate tokens?

You can store delegate tokens as Kubernetes secrets. For more information, go to [Store delegate tokens as secrets](/docs/platform/delegates/secure-delegates/store-delegate-tokens-as-secrets/).

You can also store the token in vault and reference the token in YAML. For more information, go to [Rotate tokens](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/#option-rotate-tokens).
