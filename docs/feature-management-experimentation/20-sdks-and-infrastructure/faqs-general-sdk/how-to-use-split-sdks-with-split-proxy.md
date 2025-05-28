---
title: "General SDK: How to use FME SDKs with Split Proxy?"
sidebar_label: "General SDK: How to use FME SDKs with Split Proxy?"
sidebar_position: 3
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360053243551-General-SDK-How-to-use-Split-SDKs-with-Split-Proxy </button>
</p>

## Question

All FME SDKs support connecting to Split Proxy.

What are the updates needed for each SDK to accomplish this?
 
## Answer

1. Make sure to obtain the Split Proxy URL 
2. Refer to each SDK section below for the Configuration parameters needed, set the URL parameters to the full URL of the proxy location.

### JavaScript SDK
```
core: { ... },
urls: {
    sdk: 'http://ProxyServerName:Port/api',
    events: 'http://ProxyServerName:Port/api',
    auth: 'https://ProxyServerName:Port/api',
},
```

### iOS SDK
```
let endpoints: ServiceEndpoints = ServiceEndpoints.builder()
    .set(sdkEndpoint: "http://ProxyServerName:Port/api")
    .set(eventsEndpoint: "http://ProxyServerName:Port/api")
    .set(authServiceEndpoint: "http://ProxyServerName:Port/api")
    .set(telemetryServiceEndpoint: "http://ProxyServerName:Port/api")
    .build()

let config = SplitClientConfig()
config.serviceEndpoints = endpoints
```

### Android SDK
```
final ServiceEndpoints serviceEndpoints = ServiceEndpoints.builder()
    .apiEndpoint("http://ProxyServerName:Port/api")
    .eventsEndpoint("http://ProxyServerName:Port/api")
    .sseAuthServiceEndpoint("http://ProxyServerName:Port/api")
    .streamingServiceEndpoint("http://ProxyServerName:Port/api")
    .telemetryServiceEndpoint("http://ProxyServerName:Port/api")
    .build();

SplitClientConfig config = SplitClientConfig.builder()
    .serviceEndpoints(serviceEndpoints)
    .build();
```

### Java SDK
```
SplitClientConfig config = SplitClientConfig.builder()
    .endpoint("http://ProxyServerName:Port", "http://ProxyServerName:Port")
    .authServiceURL("http://ProxyServerName:Port")
    .telemetryURL("http://ProxyServerName:Port")
    .build();
```

### Ruby SDK
```
options = {
    base_uri: "http://ProxyServerName:Port/api"
    events_uri: "http://ProxyServerName:Port/api"
    auth_service_url: "http://ProxyServerName:Port/api"
    telemetry_service_url: 'http://ProxyServerName:Port/api',
    streaming_service_url: 'http://ProxyServerName:Port/api'
}
```

### Python SDK
```
config = {}
factory = get_factory('YOUR_API_KEY', config=config, sdk_api_base_url = 'http://ProxyServerName:Port/api', events_api_base_url = 'http://ProxyServerName:Port/api')
GO SDK

cfg := conf.Default()
cfg.Advanced.AuthServiceURL = "http://ProxyServerName:Port/api"
cfg.Advanced.SdkURL = "http://ProxyServerName:Port/api"
cfg.Advanced.EventsURL = "http://ProxyServerName:Port/api"
cfg.Advanced.TelemetryServiceURL = "http://ProxyServerName:Port/api"
```

### .NET SDK
```
var config = new ConfigurationOptions
{
    Endpoint = "http://ProxyServerName:Port",
    EventsEndpoint = "http://ProxyServerName:Port",
    AuthServiceURL = "http://ProxyServerName:Port/api/v2/auth",",
    StreamingServiceURL = "http://ProxyServerName:Port/sse",
    TelemetryServiceURL = "http://ProxyServerName:Port/api/v1"
};
```