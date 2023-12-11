---
description: KB - Gain a deep understanding of <+lastPublished.tag> and its behavior across different artifact servers. Discover best practices to prevent misdeployments and achieve confident deployments.
title: "Mastering <+lastPublished.tag>: Unleashing its Power with Confidence"
---

# Mastering <+lastPublished.tag>: Unleashing its Power with Confidence
Harness' `<+lastPublished.tag>` expression offers incredible convenience, allowing for effortless deployment of the latest version published to your artifact servers. But like any powerful tool, it requires a deep understanding to avoid potential pitfalls and unlock its true potential. This blog post delves into the intricacies of `<+lastPublished.tag>`, exploring its inner workings, potential quirks, and best practices for deploying with confidence.

## Unveiling the Power
Imagine a scenario where you manage multiple versions of your application image across different environments. Utilizing an ECR registry, you diligently follow a tagging scheme:

* `v{TIMESTAMP}-dev` for development builds
* `v{GIT_TAG}-stable` for production

Now, you want to deploy the latest dev version to a test environment. This is where <+lastPublished.tag> shines!

Within your run form, you simply specify `<+lastPublished.tag>.regex(*-dev)`. This clever expression performs three key actions:

1. **Fetches all tags:** Harness diligently retrieves all available tags stored in your ECR registry.
2. **Sorts meticulously:** The retrieved tags undergo a meticulous sorting process, ensuring proper order for deployment.
3. **Selects the latest match:** Utilizing the provided regex (e.g., `*-dev`), the expression identifies the first tag that matches the specified pattern.

This carefully selected tag becomes your target, effortlessly deploying the latest development version to your test environment.

## Navigating the Quirks
While `<+lastPublished.tag>` offers incredible convenience, its power comes with nuances to be aware of. Different artifact servers utilize distinct sorting mechanisms, impacting the behavior of the expression. Here's where things can get tricky:

### Lexicographic Sorting

ECR, for instance, sorts tags lexicographically due to limitations in its API. This means the order of tags primarily relies on their alphabetical characters rather than timestamps. Consequently, even if you push tags in a specific order, their lexicographic order might differ.

For example, consider the following scenario:

You push tags in the following order:

```
v834a275-dev
v6b12c0d-dev
v4df5e8-dev
v92037f3-dev
v745c91a-dev
```

You use `<+lastPublished.tag>.regex(*-dev)`. In this case, despite `v745c91a-dev` being the latest pushed tag, `<+lastPublished.tag>` would deploy `v92037f3-dev` due to lexicographic sorting.

### Timestamp-Based Sorting

Conversely, artifact servers like Nexus provide timestamp information, allowing Harness to sort tags based on their actual publication time. This ensures the latest version, regardless of its lexicographic position, is accurately identified.

## Avoiding Misdeployments
To prevent potential misdeployments and maintain clarity, consider these best practices:

### Predictable Tagging

Embrace semantic versioning or a consistent tagging strategy, like appending build numbers or timestamps. This promotes clear understanding and prevents confusion stemming from lexicographic sorting.

For example, use tags like `v1.2.3-dev` instead of `v834a275-dev`.

### Harness Documentation

Familiarize yourself with the specific sorting behavior and limitations applicable to your chosen artifact server. [The Harness documentation provides](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#artifact-limits-and-display-in-the-harness-ui) detailed information of the sort order of different artifact sources.

## Conclusion
`<+lastPublished.tag>` offers a powerful and convenient solution for deploying the latest version of your application. By understanding its inner workings, potential nuances, and best practices, you can unlock its full potential and achieve seamless deployments with confidence. Remember, predictable tagging, thorough documentation review, and utilizing appropriate expression variations are your allies in navigating the intricacies of different artifact servers. So, unleash the power of `<+lastPublished.tag>` and experience the joy of effortless deployments!
