---
title: Continuous Error Tracking (CET) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Error Tracking(CET).
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# FAQ


#### How do I setup the application name of the JVM to be monitored with the CET agent?

There are two ways one can setup the application name within the CET agent:
- For the environment variable, use the parameter ET_APPLICATION_NAME=
- For the JVM argument, use the parameter -Dharness.etagent.application.name=



#### How is the server name applied to the JVM that is being monitored by the CET agent?

There are two ways one can setup the server name within the CET agent:
- For the environment variable, use the parameter ET_SERVER_NAME=
- For the JVM argument, use the parameter -Dharness.etagent.server.name=



#### How does one set the name of the application deployment version currently running on the JVM being monitored by the CET agent?

There are two ways one can setup the deployment name within the CET agent:
- For the environment variable, use the parameter ET_DEPLOYMENT_NAME=
- For the JVM argument, use the parameter -Dharness.etagent.deployment.name=



#### Can the CET agent set a boot time for it to start without delaying the startup of the JVM application?

There are two ways one can setup the boot time within the CET agent:
- For the environment variable, use the parameter ET_BOOT_TIME=
- For the JVM argument, use the parameter -Dharness.etagent.boot.time=



#### How do I connect to the Harness Collector on the SaaS platform?

There are two ways one can connect to the collector from the CET agent:
- For the environment variable, use the parameter ET_COLLECTOR_URL=
- For the JVM argument, use the parameter -Dharness.etagent.collector.url=



#### What is the address of the collector for the CET agent to connect to on the Harness SaaS platform?

There are three different URLs to use depending on which Harness cluster you are connected to.  Select Account Settings on the bottom left and verify the Harness Cluster Hosting Account.

The collector URLs are as follows:
- Prod1: `https://collector.et.harness.io/prod1/`
- Prod2: `https://collector.et.harness.io/gratis/`
- Prod3: `https://collector.et.harness.io/prod3/`




#### How do I setup the environment ID to be used to connect my CET agent to the Harness environment?

There are two ways one can setup the environment to be used to connect the CET agent to the appropriate Harness environment:
- For the environment variable, use the parameter ET_ENV_ID=
- For the JVM argument, use the parameter -Dharness.etagent.env.id=




#### How do I apply the CET token that is created in the CET module via Harness UI to the CET agent?

There are two ways to setup the CET token within the CET agent:
- For the environment variable, use the parameter ET_TOKEN=
- For the JVM argument, use the parameter -Dharness.etagent.token=




#### How do I add the repository connector ID for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository connector ID within the CET agent:
- For the environment variable, use the parameter ET_REPOSITORY_CONNECTOR_ID=
- For the JVM argument, use the parameter -Dharness.etagent.repository.connector.id=




#### How do I add the repository branch for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository branch within the CET agent:
- For the environment variable, use the parameter ET_REPOSITORY_BRANCH=
- For the JVM argument, use the parameter -Dharness.etagent.repository.branch=




#### How do I add the repository commit for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository commit within the CET agent:
- For the environment variable, use the parameter ET_REPOSITORY_COMMIT=
- For the JVM argument, use the parameter -Dharness.etagent.repository.commit=




#### How do I add the repository sources root for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository sources root within the CET agent:
- For the environment variable, use the parameter ET_REPOSITORY_SOURCES_ROOT=
- For the JVM argument, use the parameter -Dharness.etagent.repository.sources.root=




#### How do I update the location of the resources directory to be used by the CET agent?

There are two ways one can update the location of the resources directory within the CET agent:
- For the environment variable, use the parameter ET_RESOURCES_DIR=
- For the JVM argument, use the parameter -Dharness.etagent.resources.dir=



#### How is the size limit configured for the temporary resources directory used by the CET agent?

There are two ways one can setup the size limit (in bytes) for the temporary resources directory within the CET agent:
- For the environment variable, use the parameter ET_RESOURCES_SIZE_LIMIT=
- For the JVM argument, use the parameter -Dharness.etagent.resources.size.limit=



