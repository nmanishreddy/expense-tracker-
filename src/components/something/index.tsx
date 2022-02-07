export{}
// import React from 'react'
// import { useState } from 'react';

// import {Transaction} from '../redux-store/transaction'

// type Props = {
//     transactionList: Transaction[] | undefined;
//   };

// const UserFind= (props: Props) => {

//     const users = props.transactionList
//     const [list,setList] = useState<Transaction[] | undefined>(users)
//     const [text, setText] = useState('')
    

//     const headers = [
//         {
//           Header: "Name",
//           accessor: "name",
//         },
//         {
//           Header: "Amount",
//           accessor: "amount",
//         },
//         {
//           Header: "Type",
//           accessor: "type",
//         },
//         {
//           Header: "Category",
//           accessor: "category",
//         },
//       ];
    
//     // const onInputChange = (e: string) => {

//     //     setT


//     // }
//     const handleOnClick = () => {
//         const findUsers = list && list.length > 0 ? list?.filter(u => u.name === text) : undefined
//         setList(findUsers)
//      }
//      console.log(list)
    
//     return (
//         <div>
//             <p>Search Component</p>
//             <div>
//                 <input type='text' placeholder='enter text' value={text} onChange={(e) => setText(e.target.value)}/>
//                 <button disabled={!text} onClick={handleOnClick}>Search</button>
//             </div>
//             {/* <div>
//                 {list && list.length > 0 && list?.map(user => {
//                     return(
//                         <div key={user.id}>
//                             <p>{user.name}</p>
//                             <p>{user.amount}</p>
//                             </div>
//                     )
//                 })}
//             </div> */}
//             {list && list.length > 0 && <table className="transactions">
//             <thead>
//                 {headers.map((row) => {
//                     return <td key={row.accessor}><p>{row.Header}</p> 
//                     </td>
//                 })}
//           </thead>

//           <tbody>
//                 {list?.map((transaction)=>{
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
//         </div>
//     )
// }


// export default UserFind;



// import React, { MouseEventHandler } from "react";

// import { useEffect, useState } from "react";

// import { Transaction } from "../redux-store/transaction";

// import "../components/newTransaction.css";
// import { useCallback } from "react";
// import TransactionList from "../components/transactionList";
// import UserFind from "./newCategories";
// type Props = {
//   transactionList: Transaction[] | undefined;
// };

// // type SortKeys = typeof TransactionList.name
// // type SortOrder = 'ascn' | 'desc'

// // function sortData({transactionList, sortKey, reverse}: {transactionList : Transaction[], sortKey: SortKeys ,reverse: boolean}){

// //     if(!sortKey){
// //       return transactionList
// //     }
// //     const sortedData = transactionList.sort((a,b) => {
// //       return a[sortKey] > b[sortKey] ? 1: -1
// //     })
// //     if(reverse){
// //       return sortedData.reverse()
// //     }

// // }

// // function SortButton(sortOrder: SortOrder, columnKey: SortKeys, sortKey: SortKeys, onClick: MouseEventHandler<HTMLButtonElement>){
// //     return (
// //         <button onClick={onClick}
// //         className={`${
// //           sortKey === columnKey && sortOrder === "desc"
// //             ? "sort-button sort-reverse"
// //             : "sort-button"
// //         }`}>
// //           ▲
// //         </button>
// //     )
// // }

// const History = (props: Props) => {
//   const [alltrans, setAllTrans] = useState(true);
//   const [incomeTrans, setIncomeTrans] = useState(false);
//   const [expenseTrans, setExpenseTrans] = useState(false);
//   const [transactionList, setTransactionList] = useState<
//     Transaction[] | undefined
//   >(props.transactionList);
//   const users = props.transactionList
//   const [list,setList] = useState<Transaction[] | undefined>(users)
//   const [text, setText] = useState('')
//   // const [sortKey, setSortKey] = useState<SortKeys>('id')
//   // const [sortOrder, setSortorder] = useState<SortOrder>('ascn')

//   const headers = [
//     {
//       Header: "Name",
//       accessor: "name",
//     },
//     {
//       Header: "Amount",
//       accessor: "amount",
//     },
//     {
//       Header: "Type",
//       accessor: "type",
//     },
//     {
//       Header: "Category",
//       accessor: "category",
//     },
//   ];

//   useEffect(() => {
//     setTransactionList(props.transactionList);
//   }, [props.transactionList]);

//   const incomeList = list?.filter(function (transaction) {
//     return transaction.type === "income";
//   });

//   const expenseList = list?.filter(function (transaction) {
//     return transaction.type === "expense";
//   });
  
//   const handleOnClick = () => {
//     const findUsers = list && list.length > 0 ? list?.filter(u => u.name === text) : undefined
//     setList(findUsers)
//  }
//   const allTransactions = () => {
//     setAllTrans(true);
//     setIncomeTrans(false);
//     setExpenseTrans(false);
//   };
//   const incomeTransactions = () => {
//     setAllTrans(false);
//     setIncomeTrans(true);
//     setExpenseTrans(false);
//   };
//   const expensetransactions = () => {
//     setAllTrans(false);
//     setIncomeTrans(false);
//     setExpenseTrans(true);
//   };

