---
title: CE Services - License Consumption 
sidebar_position: 90
description: Harness CE services license consumption
---

Harness Chaos Engineering uses a licensing model based on the number of **Services** that undergo chaos experimentation within each 30-day cycle. This model is integrated into the broader Harness Developer 360 framework, where each chaos service license entitles three developers to access and use the Chaos Engineering module.

This approach allows targeted experimentation across a wide range of environments, optimizing license utilization and supporting the needs of different teams, applications, and infrastructure types.

<h2> What is a service?</h2>

In the Harness Chaos Engineering module, a **Service** refers to the specific target resource undergoing chaos experiments. This could include a variety of resources such as Kubernetes clusters, VMware instances, Windows or Linux servers, PCF applications, and popular cloud platforms. 

The table below describes how a **Service** is considered in Chaos Engineering, in the context of the target resource.

<table>
    <thead>
        <tr>
            <th>Target Resource</th>
            <th>Chaos Service Mapping</th>
            <th>Target Resource : Chaos Service License</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Kubernetes Platform </td>
            <td>One license service is equivalent to a Kubernetes service or a workload such as a Deployment/ReplicaSet/StatefulSet/DaemonSet/Job/CronJob.</td>
            <td>1:1</td>
        </tr>
        <tr>
            <td>Virtual Machine or a Baremetal host running Windows or Linux OS</td>
            <td>The virtual machine can be a VMware VM, a hypervisor VM, or any cloud provider VM such as EC2, GCP VM, or Azure VM. This has a one-to-one mapping with the license service.</td>
            <td>1:1</td>
        </tr>
        <tr>
            <td>Serverless functions</td>
            <td>Cloud providers offer serverless functions such as AWS Lambda, GCP Cloud Functions, or Azure Functions. Chaos experiments on 5 serverless functions are mapped to a license service.</td>
            <td>5:1</td>
        </tr>
        <tr>
            <td>Cloud Container Services</td>
            <td>This could be AWS ECS, Azure Container Apps, or GCP Cloud Run. This has a one-to-one mapping with the license service.</td>
            <td>1:1</td>
        </tr>
        <tr>
            <td>Miscellaneous (experiment runs)</td>
            <td>Any target resource that does not fall into a specific type described above, will fall in the miscellaneous category. In this category, 100 chaos experiment runs on a given target are mapped to a license service.</td>
            <td>100:1</td>
        </tr>
    </tbody>
</table>

Have questions? Go to [Frequently Asked Questions on Licenses](/docs/faqs/chaos-engineering-faqs#license).
