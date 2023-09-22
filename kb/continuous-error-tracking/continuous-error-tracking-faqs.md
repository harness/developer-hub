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
- Prod1: https://collector.et.harness.io/prod1/
- Prod2: https://collector.et.harness.io/gratis/ 
- Prod3: https://collector.et.harness.io/prod3/




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






