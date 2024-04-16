---
title: Introduction to GameDay
sidebar_position: 1
description: Execute chaos experiments during a specific time period
redirect_from:
	- /docs/chaos-engineering/configure-chaos-experiments/gameday/introduction-to-gameday
---
This section describes what a GameDay is, how a typical GameDay is run, and its outcomes.

GameDay is a methodology to execute chaos experiments in your application during a specific time period. It acts as a template to schedule and execute one or more chaos experiments within your application. In general, GameDays help apply a fatal scenario to your application in a safe environment, thereby determining the resilience of the application and verifying the system at scale. 

At every step in implementing a GameDay, you will either find a glitch in the system that you can address or gain confidence in your application.

### Steps in a GameDay

A GameDay typically involves the following steps:

1. Run chaos experiments on your application,
2. Observe the impact of the failure,
3. Discuss the technical outcomes.

:::tip
GameDays help decide the type of failure the system would undergo based on the nature of the chaos experiments present within the GameDay. Hence, it is strongly recommended to begin with easy use cases where the blast radius is minimal, such as breaking one container, degrading one instance, and making one availability zone unavailable. Later on, you can delve into more complex failures, such as failing an entire service or affecting a large percentage of requests.
:::

### Steps to execute a GameDay
Running a GameDay by using CE’s GameDay feature involves the following steps:

1. Plan your GameDay
2. Create a GameDay and specify the details
3. Add experiments to the GameDay and save it
4. Schedule or run the GameDay
5. Record the conclusion and action items

:::info note
Once you create a GameDay in CE, you can run it as many times as you wish. CE saves information about every run, which includes the date, summary, and any notes you add.
:::

## Prerequisites
You can create a GameDay provided you have the following prerequisites.
1. CE account
2. Access to a cluster


## Next steps
* [Create and execute a Gameday](/docs/chaos-engineering/features/gameday/run-gameday.md)

