---
title: Example Kubernetes manifests using Go templating
description: Use Go templating and variables in Kubernetes manifests.
sidebar_position: 7
helpdocs_topic_id: qvlmr4plcp
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to make your Kubernetes manifests reusable and dynamic using [Go templating](https://godoc.org/text/template) and Harness built-in variables.


## Basic values YAML and manifests for public image

This is a simple example using the Artifact reference `<+artifact.image>`. It can be used whenever the public image is not hardcoded in manifests.

See [Add Container Images as Artifacts for Kubernetes Deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments).

We use Go templates with a values.yaml file and manifests for deployment, namespace, and service. The manifests for deployment, namespace, and service are in a **templates** folder that's a peer of the values.yaml file.

<details>
<summary>values.yaml</summary>

This file uses the `image: <+artifact.image>` to identify the primary artifact added in the Harness Service Definition **Artifacts** section.

It also uses `name: <+stage.name>` to reference a Stage variable `name` and `namespace: <+infra.namespace>` to reference the namespace entered in the Stage's **Infrastructure Definition**. Service type and ports are hardcoded.

The name, image, and namespace values are referenced in the manifests described later.


```yaml
name: <+stage.name>  
replicas: 2  
  
image: <+artifact.image>  
# dockercfg: <+artifact.imagePullSecret>  
  
createNamespace: true  
namespace: <+infra.namespace>  
  
# Service Type allow you to specify what kind of service you want.  
# Possible values for ServiceType are:  
# ClusterIP | NodePort | LoadBalancer | ExternalName  
serviceType: LoadBalancer  
  
# A Service can map an incoming port to any targetPort.  
# targetPort is where application is listening on inside the container.  
servicePort: 80  
serviceTargetPort: 80  
  
# Specify all environment variables to be added to the container.  
# The following two maps, config and secrets, are put into a ConfigMap  
# and a Secret, respectively.  
# Both are added to the container environment in podSpec as envFrom source.  
env:  
  config:  
    key1: value10  
  secrets:  
    key2: value2
```
</details>

<details>
<summary>templates/deployment.yaml</summary>

The deployments manifest references the name and image values from values.yaml. The manifest also contains the ConfigMap and Secret objects.


```yaml
{{- if .Values.env.config}}  
apiVersion: v1  
kind: ConfigMap  
metadata:  
  name: {{.Values.name}}  
data:  
{{.Values.env.config | toYaml | indent 2}}  
---  
{{- end}}  
  
{{- if .Values.env.secrets}}  
apiVersion: v1  
kind: Secret  
metadata:  
  name: {{.Values.name}}  
stringData:  
{{.Values.env.secrets | toYaml | indent 2}}  
---  
{{- end}}  
  
{{- if .Values.dockercfg}}  
apiVersion: v1  
kind: Secret  
metadata:  
  name: {{.Values.name}}-dockercfg  
  annotations:  
    harness.io/skip-versioning: true  
data:  
  .dockercfg: {{.Values.dockercfg}}  
type: kubernetes.io/dockercfg  
---  
{{- end}}  
  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: {{.Values.name}}-deployment  
spec:  
  replicas: {{int .Values.replicas}}  
  selector:  
    matchLabels:  
      app: {{.Values.name}}  
  template:  
    metadata:  
      labels:  
        app: {{.Values.name}}  
    spec:  
      {{- if .Values.dockercfg}}  
      imagePullSecrets:  
      - name: {{.Values.name}}-dockercfg  
      {{- end}}  
      containers:  
      - name: {{.Values.name}}  
        image: {{.Values.image}}  
        {{- if or .Values.env.config .Values.env.secrets}}  
        envFrom:  
        {{- if .Values.env.config}}  
        - configMapRef:  
            name: {{.Values.name}}  
        {{- end}}  
        {{- if .Values.env.secrets}}  
        - secretRef:  
            name: {{.Values.name}}  
        {{- end}}  
        {{- end}}
```
</details>

<details>
<summary>templates/namespace.yaml</summary>

The namespace manifest references the namespace value from values.yaml.


```yaml
{{- if .Values.createNamespace}}  
apiVersion: v1  
kind: Namespace  
metadata:  
  name: {{.Values.namespace}}  
{{- end}}
```

</details>

<details>
<summary>templates/service.yaml</summary>

The service manifest references the hardcoded service type and ports from values.yaml.


```yaml
apiVersion: v1  
kind: Service  
metadata:  
  name: {{.Values.name}}-svc  
spec:  
  type: {{.Values.serviceType}}  
  ports:  
  - port: {{.Values.servicePort}}  
    targetPort: {{.Values.serviceTargetPort}}  
    protocol: TCP  
  selector:  
    app: {{.Values.name}}
```

</details>

## Private artifact example

When the image is in a private repo, you use the expression `<+artifact.imagePullSecret>` in the Secret and Deployment objects in your manifest.

This key will import the credentials from the Docker credentials file in the artifact.

It's much simpler to simple use the `<+artifact.imagePullSecret>` expression in the values.yaml file and then reference it in other manifests.

Using the values.yaml file above, we simply remove the comment in front of `dockercfg: <+artifact.imagePullSecret>`:


```yaml
name: <+stage.name>  
replicas: 2  
  
image: <+artifact.image>  
dockercfg: <+artifact.imagePullSecret>  
  
createNamespace: true  
namespace: <+infra.namespace>  
...
```

You don't need to make changes to the deployment manifest from earlier. It uses [Go templating](https://godoc.org/text/template) to check for the `dockercfg` value in values.yaml and applies it to Secret and Deployment.

If using the condition `{{- if .Values.dockercfg}}` to check for `dockercfg` in values.yaml.


```yaml
...  
{{- if .Values.dockercfg}}  
apiVersion: v1  
kind: Secret  
metadata:  
  name: {{.Values.name}}-dockercfg  
  annotations:  
    harness.io/skip-versioning: true  
data:  
  .dockercfg: {{.Values.dockercfg}}  
type: kubernetes.io/dockercfg  
---  
{{- end}}  
  
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: {{.Values.name}}-deployment  
spec:  
  replicas: {{int .Values.replicas}}  
  selector:  
    matchLabels:  
      app: {{.Values.name}}  
  template:  
    metadata:  
      labels:  
        app: {{.Values.name}}  
    spec:  
      {{- if .Values.dockercfg}}  
      imagePullSecrets:  
      - name: {{.Values.name}}-dockercfg  
      {{- end}}  
      containers:  
      - name: {{.Values.name}}  
        image: {{.Values.image}}  
...
```
## Quotation marks

The following example puts quotations around whatever string is in the `something` value. This can handle values that could otherwise be interpreted as numbers, or empty values, which would cause an error.


```yaml
{{.Values.something | quote}}
```
You should use single quotes if you are using a value that might contain a YAML-like structure that could cause issues for the YAML parser.

## Verbatim

Use `indent` and `toYaml` to put something from the values file into the manifest verbatim.


```go
{{.Values.env.config | toYaml | indent 2}}
```
## Indexing structures in templates

If the data passed to the template is a map, slice, or array it can be indexed from the template.

You can use `{{index x number}}` where `index` is the keyword, `x` is the data, and `number` is an integer for the `index` value.

If we had `{{index names 2}}` it is equivalent to `names[2]`. We can add more integers to index deeper into data. `{{index names 2 3 4}}` is equivalent to `names[2][3][4]`.

Expand below to see the YAML example.

<details>
<summary>YAML example</summary>

```yaml
{{- if .Values.env.config}}  
apiVersion: v1  
kind: ConfigMap  
metadata:  
 name: {{.Values.name}}-{{.Values.track}}  
 labels:  
 app: {{.Values.name}}  
 track: {{.Values.track}}  
 annotations:  
 harness.io/skip-versioning: "true"  
data:  
{{- if hasKey .Values.env .Values.track}}  
{{index .Values.env .Values.track "config" | mergeOverwrite .Values.env.config | toYaml | indent 2}}  
{{- else }}  
{{.Values.env.config | toYaml | indent 2}}  
{{- end }}  
---  
{{- end}}  
  
{{- if .Values.env.secrets}}  
apiVersion: v1  
kind: Secret  
metadata:  
 name: {{.Values.name}}-{{.Values.track}}  
 labels:  
 app: {{.Values.name}}  
 track: {{.Values.track}}  
stringData:  
{{- if hasKey .Values.env .Values.track}}  
{{index .Values.env .Values.track "secrets" | mergeOverwrite .Values.env.secrets | toYaml | indent 2}}  
{{- else }}  
{{.Values.env.secrets | toYaml | indent 2}}  
{{- end }}  
---  
{{- end}}
```
</details>

## Skip rendering of manifest files

In some cases, you might not want to use Go templating because your manifests use some other formatting.

Use the **Skip Rendering K8s manifest files** option in the [Kubernetes Apply](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step) step if you want Harness to skip rendering your manifest files using Go templating.

## Important notes

* [Harness Variables and Expressions](/docs/platform/Variables-and-Expressions/harness-variables) may be added to values.yaml, not the manifests themselves. This provides more flexibility.
* The values.yaml file used in a stage Service doesn't support Helm templating, only Go templating. Helm templating is fully supported in the remote Helm charts you add to your Service.
* Harness uses Go template version 0.4. If you're used to Helm templates, you can download Go template and try it out locally to find out if your manifests will work. This can help you avoid issues when adding your manifests to Harness.  
- You can install Go template version 0.4 locally to test your manifests.
	+ Mac OS: `curl -O https://app.harness.io/public/shared/tools/go-template/release/v0.4/bin/darwin/amd64/go-template`
	+ Linux: `curl -O https://app.harness.io/public/shared/tools/go-template/release/v0.4/bin/linux/amd64/go-template`
	+ Windows: `curl -O https://app.harness.io/public/shared/tools/go-template/release/v0.4/bin/windows/amd64/go-template`
	+ For steps on doing local Go templating, see [Harness Local Go-Templating](https://community.harness.io/t/harness-local-go-templating/460) on Harness Community.
* Harness uses an internal build of Go templating. It cannot be upgraded. Harness uses [Spring templates functions](http://masterminds.github.io/sprig/), excluding those functions that provide access to the underlying OS (env, expandenv) for security reasons.  
In addition, Harness uses the functions ToYaml, FromYaml, ToJson, FromJson.

