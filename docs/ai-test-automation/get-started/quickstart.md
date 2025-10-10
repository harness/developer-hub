---
title: Get started with AI Test Automation
description: Build an end-to-end test for a workflow
sidebar_position: 20
sidebar_label: Get Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness AI Test Automation is an AI-powered testing platform designed to streamline test creation and maintenance for software development teams. The tool uses generative AI to transform plain text test cases into automated tests, and implements self-healing mechanisms that automatically update tests when application interfaces or workflows change, reducing the manual overhead of test maintenance.

Getting started with AI Test Automation follows these steps:
- [Create your first test](/docs/ai-test-automation/get-started/quickstart#create-your-first-test)
- [Create a login task](/docs/ai-test-automation/get-started/quickstart#create-a-login-task)

<!-- Note: If you are an existing Relicx customer, please continue to refer to 
[Relicx documentation](https://docs.relicx.ai/) -->

## Prerequisite
Your application must be accessible from the public cloud. For testing applications behind a corporate firewall please contact Harness support. 

## Sign-up

This document assumes that you already have an account with Harness. Login using your harness account and select AI test Automation from the module selector. 

### Select or Add a Project

Select the project where you want to add your tests. If one doesn't exist then create a new project. Once a project is created and you select AI Test Automation, you will be prompted to add your test environment


## Create your first test

<DocVideo src="https://app.tango.us/app/embed/f576a21b-38d4-4427-baa1-e06d27a2d589?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create and Run Test in Harness AI Test Automation" />

After you have signed up, the first step would be to create an AI powered test.

The `Create Test` button sets up a test pod where you can author your test while interacting with the browser.
Before you can start recording your test, check the Start URL. This should be the url pointing to your app. If needed update the URL and click on the create test button. You will now be on the `Interactive AI trainer` and you can start recording your test.
Once on the trainer, you can interact with the browser or may also choose to enter a natural language prompt and start authoring a test.
Once you are done, save the test and give it a name 

If you choose to run the test after save, it will be executed and you can follow the execution on the test run page 

![](./static/create-test-6.png)

## Create a login task 

<DocVideo src="https://app.tango.us/app/embed/dc74a4dc-9348-4aea-a7bf-09087a1a7640?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create Login Task in Harness AI Test Automation" />

:::info Authentication Requirement
If your application requires authentication, you can avoid repeating login steps in every test.
Harness AI Test Automation lets you create a reusable login task that runs automatically whenever a test is created or executed. Simply create the task once and enter your login credentials.
:::


After you click Create a login task, the following modal appears where you can enter the required details. This is a one-time setup, and the process works the same way as creating a test.

Enter your task name ( e.g. Login task) and login URL. 
For most applications, the application base URL is used for logging into the app, so no change is necessary. In the subsequent step, you can enter the username, password, or any other details like a One-time passcode (OTP)

The task should have all the steps that are necessary to login to your application.

:::tip

It is always a good idea to add an assertion at the end of the login task to make sure the login is successful. 

:::

Once the login task is created, you will be able to automatically add it to your tests

![](./static/create-login-task-6.png)

Once you have created your login task and created your first test, you should be in a position to add more tests. Once you have a handful of tests, create a test suite and run your tests together. 