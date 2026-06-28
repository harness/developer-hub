---
title: "Remote vs local evaluation: choosing the right client-side SDK"
sidebar_label: Choosing an evaluation mode
description: Understand how Harness FME client-side SDKs evaluate feature flags, when to choose local evaluation with the standard SDK, and when to choose remote evaluation with the thin SDK.
---

Harness FME offers two ways for a client-side SDK to evaluate feature flags: **local evaluation** with a standard SDK and **remote evaluation** with a thin SDK. Both modes use the same SDK key, the same evaluation API, the same hashing logic, and the same FME UI for authoring flags and segments. Treatments are consistent across modes for the same target. They differ in where the rollout plan lives, where evaluation runs, and what data leaves the device.

Local evaluation is the default and the right choice for most client-side applications: user attributes stay on the device, and once the SDK is ready it can evaluate any flag for any target or attributes combination.

## Two privacy properties, not one

The choice between modes is often a privacy choice, but the privacy properties point in different directions.

**Local evaluation protects user attributes.** Attributes you pass to `getTreatment` (PII, business context, session data) never leave the application. Evaluation happens on the device. The client-side SDK API key is scoped so the segment membership check can only answer "is this key in segment X?" for the current target. A reader of your client cannot enumerate segment contents. They can, however, read the targeting rules themselves.

**Remote evaluation protects targeting rules.** Flag definitions, targeting rules, and the segment membership check stay in FME cloud. Nothing about the rollout plan is reachable from the client. The cost is that user attributes leave the device: they are sent to the Remote Evaluator whenever the SDK fetches evaluations for a target.

Most client-side surfaces are well served by local evaluation: it is the simplest choice, and it protects user attributes. Remote evaluation is the right tool when those targeting rules themselves carry information that has to stay private, and it closes a rule-visibility gap that local evaluation cannot.

## When to choose local evaluation

Choose local evaluation with a **standard SDK** when:

- Keeping user attributes private, on the device, is the priority.
- The target or its attributes change often, such as:
  - a user switching context
  - attributes updating mid-session
- A multi-tenant application evaluates multiple targets concurrently.
- The application needs to keep evaluating flags or update the target when the network is unavailable.

If in doubt, choose local. It is the simplest choice and the right answer for the majority of client-side applications.

Server-side applications, which evaluate flags for many users per process, are always local evaluation. Use the [standard server-side SDKs](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks) for those.

## When to choose remote evaluation

Choose remote evaluation with a **thin SDK** when one of the following is the deciding factor:

- Targeting rules and segment-membership checks must not be reachable from the client at all.
- A specific policy or compliance requirement rules out shipping a rules engine to the client.
- Evaluation must have a single server-side source of truth, for auditability or to prevent client divergence from the cloud.

Remote evaluation is not a substitute for local evaluation. It closes the rule-visibility gap when that is the binding concern.

Remote evaluation is built for **single-tenant client-side surfaces** where each SDK instance serves one target at a time. Today the thin SDKs cover:

- Browsers: see the [JavaScript Thin SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-thin-sdk).
- Mobile applications:
  - For iOS apps, see the [iOS Thin SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/ios-thin-sdk).
  - For Android apps, see the [Android Thin SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-thin-sdk).
