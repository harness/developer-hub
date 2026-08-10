---
title: Migrate from NGINX Ingress to Envoy Gateway
sidebar_label: Migrate NGINX Ingress to Envoy Gateway
description: Migrate Harness Self-Managed Enterprise Edition traffic from NGINX Ingress to Envoy Gateway.
keywords:
  - envoy gateway
  - nginx ingress
  - gateway api
  - httproute
  - self-managed enterprise edition
  - smp migration
  - ingress
tags:
  - self-managed-enterprise-edition
  - networking
  - ingress
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness Self-Managed Enterprise Edition (SMP) supports the [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/) through Envoy Gateway as an alternative to the NGINX Ingress controller. Use this guide to move traffic to Envoy Gateway: deploy the required CRDs, enable Envoy Gateway, update DNS, validate traffic, then remove NGINX when you are ready.

---

## Before you begin

Complete these prerequisites before you start the migration:

- **Harness SMP install:** A Helm-based SMP deployment that you can upgrade with override values. Go to [Install using Helm](/docs/self-managed-enterprise-edition/install/install-using-helm) to review the install flow.
- **Existing ingress values:** Your current `global.ingress` hosts and related ingress settings. Go to [Configure and customize Ingress and NGINX Controller using overrides](/docs/self-managed-enterprise-edition/advanced-configurations/use-ingress-controller-overrides) to review ingress overrides.
- **Cluster access:** `kubectl` access to the SMP namespace so you can inspect CRDs, Gateways, and HTTPRoutes.
- **DNS access:** Permission to update DNS records that point at your load balancer.

---

## Migrate to Envoy Gateway

Follow these steps in order. Fresh installs can skip CRD setup; upgrades must deploy CRDs first.

### Deploy Gateway API CRDs

Envoy Gateway requires Gateway API custom resource definitions (CRDs) in the cluster before you enable it.

<Tabs>
<TabItem value="fresh" label="Fresh install" default>

For a first-time Harness SMP install, you can skip this step. The Helm chart deploys the required CRDs during installation.

</TabItem>
<TabItem value="upgrade" label="SMP upgrade">

If you already run Harness SMP, install the CRDs before you enable Envoy Gateway. Choose one of the following options.

**Option 1: Deploy CRDs with the native Helm job**

Add these overrides and upgrade Harness. The chart deploys Envoy Gateway and runs a job that installs or updates the Gateway API CRDs:

```yaml
platform:
  envoy-gateway:
    enabled: true
    deployCRDsJob:
      enabled: true
```

