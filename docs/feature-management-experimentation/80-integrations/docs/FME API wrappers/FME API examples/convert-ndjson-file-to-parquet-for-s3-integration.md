---
title: Convert NDJson file to Parquet for S3 Integration
sidebar_label: Convert NDJson file to Parquet for S3 Integration
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4404185940365-Python-Example-to-generates-Parquet-file-from-NDJson-format-for-S3-Integration </button>
</p>

Basic Python code converts NDJson file that contains events into a Parquet file which is  used to integrate the Amazon S3 integration with Split. To learn more about this integration, refer to the Amazon S3 integration guide.

### Environment

- Python 3.7
- Pandas 1.2.2
- Pyarrow 3.0.0
- ndjson 0.3.1

## How to use

The code expects the NDJSON  file to contain the correct data structure for Split events. Refer to an example record below.

```json
{"environmentId":"029bd160-7e36-11e8-9a1c-0acd31e5aef0",
"trafficTypeId":"e6910420-5c85-11e9-bbc9-12a5cc2af8fe",
"eventTypeId":"agus_event",
"key":"gDxEVkUsd3",
"timestamp":1625088419634,
"value":86.5588664346,
"properties":{"age":"51","country":"argentina","tier":"basic"}}
```

Using the code below, be  sure to replace the source ndjson file and target parquet files name and path.

The code assumes the properties are all string values.

<pre class="p1"><span class="s1"><strong>import</strong></span> pandas <span class="s1"><strong>as</strong></span> pd<br /><span class="s1"><strong>import</strong></span> pyarrow <span class="s1"><strong>as</strong></span> pa<br /><span class="s1"><strong>import</strong></span> pyarrow.parquet <span class="s1"><strong>as</strong></span> pq<br /><span class="s1"><strong>import</strong></span> ndjson<br /><br />##################################<br /><span class="s2">input_file = </span>"sample_ndjson.json"<br /><span class="s2">output_file = </span>"event21.parquet"<br />##################################<br /><br /># converts dictionary type into proper structure that when saved to parquet will be interpreted as MapType<br /><span class="s1"><strong>def</strong></span> dict2keyvalue(dict):<br /><span class="Apple-converted-space">&nbsp; &nbsp; </span>keyvalues = \[\]<br /><span class="Apple-converted-space">&nbsp; &nbsp; </span><span class="s1"><strong>for</strong></span> key <span class="s1"><strong>in</strong></span> dict.keys():<br /><span class="Apple-converted-space">&nbsp; &nbsp; &nbsp; &nbsp; </span>keyvalues.append(\[(<span class="s3">"key"</span>, key), (<span class="s3">"value"</span>, str(dict\[key\]))\])<br /><span class="Apple-converted-space">&nbsp; &nbsp; </span><span class="s1"><strong>return</strong></span> keyvalues<br /><br />properties_type = pa.map_(<br /><span class="Apple-converted-space">&nbsp; &nbsp; </span>pa.string(),<br /><span class="Apple-converted-space">&nbsp; &nbsp; </span>pa.string(),<br />)<br /><br />schema = pa.schema(<br /><span class="Apple-converted-space">&nbsp; &nbsp; </span>[<span class="Apple-converted-space">   </span>pa.field(<span class="s3">"environmentId"</span>, pa.string()),<br /><span class="Apple-converted-space">&nbsp; &nbsp; &nbsp; &nbsp; </span>pa.field(<span class="s3">"trafficTypeId"</span>, pa.string()),<br /><span class="Apple-converted-space">&nbsp; &nbsp; &nbsp; &nbsp; </span>pa.field(<span class="s3">"eventTypeId"</span>, pa.string()),<br /><span class="Apple-converted-space">&nbsp; &nbsp; &nbsp; &nbsp; </span>pa.field(<span class="s3">"key"</span>, pa.string()),<br /><span class="Apple-converted-space">&nbsp; &nbsp; &nbsp; &nbsp; </span>pa.field(<span class="s3">"timestamp"</span>, pa.int64()),<br /><span class="Apple-converted-space">&nbsp; &nbsp; &nbsp; &nbsp; </span>pa.field(<span class="s3">"value"</span>, pa.float64()),<br /><span class="Apple-converted-space">&nbsp; &nbsp; &nbsp; &nbsp; </span>pa.field(<span class="s3">"properties"</span>, properties_type),<br /><span class="Apple-converted-space">&nbsp; &nbsp; </span>\]<br />)<br /><br /><span class="s1"><strong>with</strong></span> open(input_file) <span class="s1"><strong>as</strong></span> f:<br /><span class="Apple-converted-space">&nbsp; &nbsp; </span>js = ndjson.load(f)<br />data = pd.DataFrame(js)<br />data[<span class="s3">"properties"</span>\] = data[<span class="s3">"properties"</span>\].apply(<span class="s1"><strong>lambda</strong></span> x: dict2keyvalue(x))<br />data = pa.Table.from_pandas(data, schema)<br /><br /># Save to parquet file<br />pq.write_table(data, output_file)</pre>