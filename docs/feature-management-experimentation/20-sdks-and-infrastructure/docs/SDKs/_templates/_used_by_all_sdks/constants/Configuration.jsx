// let's keep these in alphabetical order  :)

export const ANDROID_LOG_LEVEL                           = () => <> Enables logging according to the level specified. Possible values: <code>NONE</code>,&nbsp;
                                                                    <code>VERBOSE</code>, <code>DEBUG</code>, <code>INFO</code>, <code>WARNING</code>,&nbsp;
                                                                    <code>ERROR</code>, and <code>ASSERT</code>. </>;
       const CORE_LABELS                                 = ({En}) => <> {En}able sending impression sent to Harness servers. Labels may contain sensitive
                                                                        information. </>;
export const CORE_LABELS_ENABLED                         = () => CORE_LABELS({ En: 'En' });
export const CORE_LABELS_DISABLED                        = () => CORE_LABELS({ En: 'Dis' });
export const CONNECTION_TIMEOUT                          = () => <> HTTP client connection timeout (<b>milliseconds</b>). </>;
export const IMPRESSIONS_INFO                            = () => <> Impressions are decisioning events, i.e. which end user saw which feature flag
                                                                    treatment (variation) at what time. This data powers feature monitoring and
                                                                    experiments. </>;
export const EVENTS_INFO                                 = ({rum}) => <> Events may be captured using the <code>track</code> method{rum}. </>;
export const EVENTS_INFO_RUM                             = () => EVENTS_INFO({ rum: ' or client-side RUM agent' });
export const MOBILE_BACKGROUND_SYNC_ENABLED              = () => <> Allow synchronization when app is in the background. </>;
export const MOBILE_BACKGROUND_SYNC_PERIOD               = () => <> Time (minutes) interval for background synchronization to sync feature flag and 
                                                                    segment definitions. Minimum possible value is 15. </>;
export const MOBILE_BACKGROUND_SYNC_WHEN_BATTERY_NOT_LOW = () => <> When set to <code>true</code>, the SDK synchronizes in the background only if battery
                                                                    level is not low. </>;
export const MOBILE_BACKGROUND_SYNC_WHEN_WIFI_ONLY       = () => <> When set to <code>true</code>, the SDK synchronizes in the background only if the
                                                                    wifi connection is available (unmetered). When <code>false</code>, the SDK synchronizes
                                                                    using any available connection. </>;
export const MOBILE_CERTIFICATE_PINNING_CONFIGURATION    = () => <> If set, enables certificate pinning for the given domains. For details, see the&nbsp;
                                                                    <a href="../Advanced%20use%20cases/#certificate-pinning">Certificate pinning</a> section below. </>;
export const MOBILE_EVENTS_PER_PUSH                      = () => <> Maximum size of batch when sending events to Harness servers. </>;
export const MOBILE_PERSISTENT_ATTRIBUTES_ENABLED        = () => <> Save attributes on persistent cache, which is loaded as part of the&nbsp;
                                                                    <code>SDK_READY_FROM_CACHE</code> flow. All functions that mutate the stored attributes
                                                                    map affect the persistent cache. </>;
export const MOBILE_PROXY_HOST                           = () => <> The location of the proxy using standard URI:&nbsp;
                                                                    <code>scheme://user:password@domain:port/path</code>. If no port is provided, the SDK
                                                                    defaults to port 80. </>;
export const MOBILE_READ_TIMEOUT                         = () => <> HTTP socket read timeout (<b>milliseconds</b>). </>;
export const MOBILE_STORAGE_ENCRYPTION_ENABLED           = () => <> Encrypt local database contents. </>;
export const MOBILE_STORAGE_PREFIX                       = () => <> If set, the prefix will be prepended to the database name used by the SDK. </>;
export const SCHEDULER_EVENTS_PUSH_RATE                  = () => <> Time (seconds) interval for the SDK to send events to Harness servers. </>;
export const SCHEDULER_EVENTS_QUEUE_SIZE                 = () => <> Maximum number of events to queue. When the queue is full, the SDK flushes events and
                                                                    resets a timer. </>;
export const SCHEDULER_FEATURES_REFRESH_RATE             = () => <> Time (seconds) interval for the SDK to polls Harness servers for changes to feature
                                                                    flags. </>;
export const SCHEDULER_IMPRESSIONS_REFRESH_RATE          = () => <> Time (seconds) interval for the SDK to send impressions to Harness servers. </>;
export const SCHEDULER_IMPRESSIONS_QUEUE_SIZE            = () => <> Maximum number of impressions (decisioning events) to queue. When the queue is full, the
                                                                    SDK flushes impressions and resets a timer. </>;
export const SCHEDULER_PERSISTENT_CACHE_ENABLED          = () => <> The SDK polls Split servers for changes to segments at this rate (in seconds). </>;
export const SCHEDULER_SEGMENTS_REFRESH_RATE             = () => <> Time (seconds) interval for the SDK to polls Harness servers for changes to
                                                                    segments. </>;
