---
title: Install a delegate with third-party tool custom binaries
description: Use environment variables to install a custom toolset on the delegate minimal image.
sidebar_position: 2
helpdocs_topic_id: ql86a0iqta
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Delegates are packaged with third-party SDKs that support Kubernetes, Helm, and other Harness-integrated tools. The SDKs are included on the delegate image as binary files; depending on the tool, multiple versions are included.

Harness provides a "minimal" delegate image that does not include third-party SDKs. You can use YAML to configure the minimal delegate image for the installation of the tools and versions you select. You can install software on the delegate using the `INIT_SCRIPT` environment variable.

For a list of the SDK versions that are certified for different types of deployments, go to [Delegate-required SDKs](/docs/platform/2_Delegates/delegate-reference/delegate-required-sdks.md).

## Use cases

The primary use cases for customization of the delegate image include:

- You want to use binaries that reduce your attack surface. Vulnerability scans detect unresolved vulnerabilities in older binary versions.

- You're interested in using tools that Harness does not include on the delegate image.

The remainder of this topic explains the process.

:::info note
The toolset you install on the delegate minimal image must include the SDKs that Harness requires to perform tasks.
:::

## Edit the delegate YAML

To install a delegate, you download its YAML file and run it in your environment.

Before you run the delegate, edit the YAML file to change the following:

* Delegate environment variables
* Delegate image
* Third-party tool custom binaries

:::info note
For delegate Helm chart deployments, add your third-party tool custom binaries to `initScript` in your `values.yaml` file to run them before delegate installation. The default [values.yaml](https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml) is located in the [delegate-helm-chart](https://github.com/harness/delegate-helm-chart) GitHub repo.
:::

## Add Harness-required SDKs

In the delegate container `spec`, use the `INIT_SCRIPT` environment variable to download the certified SDK versions that Harness requires.

The SDKs you need to add depend on the type of deployment. For a list of the SDK versions that are certified for different types of deployments, go to [Delegate-required SDKs](/docs/platform/2_Delegates/delegate-reference/delegate-required-sdks.md).

For more information on how to use the `INIT_SCRIPT` environment variable, go to [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md).

## Example Kubernetes manifest with required SDK downloads

The following delegate YAML contains examples of downloads for all Harness-required SDKs.

You can edit the YAML to include only the SDKs and versions Harness requires for your deployment type.

```yaml
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

You can modify the export `PATH` as needed using the following command:

```
export PATH=/opt/harness-delegate/custom-client-tools/:<path>
```

## Private Cloud Foundry (PCF)

PCF deployments require CLI 7. For installation instructions, go to [Install Cloud Foundry CLI versions on the Harness Delegate](/docs/platform/delegates/delegate-reference/common-delegate-profile-scripts/#cloud-foundry-cli/).

## Add your custom tools

In the delegate container `spec`, use the `INIT_SCRIPT` environment variable to download any additional tools you want to add.

## See also

* [Common delegate initialization scripts](/docs/platform/2_Delegates/delegate-reference/common-delegate-profile-scripts.md)
