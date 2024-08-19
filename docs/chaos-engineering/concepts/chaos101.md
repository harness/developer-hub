---
sidebar_position: 1
title: Chaos101
description: All you need to know about chaos engineering
redirect_from:
- /docs/chaos-engineering/get-started/introduction-to-chaos-module
- /docs/chaos-engineering/get-started/overview
- /docs/chaos-engineering/chaos-infrastructure/linux-chaos-infrastructure-advanced-management
- /docs/chaos-engineering/features/chaos-infrastructure/linux-chaos-infrastructure-advanced-management
- /docs/chaos-engineering/features/chaos-infrastructure/windows-chaos-infrastructure
- /docs/chaos-engineering/features/chaos-infrastructure/openshift-infra
- /docs/chaos-engineering/chaos-infrastructure/openshift-infra
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to Harness Chaos Engineering (HCE)!

This topic provides you with all the details such as **what**, **why**, and **how** of chaos engineering, such as:

1. [What is chaos engineering?](#what-is-chaos-engineering)
2. [Why is chaos engineering important?](#why-is-chaos-engineering-important)
3. [What are the advantages of HCE](#benefits-of-hce)
4. [Implement Chaos engineering to improve the resilience of your application](#how-to-implement-chaos-engineering)

## Introduction

Cloud-native applications are distributed, elastic, and resilient in nature, but their complexity introduces multiple potential points of failure. To ensure these systems perform reliably under various conditions, it is crucial to test their robustness. This is where chaos engineering comes in.

## What is chaos engineering?

Chaos engineering is a proactive approach that intentionally injects failures into your system to identify weaknesses and improve resilience before the real issues occur. The consensus is that something **will** go wrong in an application, so it would be better to practice what actions to take when something goes wrong and ensure that everything recovers.

A **formal definition** is: _"Chaos engineering is the discipline of performing experiments on software to build confidence in the system's capability to withstand turbulent and unexpected conditions. Failures are intentionally injected into applications to build resilience. By proactively introducing controlled chaos into systems, you can identify weaknesses in your application and prevent catastrophic failures."_

![](./static/chaos101/chaos-eng-steps.png)

:::tip
Chaos engineering isn't the same as software testing (manual or automated) which verifies that your system is working as expected.
:::

## Why is chaos engineering important?

In the current landscape of fast-paced technology, system failures have a significant impact on businesses, customers, and stakeholders. Chaos engineering is a way to identify potential issues before they become major problems, helping organizations minimize downtime, mitigate risks, and improve reliability.

Chaos engineering targets a steady-state system and simulates conditions that might cause failures in components such as infrastructure, networks, and services. For example, a chaos experiment might terminate a pod in a functional Kubernetes cluster, shut down a working load balancer to validate failover, or induce CPU spikes on a server, and then observe how the system responds.

### Shift left chaos engineering

The initial principles of chaos engineering recommend performing experiments in production, which is relevant and encouraged. This approach validates resilience beforehand, acting as a quality gate for larger deployment environments. The need to build confidence in a highly dynamic environment—where application services and infrastructure undergo frequent and independent upgrades—accelerates this process. The resulting paradigm includes:

- Increased ad-hoc and exploratory chaos testing by application developers and QA teams;
- Automating chaos experiments within continuous delivery (CD) pipelines.

## How to implement chaos engineering?

You can build resilient applications by following the steps below:

1. **Choose** or **build** your application;
2. **Configure** the **chaos control plane**, that is:
    1. Set up an **environment**;
    2. Set up a **chaos infrastructure**;
3. **Create chaos experiments** in your application;
4. **Execute** the chaos experiments;
5. **Analyze** the result.

This suggests that chaos experiments require an appropriate observability infrastructure to validate the hypotheses about the steady state. The practice of chaos engineering involves repeatedly performing experiments by injecting various potential failures, known as **chaos faults**, to simulate real-world failure conditions against different resources, referred to as **targets**.

Harness Chaos Engineering (HCE) simplifies the chaos engineering practices for your organization. The diagram below outlines the steps you can take to introduce chaos into an application.

![Chaos Engineering Overview](./static/chaos101/first-goal.png)

## Benefits of HCE

HCE doesn't just focus on fault injection; it helps you set up a fully operational chaos function that is based on the original [principles of chaos](https://principlesofchaos.org/), and addresses several enterprise needs, including:

- **Cloud-Native Approach**: HCE supports a declarative definition of experiments and [Git-based chaos artifact sources]((/docs/chaos-engineering/use-harness-ce/chaoshubs/add-chaos-hub)) (chaos-experiments-as-code).

- **Extensive Fault Library**: HCE offers a robust suite of ready-to-use experiments and supports constructing complex custom experiments with multiple faults executed in the desired order.

- **Centralized Control Plane**: The platform supports a variety of targets, including Kubernetes-based microservices, cloud services like AWS, Azure, GCP, Cloud Foundry, and VMware infrastructure.

- **Governance Enforcement**: HCE provides several mechanisms for governance:

    - **Dedicated Workspaces**: Isolate chaos experiments and resources for different teams or projects.
    - **ChaosGuard**: Adds an additional security layer by executing a set of conditions before running chaos experiments.
    - **Chaos Teams**: Allows control over who can access and execute chaos experiments, ensuring that only authorized users interact with chaos resources.
    - **Access Control**: Fine-grained permissions manage access to chaos infrastructure, the types of faults used, and the runtime permissions for executing experiments within target environments.

- **Native Integration with Harness Continuous Delivery (CD) Pipelines**: Streamline chaos engineering into your CI/CD workflows.

- **Hypothesis Validation and SLO Management**: Validate hypotheses using probes and manage SLOs through integration with Harness Continuous Verification (CV).

- **Guided GameDay Execution**: Detailed analytics and reporting based on experiment execution and application resilience.

- **Chaos Events, Metrics, and Logs**: Instrument APM (Application Performance Monitoring) dashboards with chaos context to monitor the impact of chaos faults on service/application health.

## Chaos engineering flow of control

You can define steps (chaos experiment) using which you can inject different kinds of failures into your application. The standard flow involves the following steps:
1. Identify the steady state of the system or application under test and specify its service-level objectives (SLOs);
2. Hypothesize around the impact a particular fault or failure would cause;
3. Inject this failure (or chaos fault) in a controlled manner (with a pre-determined and minimal blast radius);
4. Validate whether the hypothesis is proven and if the system meets the SLOs, and take appropriate actions if a weakness is found.

## Component Description

The components specified in the diagram earlier are described below.

#### **Chaos Experiment**

	It is composed of chaos faults that are arranged in a specific order to create a failure scenario. One or more chaos faults is injected into a specified chaos infrastructure and the result of the chaos execution is summarized. The chaos faults target various aspects of an application, including the constituent microservices and underlying infrastructure. You can tune the parameters associated with these faults to impart the desired chaos behavior.You can define the experiment using the Chaos Studio through the guided UI or by uploading the workflow CR (custom resource) manifest.

The diagram below describes the flow of control in a chaos experiment.

![](./static/architecture/experiment-sequence.png)

Below is the detailed description of the steps above.

1. The user initiates the creation of a new chaos experiment in the Chaos Control Plane.
2. The Control plane prompts the user to input the necessary information for creating the experiment, including:

   * **Chaos Infrastructure:** Specify the chaos infrastructure that will be targeted during the experiment.
   * **Fault and Fault Tunables:** Select fault templates from any connected chaos hubs and modify the tunables as needed. You can add multiple faults in any desired order.
   * **Fault Probes:** Optionally, define additional probes on top of the default health check probe to validate custom hypothesis during the experiment.
   * **Fault Weights:** Assign fault weights to indicate the importance of each fault relative to others in the experiment. These weights contribute to calculating the experiment's [**resilience score**](/docs/chaos-engineering/features/experiments/resilience-score), a quantitative measure of the target environment's resilience when the experiment is performed.

	Once all information is provided, the experiment is created and ready for execution.

3. When the user runs the experiment, the Control Plane transmits the experiment data to the target chaos infrastructure. The infrastructure handles four key responsibilities during execution:

   * **Inject Faults:** The infrastructure interprets the received faults and injects them into the target resource. Multiple faults may be injected simultaneously, depending on the experiment.
   * **Execute Probes:** The infrastructure executes the respective fault probes as the faults are injected, storing the results.
   * **Stream Logs:** Real-time logs of the experiment execution are streamed and can be retrieved as needed. These logs are accessible in the Chaos Control Plane.
   * **Send Results:** Finally, the infrastructure sends the experiment execution results, including the probe results, back to the Chaos Control Plane.

   The chaos experiment execution is then concluded.

#### **Chaos Rollback**

	Chaos rollback ensures that all target resources in an experiment return to their steady state after the experiment concludes, maintaining the safety of all applications deployed on your machine.

	- Chaos rollback occurs automatically at the end of each experiment. If an on-the-fly experiment is aborted, the chaos is safely reverted.
	- If a network disruption occurs between the Control Plane and Execution Plane during the experiment, the experiment is gracefully aborted, and the chaos is reverted.
	- If the chaos infrastructure process exits abruptly during an experiment, the daemon service reverts the chaos before restarting the process.
	- In the event of an abrupt machine reboot, the daemon service checks for and reverts any inconsistencies from the prior chaos execution before starting the chaos infrastructure process.
	- In the rare scenario where the chaos rollback itself encounters an error, an appropriate error message is logged in the experiment log, prompting the user for manual intervention.

#### **Experiment Status**

	Experiment status describes the overall status of the experiment that depends on the status of the probe and the fault. The experiment status in a chaos experiment can be in 7 different states.

	- **Completed**: The fault and the probes associated with every fault were completed successfully.
	- **Completed with Error**: All the faults complete execution, and none of them show **error** status, but one of the faults may show **Completed with error** if the probe associated with the fault fails.
	- **Error**: If one of the faults or steps in the experiment results in an **error**, the experiment corresponds to being in an **error** state.
	- **Running**: Once the task (or experiment) is picked up by the infrastructure subscriber (pod), it goes to **running** state.
	- **Timeout**: If the task is in the queue, but not picked up by the subscriber for execution within a specific duration, the task times out.
	- **Queued**: An experiment goes to the **queued** state before it is executed, that is when the task (or experiment) has not been picked up by the infrastructure subscriber (pod) yet. At this point, the task is placed in the queue and is waiting to be picked.
	- **Stopped**: If an experiment was stopped by the user, the fault that was being executed then also stops (this results in the fault status being **stopped**). The subsequent faults associated with the experiment don't get executed either.

#### **Chaos Fault**

	Also known as a **fault**, refers to the failures injected into the chaos infrastructure as part of a chaos experiment. Every fault is scoped to a particular target resource, and you can customize the fault using the fault tunables, which you can define as part of the Chaos Experiment CR and Chaos Engine CR. Optionally, you can define one or more probes as part of a chaos fault.

#### **Fault Status**

	Fault status indicates the current status of the fault executed as a part of the chaos experiment. A fault can have 0, 1, or more associated [probes](/docs/chaos-engineering/features/resilience-probes/overview). Other steps in a chaos experiment include resource creation and cleanup.

	In a chaos experiment, a fault can be in one of six different states. It transitions from **running**, **stopped** or **skipped** to **completed**, **completed with error** or **error** state.

	- **Running**: The fault is currently being executed.
	- **Stopped**: The fault stopped after running for some time.
	- **Skipped**: The fault skipped, that is, the fault is not executed.
	- **Completed**: The fault completes execution without any **failed** or **N/A** probe statuses.
	- **Completed with Error**: When the fault completes execution with at least one **failed** probe status but no **N/A** probe status, it is considered to be **completed with error**.
	- **Error**: When the fault completes execution with at least one **N/A** probe status, it is considered to be **error** because you can't determine if the probe status was **passed** or **failed**. A fault is considered to be in an **error** state when it has 0 probes because there are no health checks to validate the sanity of the chaos experiment.

#### **ChaosHub**

	A collection of experiment templates (defined as workflow CRs) and faults (defined as ChaosExperiment CR and ChaosEngine CR) that help create and execute new chaos experiments against your target resources. Apart from the Enterprise ChaosHub, which is present by default, you can add custom ChaosHub to manage and distribute custom experiment templates and faults.

	- **Enterprise ChaosHub**: Also known as Enterprise hub, it comes out-of-the-box with HCE and consists of pre-built manifests (YAML files) and chaos experiment templates. It is a prebuilt ChaosHub that represents the existing experiments and chaos faults. You can use faults from multiple categories to create chaos experiments in the Enterprise ChaosHub.

		#### Reason for adding custom ChaosHub

		* Add custom experiments suited to specific needs in your organization.
		* Share your experiments with others in your Harness project or in other Harness projects—you can add the same custom hub(s) to many projects.
		* Maintain and upgrade experiments in one place so those you share your hubs with always have the latest version.
		* Provide secure access to your custom experiments.

#### Chaos Infrastructure

	It represents the individual components of a deployment environment. It is a service that runs within your target environment to help HCE access the target resources and inject chaos at a cloud-native scale.

<Accordion color="pink">
<summary> Types of infrastructure </summary>

There are different types of chaos infrastructure such as Kubernetes, Linux, and Windows. You can choose to execute experiments on these infrastructures based on different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, and so on.

Based on the target environments, you can install chaos infrastructure as a Kubernetes service, a Linux daemon or a Windows agent.

:::tip
Chaos experiments associated with Cloud Foundry are executed using Linux chaos infrastructure, and experiments with AWS, GCP, Azure, VMware, and Bare metal are executed on Kubernetes infrastructure.
:::

All the chaos infrastructure services adhere to the **principle of least privilege**, where the services execute with the minimum number of permissions.

<Tabs>
<TabItem value="Linux infrastructure">

A set of mandatory input flags is required to install chaos infrastructure, including the `infra-id`, `access-key` and the `server-url`. However, certain aspects of the infrastructure can be tuned via the following flags:
1. **log-directory**: Custom log directory to store the log files. By default, the logs are stored at `/var/log/linux-chaos-infrastructure`.
2. **task-poll-interval-seconds**: Interval between subsequent poll queries to the server for a new experiment. The default value is **5 seconds**.
3. **task-update-interval-seconds**: Duration between subsequent status updates of an active fault to the server. The default value is **5 seconds**.
4. **update-retries**: Maximum number of retries in case of a failure while sending a fault status or result.

    * If the retry count is breached while sending the status, the active fault is aborted after logging the error during each attempts and the result is then attempted to be sent.

    * If the retry count is breached while sending the result, no result is sent by the infrastructure but the error during the attempts are logged.

    The default value is **5**.

5. **update-retry-interval-seconds**: Interval between the subsequent attempts to send a fault status or result, in case of a failure. The default value for it is **5 seconds**.
6. **chaos-infra-liveness-update-interval-seconds**: Interval between the chaos infrastructure liveness heartbeats. The default value is **5 seconds**.
7. **chaos-infra-log-file-max-size-mb**: Maximum size limit for the chaos infrastructure log file rotation. Upon breaching the size limit, a new log file is created to store the logs and the old log file is retired as a backup archive. The default value is **5 MB**.
8. **chaos-infra-log-file-max-backups**: Maximum number of backup archives to be retained at any given time. The oldest archive is deleted when a new log file is created. The default value is **2**.
9. **experiment-log-file-max-age-days**: Number of days after which the experiment log files will be deleted. The default value is **30**.
10. **custom-tls-certificate**: TLS certificate used to communicate with the control plane.
11. **http-proxy**: HTTP proxy URL used to communicate with the control plane.
12. **http-client-timeout**: HTTP client timeout for communicating with the control plane. The default value is **30s**.

:::info note
LCI does not currently support:
1. Cron schedules
2. [GameDays](/docs/chaos-engineering/features/gameday/introduction-to-gameday.md)
3. Executing [parallel faults](/docs/chaos-engineering/features/experiments/create-complex-chaos-experiments.md) in SaaS (the self-managed platform (SMP) supports executing parallel faults on LCI)
:::

#### Infrastructure service
The Linux chaos infrastructure is installed as an executable binary on your Linux machine. This infrastructure is managed as a `Systemd` service.
- The service starts automatically when the system starts.
- If the service stops unexpectedly, it automatically attempts to restart after a cool down period of 5 seconds.
- By default, the service ensures that the chaos infrastructure process is owned by the root user.

To check if the infrastructure service is active and running, use the following command:
```
systemctl status linux-chaos-infrastructure.service
```
![Terminal](./static/chaos101/terminal.png)

Any status other than the `active` status would indicate an issue with the infrastructure.

#### Logs
Logs that are generated are stored in the `/var/log/linux-chaos-infrastructure` directory by default. There are two types of logs:
1. **Infrastructure logs:** Infrastructure logs are generated as a result of any infrastructure operation that is not directly related to the execution of an experiment. For example:
    - Start of execution of an experiment
    - End of execution of an experiment
    - Error during the creation of an experiment log file
    - Error while querying for an experiment
    - Error while sending the experiment status or result, etc.

    By default, this log file is located at `/var/log/linux-chaos-infrastructure/linux-chaos-infrastructure.log` and can be used for troubleshooting the infrastructure.

:::info
- The file is rotated based on its size; when the file size is a specified size, it is archived in a separate file with the timestamp of rotation suffixed to the file name. By default, this value is **5 MB**.
- Eventually, the old archives will be deleted. The maximum number of most recent archives that are retained at any given time can be specified. By default, this value is **2**.
:::

2. **Experiment logs:** Experiment logs are stored in separate files, which are scoped to the faults of the experiment. It contains information about the various steps of the execution of that fault, including any errors caused during the execution of the fault. The files use the unique fault name mentioned in the experiment as their filename.

:::info
- These files are rotated based on their age; where files older than a specific number of days are removed. By default, this value is **30 days**.
:::

#### Resilience probes for Linux

HCE allows you to create the below probes for Linux:

1. [HTTP](/docs/chaos-engineering/features/resilience-probes/http-probe)
2. [Command](/docs/chaos-engineering/features/resilience-probes/cmd-probe)
3. [Datadog](/docs/chaos-engineering/features/resilience-probes/datadog-probe)
4. [Dynatrace](/docs/chaos-engineering/features/resilience-probes/dynatrace-probe)

When you try to enable or disable a Linux probe, two mandatory fields `type` and `attempt` (with empty values) are added to the probe. Even if you edit these values, they will not reflect in the updated experiment manifest. This is because the final values for the earlier-mentioned mandatory fields are picked from the database associated with the specific probe. Go to [known issues](/docs/chaos-engineering/troubleshooting/known-issues) for more information.

</TabItem>

<TabItem value="OpenShift infrastructure">

**Step 1. Create or identify the target namespace and install the service accounts**

Create or identify the target chaos namespace in which you will deploy the chaos infrastructure.
You will use the `hce` namespace in this case.

```bash
kubectl create ns hce
```

You can create the service account in the cluster mode or the namespace mode.

To install in the **cluster mode**, create the service accounts using the [cluster-mode-sa.yaml](./static/openshift/cluster-sa.yaml) file. You can download the file and apply it.

To install in the **namespace mode**, create the service accounts using the [namespace-mode-sa.yaml](./static/openshift/namespace-sa.yaml) file. You can download the file and apply it.

If you have a different namespace, replace the namespace with `<your-namespace>` in the manifest.

```bash
kubectl create cluster-mode-sa.yaml -n  hce
```

__Output__

```bash
$> kubectl apply -f cluster-mdoe-sa.yaml -n hce
serviceaccount/litmus-admin created
serviceaccount/hce created
serviceaccount/argo-chaos created
serviceaccount/argo created
serviceaccount/litmus-cluster-scope created
```

**Step 2. Create Litmus Security Context Constraint (SCC) and authenticate it with the service account**

To create the litmus SCC,
- Copy the contents of the [litmus SCC manifest](./static/openshift/litmus-scc.yaml) to `litmus-scc.yaml` file.
- Apply this manifest to your chaos infrastructure.

  ```bash
  kubectl apply -f litmus-scc.yaml
  ```

__Output__

```bash
$> kubectl apply -f litmus-scc.yaml
securitycontextconstraints.security.openshift.io/litmus-scc created
```
- Authenticate all `hce` service accounts with `litmus-scc`:

  ```bash
  oc adm policy add-scc-to-user litmus-scc -z <SERVICE-ACCOUNT-NAME> --as system:admin -n <CHAOS-NAMESPACE>
  ```

:::note
- Replace `<CHAOS-NAMESPACE>` with the namespace where litmus is installed. (Here litmus)
- Replace `<SERVICE-ACCOUNT-NAME>` with the name of hce service accounts.
:::


In this case, the exact command is:
```bash
oc adm policy add-scc-to-user litmus-scc -z litmus-admin,argo-chaos,argo,litmus-cluster-scope,default,hce --as system:admin -n hce
```

__Output__

```bash
clusterrole.rbac.authorization.k8s.io/system:openshift:scc:litmus-scc added: ["litmus-admin" "argo-chaos" "argo" "litmus-cluster-scope" "default" "hce"]
```

:::tip
To learn more about SCC, go to [SCC documentation](/docs/chaos-engineering/architecture-and-security/security/security-templates/openshift-scc).
:::

**Step 3. Get the manifest to install chaos infrastructure**

After [connecting to a chaos infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures.md), select the installation mode (cluster scope or namespace scope).

![configure-chaos-infra](https://user-images.githubusercontent.com/35391335/226420643-6490d8bc-90fc-438e-92cc-f90a736ab374.png)


:::note
Provide the namespace and the service account name. To use a service account other than `hce`, create a new service account and authenticate it with litmus-scc by following steps 1 and 2.
:::

**Step 4. Verify the installation**

Verify if all the pods are in `Running` state (optional).

```bash
$> kubectl get pods -n hce


NAME                                   READY   STATUS    RESTARTS   AGE
chaos-exporter-6c4b6d6c48-cht2d        1/1     Running   0          23s
chaos-operator-ce-57f5f7ccdb-m7g7f     1/1     Running   0          24s
subscriber-57798b696b-69vtr            1/1     Running   0          14s
workflow-controller-67b87685fb-h6k5b   1/1     Running   0          29s
```

Ensure that the state of the chaos infrastructure is `CONNECTED`.

![verify-chaos-infra-state](https://user-images.githubusercontent.com/35391335/226423314-b00555de-c999-42f5-97cb-deea51a81e95.png)

**Step 5. Run chaos experiments**

To run Kubernetes experiments, you need to tune the parameters associated with the fault. You can update or add the below mentioned environment variables while tuning the faults.

```yaml
- name: CONTAINER_RUNTIME
  value: crio
- name: SOCKET_PATH
  value: /run/crio/crio.sock
- name: SET_HELPER_DATA
  value: false
```


</TabItem>

<TabItem value="Windows infrastructure">

The diagram represents a high-level architecture of the interaction between the Windows execution plane and control plane components.

![](./static/windows-infrastructure/detailed-architecture.png)

#### Advanced setup

The mandatory input required for the installation of the chaos infrastructure is the `name`.
You can tune the other flags of the infrastructure with the following flags:

1. **admin user**: Administrator used to execute commands on the terminal to install and manage the Windows chaos infrastructure. By default, the logs are stored at `C:\\HCE\logs`.

2. **task poll interval**: Interval between subsequent poll queries to the server for a new experiment. The default value is **5 seconds**.

3. **task update interval**: Duration between subsequent status updates of an active fault to the server. The default value is **5 seconds**.

4. **infrastructure liveness update interval**: Interval between the chaos infrastructure liveness heartbeats. The default value is **5**.

5. **update retries**: Number of retries before the service fails.

6. **update retries interval seconds**: Interval between the subsequent attempts to send a fault status or result, in case of a failure. The default value for it is **5 seconds**.

7. **log file max size**: Maximum size limit for the chaos infrastructure log file rotation. Upon breaching the size limit, a new log file is created to store the logs and the old log file is retired as a backup archive. The default value is **5 MB**.

8. **log file max backups**: Maximum number of backup archives to be retained at any given time. The oldest archive is deleted when a new log file is created. The default value is **2**.

9. **experiment log file max age**: Number of days after which the experiment log files will be deleted. The default value is **30**.

10. **http proxy**: HTTP proxy URL used to communicate with the control plane.

11. **http client timeout**: HTTP client timeout for communicating with the control plane. The default value is **30s**.

#### Infrastructure service
The Windows chaos infrastructure is installed as an executable binary on your Windows VM. The service binary is present in `C:\\HCE\windows-chaos-infrastructure.exe` path. The config file is present in `C:\\HCE\config.yaml` path.

#### Logs
Logs that are generated are stored in the `C:\\HCE\logs` directory by default.

There are two types of logs:
1. **Infrastructure logs:** Infrastructure logs are generated as a result of any infrastructure operation that is not directly related to the execution of an experiment. Every experiment run has a new log folder with all connectivity logs.

:::info
- The file is rotated based on its size; when the file size is a specified size, it is archived in a separate file with the timestamp of rotation suffixed to the file name. By default, this value is **5 MB**.
- Eventually, the old archives will be deleted. The maximum number of most recent archives that are retained at any given time can be specified. By default, this value is **2**.
:::

2. **Experiment logs:** Experiment logs are stored in separate files, which are scoped to the faults of the experiment. It contains information about the various steps of the execution of that fault, including any errors caused during the execution of the fault. The files use the unique fault name mentioned in the experiment as their filename.

:::info
- These files are rotated based on their age; where files older than a specific number of days are removed. By default, this value is **30 days**.
:::

#### Verify Windows infrastructure service status

To verify the status of the service, navigate to the command prompt on your Windows. Search for **Task Manager**, select **More details** and check the status of **WindowsChaosInfrastructure**.

1. If the status reads **Running**, it means the windows infrastructure is up and running.

![](./static/windows-infrastructure/add-pwd-1.png)


2. If it reads **Stopped**, right click and select **Start**.

![](./static/windows-infrastructure/start-service-2.png)

3. Any other status will be associated with logs which you can troubleshoot using our [troubleshooting guide](/docs/chaos-engineering/troubleshooting/troubleshooting.md)

#### Resilience probes for Windows

HCE allows you to create the below probes for Windows:

1. [HTTP](/docs/chaos-engineering/features/resilience-probes/http-probe)

</TabItem>
</Tabs>

</Accordion>

<Accordion color="pink">
<summary> Importance of infrastructure </summary>

Chaos infrastructure helps facilitate the chaos fault injection and hypothesis validation thereby enabling chaos automation for target resources.

</Accordion>

<Accordion color="pink">
<summary> Using a infrastructure </summary>

You can [connect to an infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures), [disconnect from it](/docs/chaos-engineering/features/chaos-infrastructure/disconnect-chaos-infrastructure), and [upgrade it](/docs/chaos-engineering/features/chaos-infrastructure/upgrade-infra).
You can install an infrastructure as a part of creating an experiment. This infrastructure is installed on the target Kubernetes cluster and helps inject chaos into applications, thereby executing the chaos experiments.
Go to [flow of control](/docs/chaos-engineering/chaos-faults/kubernetes/classification#flow-of-control-in-kubernetes-based-faults) to understand the flow of control of Kubernetes faults.

:::tip
- You can add multiple chaos infrastructures as part of an environment.
- You can set up a chaos infrastructure in **cluster-wide** access scope or in a **namespace** scope.
:::
</Accordion>

- **Environment**

	It represents your deployment environment such as `Dev`, `QA`, `Staging`, `Production`, etc. Each environment may contain multiple chaos infrastructures. It helps isolate the various environments that the engineering, product owners, QA, and automation teams use under a single Harness project. This allows for better segregation of mission-critical infrastructures with several attached dependencies from dev and staging infrastructures for their safety.

- **Chaos Studio**

	It is used to create new chaos experiments using various chaos faults and templates from ChaosHub, probes, and custom action steps. You can create new experiments using the guided UI or by using the experiment manifest represented by the workflow CR.

- **Resilience Score**

	It is a quantitative measure of how resilient the target application is to a chaos experiment. You can [calculate](/docs/chaos-engineering/features/experiments/resilience-score) this value based on the priority set for every fault in the experiment and the probe success percentage of the faults (if the probes are defined).

- **Chaos Engine Custom Resource (CR)**

	It is the user-facing chaos Kubernetes CR which connects a target resource instance with a chaos fault to orchestrate the steps of chaos execution. You can specify run-level details such as overriding fault defaults, providing new environment variables and volumes, deleting or retaining experiment pods, defining probes, and updating the status of the fault execution.

- **Chaos Experiment Custom Resource (CR)**

	It contains the low-level execution information for the execution of a chaos fault. The CR holds granular details of a fault such as the container image, library, necessary permissions, and chaos parameters. Most of the chaos experiment CR parameters are tunables that you can override from the chaos engine CR.

- **Workflow Custom Resource (CR)**

	It is used to define the number of operations that are coupled together in a specific sequence to achieve a desired chaos impact. These operations are chaos faults or any custom action associated with the experiment, such as load generation.

- **Chaos Manager**

	A GraphQL-based Golang microservice that serves the requests received from the chaos infrastructure either by querying MongoDB for relevant information.

:::tip
A NoSQL MongoDB **database** microservice accountable for storing users' information, past chaos experiments, saved chaos experiment templates, user projects, ChaosHubs, and GitOps details, among other information.
:::

- **Chaos Exporter**

	An optional constituent that exposes monitoring metrics such as QPS and others present on the cluster to the frontend.
	It facilitates external observability in HCE. You can achieve this by exporting the chaos metrics generated (during the chaos injection as time-series data) to the Prometheus database for processing and analysis.

### Components common to all Chaos Infrastructure

Some of the components common to all chaos infrastructures include:

- **Workflow controller**: Helps execute chaos experiments by:
	- Searching for the experiment on the cluster.
	- Identifying the experiment.
	- Triggering the experiment.

- **Subscriber**: Serves as a bridge between the execution plane and control plane. It also performs other tasks required to orchestrate the chaos experiment executions, such as:
	- Installing a new chaos experiment on the cluster.
	- Sending the experiment metadata (after completing the execution) to the control plane.
	- Performing health checks on all the components in the chaos execution plane.
	- Creating a chaos experiment CR from a chaos experiment template.
	- Monitoring the events associated with the chaos experiment during its execution.

#### Chaos Operator
Leverages the Kubernetes operator pattern to interpret the fault configuration, execute the individual faults in an experiment, execute the fault and its probes (if they have been defined), and populate the result after the execution.

#### Chaos Exporter
Optional component that facilitates external observability in HCE. This is achieved by exporting the chaos metrics generated during the chaos injection as time-series data to the Prometheus database for processing and analysis.
## Conclusion

Chaos engineering is a technique you can implement with all types of systems, including legacy applications and infrastructure. It is especially significant for cloud-native applications, which often have multiple points of failure due to their distributed and elastic nature.
By introducing constant chaos during the engineering phase and the production phase, you may come across issues and potential failure points that you never thought of.
By embracing chaos engineering, you can better prepare your applications to withstand unexpected disruptions and maintain seamless performance.

## Try Chaos Engineering today

* Run your first chaos experiment
* Executing experiments in a sandbox
* Create chaos experiments from scratch