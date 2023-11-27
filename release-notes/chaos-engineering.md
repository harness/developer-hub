---
title: Chaos Engineering release notes
sidebar_label: Chaos Engineering
tags: [NextGen, "chaos engineering"]
date: 2023-11-11T10:00
sidebar_position: 5
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="/release-notes/chaos-engineering/rss.xml" />

The release notes describe recent changes to Harness Chaos Engineering.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness.  In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## November 2023

### Version 1.24.5

#### New features and enhancements

* This release adds default limits for the number of chaos probes that can be created when a chaos infrastructure is created by adding a **chaos probe** resource limit per account. (CHAOS-2880)

* This release adds a new log viewer, which includes:
    - New tab for helper pod logs. 
    - Support for grouping and minimising logs.
    - Colors for various log levels.
    - Logs can be downloaded, copied, and scrolled over.
    - Position retention when logs are manually scrolled while streaming.
    - Parsing arguments. (CHAOS-2809)

* This release adds a validation check to the template name and entry point in the YAML to match at least one template name with the entry point name. The check ensures that the visual builder shows the faults correctly. (CHAOS-2933)

* This release adds support for source and destination ports, isolating the ports as well as excluding them for VMware network faults. (CHAOS-2892)

* This release adds support for source and destination ports, isolating the ports as well as excluding them for Linux network faults. (CHAOS-2873)

* This release allows you to run multiple SOT or EOT probes in parallel in Kubernetes. (CHAOS-2863)

* This release supports min, max and mean values as parameters in the Dynatrace probe. (CHAOS-2853)

* This release adds the usage of sandbox network namespace for the CRI-O runtime, thereby enhancing the network faults. (CHAOS-2825)

* The format of logs has changed from JSON to **level:"" timestamp:"" out: "" args:""**. This improves the readability of logs. (CHAOS-2807)

* This release adds the probe iteration success count to the probe description. (CHAOS-2797)

* This release introduces a new fault- pod API block. This fault blocks the API based on path filtering. (CHAOS-2722)

* This release supports adding labels from the **Advanced Tune** section in the UI. (CHAOS-2612)

* This release adds an enhanced generic script injector framework that offers greater flexibility and control over your chaos experiments. It helps add chaos to target hosts using custom scripts that are passed using a configmap. These scripts are executed using SSH credentials securely referenced within the configmap. (CHAOS-2625)

* This release introduces a new fault- cloud foundry app stop. This fault stops a Cloud Foundry app for a fixed time period and later starts it. (CHAOS-2619)

* This release introduces a new fault- pod network rate limit. This fault determines the resilience of a Kubernetes pod under limited network bandwidth. (CHAOS-2478)

* This release reflects changes made in the chaos infrastructure images and the experiment images in their respective manifests when an image registry setting is changed. (CHAOS-2881)

* This release adds Linux stress and network fault custom arguments/flags that can be used with the **stress-ng** (stressNGFlags input) and **tc** (netemArgs input) commands, respectively. (CHAOS-2832)

#### Early access features

* This release introduces a new fault- Linux network rate limit. This fault slows down network connectivity on a Linux machine by limiting the number of network packets processed during a time period. (CHAOS-2495)

* This release optimises the Kube API calls by allowing the Linux IFS to use Redis for caching. (CHAOS-2119)

* The tag filter in the query that fetches Linux experiments was removed so that Linux experiments can be edited. Previously, the Linux experiments could not be edited. (CHAOS-2827)

* Once an experiment was pushed to the chaos hub, every fault was displayed twice in the CSV file. This has been fixed. (CHAOS-2971)

#### Fixed issues

* Attempting to delete a GameDay resulted in an internal server error. This has been fixed. (CHAOS-2975)

* The cron button on the right sidebar could not be updated in real time. It has been fixed so that the button can be toggled while updating the cron schedule. (CHAOS-2904)

* Memory consumption fluctuated when the Linux memory stress fault was in action. This has been fixed. (CHAOS-2806)

* If an experiment was stuck in the queued state for more than 2 hours, it would remain so indefinitely. It was fixed so that the experiment run times out if it is in the queued state for more than 2 hours. (CHAOS-2843)

* Executing parallel faults resulted in write conflicts. This has been fixed by adding helper pod names as annotations and patching these names to the chaos result, thereby preventing the write conflict. (CHAOS-2834)

* The reports of chaos experiment runs were missing details such as experiment run ID, experiment end time, and chaos injection duration. The issue was fixed to reflect these details. (CHAOS-2830)

* Clicking the copy button on the infrastructure page led to rendering the details of the infrastructure. This has been fixed. (CHAOS-2791)

* The probe name in the URL field broke the probe configuration tab. This has been fixed by adding the URL search parameters to the URL. (CHAOS-2821)

* Clicking the Chaos Studio tab navigation would reset the states of the header and sidebar and hide some buttons. It was fixed so that the states are not reset and all buttons are visible. (CHAOS-2837)


## October 2023

### Version 1.23.5

#### New features and enhancements

* Added support for the execution of pod-delete fault against workloads which are not managed by the standard native-controllers such as deployment, statefulset and daemonset. With this change, this fault can be executed on pods managed by custom controllers. (CHAOS-2798)

* Added support for enabling and disabling schedules for cron experiments. This can be found in the right-side nav bar. (CHAOS-2731)

* Enhanced Network Chaos faults (loss/latency/corruption/duplication) to support specific source and destination ports from the network fault i.e., traffic to the defined ports will not be impacted by the chaos injection. (CHAOS-2712)

* Enhanced service kill experiments on Google Kubernetes Engine (now uses the gcloud ssh function to carry out the kill operations instead of deploying a helper pod on the targeted node). Also added support for containerd runtime. (CHAOS-2649)

* Added support for specifying securityContext for chaos experiment related resources via user interface under advanced configuration. As part of supporting OCP4.11+ we have also stopped appending default security context attributes runAsUser & runAsGroup into the experiment/infrastructure manifest, and instead given the users the ability to add them optionally via the UI. (CHAOS-2614)

* Added support for <,>,<=,>= operators as part of the comparator in HTTP Probe via User Interface. (CHAOS-2611)

* Added a download button in the Logs Tab allowing users to download the logs for the node in ".log" format for further debugging/reporting purposes. (CHAOS-2462)

* Added support for conditional logging of probe evaluation results for each iteration in the Continuous and onChaos modes via a debug field added to the probe RunProperties. (CHAOS-1515)

#### Early access features

* Resilience Probes: This feature is currently behind a feature flag named CHAOS_PROBES_ENABLED.
    - Adding support for TLS and Authorization for HTTP and PROM probes. (CHAOS-2743)
    - Fixed an issue where SLO Probes were showing Source & Command on the probe details screen. (CHAOS-2715)
    - Fixed an issue where EvaluationTimeout was showing up for all types of Resilience probes, Now it is only available for SLO Probe. (CHAOS-2710)
    - Fixed an issue where edit/delete buttons were enabled for disabled resilience probes. (CHAOS-2701)

