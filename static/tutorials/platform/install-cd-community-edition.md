---
sidebar_position: 1
hide_table_of_contents: true
title: Install CD Community Edition
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

The CD Community Edition (CDCE) is the 100% free, source-available, self-managed edition of Harness CD that is designed for developers to deploy cloud-native services at the fastest velocity possible.  Developers can run CDCE on Docker or Kubernetes and then use CDCE to automate deployments to Kubernetes, Serverless Functions and many more deployment platforms. The [harness-cd-community](https://github.com/harness/harness-cd-community) repo houses these [docker-compose](https://github.com/harness/harness-cd-community/blob/main/docker-compose/harness) and [helm chart](https://github.com/harness/harness-cd-community/blob/main/helm) installers. 

```mdx-code-block
<Tabs>
<TabItem value="Docker">
```
<h3> Prerequisite </h3>

Ensure that you have the Docker runtime installed on your host. If not, use one of the following options to install Docker:

- [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
- [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Docker for Debian](https://docs.docker.com/engine/install/debian/)
- [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 

Now, you also need to make sure that you have enough resources to run the CD Community Edition.
- 2+ CPUs
- 3GB+ of free memory

If you are also running the Kubernetes embedded in the same Docker Desktop, then additional resources are needed since the embedded Kubernetes also consumes resources.
- 3+ CPUs
- 5GB+ of free memory

Finally, since you will be installing delegates at locations different than the machine hosting CDCE Docker app, you will need to make sure that your CDCE Docker app can correctly generate URLs for these remote delegates to talk to. You can do so by setting an environment variable `HARNESS_HOST` with public IP of the laptop/VM where CDCE Docker cluster is installed. For example:
```
export HARNESS_HOST="192.168.0.1"
```

If this variable is not set, then the default value of `host.docker.internal` is used.

<h3> Install CDCE on Docker </h3>

Now you can install the CDCE by executing the following commands.
```bash
git clone https://github.com/harness/harness-cd-community.git
cd harness-cd-community/docker-compose/harness
```
We can explictly pull the docker images first.
```
docker compose pull
```
Now let's start the CD Community Edition. 
```bash
docker compose up -d
```
Since multiple microservices need to come up, let's wait for 300 seconds before checking the health of the install.
```bash
docker compose run --rm proxy wait-for-it.sh ng-manager:7090 -t 300
```
Now we can see that all the various microservices are up and runnning.
```bash
docker compose ps
```

Open [http://localhost/#/signup](http://localhost/#/signup) (if your browser is running inside the host VM) or [http://HARNESS_HOST/#/signup](http://HARNESS_HOST/#/signup) (if your browser is running outside the host VM) and complete the registration form. Now your Harness CDCE account along with the first (admin) user is created. If you have already completed this step, then login to CDCE at [http://localhost/#/signin](http://localhost/#/signin) or [http://HARNESS_HOST/#/signin](http://HARNESS_HOST/#/signin).

Note that you can temporarily shut down CDCE if needed and bring it back up using the previous `up` command.
```bash
docker compose down
```

```mdx-code-block
</TabItem>
<TabItem value="Kubernetes">
```
<h3> Prerequisite </h3>

The CDCE helm chart is currently designed to run only on a single-node Kubernetes. For the purposes of this tutorial, we will use `minikube`.

<h4> Install  minikube </h4>

- On Windows: 
```bash
choco install minikube
```
- On macOS: 
```bash
brew install minikube
```

Now start minikube with the following config assuming Harness CDCE and a Harness Delegate (to be installed later in this tutorial) are the only two workloads you will run on this minikube. If you have other workloads running then you have to allocated more memory and cpu resources.
```bash
minikube start --memory 4g --cpus 4
```

Validate that you have kubectl access to your cluster.

```
kubectl get pods -A
```

<h4> Install helm </h4>

You should have [Helm v3](https://helm.sh/docs/intro/install/) installed on the machine from which you connect to your Kubernetes cluster. 

<h3> Install CDCE Helm Chart </h3>

You can now install the CDCE using a Helm Chart. First step is to clone the git repo.

```bash
git clone https://github.com/harness/harness-cd-community.git
cd harness-cd-community/docker-compose/harness
```

Since you will be installing delegates at locations different than the Kubernetes node hosting CDCE Helm app, you will need to make sure that your CDCE Kubernetes app can correctly generate URLs for these remote delegates to talk to. You can do so by setting the variable `HARNESS_HOST` with public IP of the Kubernetes node in the `values.yaml` of the helm chart prior to install. Note that the default listen_port is set to `7143`. 

Now you are ready to install the helm chart.
```
helm install harness ./harness --create-namespace --namespace harness
```
Since multiple microservices need to come up, let's wait for 900 seconds before checking the health of the install.
```bash
 kubectl wait --namespace harness --timeout 900s --selector app=proxy --for condition=Ready pods
```
We can check the health of the application we just installed.
```bash
kubectl get pods -n harness
kubectl get services -n harness
```

We need to forward the Kubernetes port to localhost to allow access from outside the cluster.
```
kubectl port-forward --namespace harness --address localhost svc/proxy 7143:80 9879:9879
```

Open [http://localhost:7143/#/signup](http://localhost:7143/#/signup) (if your browser is running inside the host VM) or [http://HARNESS_HOST:7143/#/signup](http://HARNESS_HOST:7143/#/signup) (if your browser is running outside the host VM) and complete the registration form. Now your Harness CDCE account along with the first (admin) user is created. If you have already completed this step, then login to CDCE at [http://localhost/#/signin](http://localhost:7143/#/signin) or [http://HARNESS_HOST:7143/#/signin](http://HARNESS_HOST:7143/#/signin).

```mdx-code-block
</TabItem>
</Tabs>
```