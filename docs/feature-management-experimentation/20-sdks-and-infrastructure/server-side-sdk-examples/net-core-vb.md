---
title: .NET Core VB using FME SDK example
sidebar_label: .NET Core VB using FME SDK example
sidebar_position: 3
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360039415491--NET-Core-VB-using-Split-SDK-example </button>
</p>

Example: Basic code to use FME .NET SDK 6.0.1

Environment:

* Visual Studio for Mac 8.4
* NuGet 5.3
* .NET Core SDK 2.1.301
* Packages
  * Common.Logging.NLog41 3.4.1
  * NLog.Config 4.6.8
  * NLog 4.6.8
  * NLog.Schema 4.6.8

How to use:

* Update your relevant FME API key, user ID, and feature flag names in:

```
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
      .Layout = "${longdate} ${level: uppercase = true} ${logger} - ${message} - ${exception:format=tostring}",
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