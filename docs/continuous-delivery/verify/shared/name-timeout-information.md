1. In **Name**, enter a name for the Verification step.
   
2. In **Timeout**, enter a timeout value for the step. Harness uses this information to time out the verification. Use the following syntax to a define timeout:
   - **w** for weeks.
   - **d** for days.
   - **h** for hours.
   - **m** for minutes.
   - **s** for seconds.
   - **ms** for milliseconds.

   For example, use 1w for one week, 7d for 7 days, 24h for 24 hours, 100m for 100 minutes, 500s for 500 seconds, and 1000ms for 1000 milliseconds.
   
   The maximum timeout value you can set is **53w**. You can also set timeouts at the pipeline level.