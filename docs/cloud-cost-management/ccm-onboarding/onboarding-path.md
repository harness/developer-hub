---
title: CCM onboarding path
description: Ramp up on Harness CCM
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes the different phases and steps involved in onboarding with Harness CCM. Follow these steps to ensure that you have all the settings and resources required for moving forward with your CCM setup.

## Overview

This section lists the major onboarding phases and provides links to more details.

:::note

Steps with an asterisk **"\*"** have YAML examples that can be used for setting up the step.

:::

### <a href="#phase-1-initial-setup"> Phase 1: Initial setup</a>

First step in setting up Harness CCM is to create the cloud connector for respective cloud providers. A cloud connector is the configuration details which Harness uses to access the cloud provider APIs. Connector setup varies based on the cloud provider.

- [Connector creation for AWS](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws)
- [Connector creation for Azure](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure)
- [Connector creation for GCP](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp)
- [Connector creation for Kubernetes](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes)


### <a href="#phase-2-deploy-to-qa"> Phase 2: Cost reporting </a>

#### 