:::info Run this as a separate upgrade
Upgrade Harness with the config above first. After the CRDs are installed, run a second upgrade to [enable Gateway API and Envoy Gateway](#enable-gateway-api-and-envoy-gateway). This CRD installation is a one-time process. Keep `deployCRDsJob.enabled` set to `true` so later SMP upgrades can update the CRDs.
:::

**Option 2: Deploy CRDs externally**

Install the CRDs yourself with the Envoy Gateway Helm chart. Stick to Envoy Gateway version **1.8.1** and set `crds.gatewayAPI.channel=experimental`.

Go to the [Envoy Gateway Helm install guide](https://gateway.envoyproxy.io/docs/install/install-helm/) for the external install steps.

After either option, verify the CRDs:

```bash
kubectl get crd | grep -i gateway
```

</TabItem>
</Tabs>

---

### Enable Gateway API and Envoy Gateway

Enable Gateway API, deploy Envoy Gateway, and send internal traffic to the Envoy proxy service. Keep your existing primary hostname in `global.ingress.hosts`, and add the stable Envoy proxy service name `envoy-gateway-proxy-envoy-gateway` next to it.

:::info Keep ingress rules enabled
Keep `global.ingress.enabled` set to `true` during and after migration. You still need these ingress rules after you move to Envoy Gateway and remove the NGINX controller. Harness creates the equivalent HTTPRoute resources from those ingress rules.
:::

<Tabs>
<TabItem value="enable-fresh" label="Fresh install" default>

For a first-time Harness SMP install, enable Gateway API and Envoy Gateway, and skip the NGINX controller from the start:

```yaml
global:
  gatewayAPI:
    enabled: true
    create: true
  ingress:
    enabled: true
    hosts:
      - <primary-hostname>
      - envoy-gateway-proxy-envoy-gateway
    ingressGatewayServiceUrl: "http://envoy-gateway-proxy-envoy-gateway"

platform:
  envoy-gateway:
    enabled: true
    deployCRDsJob:
      enabled: true
  bootstrap:
    networking:
      nginx:
        create: false
      defaultbackend:
        create: false
```

</TabItem>
<TabItem value="enable-upgrade" label="SMP upgrade">

For an existing Harness SMP deployment, upgrade with these overrides. Leave the NGINX controller in place until you validate traffic, then remove it in [Remove NGINX Ingress](#remove-nginx-ingress).

```yaml
global:
  gatewayAPI:
    enabled: true
    create: true
  ingress:
    enabled: true
    hosts:
      - <primary-hostname>
      - envoy-gateway-proxy-envoy-gateway
    ingressGatewayServiceUrl: "http://envoy-gateway-proxy-envoy-gateway"

platform:
  envoy-gateway:
    enabled: true
    deployCRDsJob:
      enabled: true
```

</TabItem>
</Tabs>

:::warning Copy load balancer annotations
Envoy Gateway does not inherit annotations from the NGINX controller `LoadBalancer` Service. If you skip this, cloud providers can create the wrong load balancer type. On AWS, a missing scheme annotation often creates an internal NLB, so the public endpoint is unreachable. Go to [Migrate load balancer annotations](#migrate-load-balancer-annotations) before you update DNS.
:::

---

### Migrate load balancer annotations

Copy any load balancer annotations from your NGINX controller Service onto the Envoy proxy Service. Set them under `global.gatewayAPI.proxyService.annotations` in the same upgrade that enables Gateway API.

1. Inspect your current NGINX controller Service:

   ```bash
   kubectl get svc harness-ingress-controller -n <namespace> -o yaml
   ```

2. Note the `metadata.annotations` you rely on for load balancer behavior.
3. Re-apply those annotations under `global.gatewayAPI.proxyService.annotations`.

```yaml
global:
  gatewayAPI:
    enabled: true
    create: true
    proxyService:
      annotations:
        # Add the cloud annotations you used on the NGINX LoadBalancer Service
```

Use the examples below as a starting point. Each tab shows one common configuration, so confirm whether your NGINX Service used a public or internal load balancer before you copy it. Replace or extend the example with the annotations from your NGINX Service.

<Tabs>
<TabItem value="aws" label="AWS" default>

On AWS, set an internet-facing scheme if users reach Harness over the public internet. Without this annotation, the controller can create an internal NLB.

```yaml
global:
  gatewayAPI:
    enabled: true
    create: true
    proxyService:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
```

Other annotations you may need to copy from NGINX include `service.beta.kubernetes.io/aws-load-balancer-type`, `service.beta.kubernetes.io/aws-load-balancer-nlb-target-type`, and SSL or backend-protocol annotations.

</TabItem>
<TabItem value="gcp" label="GCP">

On GKE, copy the load balancer annotations from your NGINX Service. For an internal load balancer, set the internal type annotation. For a public load balancer, omit the internal type annotation or keep the public settings you already use.

```yaml
global:
  gatewayAPI:
    enabled: true
    create: true
    proxyService:
      annotations:
        # Example: internal load balancer on GKE
        networking.gke.io/load-balancer-type: "Internal"
```

If your NGINX Service used other GKE annotations (for example NEG or custom LB options), copy those same keys and values under `proxyService.annotations`.

</TabItem>
<TabItem value="aks" label="AKS">

On AKS, copy Azure load balancer annotations from your NGINX Service. Use the internal annotation only when you need a private load balancer.

```yaml
global:
  gatewayAPI:
    enabled: true
    create: true
    proxyService:
      annotations:
        # Example: internal load balancer on AKS
        service.beta.kubernetes.io/azure-load-balancer-internal: "true"
```

For a public Azure load balancer, omit `azure-load-balancer-internal` or set it to `"false"`, and copy any other Azure annotations you used on NGINX (resource group, health probe path, and similar).

</TabItem>
</Tabs>

:::tip Apply annotations before DNS cutover
Add `proxyService.annotations` when you enable Envoy Gateway. If the LoadBalancer Service was already created without the right annotations, update the overrides and upgrade again, then confirm the cloud load balancer type before you change DNS.
:::

---

### Update DNS

After Envoy Gateway and its services are up, point your Harness hostname DNS record at the Envoy Gateway load balancer instead of the NGINX load balancer.

Envoy Gateway creates a separate `LoadBalancer` service for external traffic. That service name can include a hash (for example `envoy-<namespace>-envoy-gateway-<hash>`). Use that service for DNS, not the stable ClusterIP service `envoy-gateway-proxy-envoy-gateway`.

1. Find the Envoy proxy `LoadBalancer` service:

   ```bash
   kubectl get svc -n <namespace> -l app.kubernetes.io/component=proxy,app.kubernetes.io/managed-by=envoy-gateway
   ```

2. Get its external IP (or hostname):

   ```bash
   kubectl get svc -n <namespace> -l app.kubernetes.io/component=proxy,app.kubernetes.io/managed-by=envoy-gateway -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}{"\n"}{.items[0].status.loadBalancer.ingress[0].hostname}{"\n"}'
   ```

3. Update your DNS record for the Harness hostname to that address.
4. Wait for DNS to update before you validate.

---

### Validate the migration

After you update DNS, confirm that Harness works as expected:

- Log in to the Harness UI.
- Open a few core pages and modules you use.
- Confirm pipeline triggers and other critical traffic paths still succeed.

You can also confirm Gateway API resources in the cluster:

```bash
kubectl get gateway -n <namespace>
kubectl get httproute -n <namespace>
kubectl get svc -n <namespace> -l app.kubernetes.io/component=proxy,app.kubernetes.io/managed-by=envoy-gateway
```

---

### Remove NGINX Ingress

This step applies only to **SMP upgrades**. Fresh installs already disable the NGINX controller in [Enable Gateway API and Envoy Gateway](#enable-gateway-api-and-envoy-gateway).

After validation succeeds, scale down the NGINX controller, or remove it from the Helm release with these overrides:

```yaml
platform:
  bootstrap:
    networking:
      nginx:
        create: false
      defaultbackend:
        create: false
```

:::warning Remove NGINX only after validation
Do not disable NGINX until you confirm Harness UI access, pipelines, and other critical paths through Envoy Gateway.
:::

---

### Configure additional Gateway listeners (required for Looker)

If you use Looker for custom dashboards, this step is **required**. Create an additional Gateway listener whose `hostname` matches the `lookerPubDomain` you set under `ng-custom-dashboards`.

```yaml
ng-custom-dashboards:
  config:
    lookerPubDomain: 'looker.<company-domain>'
```

Add a matching listener under `global.gatewayAPI.additionalListeners`. Use the same value as `lookerPubDomain` for `hostname`, and point `certificateRefs` at the TLS secret for that domain:

```yaml
global:
  gatewayAPI:
    additionalListeners:
      - name: https-looker
        protocol: HTTPS
        port: 443
        hostname: looker.<company-domain> # Must match lookerPubDomain
        tls:
          certificateRefs:
            - kind: Secret
              name: <looker-tls-secret>
        allowedRoutes:
          namespaces:
            from: Same
```

Requirements for the Looker listener:

- **Matching hostname:** `hostname` must match `ng-custom-dashboards.config.lookerPubDomain`.
- **Unique listener name:** Do not reuse the built-in names `https` or `http`.
- **Valid TLS secret:** `certificateRefs.name` must reference a Secret that exists in the Gateway namespace.

Go to [Configure custom dashboards](/docs/self-managed-enterprise-edition/advanced-configurations/configure-custom-dashboards) to review Looker and `lookerPubDomain` setup.

---

### Configure a fallback HTTPRoute (optional)

By default, the fallback HTTPRoute is off. During migration, you can turn it on so traffic that does not match an HTTPRoute still goes to NGINX while you validate Envoy Gateway.

```yaml
global:
  gatewayAPI:
    fallbackRoute:
      enabled: true
      serviceName: harness-ingress-controller
```

Disable the fallback again after your routes are stable:

```yaml
global:
  gatewayAPI:
    fallbackRoute:
      enabled: false
```

---

## Troubleshooting

Use these checks if traffic does not move to Envoy Gateway as expected.

<Troubleshoot
  issue="Gateway API CRDs are missing after a Harness SMP upgrade to Envoy Gateway"
  mode="general"
  fallback="Deploy CRDs with platform.envoy-gateway.deployCRDsJob.enabled set to true, or install Envoy Gateway 1.8.1 CRDs externally with crds.gatewayAPI.channel=experimental, then run kubectl get crd | grep -i gateway."
/>

<Troubleshoot
  issue="No Gateway or Envoy Gateway resources appear after enabling Gateway API in Harness SMP"
  mode="fallback-only"
  fallback="Set platform.envoy-gateway.enabled, global.gatewayAPI.enabled, and global.gatewayAPI.create to true, then upgrade the Helm release."
/>

<Troubleshoot
  issue="Harness SMP traffic still routes through NGINX after Envoy Gateway cutover"
  mode="fallback-only"
  fallback="Confirm global.ingress.ingressGatewayServiceUrl is http://envoy-gateway-proxy-envoy-gateway and that service is listed under global.ingress.hosts. For DNS, point at the external IP of the LoadBalancer service selected by app.kubernetes.io/component=proxy,app.kubernetes.io/managed-by=envoy-gateway (the name can include a hash)."
/>

<Troubleshoot
  issue="Envoy Gateway LoadBalancer is internal or public Harness URL is unreachable after NGINX to Envoy migration on AWS"
  mode="general"
  fallback="Envoy does not inherit NGINX Service annotations. Set service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing under global.gatewayAPI.proxyService.annotations, upgrade again, and confirm the LoadBalancer is internet-facing before you update DNS."
/>

---

## Next steps

You have moved traffic from NGINX Ingress to Envoy Gateway. Keep `global.ingress.enabled` set to `true` so Harness continues to create HTTPRoutes from your ingress rules. The NGINX controller itself is no longer required after you remove it.

- [Basic configuration](/docs/self-managed-enterprise-edition/smp-basic-configuration): Review core SMP configuration options.
- [Install using Helm](/docs/self-managed-enterprise-edition/install/install-using-helm): Review the Helm install and upgrade flow.
