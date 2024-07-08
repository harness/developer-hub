---
title: Governance recommendations
description: Optimize AWS costs with asset governance recommendations
# sidebar_position: 2
---

# Optimize AWS costs with asset governance recommendations

Harness Cloud Asset Governance provides tools to optimize your cloud spend and avoid unnecessary costs. By leveraging these recommendations, you can better control your cloud expenses while ensuring that your cloud infrastructure is optimized for maximum efficiency and cost-effectiveness.

You can view the recommendations for all of your Cloud accounts on the recommendations page.

   <DocImage path={require('./static/Overviewpg1.png')} width="90%" height="90%" title="Click to view full size image" />


   <DocImage path={require('./static/Overviewpg2.png')} width="90%" height="90%" title="Click to view full size image" />

The following resource types can be utilized optimally by creating governance rules:

### AWS Resource Coverage (Comprehensive list)

- EC2 instances
- S3 buckets
- Lambda functions
- RDS (Relational Database Service) instances
- CloudFormation stacks

### Azure Resource Coverage (Comprehensive list)

- Virtual Machines (VMs)
- Storage accounts
- App services
- Cosmos DB accounts
- Key Vaults

### GCP Resource Coverage (Comprehensive list)

- Compute Engine instances
- Cloud Storage buckets
- App Engine applications
- Cloud SQL instances
- Cloud IAM policies


## Before you begin

* Connect your cloud account in Harness and set up CCM for cost management. For more information:
      - For AWS, go to: [Set up cost visibility for AWS](../../get-started/onboarding-guide/set-up-cost-visibility-for-aws.md)
      - For GCP, go to: [Set up cost visibility for GCP](../../get-started/onboarding-guide/set-up-cost-visibility-for-gcp.md)
      - For Azure, go to: [Set up cost visibility for Azure](../../get-started/onboarding-guide/set-up-cost-visibility-for-azure.md)

* To obtain governance recommendations, configure a Harness CCM connector with the **Cloud Governance** feature enabled.
* Make sure that you have added the required permissions in your Cloud account.

## Types of governance recommendations

- All the AWS recommendations can be found [here](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/AWS/AWS-recommendations).
- All the GCP recommendations can be found [here](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/GCP/gcp-recommendations).
- All the Azure recommendations can be found [here](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/Azure/azure-recommendations).
 
## View your cost governance recommendations

1. In **Harness**, go to the **Cloud Costs** module.
2. Click **Recommendations**.
3. There are two tabs present on the window - "Open Recommendations" and "Applied Recommendations". Open Recommendation tab shows all the recommendations that are currently available for applying and the potential monthly savings that the user can achieve if they are applied. On the other hand, Applied Recommendations show all the recommendations that have already been applied and the total savings achieved with their application. 
4. The recommendations window allows you to put filters on the recommendations to see the result as per convenience. Kindly choose "Governance" in "Recommendation Type" filter for all governance recommendations. Currently, these are filters supported:

  <DocImage path={require('./static/filtersAG.png')} width="60%" height="60%" title="Click to view full size image" />

For more information about Asset Governance in CCM, please refer to the links below:
- [Governance for AWS](https://developer.harness.io/docs/category/governance-for-aws)
- [Governance for GCP](https://developer.harness.io/docs/category/governance-for-gcp)
- [Governance for Azure](https://developer.harness.io/docs/category/governance-for-azure)