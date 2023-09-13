---
title: View results
description: Investigate the results of SBOM, SLSA, and policy enforcement.
sidebar_position: 60
---

Once the SBOM is generated as part of SSCA Orchestration step, attestation is signed stored in the artifact repository along with the image. You’ll see an .att file in your artifact repository, for example:

Once the provenance is generated as part of CI build stage, provenance is signed and attested, and  stored in the artifact repository along with the image. You’ll see an .att file in your artifact repository, for example:

image 

For each pipeline execution, SBOM can be viewed and downloaded from the artifact tab in the pipeline execution history view, for example:

image 

ensure that you select the pipeline stage corresponding to the SSCA Orchestration step in the dropdown on the top-right corner. In the above example, we generated the SBOM in Build stage as selected above.

To see the policy enforcement, select the stage where SSCA Enforcement step was included. In our example we enforced the policies in the Deploy stage just before the actual deployment. 

image

As we can see there are 9 policy violations and once you click on the number, you’ll see the details of all policy violations, as follows:

image 