export const SCHEDULER_TELEMETRY_REFRESH_RATE            = () => <> Time (seconds) interval for the SDK to send diagnostic data to Harness servers. </>;
export const STARTUP_EVENTS_FIRST_PUSH_WINDOW            = () => <> Time (seconds) for the first push of events after SDK initialization. </>;
export const STARTUP_READY_TIMEOUT                       = () => <> Time (seconds) to wait before firing the <code>SDK_READY_TIMED_OUT</code> event. </>;
export const STARTUP_REQUEST_TIMEOUT_BEFORE_READY        = () => <> Time (seconds) to wait for a response from the /splitChanges and /mySegments HTTP API
                                                                    endpoints during SDK initialization. </>;
export const STARTUP_RETRIES_ON_FAILURES_BEFORE_READY    = () => <> Number of retries when sending requests to the /splitChanges and /mySegments HTTP API
                                                                    endpoints during SDK initialization. </>;
export const STORAGE_TYPE                                = () => <> Storage type used by the SDK. Possible values are <code>MEMORY</code> and&nbsp;
                                                                    <code>LOCALSTORAGE</code>. </>;
export const STREAMING_ENABLED                           = () => <> Enable the streaming service for synchronization of feature flag and segment data.
                                                                    (If there is an issue with streaming, the SDK falls back to the polling service.)
                                                                    If <code>false</code>, the SDK uses polling only. </>;
export const SYNC_CONFIG                                 = () => <> Optional <code>SyncConfig</code> instance, used to filter feature flags to be synced and
                                                                    evaluated by the SDK. These filters can be created with the&nbsp;
                                                                    <code>SplitFilter::bySet</code> static function (recommended, flag sets are available in 
                                                                    all tiers) or <code>SplitFilter::byName</code> static function, and appended to this
                                                                    config using the <code>SyncConfig</code> builder. If not set or empty, all feature flags
                                                                    (for the given traffic type) are downloaded by the SDK. </>;
export const SYNC_ENABLED                                = () => <> Enable periodically updating feature flags and segments definitions. When&nbsp;
                                                                    <code>false</code>, the SDK downloads data from the Harness only upon init. Setting
                                                                    this configuration parameter to <code>false</code>, may be one way to ensure a
                                                                    consistent UX or to optimize resources. </>;
export const SYNC_IMPRESSIONS_MODE                       = () => <> Defines types of impressions (decisioning events) sent to Harness servers. Possible
                                                                    values: <br />
                                                                    <ul>
                                                                        <li><code>OPTIMIZED</code>: unique impressions only</li>
                                                                        <li><code>NONE</code>: no impressions (the SDK tracks only minimum viable data to
                                                                    support usage stats)</li>
                                                                        <li><code>DEBUG</code>: ALL impressions</li>
                                                                    </ul>
                                                                    For experimentation, <code>OPTIMIZED</code> mode is recommended. If you are not
                                                                    implementing Feature monitoring nor Experimentation, you can use <code>NONE</code>
                                                                    &nbsp;to optimize network and storage load. <code>DEBUG</code> mode is useful for
                                                                    validating your POC. <br /><br />
                                                                    This configuration setting doesn't impact the impression listener which receives all
                                                                    generated impressions locally. </>;
export const SYNC_REQUEST_OPTIONS_GET_HEADER_OVERRIDES   = () => <> Callback function that can be used to override the Authentication header or append
                                                                    new headers to the SDK's HTTP(S) requests. </>;
export const SYNC_SPLIT_FILTERS                          = () => <> Filter the feature flags to be synced and evaluated by the SDK. This configuration
                                                                    parameter accepts a type string property and a list of string values for the given
                                                                    criteria. Type can be <code>bySet</code> (recommended, flag sets are available in all
                                                                    tiers) or <code>byName</code> (pass an array of strings defining the query). If this
                                                                    configuration setting is empty or unset, all feature flags (for the given traffic type)
                                                                    are downloaded by the SDK. </>;
export const TRACK_TRAFFIC_TYPE                          = () => <> When using the <code>track</code> method for tracking events, the default traffic type
                                                                    to be used. </>;
export const USER_CONSENT                                = () => <> User consent status used to control the tracking of events and impressions. Possible
                                                                    values are <code>GRANTED</code>, <code>DECLINED</code>, and <code>UNKNOWN</code>. See&nbsp;
                                                                    <a href="../Advanced%20use%20cases/#user-consent">User consent</a> for details. </>;
export const WEB_LOG_LEVEL                               = () => <> Boolean flag, string log level, or logger instance for activating SDK logs. See&nbsp;
                                                                    <a href='../Logging'>Logging</a> for details. </>;
export const WEB_STORAGE_PREFIX                          = () => <> An optional prefix for your data to avoid collisions. This prefix is prepended to the
                                                                    existing <code>'SPLITIO'</code> localStorage prefix. </>;
