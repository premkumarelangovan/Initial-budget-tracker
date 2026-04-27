import type { Transaction } from "./types";
import {calculateSummary} from "./budget";


export function renderTransactions(transactions:Transaction[], listEl:HTMLUListElement, onDelete:(id:number)=>void):void
{
  listEl.innerHTML = "";

  for (const transaction of transactions){
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = `${transaction.description} - $${transaction.amount} (${transaction.type})`;

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.addEventListener("click",()=>onDelete(transaction.id));
    
    li.append(text, button);
    listEl.appendChild(li);
   
  }
}

export function renderSummary( 
  transactions:Transaction[], 
  balanceEl:HTMLElement, 
  incomeEl:HTMLElement,
  expenseEl:HTMLElement):void {

    const summary = calculateSummary(transactions);
    
    balanceEl.textContent = summary.balance.toString();
    incomeEl.textContent = summary.income.toString();
    expenseEl.textContent = summary.expense.toString();
  }

