---
sidebar_position: 1
hide_table_of_contents: true
title: AutoStopping RDS with Proxy
description: This guide walks you through the steps to reduce RDS costs by using AutoStopping rules.
---
# Reducing RDS Costs made easy with Harness AutoStopping Proxy

AWS RDS, or Amazon Relational Database Service, is a fully managed database service provided by Amazon Web Services (AWS). It simplifies the process of setting up, operating, and scaling a relational database in the cloud. 

Optimizing the usage of cloud resources is a significant problem that organizations confront in the present day. Even allowing a small, unused virtual machine (VM) to remain active can have a negative impact on your cloud expenses. Now consider the implications of leaving a Quality Assurance (QA) or pre-production Relational Database Service (RDS) cluster running idly, without any users accessing it. Such oversight can significantly affect your organization's cloud costs. Furthermore, manually inspecting your non-production environment for unused resources can prove challenging and inefficient.

Imagine having the capability to start RDS instances when developers require them and seamlessly shutting them down when they are no longer needed. By implementing such a system, the organization can drastically minimize wastage of cloud resources, resulting in substantial cost savings on the cloud bill. This proactive approach ensures that resources are utilized efficiently, aligning with the organization's goal of optimizing cloud expenditure.

Harness Cloud Cost Management provides a valuable solution to address this challenge. Its intelligent cloud AutoStopping feature sets it apart by effectively reclaiming wasted budgets without requiring any modifications to your existing infrastructure. By leveraging AutoStopping, idle resources are automatically stopped when no traffic is detected, and promptly restarted when traffic is detected again. The implementation of this feature has resulted in significant cost savings for customers in their pre-production environments. 

Harness AutoStopping Proxy provides an effective solution to reduce non-production cloud costs with minimal setup requirements and without causing disruptions for developers and other users. By onboarding your RDS instance or cluster to AutoStopping using the proxy, you will incur costs for the RDS only when it is actively utilized. Moreover, when the RDS instances are not in use, they are automatically stopped, further optimizing your cloud expenditure. 

<docimage path={require('../static/rds-autostopping-proxy/rds-tutorial.png')} width="60%" height="60%" title="Click to view full size image" />

## Use Harness AutoStopping proxy for RDS

1. Create a Harness AutoStopping proxy. <!--For more information, go to [AutoStopping Proxy for AWS](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/load-balancer/create-autoproxy-aws-lb).-->
2. Create an AutoStopping rule for the RDS instance or cluster. <!--For more information, go to [Create AutoStopping rule for RDS](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-auto-stopping-rules-for-rds).-->
3. Connect to the RDS instance or cluster by using the AutoStopping proxy. If the RDS instance or cluster is in the stopped state, Harness starts it for you, allowing you to resume usage seamlessly. Subsequently, when you finish utilizing the RDS instance or cluster, Harness promptly detects this and initiates the process of stopping it. 

### Create Harness AutoStopping proxy

1.  In **Harness**, go to the **Cloud Costs** module.
2. Under **Setup**, select **Load Balancers**.
3. Select **Create New Load Balancer**.
4. Select **AWS**.
5. Choose an existing connector or [create a new one](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/connect-to-an-aws-connector).
6. Select **Continue**.
7. Select **Create AutoStopping Proxy**. 
8. Select **Continue**.
9. In the **Create a new AutoStopping Proxy** window, enter the following information:
    1. Provide a name for the AutoStopping Proxy.
    2. Select your preferred DNS provider and perform the mapping:
        *  If you select **Route 53**, you must choose a hosted zone from the available zones and enter the domain name. AutoStopping manages Route 53 configuration automatically. To know more about Route 53, go to [Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html).
        * If you select **Others**, enter the URL of the DNS provider. Make sure that you have updated the DNS mapping in your DNS provider.
    3. Select **Continue**.

<docimage path={require('../static/rds-autostopping-proxy/aws-autoproxy-lb.png')} width="60%" height="60%" title="Click to view full size image" />


