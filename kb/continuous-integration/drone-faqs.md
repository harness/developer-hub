---
title: Drone FAQs
description: This article addresses some frequently asked questions about Drone.
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# FAQ



#### What is endpoint to check licence details from Drone UI

You can check licence details from ui by navigating to <-dronehost:port/varz> ex: https://dronehost/varz


#### Can we Install Drone using Helm

Yes, Below charts are used to deploy Drone to Kubernetes.
https://github.com/drone/charts

#### Can a user with Base Permissions on scm(github etc) can activate a repo

No, A user with create webook permission can only activate a repo as that requires some privilege access.  

#### Drone CI supports importing libraries when using jsonnet. But builds keeps failing with an error similar to:

RUNTIME ERROR: couldn't open import "frontend.libsonnet": no match locally or in the Jsonnet library paths .drone.jsonnet:1:19-46 thunk <front_end> from <$> .drone.jsonnet:131:2-11 During manifestation

Solution: You need to set this env variable as well, otherwise it doesn't figure out the import paths correctly:
DRONE_JSONNET_IMPORT_LIMIT

See: [https://github.com/harness/drone/commit/d50e89d4114a3fed49a1317f147078269a4bdfb5#diff-e1045c16b3ce29369b845d8421af54321c52394275810fc6caf92ca75e8be974R143]

#### Drone HA is available with 2 new components

1. HAProxy is used to load balance the drone server UI requests, and balance requests from the drone runner to the server. 
2. Redis for queues and pub/sub. Used for runner events, logs streaming, build cancellation events, and finally the build queue itself. 

#### GitHub will deprecate OAuth via query params, and it seems like the format of the token is changing as well, so will Drone setup work or w need to change anything
Drone uses github client id and client secret for authentication and uses http header to pass that while making api calls and do not include in query parameter, so these changes from github end should not impact.

#### Can we use DRONE_DOCKER_CONFIG while running docker build manually
The credentials provided by DRONE_DOCKER_CONFIG are only used by Drone to pull images defined in the image section of the yaml. These credentials are not injected into pipeline steps (for security reasons) which is why the credentials are not available to you when manually running docker build.

#### How to use Drone Enterprise for free as organizations with under $1 million US dollars in annual gross revenue as mentioned here: https://docs.drone.io/enterprise/
 You can "build the Enterprise Edition from source without build limits":
https://docs.drone.io/enterprise/#how-do-i-use-the-enterprise-edition-for-free

#### How to share configuration files across the pipeline to reuse same configuration
Drone has build templates that can be shared across projects. A project can use a template and provide project-specific information to alter the build.


#### Getting ERROR Database error 42704: type "number" does not exist while migrating from sqlite to Postgres
It seems like as the build_deploy_id is type of number and this type is not present in PostgreSQL, So You have to create a new table with type bigint and than copy the data after renaming the table to get this working
https://github.com/dimitri/pgloader/issues/1284 

#### Failed to build npm: npm verb stack fatal: unable to look up the current user in the passwd file: no such user
This error is linked to the Git user. Please add the variables in the steps GIT_COMMITTER_NAME and GIT_COMMITTER_EMAIL, like the example below:
```sh
export GIT_COMMITTER_NAME=’user_name’
export GIT_COMMITTER_EMAIL=’user_email’
```

#### Does Drone Support External Databases?
Yes, Drone CI has Postgres and MySQL databases support
See: [https://docs.drone.io/server/storage/database/]

#### Can I use Drone exec on Drone cloud?
No, exec pipelines are disabled on Drone Cloud. This feature is only available when self-hosting.

#### Which SCM ( Source Control Management ) is supported by the Drone?
The Drone supports a wide variety of SCM, in this [Link](https://docs.drone.io/server/overview/) you can find the supported SCM.

#### How to enable Flag Debug on Drone-Server and Drone-Runner?
You can enable more detailed debug logging with the following configuration parameter:
```sh
DRONE_LOGS_DEBUG=true
```

#### How to enable Flag trace on Drone-Server and Drone-Runner?
You can enable more detailed trace logging with the following configuration parameter:
```sh
DRONE_LOGS_TRACE=true
```

#### How to configure Timezone on the Drone?
When running the Drone server image, the timezone can be set with an environment variable TZ={Area/Location} using a valid TZ database name EG:
```sh
--env=TZ=Europe/London
```

#### How to manage users on Drone-Server?
You can manage users using the command line utility. Please see the command line tools [documentation](https://docs.drone.io/cli/install/) for installation instructions.
Command examples can be found at this [link](https://docs.drone.io/server/user/management/).

#### Does the Drone have Encryption support?
Yes, Drone supports aesgcm encryption of secrets stored in the database. You must enable encryption before any secrets are stored in the database.
See: [https://docs.drone.io/server/storage/encryption/]

#### Does the Drone have Starlark extension support?
Yes, Drone provides an official extension that enables support for Starlark.
See: [https://docs.drone.io/server/extensions/starlark/]



