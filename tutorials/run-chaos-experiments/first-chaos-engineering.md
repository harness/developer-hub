---
sidebar_position: 1
title: Your First Chaos Experiment Run
description: Running a Chaos Experiment on Kubernetes for the first time.
---
# Your first chaos experiment run

Welcome to your first tutorial on running a chaos experiment in Harness Chaos Engineering. In this tutorial, you will learn some basics of chaos engineering and then use Harness Chaos Engineering to run your first experiment on Kubernetes.

## What is chaos engineering?
Chaos engineering is a DevOps practice that involves proactive, controlled experimentation on a system to identify weak points and misconfiguration, gain insights into how the system behaves in turbulent conditions, and improve the system’s resilience. 

Chaos experiments introduce one or more faults in the system, which typically comprises the application under test and all the components on which it depends, such as databases, networks, infrastructure, and cloud native services. Chaos experiments go beyond traditional checks on code, such as unit tests and system integration tests. Instead, they target the production environment into which you deploy your code.

Chaos engineering is relevant to all types of systems, including legacy applications and infrastructure. However, it assumes greater significance in deployments involving cloud native applications, which inherently carry multiple points of failure because of their distributed and elastic nature.

## Typical chaos experimentation workflow
Chaos experiments target a steady-state system and simulate conditions that induce failure in components such as infrastructure, networks, and services. For example, a chaos experiment might terminate a pod in a functional Kubernetes cluster, shut down a working load balancer to validate failover, or induce CPU spikes on a server, and then observe how the system responds. 

A key step in the chaos experiment workflow is the development of a hypothesis on the expected response to the faults you introduce. For example, if you are experimenting on a pair of load balancers in an active-passive configuration, the hypothesis might be that the passive load balancer takes over when you take the active load balancer off the network.
 
Following is the typical workflow of a chaos experiment:
1. Defining and applying a steady state to the test system, with well-defined service-level objectives (SLOs). 
2. Developing a hypothesis on how the system will behave if you inject a specific fault.
3. Injecting the fault.
4. Observing whether the hypothesis holds true and the system regains its steady state.

![Chaos engineering overview](./static/first-chaos/chaos-engineering-overview.png)

# Chaos engineering with Harness

Harness Chaos Engineering (HCE) is a chaos engineering platform that is included with the Harness Software Delivery Platform. To get started, create a new project or ask your administrator to add you to an existing project. Thereafter, you can access the Chaos tab and run your first chaos experiment. 

![HCE overview](./static/first-chaos/hce-overview.png)

Before you run an experiment, you must create an environment and add a chaos infrastructure.

## Add a chaos environment

An environment represents where you are deploying your application. You categorize each Environment as either a production environment or a non-production environment that is used for pre-production activities such as testing or automation.

To add a chaos environment, do the following:
1. On the Chaos tab, go to **Environments**, and then click **+ New Environment**. 

![Create a new environment](./static/first-chaos/create-new-environment.png)

2. Enter a name for the environment and, optionally, enter a description and one or more tags. 
3. In Select Environment Tyoe, click Production if you want to create a production environment. If you want to create an environment for purposes other than production (for example, QA or automation), click **Non-Production**. 
4. Click **Create**.

The **Chaos Infrastrucures** page is displayed.

## Add a chaos infrastructure

On the Chaos Infrastructures page, we add a Kubernetes infrastructure so that we can inject Kubernetes resource faults. 

To add a chaos infrastructure, do the following:
1. On the Chaos Infrastructures page, click **Enable Chaos**.
2. In the **Enable Chaos** wizard, click **On New Infrastructures**, and then click **Continue**. 
3. In the **Chaos Infrastructure wizard**, do the following:
    1. Enter a name for your chaos infrastructure and, optionally, add a description and tags. Click **Next**.
    2. In **Installation Mode**, click **Namespace mode**. 
    The installation mode specifies where the Harness delegate gets installed. The Harness delegate is a remote agent for accessing your Kubernetes cluster resources and injecting faults into them as part of a chaos experiment. The **Namespace Mode** installation restricts chaos injection to only the namespace in which the delegate is installed. By default, the delegate installs in the litmus namespace. You can change the namespace, but we use the default namespace in this tutorial.
    ![Configure Chaos Infrastructure](./static/first-chaos/configure-chaos-infrastructure.png)
    4. Click **Next**
    5. To deploy the chaos insfrastructure, follow the instructions displayed on the **Deplay the setup** page, and then click **Done**.
