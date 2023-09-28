---
title: Fault container permissions
sidebar_position: 10
---

This topic lists the various categories of Kubernetes faults and the container permissions required to execute them.


### Supported Kubernetes faults and required container permissions

The following table shows the supported Kubernetes faults and the required fault container permissions to execute them.

| Chaos category | Faults | Requires root user on fault container | Requires privileged fault containers |
| -  | - | - | - |
| State | Pod Delete | ❌ | ❌ |
| State | Container Kill | ✅ | ❌ |
| State | Node Drain | ❌ | ❌ |
| State | Node Taint | ❌ | ❌ |
| State | Node Restart | ✅ | ❌ |
| Resource | Pod CPU Hog | ✅ | ✅ |
| Resource | Pod Memory Hog | ✅ | ✅ |
| Resource | Pod IO Stress | ✅ | ✅ |
| Resource | Pod Disk Fill | ✅ | ❌ |
| Resource | Pod CPU Exec | ❌ | ❌ |
| Resource | Pod Memory Exec | ❌ | ❌ |
| Resource | Node CPU Hog | ❌ | ❌ |
| Resource | Node Memory Hog | ❌ | ❌ |
| Resource | Node IO Stress | ❌ | ❌ |
| Network | Pod Network Latency | ✅ | ✅ |
| Network | Pod Network Loss | ✅ | ✅ |
| Network | Pod Network Corruption | ✅ | ✅ |
| Network | Pod Network Duplication | ✅ | ✅ |
| Network | Pod Network Partition | ❌ | ❌ |
| Network | Node Network Latency | ✅ | ✅ |
| Network | Node Network Loss | ✅ | ✅ |
| HTTP/API | Pod HTTP/API Latency | ✅ | ✅ |
| HTTP/API | Pod HTTP/API Status Code Modify | ✅ | ✅ |
| HTTP/API | Pod HTTP/API Header Modify | ✅ | ✅ |
| HTTP/API | Pod HTTP/API Body Modify | ✅ | ✅ |
| HTTP/API | Pod HTTP Reset Peer Connection | ✅ | ✅ |
| DNS | Pod DNS Errors | ✅ | ✅ |
| DNS | Pod DNS Spoofing | ✅ | ✅ |
| I/O | Pod IO Latency | ✅ | ✅ |
| I/O | Pod IO Errors | ✅ | ✅ |
| Scale | Pod Scale | ❌ | ❌ |
| Scale | Kubelet Density/Stress | ❌ | ❌ |
| Load | Service Load | ❌ | ❌ |
| Time | Pod Time Chaos | ✅ | ✅ |
| Process/Service | Kubelet Service Kill | ✅ | ❌ |
| Process/Service | Docker/Containerd Service Kill | ✅ | ❌ |
