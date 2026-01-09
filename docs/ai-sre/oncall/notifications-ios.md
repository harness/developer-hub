---
title: Setting up notifications on iOS
description: Configure iOS devices to receive Harness On-Call notifications during Do Not Disturb
sidebar_label: iOS Notifications
sidebar_position: 4
---

**Download our mobile app**

If you'd like the best possible experience as a responder, [download our mobile app here](https://apps.apple.com/us/app/harness-on-call/id6753579217).

When you are paged, we'll try and contact you according to your [notification rules](oncall.md#setting-up-contact-methods). By default, assuming you've enabled them, this will include:

- Email
- Slack
- Push notifications to your phone
- SMS messages
- Phone calls

## Ensuring you receive notifications during Do Not Disturb

For both push notifications, phone calls and SMS messages, there are steps you can take to ensure you get notified, regardless of what your phone's silent mode and do-not-disturb settings are set up like.

### Save the Harness On-Call contact to your phone

1. Download and save [this contact card](/ai-sre/oncall/harness.vcf) to your contacts
2. Go into the **Contacts** app and open the contact you've just saved
3. Tap on **Edit** at the top and scroll down to **Ringtone**
4. Enable the **Emergency Bypass** toggle, which will allow calls and messages from Harness On-Call to make a noise regardless of your silent or Focus settings
5. Go back to the contact card and tap on **Text Tone**, and again enable **Emergency Bypass** to ensure that SMS messages also ring audibly

### Add Harness On-Call to your Do Not Disturb allowed apps

To ensure push notifications from the Harness On-Call app can reach you during Do Not Disturb:

1. Open the **Settings** app on your iPhone
2. Go to **Focus**
3. Select **Do Not Disturb** (or whichever Focus mode you use most often)
4. Tap **Apps** under "Allowed Notifications"
5. Tap the **+** button and select **Harness On-Call** from the list
6. Repeat for any other Focus modes you use (Sleep, Work, etc.)

### Configure Time-Sensitive notifications

The Harness On-Call app uses Time-Sensitive notifications, which are designed to break through most Focus modes when properly configured.

1. Open the **Settings** app on your phone
2. Scroll down to **Harness On-Call** and select it
3. Select **Notifications**
4. Ensure **Allow Notifications** is enabled
5. Under "Alert Style When Unlocked", select **Banners** or **Alerts**
6. Enable **Sounds** and **Badges**
7. Scroll down and ensure **Time Sensitive Notifications** is enabled

### Test your setup

After configuring these settings, use the **Test Notifications** feature in the Harness AI SRE module to verify you receive alerts:

1. Open the Harness AI SRE module on the web
2. Go to On-Call from the menu, the contact settings
3. Tap **Test**
4. Enable Do Not Disturb mode on your phone
5. Send a test notification to confirm it comes through with sound


**Important:** If the test notification doesn't make a sound while in Do Not Disturb, double-check that you've:
- Added Harness On-Call to your DND allowed apps list
- Enabled Emergency Bypass for the Harness contact (for SMS/calls)

## Customizing notification sounds

For push notifications, you can pick a custom notification sound from **Notifications > Sounds**. If you want the notification to make a sound for a long time, we have notification sounds ranging from 1 second to 2 minutes long.

## Important notes

**Please note that the following settings in iOS could interfere with push notifications:**

- **Announcing notifications**: If you have toggled "Announce notifications" in your Harness On-Call app settings, sounds might go through connected AirPods or other devices when your device is locked
- **Screen Time**: If you have a time limit set on your device, iOS might not deliver notifications correctly
- **Low Power Mode**: In rare cases, Low Power Mode can delay notification delivery

## Additional recommendations

- **Keep the app updated**: Regularly update the Harness On-Call app from the App Store to ensure you have the latest notification improvements
- **Repeat the setup for all Focus modes**: If you use multiple Focus modes (Sleep, Work, Personal, Driving), make sure to add Harness On-Call as an allowed app in each one
- **Test regularly**: Periodically test your notification setup, especially after iOS updates or if you've changed Focus mode configurations

## Troubleshooting

If you're not receiving notifications:

1. Verify notification permissions are enabled in **Settings > Harness On-Call > Notifications**
2. Check that Harness On-Call is in your allowed apps list for your active Focus mode
3. Ensure your device has an active internet connection
4. Try restarting the Harness On-Call app
5. If using SMS/calls, verify the Harness contact has Emergency Bypass enabled
6. Check that you're logged into the correct Harness organization in the app

If issues persist, contact support through the app or email support@harness.io.
