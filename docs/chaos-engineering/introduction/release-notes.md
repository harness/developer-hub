---
sidebar_position: 1
title: Chaos engineering release notes
---

Harness Chaos Engineering is updated regularly. Review the notes below for details about recent changes. 

:::note
Harness deploys updates progressively to different Harness cluster hosting accounts. The features and fixes in the release notes may not be available in your cluster immediately.
:::

# December 2, 2022, version 0.4.2

## What’s new

* Provision to update chaos hub details (Chaos-699)
	* You can update the details (such as name, Git connector, repository name, and branch name) of a connected chaos hub. 

* CDN support for static artifacts (Chaos-600)
	* This release adds CDN support for static artifacts which loads the user interface with reduced latency on client devices.

* Version information for Chaos Driver and Chaos Manager (Chaos-729)
	* This release adds version numbers to Chaos Driver and Chaos Manager which enables Harness to version the corresponding endpoints (/chaos/driver/api/version for ChaosDriver and /chaos/manager/api/version for ChaosManager).

* Range filter for Experiment Runs in the Experiment overview (Chaos-824)
	* It adds a range filter dropdown in the Experiment Runs bar graph under Experiment overview that allows setting the range on the last run in the graph.

* Support for fault statuses (Chaos-826)
	* It adds support to show all the fault status in the Experiment Runs graph. In addition to `Failed` and `Passed` fault status, faults in `Awaited`, `Stopped` and `N/A` states are also seen. 

* Seamless upgrade 
	* It adds a manifest download button on the user interface for chaos infrastructures that provides a seamless upgrade.

* Loaders for components and screens (Chaos-822)
	* This release adds consistent loaders for all the components and screens in the user interface.

## Early access

* There are no early access features in this release. 

## Fixed Issues

* Enterprise ChaosHub appears only when it is searched.
	* Enterprise ChaosHub appeared in the search result irrespective of the terms searched.

* Response timeout added to HTTP probe
	* A new response timeout change has been introduced in the HTTP probe in the user interface. The probeTimeout for HTTP probes is now treated as a response timeout and is in units of seconds.

* Previously connected chaos infrastructure is not considered while connecting to a new infrastructure (Chaos-777)
	* Details of previously connected chaos infrastructure are not prefilled when connecting to a new chaos infrastructure. 

* Run button is activated after an experiment is complete (Chaos-807)
	* The Run button is activated again only after the chaos experiment is complete.

* Chaos access page shows all experiments and experiment runs (Chaos-810, Chaos-762)
	* The chaos access page shows all experiments and experiment runs instead of showing experiments that were performed within a specific time frame.

* Cancel and back buttons have been added to Enable chaos screen
	* A cancel button and a back button have been added to the Enable chaos screen which makes it easy to navigate between screens while setting up chaos infrastructure.

* Failing to map a chaos fault to a chaos fault icon doesn’t throw an error on the user interface (Chaos-814)
	* When you search for a specific chaos fault and the chaos manager cannot map this chaos fault to a chaos fault icon in the backend, it doesn’t throw an error on the user interface. Instead, it silently skips the error logs. 

* Expected Resilience Score doesn’t change when it is overridden (Chaos-791)
	* The Expected Resilience Score does not change to `NaN` when overridden.

* Resource-type field has been made available (Chaos-714)
	* The resource-type field was previously not available. Now, it has been made available and you can utilize it to abort a chaos experiment in the audit trail.

* UI/UX issues were fixed
	* Minor UI/UX issues were fixed which has made the user interface user-friendly.


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
* Configuring chaos infrastructure doesnot provide support for Linux and Windows.
 
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