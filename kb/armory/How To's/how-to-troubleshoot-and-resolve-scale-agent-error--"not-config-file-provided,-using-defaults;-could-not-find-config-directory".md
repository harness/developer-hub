---
title: How to troubleshoot and resolve Scale Agent error- "Not config file provided, using defaults; could not find config directory"
---

## Issue
Armory agent could fail loading configuration files, even though configuration files do exist.
The agent logs may reveal errors like the one below:
````
time="2023-08-28T01:03:06Z" level=warning msg="Not config file provided, using defaults; could not find config directory" agentId=spin-armory-agent-xxxxxxxxxx-xxxxx
time="2023-08-28T01:03:06Z" level=info msg="The following settings have been loaded: {"clouddriver":{"auth":null,"grpc":"spin-clouddriver-grpc: 9091","keepAliveHeartbeatSeconds":20,"keepAliveOperationSeconds":0,"keepAliveTimeOutSeconds":0,"insecure":true,"tls":{"insecureSkipVerify":false},"noProxy":false,"retries":{"retryAnyError":true,"retryableErrors":null,"backOffMs":3000,"enabled":true,"maxRetries":3},"cacheRetryIntervalSeconds":0,"dynamicAccountsEnabled":true,"backoff":{"BaseDelay":1000000000,"Multiplier":1.6,"Jitter":0.2,"MaxDelay":120000000000}},"hub":{"connection":{"auth":null,"grpc":"agents.cloud.armory.io: 443","keepAliveOperationSeconds":0,"keepAliveTimeOutSeconds":0,"insecure":null,"tls":null,"noProxy":false,"retries":{"retryAnyError":true,"retryableErrors":null,"backOffMs":3000,"enabled":true,"maxRetries":3},"cacheRetryIntervalSeconds":0,"dynamicAccountsEnabled":null,"backoff":{"BaseDelay":0,"Multiplier":0,"Jitter":0,"MaxDelay":0}},"auth":{"armory":{"tokenIssuerUrl":"https://auth.cloud.armory.io/oauth/token","audience":"https://api.cloud.armory.io","verify":true},"refreshIntervalSeconds":0,"expirationLeewaySeconds":30}},"kubernetes":{"accounts":null,"reconnectTimeoutMs":5000,"noProxy":false,"retries":{"retryAnyError":false,"retryableErrors":["timeout","deadline exceeded"],"backOffMs":3000,"enabled":true,"maxRetries":3},"dynamicAccountsOnly":false,"serverSideApply":{"enabled":"allowed","manifestDefaults":"allowed","clearManagedFields":"allowed","kinds":null}},"local":{"enabled":false,"aggregate":false,"port":0},"logging":{"format":"","level":"INFO","remote":{"enabled":false,"endpoint":"","customerId":"","version":""},"multiWrite":false,"maxSizeMb":1,"maxAgeDays":10,"maxBackups":10,"localTime":true,"compress":false,"fields":{}},"pprof":{"enabled":false,"port":6060},"prometheus":{"enabled":false,"port":8008},"secrets":{"vault":{"enabled":false,"url":"","authMethod":"","role":"","path":"","username":"","password":"","userAuthPath":"","namespace":"","Token":""}},"server":{"Host":"","Port":8082,"Ssl":{"Enabled":false,"CertFile":"","KeyFile":"","KeyPassword":"","CAcertFile":"","ClientAuth":""}},"tasks":{"totalBudget":1000,"budgetPerAccount":50,"queueCheckFrequencyMs":2000},"zoneId":"","balanceConnection":false,"clouddriverNamespace":"","domainName":""}" agentId=spin-armory-agent-xxxxxxxxxx-xxxxx
time="2023-08-28T01:03:06Z" level=info msg="Checking ENV for LOG_LEVEL...  Using default "INFO"" agentId=spin-armory-agent-xxxxxxxxxx-xxxxx
time="2023-08-28T01:03:06Z" level=info msg="log level set to: INFO" agentId=spin-armory-agent-xxxxxxxxxx-xxxxx
````

