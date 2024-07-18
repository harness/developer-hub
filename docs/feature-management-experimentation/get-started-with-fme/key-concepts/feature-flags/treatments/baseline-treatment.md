---
title: Baseline treatment
description: The feature flag treatment (variation) that the performance of other flag treatments is measured against
sidebar_label: ★★ Baseline treatment
---
import Link from '@docusaurus/Link'

You can set the baseline treatment (feature flag variation) in a feature flag definition. Each <Link to="../../metrics">metric</Link> runs calculations on events that are associated with each feature flag treatment. If a baseline treatment is calculated, then <Link to="../../metric-impact">metric impact</Link> can be detected and <Link to="../../alerts">alerts</Link> can be triggered.