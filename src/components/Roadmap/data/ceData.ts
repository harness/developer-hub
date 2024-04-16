import { Horizon } from "./roadmapData";

export const CeData: Horizon = {
  Now: {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [{ value: "Chaos faults" }],
        title: "App instance faults for PCF",
        description: "Introduce chaos natively to applications running on PCF using the Cloud Foundry APIs.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "Container chaos on Linux",
        description: "Introduce chaos directly onto the resources of container engines such as Docker.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Run chaos experiments using Harness Delegate",
        description: "Delegate runs the chaos experiments without the need for the dedicated chaos infrastructure.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Auto detect target services",
        description: "Discover the Kubernetes services on a cluster along with the traffic flows and enable them to cause chaos.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Auto create chaos experiments on Kubernetes",
        description: "Create chaos experiments automatically for the discovered services",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Chaos dashboards for resilience probes",
        description: "Create resilience insights around the observed steady states",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Auto create resilience probes using Prometheus",
        description: "Deploy prometheus exporters for basic observability and create resilience probes around them",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Chaos dashboards for chaos governance",
        description: "Create resilience insights around the governance rules and their adherence",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Resilience probe for NewRelic",
        description: "Score chaos experiments based on the monitors setup inside NewRelic.",
      },
    ],
  },
  Next: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "Chaos faults" }],
        title: "Fault flags for application chaos",
        description: "Provide SDK for developers to insert chaos code for generating application chaos.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "Chaos faults for JVM",
        description: "Introduce chaos using JVM parameters such as memory and threads.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Auto recommend chaos experiments",
        description: "Recommend additional chaos experiments to be created and/or run based on observed states.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Recommend resilience coverage",
        description: "Recommend additional chaos experiments to be run to increase the resilience coverage.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Timeline wiew of chaos execution",
        description: "Provide a timeline view of the execution of chaos experiments including the resilience probes.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Resilience probe for Splunk",
        description: "Score chaos experiments based on the monitors setup inside Splunk.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Resilience probe for AppDynamics",
        description: "Score chaos experiments based on the monitors setup inside AppDynamics.",
      },
    ],
  },
  Later: {
    description: "Q3 2024+, Aug 2024 & beyond",
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
        tag: [{ value: "Chaos faults" }],
        title: "Kubernetes, VMware, Linux, Windows chaos",
        description: "Chaos faults related to stress, network, HTTP API, time and more.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "AWS chaos",
        description: "Chaos faults for EC2, ECS, serverless and other AWS resources.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "Basic Azure and GCP chaos",
        description: "Chaos faults for Azure VMs and GCP VMs respectively.",
      },
      {
        tag: [{ value: "Chaos faults" }],
        title: "PCF chaos",
        description: "Basic PCF native faults related to stress.",
      },
       {
        tag: [{ value: "Chaos platform" }],
        title: "GameDay portal",
        description: "Create, orchestrate and monitor GameDays for SREs.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "Chaos RBAC",
        description: "RBACs for creating chaos infrastructure, GameDays and chaos experiments.",
      },
      {
        tag: [{ value: "Chaos platform" }],
        title: "ChaosGuard",
        description: "Deep ACL policies for governing who can run what chaos faults on which targets during what time window.",
      },
       {
        tag: [{ value: "Chaos platform" }],
        title: "Resilience Probes",
        description: "Status check templates for scoring the resilience of target systems during chaos experiments.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Chaos step for Harness CD pipelines",
        description: "A native pipeline step inside Harness CD to auto chaos experiments .",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Chaos step for Jenkins pipelines",
        description: "Integration to run chaos experiments inside Jenkins pipelines.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Chaos step for Gitlab pipelines",
        description: "Integration to run chaos experiments inside GitLab pipelines.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Resilience probe for SRM",
        description: "Score chaos experiments based on the SLIs of services during chaos.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Resilience probe for Datadog",
        description: "Score chaos experiments based on the monitors setup inside Datadog.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "Resilience probe for Dynatrace",
        description: "Score chaos experiments based on the monitors setup inside Dynatrace.",
      },
    ],
  },
};
