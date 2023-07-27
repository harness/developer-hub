---
title: Writing expressions using any JSON parser tool
description: Learn about the enhanced expressions experience using any JSON parser tool.
sidebar_position: 4
---

To provide you with the best experience when using expressions, Harness has introduced support for writing expressions by using any JSON parser tool. With this enhancement, Harness effectively addresses customer concerns and provides a more user-friendly and adaptable expression engine. These improvements enhance the overall user experience, increase productivity, and empower you to have greater control and customization capabilities in your evaluation processes.

The key enhancements are as follows: 

* **Enhanced expression discovery**: You have the ability to independently determine the expressions associated with a specific step. This empowers you to explore and understand the system better, and thereby reduce reliance on external support.
* **Comprehensive execution JSON**: You can access the execution JSON for all stages or individual steps. This JSON contains detailed information about inputs and outputs for each step within the stage. This lets you analyze and troubleshoot workflows effectively and extract the required information easily.
* **Flexible JSON parsing**: You can utilize any JSON parsing tool of your choice. This gives you the freedom to parse the execution JSON based on your preferred methods and extract the necessary information as per your requirements.
* **JEXL script support**: This enhancement enables you to leverage the full power and flexibility of JEXL expressions, overcoming the limitations of the previous framework. You can now write complex expressions and customize the evaluation process to meet specific needs.

## Limitations

If your step inputs or parameters size is greater than 4 KB, then it cannot be part of your expanded JSON. This is to safeguard your system.

## Obtaining the execution JSON

You can now obtain an execution JSON for all stages or individual steps of your pipeline. 

To access the JSON, you must enable the **Enable JSON Support for expressions** setting first. Go to **Account Settings > Account Resources > Pipeline > Enable JSON Support for expressions**, and then set the value to `true`. 

This setting is turned off by default. Enabling this setting allows you to reference JSON parsers within expressions.

When you create a pipeline, in the execution section, add a Shell Script step to obtain the execution JSON. 

Here's a script that echos the JSON using different built-in expressions for a stage with the Id `Custom`:

```
echo "<+pipeline>: "<+pipeline>

echo "<+pipeline.stages.Custom>: "<+pipeline.stages.Custom>

echo "<+pipeline.stages.Custom.spec.execution>: "<+pipeline.stages.Custom.spec.execution>
```

Here's how you format the output from one of these expressions as JSON:

```
echo "json.format: " <+json.format(<+pipeline.stages.Custom>)>
```

Here's the example's output from the executed step's **Input** tab:

```
"json.format: " {"stepInputs":{"identifier":"Custom","name":"Custom","description":"","variables":{},"tags":{},"type":"Custom","specConfig":{"childNodeID":"6OI2ed5ZQG2bZsPG90Zzwg"}},"status":"RUNNING","spec":{"stepInputs":{"childNodeId":"EIXj-rTPTa2j_un35s5kRQ","logMessage":"Spec Element"},"status":"RUNNING","execution":{"stepInputs":{"childNodeId":"EIXj-rTPTa2j_un35s5kRQsteps","logMessage":"Execution Element"},"status":"RUNNING","steps":{"stepInputs":{"childNodeId":"lN38FF6sQl-tbOw9yf_vEw","logMessage":"Steps Element"},"status":"RUNNING","ShellScript_1":{"status":"SUCCEEDED","outcome":{"output":{"outputVariables":{}}}},"json_format":{"stepInputs":{"identifier":"json_format","name":"json format","timeout":"10m","type":"ShellScript","spec":{"outputVariables":{},"environmentVariables":{},"secretOutputVariables":[],"shell":"Bash","source":{"type":"Inline","spec":{"script":"echo \"json.format: \" {\"stepInputs\":{\"identifier\":\"Custom\",\"name\":\"Custom\",\"description\":\"\",\"variables\":{},\"tags\":{},\"type\":\"Custom\",\"specConfig\":{\"childNodeID\":\"6OI2ed5ZQG2bZsPG90Zzwg\"}},\"status\":\"RUNNING\",\"spec\":{\"stepInputs\":{\"childNodeId\":\"EIXj-rTPTa2j_un35s5kRQ\",\"logMessage\":\"Spec Element\"},\"status\":\"RUNNING\",\"execution\":{\"stepInputs\":{\"childNodeId\":\"EIXj-rTPTa2j_un35s5kRQsteps\",\"logMessage\":\"Execution Element\"},\"status\":\"RUNNING\",\"steps\":{\"stepInputs\":{\"childNodeId\":\"lN38FF6sQl-tbOw9yf_vEw\",\"logMessage\":\"Steps Element\"},\"status\":\"RUNNING\",\"ShellScript_1\":{\"status\":\"SUCCEEDED\",\"outcome\":{\"output\":{\"outputVariables\":{}}}}}}}}"}},"onDelegate":true},"rollbackParameters":{"strategy":"UNKNOWN","strategyToUuid":{"STAGE_ROLLBACK":"Be2PfjljSjiK3DcfWX2lTg_combinedRollback"},"applicableFailureTypes":[]}}}}}}}
```

