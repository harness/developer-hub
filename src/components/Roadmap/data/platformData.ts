import { link } from "fs";
import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  Now: {
    description: "🚧 Q3 2025, Aug 2025 - Oct 2025",
    feature: [
      {
        title: "Self Serve signup and payment flow",
        description:
          "Allow users to sign up and manage their subscriptions directly from the Harness UI.",
        tag: [],
      },
      {
        title: "Audit log streaming in NDJSON",
        description:
          "Ability to stream audit logs in New Line Delimited (NDJSON) format.",
        tag: [{ value: "Audit Trail" }],
      },
      {
        title: "Hashicorp Vault: JWT enhanced claims",
        description:
          "Allows users to include additional JWT claims (e.g., environment ID) for fine-grained access control and stricter secret isolation, improving security and compliance.",
        tag: [{ value: "Connectors" }],
      },
      {
        title: "Customize Harness UI",
        description:
          "Organisations can display their own logo, and favicon.",
        tag: [{ value: "UI" }],
      },
      {
        title: "Granular Permissions for Secrets",
        description:
          "Users will have separate Create and Edit permissions for secrets, instead of a single combined 'Create/Edit' permission, enabling more granular access control and improved security alignment.",
        tag: [{ value: "Secrets" }, { value: "Access Control" }],
      },
    ],
  },
  Next: {
    description: "🪄 Q4 2025, Nov 2025 - Jan 2026",
    feature: [
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
        title: "Alerting on platform limits",
        description:
          "Proactive notifications when approaching platform usage limits to prevent service disruptions and optimize resource planning.",
        tag: [{ value: "Platform" }],
      },
      {
        title: "Event Streaming",
        description:
          "Real-time streaming of data to external systems to support advanced monitoring and observability.",
        tag: [{ value: "Insights" }],
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
    description: "🔭 Q1 2026+, Feb 2026 & beyond",
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
      {
        title: "Move Project across Organizations",
        description:
          "Move a project from one organization to another to support scenarios like ownership change.",
        tag: [{ value: "Platform" }],
      },
    ],
  },
  Released: {
    description: "✅ What has been released",
    feature: [
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
      {
        tag: [{ value: "Notify" }, { value: "Delegate" }],
        title: "Centralized notification for Delegate",
        description:
          "Configure delegate notifications through the centralized notification system.",
        link: "/docs/platform/notifications/centralised-notification#delegate-notifications"
      },
      {
        tag: [{ value: "Notify" }, { value: "Pipeline" }],
        title: "Default notification template for notification rules",
        description:
          "Allows setting a default notification template that is automatically applied to notification rules when no specific template is selected.",
        link: "/docs/platform/notifications/default-notification-template/"
      },
      {
        tag: [{ value: "Dashboard" }],
        title: "Programatic Dashboard management",
        description:
          "Provides Dashboard APIs to manage folders and dashboards, along with a Terraform module that uses these APIs to enable automated dashboard management.",
        link: "https://apidocs.harness.io/tag/dashboards"
      },
      {
        tag: [{ value: "Dashboard" }],
        title: "Step Data on Custom Dashboards",
        description:
          "Enables creation of custom dashboards using complete pipeline step execution data.",
      },
      {
        tag: [{value: "Pipeline"}, { value: "Notify" }],
        title: "Support for all channels for Custom notifications",
        description:
          "Extends custom notifications to support all available channels, providing greater flexibility in how notifications are delivered.",
        link: "/docs/platform/templates/customized-notification-template/#how-to-attach-a-template"
      },
      {
        tag: [{ value: "Secure" }],
        title: "Reconciliation Secret Manager template changes",
        description: "Ability to reconcile entities, such as custom secret managers or secrets, linked to a secret manager template when the referenced template is updated.",
        link: "/docs/platform/secrets/secrets-management/reconcilation-of-secret-manager-template"
      },
      {
        title: "Custom Login Message for SMP",
        description:
          "Allows organizations to display a custom prompt message on the login screen, typically used for legal disclaimers.",
        tag: [{ value: "SMP" }, { value: "UI" }],
        link: "/docs/self-managed-enterprise-edition/advanced-configurations/configure-custom-signin-message"
      },
    ],
  }, 
};
