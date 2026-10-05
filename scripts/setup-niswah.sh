#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VENDOR_DIR="$ROOT_DIR/vendor/niswah-app"

mkdir -p "$ROOT_DIR/vendor"

if [ ! -d "$VENDOR_DIR/.git" ]; then
  git clone --branch showcase-exact-ui --single-branch https://github.com/rayan2099/niswah999.git "$VENDOR_DIR"
else
  git -C "$VENDOR_DIR" fetch origin showcase-exact-ui
  git -C "$VENDOR_DIR" checkout showcase-exact-ui
  git -C "$VENDOR_DIR" pull --ff-only origin showcase-exact-ui
fi

cd "$VENDOR_DIR"
npm install --legacy-peer-deps