10.  **Select region**: Select the region where you have your cloud resources hosted.
11.  Select the **VPC** from the dropdown list.
12.  **Machine type**: Select the instance family type from the dropdown list.
13.  **TLS Certificate Secret Version**: AutoStopping proxy supports PEM-encoded certificates. You need to provide the certificate and the private key. A Cert chain is not required for the configuration. On the AWS console, go to **Secrets Manager**, and store a secret. It is recommended to use _harness/_ in the secret name. You must choose the **Other type of secret** option. Go to [https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) for more information. After successfully storing the secret, enter the **Secret ARN** in this field. 

  Sample certificate:


```
-----BEGIN CERTIFICATE-----
eQIEAgSB9QSB8gDwAHUAtz77JN+cTbp18jnFulj0bF38Qs96nzXEnh0JgSXttJkA
AAGGB1K4zAAABAMARjBEAiAEid8oukcRazjXOhTmBnltMywAbDEh9otaMU0uBNoX
WAIgCv51cPbu4vdbqbnYpVzxvvaXJ3ChLT50/Hrs5TNDfdAAdwDoPtDaPvUGNTLn
Vyi8iWvJA9PL0RFr7Otp4Xd9bQa9bgAAAYYHUrjHAAAEAwBIMEYCIQD7RInjHBFJ
xnye2BBsRrHH4cj14KVMIARl2edDB3RbAQIhAPaCZVUyREHa+tgHPzcErg+4tojf
W8gZLmeh45w7vaOkMA0GCSqGSIb3DQEBCwUAA4IBAQBh4DhJcp9Si2s6H+dMJjp2
1Z6pSyUvqZ43Lv4d9FNPcMgl04YPIgVP696+CymF+7nOJucaGtI3ge1MMdSDYbNW
NWCG+IEiumJXo/rh7XkYpoa5hMlI7RXWhcLqhz8ozfcPeYloAK7vDhse6q+jk6+4
wvxARtulONAIBcPg/JTnGnPoNHSvg3qM4C9DV805U9qlFTEeUemOuPkmAOXV0ZMv
VWXJ58IKOQeyI31okW0J/5p8oGjS1eN1IkbMy3YDtPP7ERCTSsBdD4V32cFwN5OT
zUfdbO+mWOKNUQDyQiBnlNNM3Gkkn5P8zYHfL97kSLXyadOOWwU0eEDd4iJJSDtJ
-----END CERTIFICATE-----

```


<docimage path={require('../static/rds-autostopping-proxy/secret-name-convention-aws.png')} width="60%" height="60%" title="Click to view full size image" />


<docimage path={require('../static/rds-autostopping-proxy/secret-creation-aws.png')} width="60%" height="60%" title="Click to view full size image" />


14.    **API Key**: Enter a valid API key generated in Harness New Generation. Choose **No Expiration** in the Expiration dropdown list while creating this API key. Go to [Create an API Key](/docs/platform/Resource-Development/APIs/api-quickstart) for more information.
15.    **Select security groups**: Select the **Security Group** of your instance.
16.    **Key pair**: Select the SSH key pair to connect to your VM.
17.    **TLS Private Key Secret Version**: Enter the **Secret ARN** in this field.

18.  Enable **Allocate Static IP** if you need to assign an elastic IP address to make the instance publicly accessible. Update the DNS route to point to the public IP. You don't need to enable this field if it is pointing to a private IP provided the DNS resolves. For example, when the DNS resolution is done within the VPC.
19.  Select **Save Load Balancer**.


### Set up Harness AutoStopping Rule for RDS
This section walks you through the steps to configure an AutoStopping rule for your RDS instance.

### Define the AutoStopping rule

