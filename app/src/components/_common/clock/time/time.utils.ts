/**
 * Calculates the current time and returns it as a localized string in "en-US" format,
 * displaying only the hour and minute in numeric form.
 *
 * @returns {string} The current time formatted as "HH:MM" in "en-US" locale.
 */
export const calculateTime = () => {
  const now = new Date();
  const timeOptions = {
    hour: "numeric" as const,
    minute: "numeric" as const,
  };
  return now.toLocaleTimeString("en-US", timeOptions);
};

/**
 * Calculates the current date and returns it as a localized string in "en-US" format,
 * displaying the full year, month, and day.
 *
 * @returns {string} The current date formatted as "Month Day, Year" in "en-US" locale.
 */
export const calculateDate = () => {
  const now = new Date();
  const dateOptions = {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };
  return now.toLocaleDateString("en-US", dateOptions);
};

/**
 * Returns the IANA time zone name of the user's current locale.
 *
 * Utilizes the `Intl.DateTimeFormat` API to determine the resolved time zone.
 *
 * @returns {string} The IANA time zone identifier (e.g., "America/New_York").
 */
export const calculateTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
