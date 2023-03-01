---
title: Install a delegate with third-party tool custom binaries
description: Use delegate environment variables to install a custom toolset on a delegate minimal image.
# sidebar_position: 2
helpdocs_topic_id: ql86a0iqta
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Delegates are packaged with third-party SDKs that support Kubernetes, Helm, and other Harness-integrated tools. The SDKs are included on the delegate image as binary files; depending on the tool, multiple binary versions are included. 

For a list of the SDK versions that are certified for different types of deployments, see [Delegate-required SDKs](/docs/platform/2_Delegates/delegate-reference/delegate-required-sdks.md).


##### Problem

Vulnerability scans detect unresolved vulnerabilities in older binary versions. You want to reduce vulnerabilities by the careful selection of binaries that do not include these vulnerabilities.

You might also want to install tools that Harness does not include.

##### Solution

To support this customization, Harness provides a delegate image without third-party SDKs. We call this image the "minimal" image.

Using the minimal image and delegate YAML, you can install the specific SDK versions you want. You can install software on the delegate using the `INIT_SCRIPT` environment variable in the delegate YAML.

This topic explains how to use the delegate minimal image and install specific SDK versions.

##### Required SDKs for Harness

If you use the minimal image, you must install certain SDKs so that Harness can perform its tasks. 

### Step 1: Edit delegate YAML

To install a delegate, you download its YAML file and run it in your environment.

Before you run the delegate, you edit the YAML file to change the following:

* Delegate environment variables
* Delegate image

These steps are below.

### Step 2: Add Harness-required SDKs

In the delegate container `spec`, use the `INIT_SCRIPT` environment variable to download the certified SDK versions required by Harness.

The SDKs you need to add depend on what type of deployment you are doing with Harness. For a list of the SDK versions that are certified for different types of deployments, see Delegate-required SDKs.

For more information on how to use the `INIT_SCRIPT` environment variable, see [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools.md).


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

