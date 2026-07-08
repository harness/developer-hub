---
title: Armory Managed Services
---


# **Armory Managed Services**
Focus on building apps and not managing Spinnaker. Armory experts will take over Spinnaker operations, upgrades and break-fix efforts in your environment. 

With Armory experts managing Spinnaker using our proven methodology and best practices, your Engineering team is free to focus on enabling the digital transformation required to move the business forward. This helps give you a competitive edge by accelerating innovation that enables the delivery of new applications and services that are faster and better than those of your competitors.

# What’s Included

Armory installs Spinnaker in your environment
* Kubernetes Operator at the core* Armory manages Kubernetes cluster Spinnaker is installed in
Armory monitors Spinnaker 24x7
* 99.9% uptime SLA* 1 Hour P0 incident response-time SLA* Identify and fix issues proactively* Notify in the event of critical issues and time to recover
Armory manages Spinnaker upgrades and patching
* Armory will proactively notify customer prior to upgrades and patches* Upgrades are promoted from sandbox → production* Post-upgrade verification is executed each time* Armory release 2 weeks after major OSS release (barring P0 issues discovered)
Enterprise-grade security & compliance
* Continuous security scanning and CVE patching
Backup and recovery management
* Armory will regularly backup key Spinnaker data to enable point in time recovery


# Out of Scope

