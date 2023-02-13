---
title: Install a delegate with third-party tool custom binaries
description: Use a Delegate image that includes no binaries and use the Delegate YAML environment variables to install the binaries you want.
# sidebar_position: 2
helpdocs_topic_id: ql86a0iqta
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness delegates include binaries for the third-party SDKs that are required for Harness-supported integrations including Kubernetes, Helm, and so on. The binaries are listed below in [Table: Certified SDK Versions for Deployment Types](#table_certified_sdk_versions_for_deployment_types).

Harness includes multiple binary versions to support customers using code that requires versions other than the latest.

##### Problem

Older binary versions might include minor vulnerabilities that are detected in vulnerability scans. You might want to avoid vulnerabilities by selecting the binary versions you install.

You might also want to install tools that Harness does not include.

##### Solution

To support this customization, Harness provides a delegate image that does not include any third-party SDK binaries. We call this image the minimal image.

Using the minimal image and delegate YAML, you can install the specific SDK versions you want. You can install software on the delegate using the `INIT_SCRIPT` environment variable in the delegate YAML.

This topic explains how to use the No Tools delegate image and install specific SDK versions.

##### Required SDKs for Harness

If you use the No Tools Image, you must install certain SDKs so that Harness can perform its tasks. These SDKs are covered in this topic and listed below in [Table: Certified SDK Versions for Deployment Types](#table_certified_sdk_versions_for_deployment_types).

### Step 1: Edit delegate YAML

To install a delegate, you download its YAML file and run it in your environment.

Before you run the delegate, you edit the YAML file to change the following:

* Delegate environment variables
* Delegate image

These steps are below.

### Step 2: Add Harness-required SDKs

In the delegate container `spec`, use the `INIT_SCRIPT` environment variable to download the certified SDK versions required by Harness.

The SDKs you need to add depend on what type of deployment you are doing with Harness.

For more information on how to use the `INIT_SCRIPT` environment variable, see [Run Initialization Scripts on Delegates](/docs/platform/2_Delegates/configure-delegates/run-scripts-on-delegates.md).

#### Table: Certified SDK versions for deployment types

The following table lists each of the certified SDKs for each deployment type.

You must add the certified SDKs for your deployment type. Harness requires these tools to perform tasks.

##### Kubernetes deployments

For Kubernetes deployments, include the SDKs and tools that your manifest type requires.



| **Manifest Type** | **Required Tool/SDK** | **Certified Version** | **Installation Command** |
| :-- | :-- | :-: | :-- |
| Kubernetes | `kubectl` | v1.24.3 | ```curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl```|
| | `go-template` | v0.4.1 | ```mkdir -p /opt/harness-delegate/client-tools/go-template/v0.4.1/ && curl -L https://app.harness.io/public/shared/tools/go-template/release/v0.4.1/bin/linux/amd64/go-template -o go-template && chmod +x ./go-template && mv go-template /opt/harness-delegate/client-tools/go-template/v0.4.1/go-template```|
| Helm | `kubectl` | v1.24.3 | ```curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl```|
|  | `helm` | v3.9.2 | ```curl -L0 https://get.helm.sh/helm-v3.9.2-linux-amd64.tar.gz -o helm-v3.9.2.tar.gz && tar -xvzf helm-v3.9.2.tar.gz && chmod +x ./linux-amd64/helm && mv ./linux-amd64/helm /opt/harness-delegate/custom-client-tools/helm3```|
| Helm (chart is stored in GCS or S3) | `kubectl` | v1.24.3 | ```curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl```|
|  | `helm` | v3.9.2 | ```curl -L0 https://get.helm.sh/helm-v3.9.2-linux-amd64.tar.gz -o helm-v3.9.2.tar.gz && tar -xvzf helm-v3.9.2.tar.gz && chmod +x ./linux-amd64/helm && mv ./linux-amd64/helm /opt/harness-delegate/custom-client-tools/helm3```|
|  | `chartmuseum` | v0.8.2 and v0.12.0 | ```curl -L https://app.harness.io/public/shared/tools/chartmuseum/release/v0.8.2/bin/linux/amd64/chartmuseum -o chartmuseum && chmod +x ./chartmuseum && mv chartmuseum /opt/harness-delegate/client-tools/chartmuseum/v0.8.2/chartmuseum && ## Install newer version of chartmuseum versiom from Harness CDN ## To use this version USE_LATEST_CHARTMUSEUM_VERSION should be enabled && curl -L https://app.harness.io/public/shared/tools/chartmuseum/release/v0.12.0/bin/linux/amd64/chartmuseum -o chartmuseum && chmod +x ./chartmuseum && mv chartmuseum /opt/harness-delegate/client-tools/chartmuseum/v0.12.0/chartmuseum && ## Install custom version of chartmuseum from official release## Binary should be moved to one of predefined paths:## /opt/harness-delegate/client-tools/chartmuseum/v0.8.2/chartmuseum ## /opt/harness-delegate/client-tools/chartmuseum/v0.12.0/chartmuseum && [If USE_LATEST_CHARTMUSEUM_VERSION is enabled] curl -L https://get.helm.sh/chartmuseum-v0.14.0-linux-amd64.tar.gz -o chartmuseum-v0.14.tar.gz && tar xzvf chartmuseum-v0.14.tar.gz && chmod +x ./linux-amd64/chartmuseum && mv ./linux-amd64/chartmuseum /opt/harness-delegate/client-tools/chartmuseum/v0.8.2/chartmuseum```|
| Kustomize | `kubectl` | v1.24.3 | ```curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectlmv kubectl /opt/harness-delegate/custom-client-tools/kubectl```|
|  | `kustomize` | v4.5.4 | ```curl -L0 https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv4.5.4/kustomize_v4.5.4_linux_amd64.tar.gz -o kustomize_v4.5.4.tar.gz && tar -xvzf kustomize_v4.5.4.tar.gz && chmod +x ./kustomize && mv kustomize /opt/harness-delegate/custom-client-tools/kustomize```|
| OpenShift | `kubectl` | v1.24.3 | ```curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl```|
|  | `oc` | v4 | ```curl -L0 https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz -o oc.tar.gz && tar -xvzf oc.tar.gz && chmod +x ./oc && mv oc /opt/harness-delegate/custom-client-tools/oc```|
| Terraform | `terraform-config-inspect` | v.1.0 | ```mkdir -p /opt/harness-delegate/client-tools/tf-config-inspect/v1.0/ && curl -L https://app.harness.io/storage/harness-download/harness-terraform-config-inspect/v1.0/linux/amd64/terraform-config-inspect -o terraform-config-inspect && chmod +x ./terraform-config-inspect && mv terraform-config-inspect /opt/harness-delegate/client-tools/tf-config-inspect/v1.0/terraform-config-inspect```|
|  |  | v.1.1 | ```mkdir -p /opt/harness-delegate/client-tools/tf-config-inspect/v1.1/ && curl -L https://app.harness.io/storage/harness-download/harness-terraform-config-inspect/v1.1/linux/amd64/terraform-config-inspect -o terraform-config-inspect && chmod +x ./terraform-config-inspect && mv terraform-config-inspect /opt/harness-delegate/client-tools/tf-config-inspect/v1.1/terraform-config-inspect```|
| WinRm | `harness-pywinrm` | v0.4-dev | ```## This library is available for download in CDNhttps://app.harness.io/public/shared/tools/harness-pywinrm/release/v0.4-dev/bin/linux/amd64/harness-pywinrm```|


##### Native Helm deployments

For Native Helm deployments, include the following SDKs/tools.



| **Manifest Type** | **Required Tool/SDK** | **Certified Version** | **Installation Command** |
| :-- | :-- | :--: | :-- |
| Helm Chart | helm | v3.9.2 | ```curl -L0 https://get.helm.sh/helm-v3.9.2-linux-amd64.tar.gz -o helm-v3.9.2.tar.gz && tar -xvzf helm-v3.9.2.tar.gz && chmod +x ./linux-amd64/helm && mv ./linux-amd64/helm /opt/harness-delegate/custom-client-tools/helm3```|
|  | kubectlRequired if Kubernetes version is 1.16+. | v1.24.3 | ```curl -LO https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl && chmod +x ./kubectl && mv kubectl /opt/harness-delegate/custom-client-tools/kubectl```|


#### Example of Kubernetes delegate manifest with required SDK downloads

The following delegate YAML contains examples of downloads for all Harness SDKs.

You can edit the YAML to include only the SDKs and versions Harness requires for your deployment type.


```
...  
        - name: DELEGATE_TYPE  
          value: "KUBERNETES"  
        - name: DELEGATE_NAMESPACE  
          valueFrom:  
            fieldRef:  
              fieldPath: metadata.namespace  
        - name: INIT_SCRIPT  
          value: |  
              
            ## Kubectl   
            curl -L0 https://dl.k8s.io/release/v1.24.3/bin/linux/amd64/kubectl -o kubectl  
            chmod +x ./kubectl  
            mv kubectl /usr/local/bin/
              
            ## Helm V3  
            curl -L0 https://get.helm.sh/helm-v3.9.2-linux-amd64.tar.gz -o helm-v3.9.2.tar.gz  
            tar -xvzf helm-v3.9.2.tar.gz  
            chmod +x ./linux-amd64/helm  
            mv ./linux-amd64/helm /usr/local/bin/ 
  
            ## Kustomize  
            curl -L0 https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv4.5.4/kustomize_v4.5.4_linux_amd64.tar.gz -o kustomize_v4.5.4.tar.gz  
            tar -xvzf kustomize_v4.5.4.tar.gz  
            chmod +x ./kustomize  
            mv kustomize /usr/local/bin/
  
            ## OpenShift OC  
            curl -L0 https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz -o oc.tar.gz  
            tar -xvzf oc.tar.gz  
            chmod +x ./oc  
            mv oc /usr/local/bin/ 
              
            ## go-template   
            mkdir -p /opt/harness-delegate/client-tools/go-template/v0.4.1/  
            curl -L0 https://app.harness.io/public/shared/tools/go-template/release/v0.4.1/bin/linux/amd64/go-template -o go-template  
            chmod +x ./go-template  
            mv go-template /usr/local/bin/
              
            curl -L https://get.helm.sh/chartmuseum-v0.14.0-linux-amd64.tar.gz -o chartmuseum-v0.14.tar.gz  
            tar xzvf chartmuseum-v0.14.tar.gz  
            chmod +x ./linux-amd64/chartmuseum  
            mv ./linux-amd64/chartmuseum /usr/local/bin/ 
              
            cd /opt/harness-delegate  
...
```

### Step 3: Add your custom tools

In the delegate container `spec`, use the `INIT_SCRIPT` environment variable to download any additional tools you want to add.


### See also

* [Common Delegate Initialization Scripts](/docs/platform/2_Delegates/delegate-reference/common-delegate-profile-scripts.md)

