---
title: Code coverage
description: Include code coverage in your CI pipelines.
sidebar_position: 40
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

You can add code coverage to a Harness CI pipeline by adding the relevant commands to your steps that run tests.

## Code coverage examples by language

### Go

```
go test -cover -coverprofile=c.out
go tool cover -html=c.out -o coverage.html



      - run: go build
      - run:
          name: "Create a temp directory for artifacts"
          command: |
            mkdir -p /tmp/artifacts
      - run:
          command: |
            go test -coverprofile=c.out
            go tool cover -html=c.out -o coverage.html
            mv coverage.html /tmp/artifacts

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### Java

[JaCoCo](https://github.com/jacoco/jacoco)

Include jacoco in pom.xml. when you run `mvn test`, code coverage is included (report written to an `exec` file).

```
command: |-
  mvn test

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### JavaScript

[Istanbul](https://github.com/gotwarlost/istanbul) by itself.

Istanbul in Jest.

```
      - run: npm install
      - run:
          name: "Run Jest and Collect Coverage Reports"
          command: jest --collectCoverage=true

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### PHP

[phpdbg](https://www.php.net/manual/en/book.phpdbg.php)

```
phpdbg -qrr vendor/bin/phpunit --coverage-html build/coverage-report


      - run:
          name: "Run tests"
          command: phpdbg -qrr vendor/bin/phpunit --coverage-html build/coverage-report
          environment:
            XDEBUG_MODE: coverage

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### Python

[Coverage.py](https://coverage.readthedocs.io/en/latest/)

```
pip install coverage ## install coverage.py (separate run step?)

## prefix commands with `coverage`:

coverage run -m pytest
coverage report
coverage html

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

### Ruby

[SimpleCov](https://github.com/simplecov-ruby/simplecov)

```
## Add simplecov gem
gem 'simplecov', require: false, group: :test

Run script ex `bin/rails test` - https://github.com/simplecov-ruby/simplecov#getting-started

Follow by optional step to upload the artifact file to cloud storage.

Follow by optional plugin step to publish the artifact to the Artifacts tab.
```

## Code coverage services

### CodeCov

To publish code coverage results to your CodeCov dashboard, follow this tutorial: [Code coverage with CodeCov in Harness CI](/tutorials/ci-pipelines/test/codecov).

### Coveralls

To integrate Coveralls in your Harness CI pipelines, follow the Coveralls documentation to [Integrate Coveralls with your codebase](https://docs.coveralls.io/index#integrate-coveralls-with-your-codebase). Note the following:

* For **Step 2: Choose an integration**, use the **Universal Coverage Reporter**.
* For **Step 3: Configure your project to send coverage to Coveralls**:
  * Create a [Harness text secret](/docs/platform/Secrets/add-use-text-secrets) for your `COVERALLS_REPO_TOKEN`.
  * Add the `COVERALLS_REPO_TOKEN` environment variable to steps in your CI pipelines that run tests with code coverage.
  * For the environment variable value, use a Harness expression to [reference the encrypted text secret](/docs/platform/secrets/add-use-text-secrets/#step-3-reference-the-encrypted-text-by-identifier), such as `<+secrets.getValue("YOUR_COVERALLS_SECRET_ID")>`.

<details>
<summary>Add an environment variable to a step</summary>

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In Harness, edit the step that runs your tests with code coverage.
2. Under **Environment Variables**, select **Add**.
3. Set the key to `COVERALLS_REPO_TOKEN`.
4. Set the value to `<+secrets.getValue("YOUR_COVERALLS_SECRET_ID")>`

![Adding the Coveralls Repo Token environment variable to a step in Harness.](./static/codecoverage_coveralls_env_var_visual.png)

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add `envVariables` to the `step.spec` for the relevant `Run` or `RunTests` step.

```yaml
              - step:
                  type: Run
                  name: npm test
                  identifier: npm_test
                  spec:
                    shell: Sh
                    command: |-
                      npm install
                      npm run build --if-present
                      npm test
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
                    envVariables:
                      COVERALLS_REPO_TOKEN: <+secrets.getValue("YOUR_COVERALLS_SECRET_ID")>
```

```mdx-code-block
  </TabItem>
</Tabs>
```

</details>

## Publish code coverage reports to the Artifacts tab

You can use the [Artifact Metadata Publisher Drone plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish code coverage reports to the **Artifacts** tab on the [Build details page](../viewing-builds.md).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

To publish a code coverage report to the **Artifacts** tab, you must:

1. Include steps in your pipeline that run tests with code coverage and produce code coverage reports.
2. Include a step to upload the report artifact to cloud storage, such as [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md), [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md), or [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md).
3. Include a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `artifact-metadata-publisher` plugin. Configure the **Plugin** step settings as follows:

   * **Name:** Enter a name.
   * **Container Registry:** Select a Docker connector.
   * **Image:** Enter `plugins/artifact-metadata-publisher`.
   * **Settings:** Add the following two settings as key-value pairs.
      * `file_urls`: The URL to the code coverage artifact that was uploaded in the **Upload Artifacts** step.
      * `artifact_file`: `artifact.txt`

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

1. Include steps in your pipeline that run tests with code coverage and produce code coverage reports.
2. Include a step to upload the report artifact to cloud storage, such as [Upload Artifacts to GCS](../build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings.md), [Upload Artifacts to S3](../build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings.md), or [Upload Artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts-to-jfrog.md).
3. Include a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) that uses the `artifact-metadata-publisher` plugin, for example:

   ```yaml
                  - step:
                     type: Plugin
                     name: publish artifact metadata
                     identifier: publish_artifact_metadata
                     spec:
                       connectorRef: account.harnessImage
                       image: plugins/artifact-metadata-publisher
                       settings:
                         file_urls: ## Provide the URL to the code coverage artifact that was uploaded in the Upload Artifacts step.
                         artifact_file: artifact.txt
   ```

```mdx-code-block
  </TabItem>
</Tabs>
```

:::tip

Code coverage reports are not the only artifacts you can publish to the **Artifacts** tab, for example, you can [Publish an Allure Report to the Artifacts tab](/tutorials/ci-pipelines/test/allure-report).

:::
