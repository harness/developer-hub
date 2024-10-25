---
title: Bake or Deployment Stage timeouts caused by external factors
---

## Issue
Bake and deployment stages depend on applications and environments external to Spinnaker and are therefore susceptible to externally induced timeout errors.
At time of writing, Spinnaker has no way to indicate what the problem might be and will simply fail the stage with a generic timeout error. We can, however, tell it's an external problem if error similar to the below is observed when viewing the execution details JSON, the key field being ```"kind":"NETWORK"```:
```type":"createServerGroup","name":"MyStageName","startTime":1636692612420,"endTime":1636692675134,"status":"TERMINAL","context":{"rollback":{"onFailure":false},"exception":{"exceptionType":"RetrofitError","shouldRetry":false,"details":{"kind":"NETWORK","error":"timeout","errors":[]},```
Depending on the stage type, there will be additional pointers in the Rosco and/or Orca logs, including but not limited to the below.
#### Orca
In this exception we can see the socket closed which tends to indicate an upstream service closed the connection on Spinnaker:
```
2021-11-12 09:41:50.276  INFO 1 --- [    handlers-20] c.n.s.orca.clouddriver.KatoRestService   :  java.net.SocketTimeoutException: timeout
	at okio.Okio$4.newTimeoutException(Okio.java:232)
	at okio.AsyncTimeout.exit(AsyncTimeout.java:286)
	at okio.AsyncTimeout$2.read(AsyncTimeout.java:241)
	at okio.RealBufferedSource.indexOf(RealBufferedSource.java:358)
	at okio.RealBufferedSource.readUtf8LineStrict(RealBufferedSource.java:230)
	at okhttp3.internal.http1.Http1ExchangeCodec.readHeaderLine(Http1ExchangeCodec.java:242)
	at okhttp3.internal.http1.Http1ExchangeCodec.readResponseHeaders(Http1ExchangeCodec.java:213)
	at okhttp3.internal.connection.Exchange.readResponseHeaders(Exchange.java:115)
	at okhttp3.internal.http.CallServerInterceptor.intercept(CallServerInterceptor.java:94)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:142)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:117)

Caused by: java.net.SocketException: Socket closed
	at java.base/java.net.SocketInputStream.read(SocketInputStream.java:183)
	at java.base/java.net.SocketInputStream.read(SocketInputStream.java:140)
	at okio.Okio$2.read(Okio.java:140)
	at okio.AsyncTimeout$2.read(AsyncTimeout.java:237)
	... 85 more
```
This is an example of a ServerGroup creation timeout, but again is indicating an upstream problem:

```
2021-11-12 09:42:11.318 ERROR 1 --- [    handlers-20] c.n.s.orca.q.handler.RunTaskHandler      : Error running CreateServerGroupTask for pipeline[[pipeline_ID]]
retrofit.RetrofitError: timeout
	at retrofit.RetrofitError.networkError(RetrofitError.java:27)
	at retrofit.RestAdapter$RestHandler.invokeRequest(RestAdapter.java:395)
	at retrofit.RestAdapter$RestHandler.invoke(RestAdapter.java:240)
	at com.sun.proxy.$Proxy171.requestOperations(Unknown Source)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:566)

Caused by: java.net.SocketTimeoutException: timeout
	at okio.Okio$4.newTimeoutException(Okio.java:232)
	at okio.AsyncTimeout.exit(AsyncTimeout.java:286)
	at okio.AsyncTimeout$2.read(AsyncTimeout.java:241)
	at okio.RealBufferedSource.indexOf(RealBufferedSource.java:358)
	at okio.RealBufferedSource.readUtf8LineStrict(RealBufferedSource.java:230)
	at okhttp3.internal.http1.Http1ExchangeCodec.readHeaderLine(Http1ExchangeCodec.java:242)
	at okhttp3.internal.http1.Http1ExchangeCodec.readResponseHeaders(Http1ExchangeCodec.java:213)
	at okhttp3.internal.connection.Exchange.readResponseHeaders(Exchange.java:115)
	at okhttp3.internal.http.CallServerInterceptor.intercept(CallServerInterceptor.java:94)

Caused by: java.net.SocketException: Socket closed
	at java.base/java.net.SocketInputStream.read(SocketInputStream.java:183)
	at java.base/java.net.SocketInputStream.read(SocketInputStream.java:140)
	at okio.Okio$2.read(Okio.java:140)
	at okio.AsyncTimeout$2.read(AsyncTimeout.java:237)
	... 85 common frames omitted
```

#### Rosco
For bakes specifically, Rosco will log similar timeout exceptions to Orca:
```
10:09:35,676 |-ERROR client-side exception java.net.SocketTimeoutException: Read timed out
	at java.net.SocketTimeoutException: Read timed out
	at 	at java.base/java.net.SocketInputStream.socketRead0(Native Method)
	at 	at java.base/java.net.SocketInputStream.socketRead(SocketInputStream.java:115)
	at 	at java.base/java.net.SocketInputStream.read(SocketInputStream.java:168)
	at 	at java.base/java.net.SocketInputStream.read(SocketInputStream.java:140)
```
Although the bake may ultimately complete:
```
2021-11-08 11:09:13.406  INFO 1 --- [RxIoScheduler-2] c.n.s.rosco.jobs.local.JobExecutorLocal  : Polling state for xxxx (executionId: xxxxx1)...
2021-11-08 11:09:13.407  INFO 1 --- [RxIoScheduler-2] c.n.s.rosco.jobs.local.JobExecutorLocal  : State for xxxx changed with exit code 0 (executionId: xxxxx:1).
```

## Cause
Due the root problem being external to Spinnaker, the list of causes can be rather large. Some potential causes can include but are certainly not limited to:
* Image registry performance and/or configuration
* General network performance
* Externally enforced timeout values on upstream services
* AMI's taking longer to create due to increased size, AWS API throttling (this will be seen in Clouddriver logs) or other AWS issues
* Health checks failing due to instances taking too long to become healthy (deploying to an instance type without enough resources to come up within the check window i.e. deploying to a ***t2.micro*** when a ***t3*** may be more appropriate)

