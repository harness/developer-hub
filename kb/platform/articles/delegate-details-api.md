## Problem Statement

How to identify if the delegate is disconnected using api ?


## Resolution

Delegate status can be seen in the UI however it always helps if there is a progrmatic way of get the status of the delegates along with some other delegate details.

We have a graphql api fucntion that helps us provide such details. We can parse the response to get name , ip of the delegate version and connection status information.

Below is an example graphql api for the same:

```{delegateList(filters: [{accountId: "ux26DQG4Rg6K7J8jWagkjg"}], limit: 10) {

    nodes {

      delegateName

      ip

      status
      
      disconnected

      version

      hostName

      lastHeartBeat

    }

  }

}
```