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
export const HTTPS_AUTHENTICATOR                         = (s) => <> If set, used by the {s ?? 'SDK'} to authenticate network requests. Value must be an implementation
                                                                    of <code>SplitHttpAuthenticator</code>. </>;
export const IOS_LOG_LEVEL                               = () => <> Enables logging according to the level specified. Possible values: <code>NONE</code>,&nbsp;
                                                                    <code>VERBOSE</code>, <code>DEBUG</code>, <code>INFO</code>, <code>WARNING</code>,&nbsp;
                                                                    and <code>ERROR</code>. </>;
export const MOBILE_BACKGROUND_SYNC_ENABLED              = () => <> Allow synchronization when app is in the background. </>;
export const MOBILE_BACKGROUND_SYNC_PERIOD               = () => <> Time (minutes) interval for background synchronization to sync feature flag and 
                                                                    segment definitions. Minimum possible value is 15. </>;
export const MOBILE_BACKGROUND_SYNC_WHEN_BATTERY_NOT_LOW = (s) => <> When set to <code>true</code>, the {s ?? 'SDK'} synchronizes in the background only if battery
                                                                    level is not low. </>;
export const MOBILE_BACKGROUND_SYNC_WHEN_WIFI_ONLY       = (s) => <> When set to <code>true</code>, the {s ?? 'SDK'} synchronizes in the background only if the
                                                                    wifi connection is available (unmetered). When <code>false</code>, the {s ?? 'SDK'} synchronizes
                                                                    using any available connection. </>;
export const MOBILE_CERTIFICATE_PINNING_CONFIGURATION    = () => <> If set, enables certificate pinning for the given domains. For details, see the&nbsp;
                                                                    <a href="../advanced-use-cases/#certificate-pinning">Certificate pinning</a> section below. </>;
export const MOBILE_EVENTS_PER_PUSH                      = () => <> Maximum size of batch when sending events to Harness servers. </>;
export const MOBILE_PERSISTENT_ATTRIBUTES_ENABLED        = () => <> Save attributes on persistent cache, which is loaded as part of the&nbsp;
                                                                    <code>SDK_READY_FROM_CACHE</code> flow. All functions that mutate the stored attributes
                                                                    map affect the persistent cache. </>;
export const MOBILE_PROXY_HOST                           = (s) => <> The location of the proxy using standard URI:&nbsp;
                                                                    <code>scheme://user:password@domain:port/path</code>. If no port is provided, the {s ?? 'SDK'}
                                                                    defaults to port 80. </>;
export const MOBILE_READ_TIMEOUT                         = () => <> HTTP socket read timeout (<b>milliseconds</b>). </>;
export const MOBILE_STORAGE_ENCRYPTION_ENABLED           = () => <> Encrypt local database contents. </>;
export const MOBILE_STORAGE_PREFIX                       = (s) => <> If set, the prefix will be prepended to the database name used by the {s ?? 'SDK'}. </>;
export const SCHEDULER_EVENTS_PUSH_RATE                  = (s) => <> Time (seconds) interval for the {s ?? 'SDK'} to send events to Harness servers. </>;
export const SCHEDULER_EVENTS_QUEUE_SIZE                 = (s) => <> Maximum number of events to queue. When the queue is full, the {s ?? 'SDK'} flushes events and
                                                                    resets a timer. </>;
export const SCHEDULER_FEATURES_REFRESH_RATE             = (s) => <> Time (seconds) interval for the {s ?? 'SDK'} to poll Harness servers for changes to feature
                                                                    flags. </>;
export const SCHEDULER_IMPRESSIONS_REFRESH_RATE          = (s) => <> Time (seconds) interval for the {s ?? 'SDK'} to send impressions to Harness servers. </>;
export const SCHEDULER_IMPRESSIONS_QUEUE_SIZE            = (s) => <> Maximum number of impressions (decisioning events) to queue. When the queue is full, the
                                                                    {s ?? 'SDK'} flushes impressions and resets a timer. </>;
export const SCHEDULER_LOCALHOST_REFRESH_RATE            = () => <> In localhost mode, time (seconds) interval to sync feature flags and segments (mocked
                                                                    data from a file). Setting this configuration parameter to -1 turns off synchronization
                                                                    in localhost mode. </>;
export const SCHEDULER_PERSISTENT_CACHE_ENABLED          = (s) => <> The {s ?? 'SDK'} polls Split servers for changes to segments at this rate (in seconds). </>;
export const SCHEDULER_SEGMENTS_REFRESH_RATE             = (s) => <> Time (seconds) interval for the {s ?? 'SDK'} to poll Harness servers for changes to
                                                                    segments. </>;
export const SCHEDULER_TELEMETRY_REFRESH_RATE            = (s) => <> Time (seconds) interval for the {s ?? 'SDK'} to send diagnostic data to Harness servers. </>;
export const STARTUP_EVENTS_FIRST_PUSH_WINDOW            = (s) => <> Time (seconds) for the first push of events after {s ?? 'SDK'} initialization. </>;
export const STARTUP_READY_TIMEOUT                       = () => <> Time (seconds) to wait before firing the <code>SDK_READY_TIMED_OUT</code> event. </>;
export const STARTUP_REQUEST_TIMEOUT_BEFORE_READY        = (s) => <> Time (seconds) to wait for a response from the /splitChanges and /mySegments HTTP API
                                                                    endpoints during {s ?? 'SDK'} initialization. </>;
