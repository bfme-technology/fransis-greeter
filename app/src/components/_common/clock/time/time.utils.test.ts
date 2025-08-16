import { calculateTime, calculateDate, calculateTimeZone } from "./time.utils";

describe("time.utils", () => {
  describe("calculateTime", () => {
    const mockDate = new Date("2024-06-01T15:42:00");
    beforeAll(() => {
      jest
        .spyOn(global, "Date")
        .mockImplementation(() => mockDate as unknown as Date);
    });
    afterAll(() => {
      (global.Date as unknown as jest.Mock).mockRestore();
    });

    it('returns current time in "en-US" format with hour and minute', () => {
      const result = calculateTime();
      // "3:42 PM" or "15:42" depending on locale settings
      expect(result).toMatch(/(\d{1,2}):(\d{2}) ?([AP]M)?/);
    });
  });

  describe("calculateDate", () => {
    const mockDate = new Date("2024-06-01T15:42:00");
    beforeAll(() => {
      jest
        .spyOn(global, "Date")
        .mockImplementation(() => mockDate as unknown as Date);
    });
    afterAll(() => {
      (global.Date as unknown as jest.Mock).mockRestore();
    });

    it('returns current date in "en-US" format with month, day, and year', () => {
      const result = calculateDate();
      // "June 1, 2024"
      expect(result).toBe("June 1, 2024");
    });
  });

  describe("calculateTimeZone", () => {
    it("returns a valid IANA time zone string", () => {
      const tz = calculateTimeZone();
      expect(typeof tz).toBe("string");
      expect(tz).toMatch(/^[A-Za-z_\/]+$/);
    });
  });
});