:::note

When you output the expression in the Shell Script step, the formatting is not strict JSON. Instead, copy the resolved expression from the step's **Input** tab in a pipeline execution. This will give you valid JSON.

:::

For example, consider a pipeline with two stages. In the second stage, add a Shell Script step to obtain the JSON format of first stage: 

`echo <+json.format(<+pipeline.stages.stage1>)>`

In the pipeline execution page, select the **Input** section of the Shell Script step in the second stage, and then copy the JSON.

<docimage path={require('./static/execution-json.png')} width="60%" height="60%" title="Click to view full size image" /> 

## Writing expressions using JSON

Let's see how to extract data from the following sample execution JSON: 

```
{
  "pipeline": {
    "stepInputs": {
      "childNodeID": "ODlBvLAiTF-p_DNVK-27VAstages",
      "name": "JsonSupportExample1",
      "identifier": "JsonSupportExample1",
      "description": "Pipeline to fetch the current status of all stages under matrix.",
      "tags": {},
      "properties": {},
      "variables": {},
      "executionId": "JRdcH8oBTlKwL1CBZOg0PA"
    },
    "status": "SUCCEEDED",
    "stages": {
      "stepInputs": {
        "childNodeId": "yuWDK3OTTOqBr_nsTN4LKQ",
        "logMessage": "Stages"
      },
      "status": "SUCCEEDED",
      "cStage": {
        "stepInputs": {
          "strategyConfig": {
            "matrixConfig": {
              "uuid": "j79RNzfpTBaiRaPrDFN7TQ",
              "axes": {
                "name": {
                  "axisValue": [
                    "john",
                    "doe",
                    "nick"
                  ]
                }
              },
              "expressionAxes": {}
            }
          },
          "childNodeId": "qPnRHHd8TtOwiK400WBNvw",
          "strategyType": "MATRIX",
          "shouldProceedIfFailed": true
        },
        "status": "SUCCEEDED",
        "cStage_0": {
          "identifierPostFix": {
            "value": {},
            "coder": 0,
            "hash": 0
          },
          "iteration": "0",
          "iterations": "3",
          "matrix": {
            "name": "john"
          },
          "repeat": {},
          "stepInputs": {
            "identifier": "cStage_0",
            "name": "cStage_0",
            "description": "",
            "when": {
              "pipelineStatus": "ALL"
            },
            "variables": {},
            "tags": {},
            "type": "Custom",
            "specConfig": {
              "childNodeID": "i6MmJOUeSJi8j_ZmHeZ9YQ"
            }
          },
          "totalIterations": "3",
          "status": "SUCCEEDED",
          "spec": {
            "stepInputs": {
              "childNodeId": "E8ApHWgQQQ-z7Ua3d0Bc6A",
              "logMessage": "Spec Element"
            },
            "status": "SUCCEEDED",
            "execution": {
              "stepInputs": {
                "childNodeId": "E8ApHWgQQQ-z7Ua3d0Bc6Asteps",
                "logMessage": "Execution Element"
              },
              "status": "SUCCEEDED",
              "steps": {
                "stepInputs": {
                  "childNodeId": "MrayhGS3RhiAWtPHaIG5vg",
                  "logMessage": "Steps Element"
                },
                "status": "SUCCEEDED",
                "ShellScript_1": {
                  "stepInputs": {
                    "identifier": "ShellScript_1",
                    "name": "ShellScript_1",
                    "timeout": "10m",
                    "type": "ShellScript",
                    "spec": {
                      "outputVariables": {},
                      "environmentVariables": {},
                      "secretOutputVariables": [],
                      "shell": "Bash",
                      "source": {
                        "type": "Inline",
                        "spec": {
                          "script": "echo \"My number is: 0\""
                        }
                      },
                      "onDelegate": true
                    },
                    "rollbackParameters": {
                      "strategy": "UNKNOWN",
                      "strategyToUuid": {
                        "STAGE_ROLLBACK": "yuWDK3OTTOqBr_nsTN4LKQ_combinedRollback"
                      },
                      "applicableFailureTypes": []
                    }
                  },
                  "status": "SUCCEEDED",
                  "outcome": {
                    "output": {
                      "outputVariables": {}
                    }
                  }
                }
              }
            }
          }
        },
        "cStage_2": {
          "identifierPostFix": {
            "value": {},
            "coder": 0,
            "hash": 0
          },
          "iteration": "2",
          "iterations": "3",
          "matrix": {
            "name": "nick"
          },
          "repeat": {},
          "stepInputs": {
            "identifier": "cStage_2",
            "name": "cStage_2",
            "description": "",
            "when": {
              "pipelineStatus": "ALL"
            },
            "variables": {},
            "tags": {},
            "type": "Custom",
            "specConfig": {
              "childNodeID": "i6MmJOUeSJi8j_ZmHeZ9YQ"
            }
          },
          "totalIterations": "3",
          "status": "SUCCEEDED",
          "spec": {
            "stepInputs": {
              "childNodeId": "E8ApHWgQQQ-z7Ua3d0Bc6A",
              "logMessage": "Spec Element"
            },
            "status": "SUCCEEDED",
            "execution": {
              "stepInputs": {
                "childNodeId": "E8ApHWgQQQ-z7Ua3d0Bc6Asteps",
                "logMessage": "Execution Element"
              },
              "status": "SUCCEEDED",
              "steps": {
                "stepInputs": {
                  "childNodeId": "MrayhGS3RhiAWtPHaIG5vg",
                  "logMessage": "Steps Element"
                },
                "status": "SUCCEEDED",
                "ShellScript_1": {
                  "stepInputs": {
                    "identifier": "ShellScript_1",
                    "name": "ShellScript_1",
                    "timeout": "10m",
                    "type": "ShellScript",
                    "spec": {
                      "outputVariables": {},
                      "environmentVariables": {},
                      "secretOutputVariables": [],
                      "shell": "Bash",
                      "source": {
                        "type": "Inline",
                        "spec": {
                          "script": "echo \"My number is: 2\""
                        }
                      },
                      "onDelegate": true
                    },
                    "rollbackParameters": {
                      "strategy": "UNKNOWN",
                      "strategyToUuid": {
                        "STAGE_ROLLBACK": "yuWDK3OTTOqBr_nsTN4LKQ_combinedRollback"
                      },
                      "applicableFailureTypes": []
                    }
                  },
                  "status": "SUCCEEDED",
                  "outcome": {
                    "output": {
                      "outputVariables": {}
                    }
                  }
                }
              }
            }
          }
        },
        "cStage_1": {
          "identifierPostFix": {
            "value": {},
            "coder": 0,
            "hash": 0
          },
          "iteration": "1",
          "iterations": "3",
          "matrix": {
            "name": "doe"
          },
          "repeat": {},
          "stepInputs": {
            "identifier": "cStage_1",
            "name": "cStage_1",
            "description": "",
            "when": {
              "pipelineStatus": "ALL"
            },
            "variables": {},
            "tags": {},
            "type": "Custom",
            "specConfig": {
              "childNodeID": "i6MmJOUeSJi8j_ZmHeZ9YQ"
            }
          },
          "totalIterations": "3",
          "status": "SUCCEEDED",
          "spec": {
            "stepInputs": {
              "childNodeId": "E8ApHWgQQQ-z7Ua3d0Bc6A",
              "logMessage": "Spec Element"
            },
            "status": "SUCCEEDED",
            "execution": {
              "stepInputs": {
                "childNodeId": "E8ApHWgQQQ-z7Ua3d0Bc6Asteps",
                "logMessage": "Execution Element"
              },
              "status": "SUCCEEDED",
              "steps": {
                "stepInputs": {
                  "childNodeId": "MrayhGS3RhiAWtPHaIG5vg",
                  "logMessage": "Steps Element"
                },
                "status": "SUCCEEDED",
                "ShellScript_1": {
                  "stepInputs": {
                    "identifier": "ShellScript_1",
                    "name": "ShellScript_1",
                    "timeout": "10m",
                    "type": "ShellScript",
                    "spec": {
                      "outputVariables": {},
                      "environmentVariables": {},
                      "secretOutputVariables": [],
                      "shell": "Bash",
                      "source": {
                        "type": "Inline",
                        "spec": {
                          "script": "echo \"My number is: 1\""
                        }
                      },
                      "onDelegate": true
                    },
                    "rollbackParameters": {
                      "strategy": "UNKNOWN",
                      "strategyToUuid": {
                        "STAGE_ROLLBACK": "yuWDK3OTTOqBr_nsTN4LKQ_combinedRollback"
                      },
                      "applicableFailureTypes": []
                    }
                  },
                  "status": "SUCCEEDED",
                  "outcome": {
                    "output": {
                      "outputVariables": {}
                    }
                  }
                }
              }
            }
          }
        }
      },
      "fetchStatusOfPreviousStage": {
        "stepInputs": {
          "identifier": "fetchStatusOfPreviousStage",
          "name": "fetchStatusOfPreviousStage",
          "description": "",
          "variables": {},
          "tags": {},
          "type": "Custom",
          "specConfig": {
            "childNodeID": "D1eqrqccQHK6YBlqiS51Gw"
          }
        },
        "status": "SUCCEEDED",
        "spec": {
          "stepInputs": {
            "childNodeId": "onyg3VaMTj-X6LmB0m4zIg",
            "logMessage": "Spec Element"
          },
          "status": "SUCCEEDED",
          "execution": {
            "stepInputs": {
              "childNodeId": "onyg3VaMTj-X6LmB0m4zIgsteps",
              "logMessage": "Execution Element"
            },
            "status": "SUCCEEDED",
            "steps": {
              "stepInputs": {
                "childNodeId": "g0fF-nfVRGWD7rmVH-RJEg",
                "logMessage": "Steps Element"
              },
              "status": "SUCCEEDED",
              "ShellScript_1": {
                "stepInputs": {
                  "identifier": "ShellScript_1",
                  "name": "ShellScript_1",
                  "timeout": "10m",
                  "type": "ShellScript",
                  "spec": {
                    "outputVariables": {},
                    "environmentVariables": {},
                    "secretOutputVariables": [],
                    "shell": "Bash",
                    "source": {
                      "type": "Inline",
                      "spec": {
                        "script": "t=\"[]\"\necho $t"
                      }
                    },
                    "onDelegate": true
                  },
                  "rollbackParameters": {
                    "strategy": "UNKNOWN",
                    "strategyToUuid": {
                      "STAGE_ROLLBACK": "A31KTBUdTja1KanfnDrtGQ_combinedRollback"
                    },
                    "applicableFailureTypes": []
                  }
                },
                "status": "SUCCEEDED",
                "outcome": {
                  "output": {
                    "outputVariables": {}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

You can retrieve specific chunks of data from the sample JSON above by locating the corresponding path. For example, to access the status of a combination within the matrix named `cStage1`, use the following expression: 

`pipeline.stages.cStage.cStage_0.status`

You can easily determine the complete expression for any desired data by traversing the JSON. 

Here are a few considerations to keep in mind when constructing such expressions. By following these guidelines, you can easily construct expressions to fetch the desired JSON data without using complex and lengthy paths.

* The full path, starting from the `pipeline` always works as a reference point.
* Fields like `stepInputs` and `outcome` can be ignored when constructing the full path.
* Relative paths can also be used by identifying the common parent between the step or stage you want to refer and the step or stage where the reference is made.
* Begin the expression from the common parent. For example, in the given expression, if you want to refer to the status of `CStage_0` from `CStage_1`, use the expression, `cStage.cStage_0.status`. This approach allows you to avoid constructing the full name each time.

## Writing complex expressions using JQ

JQ is a lightweight, powerful command-line tool specifically designed for JSON processing in Bash. It provides a wide range of features for querying, filtering, and transforming JSON data. JQ can be easily integrated into Bash scripts and can be used to extract specific values or perform complex JSON operations.

Make sure that the following requirements are met to use JQ: 

* Your Harness Delegate should support JQ if you are using a shell script step. For more details, go to [How to install JQ on Ubuntu](https://www.golinuxcloud.com/ubuntu-install-jq/).
  
  <details>
  <summary>Install JQ on Harness Delegate</summary>

  1. Open the `delegate.yaml` in a text editor.
  2. Locate the environment variable `INIT_SCRIPT` in the `Deployment` object.
   
     ```
     - name: INIT_SCRIPT  
     value: ""  
     ```
  3. Replace `value: ""` with the following script to install JQ.
     
     ```
     - name: INIT_SCRIPT  
     value: |
      apt install software-properties-common -y
      apt install python-software-properties -y
      add-apt-repository ppa:rmescandon/yq
      apt update
      apt install yq -y
      apt-get install jq -y
     ```

  </details>   
   
* Your image should support JQ if you are using a container step.

Let's consider the following sample pipeline YAML to develop expressions for some complex use cases: 

```
pipeline:
  name: JsonSupportExample1
  identifier: JsonSupportExample1
  projectIdentifier: DoNotDelete_Sahil
  orgIdentifier: default
  description: Pipeline to fetch the current status of all stages under matrix.
  tags: {}
  stages:
  - stage:
        name: stepWithMatrix
        identifier: stepWithMatrix
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: ShellScript_1
                  identifier: ShellScript_1
                  timeout: 10m
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: |
                          echo "My number is: <+strategy.iteration>"
                    environmentVariables: []
                    outputVariables: []
                  strategy:
                    matrix:
                      name:
                        - john
                        - doe
                        - nick
        tags: {}
        when:
          pipelineStatus: All
    - stage:
        name: stageWithMatrix
        identifier: stageWithMatrix
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: ShellScript_1
                  identifier: ShellScript_1
                  timeout: 10m
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: |
                          echo "My number is: <+strategy.iteration>"
                    environmentVariables: []
                    outputVariables: []
        tags: {}
        when:
          pipelineStatus: All
        strategy:
          matrix:
            name:
              - john
              - doe
              - nick
        tags: {}

