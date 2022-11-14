---
title: Chaos Hub Overview
sidebar_position: 1
---

Chaos Hub is a collection experiment templates and faults using which new chaos experiments are created.

- In essence, Chaos Hub is nothing but a collection of manifests and charts, which represent the experiments and faults that exist as part of the hub.
- Therefore, Chaos Hub is ideally added using a Git service provider such as GitHub, where the Chaos Hub exists as a repository. This allows for native version control and management of the fault and experiment artifacts.
- While you have an Enterprise Chaos Hub which comes out of the box, you can also add custom Chaos Hubs to maintain and distribute private faults and experiments within your organization.

Experiments are nothing but a template for the creation of new chaos experiments, which have a collection of Chaos Faults and optionally some custom actions that are ordered in a specific sequence. Faults, on the other hand, refer to the failures that are injected as part of an experiment.

Both faults and experiments are stored as manifests within an appropriate directory structure. Therefore, new experiment templates and faults can be directly committed to the repository as files. Additionally, the experiment templates can be derived from the existing experiments and saved to the Chaos Hub from the UI as well.