#### How does one configure the heartbeat sent from the CET agent to the collector?

There are two ways one can setup the interval (in seconds) for the keep alive mechanism that sends a heartbeat to the collector from the CET agent:
- For the environment variable, use the parameter ET_COLLECTOR_KEEPALIVE=
- For the JVM argument, use the parameter -Dharness.etagent.collector.keepalive=



#### Can the CET agent set a timeframe how often to send statistical data of the JVM application?

There are two ways one can setup the timeframe (in seconds) to push statistical data to Harness by the CET agent:
- For the environment variable, use the parameter ET_STATS_INTERVAL=
- For the JVM argument, use the parameter -Dharness.etagent.stats.interval=




#### How do I increase the amount of information collected for each snapshot by the CET agent?

There are two ways one can increase the cart factor to increase the amount of data collected by the CET agent (valid values are between 0.1-4):
- For the environment variable, use the parameter ET_CART_FACTOR=
- For the JVM argument, use the parameter -Dharness.etagent.cart.factor=




#### How does the cart factor impact the amount of information gathered for each snapshot by the CET agent?

The amount of data collected during snapshot is determined by an internal algorithm called the cart.

The valid values vary between: 0.1-4 (including decimals to one decimal place). A cart factor of 2 records twice as much as a normal hit. A cart factor of 0.5 records half as much as a normal hit.
Note that larger snapshots may result in larger overhead. A larger cart factor is trading more overhead for more information. This does not affect the number of snapshots taken or levels deep into the heap.




#### How do I configure the CET agent to capture snapshot data of a transaction which has introduced slowness related to automatic timers?

There are two ways one can configure the CET agent to capture snapshot data of the transaction that has introduced slowness:
- For the environment variable, use the parameter ET_PARALLAX
- For the JVM argument, use the parameter -Dharness.etagent.parallax




#### How does the CET agent automatically detect slowdowns and identify possible root causes for each one of the exceptions that are found?

The CET micro-agent periodically collects statistics of each transaction, once our micro-agent encounters an entry point. The Harness backend service collects this data, calculates the threshold for this entry point (based on a standard deviation calculation from the method’s average running time) and relay it back to the micro-agent.

When this timer feature is enabled, the micro-agent will take a snapshot of the slowdown event once the transaction running time is taking longer than the calculated threshold. The agent will do so while looking for the most significant methods using CET heuristics search algorithm, so we can get a deeper stack trace, with more relevant data for you to help you analyze where the most running time was spent.

In order to get the proper snapshot data of the transaction which has introduced the slowness, you need to enable the following runtime flag when you run the agent with your application:
-Dharness.etagent.parallax




#### Why does my CET agent not work after upgrading my JRE from Java 8 to Java 11?

When attaching a CET agent to a JVM that is running Java 10, 11, 16, or 17, ensure to use the following Java parameters:
Turn off Class Sharing: This can be done using the following flags:
 for IBM Java
  -Xshareclasses:none
 for HotSpot
  -Xshare:off -XX:-UseTypeSpeculation

Increase ReservedCodeCache to at least 512mb by adding the following flag:
-XX:ReservedCodeCacheSize=512m

The Agent should appear last in the VM arguments list before specifying the main class or jar.

When adding/removing 3rd party packages, the Agent should be restarted.




#### How do I configure which logging framework from the CET default list will be instrumented?

There are two ways one can setup the CET agent to instrument specific logging frameworks if all frameworks are not to be used:
- For the environment variable, use the parameter ET_SUPPORT_LOGGER_FRAMEWORKS=
- For the JVM argument, use the parameter -Dharness.etagent.logger.frameworks=




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

The parameter -Dharness.etagent.logger.frameworks can take more than one framework using the : (colon) separator. If the frameworks are invalid, none will be used.
Example: -Dharness.etagent.logger.frameworks=logback:log4j:tinylog




#### How do I control the minimum log level recorded in the log view of the CET agent?

