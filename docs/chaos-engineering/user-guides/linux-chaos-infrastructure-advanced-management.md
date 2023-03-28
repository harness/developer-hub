---
title: Linux Chaos Infrastructure Advanced Management
sidebar_position: 8
---

## Advanced Setup
A set of mandatory input flags is required for the installation of the chaos infrastructure, including the `infra-id`, `access-key` and the `server-url`. However, certain aspects of the infrastructure can be tuned via the following flags:
1. **log-directory**: Specifies a custom log directory to store the log files. By default, the logs are stored at `/var/log/linux-chaos-infrastructure`.
2. **task-poll-interval-seconds**: Specifies the interval between subsequent poll queries to the server for a new experiment. The default value for it is **5 seconds**.
3. **task-update-interval-seconds**: Specifies the duration between subsequent status updates of an active fault to the server. The default value for it is **5 seconds**.
4. **result-update-retry-interval-seconds**: Specifies the interval between subsequent retries for updating the result, in case the result updation to the server fails. The default value for it is **5 seconds**.
5. **task-update-retries**: Specifies the maximum number of experiment updation retry count, in case of failure. If the retry count is breached, the active fault will be aborted and the result will be attempted to be sent. The default value for it is **5**.
6. **task-update-retry-interval-seconds**: Specifies the interval between subsequent task updation retries, in case of failure. The default value for it is **5 seconds**.
7. **chaos-infra-liveness-update-interval-seconds**: Specifies the interval between the chaos infrastructure liveness heartbeats. The default value for it is **5 seconds**.
8. **chaos-infra-log-file-max-size-mb**: Specifies the maximum size limit for the chaos infrastructure log file rotation. Upon breaching the size limit, a new log file is created for storing the logs while the older log file is retired as a backup archive. The default value for it is **5 MB**.
9. **chaos-infra-log-file-max-backups**: Specifies the maximum number of backup archives to be retained at any given time. The oldest archive gets deleted first when a new log file is created. The default value for it is **2**.
10. **experiment-log-file-max-age-days**: Specifies the number of days after which the experiment log files will be deleted. The default value for it is **30**.

## Infrastructure Service
Linux chaos infrastructure is installed as an executable binary in your Linux machine, which is managed as a Systemd service.
- The service is started automatically during the system startup.
- If the service stops unexpectedly, it will automatically attempt to restart following a cooldown period of five seconds.
- By default, the service ensures that the chaos infrastructure process is owned by the root user.

To check wether the infrastructure service is active and running or not, you can check it's status using the following command. Any other status than the `active` status would indicate some issue with the infrastructure.
```
systemctl status linux-chaos-infrastructure.service
```
![Terminal](./static/linux-chaos-infrastructure-advanced-management/terminal.png)

## Logs
Logs are generated in the `/var/log/linux-chaos-infrastructure` directory by default. There are two types of logs:
1. **Infrastructure logs:** Infrastructure logs are generated as a result of any infrastructure operation which is not directly related to the execution of an experiment. Examples of such operations include:
    - Start of execution of an experiment
    - End of execution of an experiment
    - Error during creation of an experiment log file
    - Error while querying for an experiment
    - Error while sending experiment status or result, etc.

    By default this log file is located at `/var/log/linux-chaos-infrastructure/linux-chaos-infrastructure.log` and can be used for troubleshooting the infrastructure.

:::info
- The file is rotated based on its size; when the file size is equal to a specified size, it is archived in a separate file bearing the timestamp of rotation suffixed to the filename. By default this value is **5 MB**.
- Eventually the older archives are deleted. The maximum number of most recent archives to retain at any given time can also be specified. By default this value is **2**.
:::

2. **Experiment logs:** Experiment logs are stored in separate files, which are scoped to the faults of the experiment. It contain information about the various steps of execution of that fault, including any error caused during the execution of the fault. The files use the unique fault name as mentioned in the experiment as their filename.

:::info
- These files are rotated based on their age, where files older than a specified number of days are removed. By default this value is **30 days**.
:::