Close attention should be paid to the first message: ```"Not config file provided, using defaults; could not find config directory"```, which indicates that the agent always loads the default settings.
Other signs that you are running into this issue could be a SIGSEGV error similar to the one below:
````
time="2023-07-11T16:09:29Z" level=error msg="Notifying account discovery error for example-account-1: error getting server version for account 'example-account-1': Get \"https://EXAMPLEEKSACCTID.gr7.us-west-2.eks.amazonaws.com/version\": dial tcp: lookup EXAMPLEEKSACCTID.gr7.us-west-2.eks.amazonaws.com on 172.0.0.11:53: no such host" account=example-account-1 agentId=spin-armory-agent-xxxxxxxxxx-xxxxx error="error getting server version for account 'example-account-1': Get \"https://EXAMPLEEKSACCTID.gr7.us-west-2.eks.amazonaws.com/version\": dial tcp: lookup EXAMPLEEKSACCTID.gr7.us-west-2.eks.amazonaws.com on 172.0.0.11:53: no such host"
time="2023-07-11T16:09:29Z" level=info msg="Account discovery result received: account=example-account-1, namespaces=0, kinds =0, errors=error getting server version for account 'example-account-1': Get \"https://EXAMPLEEKSACCTID.gr7.us-west-2.eks.amazonaws.com/version\": dial tcp: lookup EXAMPLEEKSACCTID.gr7.us-west-2.eks.amazonaws.com on 172.0.0.11:53: no such host" account=example-account-1 agentId=spin-armory-agent-xxxxxxxxxx-xxxxx
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x17f76b0]

goroutine 2106 [running]:
k8s.io/client-go/discovery.convertAPIResource(...)
	/workspace/vendor/k8s.io/client-go/discovery/aggregated_discovery.go:88
k8s.io/client-go/discovery.convertAPIGroup({{{0x0, 0x0}, {0x0, 0x0}}, {{0xc0017e1800, 0x15}, {0x0, 0x0}, {0x0, 0x0}, ...}, ...})
	/workspace/vendor/k8s.io/client-go/discovery/aggregated_discovery.go:69 +0x5f0
k8s.io/client-go/discovery.SplitGroupsAndResources({{{0xc0017e0198, 0x15}, {0xc0024aa080, 0x1b}}, {{0x0, 0x0}, {0x0, 0x0}, {0x0, 0x0}, ...}, ...})
	/workspace/vendor/k8s.io/client-go/discovery/aggregated_discovery.go:35 +0x2f8
k8s.io/client-go/discovery.(*DiscoveryClient).downloadAPIs(0xb?)
	/workspace/vendor/k8s.io/client-go/discovery/discovery_client.go:310 +0x47c
k8s.io/client-go/discovery.(*DiscoveryClient).GroupsAndMaybeResources(0x7f4af79a7fff?)
	/workspace/vendor/k8s.io/client-go/discovery/discovery_client.go:198 +0x5c
k8s.io/client-go/discovery.ServerGroupsAndResources({0x289a790, 0xc0012dda70})
	/workspace/vendor/k8s.io/client-go/discovery/discovery_client.go:392 +0x59
k8s.io/client-go/discovery.(*DiscoveryClient).ServerGroupsAndResources.func1()
	/workspace/vendor/k8s.io/client-go/discovery/discovery_client.go:356 +0x25
k8s.io/client-go/discovery.withRetries(0x2, 0xc001455138)
	/workspace/vendor/k8s.io/client-go/discovery/discovery_client.go:621 +0x72
k8s.io/client-go/discovery.(*DiscoveryClient).ServerGroupsAndResources(0x9b?)
	/workspace/vendor/k8s.io/client-go/discovery/discovery_client.go:355 +0x3a
armory/kubesvc/pkg/adapters/kube_server.(*KubeAdapter).GetServerResources(0xc0005f5b80)
	/workspace/pkg/adapters/kube_server/commander_discovery.go:74 +0x5f
armory/kubesvc/pkg/logic.(*defaultDiscoveryService).discoverKinds(_, {{{0xc000810570, 0x16}, 0x0, {0xc000aae600, 0xe}, {0x0, 0x0, 0x0}, {0x0, ...}, ...}, ...}, ...)
	/workspace/pkg/logic/discovery.go:94 +0x52
armory/kubesvc/pkg/logic.(*defaultDiscoveryService).DiscoverAccount.func1({{{0xc000810570, 0x16}, 0x0, {0xc000aae600, 0xe}, {0x0, 0x0, 0x0}, {0x0, 0x0, ...}, ...}, ...})
	/workspace/pkg/logic/discovery.go:72 +0x298
created by armory/kubesvc/pkg/logic.(*defaultDiscoveryService).DiscoverAccount
	/workspace/pkg/logic/discovery.go:53 +0x105
````

## Cause
This issue is caused by adding/configuring a wrongfully configured Kubernetes account (possibly without a kubeconfig file).This causes the agent not to load the configuration properly and/or ignore the Kubernetes account and continue with the operations.
The account name can be revealed in the Go routine stack trace: ```example-account-1```.

