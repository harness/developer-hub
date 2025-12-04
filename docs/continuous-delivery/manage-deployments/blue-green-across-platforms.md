---
title: Blue-Green Deployment Across Platforms
description: Understand how Blue-Green deployments work across different platforms in Harness CD
sidebar_position: 3
tags:
  - blue-green-deployment
  - kubernetes
  - ecs
  - asg
  - deployment-strategies
  - platform-comparison
---

## Overview

Blue-Green deployment is a release strategy that minimizes downtime and deployment risk by running two identical production environments called Blue and Green. At any time, one environment serves live production traffic while the other remains idle or serves as a staging environment. When deploying a new version, you deploy to the idle environment, verify it works correctly, and then switch production traffic to it. The previous version remains available for immediate rollback if issues arise.

Harness CD implements Blue-Green deployments differently for each platform based on that platform's native capabilities and constraints. The core principle remains the same: maintain two parallel environments and control which one receives production traffic. However, the mechanisms for creating these environments, managing traffic routing, and handling rollbacks vary significantly between Kubernetes, Amazon ECS, AWS Auto Scaling Groups, and other platforms.

## Blue-Green Deployment Across Platforms

### Kubernetes

Kubernetes Blue-Green deployments in Harness work by creating two sets of pods labeled with different colors (blue and green) and using Kubernetes Services to route traffic between them. The deployment leverages Kubernetes native label selectors to instantly switch which pod set receives production traffic.

For complete setup instructions and configuration details, refer to the [Kubernetes Blue-Green Deployment documentation](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment).

#### First Deployment

When you perform your first deployment, Harness creates a primary service (from your service manifest) and automatically generates a stage service with a `-stage` suffix. Both services initially point to the same set of pods labeled with `harness.io/color: blue`. This initial pod set runs version 1 of your application and the primary service receives all production traffic while the stage service remains available for verification. The Stage Deployment step creates the initial pods, points the stage service at them, and waits for all pods to pass readiness probes before proceeding.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/k8s-bluegreen-1.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

#### Second and Subsequent Deployments

For the second deployment with version 2, Harness creates a new set of pods labeled with `harness.io/color: green` and reuses the existing services. The Stage Deployment step deploys the green pods and updates the stage service selector to point at them. At this point, production traffic still flows to the blue pods (version 1) through the primary service, while you can verify version 2 through the stage service. Once verification completes, the Swap Primary with Stage step updates the primary service selector to point at the green pods, instantly redirecting all traffic to version 2. The stage service selector simultaneously updates to point at the blue pods, keeping version 1 available for rollback. This traffic switch is atomic because it only requires updating the service selector label.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/k8s-bluegreen-2.png')} width="100%" height="100%" title="Click to view full size image" />
</div>

For third and subsequent deployments, Harness alternates the color labels automatically. Version 3 reuses the blue label while version 4 reuses green, and this pattern continues. Rollback is instant because old pods remain running under the stage service. To roll back, Harness simply updates the primary service selector to point back at the old color label with no redeployment required. After confirming the new version is stable, you can run a Blue Green Stage Scale Down step to remove old pods and free resources, but this operation is irreversible.

**Key characteristics:** Kubernetes Blue-Green in Harness only supports Deployment workloads (not StatefulSets, DaemonSets, or Jobs), requires a single Deployment per service, and performs atomic traffic switches with no progressive traffic shifting. For progressive rollouts, use Canary deployments instead.

**Learn more:** [Kubernetes Blue-Green Deployment Guide](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment)

---

### Amazon ECS

Amazon ECS Blue-Green deployments use separate ECS services mapped to Application Load Balancer (ALB) Target Groups. Harness supports two deployment modes: traditional swap mode using separate listener rules for production and stage environments, and traffic shifting mode using weighted target groups for progressive rollouts. The choice depends on whether you need instant cutover or gradual traffic migration.

