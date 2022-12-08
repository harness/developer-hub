---
sidebar_position: 1
title: Chaos Engineering Release Notes
---

Harness Chaos Engineering is updated regularly. Review the notes below for details about recent changes. 

:::note
Harness deploys updates progressively to different Harness cluster hosting accounts. The features and fixes in the release notes may not be available in your cluster immediately.
:::

# December 2, 2022, version 0.4.2

## What’s new

* Update feature for ChaosHub enables users to update details such as `Git Connector`, `Repository Name`, `Branch Name` and `Name` for an already connected ChaosHub.
* Adds CDN Support for Chaos module static artifacts thereby loading the UI with reduced latency on client devices.
* Adds version information in the ChaosDriver and ChaosManager. Hence, the versions are available over endpoints `/chaos/driver/api/version` and `/chaos/manager/api/version` for ChaosDriver and ChaosManager, respectively.
* Adds a range filter dropdown in the `Experiment Runs` bar graph under `Experiment overview` allowing you to set the range on the last runs shown in the graph.
* Adds support for all fault statuses in the `Experiment Runs` graph. Apart from `Failed` and `Passed` states being shown, faults in `Awaited`, `Stopped` and `N/A` states are also available under the `Experiment Runs` graph.
* Adds manifest download button in the UI for Chaos Infrastructures that enables you to have a seamless upgrade.
* Adds consistent loaders for all components and screens in the UI.

## Early access features

No early access features are available in this release.

## Fixed issues

* Enterprise ChaosHub is visible irrespective of terms users search.
* New response timeout changes to HTTP probe in the UI. The probeTimeout for HTTP probes is treated as a response timeout and is in seconds.
* Details of previously connected chaos infrastructure does not pre-fill while connecting to a new chaos infrastructure.
* Only after a chaos experiment is complete, the `Run` button is activated again.
* All `Experiments` and `Experiment Runs` are shown by default, rather than showing experiments within a specific timeframe.
* Panic error for k8sObjects and k8sLogs goroutines does not throw a closed channel error.
* The `Enable Chaos Infrastructure` screen has a cancel(X) button and a back button.
* When chaos manager can not find certain chaos fault icons, error logs for ChaosHub are not repeated.
* The `Expected Resilience Score` does not change to `NaN` when overriding it.
* To abort a chaos experiment in audit trail, resource-type field is available. 
* Minor UI/UX issues are fixed making the UI user-friendly.

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