<details>
<summary>Early access feature: Multi-line Output Variables</summary>
- **Multiline Output Variables**: CI steps support multiline output variables, including special characters such as `\n`, `\t`, `\r`, `\b`, maintaining shell-like behavior.  
- **Complete Output Support**: Output variables support both output secrets and output strings.  
- **JSON Preservation**: JSON data can be passed as-is without automatic minification.  
- **Increased Output Variable Capacity**: The maximum output variable size is approximately **131,072 characters**, up from 65,536.  

#### Technical Limitations  
- The **maximum size** of output variables is constrained by the operating system's `ARG_MAX` parameter, which limits command line arguments and environment variables.  
- Exceeding this limit will result in the error:  
  ```shell
  fork/exec /bin/sh: argument list too long
  ```  
- This limitation is imposed by the operating system, not by the implementation of this feature.  

#### Behavior Changes: Current vs. New  
The following table outlines changes in how special characters are handled in output variables:  

| Command             | Current Behavior | New Behavior |
|---------------------|-----------------|-------------|
| `export out="\b"`  | `"\b"`           | Backspace   |
| `export out="\f"`  | `"\f"`           | Form feed   |
| `export out="\n"`  | `"\n"`           | Newline character |
| `export out="\r"`  | `"\r"`           | Carriage return |
| `export out="\t"`  | `"\t"`           | Tab character |
| `export out="\v"`  | `"\v"`           | Vertical tab |

#### Best Practices  

**Python Shell**  
For multiline strings in Python, use triple quotes (`"""` or `'''`) to maintain formatting properly.  

**Step 1:** Export an output variable:  
```python
out = """line1,
line2,
line3"""
os.environ["out"] = out
```  

**Step 2:** Read the output variable:  
```python
str_value = """<+execution.steps.Step_name.output.outputVariables.out>"""
```  

**PowerShell**  
For PowerShell, use the `@"..."@` syntax to handle multiline strings effectively.  

**Step 1:** Export an output variable:  
```powershell
$out=@"
line1,
line2,
line3
"@
$env:out = $out
```  

**Step 2:** Read the output variable:  
```powershell
$str_value = @"
<+execution.steps.Step_name.output.outputVariables.out>
"@
```  

These best practices ensure proper handling of multiline strings across different environments while maintaining consistency in CI workflows.
</details>