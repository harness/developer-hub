| Topic | Material |
|:--|:--|
| **1. GraphQL-Based Dynamic API Ownership Assignment** | |
| Constructing and interpreting GraphQL `createPolicy` mutations for Static, Dynamic, and Regex-based policy assignments | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Configuring RE2 regular expression patterns with specific capture group indices and fallback constants | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Managing active ownership policies using `getPolicies` queries, `updatePolicy` mutations, and `deletePolicies` mutations | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| **2. Dynamic Ownership Prerequisites and Operational Mechanics** | |
| Configuring authentication prerequisites using JWT tokens and the `Authorization: Bearer` header | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Troubleshooting operational replication latencies and isolating span attributes in the Explorer tab | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Assessing the governance trade-offs of automated dynamic policy mapping versus manual, spreadsheet-based ownership assignment | [AppSec Discovery](https://developer.harness.io/docs/appsec-discovery) |
| **3. Automating API Documentation and Specification Generation** | |
| Triggering standard OpenAPI specifications (YAML or JSON) and WSDL schemas (for SOAP APIs) using the `createApiDefinition` mutation | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Applying the `learningEndpointStrategy` parameters (including `MENTION` vs. `EXCLUDE` behaviors) to govern endpoint documentation | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Extracting domain-specific scope credentials to parameterize schema generation | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| **4. API Specification Monitoring and Retrieval Workflows** | |
| Checking spec generation job statuses using the `getApiDefinition` query to verify state fields, success states (`JOB_STATUS_SUCCESS`), timestamps, and error messages | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Programmatically downloading completed specification archives (`*.zip`) using REST GET clients with the `Authorization: <Platform_API_Token>` header | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| **5. Unified Asset Management and MCP/AI Discovery** | |
| Consolidating traditional API Endpoints, AI APIs, and Model Context Protocol (MCP) components into a any single system inventory | [AppSec Discovery](https://developer.harness.io/docs/appsec-discovery) |
| Tracking infrastructure health and data flows through core UI widgets and strategic filters | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Troubleshooting production failures, diagnosing MCP server downtime, and conducting downstream impact analysis using "Last Called" filters | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| **6. Business-Level Application Grouping and Severity Management** | |
| Defining logical application groupings to map technical APIs directly to functional business units | [AppSec Discovery](https://developer.harness.io/docs/appsec-discovery) |
| Customizing filtering criteria and severity ratings to prioritize remediation efforts based on business risk | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| **7. Role-Based Access Control (RBAC) and Administration** | |
| Enforcing administrative permissions, specifically requiring the `Module Level Access -> Discovery -> Settings` permission to create and manage application groups and policies | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Scoping rules and security policies to "All Environments" versus restricted zones | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| **8. API Discovery Engine Internal Stages and Learning Logic** | |
| Modeling endpoint structures by observing URLs, headers, and request/response payloads in live spans | [AppSec Discovery](https://developer.harness.io/docs/appsec-discovery) |
| Filtering out malicious or junk traffic by strictly requiring successful HTTP response codes (between 2xx and 3xx) before learning new endpoints | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |
| Distinguishing between "Learning" and "Learnt" states in the API Catalog, and managing default state-filtering behavior | [API Discovery](https://docs.traceable.ai/docs/api-discovery-1) |