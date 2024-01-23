import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Q2 2024 May-July": {
    description: "Description",
    feature: [
      {
        title: "List UI Improvements",
        description: "Revamping and optimizing the list view feature in our application's user interface across all modules",
        tag: ["UI"],
      },
      {
        tag: ["Pipeline", "Platform"],
        title: "Pipeline Data Retention",
        description: "Extended Data Retention, Data Archiving and Compliance capabilites ",
      },
    ],
  },
  "Q3 Aug-Oct": {
    description: "Description two",
    feature: [
      {
        tag: ["Pipeline", "Template"],
        title: "Template Library",
        description: "Open Source repository for Pipeline Templates",
      },
      {
        tag: ["Pipeline"],
        title: "Priority Queue for Pipeline Execution",
        description: "description2 ",
      },
    ],
  },
  "Long Term": {
    description: "Description threes",
    feature: [
      {
        tag: ["Pipeline"],
        title: "Move Project Across Orgs",
        description: "description 1",
      },
      {
        tag: ["Pipeline"],
        title: "Pipeline Analytics",
        description: "description2 ",
      },
      {
        tag: ["Pipeline"],
        title: " DAG Support For Pipeline",
        description: "Enable complex flows such as parallel execution, stage grouping, etc.",
      },
    ],
  },
};
