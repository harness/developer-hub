---
title: Feature Management in Harness FME
description: Learn about feature management in Harness FME.
id: index
slug: /feature-management-experimentation/feature-management
redirect_from:
  - /docs/feature-management-experimentation/feature-management/faqs/cannot-delete-feature-flag-from-ui-even-after-deleting-the-targeting-rules
  - /docs/feature-management-experimentation/feature-management/faqs/ensure-a-consistent-user-experience
---

## Overview

A feature flag allows you to choose between different code paths in your system at runtime. Feature flags are an integral part of continuous delivery allowing you to decouple deployment from release. They also enable teams to safely merge new features, bug fixes, or other code changes to one central branch in the version control system, which avoids long-lived feature branches and merge issues by integrating code changes frequently.

When you create a feature flag, you specify metadata, including the flag name, description, owners, and tags. This information helps you and your team manage your feature flags and customize them to your team's workflow.

### Feature flags and SEO

Using feature flags to run experiments or deliver different variations of a page can have some impact on SEO, depending on what content is visible to search engines during crawling. Most of the time, the impact is minimal, especially for short-term tests. That said, long-term experiments that serve vastly different versions of the same page might lead to ranking differences if search engines crawl both versions multiple times.

Web crawlers like Google typically perform their initial crawling with JavaScript disabled. This means `getTreatment()` won’t be called, and the bot will receive the control treatment. On the backend, the bot is usually treated as anonymous traffic and should be assigned a new key, just like you would with a real anonymous user.

To avoid SEO issues, it's best practice to maximize the quality of your page before JavaScript rendering—focusing on static elements like titles, text content, and hrefs. Any SEO in place for that initial crawl will remain unaffected by the feature flag unless you introduce targeting rules that behave differently for bots.

### Cloaking considerations

Cloaking refers to deliberately serving different content to search engines than to real users, which can violate search engine guidelines. Feature flags don’t inherently enable cloaking. However, it is possible to cloak content using user agent targeting, such as detecting a search bot and routing it to a specific treatment. But this would require explicit implementation and is not something feature flags do by default.

### Experimentation and SEO

Both Google and Microsoft have confirmed that A/B testing is safe for SEO when done correctly. If you want to provide a consistent experience for crawlers during experimentation, consider using a consistent key for bots during randomization. Just avoid explicitly targeting user agents for different content, which may raise concerns around cloaking.

## Ensuring a consistent user experience

### Random and Deterministic Treatment Assignment

Harness FME (powered by Split) uses a **deterministic hashing algorithm** to decide which treatment (experience) to deliver for a feature flag. The algorithm takes two main inputs:

- **User ID:** This can be an anonymous user ID, logged-in user ID, account number, or any string representing the entity. The ID’s type is specified by its [traffic type](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/).
- **Feature flag:** When the SDK initializes, it downloads targeting plans for all flags. Each flag has a unique **seed** — a random number cached as part of the rollout plan and consistent across all SDKs evaluating that flag.

### How Bucketing Works

For example, when `user_1234` calls `getTreatment` on a flag with seed `123456`:

1. The user ID and flag seed are combined and processed through the deterministic hashing algorithm.
2. The resulting hash is converted to a number and normalized using `Mod 100` into one of 100 buckets.
3. The user consistently falls into the **same bucket** every time for that feature flag, regardless of which SDK evaluates it.

This means the bucket, not the user, is assigned the treatment.

- If a feature is exposed to 10% of users, users in buckets 0-9 get the feature; others do not.
- If exposure increases to 30%, users in buckets 0-29 get the feature.

### Independence and Environment-Specific Seeds

- Split **does not retain any prior knowledge** about users.
- The evaluation happens **every time** a treatment is requested.
- Each feature flag seed is unique per environment (e.g., staging vs production), so bucketing differs across environments.

### Limit Exposure and Bucketing

Limit exposure controls participation in targeting rules:

- All users are first bucketed by **limit exposure**.
- For example, with a 50/50 exposure setting:
  - Buckets 0-49 are subject to targeting and default rules.
  - Buckets 50-99 receive the default treatment directly, excluding them from the experiment or feature.

### Treatment Order Matters

The order in which treatments are defined can affect the consistency of user experience. [Learn more about treatment order](/docs/feature-management-experimentation/feature-management/define-feature-flag-treatments-and-targeting#treatment-ordering-and-traffic-distribution).

### Traffic Type and Targeting Granularity

- **User-level targeting:** Use UUIDs (e.g., logged-in user IDs) for consistent user experiences.
- **Anonymous users:** Use cookies, session IDs, or device IDs, but note that users might not receive consistent experiences if switching devices or clearing cookies.
- **Account-level targeting:** Target by account ID so [all users in the same account get the same experience](/docs/feature-management-experimentation/feature-management/targeting-an-account).

### Important Consideration for Account Targeting

If you do a 50/50 split by account, large accounts with many users might unevenly skew the user count on one side of the experiment, potentially leading to an actual end-user distribution higher than 50%.

Harness FME ensures a consistent user experience by combining deterministic hashing with seed-based bucketing and configurable limit exposure, enabling reliable and predictable feature rollouts across different users and environments.
