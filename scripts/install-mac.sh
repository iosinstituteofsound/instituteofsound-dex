#!/bin/bash
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
INSTALL_DIR="$HOME/Documents/DEX"
APP_DIR="$HOME/Applications/DEX.app"
BUILD_DIR="$SOURCE_DIR/.build"
ICONSET="$BUILD_DIR/DEX.iconset"
export CLANG_MODULE_CACHE_PATH="$BUILD_DIR/clang-cache"
export SWIFT_MODULE_CACHE_PATH="$BUILD_DIR/swift-cache"

echo "Installing editable DEX source → $INSTALL_DIR"
mkdir -p "$INSTALL_DIR" "$HOME/Applications" "$BUILD_DIR"
rsync -a --delete \
  --exclude ".build" \
  --exclude ".git" \
  "$SOURCE_DIR/" "$INSTALL_DIR/"

echo "Building native Mac launcher..."
rm -rf "$APP_DIR" "$ICONSET"
mkdir -p "$APP_DIR/Contents/MacOS" "$APP_DIR/Contents/Resources/web" "$ICONSET"

swiftc "$SOURCE_DIR/macos/DEXApp.swift" \
  -framework Cocoa \
  -framework WebKit \
  -framework QuartzCore \
  -o "$APP_DIR/Contents/MacOS/DEX"

cp "$SOURCE_DIR/macos/Info.plist" "$APP_DIR/Contents/Info.plist"
cp -R "$SOURCE_DIR/public/." "$APP_DIR/Contents/Resources/web/"

swift "$SOURCE_DIR/macos/make-icon.swift" "$BUILD_DIR/icon_1024x1024.png"
for size in 16 32 128 256 512; do
  sips -z "$size" "$size" "$BUILD_DIR/icon_1024x1024.png" --out "$ICONSET/icon_${size}x${size}.png" >/dev/null
  double=$((size * 2))
  sips -z "$double" "$double" "$BUILD_DIR/icon_1024x1024.png" --out "$ICONSET/icon_${size}x${size}@2x.png" >/dev/null
done
iconutil -c icns "$ICONSET" -o "$APP_DIR/Contents/Resources/DEX.icns"
codesign --force --deep --sign - "$APP_DIR" >/dev/null

echo
echo "DEX installed."
echo "App:    $APP_DIR"
echo "Source: $INSTALL_DIR"
echo
echo "Open the app from Finder → Applications, or run:"
echo "open \"$APP_DIR\""
