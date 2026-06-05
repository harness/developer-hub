import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "ALB AZ down",
    description:
      "ALB AZ down detaches one or more availability zones from an Application Load Balancer for a configurable duration so you can test how clients, target groups, and AZ-aware routing behave when a zone is taken out of the load balancer rotation.",
    tags: ['availability', 'load balancer'],
    category: "aws",
  },
  {
    name: "CLB AZ down",
    description:
      "CLB AZ down disables one or more availability zones on a Classic Load Balancer for a configurable duration so you can test how clients and back-end instances behave when an AZ is removed from the load balancer rotation.",
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
      "ECS agent stop halts the ECS agent on one or more EC2 container instances for a configurable duration so you can test how the ECS cluster behaves when the data-plane bridge between agent and control plane is interrupted.",
    tags: ['agent', 'stop'],
    category: "aws",
  },
  {
    name: "ECS container CPU hog",
    description:
      "ECS container CPU hog stresses CPU inside containers of EC2-backed ECS tasks for a configurable duration so you can test how the application and the host behave under CPU saturation.",
    tags: ['container', 'cpu', 'stress'],
    category: "aws",
  },
  {
    name: "ECS container HTTP latency",
    description:
      "ECS container HTTP latency adds latency to inbound HTTP traffic on a configurable port of containers in an EC2-backed ECS task for a configurable duration so you can test how clients react when an HTTP service responds slowly.",
    tags: ['container', 'http', 'latency'],
    category: "aws",
  },
  {
    name: "ECS container HTTP modify body",
    description:
      "ECS container HTTP modify body rewrites HTTP response bodies on a configurable port of containers in an EC2-backed ECS task for a configurable duration so you can test how clients react when an upstream returns unexpected content.",
    tags: ['container', 'http', 'modify', 'body'],
    category: "aws",
  },
  {
    name: "ECS container HTTP reset peer",
    description:
      "ECS container HTTP reset peer resets inbound TCP connections to an HTTP service on a configurable port of containers in an EC2-backed ECS task for a configurable duration so you can test how clients react when the server tears down connections mid-flight.",
    tags: ['container', 'http', 'reset', 'peer'],
    category: "aws",
  },
  {
    name: "ECS container HTTP status code",
    description:
      "ECS container HTTP status code rewrites HTTP response status codes on a configurable port of containers in an EC2-backed ECS task for a configurable duration so you can test how clients react to specific error codes returned by an upstream service.",
    tags: ['container', 'http', 'status', 'code'],
    category: "aws",
  },
  {
    name: "ECS container IO stress",
    description:
      "ECS container IO stress generates sustained filesystem read and write load inside containers of EC2-backed ECS tasks for a configurable duration so you can test how the workload behaves under disk pressure.",
    tags: ['container', 'io', 'stress'],
    category: "aws",
  },
  {
    name: "ECS container memory hog",
    description:
      "ECS container memory hog consumes a configurable amount of memory inside containers of EC2-backed ECS tasks for a configurable duration so you can test how the workload behaves when its container is starved of memory.",
    tags: ['container', 'memory', 'stress'],
    category: "aws",
  },
  {
    name: "ECS container network latency",
    description:
      "ECS container network latency adds configurable latency to outbound traffic from containers in EC2-backed ECS tasks for a configurable duration so you can test how the workload reacts when network round-trip times grow.",
    tags: ['container', 'network', 'latency'],
    category: "aws",
  },
  {
    name: "ECS container network loss",
    description:
      "ECS container network loss drops a configurable percentage of outbound packets from containers in EC2-backed ECS tasks for a configurable duration so you can test how the workload reacts when network reliability degrades.",
    tags: ['container', 'network', 'loss'],
    category: "aws",
  },
  {
    name: "ECS container volume detach",
    description:
      "ECS container volume detach detaches EBS volumes attached to ECS task containers for a configurable duration so you can test how stateful tasks behave when their storage disappears.",
    tags: ['container', 'volume', 'detach'],
    category: "aws",
  },
  {
    name: "ECS Fargate CPU hog",
    description:
      "ECS Fargate CPU hog stresses CPU inside a Fargate task for a configurable duration so you can test how the application behaves when its task is CPU-starved.",
    tags: ['cpu', 'stress', 'fargate'],
    category: "aws",
  },
  {
    name: "ECS Fargate memory hog",
    description:
      "ECS Fargate memory hog consumes a configurable amount of memory inside a Fargate task for a configurable duration so you can test how the application behaves when its task is starved of memory.",
    tags: ['memory', 'stress', 'fargate'],
    category: "aws",
  },
  {
    name: "ECS instance stop",
    description:
      "ECS instance stop stops one or more EC2 container instances belonging to an ECS cluster for a configurable duration so you can test how the cluster reschedules tasks and how the workload behaves when a host disappears.",
    tags: ['instance', 'stop'],
    category: "aws",
  },
  {
    name: "ECS invalid container image",
    description:
      "ECS invalid container image swaps a container image to an invalid value on an ECS service for a configurable duration so you can test how the deployment, rollback, and monitoring react to a failing image pull.",
    tags: ['invalid', 'container', 'image'],
    category: "aws",
  },
  {
    name: "ECS network restrict",
    description:
      "ECS network restrict modifies the security group rules of an ECS service for a configurable duration so you can test how the workload behaves when outbound or inbound network access is restricted.",
    tags: ['network', 'restrict'],
    category: "aws",
  },
  {
    name: "ECS task scale",
    description:
      "ECS task scale changes the desired count of an ECS service for a configurable duration so you can test how the workload behaves under sudden scale-up or scale-down.",
    tags: ['task', 'scale'],
    category: "aws",
  },
  {
    name: "ECS task stop",
    description:
      "ECS task stop stops one or more ECS tasks (selected by service or task ID) for a configurable duration so you can test how the workload behaves when a specific task disappears.",
    tags: ['task', 'stop'],
    category: "aws",
  },
  {
    name: "ECS update container resource limit",
    description:
      "ECS update container resource limit re-registers an ECS task definition with reduced CPU or memory limits for a configurable duration so you can test how the workload behaves under tightened resource constraints.",
    tags: ['update', 'container', 'resource'],
    category: "aws",
  },
  {
    name: "ECS update container timeout",
    description:
      "ECS update container timeout re-registers an ECS task definition with modified start and stop timeouts for a configurable duration so you can test how the deployment behaves when container start or stop takes longer than expected.",
    tags: ['update', 'container', 'timeout'],
    category: "aws",
  },
  {
    name: "ECS update task role",
    description:
      "ECS update task role swaps the IAM task role on an ECS service for a configurable duration so you can test how the workload behaves when its IAM permissions change.",
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
      "NLB AZ down detaches one or more availability zones from a Network Load Balancer for a configurable duration so you can test how clients, target groups, and AZ-aware routing behave when a zone is taken out of the load balancer rotation.",
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
      "Windows EC2 blackhole chaos drops all network traffic destined for specific IPs or hosts on one or more Windows EC2 instances for a configurable duration so you can test how Windows-hosted workloads behave when a specific dependency is completely unreachable.",
    tags: ['windows', 'blackhole', 'network'],
    category: "aws",
  },
  {
    name: "Windows EC2 CPU hog",
    description:
      "Windows EC2 CPU hog stresses a configurable number of CPU cores at a configurable load percentage inside one or more Windows EC2 instances for a configurable duration so you can test how Windows-hosted workloads behave when their host is CPU-starved.",
    tags: ['cpu', 'stress', 'windows'],
    category: "aws",
  },
  {
    name: "Windows EC2 memory hog",
    description:
      "Windows EC2 memory hog consumes a configurable amount of memory inside one or more Windows EC2 instances for a configurable duration so you can test how Windows-hosted workloads behave when their host is starved of memory.",
    tags: ['memory', 'stress', 'windows'],
    category: "aws",
  },
  {
    name: "Windows EC2 network latency",
    description:
      "Windows EC2 network latency adds a configurable amount of latency to network traffic destined for specific IPs or hosts on one or more Windows EC2 instances for a configurable duration so you can test how Windows-hosted workloads behave when the network is slow.",
    tags: ['network', 'latency', 'windows'],
    category: "aws",
  },
  {
    name: "Windows EC2 network loss",
    description:
      "Windows EC2 network loss drops a configurable percentage of network packets destined for specific IPs or hosts on one or more Windows EC2 instances for a configurable duration so you can test how Windows-hosted workloads behave when the network is lossy.",
    tags: ['network', 'loss', 'windows'],
    category: "aws",
  },
  {
    name: "Windows EC2 process kill",
    description:
      "Windows EC2 process kill kills one or more processes (selected by PID or process name) on one or more Windows EC2 instances for a configurable duration so you can test how Windows-hosted workloads behave when their backing processes die.",
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