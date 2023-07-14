This topic provides the Harness Cloud Cost Management supported platforms and feature support matrix: 

## Supported Kubernetes Management Platform

The following section lists the support for the Kubernetes management platform for CCM:

|                                                 |                        |                   |
| ----------------------------------------------- | ---------------------- | ----------------- |
| **Technology**                                  | **Supported Platform** | **Pricing**       |
| OpenShift 3.11                                  | GCP                    | GCP               |
| OpenShift 4.3                                   | AWSOn-Prem             | AWSCustom-rate\*  |
| Rancher                                         | AWS                    | Custom-rate\*\*   |
| Kops (Kubernetes Operations)                    | AWS                    | AWS               |
| Tanzu Kubernetes Grid Integrated Edition (TKGI) | On-Prem                | Custom-rate\*\*\* |

\* Cost data is supported for On-Prem OpenShift 4.3. This uses a custom rate.

\*\* Cost data is supported for K8s workloads on AWS managed by Rancher, but the cost falls back to the custom rate.

\*\*\* Cost is computed using a custom rate. This can be modified by Harness on request.

## Supported ingress controllers for Kubernetes AutoStopping

The following table lists the ingress controllers supported for Kubernetes AutoStopping:

|                            |                                                                    |
| -------------------------- | ------------------------------------------------------------------ |
| **Ingress Controller**     | **Extent of Support**                                              |
| Nginx ingress controller   | Fully supported                                                    |
| HAProxy ingress controller | Fully supported                                                    |
| Traefik as ingress gateway | Supported using ingress routes and manually configured middlewares |
| Istio as API gateway       | Fully supported                                                    |
| Ambassador as API gateway  | Supported by manually editing the mapping                          |

:::note
The supported Kubernetes version for AutoStopping is 1.19.
:::
## Feature Support Matrix

This section lists the feature support matrix for the supported cloud platforms:

### AWS Service

|                     |                         |                     |                               |
| ------------------- | ----------------------- | ------------------- | ----------------------------- |
|                     | **Inventory Dashboard** | **Recommendations** | **AutoStopping**              |
| **EC2**             | Yes                     | Yes         | Yes (With Spot Orchestration) |
| **ECS**             | Yes                     | Yes         | Yes                           |
| **EKS**             | Yes                     | Yes                 | Yes                           |
| **RDS**             | Yes                     | No                  | Yes                           |
| **EBS**             | Yes                     | No                  | No                            |
| **Snapshots**       | Yes                     | No                  | NA                            |
| **Elastic** **IPs** | Yes                     | No                  | NA                            |
| **ASGs**            | No                      | No                  | Yes (With Spot Orchestration) |

### GCP Product

|             |                         |                     |                  |
| ----------- | ----------------------- | ------------------- | ---------------- |
|             | **Inventory Dashboard** | **Recommendations** | **AutoStopping** |
| **GCE VMs** | Yes                     | Coming soon         | Yes     |
| **GKE**     | Yes                     | Yes                 | Yes              |

### Azure Product

|                     |                         |                     |                               |
| ------------------- | ----------------------- | ------------------- | ----------------------------- |
|                     | **Inventory Dashboard** | **Recommendations** | **AutoStopping**              |
| **Virtual Machine** | Yes             | Yes         | Yes (With Spot Orchestration) |
| **AKS**             | Yes                     | Yes                 | Yes                           |

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies.md).
