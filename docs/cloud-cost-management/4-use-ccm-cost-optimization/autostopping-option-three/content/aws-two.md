import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="AWS" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Prerequisite: Set Up Proxy and/or Load Balancer

AutoStopping is designed to integrate seamlessly with native load-balancing solutions like **AWS ALB**. However, for use cases that fall outside of these integrations such as SSH, RDP, or RDS connections, AutoStopping offers an advanced reverse proxy solution: **AutoStopping Proxy**.


<div className="component-comparison">
  <div className="lb-component">
    <h4>AWS Load Balancer</h4>
    <p>A cloud-native service that distributes incoming HTTP/HTTPS traffic across multiple targets. It monitors web traffic patterns and automatically starts your resources when traffic arrives.</p>
    - SSH/RDP connections ❌
    - Database connections (TCP) ❌
    - HTTP/HTTPS traffic ✅
    - Path-based routing ✅
    - Direct port access ✅

  </div>

  <div className="proxy-component">
    <h4>AutoStopping Proxy</h4>
    <p>A This proxy VM sits in front of your virtual machines and intelligently starts or stops them based on incoming traffic. It supports both HTTP(S) and TCP connections. Built on the proven, open-source Envoy Proxy, the AutoStopping Proxy is capable of managing traffic for multiple AutoStopping-managed VMs from a single instance.</p>
    - SSH/RDP connections ✅
    - Database connections (TCP) ✅
    - HTTP/HTTPS traffic ✅
    - Path-based routing ❌
    - Direct port access ✅ 
  </div>
</div>


<style jsx>{`
  .component-comparison {
    display: flex;
    gap: 20px;
    margin-top: 15px;
  }
  .lb-component {
    flex: 1;
    background-color: #f0f8ff;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #90c2ff;
  }
  .lb-component h4 {
    color: #0b5ed7;
    margin-top: 0;
  }
  .proxy-component {
    flex: 1;
    background-color: #f0fff7;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #8ad3a8;
  }
  .proxy-component h4 {
    color: #157347;
    margin-top: 0;
  }
  .component-footer {
    margin-top: 15px;
  }
`}</style>



Below table shows the resources supported by AutoStopping and the appropriate traffic management you can use for each resource type.

| AWS Resource | AutoStopping Proxy | Application Load Balancer (ALB) |
|--------------|-------------------|--------------------------------|
| Amazon EC2 | ✅ | ✅ |
| Auto Scaling Groups | ✅ | ✅ |
| Amazon RDS Instances | ✅ | ❌ |
| Amazon ECS | ❌ | ✅ |

<Tabs>
<TabItem value="Setup Load Balancer" >


1. In the AutoStopping overview page, click **Load Balancers** in the top right
2. Enter a name and select **AWS** in **Cloud Provider**
3. Choose a cloud connector or create a [new one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws). 
4. Enter **Load Balancer Configuration**.
   - Choose access type as **Internal** or **External**
   - Select the AWS region for deployment
   - Choose an SSL certificate
   - Select the VPC for deployment
   - Choose appropriate security groups

7. Click **Save Load Balancer**


</TabItem>

<TabItem value="Setup Proxy" >


1. In **Harness**, go to the **Cloud Costs** module. Click on **AutoStopping Rules** from left Navbar.
2. Click **Load Balancers**.
3. Click **Create New Load Balancer**. Click **Create New AutoStopping Proxy**.
4. Enter a name and select **AWS** in **Cloud Provider**.
5. Choose an existing connector or [create a new one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws).
6. Enter **Autostopping Proxy Configuration**.
    - **Region**: Select the AWS region where your target resources are hosted
    - **API Key**: Enter a Harness API key for authentication
      - Choose **No Expiration** when creating this key
      - See [Create an API Key](/docs/platform/automation/api/api-quickstart) for more information
    - **VPC**: Select the Virtual Private Cloud where your resources are located
    - **Security Groups**: Select security groups to control traffic flow
      - Ensure all required ports and protocols are allowed
    - **Subnet**: Select the subnet for the proxy deployment
    - **Machine type**: Select an appropriate AWS instance type for the proxy
      - Choose based on your expected traffic volume and performance needs
    - **Key Pair**: Select an SSH key pair to connect to your proxy VM
    - **TLS Certificate Configuration**:
      - **TLS Certificate Secret Version**: Provide a PEM-encoded certificate stored in AWS Secrets Manager
        - Store your certificate in AWS Secrets Manager using the **Other type of secret** option
        - Recommended naming convention: use _harness/_ prefix in the secret name
      - **TLS Private Key Secret Version**: Provide the ARN of your private key secret
        - Format: 'arn:aws:secretsmanager:[Region]:[AccountId]:secret:SecretName-6RandomCharacters'
        - See AWS documentation on [creating secrets](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html)
    - **[OPTIONAL] Encrypted EBS Volume**: Enable to encrypt the EBS volume
    - **[OPTIONAL] Allocate Static IP**: Enable to assign an elastic IP address
      - Makes the proxy publicly accessible
      - Remember to update your DNS records to point to this IP


