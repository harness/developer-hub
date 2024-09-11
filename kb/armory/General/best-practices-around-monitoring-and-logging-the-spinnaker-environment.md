---
title: Best Practices around Monitoring and Logging the Spinnaker Environment
---

## Introduction
The following article explains the best practices surrounding monitoring and logging a Spinnaker Environment.  It is meant to provide some general guidance and thoughts about how to monitor an environment.
Monitoring the Spinnaker environment allows customers to be able to do better tracing about when an issue begins and when it has been resolved, and is highly recommended for all customers.
Logging allows customers to refer back to information within microservice logs to look for patterns and changes.

## Prerequisites
Administration access
[Enable Metrics through Armory Observability Plugin](https://docs.armory.io/armory-enterprise/armory-admin/observe/observability-configure/)
[Enable Logging in Armory Enterprise](https://docs.armory.io/armory-enterprise/armory-admin/observe/integrations-logging/)

## Instructions
#### Spinnaker Metrics
Observability within the Spinnaker Environment can be accomplished by leveraging the [Observability Plugin](https://docs.armory.io/docs/armory-admin/prometheus-monitoring/#configure-monitoring-using-the-observability-plugin).  The Observability Plugin allows customers to pull from a series of metrics within Spinnaker to see the health of the environment while it is running.  It is meant to provide data on the services running within Spinnaker.  
Metrics are in a [generic metric format](https://micrometer.io/docs/concepts#_naming_meters) by default, and may need to be adjusted for your target platform.  Typically, what can happen is that periods may need to be replaced with underscores, and as an example, additional details such as ```count``` or ```sum``` are added to provide context.  For example, ```okhttp.requests``` is the original metric, but then it will present in Prometheus as ```okhttp_requests_seconds_count```, describing itself as a metric using the unit of seconds, and that it is is a count value of ```okhttp.requests```
However, a note of caution that some metrics may be mislabelled for the metric units.  If any of these are encountered, please inform us and we can assist with resolving the issue by opening a ticket with our Support team
As an example of metrics to put in the forefront, it is suggested that customer monitor their applications, such as JVM metric data, queue times, cache latency.  Viewing and understanding where leaks can happen and their source can be very helpful in finding a root cause.  There have been a couple OSS blog posts with regards to this monitoring that can be found here:
* [https://blog.spinnaker.io/monitoring-spinnaker-part-1-4847f42a3abd](https://blog.spinnaker.io/monitoring-spinnaker-part-1-4847f42a3abd)* [https://blog.spinnaker.io/monitoring-spinnaker-sla-metrics-a408754f6b7b](https://blog.spinnaker.io/monitoring-spinnaker-sla-metrics-a408754f6b7b)
#### Infrastructure Metrics
To ensure that the environment infrastructure is healthy, it is recommended that customers also look to monitor the overall infrastructure. 
For example, if the environment exists solely within AWS, administrators would also want to monitor the health of the cluster hosting the Spinnaker Environment, the database (RDS or otherwise) using their standard operating procedures.  Set up of monitoring of these areas exists outside the bound of this documentation, but it is recommended customers consult with their Cloud Provider or their DevOps and DBAs for the appropriate standard metrics to monitor.
Below are some general examples, but is by no means, a complete list:
* Setting up CloudWatch Metrics such as burst budget limits on EBS Volumes and CPU usage are amongst the items to consider* Redis and MySQL metrics, such as storage usage, IO wait times etc.  Transactions per second limits also may be helpful and should be a part of a DBA's standard checks on any database* Deployment target metrics, such as the EKS environment being deployed to, API Rate Limits on artifact stores
#### Environment Logs
Customers should also look to store the logs of services in a log aggregator whenever possible.  This allows customers to refer back to see changes in the services and correlate and track issues that may happen.  For example, if a pipeline fails, the issue in the console may tell only part of the story, as the failure may have had cascading effects across a customer's environment.  Correlating all the logs in those services when multiple services are involved can be extremely taxing for admins.
It is also recommended that the more complicated a Spinnaker environment, the more urgent logging will become for a customer.  As customers look to create replica sets and additional pods for services, tracking the exact service that was involved in the issue will become more difficult.  For example, an issue in Clouddriver will be hard to trace to the exact Clouddriver pod, because any one of the replicas may have been used to execute the changes.  Armory's example documentation includes some JSON examples of Dashboards: [https://docs.armory.io/armory-enterprise/armory-admin/observe/integrations-logging/#splunk-dashboard-examples](https://docs.armory.io/armory-enterprise/armory-admin/observe/integrations-logging/#splunk-dashboard-examples)
 

