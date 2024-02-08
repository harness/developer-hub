import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  Now: {
    description: "Q2 2024, May-July 2024",
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
    ],
  },
  Next: {
    description: "Q3 2024, Aug-Oct 2024",
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
    description: "Q4 2024+, Oct+ 2024",
    feature: [
      {
        tag: [{ value: "Pipeline" }],
        title: "Move Project Across Orgs",
        description: "",
      },
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
};