7. Click on "Save AutoStopping Proxy".


</TabItem>

</Tabs>

-------

## Create AutoStopping Rule

- In Harness, navigate to **Cloud Costs** > **AutoStopping Rules** and click **New AutoStopping Rule**.
- Select Cloud Provider as **AWS**. Select an existing AWS connector or create a new one.

<Tabs>
<TabItem value="Step1" label="Step 1: Configuration">

1. Enter a descriptive **Name** for your rule
2. Set the **Idle Time** - the duration an instance should be inactive before stopping
3. From the **Resources to be managed** section, choose the resource type you want to manage:

<Tabs>
<TabItem value="ec2" label="EC2 VMs">

- Select **EC2 VMs** as the resource type
- Choose the idle behavior: **Shut Down** or **Hibernate**
- Add specific EC2 instances by name (must be in the same AWS region)
- *(Optional)* Choose to **Convert to Spot Instances** or keep as On-Demand

</TabItem>
<TabItem value="ecs" label="ECS Services">

- Select **ECS Service** as the resource type
- Click **Add an ECS Service**
- Choose your ECS Service by either:
   - **Service Name**: Select region, cluster, and service
   - **Service Tags**: Select region, cluster, and tags
- Specify the **Desired Task Count** that Harness should instantiate when the service is running

</TabItem>
<TabItem value="asg" label="Auto-Scaling Groups">

- Select **ASG** as the resource type
- Click **+ Add an auto-scaling group** and select the ASG to onboard
- Choose the on-demand vs. spot ratio for your ASG
   > **Note:** The Mixed Instance Policy must be enabled for the ASG

</TabItem>
<TabItem value="rds" label="RDS Instances">

- Select **RDS** as the resource type
- Click **Add RDS Instance** and select the instance you want to manage

</TabItem>
</Tabs>

------------

4. **Advanced Configuration (Optional)**:
    - **Hide Progress Page**: Toggle this to disable the display of a progress page during instance warm-up.
    - **Dry-Run**: Toggle this button if you wish to evaluate the feature without terminating your cloud resources.
    - **Dependencies**: Link your rule to other AutoStopping rules if resources depend on each other.
      - Click **Add Dependency** and select a rule from the **RULES** drop-down list.
      - In **DELAY IN SECS**, enter the number of seconds the dependent rule should wait after warming up before warming up this rule.
    - **Fixed Schedules**: Create fixed uptime or downtime schedules for the resources managed by this rule. A fixed schedule takes precedence over the idle time logic.
      - Click **Add Fixed Schedule**.
      - Give the schedule a **Name**.
      - Select the **Type** of schedule (**Uptime** or **Downtime**).
      - Select the **Time Zone**.
      - Set the schedule period with **Begins on** and **Ends on** dates and times. You can also select the **Never ends** checkbox.
      - To set a recurring schedule, select the repeat frequency and the days of the week, and set the **Start** and **End** times. You can also select **All Day**.

</TabItem>
<TabItem value="setup-access" label="Step 2: Setup Access"> 

<Tabs>
<TabItem value="ec2-asg" label="EC2 & ASGs">


#### Set up access for TCP workload or SSH/RDP

Setting up access for TCP workload or SSH/RDP allows AutoStopping to detect activity and idleness, and ensure that the database is up and running only when you need it. Use the AutoStopping Proxy URL (IP/Hostname of the Proxy and a unique autogenerated port number) for this AutoStopping Rule when you connect to the RDS database using any database client. The Proxy URL is generated when you save the AutoStopping Rule. If you need to access the resources managed by this AutoStopping rule using TCP or SSH/RDP HTTPS URL, you need to perform the following steps:

- Choose an AutoStopping Proxy load balancer from the Specify AutoStopping Proxy dropdown list to set up access.
- Toggle SSH or RDP to specify the listening ports. The port number is autopopulated based on the security group.
- Specify the source port numbers and the target TCP ports your application is listening to. If the source port is not specified, a random port will be generated at the backend. This auto-generated port will continue to be used as long as the target port remains unchanged or unless the user explicitly modifies the source port.
- Click Next.

#### Set up access for HTTP/HTTPS workload

If you need to access the resources managed by this AutoStopping rule using an HTTP or HTTPS URL, you need to perform the following steps:

Choose an Application Load Balancer or an AutoStopping Proxy load balancer from the dropdown list to set up access.

