---
title: Common Delegate Scripts
description: Learn about Delegate Profile script availability and some common Delegate Profile scripts.
# sidebar_position: 2
helpdocs_topic_id: nxhlbmbgkj
helpdocs_category_id: 2p8b4otu10
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use the delegate`INIT_SCRIPT` environment variable to run startup scripts on the host, container, or pod on installation or restart.

For information on using the`INIT_SCRIPT` environment variable to run scripts, see [Run Initialization Scripts on Delegates](../../../account/manage-delegates/run-initialization-scripts-on-delegates.md).

This topic provides information on script availability and some common delegate scripts you can declare in the`INIT_SCRIPT` environment variable.

### Utilities

The delegate ships with `tar` and `cURL`. To use other utilities you'll need to add them to the beginning of your scripts.

For example, for `unzip` and `wget`:


```
microdnf install unzip  
microdnf install wget  
...
```
### Terraform


```
# Install TF  
microdnf install unzip  
curl -O -L https://releases.hashicorp.com/terraform/1.1.9/terraform_1.1.9_darwin_amd64.zip  
unzip terraform_1.1.9_darwin_amd64.zip  
mv ./terraform /usr/bin/  
# Check TF install  
terraform --version
```
#### Upgrade Terraform


```
##terraform update  
microdnf install unzip  
microdnf install wget  
set +x  
apt-get update  
apt-get install wget  
apt-get -y install git  
wget https://releases.hashicorp.com/terraform/1.1.9/terraform_1.1.9_darwin_amd64.zip apt-get install unzip  
unzip terraform_1.1.9_darwin_amd64.zip  
cp terraform /usr/bin/  
terraform --version
```
#### Install Terraform and Terragrunt


```
#Terraform  
microdnf install unzip  
microdnf install wget  
curl -O -L https://releases.hashicorp.com/terraform/1.1.9/terraform_1.1.9_darwin_amd64.zip  
unzip terraform_1.1.9_darwin_amd64.zip  
yes | mv ./terraform /usr/bin/  
# Check TF install  
terraform --version  
  
#Terragrunt  
microdnf install unzip  
microdnf install wget  
wget https://github.com/gruntwork-io/terragrunt/releases/download/v0.28.0/terragrunt_linux_amd64  
yes | mv terragrunt_linux_amd64 terragrunt  
chmod u+x terragrunt  
yes | mv terragrunt /usr/local/bin/terragrunt  
terragrunt --version
```
### Helm 2

Use the following script to install Helm 2 and Tiller in the delegate cluster:

If you are using remote Helm charts with your Harness Kubernetes Service, use the `helm init --client-only` option. For more information, see [Helm charts](../../../../continuous-delivery/kubernetes-deployments/use-a-helm-repository-with-kubernetes.md).
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
`DESIRED_VERSION` is used by a function in the [Helm install script](https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get).If Helm is being installed in a cluster outside of the Delegate's cluster ensure that the **kubeconfig** in the Delegate cluster is pointing to the correct cluster using:


