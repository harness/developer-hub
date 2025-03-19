# How to extract Harness Feature Flags 

## Feature Flags on the Harness Platform

The Harness Platform is continuously evolving, with the product team regularly releasing new features and critical fixes. However, not all features and fixes are immediately available to all customers, as they must undergo thorough testing and validation.

Feature Flags allow specific features of the Harness Platform to be enabled or disabled for individual customer accounts. These flags are managed by the Harness Support team upon request. Many customers frequently inquire about the feature flags enabled for their accounts. This documentation provides guidance on how to retrieve that information.

### Tools Needed: 

* chrome / safari browser
* curl 
* jq
* gitbash (if Windows)

### Instructions:

*Note*: These instructions have been tested on a MacBook and may vary slightly for Windows machines. Please refer to the respective browser's help documentation for specific guidance.

1. Navigate to the Harness on the browser

2. On the browser, open up Developer Tools 

  - **Chrome**: View → Developer → Developer Tools

    ![Image](../static/ff-chrome-developer-tools.png)

  - **Safari**: Develop → Show Javascript Console

      ![Image](../static/ff-safari-dev-tools.png)

3. Navigate to the Network tab

4. Search for **“evaluations“**

5. Refresh the browser. 

6. Make sure you select  **“evaluations”** in Name

7. Go to the Response (chrome) or Preview (safari) tab and see the entire payload with FF are enabled and disabled

  - value: true = On/Enabled

  - value: false = Off/Disabled

  - **Chrome**: 

    ![Image](../static/ff-chrome-network.png)

  - **Safari**: 

    ![Image](../static/ff-safari-network-console.png)

8. From the Response / Preview Tab you can search (CTRL+F) the entire payload to find any specific flags

   ![Image](../static/ff-list-search.jpg)

9. To run same command from command line (cURL), right click on the Name:evaluations?cluster=1  (chrome) / Name:evaluations (safari) then choose Copy=>Copy as cURL (chrome) / Copy as cURL (safari) option. You will have a full cURL command. 

  - **Chrome Screenshot**:

    ![Image](../static/get-ff-curl.png)

 -  **Safari Screenshot**:

    ![Image](../static/ff-safari-copy-curl.png)

 10. Append the command you got from step 9 with “-o ff.json” and run in the terminal as below. *Note: Please DO NOT copy and run below examplec code; it will not work!*
```

curl 'https://proxy-prod.ff.harness.io/client/env/27e2d176-95b8-49b3-a76d-698e3056bcd7/target/1YXEnD4uTqqnkRbbeT3QAA/evaluations?cluster=1' \

  -H 'accept: */*' \

  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \

  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJhdXRoLWtleS1mOWU4ODliZjMzNzNiNTEyN2*************************************************************************************************************************************************************************************************************************************************************************************b1TGiH4EnuuWDq_l9O0isda4' \

  -H 'harness-accountid: undefined' \

  -H 'harness-environmentid: undefined' \

  -H 'harness-sdk-info: Javascript 1.26.1 Client' \

  -H 'harness-target: eyJpZGVudGlmaWVyIjoiMVlYRW5ENHVUcXFua1JiYmVUM1FBQSIsIm5hbWUiOiIxWVhFbkQ0dVRxcW5rUmJiZVQzUUFBIn0=' \

  -H 'origin: https://app.harness.io' \

  -H 'priority: u=1, i' \

  -H 'sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"' \

  -H 'sec-ch-ua-mobile: ?0' \

  -H 'sec-ch-ua-platform: "macOS"' \

  -H 'sec-fetch-dest: empty' \

  -H 'sec-fetch-mode: cors' \

  -H 'sec-fetch-site: same-site' \

  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36’ \

  -o ff.json
```
The above command will write all the json output containing all the feature flags into a file **ff.json**

11. Now run below commands to get the relevant list of FFs in shell terminal

    - Feature Flags Enabled
    ```
    jq  --raw-output 'map_values(select(.value == "true"))| .[]|[.flag] | @csv' ff.json | sort -u
    ```

    - Feature Flags NOT Enabled
    ```
    jq  --raw-output 'map_values(select(.value == "false"))| .[]|[.flag] | @csv' ff.json | sort -u
    ```
