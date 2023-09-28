---
title: Supported Platforms and Technologies (FirstGen)
description: Harness supported platform matrix.
sidebar_position: 70
helpdocs_topic_id: 220d0ojx5y
helpdocs_category_id: 0v0om5p9af
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](../../getting-started/supported-platforms-and-technologies.md).This topic lists Harness support for platforms, methodologies, and related technologies.

### Deployments

The following table lists Harness support for deployment platforms, artifacts, strategies, and related technologies.

<table>
  <thead>
    <tr>
      <th> Deployment Type/Platform</th>
      <th> Artifact Servers and Repos</th>
      <th> Infrastructure</th>
      <th> Strategies</th>
      <th> Verification</th>
      <th> Post-Prod Rollback</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">
        <p> Kubernetes</p>
      </td>
      <td valign="top">
        <ul>
          <li>Docker Hub</li>
          <li>ECR</li>
          <li>GCR</li>
          <li>ACR</li>
          <li>Nexus 3 (Docker Repo)</li>
          <li>Artifactory (Docker Repo)</li>
          <li>Custom Repository</li>
        </ul>
        <p> Manifest Resources:</p>
        <ul>
          <li>Local and remote YAML</li>
          <li>Custom Resource Definitions (CRDs)</li>
          <li>Kustomize</li>
          <li>Helm (see Helm support below)</li>
          <li>OpenShift Template</li>
        </ul>
      </td>
      <td valign="top">
        <p> Static Infrastructure:</p>
        <ul>
          <li>GKE</li>
          <li>AKS</li>
          <li>Other Kubernetes Compliant Clusters</li>
          <li>EKS</li>
          <li>OpenShift version 3.11, 4.x</li>
          <li>Minikube</li>
          <li>Kubernetes Operations (kops)</li>
        </ul>
        <p> Dynamic Infrastructure:</p>
        <ul>
          <li>GKE using Terraform</li>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li>Rolling</li>
          <li>Canary</li>
          <li>Blue/Green</li>
        </ul>
      </td>
      <td valign="top">
        <p> Rolling:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
        <p> Canary:</p>
        <ul>
          <li>Canary Analysis - Realtime Load</li>
        </ul>
        <p> Blue/Green:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
      </td>
      <td valign="top">
        <p>Yes</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p>Helm v3.0</p>
      </td>
      <td valign="top">
        <p> Docker Image Repo:</p>
        <ul>
          <li>Docker Hub</li>
          <li>ECR</li>
          <li>GCR</li>
          <li>ACR</li>
          <li>Nexus 3 (Docker Repo)</li>
          <li>Artifactory (Docker Repo)</li>
          <li>Custom Repository</li>
        </ul>
        <p> Helm Chart Package Repo:</p>
        <ul>
          <li> Artifactory (as an HTTP Server)</li>
          <li> Nexus (as an HTTP Server)</li>
          <li>AWS S3</li>
          <li>GCS</li>
          <li>HTTP Server</li>
        </ul>
        <p> Helm Source Repo:</p>
        <ul>
          <li>Github</li>
          <li>GitLab</li>
          <li>Bitbucket</li>
          <li> Code Commit (Not Certified)</li>
          <li> Google Cloud Source Repository (Not Certified)</li>
        </ul>
      </td>
      <td valign="top">
        <p> Static Infrastructure:</p>
        <ul>
          <li>GKE</li>
          <li>AKS</li>
          <li>Other Kubernetes Compliant Clusters</li>
          <li>EKS</li>
          <li>OpenShift v4.x</li>
          <li>Minikube</li>
          <li>Kubernetes Operations (kops)</li>
        </ul>
        <p> Dynamic Infrastructure:</p>
        <ul>
          <li>GKE using Terraform</li>
        </ul>
      </td>
      <td valign="top">
        <p> Using Harness Kubernetes:</p>
        <ul>
          <li>Rolling</li>
          <li>Canary</li>
          <li>Blue/Green</li>
        </ul>
        <p> Using native Helm Command:</p>
        <ul>
          <li>Basic along with steady state check</li>
        </ul>
      </td>
      <td valign="top">
        <p> Previous Analysis - Synthetic Load</p>
      </td>
      <td valign="top">
        <p> Not Supported</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> VMware Tanzu Application Service<br/>formerly Pivotal Cloud Foundry (PCF)</p>
      </td>
      <td valign="top">
        <p>Cloud Foundry CLI:Version 6 and 7.</p>
        <p> Artifact Repo:</p>
        <ul>
          <li>Jenkins</li>
          <li>Bamboo</li>
          <li>Nexus 2</li>
          <li>Nexus 3</li>
          <li>Artifactory</li>
        </ul>
        <p> Manifest Repo:</p>
        <ul>
          <li>Github</li>
          <li>GitLab</li>
          <li>Bitbucket</li>
          <li> Code Commit (Not Certified)</li>
          <li> Google Cloud Source Repository (Not Certified)</li>
        </ul>
      </td>
      <td valign="top">
        <p> PAS/PCF</p>
      </td>
      <td valign="top">
        <ul>
          <li>Canary</li>
          <li>Blue/Green</li>
          <li>Rolling (created as a Basic deployment type Workflow)</li>
        </ul>
      </td>
      <td valign="top">
        <p> Rolling:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
        <p> Canary:</p>
        <ul>
          <li>Canary Analysis - Realtime Load</li>
        </ul>
        <p> Blue/Green:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
      </td>
      <td valign="top">
        <p> Yes</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> AWS ECS</p>
      </td>
      <td valign="top">
        <ul>
          <li>Docker Hub</li>
          <li>ECR</li>
        </ul>
      </td>
      <td valign="top">
        <p> Static Infrastructure:</p>
        <ul>
          <li>ECS Cluster</li>
        </ul>
        <p> Dynamic Infrastructure:</p>
        <ul>
          <li>CloudFormation</li>
          <li>Terraform</li>
          <li>Shell Script</li>
        </ul>
      </td>
      <td valign="top">
        <p> Deployment Types Fargate, EC2:</p>
        <ul>
          <li>Canary</li>
          <li>Blue/Green:<ul>
              <li>Using ALB/NLB and Target Group</li>
              <li>Using Route 53 DNS</li>
            </ul>
          </li>
          <li>Multi-Service:<ul>
              <li> >Caveat: It is created as a Basic Workflow</li>
            </ul>
          </li>
        </ul>
      </td>
      <td valign="top">
        <p> Deployment Type - EC2:</p>
        <ul>
          <li> Canary: Canary Analysis - Realtime Load</li>
          <li> Blue/Green: Previous Analysis - Synthetic Load</li>
          <li> Multi-Service: Previous Analysis - Synthetic Load</li>
        </ul>
        <p> Deployment Type - Fargate:</p>
        <p>Same strategy support as EC2.</p>
        <p>For Fargate: The `complete-docker-id` must be present in the monitoring provider.</p>
        <p>Use hostname expression `completeDockerId`.</p>
      </td>
      <td valign="top">
        <p> Not Supported</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> AWS AMI/ASG</p>
      </td>
      <td valign="top">
        <p> AWS AMI Repository<br/>(private AMIs only)</p>
      </td>
      <td valign="top">
        <p> Static Infrastructure:</p>
        <ul>
          <li>AWS ASG</li>
          <li>SpotInst-based ASG</li>
          <li>AWS Launch Template/Configuration</li>
        </ul>
        <p> Dynamic Infrastructure:</p>
        <ul>
          <li>CloudFormation</li>
          <li>Terraform</li>
          <li>Shell Script</li>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li>Canary</li>
          <li>Blue/Green</li>
        </ul>
      </td>
      <td valign="top">
        <p> Canary:</p>
        <ul>
          <li>Canary Analysis - Realtime Load</li>
        </ul>
        <p> Blue/Green:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
      </td>
      <td valign="top">
        <p>Yes</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> AWS CodeDeploy</p>
      </td>
      <td valign="top">
        <ul>
          <li>Jenkins</li>
          <li>Bamboo</li>
          <li>AWS S3</li>
        </ul>
      </td>
      <td valign="top">
        <p> AWS CodeDeploy Servers</p>
      </td>
      <td valign="top">
        <p> Basic</p>
      </td>
      <td valign="top">
        <p> Previous Analysis - Synthetic Load</p>
      </td>
      <td valign="top">
        <p> Not Supported</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> AWS Lambda</p>
      </td>
      <td valign="top">
        <ul>
          <li>Jenkins</li>
          <li>Artifactory</li>
          <li>AWS S3</li>
          <li>Nexus</li>
        </ul>
      </td>
      <td valign="top"> AWS</td>
      <td valign="top">
        <ul>
          <li>Basic</li>
        </ul>
      </td>
      <td valign="top">
        <p> Previous Analysis - Synthetic Load</p>
      </td>
      <td valign="top">
        <p> Not Supported</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> Azure VMSS</p>
      </td>
      <td valign="top">Azure VM image gallery</td>
      <td valign="top">Static Infrastructure:<br/>Azure VMSS</td>
      <td valign="top">
        <ul>
          <li>Basic</li>
          <li>Canary</li>
          <li>Blue/Green</li>
        </ul>
      </td>
      <td valign="top">
        <p> Basic:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
        <p> Canary:</p>
        <ul>
          <li>Canary Analysis - Realtime Load</li>
        </ul>
        <p> Blue/Green:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
      </td>
      <td valign="top">
        <p> Not Supported</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> Azure Web App</p>
      </td>
      <td valign="top">
        <ul>
          <li>Docker Registry</li>
          <li>Artifactory</li>
          <li>Azure Container Registry</li>
        </ul>
      </td>
      <td valign="top">
        <p> Static Infrastructure:<br/>Azure App Services</p>
        <p> Dynamic Infrastructure:<br/>Terraform, ARM templates</p>
      </td>
      <td valign="top">
        <ul>
          <li>Canary</li>
          <li>Blue/Green</li>
          <li>Basic</li>
        </ul>
      </td>
      <td valign="top">
        <p> Basic:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
        <p> Canary:</p>
        <ul>
          <li>Canary Analysis - Realtime Load</li>
        </ul>
        <p> Blue/Green:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
      </td>
      <td valign="top">
        <p> Not Supported</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> SSH</p>
      </td>
      <td valign="top">
        <p> Copy Artifact:</p>
        <ul>
          <li>Jenkins</li>
          <li>Bamboo</li>
          <li>JFrog Artifactory</li>
          <li>Nexus 2 and Nexus 3</li>
          <li>Google Cloud Strorage</li>
          <li>AWS S3</li>
          <li>Azure Artifacts</li>
        </ul>
      </td>
      <td valign="top">
        <p> Static Infrastructure:</p>
        <ul>
          <li>AWS</li>
          <li>Physical Data Center (<a href="#note_on_virtual_servers">agnostic support for VMs on any platform)</a></li>
          <li>Azure</li>
          <li>GCP (Supported under Physical Data Center)</li>
        </ul>
        <p> Dynamic:</p>
        <ul>
          <li>CloudFormation: SSH on AWS only</li>
          <li>Physical Data Center: Shell Script Provisioner</li>
          <li>Terraform: SSH on AWS only</li>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li>Basic</li>
          <li>Canary</li>
          <li>Rolling</li>
        </ul>
      </td>
      <td valign="top">
        <p> Basic:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
        <p> Canary:</p>
        <ul>
          <li>Canary Analysis - Realtime Load</li>
        </ul>
        <p> Rolling:</p>
        <ul>
          <li>Previous Analysis - Synthetic Load</li>
        </ul>
      </td>
      <td valign="top">
        <p> Not Supported</p>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <p> WinRM<br/> IIS (.NET)</p>
      </td>
      <td valign="top">
        <p> Download Artifact:</p>
        <ul>
          <li>Jenkins</li>
          <li>Bamboo</li>
          <li>JFrog Artifactory</li>
          <li>Nexus 2 and Nexus 3</li>
          <li>Google Cloud Strorage</li>
          <li>AWS S3</li>
          <li>Azure Artifacts</li>
          <li>SMB</li>
          <li>SFTP</li>
        </ul>
      </td>
      <td valign="top">
        <p> Static Infrastructure:</p>
        <ul>
          <li>AWS</li>
          <li>Physical Data Center</li>
          <li>Azure Cloud</li>
        </ul>
      </td>
      <td valign="top">
        <ul>
          <li>Basic</li>
          <li>Canary</li>
          <li>Rolling</li>
        </ul>
      </td>
      <td valign="top">
        <p> Previous Analysis - Synthetic Load</p>
      </td>
      <td valign="top">
        <p> Yes</p>
      </td>
    </tr>
  </tbody>