```

### Fetch the status of all combinations of stage named `stageWithMatrix`

Use the following expression to fetch the status of all combinations of stage named `stageWithMatrix`:

```
t='<+json.format(<+pipeline.stages.stageWithMatrix>)>'
echo $t | jq '(. | to_entries[] | select(.key | startswith("stageWithMatrix")) |  .value.status)'
```
### Fetch the status of all identifiers of a step in a stage named `stageWithMatrix`

Use the following expression to fetch the status of all identifiers of a step in a stage named `stageWithMatrix`: 

```
t='<+json.format(<+pipeline.stages.stageWithMatrix>)>'
echo $t | jq '(. | to_entries[] | select(.key | startswith("stageWithMatrix")) | .value.spec.execution.steps | keys[] |  select(.| IN("status", "stepInputs")| not))'
```

### Fetch the status of all combinations of a step named `ShellScript_1`

Use the following expression to fetch the status of all combinations of a step named `ShellScript_1`:

```
t='<+json.format(<+pipeline.stages.stepWithMatrix.spec.execution.steps.ShellScript_1>)>'
echo $t | jq '(. | to_entries[] | select(.key | startswith("ShellScript_1")) | .value.status)'
```

## Writing complex expressions using JEXL

By introducing script support, Harness enables you to define functions, utilize loops, and incorporate IF conditions within your expressions. This expanded functionality empowers you to handle more complex logic and perform advanced operations.

### Fetch the status of all combinations of a stage named `stageWithMatrix`

Consider the following example expression: 

```
<+ var traverse = function(key) {
                      var stages = [...];
                      for(stage: key.entrySet()) 
                      {
                          if (stage.key.startsWith('stageWithMatrix'))
                              stages.add(stage.value);
                      }
                      var statuses=[...];
                      for(stage1:stages) { 
                         statuses.add(stage1.status)
                      }
                      statuses
                      };
                                                            
  traverse(<+pipeline.stages.stageWithMatrix>)>
                                                        >
