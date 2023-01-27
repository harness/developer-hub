---
sidebar_position: 1
title: Chaos engineering release notes
---

Harness Chaos Engineering is updated regularly. Review the notes below for details about recent changes. 

:::note
Harness deploys updates progressively to different Harness cluster hosting accounts. The features and fixes in the release notes may not be available in your cluster immediately.
:::


# December 23, 2022, version 0.6

## What’s new

* Error boundary to avoid page crash (Chaos-843)
    * This release adds an error boundary that avoids crashing the page when a component on the user interface is missing due to incompatibilities. Instead of the page crash, the component field is empty. 

* Optimized listWorkflow and listWorkflowRun queries in the chaos manager (Chaos-860)
    * This release optimizes the listWorkflow and listWorkflowRun queries in the chaos manager by only fetching those experiments that the user requests, instead of loading all the experiments at once.

* Add pagination on the faults and experiments screen (Chaos-689)
    * This release adds pagination on the faults and experiment screen in ChaosHub that allows users to scroll and navigate through the experiments by pages. 

* Enable save and run buttons on the experiment builder (Chaos-913)
    * This release enables the save and run button after the user tunes the application by specifying the parameters on the user interface. As a consequence, default weight is set to 10 since the user would not move to the next step of setting fault weights.
 
* Experiment can be viewed during execution (Chaos-835)
    * This release allows the user to view the experiment even when it is being executed. Previously, an experiment could be viewed only after the run was complete.  

* Edit chaos experiment is separated into two action components (Chaos-685)
    * This release divides the edit experiment action into two actions: Edit experiment and clone experiment. Edit experiment helps the user make changes to the current (or selected) experiment. Clone experiment helps the user create a new experiment from an already existing experiment. The cloned experiment retains the same configuration as the original experiment with the ability to tune the configurations if required.

## Early access

* There are no early access features in this release. 

## Fixed issues
* Experiments executed and triggered by respective categories (a pipeline, a scheduled CRON job or a user) are correctly shown. (Chaos-800)
* When a chaos experiment contains characters such as ‘ ‘, ‘/’, and so on, logs are correctly parsed and displayed on the screen. The execution is encoded before being sent to the control plane and decoded after being received by the user interface. (Chaos-854)
* After deleting a chaos experiment from a particular page, the pagination is reset and only shows the available experiments. (Chaos-923)
* When a chaos infrastructure is deleted, details on the user interface show the infrastructure ID. Currently, it shows the name of the name of the infrastructure. (Chaos-952)
* When a chaos experiment was pushed to the chaos hub, only a single fault associated with the experiment was being pushed, rather than all the faults. Now, it has been fixed such that when a user wants to push the experiment to chaos hub, all the faults associated with an experiment are pushed to chaos hub. (Chaos-973)
* When a chaos experiment was deleted, only the most recent run was being deleted, and the previous runs were retained in the cluster. Now it has been fixed such that when a chaos experiment is deleted, all the runs associated with it are deleted from the cluster. 
* When a chaos experiment was deleted, the fault running within the experiment was not being halted (or stopped). Now it has been fixed such that, when an experiment is deleted, the chaos fault running on the Kubernetes cluster is halted, the fault is deleted, and the experiment (as a whole) is deleted. (Chaos-782)
* While executing a chaos experiment, the user interface incorrectly showed probes that were still being executed as failed probes. Now it has been fixed so that the interface correctly shows the status of the probes being executed. (Chaos-911)
* The term “agent” was changed to “infrastructure”. While selecting (or creating) an infrastructure, the search bar showed all available infrastructures irrespective of the search string entered by the user in the search bar. (Chaos-920) 
* When a CRON experiment was halted by the user, the current run used to stop, but the upcoming (and subsequent) runs were not being affected by the halt. It has been fixed now so that halting an experiment will halt the upcoming schedules as well. (Chaos-713) 


# December 2, 2022, version 0.4.2

## What’s new

* Provision to update chaos hub details (Chaos-699)
	* You can update the details (such as name, Git connector, repository name, and branch name) of a connected chaos hub.  

* CDN support for static artifacts (Chaos-600)
	* This release adds CDN support for static artifacts. CDN support reduces the latency while loading the user interface on client devices.

