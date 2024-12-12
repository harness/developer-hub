---
title: SessionCam
sidebar_label: SessionCam
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360039246411-SessionCam <br /> ✘ images still hosted on help.split.io </button>
</p>

# Split + Quantum Metric

Split and Quantum Metric enable brands to identify what features to test, prioritize feature releases, validate results, and iterate quicker by combining real-time analysis and data-driven experimentation.

Use Quantum Metric’s segment builder to identify sessions with a specific feature flag. Compare each feature flag by validating results and comparing feature-level impact on user behavior. Split impressions (the feature flag treatments seen by each user) become part of segments within Quantum Metric. Sessions are marked with the feature flag treatment for playback and analysis.

# Prerequisites

To connect Quantum Metric with Split, you need:

* Quantum Metric API recording Javascript installed
* Split Javascript SDK 10.15.0 + to be installed

# How to use

The following sections explain how to install both your Split and your Quantum Metric software.

## Install in Quantum Metric

**Quantum Metric provisioning**

Quantum Metric must provision a *qsm* script for *Split Test* events as follows:

**Note:** This script cannot be configured from the customer’s user interface. It needs to be provisioned by a Quantum Metric CSE.

Quantum Metric injects JavaScript into the customer’s page. The JavaScript listens for API traffic, and the Split bulk impressions endpoint in particular. When the Split SDK calls the bulk endpoint to pass impressions to Split, the Quantum Metric JavaScript inspects the payload and creates a new Split Test event for each impression. Because the Split SDK changed its JSON naming, the technique only works with Split SDK 10.15.0+.

```javascript
(function(){
    try {
        QuantumMetricAPI.addEventListener('api', function (api) {
            if (!!api.url && /split\.io\/api\/testImpressions\/bulk/gi.test(api.url) && api.xhr && api.xhr.qrequest) {
                var qmReq = JSON.parse(api.xhr.qrequest);
                for(var qmI = 0; qmI < qmReq.length; qmI++) {
                    var qmEventVal = qmReq[qmI].f + " - " + qmReq[qmI].i[0].t;
                    QuantumMetricAPI.sendEvent(2, 0, qmEventVal);
                }             
            }
        });
    
    } catch (error) {
        
    }
})();
```

**Split configuration**

You can now create a JavaScript event in the Event settings of the Quantum Metric user interface by entering a JavaScript configuration. Do the following:

1. From the Quantum Metric dashboard, select **Events** and then **Events settings**. The Events page appears.
2. Click **Add event**. The Create event module appears.
3. From the list, select **JavaScript**. The JavaScript configuration is now available.

    <p>
    <img src="https://help.split.io/hc/article_attachments/4423977896845/edit-event.png" alt="edit-event.png" width="441" /><br />
    </p>

4. In the Frequency field, select how many times an event is triggered.
5. In the Events name field, select **Split Test**.
6. In the Abbr. field, enter **ST** for Split Test.
7. In the Event Description field, optionally enter a description.

     <p>
      <img src="https://help.split.io/hc/article_attachments/4423969455117/edit-event-frequency.png" alt="edit-event-frequency.png" width="470" />
     </p>

## Install with Split

Split and Quantum Metric must initialize in succession Quantum Metric first and then Split. This allows Split to obtain the Quantum Metric session identifier for its key. To do this, Split waits in a JavaScript setInterval loop until it checks that verify the QuantumMetricAPI is on.

To successfully integrate the two products, you should model your own Split initialization on the setInterval loop shown below. With the Quantum Metric API turned on, Split can receive a “qmreplay” event with an embedded linkback URL to the Quantum Metric session.

Split SDK needs to get the session ID from Quantum Metric. It then must track a new ‘qmreplay’ event to associate the Quantum Metric linkback with the session.
```javascript
	<script type="text/javascript">
	(function() {
	    var qtm = document.createElement('script'); qtm.type = 'text/javascript'; qtm.async = 1;
	    qtm.src = 'https://cdn.quantummetric.com/qscripts/quantum-split.js';
	    var d = document.getElementsByTagName('script')[0];
	    !window.QuantumMetricAPI && d.parentNode.insertBefore(qtm, d);
	})();

	var client;
	var checkSessionIDExists = setInterval( function() {

		if (window.QuantumMetricAPI != null && window.QuantumMetricAPI.isOn()
			&& window.QuantumMetricAPI.getSessionID() != null) {
	      console.log("Quantum Metric Session ID found!");
	      console.log("sessionID: " + window.QuantumMetricAPI.getSessionID());

		    var factory = splitio({
		        core: {
		            authorizationKey: 'your split key here',
		            key: window.QuantumMetricAPI.getSessionID(), 
		            trafficType: 'user',
		            labelsEnabled: true
		        },
		        scheduler: {
		            featuresRefreshRate: 1,
		            impressionsRefreshRate: 5
			},
		        storage: {
		        	type: 'LOCALSTORAGE',
		        	prefix: 'WAVE'
		        },
		        impressionListener: {
			    	logImpression: logImpression
		  		},
		        streamingEnabled: true,
		        debug: false,
		        sync: {
		        	impressionsMode: 'OPTIMIZED'
		        }
		    });

			client = factory.client();

			const properties = {
				quantumUrl: window.QuantumMetricAPI.getReplay()
			}
			var queued = client.track ('qmreplay', 0, properties);
			console.log('did qmreplay queue? ' + queued);

			client.on(client.Event.SDK_READY, function() {
				console.log("Split SDK ready!");
				drawUI();
			});	

			client.on(client.Event.SDK_UPDATE, function() {
				console.log("Split SDK update!");
				drawUI();
			});

	      clearInterval(checkSessionIDExists);
	  	}
	}, 100);

    $( document ).ready(function() {
    	console.log( "DOM ready!" );
    	if (window.QuantumMetricAPI == null) {
	   	  console.log("QuantumMetricAPI not available... waiting...");
	    }
	});

</script>
```

The Split SDK loops and waits for the Quantum Metric API to be available. Then, it supplies the Quantum Session ID for the Split key. Once initialized, it queues a *qmreplay* event (it’s OK for this to happen before SDK_READY).

# What you see

Once you have the Split SDK configured with Quantum Metric, impressions display with Quantum Metric sessions identifiers in the Live tail view of Split. In addition, the Live tail for events show *qmreplay* events with the linkback to Quantum Metric in a property:

<p>
  <img src="https://help.split.io/hc/article_attachments/4423969498253/qmreplay_events.png" alt="qmreplay_events.png" />
</p>

On Quantum Metric user interface, use Session Segment to filter for replays by your feature flags and treatments.

To learn more about all our integrations, check out our integrations page. If you’d like a demo of Split, or help to implement any of our integrations, contact [support@split.io](mailto:support@#split.io).

# About this integration

This is a third-party integration that has been tested by Split. Split does not own or maintain this integration. For more information, reach out to the contributor.