import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("salary field validation", () => {
  test("accepts a prospect with no salary provided", () => {
    const result = validateProspect({
      companyName: "Acme Corp",
      roleTitle: "Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a prospect with salary set to null", () => {
    const result = validateProspect({
      companyName: "Acme Corp",
      roleTitle: "Engineer",
      salary: null,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a prospect with salary set to empty string", () => {
    const result = validateProspect({
      companyName: "Acme Corp",
      roleTitle: "Engineer",
      salary: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a salary like '$120,000'", () => {
    const result = validateProspect({
      companyName: "Acme Corp",
      roleTitle: "Engineer",
      salary: "$120,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a salary range like '80k-100k'", () => {
    const result = validateProspect({
      companyName: "Acme Corp",
      roleTitle: "Engineer",
      salary: "80k-100k",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("rejects a salary that is only whitespace", () => {
    const result = validateProspect({
      companyName: "Acme Corp",
      roleTitle: "Engineer",
      salary: "   ",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary cannot be blank");
  });
});
