---
title: Delegate auto-update
description: Harness Delegate is installed with automatic updates enabled. Harness recommends that you accept automatic updates to the delegate image. If you prefer to disable auto-update, use one of the followin…
# sidebar_position: 2
helpdocs_topic_id: iusry91f4u
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegate is installed with automatic updates enabled. Harness recommends that you accept automatic updates to the delegate image. 

If you prefer to disable auto-update, use one of the following options:

* Modify the delegate YAML to prevent installation of the auto-update component.
* Suspend auto-updates to the installed delegate image.

**To suspend auto-update on an installed image**

1. Run the following command to suspend auto-update on the installed image:  
`kubectl patch cronjobs <job-name> -p '{"spec" : {"suspend" : true }}' -n <namespace>`
2. In the delegate manifest, locate the **CronJob** resource. In the resource `spec`, set the `suspend` field to `true`:   
`spec:`  
--`suspend: true`

**To prevent installation of the auto-update feature**

* Remove the `cronJob` section before you apply the manifest.

### Delegate YAML changes

Harness does not recommend the use of delegate images that are not current. However, if you require an earlier image version, check the repository on [Docker Hub](https://hub.docker.com/).

**To update the delegate YAML**

1. Replace **delegate name** with the name you gave your delegate. The Harness Delegate image is the latest release image by default.
2. Replace **account id** with your Harness account ID.

For an example of a complete Delegate YAML file, see [Example Kubernetes Manifest: Harness Delegate](../delegate-reference/example-kubernetes-manifest-harness-delegate.md).

