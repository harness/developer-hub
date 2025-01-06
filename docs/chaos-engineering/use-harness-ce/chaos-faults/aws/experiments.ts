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
    name: "DynamoDB replication pause",
    description:
      "DynamoDB replication pause fault pauses the data replication in DynamoDB tables over multiple locations for the chaos duration.",
    tags: ['replication', 'pause', "dynamodb"],
    category: "aws",
  },
  {
    name: "EBS loss by ID",
    description:
      "EBS loss by ID disrupts the state of EBS volume by detaching it from the node (or EC2) instance using volume ID for a certain duration.",
    tags: ['loss', 'id'],
    category: "aws",
  },
  {
    name: "EBS loss by tag",
    description:
      "EBS loss by tag disrupts the state of EBS volume by detaching it from the node (or EC2) instance using volume ID for a certain duration.",
    tags: ['loss', 'tag'],
    category: "aws",
  },
  {
    name: "EC2 CPU hog",
    description:
      "EC2 CPU hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.",
    tags: ['cpu', 'stress'],
    category: "aws",
  },
  {
    name: "EC2 DNS chaos",
    description:
      "EC2 DNS chaos causes DNS errors on the specified EC2 instance for a specific duration. ",
    tags: ['dns'],
    category: "aws",
  },
  {
    name: "EC2 HTTP latency",
    description:
      "EC2 HTTP latency disrupts the state of infrastructure resources. This fault induces HTTP chaos on an AWS EC2 instance using the Amazon SSM Run command, carried out using SSM Docs that is in-built in the fault.",
    tags: ['http', 'latency'],
    category: "aws",
  },
  {
    name: "EC2 HTTP modify body",
    description:
      "EC2 HTTP modify body injects HTTP chaos which affects the request/response by modifying the status code or the body or the headers by starting proxy server and redirecting the traffic through the proxy server.",
    tags: ['http', 'modify', 'body'],
    category: "aws",
  },
  {
    name: "EC2 HTTP modify header",
    description:
      "EC2 HTTP modify header injects HTTP chaos which affects the request (or response) by modifying the status code (or the body or the headers) by starting the proxy server and redirecting the traffic through the proxy server.",
    tags: ['http', 'modify', 'header'],
    category: "aws",
  },
  {
    name: "EC2 HTTP reset peer",
    description:
      "EC2 HTTP reset peer injects HTTP reset on the service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.",
    tags: ['http', 'reset', 'peer'],
    category: "aws",
  },
  {
    name: "EC2 HTTP status code",
    description:
      "EC2 HTTP status code injects HTTP chaos that affects the request (or response) by modifying the status code (or the body or the headers) by starting a proxy server and redirecting the traffic through the proxy server.",
    tags: ['http', 'status', 'code'],
    category: "aws",
  },
  {
    name: "EC2 IO stress",
    description:
      "EC2 IO stress disrupts the state of infrastructure resources. ",
    tags: ['io', 'stress'],
    category: "aws",
  },
  {
    name: "EC2 memory hog",
    description:
      "EC2 memory hog disrupts the state of infrastructure resources. ",
    tags: ['memory', 'stress'],
    category: "aws",
  },
  {
    name: "EC2 network latency",
    description:
      "EC2 network latency causes flaky access to the application (or services) by injecting network packet latency to EC2 instance(s).",
    tags: ['network', 'latency'],
    category: "aws",
  },
  {
    name: "EC2 network loss",
    description:
      "EC2 network loss causes flaky access to the application (or services) by injecting network packet loss to EC2 instance(s).",
    tags: ['network', 'loss'],
    category: "aws",
  },
  {
    name: "EC2 process kill",
    description:
      "EC2 process kill fault kills the target processes running on an EC2 instance.",
    tags: ['process', 'kill'],
    category: "aws",
  },
  {
    name: "EC2 stop by ID",
    description:
      "EC2 stop by ID stops an EC2 instance using the provided instance ID or list of instance IDs.",
    tags: ['stop', 'id'],
    category: "aws",
  },
  {
    name: "EC2 stop by tag",
    description:
      "EC2 stop by tag stops an EC2 instance using the provided tag.",
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
    name: "Lambda update role permission",
    description:
      "  Lambda update role permission is an AWS fault that modifies the role policies associated with a Lambda function.",
    tags: ['lambda', 'role', 'permission'],
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
      "RDS instance delete removes an instances from AWS RDS cluster. ",
    tags: ['instance', 'delete'],
    category: "aws",
  },
  {
    name: "RDS instance reboot",
    description:
      "RDS instance reboot can induce an RDS instance reboot chaos on AWS RDS cluster. It derives the instance under chaos from RDS cluster.",
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
      "AWS SSM chaos by ID induces chaos on AWS EC2 instances using the Amazon SSM Run Command. It is executed using the SSM document that defines the actions which the systems manager can perform on your managed instances (that have SSM agent installed). This SSM document is uploaded beforehand to AWS, whose name is referenced as an input to the chaos faults.",
    tags: ['ssm', 'id'],
    category: "aws",
  },
  {
    name: "SSM chaos by tag",
    description:
      "AWS SSM chaos by tag induces chaos on AWS EC2 instances using the Amazon SSM Run Command. It is executed using the SSM document that defines the actions which the systems manager can perform on your managed instances (that have SSM agent installed). This SSM document is uploaded beforehand to AWS, whose name is referenced as an input to the chaos faults.",
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
];