---
title: Fix issues using AI AI Copilot enhanced remediation steps
description: Fix detected issues using Harness STO's AI-enhanced remediation engine.
sidebar_position: 35
---

<!-- style>

.green {
    color: green;
    font-weight:700;
    font-size: 30px;
}

.hidden {
   display: none;
}
</style -->

```mdx-code-block
import remediate_indiv_occurrences from '../static/ai-remediation-occurrences.png'
import remediate_occurrence_three from '../static/ai-remediation-occurrence-3.png'
import remediate_issue_refine from '../static/ai-remediation-issue-refine.png'
```

Harness AI Copilot auto-generates suggestions for fixing detected vulnerabilities. AI Copilot explains the vulnerability, gives solutions how to fix it, and (where applicable) provides code changes that remediate the vulnerability.

![](../static/ai-copilot-issue-example.png)


## Important notes
* Currently, this feature is behind a feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature. 
* Harness has implemented the following safeguards to ensure the security and privacy of your intellectual property: 
  * STO uses the [Google Bard](https://bard.google.com/) AI engine to generate suggestions. For information about privacy and security safeguards in Bard, go to [Google privacy principles](https://safety.google/principles/).  
  * STO queries to the Bard API include the following information only: the CWE or CVE ID, the issue description, and the specific context of the occurrence (such as the code snippet or image layer).
  * STO anonymizes all information it includes in a Bard query. The Bard engine deletes all query information immediately after it sends a response. 
* The accuracy, reliability, and completeness of a suggestion depends on the publicly-known information about the detected issue. An issue might have no known remediation, especially if it was recently discovered. An issue might have multiple suggested remediations that are contradictory, controversial, or applicable only to specific use cases.
* Before you implement an AI Copilot suggestion, consider carefully the reliability and extent of the publicly-known information that that issue. Also consider the suggestion's applicability to your specific organization and use case.
* The workflow description below shows how you can refine a suggestion by providing more information, such as additional context or code snippets, to the AI engine.

## Workflow description

1. When you go to **Security Tests** and then select an issue, an initial **AI enhanced remediation** appears in **Issue Details**. This suggested remediation is based on the first detected occurrence (**Occurrence 1**) in the target. 

   ![](../static/ai-remediation-issue.png)

2. If you want to generate more remediations for this occurrence using additional information or context, do the following: 

   1. click **Edit Input**. 

   2. Specify the occurrence, reference ID, and language (if you've scanned a codebase). 
   
      AI Copilot can often auto-detect the language of a code snippet, but it's good practice to confirm that the language setting is correct. 

   3. Add any additional context in the text pane. This might be a code snippet, a Dockerfile, or some other piece of information that's relevant to the specific target and issue. Then click **Generate**. 

      :::note
      For best results, include the entire function or method where the vulnerability was found. Do not include multiple snippets.
      :::   

       ```mdx-code-block
      <img src={remediate_issue_refine} alt="Generate a new remediation using additional information." height="50%" width="50%" />
      ```

   4. You can repeat this process, providing more information to generate increasingly targeted suggestions. 


3. To generate remediations for another occurrence,  do the following:

   1. Scroll down to the occurrence of interest and click **Unsure how to remediate? Ask AI**. (You might need to wait a few seconds for the remediation to appear.)

      ```mdx-code-block
      <img src={remediate_indiv_occurrences} alt="Generate AI-enhanced remediations for individual occurrences." height="50%" width="50%" />
      ```

   2. To further refine the suggested remediation with an additional code snippet, click **Edit Snippet** and re-generate.

      ```mdx-code-block
      <img src={remediate_occurrence_three} alt="Generate AI-enhanced remediations for a specific occurrence." height="50%" width="50%" />
      ```
      
