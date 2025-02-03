---
title: FME SDK troubleshooting
sidebar_label: SDK troubleshooting
helpdocs_is_private: true
helpdocs_is_published: false
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025918571-Troubleshooting </button>
</p>

Our SDKs have a standardized interface for inputs to every method. If you have issues getting up and running with any of our SDKs or aren't getting the expected return from any method or to the Split user interface, you can find a detailed view of the types of validation that our SDK performs for each method below.

## GetTreatment Method Validation

Below are the expected input data types for the method `getTreatment(key, feature_flag_name, attributes)`:
* key: `string` that is less than or equal to 250 characters 
* feature_flag_name: `string`
* attributes: `dictionary`

Note: For iOS, Android, and JS - this method also has a signature of `getTreatment(feature_flag_name, attributes)` - if you are troubleshooting any of these SDKs, feel free to skip the Key Validations below.

### Key Validations

#### key == null || key undefined (or similar for each language)
* SDK will return `control`
* SDK will log the following error to the console “getTreatment: you passed a null or undefined key, the key must be a non-empty string”
* no Impression will be logged back to Split servers

#### key is longer than 250 characters
* SDK will return `control`
* SDK will log the error “getTreatment: key too long - must be 250 characters or less”
* no Impression will be logged back to Split servers

###key is of type number and is finite
* SDK will perform best effort to stringify the input and return a treatment for the converted response
* SDK will log the error “getTreatment: key too long - must be 250 characters or less”


#### key is not of type string or finite number or object type
* SDK will return `control`
* SDK will log the error “getTreatment: you passed an invalid key type, key must be a non-empty string”
* no Impression will be logged back to Split servers

###key is an empty string
* SDK will return `control`
* SDK will log the error “getTreatment: you passed an empty string, key must be a non-empty string”
* no Impression will be logged back to Split servers


### Feature Flag Name Validations

#### feature_flag_name == null || undefined
* SDK will return `control`
* SDK will log the error “getTreatment: you passed a null or undefined feature flag name, flag name must be a non-empty string”
* no Impression will be logged back to Split servers

#### feature_flag_name is not of type string
* SDK will return `control`
* SDK will log the error “getTreatment: you passed an invalid feature flag name, flag name must be a non-empty string”
* no Impression will be logged back to Split servers

#### feature_flag_name is an empty string
* SDK will return `control`
* SDK will log the error “getTreatment: you passed an invalid feature flag name, flag name must be a non-empty string”
* no Impression will be logged back to Split servers

#### feature_flag_name has whitespace at the end or beginning of the string
* SDK will evaluate with the trimmed version of the feature_flag_name.
* SDK will log the warning “getTreatment: feature flag name "X" has extra whitespace, trimming”
* An Impression will be logged with the trimmed feature_flag_name.


### Attributes Validations

###attributes is not of type dictionary
* SDK will return `control`
* SDK will log the error “getTreatment: attributes must be of type dictionary”
* no Impression will be logged back to Split servers

## Track Method Validation

Below are the errors and expected behavior you can expect from the SDK on the `track(key, traffic_type_name, event_type, value)` method

Note: For iOS, Android, and JS - this method also has signatures without a `traffic_type_name` or `key` - if you are troubleshooting any of these SDKS, feel free to skip the Key and Traffic Type Validations below.

### Key Validations

#### key == null || undefined
* SDK will return false
* SDK will log the error “track: you passed a null or undefined key, key must be a non-empty string”
* no event will be logged back to Split servers

#### key is of type number
Log warning “track: key X is not of type string, converting to string”
Store key As String
* SDK will stringify the key.
* SDK will log the error warning “track: key X is not of type string, converting to string”

#### key is not of type string or number
* SDK will return false
* SDK will log the error “track: you passed and invalid key, key must be a non-empty string”
* no event will be logged back to Split servers

#### key is an empty string
* SDK will return false
* SDK will log the error “track: you passed an empty key, key must be a non-empty string”
* no event will be logged back to Split servers

#### key is longer than 250 chars
* SDK will return false
* SDK will log the error “track: key too long - must be 250 characters or less”
* no event will be logged back to Split servers


### Event Type Validations

#### event\_type is an empty string
* SDK will return false
* SDK will log the error “track: you passed an empty event_type, event_type must be a non-empty String”
* no event will be logged back to Split servers

#### event\_type == null
* SDK will return false
* SDK will log the error “track: you passed a null or undefined event_type, event_type must be a non-empty String”
* no event will be logged back to Split servers

#### event\_type not type string
* SDK will return false
* SDK will log the error “track: you passed an invalid event_type, event_type must be a non-empty String”
* no event will be logged back to Split servers

#### event\_type does not conform with reg exp 
* Regular expression is: ^[a-zA-Z0-9][-\_.:a-zA-Z0-9]{0,79}$
* SDK will return false
* SDK will log the error track: you passed “EVENT\_TYPE\_VALUE”, event name must adhere to the regular expression [a-zA-Z0-9][-\_.:a-zA-Z0-9]{0,79}. This means an event name must be alphanumeric, cannot be more than 80 characters long, and can only include a dash, underscore, period, or colon as separators of alphanumeric characters”
* no event will be logged back to Split servers


