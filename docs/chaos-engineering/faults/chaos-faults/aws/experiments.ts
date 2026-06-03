import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "ALB AZ down",
    description:
      "ALB AZ down takes down the AZ (Availability Zones) on a target application load balancer for a specific duration.",
    tags: ['availability', 'load balancer'],
    category: "aws",
  },
  {
    name: "CLB AZ down",
    description:
      "CLB AZ down takes down the AZ (Availability Zones) on a target CLB for a specific duration.",
    tags: ['availability', 'load balancer'],
    category: "aws",
  },
  {
    name: "AZ blackhole",
    description:
        "AZ blackhole causes network blackhole by isolating traffic in specific availability zones across an entire region.",
    tags: ['zone', 'blackhole'],
    category: "aws",
  },
  {
    name: "VPC route misconfiguration",
    description:
        "VPC route misconfiguration causes network issues due to misconfiguration on the route table associated with the target VPC.",
    tags: ['vpc', 'route tables'],
    category: "aws",
  },
  {
    name: "DynamoDB replication pause",
    description:
      "DynamoDB replication pause fault pauses the data replication in DynamoDB tables over multiple locations for the chaos duration.",
    tags: ['replication', 'pause', "dynamodb"],
    category: "aws",
  },
  {
    name: "EBS loss by ID",
    description:
      "EBS loss by ID detaches an EBS volume by volume ID for a configurable duration and reattaches it afterwards, so you can test how a workload behaves when its storage disappears.",
    tags: ['loss', 'id'],
    category: "aws",
  },
  {
    name: "EBS loss by tag",
    description:
      "EBS loss by tag detaches EBS volumes selected by tag for a configurable duration and reattaches them afterwards, so you can test how workloads behave when a tagged subset of storage disappears.",
    tags: ['loss', 'tag'],
    category: "aws",
  },
  {
    name: "EC2 CPU hog",
    description:
      "EC2 CPU hog stresses a configurable number of CPU cores at a configurable load percentage inside a target EC2 instance for a configurable duration, so you can test how the workload behaves when its host is CPU-starved.",
    tags: ['cpu', 'stress'],
    category: "aws",
  },
  {
    name: "EC2 DNS chaos",
    description:
      "EC2 DNS chaos fails DNS resolution for selected hostnames on a target EC2 instance for a configurable duration, so you can test how the workload reacts when a dependency cannot be resolved.",
    tags: ['dns'],
    category: "aws",
  },
  {
    name: "EC2 HTTP latency",
    description:
      "EC2 HTTP latency adds latency to inbound HTTP traffic on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients react when an HTTP service responds slowly.",
    tags: ['http', 'latency'],
    category: "aws",
  },
  {
    name: "EC2 HTTP modify body",
    description:
      "EC2 HTTP modify body rewrites HTTP response bodies on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients react when an upstream returns unexpected content.",
    tags: ['http', 'modify', 'body'],
    category: "aws",
  },
  {
    name: "EC2 HTTP modify header",
    description:
      "EC2 HTTP modify header adds, changes, or removes HTTP headers on requests or responses on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients and servers react when headers are missing or malformed.",
    tags: ['http', 'modify', 'header'],
    category: "aws",
  },
  {
    name: "EC2 HTTP reset peer",
    description:
      "EC2 HTTP reset peer resets inbound TCP connections to an HTTP service on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients react when the server tears down connections mid-flight.",
    tags: ['http', 'reset', 'peer'],
    category: "aws",
  },
  {
    name: "EC2 HTTP status code",
    description:
      "EC2 HTTP status code rewrites HTTP response status codes on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients react to specific error codes returned by an upstream service.",
    tags: ['http', 'status', 'code'],
    category: "aws",
  },
  {
    name: "EC2 IO stress",
    description:
      "EC2 IO stress generates sustained filesystem read and write load on a target EC2 instance for a configurable duration, so you can test how the workload behaves under disk pressure or near-full storage.",
    tags: ['io', 'stress'],
    category: "aws",
  },
  {
    name: "EC2 memory hog",
    description:
      "EC2 memory hog consumes a configurable amount of memory inside a target EC2 instance for a configurable duration, so you can test how the workload behaves when its host is starved of memory.",
    tags: ['memory', 'stress'],
    category: "aws",
  },
  {
    name: "EC2 network latency",
    description:
      "EC2 network latency adds configurable latency and jitter to outbound traffic on a target EC2 instance for a configurable duration, so you can test how the workload reacts when network round-trip times grow.",
    tags: ['network', 'latency'],
    category: "aws",
  },
  {
    name: "EC2 network loss",
    description:
      "EC2 network loss drops a configurable percentage of outbound packets on a target EC2 instance for a configurable duration, so you can test how the workload reacts when network reliability degrades.",
    tags: ['network', 'loss'],
    category: "aws",
  },
  {
    name: "EC2 process kill",
    description:
      "EC2 process kill kills one or more processes by PID inside a target EC2 instance for a configurable duration, so you can test how the workload recovers when a critical process disappears without losing the host.",
    tags: ['process', 'kill'],
    category: "aws",
  },
  {
    name: "EC2 stop by ID",
    description:
      "EC2 stop by ID stops one or more EC2 instances identified by their instance IDs for a configurable duration and then starts them again, so you can test how the workload behaves when a specific host disappears.",
    tags: ['stop', 'id'],
    category: "aws",
  },
  {
    name: "EC2 stop by tag",
    description:
      "EC2 stop by tag stops EC2 instances selected by tag for a configurable duration and starts them again afterwards, so you can test how a workload behaves when a tagged subset of capacity disappears.",
    tags: ['stop', 'tag'],
    category: "aws",
  },
  {
    name: "ECS agent stop",
    description:
      "ECS agent stop disrupts the state of infrastructure resources. ",
    tags: ['agent', 'stop'],
    category: "aws",
  },
  {
    name: "ECS container CPU hog",
    description:
      "ECS Container CPU hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: ['container', 'cpu', 'stress'],
    category: "aws",
  },
  {
    name: "ECS container HTTP latency",
    description:
      "ECS container HTTP latency induces chaos to inject latency on the target ECS task container.",
    tags: ['container', 'http', 'latency'],
    category: "aws",
  },
  {
    name: "ECS container HTTP modify body",
    description:
      "ECS container HTTP modify body induces chaos to inject faulty response body on the target ECS task container.",
    tags: ['container', 'http', 'modify', 'body'],
    category: "aws",
  },
  {
    name: "ECS container HTTP modify header",
    description:
      "ECS container HTTP modify header injects HTTP chaos which modifies the headers of the request or response of the service.",
    tags: ['container', 'http', 'modify', 'header'],
    category: "aws",
  },
  {
    name: "ECS container HTTP reset peer",
    description:
      "ECS container HTTP reset peer induces chaos to reset the TCP connection on the target ECS task container .",
    tags: ['container', 'http', 'reset', 'peer'],
    category: "aws",
  },
  {
    name: "ECS container HTTP status code",
    description:
      "ECS container HTTP status code induces chaos to modify the status code from the HTTP response from the target ECS container",
    tags: ['container', 'http', 'status', 'code'],
    category: "aws",
  },
  {
    name: "ECS container IO stress",
    description:
      "ECS container IO stress disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: ['container', 'io', 'stress'],
    category: "aws",
  },
  {
    name: "ECS container memory hog",
    description:
      "ECS container memory hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: ['container', 'memory', 'stress'],
    category: "aws",
  },
  {
    name: "ECS container network latency",
    description:
      "ECS container network latency disrupts the state of infrastructure resources. It brings delay on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: ['container', 'network', 'latency'],
    category: "aws",
  },
  {
    name: "ECS container network loss",
    description:
      "ECS container network loss disrupts the state of infrastructure resources. ",
    tags: ['container', 'network', 'loss'],
    category: "aws",
  },
  {
    name: "ECS container volume detach",
    description:
      "ECS container volume detach induces chaos to detach the volumes from ECS container for specified service and chaos duration",
    tags: ['container', 'volume', 'detach'],
    category: "aws",
  },
  {
    name: "ECS Fargate CPU hog",
    description:
      "ECS Fargate CPU hog induces chaos to stress the CPU usage of an ECS task from the specified service",
    tags: ['cpu', 'stress'],
    category: "aws",
  },
  {
    name: "ECS Fargate memory hog",
    description:
      "ECS Fargate memory hog induces chaos to hog the memory utilization of an ECS task from the specified service",
    tags: ['memory', 'stress', 'stress'],
    category: "aws",
  },
  {
    name: "ECS instance stop",
    description:
      "ECS instance stop induces stress on an AWS ECS cluster. It derives the instance under chaos from the ECS cluster.",
    tags: ['instance', 'stop'],
    category: "aws",
  },
  {
    name: "ECS invalid container image",
    description:
      "ECS invalid container image allows you to update the Docker image used by a container in an Amazon ECS (Elastic Container Service) task.",
    tags: ['invalid', 'container', 'image'],
    category: "aws",
  },
  {
    name: "ECS network restrict",
    description:
      "ECS network restrict induces chaos to inject the access restriction on the target ECS container.",
    tags: ['network', 'restrict'],
    category: "aws",
  },
  {
    name: "ECS task scale",
    description:
      "ECS task scale is an AWS fault that injects chaos to scale (up or down) the ECS tasks based on the services and checks the task availability.",
    tags: ['task', 'scale'],
    category: "aws",
  },
  {
    name: "ECS task stop",
    description:
      "ECS task stop injects chaos to stop the ECS tasks based on the services or task replica ID and checks the task availability.",
    tags: ['task', 'stop'],
    category: "aws",
  },
  {
    name: "ECS update container resource limit",
    description:
      "ECS update container resource Limit induces chaos to change the task container CPU and Memory resource limit",
    tags: ['update', 'container', 'resource'],
    category: "aws",
  },
  {
    name: "ECS update container timeout",
    description:
      "ECS update container timeout induces chaos to change the target container start and stop timeout values.",
    tags: ['update', 'container', 'timeout'],
    category: "aws",
  },
  {
    name: "ECS update task role",
    description:
      "ECS update task role induces chaos to update the task role ARN for a specified chaos duration.",
    tags: ['task', 'role'],
    category: "aws",
  },
  {
    name: "Generic experiment template",
    description:
      "Generic experiment template provides a template to natively inject faults using FIS for different services, such as EC2, EBS, DynamoDB, and so on.",
    tags: ['generic', 'template'],
    category: "aws",
  },
  {
    name: "Lambda delete event source mapping",
    description:
      "Lambda delete event source mapping removes the event source mapping from an AWS Lambda function for a specific duration.",
    tags: ['lambda', 'delete', 'source', 'map'],
    category: "aws",
  },
  {
    name: "Lambda delete function concurrency",
    description:
      "Lambda delete function concurrency deletes the Lambda function's reserved concurrency, thereby ensuring that the function has adequate unreserved concurrency to run.",
    tags: ['lambda', 'delete', 'concurrency'],
    category: "aws",
  },
  {
    name: "Lambda function layer detach",
    description:
      "Lambda function layer detach is an AWS fault that detaches the Lambda layer associated with the function, thereby causing dependency-related issues or breaking the Lambda function that relies on the layer's content.",
    tags: ['lambda', 'detach', 'function'],
    category: "aws",
  },
  {
    name: "Lambda toggle event mapping state",
    description:
      "Lambda toggle event mapping state toggles (or sets) the event source mapping state to `disable` for a Lambda function during a specific duration.",
    tags: ['lambda', 'toggle', 'map'],
    category: "aws",
  },
  {
    name: "Lambda update function memory",
    description:
      "Lambda update function memory causes the memory of a Lambda function to be updated to a specified value for a certain duration.",
    tags: ['lambda', 'function', 'memory'],
    category: "aws",
  },
  {
    name: "Lambda update function timeout",
    description:
      "Lambda update function timeout causes timeout of a Lambda function to be updated to a specified value for a certain duration.",
    tags: ['lambda', 'timeout', 'update'],
    category: "aws",
  },
  {
    name: "Lambda inject status code",
    description:
        "Lambda inject status code simulates runtime erroneous HTTP status codes in Lambda function responses for a certain duration.",
    tags: ['lambda', 'runtime', 'update'],
    category: "aws",
  },
  {
    name: "Lambda update role permission",
    description:
      "  Lambda update role permission is an AWS fault that modifies the role policies associated with a Lambda function.",
    tags: ['lambda', 'role', 'permission'],
    category: "aws",
  },
  {
    name: "Lambda modify response body",
    description:
        "Lambda modify response body modifies the response body of a Lambda function at runtime, simulating unexpected output alterations. This interrupt the flow of the given function.",
    tags: ['lambda', 'runtime', 'function'],
    category: "aws",
  },
  {
    name: "NLB AZ down",
    description:
      "NLB AZ down induces chaos to restrict access to specific availability zones by blocking the subnet ACL for a specified duration",
    tags: ['load balancer', 'availability'],
    category: "aws",
  },
  {
    name: "RDS instance delete",
    description:
      "RDS instance delete deletes a target RDS DB instance, so you can test how applications behave when a database disappears permanently and how disaster-recovery procedures handle the loss.",
    tags: ['instance', 'delete'],
    category: "aws",
  },
  {
    name: "RDS instance reboot",
    description:
      "RDS instance reboot reboots a target RDS DB instance (with optional Multi-AZ failover) for a configurable duration, so you can test how applications behave when their database restarts.",
    tags: ['instance', 'reboot'],
    category: "aws",
  },
  {
    name: "Resource access restrict",
    description:
      "Resource access restrict induces chaos to create network access restrictions by selectively blocking incoming or outgoing traffic from a security group",
    tags: ['resource', 'access', 'restrict'],
    category: "aws",
  },
  {
    name: "SSM chaos by ID",
    description:
      "SSM chaos by ID runs an arbitrary AWS Systems Manager document against a target EC2 instance selected by ID, so you can inject custom chaos that is not covered by a dedicated fault.",
    tags: ['ssm', 'id'],
    category: "aws",
  },
  {
    name: "SSM chaos by tag",
    description:
      "SSM chaos by tag runs an arbitrary AWS Systems Manager document against EC2 instances selected by tag, so you can inject custom chaos against a logical group of hosts.",
    tags: ['ssm', 'tag'],
    category: "aws",
  },
  {
    name: "Windows EC2 blackhole chaos",
    description:
      "Windows EC2 blackhole chaos results in access loss to the given target hosts or IPs by injecting firewall rules.",
    tags: ['windows', 'blackhole', 'stress'],
    category: "aws",
  },
  {
    name: "Windows EC2 CPU hog",
    description:
      "EC2 windows CPU hog induces CPU stress on the AWS Windows EC2 instances using Amazon SSM Run command.",
    tags: ['cpu', 'stress', 'windows'],
    category: "aws",
  },
  {
    name: "Windows EC2 memory hog",
    description:
      "Windows EC2 memory hog induces memory stress on the target AWS Windows EC2 instance using Amazon SSM Run command.",
    tags: ['memory', 'stress', 'windows'],
    category: "aws",
  },
  {
    name: "Windows EC2 Process Kill",
    description:
      "Windows EC2 Process Kill fault kills the target processes running on a Windows EC2 instance. This fault disrupts application-critical processes such as databases or message queues running on the instance by killing their underlying processes or threads.",
    tags: ['process', 'kill', 'windows', 'ec2'],
    category: "aws",
  },
  {
    name: "Lambda Block TCP Connection",
    description:
      "Lambda Block TCP Connection is an AWS fault that simulates network blocks for TCP connections of a Lambda function. This fault helps you evaluate how your application responds when outbound TCP connections from a Lambda function are blocked.",
    tags: ['lambda', 'tcp', 'network', 'block'],
    category: "aws",
  },
];