```
kubectl config current-context cluster_name
```
If you are using TLS for communication between Helm and Tiller, ensure that you use the `--tls` parameter with your commands. For more information, see **Command Flags** in [Helm Deploy step](../../../../continuous-delivery/helm-deployment/4-helm-workflows.md) in the Helm Deployment guide, and see  [Using SSL Between Helm and Tiller](https://docs.helm.sh/using_helm/#using-ssl-between-helm-and-tiller) from Helm, and the section **Securing your Helm Installation** in that document.Here is an example of how to add a Helm chart from a private repo using secrets `repoUsername` and `repoPassword` from Harness [Secrets Management](../../../security/secrets-management/secret-management.md).


```
# Other installation method  
# curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh  
# chmod 700 get_helm.sh  
# ./get_helm.sh  
  
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get | bash  
  
helm init --client-only  
  
helm repo add --username ${secrets.getValue("repoUsername")} --password ${secrets.getValue("repoPassword")} nginx https://charts.bitnami.com/bitnami  
  
helm repo update
```
### Helm 3

You do not need to use the `INIT_SCRIPT` environment variable for Helm 3. Harness provides support for Helm 3 for delegates that connect to the target Kubernetes cluster.

For more information, see [Upgrade to Helm 3 Charts in Kubernetes Services](../../../../continuous-delivery/kubernetes-deployments/upgrade-to-helm-3-charts-in-kubernetes-services.md) and [Upgrade Native Helm 2 Deployments to Helm 3](../../../../continuous-delivery/helm-deployment/upgrade-native-helm-2-deployments-to-helm-3.md).

### Pip

Ensure that you run `apt-get update` before running any `apt-get` commands.
```
apt-get update  
# Install pip  
apt-get -y install python-pip  
# Check pip install  
pip -v
```
### Unzip

Ensure that you run `apt-get update` before running any `apt-get` commands.
```
apt-get update  
# Install Unzip  
apt-get install unzip
```
### AWS CLI

The following script installs the [AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html) on the Delegate host.


```
# Install AWS CLI  
microdnf install unzip  
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"  
unzip awscliv2.zip  
./awscli-bundle/install -b ~/bin/aws  
# install  
sudo ./aws/install  
# Check AWS CLI install  
aws --version
```
### AWS Describe Instance

The following script describes the EC2 instance based on its private DNS hostname, which is also the name in the Delegate's Hostname field:


```
aws ec2 describe-instances --filters "Name=network-interface.private-dns-name,Values=ip-10-0-0-205.ec2.internal" --region "us-east-1"
```
The value for the `Values` parameter is simply the Hostname of the Delegate.

### AWS List All Instances in a Region

The following script will list all of the EC2 instances in the region you supply:


```
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType,PrivateIpAddress,PublicIpAddress,Tags[?Key==`Name`].Value[]]' --region "us-east-1" --output json | tr -d '\n[] "' | perl -pe 's/i-/\ni-/g' | tr ',' '\t' | sed -e 's/null/None/g' | grep '^i-' | column -t
```
### Git CLI

Ensure that you run `apt-get update` before running any `apt-get` commands.
```
apt-get update  
# Install Git with auto approval  
yes | apt-get install git  
# Check git install  
git --version
```
### Cloud Foundry CLI

Harness supports Cloud Foundry CLI version 6 only. Support for version 7 is pending.See [Install Cloud Foundry CLI Versions on the Harness Delegate](../../../../continuous-delivery/pcf-deployments/install-cloud-foundry-cli-6-and-7-on-harness-delegates.md).

### Docker Installation

To install Docker on the Delegate, use the following script:


```
apt-get update  
apt-get install -y apt-utils dnsutils docker
```
Ensure that you run `apt-get update` before running any `apt-get` commands.

### PowerShell

You can run PowerShell scripts on a Harness Delegate, even though the Delegate must be run on Linux. Linux supports PowerShell using [PowerShell core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-7).

For steps on creating your script, see [Installing PowerShell on Linux](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-linux?view=powershell-7) from Microsoft.

Whatever scripts you run must be supported by the version of PowerShell you install.

Here is an example for Ubuntu 16.04:


```
# Download the Microsoft repository GPG keys  
wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb  
  
# Register the Microsoft repository GPG keys  
sudo dpkg -i packages-microsoft-prod.deb  
  
# Update the list of products  
sudo apt-get update  
  
# Install PowerShell  
sudo apt-get install -y powershell  
  
# Start PowerShell  
pwsh
```
If apt-get is not installed on your Delegate host, you can use snap (`snap install powershell --classic`). See [Install PowerShell Easily via Snap in Ubuntu 18.04](http://ubuntuhandbook.org/index.php/2018/07/install-powershell-snap-ubuntu-18-04/).

### Import a Self-Signed Certificate

See [Add Self-Signed Certificates for Delegate Connections](../../../account/manage-delegates/add-self-signed-certificates-for-delegate-connections.md).

