---
sidebar_position: 1
title: HCE Release Guide
---

# Introduction 

The release of the Harness Chaos Engineering (HCE) module provides a **functional chaos experimentation platform** that helps users simulate a wide variety of real-world failures observed on Kubernetes, AWS and other infrastructure. The module helps carry out end-to-end chaos engineering practices, that includes defining chaos as code, controlling blast radius, validating hypotheses, automating experiments through pipeline integrations and analyzing resilience trends via metrics. 

The chaos module is built on the open source CNCF project LitmusChaos, with additional features to enhance the user experience. 
Below is a list of actions that you (user) can perform as a part of the release (Nov 14th, 2022). 

## Managing Access to Chaos Resources

You will have the permissions to perform operations on the “chaos resources” platform due to the module’s ability to leverage the powerful access control capability in the Harness platform. The chaos resources include:

1. ChaosHub(s)
2. Chaos Infrastructure(s)
3. Chaos Experiment(s) 


You can **view**, **create/edit**, and **delete** the chaos resources using the permissions enabled for you by the project administrator. Alternatively, a custom role can be created with the desired permission list and attached to you/user groups. 

Learn more about how to set up access control rules for chaos resources [here](https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-dashboard/#user-management).

## Configuring Chaos Artifact Source (a.k.a ChaosHubs) 

The module equips each project with an embedded “Enterprise ChaosHub” that contains fault templates (and corresponding experiment definitions) for different infrastructure target types. You can also connect to your own chaos hub that supports the following operations: 
  
1. Connect public and private **GitHub** repositories as the canonical source for ChaosHub(s).
2. Refresh/sync ChaosHub on demand.
3. Disconnect ChaosHub from the project.

***Note:*** The operations supported on user-connected ChaosHubs (i.e, connect, refresh/sync, disconnect) are not applicable to the Enterprise ChaosHub as it is managed by Harness. 

Learn more about how to connect chaos hubs [here](https://developer.harness.io/docs/chaos-engineering/user-guides/add-chaos-hub). 

## Connecting Targets to the Chaos Control Plane (a.k.a Chaos Infrastructure)

By deploying specific Kubernetes resources (which establishes connectivity with the Harness control plane, relay instructions and events from/to it, respectively), you can attach target clusters or namespaces (where the chaos business logic is executed on discovered workloads) to the chaos module.
 
These target clusters/namespaces are referenced within the module through the “Chaos Infrastructure” platform resource. This chaos infrastructure belongs either to a pre-prod or prod [environment](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts#environments) within the Harness platform. 

You can connect your chaos infrastructure by applying a YAML manifest that is generated from the module dashboard by providing some simple inputs, such as: 

1. Name by which it is identified
2. Namespace where it is deployed
3. Scope (cluster-wide or namespaced) 

You can provide additional inputs to influence the topology specifics (node-selectors & tolerations).   

You can disconnect from the chaos infrastructure(s) when required. To reconnect, a fresh connection attempt and a corresponding manifest are required.

Learn more about how to connect chaos infrastructure [here](https://developer.harness.io/docs/chaos-engineering/user-guides/connect-chaos-infrastructures). 

## Constructing and Executing Chaos Experiments 

You can choose to construct and run chaos experiments (recurring or otherwise) on a given chaos infrastructure from the following options:

1. **Use a Blank Canvas:** You can pick faults from the desired ChaosHub, map the right application targets and tune them with the right inputs.  The module provides multiple [probes](https://developer.harness.io/docs/chaos-engineering/technical-reference/probes) to define the hypothesis validation that accompanies the fault injection.   

2. **Launch Experiment:** You can launch an experiment from the Enterprise ChaosHub. Each fault is mapped to a pre-defined experiment definition which you can directly invoke. This process involves selecting the right chaos infrastructure and application target before executing the experiment.  

3. **Upload:** You can upload an experiment manifest. 

Learn more about how to construct and execute chaos experiments [here](https://developer.harness.io/docs/chaos-engineering/user-guides/construct-and-run-custom-chaos-experiments). 

## Chaos Experiments Lifecycle Management 

The Harness Chaos Engineering module provides a rich set of options to manage the experiment definitions, which include:  

1. Push experiment definitions to a ChaosHub thereby providing version control/maintaining chaos as code.
2. Edit experiments (inline) or generating new copies off an existing experiment definition.
3. Delete experiments (with its run history).

Learn more about managing experiment definitions [here](https://developer.harness.io/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/export-chaos-experiments). 

Runtime options are also supported, which include: 

1. Halt an ongoing experiment run or all active runs in the project.
2. Run a previously executed experiment.

Learn more about runtime options for experiments [here](https://developer.harness.io/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/halt-chaos-experiments). 

## Observability Around Chaos Experiments

Each experiment has a dedicated overview page that provides an execution summary that consists of:

1. Total number of runs (successful/unsuccessful);
2. Average resilience score attached to the experiment; and 
3. A reference to the latest run details.  

You can track the chaos experiment run using an informative dashboard (Detailed Execution View) that helps analyze individual fault impact (using probe success, failures) and provides access to fault execution logs. 

Learn more about analyzing chaos experiment runs [here](https://developer.harness.io/docs/chaos-engineering/user-guides/manage-chaos-experiment-execution/analyze-chaos-experiment). 

In addition, the chaos infrastructure components deployed in the target cluster or namespace include a Prometheus exporter for the chaos which provides information about the state and results (upon completion) of the chaos experiment execution. 

## Chaos Operations Audit

You can track the chaos operations on the module by examining the **Audit Trail** available in the Account Settings. Each supported (CRUD) operation on the [listed](https://docs.google.com/document/d/1WEezOwDJdeztN7-KAyhAciuFxiTUXuTeUhaQgrqPBLY/edit#heading=h.f6hslt96gaty) platform chaos resource is logged (with user, resource instance, type of action and timestamp) and the module source is set to “CHAOS”. 

Below is a list of supported actions placed under the audit log: 


| Chaos resource       | Logged action(s)            |
|----------------------|-----------------------------|
| ChaosHub             | Connect                     |
|                      | Edit                        |
|                      | Sync                        |
|                      | Disconnect                  |
| Chaos Infrastructure | Connect                     |
|                      | Disconnect                  |
| Chaos Experiment     | Create / Run                |
|                      | Create / Export To ChaosHub |
|                      | Edit Inline / Edit Copy     |
|                      | Edit / Export To ChaosHub   |
|                      | Edit Schedule               |
|                      | Halt Run / Recurring Run    |
|                      | Rerun / Execute             |


## Pipeline Integration (CD) 

You can execute the chaos experiments defined in the module in the Deploy stage of Harness CD pipelines through a **chaos step** to validate the sanity of deployment. The chaos step configuration involves the following actions:  

1. **Selection** of the desired Chaos Experiment (each chaos step is mapped to one experiment). The process of selection is aided by a summary view of each experiment candidate. 
2. Defining a **resilience score** threshold which determines whether the chaos step is a success or a failure. 
3. Choosing a **failure strategy** (in the advanced configuration section of the chaos step) to be carried out in response to step failures. The recommended strategy is to **rollback** the deployment- thereby enabling an automated recovery, to leave the infrastructure in the last known good state. 

The chaos step results provide references to the [detailed execution view](https://docs.google.com/document/d/1WEezOwDJdeztN7-KAyhAciuFxiTUXuTeUhaQgrqPBLY/edit#heading=h.2tezeqpc61kr) of the experiment to help analyze success/failure. 

Standard use cases of the chaos integration into the pipelines involve the usage of the Verify step, often run in parallel with the chaos experiment to track the behavior of the deployment under test. 

Learn about how you can run chaos-enabled deployment pipelines [here](https://developer.harness.io/tutorials/run-chaos-experiments/integration-with-harness-cd).
