---
title: MySQL Table Name Change Error When Rolling Back Spinnaker (Undo Renamed Values)
---

## Issue
Rolling back Spinnaker versions causes pods to continually have errors in the logs, including the following first example for Front50 (example is rolling back from 2.19.x to 2.18.x
````
2020-06-22 21:52:27.001  INFO 1 --- [           main] .s.f.m.p.DefaultPluginArtifactRepository : Warming Cache
2020-06-22 21:52:27.723 ERROR 1 --- [           main] .s.f.m.p.DefaultPluginArtifactRepository : Unable to warm cache: {}

org.springframework.jdbc.BadSqlGrammarException: jOOQ; bad SQL grammar [select max(last_modified_at) as `last_modified_at` from plugin_artifacts]; nested exception is java.sql.SQLSyntaxErrorException: Table 'front50_kinnon.plugin_artifacts' doesn't exist
	at org.jooq_3.12.3.MYSQL.debug(Unknown Source) ~[na:na]
	at org.springframework.jdbc.support.SQLExceptionSubclassTranslator.doTranslate(SQLExceptionSubclassTranslator.java:93) ~[spring-jdbc-5.1.14.RELEASE.jar:5.1.14.RELEASE]
````

## Cause
When upgrading, the values change, and when reverting, the values do not change back to the old values, thus errors will occur accessing the database.Example from 2.18.x to 2.19.x, ```plugin_artifacts``` table does get renamed to ```plugin_info``` and does not revert back when downgrading. 

