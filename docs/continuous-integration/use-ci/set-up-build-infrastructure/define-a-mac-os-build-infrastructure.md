---
title: Define a MacOS Build Infrastructure
description: Currently, this feature is behind the Feature Flag CI_VM_INFRASTRUCTURE Contact Harness Support to enable the feature. This topic describes how to set up virtualization on MacOS hardware platforms to…
tags: 
   - helpDocs
sidebar_position: 40
helpdocs_topic_id: d79v3d2uwv
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `CI_VM_INFRASTRUCTURE` Contact [Harness Support](mailto:support@harness.io) to enable the feature.This topic describes how to set up virtualization on MacOS hardware platforms to run CI Pipelines. Once you complete this workflow, your Harness Pipelines can use VMs on your MacOS platform to test and build your software. You can also [define your MacOS build infrastructure in AWS](define-a-macos-build-infrastructure.md).

The following diagram shows the architecture of a CI build infrastructure on MacOS. The Delegate receives build requests from your Harness Manager. Then it forwards the requests to a Runner VM that starts, runs, and terminates the build VMs as needed.

![](./static/define-a-mac-os-build-infrastructure-19.png)

### Before You Begin

This topic assumes you're familiar with the following:

* [CI Pipeline Quickstart](../../ci-quickstarts/ci-pipeline-quickstart.md)
* [Delegates Overview](https://ngdocs.harness.io/article/2k7lnc7lvl-delegates-overview)
* [CI Stage Settings](../../ci-technical-reference/ci-stage-settings.md)
* [Learn Harness' Key Concepts](../../../getting-started/learn-harness-key-concepts.md)
* [VM Runner](https://docs.drone.io/runner/vm/overview/)

#### Prerequisites

* Harness recommends the following for a CI build infrastructure:
	+ Storage: 500GB or more.
	+ RAM: 16GB or more.
	+ CPU: 6 physical cores or more. You should be able to allocate at least 3 vCPUs per VM.
* This workflow uses [Anka software](https://docs.veertu.com/anka/intel/) by [Veertu](https://veertu.com/) to create and manage VMs in MacOS.
	+ Anka is [licensed](https://docs.veertu.com/anka/licensing/) software and requires a license key to activate. For a trial license, go to: <https://veertu.com/anka-build-trial/>
	+ Use Anka Build version 2.5.x. Anka Build 2.5.x requires MacOS 10.15, 11.x, or 12.x. For more info, see [Installing Anka](https://docs.veertu.com/anka/intel/getting-started/installing-the-anka-virtualization-package/) in the Veertu docs.
	+ If you want to set up your build infrastructure in AWS, Veertu maintains a set of Community AMIs that are preconfigured with all required hardware and software. See [Running on AWS EC2 Mac](https://docs.veertu.com/anka/intel/getting-started/aws-ec2-mac/) in the Veertu docs.

### Step 1: Set up the MacOS Host

* Install Anka Build 2.5.x. You can download an installer from <https://veertu.com/download-anka-build>.
* Open a CLI and fetch the OS installer needed to set up the VMs:
```
# get the list of installers  
softwareupdate --list-full-installers  
  
# fetch the latest version, such as 12.4, 12.3.1, etc.  
softwareupdate --fetch-full-installer --full-installer-version {VERSION}
```

* Activate your license key and accept the EULA. Here's an example session.
```
sudo anka license activate {LICENSE}  
# License activated. The fulfillment ID: {FULFILLMENT_ID}
```
* Save the fulfillment ID that gets returned. This ID will make it much easier to retrieve your license if (for example) your Mac machine becomes unusable or gets reset to its factory defaults. See [Licensing](https://docs.veertu.com/anka/licensing/) in the Veertu docs.

### Step 2: Create a Master VM

In this step, you will create the VM that the Harness Runner will use to create new VMs. See also [Getting Started](https://docs.veertu.com/anka/intel/getting-started/) in the Anka 2.5.x docs.

Note the following before you create this VM:

* For the `--ram-size`  , Harness recommends that you specify half the physical RAM on the host so it can run two VMs at once with reasonable performance. The following example assumes that the physical host has 16GB of RAM.
* To determine the path to your MacOS installer:
	+ Go to the Mac UI > Finder > Applications folder. You should see an installer such as **Install MacOS Monterey** in the list.
	+ Right-click on the Installer and choose New Terminal at Folder.
	+ In the terminal, enter `pwd`. Include the output as the `--app` argument value and include quotes if the path has spaces. For example: `--app "/Applications/Install macOS Monterey.app"`

To create the master VM, open a CLI window in the Mac UI and enter the following:


```
anka --debug  create {VM_NAME} --ram-size 8G --cpu-count 4 --disk-size 100G --app {PATH_TO_MACOS_INSTALLER}
```
This process can take an hour or more. There will be extended periods where the script doesn't generate any messages or notifications. Be patient and do not kill the process. To verify that the create process is still running, open a second CLI window and enter `ps`.When the script finishes, enter `anka list` and `anka show {VM_UUID}` to confirm that the VM was created and is running. To start a VM, enter `anka start {VM_NAME}`. Here's an example session:


```
anka list  
+---------------------+--------------------------------------+----------------------+---------+  
| name                | uuid                                 | creation_date        | status  |  
+---------------------+--------------------------------------+----------------------+---------+  
| harness-delegate-vm | bc7210af-8fe8-48cd-82af-a994f5cf1bea | Jun 13 14:07:18 2022 | running |  
+---------------------+--------------------------------------+----------------------+---------+  
  
# use the uuid shown in the ‘anka list’ output  
  
anka show bc7210af-8fe8-48cd-82af-a994f5cf1bea  
+---------+-----------------------------------------+  
| uuid    | bc7210af-8fe8-48cd-82af-a994f5cf1bea    |  
+---------+-----------------------------------------+  
| name    | harness-delegate-vm                     |  
+---------+-----------------------------------------+  
| created | Jun 13 14:07:18 2022                    |  
+---------+-----------------------------------------+  
| vcpu    | 4 - sys:0.2%, usr:0.1%, idle:99.7%      |  
+---------+-----------------------------------------+  
| memory  | 8G                                      |  
+---------+-----------------------------------------+  
| display | 1024x768 vnc://:admin@172.31.41.30:5901 |  
+---------+-----------------------------------------+  
| disk    | 100GiB (22.16GiB on disk)               |  
+---------+-----------------------------------------+  
| addons  | 2.5.5.143                               |  
+---------+-----------------------------------------+  
| network | shared 192.168.64.2                     |  
+---------+-----------------------------------------+  
| status  | running since Jun 13 16:17:43 2022      |  
+---------+-----------------------------------------+  

```
### Step 3: Set Up the VM on the Host

In the Mac UI, click the Launchpad button in the Dock (bottom). Then search for Anka (top) and click the Anka icon. The Welcome to Anka screen appears.

![](./static/define-a-mac-os-build-infrastructure-20.png)In the Welcome to Anka screen, click the button for the VM you just created on the right. This opens a VNC window for the VM.

![](./static/define-a-mac-os-build-infrastructure-21.png)


In the new VNC window, do the following:

* Open a CLI and install Homebrew and wget on the VM:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"   
brew install wget
```
* Open a browser window in the UI, go to the Docker website, and download Docker Desktop for Mac Intel Chip: <https://docs.docker.com/desktop/mac/install/>
* Run the Docker installer and accept the EULA that appears at the end of the install process.

![](./static/define-a-mac-os-build-infrastructure-22.png)

* In a CLI, enter the following to make sure that Docker is running correctly: `docker run hello-world`
* Install any additional tools that will be used by your builds on the VM, such Xcode.
* Harness recommends that you suspend the master VM after you set it up. This will speed up the creation of new VMs.
	+ On the VM, do this:
		- Quit Docker Desktop.
		- Open a CLI window and run the following:
		```
		docker kill $(docker ps -q)  
		docker stop
		```
	+ On the host, run the following: `anka suspend {VM_NAME}`

### Step 4: Install Docker Desktop and the Drone Runner on the Host

In the Mac UI, open a browser window in the UI, go to the Docker website, and download **Docker Desktop for Mac Intel Chip**: <https://docs.docker.com/desktop/mac/install/>

Run the installer and accept the Docker EULA that appears at the end of the install process.

Open a CLI and enter the following to make sure that Docker is installed and running: `docker run hello-world`

In the CLI, install tmux: `brew install tmux` 

In the browser window, go to the following page: <https://github.com/drone-runners/drone-runner-aws/releases>

 Download the latest **drone-runner-aws-darwin-amd64** executable:

![](./static/define-a-mac-os-build-infrastructure-23.png)Copy the binary from the Downloads folder and make sure it has the correct permissions to run. In a CLI, run the following:


```
mkdir ~/runner  
cd ~/runner  
cp ~/Downloads/drone-runner-aws-darwin-amd64 .  
chmod +x drone-runner-aws-darwin-amd64
```
### Step 5: Set Up Your Drone Environment on the Host

To start the Drone Runner, you need to specify your environment variables (`.env` file) and your runner pool definition (`pool.yml` file). You should save these in your `~/runner` folder.

#### Environment File

Your `.env` file should look like this:


```
DRONE_RUNNER_HOST=drone.runner.host  
DRONE_RUNNER_NAME=droneRunnerName  
DRONE_RUNNER_SECRET=bea26a2221fd8090ea38720fc445eca6  
DRONE_DEBUG=true  
DRONE_TRACE=true
```
`DRONE_DEBUG` and `DRONE_DEBUG` are optional. You can define the other settings as needed. The `DRONE_RUNNER_SECRET` is the [default secret](https://docs.drone.io/runner/vm/configuration/reference/drone-rpc-secret/) used by the Drone server to authenticate http requests.

#### Pool File

Your `pool.yml` file should look like this:


```
version: "1"  
instances:  
- name: osx-anka  
  default: true  
  type: anka     
  pool: 2      
  limit: 100    
  platform:  
    os: darwin  
    arch: amd64  
  spec:  
    account:  
      username: {ANKA_VM_USERNAME}  
      password: {ANKA_VM_PASSWORD}  
    vm_id: {VM_NAME}  

```
You can leave all fields at their defaults except for `username`, `password`, and `vm_id`. Note the `name` field: you will specify this name when you set up your Harness Pipeline.

### Step 6: Start the Drone Runner on the Host

In a CLI window, enter the following:


```
cd ~/runner  
brew install tmux  
tmux new -d './drone-runner-aws-darwin-amd64 delegate --envfile=.env --pool=pool.yml |& tee runner.log'
```
The Runner might take a few minutes before it is completely up and running. When it is ready, you will see output like this:


```
DEBU[4334] got IP 192.168.64.5 cloud=anka name=droneRunnerName--4037200794235010051 pool=osx-anka  
INFO[4335] Running script in VM cloud=anka name=droneRunnerName--4037200794235010051 pool=osx-anka
```
### Step 7: Install the Harness Delegate on the Host

In the Harness UI, go to the project where you want to install the Delegate.

Choose **Project Setup** > **Delegate** on the left. 

In the Project Delegates page, click **+New Delegate**.

Select **Docker** for the Delegate type. Click Continue. 

Enter a **Delegate Name** (must be unique). Click Continue.

Download the `docker-compose.yml` file.

Add the `extra-hosts` attribute and `RUNNER_URL` environment setting as follows:


```
version: "3.7"  
services:  
  harness-ng-delegate:  
    restart: unless-stopped  
    deploy:  
      resources:  
        limits:  
          cpus: "0.5"  
          memory: 2048M  
    image: harness/delegate:latest  
    # —---------------------------------------  
    extra_hosts:  
      - "host.docker.internal:host-gateway"  
    # ----------------------------------------  
    environment:  
      - ACCOUNT_ID=chPdAnQU6Xjm5MOD  
      - DELEGATE_TOKEN=0003d4379696997173fd0b996dd65b32  
      - MANAGER_HOST_AND_PORT=https://app.harness.io  
      - WATCHER_STORAGE_URL=https://app.harness.io/public/prod/premium/watchers  
      - WATCHER_CHECK_LOCATION=current.version  
      - DELEGATE_STORAGE_URL=https://app.harness.io  
      - DELEGATE_CHECK_LOCATION=delegateprod.txt  
      - CDN_URL=https://app.harness.io  
      - REMOTE_WATCHER_URL_CDN=https://app.harness.io/public/shared/watchers/builds  
      - DEPLOY_MODE=KUBERNETES  
        # —-----------------------------------------  
      - RUNNER_URL=http://host.docker.internal:3000/  
        # --------------------- --------------------  
      - DELEGATE_NAME=osx-delegate  
      - NEXT_GEN=true  
      - DELEGATE_DESCRIPTION=  
      - DELEGATE_TYPE=DOCKER  
      - DELEGATE_TAGS=  
      - PROXY_MANAGER=true  
      - INIT_SCRIPT=echo "Docker delegate init script executed."  

```
Save the modified `docker-compose.yml` file in your `~/runner` folder.

Start the Delegate. Run the following in the `/runner` folder:


```
docker-compose -f docker-compose.yml up -d
```
 

In the Harness UI > Delegate Setup wizard, click **Continue** and wait for your Harness instance to connect to the Delegate. It might take a few minutes to verify the Delegate.

Once it is verified, close the wizard.

### Step 8: Specify the Delegate in the Pipeline

In your Harness Project, go to a Pipeline that includes a Build Stage.

In the Infrastructure tab of the Build Stage, define your infrastructure as follows:

* Type = **AWS VMs**
* Pool Name = The `name` field in your `pool.yml` file.
* OS = **MacOS**

Your MacOS build infrastructure is set up. You can now run your Build Stages on your Mac platform. 

