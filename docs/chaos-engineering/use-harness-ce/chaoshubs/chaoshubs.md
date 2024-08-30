---
id: chaoshub
sidebar_position: 10
title: ChaosHub
redirect_from:
- /docs/chaos-engineering/features/chaos-hubs/introduction
- /docs/chaos-engineering/configure-chaos-experiments/chaos-hubs/introduction
---

## ChaosHub

A collection of experiment templates (defined as workflow CRs) and faults (defined as ChaosExperiment CR and ChaosEngine CR) that help create and execute new chaos experiments against your target resources. Apart from the Enterprise ChaosHub, which is present by default, you can add custom ChaosHub to manage and distribute custom experiment templates and faults.

A ChaosHub is a collection of experiment templates and faults that you can use to create and launch chaos experiments. Both experiments and faults are stored as manifests in an appropriate directory structure. This way, you can add new experiment templates and faults directly to the repository as files. In addition, you can derive the experiment templates from the existing experiments and save them to the ChaosHub from the UI.

You can add ChaosHub using a Git service provider such as GitHub, where ChaosHub exists as a repository. This allows native version control and management of the faults and experiment artefact.

HCE provides a default Enterprise ChaosHub that includes a wide array of experiments and faults out of the box. You can also add your own custom ChaosHubs to maintain and share private scenarios and faults within your organization.

### Enterprise ChaosHub
It is a ChaosHub with additional security and teaming features for better collaboration around chaos scenarios. It is a private GitHub repository that you can access using a special key.

Also known as Enterprise hub, it comes out-of-the-box with HCE and consists of pre-built manifests (YAML files) and chaos experiment templates. It is a prebuilt ChaosHub that represents the existing experiments and chaos faults. You can use faults from multiple categories to create chaos experiments in the Enterprise ChaosHub.

#### Use cases of ChaosHubs

- You can get secure storage of your git keys. except admins, no one else can access your git keys.
- You can export a given chaos scenario to an Enterprise ChaosHub. Once you export a chaos scenario, it is hosted in the hub and is ready to be used as a base for cloning.
- You get access to many chaos scenarios in the Enterprise hub where you can browse through a scenarios and directly execute it.

#### Reason for adding custom ChaosHub

* Add custom experiments suited to specific needs in your organization.
* Share your experiments with others in your Harness project or in other Harness projects—you can add the same custom hub(s) to many projects.
* Maintain and upgrade experiments in one place so those you share your hubs with always have the latest version.
* Provide secure access to your custom experiments.

:::info note
Resilience probes are currently not supported with Chaos Hubs.
:::

Go to [connect to ChaosHub](/docs/chaos-engineering/use-harness-ce/chaoshubs/add-chaos-hub) or [manage ChaosHub](/docs/chaos-engineering/use-harness-ce/chaoshubs/manage-hub) for hands-on learning.