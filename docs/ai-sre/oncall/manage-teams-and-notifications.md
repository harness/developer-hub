---
title: Configure On-Call Teams and Routing
description: Set up User Groups as teams, assign service ownership, and configure notifications.
sidebar_label: Configure On-Call Teams and Routing
sidebar_position: 6
---

Harness AI SRE uses **User Groups** from the Harness Platform as the organizational unit for on-call management. User Groups serve as teams in the on-call context: they own services, own escalation policies, and determine routing for alerts.

This page covers both **administrator configuration** (User Groups, service ownership, routing) and **individual user configuration** (personal notification settings).

## User Groups as on-call teams

Harness AI SRE does not have a separate concept of teams. Instead, it uses **Harness User Groups** defined at the platform level.

### What are User Groups?

User Groups are collections of users managed in the Harness Platform. They are used for:

- Role-based access control (RBAC)
- Service ownership in AI SRE
- Escalation policy ownership in AI SRE
- Alert routing in on-call management

Go to [Add and Manage User Groups](/docs/platform/role-based-access-control/add-user-groups/) to create and manage User Groups in the Harness Platform.

### User Groups in AI SRE on-call

In the on-call context, User Groups determine:

- **Who owns which services:** Each service in the Service Directory can be assigned an owning User Group.
- **Who owns escalation policies:** Each escalation policy is owned by a User Group.
- **How alerts are routed:** Alerts for a service route to the service's owning User Group's escalation policy.

---

## Configure service ownership

Services in the AI SRE Service Directory are assigned to User Groups. This determines which team is responsible for on-call coverage when alerts fire for that service.

### Assign a User Group to a service

1. Navigate to **Project Settings** → **Service Directory (AI SRE)**.
2. Find the service you want to configure.
3. Click the service name to open its details.
4. In the **Owning User Group** field, select the User Group responsible for this service.
5. (Optional) Set an **Escalation Policy Override** if this service should use a different policy than the User Group's default.
6. Click **Save**.

### How service ownership works

- Each service has an **owning User Group** field.
- When an alert fires for a service, AI SRE looks up the service's owning User Group.
- The alert routes to that User Group's escalation policy.
- The escalation policy determines which schedule (and therefore which on-call responder) receives the page.

---

## Escalation policy ownership

Escalation policies are owned by User Groups. This ties the policy to a specific team.

### Policy owner field

When creating or editing an escalation policy:

- The **Policy Owner** field specifies which User Group owns this policy.
- This typically represents the team that uses this escalation policy for their on-call rotation.
- A User Group can have one default escalation policy, but you can create additional policies for specific scenarios.

### Default escalation policy

- Each User Group can have one **default escalation policy**.
- When a service's owning User Group matches an escalation policy's owner, that policy is used for routing (unless the service specifies an override).
- If a User Group has no default escalation policy, alerts for services owned by that User Group cannot be automatically routed.

---

## Alert routing flow

Alerts route through User Groups, services, and escalation policies as follows:

1. **Alert arrives** with a service identifier in the payload.
2. **Service Directory lookup:** AI SRE finds the service in the Service Directory.
3. **User Group resolution:** AI SRE identifies the service's owning User Group.
4. **Escalation policy selection:** AI SRE uses the service's escalation policy override (if configured), or the User Group's default escalation policy.
5. **Schedule lookup:** The escalation policy references one or more schedules.
6. **On-call responder identification:** AI SRE determines who is on-call at that moment.
7. **Notification dispatch:** The on-call responder's personal notification rules are triggered.

This flow ensures alerts always reach the right person based on service ownership and team structure.

---

## User notification settings

While administrators configure User Groups and service ownership, **each individual user** configures their own contact methods and notification rules. These personal settings determine how you are notified when you are on-call and an incident is assigned to you.

### Contact information

Navigate to **On-Call** → **Contact Settings** to manage your notification channels.

#### Available contact methods

