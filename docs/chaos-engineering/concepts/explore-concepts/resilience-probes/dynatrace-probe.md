---
title: Dynatrace probe
sidebar_position: 20
description: Features and specification of the Dynatrace probe
redirect_from:
  - /docs/chaos-engineering/features/probes/dynatrace-probe
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dynatrace probe is used to determine the health of your application by examining the entry or exit criteria.

## Creating secrets
To use the `APITokenSecretName`, create a Kubernetes secret as shown below and reference the Kubernetes secret name in the Dynatrace probe schema. Ensure that you create the secret in the same namespace where you have set up your chaos infrastructure.

```
apiVersion: v1
kind: Secret
metadata:
  name: dyna-secret
  namespace: hce
type: Opaque
stringData:
  X-API-KEY: <TOKEN>
```

:::tip
* Connectivity requirements for the Dynatrace probe: You can establish a connection between the execution plane and Dynatrace by:
1. Opening port 443 (HTTPS) to make API calls to the Dynatrace probe;
2. Create a secret that has the Dynatrace access token with read permissions (that is, `metrics.read` scope).
:::

## Schema
Listed below is the Dynatrace Probe schema with common properties shared across all probes and properties unique to Dynatrace probe.

<Tabs>
  <TabItem value="kubernetes" label="Kubernetes" default>

