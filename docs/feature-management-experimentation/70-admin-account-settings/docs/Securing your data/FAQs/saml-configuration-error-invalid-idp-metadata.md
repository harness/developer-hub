---
title: "SAML configuration error: Invalid Idp metadata"
sidebar_label: "SAML configuration error: Invalid Idp metadata"
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360061870952-SAML-configuration-error-Invalid-Idp-metadata </button>
</p>

## Problem

When setting up SSO integration, the user interface shows an error stating SAML not configured. Invalid IdP Metadata. Please update.

## Root cause

The IdP metadata doesn't contain the necessary information to setup the integration or isn't properly formatted.

## Solution

Make sure your IdP metadata includes the following information:

* EntityDescriptor
* IDPSSODescriptor
* Signing key descriptor and certificate
* SingleSignOnService binding of type **HTTP-Redirect**. This is the only binding currently supported

Here's what your IdP metadata should typically look like:

```
<?xml version="1.0" encoding="UTF-8"?>
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="yourIdPEntityId">
<md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
<md:KeyDescriptor use="signing">
<ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:X509Data>
<ds:X509Certificate>...</ds:X509Certificate>
</ds:X509Data></ds:KeyInfo>
</md:KeyDescriptor>
<md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
<md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="yourIdPSAMLredirectURL"/>
</md:IDPSSODescriptor>
</md:EntityDescriptor>
```