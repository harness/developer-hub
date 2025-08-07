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
        tag: [{ value: "Access Control" }],
      },
      {
        title: "Audit log streaming in NDJSON format",
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
          "Users will be able to customize the login screen, navigation logo, and favicon.",
        tag: [{ value: "UI" }],
      },
      {
        title: "mTLS support for Harness APIs",
        description:
          "Enhanced API security with mutual TLS authentication for enterprise-grade protection of API communications.",
        tag: [{ value: "Access Control" }],
      },
      {
        title: "Granular Permissions for Secrets",
        description:
          "Users will now have separate Create and Edit permissions for secrets, instead of a single combined 'Create/Edit' permission, enabling more granular access control and improved security alignment.",
        tag: [{ value: "Secrets" }],
      },
    ],
  },
  Next: {
    description: "🪄 Q4 2025, Nov 2025 - Jan 2026",
    feature: [
      {
        title: "Event Streaming",
        description:
          "Real-time streaming of pipeline execution data to external systems to support advanced monitoring and observability.",
        tag: [{ value: "Pipeline" }],
      },
      {
        title: "Support Kerberos authentication for proxy access to template images in Delegate",
        description:
          "Enables secure proxy authentication using Kerberos for template images in Delegate, supporting enterprise environments with on-prem Kubernetes deployments.",
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
        title: "Increased in Data Retention period",
        description:
          "Support for increased data retention for Audit logs & Pipeline logs.",
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
          "Export audit trail as a CSV directly from Harness UI.",
        tag: [{ value: "Audit Trail" }],
      },
      {
        tag: [{ value: "Notify" }],
        title: "Service account token expiration",
        description:
          "Add support for centralized notification system to configure service account notifications",
      }, 
      {
        tag: [{ value: "Pipeline" }, { value: "Insights" }],
        title: "Pipeline Analytics",
        description: "",
      },
      {
        title: "Move Project between Organizations",
        description:
          "Move a project from one org to another to support scenarios like ownership change.",
        tag: [],
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
          "Add support for adding connectors as a resource in resource group 'By tag', allowing the dynamic inclusion/exclusion of connectors as they are assigned tags" ,
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
        tag: [{ value: "Notify" }],
        title: "Centralized Notification for Delegate",
        description:
          "Centralized notification system to configure delegate notifications",
        link: "/docs/platform/notifications/centralised-notification#delegate-notifications"
      },
      {
        tag: [{ value: "Notify" }, { value: "Pipeline" }],
        title: "Default notification template for notification rules",
        description:
          "Add support for default notification templates for Pipeline notification rules.",
        link: "/docs/platform/notifications/default-notification-template/"
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Support for all channels for Custom notifications",
        description:
          "Add support for all remaining channels in Custom Pipeline notifications. Currently, only the Webhook channel is supported.",
        link: "/docs/platform/templates/customized-notification-template/#how-to-attach-a-template"
      },
      {
        tag: [{ value: "Secure" }],
        title: "Reconciliation Secret Manager template changes",
        description: "Add support for updating custom secret manager if the referenced secret manager template is updated",
        link: "/docs/platform/secrets/secrets-management/reconcilation-of-secret-manager-template"
      },
      {
        title: "Custom Login Message for SMP",
        description:
          "Add a custom message on the login screen in SMP. Typically used for Legal disclaimers.",
        tag: [{ value: "SMP" }],
        link: "/docs/self-managed-enterprise-edition/advanced-configurations/configure-custom-signin-message"
      },
    ],
  }, 
};
