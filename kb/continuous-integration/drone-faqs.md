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

#### Cron scheduling is not working while Using Drone cloud
Cron scheduling is not available and disabled for Drone Cloud. This feature is only available while using self-hosting.

#### How t get the logs for a build via api/cli
You van use either of the way:
Api: GET /api/repos/{owner}/{repo}/builds/{build}/logs/{stage}/{step}
Cli:  drone log view <repo/name> <build> <stage> <step>

#### How to change the Runner type for a pipeline
Drone yaml will have the field type:  which need to update dicker/kubernetes

#### How to create a primary admin user in drone
When you configure the Drone server you can create the initial administrative account by passing the below environment variable,
DRONE_USER_CREATE=username:octocat,admin:true

#### Instead of creating new Admin User can we use already existing user and make them as Admin
Yes you can provide an existing username. Drone will update the account and grant administrator role on server restart
