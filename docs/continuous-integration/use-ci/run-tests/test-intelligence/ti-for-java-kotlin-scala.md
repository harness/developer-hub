---
title: Enable TI for Java, Kotlin, or Scala
description: Set up TI for Java, Kotlin, or Scala codebases.
sidebar_position: 30
---

## View test reports and test selection

For information about test reports for Test Intelligence, go to [View tests](../viewing-tests.md).

## Troubleshooting TI with Maven

If you encounter issues with Test Intelligence when using Maven as your [build tool](#build-tool), check the following configurations:

* If your `pom.xml` contains `<argLine>`, then you must [modify your argLine setup](#maven-argline-setup).
* If you attach Jacoco or any agent while running unit tests, then you must [modify your argLine setup](#maven-argline-setup).
* If you use Jacoco, Surefire, or Failsafe, make sure that `forkCount` is not set to `0`. For example, the following configuration in `pom.xml` removes `forkCount` and applies `useSystemClassLoader` as a workaround:

   ```xml
   <plugin>
       <groupId>org.apache.maven.plugins</groupId>
       <artifactId>maven-surefire-plugin</artifactId>
       <version>2.22.1</version>
       <configuration>
           <!--  <forkCount>0</forkCount> -->
           <useSystemClassLoader>false</useSystemClassLoader>
       </configuration>
   </plugin>
   ```


## Pipeline YAML examples

```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Harness Cloud" default>
```

This example shows a pipeline that uses Harness Cloud build infrastructure and runs tests on Java with Maven and Test Intelligence. By changing the `language` value,  you can use this pipeline for Kotlin or Scala.

```yaml
pipeline:
  name: Test Intelligence Demo
  identifier: testintelligencedemo
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        build: <+input>
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
  stages:
    - stage:
        type: CI
        identifier: Build_and_Test
        name: Build and Test
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: RunTests
                  name: Run Tests
                  identifier: Run_Tests
                  spec:
                    language: Java ## Specify Java, Kotlin, or Scala.
                    buildTool: Maven ## For Java or Kotlin, specify Bazel, Maven, or Gradle. For Scala, specify Bazel, Maven, Gradle, or Sbt.
                    args: test
                    packages: io.harness.
                    runOnlySelectedTests: true ## Set to false if you don't want to use TI.
                    postCommand: mvn package -DskipTests
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "target/reports/*.xml"
          platform:
            arch: Amd64
            os: Linux
          runtime:
            spec: {}
            type: Cloud
```

```mdx-code-block
  </TabItem>
  <TabItem value="sh" label="Self-hosted">
```

This example shows a pipeline that uses a Kubernetes cluster build infrastructure and runs tests on Java with Maven and Test Intelligence. By changing the `language`, this pipeline could be used for Kotlin or Scala.

```yaml
pipeline:
  name: Test Intelligence Demo
  identifier: testintelligencedemo
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        build: <+input>
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
  stages:
    - stage:
        type: CI
        identifier: Build_and_Test
        name: Build and Test
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: RunTests
                  name: Run Tests
                  identifier: Run_Tests
                  spec:
                    connectorRef: account.harnessImage ## Specify if required by your build infrastructure.
                    image: maven:3.8-jdk-11 ## Specify if required by your build infrastructure.
                    language: Java ## Specify Java, Kotlin, or Scala.
                    buildTool: Maven ## For Java or Kotlin, specify Bazel, Maven, or Gradle. For Scala, specify Bazel, Maven, Gradle, or Sbt.
                    args: test
                    packages: io.harness.
                    runOnlySelectedTests: true ## Set to false if you don't want to use TI.
                    postCommand: mvn package -DskipTests
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "target/reports/*.xml"
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

```mdx-code-block
  </TabItem>
</Tabs>
```