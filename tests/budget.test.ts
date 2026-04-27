import { describe, expect, it } from "vitest";
import { calculateSummary, validateTransaction } from "../src/budget";

describe("calculateSummary", () => {
  it("calculates income, expense, and balance", () => {
    const result = calculateSummary([
      { id: 1, amount: 5000, description: "Salary", type: "income" },
      { id: 2, amount: 1000, description: "Rent", type: "expense" },
      { id: 3, amount: 300, description: "Food", type: "expense" },
    ]);

    expect(result).toEqual({
      income: 5000,
      expense: 1300,
      balance: 3700,
    });
  });

  it("returns zeros for empty input", () => {
    expect(calculateSummary([])).toEqual({
      income: 0,
      expense: 0,
      balance: 0,
    });
  });
});

describe("validateTransaction", () => {
  it("accepts valid input", () => {
    expect(validateTransaction(100, "Salary", "income")).toBeNull();
  });

  it("rejects bad amount", () => {
    expect(validateTransaction(0, "Salary", "income")).toBe(
      "Amount must be greater than 0",
    );
  });

  it("rejects empty description", () => {
    expect(validateTransaction(100, "", "income")).toBe(
      "Description is required",
    );
  });

  it("rejects bad type", () => {
    expect(validateTransaction(100, "Salary", "other")).toBe(
      "Type must be income or expense",
    );
  });
});
