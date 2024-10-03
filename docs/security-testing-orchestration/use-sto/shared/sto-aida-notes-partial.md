Before you can use Harness AI in STO, you must do the following:
  1. Read the [AIDA Data Privacy Overview](https://www.harness.io/legal/aida-privacy).
  2. Sign an [End-User License Agreement](https://www.harness.io/legal/aida-terms) with Harness.
  3. Enable AIDA in your Harness account. Go to **Account Settings**, select **Default Settings**, select the **Harness AIDA** tile, and then enable the **Harness AI Development Assistant (AIDA)** setting. Select **Allow Overrides** if you want to be able to enable/disable AIDA for individual projects.  

### Notes for Code Suggestions and Create Pull Request features

- To enable code suggestions and create pull requests in GitHub from STO, you need to configure the GitHub connector within STO’s Default Settings. Go to **Account Settings**, select **Default Settings**, and then choose the **Security Testing Orchestration** tile. Locate the **GitHub Connector for Pull Requests** field and set up your GitHub connector. Ensure your GitHub token includes the following permissions:
  - `repo` - Full control of private repositories
  - `write:org` - Read and write org and team membership, read and write org projects
  - `write:discussion` - Read and write team discussions
  - `project` - Full control of projects

  You can also configure these settings at the organization or project level, based on your requirements.

- Currently, this feature is supported for scan results from all [Secret detection](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners) and [SAST scanners](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners) including both built-in open-source and commercial scanners. The feature will only appear if the scanner provides the exact vulnerable code snippet. If the code snippet is not provided, you can still use the feature by manually adding context on the vulnerable code. For details on how to do this, refer to [Edit to enhance AI remediations](/docs/security-testing-orchestration/remediations/ai-based-remediations#edit-to-enhance-the-ai-remediations).

- This feature currently supported only for Harness Code Repository and GitHub.

:::caution

- AI will always provide an answer. However, if there is no known remediation within the model’s training, the answer might be invalid. For this reason, an AI suggestion might require further research to confirm its validity.

- Before you implement an AI-generated suggestion, consider carefully the reliability and extent of the publicly-known information about the detected issue. The accuracy, reliability, and completeness of a suggestion depend on the public knowledge about that issue. An AI-generated suggestion is not guaranteed to remediate the issue and could introduce other issues.

- You should also consider the suggestion's applicability to your specific target and use case. An issue might have no known remediation, especially if it was recently discovered. An issue might have multiple suggested remediations that are contradictory or applicable only to specific use cases.

- A specific remediation might involve installing components with usage and license requirements. Check any requirements in advance.

:::