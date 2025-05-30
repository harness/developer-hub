---
title: Customize delegate logging
description: This topic describes how to customize delegate logging.
sidebar_position: 8
---

The delegate automatically creates a new log daily, named `delegate.log`. You can customize delegate logging if the default setup doesn't fit your needs. For example, you can customize the layout, verbosity, and destination of the messages.

To create customized delegate logging for Kubernetes and Docker delegates, you can provide a custom `logback.xml` file to the delegate. You can accomplish this by mounting the file inside the delegate container or building it in your custom container. Then, update the delegate `JAVA_OPTS` with the logback option for the custom path to the configuration. This will enable you to customize the logging behavior of the delegate according to your specific needs.

For more information on default delegate logs, go to [Delegate logs](/docs/platform/delegates/delegate-concepts/delegate-overview#delegate-logs).

:::info
You can configure Kubernetes and Docker delegates in various ways. Below is an example Kubernetes delegate configuration.

:::

Let's look at an example Kubernetes delegate configuration.

To create a custom custom delegate log, do the following:

1. Create a ConfigMap containing your custom `logback.xml` file.

   ```
   # This creates a new ConfigMap named custom-logback in a harness-delegate-ng namespace
   kubectl create configmap custom-logback -n harness-delegate-ng --from-file=custom-logback.xml
   ```

2. Update your `delegate.yaml` file to mount the new ConfigMap.

   ```yaml
        volumeMounts:
        - name: config-volume
          mountPath: /opt/harness-delegate/logback/
      volumes:
      - name: config-volume
        configMap:
          name: custom-logback
          items:
          - key: custom-logback.xml
            path: custom-logback.xml
   ```

3. Update your `delegate.yaml` file with your new `JAVA_OPTS` value.

   ```yaml
        - name: JAVA_OPTS
          value: "-Dlogback.configurationFile=/opt/harness-delegate/logback/custom-logback.xml"

   ```

### Default logging configuration

Here is the default logging configuration for the Harness Delegate.

:::info
The following configurations were added by Harness to the default Logback XML.

- `io.harness.logging.ExpiringDuplicateMessageFilter`

- `io.harness.logging.remote.RemoteStackdriverLogAppender`

:::

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <turboFilter class="io.harness.logging.ExpiringDuplicateMessageFilter">
        <allowedRepetitions>0</allowedRepetitions>
        <cacheSize>300</cacheSize>
        <expireAfterWriteSeconds>3600</expireAfterWriteSeconds>
        <includeMarkers>THROTTLED</includeMarkers>
    </turboFilter>

    <statusListener class="ch.qos.logback.core.status.NopStatusListener"/>

    <conversionRule conversionWord="version" converterClass="io.harness.logging.VersionConverter"/>
    <conversionRule conversionWord="process_id" converterClass="io.harness.logging.ProcessIdConverter"/>

    <appender name="file" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>delegate.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- daily rollover -->
            <fileNamePattern>delegate.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <!-- or whenever the file size reaches 50MB -->
            <maxFileSize>50MB</maxFileSize>
            <!-- keep 10 days' worth of history capped at 1GB total size -->
            <maxHistory>10</maxHistory>
            <totalSizeCap>1GB</totalSizeCap>
        </rollingPolicy>

        <withJansi>true</withJansi>

        <encoder>
            <pattern>%date{ISO8601} [%version] %process_id [%thread] %-5level %logger - %msg %replace(%mdc){'(.+)', '[$1]'} %n</pattern>
        </encoder>
    </appender>

    <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <withJansi>true</withJansi>
        <encoder>
            <pattern>%date{ISO8601} [%thread] %-5level %logger - %msg %replace(%mdc){'(.+)', '[$1]'} %n</pattern>
        </encoder>
    </appender>

    <if condition='isNull("STACK_DRIVER_LOGGING_ENABLED") || property("STACK_DRIVER_LOGGING_ENABLED").equalsIgnoreCase("true")'>
        <then>
            <appender name="REST2" class="io.harness.logging.remote.RemoteStackdriverLogAppender">
                <threshold>TRACE</threshold>
                <managerHost>${MANAGER_HOST_AND_PORT}</managerHost>
                <accountId>${ACCOUNT_ID}</accountId>
                <clientCertPath>${DELEGATE_CLIENT_CERTIFICATE_PATH:- }</clientCertPath>
                <clientCertKey>${DELEGATE_CLIENT_CERTIFICATE_KEY_PATH:- }</clientCertKey>
                <trustAllCerts>${TRUST_ALL_CERTIFICATES:-false}</trustAllCerts>
                <delegateToken>${DELEGATE_TOKEN:-${ACCOUNT_SECRET}}</delegateToken>
                <appName>delegate</appName>
            </appender>
        </then>
    </if>

    <logger name="software.wings" level="${LOGGING_LEVEL:-INFO}"/>
    <logger name="org.zeroturnaround" level="WARN"/>
    <logger name="io.harness.pcf" level="${LOGGING_LEVEL_PCF:-INFO}"/>
    <logger name="io.harness.event.client.impl" level="${LOGGING_LEVEL_EVENT_CLIENT:-INFO}"/>
    <logger name="io.github.resilience4j" level="WARN"/>
    <logger name="io.kubernetes.client.informer.cache.ReflectorRunnable" level="${KUBE_WATCH_LEVEL:-OFF}"/>
    <logger name="io.fabric8.kubernetes.client.Config" level="CRITICAL"/>
    <logger name="org.yaml.snakeyaml.introspector" level="ERROR"/>
    <root level="${LOGGING_LEVEL:-INFO}">
        <appender-ref ref="file"/>
        <appender-ref ref="REST2"/>
        <appender-ref ref="stdout"/>
    </root>

</configuration>
```
