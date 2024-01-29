import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  "Now": {
    description: "Q2 2024, May-July 2024",
    feature: [
      {
        title: "List UI Improvements",
        description: "Revamping and optimizing the list view feature in our application's user interface across all modules",
        tag: ["UI"],
      },
      {
        tag: ["Pipeline", "Platform","Storage"],
        title: "Pipeline Data Retention",
        description: "Extended Data Retention, Data Archiving and Compliance capabilites ",
      },
    ],
  },
  "Next": {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: ["Pipeline", "Template"],
        title: "Template Library",
        description: "Open Source repository for Pipeline Templates",
      },
      {
        tag: ["Pipeline"],
        title: "Priority Queue for Pipeline Execution",
        description: "",
      },
    ],
  },
  "Later": {
    description: "Q4 2024+, Oct+ 2024",
    feature: [
      {
        tag: ["Pipeline"],
        title: "Move Project Across Orgs",
        description: "",
      },
      {
        tag: ["Pipeline","Insights"],
        title: "Pipeline Analytics",
        description: "",
      },
      {
        tag: ["Pipeline"],
        title: " DAG Support For Pipeline",
        description: "Enable complex flows such as parallel execution, stage grouping, etc.",
      },
    ],
  },
};
