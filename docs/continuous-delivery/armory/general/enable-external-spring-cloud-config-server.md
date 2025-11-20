---
title: Enable external Spring Cloud Config Server
---

## Issue
Ever since Spinnaker version 1.15 there has been an ability for dynamic account configuration through an embedded spring cloud config server in each of the Spinnaker microservices.
However, there are some drawbacks:
What if you want to use an existing spring cloud config server?
* Since each microservice has it's own spring cloud config server embedded and the embedded config server automatically disables the spring cloud **client** functionality this can be very difficult to setup
What if you want to use a supported backend to spring cloud config server like credhub or JDBC?
* The embedded spring cloud config server is only a subset of the spring cloud config server functionality and can only use the git and/or vault backend



## Cause
N/A

