---
sidebar_position: 1
---

# Overview

Gitness provides a comprehensive remote API for interacting with repositories, pipelines and more. This section of the documents provides instructions for authenticating and using the remote API.

Full API documentation is available at your Gitness instance's `/swagger` endpoint. With Gitness running locally, go to [http://localhost:3000/swagger](http://localhost:3000/swagger).

## Authorization

The remote API uses personal tokens to authorize requests. You can retrieve an personal token in the Gitness user interface by navigating to your user profile.

Authorization to the API is performed using the HTTP Authorization header. Provide your token as the bearer token value.

* Example Header.

    ```
    Authorization: Bearer AKIAIOSFODNN7EXAMPLE
    ```

* Example Request.

    ```
    curl -X GET "http://localhost:8080/api/user" \
    -H "Authorization: Bearer AKIAIOSFODNN7EXAMPLE"
    ```
