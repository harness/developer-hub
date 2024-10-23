---
title: HTTP/HTTPS Redirects with Authentication
---


Troubleshooting HTTP/HTTPS Redirects
When setting up TLS encryption for Deck and Gate (the UI and API) for Spinnaker, if you have a load balancer (service, ingress, etc.) in front of your Deck/Gate that are terminating TLS and forwarding communications insecure to the Spinnaker microservices, sometimes the authentication process will redirect to the incorrect path.
For example, if you have LDAP set up and the following flow:
* Client Browser ```--HTTPS-->``` AWS ELB ```--HTTP-->``` Deck/Gate
Then you’ll likely get two invalid redirects - one to your gate address on HTTP and one on your deck address on HTTP. This is regardless of your ```override-base-url``` settings.
One option to try is to add/create ```.hal//profiles/gate-local.yml```:
```
server:
  tomcat:
    protocolHeader: X-Forwarded-Proto
    remoteIpHeader: X-Forwarded-For
    internalProxies: .*
    httpsServerPort: X-Forwarded-Port
```
(Then run ```hal deploy apply```, and clear / update your cache).
Alternately, you can do the following:
There are a number of ongoing projects to improve this behavior (for example, when working with OAuth2.0, you can specify a ```preEstablishedRedirectUri``` via the ```--pre-established-redirect-uri``` flag).
In the interim, you can work around this issue by putting a self-signed certificate on Deck and Gate. This requires two steps:
* Create self-signed certificates for Deck (in ```pem``` format) and Gate (in ```jks``` format), and configure them to use them. You can follow the official documentation for this [here](https://www.spinnaker.io/setup/security/authentication/ssl/).Configure your load balancer to communicate with your backend with HTTPS rather than HTTP. The method of achieving this will depend on your load balancer configuration.For example, with an ALB ingress controller, you’ll want these additional annotations in your ingress configuration:
```
metadata:
    annotations:
      alb.ingress.kubernetes.io/backend-protocol: "HTTPS"
      alb.ingress.kubernetes.io/healthcheck-protocol: "HTTPS"​
```

