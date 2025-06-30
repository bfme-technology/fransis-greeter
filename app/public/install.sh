#!/bin/bash

THEME_NAME="fransis-Greater"
DEST_DIR="/usr/share/lightdm-webkit/themes/$THEME_NAME"
SETTINGS_FILE="./settings.js"
CONFIG_FILE="/etc/lightdm/lightdm-webkit2-greeter.conf"

echo "🛠 Fransis Greater Theme Installer"

# Detect system values
DEFAULT_USER=$(awk -F: '($3>=1000)&&($1!="nobody")&&($1!="root"){print $1; exit}' /etc/passwd)
[ -z "$DEFAULT_USER" ] && DEFAULT_USER=$(ls /home | head -n 1)
DEFAULT_USER=${DEFAULT_USER:-user}
DEFAULT_SESSION=$(ls /usr/share/xsessions | head -n 1 | cut -d '.' -f1)
SYSTEM_NAME=$(hostnamectl | grep "Operating System" | cut -d ':' -f2- | xargs)

# Prompt for theme
echo "🎨 Available themes: dark, marine, light, purple"
read -p "Choose a default theme [dark]: " USER_THEME
USER_THEME=${USER_THEME:-dark}

# Prompt for language
read -p "Choose language code (en/es/fr...) [en]: " LANG_CODE
LANG_CODE=${LANG_CODE:-en}

# Create settings.js
cat > "$SETTINGS_FILE" <<EOF
window.default_settings = {
    theme: "$USER_THEME",
    language: "$LANG_CODE",
    system: "$SYSTEM_NAME",
    fallback_session: "$DEFAULT_SESSION",
    startup_user: "$DEFAULT_USER",
    themes: ["dark", "light", "purple"]
};
EOF

echo "✅ settings.js created with:"
cat "$SETTINGS_FILE"

# Install theme
echo "📦 Installing to $DEST_DIR"
sudo mkdir -p "$DEST_DIR"
sudo cp -r . "$DEST_DIR"

# Update LightDM config
if grep -Eq "^\\s*webkit[_-]theme\\s*=\\s*" "$CONFIG_FILE"; then
    sudo sed -i "s/^\\s*webkit[_-]theme\\s*=\\s*.*/webkit_theme = $THEME_NAME/" "$CONFIG_FILE"
else
    echo "[greeter]" | sudo tee -a "$CONFIG_FILE" > /dev/null
    echo "webkit_theme = $THEME_NAME" | sudo tee -a "$CONFIG_FILE" > /dev/null
fi

echo "✅ Theme installed. Restart LightDM to apply:"
echo "   sudo systemctl restart lightdm"
