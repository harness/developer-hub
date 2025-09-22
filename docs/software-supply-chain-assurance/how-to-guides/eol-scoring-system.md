---
title: EOL Scoring System
description: Learn about the categories used to calculate the EOL score
sidebar_label: EOL Scoring System
sidebar_position: 112
---


**EOL Component:** A component is considered End of Life (EOL) when it is no longer maintained or officially deprecated, making it risky to rely on in production.

**Close to EOL Component:** A component is considered Close to EOL when warning signals (such as declining maintenance, lack of updates, or security issues) indicate that it may soon reach EOL.

### EOL Proximity Scoring System


The EOL scoring framework evaluates multiple risk categories and assigns a score from 0 to 100.

 **EOL:** 60 - 100

 **Close to EOL:** 30 - 59



## Categories that Influence the EOL Score

| Category              | Description | Example Indicators |
|-----------------------|-------------|--------------------|
| **Deprecation Signals** | Official deprecation notices, archived repositories, or metadata fields clearly indicate that the package is no longer maintained. | Archived GitHub repo, `deprecated` flag in package metadata |
| **Security Risk**       | Unpatched high-severity vulnerabilities or the absence of a security response process signal that the package is unsafe to use. | Open CVEs in NVD/OSV, unaddressed security advisories |
| **Maintenance Activity**| A decline in commit frequency, long gaps between releases, or reliance on bot-driven maintenance reflects poor upkeep. | Last commit > 1 year ago, bot-driven dependency updates |
| **Community Health**    | Unanswered issues and pull requests, inactive maintainers, or low contributor engagement highlight weak community support. | PRs open > 6 months, no maintainer responses |
| **Adoption Trends**     | A sharp decline in downloads or ecosystem usage suggests that the package is losing adoption. | Drop in npm/PyPI downloads, fewer GitHub stars over time |
| **Technology Relevance**| Support limited to outdated runtimes, such as EOL versions of Python, Java, or Node.js, shows reduced long-term viability. | Works only on Python 2.7 or Java 7, no support for Node.js LTS |





