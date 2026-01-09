---
title: On-Call Overview
description: On-Call Overview
sidebar_label: On-Call Overview
sidebar_position: 1
redirect_from:
- /docs/incident-response/oncall/oncall
---

# On-Call Management

Harness AI SRE's on-call management system ensures reliable incident response through intelligent scheduling, automated escalations, and seamless multi-platform notifications. From the On-Call menu, teams can manage personal contact information, create schedules, define escalation policies, review shifts, and configure alert rules that automatically page responders when specific conditions are met.

## Overview

Harness AI SRE's on-call management module provides a comprehensive platform for managing incident response and on-call operations. The system integrates seamlessly with Harness CD to populate the service directory and offers complete on-call functionality including schedule management, escalation policies, alert rules, and multi-channel notifications. Teams can manage their entire incident response workflow from the web interface, mobile apps, and Slack integration.

## Key Features

### Service Directory Integration
- Automatic synchronization with Harness CD services
- Service directory populated by CD services in the project
- Seamless service-to-team mapping for incident response

### Contact Settings Management
- Comprehensive contact configuration for all team members
- Multi-channel notification support: email, phone, SMS, and Slack
- Automatic Slack integration when organization is connected
- Currently supports US phone numbers with per-organization customization available
- Personal contact information updates through the On-Call menu

#### Setting Up Contact Methods

Configure your contact preferences to ensure you receive notifications through your preferred channels:

<DocVideo src="https://app.tango.us/app/embed/98469de9-3122-45b8-aa96-e1252e5e16c5?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Contact Methods in AI SRE On-Call" />

### Schedule Management
- Create and manage on-call schedules with flexible rotation patterns
- Weekly rotations with customizable start times and days
- 24/7 availability configuration with time zone management
- Schedule overrides for temporary coverage changes
- Holiday calendars and follow-the-sun coverage support
- Real-time schedule visibility showing current on-call status and upcoming shifts
- Edit YAML functionality for programmatic schedule setup
- Automatic schedule generation based on team availability
- Future PagerDuty syncer integration for importing users, escalation policies, and schedules

#### Creating Your First On-Call Schedule

Follow this step-by-step guide to set up your on-call rotation schedule:

<DocVideo src="https://app.tango.us/app/embed/bc9db76e-c622-457e-95b1-45aa0ff06906?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create On-Call Schedule" />

#### Creating Schedule Overrides

Learn how to create temporary schedule overrides for coverage changes:

<DocVideo src="https://app.tango.us/app/embed/2fe2c6c2-d4ed-40ce-80da-369a005c9259?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create an Override Schedule" />

### Escalation Policies
- Multi-level escalation policy configuration
- User or group-based escalation targets
- Configurable timeout periods and retry attempts
- Schedule attachment to escalation policies
- Automatic escalation when no acknowledgment is received

#### Setting Up Escalation Policies

Learn how to create and configure escalation policies for your on-call teams:

<DocVideo src="https://app.tango.us/app/embed/004cfc98-17f2-4947-84a3-75dfbb3aeeaf?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create Escalation Policy" />

### Alert Rules and Automatic Paging
- Configurable alert rules that automatically page on-call personnel
- Service-based alert routing (e.g., payments alerts to payments team)
- Toggleable paging functionality per alert rule
- Default service or impacted service configuration
- Automatic correlation between alert payload and service teams

### Manual Paging Capabilities
- Manual paging of incidents and alerts from the web interface
- Slack-based paging functionality
- Individual user paging (reliable)
- Service-based paging with attached user groups
- Direct paging from incident management interface
- Real-time acknowledgment and escalation options

### Mobile Applications

<div style={{display: 'flex', gap: '20px', alignItems: 'center', margin: '20px 0'}}>
    <a href="https://play.google.com/store/apps/details?id=com.harness.aisre" aria-label="Get it on Google Play">
        <img src={require('./static/google-play-badge.png').default} alt="Get it on Google Play" style={{height: '60px'}} />
    </a>
    <a href="https://apps.apple.com/us/app/harness-on-call/id6753579217?itscg=30200&itsct=apps_box_badge&mttnsubad=6753579217" aria-label="Download on the App Store">
        <img src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1762214400" alt="Download on the App Store" style={{height: '60px'}} />
    </a>
</div>

- Automatic notifications when signed into mobile apps
- Real-time incident acknowledgment and escalation from mobile devices
- Cross-platform synchronization with web interface
- Platform-specific notification setup guides:
  - [Android notification setup](/docs/ai-sre/oncall/notifications-android) - Configure Do Not Disturb, device-specific settings
  - [iOS notification setup](/docs/ai-sre/oncall/notifications-ios) - Configure Emergency Bypass, Focus modes

