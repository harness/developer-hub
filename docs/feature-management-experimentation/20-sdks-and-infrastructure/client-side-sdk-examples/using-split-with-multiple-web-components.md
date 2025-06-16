---
title: Using multiple web components and a single SDK factory instance
sidebar_label: Using multiple web components and a single SDK factory instance
sidebar_position: 1
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/17187557200525-Using-Split-with-multiple-web-components-and-a-single-factory-instance </button>
</p>

## Using FME SDK in a micro frontend environment
This code example, contributed by Joshua Klein, shows how to employ a shared SDK module injected into each of multiple micro frontend JS files. This approach allows for independent development and tooling without having multiple SDK factory instances running the in the same browser.

https://github.com/kleinjoshuaa/Multiple-Web-Components 

## What are micro frontends?
Micro Frontends are a relatively new architectural style that involves extending the concept of microservices to the front end of an application. Essentially, in a micro frontend architecture, each UI module is developed, deployed, and maintained independently. This allows independent teams to move faster and have more control over their individual components. Similarly to microservices this requires well-defined interfaces and APIs to ensure that intercommunication between micro frontends scales and is maintainable.

In this [example](https://github.com/kleinjoshuaa/Multiple-Web-Components) we will show how to use Split as a shared utility that is in scope for each micro frontend.