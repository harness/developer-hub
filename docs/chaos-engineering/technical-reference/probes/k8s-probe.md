---
title: Kubernetes Probe
sidebar_position: 5
---

With the proliferation of custom resources & operators, especially in the case of stateful applications, the steady-state is manifested as status parameters/flags within Kubernetes resources. K8s Probe addresses verification of the desired resource state by allowing users to define the Kubernetes GVR (group-version-resource) with appropriate filters (field selectors/label selectors). The experiment makes use of the Kubernetes Dynamic Client to achieve this. The probe supports following CRUD operations:

- **create:** It creates kubernetes resource based on the data provided inside probe.data field.
- **delete:** It deletes matching kubernetes resource via GVR and filters (field selectors/label selectors).
- **present:** It checks for the presence of kubernetes resource based on GVR and filters (field selectors/label selectors).
- **absent:** It checks for the absence of kubernetes resource based on GVR and filters (field selectors/label selectors).