- **Email:** The email address tied to your Harness account. You can add additional email addresses (work, home, other) and send test notifications to verify delivery.
- **Phone:** Add phone numbers with country code selection for voice calls, and send test calls to verify delivery.
- **SMS:** Add mobile numbers for text messaging, and send test messages to verify delivery.
- **Slack:** Link your Slack account to receive direct messages. This requires the Slack workspace integration to be configured by an admin, and supports one Slack account per user.
- **Mobile app:** Install the Harness On-Call mobile app for push notifications. The app registers your device automatically when you log in. Download it from [Google Play](https://play.google.com/store/apps/details?id=com.harness.aisre&pcampaignid=web_share) or the [App Store](https://apps.apple.com/in/app/harness-on-call/id6753579217).

Voice and SMS are supported in the following countries: United States (+1), Argentina (+54), Brazil (+55), Canada (+1), Costa Rica (+506), Cyprus (+357), Denmark (+45), India (+91), Israel (+972), Mexico (+52), Moldova (+373), Netherlands (+31), Romania (+40), Serbia (+381), Slovenia (+386), and United Kingdom (+44).

#### Add a contact method

1. Navigate to **Contact Settings** in the On-Call menu.
2. Click **Add Email**, **Add Phone Number**, **Add SMS Number**, or **Add Slack**.
3. Enter the contact information.
4. For phone or SMS, select the appropriate country code.
5. Label the contact (Work, Home, Other).
6. Click **Save**.
7. Click **Test** to verify the contact method works.

### Notification rules

Notification rules define the sequence and timing of how you are notified when you are on-call. Each rule contains one or more steps, and each step specifies which channels to use and how long to wait before escalating.

Go to [Configure Notification Fallback](/docs/ai-sre/oncall/notification-fallback#notification-rule-examples) to see worked escalation sequences, create notification rule groups, understand per-channel retry behavior, and review the default notification sequence.

---

## Troubleshooting

### Service alerts not routing

1. **Verify the service has an owning User Group** in the Service Directory.
2. **Confirm the User Group has a default escalation policy** (or the service has an override policy configured).
3. **Check the escalation policy has active schedules** with on-call responders.
4. **Verify the alert payload includes the correct service identifier** that matches the Service Directory.

### User not receiving notifications

1. **Verify contact methods are configured** in Contact Settings.
2. **Test each contact method** using the Test button.
3. **Check notification rules** have at least one step configured.
4. **Verify the user is actually on-call** in the schedule at the time the alert fired.
5. **Check the mobile app** is logged in and has notification permissions.

### Slack not working

- Ensure your organization's Slack workspace is connected to AI SRE.
- Verify you have linked your Slack account in Contact Settings.
- Test the Slack connection using the Test button.
- Only one Slack account can be linked per user.

---

## Best practices

### For administrators

- **Align User Groups with actual team structure:** User Groups should reflect real organizational teams.
- **Assign every production service to a User Group:** Unmapped services cannot route alerts automatically.
- **Ensure every User Group has a default escalation policy:** Without one, alerts cannot be routed.
- **Keep service ownership current:** Update the Service Directory when teams change ownership.
- **Document naming conventions:** Use consistent User Group names that clearly identify the team.

### For on-call responders

- **Configure at least two contact methods:** Redundancy ensures you are reached even if one channel fails.
- **Test your notification setup regularly:** Use test buttons to verify delivery before your on-call shift.
- **Keep contact information current:** Update phone numbers and email addresses immediately when they change.
- **Review your notification rules:** Ensure escalation steps match your preferred notification sequence.
- **Install the mobile app:** Push notifications are the most reliable way to receive urgent alerts.

---

## Next steps

- Go to [Configure Notification Fallback](/docs/ai-sre/oncall/notification-fallback) to set up multi-channel notification rules and retry logic.
- Go to [Configure Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to configure the escalation levels that trigger notification sequences.
- Go to [Configure On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules) to build rotation schedules for your team.
