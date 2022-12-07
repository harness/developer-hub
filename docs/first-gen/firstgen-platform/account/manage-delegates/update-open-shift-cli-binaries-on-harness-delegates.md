---
title: Update OpenShift CLI Binaries on Harness Delegates
description: Update the OpenShift CLI used by Harness.
# sidebar_position: 2
helpdocs_topic_id: gol46jnpeh
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

When you install and run a new Harness Delegate, Harness defaults to OpenShift CLI version v4.2.16.

In some cases, you might want to use one a different binary. For example, you might want to use `oc` command options only available in a more recent version. 

Updating the OpenShift CLI is as simple as adding the binary to the Delegate host(s), changing the `OC_VERSION` environment variable, and then starting or restarting the Delegate.

In this topic:

* [Before You Begin](https://docs.harness.io/article/gol46jnpeh-update-open-shift-cli-binaries-on-harness-delegates#before_you_begin)
* [Step 1: Download the OpenShift Binary](https://docs.harness.io/article/gol46jnpeh-update-open-shift-cli-binaries-on-harness-delegates#step_1_download_the_open_shift_binary)
* [Step 2: Update OC\_VERSION](https://docs.harness.io/article/gol46jnpeh-update-open-shift-cli-binaries-on-harness-delegates#step_2_update_oc_version)
* [Step 3: Restart the Delegate](https://docs.harness.io/article/gol46jnpeh-update-open-shift-cli-binaries-on-harness-delegates#step_3_restart_the_delegate)
* [See Also](https://docs.harness.io/article/gol46jnpeh-update-open-shift-cli-binaries-on-harness-delegates#see_also)

### Before You Begin

* [Harness Delegate Overview](/article/h9tkwmkrm7-delegate-installation)
* [Using OpenShift with Harness Kubernetes](/article/p756zrn9vc-using-open-shift-with-harness-kubernetes)

### Step 1: Download the OpenShift Binary

To install the OpenShift CLI (`oc`) binary on Linux or Windows, do the following.

Navigate to the [OpenShift Container Platform downloads page](https://access.redhat.com/downloads/content/290) on the Red Hat Customer Portal.

Select the appropriate version in the **Version** drop-down menu.

Click **Download Now** next to the **OpenShift v4.x Linux Client** or **OpenShift v4.x Windows Client** and save the file.

Unpack the archive (`tar xvzf <file>`).

Place the `oc` binary in a directory that is on your `PATH` (for example, `client-tools/oc/v4.x.x`).

### Step 2: Update OC\_VERSION

The host must have an exact match between the `OC_VERSION` value (typically, in the `.bashrc` file) and the path of the library in `client-tools/oc/$OC_VERSION`.

Update the `OC_VERSION` environment variable on the host system with the new version number.

If the version number is not added, Harness defaults to v4.2.16.

### Step 3: Restart the Delegate

Each type of Delegate uses a configuration file that you must use to restart your Delegate.

Here are the different types of Delegates and the configuration restart commands:

* **Kubernetes:** `kubectl apply -f harness-delegate.yaml`
* **Shell Script:** restart the Delegate with `./stop` and then `./start`.
* **Helm:** `helm install --name helm-delegate-doc harness/harness-delegate -f harness-delegate-values.yaml`
* **Docker:** `./launch-harness-delegate.sh`

### See Also

* [Using OpenShift with Harness Kubernetes](/article/p756zrn9vc-using-open-shift-with-harness-kubernetes)

