---
title: Handle On-Call on Android
description: Configure Android devices to receive On-Call notifications during Do Not Disturb
sidebar_label: Handle On-Call on Android
sidebar_position: 3
keywords:
  - on-call
  - Android
  - notifications
  - Do Not Disturb
  - mobile app
tags:
  - ai-sre
  - on-call
---

**Download our mobile app**

If you would like the best possible experience as a responder, [download the Harness On-Call app for Android](https://play.google.com/store/apps/details?id=com.harness.oncall).

When you are paged, we try to contact you according to your notification rules. By default, assuming you have enabled them, this will include:

- Email
- Slack
- Push notifications to your phone
- SMS messages
- Phone calls

## Receive notifications during Do Not Disturb

For push notifications, phone calls, and SMS messages, there are steps you can take to ensure you get notified, regardless of how your phone's silent mode and Do Not Disturb settings are set up.

### Save the Harness On-Call contact to your phone

1. Download and save [the Harness On-Call contact card](/ai-sre/oncall/harness.vcf) to your contacts.
2. Open the **Contacts** app and find the contact you just saved.
3. Favorite the contact by tapping the star icon.

### Configure Do Not Disturb exceptions

1. Open the **Settings** app and search for **Do Not Disturb**.
2. If you have Do Not Disturb enabled, go to **Exceptions > Calls** and/or **Messages** and allow Do Not Disturb exceptions for **Favorite contacts only** (this should have been done in step 3 above).

**Note:** Depending on your Android version, you may need to tap **People** and then, for both **Message** and **Calls**, ensure that **Starred contacts** can interrupt.

### Grant Do Not Disturb access to Harness On-Call

The Harness On-Call app can temporarily unmute your phone when sending critical notifications if you grant it Do Not Disturb access:

1. Open the **Settings** app.
2. Go to **Apps** or **Applications**.
3. Find and tap **Harness On-Call**.
4. Tap **Notifications**.
5. Look for **Do Not Disturb access** or **Override Do Not Disturb** and enable it.
6. If prompted, allow Harness On-Call to access Do Not Disturb settings.

**How this works:** When you receive a critical notification, and provided Harness On-Call has Do Not Disturb access, the app temporarily unmutes your phone and then sends the notification. The app re-mutes your phone 60 seconds later.

**Note:** If the app does not have Do Not Disturb access, it falls back to playing the sound using your alarm volume.

### Samsung Focus modes

Some Samsung devices have a feature called **Focus modes** which can add additional rules to your Do Not Disturb settings. If you are not receiving notifications while in a Focus mode (such as "Work" or "Sleep"), then you need to:

1. Go to **Settings > Modes and Routines**.
2. Select the Focus mode you use (e.g., "Sleep" or "Work").
3. Edit the **Do Not Disturb** settings for that specific Focus mode.
4. Add **Harness On-Call** to the **Allowed Apps** section.

### Work profile setup

If you are using Harness On-Call in a work profile and want to use the mute switch bypass feature, a workaround is available:

1. Install Harness On-Call in a personal profile (outside the work profile).
2. Grant Do Not Disturb access to the app in the personal profile.
3. You do not need to sign in on the personal profile.
4. This should allow the work profile to get that permission as well.

---

## Customize notification sounds

You can customize sounds for each notification channel through your device settings, using ringtones installed on your phone. To do this:

1. Open **Settings**.
2. Go to **Apps** or **Applications**.
3. Find and tap **Harness On-Call**.
4. Tap **Notifications**.
5. Select the notification channel you want to customize (e.g., "Incident Alerts", "Escalations").
6. Tap **Sound** and choose your preferred ringtone.

If you want a notification to make a sound for a long time, consider using longer ringtones or custom alert tones.

---

## Test your setup

After configuring these settings, test your notification setup:

1. Open the Harness AI SRE module on the web.
2. Go to On-Call from the menu, then the contact settings.
3. Tap **Test**.
4. Enable Do Not Disturb mode on your phone.
5. Send a test notification to confirm it comes through with sound.

**Important:** If the test notification does not make a sound while in Do Not Disturb, double-check that you have:
- Starred or favorited the Harness contact.
- Allowed starred contacts to bypass Do Not Disturb in your Do Not Disturb exceptions.
- Granted Do Not Disturb access to the Harness On-Call app.

---

## Important notes about Android behavior

Note the following:

- If your phone was on silent before receiving a notification, Harness On-Call reverts it to **vibrate** mode rather than silent. This is due to an [Android system limitation](https://developer.android.com/reference/android/media/AudioManager#setRingerMode(int)) where the app cannot set your phone back to silent without inadvertently enabling Do Not Disturb.
- Battery optimization settings can interfere with notification delivery. Make sure Harness On-Call is exempt from battery optimization in your phone's settings.
- Some manufacturers (Samsung, Xiaomi, Huawei, OnePlus) have aggressive background process management that may affect notifications. You may need to add Harness On-Call to protected or allowed apps.

---

## Device-specific instructions

### Samsung devices
1. Go to **Settings > Apps > Harness On-Call > Battery**.
2. Select **Unrestricted** for background battery usage.
3. Go to **Settings > Device care > Battery > Background usage limits**.
4. Ensure Harness On-Call is NOT in the "Sleeping apps" or "Deep sleeping apps" lists.

### Xiaomi and MIUI devices
1. Go to **Settings > Apps > Manage apps > Harness On-Call**.
2. Enable **Autostart**.
3. Under **Battery saver**, select **No restrictions**.
4. Go to **Settings > Notifications > Harness On-Call** and ensure all channels are enabled.

### OnePlus devices
1. Go to **Settings > Apps > Harness On-Call > Battery**.
2. Select **do not optimize**.
3. Enable **Allow background activity**.

### Google Pixel devices
1. Go to **Settings > Apps > Harness On-Call > Battery**.
2. Select **Unrestricted**.

---

## Troubleshooting

If you are not receiving notifications:

1. Verify notification permissions are enabled for Harness On-Call.
2. Check that the Harness contact is starred or favorited.
3. Ensure starred contacts are allowed to bypass Do Not Disturb.
4. Verify Harness On-Call has Do Not Disturb access permission.
5. Check battery optimization settings.
6. Ensure your device has an active internet connection.
7. Try restarting the Harness On-Call app.
8. Check your Focus mode or Modes and Routines settings if using Samsung.
9. Verify you are logged into the correct Harness organization in the app.

If issues persist, contact support through the app or email support@harness.io.
