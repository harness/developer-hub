---
title: Environments in Harness IDP
description: Learn more about Environments in Harness IDP. 
sidebar_label: Environments
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 3
---

An **Environment** is instantiated using an **Environment Blueprint**, consider it as a running instance of environment blueprint. It represents the deployed infrastructure and services, as defined in the blueprint. It is a collection of software services deployed using CD tools and executed on infrastructure provisioned through IaCM tools.

---

## Create Environments
Using the [Environment Blueprint](/docs/internal-developer-portal/environment-management/env-blueprint-yaml.md) we can now create and spin up an ephemeral environment. 

1. In Harness IDP (Environments), hit “Create” in the right corner, then “Environment, then select your new “Environment Blueprint”.
![](./static/env-use.png)
2. Give your environment a Name, select owners, input lifecycle (add a new one if the dropdown list is empty), and choose your project as a scope and then Click “Configure Environment”.
![](./static/config-env.png)
3. On the new screen, you can choose and configure your inputs to the environment, and when you are satisfied, hit “Create Environment”. 
![](./static/config-inputs.png)

The Environment should now be creating, and you can follow the progress by viewing the instances and their states, or you can dive deeper into the pipeline, by following the link next to the environment state.

---

## Delete Environments
When are are ready to delete the environment, go to the Environment page and from the Options menu at the top right, hit “Delete”. It will destroy the namespace and delete the environment.

---
