---
title: Supported platforms and technologies
description: This topic lists Harness support for platforms, methodologies, and related technologies.
# sidebar_position: 2
helpdocs_topic_id: 1e536z41av
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists Harness support for platforms, methodologies, and related technologies for NextGen modules.

### Continuous Delivery (CD)

The following table lists Harness support for deployment platforms, artifacts, strategies, and related technologies.



<table class="blueTable">
<thead>
  <tr>
    <th> Deployment Type/Platform</th>
    <th> Artifact Servers and Repos</th>
    <th> Infrastructure</th>
    <th> Strategies</th>
    <th> Verification</th>
  </tr>
</thead>
<tbody>
  <tr valign="top">
    <td>
      <p> <a href="https://docs.harness.io/category/qfj6m1k2c4-cd-kubernetes-category">Kubernetes</a></p>
    </td>
    <td>
      <ul>
        <li>Docker Hub</li>
        <li>ECR</li>
        <li>GCR</li>
        <li>ACR</li>
        <li>Nexus 3 (Docker Repo)</li>
        <li>Artifactory (Docker Repo)</li>
        <li>Custom Repository</li>
        <li>Google Artifact Registry</li>
      </ul>
      <p> <strong>Manifest Resources:</strong></p>
      <ul>
        <li>Kustomize</li>
        <li>Helm (see Helm support below)</li>
        <li>OpenShift Template</li>
      </ul>
    </td>
    <td>
      <p> <strong>Static Infrastructure:</strong></p>
      <ul>
        <li>GKE</li>
        <li>AKS</li>
        <li>Other Kubernetes Compliant Clusters</li>
        <li>EKS</li>
        <li>OpenShift version 3.11, 4.x</li>
        <li>Minikube</li>
        <li>Kubernetes Operations (kops)</li>
      </ul>
      <p> <strong>Dynamic Infrastructure:</strong></p>
      <ul>
        <li>GKE using Terraform</li>
        <li>AWS EKS using CloudFormation</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Rolling</li>
        <li>Canary</li>
        <li>Blue/Green</li>
      </ul>
      <p>See <a href="#notes">Note on Kubernetes</a> for more deatils.</p>
    </td>
    <td>
      <p> <strong>Rolling:</strong></p>
      <ul>
        <li>Previous Analysis - Synthetic Load</li>
      </ul>
      <p> <strong>Canary:</strong></p>
      <ul>
        <li>Canary Analysis - Realtime Load</li>
      </ul>
      <p> <strong>Blue/Green:</strong></p>
      <ul>
        <li>Previous Analysis - Synthetic Load</li>
      </ul>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <p><a href="https://docs.harness.io/article/cifa2yb19a">Helm v3.0</a></p>
    </td>
    <td>
      <p> <strong>Docker Image Repo:</strong></p>
      <ul>
        <li>Docker Hub</li>
        <li>ECR</li>
        <li>GCR</li>
        <li>ACR</li>
        <li>Nexus 3 (Docker Repo)</li>
        <li>Artifactory (Docker Repo)</li>
        <li>Custom Repository</li>
      </ul>
      <p> <strong>Helm Chart Package Repo:</strong></p>
      <ul>
        <li>Artifactory (as a Helm HTTP Server)</li>
        <li>Nexus (as a Helm HTTP Server)</li>
        <li>OCI (as a Helm HTTP Server)</li>
        <li>AWS S3</li>
        <li>GCS</li>
        <li>HTTP Server</li>
      </ul>
      <p> <strong>Helm Source Repo:</strong></p>
      <ul>
        <li>Github</li>
        <li>GitLab</li>
        <li>Bitbucket</li>
        <li> Code Commit (Not Certified)</li>
        <li> Google Cloud Source Repository (Not Certified)</li>
      </ul>
    </td>
    <td>
      <p> <strong>Static Infrastructure:</strong></p>
      <ul>
        <li>GKE</li>
        <li>AKS</li>
        <li>Other Kubernetes Compliant Clusters</li>
        <li>EKS</li>
        <li>OpenShift v4.x</li>
        <li>Minikube</li>
        <li>Kubernetes Operations (kops)</li>
      </ul>
      <p> <strong>Dynamic Infrastructure:</strong></p>
      <ul>
        <li>GKE using Terraform</li>
        <li>AWS EKS using CloudFormation</li>
      </ul>
    </td>
    <td>
      <p> <strong>Using Harness Kubernetes:</strong></p>
      <ul>
        <li>Rolling</li>
        <li>Canary</li>
        <li>Blue/Green</li>
      </ul>
      <p> <strong>Using native Helm Command:</strong></p>
      <ul>
        <li>Basic along with steady state check</li>
      </ul>
    </td>
    <td>
      <p> Previous Analysis - Synthetic Load</p>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <p><a href="https://docs.harness.io/article/5fnx4hgwsa">Serverless Lambda</a></p>
    </td>
    <td>
      <ul>
        <li>Artifactory (ZIP files)</li>
        <li>AWS ECR (Docker images)</li>
      </ul>
    </td>
    <td>
      <p>AWS Lambda</p>
    </td>
    <td>
      <p>Rolling</p>
    </td>
    <td>
      <p> Previous Analysis - Synthetic Load</p>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <p> <a href="https://docs.harness.io/article/muegjde97q">Azure Web App</a></p>
    </td>
    <td>
      <p> <strong>Container and non-container:</strong></p>
      <ul>
        <li>Docker Registry</li>
        <li>Artifactory</li>
        <li>Azure Container Registry</li>
        <li>Nexus 3</li>
        <li>GCR</li>
        <li>AWS ECR</li>
      </ul>
    </td>
    <td>
      <p> <strong>Static Infrastructure:</strong><br/>Azure App Services</p>
    </td>
    <td>
      <ul>
        <li>Canary</li>
        <li>Blue/Green</li>
        <li>Basic</li>
      </ul>
    </td>
    <td>
      <p> <strong>Basic:</strong></p>
      <ul>
        <li>Previous Analysis - Synthetic Load</li>
      </ul>
      <p> <strong>Canary:</strong></p>
      <ul>
        <li>Canary Analysis - Realtime Load</li>
      </ul>
      <p> <strong>Blue/Green:</strong></p>
      <ul>
        <li>Previous Analysis - Synthetic Load</li>
      </ul>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <p> <a href="https://docs.harness.io/article/mpx2y48ovx">Secure Shell (SSH)</a></p>
    </td>
    <td>
      <p> <strong>Non-container:</strong></p>
      <ul>
        <li>Artifactory</li>
        <li>Nexus 3</li>
        <li>Custom</li>
        <li>Jenkins</li>
        <li>AWS S3</li>
      </ul>
    </td>
    <td>
      <p> <strong>Static Infrastructure:</strong></p>
      <ul>
        <li>AWS</li>
        <li>Physical Data Center (agnostic support for VMs on any platform)</li>
        <li>Azure</li>
        <li>GCP (Supported under Physical Data Center)</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Canary</li>
        <li>Rolling</li>
        <li>Basic</li>
      </ul>
    </td>
    <td>
      <p> <strong>Basic:</strong></p>
      <ul>
        <li>Previous Analysis - Synthetic Load</li>
      </ul>
      <p> <strong>Canary:</strong></p>
      <ul>
        <li>Canary Analysis - Realtime Load</li>
      </ul>
      <p> <strong>Rolling:</strong></p>
      <ul>
        <li>Previous Analysis - Synthetic Load</li>
      </ul>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <p> <a href="https://docs.harness.io/article/l8795ji7u3">Windows Remote Management (WinRM)</a></p>
    </td>
    <td>
      <p> <strong>Non-container:</strong></p>
      <ul>
        <li>Artifactory</li>
        <li>Nexus 3</li>
        <li>Custom</li>
        <li>Jenkins</li>
        <li>AWS S3</li>
      </ul>
    </td>
    <td>
      <p> <strong>Static Infrastructure:</strong></p>
      <ul>
        <li>AWS</li>
        <li>Physical Data Center (agnostic support for VMs on any platform)</li>
        <li>Azure</li>
        <li>GCP (Supported under Physical Data Center)</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Canary</li>
        <li>Rolling</li>
        <li>Basic</li>
      </ul>
    </td>
    <td>
      <p> Previous Analysis - Synthetic Load</p>
    </td>
  </tr>
  <tr valign="top">
    <td>
      <p> <a href="https://docs.harness.io/article/vytf6s0kwc">AWS ECS</a></p>
    </td>
    <td>
      <p> <strong>Non-container:</strong></p>
      <ul>
        <li>Docker Registry</li>
        <li>Artifactory</li>
        <li>Nexus 3</li>
        <li>Custom</li>
        <li>GCR</li>
        <li>ECR</li>
        <li>ACR</li>
      </ul>
    </td>
    <td>
      <p> <strong>Static Infrastructure:</strong></p>
      <ul>
        <li>AWS ECS</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Canary</li>
        <li>Rolling</li>
        <li>Blue/Green</li>
        <li>Blank</li>
      </ul>
    </td>
    <td>
      <p> <strong>Deployment Type - EC2:</strong></p>
      <ul>
        <li> <strong>Canary:</strong> Canary Analysis - Realtime Load</li>
        <li> <strong>Blue/Green:</strong> Previous Analysis - Synthetic Load</li>
        <li> <strong>Rolling:</strong> Previous Analysis - Synthetic Load</li>
      </ul>
      <p> <strong>Deployment Type - Fargate:</strong></p>
      <p>Same strategy support as EC2.</p>
      <p>For Fargate: The <code>complete-docker-id</code><br/>must be present in the monitoring provider.</p>
    </td>
  </tr>
