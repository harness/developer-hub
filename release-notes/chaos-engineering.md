---
title: Chaos Engineering
tags: [NextGen, "chaos engineering"]
date: 2020-12-02T10:00
sidebar_position: 9
---

Harness Chaos Engineering is updated regularly in Harness SaaS. Review the notes below for details about recent changes.

:::note
Harness deploys updates progressively to different Harness SaaS clusters. You can identify the cluster hosting your account in your Account Overview page. The features and fixes in the release notes may not be available in your cluster immediately.

Additionally, the release notes below are only for NextGen SaaS. FirstGen SaaS release notes are available [here](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes) and Self-Managed Enterprise Edition release notes are available [here](/release-notes/self-managed-enterprise-edition).
:::

## December 23, 2022, version 0.6

### What’s new

* Error boundary to avoid page crash (Chaos-843)
    * This release adds an error boundary that avoids crashing the page when a component on the user interface is missing due to incompatibilities. Instead of the page crash, the component field is empty. 

* Optimized listWorkflow and listWorkflowRun queries in the chaos manager (Chaos-860)
    * This release optimizes the listWorkflow and listWorkflowRun queries in the chaos manager by only fetching those experiments that the user requests, instead of loading all the experiments at once.

* Pagination on the faults and experiments screen (Chaos-689)
    * This release adds pagination on the faults and experiment screen in ChaosHub that allows you to scroll and navigate through the experiments by pages. 

* Enable save and run buttons on the experiment builder (Chaos-913)
    * This release enables the save and run buttons after you tune the application by specifying the parameters on the user interface. As a consequence, the default weight is set to 10 since the user would not move to the next step of setting fault weights.
 
* Experiment can be viewed during execution (Chaos-835)
    * This release allows you to view the experiment even when it is being executed. Previously, an experiment could be viewed only after the run was complete.  

* Edit chaos experiment is separated into two action components (Chaos-685)
    * This release divides the edit experiment action into two actions: edit experiment and clone experiment. The edit experiment action helps you make changes to the current (or selected) experiment. The clone experiment action helps the user create a new experiment from an already existing experiment. The cloned experiment retains the same configuration as the original experiment with the ability to tune the configurations if required.

### Early access
* There are no early access features in this release. 

### Fixed issues
* Experiments executed and triggered by respective categories (a pipeline, a scheduled CRON job, or a user) are correctly shown. (Chaos-800)
* When a chaos experiment contains characters such as ‘ ‘, ‘/’, and so on, logs are correctly parsed and displayed on the screen. The execution is encoded before being sent to the control plane and decoded after being received by the user interface. (Chaos-854)
* After deleting a chaos experiment from a particular page, the pagination is reset and only shows the available experiments. (Chaos-923)
* When a chaos infrastructure is deleted, details on the user interface wrongly showed the infrastructure ID instead of the infrastructure name. This is now fixed. (Chaos-952)
* When a chaos experiment was pushed to the chaos hub, only a single fault associated with the experiment was being pushed, rather than all the faults. This is now fixed. (Chaos-973)
* When a chaos experiment was deleted, only the most recent run was deleted, and the previous runs were retained in the cluster. Now it has been fixed such that when a chaos experiment is deleted, all the runs associated with it are deleted from the cluster. 
* When a chaos experiment was deleted, the fault running within the experiment was not stopped). Now it has been fixed such that, when an experiment is deleted, the chaos fault running on the Kubernetes cluster is halted, the fault is deleted, and the experiment (as a whole) is deleted. (Chaos-782)

* While 
When a chaos experiment was running, the user interface incorrectly showed probes that were still being executed as failed probes. Now it has been fixed so that the interface shows the correct status of the probes being executed. (Chaos-911)
* The term “agent” was changed to “infrastructure”. While selecting (or creating) an infrastructure, the search bar showed all available infrastructures irrespective of the search string entered by the user in the search bar. (Chaos-920) 
* When a CRON experiment was stopped by the user, the current run used to stop, but the upcoming (and subsequent) runs were not being affected by the stop. It has been fixed now so that stopping an experiment will stop the upcoming schedules as well. (Chaos-713)


## December 2, 2022, version 0.4.2

### What’s new

