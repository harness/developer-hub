---
title: How to change log level in Java SDK
sidebar_label: How to change log level in Java SDK
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360028455332-Java-SDK-how-to-change-log-level </button>
</p>

## Question
When integrating Split Java SDK into a framework that uses Log4J, the SDK start logging lot of debugging lines, is it possible to change log level?

## Answer
Split Java SDK will pick up the log4j.properties file used for the Java application.
To change the log level to error, add the following line to log4j.properties
```
log4j.logger.split.org.apache = ERROR
log4j.logger.io.split = ERROR
```