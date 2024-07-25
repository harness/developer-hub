---
title: Sample cURL Requests
description: This topic contains some example curl requests that can be useful for debugging
sidebar_position: 110
redirect_from:
  - /docs/feature-flags/relay-proxy/sample_curl_requests
---

These requests can be useful to debug information coming from Harness SaaS or from the Relay Proxy.

## Startup Requests

These requests are made by the Relay Proxy to Harness SaaS on startup. They are also made by connected SDKs to the Relay Proxy when they startup. As such, they can be used to help diagnose connection issues either outbound from the Relay Proxy or inbound to it.

On startup SDKs makes these four requests, and the Relay Proxy makes these four requests for each environment you have configured it to connect to:
- /auth
- /feature-configs
- /target-segments
- /stream

If connecting to the proxy, replace `https://config.ff.harness.io/api/1.0` with your Relay Proxy's address. An example is shown in the Auth request below.

### Auth request

This fetches an authentication token that can be used for future requests:

`curl -v 'https://config.ff.harness.io/api/1.0/client/auth'  -H 'content-type: application/json'  --data-raw '{"apiKey":"${API_KEY}"}'`

If sending this request to a Relay Proxy instance running on localhost:7000 this would be:

`curl -v 'http://localhost:7000/client/auth'  -H 'content-type: application/json'  --data-raw '{"apiKey":"${API_KEY}"}'`

This should return a 200 code and a body that includes an auth token that we’ll use for future requests. For example:

`{"authToken":"eyJhbGciOiJIUzI1NiI11nR5cCI6IkpXVCJ9.eyJlbnZ2Mm9ubWVudCI6IjgzMDAxOWM2LTIzYTUtNDhkNC1hYjhjLTQ4ZmE3NjdmMWRlYiIsImVudmlyb25tZW50SWRlbnRpZmllciI62mRldiIsInByb2plY3QiOiIwZmQzZTdlNS04ZWYzLTRhYzQtYmMyOS03ZTBiODI2ODIxMmQiLCJwcm9qZWN0SQRlbnRpZmllciI6InRlc3Rwcm9qIiwiYWNjb3VudElEIjoiTWRpTmJzN3BRNld0SDNqYVRBVzRjQSIsIm9yZ2FuaXphdHlvbiI6IjE2YzI1MjhhLWNkOWMtNDVlZi05NTZjLTZhOGRkYzkwMjZlMiIsIm9yZ2FuaXphdGlvbklkZW50aWZpZXIiOiJkZWZhdWx0IiwiY2x1c3RlcklkZW50aWZpZXIiOiIyIiwia2V5X3R5cGUiOiJTZXV2ZXIifQ.X3Xo7ztCNFOwLWjweDp6kzlGQ7vr6A3D9Jyc5uqK9NA"}`

### Feature configs request

This checks that feature configs can be retrieved successfully.

`curl -v 'https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/feature-configs?cluster=${CLUSTER}'  -H 'Authorization: Bearer ${AUTH_TOKEN}'`

Where:

$\{AUTH_TOKEN} is the token from the auth request above.

$\{ENV_ID} is the environment ID. This can be found by decoding the auth token at JWT.IO and grabbing the environment value it shows from the token claims.

$\{CLUSTER} is the same as ENV_ID. This can be found by checking the `clusterIdentifier` field in the decoded token claims.

### Target segments request

This checks that target segments can be retrieved successfully.

`curl -v 'https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/target-segments?cluster=${CLUSTER}'  -H 'Authorization: Bearer ${AUTH_TOKEN}'`

Where:

$\{AUTH_TOKEN} is the token from the auth request above.

$\{ENV_ID} is the environment ID. This can be found by decoding the auth token at JWT.IO and grabbing the environment value it shows from the token claims.

$\{CLUSTER} is the same as ENV_ID. This can be found by checking the `clusterIdentifier` field in the decoded token claims.

### Stream request

This procedure checks if stream events are making their way to your network. If this is not the case then the issue lies within your network infrastructure, not allowing our SSE events to come through. 

To demonstrate this, run the following curl commands both inside and outside your network.

1. Kick off this long-lived request in a terminal. After it dumps the initial request information, it should just hang and remain open printing nothing for now:

	`curl -v -N 'https://config.ff.harness.io/api/1.0/stream?cluster=${CLUSTER}' -H 'API-Key: ${API_KEY}'  -H 'Authorization: Bearer ${AUTH_TOKEN}'`

	Where:

	$\{AUTH_TOKEN} is the token from the auth request above.

	$\{ENV_ID} is the environment ID. This can be found by decoding the auth token at JWT.IO and grabbing the environment value it shows from the token claims.

	$\{CLUSTER} is the same as ENV_ID. This can be found by checking the `clusterIdentifier` field in the decoded token claims.

1. In the Harness UI, toggle a flag.  

	You should see output like this in the terminal:

	`event: *
	data: {"event":"patch","domain":"flag","identifier":"flag","version":7}`
