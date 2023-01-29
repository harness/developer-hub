---
sidebar_position: 1
description: Install a delegate on Docker or Kubernetes
---

# Install a delegate

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## What is a delegate?

Harness Delegate is a lightweight worker process that is installed on your infrastructure and uses outbound HTTP/HTTPS to communicate with Harness Platform. This enables Harness Platform to use the delegate to execute CI/CD and other tasks on your behalf, without your secrets leaving your network. To read more on delegates, see [Delegate overview](https://developer.harness.io/docs/platform/Delegates/get-started-with-delegates/delegates-overview).

You can install Harness Delegate on Docker or Kubernetes. 

## Install a delegate

<h3> Create new delegate token </h3>
Login</b> to Harness Platform and go to <b>Account Settings > Account Resources > Delegates</b>. Click on the <b>Tokens</b> tab. Click <b>+ New Token</b> and give your token a name `firstdeltoken`. When you click <b>Apply</b>, a new token is generated for you. Click <b?Copy</b> to copy and store the token in a temporary file. You'll use this token as an input parameter in the next delegate installation step. The delegate uses this token to authenticate with Harness Platform.

<h3> Get your Harness account ID </h3>

Along with the delegate token, you will also need to provde your Harness account ID (`accountId`) as an input parameter to the delegate installation. The account ID is present in every Harness URL. For example, in the following URL, `6_vVHzo9Qeu9fXvj-AcQCb` is the account ID. 

```
https://app.harness.io/ng/#/account/6_vVHzo9Qeu9fXvj-AcQCb/settings/overview
```

Now you're ready to install the delegate on Docker or Kubernetes. 

```mdx-code-block
<Tabs>
<TabItem value="Docker">
```
<h3> Prerequisite </h3>

Ensure that you have the Docker runtime installed on your host. You can use one of the following options to install Docker:

- [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
- [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Docker for Debian](https://docs.docker.com/engine/install/debian/)
- [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 

<h3> Install on Docker </h3>

You can install the delegate using the following command.

```bash
docker run -d --name="firstdockerdel" --cpus="0.5" --memory="2g" \
-e DELEGATE_NAME=firstdockerdel \
-e NEXT_GEN=true \
-e DELEGATE_TYPE=DOCKER \
-e ACCOUNT_ID=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
-e DELEGATE_TOKEN=PUT_YOUR_DELEGATE_TOKEN_HERE \
-e MANAGER_HOST_AND_PORT=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE \
harness/delegate:22.11.77436
```
`PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` should be replaced by the Harness Manager endpoint noted below. For Harness SaaS accounts, you can find your Harness cluster Location in <b>Account Settings</b> on the <b>Account Overview</b> page. For Harness CDCE, the endpoint varies based on the Docker and Helm installation options.

| Harness cluster location| Harness Manager endpoint on Harness cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/deploy-services/cdce-helm-k8s)  	 		| `http://<HARNESS_HOST>` if the Docker delegate is remote to CDCE  or  `http://host.docker.internal` if the Docker delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/deploy-services/cdce-helm-k8s)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP address of the Kubernetes node where CDCE Helm is running|


<h3> Verify Docker delegate connectivity </h3>

Click <b>Continue</b>. The health checks take a few moments to pass. After that, your Docker delegate is available to use. Click <b>Done</b>. Then you can verify that your new delegate is on the list.


![Delegate Available](static/install-delegate/docker_available.png)

```mdx-code-block
</TabItem>
<TabItem value="Kubernetes">
```
<h3> Prerequisite </h3>

Make sure you have access to a Kubernetes cluster. In this tutorial, we'll use `minikube`.

<h4>Install minikube </h4>

- On Windows: 
```
choco install minikube
```
- On macOS: 
```
brew install minikube
```
Now start minikube with the following configuration.
```
minikube start --memory 4g --cpus 4
```
Validate that you have `kubectl` access to your cluster.

```
kubectl get pods -A
```

Now that you have access to a Kubernetes cluster, you can install the delegate using any of the options below.

```mdx-code-block
<Tabs>
<TabItem value="Helm Chart">
```
<h3> Download the Helm chart values YAML </h3>

```
curl -LO https://raw.githubusercontent.com/harness-apps/developer-hub-apps/main/delegate/harness-delegate-values.yaml
```

<h3> Install the Helm chart </h3>

Before you can install the Helm chart, make sure you have [Helm v3](https://helm.sh/docs/intro/install/) installed on the machine you use to  connect to your Kubernetes cluster. 

Next you'll install the delegate using the delegate Helm chart. Use the following commands to add the `harness` Helm chart repository to your local Helm registry.

```
helm repo add harness https://app.harness.io/storage/harness-download/harness-helm-charts/
helm search repo harness
```

The repository contains two Helm charts. For purposes of this tutorial, we'll use the `harness/harness-delegate-ng` chart.
```
NAME                       	CHART VERSION	APP VERSION	DESCRIPTION                
harness/harness-delegate   	1.0.8        	           	Delegate for Harness FirstGen Platform 
harness/harness-delegate-ng	1.0.0        	1.16.0     	Delegate for Harness NextGen Platform
```

Now we are ready to install the delegate. The following command installs/upgrades `firstk8sdel` delegate (which is a Kubernetes workload) in the `harness-delegate-ng` namespace by using the `harness/harness-delegate-ng` helm chart. The configuration provided in the `harness-delegate-values.yaml` is used for this install/upgrade. Note that we downloaded this values yaml file in the previous step.

```
helm upgrade -i firstk8sdel \
--namespace harness-delegate-ng --create-namespace \
harness/harness-delegate-ng \
-f harness-delegate-values.yaml \
--set delegateName=firstk8sdel \
--set accountId=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
--set delegateToken=PUT_YOUR_DELEGATE_TOKEN_HERE \
--set managerEndpoint=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE
```
`PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` should be replaced by the Harness Manager endpoint noted below. For Harness SaaS accounts, you can find your Harness cluster location in the Account Overview page under Account Settings section of the left navigation. For Harness CDCE, the endpoint varies based on the Docker vs. Helm installation options.

| Harness Cluster Location| Harness Manager Endpoint on Harness Cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/deploy-services/cdce-helm-k8s)  	 		| `http://<HARNESS_HOST>` if Docker Delegate is remote to CDCE  or  `http://host.docker.internal` if Docker Delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/deploy-services/cdce-helm-k8s)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running|
	
<h3> Verify Helm Delegate Connectivity </h3>

Click <b>Continue</b>. The health checks take a few moments to pass. After that, your Docker delegate is available to use. Click <b>Done</b>. Then you can verify that your new delegate is on the list.

![Delegate Available](static/install-delegate/helm_available.png)

```mdx-code-block
</TabItem>
<TabItem value="Terraform Helm Provider">
```

<h3> Clone Terraform Module Repo </h3>

Harness has created a github repo that stores the terraform module for the Kubernetes delegate. This module uses the standard terraform Helm provider to install the helm chart onto a Kubernetes cluster whose config is stored in the same machine at the `~/.kube/config` path. You can change this path in the `providers.tf` file after cloning.

```
git clone git@github.com:harness/terraform-kubernetes-harness-delegate.git
```

<h3> Run terraform init, plan and apply </h3>

Initialize terraform. This will download the terraform helm provider onto your machine.
```
terraform init
```

Run the following step to see exactly the changes terraform is going to make on your behalf.
```
terraform plan
```

Finally, run this step to make terraform install the Kubernetes delegate using the Helm provider.
```
terraform apply \
-var delegate_name="firstk8sdel" \
-var account_id="PUT_YOUR_HARNESS_ACCOUNTID_HERE" \
-var delegate_token="PUT_YOUR_DELEGATE_TOKEN_HERE" \
-var manager_endpoint="PUT_YOUR_MANAGER_HOST_AND_PORT_HERE" \
-var delegate_image="harness/delegate:22.11.77436"
```
`PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` should be replaced by the Harness Manager Endpoint noted below. For Harness SaaS accounts, you can find your Harness Cluster Location in the Account Overview page under Account Settings section of the left navigation. For Harness CDCE, the endpoint varies based on the Docker vs. Helm installation options.

| Harness Cluster Location| Harness Manager Endpoint on Harness Cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/deploy-services/cdce-helm-k8s)  	 		| `http://<HARNESS_HOST>` if Docker Delegate is remote to CDCE  or  `http://host.docker.internal` if Docker Delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/deploy-services/cdce-helm-k8s)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running|

