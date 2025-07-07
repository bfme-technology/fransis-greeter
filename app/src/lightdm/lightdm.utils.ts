import { LightDMUser } from "./lightdm.types";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const monthsFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// const themeAvailable = window.default_settings.themes || ['dark', 'light'];
export let currentSession =
  window.default_settings.fallback_session ||
  window.lightdm.default_session ||
  window.lightdm.sessions[0].key;
export let currentTheme = window.default_settings.theme || "dark";
export let currentLanguage = window.default_settings.language || "en";
export let currentSystem = window.default_settings.system || "Linux System";
export let currentUsername = null;
export let waitingForPassword = false;

export function openSettings() {
  const settingsPanel = document.getElementById("settings_panel");
  if (!settingsPanel) {
    console.error("Settings panel not found");
    return;
  }
  // Toggle the visibility of the settings panel
  settingsPanel.classList.toggle("show_settings");
}

export function userCard(user: LightDMUser) {
  const usr_name = document.getElementById(
    "usr_selected"
  ) as HTMLInputElement | null;
  const urs_name_display: HTMLSpanElement | null =
    document.getElementById("urs_name_display");
  const urs_image = document.getElementById("urs_image");
  if (urs_image && !(urs_image instanceof HTMLImageElement)) {
    console.error("Element with id 'urs_image' is not an HTMLImageElement");
    return;
  }
  const button = document.createElement("button");
  const img = document.createElement("img");
  const span = document.createElement("span");

  button.classList.add("user");
  img.src = user.image || "icons/user_1.jpg";
  span.innerText = user.display_name;

  button.onclick = () => {
    window.show_prompt(`User ${user.name} begins authentication`, "SELECT");
    if (window.lightdm.authentication_user) {
      window.lightdm.cancel_authentication();
    }

    if (usr_name) {
      usr_name.value = user.name;
    }
    if (urs_image) {
      urs_image.src = user.image || "icons/user_1.jpg";
    }
    if (urs_name_display) {
      urs_name_display.innerText = user.display_name;
    }

    window.lightdm.authenticate(user.name);
    pageShow();
  };

  button.appendChild(img);
  button.appendChild(span);
  return button;
}

export function sessionCard(session: { key: string; name: string }) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const span = document.createElement("span");

  label.classList.add("session_item");
  label.setAttribute("for", session.key);
  input.id = session.key;
  input.name = "session";
  input.type = "radio";
  input.checked = currentSession === session.key;
  input.value = session.key;
  span.innerText = session.name;

  input.onchange = () => {
    currentSession = session.key;
    console.log(currentSession);
  };

  label.appendChild(input);
  label.appendChild(span);
  return label;
}

export function themeCard(theme: string) {
  const button = document.createElement("button");
  const bg = document.createElement("div");
  const sf = document.createElement("div");
  const fg = document.createElement("div");
  const ac = document.createElement("div");

  button.title = theme;
  button.className = `theme_preview ${theme}`;
  if (currentTheme === theme) button.classList.add("active");

  bg.classList.add("background");
  sf.classList.add("surface");
  fg.classList.add("foreground");
  ac.classList.add("accent");

  button.onclick = () => {
    document
      .querySelectorAll(".theme_preview")
      .forEach((e) => e.classList.remove("active"));
    button.classList.add("active");
    currentTheme = theme;
    document.body.className = theme;
  };

  button.append(bg, sf, fg, ac);
  return button;
}

export function pageShow() {
  const major = document.querySelector(".major");
  const entry = document.querySelector(".entry_page");
  if (!major || !entry) {
    console.error("Major or entry page element not found");
    return;
  }
  const isHidden = major.classList.contains("hide");

  if (isHidden) {
    major.classList.replace("hide", "show");
    entry.classList.replace("hide", "show");
  } else {
    major.classList.replace("show", "hide");
    entry.classList.replace("show", "hide");
  }
}

document.addEventListener("keydown", (e) => {
  const isMajorVisible = document
    .querySelector(".major")
    ?.classList.contains("show");
  const isEntryVisible = document
    .querySelector(".entry_page")
    ?.classList.contains("hide");
  const isSettingsVisible = document
    .getElementById("settings_panel")
    ?.classList.contains("show_settings");

  if (e.code === "Space") {
    e.preventDefault();
    console.log(e.code);

    if (isMajorVisible) {
      // Buscar usuario por defecto
      let user =
        window.lightdm.users.find(
          (u: LightDMUser) => u.name === window.default_settings.startup_user
        ) || window.lightdm.users[0];

      if (user) {
        window.show_prompt(
          `Hotkey: Default user selected: ${user.name}`,
          "HOTKEY"
        );
        if (window.lightdm.authentication_user)
          window.lightdm.cancel_authentication();

        currentUsername = user.name;

        const usrSelected = document.getElementById(
          "usr_selected"
        ) as HTMLInputElement | null;
        if (usrSelected) {
          usrSelected.value = user.name;
        }
        const ursImage = document.getElementById(
          "urs_image"
        ) as HTMLImageElement | null;
        if (ursImage) {
          ursImage.src = user.image || "icons/user_1.jpg";
        }
        const ursNameDisplay = document.getElementById("urs_name_display");
        if (ursNameDisplay) {
          ursNameDisplay.innerText = user.display_name;
        }
        setTimeout(() => {
          document.getElementById("usr_password")?.focus();
        }, 800);
        window.lightdm.authenticate(user.name);

        pageShow();
      }
    }
  }

  if (e.code === "Escape") {
    e.preventDefault();

    if (window.lightdm.authentication_user) {
      window.lightdm.cancel_authentication();
      const usrPasswordInput = document.getElementById(
        "usr_password"
      ) as HTMLInputElement | null;
      if (usrPasswordInput) {
        usrPasswordInput.value = "";
      }
      window.show_prompt("Hotkey: Authentication canceled", "HOTKEY");
    }

    if (isSettingsVisible) {
      openSettings(); // toggles
    }

    if (isEntryVisible) {
      pageShow(); // toggles
    }
  }
});

export function showMessage(text: string) {
  const msgEl = document.getElementById("status-message");
  if (!msgEl) {
    console.error("Status message element not found");
    return;
  }
  msgEl.textContent = text;
  msgEl.style.opacity = "1";
  setTimeout(() => {
    msgEl.style.opacity = "0";
  }, 3000);
}

export function onLoginSuccess(username: string) {
  showMessage(`Welcome, ${username}!`);
  // Proceed with login
}

export function onLogoff(username: string) {
  showMessage(`Goodbye, ${username}!`);
  // Optional: lightdm.logout();
}
