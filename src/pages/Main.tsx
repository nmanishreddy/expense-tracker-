import TransactionForm from "../components/newTransaction";
import { Transaction } from "../redux-store/transaction";
import { useCallback, useEffect, useState } from "react";
import TransactionList from "../components/transactionList";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import "../App.css";
import {
  addTransaction,
  removeTransaction,
  updateTransaction,
} from "../redux-store/actionCreators";
import Change from "./Currency/changeCurrency";
// import CurrencyForm from "../components/Currency/currency";
// import {currencyContext} from "../Context/Currency";
// import currencyContext from "../Context/Currency"

const defaultTransaction: Transaction = {
  id: 0,
  name: "",
  type: "",
  amount: 0,
  category: "",
};

const Main = () => {
  const [transaction, setTransaction] =
    useState<Transaction>(defaultTransaction);

  const currency1 = useSelector((state: any) => state.currency.currency);

  console.log(currency1);

  /**
   * User add / remove / update operations
   */

  const saveTransactionDetails = (transactionDetails: Transaction) => {
    if (!transactionDetails.name && !transactionDetails.amount) {
      return;
    }

    // using react redux
    if (transactionDetails.id !== 0 && (transactionDetails.type=='expense'&&(balance+transaction.amount)-transactionDetails.amount>balance)) {
      updateTransactionInStore(transactionDetails);
    } else {
      if (
        (transactionDetails.type == "expense" && balance - transactionDetails.amount < 0)
      ) {
        toast.error("Current balance cannot be negative", {autoClose: 500});
  
      } else {
        addTransactionToStore(transactionDetails);

        toast.success("Transaction Added Successfully", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // toast.error("Current balance cannot be negative", {autoClose: 500});
      }
    }
  };

  const updateTransactionDetails = (transactionDetails: Transaction) => {
    if (transactionDetails.type == "expense" && balance - transactionDetails.amount < 0) {
      toast.error("Current balance cannot be negative");
      
    } else {
      setTransaction(
        (transaction: Transaction) => (transaction = transactionDetails)
      );
    }
  };

  const removeTransactionDetails = (transactionDetails: Transaction) => {
    if (
      transactionDetails.type == "expense" ||
      balance - transactionDetails.amount > 0
    ) {
      deleteTransactionFromStore(transactionDetails);
    } else {
      toast.error("Current balance cannot be negative");
    }
  };

  /**
   * Redux implementation
   */
  const transactionsListArray = useSelector(
    (state: any) => state.user.transactions
    // (state: TransactionState) => state.transactions,
    // shallowEqual
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
    (transaction: Transaction) => {
      dispatch(updateTransaction(transaction));
      toast.success("Transaction updated Successfully");
    },
    [dispatch]
  );

  const deleteTransactionFromStore: any = useCallback(
    (transaction: Transaction) => {
      dispatch(removeTransaction(transaction));
      toast.success("Transaction deleted Successfully");
    },
    [dispatch]
  );

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
  const currency = useSelector((state: any) => state.currency.currency);

  const exchange = (type:string, amount:number) => {
    if (type=='usd'){
      return `$ ${(amount/72).toFixed(2)}`
    } else if (type=='pound'){
      return `£ ${(amount/92).toFixed(2)}`
    } else if (type=='euro'){
      return `€ ${(amount/80).toFixed(2)}`
    } else {
      return `₹ ${amount}`;
    }
  }
  // const currency = useContext(currencyContext)
  // console.log(currency.currency)

  // `string text ${expression} string text`
  return (
    <>
      <div className="App">
        <div className="d-flex flex-row justify-content-start">
        <Change />
        </div>
        
        <div className="d-flex flex-row">
          <div className="balance flex-column">
            <h2>Current Balance: {exchange(currency.name,balance)} </h2>
            <h2>Income: {exchange(currency.name, income)}</h2>
            <h2>Expense: {exchange(currency.name, expense)}</h2>
          </div>

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
