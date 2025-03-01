---
title: Is there a JAR file for Java SDK?
sidebar_label: Is there a JAR file for Java SDK?
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360032253871-Is-there-a-JAR-file-for-Split-Java-SDK </button>
</p>

## Question

Some Java Frameworks, like ColdFusion, allow third party JAR files to integrate with their code. How can we get a JAR file for Split Java SDK?

## Answer

Split Java SDK uses a Maven repository, which is why no JAR file is needed when using Maven engine to access the SDK and all its dependent libraries.
The JAR file can be downloaded from the Maven repository. Root access URL:
https://repo1.maven.org/maven2/io/split/client/java-client/

For example, the JAR file download URL for SDK version 4.2.1 is
https://repo1.maven.org/maven2/io/split/client/java-client/4.2.1/java-client-4.2.1.jar