import { Horizon } from "./roadmapData";

export const SrmData: Horizon = {
  Now: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Reliability platform" }],
        title: "Auto discover the services for SLIs and SLOs",
        description: "Automatically discover the services on Kubernetes and enable them for SLO monitoring.",
      },
      {
        tag: [{ value: "Reliability platform" }],
        title: "Auto create SLIs and SLOs using Prometheus",
        description: "Deploy Prometheus monitoring agents for the discovered services and create basic SLIs and SLOs automatically.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "Native Prometheus monitoring",
        description: "Auto deploy the monitoring agents to provide support for golden signal monitoring.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "SLIs integrations with Chaos Engineering",
        description: "Resilience probe support for the SLIs that were automatically created upon service discovery.",
      },
    ],
  },
  Next: {
    description: "Q4 2024, Nov 2024 - Jan 2025",
    feature: [
{
        tag: [{ value: "Reliability platform" }],
        title: "Extended support for Prometheus monitoring",
        description: "Add new monitoring metrics to the discovered services.",
      },
      {
        tag: [{ value: "Reliability platform" }],
        title: "Intelligent dashboards around SLOs",
        description: "Insights through custom dashboards around SLOs and Error budgets.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "OPA policies for controlling CD pipelines",
        description: "Manage the execution of Harness CD pipelines using OPA policies around SLIs and Error Budgets.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "Recommend chaos experiments",
        description: "New chaos experiment runs are recommended when an SLO breach occurs.",
      },
    ],
  },
  Later: {
    description: "Q1 2025+, Q2 2025 & beyond",
    feature: [
      {
        tag: [{ value: "Reliability platform" }],
        title: "Incident Management",
        description: "Create, manage and respond to the incidents in the lower environment as well as in production.",
      },
      {
        tag: [{ value: "Reliability platform" }],
        title: "Fast and slow burn configurations",
        description: "Configure expectations around error budget burns.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "Harness AIDA support",
        description: "Add GenAI support for SLO creation and SLO reporting.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Reliability platform" }],
        title: "SLOs and SLIs",
        description: "Unify the observability platforms by creating the SLIs and SLOs.",
      },
      {
        tag: [{ value: "Reliability platform" }],
        title: "Error budgets and alerts",
        description: "Create and manage the error budget at each service level to enable the SREs to take proactive actions in managing the reliability.",
      },
      {
        tag: [{ value: "Reliability platform" }],
        title: "RBAC for SLOs",
        description: "RBAC capability for who can create SLOs.",
      },
      {
        tag: [{ value: "Reliability platform" }],
        title: "Health scores for services",
        description: "Intelligent scoring around the health of the services by using ML.",
      },
      {
        tag: [{ value: "Reliability platform" }],
        title: "Integrated dashboards with other Harness modules",
        description: "Comprehensive and integrated insights around SLIs and SLOs impacted by Feature Flag changes, new deployments and chaos experiments.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "FireHydrant as incident source",
        description: "Generate health reports in SRM when incidents are triggered by FireHydrant.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "PagerDuty as incident source",
        description: "Generate health reports in SRM when incidents are triggered by PagerDuty.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "VictorOps as incident source",
        description: "Generate health reports in SRM when incidents are triggered by VictorOps.",
      },
      {
        tag: [{ value: "Reliability integrations" }],
        title: "Observability platform integrations",
        description: "Integrate with Datadog, Dynatrace, NewRelic, Prometheus, Splunk and many more platforms to fetch the monitoring data on which SLIs and SLOs are configured.",
      },
    ],
  },
};