### Traffic Type Validations

#### traffic_type_name == null
* SDK will return false
* SDK will log the error “track: you passed a null or undefined traffic_type_name, traffic_type_name must be a non-empty string” 
* no event will be logged back to Split servers

#### traffic_type_name not type string
* SDK will return false
* SDK will log the error “track: you passed an invalid traffic_type_name”, traffic_type_name must be a non-empty string”
* no event will be logged back to Split servers

#### traffic_type_name empty string
* SDK will return false
* SDK will log the error “track: you passed an empty traffic_type_name, traffic_type_name must be a non-empty string”
* no event will be logged back to Split servers

#### traffic_type_name has capitalized letters
* SDK will log the warner “track: traffic_type_name should be all lowercase - converting string to lowercase"
* event will be logged back to Split servers with traffic_type_name lowercased


### Value Validations

#### Value not null and not a finite number
* SDK will return false
* SDK will log the error “track: value must be a number” 
* no event will be logged back to Split servers

## Factory Instantiation Validation

Below is a view of the validation to expect when instantiating the SDK factory

### Validation for SplitFactoryBuilder.build("YOUR_SDK_KEY", config);

#### sdk_key == empty string
* SDK will log the error “factory instantiation: you passed and empty sdk_key, sdk_key must be a non-empty string”

#### sdk_key == null || key undefined
* SDK will log the error: “factory instantiation: you passed a null or undefined sdk_key, sdk_key must be a non-empty string”

#### (Backend SDKs only) sdk_key == browser type
* SDK will log the error: “factory instantiation: you passed a client side type SDK key, please grab an api key from the Split user interface that is of type server side”

If any of the above errors are encountered:
* Any calls to getTreatment and getTreatments will return control or map of controls
* Any calls to track will return false
* Any manager methods will return null or an empty collection


### (JS and mobile SDKs only) Instantiation with a Key

#### key == empty string
* SDK will log the error: “factory instantiation: you passed an empty key, key must be a non-empty string”

#### key == null || key undefined
* SDK will log the error: “factory instantiation: you passed a null or undefined key, key must be a non-empty string”

###(JS only) key == empty string
* SDK will log the error: “client instantiation: you passed an empty key, key must be a non-empty string”

###(JS only) key == null || key undefined
* SDK will log the error: “client instantiation: you passed a null or undefined key, key must be a non-

If any of the above errors are encountered:
* Any calls to getTreatment and getTreatments will return control or map of controls
* Any calls to track will return false
* Any manager methods will return null or an empty collection

### Validations if ready config is not properly set

#### Ready == null (Backend SDKs only)
SDK will log the warning: “no ready parameter has been set - incorrect control treatments could be logged” if no ready config has been set when building factory

###(JS SDK only) Log warning if there are no proper callbacks for either the event or the ready promise. 
SDK will log the warning: “No listeners for SDK Readiness detected. Incorrect control treatments could be logged if you call getTreatment while the SDK is not yet ready”

#### (JS SDK only) If the readiness events are subscribed to AFTER the SDK is ready:
SDK will log the warning: “A listener was added for \{event name\} on the SDK, which has already fired and won’t be emitted again. The callback won’t be executed.”

## GetTreatments Method Validation

Below are the expected input data types for the method `getTreatments(key, feature_flag_names)`:
* key: `string` that is less than or equal to 250 characters 
* feature_flag_names: `array`


### Feature Flag Names Validations

#### feature_flag_names == null || undefined || not an array
* SDK will return null
* SDK will log the error “getTreatments: feature_flag_names must be a non-empty array”
* no Impressions will be logged back to Split servers

#### feature_flag_names == empty array 
* SDK will return an empty object or collection
* SDK will log the error “getTreatments: feature_flag_names must be a non-empty array”
* no Impressions will be logged back to Split servers

### Validations for each flag name in feature flag names Array

All the same checks will be performed for feature_flag_name as defined in the get_treatment section above. Our SDK will validate each feature flag name and log the corresponding error for each. It will also filter out any invalid inputs and only include the valid inputs in the returned dictionary.

## Manager Interface Validation

Below are a set of validations for the `manager.split(feature_flag_name)` method:

#### feature_flag_name == null || feature_flag_name == undefined
* SDK will return null
* SDK will log the error “split: you passed a null or undefined feature flag name, flag name must be a non-empty string”

#### feature_flag_name == empty string
* SDK will return null
* SDK will log the error “split: you passed an empty feature flag name, flag name must be a non-empty string”

#### feature_flag_name not type string
* SDK will return null
* SDK will log the error “split: you passed an invalid feature flag name, flag name must be a non-empty string”

## Validation for a Destroyed Client

Below is the behavior you can expect from the client if it is used after it has been destroyed:

* All methods will log the error “Client has already been destroyed - no calls possible”
* Any calls to getTreatment and getTreatments will return control or map of controls
* Any calls to track will return false
* Any manager methods will return null or an empty collection