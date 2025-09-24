import {
    CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
    {
        name: "Get Started",
        description:
            "",
        list: [
            {
                title: "Protection Overview",
                module: MODULES.arp,
                description:
                    "Learn what Application and API Runtime Protection (API Protection) is within Traceable.",
                link: "https://docs.traceable.ai/docs/traceable-runtime-protection",
            },
            {
                title: "Get Started with Protection",
                module: MODULES.arp,
                description:
                    "Understand the components and how they work within Traceable.",
                link: "https://docs.traceable.ai/docs/traceable-runtime-protection",
            },
            {
                title: "Edge Deployment",
                module: MODULES.arp,
                description:
                    "Set up Traceable Protection at the edge for scalable security.",
                link: "https://docs.traceable.ai/docs/edge-deployment",
            },

        ],
    },
    {
        name: "Policy and Configuration Management",
        description:
            "",
        list: [
            {
                title: "Policies",
                module: MODULES.arp,
                description:
                    "Define and manage policies to enforce protection rules.",
                link: "https://docs.traceable.ai/docs/protection-policies",
            },
            {
                title: "Exclusions",
                module: MODULES.arp,
                description:
                    "Define exceptions to avoid false positives in protection rules.",
                link: "https://docs.traceable.ai/docs/protection-exclusions",
            },
            {
                title: "Threat Scoring",
                module: MODULES.arp,
                description:
                    "Analyze and configure scoring logic to prioritize threats.",
                link: "https://docs.traceable.ai/docs/threat-scoring",
            },
        ],
    },
    {
        name: "Monitoring and Threat Visibility",
        description:
            "",
        list: [
            {
                title: "Dashboards",
                module: MODULES.arp,
                description:
                    "Monitor metrics and threat detection summaries across applications and APIs.",
                link: "https://docs.traceable.ai/docs/waap-dashboards",
            },
            {
                title: "Threat Actors",
                module: MODULES.arp,
                description:
                    "Explore the identified attackers and take the necessary actions.",
                link: "https://docs.traceable.ai/docs/threat-actors-new",
            },
            {
                title: "APIs under Threat",
                module: MODULES.arp,
                description:
                    "Identify APIs currently being targeted by attackers",
                link: "https://docs.traceable.ai/docs/apis-under-threat",
            },
            {
                title: "Threat Activity",
                module: MODULES.arp,
                description:
                    "Investigate ongoing attack activities and related patterns.",
                link: "https://docs.traceable.ai/docs/threat-activity",
            },
            {
                title: "Data Protection",
                module: MODULES.arp,
                description:
                    "Monitor and secure sensitive data across your applications and APIs.",
                link: "https://docs.traceable.ai/docs/data-protection",
            },
        ],
    },
    {
        name: "Bot Protection",
        description:
            "",
        list: [
            {
                title: "Understanding Bot Protection",
                module: MODULES.arp,
                description:
                    "Learn how Traceable detects and blocks malicious bot traffic.",
                link: "https://docs.traceable.ai/docs/bot-protection",
            },
            {
                title: "Bot Protection Instrumentation",
                module: MODULES.arp,
                description:
                    "Configure Bot Protection for your application.",
                link: "https://docs.traceable.ai/docs/bot-protection-instrumentation",
            },
            {
                title: "Attack Use-Cases",
                module: MODULES.arp,
                description:
                    "Explore examples of bot-driven attacks.",
                link: "https://docs.traceable.ai/docs/bot-protection-use-cases",
            },
            {
                title: "Bot Protection Dashboard",
                module: MODULES.arp,
                description:
                    "Monitor bot activity and blocked events in a unified view.",
                link: "https://docs.traceable.ai/docs/bot-dashboard",
            },
            {
                title: "Bot Activities",
                module: MODULES.arp,
                description:
                    "Review behavior and patterns of identified bots.",
                link: "https://docs.traceable.ai/docs/bot-activities",
            },
            {
                title: "Bot Events",
                module: MODULES.arp,
                description:
                    "Track and analyze events triggered by the Bot Protection rules.",
                link: "https://docs.traceable.ai/docs/bot-events",
            },
        ],
    },
];
/* Define the cards - end */