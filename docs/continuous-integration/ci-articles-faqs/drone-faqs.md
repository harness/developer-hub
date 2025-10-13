---
title: Drone FAQs
description: This article addresses some frequently asked questions about Drone.
sidebar_position: 4
---

## Licenses, installation, and initial setup

### Which endpoint can I use to check license details from the Drone UI?

You can check Drone license details by navigating to `dronehost:port/varz`, such as `https://dronehost/varz`.

### I am getting a "malformed license" error despite having an active licence

A malformed license error, such as the following, can occur if the license is not applied correctly.

```
 {"error":"Malformed License","level":"fatal","msg":"main: invalid or expired license","time":"2024-02-26T11:48:35Z"}
```

Check that the [drone-license enviroment variable](https://docs.drone.io/server/reference/drone-license/) is applied correctly and there are no extra lines or whitespace added on the key file.

### A Drone license allows up to 15 users. Is there a limit on the number of Drone instances with that license? Or just a limit on authenticated users?

The license file is applicable per instance. The license is applied to a single instance and the 15 user limit is applied on that instance.

### Can I install Drone using Helm?

Yes, charts in the following GitHub repository are used to deploy Drone to Kubernetes: [https://github.com/drone/charts](https://github.com/drone/charts).

### What are the two new components for Drone HA?

Drone HA is available with HAProxy and Redis.

* HAProxy load balances Drone server UI requests and requests from the Drone Runner to the server.
* Redis is for queues and pub/sub related to runner events, log streaming, build cancellation events, and the build queue itself.

### Can I use Drone Enterprise for free?

Organizations with annual gross revenue under US$1 million can [use the Drone Enterprise Edition for free](https://docs.drone.io/enterprise/#how-do-i-use-the-enterprise-edition-for-free).

For more information, go to [Drone Enterprise FAQ](https://docs.drone.io/enterprise/).

### How do I set the timezone for Drone?

When running the Drone Server image, you can use the `TZ={Area/Location}` environment variable to set the timezone. You must specify a valid timezone database name, for example:

```sh
--env=TZ=Europe/London
```

## SCM and Drone

### Which SCM providers does Drone support?

[Drone supports a variety of SCM providers.](https://docs.drone.io/server/overview/)

### GitHub is deprecating OAuth via query params and might change the token format. Do I need to change my Drone setup?

These GitHub changes aren't expected to impact Drone.

The token format doesn't impact Drone because Drone uses the GitHub client ID and secret for authentication. While making API calls, Drone passes the credentials in the HTTP header, rather than through query parameters.

### How can I fetch submodules when using the Git clone step?

Use the `--recursive` flag with the Git clone step to fetch submodules.

### Can I skip a particular commit without updating my drone.yml?

You can add the `[CI SKIP]` directive in individual commit messages.

## Databases and Drone

### Does Drone support external databases?

Yes, [Drone CI supports PostgreSQL and MySQL databases](https://docs.drone.io/server/storage/database/).

### Does Drone have encryption support?

Yes, Drone supports AES-GCM encryption of secrets stored in the database. You must [enable encryption](https://docs.drone.io/server/storage/encryption/) before any secrets are stored in the database.

### When migrating from sqlite to PostgreSQL, I am getting database error 42704: type "number" does not exist.

The `build_deploy_id` type is `number`, and this type is not present in PostgreSQL. To resolve this, you must create a new table with type `bigint`, and then copy the data after renaming the table. For more information, refer to the [discussion of database error 42704 on the PGloader GitHub repository](https://github.com/dimitri/pgloader/issues/1284).

### Drone uses SQLite as the default database engine. Is that recommended for production use, or would you recommend using MySQL/Postgres?

You can use SQLite, but [Harness recommends using Postgres](https://docs.drone.io/server/storage/database/).

## Drone user management

### Can users with base permissions in our SCM provider activate a repo?

No. Activating repos requires certain privileges. Users with create webook permissions can activate repos.

### How do I manage users on Drone-Server?

You can use the Drone CLI to manage users. [Install the Drone CLI](https://docs.drone.io/cli/install/), and then use the [user commands](https://docs.drone.io/server/user/management/).

### Build fails with unable to look up current user in passwd file, no such user.

The following error is related to Git user configuration:

```
Failed to build npm: npm verb stack fatal: unable to look up the current user in the passwd file: no such user
```

To resolve this issue, you need to set `GIT_COMMITTER_NAME` and `GIT_COMMITTER_EMAIL` in your [Git environment variables](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables), for example:

```sh
export GIT_COMMITTER_NAME='user_name'
export GIT_COMMITTER_EMAIL='user_email'
```

## Plugins, imports, integrations, and extensions

### Builds fail with runtime error: couldn't open imported jsonnet library.

Drone CI supports importing libraries when using jsonnet, but builds keeps fail with the following error:

```
RUNTIME ERROR: couldn't open import "frontend.libsonnet": no match locally or \
in the Jsonnet library paths .drone.jsonnet:1:19-46 thunk <front_end> from <$> .drone.jsonnet:131:2-11 During manifestation
```

To resolve this issue, you must set the `DRONE_JSONNET_IMPORT_LIMIT` environment variable, which helps Drone resolve the import paths. The default value for this environment variable is `0`.

### Does Drone have Starlark extension support?

Yes, you can use the [official Drone extension to enable Starlark support](https://docs.drone.io/server/extensions/starlark/).

### Is it possible to integrate my Drone builds with Datadog's Pipeline Visibility feature?

You can use the [Datadog Drone plugin](https://plugins.drone.io/plugins/datadog) to send events and metrics to Datadog from a Drone pipeline.

### Can I create custom Drone plugins using Python?

Yes, you can write your own Drone plugins. For more information, go to [Write your own custom plugins](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/custom_plugins). For an example Python plugin, refer to the [Drone PyPi plugin GitHub repo](https://github.com/drone-plugins/drone-pypi).

## Drone pipelines and builds

### How do I share configuration files across a Drone pipeline to reuse the same configuration?

You can create Drone build templates and share them across projects. A project can use a template and provide project-specific information to alter the build.

### Can I use Drone exec on Drone cloud?

No, exec pipelines are disabled on Drone Cloud. This feature is only available when self-hosting.

### Can I use DRONE_DOCKER_CONFIG while manually running docker build?

The credentials provided by `DRONE_DOCKER_CONFIG` are only used by Drone to pull images defined in the `image` section of the YAML. For security reasons, these credentials aren't injected into pipeline steps; therefore, these credentials aren't available when manually running `docker build`.

### Drone build running for many hours past the timeout limit without automatically failing.

This is usually caused by a step starting a subprocess that never exits, or the Drone runner was terminated before the build finished or timed out.

### If I define a cron in my drone.yml file in my repo, does it appear in the Drone UI as well?

You can create cron jobs in the Drone UI only. References to cron jobs in your drone.yml are for filtering purposes only.

## Drone logging

### How do I enable the debug logs flag on Drone-Server and Drone-Runner?

You can enable more detailed debug logging with the following configuration parameter:

```yaml
DRONE_LOGS_DEBUG=true
```

### How do I enable the trace logs flag on Drone-Server and Drone-Runner?

You can enable more detailed trace logging with the following configuration parameter:

```yaml
DRONE_LOGS_TRACE=true
```
