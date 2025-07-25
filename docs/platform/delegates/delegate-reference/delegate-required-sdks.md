---
title: Delegate-required SDKs
description: This topic provides information about the delegate-required development kits and libraries. These resources are listed by manifest type.
---

This topic provides information about the SDK versions that are packaged with Harness Delegate based on manifest type.

Note that based on your use case you can install other versions of the SDKs like helm or kubernetes but they may not be certified by harness.

## Latest SDK versions
Delegate's dockerfiles are public and for latest versions packaged with delegate please refer https://github.com/harness/delegate-dockerfile/blob/main/Dockerfile

## Kubernetes deployments

For Kubernetes deployments, include the SDKs and tools that your manifest type requires.

### Kubernetes

`kubectl` v1.28.7

```
mkdir -m 777 -p client-tools/kubectl/v1.28.7 \
  && curl -f -s -L -o client-tools/kubectl/v1.28.7/kubectl https://app.harness.io/public/shared/tools/kubectl/release/v1.28.7/bin/linux/$TARGETARCH/kubectl
```

`go-template` v0.4.8

```
mkdir -m 777 -p client-tools/go-template/v0.4.8 \
  && curl -f -s -L -o client-tools/go-template/v0.4.8/go-template https://app.harness.io/public/shared/tools/go-template/release/v0.4.8/bin/linux/$TARGETARCH/go-template
```

### Helm

`kubectl` v1.28.7

```
mkdir -m 777 -p client-tools/kubectl/v1.28.7 \
  && curl -f -s -L -o client-tools/kubectl/v1.28.7/kubectl https://app.harness.io/public/shared/tools/kubectl/release/v1.28.7/bin/linux/$TARGETARCH/kubectl
```

`helm` v3.13.3

```
mkdir -m 777 -p client-tools/helm/v3.13.3 \
  && curl -f -s -L -o client-tools/helm/v3.13.3/helm https://app.harness.io/public/shared/tools/helm/release/v3.13.3/bin/linux/$TARGETARCH/helm
```

### chartmuseum (chart stored in GCS or S3)

`kubectl` v1.28.7

```
mkdir -m 777 -p client-tools/kubectl/v1.28.7 \
  && curl -f -s -L -o client-tools/kubectl/v1.28.7/kubectl https://app.harness.io/public/shared/tools/kubectl/release/v1.28.7/bin/linux/$TARGETARCH/kubectl
```

`helm` v3.13.3

```
mkdir -m 777 -p client-tools/helm/v3.13.3 \
  && curl -f -s -L -o client-tools/helm/v3.13.3/helm https://app.harness.io/public/shared/tools/helm/release/v3.13.3/bin/linux/$TARGETARCH/helm
```

`chartmuseum` v0.15.0

```
 mkdir -m 777 -p client-tools/chartmuseum/v0.15.0 \
  && curl -f -s -L -o client-tools/chartmuseum/v0.15.0/chartmuseum https://app.harness.io/public/shared/tools/chartmuseum/release/v0.15.0/bin/linux/$TARGETARCH/chartmuseum
```

### OpenShift

`kubectl` v1.28.7

```
mkdir -m 777 -p client-tools/kubectl/v1.28.7 \
  && curl -f -s -L -o client-tools/kubectl/v1.28.7/kubectl https://app.harness.io/public/shared/tools/kubectl/release/v1.28.7/bin/linux/$TARGETARCH/kubectl
```

`oc` v4.15.25

```
mkdir -m 777 -p client-tools/oc/v4.15.25 \
  && curl -f -s -L -o client-tools/oc/v4.15.25/oc https://app.harness.io/public/shared/tools/oc/release/v4.15.25/bin/linux/$TARGETARCH/oc
```

### Terraform

`terraform-config-inspect` v.1.3

```
mkdir -m 777 -p client-tools/tf-config-inspect/v1.3 \
  && curl -f -s -L -o client-tools/tf-config-inspect/v1.3/terraform-config-inspect https://app.harness.io/public/shared/tools/terraform-config-inspect/release/v1.3/bin/linux/$TARGETARCH/terraform-config-inspect
```


### WinRm

`harness-pywinrm` v0.4-dev

```
mkdir -m 777 -p client-tools/harness-pywinrm/v0.4-dev \
  && curl -f -s -L -o client-tools/harness-pywinrm/v0.4-dev/harness-pywinrm https://app.harness.io/public/shared/tools/harness-pywinrm/release/v0.4-dev/bin/linux/$TARGETARCH/harness-pywinrm
```

### AKS and GKE infrastructure

`kubectl` v1.28.7

Add the following install scripts to the `INIT_SCRIPT` to install the credentials plugin for GKE and AKS infrastructure types if you're using `kubectl` version 1.26.x or later.

You can replace the `harness-credentials-plugin` with Azure CLI or `gke-gcloud-auth-plugin`to take care of this flow. For more details, go to [Authentication in GKE v1.26](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke).

```yaml
  - name: INIT_SCRIPT
    value: |

        ## for AKS
        mkdir -m 777 -p client-tools/kubelogin/v0.1.1 \
        && curl -s -L -o client-tools/kubelogin/v0.1.1/kubelogin https://app.harness.io/public/shared/tools/kubelogin/release/v0.1.1/bin/linux/amd64/kubelogin
        export PATH=/opt/harness-delegate/client-tools/kubelogin/v0.1.1/:$PATH

        ## for GKE or AKS with certificate auth type
        mkdir -m 777 -p client-tools/harness-credentials-plugin/v0.1.0 \
        && curl -s -L -o client-tools/harness-credentials-plugin/v0.1.0/harness-credentials-plugin https://app.harness.io/public/shared/tools/harness-credentials-plugin/release/v0.1.0/bin/linux/amd64/harness-credentials-plugin 
        export PATH=/opt/harness-delegate/client-tools/harness-credentials-plugin/v0.1.0/:$PATH
```

## Native Helm deployments

For native Helm deployments, include the following SDKs and tools.

### Helm Chart

`helm` v3.13.3

```
mkdir -m 777 -p client-tools/helm/v3.13.3 \
  && curl -f -s -L -o client-tools/helm/v3.13.3/helm https://app.harness.io/public/shared/tools/helm/release/v3.13.3/bin/linux/$TARGETARCH/helm
```

`kubectl` v1.28.7

Required if Kubernetes version is 1.16+.

```
mkdir -m 777 -p client-tools/kubectl/v1.28.7 \
  && curl -f -s -L -o client-tools/kubectl/v1.28.7/kubectl https://app.harness.io/public/shared/tools/kubectl/release/v1.28.7/bin/linux/$TARGETARCH/kubectl
```
