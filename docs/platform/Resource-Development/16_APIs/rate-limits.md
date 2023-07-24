---
title: Rate limits
description: Learn about rate limits that help maximize the stability of the Harness API.
sidebar_position: 4
---

The Harness API uses several mechanisms, including rate limits, to safeguard against bursts of incoming traffic and help maximize stability. A rate limiter restricts the number of requests received by the API within any given minute, after which Harness throttles requests from the IP address.

:::info note
API throttling is a type of rate limiting used to control the amount of traffic that an API can handle. It is a way of limiting the number of requests the API accepts in a given period.
:::

Harness has several rate limiters in the API. Users who send multiple requests in quick succession may receive status code 429 error responses.

Harness API rate limits include:

- API calls: Harness allows 1000 requests per API key per minute.
- GraphQL APIs: Harness allows up to 1000 requests per minute per IP address.

:::info important
Harness reserves the rights to change limits at any time to protect the platform.
:::
