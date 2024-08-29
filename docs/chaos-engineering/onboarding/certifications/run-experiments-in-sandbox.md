---
sidebar_position: 8
title: Run chaos experiments in sandbox
description: Execute chaos experiments to improve the resilience of an app in a sandbox.
redirect_from:
	- /docs/chaos-engineering/certifications/run-experiments-in-sandbox
---

This topic guides you through an interactive tutorial that uses a sample application (**Podtato head**) to execute a chaos experiment and improve the application's resilience.

## Prerequisites
Before you begin the tutorial, you need to have a Harness account. To create one, follow [these](#create-a-harness-account) steps. Go to [onboarding flow](/docs/chaos-engineering/onboarding/certifications/developer-certification#obtaining-developer-certification) diagram to understand the flow of obtaining the Harness developer certification.

### Create a Harness account

1. Navigate to [app.harness.io](https://app.harness.io/auth/#/signin) and **Sign up**.

	![navigate](./static/sandbox/sign-up.png)

2. Select **Sign up with Email** and enter your work email and password.

	![enter details](./static/sandbox/create-account.png)

3. You will receive a verification email that leads you to the page with various modules.

	![verify](./static/sandbox/verify-email.png)

## High-level flow of control in a sandbox

Below is a diagram that shows a high-level view of the flow of control in a sandbox environment:

![control flow](./static/sandbox/sandbox-flow-of-control.png)

## Execute pod delete on the Podtato head app

Once you have created an account with Harness, select **Get started** of the **Chaos Engineering** module.

![landing](./static/sandbox/landing-page.png)

### Create a sandbox

1. This leads you to the chaos module landing page. Select **Create sandbox**. Notice how it is a **Zero risk** operation!

	![select module](./static/sandbox/click-sandbox.png)

2. This creates a new environment where chaos experiments can be executed.

	![env](./static/sandbox/create-env.png)

3. This takes you to the **Interactive learning** tab, where you click **Start**.

	![start](./static/sandbox/pod-delete-start.png)

:::note
* Once you create a sandbox, you can't delete it.
* All users within a sandbox can share the same sandbox.
* The first time you create a sandbox, the session starts automatically. After that, you need to explicitly **Start** the session.
* You will have a total of 20 sessions (each session is 60 minutes) valid for 30 days from the day of creation of the sandbox.
* You can **Stop** anytime and **restart** the session. The remaining part of the time will be added to the unused quota.
:::

### Execute pod delete experiment

1. Experiment execution begins by creating the necessary clusters in the environment you created earlier. Once the clusters are ready, the sandbox creates the [pod delete](/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete/) experiment. Select **Next**.

	![exp created](./static/sandbox/exp-runs.png)

2. Select **Run** to execute the [pod delete chaos experiment](/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete.md) that was created earlier. In the background, the experiment creates resilience probes that check the availability of the Podtato app's left arm that is deleted during the pod delete experiment.

	![exp runs](./static/sandbox/execute-exp.png)

3. You can see that the experiment deletes a pod (specifically the left arm pod) and displays the resilience of the Podtato head application.

	![exp runs](./static/sandbox/exp-complete.png)

:::note
You will see that the resilience score is 50. The reason behind the value is that when you execute the experiment, two probes of equal weight are configured in the background. When one of them fails, it results in a resilience score of 50.
:::

4. This shows that the Podtato head app is not resilient, and you can take steps to enhance the application's resilience. Select **Next** to configure the application to build resilience.

	![click next](./static/sandbox/click-next.png)

:::tip
* You can re-run the experiment.
* You can scale up the Podtato head app only once.
* You can delete the Podtato head left arm only once.
* You can execute pod network loss only after completing the pod delete experiment.
* You can re-run the experiment.
* You can't roll back to the previous step/experiment at any point.
:::

### Re-run to build resilience

1. You will see two commands on the screen, select **Run** to execute the commands. This shows that 2 replicas of the same pod are created, thereby improving the availability of the pod and building resilience. This way, even if one of the pods is deleted during the pod delete experiment, the replica pod can take over and the application can function without any glitch.

	![improve resilience](./static/sandbox/imp-resilience.png)

2. Select **Next**. Once the application is configured, select **Run** to re-run the experiment.

	![improve resilience](./static/sandbox/re-run-exp.png)

3. This runs the pod delete experiment again. This time, you will observe that the resilience score of the application is 100 percent. This means that even when the pod delete experiment randomly deleted a pod, another pod took its place and ensured that the app ran smoothly.

	![improve score](./static/sandbox/high-score.png)

:::note
The resilience score is 100 because both the probes that were configured with equal weight passed.
	![probe passed](./static/sandbox/probe-details.png)
:::

4. Click **Next** to execute another experiment (pod network loss).

	![execute next](./static/sandbox/to-move.png)

:::tip
Click **Run** to execute the sandbox again if you run out of time.

	![finish](./static/sandbox/start-again.png)
:::

### Perform the same steps for the next experiment

1. The above steps complete the execution of the pod delete experiment. There is one more experiment to execute, that is, [pod network loss](/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-loss.md). You can follow the same steps as you did for the pod delete experiment to execute this experiment as well. In this experiment, a probe is configured in the background to check for the availability of the Podtato app's left arm, which is targeted.

	![pod network loss](./static/sandbox/pod-nw-loss.png)

2. Select **Next** to enter the last step of the hands-on lab.

	![pod network done](./static/sandbox/pod-nw-done.png)

3. You have completed the Chaos hands-on lab, by executing two experiments in the sandbox and improving the resilience of the Podtato head application. Select **Go to Harness University** or follow [this](/docs/chaos-engineering/onboarding/certifications/developer-certification.md) tutorial to obtain the developer certification.

	![pod network done](./static/sandbox/go-to-cert.png)

## Create experiments in sandbox

Apart from executing **pod delete** and **pod network loss** experiments on the Podtato head application, you can also create other experiments in the sandbox.
- Navigate to your sandbox, and select **Chaos experiments**. You will see the experiments that you executed earlier (or are currently being executed) in the sandbox.

	![exp exec](./static/sandbox/other-exp.png)

- Select **New experiment** and follow the steps to [create an experiment](/docs/chaos-engineering/features/experiments/construct-and-run-custom-chaos-experiments).

## Next steps
* [Harness Chaos Engineering Developer Certification](/docs/chaos-engineering/onboarding/certifications/developer-certification.md)
