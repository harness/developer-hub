---
sidebar_position: 7
title: Improve resilience of the podtato head app
description: Improve the resilience of the Podtato head app in a sandbox.
---
## Introduction
This tutorial guides you through an interactive tutorial that uses a sample application (**Podtato head**) to execute a chaos experiment and build resilience.

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

### Developer certification exam

1. Once you are done, you can attempt the Harness Chaos Engineering Developer certification exam. Navigate to [Harness university](https://university.harness.io/chaos-engineering-developer) or click **Go to Harness University**.

![finish](./static/sandbox/finish.png)

2. You can **Register for free** or sign in. 

![register](./static/sandbox/harness-uni.png)

3. If you haven't previously registered, click **Sign up** and enter the details required. Else **Sign in**. 

![sign in](./static/sandbox/sign-up-exam.png)

4. Click **Register for exam**.

![sign in](./static/sandbox/register-for-exam.png)

5. Basic connectivity is checked, click **Proceed**.

![proceed](./static/sandbox/proceed.png)

6. Read through the terms and condition, click **Agree and continue**.

![agree](./static/sandbox/agree-continue.png)

7. Click **I am ready to begin**.

![ready](./static/sandbox/begin.png)

8. Choose the options that you think suit the questions the best. At the end, the screen will display a code, along with 4 options. Go to the sandbox and enter the code. 

![enter code](./static/sandbox/enter-code.png)

9. Once you enter the code, click **Generate**.

![generate code](./static/sandbox/generate-code.png)

10. The code generated on this page is one of the options on the Harness university exam page. Select the code that was generated for you, and click **Submit exam**.

![enter code](./static/sandbox/enter-code.png)

That's it! The screen will determine and display your results. All the best!

## Conclusion
With that, you have successfully executed a chaos experiment in the sandbox as well as registered for the developer certification. Check [this tutorial](./first-chaos-engineering) to execute your first chaos experiment and the [documentation](../../docs/chaos-engineering) to learn about various kinds of [faults](../../docs/chaos-engineering/technical-reference/chaos-faults). 
