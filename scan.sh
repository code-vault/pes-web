#!/bin/bash

# The name of the file where all the code will be saved
OUTPUT_FILE="project_context.txt"

# Clear the output file to start fresh
> "$OUTPUT_FILE"

echo "Scanning project and gathering context..."

# Find all relevant files, excluding specified directories.
# For each file found, append its path and content to the output file.
find . -path ./node_modules -prune -o \
       -path ./.next -prune -o \
       -path ./.git -prune -o \
       \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "package.json" \) -print | while IFS= read -r file; do
  echo "--- START OF FILE: $file ---" >> "$OUTPUT_FILE"
  cat "$file" >> "$OUTPUT_FILE"
  echo -e "\n--- END OF FILE: $file ---\n\n" >> "$OUTPUT_FILE"
done

echo "✅ Success! Project context has been saved to '$OUTPUT_FILE'."
echo "Please copy the entire content of '$OUTPUT_FILE' and paste it here."