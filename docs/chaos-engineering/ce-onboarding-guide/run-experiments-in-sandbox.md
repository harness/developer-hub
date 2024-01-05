---
sidebar_position: 2
title: Run chaos experiments in sandbox to build resilience 
description: Execute chaos experiments to improve the resilience of the Podtato head app in a sandbox.
---
## Introduction
This tutorial guides you through an interactive tutorial that uses a sample application (**Podtato head**) to execute a chaos experiment and improve the resilience of the application.

## Prerequisites
Before you begin the tutorial, you need to have a Harness account. To create one, follow the below-mentioned steps.

### Create a Harness account

1. Navigate to [app.harness.io](https://app.harness.io/auth/#/signin) and **Sign up**.

![navigate](./static/sandbox/sign-up.png)

2. Click **Sign up with Email** and enter your work email and password.

![enter details](./static/sandbox/create-account.png)

3. You will receive a verification email that will lead you to the page with various modules.

![verify](./static/sandbox/verify-email.png)


## Execute pod delete on the Podtato head app

Once you have created an account with Harness, click **Get started** of the **Chaos Engineering** module.

![landing](./static/sandbox/landing-page.png)

### Create a sandbox

1. This will lead you to the chaos module landing page. Click **Create sandbox**. 

![select module](./static/sandbox/click-sandbox.png)

2. This creates a new environment where chaos experiments can be executed.

![env](./static/sandbox/create-env.png)

3. This takes you to the **Interactive learning** tab, where you click **Start**.

![start](./static/sandbox/pod-delete-start.png)

### Execute pod delete experiment

1. This starts by creating the necessary clusters in the environment you previously created. Once the clusters are ready, the pod delete experiment is created. Click **Next**.

![exp created](./static/sandbox/exp-runs.png)

2. In this step, click **Run** to execute the pod delete chaos experiment that was previously created.

![exp runs](./static/sandbox/execute-exp.png)

3. You can see that the experiment deletes a pod and displays the resilience of the Podtato head application.

![exp runs](./static/sandbox/exp-complete.png)

4. This shows that the Podtato head app is not resilient, and the application's resilience can be enhanced. Click **Next** to configure the application to build resilience.

![click next](./static/sandbox/click-next.png)

### Re-run to build resilience

1. You can see two commands on the screen, which you can execute by clicking **Run**. This shows that 2 replicas of the same pod are created, thereby building resilience. This way, even if one of the pods is deleted during the pod delete experiment, the replica pod can take over and the application can function without any glitch. 

![improve resilience](./static/sandbox/imp-resilience.png)

2. Click **Next**. Once the application is configured, re-run the experiment by clicking **Run**.

![improve resilience](./static/sandbox/re-run-exp.png)

3. This runs the pod delete experiment again. But this time, you can observe that the resilience score of the application is 100 percent. This means that even when the pod delete experiment randomly deleted a pod, another pod took its place and ensured that the app ran smoothly.

![improve score](./static/sandbox/high-score.png)

### Perform the same steps for the next experiment

The above steps complete the execution of the pod delete experiment. There is one more experiment to execute, that is, pod network loss. You can follow the same steps to execute this experiment as well.

:::tip
You can start executing the sandbox again if you run out of time by click **Run**.

![finish](./static/sandbox/start-again.png)
:::

## Conclusion
With that, you have successfully executed a chaos experiment in the sandbox as well as registered for the developer certification. Check [this tutorial](../../../tutorials/chaos-experiments/first-chaos-engineering) to execute your first chaos experiment and the [documentation](../get-started/overview) to learn about various kinds of [faults](../technical-reference/chaos-faults). 
