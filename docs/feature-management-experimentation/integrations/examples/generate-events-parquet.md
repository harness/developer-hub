---
title: Generate Parquet Files for S3 Integration Using Java and Maven
description: Learn how to generate Parquet files for the Amazon S3 integration using Java and Maven.
sidebar_position: 3
sidebar_label: Generate Parquet Files Using Java and Maven
---

## Overview

Use the following Java code to generate a Parquet file containing events for use with the Amazon S3 integration with Split.

### Prerequisites

The following environments:

- Maven
- Java 10.0.1

## Generate your event file

1. Unzip the attached folder.
1. Open the `PraquetDemo.java` file. This file contains two event records similar to the one below. 

   Make sure to set the correct event data:
   ```java
    Event e1 = Event.builder()
    .environmentId("029bd160-7e36-11e8-9a1c-0acd31e5aef0")
    .trafficTypeId("e6910420-5c85-11e9-bbc9-12a5cc2af8fe")
    .eventTypeId("s3-integration")
    .key("key1")
    .timestamp(System.currentTimeMillis())
    .withProperty("foo", "bar")
    .build();
   ```

1. From the command line, `cd` to the folder and type `mvn install`.

The resulted parquet file is generated under `./demo.parquet.gz`. 