<table>
  <tr>
   <th><strong>Field</strong></th>
   <th><strong>Description</strong></th>
   <th><strong>Type</strong></th>
   <th><strong>Range</strong></th>
   <th><strong>Notes</strong></th>
  </tr>
  <tr>
   <td>Endpoint</td>
   <td>Endpoint of the probe</td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> Endpoint specified to access the Dynatrace probe. </td>
  </tr>
  <tr>
   <td>Metrics</td>
   <td>Raw metric details of the probe</td>
   <td>Mandatory</td>
   <td> <code>type: metrics</code></td>
   <td> Provide the raw metrics that you want to query. </td>
  </tr>
  <tr>
   <td>TimeFrame</td>
   <td>Timeframe associated with the metrics</td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> Average or min or max of the timeframe specified. For example, <code>now-5m</code> provides average, <code>minvaluefrom(now-5m)</code> provides the minimum and <code>maxvaluefrom(now-5m)</code> provides the maximum value. </td>
  </tr>
  <tr>
   <td>APITokenSecretName</td>
   <td>Used for authentication with the Dynatrace platform</td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> Secret created to use the Dynatrace API, refer [creating secrets](#creating-secrets). </td>
  </tr>
  <tr>
   <td>Comparator</td>
   <td>Checks for the correctness of the probe output</td>
   <td>Mandatory</td>
   <td> <code>type: comparator</code></td>
   <td> Various fields to compare the desired and obtained data, includes type, criteria and value. </td>
  </tr>
</table>

### Metrics
<table>
  <tr>
   <th><strong>Field</strong></th>
   <th><strong>Description</strong></th>
   <th><strong>Type</strong></th>
   <th><strong>Range</strong></th>
   <th><strong>Notes</strong></th>
  </tr>
<tr>
   <td>MetricsSelector</td>
   <td> Query to obtain the Dynatrace metrics</td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> Provide the MetricsSelector of the metrics you have provided in the <code>Metrics</code> field. </td>
  </tr>
<tr>
   <td>EntitySelector</td>
   <td> Entity selector of the metrics </td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> Provide the EntitySelector of the metrics you have provided in the <code>Metrics</code> field. </td>
  </tr>
</table>

### Comparator

<table>
  <tr>
   <td><strong>Field</strong> </td>
   <td><strong>Description</strong> </td>
   <td><strong>Type</strong> </td>
   <td><strong>Range</strong> </td>
   <td><strong>Notes</strong> </td>
  </tr>
  <tr>
   <td>type </td>
   <td>Flag to hold type of the data used for comparison </td>
   <td>Mandatory </td>
   <td><code>float</code> </td>
   <td>The <code>type</code> contains type of data, which should be compared as part of comparison operation. </td>
  </tr>
  <tr>
   <td>criteria </td>
   <td>Flag to hold criteria for the comparison </td>
   <td>Mandatory </td>
   <td>It supports <code>{`>=, <=, ==, >, <, !=, oneOf, between`}</code> for int and float type. And <code>{`equal, notEqual, contains, matches, notMatches, oneOf`}</code> for string type. </td>
   <td>The <code>criteria</code> contains criteria of the comparison, which should be fulfill as part of comparison operation. </td>
  </tr>
  <tr>
   <td>value </td>
   <td>Flag to hold value for the comparison </td>
   <td>Mandatory </td>
   <td>N/A <code>type: string</code> </td>
   <td>The <code>value</code> contains value of the comparison, which should follow the given criteria as part of comparison operation. </td>
  </tr>
</table>

  </TabItem>

  <TabItem value="linux" label="Linux">
  <table>
  <tr>
   <th><strong>Field</strong></th>
   <th><strong>Description</strong></th>
   <th><strong>Type</strong></th>
   <th><strong>Range</strong></th>
   <th><strong>Notes</strong></th>
  </tr>
  <tr>
   <td>Endpoint</td>
   <td>Endpoint of the probe</td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> Endpoint specified to access the Dynatrace probe. </td>
  </tr>
  <tr>
   <td>Metrics</td>
   <td>Raw metric details of the probe</td>
   <td>Mandatory</td>
   <td> <code>type: metrics</code></td>
   <td> Provide the raw metrics that you want to query. </td>
  </tr>
  <tr>
   <td>TimeFrame</td>
   <td>Timeframe associated with the metrics</td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> Average or min or max of the timeframe specified. For example, <code>now-5m</code> provides average, <code>min(now-5m)</code> provides the minimum and <code>max(now-5m)</code> provides the maximum value. </td>
  </tr>
  <tr>
   <td>Comparator</td>
   <td>Checks for the correctness of the probe output</td>
   <td>Mandatory</td>
   <td> <code>type: comparator</code></td>
   <td> Various fields to compare the desired and obtained data, includes type, criteria and value. </td>
  </tr>
</table>

### Metrics
  <table>
    <tr>
   <th><strong>Field</strong></th>
   <th><strong>Description</strong></th>
   <th><strong>Type</strong></th>
   <th><strong>Range</strong></th>
   <th><strong>Notes</strong></th>
  </tr>
  <tr>
   <td>MetricsSelector</td>
   <td> Query to obtain the Dynatrace metrics</td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> Dynatrace metrics query to obtain the output from the endpoint. </td>
  </tr>
<tr>
   <td>EntitySelector</td>
   <td> Entity selector of the metrics </td>
   <td>Mandatory</td>
   <td> <code>type: string</code></td>
   <td> The entity selector type used by the Dynatrace query. </td>
  </tr>
  </table>

### Comparator

<table>
  <tr>
   <td><strong>Field</strong> </td>
   <td><strong>Description</strong> </td>
   <td><strong>Type</strong> </td>
   <td><strong>Range</strong> </td>
   <td><strong>Notes</strong> </td>
  </tr>
  <tr>
   <td>type </td>
   <td>Flag to hold type of the data used for comparison </td>
   <td>Mandatory </td>
   <td><code>float</code> </td>
   <td>The <code>type</code> contains type of data, which should be compared as part of comparison operation. </td>
  </tr>
  <tr>
   <td>criteria </td>
   <td>Flag to hold criteria for the comparison </td>
   <td>Mandatory </td>
   <td>It supports <code>{`>=, <=, ==, >, <, !=, oneOf, between`}</code> for int and float type. And <code>{`equal, notEqual, contains, matches, notMatches, oneOf`}</code> for string type. </td>
   <td>The <code>criteria</code> contains criteria of the comparison, which should be fulfill as part of comparison operation. </td>
  </tr>
  <tr>
   <td>value </td>
   <td>Flag to hold value for the comparison </td>
   <td>Mandatory </td>
   <td> <code>type: float</code> </td>
   <td>The <code>value</code> contains value of the comparison, which should follow the given criteria as part of comparison operation. </td>
  </tr>
</table>
</TabItem>
</Tabs>
