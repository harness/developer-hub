---
title: Baseline treatment
description: The feature flag treatment (variation) that the performance of other flag treatments is measured against
sidebar_label: ★★ Baseline treatment
sidebar_position: 15
helpdocs_topic_id: 1j7pdkqh7j
helpdocs_category_id: gjyyhm9f9h
helpdocs_is_private: false
helpdocs_is_published: true
---
import Link from '@docusaurus/Link'

You can set the baseline treatment in a feature flag definition. Each <Link to="./../metrics">metric</Link> runs calculations on events that are associated with each feature flag treatment. If a baseline treatment is calculated, then <Link to="./../metric-impact">metric impact</Link> can be detected and <Link to="./../alerts">alerts</Link> can be triggered.