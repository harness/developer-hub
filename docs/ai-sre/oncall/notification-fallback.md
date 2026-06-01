---
title: On-Call Notification Fallback System
description: Configure multi-channel notification fallback to ensure on-call responders are reached via SMS, push, voice, email, or Slack when primary channels fail.
sidebar_label: Notification Fallback
sidebar_position: 7
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness AI SRE provides a multi-channel notification fallback system that automatically tries alternative notification methods when primary channels fail. This ensures on-call responders are reliably notified during critical incidents, even if their preferred notification channel is unavailable.

---

## How notification fallback works

The notification fallback system operates at two levels:

1. **Notification rule groups**: User-configured sequences that define which channels to try and when
2. **Per-channel retry logic**: Automatic retry attempts within each channel before moving to the next

When an incident is assigned to an on-call responder:

1. AI SRE starts with the first step in the user's notification rule
2. Attempts to send the notification via the configured channel(s)
3. Monitors delivery status via webhooks or API polling
4. If delivery fails after the configured retries, advances to the next step
5. Continues through all steps until the user acknowledges or the rule completes

---

## Supported notification channels

AI SRE supports the following notification channels with automatic fallback:

- **Email**: HTML-formatted notifications with direct links to incidents
- **SMS**: Text messages via Twilio to mobile numbers
- **Voice**: Phone calls via Twilio with machine detection to filter voicemail
- **Slack**: Direct messages with interactive buttons to acknowledge or escalate
- **Mobile push**: Push notifications to the Harness On-Call mobile app via Firebase

Each channel has independent retry logic and delivery tracking to ensure reliable notification.

---

## Configure notification rule groups

Notification rule groups define the sequence and timing of how you are notified. Each rule group contains one or more steps, and each step specifies which channels to use and how long to wait before escalating.

### Create a notification rule group

1. Go to **On-Call** → **Contact Settings**
2. Click the **Notification Rules** tab
3. Click **Add Step**
4. Select one or more contact methods for this step
5. Set the wait duration before moving to the next step
6. Click **Save**
7. Repeat to add additional escalation steps
8. Drag steps to reorder them as needed
9. Click **Save Notification Rules** to apply changes

### Notification step configuration

Each notification step includes:

- **Contact method(s)**: One or more channels from email, SMS, voice, Slack, or mobile push
- **Delay duration**: Time to wait before escalating to the next step if unacknowledged
- **Multiple channels**: You can select multiple contact methods per step for simultaneous delivery

---

## Notification rule examples

### Example 1: Low-urgency escalation

Start with less intrusive channels and gradually escalate to more disruptive methods:

```
Step 1: Slack + Mobile Push (wait 5 minutes)
Step 2: Email (wait 5 minutes)
Step 3: SMS (wait 5 minutes)
Step 4: Voice Call
```

This approach gives you time to respond via Slack or mobile app before receiving text messages or phone calls.

---

### Example 2: High-urgency immediate response

Use all channels simultaneously for critical alerts:

```
Step 1: Slack + Mobile Push + SMS + Email (wait 2 minutes)
Step 2: Voice Call (wait 2 minutes)
Step 3: Voice Call + SMS
```

This ensures maximum visibility immediately while escalating to repeated voice calls if unacknowledged.

---

### Example 3: Business hours vs. after hours

Configure different rules based on your availability:

**During business hours:**
```
Step 1: Slack (wait 5 minutes)
Step 2: Email (wait 10 minutes)
Step 3: SMS
```

**After hours or weekends:**
```
Step 1: Mobile Push + SMS (wait 3 minutes)
Step 2: Voice Call (wait 3 minutes)
Step 3: Voice Call + SMS
```

You can manually switch between rule groups based on your schedule, or configure multiple rules for different escalation policies.

---

## Channel retry behavior

Each notification channel has independent retry logic that attempts delivery multiple times before marking the notification as failed.

### SMS retry logic

- **Maximum retries**: 3 attempts per SMS
- **Status tracking**: Real-time delivery confirmation via Twilio webhooks
- **Retry delay**: 60 seconds between attempts
- **Failure detection**: Checks message status after 5-second webhook wait window
- **Status confirmation**: Queries Twilio API to verify delivery state

