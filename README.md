comenta esta linea de codigo cuando lo ejecutes en tu sistema
1,671 / 5,000

# LightDM WebKit Greeter Theme - Custom Login

This is a custom theme for LightDM WebKit Greeter, designed with multi-session support, visual theme selection, and real-time visual logs.

## ✨ Features

- User switcher
- Password input with integrated authentication
- Session switcher (GNOME, Plasma, MATE, etc.)
- Visual theme support (`dark`, `light`, `purple`, etc.)
- Configuration sidebar
- Logging of login events
- Compatible with Arch Linux and derivatives

## 📁 Theme structure

```
Lumen/
├── fonts/
├── icons/
│ └── user_1.jpg
├── js/
│ └── mock-lightdm.js
│ └── main.js
├── js/
│ └── fonts.css
│ └── main.css
├── index.html
├── index.theme
├── theme.css
├── settings.js
└── README.md
```

## ⚙️ Installation

You can install this theme with the included script:

```bash
chmod +x install.sh
sudo ./install.sh
```

This will copy the theme to `/usr/share/lightdm-webkit/themes/fransis-greater/` and update the LightDM configuration file to use it.

## 📍 Requirements

- Have `lightdm-webkit2-greeter` installed
- Superuser permissions to move files to `/usr/share`

## 🧪 Test locally (in browser)

You can test the theme in your browser before installing it by commenting out the line:

```html
<!-- <script src="./js/mock-lightdm.js"></script> -->
```

And adding a `lightdm` mock to simulate its behavior in `mock-lightdm.js`.

## 🖼️ Examples

![Screenshot](./images/preview.png)
![Screenshot](./images/image_02.png)
![Screenshot](./images/image_01.png)

---

Developed by [Phownix](https://github.com/Phownix/) – inspired by the simplicity and power of WebKit.
Enviar comentarios
