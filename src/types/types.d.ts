import {Transaction, Category, Currency } from '../redux-store/transaction'



type TransactionState = {
    transactions: Transaction[]
}

type TransactionAction = {
    type: string;
    transaction : Transaction
}

type DispatchType = (args: TransactionAction) => TransactionAction

type CDispatchType = (args: CategoryAction) => CategoryAction

type Categorystate = {
    categories : Category[]
}

type CategoryAction = {
    type:string 
    category : Category
}

type DispatchCategorytype = (args: CategoryAction) => CategoryAction

//-----Currency-------

type CurrencyState = {
    currency: Currency
}

type CurrencyAction = {
    type: string 
    currency: Currency
}

type DispatchCurrencyType = (args: CurrencyAction) => CurrencyAction