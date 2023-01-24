---
title: Update OpenShift CLI Binaries on Harness Delegates
description: Update the OpenShift CLI used by Harness.
sidebar_position: 220
helpdocs_topic_id: gol46jnpeh
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

When you install and run a new Harness Delegate, Harness defaults to OpenShift CLI version v4.2.16.

In some cases, you might want to use one a different binary. For example, you might want to use `oc` command options only available in a more recent version. 

Updating the OpenShift CLI is as simple as adding the binary to the Delegate host(s), changing the `OC_VERSION` environment variable, and then starting or restarting the Delegate.

In this topic:

* [Before You Begin](#before-you-begin)
* [Step 1: Download the OpenShift Binary](#step-1-download-the-openshift-binary)
* [Step 2: Update OC\_VERSION](#step-2-update-oc-version)
* [Step 3: Restart the Delegate](#step-3-restart-the-delegate)
* [See Also](#see-also)

## Before You Begin

* [Harness Delegate Overview](delegate-installation.md)
* [Using OpenShift with Harness Kubernetes](../../../continuous-delivery/kubernetes-deployments/using-open-shift-with-harness-kubernetes.md)

## Step 1: Download the OpenShift Binary

To install the OpenShift CLI (`oc`) binary on Linux or Windows, do the following.

Navigate to the [OpenShift Container Platform downloads page](https://access.redhat.com/downloads/content/290) on the Red Hat Customer Portal.

Select the appropriate version in the **Version** drop-down menu.

Click **Download Now** next to the **OpenShift v4.x Linux Client** or **OpenShift v4.x Windows Client** and save the file.

Unpack the archive (`tar xvzf <file>`).

Place the `oc` binary in a directory that is on your `PATH` (for example, `client-tools/oc/v4.x.x`).

## Step 2: Update OC\_VERSION

The host must have an exact match between the `OC_VERSION` value (typically, in the `.bashrc` file) and the path of the library in `client-tools/oc/$OC_VERSION`.

Update the `OC_VERSION` environment variable on the host system with the new version number.

If the version number is not added, Harness defaults to v4.2.16.

## Step 3: Restart the Delegate

Each type of Delegate uses a configuration file that you must use to restart your Delegate.

Here are the different types of Delegates and the configuration restart commands:

* **Kubernetes:** `kubectl apply -f harness-delegate.yaml`
* **Shell Script:** restart the Delegate with `./stop` and then `./start`.
* **Helm:** `helm install --name helm-delegate-doc harness/harness-delegate -f harness-delegate-values.yaml`
* **Docker:** `./launch-harness-delegate.sh`

## See Also

* [Using OpenShift with Harness Kubernetes](../../../continuous-delivery/kubernetes-deployments/using-open-shift-with-harness-kubernetes.md)

