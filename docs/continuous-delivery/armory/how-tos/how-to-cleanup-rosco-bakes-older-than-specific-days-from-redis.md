---
title: How to cleanup Rosco bakes older than specific days from Redis
---

## Introduction
Rosco is configured to use Redis as the backend and does not have support for MySQL yet. Some customers may have requirements to clear the older Rosco bake executions to reclaim space on Redis. At the moment there is no definition within Rosco to trim the Redis entries by default.
To accomplish this task, Armory has created a sample script that would expect the below two parameters to delete the old bakes:
  1. Redis host   2. Count of days beyond which the entries are required to be purged. 
Keys with the pattern bake:aws* and that have an ```idletime ```beyond the days specified in the parameter shall be purged.

## Prerequisites
```redis-cli``` client access with access to the Redis DB in a bash environment

## Instructions
## To Remove Rosco Bake Executions:
1. Create a shell script named ```rosco_purge.sh``` with the below contents on a node that has ```redis-cli``` installed and has network access to the Redis instance
```
#!/bin/bash
​
#################################################################################
#                                                                               #
#                                                                               #
#                        Script to purge redis data                             #
#                                                                               #
#                        (Note: This deletes rosco bakes only)                  #
#                                                                               #
#                                                                               #
#                                                                               #
#################################################################################
​
REDIS_HOST=$1
DAYS=$2
REDIS_PORT=6379
​
if [[ -z $REDIS_HOST ]]; then
{
    echo "Please provide a valid redis host ";
    exit 1
}
else
{
    if [[ -z $DAYS ]]; then
    {
      echo "Please enter the retention days (Data older than the set days shall be deleted)";
      exit 1
     }
 fi
}
fi
echo "Redis Host: $REDIS_HOST"
echo "Redis Port: $REDIS_PORT"
echo "Clearing redis data older than $DAYS days"
redis-cli -h $REDIS_HOST -p $REDIS_PORT keys "bake:aws*" | while read LINE ;
do
val=`redis-cli -h $REDIS_HOST -p $REDIS_PORT object idletime "$LINE"`;
val_days=$((val/86400));
echo "$LINE $val_days days;"
if [ $val -gt $((DAYS * 24 * 60 * 60)) ];
then
  del=`redis-cli -h $REDIS_HOST -p $REDIS_PORT del "$LINE"`;
  echo $del;
  echo "Key $LINE deleted because it was  $val_days days  old";
fi
done;
```

2. Ensure the script is executable. If not make it executable using the below command
```bash> chmod 755 rosco_purge.sh```
3. Execute the script by specifying the Redis host (either DNS or IP address) and the amount of days in the past before the bakes will be purged (e.g. if 30 days is set, then any bakes older than 30 days from now will be purged)
```bash> ./rosco_purge.sh  ```
Example if running the script on the same host where Redis is running, and to delete any bakes older than 90 days
```bash> ./rosco_purge.sh localhost 90```
4. Please note that it is also possible to run the script scheduled as a CRON job to have the data cleaned up after regular interval.

