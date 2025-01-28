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

If your development environment requires unit tests, we recommend running tests on your code that is integrated to Split SDK for all possible treatments values returned from SDK's getTreatment call. The SDK Localhost mode is the best option to achieve this while keeping your code integrated to SDK.

Each SDK language support localhost mode which reads the Split names and their treatments from a local Yaml file, instead of connecting to Split cloud. This enable creating multiple Yaml files, each with unique treatment values and cycle through all the possible treatments returned from each Split.

As mentioned above, using localhost mode does not require any network connection to Split cloud and will not write any Impressions records to the Split account, making the unit test runs smoothly.

![](https://help.split.io/hc/article_attachments/360031204571)

To learn how to use localhost mode, please check the corresponding SDK language page, under Localhost section in [this link](https://help.split.io/hc/en-us/sections/360003839712-Documentation).

We also have a [Python script](https://help.split.io/hc/en-us/articles/360029219192-Python-Admin-API-Sample-Export-Splits-Treatments-to-YAML-file) that automatically create Yaml files containing Split names and their treatments from given Splits list.