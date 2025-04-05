---
sidebar_position: 1
title: Chaos101
canonical_url: https://www.harness.io/blog/chaos-engineering
description: Understand how chaos engineering builds system resilience, and how Harness enables scalable, secure, and enterprise-ready experimentation.
redirect_from:
- /docs/chaos-engineering/get-started/introduction-to-chaos-module
- /docs/chaos-engineering/get-started/overview
- /docs/chaos-engineering/architecture-and-security/architecture/components
---

Welcome to Harness Chaos Engineering!

This topic provides you with all the details such as what, why, and how of chaos engineering.

## What is Chaos Engineering?

Modern applications are complex, distributed, and dynamic—often built with microservices and deployed on cloud-native infrastructure. With that complexity comes unpredictability. Chaos Engineering is the practice of proactively introducing faults to uncover weaknesses and ensure systems remain reliable under real-world conditions.

> **Chaos Engineering** is the discipline of conducting controlled experiments to build confidence in a system’s ability to withstand turbulent conditions in production.

    ![](./static/chaos101/chaos-eng-steps.png)

---

## Why It Matters for Enterprises

In the current state for modern applications, downtime isn't just inconvenient—it can damage reputation, revenue, and customer trust.

Harness Chaos Engineering (Harness CE) helps enterprise teams:
- **Minimize risks** before incidents occur
- **Strengthen service reliability and SLAs**
- **Validate failover mechanisms and autoscaling**
- **Enable shift-left resilience testing during delivery**

Chaos engineering acts as a resilience gate for production, uncovering systemic gaps in infrastructure, failover, observability, and SRE practices.

---

## How It Works

Chaos Engineering simulates failures such as:
- Pod or node crashes
- CPU/memory/network stress
- Service/API latency or blackhole
- Cloud infrastructure degradation (for example, EC2 termination, Azure disk loss)

Harness enables this through a structured workflow:

    ![Chaos Engineering Overview](./static/chaos101/first-goal.png)

1. **Define steady state**: What does healthy behavior look like?
2. **Form a hypothesis**: What should happen during failure?
3. **Inject chaos**: Simulate the fault with minimal blast radius.
4. **Observe and verify**: Measure if the system maintained its SLOs.
5. **Remediate and improve**: Use insights to improve/build resilient systems.

---

## Shift Left with Confidence

The initial principles of chaos engineering recommend performing experiments in production, which is relevant and encouraged. This validates resilience beforehand, acting as a quality gate for larger deployment environments. The need to build confidence in a highly dynamic environment—where application services and infrastructure undergo frequent and independent upgrades—accelerates this process. The resulting paradigm includes:

- Increased ad-hoc and exploratory chaos testing by application developers and QA teams;
- Automating chaos experiments within continuous delivery (CD) pipelines.

---

## Next Steps

Ready to inject some resilience into your systems?

- [Chaos Experiments in Kubernetes](/docs/chaos-engineering/getting-started/saas/)

Or explore:
- [Get Started with Harness Chaos Engineering](https://developer.harness.io/docs/chaos-engineering/getting-started/)
- [Executing experiments in a sandbox](/docs/chaos-engineering/training/sandbox)

----
