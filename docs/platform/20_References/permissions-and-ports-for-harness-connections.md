---
title: Permissions and Ports for Harness Connections
description: The permissions and ports listed in this topic are for all of the integrations Harness supports across its FirstGen and CurrentGen product suites. For more information, see Harness FirstGen vs Harnes…
# sidebar_position: 2
helpdocs_topic_id: ga1155j91x
helpdocs_category_id: fb16ljb8lu
helpdocs_is_private: false
helpdocs_is_published: true
---

The permissions and ports listed in this topic are for all of the integrations Harness supports across its FirstGen and CurrentGen product suites. For more information, see [Harness FirstGen vs Harness NextGen](https://docs.harness.io/article/1fjmm4by22-harness-first-gen-vs-harness-next-gen).The following table lists the permissions and ports needed for the Harness Delegate to access Connectors such as artifact servers, cloud providers, verification, and security providers. You configure these settings in the Harness Manager.

* **Artifact servers:** The Delegate pulls artifacts and metadata from artifact servers using the account and ports required by the artifact server.
* **Deployments:** Most Harness deployments to Virtual Machines (for example, AWS, GCP, Azure, Datacenter) are performed using SSH over port 22. The VPC firewall setting might also require additional open ports for administration, such as HTTP 443.
* **Verifications:** The Delegate makes API calls to verification providers using the access keys required by the providers.
* **Security:** For security, such as SAML and LDAP, the Delegate uses the account and ports required by the provider, such as an Active Directory domain controller running in an Azure or AWS VPC.

In general, if you are already connecting to your artifact servers, cloud, verification, and security providers from within your network or VPC, and you install the Harness Delegate inside that network or VPC, there is little network or VPC configuration needed. You simply need to specify accounts and ports when configuring Harness to use the providers.

|  |  |  |  |
| --- | --- | --- | --- |
| **Connections** | **Permissions and Harness Docs** | **Ports for Delegate Connections to Services** | **Provider References** |
| Active Directory LDAP | User account in the Active Directory. | HTTPS: 443.LDAP without SSL: 389.Secure LDAP (LDAPS): 636. |  [Users and Groups](https://docs.microsoft.com/en-us/windows/desktop/secauthz/users-and-groups) |
| AppDynamics | General permission: View, Edit and Delete permissions for new applications can be set as part of the default permissions for a custom role. | HTTP: 80 |  [General Permissions](https://docs.appdynamics.com/21.3/en/appdynamics-essentials/account-management/tenant-user-management/create-and-manage-custom-roles/application-permissions) |
| AWS Cloud | IAM user to be able to make API requests to AWS.DescribeRegions required. | Depends on the firewall settings of your VPC, but typically, HTTP: 443. | [Creating an IAM User in Your AWS Account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) |
| AWS CodeDeploy | Policies:<li> AWSCodeDeployRole</li><li> AWSCodeDeployDeployerAccess</li><li>DescribeRegions required also.</li>| HTTPS: 443. |  [AWS Managed (Predefined) Policies for AWS CodeDeploy](https://docs.aws.amazon.com/codedeploy/latest/userguide/auth-and-access-control-iam-identity-based-access-control.html#managed-policies) |
| AWS EC2 | Policy: AmazonEC2FullAccessDescribeRegions required also. | HTTP: 80.HTTP: 443.TCP: 9090. |  [Controlling Access to Amazon EC2 Resources](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/UsingIAM.html) |
| AWS ELB, ALB, ECS | Policy for Elastic Load Balancer, Application Load Balancer, and Elastic Container Service.DescribeRegions required also. | Well-known ports: 25, 80, 443, 465, and 587. | [Amazon ECS Service Scheduler IAM Role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_IAM_role.html) |
| AWS S3 | Policy: AmazonS3ReadOnlyAccess.DescribeRegions required also. | HTTP: 443. |  [Creating an IAM User in Your AWS Account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console) |
| Azure | Client (Application) and Tenant (Directory) IDs, and Key. | Windows VMs (WinRM ports): HTTP: 5985, HTTPS: 5986. | [Get application ID and authentication key](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal#get-application-id-and-authentication-key) |
| Bamboo | Username and password for account. | HTTP: 443.TCP: 8085. |  [Bamboo permissions](https://confluence.atlassian.com/bamboo/bamboo-permissions-369296034.html) |
| Bugsnag | Data Access API Auth Token. | The Bugsnag Data Access API is exposed on the same TCP port as the dashboard, 49080. |  [Data Access API Authentication](https://bugsnagapiv2.docs.apiary.io/#introduction/authentication) |
| Datadog | API Key. | HTTPS: 443. | [Open Ports](https://docs.datadoghq.com/agent/network/?tab=agentv6#open-ports) |
| Docker Registry | User permission level. | TCP: 8083. |  [Permission levels](https://docs.docker.com/v17.09/datacenter/dtr/2.0/user-management/permission-levels/) |
| Dynatrace | Access token. | HTTPS: 443. |  [Access tokens](https://www.dynatrace.com/support/help/get-started/introduction/why-do-i-need-an-access-token-and-an-environment-id/#anchor-access-tokens) |
| ELK Elasticsearch | User (Read permission) or Token Header and Token Value. | TCP: 9200. |  [User authentication](https://www.elastic.co/guide/en/elastic-stack-overview/current/setting-up-authentication.html) |
| Github Repo | User account: repository owner.Organization account: read and write. | HTTP: 443. |  [Permission levels for a user account repository](https://help.github.com/articles/permission-levels-for-a-user-account-repository/) [Repository permission levels for an organization](https://help.github.com/articles/repository-permission-levels-for-an-organization/) |
| Google Cloud Platform (GCP) | Policies:<li> Kubernetes Engine Admin.</li><li>Storage Object Viewer.</li>| SSH: 22. | [Understanding Roles](https://cloud.google.com/iam/docs/understanding-roles?_ga=2.123080387.-954998919.1531518087#curated_roles) |
| JFrog Artifactory | Privileged User: Read permission. | HTTP: 443. |  [Managing Permissions](https://www.jfrog.com/confluence/display/RTF/Managing+Permissions) |
| Jenkins | Matrix-based: Read permission.Execute Permission, if jobs are triggered from Harness stage. | HTTPS: 443. |  [Matrix-based security](https://www.jenkins.io/doc/book/security/managing-security/) |
| Kubernetes Cluster | One of the following:* Same cluster as kubernetes delegate. Use this option if you installed the Harness delegate in your cluster. <li>Username and password.</li><li>CA certificate, client certificate, and client key. Key passphrase and key algorithm are optional.</li><li>For OpenShift: Kubernetes service account token.</li>| Depends where the cluster is hosted, such as GCP or AWS. |  [Authenticating](https://kubernetes.io/docs/reference/access-authn-authz/authentication/) |
| Logz | Token-based. | HTTPS: 443. |  [Announcing the Logz.io Search API](https://logz.io/blog/announcing-the-logz-io-search-api/) |
| OpenShift | Kubernetes service account token. | HTTPS: 443. |  [Enabling Service Account Authentication](https://docs.openshift.com/container-platform/3.6/dev_guide/service_accounts.html#enabling-service-account-authentication) |
| New Relic | API key. | HTTPS: 443. | [Access to REST API keys](https://docs.newrelic.com/docs/apis/getting-started/intro-apis/access-rest-api-keys) |
| Nexus | User account with Repository View Privilege or read for repository. | TCP: 8081. |  [Nexus Managing Security](https://help.sonatype.com/repomanager2/configuration/managing-security) |
| Tanzu Application Service (formerly Pivotal Cloud Foundry) | User account with Admin, Org Manager, or Space Manager role. The user account must be able to update spaces, orgs, and applications. | HTTP: 80 or 443. | [Orgs, Spaces, Roles, and Permissions](https://docs.pivotal.io/pivotalcf/2-2/concepts/roles.html#roles) |
| Prometheus | None. | Depends on where the Prometheus server is hosted. For example, on AWS, port 9090 might be required. |  [Configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/) |
| SMTP | None. | TCP: 25. |  |
| Splunk | User account with Read permissions on eventtypes objects. | TCP: 8089 for API. | [Set permissions for objects in a Splunk app](http://dev.splunk.com/view/webframework-developapps/SP-CAAAE88) |
| Sumo Logic | User account with access ID and key and query permissions. | HTTPS: 443. |  [API Authentication](https://help.sumologic.com/APIs/General-API-Information/API-Authentication) |
| WinRM | User account in the same Active Directory domain as the Windows instances the connection uses. | HTTP: 5985.HTTPS: 5986 and 443.SSH: 22. |  [Installation and Configuration for Windows Remote Management](https://docs.microsoft.com/en-us/windows/desktop/winrm/installation-and-configuration-for-windows-remote-management) |

