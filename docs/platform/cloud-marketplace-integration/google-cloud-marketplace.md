---
title: Google Cloud Marketplace Integration
description: Harness Modules listings on Google Cloud Marketplace and different workflows supported.
sidebar_label: Google Cloud Marketplace Integration
sidebar_position: 1
---


### What is a Google cloud marketplace listing?
A Google Cloud Marketplace listing is essentially a way for software vendors to offer their products and services to customers directly through Google Cloud Platform (GCP). It provides a convenient platform for users to discover, purchase, and deploy software solutions directly from Google Cloud Console or through APIs.


### What are the Harness products currently available on Google Cloud Marketplace?
     | **Product** | **Private Offer Flow** | **Public Offer Flow** |
     | --- | --- | --- |
     | [Harness Software Delivery Platform](https://console.cloud.google.com/marketplace/product/harness-public/harness-software-delivery-platform)| Yes | No |
     | [Harness Continuous Delivery](https://console.cloud.google.com/marketplace/product/harness-public/harness-continuous-delivery) | Yes | Yes |


### How can customers purchase the Harness products via Google Cloud Marketplace Private Offer Flow? 
    There are two ways for the customer to initiate the private offer flow with Harness:
        1. If the customer has an existing relationship with Harness, then Harness can collect the required customer details, create an offer and send the customer a private offer so that customer pays a custom price for the software.
        2. If customer discovered the product they are interested in and wants to request a custom quote for a product, customer can contact the Harness' sales team by clicking on the contact sales functionality.
        ![](./static/gcp_pvt_offer_contact_sales_form.png)

    #### Step 1: Details required from customer by Harness, for creating the private offer:
        1. The Harness products customer is interested in procuring.
        2. Customer Organization
        3. Customer Contact Name
        4. Customer Email
        5. Customer's Google cloud billing account id
        6. Contract start date

    #### Step 2: Steps to accept the Harness Private Offer:
        1. Once the private offer has been created and published, the customer can be informed via the email and/or by sending across the offer URL.
        2. The customer will receive the email that looks like: ![](./static/gcp_pvt_offer_customer_email.png)
        3. Upon clicking the review offer link received via the email, the customer will be able to view the offer details and also accept the offer. 
        ![](./static/gcp_pvt_offer_customer_accept.png)
        4. As soon as the offer is accepted customer can view the status of the order on the product page as well as the manage orders link.
        ![](./static/gcp_pvt_offer_customer_accepted.png)
        5. When you navigate to the Marketplace > Orders section you should see an order in pending state. Harness system is currently approving and activating your account. The activation may take 1-5 minutes.
        ![](./static/gcp_pvt_offer_pending_state.png)
        ![](./static/gcp_pvt_offer_activation_in_progress.png)
        6. Once the account has been activated, customer will be able to see the status updated on the orders.
        ![](./static/gcp_pvt_offer_active.png)
        7. At this point the account has been activated. 
        8. As the last step customer will have to reach out to Harness sales rep that assisted with the private offer, in order to provision the product licensing.


    ### How can customers purchase the Harness products via Google Cloud Marketplace Public Offer Flow? 
        A Google Cloud Marketplace public listing refers to a software or service offering that is publicly available and accessible to all users of the Google Cloud Platform (GCP). When a product or service is listed as "public" on the Google Cloud Marketplace, it means that any GCP customer can discover, evaluate, and potentially deploy that offering within their own cloud environment. 
        
        This is the self serve model where the user can discover the product, view the pricing of the product, make the purchase and start using the product as soon as the order/account is approved.
        Harness currently offers following  products as public listings:
        *   [Harness Continuous Delivery](https://console.cloud.google.com/marketplace/product/harness-public/harness-continuous-delivery) 

        #### Please follow the steps below inorder to subscribe to the publicly listed Harness product:
            1. Customers can find the Harness listings by simply searching for 'Harness' on the Google Cloud Marketplace products. 
            2. Navigate to the Harness product you want to subscribe to.
            3. If the product is listed publicly, as a customer you should be able to view the pricing and see a subscribe button:
            ![](./static/gcp_public_offer_subscribe.png)
            4. Please click on the subscribe to view the terms and offered plans. 
            5. As a customer once you select the plan and finalize the subscription you will be provided with two options:
                1. Sign up with the provider
                2. Manage orders
            6. As a customer you will view the Harness signup page upon clicking 'Signup with the provider' option. This option will take the customer signup information and create the account for the respective email id provided during the sign up process.
            7. At this point the customer will be able to login and start using the product. Please reach out to the Harness support for any issues encountered. 





