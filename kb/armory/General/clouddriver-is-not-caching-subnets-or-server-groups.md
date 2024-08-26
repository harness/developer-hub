---
title: Clouddriver is not caching subnets or server groups
---

## Issue
When a user tries to create a deploy stage in a cluster that deploys to ECS, the deployment is not successful. An error is seen indicating that subnets/security groups/ IAM instance profiles for ECS cannot be found. The following is seen in the Clouddriver logs:

CD LOGS -
Pod spin-clouddriver-...............:
```
2021-08-24 21:49:25.068  INFO 1 — [           main] n.s.c.e.s.EcsCredentialsLifeCycleHandler : ECS account, production...., was added. Scheduling caching agents
2021-08-24 21:50:06.605  INFO 1 — [cutionAction-10] c.n.s.c.e.p.a.ApplicationCachingAgent    : Evicting 1 ecsapplications in ........../ApplicationCachingAgent
2021-08-24 21:50:11.614  INFO 1 — [ecutionAction-8] c.n.s.c.e.p.a.TaskHealthCachingAgent     : Caching 2 task health checks in ...../TaskHealthCachingAgent
2021-08-24 21:50:11.700  INFO 1 — [cutionAction-10] c.n.s.c.e.p.a.EcsClusterCachingAgent     : Caching 3 ECS clusters in .......1/EcsClusterCachingAgent
2021-08-24 21:50:11.706  INFO 1 — [cutionAction-10] c.n.s.c.e.p.a.EcsClusterCachingAgent     : Evicting 1 ecsclusters in ......./EcsClusterCachingAgent
2021-08-24 21:50:11.837  INFO 1 — [ecutionAction-8] c.n.s.c.e.p.a.TaskHealthCachingAgent     : Evicting 2 healths in ......./TaskHealthCachingAgent
2021-08-24 21:50:26.901  INFO 1 — [ecutionAction-9] c.n.s.c.e.p.a.TaskDefinitionCachingAgent : Caching 2 task definitions in ......./TaskDefinitionCachingAgent
2021-08-24 21:50:26.932  INFO 1 — [ecutionAction-9] c.n.s.c.e.p.a.TaskDefinitionCachingAgent : Evicting 1 taskdefinitions in .........../TaskDefinitionCachingAgent
The following is seen in the SQL Agent Logs:
SQL CLEANUP AGENT LOGS
2021-08-24 22:05:56.733  INFO 1 — [cutionAction-48] c.n.s.c.s.c.SqlUnknownAgentCleanupAgent  : Scanning 'AmazonInstanceTypeCachingAgent/...... (22/38) cache records to cleanup
2021-08-24 22:05:56.744  INFO 1 — [cutionAction-48] c.n.s.c.s.c.SqlUnknownAgentCleanupAgent  : Scanning 'subnets' (......) cache records to cleanup
2021-08-24 22:05:56.755  INFO 1 — [cutionAction-48] c.n.s.c.s.c.SqlUnknownAgentCleanupAgent  : Scanning 'securityGroups' (24/38) cache records to cleanup
2021-08-24 22:05:56.768  INFO 1 — [cutionAction-48] c.n.s.c.s.c.SqlUnknownAgentCleanupAgent  : Scanning 'vpcs' (.....) cache records to cleanup
```

## Cause
This issue is due to Spinnaker not caching ECS subnets and server groups in the cluster. There were naming issues within Clouddriver and Deck pertaining to servergroups and subnets:[https://github.com/spinnaker/deck/pull/9524](https://github.com/spinnaker/deck/pull/9524)[https://github.com/spinnaker/deck/pull/9032](https://github.com/spinnaker/deck/pull/9032)


