You can observe the status of execution of fault/s of a chaos experiment during its run. The screen shows the experiment pipeline on the right hand side, and details such as **Environment**, **Infrastructure Name**, and the runs that have passed and failed on the left hand side. 

![Experiment Executing](../static/analyze-chaos-experiment/experiment-executing.png)

When the experiment completes execution, it displays the [**Resilience Score**](/docs/chaos-engineering/configure-chaos-experiments/experiments/resilience-score). This score describes how resilient your application is to unplanned failures. 
The **probe success percentage** helps determine the outcome of every fault in the chaos experiment. Probes (if any) associated with the experiment are used to understand how the application fared.

![Experiment Failed](../static/analyze-chaos-experiment/experiment-failed.png)

If any of the faults fail, you can find the **Fail Step** that elaborates on the reason why the fault failed.

![Result Fail Step](../static/analyze-chaos-experiment/result-fail-step.png)
