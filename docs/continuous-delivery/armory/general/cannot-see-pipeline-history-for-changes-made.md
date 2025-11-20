---
title: Cannot See Pipeline History for Changes Made
---

## Issue
Users can’t see pipeline history for changes made to the pipeline. After making changes to the pipeline in Spinnaker, from the **Pipeline Actions** menu users should be able to select **View Revision History**, but it says **No version history found**.The correct behavior should show as following:

## Cause
Spinnaker leverages underlying object versioning capabilities in S3/GCS.  Check if the object versioning has been enabled for the underlying bucket. 

