const months = [
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
const monthsFull = [
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
let currentSession =
  window.default_settings.fallback_session ||
  lightdm.default_session ||
  lightdm.sessions[0].key;
let currentTheme = window.default_settings.theme || "dark";
let currentLanguage = window.default_settings.language || "en";
let currentSystem = window.default_settings.system || "Linux System";
let currentUsername = null;
let waitingForPassword = false;

window.onload = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const hour = document.getElementById("_hour");
  const date = document.getElementById("_date");
  const userList = document.getElementById("user-list");
  const sessionList = document.getElementById("session-list");
  const themeList = document.getElementById("theme-list");

  document.body.className = currentTheme;
  document.getElementById("loader").style.opacity = 0;
  document.getElementById("_system").innerText = currentSystem;
  document.getElementById("_language").innerText = currentLanguage;
  document.getElementById("_actualZone").innerText = timezone;

  lightdm.users.forEach((user) => userList.appendChild(userCard(user)));
  lightdm.sessions.forEach((session) =>
    sessionList.appendChild(sessionCard(session))
  );
  // themeAvailable.forEach(theme => themeList.appendChild(themeCard(theme)));

  setInterval(() => {
    const now = new Date();
    hour.innerText = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    date.innerText = `${now.getDate()} ${
      months[now.getMonth()]
    }, ${now.getFullYear()}`;
  }, 1000);

  setTimeout(
    () => (document.getElementById("loader").style.display = "none"),
    300
  );
};

window.handle_input = function () {
  const password = document.getElementById("usr_password").value;
  document.getElementById("error").textContent = "";

  show_prompt(`Starting login for user ${currentUsername}`, "LOGIN");
  lightdm.respond(password);
};

window.show_prompt = function (text, type) {
  waitingForPassword = true;
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;
  document.getElementById(
    "prompt"
  ).innerHTML += `<p><span>${type} [${time}]</span>: ${text}</p><br/>`;
};

window.authentication_complete = function () {
  if (lightdm.is_authenticated) {
    show_prompt(
      `Starting session ${currentSession} for user ${currentUsername}`,
      "SUCCESS"
    );
    lightdm.start_session(currentSession);
  } else {
    document.getElementById("error").textContent = "Incorrect password";
    show_prompt("Authentication Failed", "ERROR");
    setTimeout(start_authentication, 3000);
  }
};

function openSettings() {
  document.getElementById("settings_panel").classList.toggle("show_settings");
}

function userCard(user) {
  const usr_name = document.getElementById("usr_selected");
  const urs_name_display = document.getElementById("urs_name_display");
  const urs_image = document.getElementById("urs_image");
  const button = document.createElement("button");
  const img = document.createElement("img");
  const span = document.createElement("span");

  button.classList.add("user");
  img.src = user.image || "icons/user_1.jpg";
  span.innerText = user.display_name;

  button.onclick = () => {
    show_prompt(`User ${user.name} begins authentication`, "SELECT");
    if (lightdm.authentication_user) {
      lightdm.cancel_authentication();
    }

    currentUsername = user.name;
    usr_name.value = user.name;
    urs_image.src = user.image || "icons/user_1.jpg";
    urs_name_display.innerText = user.display_name;

    lightdm.authenticate(user.name);
    pageShow();
  };

  button.appendChild(img);
  button.appendChild(span);
  return button;
}

function sessionCard(session) {
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

function themeCard(theme) {
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

function pageShow() {
  const major = document.querySelector(".major");
  const entry = document.querySelector(".entry_page");
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
    .classList.contains("show");
  const isEntryVisible = document
    .querySelector(".entry_page")
    .classList.contains("hide");
  const isSettingsVisible = document
    .getElementById("settings_panel")
    .classList.contains("show_settings");

  if (e.code === "Space") {
    e.preventDefault();
    console.log(e.code);

    if (isMajorVisible) {
      // Buscar usuario por defecto
      let user =
        lightdm.users.find(
          (u) => u.name === window.default_settings.startup_user
        ) || lightdm.users[0];

      if (user) {
        show_prompt(`Hotkey: Default user selected: ${user.name}`, "HOTKEY");
        if (lightdm.authentication_user) lightdm.cancel_authentication();

        currentUsername = user.name;
        document.getElementById("usr_selected").value = user.name;
        document.getElementById("urs_image").src =
          user.image || "icons/user_1.jpg";
        document.getElementById("urs_name_display").innerText =
          user.display_name;
        setTimeout(() => {
          document.getElementById("usr_password").focus();
        }, 800);
        lightdm.authenticate(user.name);
        pageShow();
      }
    }
  }

  if (e.code === "Escape") {
    e.preventDefault();

    if (lightdm.authentication_user) {
      lightdm.cancel_authentication();
      document.getElementById("usr_password").value = "";
      show_prompt("Hotkey: Authentication canceled", "HOTKEY");
    }

    if (isSettingsVisible) {
      openSettings(); // toggles
    }

    if (isEntryVisible) {
      pageShow(); // toggles
    }
  }
});

function showMessage(text) {
  const msgEl = document.getElementById("status-message");
  msgEl.textContent = text;
  msgEl.style.opacity = "1";
  setTimeout(() => {
    msgEl.style.opacity = "0";
  }, 3000);
}

function onLoginSuccess(username) {
  showMessage(`Welcome, ${username}!`);
  // Proceed with login
}

function onLogoff(username) {
  showMessage(`Goodbye, ${username}!`);
  // Optional: lightdm.logout();
}
