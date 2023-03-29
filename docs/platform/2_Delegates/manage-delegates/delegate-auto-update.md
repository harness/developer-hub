---
title: Configure delegate auto-upgrade
description: Describes automatic upgrades for the Harness Delegate and options to disable them. 
sidebar_position: 3
helpdocs_topic_id: iusry91f4u
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegate is installed with automatic upgrades enabled. Harness recommends that you accept automatic upgrades to the delegate image. 

Delegate upgrades do not affect pipelines. Before an upgrade is performed, the delegate finishes the tasks that are underway. The delegate then gracefully shuts down. 

## Disable auto-upgrade

If you prefer to disable auto-upgrade, use one of the following options:

* Modify the delegate YAML to prevent installation of the auto-upgrade component.
* Suspend auto-upgrades to the installed delegate image.

**To suspend auto-upgrade on an installed image**

1. Run the following command to suspend auto-upgrade on the installed image:  
`kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>`
2. In the delegate manifest, locate the **CronJob** resource. In the resource `spec`, set the `suspend` field to `true`:   
`spec:`  
--`suspend: true`

**To prevent installation of the auto-upgrade feature**

* Remove the `cronJob` section before you apply the manifest.

### Update the delegate YAML

Harness does not recommend the use of delegate images that are not current. However, if you require an earlier image version, check the repository on [Docker Hub](https://hub.docker.com/).

**To update the delegate YAML**

1. Replace **delegate name** with the name you gave your delegate. The Harness Delegate image is the latest release image by default.
2. Replace **account id** with your Harness account ID.

For an example of a complete Delegate YAML file, see [Example Kubernetes Manifest: Harness Delegate](/docs/platform/2_Delegates/delegate-reference/YAML/example-kubernetes-manifest-harness-delegate.md).

