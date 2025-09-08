---
title: Create a .NET Core VB app using the FME SDK
sidebar_position: 4
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdk-examples/net-core-vb
---

## Overview

This example demonstrates how to build a basic .NET Core Visual Basic (VB) application that integrates with the FME SDK version 6.0.1. You will learn how to configure the SDK, enable debug logging with NLog, and evaluate feature flags for your users.

This setup is ideal for developers working with .NET Core and VB who want to incorporate feature flagging and experimentation into their applications.

## Environment

- Visual Studio for Mac 8.4  
- NuGet 5.3  
- .NET Core SDK 2.1.301  

### Packages

- Common.Logging.NLog41 3.4.1  
- NLog.Config 4.6.8  
- NLog 4.6.8  
- NLog.Schema 4.6.8  

## How to Use

### 1. Configure Logging

The example uses NLog to enable detailed debug logging of the SDK operations. Logging is configured to write to a rolling file named `splitio.log`.

### 2. Initialize the SDK

Update your FME API key, user ID, and feature flag names in the code below to match your environment.

### 3. Sample Code

    ```vbnet
    Imports System
    Imports Splitio.Services.Client.Classes
    Imports Common.Logging.Configuration
    Imports NLog
    Imports NLog.Config
    Imports NLog.Targets

    Public Class Application
    Public Shared Sub Main() 

        ' Enable debug Logging
        Dim fileTarget = New FileTarget With {
        .Name = "splitio",
        .FileName = "splitio.log",
        .ArchiveFileName = "splitio.{#}.log",
        .LineEnding = LineEndingMode.CRLF,
        .Layout = "${longdate} ${level:uppercase=true} ${logger} - ${message} - ${exception:format=tostring}",
        .ConcurrentWrites = True,
        .CreateDirs = True,
        .ArchiveNumbering = ArchiveNumberingMode.DateAndSequence,
        .ArchiveAboveSize = 200000000,
        .ArchiveDateFormat = "yyyyMMdd",
        .MaxArchiveFiles = 30
        }
        Dim rule = New LoggingRule("*", LogLevel.Debug, fileTarget)
        Dim config = New LoggingConfiguration()
        config.AddTarget("splitio", fileTarget)
        config.LoggingRules.Add(rule)
        LogManager.Configuration = config
        Dim properties As NameValueCollection = New NameValueCollection()
        properties("configType") = "INLINE"
        Common.Logging.LogManager.Adapter = New Common.Logging.NLog.NLogLoggerFactoryAdapter(properties)

        ' Using the FME SDK
        Dim splitConfig As ConfigurationOptions
        splitConfig = New ConfigurationOptions()
        Dim factory As SplitFactory
        factory = New SplitFactory("API Key", splitConfig)
        Dim client As SplitClient
        client = factory.Client()
        client.BlockUntilReady(10000)
        System.Console.WriteLine("SDK is Ready")

        Dim treatment As String
        treatment = client.GetTreatment("User ID key","Feature flag name")
        System.Console.WriteLine(treatment)
    End Sub
    End Class
    ```

* Replace `"API Key"`, `"User ID key"`, and `"Feature flag name"` with your actual FME API key, user identifiers, and feature flag names.

* Build and run your .NET Core VB app to start evaluating feature flags.

* Check the generated `splitio.log` file for debug logs.