### Notification Management
- Multi-channel notifications (email, SMS, phone calls, Slack)
- Custom notification rules per team or individual
- Configurable notification delays and smart batching
- Real-time notification delivery with context-rich alert messages
- Acknowledgment tracking across all platforms
- Timeline view of all paging activities
- Integration with Slack workspaces for immediate alerts
- Mobile push notifications with incident details

### Integration with Incident Response
- Direct paging from incident management interface
- Automatic on-call responder assignment based on incident type
- Integration with runbooks and playbooks for automated response
- Seamless handoffs between teams and specialists
- Real-time status updates across all platforms
- Incident timeline tracking with paging history
- Seamless acknowledgment workflow from any platform
- Real-time collaboration tools for coordinated response

### Team Management
- Define team structures and responsibilities
- Set up team-specific schedules and routing rules
- Manage team member availability and coverage
- Track on-call load and burnout metrics
- Optimize team coverage patterns
- Configure team-based alert routing

### AI-Enhanced Operations
- Intelligent responder recommendations based on expertise
- Automated incident classification and routing
- Pattern detection for recurring issues and optimization
- Schedule optimization suggestions for better coverage
- Predictive analytics for on-call load balancing
- Smart escalation path recommendations

## Workflow Overview

### Automatic Alert Processing
1. **Alert Generation**: Alerts enter the AI SRE system from monitoring integrations
2. **Service Mapping**: System identifies impacted service from alert payload
3. **Rule Evaluation**: Alert rules determine if automatic paging should occur
4. **On-Call Identification**: System identifies current on-call person for the service
5. **Multi-Channel Notification**: Notifications sent via all configured channels
6. **Acknowledgment Tracking**: Real-time tracking of response and escalation

### Manual Incident Response
1. **Incident Creation**: Incidents created through AI SRE platform
2. **Manual Paging**: On-call personnel can be paged directly from incident interface
3. **Response Options**: Recipients can acknowledge or escalate from any platform
4. **Status Synchronization**: All actions synchronized across web, mobile, and Slack
5. **Timeline Documentation**: Complete record of all response activities

<DocImage path={require('./static/optin-sms.png')} width="95%" height="95%" title="Twilio SMS" />

## Benefits

- **Unified Platform**: Manage incidents, schedules, and escalations in one integrated system
- **Reduced Response Time**: Eliminate tool switching and streamline incident management
- **Multi-Channel Notifications**: Reach team members via email, SMS, phone, Slack, and mobile apps
- **Real-Time Synchronization**: Instant updates across web, mobile, and Slack platforms
- **Enhanced Reliability**: Ensure consistent coverage with robust scheduling and AI optimization
- **Flexible Scheduling**: Support for complex rotation patterns with override capabilities
- **Automatic Service Integration**: Seamless connection with Harness CD service directory
- **Reliable Paging**: Multiple paging methods including manual and rule-based automation
- **Mobile-First Design**: Full functionality available on native mobile applications
- **Programmatic Configuration**: YAML-based setup for scalable deployment
- **Comprehensive Tracking**: Complete audit trail of all paging and acknowledgment activities
- **Data-Driven Optimization**: Use AI analytics to optimize team structures and schedules
- **Reduced Toil**: Automate routine on-call management tasks

## Getting Started

The on-call module is now available and ready for use. To get started:

### Initial Setup
1. **Configure Contact Settings**: Set up your email, phone, SMS, and Slack contact information
2. **Install Mobile Apps**: Download "Harness on-call" from Google Play Store or iOS App Store
3. **Create Schedules**: Set up your on-call rotation schedules with appropriate time zones and patterns
4. **Define Escalation Policies**: Configure multi-level escalation with timeout periods and retry logic
5. **Set Up Alert Rules**: Create automatic paging rules based on service and alert conditions
6. **Configure Mobile Notifications**: Ensure you receive critical alerts during Do Not Disturb
   - [Android notification setup guide](/docs/ai-sre/oncall/notifications-android)
   - [iOS notification setup guide](/docs/ai-sre/oncall/notifications-ios)

### Advanced Configuration
- **Service Directory**: Leverage automatic Harness CD integration for service mapping
- **YAML Configuration**: Use Edit YAML feature for programmatic schedule management
- **Slack Integration**: Enable organization-wide Slack connectivity for seamless notifications
- **Schedule Overrides**: Configure temporary coverage changes and backup assignments

#### Importing On-Call Configuration from External Sources

Learn how to set up on-call schedules using external data sources and integrations:

<DocVideo src="https://app.tango.us/app/embed/81ad2a7e-07f5-4a1a-813e-45f8fea4ab7c?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Setting On-Call from external source" />

### Future Enhancements
- **PagerDuty Integration**: Upcoming syncer for importing existing PagerDuty configurations
- **International Support**: Expanded phone number support beyond US numbers
- **Advanced Analytics**: Enhanced reporting and optimization recommendations