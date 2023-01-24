---
title: Use Go Templating in Kubernetes Manifests
description: Templatize your manifests.
sidebar_position: 60
helpdocs_topic_id: mwy6zgz8gu
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/qvlmr4plcp).To make your Kubernetes manifest reusable and dynamic, you can use [Go templating](https://godoc.org/text/template) and Harness built-in variables in combination in your **Manifests** files.

The inline values.yaml file used in a Harness Service does not support Helm templating, only Go templating. Helm templating is fully supported in the remote Helm charts you add to your Harness Service.

### Before You Begin

Ensue you are familiar with the following:

* [Define Kubernetes Manifests](define-kubernetes-manifests.md)

### Step 1: Review the Default Values File

Harness [variable expressions](https://docs.harness.io/article/9dvxcegm90-variables) may be added to values.yaml, not the manifests themselves. This provides more flexibility.

1. Look at the default values.yaml file to see the variables used in the default configuration files:

  ```
  # This will be used as {{.Values.name}}  
  name: harness-example  
    
  # This will be used as {{int .Values.replicas}}  
  replicas: 1  
    
  # This will be used as {{.Values.image}}  
  image: ${artifact.metadata.image}
  ```
  The variable `${artifact.metadata.image}` is a Harness variable for referencing the metadata of the Artifact Source. For more information about Harness variables, see [Variables and Expressions in Harness](https://docs.harness.io/article/9dvxcegm90-variables).

2. Look at the default object descriptions to understand how easy it is to use Kubernetes in Harness.

  ```
  apiVersion: v1 # for versions before 1.9.0 use apps/v1beta2  
  kind: ConfigMap # store non-confidential data in key-value pairs   
  metadata:  
    name: {{.Values.name}}-config # name is taken from values.yaml  
  data:  
    key: value # example key-value pair  
  ---  
  apiVersion: apps/v1  
  kind: Deployment # describe the desired state of the cluster  
  metadata:  
    name: {{.Values.name}}-deployment # name is taken from values.yaml  
  spec:  
    replicas: {{int .Values.replicas}} # tells deployment to run pods matching the template  
    selector:  
      matchLabels:  
        app: {{.Values.name}} # name is taken from values.yaml  
    template:  
      metadata:  
        labels:  
          app: {{.Values.name}} # name is taken from values.yaml  
      spec:  
        containers:  
        - name: {{.Values.name}} # name is taken from values.yaml  
          image: {{.Values.image}} # image is taken from values.yaml  
          envFrom:  
          - configMapRef:  
              name: {{.Values.name}}-config # name is taken from values.yaml  
          ports:  
          - containerPort: 80
  ```
  
  
### Step 2: Use Expression Builder

When you edit manifests in the Harness Service, you can enter expressions by entering `{{.` and Harness will fetch the values available in the values.yaml file.

![](./static/use-go-templating-in-kubernetes-manifests-206.png)

This expression builder helps to ensure that you do not accidentally enter an incorrect value in your manifests.

### Example 1: Use a Harness Variable in a Manifest

Harness built-in variables can be used in values.yaml file, and are evaluated at runtime. For a list of Harness variables, see [Variables and Expressions in Harness](https://docs.harness.io/article/9dvxcegm90-variables).

In the values.yaml file, it will look like this:


```
name: ${serviceVariable.serviceName}
```
In a manifest file, it will be used like this:


```
apiVersion: apps/v1  
kind: Deployment  
metadata:  
  name: {{.Values.name}} # ${serviceVariable.serviceName}  
spec:  
 selector:  
 matchLabels:  
 app: nginx  
 replicas: 1  
 template:  
 metadata:  
 labels:  
 app: nginx  
 spec:  
 containers:  
 - name: nginx  
 image: nginx:latest  
 ports:  
 - containerPort: 80
```
### Option: Skip Rendering of Manifest Files

By default, Harness uses Go templating and a values.yaml for templating manifest files. See [Use Go Templating in Kubernetes Manifests](use-go-templating-in-kubernetes-manifests.md).

In some cases, you might not want to use Go templating because your manifests use some other formatting.

To skip rendering your manifest files using Go templating, use the **Apply** step instead of the default Kubernetes Workflow steps (Rollout, Canary Deployment, Stage Deployment, etc) and its **Skip Rendering K8s manifest files** option.

See [Deploy Manifests Separately using Apply Step](deploy-manifests-separately-using-apply-step.md).

### Go Templating Examples

You can use piping and Go actions, arguments, pipelines, and variables in your manifests.

Let's look at some examples.

#### Quotation Marks

The following example puts quotations around whatever string is in the `something` value. This can handle values that could otherwise be interpreted as numbers, or empty values, which would cause an error.


```
{{.Values.something | quote}}
```
You should use single quotes if you are using a value that might contain a YAML-like structure that could cause issues for the YAML parser.

For example, using a [Service Config variables](using-harness-config-variables-in-manifests.md) or [Environment Service Override variable](override-harness-kubernetes-service-settings.md) to replace a value in the values.yaml file, and the evaluated replacement value has a `"`, `:` , or `'` in it:

`TOPIC_MAP: "foo:foo-1:foo-1-trigger"`

In this case, put single quotes around the value:

`TOPIC_MAP: '${serviceVariable.TOPIC_MAP}'`

#### Verbatim

Use `indent` and `toYaml` to put something from the values file into the manifest verbatim.


```
{{.Values.env.config | toYaml | indent 2}}
```
#### Indexing Structures in Templates

If the data passed to the template is a map, slice, or array it can be indexed from the template.

You can use `{{index x number}}` where `index` is the keyword, `x` is the data, and `number` is an integer for the `index` value.

If we had `{{index names 2}}` it is equivalent to `names[2]`. We can add more integers to index deeper into data. `{{index names 2 3 4}}` is equivalent to `names[2][3][4]`.

Let's look at an example:


```
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
#### Iterate Over Existing Items

Here is example inserting an element into an existing list in a manifest for Istio VirtualService and the Destination rule.

The critical line is:

`{{- range $track := split " " .Values.nonPrimary }}`

This line iterates over a list of existing items, where the list was computed with a simple [Shell Script](https://docs.harness.io/article/1fjrjbau7x-capture-shell-script-step-output) command and output to the context prior to the rollout.

VirtualService:


```
apiVersion: networking.istio.io/v1alpha3  
kind: VirtualService  
metadata:  
  name: {{ .Values.name }}-gateway-vs  
  labels:  
    app: {{ .Values.name }}  
    group: multiservice  
spec:  
  hosts:  
  - "*"  
  gateways:  
  - ingressgateway  
  http:  
{{- if .Values.nonPrimary }}  
{{- range $track := split " " .Values.nonPrimary }}  
{{- range $uri := $.Values.uri }}  
  - name: {{ $track }}  
    match:  
    - headers:  
        x-pcln-track:  
          exact: {{ $track }}  
      uri:  
        {{ $uri.matchType }}: {{ $uri.matchString }}  
{{- if $.Values.rewrite }}  
    rewrite:  
      uri: {{ $.Values.rewrite }}  
{{- end }}  
    route:  
    - destination:  
        host: {{ $.Values.name }}  
        subset: {{ $.Values.name }}-{{ $track }}  
{{- end }}  
{{- end }}  
{{- end }}  
{{- if .Values.hasPrimary }}  
  - name: primary  
    match:  
{{- range $uri := .Values.uri }}  
    - uri:  
        {{ $uri.matchType }}: {{ $uri.matchString }}  
{{- end }}  
{{- if .Values.rewrite }}  
    rewrite:  
      uri: {{ .Values.rewrite }}  
{{- end }}  
    route:  
    - destination:  
        host: {{ .Values.name }}  
        subset: {{ .Values.name }}-primary  
{{- end }}
```
DestinationRule:


```
apiVersion: networking.istio.io/v1alpha3  
kind: DestinationRule  
metadata:  
  name: {{ .Values.name }}  
  labels:  
    app: {{ .Values.name }}  
    group: multiservice  
spec:  
  host: {{ .Values.name }}  
  subsets:  
{{- if .Values.nonPrimary }}  
{{- range $track := split " " .Values.nonPrimary }}  
  - name: {{ $.Values.name }}-{{ $track }}  
    labels:  
      track: {{ $track }}  
{{- end }}  
{{- end }}  
{{- if .Values.hasPrimary }}  
  - name: {{ .Values.name }}-primary  
    labels:  
      track: primary  
{{- end }}
```
For more information, see the [Go text template documentation](https://golang.org/pkg/text/template/).

### Notes

* Harness uses Go template version 0.4. If you are used to Helm templating, you can download Go template and try it out locally to find out if your manifests will work. This can help you avoid issues when adding your manifests to Harness.  
You can install Go template version 0.4 locally to test your manifests.
	+ Mac OS: curl -O https://app.harness.io/public/shared/tools/go-template/release/v0.4/bin/darwin/amd64/go-template
	+ Linux: curl -O https://app.harness.io/public/shared/tools/go-template/release/v0.4/bin/linux/amd64/go-template
	+ Windows: curl -O https://app.harness.io/public/shared/tools/go-template/release/v0.4/bin/windows/amd64/go-templateFor steps on doing local Go templating, see [Harness Local Go-Templating](https://community.harness.io/t/harness-local-go-templating/460) on Harness Community.
* Harness uses an internal build of Go templating. It cannot be upgraded. Harness uses [Spring templates functions](http://masterminds.github.io/sprig/), excluding those functions that provide access to the underlying OS (env, expandenv) for security reasons.  
In addition, Harness uses the functions ToYaml, FromYaml, ToJson, FromJson.

### Next Steps

* [Adding and Editing Inline Kubernetes Manifest Files](adding-and-editing-inline-kubernetes-manifest-files.md)
* [Link Resource Files or Helm Charts in Git Repos](link-resource-files-or-helm-charts-in-git-repos.md)

