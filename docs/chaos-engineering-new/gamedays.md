---
title: GameDays
description: Organize team-wide chaos engineering exercises and disaster recovery drills
sidebar_position: 3
---

# GameDays

GameDays are structured, team-wide exercises that simulate real-world failures and test your organization's ability to respond to incidents. They combine chaos engineering with incident response training to build both technical resilience and team preparedness.

## What are GameDays?

GameDays are collaborative exercises that:
- **Simulate realistic failure scenarios** in a controlled environment
- **Test incident response procedures** and team coordination
- **Validate disaster recovery plans** and runbooks
- **Build team confidence** in handling production incidents
- **Identify gaps** in monitoring, alerting, and response processes

## Types of GameDays

### Technical GameDays
Focus on system resilience and technical response:
- **Infrastructure failures**: Server outages, network partitions
- **Application failures**: Service crashes, database issues
- **Security incidents**: Breach simulations, access control failures
- **Performance degradation**: Load spikes, resource exhaustion

### Business GameDays
Test business continuity and cross-functional response:
- **Customer impact scenarios**: Payment system failures, data breaches
- **Compliance incidents**: Regulatory violations, audit failures
- **Communication crises**: Public relations challenges, stakeholder management
- **Supply chain disruptions**: Vendor outages, dependency failures

### Hybrid GameDays
Combine technical and business elements:
- **End-to-end scenarios**: Complete customer journey failures
- **Multi-team coordination**: Cross-functional incident response
- **Escalation procedures**: From technical teams to executive leadership
- **External communication**: Customer notifications, status page updates

## Planning a GameDay

### Pre-GameDay Preparation

#### **Define Objectives**
```yaml
gameday_objectives:
  primary: "Test payment system failover procedures"
  secondary: 
    - "Validate incident response communication"
    - "Practice customer notification processes"
    - "Test monitoring and alerting effectiveness"
  
success_criteria:
  - "Payment failover completes within 5 minutes"
  - "All stakeholders notified within 10 minutes"
  - "Customer impact minimized to <5% of transactions"
```

#### **Scenario Design**
Create realistic failure scenarios:
- **Based on real incidents**: Use past outages as inspiration
- **Gradual complexity**: Start simple, add complications over time
- **Multiple failure modes**: Combine different types of failures
- **Time pressure**: Include realistic time constraints

#### **Team Preparation**
- **Role assignments**: Define who does what during the exercise
- **Runbook review**: Ensure all procedures are up-to-date
- **Tool access**: Verify everyone has necessary permissions
- **Communication channels**: Set up dedicated incident channels

### GameDay Structure

#### **Kickoff (15 minutes)**
- **Scenario briefing**: Explain the failure scenario
- **Role confirmation**: Confirm team roles and responsibilities
- **Ground rules**: Establish exercise boundaries and safety measures
- **Communication setup**: Activate incident response channels

#### **Execution Phase (60-120 minutes)**
- **Failure injection**: Introduce the planned failures
- **Response coordination**: Teams respond as they would in production
- **Observation and notes**: Facilitators document response effectiveness
- **Escalation triggers**: Practice escalation procedures if needed

#### **Recovery Phase (30-60 minutes)**
- **System restoration**: Return systems to normal operation
- **Status verification**: Confirm all systems are healthy
- **Communication updates**: Practice "all clear" notifications
- **Initial debrief**: Quick discussion of immediate observations

#### **Post-GameDay Analysis (60 minutes)**
- **Detailed retrospective**: Thorough analysis of response effectiveness
- **Action item identification**: Document improvements needed
- **Runbook updates**: Update procedures based on learnings
- **Follow-up planning**: Schedule necessary improvements

## GameDay Scenarios

### Infrastructure Scenarios

#### **Multi-Region Failover**
```yaml
scenario:
  name: "Primary Region Outage"
  description: "Simulate complete failure of primary AWS region"
  
failure_injection:
  - type: "region-isolation"
    target: "us-west-2"
    duration: "90 minutes"
  
expected_response:
  - "Traffic failover to us-east-1"
  - "Database failover to secondary region"
  - "DNS updates to redirect traffic"
  - "Customer notification within 15 minutes"
  
success_criteria:
  - "RTO: < 10 minutes"
  - "RPO: < 5 minutes"
  - "Customer impact: < 2% of requests"
```