```

This script defines a `traverse` function that takes a parameter called `key`. Within the function, there are several operations performed:

* Initialization: The `stages` array is created, which holds the extracted stages. It is initially empty.
* Loop: The script loops through each entry in the key object using the `for(stage: key.entrySet())` syntax. This loop iterates over each key-value pair in the key object.
* Condition: Within the loop, there is an IF condition, `if (stage.key.startsWith('stageWithMatrix'))`. It checks if the key of the current stage starts with the string `stageWithMatrix`.
* Stage extraction: If the condition is TRUE, the current stage value is added to the stages array using `stages.add(stage.value)`.
* Status extraction: After extracting the relevant stages, a new array called `statuses` is created.
* Nested loop: The script loops through each stage in the `stages` array using the `for(stage1:stages)` syntax.
* Status addition: Within the nested loop, the `spec.execution.status` value of each stage is extracted and added to the `statuses` array using `statuses.add(stage1.status)`.
* Return: Finally, the function returns the `statuses` array.

The script concludes by invoking the traverse function with the argument, `<+pipeline.stages.cStage>`. This argument represents the starting point for the traversal, where the `pipeline.stages.cStage` object is passed as the key.

This script performs a traversal and extraction operation on a data structure represented by the key parameter. It extracts stages that start with `stageWithMatrix` and collects their corresponding `.status` values into the `statuses` array.

### Fetch the status of all combinations of a step named `ShellScript_1`

Consider the following example expression: 

```
<+ var traverse = function(key) {
                      var stages = [...];
                      for(stage: key.entrySet()) 
                      {
                          if (stage.key.startsWith('ShellScript_1'))
                              stages.add(stage.value);
                      }
                      var statuses=[...];
                      for(stage1:stages) { 
                         statuses.add(stage1.status)
                      }
                      statuses
                      };
                                                            
  traverse(<+pipeline.stages.stepWithMatrix.spec.execution.steps.ShellScript_1>)>