export const STARTUP_RETRIES_ON_FAILURES_BEFORE_READY    = (s) => <> Number of retries when sending requests to the /splitChanges and /mySegments HTTP API
                                                                    endpoints during {s ?? 'SDK'} initialization. </>;
export const STORAGE_TYPE                                = (s) => <> Storage type used by the {s ?? 'SDK'}. Possible values are <code>MEMORY</code> and&nbsp;
                                                                    <code>LOCALSTORAGE</code>. </>;
export const STREAMING_ENABLED                           = (s) => <> Enable the streaming service for synchronization of feature flag and segment data.
                                                                    (If there is an issue with streaming, the {s ?? 'SDK'} falls back to the polling service.)
                                                                    If <code>false</code>, the {s ?? 'SDK'} uses polling only. </>;
export const SYNC_CONFIG                                 = (s) => <> Optional <code>SyncConfig</code> instance, used to filter feature flags to be synced and
                                                                    evaluated by the {s ?? 'SDK'}. These filters can be created with the&nbsp;
                                                                    <code>SplitFilter::bySet</code> static function (recommended, flag sets are available in 
                                                                    all tiers) or <code>SplitFilter::byName</code> static function, and appended to this
                                                                    config using the <code>SyncConfig</code> builder. If not set or empty, all feature flags
                                                                    (for the given traffic type) are downloaded by the {s ?? 'SDK'}. </>;
export const SYNC_ENABLED                                = (s) => <> Enable periodically updating feature flags and segments definitions. When&nbsp;
                                                                    <code>false</code>, the {s ?? 'SDK'} downloads data from the Harness only upon init. Setting
                                                                    this configuration parameter to <code>false</code>, may be one way to ensure a
                                                                    consistent UX or to optimize resources. </>;
export const SYNC_IMPRESSIONS_MODE                       = (s) => <> Defines types of impressions (decisioning events) sent to Harness servers. Possible
                                                                    values: <br />
                                                                    <ul>
                                                                        <li><code>OPTIMIZED</code>: unique impressions only</li>
                                                                        <li><code>NONE</code>: no impressions (the {s ?? 'SDK'} tracks only minimum viable data to
                                                                    support usage stats)</li>
                                                                        <li><code>DEBUG</code>: ALL impressions</li>
                                                                    </ul>
                                                                    For experimentation, <code>OPTIMIZED</code> mode is recommended. If you are not
                                                                    implementing Feature monitoring nor Experimentation, you can use <code>NONE</code>
                                                                    &nbsp;to optimize network and storage load. <code>DEBUG</code> mode is useful for
                                                                    validating your POC. <br /><br />
                                                                    This configuration setting doesn't impact the impression listener which receives all
                                                                    generated impressions locally. </>;
export const SYNC_REQUEST_OPTIONS_GET_HEADER_OVERRIDES   = (s) => <> Callback function that can be used to override the Authentication header or append
                                                                    new headers to the {s ?? 'SDK'}'s HTTP(S) requests. </>;
export const SYNC_SPLIT_FILTERS                          = (s) => <> Filter the feature flags to be synced and evaluated by the {s ?? 'SDK'}. This configuration
                                                                    parameter accepts a type string property and a list of string values for the given
                                                                    criteria. Type can be <code>bySet</code> (recommended, flag sets are available in all
                                                                    tiers) or <code>byName</code> (pass an array of strings defining the query). If this
                                                                    configuration setting is empty or unset, all feature flags (for the given traffic type)
                                                                    are downloaded by the {s ?? 'SDK'}. </>;
export const TRACK_TRAFFIC_TYPE                          = () => <> When using the <code>track</code> method for tracking events, the default traffic type
                                                                    to be used. </>;
export const USER_CONSENT                                = (s) => <> User consent status used to control the tracking of events and impressions. Possible
                                                                    values are <code>GRANTED</code>, <code>DECLINED</code>, and <code>UNKNOWN</code>. See&nbsp;
                                                                    <a href="../advanced-use-cases/#user-consent">User consent</a> for details. </>;
export const WEB_LOG_LEVEL                               = (s) => <> Boolean flag, string log level, or logger instance for activating {s ?? 'SDK'} logs. See&nbsp;
                                                                    <a href='../Logging'>Logging</a> for details. </>;
export const WEB_STORAGE                                 = (s) => <> Pluggable storage instance to be used by the {s ?? 'SDK'} as a complement to in memory storage.
                                                                    Currently supported value is <code>InLocalStorage</code>. See&nbsp;
                                                                    <a href="#configure-localstorage-cache-for-the-sdk">Configure LocalStorage cache for the {s ?? 'SDK'}</a>&nbsp;
                                                                    for details. </>;
export const WEB_STORAGE_PREFIX                          = () => <> An optional prefix for your data to avoid collisions. This prefix is prepended to the
                                                                    existing <code>'SPLITIO'</code> localStorage prefix. </>;