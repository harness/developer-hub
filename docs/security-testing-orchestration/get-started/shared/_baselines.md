Each scan operation has a specified _variant_ that specifies the branch, tag, or other target variant to scan.  

You can also specify a _baseline_ for each target. This is usually the "root" variant of the target, such as the `main` branch or the `latest` tag. When a scan finishes successfully, STO does the following:

* Compares each issue detected in the scanned variant against the target baseline.  
* Places each issue into one of two buckets: 
  *  "New" issues in the current variant only, or
  *  "Common" issues also in the baseline (or, if no baseline is specified, in the previous scan).

