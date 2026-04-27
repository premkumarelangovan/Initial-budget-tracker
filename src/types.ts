export type TransactionType = "income" | "expense"

export interface Transaction{
 id: number;
 amount: number;
 description: string;
 type: TransactionType;
}