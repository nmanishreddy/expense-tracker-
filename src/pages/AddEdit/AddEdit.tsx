import React from "react";

import "../../App.css";

import TransactionForm from "../../components/newTransaction";
import { Transaction } from "../../redux-store/transaction";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import TransactionList from "../../components/transactionList";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import { TransactionState } from "../../types/types";
import {
  addTransaction,
  removeTransaction,
  updateTransaction,
} from "../../redux-store/actionCreators";
import { useParams } from "react-router-dom";
import UpdateForm from './form'

const defaultTransaction: Transaction = {
  id: 0,
  name: "",
  type: "",
  amount: 0,
  category: "",
};

const AddEdit = () => {
    const {id }= useParams()
    let navigate = useNavigate();
    
  const [transaction, setTransaction] =
    useState<Transaction>(defaultTransaction);

  /**
   * User add / remove / update operations
   */

  // const saveTransactionDetails = (transactionDetails: Transaction) => {
  //   if (!transactionDetails.name && !transactionDetails.amount) {
  //     return;
  //   }

  //   // using react redux
  //   if (transactionDetails.id !== 0) {
  //     if (transactionDetails.type=='expense'&&balance-transactionDetails.amount>balance){
  //       navigate('/')
  //     }else{
  //       updateTransactionInStore(transactionDetails);
    
  //       navigate('/')
  //     }
      
  //   }
  //   // } else {
  //   //   if (transactionDetails.type=='expense'&&transactionDetails.amount>balance){
  //   //     navigate('/')
  //   //   }else{
  //   //   addTransactionToStore(transactionDetails);
  //   //   toast.success("Transaction Added Successfully");
  //   //   navigate('/')
  //   // }
  //   // }
  // };

  // const updateTransactionDetails = (transactionDetails: Transaction) => {
  //   setTransaction(
  //     (transaction: Transaction) => (transaction = transactionDetails)
  //   );
  //   navigate('/')
  // };

  // const removeTransactionDetails = (transactionDetails: Transaction) => {
  //   // using react redux
  //   deleteTransactionFromStore(transactionDetails);
  // };

  /**
   * Redux implementation
   */
  const transactionsListArray = useSelector(
    (state: any) => state.user.transactions
    // (state: TransactionState) => state.transactions,
    // shallowEqual
  );
  useEffect(() => {
    if (id){
      const a = transactionsList.filter(item =>{ if (item.id===Number(id)) {return {...item}; }})
      
      setTransaction(a[0])
    }
  },[id])


  /**
   * User add / remove / update operations
   */

   const saveTransactionDetails = (transactionDetails: Transaction) => {
    if (!transactionDetails.name && !transactionDetails.amount) {
      return;
    }

    // using react redux
    if (transactionDetails.id !== 0 && (transactionDetails.type=='expense'&&(balance+transaction.amount)-transactionDetails.amount>balance) ) {
      
        navigate('/')
        toast.error("current balance canot be negative")
      
      
    }else{
      updateTransactionInStore(transactionDetails);
  
      navigate('/')
    }
    // } else {
    //   if (transactionDetails.type=='expense'&&transactionDetails.amount>balance){
    //     navigate('/')
    //   }else{
    //   addTransactionToStore(transactionDetails);
    //   toast.success("Transaction Added Successfully");
    //   navigate('/')
    // }
    // }
  };
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
    (transactionDetails: Transaction) => {
      dispatch(updateTransaction(transactionDetails));
      toast.success("Transaction updated Successfully");
    },
    [dispatch]
  );

  // const deleteTransactionFromStore: any = useCallback(
  //   (transaction: Transaction) => {
  //     dispatch(removeTransaction(transaction));
  //     toast.success("Transaction deleted Successfully");
  //   },
  //   [dispatch]
  // );

  useEffect(() => {
    setTransactionsList(transactionsListArray);
  }, [transactionsListArray]);

  const incomeList = transactionsList?.filter(function (transaction) {
    return transaction.type === "income";
  });

  const expenseList = transactionsList?.filter(function (transaction) {
    return transaction.type === "expense";
  });

  const income = incomeList?.reduce(function (acc, transaction) {
    return acc + Number(transaction.amount);
  }, 0);
  const expense = expenseList?.reduce(function (acc, transaction) {
    return acc + Number(transaction.amount);
  }, 0);

  const balance = income - expense;

  return (
    <>
      <div className="App">
        <UpdateForm
          transactionDetails={transaction}
          callBackTransaction={saveTransactionDetails}
        ></UpdateForm>
      </div>
    </>
  );
};

export default AddEdit;