There are two ways to configure the log level on the CET agent:
- For the environment variable, use the parameter ET_CEREBRO_MIN_LOG_LEVEL=
- For the JVM argument, use the parameter -Dharness.etagent.cerebro.min.log.level=

Possible values include:
LOG_LEVEL_TRACE
LOG_LEVEL_DEBUG
LOG_LEVEL_INFO
LOG_LEVEL_WARN
LOG_LEVEL_ERROR




#### How do I add the repository connector ID for my JVM to be used for Source Attach on my monitored application through CET?

There are two ways to setup the CET repository connector ID within the CET agent:
- For the environment variable, use the parameter ET_CEREBRO_MESSAGE_MAX_LENGTH=
- For the JVM argument, use the parameter -Dharness.etagent.cerebro.message.max.length=




#### How can I adjust the depth of the heap allowing the CET agent to capture variables?

There are two ways to setup the CET repository branch within the CET agent:
- For the environment variable, use the parameter ET_MAX_DEPTH=
- For the JVM argument, use the parameter -Dharness.etagent.max.depth=

The default value is set to 5.  It may accelerate reaching the cart limit, resulting in displaying less data in other methods in a snapshot.




#### How can I set the CET agent to record the maximum number of frames collected in a snapshot?

There are two ways to setup the maximum number of frames collected in a snapshot within the CET agent:
- For the environment variable, use the parameter ET_MAX_STACK_DEPTH=
- For the JVM argument, use the parameter -Dharness.etagent.max.stack.depth=

The default value is set to 2000.




#### How can I set the CET agent to collect the maximum length of a recorded string variable?

There are two ways to setup the CET agent to collect a maximum length of a recorded string variable:
- For the environment variable, use the parameter ET_MAX_STRING_LENGTH=
- For the JVM argument, use the parameter -Dharness.etagent.max.string.length=

The default value is set to 300.




#### How can I set the CET agent to collect the maximum number of captured array elements in a snapshot?

There are two ways to setup the CET agent to collect a maximum number of captured array elements in a snapshot:
- For the environment variable, use the parameter ET_MAX_ARRAY_LENGTH=
- For the JVM argument, use the parameter -Dharness.etagent.max.array.length=

The default value is set to 25.




#### How can I limit the size of the string that the CET agent captures?

There are two ways to limit the size of the string that the CET agent captures:
- For the environment variable, use the parameter ET_MAX_STRING_ENCODING_SIZE=
- For the JVM argument, use the parameter -Dharness.etagent.max.string.encoding_size=

The default value is set to 300.




#### How can I limit the size of the array that the CET agent captures?

There are two ways to limit the size of the array that the CET agent captures:
- For the environment variable, use the parameter ET_MAX_ARRAY_ENCODING_SIZE=
- For the JVM argument, use the parameter -Dharness.etagent.max.array.encoding_size=

The default value is set to 25.




#### Is there a way to set the CET agent to only provide one snapshot per event for the currently running JVM being monitored?

There are two ways to allow the CET agent to only evacuate one snapshot per event for the entire lifetime of the JVM:
- For the environment variable, use the parameter ET_ONE_HIT_REQ=
- For the JVM argument, use the parameter -Dharness.etagent.one.hit.req=

The default value is set to false.




#### Is there a way to set the maximum number of snapshots to be recorded simultaneously by the CET agent?

There are two ways to limit the maximum number of snapshots the CET agent can collect simultaneously:
- For the environment variable, use the parameter ET_CONCURRENCY_LEVEL=
- For the JVM argument, use the parameter -Dharness.etagent.concurrency_level=

The default value is set to 5.  The range that can be used is between 1-5.




#### How can I set the period of time the CET agent waits before shutting down?

There are two ways to set the period of tie the CET agent waits before shutting down to allow the last asynchronous messages to be sent to Harness:
- For the environment variable, use the parameter ET_SHUTDOWN_GRACETIME=
- For the JVM argument, use the parameter -Dharness.etagent.shutdown.gracetime=

The default value is set to 0 (not enabled).




#### How can I set the CET agent to exclude a method to optimize its use? 