Application & user on-boarding onto Spinnaker
* Available as a part of Armory Premium Support
[Spinnaker Training](https://www.armory.io/spinnaker-training/) 
* Available as a part of Armory Premium Support
* Troubleshooting, maintenance, and support of third-party software that interacts with Spinnaker (ie. Jenkins, Vault, Github)

# Monitoring & Incident Response

Armory will monitor Spinnaker 24x7 using its own monitoring system and proactively respond to any detected issues. The following table describes Armory’s response times for each type of incident. The response time SLAs are the same for issues created by the customer or by Armory Engineers during proactive monitoring. 


Priority

Response SLA

Definition

P-0

1 hour 24x7

The Armory production instance is severely impacted and no workaround exist. Includes security issues.

P-1

1 business day

In production clusters:
A non-critical feature is not working correctly and is blocking partial use of the platform, while other functionality is working correctly. 
In non-production clusters:
An issue that blocks the promotion of changes to a production cluster

P-2

4 business days

Any issue affecting non-production clusters which is non-critical and non-time-sensitive


The SLI and SLO described in [this document](https://go.armory.io/managed-spinnaker-monitoring-metrics) help Armory measure the state of the system and are the foundation for the SLAs above.

# Support and Escalation Process

As part of Armory’s Managed Spinnaker offering, Armory Engineers proactively monitor your Spinnaker instances. Additionally, the designated Technical Account Manager provides ongoing touchpoints around support issues, feature requests, and roadmap items while also holding quarterly service level reviews. You can expect responses based on the response time SLAs described [here](https://go.armory.io/managed-spinnaker-monitoring-metrics).

For cases where issues were not detected by Armory or new feature requests, support tickets should be filed through the Armory support portal [http://go.armory.io/support](http://go.armory.io/support).  They will be triaged and handled based on priority and SLA. All communication about the issue will occur in comments within the support ticket.
* In some cases, Armory engineers may reach out via Slack to uncover more information about the issue. Armory updates the support ticket after the real-time chat is complete.
For cases where an issue is discovered by Armory, Armory will open a support ticket on your behalf within Armory support portal. You will be notified via email and Slack. All communication about the ticket will occur in comments within the support ticket.
* In cases where Armory discovers a critical issue, Armory engineers will reach out and send updates via Slack. Armory updates the support ticket after the real-time chat is completed.


# Managed Spinnaker Configuration Changes

Depending on the customer's level of comfort, Spinnaker configuration changes can be handled in two ways:

Change request filed through Armory support portal [http://go.armory.io/support](http://go.armory.io/support) and applied by Armory Engineer to dev and production environments. All communication about the issue will occur in comments within the support ticket.
* In some cases, Armory Engineers will reach out via Slack to get more information about the desired configuration state. We will update the support ticket after the real-time chat is completed.
* Because all Spinnaker configurations are stored in source control, customers can initiate a configuration change themselves. The changes get reviewed by Armory Engineers and automatically applied to dev and then production clusters.

# Auditing Spinnaker Events

Monitoring and logging can be configured to emit key metrics and logs to the customers’ preferred monitoring and centralized logging system for auditing purposes. You need to ensure Spinnaker can reach these services and file a change request in the Armory support portal with access details to get this option enabled.

# Managed Spinnaker Resources Ownership

Because Spinnaker is managed by Armory within a customer's environment and Armory does not typically have full access to lower-level infrastructure resources and controls, Armory practices the shared responsibility model outlined below.  There are “minimum” requirements, but Armory can own up to as much of the managing infrastructure as viable while in communication with customers around requirements for the environment.  Any ownership of resources outside of Armory control adds complexity and operational overhead, which may reduce overall uptime and deliverables.

## Customer Responsibility

* IAM profiles & policiesNetworking to internal resources including:
* VPNs* IP Whitelisting (IPs for spinnaker to access can be provided)* VPC Peering/inter-regional access* DNS (2 domains will be required to be created minimum)* SSL Certificates including ACM pre-configured* Security Groups for internal controls allowing access from Spinnaker* IP Management & access
* WAF - a default WAF ruleset can be provided* Security Scan of infrastructure* IDS/IPS/etc.* Spinnaker Deployment Target AccountsRun jobs
* Customer created custom run jobs are customer responsibility and need to run the same environment targeted for deployments


## Armory Preferred Control and Responsibility

Networking
Dedicated VPC Creation including
* Subnets* Routing* Internet Gateways 
* Load balancers for Spinnaker itself* Security Groups for Spinnaker internal communications & load balancers
Kubernetes
* Worker Nodes (Logging access, container access)
* S3 or GCS bucket* Logging (sent Externally)* Metric data (sent Externally)* Uptime of endpoints* Lifecycle Management / Operations of containers* Security scan of containers* Access to the Spinnaker UI

## Armory Minimum Viable Control and Responsibility

If Armory preferred control and responsibility can not be granted, maintenance and support of Spinnaker will require extra configuration and will affect Armory’s ability to troubleshoot and support the environment.

Kubernetes
* Worker Nodes (Logging access, container access)
* S3 or GCS bucket* Logging (sent Externally)* Metric data (sent Externally)* Uptime of endpoints* Lifecycle Management / Operations of containers* Security scan of containers* Access to the Spinnaker UI

# Armory Access Requirements

Armory Managed Team needs full access to the environment where Spinnaker gets installed and the Spinnaker UI for the installing, upgrading and rebuilding Spinnaker or any other actions required to effectively manage it. Customers can segment Spinnaker into a separate virtual network for these purposes (highly recommended). Spinnaker needs to have access to the rest of the environments where it is deploying into. 

Full access requirements can be found below.


* 

In order to run Armory Spinnaker in a customer-provided cluster, the Armory Managed Services organization requires, at a minimum, the following access to the customer environment:

A Kubernetes cluster dedicated to Spinnaker with full administrative access to the cluster:
* Built with autoscaling enabled* Access to container logs of the environment* system:master access
S3/GCS/Minio bucket including the following:
* A dedicated bucket for storing Spinnaker configurations that is exclusively for Spinnaker and core services (secrets, applications, data, backups, etc.)* Pods running in the cluster permissions to access the bucket* Pods running in the cluster connectivity to access the bucket endpoint
A database running MySQL 5.7+ compatible including the following:
* A database cluster with primary & read replicas (RDS, Aurora, Galera or cluster).  Databases utilizing block replication or other equivalents are acceptable.  Async replication is not supported.* Pods running in the Kubernetes cluster must be able to access the database instance via username/password or whitelisted IPs.* Administrative access to the database including permissions to create databases/schemas, backups, and analyze performance* Backup & restore permissions* Logging for the database including access to the logs
Ability to expose Spinnaker services running in the Spinnaker Kubernetes cluster to end users.  This will consist of the following:
* Ability to set up a load balancers (NLB+ALB) that end users can use to access Kubernetes Services. (This can be internal but will require VPN or other connectivity.)* ALB Ingress Controller to manage listeners* NLB for x509 Client authentication* DNS entries to point to the load balancer* SSL Certificates for the load balancer (ALB) via ACM
UI (web) access to the load balancers that will be set up.  This can be achieved in one of several ways:
* Access to a jump server with a browser that has access to the endpoints* VPN access to the network environment* VPCE Endpoint exposed to Armory infrastructure* Authentication/credentials access for a team of 4+
Log Aggregation
* Armory needs to access to configure logging to external aggregation sources (DataDog, ELK stack)
Monitoring
* Armory needs access to deploy DaemonSets to monitor the spinnaker environment, including Redis, SQL, and services in the cluster
Notifications
* Spinnaker needs network access to send data to notification endpoints (webhooks such as git, [debug.armory.io](http://debug.armory.io/), and other external SaaS platforms)

In addition, since Spinnaker will need be interacting with multiple other tools in Customer environment, the following access(es) may be required.  We can assist in identifying best practices in many of these areas. The following illustrates the kind of access Spinnaker needs but is not a definitive list of what Spinnaker can integrate with:
Jenkins access
* Spinnaker needs credentials for any relevant Jenkins instance(s)* Pods running in the Spinnaker Kubernetes cluster need network access to the Jenkins endpoint(s)
Git
* Spinnaker needs credentials for any relevant GitHub, BitBucket, or other Git instances* Pods running in the Spinnaker Kubernetes cluster need network access to the Git endpoint(s)
Docker Registry access
* Spinnaker needs credentials for any relevant Docker registry instances (Docker Hub, ECR, etc.)* Pods running in the Spinnaker Kubernetes cluster needs network access to the Docker registry endpoint(s)
Metrics Providers access
* In order to perform Canary Analysis, Spinnaker needs credentials (if applicable) and network access to any relevant metrics providers (DataDog, Prometheus, etc)

Since Spinnaker will be *deploying* to multiple environments, Spinnaker also needs the following (examples):
* Network access to the Target Kubernetes cluster API servers where Spinnaker deploys to* Service accounts in the Target Kubernetes cluster(s) with access to the namespace(s) where Spinnaker deploys to.  Spinnaker needs all actions (get, list, create, update, patch, watch, delete, deletecollection) on all object types that Spinnaker creates, including child types in the targeted environment.Credentials for the Kubernetes service accounts in the instances where Spinnaker deploys to.  This can take one of several forms:
* A token for the service account(s) which exists in the target Kubernetes cluster* A kubeconfig with aws-iam-authenticator and accompanying IAM credentials so that services running in Spinnaker Kubernetes cluster have access to the service account in the Target Kubernetes cluster (ideally utilizing role assumption to a managed role)

If Spinnaker deploys to AWS, then the worker nodes (or Service account) Spinnaker runs under needs the following permissions:
In the account where Spinnaker runs, an IAM role which Spinnaker has access to (known as the ‘managing’ or ‘source’ role) needs the following properties:
These permissions:
* Describe Availability Zones (ec2:DescribeAvailabilityZones)* Describe Regions (ec2:DescribeRegions)* Ability to assume roles (aka sts:AssumeRole) in managed accounts
* The ability for Spinnaker to directly access this role (such as with a trust relationship with the EC2 nodes backing EKS)
In each account that Spinnaker deploys to, an IAM role which the above role can assume **into**** **(‘managed’ or ‘destination’ role).  This role needs the following:
These permissions:
* PowerUser. You can grant less permissive permissions, but this is a good baseline for what Spinnaker needs.  For example, if you are deploying EC2, Spinnaker needs essentially all EC2 permissions and many more.* PassRole (iam:PassRole)* ListServerCertificates (iam:ListServerCertificates)
* Additionally, a trust relationship with the ‘managing’ role)
* If you are baking EC2 images, then the ‘managing’ role needs the ability to bake images or you need an IAM user to be able to bake images.* Permissions to all regions where Spinnaker deploys resources to* Network connectivity for these regions in order to “bake” or deploy resources, depending upon need (aka running custom packer templates to do local provisioning requires SSH access to the baked image, but not permissions post-back to a VPC).

