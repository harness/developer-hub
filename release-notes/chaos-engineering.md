---
title: Chaos Engineering release notes
sidebar_label: Chaos Engineering
date: 2025-04-17T10:00
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/chaos-engineering/rss.xml" />

The release notes describe recent changes to Harness Chaos Engineering.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness.  In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## June 2025

### Version 1.62.0

#### Images required

Listed below are the images to download to use [image registry with Harness Delegate](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/image-registry#images-required).

- harness/chaos-ddcr:1.62.0
- harness/chaos-log-watcher:1.62.0
- harness/service-discovery-collector:0.42.0
- harness/chaos-ddcr-faults:1.62.0

#### New features and enhancements

- Adds VPC route misconfiguration chaos fault. Using this AWS fault, users can reproduce VPC route misconfiguration changes, such as loss of connectivity to critical components such as Transit Gateway (TGW), NAT Gateway (NATGW), or VPC Peering connections. (CHAOS-8181)

- Adds support for AWS Windows chaos faults using DDCR. (CHAOS-8139)

- Adds support for non admin execution of windows memory hog fault using Windows Chaos Infrastructure. (CHAOS-8468)

- Added support installation of linux agent via non-root user, where a non-root user can be used for installing and executing the faults. However this limits the available faults for execution as not all the faults can be executed without root user permissions. (CHAOS-8121)

- Add support for windows faults using DDCR. (CHAOS-8141)

- Add support for windows memory hog with SYSTEM user using DDCR. (CHAOS-8456)

- Enable parallel faults in SaaS for Linux. (CHAOS-8748)

- Add apm probe support in experiment level probes. (CHAOS-8518)

- Add support for Experiment level probes, action and templates during experiment construction. (CHAOS-8062)

- Unified schema validation for all infras supporting exp level probes. (CHAOS-8608)

- Add properties & variables tabs under probes and actions in chaos studio. (CHAOS-8745)

- Add support for new probes/actions/faults in execution details in timeline view. (CHAOS-8558)

- Experiment new list page added with revamped Chaos Experiments List page. (CHAOS-8185)

- Implement Action Details Screen for Standalone Actions. (CHAOS-8178)

- Add support of vanity urls in chaos-manager, chaos-k8s-ifs, service-discovery and sandbox manager. (CHAOS-8528)

- Add Fault-Specific Permission Details for visualization on the Enterprise ChaosHub with permissions required "basic & advanced" indicator on localHub cards for faults, including related tooltip and filter options. (CHAOS-8397)

- UI changes for support installation of Linux agent via non-root user. (CHAOS-8699)

#### Fixed issues

- Fix the experiment failed execution status when experiment fails. (CHAOS-8744)

- Render Skipped and Error nodes with 0 duration on experiment timeline view. (CHAOS-8959)

- Fix the execution node details and missing data in timeline view. (CHAOS-8560)

- Update ddcr with latest hce-sdk to fix run properties issue. (CHAOS-8739)

- Fix emissary release pipeline. (CHAOS-8559)

- Internal system error coming while running experiments in snapshot has been resolved. (CHAOS-8521)

- Fix issue with page size dropdown in pagination component. (CHAOS-8457)

- GraphQL API returns 0 value for attempt and retry in probe run property has been fixed. (CHAOS-8167)

- Display error description instead of error message in UI for rest APIs. (CHAOS-8493)

- Resolve flakiness with *.module.d.ts scss type files when running typecheck. (CHAOS-8590)

- Skip sending Impersonating Authentication Info in audit details if impersonation is not done. (CHAOS-8939)

- Provide experiment type / kind in experiment list API to redirect to the correct execution page. (CHAOS-8868)

- Update status in execution node details in DDCR and remove case conversion in chaos manager. (CHAOS-8792)

- Update Local Hub Entity Total Category count to use itemCount rather than sum of category count. (CHAOS-8599)

- Update the logic to fetch count of faults, actions and probes in a chaos hub. (CHAOS-8595)

- Update response format of listFaults API. (CHAOS-8534)

- Update the response format for listFault API in frontend. (CHAOS-8571)

- Update UI to support updated schema for actions. (CHAOS-8522)

- Update pagination limit to 64 for listFaults API. (CHAOS-8478)

- Update getProbes and getProbe GQL API to only return non runtime based probes for backwards compatibility. (CHAOS-8195)

- Update actions API to return manifest for correct action type. (CHAOS-8700)

- Update template field in chaosHubResources on sync operation. (CHAOS-8707)

- Update the troubleshooting command suggested for windows infrastructure. (CHAOS-8605)

- Move FaultRef outside faults and rename ID to Identify for experiment probes. (CHAOS-8589)

- Merge the KCE and MCE schema. (CHAOS-8563)

- chaos-manager Service not using Rolling Deployment Strategy has been fixed. (CHAOS-8790)

## April 2025

### Version 1.59.0

#### Images required

Listed below are the images to download to use [image registry with Harness Delegate](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/image-registry#images-required).

- harness/chaos-ddcr:1.59.0
- harness/chaos-log-watcher:1.59.0
- harness/service-discovery-collector:0.39.0
- harness/chaos-ddcr-faults:1.59.0

#### New features and enhancements

- Added support for Windows CPU stress on Windows dual socket servers. (CHAOS-7902)
- Adds support for dynamic updates in Active Discovery and the Application Map after each discovery run—new services are added, removed services are marked accordingly, and resources from newly excluded namespaces are hidden, with their services shown as removed if referenced in the Application Map. (CHAOS-7745)
- Added Windows global blackhole experiment to cause global blackhole chaos on a Windows VM. (CHAOS-7091)

#### Fixed issues

- Fixed an issue that was causing runtime input-based fault additions to fail in Kubernetes (Harness Infrastructure) experiments when using a private image registry with a secret. The system now correctly handles secrets during fault creation in these scenarios. (CHAOS-8006)

- Added an index on the `environment_id` field to improve query performance and reduce latency for operations involving environment-specific data. (CHAOS-7726)

- Updated the title header on the Getting Started page from a question format ("Create Chaos Experiments on your ______?") to a clear statement: "Create Chaos Experiments on your Infrastructure" for better readability and user experience. (CHAOS-7802)

- Resolved a goroutine leak in chaos-manager by properly closing response bodies, preventing memory spikes and unbounded memory usage. (CHAOS-7972)

- Corrected the experiment count display in Bulk Run on HCE-SaaS UI by replacing the hardcoded value with a dynamic variable to reflect the actual number of selected experiments. (CHAOS-7818)

## March 2025

### Version 1.57.2

#### Images required

Listed below are the images to download to use [image registry with Harness Delegate](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/image-registry#images-required).

- harness/chaos-ddcr:1.57.0
- harness/chaos-log-watcher:1.57.0
- harness/service-discovery-collector:0.37.1
- docker.io/harness/chaos-ddcr-faults:1.57.0

#### New features and enhancements

- Replaces the large text blocks in the pod details and probes tabs with concise tooltips and "Learn More" links, directing users to relevant content in the Harness Developer Hub for improved readability and navigation. (CHAOS-7621, CHAOS-7619)

- Adds support for targeting multiple keys in the [Linux Redis Cache Expire](/docs/chaos-engineering/use-harness-ce/chaos-faults/linux/redis-cache-expire) and [Kubernetes Redis Cache Expire](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/redis-cache-expire) faults.(CHAOS-7283)

#### Fixed issues

- Fixed an issue where services were not appearing on the application map in the Chaos module when the discovery agent was created through the Discovery page. (CHAOS-7743)

- Fixed scrolling issue with the ChaosHubs side navigation bar. (CHAOS-7728)

- Resolved an issue with the timeline view for an experiment with multiple probes, which showed incorrect probe information when user clicked any probe. (CHAOS-7718)

- Resolved an issue in the experiment timeline view where all timestamps were unnecessarily converted to Unix milliseconds, even when already in Unix millisecond format. (CHAOS-7719)

## February 2025

### Version 1.56.3

#### Images required

Listed below are the images to download to use [image registry with Harness Delegate](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/image-registry#images-required).

- harness/chaos-ddcr:1.56.0
- harness/chaos-log-watcher:1.56.0
- harness/service-discovery-collector:0.36.0
- docker.io/harness/chaos-ddcr-faults:1.56.0

#### New features and enhancements

- Running timeline view in the **Execution View**: You can track the real-time execution of chaos experiments for improved visibility. (CHAOS-6672)

- **Improved chaos infrastructure search navigation**: Searching for chaos infrastructure from the **Chaos Experiment** page now includes a search bar in the list view, making navigation easier when dealing with multiple entities. (CHAOS-7556)

#### Fixed issues

- Fixed issue that prevented auto-creation of experiments with unsupported kinds. (CHAOS-7600)

- Linux command probes in "source" mode was failing due to a module mismatch. This is fixed now. (CHAOS-7596)

- Fixed caching issue when selecting chaos faults in Chaos Studio. (CHAOS-7595)

- Resolved ChaosGuard failure for non-Kubernetes experiments. (CHAOS-7636)

- Fix typo in category for template validation. (CHAOS-7692)

### Version 1.55.1

#### Images required

Listed below are the images to download to use [image registry with Harness Delegate](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/image-registry#images-required).

- harness/chaos-ddcr:1.55.0
- harness/chaos-log-watcher:1.55.0
- harness/service-discovery-collector:0.35.0
- docker.io/harness/chaos-ddcr-faults:1.55.0

#### New features and enhancements

- Modifies the Chaos Select Pipeline component to accept additional resources as properties and support allowed infrastructure types. (CHAOS-7035)

#### Fixed issues

- Fixed an issue where the Kubernetes chaos infrastructure was being auto-selected even when other infrastructure types were enabled. (CHAOS-7549)
- Updated the `useGetChaosExperimentStats` API to support project and account-scoped data retrieval. (CHAOS-7530)

### Version 1.54.0

#### Images required

Listed below are the images to download to use [image registry with Harness Delegate](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/image-registry#images-required).

- harness/chaos-ddcr:1.54.0
- harness/chaos-log-watcher:1.54.0
- harness/service-discovery-collector:0.34.0
- docker.io/harness/chaos-ddcr-faults:1.54.0

#### New features and enhancements

- Upgrades the base image for all chaos services from `UBI-8` to `UBI-9` to resolve vulnerabilities. (CHAOS-7504)

- Supports using a chaos fault template with boolean values. (CHAOS-7514)

- Supports including a templated fault for an experiment that is part of an application map. (CHAOS-7516)

#### Fixed issues

- Fixed the issue where clicking a Kubernetes Harness Infrastructure from the Experiments table threw a 400 (Bad request) error. (CHAOS-7512)

- Fixed an issue where Kubernetes API, HTTP, and network faults failed due to a malfunctioning container ID derivation command in the customer's Docker environment. This has been resolved by allowing user-defined input for the command pattern. (CHAOS-7255)

## January 2025

### Version 1.53.1

#### Images required

Listed below are the images to download to use [image registry with Harness Delegate](/docs/chaos-engineering/use-harness-ce/image-registry#images-required).

- harness/chaos-ddcr:1.53.0
- harness/chaos-log-watcher:1.53.0
- harness/service-discovery-collector:0.33.0
- docker.io/harness/chaos-ddcr-faults:1.53.0

#### New features and enhancements

- Upgrades all Go Services to use Go 1.23 to address the vulnerabilities.(CHAOS-7324)

- Upgrades all the third-party binaries like `kubectl`, `crictl` and `gcloud` to the latest versions to resolve the vulnerabilities. (CHAOS-7322)

- Introduces support for specifying **Transaction Percentage** in DNS chaos faults. (CHAOS-7244)

### Version 1.52.3

- **New videos**: [Pod Network Rate Limit](https://youtu.be/01efVOyFGl8?si=FQKWhVgdUJ0889fj), [Pod API Modify Header](https://youtu.be/sIkUxtnQY_o?si=ApWs_Opx2x27SkLj), [Pod IO Attribute Override](https://youtu.be/chk5K754J_4?si=pmzAgnpmHJC0f3Oz), [Pod API Block](https://youtu.be/Cg5gbfFrJQs?si=KueFmRJ6k8Ji4kbS), [Pod API Modify Body](https://youtu.be/Dbr_KwfTxps?si=-aHOmAr5onrFq6Zy). Adds a [playlist](https://www.youtube.com/playlist?list=PLXsYHFsLmqf0fgHoZANmwGB1tSQka5kDV) with Kubernetes Pod Chaos experiments.

#### Fixed issues

- Fixed the issue where fault templates were not working without enabling the feature flag associated with it. (CHAOS-7210)

- Fixed the issue where automatic experiment creation was unable to create the required number of experiments in **Advanced/Maximum** mode. (CHAOS-7214)

## Previous releases

<details>
<summary>2024 releases </summary>

#### December 2024, Version 1.50.3

##### New features and enhancements

- Adds support for Universal Base Images (UBI) for chaos components. (CHAOS-1547)

- Adds enhancement to prevent users from editing/deleting cron chaos experiments if the associated infrastructure is not active. (CHAOS-1894)

##### Fixed issues

- Fixed an issue in the GameDay details screen where the fault count for selected experiments was incorrect. (CHAOS-2052)

- Previously, user details were not appearing in audit events when using a service account for authentication. This issue is fixed by adding support for account-level service account authentication for the Chaos Module. (CHAOS-1959)

- Fixed an issue where the audit event for the summary of a GameDay run was not showing the name or ID of the associated GameDay. (CHAOS-1958)

- Fixed an issue where editing an existing experiment would directly open in the YAML builder view instead of the visual builder view. (CHAOS-1954)

- The **Create GameDay** and **Edit GameDay** buttons were displayed as active for users who did not have those permissions. This issue is fixed. (CHAOS-1795)

#### July 2024, Version 0.14.5

##### New features and enhancements

* Reports can now be downloaded. (CHAOS-1615)

    * You can now download reports for experiments as well as associated experiment runs. Reports include details about target chaos infrastructure, and execution details for experiment runs.

##### Early access features

* Introduction of [Chaos dashboards](/docs/chaos-engineering/use-harness-ce/dashboards/). (CHAOS-719)
    * Two new dashboards include number of experiments and number of infrastructures by user, as well as statistics of the chaos faults that were executed.
    * This feature is currently behind a feature flag named `CHAOS_DASHBOARD_ENABLED`. Contact Harness support to enable this feature.

##### Fixed Issues

* Corrected the UI text for the Inactive and Pending states for Linux infrastructure states. (CHAOS-1633)

* Improved the UI text when there are empty search results for Kubernetes or Linux infrastructures. (CHAOS-1629)

* Corrected the UI text for Linux infrastructure screens. (CHAOS-1619)

* There was an issue where the total number of probes incorrectly came to 0 when an experiment was running in a GameDay. This is fixed. (CHAOS-1618)

* Fixed a text wrapping issue on the confirmation dialog for deleting a chaos infrastructure. (CHAOS-1578)

#### May 2023, Version 0.11.1

##### New features and enhancements

* Introduction of GameDays in HCE Module. (CHAOS-643)
    * GameDay is a methodology to execute chaos experiments in your application during a specific time period. It acts as a template to schedule and execute one or more chaos experiments within your application. For more information, go to [Run a GameDay](/docs/chaos-engineering/use-harness-ce/GameDay).

* Allow saving of experiment with inactive infrastructure. (CHAOS-1573)
    * HCE now allows you to save an experiment if the infrastructure is inactive, with the saveExperiment API.

* The search field on the experiment runs page has been updated to **Search for experiment run ID** to make it clear that it does not search on the name of the experiment run. (CHAOS-1528)

#### April 2023, Version 0.10.3

##### New features and enhancements

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


* **All runs** screen changed to **Run history** (CHAOS-995)
    * This release has changed the **All runs** screen name to **Run history**. The **Run history** screen displays all the runs of a chaos experiment. Clicking on a specific run of the chaos experiment displays the fault executed, the status of the experiment, the status of the probes, the fault weights, and the duration of the experiment.

##### Fixed issues

* When connecting to an existing chaos hub, selecting a connector from the **Organization** failed to load the page. This is fixed. (CHAOS-1456)


* When an experiment terminated with an error but the probes passed, the user interface showed the experiment as **Completed**. This is fixed. (CHAOS-1410)


#### April 2023, Version 0.9.6

##### New features and enhancements

* **Update** button to see available updates for a chaos infrastructure (CHAOS-1069)
    * This release displays an **Update** button alongside the chaos infrastructure. When you click this button, it shows if an update is available for the infrastructure.


* Clicking an experiment goes to the experiment builder page (CHAOS-995)
    * This release takes you to the **Experiment Builder** page when you click the chaos experiment, instead of showing the **Overview** page. This way, you can directly edit the chaos experiment, save it, and run it.

* Replica pods are deleted when a chaos infrastructure is disabled (CHAOS-1290)
    * This release deletes all replica pods, including the subscriber pod, when the chaos infrastructure is disabled. You can delete the pods from the user interface by clicking **Disable** which displays a set of commands you can execute on your terminal. The commands vary depending on the mode of deployment (cluster-mode or namespace-mode).


* Deploying setup on new chaos infrastructures has **'X'** and **'Done'** buttons (CHAOS-1289)
    * This release adds the **X** (Cancel) and **Done** buttons to the **Deploy the setup** page when enabling chaos on new infrastructure. The **X** button cancels the deployment of chaos on new infrastructure. The **Done** button deploys chaos on the new infrastructure.


* Message displayed when no matching infrastructure is found (CHAOS-1289)
    * This release displays an alert message that states **"No Kubernetes chaos infrastructures found"** when you search for an infrastructure in the search bar on the Kubernetes infrastructure screen and that infrastructure does not exist. Previously, when an infrastructure was not found, an empty screen used to be displayed.

* Manifest has a yml extension when enabling chaos on new infrastructure (CHAOS-1289)
    * This release downloads the manifest with the yml extension when you **Enable chaos** **On new infrastructures**, rather than with the yaml extension.


* Description field in the chaos infrastructure does not display if not populated (CHAOS-1289)
    * This release does not display the description of the chaos infrastructure on the screen if you do not enter a description while creating a chaos infrastructure. Previously, the chaos infrastructure would show the field **Description** with no contents on the screen.

* Upgrade manifest downloads the manifest with the yml extension (CHAOS-1190)
    * This release downloads the upgraded manifest file with the yml extension when you click **re-download the manifest**.


* Exceeding limit of 1,000 experiments allows scheduling chaos experiments and connecting to new (or existing) infrastructure (CHAOS-1261)
    * This release displays a message stating that the resource limits have been reached once you exceed the 1,000 experiment creation limit. You will be able to schedule chaos experiments and connect to chaos infrastructures (new and existing ones) even after you hit the limit of 1000 experiments in chaos.


* Reduced response time of the communication chaos module and other Harness services (CHAOS-1262)
    * This release reduces the response time when the chaos module communicates with other Harness services. This is because the chaos module does not use intermediate gateways for communication, but rather hits the Harness service directly.


* **All runs** screen changed to **Run history** (CHAOS-995)
    * This release has changed the **All runs** screen name to **Run history**. The **Run history** screen displays all the runs of a chaos experiment. Clicking on a specific run of the chaos experiment displays the fault executed, the status of the experiment, the status of the probes, the fault weights, and the duration of the experiment.

##### Fixed issues

* When two faults were being executed in parallel, the timestamp in the **View detailed execution** showed only for the first fault. The second fault showed an empty timestamp field. This issue is fixed. (CHAOS-1064)

* When the latest run of a chaos experiment was stopped or had not started yet, the latest run showed the message "This experiment has not been run yet". Now, it has been fixed so that the summary of a chaos experiment shows the latest runs that were successful. (CHAOS-1076)

* When the details of a chaos experiment were being filled, clicking **Cancel** would show a message "Are you sure you want to proceed?" irrespective of whether or not the fields were populated. This issue is fixed. (CHAOS-1072)

* When you tried to enable chaos on an infrastructure, clicking anywhere outside the prompt would close the chaos infrastructure selection prompt. This issue is fixed. Only by clicking the **X** button at the top does the chaos infrastructure prompt close. (CHAOS-1070)

* In **Pipeline**, in the **Resilience** tab, the text in the 'View in chaos module' button overflowed when the name of the probe was too long. This issue is fixed so that the probe name is displayed when you hover on it. (CHAOS-1044)

* In **Pipeline**, when you tried to select an experiment in the chaos experiments page, the pagination section overflowed. This issue is fixed so that the chaos experiments page shows two buttons: **Prev** and **Next** to navigate through the pages. (CHAOS-1045)

* In chaos hubs, the number of experiments in the category tab for the chaos experiments overflowed. This issue is fixed. (CHAOS-1053)


#### February 2023, Version 0.7.3

##### Fixed issues

* When the connection between the control plane (user interface) and your cluster was broken (or closed), the chaos infrastructure displayed 'disconnected' status with the incorrect message "chaos infrastructure is already connected." Now, it has been fixed such that chaos infrastructure displays 'disconnected' status only after confirming the status of the connection using the Ping-Pong model, i.e., the control plane sends a message to the user cluster, and if the user cluster does not respond to it, the status is 'disconnected'. Consequently, the message "chaos infrastructure is disconnected" is displayed. (CHAOS-1113)

* There was no response from the chaos infrastructure when one or more pods (or replicas) of the associated components were not running. Now, it has been fixed so that the chaos infrastructure requires a minimum of one pod (replica) to be in the running state for all the required components. As a result, pod evictions caused by node shutdown or scaling operations will have no effect on the status of the chaos infrastructure. (CHAOS-1114)

:::note
This release introduces the Ping-Pong model, which requires the users to upgrade their existing chaos infrastructures to the latest version by re-downloading the chaos infrastructure manifest from the user interface and applying it to the respective cluster.
:::

#### January 2023, Version 0.7.2

##### New features and enhancements

* Resilience tab introduced on the pipeline execution screen (CHAOS-963)
    * This release adds a resilience tab, which displays the experiment results as a list of probes, their logs (descriptions), and probe status. Instead of navigating to the **View detailed execution** section of the experiment, you can now view the results of all the experiments on the pipeline execution screen.

* Support for X-API-KEY authentication (CHAOS-667)
    * This release adds support for X-API-KEY authentication for user-facing HCE APIs. This way, you can avoid using a JWT token, which gives more control over the module, and set your own custom expiration time on the X-API-KEY.

* Support for deployment on existing chaos infrastructure (CHAOS-954)
    * This release adds support for deploying your chaos infrastructures on clusters that use the existing (deployed) Harness Delegates (also known as the brownfield method of deployment). You can select the connector that points to the required delegate and other details like installation mode, service account name, and namespace, after which the YAML manifest is generated and sent over to the cluster instead of being downloaded on your system. Once the delegate receives the manifest, it deploys your chaos infrastructure on the selected cluster. Currently, you can deploy the chaos infrastructure by using only account-level delegates.

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
    * On the chaos experiments tab, the **Resilience score** field displayed the resilience score and the percentage increase in resilience score between the current and previous runs of an experiment. This release removes the percentage increase and, instead, displays the difference between the current run's and previous run's resilience score for better readability.

* The **Experiments overview** page categorizes experiments on the basis of average resilience score (CHAOS-802)
    * This release categorizes and displays all the chaos experiments on the basis of average resilience score. It also displays the number of experiments in each category. It shows three categories based on the average resilience scores of the experiments: 0 through 39, 40 through 79, and 80 through 100. This provides better insights about the chaos experiments and their resilience scores. Previously, the overview page showed only the number of experiments that passed and the number of experiments that failed.

* Every run of an experiment is clickable to view detailed execution (CHAOS-1032)
    * On the **Chaos Experiments** tab, you could see the detailed execution of an experiment's runs by clicking the three vertical dots corresponding to a run, and then clicking **View run**. In this release, you can also directly click the experiment run to view its detailed execution.

##### Fixed issues

* Searching for chaos experiments by using the search bar showed only those experiments that had been run at least once. Now, when you search for an experiment, the search results include those experiments that were aborted and experiments that were saved but not run. (CHAOS-916)
* When specifying the target application parameters through a YAML manifest, if you left some parameters empty, the user interface of the target application page would stop responding. This is fixed so that, irrespective of the values that you enter in the YAML manifest, you can change the values of the target application on the user interface. (CHAOS-970)
* In a chaos experiment, the fault library incorrectly showed fault categories and fault labels even when the hub was disconnected. The fault library persisted data from the previously selected chaos hub. This is now fixed. A disconnected chaos hub now displays the message "No faults found in the selected hub." (CHAOS-971)
* On the chaos hub screen, you could not scroll through the list of hubs from any location on the screen. This issue is now fixed by moving the scroll bar to the extreme right of the screen. (CHAOS-964)
* If you hovered over a probe, its details would overflow if they were too long. Now, it has been fixed. (CHAOS-990)
* Any increase in the number of chaos faults that you wished to view on a single page in a chaos hub would result in a blank page. Now, it has been fixed. (CHAOS-984)
* When a chaos experiment was imported into the chaos hub, it was not logged as an audit event and was not displayed on the user interface. It has been fixed. (CHAOS-779)
* If no chaos infrastructure is connected with your project, a blank screen would be displayed. Now, the message "There are no chaos infrastructures in your project." is displayed. (CHAOS-1009)
* In CRON experiments, the scheduled run time would always be shown in GMT. Now, it has been fixed to show the run time in your browser's time zone. (CHAOS-1035)
* The parameters in the YAML manifest of different runs of the same chaos experiment were inconsistent with the changes made (if any) in their respective runs. Now, it has been fixed.

</details>

<details>
<summary>2022 releases</summary>

#### December 2022, Version 0.6

##### New features and enhancements

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


##### Fixed issues

* When a component on the user interface was missing due to incompatibilities, the page would stop responding. Now it has been fixed so that instead of the page crashing, the component field shows as empty. (CHAOS-843)
* Experiments executed and triggered by respective categories (a pipeline, a scheduled CRON job, or a user) are correctly shown. (CHAOS-800)
* When a chaos experiment contains characters such as ' ', '/', and so on, logs are correctly parsed and displayed on the screen. The execution is encoded before being sent to the control plane and decoded after being received by the user interface. (CHAOS-854)
* After deleting a chaos experiment from a particular page, the pagination is reset and only shows the available experiments. (CHAOS-923)
* When a chaos infrastructure is deleted, details on the user interface wrongly showed the infrastructure ID instead of the infrastructure name. This is now fixed. (CHAOS-952)
* When a chaos experiment was pushed to the chaos hub, only a single fault associated with the experiment was being pushed, rather than all the faults. This is now fixed. (CHAOS-973)
* When a chaos experiment was deleted, only the most recent run was deleted, and the previous runs were retained in the cluster. Now it has been fixed such that when a chaos experiment is deleted, all the runs associated with it are deleted from the cluster.
* When a chaos experiment was deleted, the fault running within the experiment was not stopped. Now it has been fixed such that, when an experiment is deleted, the chaos fault running on the Kubernetes cluster is halted, the fault is deleted, and the experiment as a whole is deleted. (CHAOS-782)
* When a chaos experiment was running, the user interface incorrectly showed probes that were still being executed as failed probes. Now it has been fixed so that the interface shows the correct status of the probes being executed. (CHAOS-911)
* The term "agent" was changed to "infrastructure". While selecting (or creating) an infrastructure, the search bar showed all available infrastructures irrespective of the search string entered by the user in the search bar. (CHAOS-920)
* When a CRON experiment was stopped by the user, the current run used to stop, but the upcoming (and subsequent) runs were not being affected by the stop. It has been fixed now so that stopping an experiment will stop the upcoming schedules as well. (CHAOS-713)

#### December 2022, Version 0.4.2

##### New features and enhancements

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


##### Fixed issues

* Enterprise chaos hub appeared in the search results irrespective of the terms searched. Now it has been fixed.
* Details of a previously connected chaos infrastructure were prefilled when connecting to a new chaos infrastructure. Now it has been fixed. (CHAOS-777)
* The **Run** button was activated even when the chaos experiment was running. Now, the button is reactivated only after the chaos experiment is complete.(CHAOS-807)
* The chaos access page shows all experiments and experiment runs instead of showing experiments that were performed within a specific time frame. (CHAOS-810, CHAOS-762)
* A cancel button and a back button have been added to the enable chaos screen. The buttons have made it easy to navigate between screens when setting up the chaos infrastructure.
* When you search for a specific chaos fault and the chaos manager cannot map this chaos fault to a chaos fault icon, the user interface previously displayed an error. Now, instead of showing the error, it silently skips the error logs. (CHAOS-814)
* The expected resilience score changed to `NaN` (not a number) when it was overridden. Now it has been fixed. (CHAOS-791)
* The resource-type field was previously not available. Now, it has been made available and you can use this field to abort a chaos experiment in the audit trail. (CHAOS-714)

#### November 2022, Version 0.2.0

##### Early access features

The Harness Chaos Engineering (HCE) module, which you can use to perform chaos experiments on your applications and infrastructure, is now available for testing. To be part of this testing, contact [Harness Support](mailto:support@harness.io). [HCE documentation](/docs/chaos-engineering) is available on the Harness Developer Hub. Harness recommends that you gain familiarity with the chaos experimentation workflow in HCE by following the instructions in [Your First Chaos Experiment Run](/docs/chaos-engineering/getting-started/saas/).

##### Known issues

###### Chaos hub

1. Github is the only Git provider for chaos hubs.
2. Details for an already connected chaos hub can't be updated.

###### Chaos infrastructure

1. Chaos infrastructure can't be installed through Harness Delegate.
2. Logs for chaos infrastructure can't be viewed.
3. The properties of chaos infrastructure can't be updated. You will need to provide blacklisted namespaces.
4. The properties of the environment to which the chaos infrastructure belongs can't be updated.
5. Configuring chaos infrastructure doesn't provide support for Linux and Windows.

###### Chaos experiments

1. Experiments with parallel faults can't be created.
2. Probe tunables can't be updated or edited.
3. A cron or recurring chaos experiment can't be suspended or resumed.
4. An individual fault in an experiment can't be stopped through your input.
5. A chaos experiment can't be pushed to Gitlab, Bitbucket, or Gerrit.
6. A chaos experiment can't be pushed from Azure to Got
7. SCM experiment push logs can't be audited.

###### CI Pipeline integration

1. Optional assertion for chaos step failure can't be provided during pipeline integration.
2. The chaos error type(s) can't be selected in a failure strategy.
3. Timeouts can't be defined for experiment execution.
4. Access control can't be gained for the chaos step addition.
5. Pipeline template support can't be obtained with the chaos steps.
6. The experiment execution can't be viewed from step output during the experiment run.
7. Propagation can't be aborted from chaos step to experiment execution.
8. Information about propagation can't be gained from pipeline to experiment (for audit purposes).

</details>