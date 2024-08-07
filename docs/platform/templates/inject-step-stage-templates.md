---
title: Inject step and stage in existing Template
description: It allows you to inject step and stage in existing templates wihthout a need to create a new version of the template.
sidebar_position: 7
---

Inject blocks provide a way to customize pipelines without affecting the main template. They allow users to add extra stages or steps at specified points, maintaining the integrity of the original template.

Steps and stages included in the inject block will behave the same as normal steps and stages in the pipeline.

Template editors will be able to add inject block in the pipeline template at any position between a stage.

![](./static/stage_inject.png)

Similarly you can add a inject block in the stage template at any position between a step. 

![](./static/step_inject.png)

