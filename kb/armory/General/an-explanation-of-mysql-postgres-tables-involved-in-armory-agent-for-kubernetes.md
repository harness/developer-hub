---
title: An Explanation of MySQl/PostGres Tables Involved in Armory Agent for Kubernetes
---


Armory Agent for Kubernetes requires an SQL-based database (MySQL/Postgres).
### Before starting
Please refer to the following instructions before installing the Agent plugin and the Agent:[https://docs.armory.io/armory-enterprise/armory-agent/armory-agent-install/#before-you-begin](https://docs.armory.io/armory-enterprise/armory-agent/armory-agent-install/#before-you-begin) 
For instructions on how to enable an SQL-based database for Clouddriver, please refer to:[https://docs.armory.io/armory-enterprise/armory-admin/clouddriver-sql-configure/](https://docs.armory.io/armory-enterprise/armory-admin/clouddriver-sql-configure/).
### Table Structure
The tables involved with the Armory Agent plugin begin with the name ```kubesvc_%```.  These tables are all necessary for the functionality of Armory Agent.
Below is an example of the tables involved in the Armory Agent operations and the data they contain
```
mysql> show tables like '%kubesvc%';
+-----------------------------------+
| Tables_in_clouddriver (%kubesvc%) |
+-----------------------------------+
| kubesvc_accounts                  |
| kubesvc_assignments               |
| kubesvc_cache                     |
| kubesvc_cache_rel                 |
| kubesvc_ops                       |
| kubesvc_ops_history               |
| kubesvc_resourceversion           |
+-----------------------------------+
```

#### kubesvc_accounts
```kubesvc_accounts``` contains the list of accounts that are onboarded through Agent.
```
mysql> select * from kubesvc_accounts;
+-----------------------------+---------------+---------------------+--------------------------------------------------------------------------+-------------------------------------------------+-----------------------+----------------------------------------------------------------+
| name                        | last_updated  | kube_version        | kube_host                                                                | cert_fingerprint                                | max_watch_age_seconds | props                                                          |
+-----------------------------+---------------+---------------------+--------------------------------------------------------------------------+-------------------------------------------------+-----------------------+----------------------------------------------------------------+
| xxxxx-agent-spinnaker-agent | 1654473329967 | v1.19.16-eks-25803e | https://1CA4B85288B7A199D54ED899B23EB3BC.sk1.us-east-2.eks.amazonaws.com | D8:F2:C9:EF:FC:98:6B:12:A9:AB:99:CC:28:B7:FF:F8 |                300000 | {"permissions":{"READ":["admin-role"],"WRITE":["admin-role"]}} |
+-----------------------------+---------------+---------------------+--------------------------------------------------------------------------+-------------------------------------------------+-----------------------+----------------------------------------------------------------+
1 row in set (0.00 sec)
```
####  
#### kubesvc_assignments
```kubesvc_assignments``` contains the ```account```, ```agent pod id``` and the ```Clouddriver pod``` that that the Agent is registered with along with the current status of the connection
```
mysql> select * from kubesvc_assignments;
+-----+-----------------------------+-----------------------------------+-------------+------------------+----------------------+---------------+-------------------------------+
| id  | account_name                | cd_id                             | connections | caching          | reachable            | last_updated  | agent_id                      |
+-----+-----------------------------+-----------------------------------+-------------+------------------+----------------------+---------------+-------------------------------+
| 359 | xxxxx-agent-spinnaker-agent | spin-clouddriver-66f9ff86b6-729dg |           1 | 0x01             | 0x01                 | 1654473449959 | armory-agent-6cbfdd9fcd-wx62t |
+-----+-----------------------------+-----------------------------------+-------------+------------------+----------------------+---------------+-------------------------------+
```
####  
#### kubesvc_cache
```kubesvc_cache``` contains all the objects that Agents have discovered.  Querying this table would display all discovered objects.  It is advised to query this table with a ```where``` condition to limit the output.
####  
#### kubesvc_cache_rel
```kubesvc_cache_rel``` contains the relations between the discovered objects.
For example:A kubernetes deployment would have a relationship to a ```replicaset``` that would also have a relationship to a pod.  Querying this table would result in all the objects registered, and it is advised to query this table with a ```where``` condition to limit the output.
####  
#### kubesvc_ops
```kubesvc_ops``` contains the status of the live operations before they are moved to ```kubesvc_ops_history``` table.
####  
#### kubesvc_ops_history
```kubesvc_ops_history``` contains the operations history and Clouddriver and the Agents that processed them.  The table contains the data returned as an output when invoking the below endpoint.
```curl -kv http://spin-clouddriver:7002/armory/agent/operations/{opId}```
```
mysql> select * from kubesvc_ops_history where operation_id='01G4V5TH5QSWSR2SZE2VH1SDME';
+----------------------------+------------+------------------+-------------------+---------------+-----------------------------+----------------+-----------------------------------+---------------------+-----------------------------------+----------------------+-------------------------------+--------------------+----------------------------------+-----------------------------------+------------------------------+---------------------------------------+--------------------------------------------+-----------------------------------+-------------------------+
| operation_id               | start_time | end_time         | total_duration_ms | final_outcome | account                     | operation_type | received_by_cd_id                 | received_by_cd_time | processed_by_cd_id                | processed_by_cd_time | sent_to_agent_id              | sent_to_agent_time | res_received_from_agent_agent_id | res_received_from_agent_cd_id     | res_received_from_agent_time | res_received_from_agent_result_status | res_received_from_agent_result_duration_ms | res_received_by_cd_id             | res_received_by_cd_time |
+----------------------------+------------+------------------+-------------------+---------------+-----------------------------+----------------+-----------------------------------+---------------------+-----------------------------------+----------------------+-------------------------------+--------------------+----------------------------------+-----------------------------------+------------------------------+---------------------------------------+--------------------------------------------+-----------------------------------+-------------------------+
| 01G4V5TH5QSWSR2SZE2VH1SDME | 6502796751 | 6502796918404936 |               167 | completed     | gowri-agent-spinnaker-agent | Deploy         | spin-clouddriver-66f9ff86b6-729dg |          6502796751 | spin-clouddriver-66f9ff86b6-729dg |        1654474491122 | armory-agent-6cbfdd9fcd-wx62t |      1654474491136 | armory-agent-6cbfdd9fcd-wx62t    | spin-clouddriver-66f9ff86b6-729dg |                1654474491162 |                                   200 |                                         14 | spin-clouddriver-66f9ff86b6-729dg |           1654474491223 |
+----------------------------+------------+------------------+-------------------+---------------+-----------------------------+----------------+-----------------------------------+---------------------+-----------------------------------+----------------------+-------------------------------+--------------------+----------------------------------+-----------------------------------+------------------------------+---------------------------------------+--------------------------------------------+-----------------------------------+-------------------------+
```
####  
#### kubesvc_resourceversion
```kubesvc_resourceversion``` contains the resource kinds that Agent caches. 
```
mysql> select * from kubesvc_resourceversion limit 5;
+----------------------------------------------------------------------------+-----------------------------+------------------------------------------------+-----------------+---------------+
| id                                                                         | account                     | ns_group_kind                                  | resourceversion | last_updated  |
+----------------------------------------------------------------------------+-----------------------------+------------------------------------------------+-----------------+---------------+
| gowri-agent-spinnaker-agent::apiextensions.k8s.io.CustomResourceDefinition | xxxxx-agent-spinnaker-agent | :apiextensions.k8s.io.CustomResourceDefinition | 478732709       | 1654342418241 |
| gowri-agent-spinnaker-agent::apps.DaemonSet                                | xxxxx-agent-spinnaker-agent | :apps.DaemonSet                                | 478751878       | 1654342985243 |
| gowri-agent-spinnaker-agent::apps.Deployment                               | xxxxx-agent-spinnaker-agent | :apps.Deployment                               | 440962934       | 1654474372920 |
| gowri-agent-spinnaker-agent::apps.ReplicaSet                               | xxxxx-agent-spinnaker-agent | :apps.ReplicaSet                               | 480021810       | 1654473488764 |
| gowri-agent-spinnaker-agent::apps.StatefulSet                              | xxxxx-agent-spinnaker-agent | :apps.StatefulSet                              | 478751878       | 1654342985659 |
+----------------------------------------------------------------------------+-----------------------------+------------------------------------------------+-----------------+---------------+
 ```