```
This script defines a `traverse` function that takes a parameter called `key`. Within the function, there are several operations performed:

* Initialization: The `stages` array is created, which holds the extracted stages. It is initially empty.
* Loop: The script loops through each entry in the key object using the `for(stage: key.entrySet())` syntax. This loop iterates over each key-value pair in the key object.
* Condition: Within the loop, there is an IF condition, `if (stage.key.startsWith('stageWithMatrix'))`. It checks if the key of the current stage starts with the string `stageWithMatrix`.
* Stage extraction: If the condition is TRUE, the current stage value is added to the stages array using `stages.add(stage.value)`.
* Status extraction: After extracting the relevant stages, a new array called `statuses` is created.
* Nested loop: The script loops through each stage in the `stages` array using the `for(stage1:stages)` syntax.
* Status addition: Within the nested loop, the `spec.execution.status` value of each stage is extracted and added to the `statuses` array using `statuses.add(stage1.status)`.
* Return: Finally, the function returns the `statuses` array.

The script concludes by invoking the traverse function with the argument, `<+pipeline.stages.stepWithMatrix.spec.execution.steps.ShellScript_1>`. This argument represents the starting point for the traversal, where the specific stage `(ShellScript_1)` within the given pipeline structure is passed as the key.

This script performs a traversal and extraction operation on a data structure represented by the key parameter. It filters stages that start with the string `ShellScript_1` and collects their corresponding status values into the statuses array.


### Defining functions

Define functions by using the `function` keyword in JEXL. For example: 

```
<+
var numbers = [1, 2, 3, 4, 5];
var sum = 0;