//   // const sortedData = useCallback(() => sortedData({transactionList, sortKey ,reverse: sortOrder === 'desc'}), [transactionList, sortKey, sortOrder])

//   //   const changeSort = (key: SortKeys) => {
//   //     setSortorder(sortOrder === 'ascn' ? 'desc' : 'ascn');
//   //     setSortKey(key)
//   //   }

//   return (
//     <>
//       <div className="new-expense">
//         <button onClick={allTransactions}>All</button>
//         <button onClick={incomeTransactions}>Income</button>
//         <button onClick={expensetransactions}>Expense</button>
//       </div>
//       <div className="new-expense">
      
//                 <input type='text' placeholder='enter text' value={text} onChange={(e) => setText(e.target.value)}/>
//                 <button disabled={!text} onClick={handleOnClick}>Search</button>
            
      
//       {alltrans && list && list.length > 0 && <table className="transactions">
//             <thead>
//                 {headers.map((row) => {
//                     return <td key={row.accessor}><p>{row.Header}</p> 
//                     </td>
//                 })}
//           </thead>

//           <tbody>
//                 {list?.map((transaction)=>{
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
//       </table>
//       }
//       {alltrans && list && list.length === 0 &&<p >No Transactions Available</p>}

// {incomeTrans &&  incomeList && incomeList.length > 0 && <table className="transactions">
//           <thead >
//                 {headers.map((row) => {
//                     return <td key={row.accessor}><p>{row.Header}</p> {' '}
                     
//                     </td>
//                 })}
//           </thead>

//           <tbody >
//                 {incomeList?.map((transaction)=>{
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
//       </table>
//       }
//       {incomeTrans && incomeList && incomeList.length === 0 &&<p >No Transactions Available</p>}
//       {expenseTrans &&  expenseList && expenseList.length > 0 &&  <table className="transactions">
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
//       </div>
//     </>
//   );
// };

// export default History;

// // {alltrans && (
// //     <ul className="transactions">
// //       {transactionList &&
// //         transactionList.map((transaction) => (
// //           <div className="transaction-item">
// //             <div key={transaction.id}>
// //               <div className="expense-item__description">
// //                 <div>
// //                   <span>{transaction.name}</span>
// //                   <span>{transaction.amount}</span>
// //                   <span>{transaction.type}</span>
// //                   <span>{transaction.category}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //     </ul>
// //   )}

// //   {incomeTrans && (
// //     <ul className="transactions">
// //       {incomeList &&
// //         incomeList.map((transaction) => (
// //           <div className="transaction-item">
// //             <div key={transaction.id}>
// //               <div className="expense-item__description">
// //                 <div>
// //                   <span>{transaction.name}</span>
// //                   <span>{transaction.amount}</span>
// //                   <span>{transaction.type}</span>
// //                   <span>{transaction.category}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //     </ul>
// //   )}

// //   {expenseTrans && (
// //     <ul className="transactions">
// //       {expenseList &&
// //         expenseList.map((transaction) => (
// //           <div className="transaction-item">
// //             <div key={transaction.id}>
// //               <div className="expense-item__description">
// //                 <div>
// //                   <span>{transaction.name}</span>
// //                   <span>{transaction.amount}</span>
// //                   <span>{transaction.type}</span>
// //                   <span>{transaction.category}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}

// // type SortKeys = keyof  Transaction 
// // type SortOrder = 'ascn' | 'desc'
// // const [sortKey, setSortKey] = useState<SortKeys>('id')
//   // const [sortOrder, setSortorder] = useState<SortOrder>('ascn')
// //     </ul>
// //   )}


// import * as React from "react"
// import { TransactionAction, TransactionState } from "../types/types"
// import { createStore, applyMiddleware, Store } from "redux"
// import thunk from 'redux-thunk'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import userReducer from "./userReducer"
// import { combineReducers } from '@reduxjs/toolkit'
// import categoryReducer from "./categoryReducer"
// const rootReducer = combineReducers({user:userReducer, category:categoryReducer})

// const persistConfig = {
//     key: 'root',
//     storage,
//   }

//   const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store  = createStore(persistedReducer, applyMiddleware(thunk))

//  export const persistor = persistStore(store)


 
 
// export default store;


// import * as React from "react"
// import { TransactionAction, TransactionState } from "../types/types"
// import { createStore, applyMiddleware, Store } from "redux"
// import thunk from 'redux-thunk'
// import { combineReducers } from 'redux'

// import userReducer from "./userReducer"
// import categoryReducer from "./categoryReducer"


// const rootReducer = combineReducers({user: userReducer, category: categoryReducer})



// const store  = createStore(rootReducer, applyMiddleware(thunk))




// export default store;