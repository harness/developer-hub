---
title: Changing Timeouts for Spinnaker Services Using okHTTP (Java Services)
---

## Issue
Java language Spinnaker Services using the ```okHTTP``` library may need to adjust timeouts using the following code.  This may be used, as an example, for the case where connections are unreliable.  By default, most of the services are set to 60000 ms (1 minute)The following explains how to change the Connect Timeout, Read Timeout, and Write Timeout, but there are additional okHTTP calls that can be set via your ```%service-local.yml``` files.Some services that use the okHTTP library include:
CloudDriverOrcaRoscoGateEchoFront50IgorFiat

## Cause
N/A

