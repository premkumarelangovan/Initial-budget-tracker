import "./style.css"
import type { Transaction, TransactionType } from "./types";
import { validateTransaction } from "./budget";
import {loadTransactions, saveTransactions} from "./storage"
import {renderTransactions, renderSummary} from "./dom";

const form = document.querySelector("#transaction-form") as HTMLFormElement;
const amountInput = document.querySelector("#amount") as HTMLInputElement;
const descriptionInput = document.querySelector("#description") as HTMLInputElement;
const typeInput = document.querySelector("#type") as HTMLSelectElement;

const transactionList = document.querySelector("#transaction-list") as HTMLUListElement;
const balanceEl = document.querySelector("#balance") as HTMLElement;
const incomeEl = document.querySelector("#income-total") as HTMLElement;
const expenseEl = document.querySelector("#expense-total") as HTMLElement;

let transactions: Transaction[] = loadTransactions();

function refreshUI():void{
    renderTransactions(transactions, transactionList, deleteTransaction);
    renderSummary(transactions, balanceEl, incomeEl, expenseEl);
}

function addTransaction(transaction: Transaction): void{
    transactions.push(transaction);
    saveTransactions(transactions);
    refreshUI();
    
}

function deleteTransaction(id:number):void{
    transactions = transactions.filter((transaction)=> transaction.id !== id);
    saveTransactions(transactions);
    refreshUI();
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const amount = Number(amountInput.value);
    const description = descriptionInput.value.trim();
    const type = typeInput.value;

    const error = validateTransaction(amount, description, type);
    if (error) {
    alert(error);
    return;
  }
   const transaction:Transaction={
    id: Date.now(),
    amount,
    description,
    type: type as TransactionType
   }

   addTransaction(transaction);
   form.reset()
});

refreshUI();