When SMS delivery fails:
1. AI SRE sends the initial SMS via Twilio
2. Waits 5 seconds for Twilio webhook callback
3. If no callback received, queries Twilio API for message status
4. If status is FAILED or UNDELIVERED, creates retry task
5. Retries up to 3 times with 60-second delays
6. If all retries fail, moves to next notification step

---

### Voice call retry logic

- **Maximum retries**: 3 attempts per escalation level
- **Machine detection**: Enabled to filter out voicemail systems
- **Retry delay**: 60 seconds between attempts
- **Status tracking**: Call SID tracking via Twilio webhooks
- **TwiML redirect**: Uses callback URL for custom call handling

Voice calls are typically configured as later steps in notification rules since they are the most disruptive notification method.

---

### Slack retry logic

- **Maximum retries**: 3 attempts per message
- **Status tracking**: Slack API response codes
- **Retry delay**: 60 seconds between attempts
- **Failure detection**: Based on Slack SDK error responses
- **Interactive elements**: Messages include acknowledge, escalate, and resolve buttons

Slack notifications fail gracefully when the user is not in the workspace or has disconnected their account.

---

### Mobile push retry logic

- **Maximum retries**: 1 attempt (no automatic retry)
- **Status tracking**: Firebase Messaging exception handling
- **Device token validation**: Automatic removal of invalid tokens
- **Delivery confirmation**: Via Firebase Cloud Messaging callbacks

Mobile push notifications do not retry automatically. If delivery fails, the notification advances to the next step in the rule immediately.

---

### Email retry logic

- **Maximum retries**: Not implemented (single attempt)
- **Status tracking**: Message ID tracking only
- **Delivery confirmation**: No status checking currently configured
- **Format**: HTML templates with incident details and action buttons

Email notifications are sent once per step. Delivery failures are not currently detected or retried.

---

## Default notification behavior

If you have not configured a custom notification rule group, AI SRE uses the following default escalation sequence:

```
Position 0 (immediate):
  - Email
  - Slack
  - Mobile Push

Position 1 (after 60 seconds):
  - SMS
  - Voice Call
```

Channels at the same position send simultaneously. After the configured delay, the system moves to the next position.

This default ensures you receive notifications via less intrusive channels first, with escalation to SMS and voice after one minute if unacknowledged.

---

## Notification task states

Each notification is tracked through the following states:

- **SENT**: Notification dispatched to the channel provider but not yet confirmed
- **CONFIRMED**: Delivery confirmed by the channel (Twilio webhook, Slack API response, etc.)
- **FAILED**: Delivery failed after all retry attempts

Notification rule group tasks track overall progress:

- **ACTIVE**: Notification sequence in progress
- **COMPLETED**: All steps sent or incident acknowledged

You can view notification task status in the incident timeline to understand delivery progress.

---

## Timing and configuration

The notification system uses the following timing constants:

| Configuration | Value | Description |
|--------------|-------|-------------|
| Twilio status receipt window | 5 seconds | Wait time for webhook callback before polling API |
| Task retry delay | 60 seconds | Delay between retry attempts for failed notifications |
| Maximum SMS retries | 3 attempts | Retry limit for SMS delivery failures |
| Maximum voice retries | 3 attempts | Retry limit for voice call failures |
| Maximum Slack retries | 3 attempts | Retry limit for Slack message failures |
| Maximum mobile push retries | 1 attempt | Retry limit for Firebase push notifications |
| Page acknowledgment timeout | 24 hours | Maximum time to wait for user acknowledgment |

These values are system-wide and cannot be configured per user or escalation policy.

---

## Notification task resumption

AI SRE's notification system is resilient to service restarts and interruptions:

- **Task persistence**: Notification tasks are stored in the database
- **Startup recovery**: Active tasks are automatically resumed on service restart
- **State tracking**: Current step index and retry count are preserved
- **Schedule reconstruction**: Next notification times are recalculated on recovery

This ensures notification sequences continue even if the service is restarted during an active escalation.

---

## Integration with escalation policies

Notification fallback works in conjunction with escalation policies:

1. **Escalation policy determines who** receives the page based on on-call schedules
2. **Notification rules determine how** each person is notified across channels
3. **Escalation levels advance** if the current on-call responder does not acknowledge within the policy's timeout
4. **Each responder** at each escalation level uses their own notification rules

