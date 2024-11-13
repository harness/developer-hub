---
title: Rosco will crash causing a failed pipeline erratically
---

## Issue
An organization may run into what appears to be an intermittent and erratic failure of ```Rosco``` causing a failed pipeline. This will typically happen after several weeks or months of usage. This will happen intermittently and without any seeming major cause. 

## Cause
Rosco will give error logs stating failed metrics and metric batches. This error will not provide specific details, and the errors will be intermittent with no clear cause or trail. 
The above can be a red herring.  This issue can result from a lack of resources - typically running out of memory for Bake AMIs. Depending on the size of the application it may or may not trigger this error.

