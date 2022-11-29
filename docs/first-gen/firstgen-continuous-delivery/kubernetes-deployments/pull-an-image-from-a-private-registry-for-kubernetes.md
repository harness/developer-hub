---
title: Pull Images from Private Registries for Kubernetes
description: Import the credentials from the Docker credentials file.
sidebar_position: 40
helpdocs_topic_id: g3bw9z659p
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](/article/1fjmm4by22). Switch to [NextGen](/category/qfj6m1k2c4).Typically, If the Docker artifact source is in a private registry, Harness has access to that registry using the credentials set up in the Harness [Add Artifact Servers](/article/7dghbx1dbl-configuring-artifact-server).

In some cases, your Kubernetes cluster might not have the permissions needed to access a private Docker registry. For these cases, the default values.yaml file in Service **Manifests** section contains `dockercfg: ${artifact.source.dockerconfig}` . This key will import the credentials from the Docker credentials file in the artifact.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Use the dockercfg Value](#step_1_use_the_dockercfg_value)
* [Notes](#notes)
* [Next Steps](#next_steps)

### Before You Begin

Ensure you have reviewed and set up the following:

* [Kubernetes Deployments Overview](/article/wnr5n847b1-kubernetes-overview)
* [Add Container Images for Kubernetes Deployments](/article/6ib8n1n1k6-add-container-images-for-kubernetes-deployments)

### Step 1: Use the dockercfg Value

1. In your Harness Kubernetes Service, in **Manifests**, click **values.yaml**.
2. Verify that `dockercfg` key exists, and uses the `${artifact.source.dockerconfig}` expression to obtain the credentials:


```
dockercfg: ${artifact.source.dockerconfig}
```
1. Click the **deployment.yaml** file.
2. Verify that the Secret object is inside an `if` argument using `dockercfg` and the `{{.Values.dockercfg}}` value:


```
{{- if .Values.dockercfg}}  
apiVersion: v1  
kind: Secret  
metadata:  
  name: {{.Values.name}}-dockercfg  
  annotations:  
    harness.io/skip-versioning: "true"  
data:  
  .dockercfg: {{.Values.dockercfg}}  
type: kubernetes.io/dockercfg  
---  
{{- end}}
```
With these requirements met, the cluster import the credentials from the Docker credentials file in the artifact.

### Notes

* Any secrets in the manifest are sanitized when they are displayed in the deployment logs. See [Secrets and Log Sanitization](/article/o5ec7vvtju-secrets-and-log-sanitization).
* When you are using a public repo, the `dockercfg: ${artifact.source.dockerconfig}` in values.yaml is ignored by Harness. You do not need to remove it.
* If you want to use a private repo and no imagePullSecret, then set `dockercfg` to empty in values.yaml.
* **Legacy imagePullSecret Method** — Previously, Harness used a `createImagePullSecret` value in values.yaml that could be set to `true` or `false`, and `dockercfg: ${artifact.source.dockerconfig}` to obtain the credentials. If `createImagePullSecret` was set to `true`, the following default Secret object in deployment.yaml would be used:


```
{{- if .Values.createImagePullSecret}}  
apiVersion: v1  
kind: Secret  
metadata:  
  name: {{.Values.name}}-dockercfg  
  annotations:  
    harness.io/skip-versioning: "true"  
data:  
  .dockercfg: {{.Values.dockercfg}}  
type: kubernetes.io/dockercfg  
---  
{{- end}}
```
This legacy method is still supported for existing Services that use it, but the current method of using the default values.yaml and deployment.yaml files is recommended.

### Next Steps

* [Define Kubernetes Manifests](/article/2j2vi5oxrq-define-kubernetes-manifests)

