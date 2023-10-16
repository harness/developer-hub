---
title: Delegate-required SDKs
description: This topic provides information about the delegate-required development kits and libraries. These resources are listed by manifest type.
---

This topic provides information about the SDK versions that are certified for use with Harness Delegate based on manifest type. 

The certified SDKs are a requirement for the delegate. Harness requires these tools to perform tasks.

## Kubernetes deployments

For Kubernetes deployments, include the SDKs and tools that your manifest type requires.

### Kubernetes

`kubectl` v1.24.3

```
curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl
```

`go-template` v0.4.1 

```
mkdir -p /opt/harness-delegate/client-tools/go-template/v0.4.1/ && curl -L https://app.harness.io/public/shared/tools/go-template/release/v0.4.1/bin/linux/amd64/go-template -o go-template && chmod +x ./go-template && mv go-template /opt/harness-delegate/client-tools/go-template/v0.4.1/go-template
```

### Helm 

`kubectl` v1.24.3 

```
curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl
```

`helm` v3.9.2 

```
curl -L0 https://get.helm.sh/helm-v3.9.2-linux-amd64.tar.gz -o helm-v3.9.2.tar.gz && tar -xvzf helm-v3.9.2.tar.gz && chmod +x ./linux-amd64/helm && mv ./linux-amd64/helm /opt/harness-delegate/custom-client-tools/helm3
```

### Helm (chart stored in GCS or S3) 

`kubectl` v1.24.3 

```
curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl
```

`helm` v3.9.2 

```
curl -L0 https://get.helm.sh/helm-v3.9.2-linux-amd64.tar.gz -o helm-v3.9.2.tar.gz && tar -xvzf helm-v3.9.2.tar.gz && chmod +x ./linux-amd64/helm && mv ./linux-amd64/helm /opt/harness-delegate/custom-client-tools/helm3
```

`chartmuseum` v0.8.2 and v0.12.0 

```
curl -L https://app.harness.io/public/shared/tools/chartmuseum/release/v0.8.2/bin/linux/amd64/chartmuseum -o chartmuseum && chmod +x ./chartmuseum 
  && mv chartmuseum /opt/harness-delegate/client-tools/chartmuseum/v0.8.2/chartmuseum 
  && ## Install newer version of chartmuseum versiom from Harness CDN ## 
        To use this version USE_LATEST_CHARTMUSEUM_VERSION should be enabled 
        && curl -L https://app.harness.io/public/shared/tools/chartmuseum/release/v0.12.0/bin/linux/amd64/chartmuseum -o chartmuseum 
        && chmod +x ./chartmuseum 
        && mv chartmuseum /opt/harness-delegate/client-tools/chartmuseum/v0.12.0/chartmuseum 
        && ## Install custom version of chartmuseum from official release## Binary should be moved to one of predefined paths:
           ## /opt/harness-delegate/client-tools/chartmuseum/v0.8.2/chartmuseum ## 
              /opt/harness-delegate/client-tools/chartmuseum/v0.12.0/chartmuseum 
        && [If USE_LATEST_CHARTMUSEUM_VERSION is enabled] 
           curl -L https://get.helm.sh/chartmuseum-v0.14.0-linux-amd64.tar.gz -o chartmuseum-v0.14.tar.gz 
        && tar xzvf chartmuseum-v0.14.tar.gz 
        && chmod +x ./linux-amd64/chartmuseum 
        && mv ./linux-amd64/chartmuseum /opt/harness-delegate/client-tools/chartmuseum/v0.8.2/chartmuseum
```

### Kustomize

`kubectl` v1.24.3 

```
curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectlmv kubectl /opt/harness-delegate/custom-client-tools/kubectl
```

`kustomize` v4.5.4 

```
curl -L0 https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv4.5.4/kustomize_v4.5.4_linux_amd64.tar.gz -o kustomize_v4.5.4.tar.gz && tar -xvzf kustomize_v4.5.4.tar.gz && chmod +x ./kustomize && mv kustomize /opt/harness-delegate/custom-client-tools/kustomize
```

### OpenShift 

`kubectl` v1.24.3 

```
curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl
```

`oc` v4

```
curl -L0 https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz -o oc.tar.gz && tar -xvzf oc.tar.gz && chmod +x ./oc && mv oc /opt/harness-delegate/custom-client-tools/oc
```

### Terraform 

`terraform-config-inspect` v.1.0 

```
mkdir -p /opt/harness-delegate/client-tools/tf-config-inspect/v1.0/ && curl -L https://app.harness.io/storage/harness-download/harness-terraform-config-inspect/v1.0/linux/amd64/terraform-config-inspect -o terraform-config-inspect && chmod +x ./terraform-config-inspect && mv terraform-config-inspect /opt/harness-delegate/client-tools/tf-config-inspect/v1.0/terraform-config-inspect
```

`terraform-config-inspect` v.1.1 

```
mkdir -p /opt/harness-delegate/client-tools/tf-config-inspect/v1.1/ && curl -L https://app.harness.io/storage/harness-download/harness-terraform-config-inspect/v1.1/linux/amd64/terraform-config-inspect -o terraform-config-inspect && chmod +x ./terraform-config-inspect && mv terraform-config-inspect /opt/harness-delegate/client-tools/tf-config-inspect/v1.1/terraform-config-inspect
```

### WinRm 

`harness-pywinrm` v0.4-dev 

This library is available for download from [CDN](https://app.harness.io/public/shared/tools/harness-pywinrm/release/v0.4-dev/bin/linux/amd64/harness-pywinrm).


## Native Helm deployments

For native Helm deployments, include the following SDKs and tools.


### Helm Chart 

`helm` v3.9.2 

```
curl -L0 https://get.helm.sh/helm-v3.9.2-linux-amd64.tar.gz -o helm-v3.9.2.tar.gz && tar -xvzf helm-v3.9.2.tar.gz && chmod +x ./linux-amd64/helm && mv ./linux-amd64/helm /opt/harness-delegate/custom-client-tools/helm3
```

`kubectl` v1.24.3 

Required if Kubernetes version is 1.16+. 

```
curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl
```

