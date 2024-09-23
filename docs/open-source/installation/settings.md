---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Settings

Harness Open Source instance can be configured by setting Docker [environment variables](https://docs.docker.com/compose/environment-variables/set-environment-variables/) provided below.

For example, this command will start Harness Open Source instance and enable the __Admin__ user account with a preconfigured email and password, with user registration disabled. All user accounts would be created manually by the __Admin__ user.

``` {} showLineNumbers
docker run -d \
  -e GITNESS_PRINCIPAL_ADMIN_EMAIL=mail@example.com \
  -e GITNESS_PRINCIPAL_ADMIN_PASSWORD=correct-horse-battery-staple \
  -e GITNESS_USER_SIGNUP_ENABLED=false \
  -p 3000:3000 -p 3022:3022 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /tmp/gitness:/data \
  --name opensource \
  --restart always \
  harness/harness
```

## GITNESS_CI_CONTAINER_NETWORKS

Optional comma separated list of Docker networks that are attached to every pipeline step.

Harness Open Source creates a temporary Docker network for steps during pipeline execution. Attach additional Docker networks to all steps in your pipelines by setting this variable.

When setting this variable, [GITNESS_URL_CONTAINER](#gitness_url_container) must also be set based on the Gitness container name.

```
GITNESS_CI_CONTAINER_NETWORKS=networkA,networkB
```

## GITNESS_CI_PARALLEL_WORKERS

Optional number of parallel workers. Each worker can run a single [pipeline](../pipelines/overview.md).

The default value is `2`.

```
GITNESS_CI_PARALLEL_WORKERS=2
```

## GITNESS_DATABASE_DATASOURCE

Set the database connection string.

The default value is the sqlite database file.

```
GITNESS_DATABASE_DATASOURCE=database.sqlite3
```

If you configure Harness Open Source to use your own [Postgres database](postgres.md), you must set the connection string according to your Postgres server configuration. This can be a URI or a series of key-value pairs, for example:

```
GITNESS_DATABASE_DATASOURCE=postgres://root:password@1.2.3.4:5432/postgres?sslmode=disable
GITNESS_DATABASE_DATASOURCE="host=1.2.3.4 port=5678 sslmode=disable dbname=gitness user=$USER password=$PASSWORD"
```

For more information, go to the [Postgres driver documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).

## GITNESS_DATABASE_DRIVER

Set the databasee driver name.

The default value is the sqlite3 driver.

```
GITNESS_DATABASE_DRIVER=sqlite3
```

If you configure Harness Open Source to use your own [Postgres database](postgres.md), you must set the database driver to `postgres`.

```
GITNESS_DATABASE_DRIVER=postgres
```

## GITNESS_DEBUG

Set DEBUG log level.

The default value is `false`.

```
GITNESS_DEBUG=false
```

## GITNESS_ENCRYPTER_MIXED_CONTENT

If set to `true`, existing secrets stored in plaintext are fully supported, __even if [GITNESS_ENCRYPTER_SECRET](#gitness_encrypter_secret) is provided and new secrets are stored encrypted.__

The default value is `false`.

```
GITNESS_ENCRYPTER_MIXED_CONTENT=false
```

## GITNESS_ENCRYPTER_SECRET

The secret used to encrypt secrets in the database. __If no value is provided, data is stored in plaintext.__

1. Create an encryption key:

   ```
   $ openssl rand -hex 16
   550df36e9620dd842eb06ca37f9e717e
   ```
2. Provide the encryption key to Harness Open Source:

   ```
   GITNESS_ENCRYPTER_SECRET=550df36e9620dd842eb06ca37f9e717e
   ```

:::caution

This only impacts newly created secrets, existing secrets are not migrated. If this value is changed, all values encrypted with the previous secret will fail decryption.

:::
<!--
## GITNESS_GIT_DEFAULTBRANCH

The default repository branch name.

The default is `main`.

```
GITNESS_GIT_DEFAULTBRANCH=main
```
-->
## GITNESS_GRACEFUL_SHUTDOWN_TIME

The max time the service is waiting for its components to complete any ongoing operations before shutting down.

The default is 300 seconds.

```
GITNESS_GRACEFUL_SHUTDOWN_TIME=300s
```

## GITNESS_HTTP_PORT

The port on which the system listens for incoming calls.

The default port is `3000`.

```
GITNESS_HTTP_PORT=3000
```

<!-- 
## GITNESS_HTTP_PROTO

The HTTP protocol used by Harness Open Source. Allowed values are `http` or `https`.

The default is `http`.

```
GITNESS_HTTP_PROTO=http
```
-->

<!-- ## GITNESS_INSTANCE_ID -->

## GITNESS_PRINCIPAL_ADMIN_EMAIL

Enable the __Admin__ user with the email specified. When setting this variable, [GITNESS_PRINCIPAL_ADMIN_PASSWORD](#gitness_principal_admin_password) must also be set.

```
GITNESS_PRINCIPAL_ADMIN_EMAIL=mail@example.com
```

## GITNESS_PRINCIPAL_ADMIN_PASSWORD

Enable the __Admin__ user with the password specified. When setting this variable, [GITNESS_PRINCIPAL_ADMIN_EMAIL](#gitness_principal_admin_email) must also be set.

```
GITNESS_PRINCIPAL_ADMIN_PASSWORD=correct-horse-battery-staple
```

## GITNESS_TOKEN_COOKIE_NAME

The name of the cookie that is generated for UI during login/signup which contains the JWT.

The default value is `token`.

```
GITNESS_TOKEN_COOKIE_NAME=token
```

## GITNESS_TOKEN_EXPIRE

The validity time of session tokens that are generated during user login/signup.

The default is 720 hours.

```
GITNESS_TOKEN_EXPIRE=720h
```

## GITNESS_TRACE

Set TRACE log level.

The default value is `false`.

```
GITNESS_TRACE=false
```

## GITNESS_URL_API

Used to generate user-facing API URLs.

The default value is `http://$GITNESS_URL_BASE/api`

```
GITNESS_URL_API=http://localhost:3000/api
```

## GITNESS_URL_BASE

Used to generate the default value for all URLs. This allows for a custom DNS address without setting multiple variables.

The default value is `http://localhost:$GITNESS_HTTP_PORT`

```
GITNESS_URL_BASE=http://localhost:3000
```

## GITNESS_URL_CONTAINER

Optional endpoint used by pipeline step containers to communicate with Harness Open Source, such as cloning repositories.

This variable is usually set along with [GITNESS_CI_CONTAINER_NETWORKS](#gitness_ci_container_networks).

The default value is `http://host.docker.internal:$GITNESS_HTTP_PORT`

```
GITNESS_URL_CONTAINER=http://host.docker.internal:3000
```

## GITNESS_URL_GIT

Used to generate user facing git clone URLs for repositories.

The default value is `http://$GITNESS_URL_BASE/git`

```
GITNESS_URL_GIT=http://localhost:3000/git
```

## GITNESS_URL_REGISTRY

Set the registry endpoint for your Harness Open Source instance. 

The default value is `http://host.docker.internal:3000`.

```
GITNESS_URL_REGISTRY=http://host.docker.internal:3000
```

## GITNESS_URL_UI

The URL that is used to generate user-facing UI URLs.

The default value is `http://$GITNESS_URL_BASE`

```
GITNESS_URL_UI=http://localhost:3000
```

## GITNESS_USER_SIGNUP_ENABLED

Enable user signups.

The default value is `true`.

```
GITNESS_USER_SIGNUP_ENABLED=true
```