#### Fixed issues

* Fixed an issue where after editing an experiment via YAML Editor, users were unable to save the experiment. (CHAOS-2780)

* Fixed an issue where revert-chaos was not working properly for VMware stress-based faults. (CHAOS-2777)

* Fixed RBAC issue with create GameDay button on the landing page of GameDay. (CHAOS-2692)

* Added a fix to display the appropriate user information upon performing chaos experiment operations when the user has been accorded permissions at the account level instead of at the project level. (CHAOS-1585)

* Fixed an issue in VMware experiments where aborting an experiment was not updating the chaos result properly. This has been fixed by adding a wait for the result update before terminating the experiment for the abort. (CHAOS-2655)

* Fixed an issue where ImagePullSecrets were not getting propagated to helper pods. (CHAOS-2608)


### Version 1.22.1

#### New features and enhancements

* Experiment Run & Experiment Report has been enhanced to show more details for better auditing - (CHAOS-2606)
    - Added probe details along with description of failures, number of probes passed/failed/not-executed.
    - Added tunables for corresponding chaos faults in an experiment.
    - Project, Organization & Account Identifiers are now available in the report header itself.

* Updated `UPDATED_BY` field to show `SYSTEM` when a Chaos Resource is deleted automatically with respect to a Project/Organization/Account deletion. (CHAOS-2597)

* Enhanced the Chaos infrastructure upgrade process to automatically change to `UPGRADE_FAILED` status if the upgrade has been in progress for more than 2 hours. This will allow users to attempt an upgrade again once the upgrade has failed/timedout. (CHAOS-2575)

* Enhanced the experiment execution process to timeout a particular experiment if it has been running for more than the threshold timeout i.e. 2 hours. (CHAOS-2573)

* Enhanced the `stopOnFailure` option to change the status of an experiment to `COMPLETED_WITH_ERROR` in case of probe failure. (CHAOS-2564)

* Added a new tunable `ServiceExitType` for `vmware-service-stop` chaos fault which will allow users to choose if they want the target service to be killed gracefully or not. (CHAOS-2491)

* Added functionality to kill processes with process name in `vmware-process-kill` chaos fault. (CHAOS-2100)

* Added support for Git, GitLab, and BitBucket as native Connectors using Harness Secret Manager. (CHAOS-35)

#### Early access features

* Resilience Probes: This feature is currently behind a feature flag named `CHAOS_PROBES_ENABLED`.
    - Added support to re-fetch Probe statuses automatically under the Probes Tab in Chaos Studio. (CHAOS-2561)
    - Evaluation Timeout is now only available for SLO probe. (CHAOS-2554)
    - Added support for doing CRUD operations in Resilience probes from Chaos Studio itself. (CHAOS-2552)
    - Fixed an issue where Resource Name was not usable in K8s Resilience Probe. Adding the specific field at the API level resolved this issue. (CHAOS-2653)

#### Fixed issues

* Refreshing the chaos studio after saving was leading to unsaved changes earlier. This issue has now been resolved. (CHAOS-2654)

* Previously when the cron schedule was edited in YAML, there was no validation for the same in UI, which would sometimes lead to UI crash when shifting to the Schedule Tab in Visual Builder. This issue has now been fixed and validation has been added for both Visual and YAML editor modes. (CHAOS-2631)


### Version 1.21.2

#### New features and enhancements

* Upgraded `govc` binary with the latest release which fixed 14 vulnerabilities in the `chaos-go-runner` docker image. (CHAOS-2577)

* Added support for empty labels with `appkind` specified while filtering target applications for a Chaos Experiment. (CHAOS-2256)

#### Early access features

* Resilience Probes: This feature is currently behind a feature flag named `CHAOS_PROBES_ENABLED`.
    - Enhanced Chaos Studio to support older experiments with no annotation fields having Resilience probes reference. (CHAOS-2532)
    - Added support for headers in HTTP probe configured via Resilience Probes mode. (CHAOS-2505)
    - Deprecated "Retry" input in Probe configurations. Now only 1 (attempt) is supported. (CHAOS-2553)

#### Fixed issues

* Fixed Chaoshub connection API to check for already existing ChaosHub with the same name before connecting new ChaosHub. (CHAOS-2523)

* Fixed an issue where the `Save` button at the header of the `/gamedays` route is not disabled even though the user has not selected an experiment, today it is enabled by default and throws an error on click, even if the details asked of the user on the landing page are all filled. (CHAOS-2417)

## September 2023

### Version 1.20.1

#### New features and enhancements

* Added support for targeting specific ports when using API Chaos Faults via a new tunable, for example, `DESTINATION_PORTS`. (CHAOS-2475)

* Added support for HTTPs protocol in API Chaos Faults. (CHAOS-2145)

#### Early access features

* Chaos Guard: This feature is currently behind a feature flag named `CHAOS_SECURITY_GOVERNANCE`.
    - Added support for evaluation of mulitple app labels when running experiments with multiple target app labels. (CHAOS-2315)

* Linux Chaos Faults: This feature is currently behind a feature flag named `CHAOS_LINUX_ENABLED`.
    - In Linux experiments, the Resilience Score was sometimes showing as 0, although only one probe amongst multiple had failed. This was happening because of incorrect propagation of the probe error, which led to its misinterpretation as an experiment error rather than a probe failure. This issue has been fixed now. (CHAOS-2472)

* Resilience Probes: This feature is currently behind a feature flag named `CHAOS_PROBES_ENABLED`.
    - Enhanced mode selection drawer to show the UI according to selected mode by the users. Previously it was showing the image indicating SOT for all modes irrespective of the selected mode. (CHAOS-1997)

#### Fixed issues

* There was an issue where users were getting an error when an  experiment triggered via a pipeline failed to start and there is no notifyID created. This has been fixed now. (CHAOS-2490)

* Fixed an issue where the topology settings (taint-tolerations, nodeselectors) made in the advanced configuration section during experiment construction were getting applied only to the Argo workflow pods. Now, the topology settings are propagated to Chaos Fault Pods as well. (CHAOS-2186)

### Version 1.19.2

#### New features and enhancements

* Added support for Authentication and HTTPs in HTTP Probes for Kubernetes chaos faults. (CHAOS-2381)

* Added support for the destination ports for the provided destination IPs and hosts in network chaos faults. (CHAOS-2336)

* Added support for authentication and TLS in Prometheus probes in Kubernetes chaos faults. (CHAOS-2295)

* Chaos Studio no longer shows ChaosHubs with no experiments/faults during experiment creation. (CHAOS-2283)

* A new option has been added to preserve or delete the chaos experiment resources with a single toggle. Experiment resources can be preserved for debugging purposes. (CHAOS-2255)

* The Docker Service Kill chaos fault was enhanced to support containerd service as well. Users can select the type of service via a new tunable (SERVICE_NAME) they want to kill. (CHAOS-2220)

