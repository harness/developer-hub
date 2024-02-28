import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  Now: {
    description: "What is being delivered now",
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
        title: "OIDC Support",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your cloud provider resources without secrets or credentials",
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
    ],
  },
  Next: {
    description: "What is being developed next",
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
    ],
  },
  Later: {
    description: "What is being developed later",
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
        title: "OIDC Support",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your cloud provider secret manager without secrets or credentials",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
         {
        tag: [{ value: "Secure" }],
        title: "OIDC Support",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your cloud provider resources without secrets or credentials",
      },
      {
        tag: [{ value: "Secure" }],
        title: " Encrypted SAML",
        description:
          "Enable encrypted SAML to allow Harness integration with your IdP",
      },
    ],
  },
};
