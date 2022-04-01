import React from "react";
import './view.css'
import "../../App.css";

import TransactionForm from "../../components/newTransaction";
import { Transaction } from "../../redux-store/transaction";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
import { Link, useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [transaction, setTransaction] = useState<Transaction>();

  const transactionsListArray = useSelector(
    (state: any) => state.user.transactions
    // (state: TransactionState) => state.transactions,
    // shallowEqual
  );

  const [transactionsList, setTransactionsList] = useState<Transaction[]>(
    transactionsListArray
  );

  useEffect(() => {
    setTransactionsList(transactionsListArray);
  }, [transactionsListArray]);
  useEffect(() => {
    if (id) {
      const a = transactionsList.filter((item) => {
        if (item.id === Number(id)) {
          return { ...item };
        }
      });

      setTransaction(a[0]);
    }
  }, [id]);
  return (
      <div className="view-card">

      
<div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{transaction?.name}</span>
          <br />
          <br />
          <strong>Amount: </strong>
          <span>{transaction?.amount}</span>
          <br />
          <br />
          <strong>Type: </strong>
          <span>{transaction?.type}</span>
          <br />
          <br />
          <strong>Category: </strong>
          <span>{transaction?.category}</span>
          <br />
          <br />
          <Link to="/">
            <button className="button1">Go Back</button>
          </Link>
          </div>
      </div>
  )
};

export default View;
