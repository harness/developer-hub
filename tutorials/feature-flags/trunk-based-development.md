---
sidebar_position: 1
description: Take a journey with me into trunk-based development! We are going to talk about what TBD is, breaking it down (demystifying), and how to get started. TBD is a great way for your dev team to get started branching efficiently..
keywords: [JavaScript, React, Feature Flags, FF Tutorial]
---

# Demystifying Trunk-Based Development

## What is Trunk-Based Development?

Trunk-based development or TBD is one of a few different branching strategies that your team, or even you can use to bring features in quickly to the main branch of your workflow. When we talk or think about branching strategies, the first one that comes to mind is the GitFlow. GitFlow definitely has its place in the creation of software.‍

In order for your team to run like a well oiled machine, having a branching strategy at the forefront of your development practices will be key to getting code quickly out the door. All branching strategies can achieve that, but TBD, will give you that extra leverage without merge hell. We all love merge hell don’t we lol?‍

By now I am sure we have all heard the term “merge hell” and one of the catalysts for that is what I call the “rebase race”. Hurrying up to rebase changes that are pulled in from main in order to get your changes merged in, and fingers crossed nothing breaks. We have ALL been there. It isn’t fun. Another benefit of TBD is avoiding merge hell with small commits to the main branch.

## Implementing TBD in a React app (without feature flags)
