---
title: Windows Build
description: This topic contains information on how build and run the Proxy on windows machines
sidebar_position: 130
---


To run the Relay Proxy on Windows: 

1. Build the proxy as an exe for your desired architecture, using the Go compiler from the root directory.

	`GOOS=windows GOARCH=386 go build -o ff-proxy ./cmd/ff-proxy/main.go`

	Harness recommends doing these builds against a verified release tag so behaviour is the same as our published docker images of the same versions. These can be found on the proxy [releases page](https://github.com/harness/ff-proxy/releases) in GitHub.

1. Run the exe by passing flags to it, or use environment variables:  

	`call ff-proxy.exe --admin-service-token=${TOKEN} --auth-secret=${SECRET} --account-identifier=${ACCOUNT_IDENTIFIER} --org-identifier=${ORG_IDENTIFIER} --api-keys=${API_KEYS}`

	See [Configuration reference](/docs/feature-flags/relay-proxy/configuration) for more configuration options.

:::info note
**Streaming mode** for connected SDKs is not currently supported for direct Windows or Linux builds. 

If connected SDKs run with streaming enabled, they receive a 501 "not implemented" status code when connecting to the relay proxy, and then continue to function as normal in polling mode.
:::