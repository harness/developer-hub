---
title: "Article: Moving Feature Flags to a Service"
sidebar_label: "Article: Moving Feature Flags to a Service"
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 2
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025281872-Moving-Feature-Flags-to-a-Service </button>
</p>

## Using a Service for Feature flags

Split lets you roll out features and experiment with a target group of customers across the full web stack: from deep in the backend to client-facing JavaScript and mobile.

Feature flagging in mobile can be particularly advantageous. For example, consider what happens when a critical bug appears in a newly-released mobile feature: due to App Store approval delay, a fix can’t be delivered to customers in minutes; not to mention, you can't force customers to update their apps.

Many mobile and IoT apps are highly optimized for the resource-constrained environment of the device. A feature flagging solution should have minimal or no significant impact on the size or performance of your mobile app.

A customer should be able to access a new feature whether using the web, mobile, or IoT app. A lack of consistency in customer experience can lead to customer frustration.

Split provides per-language libraries (.Net, Java, Node, PHP, Python, Ruby, Go) on the back end and iOS and Android libraries for mobile. For web, we provide a JavaScript SDK, as well as first-class support for React and Redux vía two libraries. When we do not support a language, we recommend wrapping one of our server-side libraries in a small service - hosted on your infrastructure.

This same approach can provide benefits for your browser, mobile or IoT apps as well, querying the service at startup for which features are to be turned on and which are to be turned off. Let’s call it the 'phone home' approach.

This approach has a number of advantages:

* **Uniform experience across devices, versions and viewports**
  It ensures a uniformity of experience across clients. Since the web app can also query the same service, our customers can be confident that their customers will either see a feature on or off, regardless of how they access the product - via mobile or web. Thus, phoning home is portable.

* **Update your platform without touching the app**
  Split is a core piece of our customers’ infrastructure and is always improving. By hosting Split on the server-side, our customers can confidently upgrade their server-side Split library, without having to worry about older, possibly conflicting, versions of Split being used in older mobile or IoT apps. Phoning home avoids versioning headaches.

* **Use more data than available on the device or in the browser**
  When deciding whether a user sees a feature or not, you often need to leverage user data that may not be available on the device. Take, for instance, demographic data about the user or outputs of data models. Instead of downloading such sensitive data to the front end, you can simply pass the data to Split on the server-side, thus bypassing the need to download and retain information on the browser or device.

* **No impact to file size**
  By hosting the library on the server side, you need never worry about increasing the footprint of your mobile or IoT app by adding Split’s library. Phoning home is safe.

## Best Practices for Designing the Service

Split provides the [Evaluator](https://help.split.io/hc/en-us/articles/360020037072-Split-Evaluator) as an out of the box solution for evaluating feature flags on the server-side, to both address potential client-side challenges and to split on applications written in languages for which there is no SDK.

The app should call home and retrieve a mapping of features to the treatment (aka variation, experience) to show the app user for those features. Assuming a service deployed at /splits, we recommend using the following REST API:

```
@GET 
/splits/{customer_id}?dimension_1={dimension_1_value}&dimension_2={dimension2_value}....
```

Example:

```
/splits/4915?connection_speed=3G&country=usa&device_type=android....
```

`customer_id`: a unique identifier for your customer. If your product has a web presence, this id should preferably be shared between web and mobile so that the customer will see the same treatment for a feature, whether they access it from the web or mobile app.

`dimension_n_value`: The mobile app can send any dimensions about the customer that the server should take into account while determining which treatment to show to that customer. For instance: current location, connection speed or device type of the customer.

Since dimension values are encoded in the query parameters, we recommend communicating over https.

### Response Schema and Status Code

The response object should follow this schema:

```
// a map of feature name to treatment
[
  {
     'featureName': string,
     'treatment' : string
  }
]
```

The response status should be:

`200` - this REST endpoint will always return a 200. In the case of failure, the 200 status code should be accompanied by an empty list as the response object.

The app should assume that if a feature was not returned in the list, then the `control` treatment should be shown. `control` is a reserved treatment that indicates a problem in computing a treatment. When using Split, a developer should always handle control. For instance, here is sample Java code for a basic on/off feature:

```
String treatment = … // retrieved from the map returned by server
if ("on".equals(treatment)) {
  // feature is 'on'. Turn it on for customer.
} else if ("off".equals(treatment)) {
  // feature is 'off'. Turn it off for customer.
} else {
  // feature is in 'control'. Handle it either as
  // 'on' or 'off' depending on your use case or
  //  provide any special handling.
}
```

If ‘control’ means ‘off’, we can simplify this sample code to:

```
if ("on".equals(treatment)) {
  // feature is 'on'. Turn it on for customer.
} else {
  // feature is 'off'. Turn it off for customer.
}
```

### Server Code Sample

Here is a Guice enabled Java pseudo-code for the REST server:

```
@Path("/splits")
public class SplitServer {
   private SplitManager _manager;
   private SplitClient _client;
   @Inject
   public SplitServer(SplitFactory factory) {
       _manager = factory.manager();
       _client = factory.client();
   }
   @Path("{customer_id}")
   @GET
   public Response evaluateAllFeatures(@PathParam("customer_id") id,
             @Context UriInfo uriInfo) {
       Map<String, Object> attributes = uriInfo.getQueryParams();
       List<Map<String, String>> result = new ArrayList();
       for (Split split : _manager.splits()) {
           String t = _client.getTreatment(id, split.name(), attributes);
           Map<String, String> m = new HashMap();
           m.put("featureName", split.name());
           m.put("treatment", t);
           result.add(m);
       }
       return Response.ok(result);
   }
}
```