There are two ways to set the CET agent to exclude a method to optimize its use:
- For the environment variable, use the parameter ET_OPTIMIZE_METHODS=
- For the JVM argument, use the parameter -Dharness.etagent.optimize.methods=

Example: -Dharness.etagent.optimize.methods=com.company.Class1:method1|com.company.Class2:method2




#### What is the significance of using the ET_OPTIMIZE_METHODS parameter with the CET agent?

ET_OPTIMIZE_METHODS excludes a method during code throttling. In some cases, 3rd-party code is responsible for a significant part of the Micro-Agent’s overhead. Excluding it specifically from exception handling significantly reduces overhead.

NOTE: This action does not ignore the method completely. It is efficient only where the CET Micro-Agent is creating a significant overhead.

Example: -Dharness.etagent.optimize.methods=com.company.Class1:method1|com.company.Class2:method2




#### How can I set the CET agent to exclude a package to optimize its use? 

There are two ways to set the CET agent to exclude a package to optimize its use:
- For the environment variable, use the parameter ET_OPTIMIZE_PACKAGES=
- For the JVM argument, use the parameter -Dharness.etagent.optimize.packages=

Example: -Dharness.etagent.optimize.packages=com.company.package1|com.company.package2




#### What is the significance of using the ET_OPTIMIZE_PACKAGES parameter with the CET agent?

ET_OPTIMIZE_PACKAGES excludes a package during code throttling. 3rd-party code potentially increases overhead on the Micro-Agent. Excluding it specifically from exception handling significantly reduces overhead.

NOTE: This action does not ignore the package completely. It is efficient only where the OverOps Micro-Agent is creating a significant overhead.

Example: -Dharness.etagent.optimize.packages=com.company.package1|com.company.package2




#### Is there a way to disable the CET agent from collecting details of the JVM during startup?

There are two ways to disable the CET agent from collecting details of the JVM during start up:
- For the environment variable, use the parameter ET_DISABLE_EXCEPTION_HANDLING_TIME=
- For the JVM argument, use the parameter -Dharness.disable.exception.handling.time=

Example: -Dharness.disable.exception.handling.time=10m




#### How exactly does the ET_DISABLE_EXCEPTION_HANDLING_TIME parameter help with the startup of the JVM?

Using the ET_DISABLE_EXCEPTION_HANDLING_TIME parameter, the CET agent configures a time frame during JVM startup in which the Micro-Agent does not collect any information (snapshots or statistics) or perform any instrumentation. Callback is triggered, but the CET Micro-Agent will return immediately on every call. This increases boot times slowed down by the CET Micro-Agent.

Example: -Dharness.disable.exception.handling.time=10m




#### How can the CET agent prevent from instrumenting a method being called multiple times in a stack?

There are two ways to disable the CET agent from collecting details of the JVM during start up:
- For the environment variable, use the parameter ET_NO_RECURSIVE_CONTEXT
- For the JVM argument, use the parameter -Dharness.no.recursive.context




#### What is the significance of using the ET_NO_RECURSIVE_CONTEXT parameter with the CET agent?

The CET Micro-Agent uses the ET_NO_RECURSIVE_CONTEXT parameter to disable instrumention of methods being called multiple times per call stack.  In certain applications, some methods are repeatedly called in the same call stack. This causes significant CPU overhead and using this flag prevents this.




#### How can the CET agent prevent from collecting variable data from snapshots?

There are two ways to exclude the CET agent from collecting variable data from snapshots:
- For the environment variable, use the parameter ET_NO_LOCALS
- For the JVM argument, use the parameter -Dharness.no.locals




#### What is the significance of using the ET_NO_LOCALS parameter within the CET agent?

The ET_NO_LOCALS parameter excludes the variable state from the snapshots to reduce overhead for diagnostics purposes. This flag turns off the CET Micro-Agent’s JVMTI capability to extract local variable data during snapshot encoding causing significant overhead.




#### Is there a way to prevent the CET agent from displaying exceptions?

