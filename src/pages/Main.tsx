import React from "react";

import "../App.css";

import TransactionForm from "../components/newTransaction";
import { Transaction } from "../redux-store/transaction";
import { useCallback, useEffect, useState } from "react";
import TransactionList from "../components/transactionList";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { TransactionState } from "../types/types";
import {
  addTransaction,
  removeTransaction,
  updateTransaction,
} from "../redux-store/actionCreators";

const Main = () => {
    
  const defaultTransaction: Transaction = {
    id: 0,
    name: "",
    type: "",
    amount: 0,
    category: "",
  };

  const [transaction, setTransaction] =
    useState<Transaction>(defaultTransaction);

  /**
   * User add / remove / update operations
   */

  const saveTransactionDetails = (transactionDetails: Transaction) => {
    if (!transactionDetails.name && !transactionDetails.amount) {
      return;
    }

    // using react redux
    if (transactionDetails.id !== 0) {
      updateTransactionInStore(transactionDetails);
    } else {
      addTransactionToStore(transactionDetails);
    }
  };

  const updateTransactionDetails = (transactionDetails: Transaction) => {
    setTransaction(
      (transaction: Transaction) => (transaction = transactionDetails)
    );
  };

  const removeTransactionDetails = (transactionDetails: Transaction) => {
    // using react redux
    deleteTransactionFromStore(transactionDetails);
  };

  /**
   * Redux implementation
   */
  const transactionsListArray = useSelector(
    (state: TransactionState) => state.transactions,
    shallowEqual
  );

  // useSelector(
  //   (state: TransactionState) => state.transactions,
  //   shallowEqual
  // );
  const [transactionsList, setTransactionsList] = useState<Transaction[]>(
    transactionsListArray
  );

  const dispatch: Dispatch<any> = useDispatch();

  // redux operations
  const addTransactionToStore: any = useCallback(
    (transaction: Transaction) => dispatch(addTransaction(transaction)),
    [dispatch]
  );

  const updateTransactionInStore: any = useCallback(
    (transaction: Transaction) => dispatch(updateTransaction(transaction)),
    [dispatch]
  );

  const deleteTransactionFromStore: any = useCallback(
    (transaction: Transaction) => dispatch(removeTransaction(transaction)),
    [dispatch]
  );

  useEffect(() => {
    setTransactionsList(transactionsListArray);
  }, [transactionsListArray]);


  
    const incomeList = transactionsList?.filter(function(transaction){
      return transaction.type === 'income';
  }
  )
  
  const expenseList = transactionsList?.filter(function(transaction){
      return transaction.type === 'expense';
  }
  )
  
    const income = incomeList?.reduce(function(acc,transaction){
      return acc + Number(transaction.amount) ;
    },0)
    const expense = expenseList?.reduce(function(acc,transaction){
      return acc + Number(transaction.amount);
    },0)
    
    
  const balance = income-expense
  
  

  return (
    <>
      <div className="App">
        <div>

        
      <h2 className="balance">Current Balance: {balance} </h2>
        <TransactionForm
          transactionDetails={transaction}
          callBackTransaction={saveTransactionDetails}
        ></TransactionForm>
        </div>
        <hr></hr>
        <h2 className="text-center">Transaction List</h2>
        <TransactionList
          transactionList={transactionsList}
          editTransaction={updateTransactionDetails}
          removeTransaction={removeTransactionDetails}
        ></TransactionList>
      </div>
    </>
  );
};

export default Main;
