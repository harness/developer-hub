---
title: Continuous Error Tracking (CET) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Error Tracking(CET).
sidebar_position: 2
---

#### How do I setup the application name of the JVM to be monitored with the CET agent?

There are two ways one can setup the application name within the CET agent:
- For the environment variable, use the parameter `ET_APPLICATION_NAME=`
- For the JVM argument, use the parameter `-Dharness.etagent.application.name=`

#### How is the server name applied to the JVM that is being monitored by the CET agent?

There are two ways one can setup the server name within the CET agent:
- For the environment variable, use the parameter `ET_SERVER_NAME=`
- For the JVM argument, use the parameter `-Dharness.etagent.server.name=`



#### How does one set the name of the application deployment version currently running on the JVM being monitored by the CET agent?

There are two ways one can setup the deployment name within the CET agent:
- For the environment variable, use the parameter `ET_DEPLOYMENT_NAME=`
- For the JVM argument, use the parameter `-Dharness.etagent.deployment.name=`



#### Can the CET agent set a boot time for it to start without delaying the startup of the JVM application?

There are two ways one can setup the boot time within the CET agent:
- For the environment variable, use the parameter `ET_BOOT_TIME=`
- For the JVM argument, use the parameter `-Dharness.etagent.boot.time=`



#### How do I connect to the Harness Collector on the SaaS platform?

There are two ways one can connect to the collector from the CET agent:
- For the environment variable, use the parameter `ET_COLLECTOR_URL=`
- For the JVM argument, use the parameter `-Dharness.etagent.collector.url=`



#### What is the address of the collector for the CET agent to connect to on the Harness SaaS platform?

There are three different URLs to use depending on which Harness cluster you are connected to.  Select Account Settings on the bottom left and verify the Harness Cluster Hosting Account.

The collector URLs are as follows:
- Prod1: `https://collector.et.harness.io/prod1/`
- Prod2: `https://collector.et.harness.io/gratis/`
- Prod3: `https://collector.et.harness.io/prod3/`




#### How do I setup the environment ID to be used to connect my CET agent to the Harness environment?

There are two ways one can setup the environment to be used to connect the CET agent to the appropriate Harness environment:
- For the environment variable, use the parameter `ET_ENV_ID=`
- For the JVM argument, use the parameter `-Dharness.etagent.env.id=`




#### How do I apply the CET token that is created in the CET module via Harness UI to the CET agent?

There are two ways to setup the CET token within the CET agent:
- For the environment variable, use the parameter `ET_TOKEN=`
- For the JVM argument, use the parameter `-Dharness.etagent.token=`




#### How do I add the repository connector ID for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository connector ID within the CET agent:
- For the environment variable, use the parameter `ET_REPOSITORY_CONNECTOR_ID=`
- For the JVM argument, use the parameter `-Dharness.etagent.repository.connector.id=`




#### How do I add the repository branch for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository branch within the CET agent:
- For the environment variable, use the parameter `ET_REPOSITORY_BRANCH=`
- For the JVM argument, use the parameter `-Dharness.etagent.repository.branch=`




#### How do I add the repository commit for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository commit within the CET agent:
- For the environment variable, use the parameter `ET_REPOSITORY_COMMIT=`
- For the JVM argument, use the parameter `-Dharness.etagent.repository.commit=`




#### How do I add the repository sources root for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository sources root within the CET agent:
- For the environment variable, use the parameter `ET_REPOSITORY_SOURCES_ROOT=`
- For the JVM argument, use the parameter `-Dharness.etagent.repository.sources.root=`




#### How do I update the location of the resources directory to be used by the CET agent?

There are two ways one can update the location of the resources directory within the CET agent:
- For the environment variable, use the parameter `ET_RESOURCES_DIR=`
- For the JVM argument, use the parameter `-Dharness.etagent.resources.dir=`



#### How is the size limit configured for the temporary resources directory used by the CET agent?

There are two ways one can setup the size limit (in bytes) for the temporary resources directory within the CET agent:
- For the environment variable, use the parameter `ET_RESOURCES_SIZE_LIMIT=`
- For the JVM argument, use the parameter `-Dharness.etagent.resources.size.limit=`



#### How does one configure the heartbeat sent from the CET agent to the collector?

There are two ways one can setup the interval (in seconds) for the keep alive mechanism that sends a heartbeat to the collector from the CET agent:
- For the environment variable, use the parameter `ET_COLLECTOR_KEEPALIVE=`
- For the JVM argument, use the parameter `-Dharness.etagent.collector.keepalive=`



#### Can the CET agent set a time frame how often to send statistical data of the JVM application?

There are two ways one can setup the time frame (in seconds) to push statistical data to Harness by the CET agent:
- For the environment variable, use the parameter `ET_STATS_INTERVAL=`
- For the JVM argument, use the parameter `-Dharness.etagent.stats.interval=`




#### How do I increase the amount of information collected for each snapshot by the CET agent?

There are two ways one can increase the cart factor to increase the amount of data collected by the CET agent (valid values are between 0.1-4):
- For the environment variable, use the parameter `ET_CART_FACTOR=`
- For the JVM argument, use the parameter `-Dharness.etagent.cart.factor=`




#### How does the cart factor impact the amount of information gathered for each snapshot by the CET agent?

The amount of data collected during snapshot is determined by an internal algorithm called the cart.

The valid values vary between: 0.1-4 (including decimals to one decimal place). A cart factor of 2 records twice as much as a normal hit. A cart factor of 0.5 records half as much as a normal hit.
Note that larger snapshots may result in larger overhead. A larger cart factor is trading more overhead for more information. This does not affect the number of snapshots taken or levels deep into the heap.




#### How do I configure the CET agent to capture snapshot data of a transaction which has introduced slowness related to automatic timers?

There are two ways one can configure the CET agent to capture snapshot data of the transaction that has introduced slowness:
- For the environment variable, use the parameter `ET_PARALLAX`
- For the JVM argument, use the parameter `-Dharness.etagent.parallax`




#### How does the CET agent automatically detect slowdowns and identify possible root causes for each one of the exceptions that are found?

