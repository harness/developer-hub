---
title: Rate limits
description: Learn about rate limits that help maximize the stability of the Harness API.
sidebar_position: 4
---

The Harness API uses several mechanisms, including rate limits, to safeguard against bursts of incoming traffic and help maximize stability.

A rate limiter restricts the number of requests received by the API within any given minute, after which Harness throttles requests from the IP address.

Harness has several rate limiters in the API. Users who send multiple requests in quick succession may receive status code 429 error responses.

:::info note
API throttling is a type of rate limiting used to control the amount of traffic that an API can handle. It is a way of limiting the number of requests the API accepts in a given period.
:::

Harness API rate limits include:

- Any call: Harness allows 5000 requests every 10 seconds (30,000 requests per minute) per IP address.
- API calls: Harness allows 1000 requests per API key per minute.
- GraphQL APIs: Harness allows up to 1000 requests per minute per IP address.
- Large requests (character size > 500,000): 1 payload every 10 seconds.
- Reset password: 5 calls per minute per IP address.
- User invites: 10 calls per minute per IP address.

:::info important
Harness reserves the rights to change this limit at any time to protect the platform.
:::
