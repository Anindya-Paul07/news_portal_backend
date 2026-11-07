#!/usr/bin/env bash
# Repair the local WSL native-Docker/Desktop socket conflict without deleting volumes.
set -euo pipefail

if [[ "$EUID" -ne 0 || $# -ne 1 || ! "$1" =~ ^[0-9a-f]{12,64}$ ]]; then
  echo "Usage: sudo bash scripts/redeploy-native-backend.sh <existing-native-container-id>" >&2
  exit 1
fi

expected_container="$1"
project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"
for executable in docker systemctl curl node; do
  command -v "$executable" >/dev/null
done

# Use the host socket explicitly, regardless of the caller's Docker context.
native_docker=(docker --host unix:///run/docker.sock)
if ! "${native_docker[@]}" inspect "$expected_container" >/dev/null 2>&1; then
  echo "Reopening the native Docker socket. Native containers may briefly restart."
  systemctl restart docker.socket docker.service
fi

if ! "${native_docker[@]}" inspect "$expected_container" >/dev/null 2>&1; then
  echo "Stopped: the socket still does not expose the expected native container." >&2
  echo "Disable Docker Desktop WSL integration for this distro, then rerun this script." >&2
  exit 1
fi

project_name="$("${native_docker[@]}" inspect --format '{{index .Config.Labels "com.docker.compose.project"}}' "$expected_container")"
service_name="$("${native_docker[@]}" inspect --format '{{index .Config.Labels "com.docker.compose.service"}}' "$expected_container")"
original_dir="$("${native_docker[@]}" inspect --format '{{index .Config.Labels "com.docker.compose.project.working_dir"}}' "$expected_container")"
if [[ "$service_name" != app || "$original_dir" != "$project_dir" || -z "$project_name" ]]; then
  echo "Stopped: container Compose labels do not match this project's app service." >&2
  exit 1
fi

compose=("${native_docker[@]}" compose --project-name "$project_name" --file "$project_dir/docker-compose.yml")
"${compose[@]}" config --quiet
"${compose[@]}" build app
"${compose[@]}" up -d --no-deps --force-recreate app
"${compose[@]}" logs --tail=50 app

# Check the host-facing endpoint, not just the container's internal network.
curl --noproxy '*' --fail --silent --show-error --max-time 10 \
  --retry 15 --retry-all-errors --retry-delay 2 \
  http://127.0.0.1:5000/api/v1/articles/garment-sector-unrest |
  node --input-type=module -e '
    let raw = "";
    for await (const chunk of process.stdin) raw += chunk;
    const response = JSON.parse(raw);
    const article = response.data;
    if (!response.success || article?.id !== "85cecc7a-5e56-4629-9934-9588a4764676"
      || !Object.hasOwn(article, "authorName") || !Object.hasOwn(article, "authorPhoto")) {
      console.error("Verification failed: localhost is not returning the expected article with both author fields.");
      process.exit(1);
    }
    console.log(JSON.stringify({ id: article.id, authorName: article.authorName, authorPhoto: article.authorPhoto }, null, 2));
    console.log("Verified: localhost:5000 returns both author fields for the existing article.");
  '
