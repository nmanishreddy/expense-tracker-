import {Transaction } from '../redux-store/transaction'

import {Category} from '../redux-store/transaction'

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