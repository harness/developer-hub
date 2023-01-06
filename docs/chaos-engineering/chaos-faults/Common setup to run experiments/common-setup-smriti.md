---
id: common-setup
title: Setup experiments to execute faults
---

## Introduction

* The first step is to access your project in the **Chaos access center**.

![Select project](./static/images/select-project.png)

* Now, create a new **Chaos Environment** in the project, and select **Environment Type** as **Production**.

![New environment](./static/images/new-environment.png)

* Click on **Enable Chaos** to setup **Chaos Infrastructure**.

![Chaos infra enable](./static/images/enable-chaos.png)

* Create a new **Chaos Infrastructure** within the **Chaos Environment** you just created. Click **Continue**.

![Chaos infra](./static/images/chaos-on-new-infra.png)

* Provide a name, description (optional), and tags(optional). Click **Next**.

![Chaos naming](./static/images/enable-chaos-naming.png)

* Select the **Installation mode**, and provide values for **Chaos Infrastructure Namespace**, and **Service account name**. Click **Next**.

![Configure infrastructure](./static/images/configure-infra.png)

* Download the YAML file, and copy the command to deploy the infrastructure in your **Chaos Environment**. Click **Done**.

![Deploy setup](./static/images/deploy-infra.png)

* To create a new chaos experiment, on the left pane, select **Chaos Experiments**, and click on **New Experiment**.

![New experiment](./static/images/new-experiment.png)

* Specify the name, description(optional), tags(optional), and the **Chaos Infrastrcuture** where this **Chaos Experiment** would be executed. Click **Next**.

![Specify parameters](./static/images/new-experiment-setup.png)

* The next step is to choose a **Chaos fault**. For this, select the **blank canvas**, and click on **Start with blank canvas** on the right pane.

![Blank canvas](./static/images/blank-canvas.png)

* This leads you to the experiment builder where you need to add the next steps in the **chaos experiment**. Click the **+** symbol to specify the chaos fault. 

![Experiment builder](./static/images/experiment-builder.png)
