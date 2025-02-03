#!/bin/sh

# Change to parent directory
cd ../websites

# Save the current directory
parent_dir=$(pwd)

# Loop through each subdirectory
for dir in */
do
  # Change to subdirectory
  cd "$dir"
  
  # Run the script
  sh start_server.sh
  
  # Change back to the parent directory
  cd "$parent_dir"
done
