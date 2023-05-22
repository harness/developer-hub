---
title: Windows Build
description: This topic contains information on how build and run the Proxy on windows machines
sidebar_position: 130
---

# Windows Build

To run the Relay Proxy on Windows you must first build it as an exe for your desired architecture using the Go compiler from the root directory.

`GOOS=windows GOARCH=386 go build -o ff-proxy ./cmd/ff-proxy/main.go`

We recommend performing these builds against a verified release tag so behaviour is the same as our published docker images of the same versions. These can be found on our [releases page](https://github.com/harness/ff-proxy/releases).

This can then be run by passing flags to the proxy exe like so or with environment variables: 

`call ff-proxy.exe --admin-service-token=${TOKEN} --auth-secret=${SECRET} --account-identifier=${ACCOUNT_IDENTIFIER} --org-identifier=${ORG_IDENTIFIER} --api-keys=${API_KEYS}`

See [configuration](./configuration.md) for more configuration options.

### Streaming
Streaming mode for connected sdks is not currently supported for direct Windows or Linux builds. 

If connected sdks are run with streaming enabled they will receive a 501 not implemented status code when connecting to the relay proxy then continue to function as normal in polling mode.

We do however recommend that sdks are run with streaming disabled to avoid error logs both within the relay proxy and the sdks themselves, though neither will have any adverse behaviour due to these.
