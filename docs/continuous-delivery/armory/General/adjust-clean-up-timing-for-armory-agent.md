---
title: Adjust Clean Up Timing for Armory Agent
---

## Introduction
After a set amount of time, if CloudDriver is unable to reach an Agent, it is deemed to be marked for cleanup.  The cleanup timing may need to be adjusted Settings on CloudDriver can be adjusted to clean up missing / unreachable agents. 

## Prerequisites
Armory Agent should be [installed and configured](https://docs.armory.io/docs/armory-agent/)

## Instructions
To make adjustments on the cleanup timing, the adjustment should be made to the ```kubesvc.cache.accountCleanupFrequencySeconds``` value in the Plugin adjustments. By default, the clean up frequency is set to 600 seconds (10 minutes)For further information on adjusting the value on the plugin, please refer to: [https://docs.armory.io/docs/armory-agent/agent-plugin-options/](https://docs.armory.io/docs/armory-agent/agent-plugin-options/)

