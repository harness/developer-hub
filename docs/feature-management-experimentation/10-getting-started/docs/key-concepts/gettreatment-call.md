---
title: GetTreatment call
sidebar_label: GetTreatment call
helpdocs_is_private: false
helpdocs_is_published: true
description: "The method used to evalute feature flags in FME SDKs"
---

`GetTreatment` is a method defined in the FME SDKs. When you use an SDK in your application code, the SDK factory client calls the `GetTreatment` method to evaluate a feature flag. This feature flag evaluation is executed in milliseconds locally using [locally cached memory](./fme-definitions.md) without requiring any network calls.

On server-side SDKs a **key** is passed as a parameter to the `GetTreatment` call. On client-side SDKs the key is provided as an SDK factory config parameter.

The **feature flag name** is passed to the `GetTreatment` method, and **attributes** may be passed as parameters.

The `GetTreatment` method returns the feature flag treatment that is evaluated by comparing the key, and any attributes (properties associated with the key), against the feature flag's targeting rules.

Following a `GetTreatment` call, an [impression](./impressions.md) (targeting decision data) may be sent to Harness servers.