---
title: Clean Up Schedule for Armory Scale Agent Operations Older than a Specific Time Period
---

## Introduction
As the number of Armory Agent deployments increases, admins will want to consider setting up a purge or clean-up schedule for older operations.
This schedule will help avoid tables growing without controls. The historical record of executed operations is kept in the ```kubesvc_ops_history``` table. As the number of deployments increases and as Agents scale, Admins will notice that the table ```kubesvc_ops_history``` will continue to grow.  A purge schedule will help maintain the size of the table.
The Armory Agent plugin automatically handles this through the configuration below

## Prerequisites
Armory Enterprise Spinnaker with Armory Agent for Kubernetes enabled.

## Instructions
To delete the operations older than a particular period regularly without any manual intervention, admins can use the below configurations. Please note that the below configurations are optional by default, and will not be set unless admins do so.
#### Purge the operations older than a Specific # of Weeks
Admins can set a clean-up period in ```number of weeks``` by making the following change in the configuration. Any operation older than the specified weeks in the database table ```kubesvc_ops_history``` would be purged automatically
     kubesvc:
          jobs.operation-history.purge.weeks: 1
#### **Frequency of the purge process**
Admins can also set a clean-up period based in a ```spring cron expression. ``` A ```spring cron expression``` can be supplied to the configuration as shown in the example below
         kubesvc:
                 jobs.operation-history.purge.cron: 0 0 0 * * 0
For help defining ```cron expressions```, please visit: [https://en.wikipedia.org/wiki/Cron#CRON_expression](https://en.wikipedia.org/wiki/Cron#CRON_expression)
For the complete list of configurations on the Agent plugin, please refer [https://docs.armory.io/armory-enterprise/armory-agent/advanced-config/agent-plugin-options/](https://docs.armory.io/armory-enterprise/armory-agent/advanced-config/agent-plugin-options/)

