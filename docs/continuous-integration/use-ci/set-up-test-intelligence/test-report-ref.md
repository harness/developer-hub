---
title: Format test reports
description: Test reports must be in JUnit XML format to appear on the Tests tab.
sidebar_position: 50
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Results on the [Tests tab](./viewing-tests.md) are parsed from test reports specified in the **Report Paths** setting in **Run** and **Run Tests** steps. Test reports must be in [JUnit XML format](https://llg.cubic.org/docs/junit/) to appear on the **Tests** tab, because Harness parses test reports that are in JUnit XML format only.

For information about code coverage reports and viewing reports on the **Artifacts** tab, go to [Code Coverage](./code-coverage.md).

## JUnit XML format resources

Use these resources to learn about JUnit XML formatting.

* [Common JUnit XML format and examples from Testmo](https://github.com/testmoapp/junitxml)
* [Examples of JUnit XML format mapping from IBM](https://www.ibm.com/docs/en/developer-for-zos/16.0?topic=formats-junit-xml-format)
* [Apache Ant JUnit schema](https://github.com/windyroad/JUnit-Schema)

## Tools with built-in JUnit XML output

Here are some Harness YAML examples for tools that produce JUnit XML output by default.

### C, C++

You can use the [--output-junit](https://cmake.org/cmake/help/latest/manual/ctest.1.html#cmdoption-ctest-output-junit) command with CTest.

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      mkdir build
                      cmake -S . -B build
                      ctest --test-dir build --output-junit out.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - /harness/build/out.xml
```

### Java - Gradle

This example runs Gradle tests with [Test Intelligence](./set-up-test-intelligence.md).

```yaml
              - step:
                  type: RunTests
                  identifier: Run_Tests_with_Intelligence
                  name: Run Tests with Intelligence
                  spec:
                    args: gradle test --tests
                    buildTool: Gradle
                    enableTestSplitting: true
                    language: Java
                    reports:
                      spec:
                        paths:
                          - "/harness/results.xml"
                      type: JUnit
                    runOnlySelectedTests: true
```

### PHP

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      mkdir -p /harness/phpunit
                      phpunit --log-junit /harness/phpunit/junit.xml tests
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - /harness/phpunit/junit.xml
```

### Python

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      . venv/bin/activate
                      mkdir /harness/test-results
                      pytest --junitxml=harness/test-results/junit.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - /harness/test-results/junit.xml
```

:::tip

[Use pytest to run unittest.](https://docs.pytest.org/en/6.2.x/unittest.html)

:::

### Ruby - Cucumber

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      bundle check || bundle install
                      mkdir -p /harness/cucumber
                      bundle exec cucumber --format junit --out /harness/cucumber/junit.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - /harness/cucumber/junit.xml
```

## JUnit converters, formatters, and plugins

If your test tool doesn't automatically produce test results in JUnit XML format, there are JUnit converters, formatters, and plugins available for all major languages. Some examples of conversion tools and corresponding Harness YAML are provided below.

### C# - .NET Core, NUnit

* [NUnit to JUnit](https://github.com/nunit/nunit-transforms/tree/master/nunit3-junit)
* [.NET trx2JUnit](https://github.com/gfoidl/trx2junit)

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Powershell
                    command: |-
                      cd dotnet-agent/TestProject1
                      wget -UseBasicParsing https://dot.net/v1/dotnet-install.ps1 -o dotnet-install.ps1
                      .\dotnet-install.ps1
                      dotnet build

                      wget https://raw.githubusercontent.com/nunit/nunit-transforms/master/nunit3-junit/nunit3-junit.xslt -o nunit3-junit.xslt

                      "C:/Program Files (x86)/NUnit.org/nunit-console/nunit3-console.exe" dotnet-agent/TestProject1/bin/Debug/net48/TestProject1.dll --result="UnitTestResults.xml;transform=nunit3-junit.xslt"
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - UnitTestResults.xml
```

<!-- Framework example
The following example runs tests with [Test Intelligence](./set-up-test-intelligence.md).

```yaml
                  - step:
                      type: RunTests
                      name: runTests
                      identifier: runTest
                      spec:
                        language: Csharp
                        buildEnvironment: Framework
                        frameworkVersion: "5.0"
                        buildTool: Nunitconsole
                        args: . "C:/Program Files (x86)/NUnit.org/nunit-console/nunit3-console.exe" dotnet-agent/TestProject1/bin/Debug/net48/TestProject1.dll --result="UnitTestResults.xml;transform=nunit3-junit.xslt"
                        packages: TestProject1
                        namespaces: TestProject1
                        runOnlySelectedTests: true
                        preCommand: |-
                          wget https://github.com/nunit/nunit-console/releases/download/3.13/NUnit.Console-3.13.0.msi -o nunit.msi
                          ./nunit.msi
                          git status
                          cd dotnet-agent/TestProject1
                          wget -UseBasicParsing https://dot.net/v1/dotnet-install.ps1 -o dotnet-install.ps1
                          .\dotnet-install.ps1
                          dotnet build
                          cd ..
                          cd ..
                          wget https://raw.githubusercontent.com/nunit/nunit-transforms/master/nunit3-junit/nunit3-junit.xslt -o nunit3-junit.xslt
                        reports:
                          type: JUnit
                          spec:
                            paths:
                              - UnitTestResults.xml
                        shell: Powershell
```
-->

### Clojure

* [Kaocha JUnit Plugin](https://clojars.org/lambdaisland/kaocha-junit-xml)
* [Clojure.test JUnit Plugin](https://github.com/ruedigergad/test2junit)

### Go

You can use the [go-junit-report](https://github.com/jstemmer/go-junit-report) tool.

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report.out
                      cat report.out | $HOME/go/bin/go-junit-report -set-exit-code > report.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
```

### Java - Maven

This example uses the [Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/) and runs tests with Maven and [Test Intelligence](./set-up-test-intelligence.md).

```yaml
              - step:
                  type: RunTests
                  identifier: Run_Tests_with_Intelligence
                  name: Run Tests with Intelligence
                  spec:
                    args: test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false
                    buildTool: Maven
                    enableTestSplitting: true
                    language: Java
                    reports:
                      spec:
                        paths:
                          - "target/surefire-reports/*.xml"
                      type: JUnit
                    runOnlySelectedTests: true
```

### JavaScript

<details>
<summary>ESLint</summary>

[ESLint JUnit Formatter](https://eslint.org/docs/latest/use/formatters/#junit)

```yaml
  - step:
      type: Run
      name: Run ESLint Tests
      identifier: run_eslint_tests
      spec:
        shell: Sh
        command: |
          mkdir -p /harness/reports
          eslint ./src/ --format junit --output-file /harness/reports/eslint.xml
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/reports/eslint.xml"
```

</details>

<details>
<summary>Jest</summary>

[Jest JUnit Reporter](https://www.npmjs.com/package/jest-junit)

```yaml
  - step:
      type: Run
      name: Run Jest Tests
      identifier: run_jest_tests
      spec:
        shell: Sh
        command: |
          yarn add --dev jest-junit
          jest --ci --runInBand --reporters=default --reporters=jest-junit
      envVariables:
         JEST_JUNIT_OUTPUT_DIR: "/harness/reports"
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/reports/*.xml"
```

</details>

<details>
<summary>Karma</summary>

[Karma JUnit Reporter](https://www.npmjs.com/package/karma-junit-reporter)

```yaml
  - step:
      type: Run
      name: Run Karma Tests
      identifier: run_karma_tests
      spec:
        shell: Sh
        command: |
          npm install
          mkdir /harness/junit
          karma start ./karma.conf.js
      envVariables:
        JUNIT_REPORT_PATH: /harness/junit/
        JUNIT_REPORT_NAME: test-results.xml
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/junit/test-results.xml"
```

</details>

<details>
<summary>Mocha</summary>

[Mocha JUnit Reporter](https://www.npmjs.com/package/mocha-junit-reporter)

```yaml
  - step:
      type: Run
      name: Run Mocha Tests
      identifier: run_mocha_tests
      spec:
        shell: Sh
        command: |
          npm install
          mkdir /harness/junit
          mocha test --reporter mocha-junit-reporter --reporter-options mochaFile=./path_to_your/file.xml
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/junit/test-results.xml"
```

</details>

### Ruby

<details>
<summary>Minitest</summary>

Add the [Minitest Junit Formatter](https://github.com/aespinosa/minitest-junit) to your Gemfile.

```yaml
  - step:
      type: Run
      name: Run Ruby Tests
      identifier: run_ruby_tests
      spec:
        shell: Sh
        command: |
          bundle check || bundle install
          bundle exec rake test --junit
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/report.xml"
```

</details>

<details>
<summary>RSpec</summary>

Add the [RSpec JUnit formatter](https://rubygems.org/gems/rspec_junit_formatter) to your Gemfile.

```yaml
  - step:
      type: Run
      name: Run RSpec Tests
      identifier: run_rspec_tests
      spec:
        shell: Sh
        command: |
          bundle check --path=vendor/bundle || bundle install --path=vendor/bundle --jobs=4 --retry=3
          mkdir /harness/rspec
          bundle exec rspec --format progress --format RspecJunitFormatter -o /harness/rspec/rspec.xml
      reports:
        type: JUnit
        spec:
          paths:
            - "/harness/rspec/rspec.xml"
```

</details>
