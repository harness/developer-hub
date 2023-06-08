import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "ALB AZ down",
    description:
      "ALB AZ down takes down the AZ (Availability Zones) on a target application load balancer for a specific duration.",
    tags: [],
    category: "aws",
  },
  {
    name: "CLB AZ down",
    description:
      "CLB AZ down takes down the AZ (Availability Zones) on a target CLB for a specific duration.",
    tags: [],
    category: "aws",
  },
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
    name: "ECS container IO stress",
    description:
      "ECS container IO stress disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
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
    name: "ECS task stop",
    description:
      "ECS task stop injects chaos to stop the ECS tasks based on the services or task replica ID and checks the task availability.",
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
    name: "Lambda delete function concurrency",
    description:
      "Lambda delete function concurrency deletes the Lambda function's reserved concurrency, thereby ensuring that the function has adequate unreserved concurrency to run.",
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
    name: "Lambda update role permission",
    description:
      "  Lambda update role permission is an AWS fault that modifies the role policies associated with a Lambda function.",
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
  {
    name: "Windows EC2 blackhole chaos",
    description:
      "Windows EC2 blackhole chaos results in access loss to the given target hosts or IPs by injecting firewall rules.",
    tags: [],
    category: "aws",
  },
  {
    name: "Windows EC2 CPU hog",
    description:
      "EC2 windows CPU hog induces CPU stress on the AWS Windows EC2 instances using Amazon SSM Run command.",
    tags: [],
    category: "aws",
  },
  {
    name: "Windows EC2 memory hog",
    description:
      "Windows EC2 memory hog induces memory stress on the target AWS Windows EC2 instance using Amazon SSM Run command.",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Invalid Container image",
    description:
      "ECS Invalid Container image induces task container miscofiguration chaos on the target ECS task container.",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Update Container timeout",
    description:
      "ECS Update Container Timeout induces chaos to change the target container start and stop timeout values.",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Update Container Resource limit",
    description:
      "ECS Update Container Resource Limit induces chaos to change the task container CPU and Memory resource limit",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Update Task role",
    description:
      "ECS Update Task Role induces chaos to update the task role ARN for a specified chaos duration.",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Network restrict",
    description:
      "ECS Network Restrict induces chaos to inject the access restriction on the target ECS container.",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Container HTTP latency",
    description:
      "ECS Container HTTP Latency induces chaos to inject latency on the target ECS task container.",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Container HTTP Modify body",
    description:
      "ECS Container HTTP Modify Body induces chaos to inject faulty response body on the target ECS task container.",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Container HTTP Reset peer",
    description:
      "ECS Container HTTP Reset Peer induces chaos to reset the TCP connection on the target ECS task container .",
    tags: [],
    category: "aws",
  },

  {
    name: "ECS Container HTTP Status code",
    description:
      "ECS Container HTTP Status code induces chaos to modify the status code from the HTTP response from the target ECS container",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS Fargate Memory hog",
    description:
      "ECS Fargate Memory Hog induces chaos to hog the memory utilisation of an ECS task from the specified service",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS Fargate CPU hog",
    description:
      "ECS Fargate CPU Hog induces chaos to stress the CPU usage of an ECS task from the specified service",
    tags: [],
    category: "aws",
  },
  {
    name: "ECS Container Volume detach",
    description:
      "ECS Container Volume Detach induces chaos to detach the volumes from ECS container for specified service and chaos duration",
    tags: [],
    category: "aws",
  },
  {
    name: "NLB AZ down",
    description:
      "NLB AZ Down induces chaos to restrict access to specific availability zones by blocking the subnet ACL for a specified duration",
    tags: [],
    category: "aws",
  },
  {
    name: "Resource Access restrict",
    description:
      "Resource Access Restrict induces chaos to create network access restrictions by selectively blocking incoming or outgoing traffic from a security group",
    tags: [],
    category: "aws",
  },
];
