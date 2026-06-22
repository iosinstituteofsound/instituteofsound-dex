#!/bin/bash
set -euo pipefail

APP_DIR="$HOME/Applications/DEX.app"
echo "Removing $APP_DIR"
rm -rf "$APP_DIR"
echo "DEX app removed. Editable source in $HOME/Documents/DEX was preserved."
