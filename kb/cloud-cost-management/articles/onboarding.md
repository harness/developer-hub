# CCM Onboarding

The first goal when onboarding to CCM is to get all cloud billing data into Harness. At current time Harness covers AWS, Azure, GCP and Kubernetes.

In general for every "payer account" you have in each cloud you will create a billing export, create/allow an identity access to said export, and then create a corresponding connector in Harness to allow us to start ingesting your billing information.

The general recommendation is to use IaC whenever possible for creating these exports, roles, and connectors. You can use the UI as well but IaC helps to keep a record of your configuration and follows general best practice for shared cloud platforms.

## AWS

![](../static/ccm-onboarding-aws.png)

Accounts in AWS are structured via organizations. The first step is to [create a CUR](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws#cost-and-usage-reports-cur) (Cost Usage Report) in the master payer account in their AWS org (or in every AWS account you want costs for if you do not leverage AWS organizations). Once the CUR is created, we will need to create a role that trusts Harness' AWS account, and has access to the S3 bucket that the CUR resides in.

There is a cloudformation template to provision this role, or a Terraform module. [The cloudformation stack is located here](https://github.com/harness/harness-core/blob/develop/ce-nextgen/awstemplate/prod/HarnessAWSTemplate.yaml), and the [Terraform module here](https://github.com/harness-community/terraform-aws-harness-ccm).

```terraform
module "ccm" {
  source  = "harness-community/harness-ccm/aws"
  version = "0.1.1"

  s3_bucket_arn           = "arn:aws:s3:::harness-ccm"
  external_id             = "harness:012345678901:wlgELJ0TTre5aZhzpt8gVA"
  enable_billing          = true
  enable_events           = true
  enable_optimization     = true
  enable_governance       = true
  enable_commitment_read  = true
  enable_commitment_write = true
}
```

If you are creating the CUR in a master account it is likely that you do not have other resources located in your account. If so you can just set `BillingEnabled` to true, and leave the other `Enabled` parameters set to false. If you do otherwise have resources in your billing account, you can optionally enable the other features as well.

Leave `PrincipalBilling` set to its default, change the `RoleName` as you see fit, set `BucketName` to the bucket where the CUR is being sent, and finally enter an `ExternalId`. The external id should follow the format `harness:891928451355:<string here>`. You can make the string anything you want, but the default recommended by Harness is to use your Harness account id.

After the stack or module has been deployed, we can create the corresponding CCM AWS connector in your Harness account.

[Read an in-depth article here on setting up your first AWS CCM connector.](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws)

When configuring the CCM AWS connector in the UI you are asked what features to enable, you should enable the same features here as you enabled in the stack/module.

The connector wizard then hands you a cloud formation stack that defines what is needed, this should have already been deployed so you can just continue to the next step.

If you chose to use IaC to create your connectors, you can use terraform to accomplish the same configuration in code:

```terraform
resource "harness_platform_connector_awscc" "master" {
  identifier = "master"
  name       = "master"

  account_id  = "012345678901"
  report_name = "harnessccm"
  s3_bucket   = "harnessccm"
  features_enabled = [
    "BILLING",
  ]
  cross_account_access {
    role_arn    = "arn:aws:iam::012345678901:role/HarnessCERole"
    external_id = "harness:867530900000:myharnessaccountid"
  }
}
```

Once created it takes about a day for cost data to be flowing into Harness.

**You may need to adjust the S3 bucket policy to allow the newly created Harness IAM role to read objects in the bucket.**

After the master payer account, we need to provision the same harness role (via the same stack/module) into all of the member accounts to be able to retrieve the account names, recommendations, inventory, and create autostopping rules. Because the scale of AWS organizations can be large, we recommend using IaC for this.

```terraform
resource "harness_platform_connector_awscc" "member1" {
  identifier = "member1"
  name       = "member1"

  account_id = "759984737374"
  features_enabled = [
    "OPTIMIZATION",
    "VISIBILITY",
  ]
  cross_account_access {
    role_arn    = "arn:aws:iam::012345678902:role/HarnessCERole"
    external_id = "harness:867530900000:myharnessaccountid"
  }
}
```

Repeat the above step for all master payers (organizations) and accounts you have.

### Recommendations

To make sure that EC2 recommendations are shown from all the AWS member accounts, you will need to enable [Rightsizing Recommendations](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-rightsizing.html) in each account from within the cost explorer.

## Azure

![](../static/ccm-onboarding-azure.png)

Subscriptions in Azure are organized in a Tenant with management groups. We first [create a billing export](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure#azure-billing-exports) under the root tenant payer scope and then configure this export in Harness to get billing data ingested.

To [create a billing export](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure#azure-billing-exports) we first need a storage account it can be written to. You then go to the cost management pane in your azure portal and select the enterprise billing scope. Then on the left there is an option for exports.

Then in Harness we create a new CCM Azure connector. This connector asks for the tenant and subscription id, enter the subscription id for which the storage account is located in. Then enter the billing export information based on how it was created in Azure. 

[Read an in-depth article here on setting up your first Azure CCM connector.](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws)

When prompted for the features to enable, check the options relevant to how you will be using Harness.

In the next screen the connector creator gives you a list of Azure CLI commands that accomplish the setup. You may or may not be able to complete these steps with the CLI, or you may need to accomplish the steps via another method based on your platform team’s requirements. You will notice that we are first adding a Harness-owner Azure enterprise application into your Azure tenant, which is then the identity that we apply permissions for.

Access to the storage account for the billing export should be added explicitly as shown in the guide, but the permissions for things like inventory management and auto stopping should be applied at the management group level to streamline the access needed for other subscriptions that we will add shortly.

After the initial subscription and billing export are connected we can continue to create subscription connectors for every subscription that you want auto stopping in or VM recommendations for. Again the [terraform provider](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_connector_azure_cloud_cost) is recommended. If the access for the other features was given at a management group level then there should be nothing needed on the azure side to onboard the rest of the subscriptions, just creating the connectors in Harness.

```terraform
resource "harness_platform_connector_azure_cloud_cost" "billing" {
  identifier = "billing"
  name       = "billing"

  features_enabled = ["BILLING", "VISIBILITY", "OPTIMIZATION"]
  tenant_id        = "3e93deba-142a-459a-ab89-eea28bdb589c"
  subscription_id  = "e9ce099c-531b-4f97-b681-e7a02e032e4f"
  billing_export_spec {
    storage_account_name = "harnesscostexport"
    container_name       = "harness"
    directory_name       = "export"
    report_name          = "harnesscostexport"
    subscription_id      = "e9ce099c-531b-4f97-b681-e7a02e032e4f"
  }
}

resource "harness_platform_connector_azure_cloud_cost" "member1" {
  identifier = "member1"
  name       = "member1"

  features_enabled = ["VISIBILITY", "OPTIMIZATION"]
  tenant_id        = "3e93deba-142a-459a-ab89-eea28bdb589c"
  subscription_id  = "6f273207-c4da-4489-9e21-f89ea252678e"
}
```

### Recommendations

To get VM recommendations, you needs to [enable Azure Advisor VM/VMSS recommendations](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure#enable-azure-recommendations) for every subscription (that you want recommendations for.

## GCP

![](../static/ccm-onboarding-gcp.png)

Projects in gcp are structured via organizations. You should have a billing project in your GCP organization, this is the first project we should create a connector for. First you need to [create a billing export](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp#gcp-billing-export) in this billing project. You can optionally create a “detailed” billing export which exposes resource level information.

The Harness GCP connector wizard walks you through entering the billing export information, and after checking the features you want to enable, prompts you with an itemized list of actions to take to grant this access to your GCP project. Again we are given a Harness owned service account that you can simply add to your organization. To save time you can give this access at the organization level to streamline the process

[Read an in-depth article here on setting up your first GCP CCM connector.](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp)

Once the billing project connector is created, we do not need to create connectors for every GCP project as we do not have recommendations or other project specific things.

```terraform
resource "harness_platform_connector_gcp_cloud_cost" "billing" {
  identifier = "billing"
  name       = "billing"

  features_enabled      = ["BILLING", "VISIBILITY", "OPTIMIZATION"]
  gcp_project_id        = "example-proj-234"
  service_account_email = "harness-ce-sdjfh-00001@ce-prod-000001.iam.gserviceaccount.com"
  billing_export_spec {
    data_set_id = "data_set_id"
    table_id    = "table_id"
  }
}
```

## Kubernetes

![](../static/ccm-onboarding-k8s.png)

To start gathering k8s cloud costs, we need an existing Harness k8s connector at the account level. We can either go the route of deploying a delegate into every k8s cluster and creating corresponding k8s connectors for each delegate/custer, or if a central delegate is able to reach other cluster APIs then you can use one central delegate and use the master URL and credential method for your k8s connectors. As deploying multiple delegates is the most common method, we will focus on that here.

You may be new to Harness, and even possibly a CCM only customer, so some [delegate background](/docs/platform/delegates/delegate-concepts/delegate-overview/) might be necessary in this case. The suggestion is to use Helm to [install a delegate](/docs/platform/delegates/install-delegates/overview/) into every cluster, you will have your own internal process for doing this. When deploying a delegate via helm the only variable that must change when deploying between clusters is the delegate name, and it is recommended that the name be in close relation to the name of the cluster.

When using Helm, be sure to set `ccm.visibility=true` in your values file.

Once the delegate is deployed a k8s connector needs to be created for the delegate/cluster at the account level. For this k8s connector select “inherit from delegate” on the authentication screen and select the delegate you just deployed. Once complete you then create a CCM k8s cost connector that leverages the cluster connector you just created.

The general suggestion is to use terraform for creating the [k8s](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_connector_kubernetes) and [k8s cost](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_connector_kubernetes_cloud_cost) connectors as you will probably end up creating many of these. The two resources you need for this are linked below.

```terraform
resource "harness_platform_connector_kubernetes" "cluster-a" {
  identifier  = "cluster_a"
  name        = "cluster-a"

  inherit_from_delegate {
    delegate_selectors = ["cluster-a"]
  }
}

resource "harness_platform_connector_kubernetes_cloud_cost" "cluster-a-ccm" {
  identifier  = "cluster_a_ccm"
  name        = "cluster-a-ccm"

  features_enabled = ["VISIBILITY", "OPTIMIZATION"]
  connector_ref    = harness_platform_connector_kubernetes.cluster-a.id
}
```

There is also automation to auto-create k8s and k8s ccm connectors for delegates at the account level. You can run this on a schedule to ensure any new delegates deployed automatically start ingesting cost and usage data. You can find the repository [here](https://github.com/harness-community/harness-ccm-k8s-auto).

## Auto-stopping

### Cloud

You will need a cloud CCM connector that has auto-stopping permissions provisioned for the target account/subscription/project that the target resource to be stopped is located in.

[AWS](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/connect-to-an-aws-connector)
[Azure](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/add-azure-connector)
[GCP](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/create-a-gcp-connector-for-auto-stopping-rules)

For cloud auto-stopping, there are a few options. If you are targeting HTTP based traffic only and are in AWS or Azure you can use the cloud-native Elastic Load Balancers or Application Gateways respectively. If you are routing other TCP based applications or are using GCP then you must use the proxy. The proxy is an Ubuntu VM that is provisioned into the user's cloud and acts as a proxy and load balancer.

Depending on your cloud and requirements, you will [create a load balancer](/docs/category/add-load-balancers-for-autostopping-rules) resource for either a gateway or proxy. Guides for each of the clouds are linked below.

Both of these methods need a (preferably wildcard) domain and (optional in the case of using the cloud-native LBs) (also preferably wildcard) certificate. The process is similar for each cloud and is outlined in the documentation below.

### Kubernetes

To enable auto-stopping for kubernetes the provisioning process is a simple deployment of a controller and router. The yaml for this operator is given in the UI when you select “enable auto-stopping on the cluster cloud connector in the CCM setup page. There is a version replicated in git [here](https://gist.github.com/rssnyder/43c92f18ce6ec8a89749220f63c768d3).

The deployment requires a first gen account admin api key. This can be tricky as some new users will not have admin access in FG for their harness account. The best way to navigate to FG to get the key for a new account is in the k8s connector creation wizard when you check to enable auto-stopping, there is a button that links you directly to the api key page. If you are having trouble creating a first gen api key please open a support ticket or contact your CSM.

After deployment you can [follow the auto-stopping rule creation wizard](/docs/get-started/supported-platforms-and-technologies/#supported-ingress-controllers-for-kubernetes-autostopping) to create a test rule in their cluster. Please make sure their ingress controller is supported.

## Additional Activities

After the initial setup it is best to get an overview of Perspectives, Budgets, Anomalies, Recommendations, and Cost Categories.

### RBAC

![](../static/ccm-onboarding-rbac.png)

You should discuss with the CCM SME team (who usually would have CCM Admin or similar permissions in Harness) what other personas there are that will be accessing CCM. Once you define those personas and the things they will need to do within CCM, you can use Groups, Roles, and Resource Groups to define access profiles and assign access to groups of users.

### Cost Categories

[Cost Catagories](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories/) are important to cover early on, as if they seem valuable to the CCM user they should be implemented early so they can be leveraged in perspectives and dashboards.

Usually a business will have their cost category information in a central database, these categories could be anything from business units, directors, or chargeback codes. It is sometimes helpful to develop automation to pull in the cost category information from these external systems to programmatically update the cost category within Harness. You can view the APIs for cost categories [here](https://apidocs.harness.io/tag/Cloud-Cost-Cost-Categories) and an example of some automation in python [here](https://github.com/rssnyder/cuddly-dollop/blob/main/common.py).

### Perspectives

[Perspectives](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-cost-perspectives/) are a grouping of related costs that enabled you to further filter or group costs to track where spend is happening inside your environment.

Once you have cost categories defined, you can then start creating perspectives that utilize the cost categories for their definition rather than re-defining your business separations in the perspective creation. One example would be creating a perspective folder for a cost category, and then a perspective for each bucket.

### Budgets and Anomalies

[Budgets](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget/) and [Anomalies](/docs/cloud-cost-management/use-ccm-cost-reporting/detect-cloud-cost-anomalies-with-ccm/) have their own pages in CCM that provide an overview of their status across your cloud platforms. Where they get defined however is inside the definition of a perspective, and this is also where you can set up alerts which is one of the most important features of budgets and anomalies.

You can define a budget for a perspective for a variety of time ranges. What is most important is to set alerts to go to any interested parties. You can set an alert when spend reaches a certain percentage of a budget (reached 50% of budgeted spend) or for when the _forcasted_ cost reaches a certain amount (forcasted to spend 101% of budgeted spend). These alerts should go to people that can take action on this information, be it an engineering team responsible for the applications covered in the perspective or a director with oversight of the business unit reported in the perspective.

Similarly to budgets, you can set alerts for when new anomalies are generated within the scope of the perspective. Again these alerts should go to someone who can _take action_ on the alerts.

### Recommendations

When looking at [reccomendations](/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations/) we see many different types: k8s workloads and nodepools, VM, and governance. Each recommendation will come with current/forecasted spend for the resource, and possible savings would result if action were taken. You can use the filter icon in the top right of the page to filter on a specific type, or even on certain cloud accounts, clusters, or namespaces.

It is best to make sure you understand each type and are able to speak to any questions an engineer might have when they are given the recommendation. Harness acts as a producer and aggregator of recommendation and the real responsibility lies within the teams responsible for the application/infrastructure  to take action to realize the savings shown.

Normally having sessions with groups of engineers to explain each recommendation type, how they filter to see the reccomendations that pertain to them, and how they can _mark a recommendation as applied_ is best to get any questions out of the way.
