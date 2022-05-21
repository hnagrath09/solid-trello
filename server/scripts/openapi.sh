#!/bin/hash
set -euo pipefail

CODEGEN_TOOL=$(go env GOPATH)/bin/oapi-codegen
scripts_dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd "$scripts_dir/../oapi-specs"

$CODEGEN_TOOL -package spec "spec.yaml" > "spec.go"