1. Update feature for ChaosHub enabling users to update details like Git Connector, Repository Name, Branch name & Name for an already connected ChaosHub.
2. Adds CDN Support for Chaos module static artifacts, making UI load faster on client's devices.
3. Added version info in ChaosDriver & ChaosManager. Now, the versions will be available over provided endpoints `/chaos/driver/api/version` & `/chaos/manager/api/version` for ChaosDriver & ChaosManager respectively.
4. Adds a range filter dropdown in the Experiment Runs bar graph under Experiment overview allowing users to set the range on the last runs to be shown in the graph.
5. Adds support for all faults statuses in the Experiment Runs graph. Previously only `Failed` & `Passed` faults were getting shown, now faults in `Awaited`, `Stopped` & `N/A` states will also be available under the Experiment Runs graph.
6. Adds manifest download button in UI for Chaos Infrastructures enabling users to have seamless upgrade.
7. Adds consistent loaders for all components & screens in UI.

### Early access features

No early access features are available in this release.

### Fixed Issues

1. Fixes Enterprise ChaosHub shown irrespective of searched terms by the users.
2. Fixes httpProbe schema in UI to add support for new response timeout changes for HTTP probe. Now, probeTimeout for HTTP probes will be treated as response timeout & should be provided in seconds.
3. Fixes the issue when the details of previously connected chaos infrastructure were getting pre-filled while connecting new chaos infrastructure.
4. Fixes the Run button returning an error even when the Experiment run is already completed.
5. Fixes calendar on the Experiments & Experiment Runs page having a default selection of one week. Now, all experiments & runs will be shown by default.
6. Fixes panic error for k8sObjects and k8sLogs go-routines resulting in closed channel error.
7. Fixes cancel(X) button & back button missing in Enable Chaos Infrastructure screen
8. Fixes repeated error logs for ChaosHub in Chaos-Manager when it was not available to find some of the icons.
9. Fixes the Expected Resilience Score changing to NaN when trying to override the same completely.
10. Fixes resource-type not coming for aborting a Chaos Experiment in audit-trail.
11. Fixes Minor UI/UX Issues making the UI more user-friendly & more accessible.

## November 14, 2022

### Early access features

The Harness Chaos Engineering (HCE) module, which you can use to perform chaos experiments on your applications and infrastructure, is now available for testing. To be part of this testing, contact [Harness Support](mailto:support@harness.io). HCE documentation, which includes user guides and [tutorials](https://developer.harness.io/tutorials/run-chaos-experiments), is available on the Harness Developer Hub. Harness recommends that you gain familiarity with the chaos experimentation workflow in HCE by following the instructions in [Your First Chaos Experiment Run](https://developer.harness.io/tutorials/run-chaos-experiments/first-chaos-engineering).

### Known issues

#### ChaosHub

1. Github is the only Git provider for chaoshubs.
2. Details for an already connected chaoshub can’t be updated.

#### Chaos Infrastructure

1. Chaos infrastructure can't be installed through Harness Delegate.
2. Logs for chaos infrastructure can’t be viewed.
3. The properties of chaos infrastructure can’t be updated. You will need to provide blacklisted namespaces.
4. The properties of the environment to which the chaos infrastructure belongs can’t be updated.
5. Configuring chaos infrastructure doesn’t provide support for Linux and Windows.

#### Chaos Experiments

1. Experiments with parallel faults can’t be created.
2. Probe tunables can’t be updated or edited.
3. A cron or recurring chaos experiment can’t be suspended or resumed.
4. An individual fault in an experiment can’t be stopped through your input.
5. A chaos experiment can’t be pushed to Gitlab, Bitbucket, or Gerrit.
6. A chaos experiment can’t be pushed from Azure to Got
7. SCM experiment push logs can’t be audited.

#### CI Pipeline integration

1. Optional assertion for chaos step failure can’t be provided during pipeline integration.
2. The chaos error type(s) can’t be selected in a failure strategy.
3. Timeouts can’t be defined for experiment execution.
4. Access control can’t be gained for the chaos step addition.
5. Pipeline template support can’t be obtained with the chaos steps.
6. The experiment execution can’t be viewed from step output during the experiment run.
7. Propagation can’t be aborted from chaos step to experiment execution.
8. Information about propagation can’t be gained from pipeline to experiment (for audit purposes).