#### Option A: HTTP/HTTPS Access (Load Balancer)

<details>
<summary>Click to expand HTTP/HTTPS access configuration details</summary>

#### Enter the routing configuration

1. If the security groups are configured for the selected instances, then the routing information is auto-populated for those instances.  
   You can edit or delete the routing information. However, it is mandatory to have at least one port listed. For more information, see [Listeners](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html).

   This is the load balancer routing configuration for the underlying application that is running on the cloud resources managed by this AutoStopping rule.



2. Click **Add** if you wish to add more ports. The following are some points to consider:  
   - If you are forwarding the same action to different ports, then specify the server name and/or path match.  
   - If you specify the server name, then the host uses the custom URL to access the resources. You cannot use an auto-generated URL to access the resources.

##### Add multiple domains with the AutoStopping rule

ALB has certain [limitations](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-limits.html) to consider when creating rules. By default, ALB allows only five conditions on a Listener Rule. This can become problematic when the AutoStopping rule requires configuration for more than five domains. To address this, you can utilize the **Server name** field in the **Port configuration** section.

:::important
Each row in the Port config table represents an ALB rule in Harness. The information provided in the row is translated into an ALB rule by the Harness backend. Therefore, the **Server name** field has a limit of five domains.
:::

You can add a comma separated list of domain names in the server name field to add more domains to the rule. Each server name field can take up to five domain names. Continue adding rows to the table until all domains are included. Each row will generate a new rule in the ALB of the Harness load balancer.

#### Enter the Health Check Details

1. Toggle the **Health check** button to configure the health check. Health check status should be successful for the AutoStopping rules to come into effect. Set a health check for the underlying application that is running on the cloud resources managed by this AutoStopping rule. The load balancer periodically sends requests as per the settings below to the application. If your application does not support health check or you do not have any application running, you can disable the health check.

   By default, the health check is turned on.

2. In Protocol, select **http** or **https**.
3. Enter Path, port, and timeout details. For example, if you have configured port 80 and the timeout as 30 seconds for your instance, then the AutoStopping rule checks these specified parameters before bringing AutoStopping Rule into effect.



#### Specify the URL to access the resources

You can use either of the following methods:

- Auto-generated URL
- Custom URL

**Auto-generated URL**

Every AutoStopping rule has an auto-generated URL. This URL is a subdomain to the domain name specified for the [load balancer](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-for-aws/load-balancer). Since the load balancer configures a wildcard domain such as `*.autostopping.yourcompany.com`, the auto-generated URL works automatically and points to the correct load balancer.

Select **Use the auto-generated URL to access the resources managed by this AutoStopping Rule**.



**Custom URL**

AutoStopping rule can use multiple custom domains. In such a case, it should be configured in the DNS provider. AutoStopping Rules also allows you to use custom domains or change the root of your site's URL from the default, like,`autostop.harness.io`, to any domain you own. To point your site's default domain to a custom domain, you can set it up in your DNS provider.

Enter the custom URL currently used to access the instances. The domain name should be entered without prefixing the scheme. A rule can have multiple URLs. You can enter comma-separated values into a custom URL to support multiple URLs.



#### Configure custom exclusions and inclusions

Before you begin, make sure that you've enabled ALB access logs in your AWS account to be able to configure custom exclusions and inclusions while creating AutoStopping rules. Go to [ALB access logs](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html) for more information.

Custom exclusions and inclusions allow you to keep the cloud resources managed by AutoStopping remain idle by defining rules. These rules prevent the cloud resource from detecting traffic by the AutoStopping rule. For example, you can use custom exclusions and inclusions to filter out repeated traffic such as health checks, which would otherwise keep the cloud resource active at all times. The minimum idle time for the exclusion or inclusion-enabled AutoStopping rule is 15 minutes.

You can configure exclusions by defining either of the following options:

- **Path-based match**: Specify the path that you want to exclude from invoking the instance. You can use wildcards in the path.



  An error message is displayed to the user trying to access the path if the managed resource is in a stopped state. If the resource is active and running, this request is not considered as traffic and is ignored by the AutoStopping rule.

- **Source IP-based match**: Specify one or more IP addresses that you want to exclude from accessing the instance. You could specify an entire range of IP addresses. Use commas to separate the IP addresses.



Any requests from the specified IP addresses are ignored by the AutoStopping rule.

Requests from these IP addresses or to these paths do not disturb the idle time configured for the AutoStopping rule.

Similarly, you can configure custom inclusions. Requests to the specified path or from the specified IP address alone can invoke the cloud resource managed by AutoStopping. Only these requests are detected as traffic by the AutoStopping rule.

</details>

#### Option B: SSH/RDP Access (AutoStopping Proxy)

<details>
<summary>Click to expand SSH/RDP access configuration details</summary>

