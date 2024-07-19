---
title: Split SDK key
description: Authentication key used to evaluate flags in your source code
sidebar_label: ★★ SDK key
sidebar_position: 2
---
import Link from '@docusaurus/Link'

The Split SDK key is the authentication key required in your source code to download the <Link to="./advanced-concepts/split-payload">Split FME payload</Link>, evaluate feature flags, and send events to Split Cloud.

Split FME differentiates between server-side SDK keys and client-side SDK keys. The server-side SDK keys are more privileged so they are used with server-side SDKs (that run on servers in a secure environment). The client-side SDK keys are required on web and mobile clients.

:::info Different from user key
SDK keys are not related to (and not to be confused with) <Link to="./user-key">user keys</Link>.
:::