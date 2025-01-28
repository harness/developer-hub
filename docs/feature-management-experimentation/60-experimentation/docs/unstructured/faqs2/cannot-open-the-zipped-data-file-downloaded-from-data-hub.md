---
title: Cannot open the zipped data file downloaded from Data hub
sidebar_label: Cannot open the zipped data file downloaded from Data hub
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360058618332-Cannot-open-the-zipped-data-file-downloaded-from-Data-hub </button>
</p>

<h2 id="question" class="header-anchor">Question</h2>
<p>
  Using MacOS, after downloading the data file from Data hub page, the user interface
  fails to open the .gz file, is there a tool to open the file?
</p>
<h2 id="answer" class="header-anchor">Answer</h2>
<p>
  <span>This files are in gz format that is not supported by default on some MacOS, best way is to download Unarchiver app from Mac app store, which does unzip the file successfully.</span>
</p>
<p>
  <span>Also, we can use the command below in Terminal window:</span>
</p>
<pre><span>gzip -d [file name]</span></pre>