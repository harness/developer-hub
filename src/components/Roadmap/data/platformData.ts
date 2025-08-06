import { link } from "fs";
import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
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
          "Enhance the Delegate auto upgrader to respect the same proxy environment variables as the delegate",
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
          "Add support for default notification templates for notification rules",
        link: "/docs/platform/notifications/default-notification-template/"
      },
      {
        title: "List UI Improvements",
        description:
          "Revamping and optimizing the list view feature in our application's user interface across all modules",
        tag: [{ value: "UI" }],
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Support for all channels for Custom notifications",
        description:
          "Add support for all remaining channels for Custom notifications. Currently, only Webhook channel is supported.",
        link: "/docs/platform/templates/customized-notification-template/#how-to-attach-a-template"
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Pipeline Data Retention",
        description:
          "Extended Data Retention, Data Archiving, and Compliance capabilities",
      },
      {
        tag: [{ value: "Pipeline" }, { value: "Template" }],
        title: "Template Library",
        description: "Open Source repository for Pipeline Templates",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Flexible Templates that Support User-Injected Steps",
        description: "Users can pull a template into their pipeline and inject a step into it.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Bulk Reconciliation when a User Update a Template ",
        description: "When a user updates a template, they can now bulk update each pipeline referring to the template.",
        link: "/docs/platform/templates/reconcile-pipeline-templates/#bulk-reconciliation-of-templates"
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Priority Queue for Pipeline Execution",
        description: "",
        link: "/docs/platform/pipelines/pipeline-settings/#project-level-pipeline-execution-concurrency"
      },
      {
        tag: [{ value: "Secure" }],
        title: "Reconciliation Secret Manager template changes",
        description: "Add support for updating custom secret manager if the referenced secret manager template is updated",
        link: "/docs/platform/secrets/secrets-management/reconcilation-of-secret-manager-template"
      },
      {
        tag: [],
        title: "Console log line limit",
        description: "Ability to increase the console log line limits",
      },
      {
        tag: [{ value: "SMP" }],
        title: "Supported modules",
        description:
          "Supply Chain Security - Beta, Infrastructure as Code Mgmt - Beta",
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
        title: "Audit log streaming in New Line Delimited (NDJSON) format",
        description:
          "Ability to stream audit logs in New Line Delimited (NDJSON) format.",
        tag: [{ value: "Audit Trail" }],
      },
      {
        title: "Hashicorp Vault: JWT enhanced claims",
        description:
          "Allows users to include an additional JWT claim for the environment ID. This enables fine-grained access control and stricter isolation of secrets across environments (e.g., dev, staging, prod), improving security and compliance.",
        tag: [{ value: "Connectors" }],
      },
      {
        title: "Customise your Login and update the Harness logo with your own.",
        description:
          "Allows users to customise the appearance of their login screen and replace the Harness logo in the left navigation bar with their own",
        tag: [{ value: "UI" }],
      },
      {
        title: "RBAC Secrets: Split `Create/Edit` into two separate permissions",
        description:
          "With this change, users will now have two separate permissions — 'Create' and 'Edit' — instead of a single combined 'Create/Edit' permission.",
        tag: [{ value: "Secrets" }],
      },
    ],
  },
  Later: {
    description: "🪄 Q3 2025+, Nov 2025 & beyond",
    feature: [
      {
        title: "Advanced RBAC Permissions for User Groups",
        description:
          "Advanced permissions for User Groups to provide users enhanced granularity and control while creating roles.",
        tag: [{ value: "Access Control" }],
      },
      {
        tag: [{value: "Access Control"}, { value: "Secure" }],
        title: "Secret Create/Edit permission split",
        description:
          "Split Secret 'Create/Edit' permission into 'Create' and 'Edit' permissions",
      },
      {
        title: "Export audit trail as CSV",
        description:
          "Export audit trail as a CSV directly from Harness UI.",
        tag: [{ value: "Audit Trail" }],
      },
      {
        tag: [{ value: "Notify" }],
        title: "Notification for Service Accounts expiration",
        description:
          "Add support for centralized notification system to configure service account notifications",
      },
      {
        tag: [{ value: "Policy" }],
        title: "Policy to govern projects",
        description:
          "Support to allow policy to govern projects",
      },
      {
        tag: [{ value: "SMP" }],
        title: "Supported modules",
        description:
          "Internal Developer Portal",
      },
      {
        title: "Move Project between Organizations",
        description:
          "Move a project from one org to another to support scenarios like ownership change.",
        tag: [],
      },
      {
        title: "Increased in Data Retention period",
        description:
          "Support for increased data retention for Audit logs & Pipeline logs.",
        tag: [],
      },
      {
        tag: [{ value: "Pipeline" }, { value: "Insights" }],
        title: "Pipeline Analytics",
        description: "",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "DAG Support For Pipeline",
        description:
          "Enable complex flows such as parallel execution, stage grouping, etc.",
      },   
    ],
  }, 
};
