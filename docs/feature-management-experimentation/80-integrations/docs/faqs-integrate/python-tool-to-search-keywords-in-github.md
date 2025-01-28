---
title: Python tool to Search Keywords in GitHub
sidebar_label: Python tool to Search Keywords in GitHub
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360039995951-Python-tool-to-Search-Keywords-in-GitHub </button>
</p>

Python framework tool using Github REST API to search a keyword in Github Repository, the tool allow searching for GetTreatment keyword to find all the code lines where Split SDK is used.

The tool uses Github Search API, please review the github link for more info. The results are exported to CSV file with the name format `\[CSV File Name\]_\[Keyword]\.csv`.

### Environment

- Python 2.7.15
- request 2.20.1

## How to use

- Class wrapper for Github API is: GitObj.py
- Update your repository name using \[owner\]/\[repo name\] format
- Update the Keyword to search and Github token in Constants.py:
  - Github access token is required to use the Github REST API, this will also allow accessing the private repositories. 
  - The Keyword usually is getTreatment which is the method all SDKs use to calculate treatment, if you have a wrapper class for Split SDK, use your wrapper class call for getTreatment
- Optionally set the Log and the generated CSV files name and path.

Run the tool using the Main.py class:

```bash
python Main.py
```

Click [link to download](https://drive.google.com/a/split.io/file/d/1aq8d4BLzd2o1YJtej4LjRUFz_BiNXDi6/view?usp=sharing)