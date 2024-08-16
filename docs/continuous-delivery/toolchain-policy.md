---
title: Harness Integration Upgrade Policy
sidebar_position: 2
---

At Harness, we are committed to providing our customers with the most reliable and efficient integration experiences. To achieve this, we ensure that our integrations are consistently updated to the latest versions. Our policy is designed to align with the rapid pace of technological advancements and to offer you the most up-to-date capabilities.

## Quarterly Integration Updates

Harness updates its integrations on a quarterly basis. This schedule is determined by the release velocity of the integrated tools. By adhering to a routine update cycle, we ensure that our integrations always leverage the latest features and improvements. This enables our users to maximize the potential of the tools offered by Harness, ensuring that they remain at the forefront of technological innovation.

## Comprehensive Tooling Updates

Tooling updates apply to all integrations, irrespective of the product. We are committed to ensuring that all our integrations are up to date with the latest version available on the market. This comprehensive approach guarantees that you benefit from the most recent advancements across all your tools and integrations.

## Testing and Quality Assurance

Harness will test integration updates against the corresponding and impacted deployment types to ensure there is no loss in functionality or regression. Our rigorous testing process aims to maintain the highest quality standards, providing you with reliable and efficient integrations that seamlessly fit into your existing workflows.

## Current State of Our Tooling

Below is a table that shows the current state of our integrations, demonstrating our commitment to updating them to the latest versions:

| Connector   | Integration         | Supported Version | Latest Version | Upgrade Cycle |
|-------------|----------------------|-------------------|----------------|---------------|
| Kubernetes  | Kubernetes           | 1.27.4            | 1.30.3         | Quarterly     |
| Helm        | Helm                 | 3.8.x             | 3.14.x         | Quarterly     |
| Tanzu       | Tanzu                | cf cli v7         | cf cli v8      | Quarterly     |
| Terraform   | NaN                  | 1.3.5             | 1.9.4          | Quarterly     |
| Terragrunt  | NaN                  | 0.40.x            | 0.66.4         | Quarterly     |
| NaN         | Serverless.com       | 3.x               | 4.x            | Quarterly     |
| Jenkins     | Jenkins Build Step   | 2.432             | 2.471          | Quarterly     |
| NaN         | ArgoCD               | 2.8.x             | 2.12.x         | Quarterly     |
| AWS         | AWS SAM              | 1.84.0            | 1.121.0        | Quarterly     |


### Kubernetes Maintenance FAQ

#### What versions will Harness support in the future? How will it be maintained?

As of Date: 08.16.2024

- Harness will officially support 2 previous versions from the least stable release.
- This means we will support `1.30`, `1.29`, `1.28` in line with the cloud vendors
- We will do quarterly maintenance on the Kubernetes and Helm integrations as provide updates more frequently as they change the most often.

#### What about Kubernetes clusters that are managed on-prem and are self-maintained by customers? 

- Any other versions of Kubernetes the customer is using we will support on a best effort basis
- This includes older versions of kubernetes such as `1.27`, `1.26` - `1.22`.
- For customers who have older than `1.22`, we will try to ensure our integrations are backwards compatible with older Kubernetes cluster versions. However, we cannot guarantee any impact due to the nature of Kubernetes and its frequent updates. We will not introduce any patches to remediate the issue around the older Kubernetes version, the only path forward is to upgrade.
- Harness will introduce installation/upgrade pre-flight checks during deployment that should warn users if the Kubernetes version is out of compliance with our policy.


#### What exactly does it mean to ‘support’ a Kubernetes version?

- Ensure that we do not introduce changes that will break compatibility with that new stable version. For example, using a v1.30 feature that will not work in v1.16.
- If a customer is running an unsupported Kubernetes version and encounters a problem that is related to an incompatibility, they are required to upgrade their cluster.  We will not issue a patch to support their older unsupported Kubernetes version.

### Integration FAQs

##### Does Harness use SDKs for the cloud vendors? 

- Yes, we use the AWS SDK, Google Cloud SDK, and Azure SDK for our deployment swimlanes.


## Benefits of Routine Updates

- **Enhanced Capabilities:** By staying current with the latest releases, Harness ensures that users have access to cutting-edge features and enhancements. This allows you to take full advantage of the powerful functionalities provided by the integrated tools.

- **Security Assurance:** Regular updates help protect your systems from potential security vulnerabilities that can emerge in older versions of software. By maintaining up-to-date integrations, we provide an added layer of security, ensuring a safer experience for our users.

- **Improved Performance:** Newer versions often come with performance improvements that can enhance the overall efficiency and reliability of the integrations.

## Release Notes and Impact Assessment

With every update to an SDK, CLI, or integration, Harness will publish detailed release notes. These notes will outline the changes made, the benefits of the new version, and any potential impacts on existing workflows. By providing transparent and comprehensive documentation, we aim to ensure a smooth transition for our users during each upgrade cycle.

## Continuous Improvement and Feedback

Harness is dedicated to continuous improvement. We encourage our users to provide feedback on their integration experiences. This feedback is invaluable in helping us refine our processes and deliver even better solutions. Our goal is to work collaboratively with our users to create a seamless and powerful integration environment.

## Conclusion

Harness’s integration upgrade policy reflects our commitment to innovation, security, and user satisfaction. By maintaining the latest versions of our integrations, we strive to provide a superior product that empowers our users to achieve their goals effectively and efficiently.

For further details or assistance, please contact [Harness Support](mailto:support@harness.io).
