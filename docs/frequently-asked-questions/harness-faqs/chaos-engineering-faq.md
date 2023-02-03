---
title: Chaos Engineering (CHAOS) FAQs
description: This article addresses some frequently asked questions about Harness Chaos Engineering (CHAOS).
# sidebar_position: 2
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

## General

For an overview of Harness support for platforms, methodologies, and related technologies, see [Supported platforms and technologies](https://developer.harness.io/docs/getting-started/supported-platforms-and-technologies).

#### How to add and manage a custom ChaosHub?

You can navigate to ChaosHubs in the Chaos module and click on `+ New ChaosHub` and fill in the details regarding your public or private hub. Make sure you have ChaosHub Read/Write permission enabled and also a GitHub connector configured for the repository you are about to connect.

#### How do I connect a private chaoshub?

To connect a private chaoshub repository you would need to first connect a Harness GitHub Connector by providing it your GitHub SSH key or Personal Access Token and mode of connecting either through a Harness Delegate or Git directly. Once done, you can choose that connector when selecting your connector while adding a ChaosHub.

#### How are Faults different from Experiments?

Faults refer to the failures that are injected into the target resource as part of an experiment. Whereas a chaos experiment is a set of different faults coupled together to achieve a desired chaos impact.

#### Possible reasons you can’t see tunables in Tune Fault UI

Since the tuning of a chaos experiment is highly declarative, sometimes it may cause parsing issues, these may be the possible reasons:

- The step name of the fault and the template name might have been changed due to custom editing.
- The step name has been removed completely.
- The template definition has been erased.

#### How are probes useful in an experiment?

A probe can help understand the underlying patterns and laws that govern the behavior of your systems, and you can use that understanding to predict or control their behavior. Probes can be used to test scenarios such as network partitioning, pod failures, and node failures, by adding additional checks, it can also be used to test the behavior of applications during such scenarios.

#### How is resilience score affected if a few of my probes fail?

The weighted average of probe success percentage of each of the probe determines the value of the overall resilience score of the experiment. The value depends on the successful outcome of the probe criteria based on the type and mode selected. There are two possible values of probe success percentage for each of the probe criterias, either 0(if the criteria assertion fails) or 100(if the criteria assertion passes).

```vim
Total Resilience for one single experiment = (Weight Given to that experiment * Probe Success Percentage)
```

![Resilience Score](./static/chaos-engineering-faq-resilience-score.png)

#### I’m having trouble creating an experiment yaml from scratch, can I generate one?

Yes, you can generate a YAML by choosing the normal flow of creating an experiment (blank canvas or via template), in the YAML/Visual toggle you can see a generated YAML based on the inputs provided by you. A generated YAML can also be downloaded after navigating to `Chaos Experiments` and clicking on `Download Experiments`.

Additionally you can also leverage Harness Go SDK repository and generate a template
[https://github.com/harness/harness-go-sdk](https://github.com/harness/harness-go-sdk)

#### My issue is not mentioned here, how can I report it?

In order to report an issue which is not mentioned here head over to `Help` in Harness SaaS and click on `Submit a ticket` and provide your feedback.
