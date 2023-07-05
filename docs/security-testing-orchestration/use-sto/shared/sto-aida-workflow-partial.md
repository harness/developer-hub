1. When you go to **Security Tests** and then select an issue, an initial **AI enhanced remediation** appears in **Issue Details**. 

   This suggested remediation is based on public information about the CVE or CWE and the first detected occurrence (**Occurrence 1**) in the target. If the scanner captures the code snippet where the vulnerability is occurring, the query to Harness AIDA includes this snippet as well.  

    <docimage path={require('./static/ai-remediation-issue.png')} width="60%" height="60%" title="Click to view full size image" />
     

2. If you want to optimize the advice with additional information or context, do the following: 

   1. Select **Edit Input**. 

   2. Specify the occurrence, reference ID, and language (if you've scanned a codebase). 
   
     Harness AIDA can often auto-detect the language of a code snippet, but it's good practice to confirm that the language setting is correct. 

   3. Add any additional context in the text pane. For example, you might want to include relevant code immediately before the snippet where the vulnerability was identified, in addition to the snippet itself. Then select **Generate**.  

    <docimage path={require('./static/ai-remediation-issue-refine.png')} width="60%" height="60%" title="Click to view full size image" />
    
3. To generate remediations for another occurrence, do the following:

   1. In **Issue Details**, scroll down to the occurrence of interest and then select **Unsure how to remediate? Ask AI**. (You might need to wait a few seconds for the remediation to appear.)

    <docimage path={require('./static/ai-remediation-occurrences.png')} width="60%" height="60%" title="Click to view full size image" />

   2. To further refine the suggested remediation with an additional code snippet, select **Edit Snippet** and then re-generate.

    <docimage path={require('./static/ai-remediation-occurrence-3.png')} width="60%" height="60%" title="Click to view full size image" />

    