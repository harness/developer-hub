---
title: Unit test code that uses FME SDK
sidebar_label: Unit test code that uses FME SDK
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360029602251-Creating-unit-tests-for-code-that-utilize-Split-SDK <br /> ✘ images still hosted on help.split.io </button>
</p>

If your development environment requires unit tests, we recommend running tests on your code that uses FME SDK for all possible treatments values returned from SDK's `getTreatment` call. The SDK's localhost mode is the best option to achieve this.

All FME SDKs support localhost mode which reads the feature flag names and their treatments from a local YAML file, instead of connecting to Harness servers. You can create multiple YAML files, each with unique treatment values and cycle through all the possible treatments returned from each feature flag.

As mentioned above, using localhost mode does not require any network connection to Harness and will not write any impression data to your Harness account.

![](https://help.split.io/hc/article_attachments/360031204571)

To learn how to use localhost mode, please check the Localhost section of the [SDK documentation](https://help.split.io/hc/en-us/sections/360003839712-Documentation).

We also have a [Python script](https://help.split.io/hc/en-us/articles/360029219192-Python-Admin-API-Sample-Export-Splits-Treatments-to-YAML-file) that automatically creates YAML files containing feature flag names and treatments using a list of feature flags.