For detailed setup and configuration, see the [ECS Deployment Tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial).

#### First Deployment

For the first deployment, Harness creates an ECS service with your task definition (version 1) and registers it to the production Target Group where it receives 100% of traffic. The stage Target Group exists but remains empty. This ECS service is considered the blue environment. The ALB production listener (typically on port 80) routes all user traffic to the production Target Group while an optional stage listener (port 8080) points to the empty stage Target Group for later use.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ecs-bluegreen-1.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

#### Second and Subsequent Deployments

For the second deployment, Harness creates a new ECS service (myapp__2) with version 2 of your task definition and registers it to the stage Target Group.

**Traditional Swap Mode:** Harness uses two separate ALB listeners (production on port 80, stage on port 8080). The stage listener allows you to test version 2 before swapping. Once verification passes, the **ECS Blue Green Swap Target Groups** step swaps the listener rules so the production listener points to the Target Group containing version 2 and the stage listener points to the Target Group with version 1. This swap is instantaneous from the user perspective.

**Traffic Shifting Mode:** Harness uses a single production listener with two Target Groups that have configurable weights. The **ECS Blue Green Create Service** step (with `isTrafficShift: true`) deploys the new service to the stage Target Group. Then, the **ECS Blue-Green Traffic Shifting** step gradually shifts traffic from version 1 to version 2 by adjusting weights. You configure the **New ECS Weight** parameter in each traffic shift step (for example, 10%, then 50%, then 100%). You can add multiple traffic shifting steps with approval gates between them for controlled rollouts.

This mode requires you to manually specify which Target Group to use as the stage target for each deployment. You must alternate between Target Groups across deployments because Harness deletes any non-blue services in the stage Target Group at deployment start. If you reuse the stage Target Group that contains your active service, it will be deleted.

For traffic shifting configuration details and step-by-step instructions, see the [ECS Blue-Green Traffic Shifting documentation](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/traffic-shifting).

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ecs-bluegreen-2.png')} width="100%" height="100%" title="Click to view full size image" />
</div>

For third deployment and beyond, Harness follows the same pattern. In swap mode, it creates a new service (myapp__3) and deletes the old non-blue service from the stage Target Group. In traffic shifting mode, you must manually alternate which Target Group is specified as stage. Rollback in both modes is near-instant by re-swapping listener rules or reverting target group weights. The old service remains running until explicitly deleted.

**Key characteristics:** ECS Blue-Green supports both atomic and progressive traffic shifting, requires manual Target Group alternation in traffic shifting mode, works only with Application Load Balancers (Network Load Balancers support only single listener pairs), and may require the `CDS_ECS_TRAFFIC_SHIFT` feature flag for traffic shifting mode.

