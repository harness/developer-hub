## How Does Cloud Anomaly Detection Work in Harness CCM?

### Anomaly Detection Process
The anomaly detection process works by first gathering historical cost data (42 days of data) and using it to calculate the expected cost for the current day. It then compares the expected cost against the actual cost for that day to determine if an anomaly exists.

- Data Collection: CCM collects historical cost data (from the last 42 days) for each cluster.

- Processing: Then, CCM processes this data using two ML models internally to flag any outlier costs and predict expected costs for the day and compares it with actual costs to flag anomalies.

### Machine Learning Forecasting

In addition to statistical models, CCM uses BigQuery ML (BQML) to apply machine learning-based anomaly detection:
A model is created using cost data and this model is recreated every weekend and used throughout the week to forecast the next 8 days' costs for each entity (AWS account, GCP project, Azure subscription, etc.).
Once the model is created, the system uses it to check for anomalies by comparing predicted costs with actual costs, applying a threshold to detect anomalies.

### Anomaly Drilldown
Once an anomaly is detected, for each of the anomaly detected, CCM provides insights into what are the resources which might be causing the anomaly. CCM queries the cloud provider's cost data, and identifies resources that have experienced significant cost increases compared to previous periods. CCM aggregates the total costs for each resource, computes the cost increase (or decrease) compared to the previous day, and orders the results by the highest increase in cost, helping to detect resources that have experienced significant cost spikes.
Detected anomalies are stored in a time series database and are available for review and analysis. Each anomaly is assigned metadata, such as the reported cost, expected cost, and anomaly score.
The final anomalies are flagged for further investigation, allowing users to take corrective action as needed.

