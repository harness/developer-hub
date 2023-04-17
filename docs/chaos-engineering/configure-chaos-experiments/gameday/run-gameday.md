---
title: Run a GameDay
sidebar_position: 1
---
This section describes what a GameDay is, how a typical GameDay is run, and the outcomes of it. 

## Introduction

GameDay is a methodology to execute chaos experiments in your application during a specific time period. It is a template that helps you schedule and execute one or more chaos experiments within your application. GameDays help apply a fatal scenario to your application in a safe environment, thereby determining the resilience of the application. 

Running a GameDay verifies the system at scale, and in production. 
It typically involves three steps:

1. Run chaos experiments on your application
2. Observe the impact of the failure
3. Discuss the technical outcomes

:::tip
GameDays help decide the type of failure the system would undergo. Hence, it is strongly recommended to begin with easy use cases where the blast radius is minimal, such as breaking one container, degrading one instance, making one availability zone unavailable, and so on. Later on, you can delve into more complex failures, such as failing an entire service or affecting a large percentage of requests, and so on.

At every step in implementing a GameDay, you will either find a glitch in the system that is addressed or gain confidence in your application.
:::

Let us jump into understanding how to run a GameDay using HCE’s GameDay feature.

This involves the following steps:
1. Plan your GameDay
2. Create a GameDay
3. Specify the details
4. Add experiments to the GameDay
5. Save the GameDay
6. Schedule or run the GameDay
7. Record the conclusion and action items

:::info
Once you create a GameDay in HCE, you can run it as many times as you wish. HCE saves the information about every run, which includes the date, summary, any notes you add, and so on.
:::

## Prerequisites
You can create a GameDay provided you have the following prerequisites.
1. HCE account
2. Access to a cluster

## Creating a GameDay
You can create and run a GameDay with the following steps.

### Step 1: Plan your GameDay

This is one of the critical questions that needs to be addressed before proceeding to run a Gameday. The GameDay should address questions such as:
1. Which services will you test?
2. What is the goal of the GameDay? 
3. What will you verify or determine by the end of the GameDay?

Once these questions have a viable answer, you can proceed to create a GameDay. 

### Step 2: Create a GameDay
To create a GameDay, click **+New GameDay**. 
![](./static/run-gameday/1-landing-page.png)

### Step 3: Specify the details of the GameDay
Add details such as **GameDay name**, **Objectives**, and **Description** (optional). Click **Next-> Select Chaos Experiments**.
![](./static/run-gameday/2-create-new-gameday.png)

### Step 4: Add experiments to the GameDay
1. After creating a GameDay, add experiments to the GameDay by clicking **New Chaos Experiment**.
![](./static/run-gameday/3-add-experiments-to-gameday.png)

2. You can add experiments by selecting the ones available in the chaos hub.  
![](./static/run-gameday/4-list-experiments-from-chaoshub.png)

3. Select a chaos infrastructure. Click **Add experiments to the GameDay**.
![](./static/run-gameday/6-add-experiments-to-gameday.png)

:::info
You can add up to 20 experiments to every GameDay, and every chaos experiment can be executed on a different chaos infrastructure!
:::

4. This will lead you to a page that lists the experiments you selected for the current GameDay. You can add or delete experiments from this page.
![](./static/run-gameday/7-add-multiple-experiments.png)

5. To view the pipeline of an experiment, you can select one by clicking it. This displays a preview of the experiment.
![](./static/run-gameday/8-view-exp.png)

### Step 5: Save the GameDay
After adding the experiments to the GameDay, click **Save**.
![](./static/run-gameday/9-save-experiment.png)

### Step 6: Schedule or run the GameDay
1. Now that you have the experiments in the GameDay, you are all set to run them. 
![](./static/run-gameday/10-gameday-created.png)

2. Click **Start GameDay**. This creates experiments within your GameDay.
![](./static/run-gameday/11-start-gameday.png)

3. Clicking GameDay leads you to the page that contains the experiments associated with the GameDay.
![](./static/run-gameday/12-gameday-in-progress.png)

4. On this page, you can **Run** the experiment. 
![](./static/run-gameday/13-gameday-details.png)

5. Click **Run Experiment**. This begins the execution of the experiment. 
![](./static/run-gameday/14-run-experiment.png)


### Step 7: Record the conclusion and action items
1. You can add a summary of the experiments in the GameDay by clicking **Add/View Notes**.  
![](./static/run-gameday/15-summary-at-exp-level.png)

2. You can mark an experiment run as complete by clicking **Mark Run as Complete**. This way, you will not be able to run the experiment again. This completed run serves as a checkpoint within the GameDay that helps keep track of how the application fared during a specific situation.    
![](./static/run-gameday/17-run-complete.png)

## Conclusion
Congratulations! You have successfully executed your first GameDay in HCE. Don’t forget to check out [other tutorials](../../../../tutorials/run-chaos-experiments).

