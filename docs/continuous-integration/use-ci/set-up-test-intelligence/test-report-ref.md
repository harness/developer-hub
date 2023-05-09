---
title: Format unit test reports
description: Test reports must be in JUnit XML format.
sidebar_position: 50
---

The parsed test report in the [Tests tab](./viewing-tests.md) comes strictly from the provided test reports. Test reports must be in JUnit XML format to appear on the **Tests** tab, because Harness parses test reports that are in JUnit XML format only. It is important to adhere to the standard [JUnit format](https://llg.cubic.org/docs/junit/) to improve test suite parsing.

we support only junit but there are converters available for all major languages. 

Examples to work from:
* gitlab: https://docs.gitlab.com/ee/ci/testing/unit_test_reports.html
* Circleci: https://circleci.com/docs/collect-test-data/#enabling-formatters 

## C# .NET/NUnit

Use converter to convert nunit to JUnit, such as https://github.com/nunit/nunit-transforms/tree/master/nunit3-junit

https://docs.testmo.com/integrations/automation/nunit

## JUnit XML format resources

Use these resources to learn about JUnit XML formatting.

* [Common JUnit XML format and examples from Testmo](https://github.com/testmoapp/junitxml)
* [Examples of JUnit XML format mapping from IBM](https://www.ibm.com/docs/en/developer-for-zos/16.0?topic=formats-junit-xml-format)
* [Apache Ant JUnit schema](https://github.com/windyroad/JUnit-Schema)
* 