---
title: Helm FAQs
description: Frequently asked questions about Helm deployments.
sidebar_position: 1000
---

This article addresses some frequently asked questions about Helm deployments in Harness.


### Can Harness process variables in Helm subcharts during deployment?

Harness does not automatically render Harness expressions in the values.yaml files of subcharts. Only the main chart’s values.yaml is processed for Harness variables.

To override values in a subchart, users should define the necessary keys in the main chart's values.yaml or explicitly provide overrides in the Harness service YAML. This ensures subchart values are populated correctly during rendering.

For Helm charts using dependencies (not deployed through subChartPath), follow best practices outlined in Helm documentation:
[Helm Chart Template Guide: Subcharts and Globals](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/)

If using native Helm with [Harness](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#using-subcharts), confirm that the correct files are being fetched and overridden via the Fetch Files step or service definition.
