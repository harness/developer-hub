---
sidebar_position: 1
title: HCE Release Notes
---

Harness Chaos Engineering is updated regularly. Review the notes below for details about recent changes. 

:::note
Harness deploys updates progressively to different Harness cluster hosting accounts. The features and fixes in the release notes may not be available in your cluster immediately.
:::

# December 2, 2022, version 0.4.2

## What’s New

1. Update feature for ChaosHub enabling users to update details like Git Connector, Repository Name, Branch name & Name for an already connected ChaosHub.
2. Adds CDN Support for Chaos module static artifacts, making UI load faster on client's devices.
3. Added version info in ChaosDriver & ChaosManager. Now, the versions will be available over provided endpoints `/chaos/driver/api/version` & `/chaos/manager/api/version` for ChaosDriver & ChaosManager respectively.
4. Adds a range filter dropdown in the Experiment Runs bar graph under Experiment overview allowing users to set the range on the last runs to be shown in the graph.
5. Adds support for all faults statuses in the Experiment Runs graph. Previously only `Failed` & `Passed` faults were getting shown, now faults in `Awaited`, `Stopped` & `N/A` states will also be available under the Experiment Runs graph.
6. Adds manifest download button in UI for Chaos Infrastructures enabling users to have seamless upgrade.
7. Adds consistent loaders for all components & screens in UI.

## Early access features

No early access features are available in this release.

## Fixed Issues

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

# November 14, 2022

## Early access features

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