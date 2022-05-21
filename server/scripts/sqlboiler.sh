#!/bin/hash
set -euo pipefail

# Change working directory to the script's location
cd "${0%/*}"

sqlboiler -c ../db-api/sqlboiler.toml psql