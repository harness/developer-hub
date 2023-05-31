---
title: Fix issues using AI
description: Fix detected issues using Harness STO's AI-enhanced remediation engine.
sidebar_position: 35
---

```mdx-code-block
import remediate_indiv_occurrences from '../static/ai-remediation-occurrences.png'
```

Harness STO has an AI-enhanced remediation engine that generates suggestions for fixing detected issues. This feature is especially useful when the external tool does not provide remediations for a specific issue. 

## Important notes
* Currently, this feature is behind a feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature. 
* Harness has implemented the following safeguards to ensure the security and privacy of your intellectual property: 
  * STO uses the [Google Bard](https://bard.google.com/) AI engine to generate suggestions. For information about privacy and security safeguards in Bard, go to [Google privacy principles](https://safety.google/principles/).  
  * STO queries to the Bard API include the following information only: the CWE or CVE ID, the issue description, and the specific context of the occurrence (such as the code snippet or image layer).
  * STO anonymizes all information it includes in a Bard query. The Bard engine deletes all query information immediately after it sends a response. 
* The accuracy, reliability, and completeness of a suggestion depends on the publicly-known information about the detected issue. An issue might have no known remediation, especially if it was recently discovered. An issue might have multiple suggested remediations that are contradictory, controversial, or applicable only to specific use cases.
* Before you implement an AI-generated suggestion, consider carefully the reliability and extent of the publicly-known information that that issue. Also consider the suggestion's applicability to your specific organization and use case.
* You can refine a suggestion by providing more information, such as additional context or code snippets, to the AI engine. For more information, go to [How it works](#how-it-works) below. 

## Workflow description

1. When you go to **Security Tests** and then select an issue, an initial **AI enhanced remediation** appears in **Issue Details**. This suggested remediation is based on the first detected occurrence (**Occurrence 1**) in the target. 

   ![](../static/ai-remediation-issue.png)

2. If you want to generate more remediations for this occurrence using additional information or context, do the following: 

   1. click **Edit Input**. 

   2. Specify the occurrence, reference ID, and language (if you've scanned a codebase). 

   3. Add any additional context in the text pane. This might be a code snippet, a Dockerfile, or some other piece of information that's relevant to the specific target and issue. Then click **Generate**. 

     ![](../static/ai-remediation-issue-refine.png)

   4. You can repeat this process, providing more information to generate increasingly targeted suggestions. 


3. To generate remediations for another occurrence,  do the following:

   1. Scroll down to the occurrence of interest and click **Unsure how to remediate? Ask AI**.

      ```mdx-code-block
      <img src={remediate_indiv_occurrences} alt="Generate AI-enhanced remediations for individual occurrences." height="50%" width="50%" />
      ```

   2. To further refine the suggested remediation with an additional code snippet, click **Edit Snippet** and re-generate.

      ![](../static/ai-remediation-occurrence-3.png)