#### **Database Cluster Failure**
```yaml
scenario:
  name: "Primary Database Cluster Outage"
  description: "Simulate complete failure of primary database cluster"
  
failure_injection:
  - type: "database-cluster-failure"
    target: "production-postgres-cluster"
    failure_mode: "complete-unavailability"
  
expected_response:
  - "Automatic failover to read replica"
  - "Application connection pool reconfiguration"
  - "Data consistency verification"
  - "Performance monitoring during recovery"
```

### Application Scenarios

#### **Payment System Failure**
```yaml
scenario:
  name: "Payment Gateway Outage"
  description: "Primary payment processor becomes unavailable"
  
failure_injection:
  - type: "external-service-failure"
    target: "stripe-payment-gateway"
    failure_mode: "timeout-errors"
  
expected_response:
  - "Failover to backup payment processor"
  - "Customer notification of payment issues"
  - "Manual payment processing procedures"
  - "Revenue impact assessment"
```

#### **Authentication Service Disruption**
```yaml
scenario:
  name: "Auth Service Outage"
  description: "User authentication system becomes unavailable"
  
failure_injection:
  - type: "service-failure"
    target: "auth-service"
    failure_mode: "complete-outage"
  
expected_response:
  - "Graceful degradation to cached tokens"
  - "Limited functionality for unauthenticated users"
  - "Emergency access procedures for critical operations"
  - "User communication about login issues"
```

### Security Scenarios

#### **Data Breach Simulation**
```yaml
scenario:
  name: "Suspected Data Breach"
  description: "Unusual data access patterns detected"
  
trigger_events:
  - "Abnormal database query patterns"
  - "Suspicious user account activity"
  - "Unusual data export volumes"
  
expected_response:
  - "Security incident response activation"
  - "Forensic investigation procedures"
  - "Legal and compliance notification"
  - "Customer communication planning"
```

## GameDay Facilitation

### Facilitator Roles

#### **GameDay Leader**
- **Overall coordination**: Manage the entire exercise
- **Scenario control**: Inject failures and complications
- **Time management**: Keep the exercise on schedule
- **Safety oversight**: Ensure no real damage occurs

#### **Technical Observer**
- **Response monitoring**: Watch technical response effectiveness
- **Tool usage tracking**: Note which tools are used and how
- **Communication observation**: Monitor technical team coordination
- **Documentation**: Record technical decisions and actions

#### **Business Observer**
- **Stakeholder communication**: Monitor business communication
- **Customer impact assessment**: Track business impact metrics
- **Escalation procedures**: Observe management involvement
- **External communication**: Monitor public-facing communications

### Facilitation Best Practices

#### **Create Realistic Pressure**
- **Time constraints**: Use realistic time pressure
- **Incomplete information**: Don't provide all details upfront
- **Evolving scenarios**: Add complications as the exercise progresses
- **Stakeholder pressure**: Simulate executive and customer pressure

#### **Maintain Safety**
- **Clear boundaries**: Define what systems can and cannot be touched
- **Rollback procedures**: Have clear ways to stop the exercise
- **Real incident protocols**: Pause if real incidents occur
- **Participant wellbeing**: Monitor stress levels and provide breaks

#### **Encourage Learning**
- **No blame culture**: Focus on learning, not individual performance
- **Open discussion**: Encourage questions and suggestions
- **Real-time feedback**: Provide guidance during the exercise
- **Celebrate successes**: Acknowledge good responses and teamwork

## Measuring GameDay Success

### Technical Metrics
- **Response time**: How quickly teams identified and responded to failures
- **Recovery time**: Time to restore normal operations
- **Communication effectiveness**: Quality and timeliness of updates
- **Procedure adherence**: How well teams followed established runbooks

### Business Metrics
- **Customer impact**: Simulated impact on users and revenue
- **Stakeholder communication**: Effectiveness of business communication
- **Escalation appropriateness**: When and how management was involved
- **External communication**: Quality of customer and public updates

