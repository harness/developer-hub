---
title: Build and set up a delegate with a minimal image type
description: This tutorial shows you how to build and set up a delegate with a minimal image type.
sidebar_label: Configure a delegate with the minimal image type
sidebar_position: 6
keywords: [delegate,delegate minimal image]
---

Harness recommends that you use the Harness Delegate minimal image (*`yy.mm.xxxxx.minimal`*) when you set up the Harness Platform for production use. This image has been thoroughly scanned and is free of any high or critical vulnerabilities. Users focused on security tend to prefer this option. 

However, the minimal delegate image lacks some binaries that are required for Continuous Deployment (CD) steps to function properly and remain vulnerability-free from third-party tools. Consequently, using the minimal delegate image requires you to configure your delegates and install necessary binaries. For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

The Harness Delegate minimal image (*`yy.mm.xxxxx.minimal`*) is a lighter, more secure version of the default Harness Delegate image. Its main purpose is to provide an enhanced security profile for users, especially those who prioritize their systems' security. The Harness Delegate minimal images includes the following features.

- **Security Scanned:** The image undergoes rigorous scanning processes to ensure that it is devoid of any high-risk or critical vulnerabilities. This makes it an optimal choice for organizations or users who have stringent security requirements.

- **Limited Binaries:** Unlike the standard delegate, the minimal image does not include all of the default binaries. While this contributes to its lightweight nature and security, it also means that users have additional responsibilities. They must manually configure and add any necessary binaries to make their setup functional.

- **User Responsibilities:** Because the minimal delegate image is devoid of the default binaries, users are in charge of tailoring it to their needs. This includes installing specific binaries essential for their CD steps. This level of control also allows users to maintain an updated environment. By installing the latest versions of necessary binaries, they can ensure that the delegate remains free from potential vulnerabilities found in outdated third-party tools.

- **Preferred by Security-Conscious Users:** Due to its clean security slate, many users who prioritize system security gravitate towards the minimal delegate image. By starting with a minimal setup and adding only what is necessary, they can maintain a tighter control over the software and tools present, thus minimizing potential security risks.

This tutorial shows you how to build and set up a minimal delegate image (*`yy.mm.xxxxx.minimal`*) for Harness CD.

## Prepare the delegate

1. Prepare your Dockerfile. For more information and instructions, go to [Build custom delegate images with third-party tools](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools/).

