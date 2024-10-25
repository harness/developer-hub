---
title: Configure ECG for AutoStopping Rules
description: This topic describes how to configure ECG for AutoStopping Rules.
sidebar_position: 50
helpdocs_topic_id: ux8wo1l75q
helpdocs_category_id: 6bw1qej23v
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to configure ECG for AutoStopping Rules. You can assume ECG as an **event emitter** for your rule. It sends usage records for the configured rules.

When the ECG is configured to watch a workload, an AutoStopping Rule will not stop the resource until the workload finishes running. ECG comes with the following pre-installed watchers:

* Metrics
* Process

By default, the AutoStopping Rule listens to HTTP/HTTPS traffic. On the other hand, a resource can be working on long-running background jobs like batch jobs. Nightly data updates or scheduled processing, for example. In this scenario, relying just on network traffic to detect resource idleness is not the ideal solution. For such scenarios, you can configure ECG for your AutoStopping Rules.

## Metrics Watcher

Metrics watcher is used to detect idleness based on CPU and memory of the resource. If the CPU and memory values are below the configured limit, AutoStopping will detect that as idleness for the resource and stop it.

```
[metrics]  
cpu = "40"  
memory = "5Gb"
```

## Process Watcher

Process watcher watches for the existence of processes that match the supplied condition. When a process with the matching condition is detected, AutoStopping will detect that as idleness for the resource and stop it.

```
[process]  
condition = "python*"
```

### Configure ECG

You can configure either metrics or process watcher for your rule.

#### Step 1: Install the ECG Agent

ECG is supported only for Unix-like machines. To install the agent,

1. Download the ECG file from the S3 link:  
[https://lightwing-downloads-temp.s3.ap-south-1.amazonaws.com/ecg/ecg_1.2.0_linux_amd64.zip](https://lightwing-downloads-temp.s3.ap-south-1.amazonaws.com/ecg/ecg_1.2.0_linux_amd64.zip)

```
wget https://lightwing-downloads-temp.s3.ap-south-1.amazonaws.com/ecg/ecg_1.2.0_linux_amd64.zip
```

2. Unzip the file and navigate into the resulting folder

```
unzip ecg_1.2.0_linux_amd64.zip
cd ecg_1.2.0_linux_amd64
```

3. Check the contents of the installation script, make it executable, and execute it as root

```
cat install.sh
chmod +x install.sh
sudo ./install.sh
```

#### Step 2: Specify the Configuration Details

To configure ECG for your rule, provide the following configuration details:

1. **Account ID**: Account ID for which you want to enable ECG. You can copy the account ID from the Harness Manager. In Harness Manager's address bar, copy the **Harness account ID** from your Harness URL. The Harness account ID comes after `account` in the URL.  
  
For example in the following URL, the account ID is `1a2b3c`: `https://app.harness.io/ng/account/1a2b3c`.

2. **Hostname of the AutoStopping Rule**: Hostname of the AutoStopping Rule for which you want to configure the ECG. You can copy the hostname from the [AutoStopping dashboard](../1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/4-create-auto-stopping-rules/autostopping-dashboard.md). To obtain the hostname, do the following:
  a. In **AutoStopping Rules**, in **Summary of Rules**, click the rule for which you want to configure the ECG.
  b. Copy the hostname.

![](./static/configure-ecg-for-auto-stopping-rules-00.png)

3. [optional] **process**: A regex for the process to watch for. For example, if the process you want to watch is a simple python script `python trainmodel.py` we could specify `trainmodel.py`:

```
[process]  
condition = "Python*"  
```

4. [optional] **metrics**: A threshold for CPU and memory for determining "activity" on the instance. If you specify both, they will both need to be met to be concidered active.

```
[metrics]  
cpu = "40"  
memory = "2Gb"
```

*You will need to specify at least one of `[metrics]` or `[process]`.*


#### Example

Assume your long-running job is a simple Python script:

```
> python trainmodel.py
```

And your threshold for resource useage is 50% CPU and 1G memory.

The following example shows how to configure `ecg` with the above details:

```
# Configuration file for the ECG agent  
  
accountID = "abcdSmUISimoRrJL6NL12w"  
ruleHostName = "fluent-katydid-c6p67ucpv2dpsb76i66g.schedules-ce-dev.lightwingtest.com"  
  
# For process based heartbeats configure the below section.  
  
[process]  
condition = "trainmodel.py"  
  
# For metrics based heartbeats configure the below section.  
  
#[metrics]  
#cpu = "50"  
#memory = "1Gb"
```

#### Step 3: Restart the ECG Process

After making the configuration changes, restart the ECG process.

```
sudo systemctl restart ecg
```
