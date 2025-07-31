import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="AWS" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Before You Start

- [Create Cloud Connector for AWS](/docs/cloud-cost-management/get-started/#aws)

-------

## Step 1:  Set Up Proxy or Load Balancer

Set up a proxy or load balancer that will intercept and manage traffic to your resources. This component is what enables the seamless start/stop functionality.

| AWS Resource | AutoStopping Proxy | Application Load Balancer (ALB) |
|--------------|-------------------|---------------------------------|
| Amazon EC2 | ✅ [Link](/docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/content/aws-proxy) | ✅ [Link](/docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/content/aws-alb) |
| Auto Scaling Groups | ❌ | ✅ [Link](/docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/content/aws-alb) |
| Amazon RDS Instances | ✅ [Link](/docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/content/aws-proxy) | ❌ |

-------

## Step 2: Create AutoStopping Rule

Create an AutoStopping rule to define the conditions under which your resources should be started and stopped.

| AWS Resource | Link to Guide | 
|--------------|-------------------|
| EC2 | ✅ [Link](/docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/content/aws-proxy) |
| Auto Scaling Groups | ✅ [Link](/docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/content/aws-alb) |
| Amazon RDS Instances | ✅ [Link](/docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/content/aws-proxy) |