import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Azure disk loss",
    description:
      "Azure disk loss detaches the virtual disk from an Azure instance.",
    tags: ["disk loss"],
    category: "azure",
  },
  {
    name: "Azure instance CPU hog",
    description:
      "Azure instance CPU hog disrupts the state of infrastructure resources. It induces stress on the Azure instance using the Azure `Run` command. The Azure `Run` command is executed using the in-built bash scripts within the fault. It utilizes excess amounts of CPU on the Azure instance using the bash script for a specific duration.",
    tags: ["CPU hog"],
    category: "azure",
  },
  {
    name: "Azure instance IO stress",
    description:
      "Azure instance I/O stress disrupts the state of infra resources. This fault induces stress on the Azure instance using the Azure `Run` command. The Azure `Run` command is executed using the in-built bash scripts within the fault. It causes I/O stress on the Azure Instance using the bash script for a specific duration.",
    tags: ["I/O stress"],
    category: "azure",
  },
  {
    name: "Azure instance memory hog",
    description:
      "Azure instance memory hog disrupts the state of infrastructure resources. It induces stress on the Azure Instance using the Azure `Run` command. The Azure `Run` command is executed using the in-built bash scripts within the fault. It utilizes memory in excess on the Azure Instance using the bash script for a specific duration.",
    tags: ["memory hog"],
    category: "azure",
  },
  {
    name: "Azure instance stop",
    description:
      "Azure instance stop powers off from an Azure instance for a specific duration. It checks the performance of the application or process running on the instance.",
    tags: ["azure"],
    category: "azure",
  },
  {
    name: "Azure web app access restrict",
    description:
      "Azure web app access restrict causes a split brain condition by restricting the access to an application service instance. This fault checks if the requests have been serviced and recovery is automated after the restrictions have been lifted. It checks the performance of the application (or process) running on the instance.",
    tags: ["restrict access"],
    category: "azure",
  },
  {
    name: "Azure web app stop",
    description: "Azure web app stop shuts down the application. It checks whether the requests have been re-routed to another instance on the application service.",
    tags: ["stop"],
    category: "azure",
  },
];