1. In **Cloud Costs,** in **AutoStopping Rules**, select **New AutoStopping Rule**.
2. In the cloud account type, select **AWS**. It is the cloud account in which your workloads are running that you want to manage using AutoStopping rules.
3. Select your AWS account from the **Connect to your AWS account** dropdown list and select **Next**. If you have not added an AWS cloud account, see [Connect to an AWS Connector](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/add-connectors/connect-to-an-aws-connector).
   
  <docimage path={require('../static/rds-autostopping-proxy/create-auto-stopping-rules-for-rds-75.png')} width="60%" height="60%" title="Click to view full size image" />

4. In **Define your AutoStopping rule**, in **Name your Rule**, enter a name for your rule. This is the name of your AutoStopping rule.
5. In **Idle time**, enter the idle time in minutes. This is the time that the AutoStopping rule will wait before stopping the idle instances.

### Select the Resources to be Managed by the AutoStopping Rule

Select the cloud resources that you want to manage using this rule. AutoStopping Rule will monitor the selected resources and stop them when they are idle beyond the configured idle time.

1. In **Select the resources to be managed by the rule**, select **RDS** and then select Add RDS instance.
   
    <docimage path={require('../static/rds-autostopping-proxy/create-auto-stopping-rules-for-rds-77.png')} width="60%" height="60%" title="Click to view full size image" />

2. In **Select RDS Instance**, do the following:
	1. Select the region where your instance is hosted from the drop-down list.
	2. Select the RDS instance for which you want to enable AutoStopping Rule and select **Add Selected**.
    
      <docimage path={require('../static/rds-autostopping-proxy/create-auto-stopping-rules-for-rds-78.png')} width="60%" height="60%" title="Click to view full size image" />

	3. Once you've made all the selections, select **Add Selected**.
3. Select **Next**.

### (Optional) Set Up Advanced Configuration

In this step, you can configure the following settings:

#### Hide progress page

Toggle the button to disable the display of progress page during instances' warming up process. This option is especially useful when the service is invoked by an automation system, as it prevents misinterpretation of the progress page as the intended response from a service that is onboarded to AutoStopping. By hiding the progress page, the first response of warming up a rule after a downtime will be delayed until the intended service is up and running.

<docimage path={require('../static/rds-autostopping-proxy/create-autostopping-rules-for-kubernetes-83.png')} width="50%" height="50%" title="Click to view full size image" />


#### Dry Run

Toggle the button if you wish to evaluate this feature without terminating your cloud resources. For more information, go to [Evaluate AutoStopping rules in dry-run mode](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/autostopping-dry-run-mode).


#### Add Dependency

Set dependencies between two or more AutoStopping Rules when you want one Rule to make one or more Rules to be active based on the traffic that it receives. For example for an application server dependant on a database server, create two AutoStopping Rules managing both the servers. Add a dependency on the Rule managing the application server to be dependant on the Rule managing the database server.

1. In **Dependencies**, select **add dependency** to add a dependency on any existing rule.
2. Select the rule from the **RULES** drop-down list.
3. In **DELAY IN SECS**, enter the number of seconds that rule should wait after warming up the dependent rule. For example, you have Rule 1 dependent on Rule 2, and you have set 5 seconds delay. In that case, when the request is received to warm up Rule 1, then first Rule 2 (dependent rule) is warmed up, and then there is a delay of 5 seconds before warming up Rule 1.
4. Once you're done with all the configurations, select **Next**.
   
#### Fixed Schedules

Create fixed uptime or downtime schedules for the resources managed by this AutoStopping Rule. When a resource is configured to go up or down on a fixed schedule, it is unaffected by activity or idleness during that time period.

In certain scenarios, you would not want your resources to go down or up. For example, every Friday at 5 p.m. you want your `ABC` resource to go down. You can schedule downtime for your `ABC` resource. During this window, the resource is forced to go down regardless of the defined rule. You can choose to specify uptime for your resources in the same way.

:::note
The fixed schedule takes precedence over the defined AutoStopping Rule. 
:::