The CET micro-agent periodically collects statistics of each transaction, once our micro-agent encounters an entry point. The Harness backend service collects this data, calculates the threshold for this entry point (based on a standard deviation calculation from the metho's average running time) and relay it back to the micro-agent.

When this timer feature is enabled, the micro-agent will take a snapshot of the slowdown event once the transaction running time is taking longer than the calculated threshold. The agent will do so while looking for the most significant methods using CET heuristics search algorithm, so we can get a deeper stack trace, with more relevant data for you to help you analyze where the most running time was spent.

In order to get the proper snapshot data of the transaction which has introduced the slowness, you need to enable the following runtime flag when you run the agent with your application:
`-Dharness.etagent.parallax`




#### Why does my CET agent not work after upgrading my JRE from Java 8 to Java 11?

When attaching a CET agent to a JVM that is running Java 10, 11, 16, or 17, ensure to use the following Java parameters:
Turn off Class Sharing: This can be done using the following flags:
 for IBM Java
  `-Xshareclasses:none`
 for HotSpot
  `-Xshare:off -XX:-UseTypeSpeculation`

Increase ReservedCodeCache to at least 512mb by adding the following flag:
`-XX:ReservedCodeCacheSize=512m`

The Agent should appear last in the VM arguments list before specifying the main class or jar.

When adding/removing 3rd party packages, the Agent should be restarted.




#### How do I configure which logging framework from the CET default list will be instrumented?

There are two ways one can setup the CET agent to instrument specific logging frameworks if all frameworks are not to be used:
- For the environment variable, use the parameter `ET_SUPPORT_LOGGER_FRAMEWORKS=`
- For the JVM argument, use the parameter `-Dharness.etagent.logger.frameworks=`




#### Which logging frameworks are currently supported by the CET agent?

The currently supported logging frameworks for the CET agent are as follows:

log4j - Apache Log4j
log4j2 - Apache Log4j 2
logback - Logback Classic Logger
jul - Java Util Logging
slf4j - SLF4J Simple Logger
acl - Apache Common SimpleLogger
akka - Akka Logger
jboss - JBoss Logger
tinylog - Tinylog Logger




#### Can we use more than one logging framework when configuring specific ones through the CET agent?

The parameter `-Dharness.etagent.logger.frameworks` can take more than one framework using the `:` (colon) separator. If the frameworks are invalid, none will be used.
Example: `-Dharness.etagent.logger.frameworks=logback:log4j:tinylog`




#### How do I control the minimum log level recorded in the log view of the CET agent?

There are two ways to configure the log level on the CET agent:
- For the environment variable, use the parameter `ET_CEREBRO_MIN_LOG_LEVEL=`
- For the JVM argument, use the parameter `-Dharness.etagent.cerebro.min.log.level=`

Possible values include:

```
LOG_LEVEL_TRACE
LOG_LEVEL_DEBUG
LOG_LEVEL_INFO
LOG_LEVEL_WARN
LOG_LEVEL_ERROR
```



#### How do I add the repository connector ID for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository connector ID within the CET agent:
- For the environment variable, use the parameter `ET_CEREBRO_MESSAGE_MAX_LENGTH=`
- For the JVM argument, use the parameter `-Dharness.etagent.cerebro.message.max.length=`




#### How can I adjust the depth of the heap allowing the CET agent to capture variables?

There are two ways to setup the CET repository branch within the CET agent:
- For the environment variable, use the parameter `ET_MAX_DEPTH=`
- For the JVM argument, use the parameter `-Dharness.etagent.max.depth=`

The default value is set to 5.  It may accelerate reaching the cart limit, resulting in displaying less data in other methods in a snapshot.




#### How can I set the CET agent to record the maximum number of frames collected in a snapshot?

There are two ways to setup the maximum number of frames collected in a snapshot within the CET agent:
- For the environment variable, use the parameter `ET_MAX_STACK_DEPTH=`
- For the JVM argument, use the parameter `-Dharness.etagent.max.stack.depth=`

The default value is set to 2000.




#### How can I set the CET agent to collect the maximum length of a recorded string variable?

There are two ways to setup the CET agent to collect a maximum length of a recorded string variable:
- For the environment variable, use the parameter `ET_MAX_STRING_LENGTH=`
- For the JVM argument, use the parameter `-Dharness.etagent.max.string.length=`

The default value is set to 300.




#### How can I set the CET agent to collect the maximum number of captured array elements in a snapshot?

There are two ways to setup the CET agent to collect a maximum number of captured array elements in a snapshot:
- For the environment variable, use the parameter `ET_MAX_ARRAY_LENGTH=`
- For the JVM argument, use the parameter `-Dharness.etagent.max.array.length=`

The default value is set to 25.




#### How can I limit the size of the string that the CET agent captures?

There are two ways to limit the size of the string that the CET agent captures:
- For the environment variable, use the parameter `ET_MAX_STRING_ENCODING_SIZE=`
- For the JVM argument, use the parameter `-Dharness.etagent.max.string.encoding_size=`

The default value is set to 300.




#### How can I limit the size of the array that the CET agent captures?

There are two ways to limit the size of the array that the CET agent captures:
- For the environment variable, use the parameter `ET_MAX_ARRAY_ENCODING_SIZE=`
- For the JVM argument, use the parameter `-Dharness.etagent.max.array.encoding_size=`

The default value is set to 25.




#### Is there a way to set the CET agent to only provide one snapshot per event for the currently running JVM being monitored?

There are two ways to allow the CET agent to only evacuate one snapshot per event for the entire lifetime of the JVM:
- For the environment variable, use the parameter `ET_ONE_HIT_REQ=`
- For the JVM argument, use the parameter `-Dharness.etagent.one.hit.req=`

The default value is set to false.




#### Is there a way to set the maximum number of snapshots to be recorded simultaneously by the CET agent?

There are two ways to limit the maximum number of snapshots the CET agent can collect simultaneously:
- For the environment variable, use the parameter `ET_CONCURRENCY_LEVEL=`
- For the JVM argument, use the parameter `-Dharness.etagent.concurrency_level=`

The default value is set to 5.  The range that can be used is between 1-5.




#### How can I set the period of time the CET agent waits before shutting down?

There are two ways to set the period of tie the CET agent waits before shutting down to allow the last asynchronous messages to be sent to Harness:
- For the environment variable, use the parameter `ET_SHUTDOWN_GRACETIME=`
- For the JVM argument, use the parameter `-Dharness.etagent.shutdown.gracetime=`

The default value is set to 0 (not enabled).




#### How can I set the CET agent to exclude a method to optimize its use? 

There are two ways to set the CET agent to exclude a method to optimize its use:
- For the environment variable, use the parameter `ET_OPTIMIZE_METHODS=`
- For the JVM argument, use the parameter `-Dharness.etagent.optimize.methods=`

Example: `-Dharness.etagent.optimize.methods=com.company.Class1:method1|com.company.Class2:method2`




#### What is the significance of using the ET_OPTIMIZE_METHODS parameter with the CET agent?

`ET_OPTIMIZE_METHODS` excludes a method during code throttling. In some cases, 3rd-party code is responsible for a significant part of the Micro-Agent's overhead. Excluding it specifically from exception handling significantly reduces overhead.

NOTE: This action does not ignore the method completely. It is efficient only where the CET Micro-Agent is creating a significant overhead.

Example: `-Dharness.etagent.optimize.methods=com.company.Class1:method1|com.company.Class2:method2`




#### How can I set the CET agent to exclude a package to optimize its use? 

There are two ways to set the CET agent to exclude a package to optimize its use:
- For the environment variable, use the parameter `ET_OPTIMIZE_PACKAGES=`
- For the JVM argument, use the parameter `-Dharness.etagent.optimize.packages=`

Example: `-Dharness.etagent.optimize.packages=com.company.package1|com.company.package2`




#### What is the significance of using the ET_OPTIMIZE_PACKAGES parameter with the CET agent?

`ET_OPTIMIZE_PACKAGES` excludes a package during code throttling. 3rd-party code potentially increases overhead on the Micro-Agent. Excluding it specifically from exception handling significantly reduces overhead.

NOTE: This action does not ignore the package completely. It is efficient only where the OverOps Micro-Agent is creating a significant overhead.

Example: `-Dharness.etagent.optimize.packages=com.company.package1|com.company.package2`




#### Is there a way to disable the CET agent from collecting details of the JVM during startup?

There are two ways to disable the CET agent from collecting details of the JVM during start up:
- For the environment variable, use the parameter `ET_DISABLE_EXCEPTION_HANDLING_TIME=`
- For the JVM argument, use the parameter `-Dharness.disable.exception.handling.time=`

Example: `-Dharness.disable.exception.handling.time=10m`




#### How exactly does the ET_DISABLE_EXCEPTION_HANDLING_TIME parameter help with the startup of the JVM?

Using the `ET_DISABLE_EXCEPTION_HANDLING_TIME` parameter, the CET agent configures a time frame during JVM startup in which the Micro-Agent does not collect any information (snapshots or statistics) or perform any instrumentation. Callback is triggered, but the CET Micro-Agent will return immediately on every call. This increases boot times slowed down by the CET Micro-Agent.

Example: `-Dharness.disable.exception.handling.time=10m`




#### How can the CET agent prevent from instrumenting a method being called multiple times in a stack?

There are two ways to disable the CET agent from collecting details of the JVM during start up:
- For the environment variable, use the parameter `ET_NO_RECURSIVE_CONTEXT`
- For the JVM argument, use the parameter `-Dharness.no.recursive.context`




#### What is the significance of using the ET_NO_RECURSIVE_CONTEXT parameter with the CET agent?

The CET Micro-Agent uses the `ET_NO_RECURSIVE_CONTEXT` parameter to disable instrumentation of methods being called multiple times per call stack.  In certain applications, some methods are repeatedly called in the same call stack. This causes significant CPU overhead and using this flag prevents this.




#### How can the CET agent prevent from collecting variable data from snapshots?

There are two ways to exclude the CET agent from collecting variable data from snapshots:
- For the environment variable, use the parameter `ET_NO_LOCALS`
- For the JVM argument, use the parameter `-Dharness.no.locals`




#### What is the significance of using the ET_NO_LOCALS parameter within the CET agent?

The `ET_NO_LOCALS` parameter excludes the variable state from the snapshots to reduce overhead for diagnostics purposes. This flag turns off the CET Micro-Agent's JVMTI capability to extract local variable data during snapshot encoding causing significant overhead.




#### Is there a way to prevent the CET agent from displaying exceptions?

There are two ways to prevent the CET agent from displaying exceptions:
- For the environment variable, use the parameter `ET_NO_EX_CALLBACK`
- For the JVM argument, use the parameter `-Dharness.no.ex.callback`




#### When would it be beneficial to use the ET_NO_EX_CALLBACK parameter for the CET agent?

Using the `ET_NO_EX_CALLBACK` parameter for the CET agent turns off its registration to the JVMTI exception callback, which causes severe overhead in the JVM. When set, no exceptions are displayed. This is intended for diagnostics purposes only.




#### Is there a way to turn off the CET agent's callback capability on exceptions?

There are two ways to turn off the CET agent's callback capability on exceptions:
- For the environment variable, use the parameter `ET_NO_EX`
- For the JVM argument, use the parameter `-Dharness.no.ex`




#### When would it be beneficial to use the ET_NO_EX parameter for the CET agent?

Using the `ET_NO_EX` parameter for the CET agent turns off its JVMTI exception callback capability that causes severe overhead in the JVM. When set, callback is triggered but returned immediately. This is intended for diagnostics purposes only.




#### How does the CET agent disable instrumentation of logged errors and logged warnings as events?

There are two ways to disable the CET agent's instrumentation of logged errors and logged warnings as events:
- For the environment variable, use the parameter `ET_NO_XMEN`
- For the JVM argument, use the parameter `-Dharness.no.xmen`




#### How does the CET agent disable instrumentation of cross-machine tale stitching for rare synchronized HTTP requests?

There are two ways to disable the CET agent's instrumentation of cross-machine tale stitching for rare synchronized HTTP requests:
- For the environment variable, use the parameter `ET_NO_CYDER`
- For the JVM argument, use the parameter `-Dharness.no.cyder`




#### How does the CET agent disable instrumentation and extraction of deployment names from servlet contexts?

There are two ways to disable the CET agent's instrumentation and extraction of deployment names from servlet contexts:
- For the environment variable, use the parameter `ET_NO_ROBINHOOD`
- For the JVM argument, use the parameter `-Dharness.no.robinhood`




#### How does the CET agent disable instrumentation and tracking of HTTP errors?

There are two ways to disable the CET agent's instrumentation and tracking of HTTP errors:
- For the environment variable, use the parameter `ET_NO_ROCKY`
- For the JVM argument, use the parameter `-Dharness.no.rocky`




#### How does the CET agent disable handling to differentiate between catch clauses and finally clauses?

There are two ways to disable the CET agent's handling to differentiate between catch clauses and finally clauses:
- For the environment variable, use the parameter `ET_NO_FIN`
- For the JVM argument, use the parameter `-Dharness.no.fin`

Note: Disabling this flag may cause inaccurate `catch frame` and `catch line` designation.




#### Is there a way to prevent the CET agent from collecting less data within snapshots?

There are two ways to prevent the CET agent from collecting less data within snapshots:
- For the environment variable, use the parameter `ET_NO_RICH_HITS`
- For the JVM argument, use the parameter `-Dharness.no.rich.hits`




#### What is the significance of utilizing the ET_NO_RICH_HITS parameter for the CET agent?

Rich hits are snapshots that contain significantly more data than standard snapshots. Encoding rich hits increases overhead.  The `ET_NO_RICH_HITS` flag turns this feature off.




#### How does the CET agent disable log statement capture for the log view?

There are two ways to disable the CET agent's log statement capture for the log view:
- For the environment variable, use the parameter `ET_NO_CEREBRO`
- For the JVM argument, use the parameter `-Dharness.no.cerebro`




#### What is the significance of utilizing the ET_NO_CEREBRO parameter for the CET agent?

Using the `ET_NO_CEREBRO` paramter for the CET Micro-Agent disables log statement capture for the log view. It potentially provides significant performance benefits. Log capture can affect Garbage Collection when logs are dense. This does not affect recording of logged errors and logged warnings as events.




#### Is there a way to disable all instrumentation of any bytecode with the CET agent?

There are two ways to disable all instrumentation of any bytecode with the CET agent:
- For the environment variable, use the parameter `ET_NO_TREX`
- For the JVM argument, use the parameter `-Dharness.no.trex`




#### What happens when the ET_NO_TREX parameter is used when attempting to disable instrumentation of any bytecode?

The `ET_NO_TREX` parameter is used with the CET Micro-Agent to disable all instrumentation across the board. This, in essence, invalidates CET (error rates, timers, etc), but can be used to diagnose performance issues resulting from bytecode instrumentation.




#### Is there a way to disable instrumentation and collection of event statistics with the CET agent?

There are two ways to disable instrumentation and collection of event statistics with the CET agent:
- For the environment variable, use the parameter `ET_NO_REQ_INV`
- For the JVM argument, use the parameter `-Dharness.no.req.inv`




#### What is to be expected when using the ET_NO_REQ_INV parameter with the CET agent?

The `ET_NO_REQ_INV` parameter of the CET Micro-Agent disables instrumentation and collection of event statistics. Snapshots are still taken, but the Dashboard will not have any statistics for events, nor will statistics be sent to StatsD.




#### Is there a way to disable instrumentation and collection of JVM view information with the CET agent?

There are two ways to disable instrumentation and collection of JVM view information with the CET agent:
- For the environment variable, use the parameter `ET_NO_OVERMIND`
- For the JVM argument, use the parameter `-Dharness.no.overmind`




#### Is there a way for the CET agent to disable the machine code throttling mechanism?

There are two ways for the CET agent to disable the machine code throttling mechanism:
- For the environment variable, use the parameter `ET_NO_TF`
- For the JVM argument, use the parameter `-Dharness.no.tf`

Note: Using this flag significantly decreases performance, but may be necessary for diagnostics.




#### Is there a way for the CET agent to disable the auxiliary mechanisms for cleanup that involves some bytecode instrumentation?

There are two ways for the CET agent to disable the machine code throttling mechanism:
- For the environment variable, use the parameter `ET_NO_TFA`
- For the JVM argument, use the parameter `-Dharness.no.tfa`

Note: This is to be used for diagnostics purposes only.




#### Is there a way for the CET agent to disable instrumentation and injection of log links into throwable messages?

There are two ways for the CET agent to disable instrumentation and injection of log links into throwable messages:
- For the environment variable, use the parameter `ET_NO_ETL`
- For the JVM argument, use the parameter `-Dharness.no.etl`

Note: This does not affect injection of log links into logging statements. Exception Tiny Links are disabled by default.




#### Is there a way for the CET agent to enable instrumentation and injection of log links into throwable messages?

There are two ways for the CET agent to disable instrumentation and injection of log links into throwable messages:
- For the environment variable, use the parameter `ET_ETL`
- For the JVM argument, use the parameter `-Dharness.etl`

Note: This does not affect injection of log links into logging statements. Currently, ETL is disabled by default and this flag is required to turn it on.




#### When would the CET agent need to have ETL enabled?

The CET Micro-Agent by default has ETL disabled.  This feature enables instrumentation and injecting of log links into throwable messages.  It must have the `ET_ETL` parameter to turn this flag on.

For JVM arguments, you simply specify the flag - no value is required.




#### How does the CET agent disable timers?

There are two ways to disable timers with the CET agent:
- For the environment variable, use the parameter `ET_NO_CHRONOS`
- For the JVM argument, use the parameter `-Dharness.no.chronos`




#### How does the CET agent disable instrumentation and collection of entry point information?

There are two ways the CET agent disables instrumentation and collection of entry point information:
- For the environment variable, use the parameter `ET_NO_CONTEXTS`
- For the JVM argument, use the parameter `-Dharness.no.contexts`

Note: When this flag is disabled, the Entry Points column on the Dashboard only displays the method which threw the event.




#### How does the CET agent disable any bytecode instrumentation to classes that include a special bytecode instruction called invoke dynamic?

There are two ways to disable any bytecode instrumentation to classes that include a special bytecode instruction called invoke dynamic with the CET agent:
- For the environment variable, use the parameter `ET_NO_INDY_REX`
- For the JVM argument, use the parameter `-Dharness.no.indy.rex`




#### How does the CET agent disable injection of log links into log statements?

There are two ways to disable injection of log links into log statements with the CET agent:
- For the environment variable, use the parameter `ET_NO_XTL`
- For the JVM argument, use the parameter `-Dharness.no.xtl`

Note: This does not affect the collection of logged warnings/errors as events, or the injection of log links into throwable messages.




#### How does the CET agent disable displaying log links for all events?

There are two ways to disable displaying log links for all events with the CET agent:
- For the environment variable, use the parameter `ET_NO_MEMENTO`
- For the JVM argument, use the parameter `-Dharness.no.memento`

Note: This flag disables displaying log links for all events, even when no specific snapshot was taken for that instance, and the log link points to the most recent snapshot available.




#### How does the CET agent disable log capture optimizations?

There are two ways to disable log capture optimizations with the CET agent:
- For the environment variable, use the parameter `ET_NO_LF`
- For the JVM argument, use the parameter `-Dharness.no.lf`

Note: This flag stops the throttler on the Micro-Agent callbacks to logged errors/warnings.




#### Is there a way to disable all dynamic class instrumentation with the CET agent?

There are two ways to disable all dynamic class instrumentation with the CET agent:
- For the environment variable, use the parameter `ET_NO_DYNAMIC_INST`
- For the JVM argument, use the parameter -Dharness.no.dynamic.inst




#### When using the ET_NO_DYNAMIC_INST parameter with the CET agent, what instrumentation is being disabled?

The CET Micro-Agent uses the `ET_NO_DYNAMIC_INST` parameter to disable all dynamic class instrumentation:

- Disables a complementary mechanism needed for optimizations to make sure we evacuate snapshots properly in JIT compiled mode. This issue could be seen in rare edge cases. (no Salinger)
- Disables our timer mechanisms (Chronos & Parallax)
- Logged error and warning small performance optimization
- Metrics such as the Error Rate will not show.




#### Does using the ET_NO_DYNAMIC_INST flag eliminate the use of other parameters with the CET agent?

Using this parameters equats to using all of the following flags within the CET Micro-Agent:

```
-Dtakipi.no.req.inv
-Dtakipi.no.contexts
-Dtakipi.no.lf
-Dtakipi.no.tfa
-Dtakipi.no.chronos
```

There will not be the need of using any of the flags above if utilizing a flag to disable all dynamic class instrumentation.




#### Is there a way to disable a group of performance-related features with the CET agent?

There are two ways to disable a group of performance-related features with the CET agent:
- For the environment variable, use the parameter `ET_OPTIMIZED_MODE`
- For the JVM argument, use the parameter `-Dharness.optimized.mode`




#### What parameters does the ET_OPTIMIZED_MODE flag within the CET agent replace?

The `ET_OPTIMIZED_MODE` flag within the CET agent replaces the following parameters:
```
-Dtakipi.no.xmen
-Dtakipi.no.req.inv
-Dtakipi.no.contexts
-Dtakipi.no.fin
-Dtakipi.concurrency.level=1
```

Using the `ET_OPTIMIZED_MODE` parameter disables these performance-related features to determine what is causing performance issues.




#### Is there a way to display the CET agent's internal log messages to the standard output screen?

There are two ways to display the CET agent's internal log messages to the standard output screen:
- For the environment variable, use the parameter ET_LOG_TO_CONSOLE
- For the JVM argument, use the parameter -Dharness.log.to.console




#### What is the purpose of using the ET_LOG_TO_CONSOLE parameter for the CET agent?

The ET_LOG_TO_CONSOLE parameter makes the CET Micro-Agent write its internal log messages to the standard output instead of writing to the CET agent log file.

This flag adds verbose debugging to all logs whenever turned on as long as the server is on; to stop, the JVM application needs to restart the service without the flag.  It is recommended to use this flag for a limited time to figure out problems with the CET agent.




#### How can the CET agent change the location of its log file?

There are two ways to change the CET Micro-Agent's location of its log file:
- For the environment variable, use the parameter ET_LOG_FILE
- For the JVM argument, use the parameter -Dharness.log.file

Example: `-Dharness.log.file=<path/to/file.log>`




#### When would it be beneficial to use the parameter ET_LOG_FILE with the CET agent?

The `ET_LOG_FILE` parameter within the CET agent helps in the event the agent logs are not being sent to Harness.  This solves communication issues between the CET Micro-Agent and Harness.

Note: The log file must be in an existing path.




#### How does the CET agent print debug log statements to the standard output?

There are two ways the CET agent prints debug log statements to the standard output:
- For the environment variable, use the parameter ET_SILENT
- For the JVM argument, use the parameter -Dharness.silent

Example: `-Dharness.silent=false`




#### Does the CET agent provide a way to change the base URL for tinylinks?

There are two ways the CET agent allows a change to the base URL for tinylinks:
- For the environment variable, use the parameter ET_SHORT_URL_PREFIX
- For the JVM argument, use the parameter -Dharness.short.url.prefix

Example: `-Dharness.short.url.prefix=https://MYSERVER_URL/tkp.to`



#### My CET agent would not start due to incompatibility with my native Linux operating system.  What is the minimum Linux version required to run the CET agent?

The CET agent requires at minimum the following versions of Linux to run successfully:
- Linux/Centos: 6.5+
- Linux/RedHat: 6.0+
- Linux/Debian: 10+
- Linux/Suse: SLES 12+
- Linux/Ubuntu: 14+

Note: There may be a chance the CET agent will work with a previous version of the operating system.  However, if there are any issues that may occur using the CET agent, it is required to upgrade to the minimum version of the OS in order to troubleshoot any issues.



#### My CET agent would not start due to incompatibility with my native Windows operating system.  What is the minimum Windows version required to run the CET agent?

The CET agent requires at minimum the following versions of Windows to run successfully:
- Windows: 7+
- Windows Server: 2012+

Note: There may be a chance the CET agent will work with a previous version of the operating system.  However, if there are any issues that may occur using the CET agent, it is required to upgrade to the minimum version of the OS in order to troubleshoot any issues.



#### My CET agent would not start due to incompatibility with my native Alpine operating system.  What is the minimum Alpine version required to run the CET agent?

The CET agent requires at minimum the following versions of Alpine to run successfully:
- Alpine: 3.10+

Note: There may be a chance the CET agent will work with a previous version of the operating system.  However, if there are any issues that may occur using the CET agent, it is required to upgrade to the minimum version of the OS in order to troubleshoot any issues.



#### My CET agent would not start due to incompatibility with my native Amazon operating system.  What is the minimum Amazon version required to run the CET agent?

The CET agent requires at minimum the following versions of Amazon OS to run successfully:
- Amazon Linux (Arm): 2 (Graviton 2 / 3)
- Amazon Linux: 2+

Note: There may be a chance the CET agent will work with a previous version of the operating system.  However, if there are any issues that may occur using the CET agent, it is required to upgrade to the minimum version of the OS in order to troubleshoot any issues.



#### My CET agent would not start due to incompatibility with my native AIX operating system.  What is the minimum AIX version required to run the CET agent?

The CET agent requires at minimum the following versions of AIX to run successfully:
AIX: 6.1+, 7.1, 7.2, 8+

Note: There may be a chance the CET agent will work with a previous version of the operating system.  However, if there are any issues that may occur using the CET agent, it is required to upgrade to the minimum version of the OS in order to troubleshoot any issues.



#### My CET agent would not start due to incompatibility with my native Mac operating system.  What is the minimum Mac version required to run the CET agent?

The CET agent requires at minimum the following versions of Mac to run successfully:
Mac: 10.15+ (Catalina)

Note: There may be a chance the CET agent will work with a previous version of the operating system.  However, if there are any issues that may occur using the CET agent, it is required to upgrade to the minimum version of the OS in order to troubleshoot any issues.



#### What are the supported programming languages that are supported by the CET agent?

The CET agent currently supports Java as well as other languages that run on top of the Java Virtual Machine (JVM):
- Java (minimum version 6.0)
- Kotlin (minimum version 1.5 with source attach as a requirement)
- Scala (minimum version 2.0 with source attach as a requirement)



#### While Kotlin and Scala are programming languages supported by the CET agent, why is it a requirement to use source attach with it?

Harness recommends utilizing source attach when using programming languages that either run on top of the Java Virtual Machine (JVM) or non-Java languages with the CET agent.  Source files may be missing when running the CET agent with these languages.  The CET agent uses decompiled sources to display the application's code.  Since the decompiler only supports Java and code generated by non-Java languages may not appear, using the source attach feature will allow the user to have the source code available without having to decompile the source code from the source files obtained by the CET agent.



#### My CET agent did not work due to incompatibility with the version of Oracle HotSpot VM currently running as my JVM.  What is the minimum version requirement for Oracle HotSpot VM to work with my CET agent?

The following versions of Oracle HotSpot VM are currently supported for the CET agent:
- 17: EoL TBD
- 11: EoL 09-30-2023
- 8: EoL 03-31-2025
- 7: EoL 07-31-2022
- 6: EoL 12-31-2018 (update 20 and above)

Note: The CET agent supports LTS for Oracle HotSpot VM versions 17, 11, and 8.



#### My CET agent did not work due to incompatibility with the version of OpenJDK currently running as my JVM.  What is the minimum version requirement for OpenJDK to work with my CET agent?

The following versions of OpenJDK are currently supported for the CET agent:
- 17: EoL TBD
- 11: EoL 10-30-2024
- 8: EoL 06-30-2023
- 7: EoL 06-30-2020
- 6: EoL 12-31-2016 (update 20 and above)

Note: The OpenJDK VM has other extentions such as Amazon Correto or Adopt OpenJDK that are supported.  However, not all derivatives have been thoroughly tested with the CET agent.  Place a feature request if there is a version of OpenJDK that you would like to see supported.

Note: The CET agent supports LTS for OpenJDK versions 17, 11, and 8.



#### My CET agent did not work due to incompatibility with the version of IBM currently running as my JVM.  What is the minimum version requirement for IBM to work with my CET agent?

The following versions of IBM are currently supported for the CET agent:
- 8: LTS supported
- 7
- 6

Note: Ensure to include the VM flag `-Xshareclasses:none` when attaching the CET agent to an IBM JVM.  The flag disables class sharing to ensure proper functionality of the CET agent.  Otherwise, the agent's performance may be hindered.



#### The CET agent is not collecting any log messages being printed by the JVM possibly due to incompatibility with the CET agent.  Which logging frameworks are supported by the CET agent?

The following logging frameworks are currently supported by the CET agent:
- Akka (minimum v2.4.0, maximum supported v2.8.5)
- ACL Simplelog (minimum v1.0, maximum supported v1.2)
- JBoss (minimum v3.0.0.GA, maximum supported v3.5.3.Final)
- Log4j2 (minimum v2.0.0, maximum supported v2.20.0)
- Log4j2 async (minimum v2.0.0, maximum supported v2.20.0)
- Logback (minimum v0.9.26, maximum supported v1.4.11)
- SLF4J (minimum v1.6.6, maximum supported v1.7.36)
- Tinylog
- JUL



#### The CET agent is not able to monitor my JVM.  It was found that my CET agent is not able to instrument any bytecode because there is another agent actively monitoring my JVM. What are other agents that the CET agent is currently not able to run with simultaneously?

The following agents are not compatible to run simultaneously with the CET agent:
- Dynatrace AppMon Agent
- JRebel Agent
- Takipi/OverOps



#### I want to update my CET agent for my AIX system.  How can I upgrade using this specific CET agent for my system?

One can download the AIX version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/aix/harness-et-agent.tar.gz`

This link will provide the latest version of the CET agent.



#### I want to update my CET agent for my Linux system.  How can I upgrade using this specific CET agent for my system?

One can download the Linux version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz`

This link will provide the latest version of the CET agent.



#### I want to update my CET agent for my Alpine system.  How can I upgrade using this specific CET agent for my system?

One can download the Alpine version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/alpine/harness-et-agent.tar.gz`

This link will provide the latest version of the CET agent.



#### I want to update my CET agent for my Graviton system.  How can I upgrade using this specific CET agent for my system?

One can download the Graviton version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/arm/harness-et-agent.tar.gz`

This link will provide the latest version of the CET agent.



#### I want to update my CET agent for my Windows system.  How can I upgrade using this specific CET agent for my system?

One can download the Windows version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/win/harness-et-agent.zip`

This link will provide the latest version of the CET agent.



#### I want to update my CET agent for my Mac system.  How can I upgrade using this specific CET agent for my system?

One can download the Mac version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/osx/harness-et-agent.tar.gz`

This link will provide the latest version of the CET agent.



#### Is there a way to download the previous version of the CET agent on my AIX system?

Users can downgrade to a previous AIX version of the CET agent.  To do this, replace the version in the URL with the version you are looking to download.

Ex: `https://get.et.harness.io/releases/5.3.0/aix/harness-et-agent.tar.gz`

5.3.0 is an AIX version of the CET agent.  Update this number to the version you are looking to download inside the URL.

Note: The version must exist in order for the CET agent to download.  An error message will appear on the browser indicating that this file does not exist if a version number is incorrectly entered in.



#### Is there a way to download the previous version of the CET agent on my Linux system?

Users can downgrade to a previous Linux version of the CET agent.  To do this, replace the version in the URL with the version you are looking to download.

Ex: `https://get.et.harness.io/releases/5.3.0/nix/harness-et-agent.tar.gz`

5.3.0 is a Linux version of the CET agent.  Update this number to the version you are looking to download inside the URL.

Note: The version must exist in order for the CET agent to download.  An error message will appear on the browser indicating that this file does not exist if a version number is incorrectly entered in.



#### Is there a way to download the previous version of the CET agent on my Alpine system?

Users can downgrade to a previous Alpine version of the CET agent.  To do this, replace the version in the URL with the version you are looking to download.

Ex: `https://get.et.harness.io/releases/5.3.0/alpine/harness-et-agent.tar.gz`

5.3.0 is an Alpine version of the CET agent.  Update this number to the version you are looking to download inside the URL.

Note: The version must exist in order for the CET agent to download.  An error message will appear on the browser indicating that this file does not exist if a version number is incorrectly entered in.



#### Is there a way to download the previous version of the CET agent on my Graviton system?

Users can downgrade to a previous Graviton version of the CET agent.  To do this, replace the version in the URL with the version you are looking to download.

Ex: `https://get.et.harness.io/releases/5.3.0/arm/harness-et-agent.tar.gz`

5.3.0 is a Graviton version of the CET agent.  Update this number to the version you are looking to download inside the URL.

Note: The version must exist in order for the CET agent to download.  An error message will appear on the browser indicating that this file does not exist if a version number is incorrectly entered in.



#### Is there a way to download the previous version of the CET agent on my Windows system?

Users can downgrade to a previous Windows version of the CET agent.  To do this, replace the version in the URL with the version you are looking to download.

Ex: `https://get.et.harness.io/releases/5.3.0/win/harness-et-agent.zip`

5.3.0 is a Windows version of the CET agent.  Update this number to the version you are looking to download inside the URL.

Note: The version must exist in order for the CET agent to download.  An error message will appear on the browser indicating that this file does not exist if a version number is incorrectly entered in.



#### Is there a way to download the previous version of the CET agent on my Mac system?

Users can downgrade to a previous Mac version of the CET agent.  To do this, replace the version in the URL with the version you are looking to download.

Ex: `https://get.et.harness.io/releases/5.7.0/osx/harness-et-agent.tar.gz`

5.3.0 is a Mac version of the CET agent.  Update this number to the version you are looking to download inside the URL.

Note: The version must exist in order for the CET agent to download.  An error message will appear on the browser indicating that this file does not exist if a version number is incorrectly entered in.



#### I have many environments with different ServiceIDs within OverOps.  How can I manage these when moving to CET within Harness?

The best way to handle the different environments with its different ServiceIDs within OverOps is to create new projects for each ServiceID being used within the Harness platform.  This way, one can setup their different services being used when transitioning over from OverOps to Harness using the CET module.

There may be other ways to configure the environments.  This would be something that would be addressed internally within your team's discussions on how to layout these environments to best suit your needs.



#### OverOps has different services to represent different environments using different ServiceIDs.  How does the CET module within the Harness platform designate the different services as different environments?

The CET module has the ability to create different services along with creating different environments in each service.  This would be handled within the [Monitored Services section](https://developer.harness.io/docs/continuous-error-tracking/get-started/overops-cet-migration#add-a-monitored-service).

For instance, we have a service called JavaJam which has a preprod and a prod environment.

Within OverOps, we would have different ServiceIDs for each environment.  One ServiceID to represent preprod for JavaJam, and another ServiceID to represent prod for JavaJam.

In Harness, the Monitored Services will allow you to have one service (i.e. JavaJam) and have multiple environments under this service (one for preprod, one for prod, etc).

This will allow more organization of your environments within one service.





#### I was able to start the CET agent, but noticed that the monitored service is appearing under a different service section.  What is causing this and how can we make it appear in the correct monitored service?

It may be possible that even though it is appearing under the correct project, the monitored service information may need to be updated to reflect correctly.

Ensure that the following fields are entered correctly with their proper information:
- ET_COLLECTOR_URL=assigned based on which Harness cluster the account is assigned to
- ET_APPLICATION_NAME=name of the monitored service
- ET_ENV_ID=name of the environment obtained within the monitored service
- ET_TOKEN=created individually for the service to be monitored by the CET agent



#### How can I ensure I can control which JVM to monitor and not have any JVM connect to my monitored services without my consent?

In order to authorize a JVM be monitored by the CET agent, a unique token must be presented and passed as an argument.  Using this unique token provides a way for users to control which JVMs are monitored while preventing other JVMs from being added without the consent of the project's admin.  One can do so by either [creating a new token](https://developer.harness.io/docs/continuous-error-tracking/get-started/onboarding-guide#create-a-token-for-the-error-tracking-agent) or copying an already existing one.




#### I have various types of deployments within my organization.  What kinds of installation services are available to use with the CET agent?

There are various ways one can install and deploy the CET agent to monitor a Java application.  The following are ways one can install the CET agent:
- Standalone installation via tar file and extracting under a desired directory
- Modifying your Docker image to include the CET agent
- Using an init container such as within Kubernetes to automatically install the CET agent at runtime without changing any existing images



#### How can a user verify that the settings such as application name and environment ID are being placed correctly for the CET agent that will be monitoring a specific JVM.

The arguments that need to be added for the CET agent to connect to the appropriate service can be found using the following steps:
- Navigate to the Error Tracking project in question.
- Click on Monitored Services.
- Select the item from the list of monitored services.
- Click on Agent Configuration.

From here, ensure that the arguments to use for the CET agent includes the application name, collector URL, environment ID, token, and deployment name.  This will allow the CET agent to monitor the application successfully.



#### I have added the arguments, but not sure how to attach the CET agent.  How do I attach the CET agent to recognize the arguments I would like to pass to monitor my application?

An agentpath is required to be used so that the JVM knows to use the CET agent to monitor the application.

For example, running a java program called yourapp.jar requires to use the following:

```
java -jar yourapp.jar.
```

Using agentpath and specifying the location of the CET agent will allow the application to be monitored:

```
java -agentpath:/home/user/harness/lib/libETAgent.so -jar yourapp.jar
```

Where `libETAgent.so` is the name of the CET agent being attached to your application.

Remember to include all relevant arguments to ensure your CET agent knows where to send exceptions that are being found.



#### Is there a way to shorten all arguments being used for the CET agent when running my application via command line?

When running via command line, all the parameters can be exported to a variable within an environment such as Linux to shorten what is being displayed on the command line.

For instance, we are running an application that has various arguments:

```
java -agentpath:/opt/harness/lib/libETAgent.so -Dharness.etagent.collector.url=https://collector.et.harness.io/prod1 -Dharness.etagent.application.name=TesterService -Dharness.etagent.deployment.name=1.0 -Dharness.etagent.env.id=TesterPreProd -Dharness.etagent.token=cet_token -cp /opt/harness/lib/rt_sup.jar com.overops.Tester
```

Use an environment variable to move save some of the arguments being used by the JVM.  In this case, we move the CET arguments to a variable (note the single-quotes being used):

```
export CET_ARGS='-agentpath:/opt/harness/lib/libETAgent.so -Dharness.etagent.collector.url=https://collector.et.harness.io/prod1 -Dharness.etagent.application.name=TesterService -Dharness.etagent.deployment.name=1.0 -Dharness.etagent.env.id=TesterPreProd -Dharness.etagent.token=cet_token'
```

Replace the arguments with the newly created variable to shorten your command line entry:

```
java $CET_ARGS -cp /opt/harness/lib/rt_sup.jar com.overops.Tester
```


#### What is the easiest way to verify if my CET agent is connected in case my application has not thrown any exceptions?

The quickest way to verify if the CET agent is connected and monitoring your application is to access the Harness UI to verify if the CET agent is present.

- Navigate to the Error Tracking project in question.
- Expand PROJECT SETUP.
- Select Agents.

This will show agents that are currently running and monitoring the JVM application.



#### I started my application with the CET agent attached.  However, I am not seeing the agent listed in the Harness UI.  Is there a way to see what is occurring when the CET agent tries to start?

The CET agent has its own set of logs that can be referenced for details on what occurs when it is running.  To find them, navigate to `/home/user/.harness/logs`.  The name of the log should have the name `agent.X.log`, where `X` is the PID number of the application the CET agent is trying to monitor.  Find the PID number to locate the correct CET agent log.



#### I checked for CET agent logs, but noticed that they are not appearing within its location (/home/user/.harness/logs).  Is there any way to start the CET agent and view the logs in real time while the application is starting?

The best way to confirm if there are any issues with the CET agent starting when there are no logs being written is to use the parameter -Dharness.etagent.log.to.console.  This argument will allow the logs to bypass being written to its default location and write all logs to the console screen.  This way, if there are any errors appearing on the screen when attempting to attach the CET agent, one can remedy this by taking the necessary actions based on the error being shown.



#### Is there an easy way to test the CET agent to confirm I can connect without utilizing one of my currently running applications?

The CET agent comes included with a test application that can be easily accessed to run and verify that the CET agent can connect to Harness from within your environment.

Run the following command to test the CET agent with our Tester program:

```
java -agentpath:/locationOfCETAgent/harness/lib/libETAgent.so -Dharness.etagent.collector.url=collector_URL -Dharness.etagent.application.name=yourAppName -Dharness.etagent.deployment.name=deploymentNumber -Dharness.etagent.env.id=yourEnvID -Dharness.etagent.token=yourToken -cp /locationOfCETAgent/harness/lib/rt_sup.jar com.overops.Tester
```

Once it has successfully started, you will be presented with the following:

```
Select an option:
1: Throw an exception
2: Write to log
3: Verify Overops Agent
q: Quit
```

Verify that the agent is appearing on the Harness UI.  Once that has been verified, select an option to throw an exception, which is option 1.  Verify that the exception is shown on the Harness UI to confirm that the CET agent is able to successfully find an exception at the time it is thrown.

```
Press Q for quit to end the Tester application.
```



#### My application is being monitored by the CET agent.  Where can I navigate to view the exceptions being thrown by my JVM application?

The CET agent will report exceptions being thrown by the JVM application.  To find these exceptions on the Harness UI, please do the following:
- Navigate to the Error Tracking project in question.
- The Events Summary page should load with all services being monitored.  Click on the name of the monitored service.

A page will appear showing all exceptions that have been collected by the CET agent.




#### How do I upgrade the CET agent on my Linux system?

Upgrading the CET agent on a Linux system is similar to installing the CET agent for the first time.

- Ensure that the CET agent is not actively monitoring any applications.  If so, stop the application with the CET agent attached.
- Download the latest Linux version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz`
- Extract the downloaded file into the same directory where the previous version of the CET agent is installed on.
- Confirm that the CET agent has upgraded by opening the file called VERSION which shows the currently installed version of the CET agent.
- Run the CET agent to confirm it is working after upgrading.




#### How do I upgrade the CET agent on my Alpine system?

Upgrading the CET agent on an Alpine system is similar to installing the CET agent for the first time.

- Ensure that the CET agent is not actively monitoring any applications.  If so, stop the application with the CET agent attached.
- Download the latest Alpine version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/alpine/harness-et-agent.tar.gz`
- Extract the downloaded file into the same directory where the previous version of the CET agent is installed on.
- Confirm that the CET agent has upgraded by opening the file called VERSION which shows the currently installed version of the CET agent.
- Run the CET agent to confirm it is working after upgrading.




#### How do I upgrade the CET agent on my Graviton system?

Upgrading the CET agent on a Graviton system is similar to installing the CET agent for the first time.

- Ensure that the CET agent is not actively monitoring any applications.  If so, stop the application with the CET agent attached.
- Download the latest Graviton version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/arm/harness-et-agent.tar.gz`
- Extract the downloaded file into the same directory where the previous version of the CET agent is installed on.
- Confirm that the CET agent has upgraded by opening the file called VERSION which shows the currently installed version of the CET agent.
- Run the CET agent to confirm it is working after upgrading.




#### How do I upgrade the CET agent on my Windows system?

Upgrading the CET agent on a Windows system is similar to installing the CET agent for the first time.

- Ensure that the CET agent is not actively monitoring any applications.  If so, stop the application with the CET agent attached.
- Download the latest Windows version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/win/harness-et-agent.zip`
- Extract the downloaded file into the same directory where the previous version of the CET agent is installed on.
- Confirm that the CET agent has upgraded by opening the file called VERSION which shows the currently installed version of the CET agent.
- Run the CET agent to confirm it is working after upgrading.




#### How do I upgrade the CET agent on my AIX system?

Upgrading the CET agent on an AIX system is similar to installing the CET agent for the first time.

- Ensure that the CET agent is not actively monitoring any applications.  If so, stop the application with the CET agent attached.
- Download the latest AIX version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/aix/harness-et-agent.tar.gz`
- Extract the downloaded file into the same directory where the previous version of the CET agent is installed on.
- Confirm that the CET agent has upgraded by opening the file called VERSION which shows the currently installed version of the CET agent.
- Run the CET agent to confirm it is working after upgrading.




#### How do I upgrade the CET agent on my Mac system?

Upgrading the CET agent on a Mac system is similar to installing the CET agent for the first time.

- Ensure that the CET agent is not actively monitoring any applications.  If so, stop the application with the CET agent attached.
- Download the latest Mac version of the CET agent using the following link: `https://get.et.harness.io/releases/latest/osx/harness-et-agent.tar.gz`
- Extract the downloaded file into the same directory where the previous version of the CET agent is installed on.
- Confirm that the CET agent has upgraded by opening the file called VERSION which shows the currently installed version of the CET agent.
- Run the CET agent to confirm it is working after upgrading.



#### Is there a way to add the CET agent to a Docker container to monitor my JVM application?

A Dockerfile is the best method to include and download the CET agent into your Docker container.

Add the following line into your Dockerfile to download the CET agent into your Docker container:

```
RUN wget -qO- https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz | tar -xz
```


#### How can the CET agent arguments be added to my Docker container to ensure my application is being monitored?

A Dockerfile is the easiest way to add environment variables to apply certain parameters when monitoring an application in your Docker container.

```
Enter the following parameters as environment variables within your Dockerfile:
ENV ET_COLLECTOR_URL=collector_URL
ENV ET_APPLICATION_NAME=AppName
ENV ET_DEPLOYMENT_NAME=DeploymentVersionNumber
ENV ET_ENV_ID=EnvironmentName
ENV ET_TOKEN=b34*****-****-****-****-***********42a
```

Note: The values can be obtained within your Agent Configurations section of Monitored Services within the CET module.



#### What is the basic template to start with to write a Dockerfile which consists of the CET agent, my CET agent arguments along with the application that needs to be monitored?

The following Dockerfile can be used as a starting basis for the application a user is looking to use to run their application with the CET agent attached to it:

```
FROM openjdk:8-jre
ENV JAVA_TOOL_OPTIONS="-agentpath:/harness/lib/libETAgent.so"
ENV ET_COLLECTOR_URL=collector_URL
ENV ET_APPLICATION_NAME=AppName
ENV ET_DEPLOYMENT_NAME=DeploymentVersionNumber
ENV ET_ENV_ID=EnvironmentName
ENV ET_TOKEN=b34*****-****-****-****-***********42a
RUN wget -qO- https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz | tar -xz
ENTRYPOINT java $JAVA_TOOL_OPTIONS -jar yourapp.jar
```

Note: The values can be obtained within your Agent Configurations section of Monitored Services within the CET module.




#### I have a Kubernetes deployment where I would like to add the CET agent to monitor my application.  How can I add the CET agent without having to add more overhead to my Kubernetes pod running my application?

The CET agent within Kubernetes can be added as a sidecar to your application.  This way, the CET agent will run separate from your application by using a shared volume which is mounted into the target container.

Use the following example as a template to run the CET agent sidecar to monitor your Kubernetes deployment:

```yaml
kind: Deployment
spec:
  template:
    spec:
      volumes:
        - name: et-agent
          emptyDir: {}
      initContainers:
        - name: init-et-agent
          image: harness/et-agent-sidecar
          imagePullPolicy: Always
          volumeMounts:
            - name: et-agent
              mountPath: /opt/harness-et-agent

      containers:
        - name: my-javaapp-container
          image: my-javaapp-image
          env:
            - name: JAVA_TOOL_OPTIONS
              value: "-agentpath:/opt/harness-et-agent/harness/lib/libETAgent.so"
            - name: ET_COLLECTOR_URL
              value: "https://collector.et.harness.io/prod1/"
            - name: ET_APPLICATION_NAME
              value: cetmigrationpoc
            - name: ET_DEPLOYMENT_NAME
              value: 1
            - name: ET_ENV_ID
              value: staging
            - name: ET_TOKEN
              value: b34*****-****-****-****-***********42a
          volumeMounts:
            - name: et-agent
              mountPath: /opt/harness-et-agent
```

Ensure to set the environment variables appropriately based on your Harness CET configuration.



#### Is there a way to setup notifications when the CET agent finds exceptions?

In order to setup notifications, simply navigate to the Monitored Services section for the application in question.
Click on the service you are looking to setup notifications for.
Navigate to the Notifications tab.
Click on New Notification Rule.
Follow the on-screen guide to setup a new notification.



#### How does a user access all the events collected by the CET agent for the application being monitored?

Users can navigate to view all the exceptions found by the CET agent.

Click on the Error Tracking module within Harness.
The Events Summary page will load showing all events for all monitored services found within the date range selected on the top under the Time Period dropdown.
Select the monitored service in question.
This will load all events found for the monitored service.



#### What type of exceptions can be found by the CET agent?

The CET agent will track and find runtime exceptions normally thrown by any Java application.  Event types can be any one of the following:
- Caught Exception - Exceptions captured and handled by the user's service.
- Uncaught Exception - Exceptions that were not captured by the user's service.
- Swallowed Exception - Exceptions that were captured but ignored by the user's service.
- Log Error - Events logged as errors in the user's service.
- Log Warning - Events logged as warnings in the user's service.
- HTTP Error - HTTP communication errors.
- Custom Error - Events that occur in the custom SDK.





#### I see a comprehensive list of different exceptions that have been found, and want to drill down to view the details of one of the exceptions.  How do I navigate to see the details of one of the exceptions found by the CET agent?

From the Event Summary page, click on the monitored service to view all exceptions captured.
Once the list of all exceptions are shown, click on the specific exception you want to view.
The Automated Root Cause (ARC) screen will be shown.  This will be the main screen which will show the details that were captured when the exception occurred.




#### How can a user verify the detail description of where the exception occurred which was captured by the CET agent?

When accessing the Automated Root Cause (ARC) screen from the Harness UI, there are details displayed on the top left of the screen showing the following:
- Name - name of the application monitored by the CET agent
- Msg - error message printed
- Origin - location of the entry point where the exception is thrown
- Server - name of the server where the application is running
- Service - name of the service where the application is running
- Environment - name of the environment where the application is running
- Deployment - deployment version of the application being monitored
- First Seen - details of the first time this exception was seen
- Times - number of times when the exception for this application was thrown

To access this, simply navigate to the Events Summary section of the monitored service, then click on any of the events to access the ARC screen.



#### What are snapshots and how do they work with the exceptions being recorded by the CET agent?

Continuous Error Tracking captures snapshots when events, application errors (exceptions), and logs (warnings and errors) occur according to a defined algorithm.

A Continuous Error Tracking snapshot contains valuable information about events in the monitored application. This includes:

- Date and time of the snapshot
- The server and application where the event occurred
- The deployment where the event was captured
- The full call stack
- The source code



#### There was a small change made in my code that I am monitoring with the CET agent.  How can I force a new snapshot be taken by the CET agent.

Within the Automated Root Cause (ARC) screen, there is an option available to force a snapshot.  This way, if there were any changes made and a new snapshot needs to be taken, users can select this option so that a new snapshot can be taken.



#### Why does the Automated Root Cause (ARC) screen only show my code within the call stack window and not other methods/classes being called?

The ARC screen will only display code written by the user while hiding any third party code not written by the coder.  This provides the user a cleaner view of their stack trace to easily navigate their path through the code.



#### How can we navigate through our code in the Automated Root Cause (ARC) screen to understand where exactly our exception is being thrown?

The ARC screen provides a comprehensive call stack trace, covering the entry point to the method in which the event occurred, even if the source code spans across multiple machines.

Continuous Error Tracking enables tracing of the code and variable state associated with the event all the way back to the initiation point, where the parameters were passed. If the event involves calls across multiple machines, ARC displays a unified call stack.

The call stack displays the chain of methods within the environment leading up to the event. The first method in the line is the last method on a non-third party code within your application.

When an exception is caught and re-thrown once or multiple times within the thread, the Related Errors dropdown displays the error analysis. This feature is available only when such exceptions exist.

While navigation the ARC Screen, select a method in the call stack to see its source code.



#### Is there a way to view and/or capture the full stack trace of the code where the exception was thrown from the Automated Root Cause (ARC) screen?

By default, the third party code is hidden when viewing the decompiled code in the ARC screen.

At the bottom of the call stack in the ARC screen, there are options where you can view where the 3rd party libraries are being used as well as having the option to copy the full stack trace.

Click on the bullet next to Show 3rd party/utility methods to show the full stack trace along with the locations of the third party methods.

To view the full stack trace along with the method details, click on Copy Stack.  This will copy the full stack trace to the clipboard.  Paste the full stack trace in any text editor available.



#### What details are collected in the variable state when the snapshots are recorded by the CET agent and viewed in the Automated Root Cause (ARC) screen?

The Recorded Variables section displays the variable values and objects accessible from the method. It displays all the local variables and parameters including this in the non-static methods. The first method also contains thread-local variables defined for this thread as well as SLF4J and Log4J Mapped Diagnostics Context (MDC) values. The MDC objects are often too large for the full set of data to be available in the log. However, the Error Tracking Agent is capable of capturing and recording the entire object.

In some scenarios, such as asynchronous message passing, the MDC objects contain a key-value map of the recorded requests, initial servlet information, and much more. However, back tracing the source of a bad request in an asynchronous environment is a known challenge. Continuous Error Tracking helps you overcome this challenge by providing extended visibility into MDC.

The choice of the collected variables most relevant within an allocated timeframe is determined by the Error Tracking Agent using an adaptive machine learning algorithm. The selection process is based on which and how many variables to collect, the number of items to collect, the length of string to capture, and so on.

#### What details are collected in the log tab of the Automated Root Cause screen?

The Log tab displays the last 250 log statements leading up to the event. The log statements are collected directly from the JVM/CLR memory. This ensures that the DEBUG, TRACE, and INFO statements are visible even when they are not logged to a file.

In the Log tab, the error or exception lines are displayed first, followed by the stack trace. It also displays the context of the event, by highlighting the beginning of the relevant transaction in which the event occurred.

#### What details are collected in the Agent & Host Environment tab in the Automated Root Cause (ARC) screen?

The Agent & Host Environment tab displays the internal environment state when the event occurred. This includes memory usage (heap and non-heap), basic system information, CPU usage, and so on.

#### Infrastructure and cost-wise, what would be the implications of keeping the pipeline running and polling ServiceNow for an extended period of time? For example, over several weeks.

For the cost implication, as the pipeline is only waiting for an approval step, there will not be any cost implications from the Harness side.

#### How do you check which Harness platform version you are on?

Navigate to account settings, and you will see an option to check Platform Service versions.

