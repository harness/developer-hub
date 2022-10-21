---
sidebar_position: 1
title: Introduction to Chaos Module
---

Cloud Native applications are, by definition, highly distributed, elastic, resistant to failure and loosely coupled. That's easy to say, and even 
diagram. But how do we validate that our applications will perform as expected under different failure conditions?

Enter Chaos engineering. Chaos engineering is the discipline of experimenting on a software system in order to build confidence in the system's 
capability to withstand turbulent and unexpected conditions. Chaos Engineering is a great tool to help us find weaknesses and misconfiguration in 
our services. It is _relevant for all types of systems (including the so called legacy applications and infrastructure)_, and particularly important for
Cloud Native applications, which, due to their distributed and elastic nature, inherently carry multiple points of failure.

The standard chaos experimentation flow involves identifying the steady state of the system/application under test, hyopthesizing around the 
impact a particular fault or failure would cause, injecting this fault in a controlled manner (with a pre-determined and often minimal "blast radius"), 
validating whether the hypothesis is proven and taking appropriate action in case if it is not, i.e., a weakness is found. 

<img width="764" alt="Screenshot 2022-10-10 at 3 49 17 PM" src="https://user-images.githubusercontent.com/21166217/194844911-aaab2502-b729-4214-84fb-70717172d4a8.png"></img>

Needless to say, chaos experimentation needs the appropriate observability infrastructure in place to aid validation of the hypothesis around 
steady-state. The chaos engineering practice consits of repeated experimentation, with varied faults to simulate real-world failure conditions 
carried out against different targets. 

<img width="544" alt="Screenshot 2022-10-10 at 4 23 22 PM" src="https://user-images.githubusercontent.com/21166217/194850472-0f4dda25-74f5-4dbb-86e8-45e09258de73.png"></img>


## Left-Shift Chaos Engineering

While the initial principles of chaos engineering mainly advocated experimenting in production (which is still relevant and recommended), it is 
being increasingly viewed as a means to validate resilience beforehand, i.e., as a quality gate for deployments into higher deployment environments. 
Generally, this is fueled by a need to build confidence in a highly dynamic environment in which application services _and_ infrastructure 
are subject to frequent, independent upgrades. The resulting paradigm is that of:  

- Increased ad-hoc/exploratory chaos testing by application developers & QA teams 
- Automation of chaos experiments within continuous delivery (CD) pipelines 


## Benefits of Harness Chaos Engineering 

The Harness Chaos Engineering Module takes a holistic-approach to chaos engieering, and does not merely focus on fault-injection. It is designed to help users setup a fully-operational chaos function that is based on the original [principles of chaos](https://principlesofchaos.org/) while also addressing several enterprise needs around its practice. 

1. Cloud-Native approach to chaos engineering which supports declarative definition of experiments and git-based chaos artifact sources (chaos-experiments-as-code)
2. Extensive fault library and robuts suite of ready-to-use experiments, with support for construction of complex custom experiments with multiple faults in the desired order
3. Centralized control plane with support for varied targets (Kubernetes-based microservices, cloud services, VMware infrastructure) 
4. Governance enforcement for chaos experimentation via dedicated workspaces, chaos teams, access control
5. Native integration with Harness CD (Continuous Delivery) pipelines
6. Hypothesis validation via probes and SLO management via integration with Harness CV (Continuous Verification)
7. Guided gameday execution with detailed analytics and reporting based on experiment execution and application resilience 
8. Chaos events, metrics and logs (audit, execution) to aid in the instrumentation of APM dashboards with chaos context
