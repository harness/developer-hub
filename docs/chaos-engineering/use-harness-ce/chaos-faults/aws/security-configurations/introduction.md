---
title: Introduction
sidebar_position: 1
description: Introduction to security configuration
---
This section describes how different users are managed to perform AWS API calls.

To execute various [AWS chaos experiments](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws), you need different settings and credentials to control the environment, blast radius, user profiles, policies, and so on. In some of the chaos experiments, you can use the default setting without changing any values, but you may have to edit make changes in certain experiments to achieve desired results. You may also have to configure group permissions, that serve as minimum custom permission to execute chaos experiments.

For example, if you wish to execute all AWS faults, you can use the [superset policy](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/policy-for-all-aws-faults.md) instead of changing the JSON permissions policy documents to control every user or resource or condition.

## Next steps

* [AWS named profile](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/aws-switch-profile)
* [AWS superset policy to execute all faults](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/policy-for-all-aws-faults)