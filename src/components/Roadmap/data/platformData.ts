import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  Released: {
    description: "What has been released",
    feature: [
      {
        title: "Custom banners",
        description: "Display custom banners in the Harness UI",
        tag: [{ value: "Notify" }],
        link: "/docs/platform/notifications/create-and-configure-banners"
      },
      {
        title: "Send notifications through Delegate",
        description:
          "Receive central or pipeline notifications exclusively through Delegates or a designated delegate.",
        tag: [{ value: "Delegate" }, { value: "Notify" }],
        link: "/docs/platform/notifications/centralised-notification#setting-up-notifications-management"
      },
      {
        tag: [{ value: "Secure" }],
        title: "OIDC Support for secret managers",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your cloud provider secret manager without secrets or credentials",
        link: "/release-notes/platform/#version-164x"
      },
      {
        tag: [{ value: "Delegate" }],
        title: "UBI9 upgrade",
        description: "Update the Delegate base image from redhat/ubi8-minimal:8.10 to redhat/ubi9-minimal:9.4",
        link: "/release-notes/delegate/"
      },
      {
        tag: [{ value: "Access Control" }],
        title: "Centralized view of permissions on a resource",
        description:
          "Centralized visibility into which permissions have been granted to whom and on what resources",
        link: ""
      },
      {
        tag: [{ value: "Authentication" }],
        title: "SSO with OIDC",
        description:
          "Single Sign-On (SSO) with any OIDC (OpenID Connect) provider, allowing authentication and provisioning user and user group",
        link: "/docs/platform/authentication/single-sign-on-sso-with-oidc/"
      },
      {
        title: "Auto upgrade Harness Docker Delegate",
        description:
          "Added support for automatic upgrades for Docker delegates brought up using the docker run command",
        tag: [{ value: "Delegate" }],
        link: "/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#docker-delegate"
      },
      {
        tag: [{ value: "Git Experience" }],
        title: "Auto Discovery of Entities in Git",
        description: "When an entity is created in Git it is created in Harness as well.",
        link: "/docs/platform/git-experience/autocreation-of-entities/"
      },
      {
        tag: [{ value: "Notify" }, { value: "Pipeline" }],
        title: "Notifications via Datadog",
        description:
          "Real-time pipeline event notifications directly in Datadog,",
        link: "/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events/#datadog-notifications"
      },
      {
        title: "Customized notification body text",
        description:
          "Create and manage customized notification body text",
        tag: [{ value: "Notify" }],
      },
      {
        title: "Policy as Code for Variables",
        description:
          "Support for Variables as an entity to store and enforce policies for variables and processes across the Harness platform.",
        tag: [{ value: "Policy" }],
        link: "/docs/platform/governance/policy-as-code/using-harness-policy-as-code-for-variables"
      },
      {
        tag: [{ value: "Secure" }],
        title: "OIDC Support for GCP",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your GCP resources without secrets or credentials",
        link: "/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/#use-openid-connect-oidc"
      },
      {
        tag: [{ value: "Secure" }],
        title: "Encrypted SAML",
        description:
          "Enable encrypted SAML to allow Harness integration with your IdP",
        link: "/docs/platform/authentication/single-sign-on-saml/#use-encrypted-saml"
      },
      {
        tag: [{ value: "Secure" }],
        title: "Gov cloud support for Azure Key Vault",
        description:
          "Support government cloud for Azure Key Vault connectors with username/password",
        link: "/docs/platform/secrets/secrets-management/azure-key-vault/"
      },
      {
        tag: [{ value: "Session Management" }],
        title: "Absolute session timeout",
        description:
          "For enhanced security, users can be logged out of their account after the configured timeout, regardless of any activity",
        link: "/docs/platform/authentication/authentication-overview/#set-absolute-session-timeout"
      },
      {
        tag: [{ value: "SMP" }],
        title: "Supported modules",
        description:
          "Continuous Delivery and GitOps, Continuous Integration, Security Test Orchestration, Feature Flags, Service Reliability Management, Chaos Engineering, Cloud Cost Management - Beta (AWS Cost Visibility)",
        link: "/docs/self-managed-enterprise-edition/smp-supported-platforms/#supported-modules"
      },
      {
        tag: [{ value: "SMP" }],
        title: "Backup and restore",
        description:
          "Use Velero to back up and restore Helm-based installations of Harness Self-Managed Enterprise Edition",
        link: "/docs/self-managed-enterprise-edition/back-up-and-restore-helm/"
      },
      {
        tag: [{ value: "SMP" }],
        title: "Disaster Recovery",
        description:
          "Setup a disaster recovery (DR) cluster for better node failure tolerance",
        link: "/docs/self-managed-enterprise-edition/advanced-configurations/set-up-disaster-recovery/"
      },
      {
        tag: [{ value: "Secure" }],
        title: "OIDC Support for AWS",
        description:
          "Use OpenID Connect (OIDC) to allow Harness to communicate directly with your AWS resources without secrets or credentials",
        link: "/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#credentials"
      },
      {
        tag: [{ value: "Audit Trail" }],
        title: "Audit Trail",
        description: "Send audit events to Splunk and GCS bucket",
        link: "/docs/platform/governance/audit-trail/audit-streaming/#configure-the-streaming-connector"
      },
      {
        title: "Audit logs streaming on Sumo Logic",
        description:
          "Configure Sumo Logic as a streaming destination in Harness to send audit log data to your Sumo Logic hostel collectors.",
        tag: [{ value: "Audit Trail" }],
        link: "/docs/platform/governance/audit-trail/audit-streaming/#configure-the-streaming-connector",
      },
      {
        title: "Audit events for expired API token",
        description:
          "Dedicated event for expiry of API tokens allowing for easy debugging.",
        tag: [{ value: "Audit Trail" }],
        link: "/release-notes/platform/#version-188x-"
      },
      {
        tag: [{ value: "Scale" }],
        title: "Test Account Cluster",
        description:
          "Customers can be onboarded in a new cluster for their test accounts",
      },
      {
        tag: [],
        title: "Account Migration",
        description:
          "Customers can request to be migrated to a different SaaS cluster",
      },
      {
        tag: [],
        title: "Multi-tenant SaaS in EU",
        description:
          "Customers can request to be onboarded to a multi-tenant Harness SaaS cluster in the EU region",
      },
      {
        tag: [{ value: "SMP" }],
        title: "External Database",
        description:
          "Configure external databases as a self-managed solution",
        link: "/docs/self-managed-enterprise-edition/advanced-configurations/external-db/configure-external-databases/"
      },
    ],
  },
  Now: {
    description: "Q2 2025, May 2025 - Jul 2025",
    feature: [
      {
        title: "Impersonate a user",
        description:
          "Ability to impersonate a user allowing an impersonator to perform actions on the user behalf. This helps admins ensure that all users have desired access to resources.",
        tag: [{ value: "Access Control" }],
      },
      {
        title: "Support Access control using tags for connectors",
        description:
          "Add support for adding connectors as a resource in resource group 'By tag', allowing the dynamic inclusion/exclusion of connectors as they are assigned tags" ,
        tag: [{ value: "Access Control" }],
      },
      {
        tag: [{ value: "Access Control" }, {value: "Pipeline"}],
        title: "Pipeline Create/Edit permission split",
        description:
          "Split Pipeline 'Create/Edit' permission into 'Create' and 'Edit' permissions",
      },
      {
        title: "Granular RBAC Permissions for Dashboards",
        description:
          "Granular permissions for Dashboards to provide users more control while creating different roles.",
        tag: [{ value: "Access Control" }, { value: "Dashboards" }],
      },
      {
        title: "Auto save Dashboard",
        description:
          "Auto save progress made on dashboards.",
        tag: [{ value: "Dashboards" }],
      },
      {
        title: "Copy tiles from a dashboard",
        description:
          "Copy tile from one dashboard and use it in another dashboard.",
        tag: [{ value: "Dashboards" }],
      },
      {
        title: "Access control for Dashboard: Schedule Delivery",
        description:
          "Copy tile from one dashboard and use it in another dashboard.",
        tag: [{ value: "Dashboards" }, { value: "Access Control" }],
      },
      {
        title: "Proxy support in Delegate auto upgrader",
        description:
          "Enhance the Delegate auto upgrader to respect the same proxy environment variables as the delegate",
        tag: [{ value: "Delegate" }],
      },
      {
        tag: [{ value: "Notify" }],
        title: "Centralized Notification for Delegate",
        description:
          "Centralized notification system to configure delegate notifications",
      },
      {
        tag: [{ value: "Notify" }, { value: "Pipeline" }],
        title: "Default notification template for notification rules",
        description:
          "Add support for default notification templates for notification rules",
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
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Priority Queue for Pipeline Execution",
        description: "",
      },
      {
        tag: [{ value: "Secure" }],
        title: "Reconciliation Secret Manager template changes",
        description: "Add support for updating custom secret manager if the referenced secret manager template is updated",
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
      },
    ],
  },
  Later: {
    description: "Q2 2025+, Aug 2025 & beyond",
    feature: [
      {
        title: "Granular RBAC Permissions for User Groups",
        description:
          "Granular permissions for User Groups to provide users more control while creating different roles.",
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
