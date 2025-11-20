---
title: Contributing to OSS Spinnaker (Plugins and Donations of Code)
---



## Table of Contents
* [Overview of OSS](#mcetoc_1h293plrv2s)* [Proposing Changes](#mcetoc_1h293plrv2t)* [Pull Requests](#mcetoc_1h293plrv2u)* [Testing](#mcetoc_1h293plrv2v)* [Releasing](#mcetoc_1h293plrv30)* [Documentation](#mcetoc_1h293plrv31)

**Overview of OSS**
The Spinnaker open-source project operates under a well-defined governance structure. The Technical Oversight Committee (TOC) oversees the project and its overall direction. Special Interest Groups (SIGs) have been established to focus on specific areas of the project, such as Platform, Security, and Cloud. These SIGs hold regular meetings, and their schedules can be found on the [SIG Meeting Calendar](https://github.com/spinnaker/governance/blob/master/sig-index.md#sig-meeting-calendar).
**Proposing Changes**
The Spinnaker project consists of multiple repositories, with each service having its own repository. Additionally, there is a common library called Kork. However, this will change soon, as there is an ongoing effort to move towards a [monorepo structure.](https://github.com/spinnaker/governance/pull/336)
When [proposing a new feature](https://spinnaker.io/docs/community/contributing/code/submitting/#feature-proposals), [opening a GitHub issue](https://github.com/spinnaker/spinnaker/issues/new) is the recommended approach. This initiates a discussion where the community can contribute ideas, evaluate the feasibility, and assess the potential impact. The opened GitHub Issue is a central hub for collaboration, allowing contributors to align the feature's goals with the project's vision.
For large changes, such as transitioning to a monorepo or introducing a plugin framework, the [Request for Comments (RFC) p](https://spinnaker.io/docs/community/contributing/code/submitting/#requests-for-change)**[r](https://spinnaker.io/docs/community/contributing/code/submitting/#requests-for-change)**[ocess](https://spinnaker.io/docs/community/contributing/code/submitting/#requests-for-change) should be followed. This involves creating an RFC document that outlines the proposed change, its motivations, and its potential impact on the project. By sharing the RFC with the community, contributors can gather feedback and work towards consensus before implementing.
Smaller changes can be made through Pull Requests (PRs), see the Pull Requests section for more info.
By following these collaborative processes, the Spinnaker project ensures that proposed changes are thoroughly discussed, evaluated, and aligned with the community. This inclusive approach fosters a robust development environment where contributors can actively shape the project's direction and enhance its capabilities.
**Pull Requests**
When creating a Pull Request, it is important to include the purpose of the change(s) being made (see this [Deck PR as an example](https://github.com/spinnaker/deck/pull/6756)). This helps reviewers understand the context and intent of the PR. Furthermore, it is essential to describe the testing conducted to ensure the correctness and stability of the changes.
Pull Requests go through a review process, where other contributors review the proposed changes and provide feedback. The feedback can range from code style suggestions to functional and architectural considerations. It is crucial to address the feedback and iterate on the changes until they are deemed acceptable by the reviewers.
The Spinnaker project utilizes the [conventional commit format](https://spinnaker.io/docs/community/contributing/code/submitting/#commit-and-pr-message-conventions) for commit messages. This format follows a structured approach that includes a type, an optional scope, and a subject. The type indicates the nature of the changes made in the commit, while the scope provides additional context if necessary. The subject briefly describes the nature of the changes introduced by the commit. By following this format, commit messages become standardized and easier to understand, aiding in comprehending the changes made throughout the project's development.
**Testing**
Testing is a vital aspect of the Spinnaker project to maintain the quality and reliability of the software. Various tests are conducted, including unit, integration, end-to-end, and real-world tests.
Unit tests test individual components or functions in isolation to verify their behavior. Integration tests ensure that different components work together correctly. End-to-end tests simulate real-world scenarios and validate the overall functionality of the system. Real-world testing involves deploying and running Spinnaker in actual environments to assess its performance and behavior in production-like conditions.
**Releasing**
Spinnaker supports multiple releases simultaneously to accommodate different user needs and preferences. The project maintains a list of supported releases at the following link: [https://spinnaker.io/docs/releases/versions/](https://spinnaker.io/docs/releases/versions/**).
New feature releases are made [approximately every two months](https://spinnaker.io/docs/releases/release-cadence/). One of the project's goals is to minimize breaking changes between releases, ensuring a smoother upgrade process for users. Backported features, where new features are added to existing release branches, may be introduced using feature flagging, allowing users to opt into using new features while running older versions of Spinnaker.
**Documentation**
Updating documentation is an essential part of contributing to the Spinnaker project, and it follows a similar process to updating the codebase. The project's documentation is stored in a Git repository, which can be found at [https://github.com/spinnaker/spinnaker.io](https://github.com/spinnaker/spinnaker.io**).
The documentation repository utilizes Netlify, a platform for continuous deployment, to preview the updates before they are merged into the main documentation site. This allows contributors to see how the changes will be rendered and make any necessary adjustments.