* Added support for downloading an experiment run specific manifest. Now, users can download experiment run specific manifest from the right sidebar on the Execution graph page. (CHAOS-1832)

#### Early access features

* Linux Chaos Faults (This feature is currently behind a feature flag named `CHAOS_LINUX_ENABLED`)
    - Added support for targeting multiple network interfaces in network faults. (CHAOS-2349)
    - The script generated to add the Linux infrastructure had incorrect flags due to changes in terminologies. This has now been corrected to reflect updated installation flags. (CHAOS-2313)

* Resilience Probes (This feature is currently behind a feature flag named `CHAOS_PROBES_ENABLED`)
    - Users had to select the **Setup Probe** button 2 times. It should now work only with a single click. It was dependent on formik validations, which in turn was halting the functionality of handleSubmit due to incorrect Yup validations. (CHAOS-2364)
    - When using the same probes in two faults under same chaos experiment, Probe API was returning the probe two times in the second fault. This was due to probeNames being a global variable and using the same probe name multiple times was causing the name to be appended without re-initializing the variable. Scoping it down to local scope fixed this issue. (CHAOS-2452)

#### Fixed issues

* The logs for the **install chaos experiment** step were getting lost immediately post execution. This issue was occurring in the subscriber component, after the custom pods cleanup, the component was still trying to stream Kubernetes pod logs. As a fix, we have added a check to fetch the pod details and gracefully return the error if pods are not found with a proper error message. (CHAOS-2321)

* As Account Viewer, users were not able to view Chaos Dashboards. This was happening because the `getDashboards` API was missing routingID, which was failing the API calls. This has been fixed now. (CHAOS-1797)

* The frontend was making unnecessary queries to the backend for listWorkflow API whenever changing experiment details via the UI. Now ChaosStep has been optimized to only query when changing selected experiment using memoization. (CHAOS-883)

### Version 1.18.7

#### New features and enhancements

* Added Audit Event (Update) for Chaos Infrastructures upgrades which are triggered by SYSTEM/Cron Job Upgrader Automatically. (CHAOS-2350)

* Added filter on Chaos Experiments Table for filtering experiments based on tags. (CHAOS-2133)

* Now, Users will be provided with an error if there is already one experiment existing with the same name in ChaosHub while pushing an experiment to a ChaosHub. (CHAOS-872)

* Vulnerability Enhancements - (CHAOS-2162)
    - PromQL binary has been rebuilt with latest go1.20.7 & upgraded in chaos-go-runner docker image.
    - Kubectl binary has been upgraded to v1.28.0 to reduce 2 vulnerabilities in K8s as well as chaos-go-runner docker image.
    - Argo components like workflow-controller and argo-exec have been upgraded to v3.4.10 which resolves all vulnerabilities in respective components.

#### Early access features

* Linux Chaos Faults (This feature is currently behind a feature flag named `CHAOS_LINUX_ENABLED`)
    - Enhanced fault execution logs to also include logs from commands like stress-ng, tc & dd as well. (CHAOS-2309)
    - All APIs for services with respect to Linux Chaos have been migrated from the GraphQL and GRPC apis to REST. Users upgrading to 1.18.x need to upgrade all Linux Chaos Infrastructures.

#### Fixed issues

* Fixed the faults logs getting truncated when the log size is high. It was happening because logs were having a buffer size of 2000 bytes, if the log size was higher, logs were getting truncated. As part of the fix, we made the buffer resizable and optimized the flow. (CHAOS-2257)

* The UI wasn't fully updated post the probe schema changes to support explicit units definition (s, ms). Added units for probe run properties in UI. (CHAOS-2235)

* Users were able to create different experiments with the same name, since the experiment names carry a lot of significance and they should be unique. A name validation is added whenever a new experiment is saved & users will be provided with an error if an experiment with the same name already exists. (CHAOS-2233)

## August 2023

### Version 1.17.3

#### New features and enhancements

* Added support for OpenShift configuration for deploying chaos infrastructure. This will provide you with a predefined security context constraint (SCC) that you can modify according to your needs. (CHAOS-1889)

* Enhanced the Chaos experiment execution diagram to not switch to running nodes automatically. This change ensures that you stay on a node when you click it, thus giving you the opportunity to observe its details. (CHAOS-2258)

* Enhanced the Docker service kill fault to support the containerd runtime. (CHAOS-2220)

* Added support for targeting applications by using only `appkind`, only `applabel`, and set-based labels. (CHAOS-2170, CHAOS-2128)

* Parallel chaos injection and revert operations at scale have been improved for multiple target pods on the same node. (CHAOS-1563)

* Previously, if you did not set the `TARGET_CONTAINER` environment variable, the fault targeted a randomly selected container. Now, if you do not set the environment variable, the fault targets all containers in the target pods. (CHAOS-1216)

* Now, Users can specify drain timeout explicitly in the node drain fault. The node-drain fault has been using the `CHAOS_DURATION` value as a timeout, leading to potential confusion and risk of failure, especially when a shorter duration is used with many pods. The expectation is that `CHAOS_DURATION` should define the unschedulable period after draining. Providing a specific drain timeout would help users better estimate the eviction time for all pods on a node, reducing errors and false negatives. (CHAOS-2185)

