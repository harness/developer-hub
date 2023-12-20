---
title: Jenkins plugin
description: Use the plugin to send jenkins builds data to SEI
sidebar_position: 2
sidebar_label: Jenkins plugin
---

The SEI Jenkins Plugins is a tool, written in Java, which is used to send reports about jenkins builds to SEI.

#### **To install this plugin please follow the following steps.**

* Sign-in to Jenkins and select Manage Jenkins.
* Select “Manage Plugins”.
* Select the “Available plugins” tab.
* In the “Search Plugin” box, type "propelo"
* Install the plugin called "SEI Job Reporter" by selecting it and clicking "Install without restart".
* Once the plugin installation is complete, the status will change to “Success". If it doesn't change to "Success" a restart might be needed

## SEI Job Reporter Plugin

The SEI Job Reporter Plugin, monitors all job runs. As soon as a job run completes it sends the info about job run and failed logs back to SEI SaaS. 

It does not do any periodic push. It gathers info about job stages and steps. If a job run fails and does not have stages the plugin captures the failed job run logs, else if it has stages and no steps, the plugin captures logs for the failed steps, else if it has steps, the plugin captures logs for failed steps. It does not capture the logs for any successful job or stage or step. This plugin supports the failure triage feature.





| Dependency Name                        | Direct Dependency/Indirect Dependency | Version | URL                                                                                                              |
| - | - | - | - |
| Favorite                               | Indirect                              | 2.3.2   | [https://plugins.jenkins.io/favorite](https://plugins.jenkins.io/favorite)                                       |
| Variant                                | Indirect                              | 1.3     | [https://plugins.jenkins.io/variant](https://plugins.jenkins.io/variant)                                         |
| REST Implementation for Blue Ocean     | Direct                                | 1.23.2  | [https://plugins.jenkins.io/blueocean-rest-impl](https://plugins.jenkins.io/blueocean-rest-impl)                 |
| Common API for Blue Ocean              | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-commons](https://plugins.jenkins.io/blueocean-commons)                     |
| REST API for Blue Ocean                | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-rest](https://plugins.jenkins.io/blueocean-rest)                           |
| Design Language                        | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/jenkins-design-language](https://plugins.jenkins.io/jenkins-design-language)         |
| Blue Ocean Core JS                     | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-core-js](https://plugins.jenkins.io/blueocean-core-js)                     |
| Web for Blue Ocean                     | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-web](https://plugins.jenkins.io/blueocean-web)                             |
| JWT for Blue Ocean                     | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-jwt](https://plugins.jenkins.io/blueocean-jwt)                             |
| Pipeline implementation for Blue Ocean | Direct                                | 1.23.2  | [https://plugins.jenkins.io/blueocean-pipeline-api-impl](https://plugins.jenkins.io/blueocean-pipeline-api-impl) |
| Pipeline SCM API for Blue Ocean        | Indirect                              | 1.23.2  | [https://plugins.jenkins.io/blueocean-pipeline-scm-api](https://plugins.jenkins.io/blueocean-pipeline-scm-api)   |
| HTML Publisher                         | Indirect                              | 1.23    | [https://plugins.jenkins.io/htmlpublisher](https://plugins.jenkins.io/htmlpublisher)                             |
| Dashboard for Blue Ocean               | Direct                                | 1.23.2  | [https://plugins.jenkins.io/blueocean-dashboard](https://plugins.jenkins.io/blueocean-dashboard)                 |
| Pub-Sub "light" Bus                    | Indirect                              | 1.13    | [https://plugins.jenkins.io/pubsub-light](https://plugins.jenkins.io/pubsub-light)                               |