</table>


#### Deployment Notes

The following notes clarify support of some platform features.

##### Kubernetes: What Can I Deploy?

In Harness, a **managed** workload is a Deployment, StatefulSet, or DaemonSet object deployed and managed to steady state.

Harness Canary and Blue/Green Workflow default steps support a single **Deployment** or **StatefulSet** workload as a managed entity.

Rolling Workflow default steps support Deployment, StatefulSet, or DaemonSet as **managed** workloads, but not Jobs.

You can deploy any Kubernetes workload in any Workflow type by using a Harness  [annotation](../firstgen-platform/techref-category/cd-ref/platforms-ref/versioning-and-annotations.md#annotations) to make it unmanaged (`harness.io/direct-apply`).

The  [Apply Step](../continuous-delivery/kubernetes-deployments/deploy-manifests-separately-using-apply-step.md) can deploy any workloads or objects in any Workflow type as a managed workload.

**OpenShift:** Harness supports OpenShift [DeploymentConfig](https://docs.openshift.com/container-platform/4.1/applications/deployments/what-deployments-are.html) in OpenShift clusters as a managed workload across Canary, Blue Green, and Rolling deployment strategies. Please use `apiVersion: apps.openshift.io/v1` and not `apiVersion: v1`.

##### Kubernetes Version Support

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

Currently, Kubernetes command-line tool kubectl binary version 1.19.2 is supported behind the Feature Flag `NEW_KUBECTL_VERSION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.##### Helm

Harness certifies its Helm support using [Helm 3.1.2](https://github.com/helm/helm/releases/tag/v3.1.2).

Helm chart dependencies are not supported in Git source repositories (Harness [Source Repo Providers](../firstgen-platform/account/manage-connectors/add-source-repo-providers.md)). Helm chart dependencies are supported in [Helm Chart Repositories.](../firstgen-platform/account/manage-connectors/add-helm-repository-servers.md)

##### Artifact Servers, Repos, and Artifacts

Harness uses **Metadata only** when downloading artifact sources. See [Service Types and Artifact Sources.](../continuous-delivery/model-cd-pipeline/setup-services/service-types-and-artifact-sources.md)

For pulling Docker images from Docker repos, Harness has a limit of 10000 for private Docker repos, and 250 for public (no username or password required) Docker repos.

##### Virtual Servers

Harness supports VMs on any platform using the platform-agnostic Physical Data Center deployment type. But Harness has full-fledged API integration only with AWS and Azure, at this time. This integration auto-populates VM names and provides many filtering options usings VPCs, subnets, etc. For VMs on GCP, use the Physical Data Center deployment type in your Harness Infrastructure Definition.

##### AWS SDK Version Support

Harness supports [AWS SDK 1.12.47](https://docs.aws.amazon.com/de_de/AWSJavaSDK/latest/javadoc/overview-summary.html).

##### Azure Deployments and Proxy Authentication

Harness uses the Azure SDK among other methods and Authenticated proxy is not supported for Azure SDK. Consequently, you cannot use Azure connections for artifacts, machine images, etc, that require proxy authentication. This is an Azure limitation, not a Harness limitation. This is a known Azure limitation with Java environment properties and their SDK.

##### Terraform Version Support

Harness does not include Terraform on the Harness Delegate. You must install Terraform on the Delegate when using Terraform in Harness. For more information, go to [Terraform How-tos](../continuous-delivery/terraform-category/terrform-provisioner.md).

Harness supports the following Terraform versions:

* v1.1.9
* v1.0.0
* v0.15.5
* v0.15.0
* v0.14.0

### Verification

Harness supports the following metrics and logging platforms.

#### Metrics Providers

The following table lists Harness support for metrics platforms (APMs).



|  Metrics Provider Name |  Metric Pack |  Deployment Verification |  24/7 Service Guard |
| --- | --- | --- | --- |
| [AppDynamics](/docs/category/appdynamics-verification) |  Business Transactions |  Yes |  Yes |
|  AppDynamics |  JVM and Infra Metrics | Supported via Custom Metrics | Supported via Custom Metrics |
| [New Relic](/docs/category/new-relic-verification) |  Business Transactions |  Yes |  Yes |
|  New Relic |  Insights | Supported via Custom Metrics | Supported via Custom Metrics |
| [CloudWatch](/docs/category/cloudwatch-verification) |  Infrastructure Metrics (ELB, ECS) |  Yes |  Yes |
|  CloudWatch |  Lambda Metrics |  Yes |  Yes |
| [Dynatrace](/docs/category/dynatrace-verification) |  Business Transactions (service level) |  Yes |  Yes |
| [Datadog](/docs/category/datadog-verification) |  Docker Infra Metrics |  Yes |  Yes |
|  Datadog |  ECS Infra Metrics |  Yes |  Yes |
|  Datadog |  APM Traces |  N/A - API not supported by Datadog |  Yes |
|  Datadog |  Custom Metrics |  Yes |  Yes |
| [Stackdriver](/docs/category/stackdriver-verification) |  Infrastructure Metrics |  Yes |  Yes |
|  Stackdriver |  Custom metrics from explorer | No |  Yes |
| [Prometheus](/docs/category/prometheus-verification) |  |  Yes |  Yes |
| [Instana](/docs/category/instana-verification) | Docker Infra MetricsBusiness Transactions |  Yes |  Yes |
| [APM Custom Metrics](/docs/category/custom-metrics-and-logs-verification) |  |  Yes |  Yes |

#### Logging Platforms

Most logging platforms are also supported. See [Verification](https://developer.harness.io/docs/category/continuous-verification).



|  |  |  |
| --- | --- | --- |
| Log Provider Name | Deployment Verification | 24/7 Service Guard |
| Datadog - Logs | Yes | Yes |
| ELK (Elastic) | Yes | Yes |
| Splunk | Yes | Yes |
| Stackdriver - Logs | Yes | Yes |
| Sumo Logic | Yes | Yes |

###  Collaboration

The following table lists Harness support for collaboration tools.



|  Provider Name |  Notification |  Approval/Change Management |
| --- | --- | --- |
| [Microsoft Teams](../firstgen-platform/account/manage-notegroups/send-notifications-to-microsoft-teams.md) |  Yes |  N/A |
| [Email (SMTP)](../firstgen-platform/account/manage-connectors/collaboration-providers.md) |  Yes |  N/A |
| [Slack](../firstgen-platform/account/manage-notegroups/notification-groups.md) |  Yes |  N/A |
| [Jira](../firstgen-platform/account/manage-connectors/collaboration-providers.md) - Supported Custom Field Types: Option, Array, Any, Number, Date, and String - Non-supported Field Types: User, Attachment |  Yes |  Yes |
| [ServiceNow](../firstgen-platform/account/manage-connectors/collaboration-providers.md) |  Yes |  Yes |
| [PagerDuty](../firstgen-platform/account/manage-notegroups/notification-groups.md) |  Yes |  |

### Access Control

The following table lists Harness support for SSO protocols and tools.



|  SSO Type |  SSO Providers |  Authentication Supported |  Authorization (Group Linking) Supported |  SCIM Provisioning |
| --- | --- | --- | --- | --- |
| [SAML](../firstgen-platform/security/access-management-howtos/single-sign-on-sso-with-saml.md) |  Okta |  Yes |  Yes |  Yes |
|  |  Azure Active Directory |  Yes |  Yes |  Yes |
|  |  Google |  Yes |  No | No |
|  |  Others |  Yes |  Yes | No |
|  |  OneLogin |  Yes |  Yes |  Yes |
|  |  ADFS SAML |  Yes |  No | No |
|  |  PingFederate |  Yes |  No | No |
| [OAuth 2.0](../firstgen-platform/security/access-management-howtos/single-sign-on-sso-with-oauth-2-0.md) |  Github |  Yes |  No |  N/A |
|  |  GitLab |  Yes |  No |  N/A |
|  |  Bitbucket |  Yes |  No |  N/A |
|  |  Google |  Yes |  No |  N/A |
|  |  Azure |  Yes |  No |  N/A |
|  |  LinkedIn |  Yes |  No |  N/A |
| [LDAP](../firstgen-platform/security/access-management-howtos/sso-ldap.md) (Delegate connectivity needed) |  Active Directory |  Yes |  Yes |  N/A |
|  |  Open LDAP |  Yes |  Yes |  N/A |
|  |  Oracle LDAP |  Yes |  Yes |  N/A |

### Secret Management

The following table lists Harness support for cloud platform secrets management services.



|  Provider Name |  Key Encryption Support |  Encrypted Data Storaged with Harness |  Support for Referencing Existing Secrets |
| --- | --- | --- | --- |
| [AWS KMS](../firstgen-platform/security/secrets-management/secret-management.md#harness-secret-store-aws-kms) |  Yes |  Yes |  No |
| [AWS Secret Manager](../firstgen-platform/security/secrets-management/secret-management.md#aws-secrets-manager) |  Yes |  No |  Yes |
| [Hashicorp Vault](../firstgen-platform/security/secrets-management/secret-management.md#hashi-corp-vault) |  Yes |  No |  Yes |
| [Azure Key Vault](../firstgen-platform/security/secrets-management/secret-management.md#azure-key-vault) |  Yes |  No |  Yes |
| [CyberArk](../firstgen-platform/security/secrets-management/secret-management.md#cyber-ark) |  No |  No |  Yes |
| [Google KMS](../firstgen-platform/security/secrets-management/secret-management.md#google-cloud-kms) |  Yes |  Yes |  No |

### Harness Self-Managed Enterprise Edition

The following table lists the major support features for [Harness Self-Managed Enterprise Edition](harness-on-premise-versions.md) offerings.



|  Solution |  Supported Platform |  Connected\* |  HA Supported\*\* |  Monitoring |  Disaster Recovery |  Auto Restart |  Features Under Controlled Release |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Kubernetes Cluster](harness-on-premise-versions.md) |  Kubernetes - GKE - AKS - EKS |  Yes |  Yes | Prometheus, Grafana | Supported | Supported |  |
| [Virtual Machine (VM)](harness-on-premise-versions.md) |  Linux VM (3 VM minimum) |  Yes |  Yes | Prometheus, Grafana | Supported | Supported |  |

### SDKs installed with the Delegate

Harness Delegate includes binaries for the SDKs that are required for deployments with Harness-supported integrations. These include binaries for Helm, ChartMuseum, `kubectl`, Kustomize, and so on.

##### Kubernetes Deployments

For Kubernetes deployments, the following SDKs/tools are included and certified.



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

For Native Helm deployments, the following SDKs/tools are included and certified.



|  |  |  |
| --- | --- | --- |
| **Manifest Type** | **Required Tool/SDK** | **Certified Version** |
| Helm Chart | helm | v3.9.2 |
|  | kubectlRequired if Kubernetes version is 1.16+. | v1.24.3 |

##### Install a Delegate with custom SDK and 3rd-party tool binaries

To support customization, Harness provides a Harness Delegate image that does not include any third-party SDK binaries. We call this image the No Tools Image.

Using the No Tools Image and Delegate YAML, you can install the specific SDK versions you want. You install software on the Delegate using the `INIT_SCRIPT` environment variable in the Delegate YAML.

For steps on using the No Tools Delegate image and installing specific SDK versions, see [Install a Delegate with 3rd Party Tool Custom Binaries](../../platform/2_Delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries.md).

### Browsers

The following browsers are supported:

* **Chrome**: Latest version
* **Firefox**: Latest version
* **Safari**: Latest version

Mobile browsers are not supported.

#### Supported Screen Resolution

Minimum supported screen resolution is 1440x900.

