---
title: Internal Developer Portal release notes
sidebar_label: Internal Developer Portal
tags: [NextGen, "Internal Developer Portal", "IDP"]
date: 2023-07-11
sidebar_position: 15
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Review the notes below for details about recent changes to Harness Internal Developer Portal.

## Latest - July 12, 2023, version 0.6.0

```mdx-code-block
<Tabs>
  <TabItem value="What's new">
```

- IDP catalog APIs can now be accessed using Harness X-API-Key. [Docs](/docs/internal-developer-portal/features/software-catalog#api-access)
- Newer version of Harness CI/CD plugin added with new annotations support. It's now possible to filter pipelines across projects and orgs. Read more on the [plugin's readme](https://github.com/harness/backstage-plugins/tree/main/plugins/harness-ci-cd)
- Added Harness Feature Flags [plugin](https://github.com/harness/backstage-plugins/tree/main/plugins/harness-feature-flags).
- The `trigger:harness-custom-pipeline` action on the Software Template `template.yaml` is now synchronous with the pipeline execution. So as long as the pipeline executes, the action will keep running and will show the current status of the pipeline.
- Since the `trigger:harness-custom-pipeline` is now synchronous, it's possible to use the `catalog:register` action in a template and register the newly generated software component's `catalog-info.yaml`.

```mdx-code-block
  </TabItem>
  <TabItem value="Early access">
```

This release does not include early access features.

```mdx-code-block
  </TabItem>
  <TabItem value="Fixed issues">
```

- Fix a bug with access control around de-registering a software component.

```mdx-code-block
  </TabItem>
</Tabs>
```

## Previous releases

<details>
<summary>2023 releases</summary>

#### June 27, 2023, version 0.5.0

##### What's new

- Backstage version has been upgraded to [1.14](https://backstage.io/docs/releases/v1.14.0).
- New GitHub based plugins available - [GitHub actions](https://github.com/backstage/backstage/tree/master/plugins/github-actions), [GitHub Insights](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-github-insights), [GitHub Pull requests](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-github-pull-requests)
- Support for GitHub and Google OAuth apps added. You can configure a GitHub or Google OAuth app in the IDP Admin view which is used by the GitHub based plugins to use the logged-in user's credentials to make API requests.
- Support for a URL allow list added. In case of reading API definitions in your `catalog-info.yaml` from a host other than your git provider, you can allow the URL to be read from other domains.

##### Early access

This release does not include early access features.

##### Fixed issues

- System improvements to make the IDP module onboarding faster.

</details>
