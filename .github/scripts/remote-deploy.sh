#!/usr/bin/env bash
# Runs on the GCP server via SSH. Expects GH_PAT, GH_ACTOR, IMAGE env vars
# to already be set by the caller (see deploy.yml).
set -euo pipefail

echo "$GH_PAT" | docker login ghcr.io -u "$GH_ACTOR" --password-stdin

docker pull "$IMAGE"

docker stop my-next-app || true
docker rm my-next-app || true

docker run -d \
  --name my-next-app \
  --restart always \
  -p 3015:3015 \
  "$IMAGE"

docker image prune -f
