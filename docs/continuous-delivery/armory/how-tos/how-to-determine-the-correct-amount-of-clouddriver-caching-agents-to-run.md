---
title: How to determine the correct amount of Clouddriver Caching Agents to run
---

## Introduction
Having too many Caching Agents running at once with undersized resources can cause performance degradation but having too few can cause situations where items do not get cached at all due to a lack of caching cycles.

This is a basic overview of how to determine the current count of running Caching Agents and identify if the count may be causing performance issues.
Below are the manual steps to execute to accomplish the task. Alternatively, the script at the end of the document can be used instead.

## Prerequisites
* Ability to port-forward the Clouddriver pod - required* Access to the Operator Service Manifest or Halyard config files - optional

## Instructions
 
Determine the number of running Clouddriver replicas from the Spinnaker configuration or via kubectl: 
```NUM_REPLICAS=$(kubectl get deploy spin-clouddriver -o=jsonpath='{.spec.replicas}')```
Port forward the Clouddriver pod and then curl the ```spinsvc``` introspection for the currently running agents:
```NUM_RUNNING_AGENTS=$(curl -k -s -XGET "http://spin-clouddriver:7002/cache/introspection" | jq '.[] | .id' | wc -l)```
Open the ```SpinnakerConfig``` file and locate the ```max-concurrent-agents``` value under ```spec.spinnakerConfig.profiles.clouddriver.sql.agent```.The value should be reviewed.By default, 100 is the set value.  See our [Documentation for more information](https://docs.armory.io/docs/armory-admin/caching-agents-config/#sql-global-caching-agents-configuration).

```
spec:
  spinnakerConfig:
    profiles:
      clouddriver:
        sql:
          agent:
            max-concurrent-agents:
```
Or from the CLI:
```max_concurrent_agents=$(kubectl get spinsvc -o jsonpath={'.items[] .spec.spinnakerConfig.profiles.clouddriver.sql.agent.max-concurrent-agents'})```
Determine how many caching replicas are running via ```kubectl``` or tool of choice.  
```CACHING_AGENTS=$(( NUM_REPLICAS * max-concurrent-agents ))```
For Example, 7 replicas with a ```max-concurrent-agents``` value of 1000 = 7000 caching agents.
```CACHING_UTILIZATION=$(( CACHING_AGENTS / NUM_RUNNING_AGENTS * 100 ))```
* If, after taking a few readings throughout the day, this value is always high (***85%+***), the lack of caching agents may be causing a bottleneck.
These values need to be balanced to ensure optimum performance.
 
### Script
Paste the below script into a file and execute with the following options:
* ```./script.sh``` and provide inputs as requested, or* ```./script   ```

```
Click to expand code
#!/usr/bin/env bash


f_set_vars() {
    ### Variables
    GR='\e[32m'
    RS='\e[0m'

    ### Port-forward variables for svc/spin-clouddriver
    if [ $# -eq 3 ]; then
        SERVICE_NAME="$1"
        NAMESPACE="$2"
        LOCAL_PORT="$3"
    else
        read -p "Enter SERVICE_NAME (default: spin-clouddriver): " INPUT_SERVICE_NAME
        SERVICE_NAME="${INPUT_SERVICE_NAME:-spin-clouddriver}"

        read -p "Enter NAMESPACE (default: spinnaker): " INPUT_NAMESPACE
        NAMESPACE="${INPUT_NAMESPACE:-spinnaker}"

        read -p "Enter LOCAL_PORT (default: 7002): " INPUT_LOCAL_PORT
        LOCAL_PORT="${INPUT_LOCAL_PORT:-7002}"
    fi
}


f_port_fwd() {
    ### Port-forward Clouddriver in the background and get PID
    kubectl port-forward -n ${NAMESPACE} svc/${SERVICE_NAME} ${LOCAL_PORT} & PORT_FORWARD_PID=$!
    echo -e "PORT_FORWARD_PID is: \t[${GR}${PORT_FORWARD_PID}${RS}]"

    ### Allow the port-forward to complete
    sleep 3
}


f_get_val() {
    ### Get current values from Clouddriver
    NUM_REPLICAS=$(kubectl get deploy spin-clouddriver -o=jsonpath='{.spec.replicas}')
    NUM_RUNNING_AGENTS=$(curl -k -s -XGET "http://localhost:7002/cache/introspection" | jq '.[] | .id' | wc -l | xargs)
    concurrent_agents_setting=$(kubectl get spinsvc -o jsonpath='{.items[] .spec.spinnakerConfig.profiles.clouddriver.sql.agent.max-concurrent-agents}')
    max_concurrent_agents=${concurrent_agents_setting:=100}
    CACHING_AGENTS=$(( NUM_REPLICAS * max_concurrent_agents ))

    ### Calculate current utilization
    CACHING_UTILIZATION=$(echo "scale=2; ${CACHING_AGENTS} / ${NUM_RUNNING_AGENTS} * 100" | bc)

    printf "\n˹-----------------------------------˺\n"
    printf "|%-25s %-9s|\n" "Name" "| Value"
    printf "˫-----------------------------------˧\n"
    printf "|%-25s | ${GR}%-7d${RS}|\n" "NUM_REPLICAS" "${NUM_REPLICAS}"
    printf "|%-25s | ${GR}%-7d${RS}|\n" "NUM_RUNNING_AGENTS" "${NUM_RUNNING_AGENTS}"
    #printf "|%-25s | ${GR}%-7d${RS}|\n" "concurrent_agents_setting" "${concurrent_agents_setting}"
    printf "|%-25s | ${GR}%-7d${RS}|\n" "max_concurrent_agents" "${max_concurrent_agents}"
    printf "|%-25s | ${GR}%-7d${RS}|\n" "CACHING_AGENTS" "${CACHING_AGENTS}"
    printf "|%-25s | ${GR}%-7.2f${RS}|\n" "CACHING_UTILIZATION" "${CACHING_UTILIZATION}"
    printf "˻-----------------------------------˼\n"
}


cleanup() {
    ### Cleanup function to kill port-forwarding PID and exit
    # Kill the port-forwarding process
    echo -e "\n\nRemoving port-forwarding for Clouddriver, PID ${GR}${PORT_FORWARD_PID}${RS}\n"
    kill "${PORT_FORWARD_PID}"
    exit
}


f_trap() {
    # Trap signals to ensure cleanup is executed when the script finishes
    trap cleanup INT TERM EXIT
    exit
}


f_set_vars $@
f_port_fwd
f_get_val
f_trap

Execution:
```

