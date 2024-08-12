---
title: Overview
sidebar_position: 1
description: Understand ChaosHub, its variants, and usage
redirect_from:
	- /docs/chaos-engineering/configure-chaos-experiments/chaos-hubs/introduction
---

This section introduces you to ChaosHub, Enterprise ChaosHub and its use cases.

## What is a ChaosHub ?
A ChaosHub is a collection of experiment templates and faults that you can use to create and launch chaos experiments.
Both experiments and faults are stored as manifests in an appropriate directory structure. This way, you can add new experiment templates and faults directly to the repository as files. In addition, you can derive the experiment templates from the existing experiments and save them to the ChaosHub from the UI.

You can add ChaosHub using a Git service provider such as GitHub, where ChaosHub exists as a repository. This allows native version control and management of the faults and experiment artefacts.

HCE provides a default **Enterprise ChaosHub** that includes a wide array of experiments and faults out of the box. You can also [add your own custom ChaosHubs](/docs/chaos-engineering/features/chaos-hubs/add-chaos-hub.md) to maintain and share private scenarios and faults within your organization.

### Enteprise ChaosHub
It is a ChaosHub with additional security and teaming features for better collaboration around chaos scenarios. It is a private GitHub repository that you can access using a special key.

#### Use cases of Enteprise ChaosHub
* You can get secure storage of your git keys. except admins, no one else can access your git keys.

* You can export a given chaos scenario to an Enterprise ChaosHub. Once you export a chaos scenario, it is hosted in the hub and is ready to be used as a base for cloning.

* You get access to many chaos scenarios in the Enterprise hub where you can browse through a scenarios and directly execute it.

:::info note
Resilience probes are currently not supported with Chaos Hubs.
:::

## Next steps

* [Add a ChaosHub](/docs/chaos-engineering/features/chaos-hubs/add-chaos-hub.md)
* [Manage a ChaosHub](/docs/chaos-engineering/features/chaos-hubs/manage-hub.md)