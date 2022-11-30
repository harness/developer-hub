---
sidebar_position: 1
title: HCE Release Notes
---

# November 14, 2022, Beta release

**Note:** Harness deploys updates progressively to different Harness cluster hosting accounts. The features and fixes in the release notes may not be available in your cluster immediately.

## Early access features

The Harness Chaos Engineering (HCE) module, which you can use to perform chaos experiments on your applications and infrastructure, is now available for testing. To be part of testing, contact [Harness Support](mailto:support@harness.io). HCE documentation, which includes user guides and [tutorials](https://developer.harness.io/tutorials/run-chaos-experiments), is available on the Harness Developer Hub. Harness recommends that you gain familiarity with the chaos experimentation workflow in HCE by following the instructions in [Your First Chaos Experiment Run](https://developer.harness.io/tutorials/run-chaos-experiments/first-chaos-engineering).

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