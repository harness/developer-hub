import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "SSH chaos",
    description:
      "Run a user-supplied inject script on a remote host over SSH for a configurable duration, with a rollback script invoked on completion or abort.",
    tags: ["ssh"],
    category: "ssh",
  },
];