#### Enter Routing Configuration and Health Check Details

1. If the security groups are configured for the selected instances, then the routing information is auto-populated for those instances.  
   You can edit or delete the routing information. However, it is mandatory to have at least one port listed. For more information, see [Listeners](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html).

   This is the load balancer routing configuration for the underlying application that is running on the cloud resources managed by this AutoStopping rule.


2. Click **Add** if you wish to add more ports. The following are some points to consider:  
   - If you are forwarding the same action to different ports, then specify the server name and/or path match.  
   - If you specify the server name, then the host uses the custom URL to access the resources. You cannot use an auto-generated URL to access the resources.

3. Toggle the **Health check** button to configure the health check. Health check status should be successful for the AutoStopping rules to come into effect. Set a health check for the underlying application that is running on the cloud resources managed by this AutoStopping rule. The load balancer periodically sends requests as per the settings below to the application. If your application does not support health check, or you do not have any application running, you can disable the health check.

   By default, the health check is turned on.

4. In Protocol, select **http** or **https**.
5. Enter Path, port, and timeout details. For example, if you have configured port 80 and the timeout as 30 seconds for your instance, then the AutoStopping rule checks these specified parameters before bringing AutoStopping Rule into effect.


#### Specify the URL to access the resources

You can use either of the following methods:

- Auto-generated URL
- Custom URL

**Auto-generated URL**

Every AutoStopping rule has an auto-generated URL. This URL is a subdomain to the domain name specified for the [load balancer](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-for-aws/load-balancer). Since the load balancer configures a wildcard domain such as `*.autostopping.yourcompany.com`, the auto-generated URL works automatically and point to the correct load balancer.

Select **Use the auto-generated URL to access the resources managed by this AutoStopping Rule**.



**Custom URL**

AutoStopping rule can use multiple custom domains. In such a case, it should be configured in the DNS provider. AutoStopping Rules also allows you to use custom domains or change the root of your site's URL from the default, like,`autostop.harness.io`, to any domain you own. To point your site's default domain to a custom domain, you can set it up in your DNS provider.

Enter the custom URL currently used to access the instances. The domain name should be entered without prefixing the scheme. A rule can have multiple URLs. You can enter comma-separated values into a custom URL to support multiple URLs.

</details>

</TabItem>
<TabItem value="rds" label="RDS Instances">

Since RDS has only autostopping proxy supported, you can use this to manage your traffic.
In Setup Access, select Proxy from drop-down list or create a new one.
Select Source Port and Target Port.
Click on Next.



</TabItem>
<TabItem value="ecs" label="ECS Services">

A DNS link allows you to access the resources managed by the AutoStopping rule using an HTTP or HTTPS URL. To create a DNS Link, you need to:

Select a Load Balancer: The rule requires a load balancer to detect traffic and shut down appropriate instances. Multiple instances and rules can use a single load balancer. It identifies instances based on hostnames and directs the HTTP traffic appropriately.
Select the URL Used to Access the Resources: You can use either of the following methods:
Auto-generated URL: You can use the auto-generated URL to access the resources managed by this AutoStopping Rule.
Custom URL: If using a custom URL:
The domain name should be entered without prefixing the scheme.
A rule can have multiple URLs.
You can enter comma-separated values into a custom URL to support multiple URLs.
AutoStopping rule can also use an additional custom domain. In such a case, it should be configured in the DNS provider.
Select a Load Balancer

Select the load balancer from the drop-down list. The associated load balancer with your ECS service is listed.



Select the URL for Accessing the Resources

You can use either of the following methods:

Auto-generated URL
Custom URL
Auto-generated URL

Every AutoStopping rule will have an auto-generated URL. This URL will be a subdomain to the domain name specified for the load balancer. Since the load balancer configures a wildcard domain such as *.autostopping.yourcompany.com, the auto-generated URL will work automatically and point to the correct load balancer.

Select Use the auto-generated URL to access the resources managed by this AutoStopping Rule.



Custom URL

AutoStopping rule can use multiple custom domains. In such a case, it should be configured in the DNS provider. AutoStopping Rules also allows you to use custom domains or change the root of your site's URL from the default, like,autostop.harness.io, to any domain you own. To point your site's default domain to a custom domain, you can set it up in your DNS provider.

Enter the custom URL currently used to access the instances. The domain name should be entered without prefixing the scheme. A rule can have multiple URLs. You can enter comma-separated values into a custom URL to support multiple URLs.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="review" label="Step 3: Review">

In Review, verify all the configuration details and click **Save Rule**. To edit any of the configuration settings, click **EDIT** and modify the settings.

Your AutoStopping rule is listed under the AutoStopping Rules dashboard.
</TabItem>
</Tabs>


