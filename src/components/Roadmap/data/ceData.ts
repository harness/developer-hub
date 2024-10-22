import { Horizon } from "./roadmapData";

export const CeData: Horizon = {
  Now: {
    description: "Q3 2024, Aug-Oct 2024",
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
        tag: [{ value: "Security" }],
        title: "Run-With-ServiceAccount for Kubernetes chaos experiments",
        description: "Prevent unwanted users from running chaos experiments by strict enforcement of service account configurion.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Bulk Run chaos experiments",
        description: "Schedule a bunch of chaos experiments at once for staggered running.",
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
    ],
  },
  Next: {
    description: "Q4 2024, Nov 2024 -Jan 2025",
    feature: [
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
        title: "Resilience probes for Splunk and AppDynamics",
        description: "Score chaos experiments based on the monitors setup inside Splunk and AppDynamics.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "Application Chaos Faults for Kafka and Redis on Kubernetes ",
        description: "Application specific faults for Kafka and Redis on the Kubernetes platform.",
      },
    ],
  },
  Later: {
    description: "Q4 2024+, Q1 2025 and beyond ",
    feature: [
      {
        tag: [{ value: "Chaos faults" }],
        title: "Chaos Faults for DDoS on Kubernetes",
        description: "Chaos experiments to test if a target HTTP endpoint can be breached using DDoS.",
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
        tag: [{ value: "Chaos integrations" }],
        title: "Integrate with load generation tools",
        description: "Run load tests as chaos experiments to achieve the parallel effect of chaos and load.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Integrate with incident management systems",
        description: "Bring the knowledge of incidents into chaos experiment creation and execution..",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
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
        title: "Add resilience probe templates to ChaosHub",
        description: "Export and import the resilience probes from chaoshubs.",
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
