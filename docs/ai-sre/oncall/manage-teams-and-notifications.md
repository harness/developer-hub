---
title: Configure On-Call Teams and Routing
description: Configure User Groups as on-call teams, assign service ownership, and set up personal notification preferences in Harness AI SRE.
sidebar_label: Teams and Routing
sidebar_position: 6
---

# Configure On-Call Teams and Routing

Harness AI SRE uses **User Groups** from the Harness Platform as the organizational unit for on-call management. User Groups serve as "teams" in the on-call context — they own services, own escalation policies, and determine routing for alerts.

This page covers both **administrator configuration** (User Groups, service ownership, routing) and **individual user configuration** (personal notification settings).

---

## User Groups as On-Call Teams

Harness AI SRE does not have a separate concept of "teams." Instead, it uses **Harness User Groups** defined at the platform level.

### What are User Groups?

User Groups are collections of users managed in the Harness Platform. They're used for:
- Role-based access control (RBAC)
- Service ownership in AI SRE
- Escalation policy ownership in AI SRE
- Alert routing in on-call management

For complete information on creating and managing User Groups, see [Add and Manage User Groups](/docs/platform/role-based-access-control/add-user-groups/) in the Harness Platform documentation.

### User Groups in AI SRE On-Call

In the on-call context, User Groups determine:
- **Who owns which services** — Each service in the Service Directory can be assigned an owning User Group
- **Who owns escalation policies** — Each escalation policy is owned by a User Group
- **How alerts are routed** — Alerts for a service route to the service's owning User Group's escalation policy

---

## Configure Service Ownership

Services in the AI SRE Service Directory are assigned to User Groups. This determines which team is responsible for on-call coverage when alerts fire for that service.

### Assign User Group to a Service

1. Navigate to **Project Settings** → **Service Directory (AI SRE)**
2. Find the service you want to configure
3. Click the service name to open its details
4. In the **Owning User Group** field, select the User Group responsible for this service
5. (Optional) Set an **Escalation Policy Override** if this service should use a different policy than the User Group's default
6. Click **Save**

### How Service Ownership Works

- Each service has an **owning User Group** field
- When an alert fires for a service, AI SRE looks up the service's owning User Group
- The alert routes to that User Group's escalation policy
- The escalation policy determines which schedule (and therefore which on-call responder) receives the page

---

## Escalation Policy Ownership

Escalation policies are owned by User Groups. This ties the policy to a specific team.

### Policy Owner Field

When creating or editing an escalation policy:
- The **Policy Owner** field specifies which User Group owns this policy
- This typically represents the team that uses this escalation policy for their on-call rotation
- A User Group can have one default escalation policy, but you can create additional policies for specific scenarios

### Default Escalation Policy

- Each User Group can have one **default escalation policy**
- When a service's owning User Group matches an escalation policy's owner, that policy is used for routing (unless the service specifies an override)
- If a User Group has no default escalation policy, alerts for services owned by that User Group cannot be automatically routed

---

## Alert Routing Flow

Understanding how alerts route through User Groups, services, and escalation policies:

1. **Alert arrives** with a service identifier in the payload
2. **Service Directory lookup** — AI SRE finds the service in the Service Directory
3. **User Group resolution** — AI SRE identifies the service's owning User Group
4. **Escalation policy selection** — AI SRE uses:
   - The service's escalation policy override (if configured), OR
   - The User Group's default escalation policy
5. **Schedule lookup** — The escalation policy references one or more schedules
6. **On-call responder identification** — AI SRE determines who is on-call at that moment
7. **Notification dispatch** — The on-call responder's personal notification rules are triggered

This flow ensures alerts always reach the right person based on service ownership and team structure.

---

## User Notification Settings

While administrators configure User Groups and service ownership, **each individual user** configures their own contact methods and notification rules. These personal settings determine how you're notified when you're on-call and an incident is assigned to you.

### Contact Information

Navigate to **On-Call** → **Contact Settings** to manage your notification channels.

#### Available Contact Methods

**Email**
- Email address tied to your Harness account
- Can add additional email addresses (work, home, other)
- Test notifications to verify delivery

**Phone**
- Add phone numbers with country code selection
- Supports voice calls
- Supported countries: Argentina, Brazil, Canada, China, Costa Rica, Cyprus, Denmark, India, Israel, Mexico, Moldova, Netherlands, Romania, Serbia, Slovenia, United Kingdom, United States
- Test calls to verify delivery

**SMS**
- Add mobile numbers for text messaging
- Supported countries: Argentina, Brazil, Canada, China, Costa Rica, Cyprus, Denmark, India, Israel, Mexico, Moldova, Netherlands, Romania, Serbia, Slovenia, United Kingdom, United States
- Test SMS to verify delivery

**Slack**
- Link your Slack account to receive direct messages
- Requires Slack workspace integration to be configured by admin
- One Slack account per user
- Test messages to verify connection

