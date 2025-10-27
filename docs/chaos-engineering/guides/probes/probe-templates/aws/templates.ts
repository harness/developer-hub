import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const awsProbeTemplates: ExperimentDetails[] = [
  {
    name: "AWS EC2 Instance Status Check",
    description:
      "Validates the current state of an EC2 instance. This probe checks if the specified EC2 instance(s) are in the expected state.",
    tags: ["ec2", "instance", "status", "health-check"],
    category: "aws",
  },
  {
    name: "AWS ECS Service Status Check",
    description:
      "Validates the status of an Amazon ECS service. This probe checks if the specified ECS service has reached the desired state.",
    tags: ["ecs", "service", "status", "scaling"],
    category: "aws",
  },
  {
    name: "AWS Lambda Function Status Check",
    description:
      "This probe checks if a Lambda function exists and is in the 'Active' state.",
    tags: ["lambda", "function", "status", "serverless"],
    category: "aws",
  },
  {
    name: "AWS Load Balancer AZ Check",
    description:
      "Validates the availability of target availability zone(s) in the given ALB or CLB.",
    tags: ["load-balancer", "alb", "clb", "availability-zone"],
    category: "aws",
  },
  {
    name: "AWS Security Group Rule Check",
    description:
      "Validates the presence of rules in AWS security groups.",
    tags: ["security-group", "rules", "network", "access-control"],
    category: "aws",
  },
];
