// This file is used to declare global types for the application.
// It allows us to extend the global Window interface with custom properties.
// This is useful for integrating with libraries or APIs that attach properties to the window object.// This file should be included in the tsconfig.json under "include" or "files".
// For example, if you are using LightDM, you can declare its type here.
// This allows TypeScript to recognize `window.lightdm` without throwing an error.
// This is particularly useful for applications that interact with system-level APIs or libraries that are not typed
import { LightDM } from "./lightdm.types";

export declare global {
  interface Window {
    lightdm?: LightDM;
    authentication_complete: () => void;
    show_prompt: (message: string, type: string) => void;
    handle_input: (input: string) => void;
    default_settings: {
      system: string;
      theme: string;
      language: string;
      fallback_session: string;
      startup_user: string;
      // Add more default settings as needed
    };
  }
}
