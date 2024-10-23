---
title: Packet for query is too large - MySQL (max_allowed_packet)
---

## Issue
Upon changing to MySQL, some pipelines fail, or fail to trigger.  Upon investigation, error messages for the issue can be found in a stack trace.  As an example, you will find errors in CloudWatch about the Packet for query is too large such as the one below:
```org.springframework.dao.TransientDataAccessResourceException: jOOQ; SQL [insert into pipelines (id, legacy_id, `partition`, status, application, build_time, start_time, canceled, updated_at, body, config_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on duplicate key update status = ?, body = ?, start_time = ?, canceled = ?, updated_at = ?, config_id = ? -- user: john.smith@abc.com origin: api]; Packet for query is too large (size1 > size2). You can change this value on the server by setting the 'max_allowed_packet' variable.; nested exception is com.mysql.cj.jdbc.exceptions.PacketTooBigException: Packet for query is too large (size 1 > size 2). You can change this value on the server by setting the 'max_allowed_packet' variable.```

## Cause
```max_allowed_packet``` definition is too small to handle the size of the data incoming to the database.  There is a limit that is defined on the database.Here is a further explanation of the setting in MySQL 8 as an example:[https://dev.mysql.com/doc/refman/8.0/en/packet-too-large.html](https://dev.mysql.com/doc/refman/8.0/en/packet-too-large.html)

