// mock-lightdm.js
window.lightdm = {
  is_authenticated: false,
  languages: [
    {
      name: "English",
      code: "en_US.utf8",
      territory: "USA",
    },
    {
      name: "Catalan",
      code: "ca_ES.utf8",
      territory: "Spain",
    },
    {
      name: "French",
      code: "fr_FR.utf8",
      territory: "France",
    },
  ],
  layouts: [
    {
      name: "us",
      short_description: "en",
      description: "English (US)",
    },
    {
      name: "at",
      short_description: "de",
      description: "German (Austria)",
    },
    {
      name: "us rus",
      short_description: "ru",
      description: "Russian (US, phonetic)",
    },
  ],
  sessions: [
    {
      key: "gnome",
      name: "GNOME",
      comment: "This session logs you into GNOME",
    },
    {
      key: "cinnamon",
      name: "Cinnamon",
      comment: "This session logs you into Cinnamon",
    },
    {
      key: "plasma",
      name: "Plasma",
      comment: "Plasma by KDE",
    },
    {
      key: "mate",
      name: "MATE",
      comment: "This session logs you into MATE",
    },
    {
      key: "openbox",
      name: "Openbox",
      comment: "This session logs you into Openbox",
    },
  ],
  users: [
    {
      display_name: "Clark Kent",
      language: null,
      layout: null,
      image: "icons/user_1.jpg",
      home_directory: "/home/superman",
      username: "superman",
      logged_in: false,
      session: "gnome",

      name: "superman",
      real_name: "Clark Kent",
    },
    {
      display_name: "Bruce Wayne",
      language: null,
      layout: null,
      image: "icons/user_1.jpg",
      home_directory: "/home/batman",
      username: "batman",
      logged_in: false,
      session: "cinnamon",

      name: "batman",
      real_name: "Bruce Wayne",
    },
    {
      display_name: "Peter Parker",
      language: null,
      layout: null,
      image: "icons/user_1.jpg",
      home_directory: "/home/spiderman",
      username: "spiderman",
      logged_in: false,
      session: "MATE",

      name: "spiderman",
      real_name: "Peter Parker",
    },
  ],
  authentication_user: null,
  authenticate(username) {
    console.log("Auth user:", username);
    this.authentication_user = username;
    show_prompt("Ingrese la contraseña", "PASSWORD");
  },
  respond(password) {
    console.log("Password entered:", password);
    if (password === "1234") {
      this.is_authenticated = true;
    } else {
      this.is_authenticated = false;
    }
    authentication_complete();
  },
  cancel_authentication() {
    this.authentication_user = null;
    this.is_authenticated = false;
  },
  start_session(session_key) {
    console.log(
      `Iniciando sesión "${session_key}" para ${this.authentication_user}`
    );
  },
  shutdown() {
    alert("Apagar el sistema (simulado)");
  },
  restart() {
    alert("Reiniciar el sistema (simulado)");
  },
  suspend() {
    alert("Suspender el sistema (simulado)");
  },
  hibernate() {
    alert("Hibernar el sistema (simulado)");
  },
};

// Simulate login success for testing
setTimeout(() => {
  onLoginSuccess("testuser");
}, 2000);
// setTimeout(() => { onLogoff("testuser"); }, 5000);