* Enhanced the JobCleanUpPolicy configuration to also retain helper pods when it is set to retain in ChaosEngine. (CHAOS-2273


#### Fixed issues 

* Fixed how chaos is reverted if an attempt to inject the node drain fault fails or needs to be canceled. (CHAOS-2184)

### Version 1.16.6

#### Fixed issues 

* There was an issue where users were not getting audit events for the rules created under the Security Governance tab. This issue has been fixed. (CHAOS-2259)

### Version 1.16.5

#### New features and enhancements

* A new feature lets users do an automated upgrade for their cluster-scope chaos infrastructures using an upgrade agent, which is deployed along with the chaos infrastructure. This also lets users do an upgrade of their chaos infrastructures on demand. (1849)

    Existing users must reconnect their chaos infrastructures to use this feature, since it is only available for new cluster-scope chaos infrastructures. Old chaos infrastructures will continue to work even if not upgraded, but upgrade will be manual for them, as it was in previous versions.

* A new feature adds support for OpenShift security contexts, and provides tunables for RunAsUser and RunAsGroup in the experiment creation step. (CHAOS-2228)

* The **App Label(s)** field in chaos fault configuration now supports a multi-select dropdown in Kubernetes experiments. This corresponds to comma-separated values in the experiment YAML. This change is backward compatible with older experiments. (CHAOS-2120)

* The UI now provides a toggle in AWS experiments to enable or disable cloud secrets. (CHAOS-2092)

#### Fixed issues 

* Previously, the pipeline diagram crashed randomly when scheduling a new experiment. This happened due to the API returning an empty object for nodes. This issue has been fixed. (CHAOS-2148)

* In advanced configuration for experiments and chaos infrastructures, if you add a toleration, tolerationSeconds is now optional if the toleration effect is NoSchedule. (CHAOS-1955)

* Upgraded the Argo components Workflow-Controller and Argo-Exec to version 3.4.8. This reduces the number of vulnerabilities from 227 to 26. (CHAOS-1902)

### Version 1.15.7

#### Fixed issues 

* Audit events for pipeline-triggered experiments were not available due to a missing parameter. This issue has been resolved. (CHAOS-2168)

## July 2023

### Version 1.15.6

#### New features and enhancements

* Added support for Universal Base Images (UBI) for chaos components. (CHAOS-1547)

* Added enhancement to prevent users from editing/deleting cron chaos experiments if the associated infrastructure is not active. (CHAOS-1894)

#### Fixed issues 

* Fixed an issue in the Gameday details screen where the fault count for selected experiments was incorrect. (CHAOS-2052)

* Previously, user details were not appearing in audit events when using a service account for authentication. This issue has been fixed by adding support for account-level service account authentication for the Chaos Module. (CHAOS-1959)

* Fixed an issue where the audit event for the summary of a GameDay run was not showing the name or ID of the associated GameDay. (CHAOS-1958)

* Fixed an issue where editing an existing experiment would directly open in the YAML builder view instead of the visual builder view. (CHAOS-1954)

* The **Create GameDay** and **Edit GameDay** buttons were displayed as active for users who did not have those permissions. This issue has been fixed. (CHAOS-1795)

### Version 0.14.5

#### New features and enhancements

* Introduced a configuration for changing the mechanism for storing access keys and tokens in Config Maps instead of secrets on the execution plane. 

    When configuring chaos infrastructure, users can now select to store access keys and tokens in Config Maps (instead of secrets) on their cluster for connections, authentication, and experiment executions.

## June 2023

### Version 0.14.1

#### New features and enhancements

* [GameDay](/docs/chaos-engineering/configure-chaos-experiments/gameday/run-gameday) is no longer behind a feature flag, and is now available to all users. (CHAOS-1964)

* The CE [integration](/docs/chaos-engineering/integrations/use-chaos-with-srm) with Harness Service Reliability Management (SRM) is no longer behind a feature flag, and is now available to all users. (CHAOS-1964)

* While upgrading a namespace-scoped chaos infrastructure, users will now be shown the command for upgrading CRDs as well. (CHAOS-1846)

* We now show all steps in the experiment details pipeline diagram. (CHAOS-1817)

    Previously when users triggered chaos experiments, the execution graph generated step nodes progressively as the experiments executed. Now, the execution graph shows all step nodes after experiments start execution. The nodes yet to start remain in a pending state. 

* Previously, when users connected a ChaosHub, CE cloned the whole Github repository. This caused storage issues if the repository was very large, or users were using the same repository for multiple purposes. This has been enhanced so that CE clones only a single branch provided by users. (CHAOS-1722)

* When a user deletes a project, organization, or account, CE now deletes all chaos entities associated with that project, organization, or account. (CHAOS-1143)
    * When a project is deleted, all chaos entities in that project are deleted.
    * When an organization is deleted, all chaos entities in all projects under that organization are deleted. 
    * When an account is deleted, all chaos entities in all projects under that account are deleted.

* Enhanced the Chaos Experiments report to show tags for selected experiments along with sequence numbers for all associated experiment runs. (CHAOS-1777)

* Enhanced the Chaos Experiment Runs report to show a probe summary, along with a fault summary if there's a fault failure. (CHAOS-1776)

* Added support for new experiment run statuses in the **Chaos** Continuous Delivery (CD) step. (CHAOS-1210)

#### Fixed issues

* When generating a chaos infrastructure manifest that included `NodeSelectors` or `Tolerations`, there was an issue causing the first letter of key/value pairs to be capitalized. This issue has been fixed. (CHAOS-1917)

* When adding or updating a step in a chaos experiment, in the Probes tab, the **Probe mode** field is now required. (CHAOS-1882)
    
* The **Discard** button in Chaos Studio is now disabled if there are no changes in an experiment. (CHAOS-1878)

* The stop workflow feature wasn't able to stop experiments in the case of namespace-scoped chaos infrastructures. This issue has been resolved and the stop workflow now works as expected. (CHAOS-1778)

* There was an issue where if the user aborted an experiment running as part of a pipeline, the pipeline step displayed `All your faults executed without an issue`. This has been fixed, and the correct details are now displayed based on the experiment execution. (CHAOS-733)

* There was an issue where a CD step was not showing parallel faults even though the selected experiment had multiple parallel experiments. This issue has been fixed. (CHAOS-1208)

### Version 0.13.5

#### New features and enhancements

* Added a new Linux chaos fault, Disk Fill, which fills up the available disk space at a given system path for a specific duration. (CHAOS-1419)

* To help users select the right infrastructure for their use case, the Chaos Infrastructures UI screen has been enhanced to show supported faults by different chaos infrastructure categories. (CHAOS-1811)

* The database was upgraded to update the index in linuxInfrastructures collection. (CHAOS-1836)

#### Fixed issues

* The Chaos Faults screen in ChaosHub was crashing when the **Platform** field was missing in the faults metadata file. This issue has been fixed. (CHAOS-1841)

### Version 0.13.4

#### New features and enhancements

:::caution
This release breaks backward compatibility with older chaos infrastructures. You must update chaos infrastructures and the chaosnative/go-runner image in experiment definitions. If you don't upgrade, then chaos experiments will start to fail.

To upgrade chaos infrastructures and experiments:

1. Delete old ChaosEngines, if any:

    `kubectl delete chaosengines --all -n <namespace-of-chaosinfrastructure>`

1. Upgrade the CRDs in clusters where you have deployed a chaos infrastructure: 

    `kubectl apply -f https://raw.githubusercontent.com/chaosnative/hce-charts/main/hce-saas/hce-saas-crds.yaml`

1. If a chaos infrastructure indicates **UPGRADE NEEDED**, select **Update**, and then follow the instructions on your screen.

    ![](./static/chaos-infra-upgrade-needed.png)

1. Edit the YAML definitions of existing experiments to update the chaosnative/go-runner image to version 0.13.1. Do the same for existing experiments in custom chaos hubs that may be connected to your project. (Not required for new expriments.)

For detailed instructions, go to [Upgrade chaos infrastructure](/docs/chaos-engineering/chaos-infrastructure/upgrade-infra).
:::

* Added audit events for various GameDay operations such as create, update, etc., so that users can easily audit operations done on their GameDays. (CHAOS-1709)

* Browser tabs now show the module page name to help users switching between different tabs. (CHAOS-1683)

* The Delete Chaos Infrastructure API has been updated to allow deletion of only one infrastructure. (CHAOS-1681)

* Previously, the Last Heartbeat value was empty when chaos infrastructures were pending. Now, to prevent user confusion, this value displays N/A when chaos infrastructures are pending. (CHAOS-1666)

* Enhanced the Chaos Infrastructures table to allow routing to corresponding connectors from the Chaos Infrastructures screen. (CHAOS-1665)

* When scheduling an experiment fails for any reason, the user now sees the error when hovering over the status. (CHAOS-1574)

* Added a new advanced configuration to allow users to add annotations to all chaos pods using the UI. (CHAOS-1465) 

#### Fixed issues

* Improved the UI message returned when users search for a GameDay and the search term is not found. Now the message more accurately states "No GameDay found matching the search term." (CHAOS-1717)

* Previously, users were able to complete a GameDay even when some of the associated experiments were running. This could cause issues because it's not possible to edit or abort those experiments when a GameDay is closed. Now, users must abort running experiments in a GameDay before they can close it. (CHAOS-1713)

## May 2023

### Version 0.12.1

#### New features and enhancements

* Reports can now be downloaded. (CHAOS-1615)

    * You can now download reports for experiments as well as associated experiment runs. Reports include details about target chaos infrastructure, and execution details for experiment runs.

#### Early access features

* Introduction of [Chaos dashboards](/docs/chaos-engineering/configure-chaos-experiments/experiments/dashboards). (CHAOS-719)
    * Two new dashboards include number of experiments and number of infrastructures by user, as well as statistics of the chaos faults that were executed.
    * This feature is currently behind a feature flag named `CHAOS_DASHBOARD_ENABLED`. Contact Harness support to enable this feature.

#### Fixed Issues

* Corrected the UI text for the Inactive and Pending states for Linux infrastructure states. (CHAOS-1633)

* Improved the UI text when there are empty search results for Kubernetes or Linux infrastructures. (CHAOS-1629)

* Corrected the UI text for Linux infrastructure screens. (CHAOS-1619) 

* There was an issue where the total number of probes incorrectly came to 0 when an experiment was running in a GameDay. This has been fixed. (CHAOS-1618)

* Fixed a text wrapping issue on the confirmation dialog for deleting a chaos infrastructure. (CHAOS-1578)

### Version 0.11.1

#### New features and enhancements

* Introduction of GameDays in HCE Module. (CHAOS-643)
    * GameDay is a methodology to execute chaos experiments in your application during a specific time period. It acts as a template to schedule and execute one or more chaos experiments within your application. For more information, go to [Run a GameDay](/docs/chaos-engineering/configure-chaos-experiments/gameday/run-gameday).

* Allow saving of experiment with inactive infrastructure. (CHAOS-1573)
    * HCE now allows you to save an experiment if the infrastructure is inactive, with the saveExperiment API.

* The search field on the experiment runs page has been updated to **Search for experiment run ID** to make it clear that it does not search on the name of the experiment run. (CHAOS-1528)

## April 2023

### Version 0.10.3

#### New features and enhancements

* **Schedule** tab to schedule cron jobs (CHAOS-710)
    * A **Schedule** tab has been added to the experiment builder page where you can select from cron and non-cron experiments, schedule a cron experiment, **Save** it, and then **Run** it. Previously, cron experiments could not be saved; they were created and run.


* **Save** button when creating, editing, and cloning an experiment (CHAOS-1409)
    * After creating, editing, or cloning an experiment, you can **Save** and then **Run** the experiment. The **Run** button is disabled for unsaved changes. Previously, the **Run** button would save and execute the experiment.


* New status `Completed_with_probe_failure` to show probe failure (CHAOS-1431)
    * When an experiment completes execution, the resilience score may be 0. This means the experiment was successful and chaos was injected into the application, but the probes failed. The `Completed_with_probe_failure` status clearly indicates probe failure.


* Number of service accounts in the YAML manifests reduced to 3 (CHAOS-1306)
    * For ease of management and configuration, the number of service accounts provided in the YAML manifest is reduced to 3 from 6. 


* New access control **Execute** to execute chaos experiments (CHAOS-1279)
    * A new access control, **Execute** has been added, in addition to **View**, **Create/Edit**, and **Delete**. **Execute** allows you to execute the chaos experiments, whereas **Create/Edit** will only allow you to create a chaos experiment or edit an existing chaos experiment. The newly added access control provides granularity while working with chaos experiments. 


* **Apply changes** and **Discard** buttons added to the **Experiment builder** screen
    * After specifying values for the **Target application**, **Tune faults**, and **Probes**, you need to select the **Apply changes** button to apply the changes to the experiment. Otherwise, you can choose to **Discard** the changes. 


* Delete experiment confirmation notification (CHAOS-1434)
    * When you delete an experiment, a notification stating "The experiment has been deleted successfully" appears on the user interface indicating the successful deletion of the experiment.


#### Fixed issues

* When connecting to an existing chaos hub, selecting a connector from the **Organization** failed to load the page. This has been fixed. (CHAOS-1456)


* When an experiment terminated with an error but the probes passed, the user interface showed the experiment as **Completed**. This has been fixed. (CHAOS-1410)


### Version 0.9.6

#### New features and enhancements

* **Update** button to see available updates for a chaos infrastructure (CHAOS-1069)
    * This release displays an **Update** button alongside the chaos infrastructure. When you click this button, it shows if an update is available for the infrastructure.


* Clicking an experiment goes to the experiment builder page (CHAOS-995)
    * This release takes you to the **Experiment Builder** page when you click the chaos experiment, instead of showing the **Overview** page. This way, you can directly edit the chaos experiment, save it, and run it.


 
* Replica pods are deleted when a chaos infrastructure is disabled (CHAOS-1290)
    * This release deletes all replica pods, including the subscriber pod, when the chaos infrastructure is disabled. You can delete the pods from the user interface by clicking **Disable** which displays a set of commands you can execute on your terminal. The commands vary depending on the mode of deployment (cluster-mode or namespace-mode).


* Deploying setup on new chaos infrastructures has **‘X’** and **‘Done’** buttons (CHAOS-1289)
    * This release adds the **X** (Cancel) and **Done** buttons to the **Deploy the setup** page when enabling chaos on new infrastructure. The **X** button cancels the deployment of chaos on new infrastructure. The **Done** button deploys chaos on the new infrastructure. 


* Message displayed when no matching infrastructure is found (CHAOS-1289)
    * This release displays an alert message that states **"No Kubernetes chaos infrastructures found"** when you search for an infrastructure in the search bar on the Kubernetes infrastructure screen and that infrastructure doesn’t exist. Previously, when an infrastructure was not found, an empty screen used to be displayed.
 

* Manifest has a yml extension when enabling chaos on new infrastructure (CHAOS-1289)
    * This release downloads the manifest with the yml extension when you **Enable chaos** **On new infrastructures**, rather than with the yaml extension.
 

* Description field in the chaos infrastructure doesn’t display if not populated (CHAOS-1289)
    * This release doesn’t display the description of the chaos infrastructure on the screen if you do not enter a description while creating a chaos infrastructure. Previously, the chaos infrastructure would show the field **Description** with no contents on the screen. 
 

* Upgrade manifest downloads the manifest with the yml extension (CHAOS-1190)
    * This release downloads the upgraded manifest file with the yml extension when you click **re-download the manifest**. 
 

* Exceeding limit of 1,000 experiments allows scheduling chaos experiments and connecting to new (or existing) infrastructure (CHAOS-1261)
    * This release displays a message stating that the resource limits have been reached once you exceed the 1,000 experiment creation limit. You will be able to schedule chaos experiments and connect to chaos infrastructures (new and existing ones) even after you hit the limit of 1000 experiments in chaos.
 

* Reduced response time of the communication chaos module and other Harness services (CHAOS-1262)
    * This release reduces the response time when the chaos module communicates with other Harness services. This is because the chaos module doesn’t use intermediate gateways for communication, but rather hits the Harness service directly. 
 

* **All runs** screen changed to **Run history** (CHAOS-995)
    * This release has changed the **All runs** screen name to **Run history**. The **Run history** screen displays all the runs of a chaos experiment. Clicking on a specific run of the chaos experiment displays the fault executed, the status of the experiment, the status of the probes, the fault weights, and the duration of the experiment.

#### Fixed issues

* When tuning the target application, the OpenShift cluster timed out before fetching the information from your cluster. This issue is fixed. The duration of timeout has been increased. (CHAOS-1299)
 
* When the labels of a chaos experiment, such as **Run by** included special characters, the experiment would not run because Kubernetes doesn’t allow special characters in the labels. This issue is fixed. The labels (which are a part of the manifest file) are encoded before sending the experiment to the cluster and decoded while presenting on the user interface. (CHAOS-1281)


## February 2023

### Version 0.8.4

#### New features and enhancements

* Polling model to communicate between chaos infrastructure and the control plane (CHAOS-644)
    * This release updates the method of communication from web socket to the polling model. This allows the chaos infrastructure to handle higher loads with better scalability.

:::note
From this release onward, chaos infrastructures will communicate with the control plane through the polling model. To allow the existing chaos infrastructure to communicate with the control plane, reconnect or upgrade the chaos infrastructure by redownloading the manifest file.
::: 

* Log service integration with experiment logs (CHAOS-642)
    * This release adds logs integration into log-service. The logs generated by the chaos experiments persist in GCS even after the experiment pods are deleted from the cluster. It is important to note that only logs associated with the fault are retained. Logs for installations and clean-up steps are not retained.

* View and download the report for the runs of the chaos experiment (CHAOS-606)
    * This release allows you to view and download the report (as a PDF file) for all the runs of a chaos experiment. This helps you analyse and store the execution details of the chaos experiment.

* Chaos execution screen shows fault configuration details (CHAOS-1058)
    * This release displays the fault configuration details along with the probes and logs (previously displayed) on the **View execution details** page. The fault configuration details include the target application and fault tunables that you selected while constructing the experiment.

* Fallback view when tunables are unavailable (CHAOS-1063)
    * This release adds a fallback view when no fault tunables are available when you are constructing a chaos experiment. This fallback view displays the message "No tunables for the selected fault: fault_name.".

* Chaos configuration step in **Pipelines** shows the name of the chaos experiment (CHAOS-986)
    * This release shows the name of the experiment instead of showing the experiment Id in the chaos configuration setup step in **Pipelines**. This helps you identify experiments with ease.

* Search functionality when selecting experiments from chaos hub (CHAOS-1050)
    * This release adds search functionality when selecting an experiment template from chaos hub. You can also filter the experiments you want to view or select from the chaos hub. This allows you to select and run your experiment without searching multiple experiments.

* Chaos infrastructure manifest file extension changed to .yaml (CHAOS-1037)
    * This release changes the downloadable chaos infrastructure manifest file extension from yml to yaml.

* **Set fault weights** tab moved inside **Tune fault** tab (CHAOS-1077)
    * This release moves the **Set fault weights** tab, which was previously a separate tab, into the **Tune fault** tab. This allows you to tune the fault parameters and set fault weights in a single step rather than navigating through multiple tabs.

* Support for the GitLab connector (CHAOS-35)
    * This release introduces a new connector called the GitLab connector to connect to a chaos hub.

#### Fixed issues

* When two faults were being executed in parallel, the timestamp in the **View detailed execution** showed only for the first fault. The second fault showed an empty timestamp field. This issue has been fixed. (CHAOS-1064)
 
* When the latest run of a chaos experiment was stopped or had not started yet, the latest run showed the message "This experiment has not been run yet". Now, it has been fixed so that the summary of a chaos experiment shows the latest runs that were successful. (CHAOS-1076)
 
* When the details of a chaos experiment were being filled, clicking **Cancel** would show a message "Are you sure you want to proceed?" irrespective of whether or not the fields were populated. This issue has been fixed. (CHAOS-1072)
 
* When you tried to enable chaos on an infrastructure, clicking anywhere outside the prompt would close the chaos infrastructure selection prompt. This issue has been fixed. Only by clicking the **X** button at the top does the chaos infrastructure prompt close. (CHAOS-1070)
 
* In **Pipeline**, in the **Resilience** tab, the text in the ‘View in chaos module’ button overflowed when the name of the probe was too long. This issue has been fixed so that the probe name is displayed when you hover on it. (CHAOS-1044)
 
* In **Pipeline**, when you tried to select an experiment in the chaos experiments page, the pagination section overflowed. This issue has been fixed so that the chaos experiments plage shows two buttons: **Prev** and **Next** to navigate through the pages. (CHAOS-1045)  
 
* In chaos hubs, the number of experiments in the category tab for the chaos experiments overflowed. This issue is fixed. (CHAOS-1053)


### Version 0.7.3

#### Fixed issues

* When the connection between the control plane (user interface) and your cluster was broken (or closed), the chaos infrastructure displayed ‘disconnected’ status with the incorrect message "chaos infrastructure is already connected." Now, it has been fixed such that chaos infrastructure displays ‘disconnected’ status only after confirming the status of the connection using the Ping-Pong model, i.e., the control plane sends a message to the user cluster, and if the user cluster does not respond to it, the status is ‘disconnected’. Consequently, the message "chaos infrastructure is disconnected" is displayed. (CHAOS-1113)

* There was no response from the chaos infrastructure when one or more pods (or replicas) of the associated components were not running. Now, it has been fixed so that the chaos infrastructure requires a minimum of one pod (replica) to be in the running state for all the required components. As a result, pod evictions caused by node shutdown or scaling operations will have no effect on the status of the chaos infrastructure. (CHAOS-1114)

:::note
This release introduces the Ping-Pong model, which requires the users to upgrade their existing chaos infrastructures to the latest version by re-downloading the chaos infrastructure manifest from the user interface and applying it to the respective cluster.
:::

## January 2023 

### Version 0.7.2

#### New features and enhancements

* Resilience tab introduced on the pipeline execution screen (CHAOS-963)
    * This release adds a resilience tab, which displays the experiment results as a list of probes, their logs (descriptions), and probe status. Instead of navigating to the **View detailed execution** section of the experiment, you can now view the results of all the experiments on the pipeline execution screen. 

* Support for X-API-KEY authentication (CHAOS-667)
    * This release adds support for X-API-KEY authentication for user-facing HCE APIs. This way, you can avoid using a JWT token, which gives more control over the module, and set your own custom expiration time on the X-API-KEY. 

* Support for deployment on existing chaos infrastructure (CHAOS-954)
    * This release adds support for deploying your chaos infrastructures on clusters that use the existing (deployed) Harness delegates (also known as the brownfield method of deployment). You can select the connector that points to the required delegate and other details like installation mode, service account name, and namespace, after which the YAML manifest is generated and sent over to the cluster instead of being downloaded on your system. Once the delegate receives the manifest, it deploys your chaos infrastructure on the selected cluster. Currently, you can deploy the chaos infrastructure by using only account-level delegates.

* Details of an experiment are prefilled when adding it to a chaos hub (CHAOS-989)
    * Instead of forcing you to re-enter details, this release prefills the details of the experiment that you want to add to a chaos hub. You can simply navigate to the experiment and select **Add to ChaosHub**. The resulting screen displays the name of the experiment, a description (optional), and tags (optional). You can add your experiment to the chaos hub of your choice by selecting **Save**.

* One sync retry to connect to a disconnected chaos hub (CHAOS-999)
    * A chaos hub that is disconnected does not list any faults or experiments. This release adds a feature such that when you click on a disconnected chaos hub, HCE tries to synchronize and connect to the chaos hub at least once. 

* Filter chaos experiment based on target infrastructure (CHAOS-959)
    * On the **Deployment** tab, when you click on **Pipeline** and select a chaos experiment, you can filter experiments on the basis of their names. This release adds another filter so that you can view experiments on the basis of their target chaos infrastructure.

* Display an error message when URL is incorrect (CHAOS-1011)
    * If you enter an incorrect URL in your browser when viewing a chaos experiment, previously, the user interface would show a blank screen. This release displays an error message stating that the entered URL is invalid.

* The **Last updated by** field shows a user name (CHAOS-916)
    * A saved chaos experiment shows the **Resilience score**, **Last run status**, and **Last updated by** fields as **N/A**. This release updates the  **Last updated by** field with the name of the user who updated the chaos experiment most recently.

* Average resilience score shows the difference between the current and last executed resilience scores (CHAOS-916)
    * On the chaos experiments tab, the **Resilience score** field displayed the resilience score and the percentage increase in resilience score between the current and previous runs of an experiment. This release removes the percentage increase and, instead, displays the difference between the current run's and previous run’s resilience score for better readability.

* The **Experiments overview** page categorizes experiments on the basis of average resilience score (CHAOS-802)
    * This release categorizes and displays all the chaos experiments on the basis of average resilience score. It also displays the number of experiments in each category. It shows three categories based on the average resilience scores of the experiments: 0 through 39, 40 through 79, and 80 through 100. This provides better insights about the chaos experiments and their resilience scores. Previously, the overview page showed only the number of experiments that passed and the number of experiments that failed. 

* Every run of an experiment is clickable to view detailed execution (CHAOS-1032)
    * On the **Chaos Experiments** tab, you could see the detailed execution of an experiment's runs by clicking the three vertical dots corresponding to a run, and then clicking **View run**. In this release, you can also directly click the experiment run to view its detailed execution.

#### Fixed issues

* Searching for chaos experiments by using the search bar showed only those experiments that had been run at least once. Now, when you search for an experiment, the search results include those experiments that were aborted and experiments that were saved but not run. (CHAOS-916)
* When specifying the target application parameters through a YAML manifest, if you left some parameters empty, the user interface of the target application page would stop responding. This has been fixed so that, irrespective of the values that you enter in the YAML manifest, you can change the values of the target application on the user interface. (CHAOS-970)
* In a chaos experiment, the fault library incorrectly showed fault categories and fault labels even when the hub was disconnected. The fault library persisted data from the previously selected chaos hub. This is now fixed. A disconnected chaos hub now displays the message “No faults found in the selected hub.” (CHAOS-971)
* On the chaos hub screen, you could not scroll through the list of hubs from any location on the screen. This issue is now fixed by moving the scroll bar to the extreme right of the screen. (CHAOS-964)
* If you hovered over a probe, its details would overflow if they were too long. Now, it has been fixed. (CHAOS-990)
* Any increase in the number of chaos faults that you wished to view on a single page in a chaos hub would result in a blank page. Now, it has been fixed. (CHAOS-984)
* When a chaos experiment was imported into the chaos hub, it was not logged as an audit event and was not displayed on the user interface. It has been fixed. (CHAOS-779)
* If no chaos infrastructure is connected with your project, a blank screen would be displayed. Now, the message "There are no chaos infrastructures in your project." is displayed. (CHAOS-1009) 
* In CRON experiments, the scheduled run time would always be shown in GMT. Now, it has been fixed to show the run time in your browser’s time zone. (CHAOS-1035)
* The parameters in the YAML manifest of different runs of the same chaos experiment were inconsistent with the changes made (if any) in their respective runs. Now, it has been fixed.


## December 2022 

### Version 0.6

#### New features and enhancements

* Optimized listWorkflow and listWorkflowRun queries in the chaos manager (CHAOS-860)
    * This release optimizes the listWorkflow and listWorkflowRun queries in the chaos manager by only fetching those experiments that the user requests, instead of loading all the experiments at once.

* Pagination on the faults and experiments screen (CHAOS-689)
    * This release adds pagination on the faults and experiment screen in chaos hub that allows you to scroll and navigate through the experiments by pages. 

* Enable **Save** and **Run** buttons on the experiment builder (CHAOS-913)
    * This release enables the **Save** and **Run** buttons after you tune the application by specifying the parameters on the user interface. As a consequence, the default weight is set to 10 since the user would not move to the next step of setting fault weights.
 
* Experiment can be viewed during execution (CHAOS-835)
    * This release allows you to view the experiment even when it is being executed. Previously, an experiment could be viewed only after the run was complete.  

* Edit chaos experiment is separated into two action components (CHAOS-685)
    * This release divides the **Edit experiment** action into two actions: **Edit Experiment** and **Clone Experiment**. The **Edit Experiment** action helps you make changes to the current (or selected) experiment. The **Clone Experiment** action helps you create a new experiment from an already existing experiment. The cloned experiment retains the same configuration as the original experiment with the ability to tune the configurations if required.


#### Fixed issues

* When a component on the user interface was missing due to incompatibilities, the page would stop responding. Now it has been fixed so that instead of the page crashing, the component field shows as empty. (CHAOS-843)
* Experiments executed and triggered by respective categories (a pipeline, a scheduled CRON job, or a user) are correctly shown. (CHAOS-800)
* When a chaos experiment contains characters such as ‘ ‘, ‘/’, and so on, logs are correctly parsed and displayed on the screen. The execution is encoded before being sent to the control plane and decoded after being received by the user interface. (CHAOS-854)
* After deleting a chaos experiment from a particular page, the pagination is reset and only shows the available experiments. (CHAOS-923)
* When a chaos infrastructure is deleted, details on the user interface wrongly showed the infrastructure ID instead of the infrastructure name. This is now fixed. (CHAOS-952)
* When a chaos experiment was pushed to the chaos hub, only a single fault associated with the experiment was being pushed, rather than all the faults. This is now fixed. (CHAOS-973)
* When a chaos experiment was deleted, only the most recent run was deleted, and the previous runs were retained in the cluster. Now it has been fixed such that when a chaos experiment is deleted, all the runs associated with it are deleted from the cluster. 
* When a chaos experiment was deleted, the fault running within the experiment was not stopped. Now it has been fixed such that, when an experiment is deleted, the chaos fault running on the Kubernetes cluster is halted, the fault is deleted, and the experiment as a whole is deleted. (CHAOS-782)
* When a chaos experiment was running, the user interface incorrectly showed probes that were still being executed as failed probes. Now it has been fixed so that the interface shows the correct status of the probes being executed. (CHAOS-911)
* The term “agent” was changed to “infrastructure”. While selecting (or creating) an infrastructure, the search bar showed all available infrastructures irrespective of the search string entered by the user in the search bar. (CHAOS-920) 
* When a CRON experiment was stopped by the user, the current run used to stop, but the upcoming (and subsequent) runs were not being affected by the stop. It has been fixed now so that stopping an experiment will stop the upcoming schedules as well. (CHAOS-713)

### Version 0.4.2

#### New features and enhancements

* Provision to update chaos hub details (CHAOS-699)
    * This release allows you to update the details (such as name, Git connector, repository name, and branch name) of a connected chaos hub. 

* CDN support for static artifacts (CHAOS-600)
    * This release adds CDN support for static artifacts. CDN support reduces the latency while loading the user interface on client devices.

* Version information for Chaos Driver and Chaos Manager (CHAOS-729)
    * This release adds version numbers to **Chaos Driver** and **Chaos Manager**. Versioning the Chaos Driver and Chaos Manager enables Harness to version the corresponding endpoints (/chaos/driver/api/version for ChaosDriver and /chaos/manager/api/version for ChaosManager).

* Range filter for experiment runs in the experiment overview (CHAOS-824)
    * This release adds a range filter option in the **Experiment Runs** bar graph under **Experiment overview** that allows setting the range on the last run in the graph.

* Support for fault statuses (CHAOS-826)
    * This release adds support to show all the fault statuses in the Experiment Runs graph. In addition to the **Failed** and **Passed** fault status, faults in the **Awaited**, **Stopped**, and **N/A** states are also seen. 

* Seamless upgrade 
    * This release adds a manifest download button for the chaos infrastructures, to enable a seamless upgrade.

* Loaders for components and screens (CHAOS-822)
    * This release adds consistent loaders for all the components and screens in the user interface. These loaders decouple API requests and avoid blocking the rendering of the entire page due to chained API calls.

* Configurable response timeout for HTTP probes
    * This release adds a new response timeout parameter for HTTP probes in the user interface. The response timeout is in units of seconds. You can use this parameter to specify timeouts during HTTP probe health checks during chaos fault execution.


#### Fixed issues

* Enterprise chaos hub appeared in the search results irrespective of the terms searched. Now it has been fixed.
* Details of a previously connected chaos infrastructure were prefilled when connecting to a new chaos infrastructure. Now it has been fixed. (CHAOS-777)
* The **Run** button was activated even when the chaos experiment was running. Now, the button is reactivated only after the chaos experiment is complete.(CHAOS-807)
* The chaos access page shows all experiments and experiment runs instead of showing experiments that were performed within a specific time frame. (CHAOS-810, CHAOS-762) 
* A cancel button and a back button have been added to the enable chaos screen. The buttons have made it easy to navigate between screens when setting up the chaos infrastructure.
* When you search for a specific chaos fault and the chaos manager cannot map this chaos fault to a chaos fault icon, the user interface previously displayed an error. Now, instead of showing the error, it silently skips the error logs. (CHAOS-814)
* The expected resilience score changed to `NaN` (not a number) when it was overridden. Now it has been fixed. (CHAOS-791)
* The resource-type field was previously not available. Now, it has been made available and you can use this field to abort a chaos experiment in the audit trail. (CHAOS-714)

## November 2022

### Version 0.2.0

#### Early access features

The Harness Chaos Engineering (HCE) module, which you can use to perform chaos experiments on your applications and infrastructure, is now available for testing. To be part of this testing, contact [Harness Support](mailto:support@harness.io). HCE documentation, which includes user guides and [tutorials](/tutorials/chaos-experiments), is available on the Harness Developer Hub. Harness recommends that you gain familiarity with the chaos experimentation workflow in HCE by following the instructions in [Your First Chaos Experiment Run](/tutorials/chaos-experiments/first-chaos-engineering).

#### Known issues

##### Chaos hub

1. Github is the only Git provider for chaos hubs.
2. Details for an already connected chaos hub can’t be updated.

##### Chaos infrastructure

1. Chaos infrastructure can't be installed through Harness Delegate.
2. Logs for chaos infrastructure can’t be viewed.
3. The properties of chaos infrastructure can’t be updated. You will need to provide blacklisted namespaces.
4. The properties of the environment to which the chaos infrastructure belongs can’t be updated.
5. Configuring chaos infrastructure doesn’t provide support for Linux and Windows.

##### Chaos experiments

1. Experiments with parallel faults can’t be created.
2. Probe tunables can’t be updated or edited.
3. A cron or recurring chaos experiment can’t be suspended or resumed.
4. An individual fault in an experiment can’t be stopped through your input.
5. A chaos experiment can’t be pushed to Gitlab, Bitbucket, or Gerrit.
6. A chaos experiment can’t be pushed from Azure to Got
7. SCM experiment push logs can’t be audited.

##### CI Pipeline integration

1. Optional assertion for chaos step failure can’t be provided during pipeline integration.
2. The chaos error type(s) can’t be selected in a failure strategy.
3. Timeouts can’t be defined for experiment execution.
4. Access control can’t be gained for the chaos step addition.
5. Pipeline template support can’t be obtained with the chaos steps.
6. The experiment execution can’t be viewed from step output during the experiment run.
7. Propagation can’t be aborted from chaos step to experiment execution.
8. Information about propagation can’t be gained from pipeline to experiment (for audit purposes).