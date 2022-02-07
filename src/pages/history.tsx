import React, { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
import { Transaction } from "../redux-store/transaction";
import "../components/newTransaction.css";
import { useCallback } from "react";
import TransactionList from "../components/transactionList";
import Search from "../components/Search";
import { useMemo } from "react";
// import TableHeader from "../components/tableHeader";

type Props = {
  transactionList: Transaction[] | undefined;
};

const History = (props: Props) => {
  const headers = [
    {
      Header: "Name",
      accessor: "name",
      sortable: true 
    },
    {
      Header: "Amount",
      accessor: "amount",
      sortable: true
    },
    {
      Header: "Type",
      accessor: "type",
      sortable: false 
    },
    {
      Header: "Category",
      accessor: "category",
      sortable: false
    },
  ];
  let mainList = props.transactionList

  const [alltrans, setAllTrans] = useState(true);
  const [incomeTrans, setIncomeTrans] = useState(false);
  const [expenseTrans, setExpenseTrans] = useState(false);
  const [transactionList, setTransactionList] = useState<
    Transaction[] | undefined
  >(mainList);
  const [search, setSearch] = useState("")
  const [sorting, setSorting] = useState({accessor: '' , order: ''})
  
  const someThing = useMemo(() => {
        let computed = mainList
        if(search){
          computed = computed?.filter(
            item => item.name.toLowerCase().includes(search.toLowerCase())
          )
        }
        setTransactionList(computed)
  },[mainList, search])

  
  const onInputChange = (value:string) => {
    setSearch(value);
    onSearch(value);
}
  

  const incomeList = transactionList?.filter(function (transaction) {
    return transaction.type === "income";
  });

  const expenseList = transactionList?.filter(function (transaction) {
    return transaction.type === "expense";
  });
  
//   const handleOnClick = () => {
//     const findUsers = list && list.length > 0 ? list?.filter(u => u.name == text) : undefined
//     setList(findUsers)
//  }
  const allTransactions = () => {
    setAllTrans(true);
    setIncomeTrans(false);
    setExpenseTrans(false);
  };
  const incomeTransactions = () => {
    setAllTrans(false);
    setIncomeTrans(true);
    setExpenseTrans(false);
  };
  const expensetransactions = () => {
    setAllTrans(false);
    setIncomeTrans(false);
    setExpenseTrans(true);
  };
  const onSearch = (value:string) => {
    setSearch(value)
  }

  
  return (
    <>
      <div className="new-expense">
        <button onClick={allTransactions}>All</button>
        <button onClick={incomeTransactions}>Income</button>
        <button onClick={expensetransactions}>Expense</button>
      </div>
      <div className="new-expense">

      <input 
        type="text"
        style={{width: '240px', height: '30px', }}
        placeholder='search'
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
        />
      
      {alltrans && <table className="transactions">
            <thead>
                {headers.map((row) => {
                    return <td key={row.accessor}><p >{row.Header}</p> 
                    </td>
                })}
          </thead>
          {/* <TableHeader headers={headers} onSorting ={(accessor:string , order: string) => setSorting({accessor,order})}/> */}

          <tbody>
                {transactionList?.map((transaction)=>{
                    return(
                        <tr key={transaction.id}>
                            <td>{transaction.name}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.category}</td>
                            
                        </tr>
                    )

                })}
          </tbody>
      </table>
      }
      {/* {alltrans && list && list.length === 0 &&<p >No Transactions Available</p>} */}

{incomeTrans &&  incomeList && incomeList.length > 0 && <table className="transactions">
          <thead >
                {headers.map((row) => {
                    return <td key={row.accessor}><p>{row.Header}</p> {' '}
                     
                    </td>
                })}
          </thead>

          <tbody >
                {incomeList?.map((transaction)=>{
                    return(
                        <tr key={transaction.id}>
                            <td>{transaction.name}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.category}</td>
                            
                        </tr>
                    )

                })}
          </tbody>
      </table>
      }
      {incomeTrans && incomeList && incomeList.length === 0 &&<p >No Transactions Available</p>}
      {expenseTrans &&  expenseList && expenseList.length > 0 &&  <table className="transactions">
          <thead>
                {headers.map((row) => {
                    return <td key={row.accessor}><p>{row.Header}</p></td>
                })}
          </thead>

          <tbody>
                {expenseList?.map((transaction)=>{
                    return(
                        <tr key={transaction.id}>
                            <td>{transaction.name}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.category}</td>
                            
                        </tr>
                    )

                })}
          </tbody>
      </table>}
      {expenseTrans && expenseList && expenseList.length === 0 &&<p >No Transactions Available</p>}
      </div>
    </>
  );
};

export default History;

// {alltrans && (
//     <ul className="transactions">
//       {transactionList &&
//         transactionList.map((transaction) => (
//           <div className="transaction-item">
//             <div key={transaction.id}>
//               <div className="expense-item__description">
//                 <div>
//                   <span>{transaction.name}</span>
//                   <span>{transaction.amount}</span>
//                   <span>{transaction.type}</span>
//                   <span>{transaction.category}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//     </ul>
//   )}

//   {incomeTrans && (
//     <ul className="transactions">
//       {incomeList &&
//         incomeList.map((transaction) => (
//           <div className="transaction-item">
//             <div key={transaction.id}>
//               <div className="expense-item__description">
//                 <div>
//                   <span>{transaction.name}</span>
//                   <span>{transaction.amount}</span>
//                   <span>{transaction.type}</span>
//                   <span>{transaction.category}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//     </ul>
//   )}

//   {expenseTrans && (
//     <ul className="transactions">
//       {expenseList &&
//         expenseList.map((transaction) => (
//           <div className="transaction-item">
//             <div key={transaction.id}>
//               <div className="expense-item__description">
//                 <div>
//                   <span>{transaction.name}</span>
//                   <span>{transaction.amount}</span>
//                   <span>{transaction.type}</span>
//                   <span>{transaction.category}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}


// const users = props.transactionList
  // const [list,setList] = useState<Transaction[] | undefined>(users)
  // const [text, setText] = useState('')
  // const [sortKey, setSortKey] = useState<SortKeys>('id')
  // const [sortOrder, setSortorder] = useState<SortOrder>('ascn')


// type SortKeys = keyof  Transaction 
// type SortOrder = 'ascn' | 'desc'
// const [sortKey, setSortKey] = useState<SortKeys>('id')
  // const [sortOrder, setSortorder] = useState<SortOrder>('ascn')
//     </ul>
// //   )}
// {expenseTrans &&  expenseList && expenseList.length > 0 &&  <table className="transactions">
//           <thead>
//                 {headers.map((row) => {
//                     return <td key={row.accessor}><p>{row.Header}</p></td>
//                 })}
//           </thead>

//           <tbody>
//                 {expenseList?.map((transaction)=>{
//                     return(
//                         <tr key={transaction.id}>
//                             <td>{transaction.name}</td>
//                             <td>{transaction.amount}</td>
//                             <td>{transaction.type}</td>
//                             <td>{transaction.category}</td>
                            
//                         </tr>
//                     )

//                 })}
//           </tbody>
//       </table>}
//       {expenseTrans && expenseList && expenseList.length === 0 &&<p >No Transactions Available</p>}