**Mobile App**
- Install the Harness On-Call mobile app for push notifications
- [Google Play](https://play.google.com/store/apps/details?id=com.harness.aisre&pcampaignid=web_share)
- [App Store](https://apps.apple.com/in/app/harness-on-call/id6753579217)
- App automatically registers your device when you log in
- Test push notifications to verify setup

#### Adding Contact Methods

1. Navigate to **Contact Settings** in the On-Call menu
2. Click **Add Email**, **Add Phone Number**, **Add SMS Number**, or **Add Slack**
3. Enter the contact information
4. For phone/SMS, select the appropriate country code
5. Label the contact (Work, Home, Other)
6. Click **Save**
7. Use **Test** button to verify the contact method works

### Notification Rules

Notification rules define the sequence and timing of how you're notified when you're on-call.

#### How Notification Rules Work

When an incident is assigned to you:
1. AI SRE starts at the first step in your notification rule
2. Sends notification via the contact method(s) defined in that step
3. If you don't acknowledge within the step's timeout, moves to the next step
4. Continues through steps until you acknowledge or the rule completes

#### Creating Notification Steps

Each notification step includes:
- **Contact Method**: Which channel(s) to use (email, phone, SMS, Slack, mobile app)
- **Wait Duration**: How long to wait before moving to the next step if unacknowledged
- **Multiple Channels**: You can select multiple contact methods per step

Example notification rule:
```
Step 1: Slack + Mobile App (wait 5 minutes)
Step 2: SMS (wait 5 minutes)
Step 3: Phone Call (wait 5 minutes)
Step 4: SMS + Phone Call
```

#### Configuring Your Notification Rule

1. Navigate to **Contact Settings** → **Notification Rules**
2. Click **Add Step**
3. Select one or more contact methods for this step
4. Set the wait duration before escalating to the next step
5. Click **Save**
6. Repeat to add additional escalation steps
7. Drag steps to reorder them
8. Click **Save Notification Rules** to apply changes

#### Best Practices

- **Use multiple channels**: Combine Slack/app with SMS/phone for redundancy
- **Escalate urgency**: Start with less intrusive methods, escalate to calls
- **Set reasonable timeouts**: 5-10 minutes per step allows time to respond
- **Test your setup**: Use the test buttons to ensure each contact method works
- **Keep contacts updated**: Verify phone numbers and email addresses are current

---

## Troubleshooting

### Service Alerts Not Routing

1. **Verify service has an owning User Group** in the Service Directory
2. **Confirm the User Group has a default escalation policy** (or the service has an override policy configured)
3. **Check the escalation policy has active schedules** with on-call responders
4. **Verify alert payload includes correct service identifier** that matches Service Directory

### User Not Receiving Notifications

1. **Verify contact methods are configured** in Contact Settings
2. **Test each contact method** using the Test button
3. **Check notification rules** have at least one step configured
4. **Verify user is actually on-call** in the schedule at the time the alert fired
5. **Check mobile app** is logged in and has notification permissions

### SMS/Phone Support

- **Supported countries**: Argentina (+54), Brazil (+55), Canada (+1), China (+86), Costa Rica (+506), Cyprus (+357), Denmark (+45), India (+91), Israel (+972), Mexico (+52), Moldova (+373), Netherlands (+31), Romania (+40), Serbia (+381), Slovenia (+386), United Kingdom (+44), United States (+1)
- Verify country code is correctly selected
- For additional country support, contact your Harness representative

### Slack Not Working

- Ensure your organization's Slack workspace is connected to AI SRE
- Verify you've linked your Slack account in Contact Settings
- Test the Slack connection using the Test button
- Only one Slack account can be linked per user

---

## Best Practices

### For Administrators

- **Align User Groups with actual team structure** — User Groups should reflect real organizational teams
- **Assign every production service to a User Group** — Unmapped services can't route alerts automatically
- **Ensure every User Group has a default escalation policy** — Without one, alerts can't be routed
- **Keep service ownership current** — Update the Service Directory when teams change ownership
- **Document naming conventions** — Use consistent User Group names that clearly identify the team

### For On-Call Responders

- **Configure at least two contact methods** — Redundancy ensures you're reached even if one channel fails
- **Test your notification setup regularly** — Use test buttons to verify delivery before your on-call shift
- **Keep contact information current** — Update phone numbers and email addresses immediately when they change
- **Review your notification rules** — Ensure escalation steps match your preferred notification sequence
- **Install the mobile app** — Push notifications are the most reliable way to receive urgent alerts

---

## Summary

Harness AI SRE uses Harness Platform User Groups as the organizational unit for on-call management. Administrators configure which User Groups own which services and escalation policies, establishing the routing flow for alerts. Individual users configure their own contact methods and notification rules to ensure they're reliably notified during their on-call shifts.
