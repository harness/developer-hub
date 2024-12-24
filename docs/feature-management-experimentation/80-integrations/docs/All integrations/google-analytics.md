---
title: Google Analytics
sidebar_label: Google Analytics
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360040838752-Google-Analytics <br /> ✘ images still hosted on help.split.io </button>
</p>

You can send JavaScript impressions and events to Google Analytics and send Google analytics events to Split. With this integration you can use the event data you already collect via Google Analytics to power analytics and experimentation within Split.

# Google Analytics 4 (GA4)

GA4 is the only official way to interact with Google Analytics starting Jul 1, 2024 after the [decommissioning of Google Universal Analytics](https://support.google.com/analytics/answer/11583528?hl=en). Split offers a few different approaches for sending data to GA4 and receiving data from GA4. 

## Sending Split impressions to GA4

Split’s impression listener capability can be used to send impressions across to GA4 for tracking. This will allow you to send impressions from Split to GA. This capability works with UA and will continue to work with GA4.

Below you can see a standard event call using GA4’s gtag.js library

```javascript
gtag('event', 'screen_view', {
  'app_name': 'myAppName',
  'screen_name': 'Home'
});
```

If you are using a gtag.js tracker and want to track feature flag impressions as events on your page, you can use an impressions listener to send events to GA every time the Split SDK's `getTreatment` method is called. Note that there is no impression deduplication at the listener level, so counts of events sent to GA is not necessarily identical to the count of impressions in Split’s backend. 

An impression listener for tracking GA4 events may look like the following. This assumes you are using Google tags (gtag.js) to [track events into GA4](https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag) on the page and also uses a custom split_impression event in Google Analytics.

```javascript
function logImpression(impressionData) {
  // 
  // Impression Data has the following fields:
  // {
  //   "impression":{
  //     "feature":"Demo_TL",
  //     "keyName":"key",
  //     "treatment":"off",
  //     "time":1681158925738,
  //     "label":"default rule",
  //     "changeNumber":1665436973467
  //   },
  //   "ip":false,
  //   "hostname":false,
  //   "sdkLanguageVersion":"javascript-10.20.0"
  // }
  gtag('event', 'split_impression', {
    'split_name': impressionData.impression.feature,
    'split_treatment': impressionData.impression.treatment,
    'split_label': impressionData.impression.label,
    'split_changeno': impressionData.impression.changeNumber
    // can add additional properties here as well
  });
}
```

You can enrich the listener with other data of interest to send back to Google Analytics as well, such as additional custom attributes that are not included in the Split impression. Additionally, if you're on a page not implemented with Google Analytics or a non-web platform, it's possible to use Google’s GA4 Measurement Protocol which allows you to send events to GA4 using HTTP Requests. Refer to the following example of an impression listener that uses the measurement protocol API:

```javascript
function logImpression(impressionData) {
  // 
  // Impression Data has the following fields:
  // {
  //   "impression":{
  //     "feature":"Demo_TL",
  //     "keyName":"key",
  //     "treatment":"off",
  //     "time":1681158925738,
  //     "label":"default rule",
  //     "changeNumber":1665436973467
  //   },
  //   "ip":false,
  //   "hostname":false,
  //   "sdkLanguageVersion":"javascript-10.20.0"
  // }
  // if these are defined elsewhere, they can be passed in here
  const measurement_id = `G-XXXXXXXXXX`;
  const api_secret = `<secret_value>`;

  fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
    method: "POST",
    body: JSON.stringify({
      "client_id": impressionData.impression.keyName,
      "events": [{
        "name": "split_impression",
        "params": {
          'split_name': impressionData.impression.feature,
          'split_treatment': impressionData.impression.treatment,
          'split_label': impressionData.impression.label,
          'split_changeno': impressionData.impression.changeNumber,
        }
      }]
    })
  });
}
```

The example above is using the JavaScript fetch API to call the GA4 Measurement Protocol API. But all of Split’s SDKs have impression listeners so all are capable of sending data to GA4 using this method. This can be done with backend and frontend SDKs.

## Sending GA4 events to Split

There might be instances where you are already tracking events in GA4 and want to send them to Split without adding new event instrumentation for Split across all your apps. 
There are two approaches to this; either use BigQuery as the data source, or wrap the `track` call.

### Using BigQuery to send GA4 Events to Split
You can link Google Analytics data to BigQuery tables which can be used as a source to send data to Split. 

To get started, follow [Google’s instructions on how to get GA4 events into BigQuery](https://support.google.com/analytics/answer/9823238?hl=en#zippy=%2Cin-this-article). Once GA4 data is in BigQuery, it [can be queried](https://cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries) and exported as events to Split using Split’s [events API](https://docs.split.io/reference/create-event). For example, this can be a job that runs on a schedule to ingest data into Split to allow for experimentation and further analysis with Split’s metrics and metric dashboard. 

The following is an example of a script that queries a BigQuery table and sends events to Split which uses the ga4_obfuscated_sample_ecommerce events table that all BigQuery users have access to. This example data helps you test and debug your pipeline to ensure that you are sending data correctly. Once you're satisfied with your data flow, adjust the query to handle the data that is appropriate to your needs. This can be a scheduled job that runs on a regular basis to push events from GA4 to BigQuery to Split.

```python
from google.cloud import bigquery
import requests

client = bigquery.Client()

# Construct a SELECT statement that retrieves the records you want to process
# If you uncomment the where clause, this gets all new records within the last hour. 
# The event_timestamp restriction can be updated to whatever frequency you determine is proper for uploading events to Split. 
# The limit is there to quickly return results for testing. In production it should be removed
# For reference, 3600000000 microseconds is 1 hour.

# flattening the event hierarchy is done easiest in the query itself rather than python

query = """
SELECT
  event_timestamp, 
  user_id, 
  user_pseudo_id, 
  event_name, 
  device.category as device_category, 
  device.mobile_model_name as device_mobile_model_name
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
--where event_timestamp > (UNIX_MICROS(current_timestamp()) - 3600000000)
limit 1000
"""

# Execute the query and retrieve the results
query_job = client.query(query)
results = query_job.result()

headers = {
    "content-type": "application/json",
    "Authorization": "Bearer API_KEY" # set your SDK API Key here
}
payload = []
# Process each record
for row in results:
    timestamp = row['event_timestamp']
    name = row['event_name']
    if(row['user_id'] is None):
        trafficType ='anonymous' 
        identifier = row['user_pseudo_id']
    else:
        trafficType ='user' 
        identifier = row['user_id']
           

    payload.append({
        'eventTypeId': name,
        'trafficTypeName': trafficType,
        'key': identifier,
        'timestamp': timestamp,
       # 'value': , # this is commented out but can be used if needed
        "properties" : {
            'device':row['device_category'],
            'device_mobile_model_name':row['device_mobile_model_name']
            # other properties can be passed in here too
        }
    })


max_size = 1000 # Split supports API calls of up to 100MB in size. Adjust this larger or smaller depending on your needs

# this breaks the events payload into batches for sending to Split
event_batches = [payload[i:i+max_size] for i in range(0, len(payload), max_size)]

for batch in event_batches:
    # Make the API call using requests library to pass events arrays
    response = requests.post('https://events.split.io/api/events/bulk', headers=headers, json=batch)


    # Handle the API response
    if response.status_code == 202:
        print(f"batch processed successfully")
    else:
        print(f"Error processing bulk records: {response.text}")

print('finished processing records')
```
 
An AWS Lambda function written in Node.js can also be used, such as this one from Split community author David Martin: https://github.com/splitio/ga4toSplit_nodejs/

### Wrapping the track call

With some flexibility in code style, another approach is to wrap the `gtag` function of Google Analytics to call Split's `track` method. This way you can continue to instrument your site with `gtag` while being able to use Split's powerful metric calculation and alerting abilities at the same time.

Sample code:

```
var originalGtag = window.gtag;
window.gtag = function() {
  var args = Array.prototype.slice.call(arguments);
  originalGtag.apply(this, args);

  // Intercept only event commands
  if (args[0] === 'event') {
    var eventName = args[1];
    var eventParams = args[2];
    client.track('user', eventName, 0, eventParams)
    client.track('anonymous', eventName, 0, eventParams)
    //... add any other traffic types as needed
  }
};
```

Put this code after your instantiation of Split and Google Analytics so that it can take advantage of a Split Client and gtag. Alternatively, you can use the [Split Events API](https://docs.split.io/reference/create-event) to send events, removing the need for the Split SDK.
