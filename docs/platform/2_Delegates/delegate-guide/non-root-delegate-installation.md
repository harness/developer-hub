---
title: Non-root delegate installation
description: By default, Harness Delegates use root access. You can install a different Docker image tag of the Delegate if you want to install and run the Delegate as non-root. Harness Delegate images are public…
# sidebar_position: 2
helpdocs_topic_id: h2kydm6qme
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

By default, Harness Delegates use root access. You can install a different Docker image tag of the Delegate if you want to install and run the Delegate as non-root.

Harness Delegate images are publicly hosted on [Docker Hub](https://hub.docker.com/r/harness/delegate/tags).This topic described how to install and run a Delegate as non-root.

In this topic:

* [Before You Begin](https://ngdocs.harness.io/article/h2kydm6qme-non-root-delegate-installation#before_you_begin)
* [Limitations](https://ngdocs.harness.io/article/h2kydm6qme-non-root-delegate-installation#limitations)
* [Step 1: Download the Delegate Config File](https://ngdocs.harness.io/article/h2kydm6qme-non-root-delegate-installation#step_1_download_the_delegate_config_file)
* [Option: Pick a Non-Root Type](https://ngdocs.harness.io/article/h2kydm6qme-non-root-delegate-installation#option_pick_a_non_root_type)
* [Step 2: Update the Delegate Image](https://ngdocs.harness.io/article/h2kydm6qme-non-root-delegate-installation#step_2_update_the_delegate_image)
* [Step 3: Install the Delegate](https://ngdocs.harness.io/article/h2kydm6qme-non-root-delegate-installation#step_3_install_the_delegate)
* [See Also](https://ngdocs.harness.io/article/h2kydm6qme-non-root-delegate-installation#see_also)

### Before You Begin

* [Delegate Requirements and Limitations](/article/k7sbhe419w-delegate-requirements-and-limitations)
* [Delegate Installation Overview](/article/re8kk0ex4k-delegate-installation-overview)

### Limitations

* The Harness Delegate does NOT require root account access. Kubernetes and Docker Delegates run as root by default.
* If you do not run the Delegate as root, be aware that you cannot install any software using a [Delegate Initialization Script](https://ngdocs.harness.io/article/auveebqv37-common-delegate-profile-scripts).

### Step 1: Download the Delegate Config File

Download the Delegate config file as part of its installation.

For examples, see:

* [Install a Docker Delegate](/article/cya29w2b99-install-a-docker-delegate)
* [Install a Kubernetes Delegate](/article/f9bd10b3nj-install-a-kubernetes-delegate)

### Option: Pick a Non-Root Type

Harness Delegate images are publicly hosted on [Docker Hub](https://hub.docker.com/r/harness/delegate/tags) and Harness has non-root options for different platforms:

![](https://files.helpdocs.io/i5nl071jo5/articles/h2kydm6qme/1646958490103/clean-shot-2022-03-10-at-16-27-28-2-x.png)Unless you are using OpenShift or a Universal Base Image (UBI), you will want to use to use `delegate:non-root`.

### Step 2: Update the Delegate Image

In the Delegate config file, update the image tag to use the non-root image: `harness/delegate:non-root`.

For example, here's the Docker Delegate config file updated:


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
    image: harness/delegate:non-root  
    environment:  
      - ACCOUNT_ID=xxx  
      - DELEGATE_TOKEN=xxx  
      - MANAGER_HOST_AND_PORT=https://app.harness.io  
      - WATCHER_STORAGE_URL=https://app.harness.io/public/prod/premium/watchers  
...
```
Here's the Kubernetes Delegate config file updated:


```
...  
---  
  
apiVersion: apps/v1  
kind: StatefulSet  
metadata:  
  labels:  
    harness.io/name: foo  
  name: foo  
  namespace: harness-delegate-ng  
spec:  
  replicas: 1  
  podManagementPolicy: Parallel  
  selector:  
    matchLabels:  
      harness.io/name: foo  
  serviceName: ""  
  template:  
    metadata:  
      labels:  
        harness.io/name: foo  
    spec:  
      containers:  
      - image: harness/delegate:non-root  
        imagePullPolicy: Always  
        name: harness-delegate-instance  
        ports:  
          - containerPort: 8080  
  
...
```
### Step 3: Install the Delegate

Install the Delegate as described in topics such as the following:

* [Install a Docker Delegate](/article/cya29w2b99-install-a-docker-delegate)
* [Install a Kubernetes Delegate](/article/f9bd10b3nj-install-a-kubernetes-delegate)

### See Also

* [Automate Delegate Installation](/article/9deaame3qz-automate-delegate-installation)

