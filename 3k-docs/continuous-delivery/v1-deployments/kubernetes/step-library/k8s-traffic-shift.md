---
title: Kubernetes Traffic Shift step
description: Shift traffic between service versions using Istio VirtualServices or Kubernetes Gateway API HTTPRoutes.
sidebar_position: 9
---

The Kubernetes Traffic Shift step routes east-west traffic between service versions in your cluster. You configure a service mesh provider, define one or more HTTP routes, and specify destination weights. Harness creates or patches the mesh resource (an Istio VirtualService or a Kubernetes Gateway API HTTPRoute) on each pipeline run.

Use this step standalone or embed it inside a Canary or Blue Green deployment stage to shift traffic as part of a staged rollout.

---

## Before you begin

Before you configure this step, make sure you have the following in place:

- **A Kubernetes service:** Go to [Kubernetes services](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-services) to set up a service with manifests and an artifact source.
- **A Kubernetes infrastructure:** Go to [Kubernetes infrastructure](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-infrastructure) to connect a cluster and namespace.
- **A Harness delegate in the target cluster:** The delegate runs the deployment steps against your cluster.
- **Runtime configuration:** Every Kubernetes stage requires a `runtime` block specifying the connector and namespace. Go to [Kubernetes runtime configuration](/3k-docs/continuous-delivery/v1-deployments/kubernetes/overview#kubernetes-runtime-configuration) to understand the required fields.

---

## Configure the step

When you add the step to your pipeline, the following top-level fields appear.

The top-level fields control what kind of action the step takes and which provider it targets.

| Field | Description | Required |
|---|---|---|
| **Name** | Display name for the step in the pipeline. | Yes |
| **Config Type** | Whether to create a new mesh resource (**New Config**) or update weights on an existing one (**Update**). | Yes |
| **Provider** | The service mesh provider: `istio` or `k8s-native`. | Yes |

---

### Config type: New Config

Select **New Config** (value: `new`) to create a new VirtualService or HTTPRoute. Harness generates the resource from the fields you configure and applies it to the cluster using `kubectl apply`. If a resource with the same generated name already exists from a prior run, Harness identifies it as redundant and marks it for pruning.

---

### Config type: Update

Select **Update** (value: `update`) to patch the destination weights on a VirtualService or HTTPRoute that was created by a prior **New Config** step. Harness reads the resource name from the release history, fetches the current state from the cluster, and patches only the `route` destination weights. No other fields are modified.

The partial weight update follows a proportional redistribution rule. If you update fewer destinations than the route contains, the remaining weight (up to 100) is redistributed among the other destinations in proportion to their current weights.

**Example:** A route has three destinations with weights 60, 30, and 10. You update destination `svc1` to weight 40. Harness redistributes the remaining 60 among `svc2` and `svc3` proportionally, resulting in weights 40, 45, and 15.

---

### Istio provider

Select `istio` in the **Provider** field to target Istio VirtualServices. The following fields appear.

The fields below configure the Istio VirtualService that Harness creates or updates.

| Field | Description | Required |
|---|---|---|
| **Resource Name** | Base name used to generate the Kubernetes resource name for the VirtualService. Must be a valid Kubernetes resource name. | Yes |
| **Hosts** | One or more host names that define which traffic the VirtualService matches. Corresponds to the Istio [`spec.hosts`](https://istio.io/latest/docs/reference/config/networking/virtual-service/#VirtualService) field. Click **+Add** to add multiple hosts. | Yes (unless Delegate Virtual Service is enabled) |
| **Gateways** | One or more Istio gateway names that expose this VirtualService externally. Corresponds to the Istio [`spec.gateways`](https://istio.io/latest/docs/reference/config/networking/gateway/) field. | No |

Harness automatically detects the available Istio API version in the cluster and selects the newest supported version (`networking.istio.io/v1`, `networking.istio.io/v1beta1`, or `networking.istio.io/v1alpha3`).

---

### Kubernetes native provider

Select `k8s-native` in the **Provider** field to target Kubernetes Gateway API HTTPRoutes instead of Istio VirtualServices. This is a unified-platform capability that has no equivalent in the classic Harness CD experience.

The Kubernetes native provider uses the same **Resource Name**, **Hosts**, and **Gateways** fields as the Istio provider. For gateways, enter a reference in `group/namespace/kind/name` format (or a shorter form down to just `name`). Harness selects `gateway.networking.k8s.io/v1` or `gateway.networking.k8s.io/v1beta1` based on what is available in your cluster.

---

### Configure routes

Click **+ Add route** under **Configure Routes** to open the route configuration dialog. Each route produces one HTTP route entry in the generated resource. You can add multiple routes.

The following fields are available for each route.

| Field | Description | Required |
|---|---|---|
| **Route type** | Currently only `HTTP` is supported. | Yes |
| **Name** | Unique name for this route within the step. Used as an identifier for weight updates in subsequent 'Update' steps. Must be Kubernetes name compliant. | Yes |

---

#### Add match rules

Match rules filter which incoming requests are sent to the configured destinations. Add one or more match rules by clicking **+ Add match**. All match types support `exact`, `prefix`, and `regex` matching unless noted otherwise.

The following match types are available.

| Match type | Fields | Notes |
|---|---|---|
| **URI** | Value, Match Type | Matches against the request path. |
| **Method** | Value, Match Type | Matches the HTTP method (GET, POST, etc.). |
| **Headers** | Key, Value, Match Type | Matches against a specific request header and its value. |
| **Scheme** | Value, Match Type | Matches the request scheme (http, https). Istio only. |
| **Authority** | Value, Match Type | Matches the request authority (`:authority` header). Istio only. |
| **Port** | Value | Matches the port number of the incoming request. Istio only. |

:::info Multiple match rules
When you add more than one match rule to a route, all rules are combined into a single `HTTPMatchRequest` entry. A request must satisfy all configured rules to reach the route destinations. There is no OR-semantics option in the unified platform. Go to [Limitations](#limitations-in-the-unified-platform) to review the OR-semantics constraints.
:::

---

#### Add a URL rewrite

Click **+ Add URL rewrite** to modify the request path or hostname before forwarding to the backend. Provide a YAML snippet that begins with `rewrite:`.

The following is an example rewrite that replaces `/old-path` with `/new-path`:

```yaml
rewrite:
  uri: /new-path
```

The rewrite is applied to the Istio VirtualService as `HTTPRewrite.uri` or `HTTPRewrite.authority`. For the Kubernetes native provider, Harness applies it as an `URLRewrite` HTTPRoute filter with either `ReplaceFullPath` or `ReplacePrefixMatch` depending on whether a path replace method is set.

---

#### Add destinations

Click **+ Add destination** under **Destinations** to specify where matched traffic is sent.

Each destination has the following fields.

| Field | Description | Required |
|---|---|---|
| **Host** | Name of the Kubernetes Service resource that receives traffic. In Blue Green stages, use `stable` or `stage` as placeholders. In Canary stages, use `stable` or `canary`. Harness resolves these to the actual service names at runtime. | Yes |
| **Weight** | Percentage of traffic sent to this destination. Integer in the range 0 to 100. | Yes |

If the sum of all destination weights is not equal to 100, Harness normalizes the weights proportionally and logs a warning. The pipeline run continues.

---

#### Delegate Virtual Service

Enable the **Delegate Service** option when you want to use Istio [delegate virtual services](https://istio.io/latest/docs/reference/config/networking/virtual-service/#Delegate) for custom rewrite logic. When this option is enabled, the **Host** field on the destination must be left empty and the **Hosts** field at the provider level must also be empty. Harness creates a delegate VirtualService that can be referenced by a root VirtualService in your manifests.

---

## YAML reference

The following is a complete example of a Kubernetes Traffic Shift step using the Istio provider with a single HTTP route, three match rules, and two destinations:

```yaml
- step:
    identifier: K8sTrafficRoutingConfig
    type: K8sTrafficRouting
    name: Shift traffic to canary
    spec:
      type: config
      trafficRouting:
        provider: istio
        spec:
          name: my-vs
          hosts:
            - my-service.example.com
          gateways:
            - my-gateway
          routes:
            - route:
                type: http
                name: primary-route
                rules:
                  - rule:
                      type: uri
                      spec:
                        value: /api/v1
                        matchType: prefix
                  - rule:
                      type: method
                      spec:
                        value: POST
                  - rule:
                      type: headers
                      spec:
                        values:
                          - key: X-Request-Source
                            value: canary
                            matchType: exact
                destinations:
                  - destination:
                      host: my-service-stable
                      weight: 80
                  - destination:
                      host: my-service-canary
                      weight: 20
```

The following is an example using the **Update** config type to patch an existing route's weights:

```yaml
- step:
    identifier: K8sTrafficRoutingUpdate
    type: K8sTrafficRouting
    name: Increase canary traffic
    spec:
      type: update
      trafficRouting:
        provider: istio
        spec:
          name: my-vs
          routes:
            - route:
                name: primary-route
                destinations:
                  - destination:
                      host: my-service-canary
                      weight: 50
```

---

## Limitations in the unified platform

:::warning Unsupported features in the unified platform

The following features are available in classic Harness CD but are not yet implemented in the unified platform.

- **Match all rules (AND/OR semantics):** The classic platform provides a **Match all rules** checkbox that controls whether multiple route match rules are evaluated as AND (all must match) or OR (any one can match). In the unified platform, multiple match rules on a single route are always combined into a single `HTTPMatchRequest` entry, applying AND semantics. OR semantics are not available. If your traffic routing relies on OR matching across rules, do not migrate this step until this capability is added.

- **Istio VirtualService merge (`CDS_ISTIO_VS_MERGE_IN_TRAFFIC_ROUTING`):** In classic Harness CD with this feature flag enabled, Harness detects an existing VirtualService in your manifest that matches the configured resource name and merges only the traffic routing changes into it, preserving custom fields such as `headers`, `fault`, `timeout`, `retries`, and `corsPolicy`. The unified platform always creates a VirtualService from the step configuration only. Custom fields defined in your manifest VirtualService are not preserved. If you use advanced Istio configurations on your VirtualService, do not migrate until this capability is available.

- **SMI (Service Mesh Interface) provider:** The SMI provider (`TrafficSplit` and `HTTPRouteGroup` resources) is not implemented in the unified platform. SMI was archived by the CNCF in October 2023. Harness blocked new SMI configurations in classic CD as of August 1, 2026. If you have existing SMI-based traffic routing, migrate to Istio before moving to the unified platform.

:::

---

## Next steps

- Go to [Kubernetes Blue Green deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/blue-green) to configure a Blue Green stage that uses this step for traffic shifting.
- Go to [Kubernetes Canary deployment](/3k-docs/continuous-delivery/v1-deployments/kubernetes/kubernetes-deployment-strategies/canary) to configure a Canary stage with progressive traffic shifting.
- Go to the [Istio Traffic Management documentation](https://istio.io/latest/docs/concepts/traffic-management/) to understand VirtualService routing concepts.
