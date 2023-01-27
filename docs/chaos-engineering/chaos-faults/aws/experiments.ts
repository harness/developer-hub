import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "EBS loss by ID",
    description:
      "EBS loss by ID disrupts the state of EBS volume by detaching it from the node (or EC2) instance using volume ID for a certain duration.",
    tags: [],
    category: "aws",
  },
  {
    name: "EBS loss by tag",
    description:
      "EBS loss by tag disrupts the state of EBS volume by detaching it from the node (or EC2) instance using volume ID for a certain duration.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 CPU hog",
    description:
      "EC2 CPU hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 DNS chaos",
    description:
      "EC2 DNS chaos causes DNS errors on the specified EC2 instance for a specific duration. ",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 HTTP latency",
    description:
      "EC2 HTTP latency disrupts the state of infrastructure resources. This fault induces HTTP chaos on an AWS EC2 instance using the Amazon SSM Run command, carried out using SSM Docs that is in-built in the fault.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 HTTP modify body",
    description:
      "EC2 HTTP modify body injects HTTP chaos which affects the request/response by modifying the status code or the body or the headers by starting proxy server and redirecting the traffic through the proxy server.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 HTTP modify header",
    description:
      "EC2 HTTP modify header injects HTTP chaos which affects the request (or response) by modifying the status code (or the body or the headers) by starting the proxy server and redirecting the traffic through the proxy server.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 HTTP reset peer",
    description:
      "EC2 HTTP reset peer injects HTTP reset on the service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 HTTP status code",
    description:
      "EC2 HTTP status code injects HTTP chaos that affects the request (or response) by modifying the status code (or the body or the headers) by starting a proxy server and redirecting the traffic through the proxy server.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 IO stress",
    description:
      "EC2 IO stress disrupts the state of infrastructure resources. ",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 memory hog",
    description:
      "EC2 memory hog disrupts the state of infrastructure resources. ",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 network latency",
    description:
      "EC2 network latency causes flaky access to the application (or services) by injecting network packet latency to EC2 instance(s).",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 network loss",
    description:
      "EC2 network loss causes flaky access to the application (or services) by injecting network packet loss to EC2 instance(s).",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 process kill",
    description:
      "EC2 process kill fault kills the target processes running on an EC2 instance.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 stop by ID",
    description:
      "EC2 stop by ID stops an EC2 instance using the provided instance ID or list of instance IDs.",
    tags: [],
    category: "aws",
  },
  {
    name: "EC2 stop by tag",
    description:
      "EC2 stop by tag stops an EC2 instance using the provided tag.",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS agent stop",
    description:
      "ECS agent stop disrupts the state of infrastructure resources. ",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS container CPU hog",
    description:
      "ECS Container CPU hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS container IO hog",
    description:
      "ECS container IO hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS container memory hog",
    description:
      "ECS container memory hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS container network latency",
    description:
      "ECS container network latency disrupts the state of infrastructure resources. It brings delay on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS container network loss",
    description:
      "ECS container network loss disrupts the state of infrastructure resources. ",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS instance stop",
    description:
      "ECS instance stop induces stress on an AWS ECS cluster. It derives the instance under chaos from the ECS cluster.",
    tags: [],
    category: "aws",
  },
  {
    name: "ELB AZ down",
    description:
      "ELB AZ down takes down the availability zones on a target ELB for a specific duration. ",
    tags: [],
    category: "aws",
  },
  {
    name: "Lambda delete event source mapping",
    description:
      "Lambda delete event source mapping removes the event source mapping from an AWS Lambda function for a specific duration.",
    tags: [],
    category: "aws",
  },
  {
    name: "Lambda toggle event mapping state",
    description:
      "Lambda toggle event mapping state toggles (or sets) the event source mapping state to `disable` for a Lambda function during a specific duration.",
    tags: [],
    category: "aws",
  },
  {
    name: "Lambda update function memory",
    description:
      "Lambda update function memory causes the memory of a Lambda function to be updated to a specified value for a certain duration.",
    tags: [],
    category: "aws",
  },
  {
    name: "Lambda update function timeout",
    description:
      "Lambda update function timeout causes timeout of a Lambda function to be updated to a specified value for a certain duration.",
    tags: [],
    category: "aws",
  },
  {
    name: "RDS instance delete",
    description:
      "RDS instance delete removes an instances from AWS RDS cluster. ",
    tags: [],
    category: "aws",
  },
  {
    name: "RDS instance reboot",
    description:
      "RDS instance reboot can induce an RDS instance reboot chaos on AWS RDS cluster. It derives the instance under chaos from RDS cluster.",
    tags: [],
    category: "aws",
  },
];
