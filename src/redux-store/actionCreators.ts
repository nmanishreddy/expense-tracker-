import { Transaction} from './transaction'
import { DispatchType, TransactionAction } from '../types/types';
import * as actionTypes from "./actiontypes";
import {Category} from './transaction'
import { CategoryAction, CDispatchType } from "../types/types";


export const addCategory = (category: Category) => {
    const action: CategoryAction = {
        type : actionTypes.ADD_CATEGORY,
        category
    }
    return performRequest1(action)
}


export const addTransaction = (transaction : Transaction) => {
    const action: TransactionAction = {
        type: actionTypes.ADD_TRANSACTION,
        transaction
    }
    return performRequest(action);
}

export const removeTransaction = (transaction : Transaction) => {
    const action: TransactionAction = {
        type: actionTypes.REMOVE_TRANSACTION,
        transaction
    }

    return performRequest(action);
}

export const updateTransaction = (transaction : Transaction) => {
    const action: TransactionAction = {
        type: actionTypes.UPDATE_TRANSACTION,
        transaction
    }

    return performRequest(action);
}

const performRequest = (action: TransactionAction   ) => {
    return (dispatch: DispatchType) => {
        dispatch(action);
    }
}

const performRequest1 = (action : CategoryAction) => {
    return (dispatch : CDispatchType) => {
        dispatch(action)
    }
}