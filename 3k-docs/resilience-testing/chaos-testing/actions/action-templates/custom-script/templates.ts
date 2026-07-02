import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const customScriptActionTemplates: ExperimentDetails[] = [
  {
    name: "Grafana Chaos Annotation",
    description:
      "Grafana chaos annotation action annotates the grafana dashboard to highlight the chaos duration.",
    tags: ["grafana", "observability", "annotation"],
    category: "custom-script",
  },
  {
    name: "Datadog Chaos Event",
    description:
      "It creates an event for the datadog dashboard to highlight the chaos injection.",
    tags: ["datadog", "observability", "event"],
    category: "custom-script",
  },
];
