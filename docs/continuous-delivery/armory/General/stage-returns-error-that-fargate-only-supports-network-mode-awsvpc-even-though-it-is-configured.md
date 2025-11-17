---
title: Stage Returns Error that Fargate Only Supports Network Mode awsvpc Even Though it is Configured
---

## Issue
When using ECS containers with Fargate, the following error message may occur, even through the stage was set up to use awsvpc.
```Fargate only supports network mode 'awsvpc'. (Service: AmazonECS; Status Code:400; Error Code: ClientException; Request ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)```

## Cause
Both stage and the service definition for the container(s) need to be set up to use awsvpc