### Team Metrics
- **Collaboration effectiveness**: How well teams worked together
- **Stress management**: How teams handled pressure and uncertainty
- **Learning outcomes**: New insights and knowledge gained
- **Confidence building**: Increased confidence in incident response

## Post-GameDay Actions

### Immediate Actions (Within 24 hours)
- **System verification**: Ensure all systems are fully restored
- **Initial debrief**: Capture immediate observations and feedback
- **Critical issues**: Address any urgent problems discovered
- **Communication**: Update stakeholders on exercise completion

### Short-term Actions (Within 1 week)
- **Detailed retrospective**: Comprehensive analysis of the exercise
- **Action item prioritization**: Rank improvements by impact and effort
- **Runbook updates**: Update procedures based on learnings
- **Tool improvements**: Address gaps in monitoring and alerting

### Long-term Actions (Within 1 month)
- **Process improvements**: Implement systematic changes
- **Training updates**: Update incident response training
- **Next GameDay planning**: Schedule follow-up exercises
- **Knowledge sharing**: Share learnings with broader organization

## GameDay Templates

### Quick Start Template
```yaml
gameday_template:
  name: "Basic Service Failure"
  duration: "90 minutes"
  participants: ["dev-team", "ops-team", "product-manager"]
  
  scenario:
    description: "Primary web service becomes unavailable"
    failure_type: "service-outage"
    complexity: "low"
  
  objectives:
    - "Test service failover procedures"
    - "Validate monitoring and alerting"
    - "Practice team communication"
  
  success_criteria:
    - "Service restored within 15 minutes"
    - "All stakeholders notified within 5 minutes"
    - "Customer impact < 1% of requests"
```

### Advanced Template
```yaml
gameday_template:
  name: "Multi-Service Cascade Failure"
  duration: "3 hours"
  participants: ["multiple-teams", "management", "customer-support"]
  
  scenario:
    description: "Database failure causes cascading service failures"
    failure_type: "cascade-failure"
    complexity: "high"
  
  complications:
    - "Monitoring system also affected"
    - "Primary on-call engineer unavailable"
    - "High-profile customer affected"
  
  objectives:
    - "Test complex failure response"
    - "Validate escalation procedures"
    - "Practice crisis communication"
```

## Integration with Chaos Engineering

### Automated GameDays
Combine GameDays with automated chaos experiments:
- **Scheduled exercises**: Regular automated GameDay scenarios
- **Continuous validation**: Ongoing resilience testing
- **Regression prevention**: Ensure fixes don't break other things
- **Confidence building**: Regular practice builds team confidence

### Experiment-Driven GameDays
Use chaos experiments to drive GameDay scenarios:
- **Real failure injection**: Use actual chaos engineering tools
- **Realistic conditions**: Create authentic failure conditions
- **Measurable outcomes**: Use experiment metrics for evaluation
- **Reproducible scenarios**: Repeat successful GameDay scenarios

## Getting Started

### Your First GameDay
1. **Start small**: Choose a simple, low-risk scenario
2. **Involve key teams**: Include development, operations, and product teams
3. **Set clear objectives**: Define what you want to learn and test
4. **Plan thoroughly**: Prepare scenarios, roles, and success criteria
5. **Debrief thoroughly**: Capture learnings and plan improvements

### Building a GameDay Program
1. **Regular schedule**: Plan quarterly or monthly GameDays
2. **Scenario library**: Build a collection of reusable scenarios
3. **Cross-team participation**: Rotate participants and scenarios
4. **Continuous improvement**: Evolve scenarios based on learnings
5. **Cultural integration**: Make GameDays part of your engineering culture

## Next Steps

Ready to organize your first GameDay?

1. **[Design Chaos Experiments](./chaos-experiments)** - Create technical failure scenarios
2. **[Set up Probes & Actions](./probes-actions)** - Monitor GameDay effectiveness
3. **[Build Pipelines](./pipelines)** - Automate GameDay scenario deployment
4. **[Explore Application Maps](./application-maps)** - Visualize systems for better scenario planning

:::tip Success Tip
Start with a simple scenario involving just your core team. Focus on learning and building confidence rather than testing complex scenarios. You can always increase complexity in future GameDays!
:::
