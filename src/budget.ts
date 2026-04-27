import type { Transaction } from "./types";

export function calculateSummary(transactions: Transaction[]) {
  let income = 0;
  let expense = 0;

  for (const transaction of transactions) {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  }
  return {
    income,
    expense,
    balance: income - expense,
  };
}

export function validateTransaction(
  amount: number,
  description: string,
  type: string,
): string | null {
  if (Number.isNaN(amount) || amount <= 0) {
    return "Amount must be greater than 0";
  }
  if (!description.trim()) {
    return "Description is required";
  }

  if (type !== "income" && type != "expense") {
    return "Type must be income or expense";
  }

  return null;
}
