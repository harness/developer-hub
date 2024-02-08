---
description: KB - This comprehensive guide serves as your roadmap to harnessing the full power of NextGen artifact sources. Learn how to configure, manage, and optimize your artifact workflow with confidence, unlocking greater efficiency and achieving faster deployments.
title: "Future-Proof Your Workflow: Harness NextGen Artifact Sources"
---
# Future-Proof Your Workflow: Harness NextGen Artifact Sources

Artifact sources are vital to Harness' continuous delivery platform, allowing you to manage your application's dependencies efficiently. However, many questions surround their behaviour and how they differ between FirstGen and NextGen. This comprehensive guide aims to demystify Artifact Sources and address your concerns.

## FirstGen: The Legacy Approach
FirstGen offered a foundational approach to artifact management, but it had limitations that hampered user experience and scalability:

* **Rigid Configurations:** Artifact sources were static, requiring separate configurations for similar images. This led to redundancy and configuration overload.

* **Stale Data:** Artifact collection in FirstGen cached data, causing outdated information and potential deployment errors.

* **Unnecessary Polling:** Constant polling of all configured sources, regardless of their usage, wasted resources and overloaded artifact servers.

* **Limited Tag Management:** Users lacked the flexibility to enter specific versions/tags directly, making managing large lists cumbersome.

## NextGen: Embracing Agility and Performance
NextGen overcomes these limitations with a dynamic and efficient approach to artifact management:

* **Runtime Fields:** Every field in an artifact source can be dynamic, allowing configurations based on variables and expressions. This empowers users with greater flexibility and simplifies complex deployments.

* **On-Demand Loading:** Versions/tags are loaded only when needed, eliminating outdated data and ensuring users always see the latest information.

* **Smart Access:** NextGen eliminates unnecessary polling, accessing artifact sources only when interacted with, reducing server load and improving performance.

* **Direct Version/Tag Input:** Users can directly enter any version/tag, even if it's not listed, streamlining workflows and enhancing user experience.

## Sorting and Ordering: Understanding the Differences

* **FirstGen:** Versions were primarily sorted based on the timing of their push to the artifact server (Docker registry, Artifactory, etc.). This was due to the presence of artifact collection. 

* **NextGen:** Sorting differs between different types of artifact:
  - **Supported servers:** If the artifact server supports sorting, NextGen utilizes it for optimized display.
  - **Limited support:** For servers lacking built-in sorting, NextGen fetches and sorts all versions/tags on the client side.
  - **Timestamp limitations:** Servers like Docker registries lack timestamp support, leading to lexicographic sorting. This might cause inconsistencies if your workflow involves the use git commit IDs as tags or a similar strategy.

If you are looking for the order and limits of different artifact sources in NextGen, they are listed [here](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#artifact-limits-and-display-in-the-harness-ui).

## Performance Optimizations for NextGen

While NextGen offers significant improvements, certain challenges can impact performance:
* **Server capabilities:** Limited search, filter, or sort functionalities on some artifact servers can affect performance due to client-side sorting.
* **Large tag sets:** Extensive lists of tags (>10,000) can lead to slower loading times due to a lot of API pagination.

Here are some solutions to optimize performance:
* **Predictable tagging:** Consider using semantic versioning and a predictable tagging strategy like appending the build number or timestamp. This ensures clear understanding of version order. If you use Harness CI, then you could use the pipeline execution sequence ID for consistent and faster sorting. 
* **Archiving old tags:** Regularly archive outdated versions/tags to maintain a relevant and manageable list.
* **Contacting support:** For specific server limitations, contact Harness support for further assistance.

## Conclusion
NextGen's innovative approach to artifact sources represents a significant leap forward, offering greater flexibility, efficiency, and control over your application's dependencies. By understanding the differences between FirstGen and NextGen, you can leverage the full potential of this powerful feature and optimize your continuous delivery process.

## Additional Resources

[Artifact Sources in CD](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/) - Find out how to set up different artifact sources and find out how each of the artifact sources are ordered.