When prompted by terraform if you want to continue with the apply step, type `yes` and then you will see output similar to the following.

```
helm_release.delegate: Creating...
helm_release.delegate: Still creating... [10s elapsed]
helm_release.delegate: Still creating... [20s elapsed]
helm_release.delegate: Still creating... [30s elapsed]
helm_release.delegate: Still creating... [40s elapsed]
helm_release.delegate: Still creating... [50s elapsed]
helm_release.delegate: Still creating... [1m0s elapsed]
helm_release.delegate: Creation complete after 1m0s [id=firstk8sdel]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

<h3> Verify Helm delegate connectivity </h3>

Click Continue and in a few moments after the health checks pass, your Harness Delegate will be available for you to leverage. Click Done and can verify your new Delegate is on the list.

![Delegate Available](static/install-delegate/helm_available.png)

```mdx-code-block
</TabItem>
<TabItem value="Kubernetes Manifest">
```

<h3> Download Kubernetes manifest template </h3>

```
curl -LO https://raw.githubusercontent.com/harness-apps/developer-hub-apps/main/delegate/harness-delegate.yml
```

Open the `harness-delegate.yml` file in a text editor and replace `PUT_YOUR_DELEGATE_NAME_HERE`, `PUT_YOUR_HARNESS_ACCOUNTID_HERE` and `PUT_YOUR_DELEGATE_TOKEN_HERE` with your delegate name (say `firstk8sdel`), Harness accountId, delegate token value respectively.

`PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` should be replaced by the Harness Manager Endpoint noted below. For Harness SaaS accounts, you can find your Harness Cluster Location in the Account Overview page under Account Settings section of the left navigation. For Harness CDCE, the endpoint varies based on the Docker vs. Helm installation options.

| Harness Cluster Location| Harness Manager Endpoint on Harness Cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/deploy-services/cdce-helm-k8s)  	 		| `http://<HARNESS_HOST>` if Docker Delegate is remote to CDCE  or  `http://host.docker.internal` if Docker Delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/deploy-services/cdce-helm-k8s)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running|

<h3> Apply the Kubernetes manifest </h3>

```
kubectl apply -f harness-delegate.yml
```

<h3> Verify Kubernetes Manifest Delegate Connectivity </h3>

Click <b>Continue</b> and in a few moments after the health checks pass, your Harness Delegate will be available for you to leverage. Click Done and can verify your new Delegate is on the list.

![Delegate Available](static/install-delegate/k8smanifest_available.png)

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
</Tabs>
```
You can now route communication to external systems in Harness connectors and pipelines by simply selecting this delegate via a delegate selector. 