There are two ways to prevent the CET agent from displaying exceptions:
- For the environment variable, use the parameter ET_NO_EX_CALLBACK
- For the JVM argument, use the parameter -Dharness.no.ex.callback




#### When would it be beneficial to use the ET_NO_EX_CALLBACK parameter for the CET agent?

Using the ET_NO_EX_CALLBACK parameter for the CET agent turns off its registration to the JVMTI exception callback, which causes severe overhead in the JVM. When set, no exceptions are displayed. This is intended for diagnostics purposes only.




#### Is there a way to turn off the CET agent's callback capability on exceptions?

There are two ways to turn off the CET agent's callback capability on exceptions:
- For the environment variable, use the parameter ET_NO_EX
- For the JVM argument, use the parameter -Dharness.no.ex




#### When would it be beneficial to use the ET_NO_EX parameter for the CET agent?

Using the ET_NO_EX parameter for the CET agent turns off its JVMTI exception callback capability that causes severe overhead in the JVM. When set, callback is triggered but returned immediately. This is intended for diagnostics purposes only.




#### How does the CET agent disable instrumentation of logged errors and logged warnings as events?

There are two ways to disable the CET agent's instrumentation of logged errors and logged warnings as events:
- For the environment variable, use the parameter ET_NO_XMEN
- For the JVM argument, use the parameter -Dharness.no.xmen




#### How does the CET agent disable instrumentation of cross-machine tale stitching for rare synchronized HTTP requests?

There are two ways to disable the CET agent's instrumentation of cross-machine tale stitching for rare synchronized HTTP requests:
- For the environment variable, use the parameter ET_NO_CYDER
- For the JVM argument, use the parameter -Dharness.no.cyder




#### How does the CET agent disable instrumentation and extraction of deployment names from servlet contexts?

There are two ways to disable the CET agent's instrumentation and extraction of deployment names from servlet contexts:
- For the environment variable, use the parameter ET_NO_ROBINHOOD
- For the JVM argument, use the parameter -Dharness.no.robinhood




#### How does the CET agent disable instrumentation and tracking of HTTP errors?

There are two ways to disable the CET agent's instrumentation and tracking of HTTP errors:
- For the environment variable, use the parameter ET_NO_ROCKY
- For the JVM argument, use the parameter -Dharness.no.rocky




#### How does the CET agent disable handling to differentiate between catch clauses and finally clauses?

There are two ways to disable the CET agent's handling to differentiate between catch clauses and finally clauses:
- For the environment variable, use the parameter ET_NO_FIN
- For the JVM argument, use the parameter -Dharness.no.fin

Note: Disabling this flag may cause inaccurate ‘catch frame’ and ‘catch line’ designation.




#### Is there a way to prevent the CET agent from collecting less data within snapshots?

There are two ways to prevent the CET agent from collecting less data within snapshots:
- For the environment variable, use the parameter ET_NO_RICH_HITS
- For the JVM argument, use the parameter -Dharness.no.rich.hits




#### What is the significance of utilizing the ET_NO_RICH_HITS parameter for the CET agent?

Rich hits are snapshots that contain significantly more data than standard snapshots. Encoding rich hits increases overhead.  The ET_NO_RICH_HITS flag turns this feature off.




#### How does the CET agent disable log statement capture for the log view?

There are two ways to disable the CET agent's log statement capture for the log view:
- For the environment variable, use the parameter ET_NO_CEREBRO
- For the JVM argument, use the parameter -Dharness.no.cerebro




#### What is the significance of utilizing the ET_NO_CEREBRO parameter for the CET agent?

Using the ET_NO_CEREBRO paramter for the CET Micro-Agent disables log statement capture for the log view. It potentially provides significant performance benefits. Log capture can affect Garbage Collection when logs are dense. This does not affect recording of logged errors and logged warnings as events.




#### Is there a way to disable all instrumentation of any bytecode with the CET agent?

There are two ways to disable all instrumentation of any bytecode with the CET agent:
- For the environment variable, use the parameter ET_NO_TREX
- For the JVM argument, use the parameter -Dharness.no.trex




