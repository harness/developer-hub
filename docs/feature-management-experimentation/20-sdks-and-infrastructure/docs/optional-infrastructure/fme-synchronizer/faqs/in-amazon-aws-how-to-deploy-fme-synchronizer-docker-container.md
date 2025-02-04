---
title: In Amazon AWS, how to deploy Split Synchronizer Docker container?
sidebar_label: In Amazon AWS, how to deploy Split Synchronizer Docker container?
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360028793291-How-to-deploy-Synchronizer-Docker-container-in-Amazon-AWS </button>
</p>

## Question

How to deploy Synchronizer Docker container in AWS ECS service

## Answer

Follow the steps below to deploy Synchronizer container in AWS ECS:

1. First we need to create a repository in AWS ECR and push the docker image

![](https://help.split.io/hc/article_attachments/360037885532)

2. Provide a name for your new repository

![](https://help.split.io/hc/article_attachments/4411390397453)

3. Once the repository is created, we are ready to push the docker image, go back to repositories list to grab your repository unique URL, we use it later.

![](https://help.split.io/hc/article_attachments/360037887352)

4. Open a terminal or command line window, make sure you have AWS CLI installed and run the following command to login. If the command failed, please check AWS help pages.
```
$(aws ecr get-login --no-include-email --region us-east-2)
```

5. Make sure you have Docker installed, then download the Split Synchronizer Docker image locally:
```
docker pull splitsoftware/split-synchronizer
```

6. Run the command below to get the docker image id:
```
docker images
REPOSITORY                                 TAG                 IMAGE ID            CREATED             SIZE
splitsoftware/split-synchronizer           latest              3179320c768e        3 weeks ago         941MB
```

7. Use the image id to tag it with the AWS repository URL copied previously:
```
 docker tag 3179320c768e 082XXXXX925.dkr.ecr.us-east-2.amazonaws.com/splitsync
```

8. Now push the image to AWS repository:
```
docker push 082XXXXX925.dkr.ecr.us-east-2.amazonaws.com/splitsync
```

9. The image now will show up in AWS repository UI

![](https://help.split.io/hc/article_attachments/360037892292)

10. Next step is to create a cluster. Click on Amazon ECS Clusters link and click "Create

![](https://help.split.io/hc/article_attachments/360037893392)

11. Select cluster type. In this example we use AWS Fargate.

![](https://help.split.io/hc/article_attachments/360037879751)

![](https://help.split.io/hc/article_attachments/360037880451)

12. Once the cluster is created, we need to create tasks. Click on ECS service and click Task Definitions.

![](https://help.split.io/hc/article_attachments/360029344151)

13. In the Task Definition page, click Create new Task Definition button and select the launch type based on your requirements.

![](https://help.split.io/hc/article_attachments/360029344831)

14. In the "Configure task and container definitions" page, under "Task Size", makes sure to specify the task memory and CPU. In this example, we set the memory to 2GB and 1 virtual CPU.

![](https://help.split.io/hc/article_attachments/360029344412)

15. Click "Add Container" button and specify Container name and set Image to the AWS container URL you just created.
```
082XXXXX925.dkr.ecr.us-east-2.amazonaws.com/splitsync
```

16. Add the following port mappings:
```
3000, tcp
3010, tcp
```

![](https://help.split.io/hc/article_attachments/360037885491)

17. Add the required environment variables to the Container as needed by your setup. Look up the "Docker Environment Variable" column in the documentation [configuration section](https://help.split.io/hc/en-us/articles/360019686092-Split-synchronizer#common-configuration-synchronizer-and-proxy-mode). In our example, we specified the following variables:
```
SPLIT_SYNC_APIKEY
SPLIT_SYNC_REDIS_HOST
SPLIT_SYNC_REDIS_PORT
SPLIT_SYNC_REDIS_DB
SPLIT_SYNC_REDIS_PASS
SPLIT_SYNC_ADMIN_USER
SPLIT_SYNC_ADMIN_PASS
```

![](https://help.split.io/hc/article_attachments/360029345171)

18. Click "Add" to create the container, then "Create" button to create the task.

![](https://help.split.io/hc/article_attachments/360037898872)

19. Once the task is created, it's ready to run.

![](https://help.split.io/hc/article_attachments/360037899312)

![](https://help.split.io/hc/article_attachments/360037886071)

20. To verify Synchronizer is running successfully, click on the Task Id and click on Logs tab, the Synchronizer startup std output should show up.

![](https://help.split.io/hc/article_attachments/360037886331)