For example:
- Escalation Level 1: On-call engineer receives page, uses their notification rules (Slack → SMS → Voice)
- If unacknowledged after 5 minutes: Escalation Level 2 activates
- Escalation Level 2: Engineering manager receives page, uses their notification rules (Email → Voice)

Go to [Define Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to configure escalation policy levels and timeouts.

---

## Troubleshooting

<Troubleshoot
  issue="SMS notifications not received after multiple retry attempts"
  mode="docs"
  fallback="Verify your phone number is correct in Contact Settings, check that your country code is supported, and test the SMS channel using the Test button. SMS delivery may fail if the phone number is invalid or if your carrier blocks automated messages."
/>

<Troubleshoot
  issue="Voice calls going to voicemail instead of ringing"
  mode="docs"
  fallback="AI SRE uses Twilio machine detection to filter voicemail, but detection is not perfect. If calls consistently go to voicemail without ringing, verify your phone number is correct and check that your carrier supports incoming automated calls. Consider adding SMS as an earlier step in your notification rules."
/>

<Troubleshoot
  issue="Slack notifications showing as FAILED but Slack is connected"
  mode="docs"
  fallback="Verify you are logged into the correct Slack workspace that is integrated with AI SRE. Check that you have not disconnected your Slack account in Contact Settings. Test your Slack connection using the Test button. If the integration is working but notifications still fail, verify the Slack workspace integration is active at the account level."
/>

<Troubleshoot
  issue="Mobile push notifications not arriving on device"
  mode="docs"
  fallback="Ensure the Harness On-Call mobile app is installed and you are logged in. Check that notification permissions are enabled for the app in your device settings. Mobile push notifications do not retry automatically, so if your device is offline when the notification is sent, you will not receive it."
/>

<Troubleshoot
  issue="Notifications sent but user did not receive any alerts"
  mode="docs"
  fallback="Check notification task status in the incident timeline to see which channels were attempted and what states they reached. Verify the user has at least one contact method configured in Contact Settings. Test each contact method individually to identify which channel is failing. Review the notification rule group to ensure steps are configured correctly with valid contact methods."
/>

<Troubleshoot
  issue="All notification channels marked as SENT but not CONFIRMED"
  mode="docs"
  fallback="SENT state indicates the notification was dispatched to the provider but delivery confirmation was not received. For SMS, this may indicate Twilio webhook callbacks are not reaching AI SRE. For Slack, this may indicate the Slack API response did not return a success status. Check webhook configurations and network connectivity between AI SRE and notification providers."
/>

---

## Best practices

### For configuring notification rules

- **Use multiple channels per step**: Combine less intrusive channels (Slack, mobile push) with more reliable channels (SMS) for redundancy
- **Escalate notification urgency**: Start with Slack or mobile push, escalate to SMS, then voice calls
- **Set reasonable timeouts**: Allow 3-5 minutes per step to give yourself time to respond before escalation
- **Test your entire rule**: Use the test buttons to verify each contact method works before your on-call shift
- **Configure backup channels**: Always include at least one SMS or voice step as a fallback

---

### For contact method management

- **Keep contact information current**: Update phone numbers and email addresses immediately when they change
- **Verify country code support**: Check that your phone number's country code is supported for SMS and voice
- **Install the mobile app**: Push notifications are the fastest way to receive and acknowledge incidents
- **Test regularly**: Use test buttons to verify each contact method delivers successfully
- **Label contacts clearly**: Use Work, Home, or Other labels to distinguish between contact methods

---

### For incident response

- **Acknowledge immediately**: Stop escalation by acknowledging the incident as soon as you receive any notification
- **Monitor delivery status**: Check the incident timeline if you suspect notifications are not being delivered
- **Update notification rules based on experience**: Adjust step timing and channel order based on what works best for your response patterns
- **Coordinate with your team**: Ensure other team members also have working notification rules configured

---

## Next steps

The on-call notification fallback system ensures reliable incident notification by automatically trying multiple channels when delivery fails.

- [Configure Teams and Notifications](/docs/ai-sre/oncall/manage-teams-and-notifications): Set up your contact methods and notification preferences.
- [Define Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies): Configure escalation levels that trigger notification sequences.
- [Create On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules): Build rotation schedules for your team.
