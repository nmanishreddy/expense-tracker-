import React, { MouseEventHandler } from "react";
import {  useState } from "react";
import {  Transaction } from "../../redux-store/transaction";
import "../../components/newTransaction.css";
// import { useCallback } from "react";
import { useMemo } from "react";
// import { useSelector } from "react-redux";
import useDebounce from "../../components/debounce";
import {
  ButtonGroup,
  Dropdown,
  DropdownButton,
  
} from "react-bootstrap";


import "./history.css";
import Pagination from "../../components/Pagination/pagination";
import { useSelector } from "react-redux";


type Props = {
  transactionList: Transaction[];
};
// type Data = Transaction[];
// type a =  Transaction[0]
type SortOrder = "ascn" | "desc";
type SortKeys = "name" | "type" | "amount" | "category";

function sortData({
  computed,
  sortKey,
  reverse,
}: {
  computed: Transaction[];
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return computed;

  const sortedData = computed.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys | any;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement> | any;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        sortKey === columnKey && sortOrder === "desc"
          ? "sort-button sort-reverse"
          : "sort-button"
      }`}
    >
      ▲
    </button>
  );
}

const History = (props: Props) => {
  const headers = [
    {
      Header: "Name",
      key: "name",
    },
    {
      Header: "Amount",
      key: "amount",
    },
    {
      Header: "Type",
      key: "type",
    },
    {
      Header: "Category",
      key: "category",
    },
  ];
  let mainList = props.transactionList;

  const [alltrans, setAllTrans] = useState(true);
  const [incomeTrans, setIncomeTrans] = useState(false);
  const [expenseTrans, setExpenseTrans] = useState(false);
  const [transactionList, setTransactionList] = useState<
    Transaction[] | undefined
  >(mainList);

  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce<string>(search, 300);

  const [sortKey, setSortKey] = useState<SortKeys>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  //Pagination
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4
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
  function changeSort(key: SortKeys | any) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }

  const someThing = useMemo(() => {
    let computed = mainList;
    if (search) {
      computed = computed?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTransactionList(computed);
    if (sortKey) {
      computed = sortData({ computed, sortKey, reverse: sortOrder === "desc" });
    }
    // return computed
    return computed.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );
    
  }, [mainList, debouncedValue, sortKey, sortOrder,  currentPage]);

  const onInputChange = (value: string) => {
    setSearch(value);
    onSearch(value);
  };
  const onSearch = (value: string) => {
    setSearch(value);
  };

  const currency = useSelector((state: any) => state.currency.currency);

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
    <>
      <div>
        <div className="d-flex justify-content-between  history-card">
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title="Sort By"
              id="bg-nested-dropdown"
            >
              <Dropdown.Item onClick={allTransactions} eventKey="1">
                ALL
              </Dropdown.Item>
              <Dropdown.Item onClick={incomeTransactions} eventKey="2">
                Income
              </Dropdown.Item>
              <Dropdown.Item onClick={expensetransactions} eventKey="3">
                Expense
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          
          
          <input
            type="text"
            style={{ width: "240px", height: "30px" }}
            placeholder="search"
            value={search}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </div>

        {alltrans && transactionList && transactionList.length > 0 && (
          <div >
            <table className="transactions">
              <thead>
                {headers.map((row) => {
                  return (
                    <th key={row.key}>
                      <p>
                        {row.Header}
                        {
                          <SortButton
                            columnKey={row.key}
                            onClick={() => changeSort(row.key)}
                            {...{
                              sortOrder,
                              sortKey,
                            }}
                          />
                        }
                      </p>
                    </th>
                  );
                })}
              </thead>
              {/* <TableHeader headers={headers} onSorting ={(accessor:string , order: string) => setSorting({accessor,order})}/> */}

              <tbody>
                {someThing?.map((transaction) => {
                  return (
                    <tr key={transaction.id}>
                      <td>{transaction.name}</td>
                      <td>{exchange(currency.name,transaction.amount)}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.category}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
           
            
          </div>
          
        )}
        

        {/* {alltrans && transactionList && transactionList.length === 0 && (
          <p className="emptyList">No Transactions Available</p>
        )}   */}

        {incomeTrans && incomeList && incomeList.length > 0 && (
          
            <table className="transactions">
              <thead>
                {headers.map((row) => {
                  return (
                    <th key={row.key}>
                      <p>
                        {row.Header}
                        {
                          <SortButton
                            columnKey={row.key}
                            onClick={() => changeSort(row.key)}
                            {...{
                              sortOrder,
                              sortKey,
                            }}
                          />
                        }
                      </p>
                    </th>
                  );
                })}
              </thead>
              {/* <TableHeader headers={headers} onSorting ={(accessor:string , order: string) => setSorting({accessor,order})}/> */}

              <tbody>
                {incomeList?.map((transaction) => {
                  return (
                    <tr key={transaction.id}>
                      <td>{transaction.name}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.category}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          
        )}

        {/* 
        {incomeTrans && incomeList && incomeList.length > 0 && (
          <div  className=" my-custom-scrollbar table-wrapper-scroll-y"  >
         <table  className="transactions">
            <thead>
              {headers.map((row) => {
                return (
                  <td key={row.key}>
                    <h6>
                      {row.Header}
                      {
                        <SortButton
                          columnKey={row.key}
                          onClick={() => changeSort(row.key)}
                          {...{
                            sortOrder,
                            sortKey,
                          }}
                        />
                      }
                    </h6>{" "}
                  </td>
                );
              })}
            </thead>

            <tbody>
              {incomeList?.map((transaction: Transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.name}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.category}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        )}
        
        {incomeTrans && incomeList && incomeList.length === 0 && (
          <p>No Transactions Available</p>
        )}
        
         */}

        {expenseTrans && expenseList && expenseList.length > 0 && (
          
            <table className="transactions ">
              <thead>
                {headers.map((row) => {
                  return (
                    <th key={row.key}>
                      <p>
                        {row.Header}
                        {
                          <SortButton
                            columnKey={row.key}
                            onClick={() => changeSort(row.key)}
                            {...{
                              sortOrder,
                              sortKey,
                            }}
                          />
                        }
                      </p>
                    </th>
                  );
                })}
              </thead>

              <tbody>
                {expenseList?.map((transaction: Transaction) => {
                  return (
                    <tr key={transaction.id}>
                      <td>{transaction.name}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.category}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          
        )}

        {expenseTrans && expenseList && expenseList.length === 0 && (
          <p>No Transactions Available</p>
        )}
        <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={(page:number) => setCurrentPage(page)}
                            />
      </div>
    </>
  );
};

export default History;

// import React, { MouseEventHandler } from "react";
// import { useEffect, useState } from "react";
// import { Transaction } from "../redux-store/transaction";
// import "../components/newTransaction.css";
// import { useCallback } from "react";
// import TransactionList from "../components/transactionList";
// import Search from "../components/Search";
// import { useMemo } from "react";
// // import TableHeader from "../components/tableHeader";

// type Props = {
//   transactionList: Transaction[] | undefined;
// };

// const History = (props: Props) => {
//   const headers = [
//     {
//       Header: "Name",
//       accessor: "name",
//       sortable: true
//     },
//     {
//       Header: "Amount",
//       accessor: "amount",
//       sortable: true
//     },
//     {
//       Header: "Type",
//       accessor: "type",
//       sortable: false
//     },
//     {
//       Header: "Category",
//       accessor: "category",
//       sortable: false
//     },
//   ];
//   let mainList = props.transactionList

//   const [alltrans, setAllTrans] = useState(true);
//   const [incomeTrans, setIncomeTrans] = useState(false);
//   const [expenseTrans, setExpenseTrans] = useState(false);
//   const [transactionList, setTransactionList] = useState<
//     Transaction[] | undefined
//   >(mainList);
//   const [search, setSearch] = useState("")
//   const [sorting, setSorting] = useState({accessor: '' , order: ''})

//   const someThing = useMemo(() => {
//         let computed = mainList
//         if(search){
//           computed = computed?.filter(
//             item => item.name.toLowerCase().includes(search.toLowerCase())
//           )
//         }
//         setTransactionList(computed)
//   },[mainList, search])

//   const onInputChange = (value:string) => {
//     setSearch(value);
//     onSearch(value);
// }

//   const incomeList = transactionList?.filter(function (transaction) {
//     return transaction.type === "income";
//   });

//   const expenseList = transactionList?.filter(function (transaction) {
//     return transaction.type === "expense";
//   });

// //   const handleOnClick = () => {
// //     const findUsers = list && list.length > 0 ? list?.filter(u => u.name == text) : undefined
// //     setList(findUsers)
// //  }
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
//   const onSearch = (value:string) => {
//     setSearch(value)
//   }

//   return (
//     <>
//       <div className="new-expense">
//         <button onClick={allTransactions}>All</button>
//         <button onClick={incomeTransactions}>Income</button>
//         <button onClick={expensetransactions}>Expense</button>
//       </div>
//       <div className="new-expense">

//       <input
//         type="text"
//         style={{width: '240px', height: '30px', }}
//         placeholder='search'
//         value={search}
//         onChange={(e) => onInputChange(e.target.value)}
//         />

//       {alltrans && <table className="transactions">
//             <thead>
//                 {headers.map((row) => {
//                     return <td key={row.accessor}><p >{row.Header}</p>
//                     </td>
//                 })}
//           </thead>
//           {/* <TableHeader headers={headers} onSorting ={(accessor:string , order: string) => setSorting({accessor,order})}/> */}

//           <tbody>
//                 {transactionList?.map((transaction)=>{
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
//       {/* {alltrans && list && list.length === 0 &&<p >No Transactions Available</p>} */}

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

// // const users = props.transactionList
//   // const [list,setList] = useState<Transaction[] | undefined>(users)
//   // const [text, setText] = useState('')
//   // const [sortKey, setSortKey] = useState<SortKeys>('id')
//   // const [sortOrder, setSortorder] = useState<SortOrder>('ascn')

// // type SortKeys = keyof  Transaction
// // type SortOrder = 'ascn' | 'desc'
// // const [sortKey, setSortKey] = useState<SortKeys>('id')
//   // const [sortOrder, setSortorder] = useState<SortOrder>('ascn')
// //     </ul>
// // //   )}
// // {expenseTrans &&  expenseList && expenseList.length > 0 &&  <table className="transactions">
// //           <thead>
// //                 {headers.map((row) => {
// //                     return <td key={row.accessor}><p>{row.Header}</p></td>
// //                 })}
// //           </thead>

// //           <tbody>
// //                 {expenseList?.map((transaction)=>{
// //                     return(
// //                         <tr key={transaction.id}>
// //                             <td>{transaction.name}</td>
// //                             <td>{transaction.amount}</td>
// //                             <td>{transaction.type}</td>
// //                             <td>{transaction.category}</td>

// //                         </tr>
// //                     )

// //                 })}
// //           </tbody>
// //       </table>}
// //       {expenseTrans && expenseList && expenseList.length === 0 &&<p >No Transactions Available</p>}
