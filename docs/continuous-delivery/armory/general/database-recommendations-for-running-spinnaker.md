---
title: Database recommendations for running spinnaker
---


Services within spinnaker such as Clouddriver, Front50 and Orca can be configured to use databases such as MySQL, PostgreSQL or Redis as their datastore. The databases can be configured by following the steps mentioned on the below docs
* **Clouddriver:** [https://docs.armory.io/docs/armory-admin/clouddriver-sql-configure/](https://docs.armory.io/docs/armory-admin/clouddriver-sql-configure/)* **Orca: **[https://docs.armory.io/docs/armory-admin/orca-sql-configure/](https://docs.armory.io/docs/armory-admin/orca-sql-configure/)* **Front50: **[https://spinnaker.io/docs/setup/productionize/persistence/front50-sql/](https://spinnaker.io/docs/setup/productionize/persistence/front50-sql/) 
The recommendations around using MySQL and Redis for better scalability are outlined below
## MySQL Considerations
  Below is the kind of data persisted by Front50, Orca and Clouddriver in their databases.
* Front50’s database contains pipeline definitions and needs to be properly backed up.
* Orca’s database contains pipeline execution history that is displayed in Spinnaker’s UI.
* Clouddriver’s database contains the infrastructure cache. If lost, it will need to be re-cached which depending on the size of the infrastructure may take a while. 
* If available, use ***cross-region replication*** to ensure durability of the data stored.* Make sure the network latency between Spinnaker and the database cluster is reasonable. It often just means located in the same datacenter region.* Clouddriver, Orca, and Front50 services must each use ***a different database for each service***. The databases can be in different database clusters or in the same one. A single cluster is easier to manage and more cost effective but the number of connections used by ***Spinnaker will be added across all services***.
* The database cluster must support the number of open connections from Spinnaker and any other tools in need. For numbers refer to the database connections chart in the profiles below.

**Service****DB Metric****Description****Value**MySQL DBDatabaseConnections_MaximumActive Database connection in DB (The connection pool value in MySQL is to be scaled as the number of pods increase)50ClouddriverTotal SQL Connection PoolTotal number of connections from the service20Front50Total SQL Connection PoolTotal number of connections from the service10OrcaTotal SQL Connection PoolTotal number of connections from the service10

* Clouddriver connection pools can be tuned via ```sql.connectionPools.cacheWriter.maxPoolSize``` and ```sql.connectionPools.default.maxPoolSize```. Both values default to 20 and need to be increased to handle more tasks per Clouddriver.MySQL v5.7+ is recommended. Below are the sizing requirements if running MySQL or Aurora
* db.r3.large or larger for node size* 2 or more nodes* Span availability zones
* MySQL compatible, v5.7+

The above recommendations are meant for guidance and not considered to be a complete checklist of items for using Spinnaker services with MySQL or Redis.  Depending on a customer's environment and needs, a team may need to implement additional considerations and checks.  
Please also consider cleanup jobs for the MySQL database.  An example would be to look at cron jobs to maintain the [Orca Database for old pipeline executions](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010114).

## Redis Considerations
Most services rely on Redis for lightweight storage and/or task coordination. As the number of applications scale, it is recommended to switch Clouddriver, Orca to MySQL or Postgres databases. 
Redis being single threaded doesn’t need more than one CPU. When available, a managed Redis (like ElastiCache) can be used. A shared Redis can be used for ease of management. It is highly recommended to use an external Redis instance specifically for Dinghy separately. 
Below are the sizing required if redis is hosted on AWS elastic cache.
* 1 Redis Elasticache of size cache.r5.large 
* Number of replicas should be set to 3
* Make sure ```Cluster Mode``` is ```not enabled``` 
* Make sure ```in-transit encryption``` is ```not enabled```
* Manually set the configuration parameter ```notify-keyspace-events``` to ```gxE``` for the redis instance

The above recommendations are meant for guidance and not considered to be a complete checklist of items for using Spinnaker services with MySQL or Redis.  Depending on a customer's environment and needs, a team may need to implement additional considerations and checks.  

