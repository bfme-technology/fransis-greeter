import { useEffect, useState } from "react";
import lightdm from "./lightdm.model";
import {
  currentLanguage,
  currentSession,
  currentSystem,
  currentTheme,
  currentUsername,
  months,
  sessionCard,
  userCard,
  waitingForPassword,
} from "./lightdm.utils";

const useLightDM = () => {
  const [isLightDM, setIsLightDM] = useState(false);

  useEffect(() => {
    if (window.lightdm) {
      setIsLightDM(true);
    }
  }, []);
  useEffect(() => {
    if (isLightDM) {
      window.lightdm.start_authentication = (username: string) => {
        console.log(`Starting authentication for ${username}`);
      };
      window.lightdm.cancel_authentication = () => {
        console.log("Authentication cancelled");
      };
      window.lightdm.complete_authentication = (password: string) => {
        console.log(`Completing authentication with password: ${password}`);
      };
      window.onload = () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const hour = document.getElementById("_hour");
        const date = document.getElementById("_date");
        const userList = document.getElementById("user-list");
        const sessionList = document.getElementById("session-list");
        const themeList = document.getElementById("theme-list");

        document.body.className = currentTheme;
        const loaderElem = document.getElementById("loader");
        if (loaderElem) {
          loaderElem.style.opacity = "0";
        }
        const systemElem = document.getElementById("_system");
        if (systemElem) systemElem.innerText = currentSystem;
        const languageElem = document.getElementById("_language");
        if (languageElem) languageElem.innerText = currentLanguage;
        const actualZoneElem = document.getElementById("_actualZone");
        if (actualZoneElem) actualZoneElem.innerText = timezone;

        if (userList) {
          lightdm.users.forEach((user) => {
            const card = userCard(user);
            if (card) userList.appendChild(card);
          });
        }
        if (sessionList) {
          lightdm.sessions.forEach((session) =>
            sessionList.appendChild(sessionCard(session))
          );
        }
        // themeAvailable.forEach(theme => themeList.appendChild(themeCard(theme)));

        setInterval(() => {
          const now = new Date();
          if (hour) {
            hour.innerText = `${now.getHours()}:${now
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;
          }
          if (date) {
            date.innerText = `${now.getDate()} ${
              months[now.getMonth()]
            }, ${now.getFullYear()}`;
          }
        }, 1000);

        setTimeout(() => {
          const loader = document.getElementById("loader");
          if (loader) {
            loader.style.display = "none";
          }
        }, 300);
      };

      window.handle_input = function () {
        const passwordElem = document.getElementById(
          "usr_password"
        ) as HTMLInputElement | null;
        const password = passwordElem ? passwordElem.value : "";
        const errorElem = document.getElementById("error");
        if (errorElem) errorElem.textContent = "";

        window.show_prompt(
          `Starting login for user ${currentUsername}`,
          "LOGIN"
        );
        lightdm.respond(password);
      };

      window.show_prompt = function (text, type) {
        // waitingForPassword = true;
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;
        const promptElem = document.getElementById("prompt");
        if (promptElem) {
          promptElem.innerHTML += `<p><span>${type} [${time}]</span>: ${text}</p><br/>`;
        }
      };

      window.authentication_complete = function () {
        if (lightdm.is_authenticated) {
          window.show_prompt(
            `Starting session ${currentSession} for user ${currentUsername}`,
            "SUCCESS"
          );
          lightdm.start_session(currentSession);
        } else {
          const errorElem = document.getElementById("error");
          if (errorElem) {
            errorElem.textContent = "Incorrect password";
          }
          window.show_prompt("Authentication Failed", "ERROR");
          setTimeout(start_authentication, 3000);
        }
      };
    } else {
      window.lightdm = lightdm;
    }
  }, [isLightDM]);
};

export default useLightDM;
function start_authentication(): void {
  throw new Error("Function not implemented.");
}
