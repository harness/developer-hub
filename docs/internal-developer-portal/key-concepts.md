---
title: Key Concepts
description: Lists all the Key Concepts in Harness IDP.
sidebar_label: Key Concepts
sidebar_position: 2
---

For details on Harness' Key Concepts, go to [Learn Harness' Key Concepts](https://developer.harness.io/docs/get-started/key-concepts).

Before you begin using Harness IDP, you should be familiar with the key concepts.

## Internal Developer Platform
An Internal Developer Portal (IDP) improves the developer experience in an organization, reduces friction in the software delivery cycle and hides the infrastructure complexity for a developer.

## Golden Path
The Golden Path is the opinionated, well-supported and recommend path for build a new software within in an organization. For example, build a backend service, put up a website, create a data pipeline, golden paths to production for new service onboarding.

![](./static/Golden%20Paths%20Dark%20Theme.png)

## Software Component
 It is typically intimately linked to the source code that constitutes the component, and should be what a developer may regard a "unit of software", usually with a distinct deployable or linkable artifact.

## [Software Catalog](https://developer.harness.io/docs/internal-developer-portal/catalog/software-catalog)
A registry of software components. It is a centralized system that keeps track of ownership and metadata for all the software in your ecosystem (services, websites, libraries, data pipelines, etc). The catalog is built around the concept of [metadata YAML files](https://developer.harness.io/docs/internal-developer-portal/catalog/software-catalog#component-definition-yaml) stored together with the code, which are then harvested and visualized in Harness IDP.


## [Service Onboarding](https://developer.harness.io/tutorials/internal-developer-portal/service-onboarding-pipeline)
Self-service workflows that developers use for their platform/DevOps needs. Powered by Harness pipelines.

## TechDocs
TechDocs is Spotify’s homegrown docs-like-code solution built directly into Backstage. Engineers write their documentation in Markdown files which live together with their code - and with little configuration get a nice-looking doc site in their IDP.

## API documentation
Software Catalog in Harness IDP provides a comprehensive framework for defining and managing software entities, including APIs.
The [type of API specs](https://developer.harness.io/docs/internal-developer-portal/get-started/add-api-docs) that could be added in IDP includes openapi, asyncapi, graphql and grpc.

## Developer Onboarding
Is a way to assess new developers’ experience and performance while they start doing meaningful code contribution to the codebase since starting in the org, for example time taken by the new developers to merge their tenth pull request. 

## Software Templates
Describes Templates that developers can use to create new entities. It contains both the parameters that are rendered in the frontend part of the scaffolding wizard (text boxes, auto completes, check-boxes, etc.) and the steps that are executed when scaffolding that component. In Harness IDP [Self Service Flows](https://developer.harness.io/docs/category/self-service-flows) are spftware templates. 

## [Scorecards](http://localhost:3000/docs/category/scorecards)
Scorecards is a way to measure software maturity and best practices. Platform engineering personas (DevOps, SRE, Security, etc.) are able to define certain standards as “checks” for different sets of maturity models or standards in their organization. Based on how many best practices a particular software component follows, it gets a score out of 100. The score is used to gamify developers to meet more standards or best practices. It is also used to estimate a confidence on the software by other teams when thinking about using it internally.

## [Backstage](https://backstage.io/)
Backstage is an open platform for building developer portals. Powered by a centralized software catalog, Backstage restores order to your microservices and infrastructure and enables your product teams to ship high-quality code quickly — without compromising autonomy.

## [Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/overview)
Backstage plugins are used to integrate IDP with different providers for the customisation of IDP. 

## [Platform Engineering](https://www.gartner.com/en/articles/what-is-platform-engineering#:~:text=Platform%20engineering%20is%20an%20emerging,capabilities%20with%20automated%20infrastructure%20operations.)
Platform engineering is an emerging technology approach that can accelerate the delivery of applications and the pace at which they produce business value.
