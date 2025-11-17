---
title: New Relic Canary Integration
---


First you will need a Query Key and your account number.Follow [https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api](https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api)

For your Account number you can fetch it from the url when you log into New Relic Insights


You first need to configure a New Relic account for Spinnaker Canary to do so in halyard run:
```hal config canary newrelic account add newrelic2 --api-key **** --application-key **** --base-url ****```
This will create a block in Halyard like:
```
  canary:
    enabled: true
    serviceIntegrations:
    - name: newrelic
      enabled: true
      accounts:
      - name: newrelic
        endpoint:
          baseUrl: https://insights-api.newrelic.com
        apiKey: 
        applicationKey: ''
        supportedTypes:
        - METRICS_STORE
```
You will need your applications to report metrics to New Relic as an example I used their K8s setup.[https://docs.newrelic.com/docs/integrations/kubernetes-integration/installation/kubernetes-installation-configuration](https://docs.newrelic.com/docs/integrations/kubernetes-integration/installation/kubernetes-installation-configuration)Now we need to create our Canary-config. 

Go to Delivery(1) -> CANARY CONFIGS(2) -> Add configuration (3)Add a name to your configuration (4), this is visible on the UI, select newrelic as your Metric Store (5) and click on Add Metric (6)
Then include your NewRelic SQL query, in this example we are quering our application in the K8sPodSample for traffic.
```SELECT average (net.rxBytesPerSecond) FROM K8sPodSample```

Click Ok and scroll down, you need to make all the metrics add up to 100, this is how much weight each metric has for the final score. 
In this example since we just have 1 metric, we make this be 100.Now we need to create a pipeline to run the canary analysis.
Go to pipelines and create a new one. 
Create a stage of type Canary Analysis and select the Canary-Config we just createdAnd configure it
The important part in here are the Baseline + Canary Pair and the Metric Scope Section, the query send to New Relic is going to be a combination of this sections.
In the form of _location_key = Baseline/Canary Location and _scope_key = Baseline/Canary.In this example we use the namespace and label.app to identify our application, so our query will be where namespace=baseline and label.app=guestbookCanary-config, the important part is that you must not set a Where clause in here.
```
{
    "applications": [
      "training"
    ],
    "classifier": {
      "groupWeights": {
        "Group 1": 100
      }
    },
    "configVersion": "1",
    "createdTimestamp": 1596036523471,
    "createdTimestampIso": "2020-07-29T15:28:43.471Z",
    "description": "",
    "judge": {
      "judgeConfigurations": {},
      "name": "NetflixACAJudge-v1.0"
    },
    "metrics": [
      {
        "analysisConfigurations": {},
        "groups": [
          "Group 1"
        ],
        "name": "new-relic",
        "query": {
          "select": "SELECT average(net.rxBytesPerSecond)  FROM K8sPodSample",
          "serviceType": "newrelic",
          "type": "newrelic"
        },
        "scopeName": "default"
      }
    ],
    "name": "new-relic",
    "templates": {},
    "updatedTimestamp": 1596126728263,
    "updatedTimestampIso": "2020-07-30T16:32:08.263Z"
  }
```

Canary-stage:
```
{
    "analysisType": "retrospective",
    "canaryConfig": {
      "canaryConfigId": "bce9ee06-af79-45d8-9861-a5b57eb99f11",
      "metricsAccountName": "newrelic2",
      "scopes": [
        {
          "controlLocation": "baseline",
          "controlScope": "guestbook",
          "endTimeIso": "2020-07-30T20:57:29Z",
          "experimentLocation": "canary",
          "experimentScope": "guestbook",
          "extendedScopeParams": {
            "_location_key": "namespace",
            "_scope_key": "label.app"
          },
          "scopeName": "default",
          "startTimeIso": "2020-07-30T17:54:29Z"
        }
      ],
      "scoreThresholds": {
        "marginal": "1",
        "pass": "20"
      },
      "storageAccountName": "ACCOUNT"
    },
    "name": "Canary Analysis",
    "type": "kayentaCanary"
  }
```

That will create 2 queries as:
```https://insights-api.newrelic.com/v1/accounts/****/query?nrql=SELECT+average%28net.rxBytesPerSecond%29++FROM+K8sPodSample+TIMESERIES+60+seconds+SINCE+1596131669+UNTIL+1596142649+WHERE+label.app+LIKE+%27guestbook%27+AND+namespace+LIKE+%27canary%27```
```https://insights-api.newrelic.com/v1/accounts/****/query?nrql=SELECT+average%28net.rxBytesPerSecond%29++FROM+K8sPodSample+TIMESERIES+60+seconds+SINCE+1596131669+UNTIL+1596142649+WHERE+label.app+LIKE+%27guestbook%27+AND+namespace+LIKE+%27baseline%27```


