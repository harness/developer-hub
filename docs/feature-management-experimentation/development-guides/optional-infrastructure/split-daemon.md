---
title: Split Daemon (splitd)
sidebar_label: ☆ Split Daemon (splitd)
description: For languages like PHP, provides a shared local snapshot of your Split definitions
---
Splitd is a daemon that communicates with the Split backend. It keeps an up-to-date snapshot of the Split rollout plan for a specific Split environment. The rollout plan is accessed by a Split Thin SDK instance (via splitd) to consume feature flags in your code.

Splitd can be used if you are working in a language that does not have native capability to keep a shared local cache, such as PHP.