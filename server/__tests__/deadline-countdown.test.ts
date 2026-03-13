import { getDeadlineCountdown } from "../prospect-helpers";

function ref(dateStr: string): Date {
  return new Date(dateStr + "T12:00:00");
}

describe("getDeadlineCountdown", () => {
  test("returns null for null deadline", () => {
    expect(getDeadlineCountdown(null, ref("2026-03-13"))).toBeNull();
  });

  test("returns null for undefined deadline", () => {
    expect(getDeadlineCountdown(undefined, ref("2026-03-13"))).toBeNull();
  });

  test("returns null for empty string deadline", () => {
    expect(getDeadlineCountdown("", ref("2026-03-13"))).toBeNull();
  });

  test("returns D-0 when deadline is today", () => {
    expect(getDeadlineCountdown("2026-03-13", ref("2026-03-13"))).toBe("D-0");
  });

  test("returns D-1 when deadline is tomorrow", () => {
    expect(getDeadlineCountdown("2026-03-14", ref("2026-03-13"))).toBe("D-1");
  });

  test("returns D-5 when deadline is 5 days away", () => {
    expect(getDeadlineCountdown("2026-03-18", ref("2026-03-13"))).toBe("D-5");
  });

  test("returns D-30 when deadline is 30 days away", () => {
    expect(getDeadlineCountdown("2026-04-12", ref("2026-03-13"))).toBe("D-30");
  });

  test("returns Expired when deadline was yesterday", () => {
    expect(getDeadlineCountdown("2026-03-12", ref("2026-03-13"))).toBe("Expired");
  });

  test("returns Expired when deadline is far in the past", () => {
    expect(getDeadlineCountdown("2025-01-01", ref("2026-03-13"))).toBe("Expired");
  });

  test("handles month boundaries correctly (end of March)", () => {
    expect(getDeadlineCountdown("2026-04-01", ref("2026-03-30"))).toBe("D-2");
  });

  test("handles year boundaries correctly", () => {
    expect(getDeadlineCountdown("2027-01-01", ref("2026-12-30"))).toBe("D-2");
  });
});
