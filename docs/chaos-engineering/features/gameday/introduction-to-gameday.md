---
title: Introduction to GameDay
sidebar_position: 1
description: Execute chaos experiments during a specific time period
redirect_from:
	- /docs/chaos-engineering/configure-chaos-experiments/gameday/introduction-to-gameday
---
This section describes what a GameDay is, why it is essential, how a typical GameDay is run, and its outcomes.

### What is a GameDay?

GameDay is a methodology used by teams to practice chaos engineering. These teams execute chaos experiments in the application during a specific period. It is a template to schedule and execute one or more chaos experiments across your applications.
It determines the incident response process, that is, how well your application responds/behaves during an outage, and how quickly and effectively it returns to normalcy.

### Why is a GameDay important?
In general, GameDays helps apply a fatal scenario to your application in a safe environment, thereby determining the application's resilience and verifying the system at scale.

At every step in implementing a GameDay, you will either find a glitch in the system that you can address or gain confidence in your application.

### Steps in a GameDay

A GameDay typically involves the following steps:

1. Run chaos experiments on your application,
2. Observe the impact of the failure,
3. Discuss the technical outcomes.

:::tip
GameDays help decide the type of failure the system would undergo based on the nature of the chaos experiments present within GameDay. Hence, HCE strongly recommends you begin with easy use cases with minimal blast radius, such as breaking one container, degrading one instance, and making one availability zone unavailable. Later, you can delve into more complex failures, such as failing an entire service or affecting a large percentage of requests.
:::

### How to execute a GameDay?
Running a GameDay using HCE's GameDay feature involves the following steps:

1. Plan your GameDay
2. Create a GameDay and specify the details
3. Add experiments to the GameDay and save it
4. Schedule or run the GameDay
5. Record the conclusion and action items

:::info note
Once you create a GameDay in HCE, you can run it multiple times. HCE saves information about every run, which includes the date, summary, and any notes you add.
:::

### Prerequisites to execute a GameDay

1. HCE account
2. Access to a cluster

### Plan your GameDay

Address the following questions before proceeding to run a GameDay:

1. Which services should I test?
2. What is the goal of the GameDay?
3. What should I verify or determine by the end of the GameDay?

Once these questions have a viable answer, you can proceed to create a GameDay.

Creating a GameDay involves two steps:

1. Specifying details about the GameDay,
2. Adding chaos experiments to the GameDay.

## Next steps
* [Run GameDay](/docs/chaos-engineering/features/gameday/gameday-v2)
