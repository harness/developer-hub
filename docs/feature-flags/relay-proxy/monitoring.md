# Prometheus Metrics

The Proxy uses [Prometheus](https://prometheus.io/docs/introduction/overview/) for recording metrics that can be used to understand how the Proxy is behaving and performing. These metrics can be viewed and scrapped by hitting the Proxy's `/metrics` endpoint. For example if I am running the Proxy locally on port 7000 I could view the metrics it exposes by making the following request.

 `$ curl localhost:7000/metrics`

## Example Queries

To get started here are some example promql queries that can be useful for monitoring how the Proxy is performing.

| Usecase                     | Promql query                                                                                                               |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Request Rate by Status Code | `sum   by (code) (rate(ff_proxy_http_requests_total[5m]))`                                                     |
| Requests Rate by URL        | `sum   by (url) ( rate ( ff_proxy_http_requests_total[5m]))`                    |
| Cache Writes                | `sum   by (operation, error) (rate(ff_proxy_redis_cache_write_count[5m]))`                                  |
| Cache Reads                 | `sum   by (operation, error) (rate(ff_proxy_redis_cache_read_count[5m]))` |
| Cache Deletes               | `sum   by (operation, error) (rate(ff_proxy_redis_cache_read_count[5m]))` |
| SSE Events Forwarded        | `sum   by (error)  (rate(ff_proxy_sse_publish[5m]))`                          |
| SSE Streams Closed          | `sum   by (error) (rate(ff ff_proxy_sse_stream_close[5m]))`                  |


As well as counter metrics the Proxy also exposes a number of histogram metrics that can be used to monitor request duration, payload sizes and how long interactions with the cache take. If you are unfamilar with histogram metrics we recommend reading [this article](https://grafana.com/blog/2020/06/23/how-to-visualize-prometheus-histograms-in-grafana/) for help with visualising histograms.


## Example Prometheus Config

Below is an example prometheus configuration that can be used to scrape metrics from the Proxy.

```yaml
global:
  scrape_interval:     10s
  evaluation_interval: 10s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 30s
    static_configs:
      - targets: ['localhost:7000']
```


## Metrics Breakdown

Below is a breakdown of all the prometheus metrics exposed by the Proxy.

| Name                                      | Type      | Labels                                                                                                                                                                                                            | Description                                                                                              |
|-------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| ff_proxy_http_requests_total              | counter   | **code**: The HTTP response code<br></br><br></br>**envID**: The environmentID<br></br><br></br>**method**: The HTTP method used for the request<br></br><br></br>**url**: The requests URL                                                     | Records the number of requests to an endpoint                                                            |
| ff_proxy_http_requests_duration           | histogram | **envID**: The environmentID<br></br><br></br>**url**: The requests URL                                                                                                                                                 | Records the request duration for an endpoint                                                             |
| ff_http_requests_content_length_histogram | histogram | **envID**: The environmentID<br></br><br></br>**url**: The requests URL                                                                                                                                                 | Records the value of the Content-Length header for an HTTP request                                       |
| ff_proxy_metrics_forwarded                | counter   | **envID**: The environmentID<br></br><br></br>**error**: Indicates if an error occurred during forwarding                                                                                                               | Tracks the number of metrics forwarded from the Proxy to SaaS Feature Flags                              |
| ff_proxy_sdk_usage                        | counter   | **envID**: The environment ID<br></br><br></br>**sdk_language**: The programming language of the SDK<br></br><br></br>**sdk_type**: The type of the SDK (e.g., server, client, mobile)<br></br><br></br>**sdk_version**: The version of the SDK | Tracks what SDKs are using the FF Proxy                                                                  |
| ff_proxy_sse_publish                      | counter   | **api_key**: The API key used for authentication<br></br><br></br>**environment**: The environment ID<br></br><br></br>**error**: Indicates whether an error occurred during event forwarding                                         | Records the number of SSE (Server-Sent Events) events the proxy has received and forwarded on to clients |
| ff_proxy_sse_stream_close                 | counter   | **api_key**: The API key used for authentication<br></br><br></br>**environment**: The environment ID<br></br><br></br>**error**: Indicates whether an error occurred during event forwarding                                         | Records the number of times the proxy closes an SSE stream                                               |
| ff_proxy_redis_cache_read_count           | counter   | **error**: Indicates if an error occurred during the read operation<br></br><br></br>**key**: The cache key used for the read operation<br></br><br></br>**operation**: The type of operation performed                               | Tracks how many reads are made to the cache                                                              |
| ff_proxy_redis_cache_write_count          | counter   | **error**: Indicates whether an error occurred during the write operation<br></br><br></br>**key**: The cache key<br></br><br></br>**operation**: The type of write operation (e.g., Set, SetByte)                                    | Tracks how many writes are made to the cache                                                             |
| ff_proxy_redis_cache_remove_count         | counter   | **key**: The cache key<br></br><br></br>**operation**: The type of delete operation (e.g., Remove, RemoveAll)                                                                                                               | Tracks how many deletes are made to the cache                                                            |
| ff_proxy_redis_cache_delete_duration      | histogram | N/A                                                                                                                                                                                                               | Tracks how long delete operations to the cache take                                                      |
| ff_proxy_redis_cache_write_duration       | histogram | N/A                                                                                                                                                                                                               | Tracks how long write operations to the cache take                                                       |
| ff_proxy_redis_cache_read_duration        | histogram | N/A                                                                                                                                                                                                               | Tracks how long write operations to the cache take                                                       |