:::note
Harness executes scheduled rules using [Dkron](https://dkron.io/), an open-source workload automation service.
:::

To create a fixed schedule for your rule, do the following:

1. In **Fixed Schedules**, select **Add Fixed Schedule**.
   
      <docimage path={require('../static/rds-autostopping-proxy/create-autostopping-rules-aws-98.png')} width="50%" height="50%" title="Click to view full size image" />

2. In **New Fixed Schedule**, enter a **Name** for your schedule.
3. In **Type**, select the type for your schedule. You can schedule an **Uptime** or **Downtime** for your rule. As per your schedule, the resources go up or down.
4. Select the **Time Zone** from the drop-down list.
5. In **Set schedule period**, use the date picker to set the start and end time for your schedule.
	1. In **Begins on**, select the start date and time for your schedule. You can select a date and specify the time.
	2. In **Ends on**, select the end date and time for your schedule. You can select a date and specify the time. Ensure that **Never ends** checkbox is unselected to set the end time.  
	  
	If you don't specify an end time, the schedule continues to run until you manually update the settings or remove the schedule.
6. Select the checbox **Never ends** if you do not want to set end time for your schedule.
7. You can also set a recurring schedule for the rule. If you want to set a recurring schedule, in **Uptime/Downtime in the selected period**, in **Repeats**, select the repeat frequency.
	1. Select which days of the week you'd like your schedule to repeat. You can choose any day between Sunday and Saturday.
	2. Select **Everyday**, to set the schedule for all seven days of the week.
	3. Set your repeat schedule's beginning and ending time. In the **Time** field, specify the start and end time for the fixed schedule.
	4. Select **All Day**, if you wish to set your schedule for the entire day. If you choose All Day for your schedule, you won't be able to choose a start and end time.  
	  
	**Example 1**:  
	In the following example, resources are up every Mon, Tue, Wed starting from 12:00 a.m. on February 14, 2022 till April 30, at 10:00 p.m.
     
       <docimage path={require('../static/rds-autostopping-proxy/create-autostopping-rules-aws-99.png')} width="50%" height="50%" title="Click to view full size image" />

     
     **Example 2**:  
	In the following example, resources are down every day (all day) starting from 12:00 a.m. on February 14, 2022 till April 30, at 12:00 a.m.
    
      <docimage path={require('../static/rds-autostopping-proxy/create-autostopping-rules-aws-100.png')} width="50%" height="50%" title="Click to view full size image" />

8. Select **Apply**.

### Setup Access

In the Setup Access screen, select the AutoStopping Proxy from the dropdown list or [create a new one](#create-harness-autostopping-proxy). Specify the source port numbers and the target TCP ports your application is listening to. If the source port is not specified, a random port will be generated at the backend. This auto-generated port will continue to be used as long as the target port remains unchanged or unless the user explicitly modifies the source port.

### Review

In Review, verify all the configuration details and select **Save Rule**. To edit any of the configuration settings, select **EDIT** and modify the settings.

Your AutoStopping rule is listed under the [AutoStopping rules summary page](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/autostopping-dashboard).

### Use Harness AutoStopping CLI to Keep the RDS Instance(s) Running

You can also use Harness AutoStopping CLI to query the archived database using your own database client. Basically you're leveraging Harness CLI to keep the RDS instance(s) running.

1. From the AutoStopping dashboard, select the RDS rule.
2. In **Download CLI**, select your operating system to download the Harness CLI for your system.
   
    <docimage path={require('../static/rds-autostopping-proxy/create-auto-stopping-rules-for-rds-79.png')} width="60%" height="60%" title="Click to view full size image" />

3. Select **Download CLI**.
4. Run the following command to connect to an RDS database.  

```
harness connect --host hostname --port 5432
```
  
The above command will start the RDS database if it is not running and set up a secure tunnel to it. This command will output the connection details to which you can connect your database client.
5. As an example, in the case of Postgres, the following command can be used to connect to the database.  

```
psql -h localhost -p port-received-from-above -u postgres
```
  
As soon as your database client is disconnected, AutoStopping recognizes the instance as idle and proceeds to automatically shut down the database after the specified idle time has elapsed.




