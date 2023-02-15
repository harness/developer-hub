---
title: Common delegate initialization scripts
description: This functionality is limited temporarily to the platforms and settings you can see. More functionality for this feature in coming soon. This topic provides information on script availability and som…
# sidebar_position: 2
helpdocs_topic_id: auveebqv37
helpdocs_category_id: vm60533pvt
helpdocs_is_private: false
helpdocs_is_published: true
---

You can run scripts on Harness Delegate pods, hosts, and containers to install applications or run commands.

For more information about running scripts, see [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools.md). This topic provides information on script availability and some common delegate initialization scripts.

### Limitations

* When you edit or delete scripts, the binaries that were already installed by those scripts are not automatically removed. To remove them, you must restart or clean up the pod or VM.
* You cannot use Harness secrets in scripts. This is because the script runs before the delegate is registered with and establishes a connection to Harness.

### Review: What can I run In a script?

You can add any command that the host, container, or pod running the delegate supports. Linux shell commands are most common. If `kubectl`, Helm, or Docker is running on the host, container, or pod where you install the delegate, you can use those commands. Kubernetes and Docker delegates include Helm.

The base image for the delegate uses Ubuntu 18.04 or later. This means you can use any default Ubuntu package in delegate script.

#### Harness Delegate

Harness Delegate is packaged with `cURL` and `tar`.

#### When is the script executed?

Delegate scripts are applied under the following conditions:

* **New Delegate.** Scripts added on delegate creation run before the delegate starts.
* **Running Delegate.** Scripts applied during delegate runtime, either by application as a new script or by switching the Delegate’s current script, run on delegate restart, before the delegate reaches steady state.

### Terraform

Here is an example of a script for installing Terraform:

```
# Install TF  
curl -O -L  https://releases.hashicorp.com/terraform/0.12.25/terraform_0.12.25_linux_amd64.zip  
unzip terraform_0.12.25_linux_amd64.zip  
mv ./terraform /usr/bin/  
# Check TF install  
terraform --version
```

### Helm 2

The following script installs Helm and Tiller in the delegate cluster:

```
# Add the Helm version that you want to install  
HELM_VERSION=v2.14.0  
# v2.13.0  
# v2.12.0  
# v2.11.0  
  
export DESIRED_VERSION=${HELM_VERSION}  
  
echo "Installing Helm $DESIRED_VERSION ..."  
  
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get | bash  
  
# If Tiller is already installed in the cluster   
helm init --client-only  
  
# If Tiller is not installed in the cluster  
# helm init    
```
The `helm init` command is used with Helm 2 to install Tiller into a Kubernetes cluster. The command does not exist in Helm 3; nor is Tiller used in Helm 3.`DESIRED_VERSION` is used by a function in the [Helm install script](https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get).If Helm is installed in a different cluster than the delegate, make sure the `kubeconfig` in the delegate cluster references the correct cluster. Use the following command to set the context.


```
kubectl config current-context cluster_name
```

If you are using TLS for communication between Helm and Tiller, ensure that you use the `--tls` parameter with your commands. For more information, see [Using SSL Between Helm and Tiller](https://docs.helm.sh/using_helm/#using-ssl-between-helm-and-tiller) from Helm, and the section **Securing your Helm Installation** in that document.The following example shows how to add a Helm chart from a private repository using the secrets `repoUsername` and `repoPassword` from Harness [Text Secrets](../../6_Security/2-add-use-text-secrets.md). 


```
# Alternate installation method  
# curl https://raw.githubusercontent.com/helm/helm/master/scripts/get> get_helm.sh  
# chmod 700 get_helm.sh  
# ./get_helm.sh  
  
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get | bash  
  
helm init --client-only  
  
helm repo add --username <+secrets.getValue("repoUsername")> --password <+secrets.getValue("repoPassword")> nginx https://charts.bitnami.com/bitnami  
  
helm repo update
```
The `helm init` command does not exist in Helm 3. This command is used with Helm 2 to install Tiller into a Kubernetes cluster. Tiller is not used in Helm 3.### Helm 3

You do not need to add a script for Helm 3. Harness includes Helm 3 support in any Delegate that can connect to the target Kubernetes cluster.

### Pip

Run `microdnf update` before you run `microdnf` commands.
```
microdnf update  
# Install pip  
microdnf -y install python3-pip  
# Check pip install  
pip -v
```

### Unzip

Run `microdnf update` before you run `microdnf` commands.
```
microdnf update  
# Install Unzip  
microdnf install unzip
```

### AWS CLI

The following script installs the [AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html) on the delegate host.

```
# Install AWS CLI  
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"  
unzip awscliv2.zip  
./awscli-bundle/install -b ~/bin/aws  
# install  
./aws/install  
# Check AWS CLI install  
aws --version
```

### AWS describe instance

The following script describes the EC2 instance based on its private DNS hostname:

```
aws ec2 describe-instances --filters "Name=network-interface.private-dns-name,Values=ip-10-0-0-205.ec2.internal" --region "us-east-1"
```

The value for the `Values` parameter is the hostname of the delegate.

### AWS List All Instances in a Region

The following script lists all the EC2 instances in the region you specify:

```
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType,PrivateIpAddress,PublicIpAddress,Tags[?Key==`Name`].Value[]]' --region "us-east-1" --output json | tr -d '\n[] "' | perl -pe 's/i-/\ni-/g' | tr ',' '\t' | sed -e 's/null/None/g' | grep '^i-' | column -t
```

### Git CLI

Run `microdnf update` before you run`microdnf` commands.

```
microdnf update  
# Install Git with auto approval  
microdnf -y install git  
# Check git install  
git --version
```

### Cloud Foundry CLI

Harness supports Cloud Foundry (CF) CLI version 6 only. Support for version 7 is pending. Below is an example of CF CLI installation; the version of the CF CLI that you install on the delegate should match the PCF features you use in your Harness PCF deployment.

For example, if you are using buildpacks in the manifest.yml of your Harness service, the CLI you install on the delegate should be version 3.6 or later.

The following example script installs Cloud Foundry CLI on a delegate:

```
wget -O /etc/yum.repos.d/cloudfoundry-cli.repo https://packages.cloudfoundry.org/fedora/cloudfoundry-cli.repo  
  
microdnf -y install cf-cli
```
The `-y` parameter is needed for a prompt.

When the script has been applied and you click the timestamp for the Delegate the output will be similar to this:


```
Running transaction  
  Installing : cf-cli-6.46.1-1.x86_64                                       1/1   
  Verifying  : cf-cli-6.46.1-1.x86_64                                       1/1   
  
Installed:  
  cf-cli.x86_64 0:6.46.1-1                                                        
  
Complete!
```

For information on installing the CLI on different distributions, see [Installing the cf CLI](https://docs.pivotal.io/pivotalcf/2-3/cf-cli/install-go-cli.html) from PCF.