- Serverless functions and edge runtimes:
  - For JavaScript or Node runtimes, see [Serverless and edge environments](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-thin-sdk#serverless-and-edge-environments).

If you have a single-tenant use case in a language that does not yet have a thin SDK, [submit a feature request](https://ideas.harness.io/feature-request).

## What stays the same across modes

Working in either mode looks much the same to your application:

- **Same SDK key.** Use the existing client-side SDK API key type. No new credential to provision.
- **Same evaluation and tracking API.** `getTreatment`, `getTreatments`, `getTreatmentsByFlagSets`, and `track` exist in both modes with the same semantics. The thin SDK packages the matching key, traffic type, and attributes into a `target` object rather than passing them as separate arguments, but the inputs are the same.
- **Same impressions.** Both modes generate impressions. The standard SDK posts them from the device; with the thin SDK, the Remote Evaluator records them server-side. Metrics, experiments, and the impressions live tail work identically across modes.
- **Same deterministic bucketing.** Both modes use the same Murmur3 hashing and bucketing logic. The same target + the same flag + the same seed yields the same treatment, whether evaluation runs in-process or in the Remote Evaluator.
- **Same authoring.** Flags, segments, traffic types, and targeting rules are created and managed the same way in the FME UI for both modes.

A team migrating a surface from one mode to the other rewires initialization and, in the thin SDK, packages target inputs differently. Application-level evaluation logic does not change.

## What is different across modes

The differences concentrate in three areas: where data lives, what happens at initialization, and what happens when the target changes.

| Dimension | Local evaluation (standard SDK) | Remote evaluation (thin SDK) |
| --- | --- | --- |
| Where the rollout plan lives | Cached on the device | In FME cloud |
| Where attributes go | Stay on the device | Sent to the Remote Evaluator on every evaluation |
| Initialization | Downloads rollout plan and segment data | Pulls evaluations for the current target |
| Before the SDK is ready | Returns the configured fallback treatment, or control if none matches | Returns the configured fallback treatment, or control if none matches |
| Steady-state evaluation | In-process; no network call | In-memory cache read; no network call |
| Changing the target | No refetch unless the matching key changes (in which case segment membership for the new key is fetched) | Refetch on any change to `key`, `trafficType`, or `attributes` |
| Offline behavior | Works after the first sync; new flag updates resume when connectivity returns | Returns cached results when available; new evaluations fall back to the configured fallback treatment or control |
| Cloud dependency in the evaluation path | None | Required |

Two of these deserve a closer look.

### Initialization and caching

Both modes pay an initialization cost. Until ready, evaluations return a configured [fallback treatment](/docs/feature-management-experimentation/feature-management/setup/fallback-treatment) if one matches the flag, otherwise the [control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment). They get there differently.

The standard SDK downloads the rollout plan once at start. Because every standard SDK in an environment downloads the same rollout plan, the response is served from a CDN for the overwhelming majority of SDK initializations. Updates after start are small deltas streamed in.

The thin SDK fetches evaluations for every flag at once at initialization, scoped to the current target. That response is specific to the target and the current flag versions, so the cache is narrower and reuse across applications is lower. The initial fetch for a new target reaches FME more often than the equivalent rollout-plan fetch in local mode.

### Changing the target

In local evaluation, switching target or changing attributes is a local operation. The rollout plan is already loaded and the new evaluation runs against it. The SDK only fetches new data when the matching key changes, in which case segment membership for that new key is pulled. Most target changes incur no network cost.

In remote evaluation, every change to the target invalidates the cached evaluations and triggers a refetch against the Remote Evaluator. This makes remote evaluation a strong fit for applications with a small, stable set of targets per SDK instance (typical single-tenant or few-tenant clients) and a poor fit for applications that switch target frequently or serve many distinct keys from a single SDK instance.

## How FME SDKs evaluate flags

In **local evaluation**, the standard SDK downloads the rollout plan (flag definitions and targeting rules) into memory and evaluates flags in-process. Streaming or polling keeps the local copy fresh. Segment membership is checked against the FME servers one key at a time through a client-side scoped endpoint; the SDK never receives the full membership list of a segment. `getTreatment` runs entirely on the device, with no network call in the evaluation hot path.

In **remote evaluation**, the thin SDK does not download the rollout plan at all. At initialization, the SDK sends the SDK key and the target (`key`, `trafficType`, and `attributes`) to the **Remote Evaluator** in FME cloud, which evaluates every flag for that target and returns the results in one response. The SDK caches those evaluations in memory, and subsequent `getTreatment` calls read from the cache with no network call. New evaluations are only fetched when the target changes or when flag updates invalidate the cache.

The mental model:

- With local evaluation, the rules come to the device, and user attributes stay on the device.
- With remote evaluation, user attributes go to the cloud, and the rules stay in the cloud.

## Mixing modes in one application

You can use both modes in the same application by surface. Same SDK key. Same target. Same treatment. Impressions, metrics, and experiments stay consistent across the boundary because both modes use the same hashing logic and both modes generate impressions.

A common pattern is to keep most of the application on the standard SDK and reserve the thin SDK for the surfaces where rule visibility is the binding constraint.

## Next steps

- To set up a standard SDK, see [Client-side Standard SDKs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks).
- To set up a thin SDK, see [Client-side Thin SDKs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/thin-sdks).
