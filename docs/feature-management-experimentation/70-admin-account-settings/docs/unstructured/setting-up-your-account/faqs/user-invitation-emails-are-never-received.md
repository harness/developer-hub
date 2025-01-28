---
title: User invitation emails are never received
sidebar_label: User invitation emails are never received
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360042150771-User-invitation-emails-never-received </button>
</p>

## Problem

Invitation is sent successfully to a user for given organization, however, user never receive the email that has the invitation link.

## Root cause

Split backend servers use SendGrid email service to send emails, this is an enterprise subscription-based service which is usually individually targeted  for businesses. It is possible that emails from SendGrid is not individually targeted which will block incoming emails from Split.io.

## Solution

Contact your IT and request an individually targeted SendGrid service.