* Version information for Chaos Driver and Chaos Manager (Chaos-729)
	* This release adds version numbers to Chaos Driver and Chaos Manager. Versioning the Chaos Driver and Chaos Manager enables Harness to version the corresponding endpoints (/chaos/driver/api/version for ChaosDriver and /chaos/manager/api/version for ChaosManager).

* Range filter for Experiment Runs in the Experiment overview (Chaos-824)
	* This release adds a range filter option in the Experiment Runs bar graph under Experiment overview that allows setting the range on the last run in the graph.

* Support for fault statuses (Chaos-826)
	* This release adds support to show all the fault statuses in the Experiment Runs graph. In addition to `the Failed` and `Passed` fault status, faults in the `Awaited`, `Stopped`, and `N/A` states are also seen. 

* Seamless upgrade 
	* This release adds a manifest download button for the chaos infrastructures, to enable a seamless upgrade.

* Loaders for components and screens (Chaos-822)
	* This release adds consistent loaders for all the components and screens in the user interface. These loaders decouple API requests and avoid blocking the rendering of the entire page due to chained API calls.

* Configurable response timeout for HTTP probes
	* This release adds a new response timeout parameter for HTTP probes in the user interface. The response timeout is in units of seconds. You can use this parameter to specify timeouts during HTTP probe health checks during chaos fault execution.

## Early access

* There are no early access features in this release. 

## Fixed issues

* Enterprise ChaosHub appeared in the search results irrespective of the terms searched.

* Details of a previously connected chaos infrastructure are not prefilled when connecting to a new chaos infrastructure. (Chaos-777)

* The Run button was activated even when the chaos experiment was running. Now, the button is reactivated only after the chaos experiment is complete. (Chaos-807)

* The chaos access page shows all experiments and experiment runs instead of showing experiments that were performed within a specific time frame. (Chaos-810, Chaos-762) 

* A cancel button and a back button have been added to the enable chaos screen. The buttons make it easy to navigate between screens while setting up chaos infrastructure.

* When you search for a specific chaos fault and the chaos manager cannot map this chaos fault to a chaos fault icon, the user interface does not display any error. Instead, it silently skips the error logs. (Chaos-814)

* The expected resilience score does not change to `NaN` (not a number) when you override it. (Chaos-791)

* The resource-type field was previously not available. Now, it has been made available and you can use this field to abort a chaos experiment in the audit trail. (Chaos-714)


# November 14, 2022

## Early access features

The Harness Chaos Engineering (HCE) module, which you can use to perform chaos experiments on your applications and infrastructure, is now available for testing. To be part of this testing, contact [Harness Support](mailto:support@harness.io). HCE documentation, which includes user guides and [tutorials](https://developer.harness.io/tutorials/run-chaos-experiments), is available on the Harness Developer Hub. Harness recommends that you gain familiarity with the chaos experimentation workflow in HCE by following the instructions in [Your First Chaos Experiment Run](https://developer.harness.io/tutorials/run-chaos-experiments/first-chaos-engineering).

### Known issues

#### ChaosHub

* Github is the only Git provider for chaoshubs.
* Details for an already connected chaoshub cannot be updated.

#### Chaos infrastructure

* Chaos infrastructure cannot be installed through Harness Delegate.
* Logs for chaos infrastructure cannot be viewed.
* The properties of chaos infrastructure cannot be updated. You will need to provide blacklisted namespaces.
* The properties of the environment to which the chaos infrastructure belongs cannot be updated.
* Configuring chaos infrastructure does not provide support for Linux and Windows.
 
#### Chaos experiments

* Experiments with parallel faults cannot be created.
* Probe tunables cannot be updated or edited.
* A cron or recurring chaos experiment cannot be suspended or resumed.
* An individual fault in an experiment cannot be stopped through your input.
* A chaos experiment cannot be pushed to Gitlab, Bitbucket, or Gerrit.
* A chaos experiment cannot be pushed from Azure to Got
* SCM experiment push logs cannot be audited.

#### CI pipeline integration

* Optional assertion for chaos step failure cannot be provided during pipeline integration.
* The chaos error type(s) cannot be selected in a failure strategy.
* Timeouts cannot be defined for experiment execution.
* Access control cannot be gained for the chaos step addition.
* Pipeline template support cannot be obtained with the chaos steps.
* The experiment execution cannot be viewed from step output during the experiment run.
* Propagation cannot be aborted from chaos step to experiment execution.
* Information about propagation cannot be gained from pipeline to experiment (for audit purposes).