#### What happens when the ET_NO_TREX parameter is used when attempting to disable instrumentation of any bytecode?

The ET_NO_TREX parameter is used with the CET Micro-Agent to disable all instrumentation across the board. This, in essence, invalidates CET (error rates, timers, etc), but can be used to diagnose performance issues resulting from bytecode instrumentation.




#### Is there a way to disable instrumentation and collection of event statistics with the CET agent?

There are two ways to disable instrumentation and collection of event statistics with the CET agent:
- For the environment variable, use the parameter ET_NO_REQ_INV
- For the JVM argument, use the parameter -Dharness.no.req.inv




#### What is to be expected when using the ET_NO_REQ_INV parameter with the CET agent?

The ET_NO_REQ_INV parameter of the CET Micro-Agent disables instrumentation and collection of event statistics. Snapshots are still taken, but the Dashboard will not have any statistics for events, nor will statistics be sent to StatsD.




#### Is there a way to disable instrumentation and collection of JVM view information with the CET agent?

There are two ways to disable instrumentation and collection of JVM view information with the CET agent:
- For the environment variable, use the parameter ET_NO_OVERMIND
- For the JVM argument, use the parameter -Dharness.no.overmind




#### Is there a way for the CET agent to disable the machine code throttling mechanism?

There are two ways for the CET agent to disable the machine code throttling mechanism:
- For the environment variable, use the parameter ET_NO_TF
- For the JVM argument, use the parameter -Dharness.no.tf

Note: Using this flag significantly decreases performance, but may be necessary for diagnostics.




#### Is there a way for the CET agent to disable the auxiliary mechanisms for cleanup that involves some bytecode instrumentation?

There are two ways for the CET agent to disable the machine code throttling mechanism:
- For the environment variable, use the parameter ET_NO_TFA
- For the JVM argument, use the parameter -Dharness.no.tfa

Note: This is to be used for diagnostics purposes only.




#### Is there a way for the CET agent to disable instrumentation and injection of log links into throwable messages?

There are two ways for the CET agent to disable instrumentation and injection of log links into throwable messages:
- For the environment variable, use the parameter ET_NO_ETL
- For the JVM argument, use the parameter -Dharness.no.etl

Note: This does not affect injection of log links into logging statements. Exception Tiny Links are disabled by default.




#### Is there a way for the CET agent to enable instrumentation and injection of log links into throwable messages?

There are two ways for the CET agent to disable instrumentation and injection of log links into throwable messages:
- For the environment variable, use the parameter ET_ETL
- For the JVM argument, use the parameter -Dharness.etl

Note: This does not affect injection of log links into logging statements. Currently, ETL is disabled by default and this flag is required to turn it on.




#### When would the CET agent need to have ETL enabled?

The CET Micro-Agent by default has ETL disabled.  This feature enables instrumentation and injecting of log links into throwable messages.  It must have the ET_ETL parameter to turn this flag on.

For JVM arguments, you simply specify the flag - no value is required.




#### How does the CET agent disable timers?

There are two ways to disable timers with the CET agent:
- For the environment variable, use the parameter ET_NO_CHRONOS
- For the JVM argument, use the parameter -Dharness.no.chronos




#### How does the CET agent disable instrumentation and collection of entry point information?

There are two ways the CET agent disables instrumentation and collection of entry point information:
- For the environment variable, use the parameter ET_NO_CONTEXTS
- For the JVM argument, use the parameter -Dharness.no.contexts

Note: When this flag is disabled, the Entry Points column on the Dashboard only displays the method which threw the event.




#### How does the CET agent disable any bytecode instrumentation to classes that include a special bytecode instruction called invoke dynamic?

There are two ways to disable any bytecode instrumentation to classes that include a special bytecode instruction called invoke dynamic with the CET agent:
- For the environment variable, use the parameter ET_NO_INDY_REX
- For the JVM argument, use the parameter -Dharness.no.indy.rex




#### How does the CET agent disable injection of log links into log statements?