</tbody>
</table>

#### Deployment notes

The following notes clarify support of some platform features.

##### Kubernetes

See [What Can I Deploy in Kubernetes?](https://docs.harness.io/article/efnlvytc6l-what-can-i-deploy-in-kubernetes).

##### Kubernetes version support

The following versions are tested and supported for Kubernetes Canary, Rolling, and Blue/Green deployments:

* 1.13.0
* 1.14.0
* 1.15.0
* 1.16.0
* 1.17.0
* 1.18.0
* 1.19.4
* 1.20.0
* 1.21.0
* 1.22.0
* 1.23.0
* 1.24.3

For details on other tools and version included in Harness, see [SDKs installed with the Delegate](#sd_ks_installed_with_the_delegate).

Guidelines:

* Harness will officially support 3 previous versions from the last stable release. For example, the current most recent stable release is 1.24.3, and so Harness supports 1.23, 1.22, and 1.21.
* Harness supports any other versions of Kubernetes you are using on a best effort basis.
* Harness commits to support new minor versions within 3 months of the first stable release. For example, if the stable release of 1.24.3 occurs on August 15th, we will support it for compatibility by November 15th.

##### Helm

Helm chart dependencies are not supported in Git source repositories (Harness [Code Repo Connectors](https://docs.harness.io/category/xyexvcc206)). Helm chart dependencies are supported in Helm Chart Repositories.

##### Artifact servers, repos, and artifacts

Harness uses **Metadata only** when downloading artifact sources.

For pulling Docker images from Docker repos, Harness has a limit of 10000 for private Docker repos, and 250 for public (no username or password required) Docker repos.

The following table lists Harness integrations and their artifact source support:



|  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | **Docker Hub** | **ECR** | **GCR** | **ACR** | **Artifactory** | **Nexus 3** | **Custom**  | **Google Artifact Registry** | **Github Artifact Registry** | **Jenkins** | **AWS S3** |
| **Kubernetes** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |
| **Helm** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  |  |
| **AWS ECS** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  |  |
| **Azure Web Apps** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  |  |  |
| **SSH** |  |  |  |  | ✅ | ✅ | ✅ |  |  | ✅ | ✅ |
| **WinRM** |  |  |  |  | ✅ | ✅ | ✅ |  |  | ✅ | ✅ |
| **Serverless** |  | ✅ |  |  | ✅ |  |  |  |  |  | ✅ |

##### Manifest and Config file Store Support

The following table lists where you can store your manifests or config files for each integration.



|  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | **Github** | **Gitlab** | **Bitbucket** | **Harness Filestore** | **Any Git** | **OCI Helm** | **HTTP Helm** | **AWS S3** | **Custom** | **Google Cloud Storage** | **Inherit from manifest** |
| **Kubernetes** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Values YAML** | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  | ✅ |  | ✅ |
| **Kustomize** | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  |  |  |  |
| **Kustomize****Patches** | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  |  |  | ✅ |
| **Openshift****Template** | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  | ✅ |  |  |
| **Openshift****Params** | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  | ✅ |  |  |
| **AWS ECS** | ✅ | ✅ | ✅ | ✅ | ✅ |  |  |  |  |  | ✅ |
| **Helm Chart** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Serverless.com** | ✅ | ✅ | ✅ |  | ✅ |  |  |  |  |  |  |
| **SSH** |  |  |  | ✅ |  |  |  |  |  |  |  |
| **WinRM** |  |  |  | ✅ |  |  |  |  |  |  |  |
| **Azure Web Apps** |  |  |  | ✅ |  |  |  |  |  |  |  |

##### Terraform version support

Harness does not include Terraform on the Harness Delegate. You must install Terraform on the Delegate when using Terraform in Harness. For more information, go to [Terraform How-tos](https://docs.harness.io/article/w6i5f7cpc9-terraform-how-tos).

Harness supports the following Terraform versions:

* v1.1.9
* v1.0.0
* v0.15.5
* v0.15.0
* v0.14.0

Some Harness features might require specific Terraform versions.

##### Azure AKS clusters

To use an AKS cluster for deployment, the AKS cluster must have local accounts enabled (AKS property `disableLocalAccounts=false`).

##### AWS and Azure GovCloud

Harness is now certified in Azure GovCloud and AWS GovCloud.

### GitOps

Harness GitOps lets you perform GitOps deployments in Harness. You define the desired state of the service you want to deploy in your Git manifest, and then use Harness GitOps to sync state with your live Kubernetes cluster.

GitOps supports the following:

* Source Repositories:
	+ All Git providers.
	+ HTTP Helm repos.
* Target clusters:
	+ Kubernetes clusters hosted on any platform:
		- GKE.
		- AKS.
		- EKS.
		- Other Kubernetes-compliant clusters.
		- OpenShift version 3.11, 4.x.
		- Minikube.
		- Kubernetes Operations (kops).
* Repository Certificates:
	+ TLS Certificate (PEM format).
	+ SSH Known Host Entry.
* GnuPG Keys:
	+ GnuPG Public Key Data (ASCII-armored).

See [Harness GitOps Basics](https://newdocs.helpdocs.io/article/w1vg9l1j7q-harness-git-ops-basics) and [Harness CD GitOps Quickstart](https://newdocs.helpdocs.io/article/pptv7t53i9-harness-cd-git-ops-quickstart)

### Continuous Integration (CI)

The following table lists Harness support for CI platforms, repos, registries, and related technologies.

<table>
  <thead>
    <tr>
      <th>Source Code Management (SCM)</th>
      <th>Artifact Repos</th>
      <th>Container Registries</th>
      <th>Build Farm Platforms</th>
      <th>Testing Frameworks Supported</th>
    </tr>
  </thead>
  <tbody>
    <tr valign="top">
      <td>
        <ul>
          <li>GitLab</li>
          <li>Bitbucket</li>
          <li>GitHub</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Artifactory</li>
          <li>AWS S3</li>
          <li>GCP GCS</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Amazon Elastic Container Registry (ECR)</li>
          <li>Google Container Registry (GCR)</li>
          <li>Docker registries (e.g. Docker Hub)</li>
          <li>Other</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Kubernetes cluster (platform agnostic)</li>
          <li>Amazon Elastic Kubernetes Service (Amazon EKS)</li>
          <li>Google Kubernetes Engine (GKE)</li>
          <li>AWS Linux and Windows VMs</li>
          <li>Red Hat OpenShift 4</li>
        </ul>
      </td>
      <td>
        <p>Currently, Harness supports:</p>
        <ul>
          <li>Bazel</li>
          <li>Maven</li>
          <li>Gradle</li>
        </ul>
        <p> More frameworks will be supported soon.</p>
      </td>
    </tr>
  </tbody>
</table>

 More frameworks will be supported soon. 

### Continuous Verification

Harness supports the following metrics and logging platforms.

#### Metrics providers

The following table lists Harness support for metrics platforms (APMs).



|  Metrics Provider Name |  Metric Pack |  Deployment Verification |
| --- | --- | --- |
| [AppDynamics](https://docs.harness.io/article/916vrl4l76-verify-deployments-with-app-dynamics) |  Business Transactions |  Yes |
| [AppDynamics](https://ngdocs.harness.io/article/916vrl4l76) |  JVM and Infra Metrics | Supported via Custom Metrics |
| [New Relic](https://docs.harness.io/article/p8lqq2il39-verify-deployments-with-new-relic) |  Business Transactions |  Yes |
|  New Relic |  Insights | Supported via Custom Metrics |
| [Google Cloud Operations (GCP)](https://docs.harness.io/article/owqpo59gp5-verify-deployments-with-google-cloud-operations) |  Infrastructure Metrics |  Yes |
|  Google Cloud Operations (GCP) |  Custom metrics from explorer | No |
| [Prometheus](https://ngdocs.harness.io/article/e9z7944qhw) |  Custom metrics from Prometheus |  Yes |
| [Datadog](https://ngdocs.harness.io/article/z3kpdn6vcb) |  Docker Infra Metrics |  Yes |
| [Dynatrace](https://ngdocs.harness.io/article/eamwqs2x5a) |  Performance |  Yes |

#### Log providers

Most logging platforms are also supported.



|  |  |
| --- | --- |
| **Log Provider Name** | **Deployment Verification** |
| [Splunk](https://docs.harness.io/article/mvjds2f3hb-verify-deployments-with-splunk) | Yes |
| [Google Cloud Operations (GCP)](https://docs.harness.io/article/owqpo59gp5-verify-deployments-with-google-cloud-operations) | Yes |

#### Custom health sources

Harness offers support for all major APM vendors and log providers, but there are cases where a customized APM or log provider is needed. The Custom Health Source lets you customize APMs and log providers of your choice.

See [Verify Deployments with Custom Health Source](https://docs.harness.io/article/n67y68fopr-verify-deployments-with-custom-health-metrics).

### Cloud Cost Management

#### Supported Kubernetes Management Platform

The following section lists the support for the Kubernetes management platform for CCM:



|  |  |  |
| --- | --- | --- |
| **Technology** | **Supported Platform** | **Pricing** |
| OpenShift 3.11 | GCP | GCP |
| OpenShift 4.3 | AWSOn-Prem | AWSCustom-rate\* |
| Rancher | AWS | Custom-rate\*\* |
| Kops (Kubernetes Operations) | AWS | AWS |
| Tanzu Kubernetes Grid Integrated Edition (TKGI) | On-Prem | Custom-rate\*\*\* |

\*Cost data is supported for On-Prem OpenShift 4.3. This uses a custom rate.

\*\*Cost data is supported for K8s workloads on AWS managed by Rancher, but the cost falls back to the custom rate.

\*\*\*Cost is computed using a custom rate. This can be modified by Harness on request.

#### Supported ingress controllers for Kubernetes AutoStopping

The following table lists the ingress controllers supported for Kubernetes AutoStopping:



|  |  |
| --- | --- |
| **Ingress Controller** | **Extent of Support** |
| Nginx ingress controller | Fully supported |
| HAProxy ingress controller | Fully supported |
| Traefik as ingress gateway | Supported using ingress routes and manually configured middlewares |
| Istio as API gateway | Fully supported |
| Ambassador as API gateway | Supported by manually editing the mapping |

#### Feature Support Matrix

This section lists the feature support matrix for the supported cloud platforms:

##### AWS Service



|  |  |  |  |
| --- | --- | --- | --- |
|  | **Inventory Dashboard** | **Recommendations** | **AutoStopping** |
| **EC2** | Yes | Coming soon | Yes (With Spot Orchestration) |
| **ECS** | Yes | Coming soon | Yes |
| **EKS** | Yes | Yes | Yes |
| **RDS** | Yes | No | Yes |
| **EBS** | Yes | No | No |
| **Snapshots** | Yes | No | NA |
| **Elastic** **IPs** | Yes | No | NA |
| **ASGs** | No | No | Yes (With Spot Orchestration) |

##### GCP Product



|  |  |  |  |
| --- | --- | --- | --- |
|  | **Inventory Dashboard** | **Recommendations** | **AutoStopping** |
| **GCE VMs** | Yes | Coming soon | Coming soon |
| **GKE** | Yes | Yes | Yes |

##### Azure Product



|  |  |  |  |
| --- | --- | --- | --- |
|  | **Inventory Dashboard** | **Recommendations** | **AutoStopping** |
| **Virtual Machine** | Coming soon | Coming soon | Yes (With Spot Orchestration) |
| **AKS** | Yes | Yes | Yes |

### Service Reliability Management

Harness supports the following Health Sources and Change Sources.

#### Health sources

 A Health Source monitors changes in health trends of the Service using metrics and logs collected from an APM and log provider respectively.

Harness offers support for all major APM vendors, but there are cases where a customized APM is needed. The [Custom Health Source](https://docs.harness.io/article/n67y68fopr-verify-deployments-with-custom-health-metrics) lets you customize APMs of your choice.

##### Metrics providers and logging tools

Currently, Harness supports the following APMs and logging tools:

* AppDynamics
* Prometheus
* Dynatrace
* Splunk
* Custom Health Source
* Google Cloud Operations (formerly Stackdriver)
* New Relic
* Datadog

More tools will be added soon.

#### Change sources

A Change Source monitors change events related to deployments, infrastructure changes, and incidents. Following Change Sources are supported:

* Harness CD NextGen
* Harness CD
* PagerDuty

### Security Testing Orchestration

See [Security Step Settings Reference](../security-testing-orchestration/sto-techref-category/security-step-settings-reference.md).

### Feature Flags

Harness Feature Flags support [client-side and server-side SDKs](../feature-flags/4-ff-sdks/1-sdk-overview/1-client-side-and-server-side-sdks.md) for a number of programming languages.

#### Client-side SDKs

The following table lists the Client-side Feature Flag SDKs Harness supports.



|  SDK |  Documentation |
| --- | --- |
| [Android](https://github.com/harness/ff-android-client-sdk) | [Android SDK Reference](../feature-flags/4-ff-sdks/2-client-sdks/1-android-sdk-reference.md) |
| [iOS](https://github.com/harness/ff-ios-client-sdk) | [iOS SDK Reference](../feature-flags/4-ff-sdks/2-client-sdks/3-ios-sdk-reference.md) |
| [Flutter](https://github.com/harness/ff-flutter-client-sdk) | [Flutter SDK Reference](../feature-flags/4-ff-sdks/2-client-sdks/2-flutter-sdk-reference.md) |
| [Javascript](https://github.com/harness/ff-javascript-client-sdk) | [Javascript SDK Reference](../feature-flags/4-ff-sdks/2-client-sdks/4-java-script-sdk-references.md) |
| [React Native](https://github.com/harness/ff-react-native-client-sdk) | [React Native SDK Reference](../feature-flags/4-ff-sdks/2-client-sdks/5-react-native-sdk-reference.md) |
| [Xamarin](https://github.com/harness/ff-xamarin-client-sdk) | [Xamarin SDK Reference](../feature-flags/4-ff-sdks/2-client-sdks/6-xamarin-sdk-reference.md) |

####  Server-side SDKs

The following table lists the Server-side Feature Flag SDKs Harness supports.



|  SDK |  Documentation |
| --- | --- |
| [.NET](https://github.com/harness/ff-dotnet-server-sdk) | [.NET SDK Reference](../feature-flags/4-ff-sdks/3-server-sdks/4-net-sdk-reference.md) |
| [Go](https://github.com/harness/ff-golang-server-sdk) | [Go SDK Reference](../feature-flags/4-ff-sdks/3-server-sdks/2-feature-flag-sdks-go-application.md) |
| [Java](https://github.com/harness/ff-java-server-sdk) | [Java SDK Reference](../feature-flags/4-ff-sdks/3-server-sdks/3-integrate-feature-flag-with-java-sdk.md) |
| [Node.js](https://github.com/harness/ff-nodejs-server-sdk) | [Node.js SDK Reference](../feature-flags/4-ff-sdks/3-server-sdks/5-node-js-sdk-reference.md) |
| [Python](https://github.com/harness/ff-python-server-sdk) | [Python SDK Reference](../feature-flags/4-ff-sdks/3-server-sdks/7-python-sdk-reference.md) |
| [Ruby](https://github.com/harness/ff-ruby-server-sdk) | [Ruby SDK Reference](../feature-flags/4-ff-sdks/3-server-sdks/8-ruby-sdk-reference.md) |
| [PHP](https://github.com/harness/ff-php-server-sdk) | [PHP SDK Reference](../feature-flags/4-ff-sdks/3-server-sdks/6-php-sdk-reference.md) |

### Harness Chaos Engineering

Perform chaos experiments on applications in your infrastructure, such as a Kubernetes cluster. Use predefined or custom, Workflow templates.

See [Harness Chaos Engineering Basics (Public Preview)](https://docs.harness.io/article/v64rj2maiz-harness-chaos-engineering-basics), [Harness Chaos Engineering Quickstart (Public Preview)](https://docs.harness.io/article/da85u0cbhx-harness-chaos-engineering-quickstart-public-preview).

### Collaboration

The following table lists Harness support for collaboration tools.

Most providers are used in both Pipeline Notification Strategies and User Group notifications:

* [Add a Pipeline Notification Strategy](https://docs.harness.io/article/4bor7kyimj-notify-users-of-pipeline-events)
* [Send Notifications Using Slack](https://docs.harness.io/article/h5n2oj8y5y-send-notifications-using-slack)
* [Send Notifications to Microsoft Teams](https://docs.harness.io/article/xcb28vgn82-send-notifications-to-microsoft-teams)



|  Provider Name |  Notification |  Approval/Change Management |
| --- | --- | --- |
| [Microsoft Teams](https://docs.harness.io/article/xcb28vgn82) |  Yes |  N/A |
| [Email](https://docs.harness.io/article/4bor7kyimj) |  Yes |  N/A |
| [Slack](https://docs.harness.io/article/h5n2oj8y5y) |  Yes |  N/A |
| [Jira](https://docs.harness.io/article/2lhfk506r8) |  Yes |  Yes |
| [ServiceNow](https://docs.harness.io/article/h1so82u9ub) |  N/A |  Yes |
| [PagerDuty](https://docs.harness.io/article/4bor7kyimj) |  Yes |  N/A |

### Access control

The following table lists Harness support for SSO protocols and tools.

See [Add and Manage Access Control](../feature-flags/1-ff-onboarding/3-ff-security-compliance/1-manage-access-control.md).



|  SSO Type |  SSO Providers |  Authentication Supported |  Authorization (Group Linking) Supported |  SCIM Provisioning |
| --- | --- | --- | --- | --- |
| [SAML 2.0](https://docs.harness.io/article/mlpksc7s6c) |  Okta |  Yes |  Yes |  Yes |
|  |  Azure Active Directory |  Yes |  Yes |  Yes |
|  |  Others |  Yes |  Yes | No |
|  |  OneLogin |  Yes |  Yes |  Yes |
| [OAuth 2.0](https://docs.harness.io/article/rb33l4x893) |  Github |  Yes |  No |  N/A |
|  |  GitLab |  Yes |  No |  N/A |
|  |  Bitbucket |  Yes |  No |  N/A |
|  |  Google |  Yes |  No |  N/A |
|  |  Azure |  Yes |  No |  N/A |
|  |  LinkedIn |  Yes |  No |  N/A |
| LDAP (Delegate connectivity needed) |  Active Directory |  Coming soon |  Coming soon |  N/A |
|  |  Open LDAP |  Coming soon |  Coming soon |  N/A |
|  |  Oracle LDAP |  Coming soon |  Coming soon |  N/A |

### Secret management

The following table lists Harness support for cloud platform secrets management services.

See [Harness Secrets Management Overview](https://docs.harness.io/article/hngrlb7rd6-harness-secret-manager-overview).

|  Provider Name |  Key Encryption Support |  Encrypted Data Storaged with Harness |  Support for Referencing Existing Secrets |
| --- | --- | --- | --- |
| [AWS KMS](https://docs.harness.io/article/pt52h8sb6z) |  Yes |  Yes |  No |
| [AWS Secret Manager](https://docs.harness.io/article/a73o2cg3pe) |  Yes |  No |  Yes |
| [Hashicorp Vault](https://docs.harness.io/article/s65mzbyags) |  Yes |  No |  Yes |
| [Azure Key Vault](https://docs.harness.io/article/53jrd1cv4i) |  Yes |  No |  Yes |
| [Google KMS](https://docs.harness.io/article/cyyym9tbqt) |  Yes |  Yes |  No |

### Harness Self-Managed Enterprise Edition

The following table lists the major support features for Harness Self-Managed Enterprise Edition offerings.



|  Solution |  Supported Platform |  Connected\* |  HA Supported\*\* |  Monitoring |  Disaster Recovery |  Auto Restart |  Features Under Controlled Release |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Kubernetes Cluster](https://docs.harness.io/category/v313myup55) |  Kubernetes - GKE - AKS - EKS |  Yes |  Yes | Prometheus, Grafana | Supported | Supported |  |
| [Virtual Machine (VM)](https://docs.harness.io/category/ubhcaw8n0l) |  Linux VM (3 VM minimum) |  Yes |  Yes | Prometheus, Grafana | Supported | Supported |  |

### SDKs installed with the Delegate

Harness Delegate includes binaries for the SDKs that are required for deployments with Harness-supported integrations. These include binaries for Helm, ChartMuseum, `kubectl`, Kustomize, and so on.

##### Kubernetes Deployments

For Kubernetes deployments, the following SDKs/tools are included in the Delegate.

* kubectl: v1.13, v1.19
* Helm: v2.13.1, v3.1.2, v3.8.0
* Kustomize: v3.5.4, v4.0.0
* OpenShift: v4.2.16

The versions can be found in this public GitHub repo: <https://github.com/harness/harness-core/tree/develop/960-api-services/src/main/java/io/harness/delegate/clienttools>

For details on updating the default tool versions, go to [Install Software on the Delegate with Initialization Scripts](https://docs.harness.io/article/yte6x6cyhn-run-scripts-on-delegates).

For Kubernetes deployments, the following SDKs/tools are certified.



|  |  |  |
| --- | --- | --- |
| **Manifest Type** | **Required Tool/SDK** | **Certified Version** |
| Kubernetes | kubectl | v1.24.3 |
|  | go-template | v0.4 |
| Helm | kubectl | v1.24.3 |
|  | helm | v3.9.2 |
| Helm (chart is stored in GCS or S3) | kubectl | v1.24.3 |
|  | helm | v3.9.2 |
|  | chartmuseum | v0.8.2 and v0.12.0 |
| Kustomize | kubectl | v1.24.3 |
|  | kustomize | v4.5.4 |
| OpenShift | kubectl | v1.24.3 |
|  | oc | v4 |

##### Native Helm deployments

For [Native Helm deployments](https://docs.harness.io/article/lbhf2h71at-native-helm-quickstart), the following SDKs/tools are certified.



|  |  |  |
| --- | --- | --- |
| **Manifest Type** | **Required Tool/SDK** | **Certified Version** |
| Helm Chart | helm | v3.9.2 |
|  | kubectlRequired if Kubernetes version is 1.16+. | v1.24.3 |

##### Install a Delegate with custom SDK and 3rd-party tool binaries

To support customization, Harness provides a Harness Delegate image that does not include any third-party SDK binaries. We call this image the No Tools Image.

Using the No Tools Image and Delegate YAML, you can install the specific SDK versions you want. You install software on the Delegate using the `INIT_SCRIPT` environment variable in the Delegate YAML.

For steps on using the No Tools Delegate image and installing specific SDK versions, see [Install a Delegate with 3rd Party Tool Custom Binaries](https://docs.harness.io/article/ql86a0iqta-install-a-delegate-with-3-rd-party-tool-custom-binaries).

### Supported browsers

The following browsers are supported:

* **Chrome**: latest version
* **Firefox**: latest version
* **Safari**: latest version
* All Chromium-based browsers.

Mobile browsers are not supported.

#### Supported screen resolution

Minimum supported screen resolution is 1440x900.

