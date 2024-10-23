---
title: MySQL communication failure when using TLS1.1
---

## Issue
An organization may run into failures when components attempt communication with a MySQL database service via TLS1.1 on newer versions of Spinnaker.This connectivity issue may manifest in different ways, since a TLS-related error message may not always explicitly be shown. As a result, Spinnaker services of varying degree may end up failing as they are upgraded to a newer Java version.
This is an issue that [originates due to changes in JVM](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-using-ssl.html) and deprecations that have been announced, and it is not strictly speaking, an Armory/Spinnaker Issue.
Sample error:
spin-orca-56cbc4f4d-zg6tk orca Caused by: javax.net.ssl.SSLHandshakeException: No appropriate protocol (protocol is disabled or cipher suites are inappropriate)
spin-orca-56cbc4f4d-zg6tk orca 	at java.base/sun.security.ssl.HandshakeContext.(HandshakeContext.java:170)
spin-orca-56cbc4f4d-zg6tk orca 	at java.base/sun.security.ssl.ClientHandshakeContext.(ClientHandshakeContext.java:103)
spin-orca-56cbc4f4d-zg6tk orca 	at java.base/sun.security.ssl.TransportContext.kickstart(TransportContext.java:222)
spin-orca-56cbc4f4d-zg6tk orca 	at java.base/sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:449)
spin-orca-56cbc4f4d-zg6tk orca 	at com.mysql.cj.protocol.ExportControlled.performTlsHandshake(ExportControlled.java:336)
spin-orca-56cbc4f4d-zg6tk orca 	at com.mysql.cj.protocol.StandardSocketFactory.performTlsHandshake(StandardSocketFactory.java:188)
spin-orca-56cbc4f4d-zg6tk orca 	at com.mysql.cj.protocol.a.NativeSocketConnection.performTlsHandshake(NativeSocketConnection.java:99)
spin-orca-56cbc4f4d-zg6tk orca 	at com.mysql.cj.protocol.a.NativeProtocol.negotiateSSLConnection(NativeProtocol.java:329)
spin-orca-56cbc4f4d-zg6tk orca 	... 168 common frames omitted

## Cause
With TLS 1.1 approaching an end-of-life deprecation, it was discovered that Java 11.0.11 removes certain cyphers that would enable TLS1.1 to work.
This entails that any component that communicates using TLS1.1 will fail (by default). It was also observed that the ***communication did not auto-negotiate to TLS1.2***, even though it is supposedly supported by the version of the MySQL drivers that were tested (8.0.19+).

