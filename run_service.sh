#!/usr/bin/env bash
if [ -n "$1" ]; then
  NODE_ENV=$1
else
  NODE_ENV=development
fi
# Step0. init env (". bash_file.sh" -> preserve the env variable after script)
. init_env.sh $NODE_ENV
echo "PORT: $PORT"  # Add debug statement
# Step1. Install dependencies
yarn
# Step2. Run project under pm2
pm2 startOrReload ecosystem.config.js --env $NODE_ENV --update-env

