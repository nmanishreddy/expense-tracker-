import {Transaction} from './transaction'
import { TransactionAction, TransactionState } from "../types/types";
import * as actionType from "./actiontypes";

const initialTransactions: TransactionState = {
    transactions: [
        {
            id: 1,
            name: "Youtube ",
            type: 'income',
           amount: 1000,
           category: 'category1'
        },
        {
            id: 2,
            name: "Bonus",
            type: 'income',
            amount: 200,
            category: 'category2'
        },
        {
            id: 3,
            name: "Groceries",
            type: 'expense',
           amount: 250,
           category: 'category4'
        },
        {
            id: 4,
            name: "Udemy Course",
            type: 'expense',
           amount: 500,
           category: 'category3'
        },
        {
            id: 5,
            name: "Mobile Recharge",
            type: 'expense',
           amount: 500,
           category: 'category3'
        },
        {
            id: 6,
            name: "Groceries",
            type: 'expense',
           amount: 500,
           category: 'category3'
        },
        {
            id: 7,
            name: "YouTube Videos",
            type: 'income',
           amount: 500,
           category: 'category3'
        },
        {
            id: 8,
            name: "uber Eats",
            type: 'income',
           amount: 500,
           category: 'category3'
        }
        
    ]
}

const transactionReducer = (state: TransactionState = initialTransactions, action: TransactionAction): TransactionState => {
    switch (action.type) {
        case actionType.ADD_TRANSACTION:
            const newtransaction: Transaction = {
                id: Math.random(),
                name: action?.transaction?.name,
                type: action?.transaction?.type,
                amount: action?.transaction?.amount,
                category: action?.transaction?.category
            }
            return {
                ...state,
                transactions: state.transactions.concat(newtransaction)
            }
        
        case actionType.REMOVE_TRANSACTION:
            const updatedTransactionList = state.transactions.filter(item => item.id !== action?.transaction?.id)
            return {
                ...state,
                transactions: updatedTransactionList
            }

        case actionType.UPDATE_TRANSACTION:
            const updatedTransactionsList = state.transactions.map(transaction => {
                if (transaction.id === action.transaction.id) {
                    return { ...transaction, name: action?.transaction?.name, 
                                      type: action?.transaction?.type, 
                                      amount: action?.transaction?.amount };
                }

                return transaction;
            });

            return {
                ...state,
                transactions: updatedTransactionsList
            }
    }

    return state;
}

export default transactionReducer;

// case 'ADD_CATEGORY':
// return {...state, categories: [...list, {}]}