There are two ways to disable injection of log links into log statements with the CET agent:
- For the environment variable, use the parameter ET_NO_XTL
- For the JVM argument, use the parameter -Dharness.no.xtl

Note: This does not affect the collection of logged warnings/errors as events, or the injection of log links into throwable messages.




#### How does the CET agent disable displaying log links for all events?

There are two ways to disable displaying log links for all events with the CET agent:
- For the environment variable, use the parameter ET_NO_MEMENTO
- For the JVM argument, use the parameter -Dharness.no.memento

Note: This flag disables displaying log links for all events, even when no specific snapshot was taken for that instance, and the log link points to the most recent snapshot available.




#### How does the CET agent disable log capture optimizations?

There are two ways to disable log capture optimizations with the CET agent:
- For the environment variable, use the parameter ET_NO_LF
- For the JVM argument, use the parameter -Dharness.no.lf

Note: This flag stops the throttler on the Micro-Agent callbacks to logged errors/warnings.




#### Is there a way to disable all dynamic class instrumentation with the CET agent?

There are two ways to disable all dynamic class instrumentation with the CET agent:
- For the environment variable, use the parameter ET_NO_DYNAMIC_INST
- For the JVM argument, use the parameter -Dharness.no.dynamic.inst




#### When using the ET_NO_DYNAMIC_INST parameter with the CET agent, what instrumentation is being disabled?

The CET Micro-Agent uses the ET_NO_DYNAMIC_INST parameter to disable all dynamic class instrumentation:

- Disables a complementary mechanism needed for optimizations to make sure we evacuate snapshots properly in JIT compiled mode. This issue could be seen in rare edge cases. (no Salinger)
- Disables our timer mechanisms (Chronos & Parallax)
- Logged error and warning small performance optimization
- Metrics such as the Error Rate will not show.




#### Does using the ET_NO_DYNAMIC_INST flag eliminate the use of other parameters with the CET agent?

Using this parameters equats to using all of the following flags within the CET Micro-Agent:
-Dtakipi.no.req.inv
-Dtakipi.no.contexts
-Dtakipi.no.lf
-Dtakipi.no.tfa
-Dtakipi.no.chronos

There will not be the need of using any of the flags above if utilizing a flag to disable all dynamic class instrumentation.




#### Is there a way to disable a group of performance-related features with the CET agent?

There are two ways to disable a group of performance-related features with the CET agent:
- For the environment variable, use the parameter ET_OPTIMIZED_MODE
- For the JVM argument, use the parameter -Dharness.optimized.mode




#### What parameters does the ET_OPTIMIZED_MODE flag within the CET agent replace?

The ET_OPTIMIZED_MODE flag within the CET agent replaces the following parameters:
-Dtakipi.no.xmen
-Dtakipi.no.req.inv
-Dtakipi.no.contexts
-Dtakipi.no.fin
-Dtakipi.concurrency.level=1

Using the ET_OPTIMIZED_MODE parameter disables these performance-related features to determine what is causing performance issues.




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

Example: -Dharness.log.file=<path/to/file.log>




#### When would it be beneficial to use the parameter ET_LOG_FILE with the CET agent?

The ET_LOG_FILE paramter within the CET agent helps in the event the agent logs are not being sent to Harness.  This solves communication issues between the CET Micro-Agent and Harness.

Note: The log file must be in an existing path.




#### How does the CET agent print debug log statements to the standard output?

There are two ways the CET agent prints debug log statements to the standard output:
- For the environment variable, use the parameter ET_SILENT
- For the JVM argument, use the parameter -Dharness.silent

Example: -Dharness.silent=false




#### Does the CET agent provide a way to change the base URL for tinylinks?

There are two ways the CET agent allows a change to the base URL for tinylinks:
- For the environment variable, use the parameter ET_SHORT_URL_PREFIX
- For the JVM argument, use the parameter -Dharness.short.url.prefix

Example: -Dharness.short.url.prefix=https://MYSERVER_URL/tkp.to

