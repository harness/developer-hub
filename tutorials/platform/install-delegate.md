---
sidebar_position: 1
description: Install Delegate on Kubernetes or Docker
---

# Install Delegate on Kubernetes or Docker

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## What is a Delegate?

[Harness Delegate](/docs/platform/Delegates/get-started-with-delegates/delegates-overview) is a lightweight worker process that is installed on your infrastructure and communicates only via outbound HTTP/HTTPS to the Harness Platform. This enables the Harness Platform to leverage the delegate for executing the CI/CD and other tasks on your behalf, without any of your secrets leaving your network.

You can install the Harness Delegate on either Docker or Kubernetes. 

## Install Delegate

<h3> Create New Delegate Token </h3>
Login to the Harness Platform and go to Account Settings -> Account Resources -> Delegates. Click on the Tokens tab. Click +New Token and give your token a name `firstdeltoken`. When you click Apply, a new token is generated for you. Click on the copy button to copy and store the token in a temporary file for now. You will provide this token as an input parameter in the next delegation installation step. The delegate will use this token to authenticate with the Harness Platform.

<h3> Get Your Harness Account ID </h3>

Along with the delegate token, you will also need to provde your Harness accountId as an input parameter to the delegate installation. This accountId is present in every Harness URL. For example, in the following URL

```
https://app.harness.io/ng/#/account/6_vVHzo9Qeu9fXvj-AcQCb/settings/overview
```

`6_vVHzo9Qeu9fXvj-AcQCb` is the accountId. 

Now you are ready to install the delegate on either Docker or Kubernetes. 

```mdx-code-block
<Tabs>
<TabItem value="Kubernetes">
```
<h3> Prerequisite </h3>

Ensure that you access to a Kubernetes cluster. For the purposes of this tutorial, we will use `minikube`.

<h4>Install minikube </h4>

- On Windows: 
```
choco install minikube
```
- On macOS: 
```
brew install minikube
```
Now start minikube with the following config.
```
minikube start --memory 4g --cpus 4
```
Validate that you have kubectl access to your cluster.

```
kubectl get pods -A
```

Now that you have access to a Kubernetes cluster, you can install the delegate using any of the options below.

```mdx-code-block
<Tabs>
<TabItem value="Helm Chart">
```

<h3> Install Helm Chart </h3>

As a prerequisite, you should have [Helm v3](https://helm.sh/docs/intro/install/) installed on the machine from which you connect to your Kubernetes cluster. 

You can now install the delegate using the Delegate Helm Chart. Let us first add the `harness-delegate` helm chart repo to your local helm registry.

```
helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
helm repo update
helm search repo harness-delegate
```

You can see that there are two helm charts available. We will use the `harness-delegate/harness-delegate-ng` chart in this tutorial.
```
NAME                                	CHART VERSION	APP VERSION	DESCRIPTION                                
harness-delegate/harness-delegate-ng	1.0.8        	1.16.0     	A Helm chart for deploying harness-delegate
```

Now we are ready to install the delegate. The following command installs/upgrades `firstk8sdel` delegate (which is a Kubernetes workload) in the `harness-delegate-ng` namespace by using the `harness-delegate/harness-delegate-ng` helm chart. 

```
helm upgrade -i firstk8sdel --namespace harness-delegate-ng --create-namespace \
  harness-delegate/harness-delegate-ng \
  --set delegateName=firstk8sdel \
  --set accountId=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
  --set delegateToken=PUT_YOUR_DELEGATE_TOKEN_HERE \
  --set managerEndpoint=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE \
  --set delegateDockerImage=harness/delegate:23.02.78306 \
  --set replicas=1 --set upgrader.enabled=false
```
`PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` should be replaced by the Harness Manager Endpoint noted below. For Harness SaaS accounts, you can find your Harness Cluster Location in the Account Overview page under Account Settings section of the left navigation. For Harness CDCE, the endpoint varies based on the Docker vs. Helm installation options.

| Harness Cluster Location| Harness Manager Endpoint on Harness Cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/deploy-services/cdce-helm-k8s)  	 		| `http://<HARNESS_HOST>` if Docker Delegate is remote to CDCE  or  `http://host.docker.internal` if Docker Delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/deploy-services/cdce-helm-k8s)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running|


```mdx-code-block
</TabItem>
<TabItem value="Terraform Helm Provider">
```

<h3> Create main.tf file </h3>

