---
title: Graceful delegate shutdown
description: Read about the delegate process of graceful shutdown.
# sidebar_position: 2
---

Harness Delegate is implemented to shut down gracefully. The process of graceful shutdown is applied as follows:

- The delegate receives an instruction to quit.
- A grace period begins during which the delegate:
  + Stops accepting new tasks.
  + Works to complete running tasks.
- The grace period ends.
- Delegates that have not quit are force-terminated.
- Incomplete tasks are discarded.

The length of the grace period is configurable. 

| **Delegate type** | **Grace period** | **Default interval** |
| :-- | :--: | :--: |
| Immutable | Yes | 10 minutes |
| Legacy | No | 30 seconds |

The event that initiates the graceful shutdown depends on delegate type.

| **Delegate environment** | **Trigger** |
| Kubernetes | Pod termination, eviction, or user-initiated scaling |
| Docker | `docker kill` command |
| Shell | `./stop.sh` instruction |
