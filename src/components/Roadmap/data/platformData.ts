import { link } from "fs";
import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  Now: {
    description: "🚧 Q4 2025, Nov 2025 - Jan 2026",
    feature: [
      {
        title: "Alerting on platform limits",
        description:
          "Proactive notifications when approaching platform usage limits to prevent service disruptions and optimize resource planning.",
        tag: [{ value: "Platform" }],
        link: "/docs/platform/governance/usage-limits/"
      },
      {
        title: "Non-default encryption key in AWS secrets manager",
        description:
          "Allow the user to select a customer-managed key for encryption in AWS Secrets Manager",
        tag: [{ value: "Secrets" }],
      },
      {
        title: "Audit logs for user authentication failure",
        description:
          "Captures audit logs of unsuccessful login attempts across all authentication methods",
        tag: [{ value: "Audit Trail" }],
      },
      {
        title: "Cross-project access support for GCP Secrets Manager connector",
        description:
          "Add support for using one Google Secrets Manager connector to access secrets across multiple GCP projects",
        tag: [{ value: "Secrets" }, { value: "Connectors"}],
      },
      {
        title: "Split *Manage* permission for user groups",
        description:
          "Provide the user with more granular control by splitting the Manage permission into Create, Edit, and Delete permissions",
        tag: [{ value: "Access Control" }],
      },
      {
        title: "Event Streaming",
        description:
          "Real-time streaming of data to external systems to support advanced monitoring and observability.",
        tag: [{ value: "Insights" }],
      },
      {
        title: "Self Serve signup and payment flow",
        description:
          "Allow users to sign up and manage their subscriptions directly from the Harness UI.",
        tag: [],
      },
      {
        title: "Hashicorp Vault: JWT enhanced claims",
        description:
          "Allows users to include additional JWT claims (e.g., environment ID) for fine-grained access control and stricter secret isolation, improving security and compliance.",
        tag: [{ value: "Connectors" }],
      },
    ],
  },
  Next: {
    description: "🪄 Q1 2026, Feb 2026 - Apr 2026",
    feature: [
      {
        title: "Move Project across Organizations",
        description:
          "Move a project from one organization to another to support scenarios like ownership change.",
        tag: [{ value: "Platform" }],
      },
      {
        title: "Support Kerberos authentication for proxy in Delegate",
        description:
          "Enables secure proxy authentication using Kerberos in Delegate, supporting enterprise environments with on-prem Kubernetes deployments.",
        tag: [{ value: "Delegate" }],
      },
      {
        title: "Automated moving of Dashboards across organizations",
        description:
          "Allows users to move dashboards across organizations or accounts—whether within the same production cluster or across different ones—to support collaboration and reuse.",
        tag: [{ value: "Dashboard" }],
      },
      {
        title: "Delegate support in Harness MCP Server",
        description:
          "Delegate support in Harness MCP Server",
        tag: [{ value: "Delegate" }],
      },
    ],
  },
  Later : {
    description: "🔭 Q2 2026, May 2026 - Jul 2026",
    feature: [
      {
        title: "Increased Data Retention period",
        description:
          "Extends the data retention period, allowing users to access and analyze historical data for a longer duration.",
        tag: [],
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "DAG Support For Pipeline",
        description:
          "Enable complex flows such as parallel execution, stage grouping, etc.",
      },
      {
        title: "Export audit trail as CSV",
        description:
          "Allows users to export the audit trail in CSV format for easier analysis, sharing, and record-keeping.",
        tag: [{ value: "Audit Trail" }],
      },
      {
        tag: [{ value: "Notify" }],
        title: "Service account token expiration",
        description:
          "Configure service account token expiration notifications through the centralized notification system.",
      },
    ],
  },
  Released: {
    description: "✅ What has been released",
    feature: [
      {
        title: "Audit log streaming in NDJSON",
        description:
          "Ability to stream audit logs in New Line Delimited (NDJSON) format.",
        tag: [{ value: "Audit Trail" }],
        link: "/docs/platform/governance/audit-trail/audit-streaming/#configure-the-streaming-connector"
      },
      {
        title: "Customize Harness UI",
        description:
          "Organisations can display their own logo, and favicon.",
        tag: [{ value: "UI" }],
        link: "/docs/platform/get-started/harness-ui-overview"
      },
      {
        title: "Granular Permissions for Secrets",
        description:
          "Users will have separate Create and Edit permissions for secrets, instead of a single combined 'Create/Edit' permission, enabling more granular access control and improved security alignment.",
        tag: [{ value: "Secrets" }, { value: "Access Control" }],
        link: "/docs/platform/role-based-access-control/rbac-in-harness/#secrets"
      },
      {
        title: "Impersonate a user",
        description:
          "Ability to impersonate a user allowing an impersonator to perform actions on the user behalf. This helps admins ensure that all users have desired access to resources.",
        tag: [{ value: "Access Control" }],
        link: "/docs/platform/role-based-access-control/user-impersonation/"
      },
      {
        title: "Support Access control using tags for connectors",
        description:
          "Add connectors as resources in a resource group “By Tag,” enabling dynamic inclusion or exclusion based on assigned tags." ,
        tag: [{ value: "Access Control" }],
        link: "/docs/platform/connectors/manage-access-control-for-connectors/#configure-roles"
      },
      {
        tag: [{ value: "Access Control" }, {value: "Pipeline"}],
        title: "Pipeline Create/Edit permission split",
        description:
          "Split Pipeline 'Create/Edit' permission into 'Create' and 'Edit' permissions",
        link: "/docs/platform/role-based-access-control/rbac-in-harness/"
      },
      {
        title: "Proxy support in Delegate auto upgrader",
        description:
          "Enhance the Delegate auto-upgrader to support proxy configuration through environment variables.",
        tag: [{ value: "Delegate" }],
        link: "/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings/#proxy-settings-for-delegate-upgrader"
      },
    ],
  }, 
};
