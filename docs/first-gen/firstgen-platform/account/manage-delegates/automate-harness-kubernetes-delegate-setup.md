---
title: Automate Harness Kubernetes Delegate Setup
description: Use a simple script to create Harness Kubernetes Delegates.
sidebar_position: 180
helpdocs_topic_id: up3w9d8zd0
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use a simple script to support GitOps scenarios where you want to name, configure, and install a Harness Kubernetes Delegate from a repo.

Developers often need to create Delegates in multiple cluster in their environments (DEV, UAT, SIT, STAGE, PROD, etc). This script method gives developers a quick alternative to using the manual process in the Harness Manager.

In this topic:

* [Before You Begin](#before-you-begin)
* [Step 1: Download the Base Delegate](#step-1-download-the-base-delegate)
* [Step 2: Create the Script](#step-2-create-the-script)
* [Step 3: Create a New Delegate](#step-3-create-a-new-delegate)
* [Step 4: Deploy the Delegate](#step-4-deploy-the-delegate)
* [Step 5: Add the Script and File to Your Repo](#step-5-add-the-script-and-file-to-your-repo)
* [Option 1: Deploy using the Script](#option-1-deploy-using-the-script)
* [Notes](#notes)
* [Next Steps](#next-steps)

## Before You Begin

* [Harness Delegate Overview](delegate-installation.md)

## Step 1: Download the Base Delegate

You will use one Harness Kubernetes Delegate as the base for all of the Delegates you generate automatically.

1. In Harness, click **Setup**, and then click **Harness Delegates**.
2. Click **Download Delegate**, and then click **Kubernetes YAML**. The Delegate settings appear.
3. Enter a name for the Delegate, select a Profile (the default is named **Primary**), and click **Download**.The name is limited to `^[a-z0-9-]+$` because it is a [StatefulSet](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names) name. Remember this when generating Delegates automatically.The harness-delegate-kubernetes.tar.gz file is downloaded.
4. Extract the file by double-clicking it or using the command `tar -zxvf harness-delegate-kubernetes.tar.gz`.

The **harness-delegate-kubernetes** folder is where you will save your script. The folder contains the harness-delegate.yaml file for the Delegate. Your script will use this file to create additional Delegate YAML files.

## Step 2: Create the Script

The script you will create uses harness-delegate.yaml to generate a new Delegate YAML file.

Each time you run the script, you will provide a new Delegate name.

Let's create the script:

1. In the **harness-delegate-kubernetes** folder, create a file and paste in the following script:

    ```
    SRC_FILE=harness-delegate.yaml  
    TMP_FILE=harness-delegate.tmp  
    DELEGATE_NAME=$1  
    if [ $# -lt 1 ]; then  
       echo "usage utils.sh <name>"  
       exit 0  
    fi  
    DST_FILE=harness-${DELEGATE_NAME}.yaml  
    if [ -f $DST_FILE ]; then  
      echo "File $DST_FILE exists. Exiting..."  
      exit 1  
    fi  
    if [ ! -f ${TMP_FILE} ]; then  
     echo "creating $TMP_FILE"  
     cp $SRC_FILE $TMP_FILE  
     dname=$(sed -n "1,/^.*harness.io.name/s?^.*harness.io/name: ??p" $TMP_FILE)  
     sed -i -e "s/$dname/DELEGATENAME/" $TMP_FILE  
    fi  
      
    echo "creating $DST_FILE"  
    cp $TMP_FILE $DST_FILE  
    sed -i -e "s/DELEGATENAME/${DELEGATE_NAME}/" $DST_FILE
    ```
2. Save the file and name it **utils.sh**.
3. Open a Terminal and navigate to the **harness-delegate-kubernetes** folder where you saved your script.
4. Enter the following command to make the utils.sh file executable:

    ```
    chmod a+x utils.sh
    ```

Now the script is ready to run.

## Step 3: Create a New Delegate

When you use the **utils.sh** script to generate a new Delegate YAML file, you will run the following command:


```
./utils.sh <name>
```
You will supply a name for the `<name>` parameter passed to the script.

There are many different conventions for naming the Delegate. Many customers use a combination of the following to create a unique Delegate name:

* environment prefix
* application name
* namespace

The name is limited to `^[a-z0-9-]+$` because it is a [StatefulSet](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names) name.

Here is an example using the name `mydelegate-dev` with utils.sh:


```
./utils.sh mydelegate-dev
```
The output is:


```
creating harness-delegate.tmp  
creating harness-mydelegate-dev.yaml
```
If you look in the harness-delegate-kubernetes folder you will see the new YAML file created using the name you provided: **harness-mydelegate-dev.yaml**.

If you open the file you will see that the Delegate spec uses the name you provided:


```
...  
apiVersion: apps/v1  
kind: StatefulSet  
metadata:  
  labels:  
    harness.io/app: harness-delegate  
    harness.io/account: lnfzrf  
    harness.io/name: mydelegate-dev  
  # Name must contain the six letter account identifier: lnfzrf  
  name: mydelegate-dev-lnfzrf  
  namespace: harness-delegate  
spec:  
  replicas: 1  
  selector:  
    matchLabels:  
      harness.io/app: harness-delegate  
      harness.io/account: lnfzrf  
      harness.io/name: mydelegate-dev  
...
```
A suffix such as `-lnfzrf` is a Harness convention for identifying the Harness account. Do not remove it.

## Step 4: Deploy the Delegate

To install the new Delegate you created with the script, do the following:

1. Log into your Kubernetes cluster.
2. Use `kubectl apply` as shown below:


    ```
    kubectl apply -f harness-mydelegate-dev.yaml 
    ```
The output is:


```
namespace/harness-delegate created  
clusterrolebinding.rbac.authorization.k8s.io/harness-delegate-cluster-admin created  
secret/mydelegate-dev-proxy created  
statefulset.apps/mydelegate-dev-sdqvgx created
```
## Step 5: Add the Script and File to Your Repo

You can now add the harness-delegate-kubernetes folder containing the script and harness-delegate.yaml to your repo.

Now your developers do not need to use the Harness Manager to create Delegates. They can use the utils.sh script in your repo to create new Delegates and then install them in their target cluster.

## Option 1: Deploy using the Script

If you want to use the utlis.sh script to both create and deploy the new Delegate, you can add the following line to the end the utlis.sh script:


```
kubectl apply -f $DST_FILE
```
Add this line before making the script executable, and then save the script and run `chmod a+x utils.sh` to make it executable.

Now you can copy the harness-delegate-kubernetes folder containing the script and harness-delegate.yaml to your cluster and simply run script using the new Delegate name:


```
./utils.sh <name>
```
The new Delegate is created and deployed in the cluster.

## Notes

* **Selectors and Scopes** — Harness does not support a way to automatically add Selectors or Delegate Scope for Delegates. Currently, you must add these attributes to Delegate manually in the Harness Manager.
* **Delete a Delegate** — To delete a Harness Delegate from your Kubernetes cluster, delete the StatefulSet for the Delegate. Deleting the pod without deleting the StatefulSet will result in the pod being recreated.  
For example, if you have the Delegate pod name `mydelegate-vutpmk-0`, you can delete the StatefulSet with the following command:  
`$ kubectl delete statefulset -n harness-delegate mydelegate-vutpmk`  
Note that the `-0` suffix in the pod name is removed for the StatefulSet name.

## Next Steps

* [Target Delegates to Specific Namespaces](enable-delegate-to-deploy-to-multiple-kubernetes-namespaces.md)

