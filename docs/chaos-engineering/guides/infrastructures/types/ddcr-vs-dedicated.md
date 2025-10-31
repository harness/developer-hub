---
title: Delegate Versus Dedicated Chaos Infrastructure
sidebar_position: 20
redirect_from:
- /docs/chaos-engineering/guides/infrastructures/#dedicated-chaos-infrastructure-versus-harness-delegate-driven-chaos-infrastructure
- /docs/chaos-engineering/guides/infrastructures/ddcr-vs-dedicated
---

This section compares the characteristics of Delegate-Driven Chaos Infrastructure and Dedicated chaos infrastructure (Legacy Kubernetes infrastructure).

<table>
  <tr>
    <th>Harness Delegate-Driven Chaos Infrastructure or Runner (DDCR)</th>
    <th>Dedicated Chaos Infrastructure</th>
  </tr>
  <tr>
    <td>Involves installing <a href="https://developer.harness.io/docs/chaos-engineering/guides/infrastructures/types/ddcr#what-is-ddcr"><strong>Delegates</strong> </a>, a service used to connect to <strong>artifact repositories, collaboration tools, verification systems</strong>, and more.</td>
    <td>Involves <a href="https://developer.harness.io/docs/chaos-engineering/guides/infrastructures/types/legacy-infra/kubernetes">setting up</a> a separate, dedicated environment for running chaos experiments.</td>
  </tr>
  <tr>
    <td>Leverages the <strong>existing infrastructure</strong>, allowing chaos experiments to be run without requiring a separate setup, eliminating the need of CRDs.</td>
    <td>Requires CRDS and its own <strong>resources</strong> (servers, network configurations, etc.) that are <strong>isolated</strong> from the main application infrastructure.</td>
  </tr>
  <tr>
    <td>Includes <strong>automated Kubernetes service discovery</strong> and workload analysis using a <a href="https://developer.harness.io/docs/chaos-engineering/guides/service-discovery#how-does-harness-ce-leverage-discovered-services"><strong>transient discovery agent</strong> </a>.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Supports <a href="https://developer.harness.io/docs/chaos-engineering/guides/application-maps"><strong>automated and guided application map creation</strong> </a>, representing a fully functional application within the cluster.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Enables <a href="https://developer.harness.io/docs/chaos-engineering/guides/infrastructures/#auto-create-experiments"><strong>chaos experiment auto-creation</strong> </a> for a given <a href="https://developer.harness.io/docs/platform/application-map/"> application map </a> based on the <strong>workload specification and network traffic lineage</strong>.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Provides <strong>application-level and application map-level resilience scores</strong>, giving a broader resilience assessment.</td>
    <td>Provides <strong>chaos experiment-level</strong> resilience scores.</td>
  </tr>
  <tr>
    <td>Seamlessly <strong>integrates with the existing infrastructure</strong>, avoiding additional setup.</td>
    <td>Provides <strong>complete isolation</strong>, making it independent from the existing setup.</td>
  </tr>
  <tr>
    <td><strong>Adaptable</strong> for varying environments, making it easy to execute chaos experiments within <strong>CI/CD pipelines</strong>.</td>
    <td>Requires <strong>additional resources, setup, and time</strong>, making it less adaptable for dynamic environments.</td>
  </tr>
  <tr>
  <td> Enables fault execution on following platforms:
  <ul><li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/aws/">AWS</a></li>
  <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/gcp/">GCP</a></li>
  <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/kubernetes/">Kubernetes</a></li>
  <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/">VMware</a></li></ul></td>
  <td> Enables fault execution on following platforms:
  <ul><li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/aws/">AWS</a></li>
  <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/azure/">Azure</a></li>
  <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/gcp/">GCP</a></li>
  <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/kubernetes/">Kubernetes</a></li>
  <li><a href="https://developer.harness.io/docs/chaos-engineering/faults/chaos-faults/vmware/">VMware </a></li></ul></td>
  </tr>
</table>