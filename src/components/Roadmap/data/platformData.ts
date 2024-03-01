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
        tag: [{ value: "AWS" }, { value: "GCP" }],
        title: "OIDC Support",
        description:
          "Use OpenID Connect (OIDC) functionality to allow Harness to communicate directly with your cloud provider",
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
        tag: [{ value: "Delegate" }],
        title: "Centralized Notification system",
        description:
          "Centralized notification system to configure notifications on Delegate",
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
    ],
  },
  Released: {
    description: "What has been released",
    feature: [],
  },
};