**Learn more:**
- [ECS Blue-Green Traffic Shifting Guide](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/traffic-shifting)
- [ECS Deployment Tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [ECS Blue-Green FAQs](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-blue-green-faqs)

---

### AWS Auto Scaling Groups

AWS Auto Scaling Group (ASG) Blue-Green deployments use separate Auto Scaling Groups (entire EC2 instance fleets) for blue and green environments with traffic controlled via Application Load Balancer Target Group weights. This approach provides progressive traffic shifting between full instance fleets.

For complete setup instructions, see the [ASG Deployment Tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial).

#### First Deployment

For the first deployment, Harness creates an Auto Scaling Group using your provided launch template and ASG configuration. It also creates a launch template with the same name as the ASG containing your Amazon Machine Image (AMI) and instance configuration. EC2 instances are provisioned based on your desired capacity setting and attached to the production Target Group. The ALB routes 100% of traffic to this initial ASG while the stage Target Group remains empty. This Auto Scaling Group represents the blue environment running version 1.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/asg-bluegreen-1.png')} width="70%" height="70%" title="Click to view full size image" />
</div>

#### Second and Subsequent Deployments

For the second deployment, Harness creates a new Auto Scaling Group with a revision suffix (myapp-asg__2), a new launch template version with your updated AMI, and provisions a new fleet of EC2 instances. The **ASG Blue Green Deploy** step creates this new ASG, registers it to the stage Target Group, and waits for instances to warm up and pass health checks. During this time, the production ASG continues serving 100% of traffic.

Once the new instances are healthy, the **ASG Traffic Shift** step progressively shifts traffic by adjusting Target Group weights. You configure the **New Autoscaling Group Weight (%)** parameter in each traffic shift step. For example, you might add multiple traffic shift steps: first shifting 30%, then after verification shifting 100%. You can add approval steps between traffic shifts for controlled rollouts. When you shift to 100%, you can enable the **Downsize Old ASG** option to automatically scale down the old ASG to zero instances.

For traffic shifting configuration details and step-by-step instructions, see the [ASG Traffic Shifting documentation](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-traffic-shift).

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/asg-bluegreen-2.png')} width="100%" height="100%" title="Click to view full size image" />
</div>

For third and subsequent deployments, Harness alternates between updating the two existing Auto Scaling Groups rather than creating new ones. Version 3 updates myapp-asg__1 (the oldest) with a new launch template, triggers an Instance Refresh to replace EC2 instances, and shifts traffic from ASG__2 to ASG__1. Version 4 does the same with ASG__2. This rolling update pattern continues, always maintaining two ASGs that alternate being the active version. Rollback is performed by shifting Target Group weights back to the old ASG, which takes moderate time depending on ALB health check intervals and connection draining settings. After successful deployment, you can downsize or delete the old ASG to reduce costs.

**Key characteristics:** ASG Blue-Green has high cost overhead (two full EC2 fleets running simultaneously), slower deployments due to EC2 provisioning time, supports progressive traffic shifting with the ASG Traffic Shift step, requires pre-built AMIs, and needs Application Load Balancer integration with Target Groups configured.

**Learn more:**
- [ASG Traffic Shifting Guide](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-traffic-shift)
- [ASG Deployment Tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial)

---

### Other Platforms

#### Azure Web Apps

Azure Web Apps Blue-Green deployments use deployment slots (staging and production). The first deployment goes to the production slot. Subsequent deployments go to the staging slot, and after verification, you swap slots to make staging become production. This swap is instantaneous and similar to ECS listener swap mode. Rollback is performed by swapping slots again.

[Learn more: Azure Web Apps Deployment Guide](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)

#### Tanzu Application Service

Tanzu (formerly Pivotal Cloud Foundry) Blue-Green uses Cloud Foundry routes to map applications. The first deployment pushes an app and maps a route to it. Subsequent deployments push a new app version, map the route to the new app, and unmap from the old app. This provides atomic traffic switching with configurable amounts of overlap.

[Learn more: Tanzu Deployment Guide](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)

#### Google Cloud Functions

Google Cloud Functions Blue-Green uses Cloud Run revisions with traffic splitting. New revisions are deployed and traffic is split between revisions using configurable percentages (0% to 100%). This supports both atomic switches and progressive rollouts similar to ECS traffic shifting.

[Learn more: Google Cloud Functions Deployment Guide](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-functions)

#### Helm

Harness supports Blue-Green with Kubernetes Helm by applying the Blue-Green strategy to rendered Helm templates, using the same mechanism as native Kubernetes deployments. Native Helm mode does not currently support Blue-Green or Canary strategies.

[Learn more: Helm Deployment Guide](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart)

---

## Related Documentation

- [Deployment Concepts and Strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts)
- [Create a Kubernetes Blue-Green Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment)
- [ECS Blue-Green Traffic Shifting](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/traffic-shifting)
- [ECS Deployment Tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [ASG Traffic Shifting](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-traffic-shift)
- [AWS ASG Deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial)
- [Rollback Deployments](/docs/continuous-delivery/manage-deployments/rollback-deployments)
