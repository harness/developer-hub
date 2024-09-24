#!/bin/bash

# File paths
variables_file="variables.txt"  # File with the list of variables
check_file="./permissions-reference.md"     # File to check if the variables exist

# Loop through each line in variables.txt
while IFS= read -r variable; do
  # Check if the variable is present in the second file
  if ! grep -q "$variable" "$check_file"; then
    # If not present, print the variable
    echo "$variable"
  fi
done < "$variables_file"

