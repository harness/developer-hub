* Before you can use Harness AIDA, you must read the [AIDA Data Privacy Overview](https://www.harness.io/legal/aida-privacy) and sign an [End-user license agreenment](https://www.harness.io/legal/aida-terms) with Harness. 

* Currently, this feature is behind the feature flag `STO_AI_ENHANCED_REMEDIATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. 

* Before you implement an AI-generated suggestion, consider carefully the reliability and extent of the publicly-known information about that issue. The accuracy, reliability, and completeness of a suggestion depends on the publicly-known information about the detected issue. An AI-generated suggestion is not guaranteed to remediate the issue and could possibly introduce other issues. 

* You should also consider the suggestion's applicability to your specific target and use case. An issue might have no known remediation, especially if it was recently discovered. An issue might have multiple suggested remediations that are contradictory or applicable only to specific use cases. 

* A specific remediation might involve installing components with usage and license requirements. Check any requirements in advance. 

* The workflow description below shows how you can refine a suggestion by providing more information, such as additional context or code snippets, to Harness AIDA.