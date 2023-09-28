---
title: Pull an image from a private registry for Kubernetes
description: This topic describes how to pull an image from a private registry and use the Docker credentials file.
sidebar_position: 6
helpdocs_topic_id: o1gf8jslsq
helpdocs_category_id: qfj6m1k2c4
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to pull an image from a private registry and use the Docker credentials file.

Typically, if the Docker image you are deploying is in a private registry, Harness has access to that registry using the credentials set up in the Harness [Connector](/docs/category/connectors).

In some cases, your Kubernetes cluster might not have the permissions needed to access a private Docker registry. For such cases, the values.yaml or manifest files in the service definition **Manifests** section must use the `dockercfg` or `dockerconfigjson` parameter.

If the Docker image is added in the service definition **Artifacts** section, then you reference it like this: `dockercfg: <+artifact.imagePullSecret>` or `dockerconfigjson: <+artifact.dockerConfigJsonSecret>`.

This key will import the credentials from the Docker credentials file in the artifact.


## Before you begin

Ensure you have reviewed and set up the following:

* [Kubernetes CD Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart)
* [Kubernetes Deployments Overview](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview)
* [Add Container Images as Artifacts for Kubernetes Deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments)

## Private repository authentication for container instances

When you are using private Docker images, you must authenticate with the repo to pull the image. The encrypted dockercfg file provides the credentials needed to authenticate.

The dockercfg file is located in the Docker image artifact. You reference this file in your values.yaml or manifests. Harness imports the credentials from the file to access the private repo.

## Use `dockercfg` in values.yaml

Open the values.yaml file you are using for deployment.

Verify that `dockercfg` key exists, and uses the `<+artifact.imagePullSecret>` expression to obtain the credentials:


```yaml
name: <+stage.variables.name>  
replicas: 2  
  
image: <+artifact.image>  
dockercfg: <+artifact.imagePullSecret>  
  
createNamespace: true  
namespace: <+infra.namespace>  
...
```

## Reference `dockercfg` in Kubernetes objects

For example, verify that the Deployment and Secret objects reference `dockercfg`: (`{{.Values.dockercfg}}`).


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

With these requirements met, the cluster imports the credentials from the Docker credentials file in the artifact.

## Values YAML and manifests

This is a simple example using the Artifact `<+artifact.image>` and `dockercfg` references.

We use Go templating with a values.yaml file and manifests for deployment, namespace, and service. The manifests for deployment, namespace, and service are in a **templates** folder that is a peer of the values.yaml file.

<details>
<summary>values.yaml</summary>

In addition to `<+artifact.image>` and `dockercfg` , this file also uses `name: <+stage.variables.name>` to reference a Stage variable `name` and `namespace: <+infra.namespace>` to reference the namespace entered in the Stage's **Infrastructure Definition**. Service type and ports are hardcoded.


```yaml
name: <+stage.variables.name>  
replicas: 2  
  
image: <+artifact.image>  
dockercfg: <+artifact.imagePullSecret>  
  
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
<summary>deployment.yaml</summary>


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
<summary>namespace.yaml and service.yaml</summary>

These files doe not use `dockercfg` but are included here because they are needed for the deployment.

namespace.yaml:


```yaml
{{- if .Values.createNamespace}}  
apiVersion: v1  
kind: Namespace  
metadata:  
  name: {{.Values.namespace}}  
{{- end}}
```
service.yaml:


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

## Notes

* When you are using a public repo, the `dockercfg: <+artifact.imagePullSecret>` in values.yaml is ignored by Harness. You do not need to remove it.
* If you want to use a private repo and no imagePullSecret, then set `dockercfg` to empty in values.yaml.
* If you want to use `dockerconfigjson` instead of `dockercfg` in the values.yaml file, then use `dockerconfigjson: <+artifact.dockerConfigJsonSecret>`.

## Next steps

* [Add Kubernetes Manifests](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/define-kubernetes-manifests)

