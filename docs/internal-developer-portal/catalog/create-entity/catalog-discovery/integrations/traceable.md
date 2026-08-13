---
title: Traceable Integration
description: How to configure the Traceable integration in Harness IDP to surface API security data alongside your API catalog entities.
sidebar_position: 11
sidebar_label: Traceable
redirect_from:
  - /docs/internal-developer-portal/catalog/create-entity/catalog-discovery/traceable
keywords:
  - idp
  - catalog
  - traceable
  - api security
  - endpoints
  - risk score
  - integration
---

import DocImage from '@site/src/components/DocImage';

The Traceable integration brings API security data from Traceable into your Harness IDP catalog. Once configured, your API entity pages show risk scores, open issues, and sensitive data types for each endpoint.

## How it works

Traceable watches live traffic to your APIs and collects security data per endpoint: risk scores, open issues, and what types of sensitive data flow through each one. Traceable endpoints are pulled every 24 hours and synced against your API entities in IDP. Matched endpoints appear in the **Endpoints** tab on the API entity page in IDP. Endpoints Traceable found that have no matching API entity in IDP appear in the **Unmatched** tab inside your Traceable integration page in IDP.

---

## Before you begin

- The `IDP_API_ENDPOINT_EXTRACTION` feature flag must be enabled for your account. Contact [Harness Support](https://www.harness.io/company/contact-sales) to enable it. Without this flag, Traceable does not appear as an option when configuring a new Harness integration.
- Your Traceable tenant must be configured to push data to Harness Unified Data Platform (UDP). Contact your Traceable account team for setup details.
- Your API entities must have `kind: API` and `type: openapi`. Endpoint matching works against the extracted endpoints from each entity's OpenAPI spec. See [API endpoint extraction and enrichment](/docs/internal-developer-portal/catalog/integrate-tools/api-endpoint-enrichments).
- You need Admin access in Harness IDP to configure integrations.

---

## Configure the integration

1. In IDP, go to **Configure** → **Integrations**.
2. Select **+ New Integration**.
3. In the integration picker, select **Harness Integrations**.

    <DocImage path={require('../static/harness-integrations.png')} />

    :::caution Limit: Only one integration per type
    Currently, you can create only one Traceable integration in your account. If one already exists, you can manage or suspend it but cannot create another.
    :::


4. On the integration details page, enter a name in the **Integration Name** field.
5. Under **Choose Integration**, select **Traceable**.
6. Under **IDP Scope to import into**, choose one of the following:
   - **All IDP scopes**: Traceable data enriches all matching API entities across your entire IDP catalog.
      <DocImage path={require('../static/all-idp-scopes.png')} />
   - **Particular IDP Scope**: Select specific projects or organizations. Only API entities within those scopes are enriched.
      <DocImage path={require('../static/particular-idp-scope.png')} />
7. Click **Confirm & Enable**.

Once saved, the integration appears in the **Configure** → **Integrations** list.

:::info
After configuration, Traceable endpoints are pulled and synced against your API entities every 24 hours. Allow up to 24 hours after setup for matched endpoints to appear on your entity pages.
:::

---

## Update the catalog layout

To display the **Endpoints** and **API Specification** tabs on your API entity pages, add both components to the layout for the `api` kind.

Go to **Configure** → **Layout**, select the API entity kind layout, and add the following tab entries to the layout YAML:

```yaml title="To display the IDP-extracted API specification from the entity's OpenAPI spec"
    - name: API Specification
      path: /api-spec
      title: API Specification
      contents:
        - component: ApiSpecTab
          specs:
            gridProps:
              xs: 12
```

```yaml title="To display matched Traceable endpoints for this API entity"
    - name: Endpoints
      path: /endpoints
      title: Endpoints
      contents:
        - component: TraceableEndpointsTab
          specs:
            gridProps:
              xs: 12
```

<DocImage path={require('../static/traceable-layout.png')} />

---

## View the API specification

The **API Specification** tab shows the IDP-extracted endpoint list from the entity's OpenAPI spec. This data comes from the [endpoint extraction feature](/docs/internal-developer-portal/catalog/integrate-tools/api-endpoint-enrichments). It shows each endpoint's HTTP method and path, and displays a timestamp for when the list was last updated.

<DocImage path={require('../static/api-spec-tab.png')} />

---

## Matched and unmatched endpoints

When the matching job runs, it compares every endpoint Traceable has observed against the endpoints in your API entities' OpenAPI specs. For an endpoint to match, all of the following must be true:

- The HTTP method matches exactly (for example, GET matches GET, not POST).
- The path has the same number of segments.
- Fixed segments in the path match exactly (for example, `/users/` must match `/users/`).
- Parameterized segments in the OpenAPI spec (for example, `{userId}`) match any single value Traceable observed in live traffic.

| OpenAPI path | Traceable observed path | Result |
|---|---|---|
| `GET /users/{id}` | `GET /users/123` | Match |
| `GET /users/{id}/orders/{orderId}` | `GET /users/123/orders/456` | Match |
| `GET /users/{id}` | `GET /accounts/123` | No match: `users` and `accounts` are different fixed segments |
| `POST /users/{id}` | `GET /users/123` | No match: HTTP method mismatch |
| `GET /users/{id}` | `GET /users/123/profile` | No match: different number of path segments |

### View matched endpoints

After the matching job runs, go to any API entity page and select the **Endpoints** tab. The tab lists all Traceable endpoints matched to the entity's OpenAPI spec.

<DocImage path={require('../static/traceable-endpoints-tab.png')} />

:::info
The **Endpoints** tab is Traceable-specific and only shows data when the Traceable integration is active and has matched endpoints for the entity. The **API Specification** tab is independent of Traceable; it renders the IDP-extracted endpoint list from the entity's OpenAPI spec and is useful regardless of whether Traceable is configured. See [Catalog layout](/docs/internal-developer-portal/layout-and-appearance/catalog) for full layout editing guidance.
:::

When matched data is present, the table shows the following columns:

| Column | Description |
|---|---|
| API Endpoints | The endpoint path as discovered by Traceable |
| Environment | The environment in which Traceable observed traffic |
| API Type | The API protocol type (for example, HTTP) |
| Risk Score | Traceable's computed risk score for this endpoint |
| Category | The risk category (Low, Medium, High, Critical) |

You can filter by **API Path**, **Environment**, and **Category**, and search by endpoint path.

Select any endpoint to open a detail drawer showing:

| Field | Description |
|---|---|
| Service | The service name as identified by Traceable |
| Created | Timestamp when Traceable first detected this endpoint |
| Type | Protocol type (for example, HTTP) |
| Encrypted | Whether the endpoint uses encryption |
| External | Whether the endpoint is externally accessible |
| Environment | Observed environment |
| Risk Score | Numeric risk score |
| Category | Risk category |
| Data Types | Categories of sensitive data flowing through this endpoint (for example, Phone, Credit Card PIN) |
| Open Issues | Table of open security issues: Issue Name, Severity, Status, and OWASP Classification |

<DocImage path={require('../static/traceable-endpoint-drawer.png')} />


:::info
Currently, Traceable integration supports REST and HTTP endpoints only. GraphQL and gRPC endpoints discovered by Traceable appear in the unmatched list and are not surfaced in the Endpoints tab.
:::


### View unmatched endpoints

Traceable endpoints that did not match any IDP API entity's OpenAPI spec are visible in the admin view.

Go to **Configure** → **Integrations** and select your Traceable integration by name. The **Unmatched** tab lists all such endpoints.

<DocImage path={require('../static/unmatched-tab.png')} />

The table shows ENDPOINTS, ENVIRONMENT, and API TYPE columns. You can filter by **Environment** and **API Type**, and search by endpoint path.

Select any unmatched endpoint to see its details, including Service, Type, Encrypted, External, Environment, Risk Score, Category, Data Types, and any associated Issues.

<DocImage path={require('../static/unmatched-drawer.png')} />

Endpoints appear in the unmatched list when:
- The corresponding API entity has not been registered in IDP yet.
- Traceable's path detection resulted in over-merging (multiple distinct paths collapsed into one endpoint) or under-merging (one path split into multiple entries because path parameters were treated as literal segments rather than variables).

---

## Use Traceable data in scorecards

After the integration is active and endpoints are matched, Traceable-specific data points become available in Scorecards for configuring checks on API entities. For configuration steps, see [Configure Traceable data points](/docs/internal-developer-portal/scorecards/create-scorecards/data-sources#traceable).

The following data points are currently available:

| Data point | Description |
|---|---|
| `Average Risk Score` | Mean risk score across all matched endpoints for the entity |
| `Total Open Issues` | Sum of all open issues across all matched endpoints |
| `Highest Open Issues on an Endpoint` | Highest open-issue count among all matched endpoints |
| `Lowest Open Issues on an Endpoint` | Lowest open-issue count among all matched endpoints |

<DocImage path={require('../static/traceable-scorecard-results.png')} />

---

## Suspend the integration

To temporarily stop Traceable data from displaying in IDP, go to **Configure** → **Integrations**, select your Traceable integration by name, select **Configuration**, and in the **Danger Zone** section select **Suspend**. Traceable data will no longer be displayed on entity pages or in the catalog while the integration is suspended. You can reactivate it at any time by returning to this page.

---

## Frequently asked questions

<details>
<summary>How long does it take to see Traceable data after I configure the integration?</summary>
<div>
Traceable endpoints are pulled and synced against IDP entities every 24 hours. Allow up to 24 hours after your Traceable tenant pushes data to Harness UDP for matched endpoints to appear on your API entity pages.
</div>
</details>

<details>
<summary>Why are some endpoints showing in the unmatched list?</summary>
<div>
Endpoints appear in the unmatched list when they cannot be matched to any IDP API entity's OpenAPI spec. Common reasons: the corresponding API entity has not been registered in IDP, or Traceable's path detection produced an over-merged or under-merged path. Over-merging collapses multiple distinct paths into one; under-merging splits one path into multiple entries by treating path parameters as literal segments rather than as variables.
</div>
</details>

<details>
<summary>Can I have more than one Traceable integration?</summary>
<div>
No. Only one Traceable integration is allowed per account. If an integration already exists, you can manage or suspend it, but you cannot create a second one.
</div>
</details>

<details>
<summary>What happens on a scorecard check if there is no Traceable data for an entity?</summary>
<div>
The check status shows <strong>Missing data</strong>. Whether a missing-data result is treated as a pass or a fail is configurable in the scorecard check settings under the default behavior for missing data.
</div>
</details>

<details>
<summary>The Endpoints tab is showing no data. What should I check?</summary>
<div>
First, confirm the Traceable integration is active and not suspended under **Configure** → **Integrations**. Second, verify that your Traceable tenant has pushed data to Harness UDP and that the 24-hour sync has had time to run. Third, check that the API entity has kind: API and type: openapi, and that its OpenAPI spec has been successfully extracted (visible in Ingested Properties under Entity Inspector). If the spec extraction failed, endpoint matching cannot proceed.
</div>
</details>
