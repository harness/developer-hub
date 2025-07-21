#!/bin/bash

# List of files to update
FILES=(
  "/Users/khushisharma/Documents/developer-hub/docs/open-source/gitspaces/ides/clion.md"
  "/Users/khushisharma/Documents/developer-hub/docs/open-source/gitspaces/ides/goland.md"
  "/Users/khushisharma/Documents/developer-hub/docs/open-source/gitspaces/ides/intellij.md"
  "/Users/khushisharma/Documents/developer-hub/docs/open-source/gitspaces/ides/phpstorm.md"
  "/Users/khushisharma/Documents/developer-hub/docs/open-source/gitspaces/ides/pycharm.md"
  "/Users/khushisharma/Documents/developer-hub/docs/open-source/gitspaces/ides/rider.md"
  "/Users/khushisharma/Documents/developer-hub/docs/open-source/gitspaces/ides/rubymine.md"
  "/Users/khushisharma/Documents/developer-hub/docs/open-source/gitspaces/ides/webstorm.md"
)

# Replace the broken link with the correct one in each file
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file"
    sed -i '' 's|/docs/cloud-development-environments/introduction/quickstart-guide|/docs/cloud-development-environments/introduction/quickstart-tutorial|g' "$file"
  else
    echo "File not found: $file"
  fi
done

echo "Link replacement completed!"
