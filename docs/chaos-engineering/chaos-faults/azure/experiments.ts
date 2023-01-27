import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Azure disk loss",
    description: "Azure disk loss detaches the virtual disk from an Azure instance during chaos.",
    tags: ["azure", "disk loss"],
    category: "azure", 
  },
  {
    name: "Azure instance CPU hog",
    description: "Azure instance CPU hog disrupts the state of infrastructure resources by inducing stress on the Azure instance using the Azure Run Command.",
    tags: ["azure", "CPU hog"],
    category: "azure", 
  },
  {
    name: "Azure instance IO stress",
    description: "Azure instance I/O stress disrupts the state of infra resources by inducing stress on the Azure Instance using the Azure Run command.",
    tags: ["azure", "I/O stress"],
    category: "azure", 
  },
  {
    name: "Azure instance memory hog",
    description: "Azure instance memory hog disrupts the state of infrastructure resources by inducing stress on the Azure Instance using the Azure Run command.",
    tags: ["azure", "memory hog"],
    category: "azure", 
  },
  {
    name: "Azure instance stop",
    description: "Azure instance stop powers off from an Azure instance during a specific duration.",
    tags: ["azure"],
    category: "azure", 
  },
  {
    name: "Azure web app access restrict",
    description: "Azure web app access restrict cause a split brain condition by restricting the access to an application service instance.",
    tags: ["azure", "restrict access"],
    category: "azure", 
  },
  {
    name: "Azure web app stop",
    description: "Azure web app stop shuts down the application.",
    tags: ["azure", "stop"],
    category: "azure", 
  },
];
