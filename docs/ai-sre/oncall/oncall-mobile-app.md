---
title: Harness AI SRE Mobile App
description: Complete guide to using the Harness AI SRE mobile app for on-call incident response and alert management.
sidebar_label: Mobile App Guide
sidebar_position: 2
---

# Harness AI SRE Mobile App

The Harness AI SRE mobile app extends your incident response capabilities to mobile devices, ensuring you never miss critical alerts or incidents while on-call. Built as part of the comprehensive AI SRE platform, the mobile app integrates seamlessly with your existing incident management workflows, runbook automation, and team collaboration tools.

## Download the App

| Platform | Download Link |
|----------|---------------|
| **Android** | [Google Play Store](https://play.google.com/store/apps/details?id=com.harness.aisre) |
| **iOS** | [Apple App Store](https://apps.apple.com/in/app/harness-on-call/id6753579217) |

<div align="center">
<DocImage path={require('./static/play-store.png')} width="80%" height="80%" title="Google Play Store" />
</div>

<br />
<br />

<div align="center">
<DocImage path={require('./static/apple-app-store.png')} width="80%" height="80%" title="Apple App Store" />
</div>

## Overview

The mobile app serves as your command center for incident response, providing:

### **Real-Time Incident Management**
- Instant push notifications for critical alerts and incidents
- Direct integration with AI SRE's intelligent alert routing
- Context-rich notifications with incident severity and affected services
- Seamless connection to your organization's runbook automation

### **Mobile-Optimized Experience**
- Native iOS and Android applications with platform-specific optimizations
- Critical alert override for Do Not Disturb mode (Android)
- Offline capability for viewing recent incidents and alerts
- Biometric authentication support for secure access

### **Unified Platform Integration**
- Synchronized with your web-based AI SRE dashboard
- Real-time updates across all connected devices
- Integration with communication tools (Slack, Teams, Zoom)
- Direct connection to monitoring and observability platforms

## Prerequisites

Before using the Harness AI SRE mobile app, ensure you have:

### **Account Requirements**
- Active Harness account with AI SRE module enabled
- Organization and Project access configured in your Harness account
- SSO authentication supported (SAML, OAuth)
- Proper role-based permissions for incident response

### **Device Requirements**
| Requirement | Details |
|-------------|---------|
| **Platforms** | iOS 14.0+ or Android 8.0+ |
| **Permissions** | Push notifications (required), Biometric authentication (optional) |
| **Network** | Internet connectivity for real-time sync |
| **Storage** | 50MB available space |

### **Integration Setup**
Ensure your AI SRE platform is configured with:
- [Alert integrations](/docs/ai-sre/alerts/integrations) from monitoring tools
- [Incident types](/docs/ai-sre/incidents/incident-templates) and severity levels
- [On-call schedules](/docs/ai-sre/oncall) and escalation policies
- [Runbook automation](/docs/ai-sre/runbooks) for incident response

:::tip Optimize Your Setup
For the best mobile experience, configure your *notification preferences* to ensure critical alerts reach you instantly while filtering out noise.
:::

## Getting Started

### Step 1: Environment Configuration

1. Launch the app.
2. On the Environment screen, pick the correct environment (e.g., Prod, QA).
   - Tap the environment name → Continue

### Step 2: Authentication

Choose your preferred authentication method:

**Option A: Harness Credentials**
- Enter your email and password
- Complete two-factor authentication if enabled

**Option B: Single Sign-On (SSO)**
- Select your SSO provider (SAML, OAuth)
- Complete authentication through your identity provider
- Automatic redirect back to the mobile app

<div align="center">
<DocImage path={require('./static/sign-in-page.png')} width="30%" height="30%" title="Mobile App Sign-In Screen" />
</div>

### Step 3: Organization & Project Setup
1. **Select Organization**: Choose from your available organizations
2. **Select Project**: Pick the project containing your AI SRE configuration
3. **Confirm Selection**: These settings determine:
   - Which alerts and incidents you'll receive
   - Your on-call schedule visibility
   - Available runbooks and escalation policies

<div align="center">
<DocImage path={require('./static/organisation-project.png')} width="60%" height="60%" title="Organization and Project Selection" />
</div>

:::info Context Matters
Your Organization and Project selection directly impacts your incident response scope. Choose the project where your critical services and monitoring integrations are configured.
:::

### Step 4: Notification Permissions
Grant the necessary permissions for optimal incident response:
- **Push Notifications**: Essential for real-time alerts
- **Critical Alerts Override**: Allows urgent incidents to bypass Do Not Disturb 
- **Background App Refresh**: Ensures continuous sync with AI SRE platform

## Dashboard Overview

Your mobile dashboard provides a comprehensive view of your incident response status and activities.

<div align="center">
<DocImage path={require('./static/home-screen.png')} width="30%" height="30%" title="Mobile App Home Screen Dashboard" />
</div>

### **At-a-Glance Status**
The home screen displays:

| Section | Information | Actions |
|---------|-------------|---------|
| **On-Call Status** | Current on-call assignment, rotation schedule, next shift | View full schedule |
| **Active Alerts** | Count and severity of unresolved alerts | Quick acknowledge/resolve |
| **Open Incidents** | Critical incidents requiring attention | Jump to incident details |

### **Quick Actions**
Access frequently used functions:
- **Emergency Escalation**: Instantly escalate to next responder
- **Runbook Launcher**: Execute automated response workflows
- **Team Communication**: Connect to incident-specific Slack channels or Zoom bridges
- **Status Updates**: Post updates to status pages or communication channels

## Intelligent Notification System

The AI SRE mobile app leverages advanced notification technology to ensure critical alerts reach you instantly while minimizing notification fatigue.

### **Technical Implementation**
- **Android**: Firebase Cloud Messaging (FCM) with critical alert override
- **iOS**: Apple Push Notification Service (APNS) with time-sensitive delivery
- **Cross-platform**: Real-time synchronization with web dashboard

### **Smart Alert Routing**
Notifications are intelligently filtered and prioritized based on:

| Priority Level | Behavior | Examples |
|----------------|----------|----------|
| **Critical** | Overrides Do Not Disturb, persistent alerts | Production outages, security breaches |
| **High** | Immediate delivery, sound + vibration | Service degradation, failed deployments |
| **Medium** | Standard delivery during business hours | Monitoring threshold breaches |
| **Low** | Batched notifications, silent delivery | Informational updates, resolved alerts |

### **Rich Notification Content**
Each notification includes:
- **Service Impact**: Affected systems and user impact
- **Severity Indicators**: Color-coded priority levels
- **Quick Actions**: Acknowledge, escalate, or view details
- **Context Links**: Direct access to runbooks, dashboards, or communication channels
- **AI Insights**: Suggested next steps based on historical data

### **Customization Options**
Configure notifications to match your response preferences:
- **Escalation Delays**: Set custom timeouts before auto-escalation
- **Quiet Hours**: Define periods for non-critical alert suppression
- **Team Overrides**: Allow team members to send urgent notifications
- **Integration Filters**: Customize which monitoring tools trigger mobile alerts

## Alert Management

### **Alert List View**
Access your alerts through multiple pathways:
- **Dashboard Widget**: Quick view of active alerts
- **Navigation Menu**: Complete alert history and filtering
- **Search Function**: Find specific alerts by ID, service, or keywords

<div align="center">
<DocImage path={require('./static/alerts-tab.png')} width="30%" height="30%" title="Alerts List View" />
</div>

The alert list displays comprehensive information:

| Column | Information | Visual Indicators |
|--------|-------------|-------------------|
| **Priority** | Critical, High, Medium, Low | Color-coded badges |
| **Service** | Affected system or component | Service health icons |
| **Duration** | Time since alert creation | Auto-updating timestamps |
| **Status** | New, Acknowledged, Resolved | Progress indicators |
| **Assignee** | Current owner or on-call person | Profile avatars |

### **Advanced Filtering**
Filter alerts using multiple criteria:
- **Time Range**: Last hour, 24 hours, week, or custom range
- **Severity Levels**: Focus on critical or high-priority alerts
- **Service Categories**: Filter by application, infrastructure, or security
- **Status Types**: View only unresolved or recently acknowledged alerts
- **Assignment**: Show only your alerts or team-wide visibility

<div align="center">
<DocImage path={require('./static/alerts-summary-on-call.png')} width="70%" height="70%" title="Alerts Summary and On-Call View" />
</div>

### **Alert Actions**

#### **Acknowledge Alert**
- **Purpose**: Take ownership and stop escalation timers
- **Effect**: Updates status across all connected systems
- **Automation**: Can trigger associated runbooks automatically
- **Notification**: Informs team members of ownership change

#### **Resolve Alert**
- **Purpose**: Mark issue as fixed and close the alert
- **Validation**: May require confirmation or resolution notes
- **Integration**: Updates monitoring systems and closes related tickets
- **Learning**: Contributes to AI pattern recognition for future incidents

#### **Escalate Alert**
- **Manual Escalation**: Pass to next responder or specialist team
- **Context Preservation**: Includes all previous actions and communications
- **Automated Handoff**: Triggers notification to escalated responder
- **Audit Trail**: Maintains complete escalation history

## Incident Response

### **Incident Overview**
Incidents represent higher-severity issues that may impact multiple services or require coordinated response efforts. The mobile app provides full incident management capabilities.

<div align="center">
<DocImage path={require('./static/incidents-tab.png')} width="30%" height="30%" title="Incidents Overview" />
</div>

### **Incident Dashboard**
View and manage incidents with comprehensive details:

| Field | Description | Mobile Features |
|-------|-------------|-----------------|
| **Incident ID** | Unique identifier with severity badge | Quick copy and share |
| **Impact Scope** | Affected services and user impact | Visual service map |
| **Timeline** | Creation time and duration | Real-time updates |
| **Response Team** | Assigned responders and escalation level | Contact shortcuts |
| **Related Alerts** | Contributing alerts and monitoring data | Drill-down navigation |

### **Incident Lifecycle Management**

#### **Acknowledge Incident**
- **Immediate Response**: Take ownership and begin coordination
- **Team Notification**: Alerts all stakeholders of active response
- **Runbook Activation**: Automatically launches relevant response procedures
- **Communication Setup**: Creates incident-specific channels and bridges

#### **Coordinate Response**
- **Team Assembly**: Invite specialists and subject matter experts
- **Resource Access**: Quick links to dashboards, logs, and documentation
- **Status Broadcasting**: Update status pages and communication channels
- **Progress Tracking**: Log actions and decisions for post-incident review

#### **Escalate When Needed**
- **Smart Escalation**: AI-suggested escalation paths based on incident type
- **Context Transfer**: Complete handoff with full incident history
- **Expertise Matching**: Route to team members with relevant experience
- **Automatic Triggers**: Time-based or condition-based escalation rules

<div align="center">
<DocImage path={require('./static/incident-escalate.png')} width="30%" height="30%" title="Incident Escalation" />
</div>

#### **Resolve Incidents**
- **Resolution Workflow**: Mark incidents as resolved with detailed notes
- **Impact Assessment**: Document the scope and duration of the incident
- **Post-Incident Actions**: Trigger follow-up tasks and reviews
- **Learning Integration**: Contribute to AI pattern recognition for future incidents

<div align="center">
<DocImage path={require('./static/incident-resolve.png')} width="30%" height="30%" title="Incident Resolution" />
</div>

### **AI-Enhanced Incident Response**
The mobile app leverages AI SRE's intelligent capabilities:
- **Similar Incident Detection**: Shows related past incidents and resolutions
- **Automated Runbook Suggestions**: Recommends response procedures
- **Impact Prediction**: Estimates potential user and business impact
- **Resolution Recommendations**: Suggests actions based on successful past responses

## Common Workflows

### **Critical Alert Response**
1. **Receive Notification**: Critical alert bypasses Do Not Disturb
2. **Quick Assessment**: Review service impact and severity from notification
3. **Immediate Action**: Acknowledge to stop escalation timer
4. **Runbook Execution**: Launch automated response procedures
5. **Team Coordination**: Join incident bridge or communication channel
6. **Resolution**: Mark resolved once issue is fixed and verified

### **Incident Coordination**
1. **Incident Assignment**: Receive incident notification with full context
2. **Situation Assessment**: Review affected services, timeline, and related alerts
3. **Team Assembly**: Invite relevant specialists and stakeholders
4. **Response Execution**: Follow runbooks and coordinate remediation efforts
5. **Communication**: Provide regular updates to stakeholders and customers
6. **Handoff or Resolution**: Either escalate with full context or resolve completely

### **On-Call Management**
1. **Schedule Awareness**: Check upcoming on-call shifts and coverage
2. **Proactive Monitoring**: Review service health and potential issues
3. **Shift Handoff**: Coordinate with previous/next on-call responder
4. **Coverage Requests**: Request backup coverage for planned unavailability

## Configuration & Settings

<div align="center">
<DocImage path={require('./static/settings.png')} width="30%" height="30%" title="Mobile App Settings" />
</div>

### **Notification Management**
Customize your alert experience:
- **Sound Profiles**: Different tones for different severity levels
- **Vibration Patterns**: Unique patterns for critical vs. standard alerts
- **Quiet Hours**: Suppress non-critical notifications during off-hours
- **Escalation Timing**: Configure how long before alerts auto-escalate

### **Security & Authentication**
- **Biometric Login**: Enable fingerprint or face recognition
- **Session Management**: Configure automatic logout timing
- **Two-Factor Authentication**: Additional security for sensitive actions
- **Device Registration**: Manage trusted devices for your account

### **Organization Settings**
- **Project Switching**: Change between different AI SRE projects
- **Team Visibility**: Configure which team activities you see
- **Role Permissions**: View your current incident response permissions
- **Integration Access**: Manage connections to monitoring and communication tools

### **Performance & Sync**
- **Background Refresh**: Control how often the app syncs with AI SRE platform
- **Data Usage**: Manage cellular data usage for large incident attachments
- **Offline Mode**: Configure what data is available when disconnected
- **Cache Management**: Clear stored data to free up device storage

## Next Steps

### **Optimize Your Setup**
- **Configure Alert Rules**: Set up intelligent filtering in your AI SRE web dashboard
- **Create Runbooks**: Build automated response procedures for common incidents
- **Set Up Integrations**: Connect monitoring tools and communication platforms
- **Train Your Team**: Ensure all team members understand mobile response procedures

### **Learn More**
- [AI SRE Getting Started Guide](/docs/ai-sre/get-started/onboarding-guide)
- [Runbook Automation](/docs/ai-sre/runbooks)
- [Alert Management Best Practices](/docs/ai-sre/resources/ai-sre-best-practices)
- [Integration Setup Guides](/docs/category/integrations)