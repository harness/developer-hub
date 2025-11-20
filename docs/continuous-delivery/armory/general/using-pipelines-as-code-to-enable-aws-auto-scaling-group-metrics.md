---
title: Using Pipelines as Code to Enable AWS Auto Scaling Group Metrics
---

## Introduction
In the UI, we can enable AWS Auto Scaling Group (ASG) Metrics by clicking on individual clusters within an Application, scrolling down in the slide out to the Advanced Settings sub menu and opening the "Edit Advanced Settings" dialog. When clicking inside the "Enabled Metrics" field, we are presented with a number of metrics that correlate to the metrics in the AWS ASG Monitoring console:

Details on what the metrics report can be found in the [AWS EC2 Auto Scaling Metics Documentation.](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#available-cloudwatch-metrics)
This process needs to be done for every ASG created as part of an Application so is not scalable where ASG's are being recreated frequently and the metrics are required for operational reasons. This can, however, be achieved by enabling the metrics in a dinghyfile.

## Prerequisites
* Dinghy setup per the [Using Dinghy documentation](https://docs.armory.io/docs/spinnaker-user-guides/using-dinghy/)* Application clusters being defined and deployed as part of a pipeline

## Instructions
Under the cluster definition, locate or insert the ```enabledMetrics``` key:
```
      "stages": [
        {
          "clusters": [
            {
              
              },
              "cloudProvider": "aws",
              "cooldown": 10,
              "copySourceCustomBlockDeviceMappings": false,
              "delayBeforeDisableSec": 0,
              "delayBeforeScaleDownSec": "0",
              "ebsOptimized": true,
              "enabledMetrics": [],
```            ​
* Insert the metrics required as a ***comma separated list*** into the ```enabledMetrics``` field. The metric names to insert here are mirrored in the UI i.e. ```GroupMaxSize```, ```GroupMinSize``` etc.

