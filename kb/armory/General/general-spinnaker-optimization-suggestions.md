---
title: General Spinnaker Optimization Suggestions
---

## Introduction
The following is a list of optimizations our Armory team has previous suggested as a baseline to a Spinnaker environment.   These are general settings suggested for the majority of our customers.
Feel free to adjust these settings to fit the needs of the environment.  

## Prerequisites
Administration access to the environment

## Instructions
### Plugins
Many Armory customers install the following plugins: Armory [Observability Plugin](https://docs.armory.io/docs/armory-admin/prometheus-monitoring/#configure-monitoring-using-the-observability-plugin), [AWS Lambda Plugin](https://docs.armory.io/docs/armory-admin/aws/aws-lambda/), and [Policy Engine Plugin](https://docs.armory.io/docs/armory-admin/policy-engine-enable/policy-engine-plug-enable/) as needed.
### In Operator
#### spec.spinnakerConfig.config
In the ```spec.spinnakerConfig.config``` section the following is suggested.  There are some notes in this section about some configurations that should be avoided, and what should be done instead.  As a note, the [Observability Plugin](https://docs.armory.io/docs/armory-admin/prometheus-monitoring/#configure-monitoring-using-the-observability-plugin) is suggested in the configuration below.  Please look at [https://github.com/armory-plugins/armory-observability-plugin](https://github.com/armory-plugins/armory-observability-plugin) for more information
spec:
  spinnakerConfig:
    # spec.spinnakerConfig.config - This section contains the contents of a deployment found in a halconfig .deploymentConfigurations[0]
    config:
      stats:
        enabled: false
        ## This prevents recreating echo on every single deploy of spinnaker
        instanceId: disable-echo-always-recreating
      telemetry:
        enabled: true
        endpoint: https://stats.spinnaker.io
        connectionTimeoutMillis: 3000
        readTimeoutMillis: 5000
      deploymentEnvironment:
        size: SMALL
        type: Distributed
        updateVersions: true
        vault:
          enabled: false
        livenessProbeConfig:
          enabled: true
          ## Default to 10 minutes before starting liveness probes.  Larger installs may need longer
          initialDelaySeconds: 600
        location: spinnaker
      # This is current default we'd PREFER deployed everyplace... can be overridden per cust
      #version: 2.26.0
      ## DO NOT turn on the monitoring daemon - it does NASTY things to spinnaker's system, and it uses a lot of resources.  USE the observability plugin instead! (Separate files)
      metricStores:
        prometheus:
          enabled: false
        enabled: false
      armory:
      # send diagnostics to Armory to reduce troubleshooting time
        diagnostics:
          enabled: true
          logging:
            enabled: true
            endpoint: https://debug.armory.io/v1/logs
 
#### spec.spinnakerConfig.profiles
Below are some settings suggested for the ```spec.spinnakerConfig.profiles``` section, and notes about the settings
spec:
  spinnakerConfig:
    profiles:
      ## This is always first otherwise they're in alphabetical order
      spinnaker:
        ok-http-client:
          ## connects should never really be increased beyond this 
          connectTimeoutMs: 15000
          ## Start at 60 seconds for downloads, but may need to be bigger if using large files/artifacts.
          readTimeoutMs: 60000
          maxRequests: 256
          maxRequestsPerHost: 256
      clouddriver:
        serviceLimits:
          cloudProviderOverrides:
            aws:
              rateLimit: 10.0
          implementationLimits:
            ## Examples - default rate limit is 10, reducing these can reduce AWS API calls preventing throttling but it's FAR better to get a support ticket in...  and increase the API limits.
            AmazonAutoScaling:
              defaults:
                rateLimit: 3.0
            AmazonElasticLoadBalancing:
              defaults:
                rateLimit: 5.0
        ## NOTE we do NOT set redis NOR sql enabled/true/false here.  What we DO set are specific settings underneath.  This is HIGHLY tied
        ## to the environment deployed to, but defaulting to sql & redis, these should be good common settings.  WHEN only redis
        ## is used, should override this as appropriate
        sql:
          cache:
            enabled: true
            # These parameters were determined to be optimal via benchmark comparisons
            # in the Netflix production environment with Aurora. Setting these too low
            # or high may negatively impact performance. These values may be sub-optimal
            # in some environments.
            readBatchSize: 500
            writeBatchSize: 300
          unknown-agent-cleanup-agent:
            enabled: true
          taskRepository:
            enabled: true
            ## NOT setting this but for reference, we recommend disabling SQL locks and using redis
          #scheduler:
          #enabled: false
        redis:
        ## Still COULD redis for the scheduler locks - it changes some things if SQL locks are problematic for some reason.
        #scheduler:
        #enabled: true
      deck:
        ## These are here for reference BUT should be replaced by end users
        settings-local.js: |
          window.spinnakerSettings.feature.kustomizeEnabled = true;
          window.spinnakerSettings.feature.artifactsRewrite = true;
          window.spinnakerSettings.feature.functions = true;
          window.spinnakerSettings.kubernetesAdHocInfraWritesEnabled = true;
          ## DO NOT go without this... authz/authn enabled turn this on automatically as well.
          window.spinnakerSettings.authEnabled = true;
          ## The below SHOULD be overridden per customer.  Leaving it here as a default though for reference
          ##window.spinnakerSettings.feature.terraform = true;
      echo:
        resilience4j.circuitbreaker:
          instances:
            telemetry:
              # This needs to stay false, because if the telemetry endpoint goes down, Echo goes unhealthy (no good!)
              registerHealthIndicator: false
      gate:     # is the contents of ~/.hal/default/profiles/gate.yml
        ### This enables the X509 Client authentication system
        default:
          apiPort: 8443
        ## Here for reference - we recommend this as allows path routing configs vs separate domains.
        # servlet:
        #   context-path: /api/v1
        server:
          tomcat:
            ## In 2.2.4+spring boot, needs to include KB for sizing due to large group payload potentials or similar issues
            max-http-header-size: 256KB
            protocolHeader: X-Forwarded-Proto
            remoteIpHeader: X-Forwarded-For
            internalProxies: .*
            httpsServerPort: X-Forwarded-Port
        redis:
          configuration:
            secure: true
        proxies:
          - id: terraform
            uri: http://spin-terraformer:7088
            methods:
              - GET
      igor:
        spinnaker:
          pollingSafeguard:
            # The defaults for polling is 1000 - this 10x that to allow for lots of new images.
            itemUpperThreshold: 10000
      orca:
        executionRepository:
          sql:
            enabled: true
          redis:
            enabled: false
        monitor:
          activeExecutions:
            redis: false
        sql:
          ## Some sane defaults for connection sql pools for all customers These are "decent" starting settings.
          connectionPools:
            connectionTimeout: 5000
            maxLifetime: 30000
            maxPoolSize: 100
 
#### spec.spinnakerConfig.service-settings
Below are some settings suggested for the ```spec.spinnakerConfig.service-settings``` section, and notes about the settings.

Note: We GENERALLY recommend NOT using the embedded Redis. POC's can override this. ALSO make sure replicas is ALWAYS at least 2 (not currently set in this file) - for each service.

spec:
  spinnakerConfig:
    service-settings:
      ## We GENERALLY recommend NOT using the embedded redis.  POC's can override this.  ALSO make sure replicas is ALWAYS at least 2 (not currently set in this file) - for each service.  
      redis:
        skipLifeCycleManagement: true
      clouddriver:
        kubernetes:
          useExecHealthCheck: false
        #Examples of common settings can be set/overriden.  HIGHLY recommend an APM agent for monitoring various aspects including jvm details not available through other metrics.  
        #env:
          #JAVA_OPTS: -Dnewrelic.config.file=/opt/apmagent/config/newrelic.yml -javaagent:/opt/apmagent/newrelic/newrelic.jar -Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts -Djdk.tls.client.protocols=TLSv1.2 -XX:MaxRAMPercentage=50.0
      dinghy:
        kubernetes:
          useExecHealthCheck: false
      echo:
        kubernetes:
          useExecHealthCheck: false
      front50:
        kubernetes:
          useExecHealthCheck: false
      fiat:
        kubernetes:
          useExecHealthCheck: false
      gate:
        kubernetes:
          useExecHealthCheck: false
      igor:
        kubernetes:
          useExecHealthCheck: false
      kayenta:
        kubernetes:
          useExecHealthCheck: false
      orca:
        kubernetes:
          useExecHealthCheck: false
      rosco:
        kubernetes:
          useExecHealthCheck: false
      terraformer:
        kubernetes:
          useExecHealthCheck: false
          securityContext:
            runAsUser: 1000
            runAsGroup: 1000
            fsGroup: 1000
 
### In Halyard
#### halconfig
The following changes will need to be made in the halconfig file.  Most of these settings can be adjusted in the config file directly.
      stats:
        enabled: false
        ## This prevents recreating echo on every single deploy of spinnaker
        instanceId: disable-echo-always-recreating
      telemetry:
      # add to default config
        enabled: true
        endpoint: https://stats.spinnaker.io
        connectionTimeoutMillis: 3000
        readTimeoutMillis: 5000
      deploymentEnvironment:
        size: SMALL
        type: Distributed
        updateVersions: true
        vault:
          enabled: false
        livenessProbeConfig:
          enabled: true
          ## Default to 10 minutes before starting liveness probes.  Larger installs may need longer
          initialDelaySeconds: 600
        location: spinnaker
      # This is current default we'd PREFER deployed everyplace... can be overridden per cust
      ## DO NOT turn on the monitoring daemon - it does NASTY things to spinnaker's system, and it uses a lot of resources.  USE the observability plugin instead! (Separate files)
      metricStores:
        prometheus:
          enabled: false
        enabled: false
 
#### Profiles configuration
Each service will already have a ```-local.yml``` file existing in hal config profiles directory e.g. (```~/.hal/default/profiles/```), or users will need to create each file and add the following information to each file
```spinnaker-local.yml```
ok-http-client:
  ## connects should never really be increased beyond this 
  connectTimeoutMs: 15000
  ## Start at 60 seconds for downloads, but may need to be bigger if using large files/artifacts.
  readTimeoutMs: 60000
  maxRequests: 256
  maxRequestsPerHost: 256
```clouddriver-local.yml```
serviceLimits:
  cloudProviderOverrides:
    aws:
      rateLimit: 10.0
  implementationLimits:
    ## Examples - default rate limit is 10, reducing these can reduce AWS API calls preventing throttling but it's FAR better to get a support ticket in...  and increase the API limits.
    AmazonAutoScaling:
      defaults:
        rateLimit: 3.0
    AmazonElasticLoadBalancing:
      defaults:
        rateLimit: 5.0
## NOTE we do NOT set redis NOR sql enabled/true/false here.  What we DO set are specific settings underneath.  This is HIGHLY tied
## to the environment deployed to, but defaulting to sql & redis, these should be good common settings.  WHEN only redis
## is used, should override this as appropriate
```settings-local.js```
window.spinnakerSettings.feature.kustomizeEnabled = true;
window.spinnakerSettings.feature.artifactsRewrite = true;
window.spinnakerSettings.feature.functions = true;
window.spinnakerSettings.kubernetesAdHocInfraWritesEnabled = true;
// DO NOT go without this... authz/authn enabled turn this on automatically as well.
window.spinnakerSettings.authEnabled = true;
// The below SHOULD be overridden per customer.  Leaving it here as a default though for reference
//window.spinnakerSettings.feature.terraform = true;
```echo-local.yml```
resilience4j.circuitbreaker:
  instances:
    telemetry:
      # This needs to stay false, because if the telemetry endpoint goes down, Echo goes unhealthy (no good!)
      registerHealthIndicator: false
 
```gate-local.yml```
### This enables the X509 Client authentication system
default:
  apiPort: 8443
## Here for reference - we recommend this as allows path routing configs vs separate domains.
# servlet:
#   context-path: /api/v1
server:
  tomcat:
    ## In 2.2.4+spring boot, needs to include KB for sizing due to large group payload potentials or similar issues
    max-http-header-size: 256KB
    protocolHeader: X-Forwarded-Proto
    remoteIpHeader: X-Forwarded-For
    internalProxies: .*
    httpsServerPort: X-Forwarded-Port
redis:
  configuration:
    secure: true
proxies:
  - id: terraform
    uri: http://spin-terraformer:7088
    methods:
      - GET
```igor-local.yml```
spinnaker:
  pollingSafeguard:
    # The defaults for polling is 1000 - this 10x that to allow for lots of new images.
    itemUpperThreshold: 10000
```orca-local.yml```
executionRepository:
  sql:
    enabled: true
  redis:
    enabled: false
monitor:
  activeExecutions:
    redis: false
sql:
  ## Some sane defaults for connection sql pools for all customers These are "decent" starting settings.
  connectionPools:
    connectionTimeout: 5000
    maxLifetime: 30000
    maxPoolSize: 100
 
#### Service Settings Configuration
Each service will already have a ```.yml``` file existing in hal config service-settings directory e.g. (```~/.hal/default/service-settings/```), or users will need to create each file and add the following information to each file
Note: We GENERALLY recommend NOT using the embedded Redis. POC's can override this. ALSO make sure replicas is ALWAYS at least 2 (not currently set in these files) - for each service.
```redis.yml```
```skipLifeCycleManagement: true```
```clouddriver.yml```
kubernetes:
  useExecHealthCheck: false
#Examples of common settings can be set/overriden.  HIGHLY recommend an APM agent for monitoring various aspects including jvm details not available through other metrics.  
#env:
  #JAVA_OPTS: -Dnewrelic.config.file=/opt/apmagent/config/newrelic.yml -javaagent:/opt/apmagent/newrelic/newrelic.jar -Djavax.net.ssl.trustStore=/etc/ssl/certs/java/cacerts -Djdk.tls.client.protocols=TLSv1.2 -XX:MaxRAMPercentage=50.0
```dinghy.yml```, `````````echo.yml```, `````````front50.yml```, `````````fiat.yml```, `````````gate.yml```, ```igor.yml```, `````````kayenta.yml```, `````````orca.yml```, `````````rosco.yml``` each need to have the following lines added into an existing file, or added to a newly created file
kubernetes:
  useExecHealthCheck: false
```terraformer.yml```````````````
kubernetes:
  useExecHealthCheck: false
  securityContext:
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000

