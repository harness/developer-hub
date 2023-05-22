---
title: Sample cURL Requests
description: This topic contains some example curl requests that can be useful for debugging
sidebar_position: 110
---

# Sample cURL Requests

These can be useful to debug info coming from SaaS or from the Relay Proxy.

## Startup Requests
These requests are made by the Relay Proxy to Harness SaaS on startup. They are also made by connected sdks to the Relay Proxy when they startup. As such they can be used to help diagnose connection issues either outbound from the Relay Proxy or inbound to it.

On startup SDKS make 4 requests, the Relay Proxy makes these 4 requests for each environment you have configured it to connect to:
- /auth
- /feature-configs
- /target-segments
- /stream

We will show these examples making requests to Harness SaaS. If connecting to the proxy replace https://config.ff.harness.io/api/1.0 with your Relay Proxy's address. An example will be shown for the /auth request.

### Auth request
Fetches an authentication token that can be used for future requests:

`curl -v 'https://config.ff.harness.io/api/1.0/client/auth'  -H 'content-type: application/json'  --data-raw '{"apiKey":"${API_KEY}"}'`

If sending this request to a Relay Proxy instance running on localhost:7000 this would be:

`curl -v 'http://localhost:7000/client/auth'  -H 'content-type: application/json'  --data-raw '{"apiKey":"${API_KEY}"}'`

This should return a 200 code and a body that includes an auth token that we’ll use for future requests e.g.

`{"authToken":"eyJhbGciOiJIUzI1NiI11nR5cCI6IkpXVCJ9.eyJlbnZ2Mm9ubWVudCI6IjgzMDAxOWM2LTIzYTUtNDhkNC1hYjhjLTQ4ZmE3NjdmMWRlYiIsImVudmlyb25tZW50SWRlbnRpZmllciI62mRldiIsInByb2plY3QiOiIwZmQzZTdlNS04ZWYzLTRhYzQtYmMyOS03ZTBiODI2ODIxMmQiLCJwcm9qZWN0SQRlbnRpZmllciI6InRlc3Rwcm9qIiwiYWNjb3VudElEIjoiTWRpTmJzN3BRNld0SDNqYVRBVzRjQSIsIm9yZ2FuaXphdHlvbiI6IjE2YzI1MjhhLWNkOWMtNDVlZi05NTZjLTZhOGRkYzkwMjZlMiIsIm9yZ2FuaXphdGlvbklkZW50aWZpZXIiOiJkZWZhdWx0IiwiY2x1c3RlcklkZW50aWZpZXIiOiIyIiwia2V5X3R5cGUiOiJTZXV2ZXIifQ.X3Xo7ztCNFOwLWjweDp6kzlGQ7vr6A3D9Jyc5uqK9NA"}`

### Feature configs request
This will check that feature configs can be retrieved successfully.

`curl -v 'https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/feature-configs?cluster=${CLUSTER}'  -H 'Authorization: Bearer ${AUTH_TOKEN}'`

${AUTH_TOKEN} - replace with the token from the auth request above

${ENV_ID} - replace with the environment id - this can be found by decoding the auth token at JWT.IO  and grabbing the environment value it shows from the token claims.

${CLUSTER} - same as ENV_ID this can be found by checking the `clusterIdentifier` field in the decoded token claims.

### Target segments request
This will check that target segments can be retrieved successfully.

`curl -v 'https://config.ff.harness.io/api/1.0/client/env/${ENV_ID}/target-segments?cluster=${CLUSTER}'  -H 'Authorization: Bearer ${AUTH_TOKEN}'`

See ^ for setting the AUTH_TOKEN, ENV_ID and CLUSTER fields.

### Stream request
Here we want to see if stream events are making their way to your network. If this is not the case then the issue lies within your network infrastructure not allowing our sse events to come through. To demonstrate this you can run the following curl both inside and outside your network.

Firstly kick off this long lived request in a terminal (after it dumps the initial request info it should just hang and remain open printing nothing for now):

`curl -v -N 'https://config.ff.harness.io/api/1.0/stream?cluster=${CLUSTER}' -H 'API-Key: ${API_KEY}'  -H 'Authorization: Bearer ${AUTH_TOKEN}'`

See ^ for setting the AUTH_TOKEN, ENV_ID and CLUSTER fields.

Then on the UI toggle a flag and you should see output like this in the terminal:

`event: *
data: {"event":"patch","domain":"flag","identifier":"flag","version":7}`
