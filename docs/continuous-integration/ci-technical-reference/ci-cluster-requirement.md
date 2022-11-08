---
title: CI Cluster Requirements
description: The resources required for the Kubernetes cluster depend on the number of builds running in parallel, as well as the resources required for each build. Below is a rough estimation of the resources re…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: gv6zctvy4c
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

The resources required for the Kubernetes cluster depend on the number of builds running in parallel, as well as the resources required for each build.

Below is a rough estimation of the resources required, based on the number of daily builds:



|  |  |  |
| --- | --- | --- |
| **PRs/Day** | **Nodes with 4 CPU, 8GB RAM,100GB disk** | **Nodes with 8 CPU, 16GB RAM, 200GB disk** |
| 100 | 19 - 26 | 11 - 15 |
| 500 | 87 - 121 | 45 - 62 |
| 1000 | 172 - 239 | 89 - 123 |

