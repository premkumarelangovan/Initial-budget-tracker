import type { Transaction } from "./types";

const STORAGE_KEY = "transactions";

export function loadTransactions() : Transaction[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw){
    return [];
  }

  try{
    const parsed = JSON.parse(raw) as Transaction[];
    return Array.isArray(parsed)? parsed : [];
  }
    catch{
      return [];
    }
}

export function saveTransactions(transactions: Transaction[]):void{
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}