for (var i = 0; i < numbers.length; i++) {
  sum = sum + numbers[i];
}

sum;
>
```

The above JEXL script defines a function called `identityFunction` that takes a parameter key. Inside the function, the expression returns the value of the key parameter.

The function `identityFunction` is used to retrieve the value of a specific key. In the given example, the function is invoked with the argument `keyName`. As a result, the function returns the value `keyName` itself. The `identityFunction` serves as a straightforward identity function where the input value is directly returned as the output.

### Defining loops

Here's an example that demonstrates how you can use a loop in JEXL to iterate over an array or perform repetitive operations based on certain conditions: 

```
<+
var numbers = [1, 2, 3, 4, 5];
var sum = 0;

for (var i = 0; i < numbers.length; i++) {
  sum = sum + numbers[i];
}

sum;
>
```

This example uses an array called `numbers` containing several integer values. A variable called sum to 0 is initialized. The FOR loop iterates over each element in the number array. Within the loop, you can add each element to the sum variable After the loop completes, the script outputs the value of sum, which will be the sum of all the numbers in the array.

### Using IF conditions

Here's an example that demonstrated how you can use an IF condition in JEXL to perform different actions or display different results based on certain conditions or criteria.

```
<+var age = 18;

if (age >= 18) {
  "You are an adult";
} else {
  "You are not yet an adult";
}
>
```

This example uses a variable called `age` of value 18. The IF condition checks if the age is greater than or equal to 18. If the condition evaluates to TRUE, the script outputs the message, `You are an adult`. Otherwise, it outputs the message `You are not yet an adult`.
