---
title: Java SDK Reference
description: This topic explains how to integrate your feature flags with Java SDK.
tags: 
   - helpDocs
   - feature flag
   - java SDK
   - SDK
# sidebar_position: 2
helpdocs_topic_id: i7et9ebkst
helpdocs_category_id: kkiqy1f6d7
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use the Harness Feature Flags Java SDK for your Java application.

For getting started quickly, you can use our [sample code from the Java SDK README](https://github.com/harness/ff-java-server-sdk/blob/main/README.md). You can also [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run a sample application from the [Java SDK GitHub Repository.](https://github.com/harness/ff-java-server-sdk)

## Before you begin

Make sure you read and understand:

* [Feature Flags Overview](../../1-ff-onboarding/1-cf-feature-flag-overview.md)
* [Getting Started with Feature Flags](../../1-ff-onboarding/2-ff-getting-started/2-getting-started-with-feature-flags.md)
* [Client-Side and Server-Side SDKs](../1-sdk-overview/1-client-side-and-server-side-sdks.md)
* [Communication Strategy Between SDKs and Harness Feature Flags](../1-sdk-overview/2-communication-sdks-harness-feature-flags.md)

## Version

The current version of this SDK is **1.1.5.3.**

## Requirements

To use this SDK, make sure you:  

* Install JDK 8 or a newer version
* Install [Maven](https://maven.apache.org/), [Gradle](https://gradle.org/) or an alternative build automation tool for your application
* [Download the SDK from our GitHub repository](https://github.com/harness/ff-java-server-sdk)
* Create a Java application, or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) our [sample application](https://github.com/harness/ff-java-server-sdk).
* [Create a Feature Flag on the Harness Platform](../../2-ff-using-flags/1-ff-creating-flag/4-create-a-feature-flag.md). If you are following along with the SDK README sample code, make sure your flag is called `harnessappdemodarkmode`.
* [Create an SDK key and make a copy of it](../../2-ff-using-flags/1-ff-creating-flag/4-create-a-feature-flag.md#step-3-create-an-sdk-key)

## Install the SDK

Install the Feature Flag SDK as a dependency in your application using your application's dependency manager. You can use Maven, Gradle, SBT, etc. for your application. 

Below are the dependencies for Maven and Gradle that uses Java SDK version 1.1.5.1 as an example:

### Install using Maven

Add the following dependency in your project's pom.xml file:


```
<dependency>  
    <groupId>io.harness</groupId>  
    <artifactId>ff-java-server-sdk</artifactId>  
    <version>1.1.5</version>  
</dependency>
```
If you are using the Harness Java sample application from the [Java SDK GitHub repository](https://github.com/harness/ff-java-server-sdk), do not add the Maven dependency in the `pom.xml` file as it has already been added.

#### Install using Gradle


```
implementation group: 'io.harness', name: 'ff-java-server-sdk', version: '1.1.5.1'
```
## Initialize the SDK

To initialize the Java SDK, you need to:

1. Add your Server SDK key to connect to your Harness Environment.
2. Add a Target that you want to Evaluate against a Feature Flag.
3. Configure the SDK options, if needed. For more details on what features you can configure for this SDK, go to [Configure the SDK](#configure_the_sdk).
4. Complete the initialization with the SDK using the Server SDK Key, Target, and Configuration parameters you set.

### Add the Server SDK Key

After installing the SDK, you must enter the server SDK key that you created in the Harness platform into the apiKey field, for example:


```
String apiKey = System.getProperty("FF_API_KEY", "<default api key>");
```
 

### Add a Target

<details>
<summary>What is a Target?</summary> 
Targets are used to control which users see which Variation of a Feature Flag, for example, if you want to do internal testing, you can enable the Flag for some users and not others. When creating a Target, you give it a name and a unique identifier. Often Targets are users but you can create a Target from anything that can be uniquely identified, such as an app or a machine.  
  </details>

For more information about Targets, go to [Targeting Users With Flags](../../2-ff-using-flags/4-ff-target-management/3-targeting-users-with-flags.md).

To add a Target, build it and pass in arguments for the following:


|  |  |  |  |
| --- | --- | --- | --- |
| **Parameter** | **Description** | **Required?** | **Example** |
| `identifier` | Unique ID for the TargetRead **Regex requirements for Target names and identifiers** below for accepted characters. | Required | `.identifier("HT_1")` |
| `name` | Name for this Target. This does not have to be unique. **Note**: If you don’t provide a value, the name will be the same as the identifier.Read **Regex requirements for Target names and identifiers** below for accepted characters. | Optional**Note**: If you don't want to send a name, don't send the parameter. Sending an empty argument will cause an error. | `.name("Harness_Target_1")` |
| `attributes` | Additional data you can store for a Target, such as email addresses or location. | Optional | `.attributes(new HashMap<String, Object>())` |

<details>
<summary> Regex requirements for Target names and identifiers </summary>

**Identifier** 

Regex: `^[A-Za-z0-9.@_-]*$`  
Must consist of only alphabetical characters, numbers, and the following symbols:  
. (period)  
@ (at sign)  
- (dash)  
\_ (underscore)  
  
The characters can be lowercase or uppercase but cannot include accented letters, for example `Cafe_789`.  
  
**Name**
Regex: `^[\\p{L}\\d .@_-]*$`  
  
Must consist of only alphabetical characters, numbers, and the following symbols:  
. (period)  
@ (at sign)  
-(dash)  
\_ (underscore)  
 (space)  
  
The characters can be lowercase or uppercase and can include accented letters, for example `Café_123`.

</details>

For example:


```
Target target = Target.builder()  
                   .name("Harness_Target_1")  
                   .attributes(new HashMap<String, Object>())  
                   .identifier("HT_1")  
                   .build();
```
### Configure the SDK

You can configure the following features of the SDK through the `baseConfig`:



|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Example** | **Description** | **Default Value** |
| baseUrl | `HarnessConfig.configUrl("https://config.ff.harness.io/api/1.0")` | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://config.ff.harness.io/api/1.0` |
| eventUrl | `HarnessConfig.eventUrl("https://config.ff.harness.io/api/1.0")` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://events.ff.harness.io/api/1.0` |
| pollInterval | `BaseConfig.pollIntervalInSeconds(60))` | The interval **in seconds** that we poll for changes when you are not using stream mode. | `60` (seconds) |
| streamEnabled | `BaseConfig.streamEnabled(false)` | Set to `true` to enable streaming mode.Set to `false` to disable streaming mode. | `true` |
| analyticsEnabled | `BaseConfig.analyticsEnabled(true)` | Set to `true` to enable analytics.Set to `false` to disable analytics.**Note**: When enabled, analytics data is posted every 60 seconds. | `true` |


```
For example:  
// Create Options  
BaseConfig options = BaseConfig.builder()  
        .pollIntervalInSeconds(60)  
        .streamEnabled(true)  
        .analyticsEnabled(true)  
        .build();
```
 

When initializing the SDK, you can also configure it to use the Harness Relay Proxy, for more information about how to do this, go to [Use the Relay Proxy](3-integrate-feature-flag-with-java-sdk.md#use-the-relay-proxy). 

### Complete the initialization

To complete the initialization, create an instance of the `cfClient` and pass in the Server SDK key, Target, and configuration options. 

### Sample of initializing the SDK


```
// Connector Config  
HarnessConfig connectorConfig = HarnessConfig.builder()  
        .configUrl("https://config.ff.harness.io/api/1.0")  
        .eventUrl("https://config.ff.harness.io/api/1.0")  
        .build();  
  
// Create Options  
BaseConfig options = BaseConfig.builder()  
        .pollIntervalInSeconds(60)  
        .streamEnabled(true)  
        .analyticsEnabled(true)  
        .build();  
  
// Create the client  
CfClient cfClient = new CfClient(new HarnessConnector(apiKey, connectorConfig), options);
```
## Evaluate a Flag

Evaluating a Flag is when the SDK processes all Flag rules and returns the correct Variation of that Flag for the Target you provide. 

If a matching Flag can’t be found, or the SDK can’t remotely fetch flags, the default value is returned. 

There are different methods for the different Variation types and for each method you need to pass in:

* Identifier of the Flag you want to evaluate
* The Target object you want to evaluate against
* The default Variation

For example:

### Evaluate a boolean Variation


```
boolean result = cfClient.boolVariation("sample_boolean_flag", target, false);
```
### Evaluate a number Variation


```
boolean result = cfClient.numberVariation("sample_number_flag", target, 0);
```
### Evaluate a string Variation


```
boolean result = cfClient.stringVariation("sample_string_flag", target, "");
```
### Evaluate a multivariate Variation


```
double number = cfClient.numberVariation(COUNT_FEATURE_KEY, parentTarget, 1);  
      String color = cfClient.stringVariation(COLOR_FEATURE_KEY, target, "black");
```
## Test your app is connected to Harness

When you receive a response showing the current status of your Feature Flag, go to the Harness Platform and toggle the Flag on and off. Then, check your app to verify if the Flag Variation displayed is updated with the Variation you toggled.

## Close the SDK

To help prevent memory leaks, we recommend closing the SDK when it’s not in use. To do this, run the following command: 


```
cfClient.close();
```
## Additional options

### Develop on your local environment

By default, you are connected to the Harness environment but you can use a local connector to develop in your local environment. To do this: 

1. Create three folders to contain the data for your  flags, segments and metrics, for example:  
`local/flags`  
`local/segments`  
`local/metrics`
2. In the flags folder, create files with a `json` extension and the following structure:


```
{  
  "project": "string",  
  "environment": "string",  
  "feature": "string",  
  "state": "on",  
  "kind": "boolean",  
  "variations": [  
    {  
      "identifier": "off-variation",  
      "value": true,  
      "name": "Off Variation",  
      "description": "string"  
    }  
  ],  
  "rules": [  
    {  
      "ruleId": "string",  
      "priority": 1,  
      "clauses": [  
        {  
          "id": 32434243,  
          "attribute": "identifier",  
          "op": "starts_with",  
          "values": [  
            "string"  
          ],  
          "negate": false  
        }  
      ],  
      "serve": {  
        "distribution": {  
          "bucketBy": "string",  
          "variations": [  
            {  
              "variation": "off-variation",  
              "weight": 50  
            }  
          ]  
        },  
        "variation": "string"  
      }  
    }  
  ],  
  "defaultServe": {  
    "distribution": {  
      "bucketBy": "string",  
      "variations": [  
        {  
          "variation": "off-variation",  
          "weight": 50  
        }  
      ]  
    },  
    "variation": "string"  
  },  
  "offVariation": "string",  
  "prerequisites": [  
    {  
      "feature": "string",  
      "variations": [  
        "string"  
      ]  
    }  
  ],  
  "variationToTargetMap": [  
    {  
      "variation": "off-variation",  
      "targets": [  
        {  
          "identifier": "string",  
          "name": "string"  
        }  
      ],  
      "targetSegments": [  
        "string"  
      ]  
    }  
  ],  
  "version": 0  
}
```
3. In the segments folder, create files with a `json` extension and the following structure:


```
{  
   "identifier": "string",  
   "name": "Beta Testers",  
   "environment": "Production",  
   "tags": [  
     {  
       "name": "string",  
       "value": "string"  
     }  
   ],  
   "included": [  
     {  
       "identifier": "john-doe",  
       "account": "abcXDdffdaffd",  
       "org": "string",  
       "environment": "string",  
       "project": "string",  
       "name": "John Doe",  
       "anonymous": true,  
       "attributes": {  
         "age": 20,  
         "location": "Belfast"  
       },  
       "createdAt": 0,  
       "segments": [  
         null  
       ]  
     }  
   ],  
   "excluded": [  
     {  
       "identifier": "john-doe",  
       "account": "abcXDdffdaffd",  
       "org": "string",  
       "environment": "string",  
       "project": "string",  
       "name": "John Doe",  
       "anonymous": true,  
       "attributes": {  
         "age": 20,  
         "location": "Belfast"  
       },  
       "createdAt": 0,  
       "segments": [  
         null  
       ]  
     }  
   ],  
   "rules": [  
     {  
       "id": 32434243,  
       "attribute": "identifier",  
       "op": "starts_with",  
       "values": [  
         "string"  
       ],  
       "negate": false  
     }  
   ],  
   "createdAt": 0,  
   "modifiedAt": 0,  
   "version": 1  
 }
```
 

4. Leave the metrics folder empty.
5. Create an instance of `LocalConnector` and pass in the location of your folders.
6. Pass the instance into the `cfClient` when initializing the SDK.

For example: 


```
LocalConnector connector = new LocalConnector(path);  
CfClient client = new CfClient(connector, BaseConfig.builder().build())
```
 

### Configure your logger

You can provide your own logger to the SDK and configure it using the standard logging configuration. 

#### Log4j logger

If using Log4j you can add the following `log4j2.xml` to your project, for example:


```
<?xml version="1.0" encoding="UTF-8"?>  
<Configuration status="INFO" monitorInterval="30">  
    <Properties>  
        <Property name="LOG_PATTERN">%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1} SDK=${sys:SDK} flag=${sys:version} target=%mdc{target} - %m%n</Property>  
    </Properties>  
  
     <Appenders>  
        <Console name="console" target="SYSTEM_OUT" follow="true">  
            <PatternLayout pattern="${LOG_PATTERN}"/>  
        </Console>  
    </Appenders>  
   
    <Loggers>  
        <Root level="debug">  
            <AppenderRef ref="console"/>  
        </Root>  
    </Loggers>  
</Configuration>
```
  

### Use the Relay Proxy

To use the Relay Proxy, you need to change the following URLs in the HarnessConfig class when initializing the SDK to `http://localhost:7000`.



|  |  |  |  |
| --- | --- | --- | --- |
| **Name** | **Example** | **Description** | **Default Value** |
| baseUrl | `HarnessConfig.configUrl("https://config.ff.harness.io/api/1.0")` | The URL used to fetch Feature Flag Evaluations. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://config.ff.harness.io/api/1.0` |
| eventUrl | `HarnessConfig.eventUrl("https://config.ff.harness.io/api/1.0")` | The URL for posting metrics data to the Feature Flag service. When using the Relay Proxy, change this to: `http://localhost:7000` | `https://events.ff.harness.io/api/1.0` |

For example: 


```
HarnessConfig connectorConfig = HarnessConfig.builder()  
        .configUrl("http://localhost:7000")  
        .eventUrl("http://localhost:7000")  
        .build();
```
## Sample code for a Java application

Here is a sample code for integrating with the Java SDK:


```
package io.harness.ff.examples;  
  
import io.harness.cf.client.api.*;  
import io.harness.cf.client.dto.Target;  
   
import java.util.concurrent.Executors;  
import java.util.concurrent.ScheduledExecutorService;  
  
import java.util.concurrent.TimeUnit;  
  
public class GettingStarted {  
    // API Key - set this as an env variable  
    private static String apiKey = getEnvOrDefault("FF_API_KEY", "");  
   
    // Flag Identifier  
  
    private static String flagName = getEnvOrDefault("FF_FLAG_NAME", "harnessappdemodarkmode");  
  
    private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);  
  
   
    public static void main(String[] args) {  
        System.out.println("Harness SDK Getting Started");  
   
        try {  
            //Create a Feature Flag Client  
            CfClient cfClient = new CfClient(apiKey);  
            cfClient.waitForInitialization();  
   
            // Create a target (different targets can get different results based on rules.  This includes a custom attribute 'location')  
  
            final Target target = Target.builder()  
                    .identifier("javasdk")  
                    .name("JavaSDK")  
                    .attribute("location", "emea")  
                    .build();  
  
   
            // Loop forever reporting the state of the flag  
            scheduler.scheduleAtFixedRate(  
                    () -> {  
                        boolean result = cfClient.boolVariation(flagName, target, false);  
                        System.out.println("Boolean variation is " + result);  
                    },  
                    0,  
                    10,  
                    TimeUnit.SECONDS);  
   
        } catch (Exception e) {  
            e.printStackTrace();  
  
        } finally {  
            // Close the SDK  
            CfClient.getInstance().close();  
        }  
    }  
   
    // Get the value from the environment or return the default  
    private static String getEnvOrDefault(String key, String defaultValue) {  
        String value = System.getenv(key);  
        if (value == null || value.isEmpty()) {  
            return defaultValue;  
        }  
        return value;  
    }  
}
```