Harness has created a terraform module for the Kubernetes delegate. This module uses the standard terraform Helm provider to install the helm chart onto a Kubernetes cluster whose config by default is stored in the same machine at the `~/.kube/config` path. Copy the following into a `main.tf` file stored on a machine from which you want to install your delegate.

```
module "delegate" {
  source = "harness/harness-delegate/kubernetes"
  version = "0.1.5"

  account_id = "PUT_YOUR_HARNESS_ACCOUNTID_HERE"
  delegate_token = "PUT_YOUR_DELEGATE_TOKEN_HERE"
  delegate_name = "firstk8sdel"
  namespace = "harness-delegate-ng"
  manager_endpoint = "PUT_YOUR_MANAGER_HOST_AND_PORT_HERE"
  delegate_image = "harness/delegate:23.02.78306"
  replicas = 1
  upgrader_enabled = false

  # Additional optional values to pass to the helm chart
  values = yamlencode({
    javaOpts: "-Xms64M"
  })
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
```

Now replace the variables in the file with your Harness Accound ID and Delegate Token values. `PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` should be replaced by the Harness Manager Endpoint noted below. For Harness SaaS accounts, you can find your Harness Cluster Location in the Account Overview page under Account Settings section of the left navigation. For Harness CDCE, the endpoint varies based on the Docker vs. Helm installation options.

| Harness Cluster Location| Harness Manager Endpoint on Harness Cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/deploy-services/cdce-helm-k8s)  	 		| `http://<HARNESS_HOST>` if Docker Delegate is remote to CDCE  or  `http://host.docker.internal` if Docker Delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/deploy-services/cdce-helm-k8s)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running|

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
terraform apply
```

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


```mdx-code-block
</TabItem>
<TabItem value="Kubernetes Manifest">
```

<h3> Download Kubernetes Manifest Template </h3>

```
curl -LO https://raw.githubusercontent.com/harness/delegate-kubernetes-manifest/main/harness-delegate.yaml
```

<h3> Replace Variables in the Template </h3>

Open the `harness-delegate.yml` file in a text editor and replace `PUT_YOUR_DELEGATE_NAME_HERE`, `PUT_YOUR_HARNESS_ACCOUNTID_HERE` and `PUT_YOUR_DELEGATE_TOKEN_HERE` with your delegate name (say `firstk8sdel`), Harness accountId, delegate token value respectively.

`PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` should be replaced by the Harness Manager Endpoint noted below. For Harness SaaS accounts, you can find your Harness Cluster Location in the Account Overview page under Account Settings section of the left navigation. For Harness CDCE, the endpoint varies based on the Docker vs. Helm installation options.

| Harness Cluster Location| Harness Manager Endpoint on Harness Cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/deploy-services/cdce-helm-k8s)  	 		| `http://<HARNESS_HOST>` if Docker Delegate is remote to CDCE  or  `http://host.docker.internal` if Docker Delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/deploy-services/cdce-helm-k8s)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running|

<h3> Apply Kubernetes Manifest </h3>

```
kubectl apply -f harness-delegate.yml
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="Docker">
```
<h3> Prerequisite </h3>

Ensure that you have the Docker runtime installed on your host. If not, use one of the following options to install Docker:

- [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
- [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Docker for Debian](https://docs.docker.com/engine/install/debian/)
- [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 

<h3> Install on Docker </h3>

Now you can install the delegate using the following command.

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
`PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` should be replaced by the Harness Manager Endpoint noted below. For Harness SaaS accounts, you can find your Harness Cluster Location in the Account Overview page under Account Settings section of the left navigation. For Harness CDCE, the endpoint varies based on the Docker vs. Helm installation options.

| Harness Cluster Location| Harness Manager Endpoint on Harness Cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/deploy-services/cdce-helm-k8s)  	 		| `http://<HARNESS_HOST>` if Docker Delegate is remote to CDCE  or  `http://host.docker.internal` if Docker Delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/deploy-services/cdce-helm-k8s)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running|

```mdx-code-block
</TabItem>
</Tabs>
```

## Verify Delegate Connectivity

Click Continue and in a few moments after the health checks pass, your Delegate will be available for you to use. Click Done and can verify your new Delegate is on the list.

### Helm Chart & Terraform Helm Provider
![Delegate Available](static/install-delegate/helm_available.png)

### Kubernetes Manifest
![Delegate Available](static/install-delegate/k8smanifest_available.png)

### Docker
![Delegate Available](static/install-delegate/docker_available.png)

You can now route communication to external systems in Harness connectors and pipelines by simply selecting this delegate via a delegate selector. 
