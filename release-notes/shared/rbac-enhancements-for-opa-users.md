<!-- 

## Upcoming Role-Based Access Control Enhancements for Harness Customers Utilizing Policy as Code Capability

-->

We are excited to announce an upcoming enhancement to our Role-Based Access Control (RBAC) within Harness.io, specifically for customers leveraging our Policy as Code capability. These changes aim to provide more refined and granular access control options, empowering you to have better governance over your Harness setup. Here are the key points regarding the upcoming update:

1. **Release Date: The RBAC changes will be rolled out on October 30th, 2023** affecting all customers utilizing Policies and Policy Sets. This enhancement is a step forward in offering expanded and more granular RBAC options to our customer base.

2. **Improved Access Control:** The new feature will allow you to either select all or specify particular policies and policy sets to enable other Harness users to access a resource group. Through this, the resource groups can provide precise controls over which specific policies and policy sets the account admins desire users to access and edit.

3. **Default Resource Groups Configuration:** The default resource groups at the account, organization, and project levels will automatically have these configurations enabled with all policies and all policy sets. This adjustment ensures there is no alteration in policy experience for users leveraging the default Harness resource groups.

4. **Existing Custom Resource Groups:** For those who have created their own resource groups, we will extend the policy set and policy resources to those existing groups without selected configurations. It implies that you will need to opt-in and add those configurations to your existing user groups to grant user access.

5. **Updating Resource Groups:** You can conveniently update your resource groups either through our UI, API, or via our Terraform Provider.

_Terraform Provider_

https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_resource_group  

_Terraform Provider Note: Under the resource type, you can select either GOVERNANCE_POLICY or GOVERNANCE_POLICY_SET to make your updates._


#### API 

Create: https://apidocs.harness.io/tag/Harness-Resource-Group#operation/createResourceGroupV2 

Update: https://apidocs.harness.io/tag/Harness-Resource-Group#operation/updateResourceGroupV2 

We highly encourage you to review these upcoming changes and make necessary adjustments to your Harness configurations to take full advantage of the enhanced RBAC features. For any questions or further assistance, please don't hesitate to reach out to [Harness Support](mailto:support@harness.io).