2. Set up Docker locally to be able to build in multiple architectures. For more information, go to [How to build x86 Docker images on an M1 Mac](https://blog.jaimyn.dev/how-to-build-multi-architecture-docker-images-on-an-m1-mac/).

3. Build and push
   
   ```
   docker buildx build --platform linux/amd64 --output type=docker .
   docker image ls
   docker tag 34594c2f0882 harness/delegate:yy.mm.xxxxx.harness.custom.x86.v4
   docker push harness/delegate:yy.mm.xxxxx.harness.custom.x86.v4
   ```

4. Update your delegate image in the manifest with the tag from the image you pushed in previous step. For more information, go to [Modify the delegate manifest](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools/#modify-the-delegate-manifest).


### Example delegate Dockerfile

```dockerfile
FROM harness/delegate:yy.mm.xxxxx.minimal
USER root
RUN microdnf install -y \
curl \
unzip \
python3 \
python3-pip \
which

# Install OpenSSL
RUN microdnf install openssl

# Install Kubectl
RUN mkdir /opt/harness-delegate/tools && cd /opt/harness-delegate/tools \
&& curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
&& chmod +x kubectl

# Install GoTemplate
RUN mkdir /opt/harness-delegate/client-tools/go-template \
&& mkdir /opt/harness-delegate/client-tools/go-template/v0.4.4 \
&& curl -s -L -o /opt/harness-delegate/client-tools/go-template/v0.4.4/go-template https://app.harness.io/public/shared/tools/go-template/release/v0.4.4/bin/linux/amd64/go-template \
&& chmod 755 /opt/harness-delegate/client-tools/go-template/v0.4.4/go-template

# Install Helm
RUN curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

# Install Terraform
RUN microdnf install yum && yum install -y yum-utils
RUN yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo \
&& microdnf install -y terraform

# Install Terragrunt
RUN cd /opt/harness-delegate/tools && curl -L "https://github.com/gruntwork-io/terragrunt/releases/download/v0.34.1/terragrunt_linux_amd64" -o terragrunt\
&& chmod +x terragrunt

ENV PATH=/opt/harness-delegate/tools/:$PATH

USER harness
```

:::info note

In this example, we have installed Terraform, Terragrunt, Kubernetes, Helm, and Go Template. These are the minimum capabilities required to use these steps in Harness.

:::

| Binary | Usage
| --- | --- |
| Terraform | The Terraform binary performs all Terraform steps. For more information, go to [Provision with the Terraform Apply step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step/). |
| Terragrunt | The Terragrunt binary performs all Terragrunt steps. This binary requires the installation of the Terraform binary. For more information, go to [Terragrunt provisioning](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos/). |
| Kubernetes (kubectl) | Harness uses this client tool to perform various Kubernetes activities during deployment. You can install the latest version, and Harness will be able to deploy with it. For more information, go to the [Kubernetes deployments overview](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview/).
| Helm | Harness uses this client tool to perform Helm deployments. You can install the latest version, and Harness will be able to deploy with it. For more information, go to the [Helm deployments overview](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart/).
| Go Template | Harness uses this binary to render Harness expressions and values into the `values.yaml` file and the main Kubernetes manifests. For more information, go to [Example Kubernetes manifests using Go templating](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/example-kubernetes-manifests-using-go-templating/).

## Example minimal delegate Kubernetes YAML

The following Kubernetes `minimal-delegate.yaml` file creates the minimal delegate resource on the cluster.

```yaml
apiVersion: v1  
kind: Namespace  
metadata:  
 name: harness-delegate-ng  
   
---  
   
apiVersion: rbac.authorization.k8s.io/v1  
kind: ClusterRoleBinding  
metadata:  
 name: harness-delegate-ng-cluster-admin  
subjects:  
 - kind: ServiceAccount  
   name: default  
   namespace: harness-delegate-ng  
roleRef:  
 kind: ClusterRole  
 name: cluster-admin  
 apiGroup: rbac.authorization.k8s.io  
   
---  
   
apiVersion: v1  
kind: Secret  
metadata:  
 name: custom-del-account-token  
 namespace: harness-delegate-ng  
type: Opaque  
data:  
 DELEGATE_TOKEN: ""  
   
---  
   
# If delegate needs to use a proxy, please follow instructions available in the documentation  
# https://developer.harness.io/docs/first-gen/firstgen-platform/account/manage-delegates/configure-delegate-proxy-settings/  
   
apiVersion: apps/v1  
kind: Deployment  
metadata:  
 labels:  
   harness.io/name: custom-del  
 name: custom-del  
 namespace: harness-delegate-ng  
spec:  
 replicas: 1  
 selector:  
   matchLabels:  
     harness.io/name: custom-del  
 template:  
   metadata:  
     labels:  
       harness.io/name: custom-del  
     annotations:  
       prometheus.io/scrape: "true"  
       prometheus.io/port: "3460"  
       prometheus.io/path: "/api/metrics"  
   spec:  
     terminationGracePeriodSeconds: 600  
     restartPolicy: Always  
     containers:  
     - image: foobar/org:custom-delegate  
       imagePullPolicy: Always  
       name: delegate  
       securityContext:  
         allowPrivilegeEscalation: false  
         runAsUser: 0  
       ports:  
         - containerPort: 8080  
       resources:  
         limits:  
           cpu: "0.5"  
           memory: "2048Mi"  
         requests:  
           cpu: "0.5"  
           memory: "2048Mi"  
       livenessProbe:  
         httpGet:  
           path: /api/health  
           port: 3460  
           scheme: HTTP  
         initialDelaySeconds: 10  
         periodSeconds: 10  
         failureThreshold: 2  
       startupProbe:  
         httpGet:  
           path: /api/health  
           port: 3460  
           scheme: HTTP  
         initialDelaySeconds: 30  
         periodSeconds: 10  
         failureThreshold: 15  
       envFrom:  
       - secretRef:  
           name: custom-del-account-token  
       env:  
       - name: JAVA_OPTS  
         value: "-Xms64M"  
       - name: ACCOUNT_ID  
         value:   
       - name: MANAGER_HOST_AND_PORT  
         value: https://app.harness.io/gratis  
       - name: DEPLOY_MODE  
         value: KUBERNETES  
       - name: DELEGATE_NAME  
         value: custom-del  
       - name: DELEGATE_TYPE  
         value: "KUBERNETES"  
       - name: DELEGATE_NAMESPACE  
         valueFrom:  
           fieldRef:  
             fieldPath: metadata.namespace  
       - name: INIT_SCRIPT  
         value: ""  
       - name: DELEGATE_DESCRIPTION  
         value: ""  
       - name: DELEGATE_TAGS  
         value: ""  
       - name: NEXT_GEN  
         value: "true"  
       - name: CLIENT_TOOLS_DOWNLOAD_DISABLED  
         value: "true"  
       - name: LOG_STREAMING_SERVICE_URL  
         value: "https://app.harness.io/gratis/log-service/"  
   
---  
   
apiVersion: v1  
kind: Service  
metadata:  
 name: delegate-service  
 namespace: harness-delegate-ng  
spec:  
 type: ClusterIP  
 selector:  
   harness.io/name: custom-del  
 ports:  
   - port: 8080
```

Run the following to apply it on the cluster.

```
kubectl apply -f minimal-delegate.yaml
```

## Next steps

Run your pipelines to validate the delegate image. Harness steps will use the installed tooling on the delegate to perform the deployment. 