4. On the **Environments** page, click your environment, and then verify that the status is `CONNECTED`.
Delegate setup takes a few minutes, so you might have to wait for some time before the status is updated.

![Infrastructure State](./static/first-chaos/infrastructure-state.png)

## Creating Demo Application and Observability Infrastructure

We are all set to target our Kubernetes resources. In this quick start document, we execute one of the most popular and simplest of faults, namely **Pod Delete**. It deletes the pods in a deployment, statefulset, daemonset, and so on, to validate the resilience of a microservice application. 

This tutorial uses the [Online Boutique](https://github.com/GoogleCloudPlatform/microservices-demo) microservices demo application as the target.

Before you setup your chaos experiment, you must install the target application microservices and observability infrastructure, including Grafana, Prometheus, and a BlackBox exporter. Installation of the observability infrastructure is optional; it does not play a role in the execution of the experiment. However, it provides us with a dashboard to help us validate the health of the application microservices in real time.

To install the target application and observability infrastructure, open a terminal window, and then run the following commands:

```bash
❯ kubectl apply -f https://raw.githubusercontent.com/Adarshkumar14/boutique-app-monitoring/main/manifest/app.yaml -n litmus

❯ kubectl apply -f https://raw.githubusercontent.com/Adarshkumar14/boutique-app-monitoring/main/manifest/monitoring.yaml -n litmus
```

Note that the target application and observability infrastructure pods are deployed in the default `litmus` namespace. To verify that they are installed in the default namespace, run the following command:

```
❯ kubectl get pods -n litmus

NAME                                           READY   STATUS    RESTARTS        AGE
adservice-68db567bb5-hd47j                     1/1     Running   0               5m39s
cartservice-6b8f46f64f-6mrkv                   1/1     Running   0               5m39s
chaos-exporter-765d6b6674-tkrpm                1/1     Running   0               11m
chaos-operator-ce-678b67c75-l68m5              1/1     Running   0               11m
checkoutservice-7545ff6849-rdl9f               1/1     Running   0               5m40s
currencyservice-5769b647d5-trx69               1/1     Running   0               5m39s
emailservice-55c84dcfdc-c9x9q                  1/1     Running   0               5m40s
frontend-74b7898dd9-x4bzr                      1/1     Running   0               5m40s
grafana-6f6fb469b7-bm9vh                       1/1     Running   0               5m34s
loadgenerator-5b875b84dd-pcjdr                 1/1     Running   0               5m39s
paymentservice-59d87f77bc-fkwjq                1/1     Running   0               5m40s
productcatalogservice-676d7d7dbc-nx75x         1/1     Running   0               5m40s
prometheus-blackbox-exporter-6d955c876-l7fdv   2/2     Running   0               5m34s
prometheus-deployment-779b88bf5d-zf8f9         1/1     Running   0               5m34s
recommendationservice-6fc8b4d9cf-4s96t         1/1     Running   0               5m40s
redis-cart-7cd9d8966d-mgbhx                    1/1     Running   0               5m39s
shippingservice-7b4945b5fc-cbmc9               1/1     Running   0               5m39s
subscriber-7774bd95d4-4rnwp                    1/1     Running   0               11m
workflow-controller-6d5d75dc7c-v9vqc           1/1     Running   0               11m
```

To show the list of services available in the `litmus` namespace, run the following command:
```
❯ kubectl get services -n litmus

NAME                           TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
adservice                      ClusterIP      10.110.145.128   <none>        9555/TCP         9m48s
cartservice                    ClusterIP      10.103.73.107    <none>        7070/TCP         9m49s
chaos-exporter                 ClusterIP      10.103.163.182   <none>        8080/TCP         15m
checkoutservice                ClusterIP      10.105.52.42     <none>        5050/TCP         9m49s
currencyservice                ClusterIP      10.108.12.130    <none>        7000/TCP         9m49s
emailservice                   ClusterIP      10.106.79.95     <none>        5000/TCP         9m49s
frontend                       ClusterIP      10.98.222.239    <none>        80/TCP           9m49s
frontend-external              LoadBalancer   10.101.239.201   localhost     80:30963/TCP     9m49s
grafana                        LoadBalancer   10.96.206.174    localhost     3000:32659/TCP   9m43s
paymentservice                 ClusterIP      10.106.36.71     <none>        50051/TCP        9m49s
productcatalogservice          ClusterIP      10.97.78.9       <none>        3550/TCP         9m49s
prometheus-blackbox-exporter   ClusterIP      10.103.118.20    <none>        9115/TCP         9m43s
prometheus-k8s                 LoadBalancer   10.106.153.10    localhost     9090:32101/TCP   9m43s
recommendationservice          ClusterIP      10.106.227.47    <none>        8080/TCP         9m49s
redis-cart                     ClusterIP      10.103.184.94    <none>        6379/TCP         9m48s
shippingservice                ClusterIP      10.109.150.169   <none>        50051/TCP        9m48s
workflow-controller-metrics    ClusterIP      10.106.97.173    <none>        9090/TCP         15m
```

## Access the target application and observability infrastructure in your browser

To access the target application's user interface in your browser, use the `frontend-external` LoadBalancer service.

![Online Boutique](./static/first-chaos/online-boutique.png)

Similarly, you can access the Grafana dashboard. Log in with the default credentials (user name `admin` and password `admin`), and then browse the Online Boutique application dashboard. All the metrics should indicate normal application behavior.

![Grafana App Dashboard](./static/first-chaos/grafana-app-dashboard.png)

## Construct a chaos experiment

With your target application deployed, you can create a chaos experiment. In the current experiment, you target the pods of the carts microservice with the `Pod Delete` fault. Right now, the cart page is healthy and accessible in the frontend, as seen at the `/cart` route.

![Online Boutique App Cart](./static/first-chaos/online-boutique-app-cart.png)

To create the chaos experiment, go to **Chaos Experiments** page and choose **New Experiment**. Then, add the experiment name and optionally a description and tags. Then, choose the target infrastructure, which we created previously. Choose **Next**. In the Experiment Builder, choose **Templates from Chaos Hubs** and select **Boutique cart delete**.

This will allow us to create our chaos experiment using a pre-defined template, which already has a pod-delete fault configured to target the Online Boutique application.

Select **Use this template** to continue.

![Boutique Cart Delete Template](./static/first-chaos/boutique-cart-delete-template.png)

You'll notice that we're currently in the **Chaos Studio**, which helps in constructing varied chaos experiments involving different kinds of chaos probes, faults and custom action steps. Since the template has already defined the pod-delete fault, let us inspect at its configuration.

Select the added pod-delete fault icon.

![Target Application Config](./static/first-chaos/target-application-config.png)

We are targeting the carts microservice and hence the appropriate `litmus` application namespace and the `app=cartservice` application label has been provided here, which corresponds to the cart microservice. Also, application kind is `deployment`. It is worth noting that you can discover these entities from within the UI using the search dropdown menu for the respective inputs.

Then, choose the **Tune Fault** tab to view the fault parameters. Here, we the fault execution duration is defined to be 30 seconds with an interval of 10 seconds, so that in every 10 seconds the cart microservice pod(s) get deleted for a total of 30 seconds. The ramp time is empty and by default 0, which refers to the period to wait before and after chaos injection. Lastly, the pod affected percentage is also empty, and by default at least one pod of the cart deployment will be targeted.

![Tune Fault Config](./static/first-chaos/tune-fault-config.png)

Lastly, switch to the **Probes** tab. Here, we have a probe defined by the name of **http-cartservice-probe**, which will validate the availability of the `/cart` URL endpoint when the pod-delete fault will execute. It can be observed that the probe is of type HTTP Probe and it executes in a Continuous mode throughout the fault execution. Further, under probe details, the URL can be observed as `http://frontend/cart` and the response timeout is 15 milliseconds. Therefore, as part of the probe execution GET requests will be made to the specified URL and if no HTTP response is found within 15 milliseconds, the probe will be declared as failed. If all the probe executions pass, then the probe will be regarded as passed. The interval of probe evaluation, retries upon failure and other parameters, check its properties.

![Probes Config](./static/first-chaos/probes-config.png)

When done, simply close the overlay modal.

In the last step, choose the **Set Fault Weight** tab. Here, we can observe that the default weight for the fault is 10, which we can use for calculating the resiliency score for the experiment run.

![Fault Weight](./static/first-chaos/fault-weight.png)

## Observing Chaos Execution

When ready, start the experiment execution by selecting **Run** on the top right corner of the screen. You'll be able to observe the experiment added to the list of chaos experiments and it should be in a `Running` status. Choose **Current Execution** to get a detailed view.

![Experiment Executing](./static/first-chaos/experiment-executing.png)

Once the fault is running, we can check for the detailed view of the experiment. We can follow the logs of the experiment run as it gets executed. 

![Detailed Chaos Execution](./static/first-chaos/detailed-chaos-execution.png)

At the same time, we can also check for the status of the cart deployment pod. Upon executing the following command you will get a similar output. It is evident that the Pod Delete fault has caused the cart pod to be terminated and a new pod has recently replaced it, for whose container is yet to be created.

```
❯ k get pods -n litmus

NAME                                           READY   STATUS    RESTARTS       AGE
adservice-68db567bb5-hd47j                     1/1     Running   0              5h41m
cartservice-6b8f46f64f-lkgs8                   0/1     Running   0              29s
chaos-exporter-765d6b6674-tkrpm                1/1     Running   0              5h41m
chaos-operator-ce-678b67c75-l68m5              1/1     Running   0              5h41m
checkoutservice-7545ff6849-rdl9f               1/1     Running   0              5h41m
currencyservice-5769b647d5-trx69               1/1     Running   0              5h41m
emailservice-55c84dcfdc-c9x9q                  1/1     Running   0              5h41m
frontend-74b7898dd9-x4bzr                      1/1     Running   0              5h41m
grafana-6f6fb469b7-bm9vh                       1/1     Running   0              5h41m
loadgenerator-5b875b84dd-pcjdr                 1/1     Running   0              5h41m
paymentservice-59d87f77bc-fkwjq                1/1     Running   0              5h41m
productcatalogservice-676d7d7dbc-nx75x         1/1     Running   0              5h41m
prometheus-blackbox-exporter-6d955c876-l7fdv   2/2     Running   0              5h41m
prometheus-deployment-779b88bf5d-zf8f9         1/1     Running   0              5h41m
recommendationservice-6fc8b4d9cf-4s96t         1/1     Running   0              5h41m
redis-cart-7cd9d8966d-mgbhx                    1/1     Running   0              5h41m
shippingservice-7b4945b5fc-cbmc9               1/1     Running   0              5h41m
subscriber-7774bd95d4-4rnwp                    1/1     Running   0              5h41m
workflow-controller-6d5d75dc7c-v9vqc           1/1     Running   0              5h41m
```

Consequently, if we try to access the frontend cart page, we get the following error which indicates that the application is now unreachable. This makes sense since the cart pod has been deleted and a new pod is yet to initialize:
![Webpage Unavailable](./static/first-chaos/webpage-unavailable.png)

We can validate this behavior using the application metrics dashboard as well. The probe success percentage for website availability (200 response code) is now steeply decreasing along with the 99th percentile (green line) queries per second (QPS) and access duration for the application microservices. Also, the mean QPS (yellow line) is steeply increasing. This is because there's no pod available right now to service the query requests.

![Application Down Dashboard](./static/first-chaos/application-down-dashboard.png)

## Evaluating the Experiment Run

When the experiment execution concludes, we get a resiliency score of 0%. We can also observe that the Pod Delete fault step has failed.

Before we analyze the experiment result, we can validate that the application is now again normally accessible, without any errors. This can also be validated from the Grafana dashboard where we can observe the metrics to slowly normalize as the chaos duration is now over.

![App Metrics Normalizing](./static/first-chaos/app-metrics-normalizing.png)

We can now check the check the chaos result, where it can be observed that the fault verdict is **Failed** and the Probe Success Percentage is 0%. This is because the http-cart-service probe has failed. The failure of this probe can be attributed to the unavailability of the cart pod and therefore the `/cart` endpoint, due to the injection of the Pod Delete fault.

![Experiment Failed Probe](./static/first-chaos/experiment-failed-probe.png)

We can also observe that the fail step says "Probe execution result didn't met the passing criteria", referring the the failure of HTTP probe that we had defined.

![Fail Step Result](./static/first-chaos/fail-step-result.png)

With that, we have successfully run our first chaos experiment! If you're wondering that how we can remediate our application so that it passes the experiment run and probe checks, it's as simple as bumping up the experiment pods to at least two, such that at least one deployment pod survives the Pod Delete fault and help the application stay afloat. Do try to run it on your own now!

Once you've explored to your heart's content, head over to the next tutorial where you'll learn how to create chaos experiments from scratch and execute it for the same target application.
