---
title: Use Resilience Probe
sidebar_position: 2
description: Steps to define and use a HTTP probe in the UI
---

This topic describes the steps you can follow to create and use a resilience probe in your chaos experiment.

Resilience probes (or probes) are pluggable health checkers defined within the chaos engine for any chaos experiment. They are declarative checks that determine the outcome of a fault. Probes are scoped to the faults, and you can define as many probes as required as part of each fault.
To know more, go to [Resilience Probes](/docs/chaos-engineering/concepts/explore-concepts/resilience-probes/).

To get hands-on experience, [create a probe](/docs/chaos-engineering/use-harness-ce/probes/use-probe), [use a probe in different modes](/docs/chaos-engineering/use-harness-ce/probes/cmd-probe-usage), and [use command probe with NewRelic](/docs/chaos-engineering/use-harness-ce/probes/cmd-probe-newrelic)