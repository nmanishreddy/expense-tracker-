import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { Transaction } from "../redux-store/transaction";
import "./transactionList.css";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
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
      Header: "Actions",
      accessor: "actions",
    },
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
  
  const currency = useSelector((state: any) => state.currency.currency);
  
  
  const length = transactionList?.length === 0;

  const exchange = (type:string, amount:number) => {
    if (type=='usd'){
      return `$${(amount/72).toFixed(2)}`
    } else if (type=='pound'){
      return `£${(amount/92).toFixed(2)}`
    } else if (type=='euro'){
      return `€${(amount/80).toFixed(2)}`
    } else {
      return `₹${amount}`;
    }
  }

  return (
    <div className="my-custom-scrollbar1 ">
      {!length && (
        <table  className="transactions">
        
          <thead>
            <tr>
            {headers.map((row) => {
              return (
                <th key={row.accessor}>
                  <p>{row.Header}</p>
                </th>
              );
            })}
            </tr>
          </thead>

          <tbody>
            {transactionList?.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td title={transaction.name}>{transaction.name}</td>
                  <td title={String(transaction.amount)}>
                    {exchange(currency.name,transaction.amount)}
                    
                  </td>
                  <td title={transaction.type}>{transaction.type}</td>
                  <td title={transaction.category}>{transaction.category}</td>
                  
                  <td>
                    <div className="actions">
                      
                      {/* <a href={`/AddEdit/${transaction.id}`}> <BiEditAlt
                        title="Edit"
                        
                      /></a> */}
                      <BiEditAlt className="mt-1"
                        title="Edit"
                        onClick={() => handleEditTransaction(transaction)}
                      />
                      <a href={`/View/${transaction.id}`}> <BsEyeFill  
                        title="View"
                       
                      /></a>
                      <AiFillDelete className="mt-1 btn-danger" 
                        title="Delete"
                        onClick={() => handleDeleteTransaction(transaction)}
                      />
                      {/* =${transaction.id} */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
      )}
      {length && <p className="transactions">No Transactions Available</p>}
    </div>
  );
};

export default TransactionList;
