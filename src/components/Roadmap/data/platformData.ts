import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  Now: {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        title: "List UI Improvements",
        description:
          "Revamping and optimizing the list view feature in our application's user interface across all modules",
        tag: [{ value: "UI" }],
      },
      {
        tag: [],
        title: "Pipeline Data Retention",
        description:
          "Extended Data Retention, Data Archiving and Compliance capabilites ",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OIDC Support for AWS",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your AWS resources without secrets or credentials",
      },
      {
        tag: [],
        title: "Single Tenant SaaS",
        description:
          "Customers can request to be onboarded to a single tenant Harness SaaS cluster",
      },
      {
        tag: [],
        title: "Account Migration",
        description:
          "Customers can request to be migrated to a different SaaS cluster",
      },
      {
        tag: [{ value: "Notify" }],
        title: "Centralized Notification system",
        description:
          "Centralized notification system to configure delegate notifications",
      },
      {
        tag: [{ value: "Scale" }],
        title: "Test Account Cluster",
        description:
          "Customers can be onboarded in a new cluser for their test accounts",
      },
      {
        tag: [{ value: "Resource Management" }],
        title: "Project movement across organization",
        description:
          "",
      },
      {
        tag: [{ value: "SMP" }],
        title: "Multi tenant SMP",
        description:
          "Support creation of multiple accounts on Harness Self-Managed Enterprise Edition",
      },
    ],
  },
  Next: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "Pipeline" }, { value: "Template" }],
        title: "Template Library",
        description: "Open Source repository for Pipeline Templates",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Priority Queue for Pipeline Execution",
        description: "",
      },
      {
        tag: [],
        title: "Audit Trails",
        description: "Send audit events to Splunk and GCS bucket",
      },
      {
        tag: [],
        title: "Custom banners",
        description: "Display custom banners in the Harness UI",
      },
       {
        tag: [{ value: "Delegate" }],
        title: "Restrict delegate usage",
        description: "Ability to restrict delegate usage across Accounts/Orgs/Projects and Environments",
      },
       {
        tag: [],
        title: "Console log line limit",
        description: "Ability to increase the console log line limits",
      },
    ],
  },
  Later: {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [{ value: "Pipeline" }, { value: "Insights" }],
        title: "Pipeline Analytics",
        description: "",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: " DAG Support For Pipeline",
        description:
          "Enable complex flows such as parallel execution, stage grouping, etc.",
      },
      {
        tag: [{ value: "Secure" }],
        title: "OIDC Support for secret managers",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your cloud provider secret manager without secrets or credentials",
      },
      {
        tag: [{ value: "Access Control" }],
        title: "Centralized view of permissions on a resource",
        description:
          "Centralized visibility into which permissions have been granted to whom and on what resources",
      },
      {
        tag: [{ value: "Policy" }],
        title: "Policy to govern projects",
        description:
          "Support to allow policy to govern projects",
      },
      {
        tag: [{ value: "Notify" }],
        title: "Customized notification body text",
        description:
          "Create and manage customized notification body text",
      },
    ],
  },
  Released: {
    description: "What has been released",

    feature: [
         {
        tag: [{ value: "Secure" }],
        title: "OIDC Support for GCP",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your GCP resources without secrets or credentials",
      },
      {
        tag: [{ value: "Secure" }],
        title: "Encrypted SAML",
        description:
          "Enable encrypted SAML to allow Harness integration with your IDP",
      },
      {
        tag: [],
        title: "Gov cloud support for Azure Key Vault",
        description:
          "Support government cloud for Azure Key Vault connectors with username/password",
      },
      {
        tag: [{ value: "Session Management" }],
        title: "Absolute session timeout",
        description:
          "For enhanced security users can be logged out of their account after the configured timeout, regardless of any activity",
      },
      {
        tag: [{ value: "SMP" }],
        title: "Backup and restore",
        description:
          "Use velero to back up and restore Helm-based installations of Harness Self-Managed Enterprise Edition",
      },
      {
        tag: [{ value: "SMP" }],
        title: "Disaster Recovery",
        description:
          "Setup a disaster recovery (DR) cluster for better node failure tolerance",
      },
      {
        tag: [{ value: "SMP" }],
        title: "External Database",
        description:
          "Configura external databases as a self-managed solution",
      },
    ],

  },
};
