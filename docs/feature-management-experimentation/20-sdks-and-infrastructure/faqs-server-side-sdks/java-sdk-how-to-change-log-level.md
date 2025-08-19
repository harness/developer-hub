---
title: Java SDK how to change log level
sidebar_label: Java SDK how to change log level
sidebar_position: 11
---

## Question
When integrating Java SDK into a framework that uses Log4J, the SDK start logging lot of debugging lines, is it possible to change log level?

## Answer
Java SDK will pick up the log4j.properties file used for the Java application.
To change the log level to error, add the following line to log4j.properties
```
log4j.logger.split.org.apache = ERROR
log4j.logger.io.split = ERROR
```