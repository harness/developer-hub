---
title: Mirror
description: Create pipelines to sync branch and tag changes across repos.
sidebar_position: 45
---

Mirroring syncs changes from one repo to another. In Harness, you can create CI pipelines that mirror branch and tag changes.

You can set up one-way or two-way mirroring.

In Harness, mirroring uses webhook triggers to run a pipeline that replicates commits from the source repo in the target repo. The webhook trigger runs whenever changes are pushed to the source repo. You can also run the mirror pipeline manually, rather than using a webhook trigger.

The pipeline created in this guide is provider agnostic and direction agnostic. This means you can use one pipeline to configure mirroring for many pairs of repos as well as two-way syncing.

While mirroring is not unique to Harness Code, this guide assumes at least one of the repos is in Harness Code.

## Get inputs

To configure mirroring you need some information from the repos you want to sync.

1. Create tokens
1. Get clone urls
1. Create input set(s) (optional)

* Source repo clone URL and a token. The source repo token needs at least read permission.
* Target repo clone URL and a token. The target repo token needs read and write permissions.
* Full reference path that you want to sync from source to target, such as `refs/heads/main` for branches and `refs/tags/v.1.2.3` for tags.

## Create the pipeline

Create a [CI pipeline]().

Add a [Build stage]() and set up your desired [build infrastructure](). The pipeline created in this guide uses a Linux platform on Harness Cloud build infrastructure.

Add [pipeline variables]().
(these use runtime input (`<+input>`). Later in this guide, you will create input sets that contain the predetermined values or ingest them from a webhook trigger)

## Add the mirror script

Add run step.

## Create triggers

For one-way syncing, create one trigger.

For two-way syncing, create two triggers.

these use custom triggers and must be manually registered.

## Test the mirror

verify

## YAML examples

* Generic mirror (any direction)
* One-way from Harness Code to other SCM provider
* One-way from other SCM provider to Harness Code
* Two-way sync