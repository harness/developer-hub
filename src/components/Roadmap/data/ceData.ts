import { Horizon } from "./roadmapData";

export const CeData: Horizon = {
  Now: {
    description: "Q1 2025, Feb 2025 - May 2025",
    feature: [
      {
        tag: [{ value: "Security" }],
        title: "Run-With-ServiceAccount for Kubernetes chaos experiments",
        description: "Prevent unwanted users from running chaos experiments by strict enforcement of service account configurion.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Introduce Recommendations",
        description: "Provide recommendations on what experiments to create, what experiments to run and how to fix discovered issues.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Timeline view of chaos execution",
        description: "Provide a timeline view of the execution of chaos experiments including the resilience probes.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Chaos Agent for AWS ECS",
        description: "Support the native chaos agent for AWS ECS platform.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "Fault flags for application chaos",
        description: "Provide SDK for developers to insert chaos code for generating application chaos.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Recommendations on what to fix",
        description: "Add more parameters around the recommendations on what to be fixed.",
      },
    ],
  },
  Next: {
    description: "Q2 2025, Jun 2025 - Aau 2025",
    feature: [
      {
        tag: [{ value: "Chaos platform" }],
        title: "Discovery support for AWS",
        description: "Discover AWS resources and auto create chaos experiments around them.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Golden Signals for services",
        description: "Provide the integrated monitoring around golden signals for those services that undergo chaos experimentation.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Generic Resilience Probe support for all APMs",
        description: "Create Resilience Probes for any generic APM as a template and iterate from there.",
      },
      {
        tag: [{ value: "Chaos orchestration" }],
        title: "Templates support for Chaos Experiments ",
        description: "Scale up the adoption using end to end templates of chaos experiments that include probes and actions.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Extend the AI support for non-k8s targets ",
        description: "Provide a list of identified risks and corresponding recommendations for mitigation on Linux, Windows and major cloud platforms .",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Integrate with incident management systems",
        description: "Bring the knowledge of incidents into chaos experiment creation and execution..",
      },
    ],
  },
  Later: {
    description: "Q2 2025+, Q3 2025 and beyond ",
    feature: [
      {
        tag: [{ value: "Chaos platform" }],
        title: "Agentic AI support for chaos orchestration",
        description: "Interact with the other AI agents to derive the chaos recommendations.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "GenAI support for experiment creation",
        description: "Use GenAI for creation of new chaos experiments.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "GenAI support for resilience insights",
        description: "Use GenAI for obtaining resilience insights around the executed chaos experiments.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "GenAI support for resilience probes",
        description: "Use GenAI for creating new resilience probes and also to generate insights around them.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "Security chaos ",
        description: "Provide out of the box faults for resilience validation around security.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Chaos platform" }],
        title: "Centralised execution plane for Kubernetes",
        description: "Run chaos experiments on all private kubernetes clusters through a single Harness Delegate.",
      },
      {
        tag: [{ value: "Chaos Faults" }],
        title: "JVM Faults for Kubernetes",
        description: "Run chaos faults on kuberntes applications.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Bulk Run chaos experiments",
        description: "Schedule a bunch of chaos experiments at once for staggered running.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Application Maps and Resilience Coverage",
        description: "Create application maps around the discovered Kubernetes micro services and measure resilience coverage on them.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "JVM Faults for Linux targets",
        description: "JVM faults to perform application chaos on Linux targets.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Updated GameDay portal",
        description: "Create, orchestrate and monitor GameDays for SREs. Do postmortems too.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Pipelines in Chaos Module",
        description: "Add approval steps, run parallel chaos experiments and send notifications using the native pipeline steps.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Windows Native Agent for Chaos",
        description: "Run chaos experiments on Windows machines from a native Windows Chaos Agentor Infrastructure.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Chaos Plugin for IDP",
        description: "List and run chaos experiments directly from Harness IDP.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Dashboard support for Resilience Probes",
        description: "Configure custom dashboard for insights around resilience probes.",
      },
    ],
  },
};
