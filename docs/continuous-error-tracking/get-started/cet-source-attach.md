---
title: Connect your Source Code
description: Instantly link the application errors to the corresponding source code. 
sidebar_position: 25
redirect_from:
  - /docs/continuous-error-tracking/getting-started/cet-source-attach
canonical_url: https://www.harness.io/blog/before-the-deployment-source-code-management
---

# Connect your source code


Learn how to connect your code repository to the monitored service. Help your developers access the code repository, branch, and commits corresponding to the errors for efficient code change tracing.


## Prerequisites

* You must have an agent configured. 
* Setup a **Connector** for the code repository you intend to track. If you do not have a code repository connector, then go to  [Setup Connector](/platform/connectors/code-repositories/connect-to-code-repo.md).


## Set up Source Attach


1. Get the code connector id.
    
    1. Navigate to **Connectors** under the **Projects**.

    2. Select the connector you intend to use.

    3. Copy the identifier.

        ![Connector Id](./static/cet-connector-id-00.png)



2. Add source attach information for the agent

The following agent environment variables can be added so that your code repository can map to the service you want to track. Alternatively, if your project generates multiple jars, you can attach source information with each jar by adding the following attributes in the `META-INF/MANIFEST.MF` file in the jar.


  | **Required Environment Variable** | **Manifest Attribute** |  **Description** | **Example** |
| --- | --- | --- | --- |
| `ET_REPOSITORY_CONNECTOR_ID` | `Harness-Repository-Connector-Id` | ID for the code repository conenctor you created | `coderepoconnector`|
| `ET_REPOSITORY_COMMIT` | `Harness-Repository-Commit` | CommitHashOrReleaseTag for the code you are want to track. Note that commit and branch both are not required. Only one of them is required. If both fields are provided, then commit takes a higher priority. | `12a69d4c668ce126fc104f4d58f3d7ed85403v1h`|
| `ET_REPOSITORY_BRANCH` | `Harness-Repository-Branch` | Name of the branch you are tracking | `pre-prod` |
| `ET_REPOSITORY_SOURCES_ROOT` | `Harness-Repository-Sources-Root` | Requires a reference to the repository name; optionally, you can provide additional paths to prepend to the file you want to track | `event-generator/backend/src/main/java` |

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Examples:
<Tabs>
  <TabItem value="Environment Variables" label="Environment Variables" default>
  Example of adding environment variables:

```
ENV ET_COLLECTOR_URL=https://collector.et.harness.io/prod1/
ENV ET_APPLICATION_NAME=yourapp
ENV ET_DEPLOYMENT_NAME=1
ENV ET_ENV_ID=env1
ENV ET_TOKEN=b34*****-****-****-****-***********42a
ENV ET_REPOSITORY_CONNECTOR_ID=coderepoconnector
ENV ET_REPOSITORY_BRANCH=pre-prod
ENV ET_REPOSITORY_SOURCES_ROOT=event-generator/backend/src/main/java
```
</TabItem>
<TabItem value="Maven" label="Maven">
  Example of adding manifest attributes using maven :

  Add this in the `<build>/<plugins>` section of your `pom.xml`

  ```
<plugin>
  <groupId>pl.project13.maven</groupId>
  <artifactId>git-commit-id-plugin</artifactId>
  <version>${git-commit-id-plugin.version}</version>
  <executions>
      <execution>
          <id>get-the-git-infos</id>
          <goals>
              <goal>revision</goal>
          </goals>
          <phase>validate</phase>
      </execution>
  </executions>
  <configuration>
      <dotGitDirectory>${project.basedir}/.git</dotGitDirectory>
  </configuration>
</plugin>

<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-jar-plugin</artifactId>
  <configuration>
      <archive>
          <manifestEntries>
              <Harness-Repository-Connector-Id>coderepoconnect</Harness-Repository-Connector-Id>
              <Harness-Repository-Commit>${git.commit.id}</Harness-Repository-Commit>
              <Harness-Repository-Sources-Root>event-generator/backend/src/main/java</Harness-Repository-Sources-Root>
          </manifestEntries>
      </archive>
  </configuration>
<plugin>
  ```
</TabItem>
<TabItem value="Gradle" label="Gradle">
  Example of adding manifest attributes using gradle:

  Add this in the `build.gradle` file:

```
jar {
  manifest {
    attributes(
      'Main-Class': 'com.harness.ExceptionGenerator',
      'Harness-Repository-Connector-Id': 'coderepoconnect',
      'Harness-Repository-Commit' : "${gitRevision}",
      'Harness-Repository-Sources-Root': 'event-generator/backend/src/main/java'
    ) 
  }
}
```
In the above example, the commit id for the latest commit can be fetched from git using some gradle plugins. For example, the plugin [org.ajoberstar:grgit](https://github.com/ajoberstar/grgit) can be used as follows:

```
buildscript {
    repositories {
    	maven {
      		url "https://plugins.gradle.org/m2/"
    	}
    }

    dependencies {
        classpath "org.ajoberstar:grgit:1.1.0"
    }
}
ext {
	// Open the Git repository in the current directory.
    git = org.ajoberstar.grgit.Grgit.open(file('.'))
    // Get commit id of HEAD.
    gitRevision = git.head().id
}
```
</TabItem>
</Tabs>
3. Restart your application after installing the Error Tracking Agent.

4. Navigate to the ARC Screen by selecting an event on the Event Summary page. Clicking on the repository URL takes you to the code repository.

    ![Source Attach](./static/cet-source-attach-00.png)
