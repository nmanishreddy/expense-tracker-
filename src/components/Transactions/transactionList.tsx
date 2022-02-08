import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Transaction } from "../../redux-store/transaction";
import "./transactionList.css";
type Props = {
  transactionList: Transaction[] | undefined;
  removeTransaction: (arg: Transaction) => void;
  editTransaction: (arg: Transaction) => void;
};

const TransactionList = (props: Props) => {
  const [transactionList, setTransactionList] = useState<
    Transaction[] | undefined
  >(props.transactionList);

  const headers = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: 'Actions',
      accessor: 'actions'

    }
    
  ];

  useEffect(() => {
    setTransactionList(props.transactionList);
  }, [props.transactionList]);

  const handleEditTransaction = (selectedtransaction: Transaction) => {
    props.editTransaction(selectedtransaction);
  };

  const handleDeleteTransaction = (selectedtransaction: Transaction) => {
    props.removeTransaction(selectedtransaction);
  };

  const length = transactionList?.length === 0;

  return (
    <div>
      {!length&&<table className="transactions">
        <thead>
          {headers.map((row) => {
            return (
              <td key={row.accessor}>
                <p>{row.Header}</p>
              </td>
            );
          })}
        </thead>

        <tbody>
          {transactionList?.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td title={transaction.name}>{transaction.name}</td>
                <td title={String(transaction.amount)}>{transaction.amount}</td>
                <td title={transaction.type}>{transaction.type}</td>
                <td title={transaction.category}>{transaction.category}</td>
                <td >
                  <div className="actions">
                  <BiEditAlt title='Edit'
                    onClick={() => handleEditTransaction(transaction)}
                  />
                  
                  <AiFillDelete title='Delete'
                    onClick={() => handleDeleteTransaction(transaction)}
                  />
                  </div>
                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>}
      {length&&<p className="transactions">No Transactions Available</p>}
      {/* <ul className="transactions">
        {length&&<p>No Transactions Found</p>}
        {transactionList &&
          transactionList.map((transaction) => (
            <div className="transaction-items">
              <div key={transaction.id}>
                <div className="transaction-item">
                  <div className="transaction-item-description">
                    <span className="t-name">{transaction.name}</span>
                    <span className="t-name amount">{transaction.amount}</span>
                    <span className="t-name">{transaction.type}</span>
                    <span className="t-name">{transaction.category}</span>
                  </div>
                  <div className="transaction-item-icons">
                  <BiEditAlt
                    onClick={() => handleEditTransaction(transaction)}
                  />
                  <AiFillDelete
                    onClick={() => handleDeleteTransaction(transaction)}
                  />
                  </div>
                    
                </div>
              </div>
            </div>
          ))}
         
      </ul> */}
    </div>
  );
};

export default TransactionList;
