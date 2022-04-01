<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Transaction } from "./redux-store/transaction";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Main from "./pages/Main";
import React from "react";
import Header1 from "./pages/Header/header1";
import History from "./pages/History/history";
import Categories from "./pages/categories";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEdit from "./pages/AddEdit/AddEdit";
import View from "./pages/AddEdit/view";
import Change from "./pages/Currency/changeCurrency";
=======
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Category, Transaction } from "./redux-store/transaction";
import { shallowEqual, useSelector } from "react-redux";
import { TransactionState, Categorystate } from "./types/types";
import { useState } from "react";

import Main from "./pages/Main";
import React from "react";
import Headerr from "./pages/header";
import History from "./pages/TransHistory/history";
import NewCategory from "./components/Categories/newCategories";
import Categories from "./pages/categories";

// import { IconName } from "react-icons/bi";  BiEditAlt BiEdit
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a

const Header: React.FC = (props) => {
  const transactionsListArray: Transaction[] = useSelector(
    (state: any) => state.user.transactions,
    shallowEqual
  );

  const [transactionsList, setTransactionsList] = useState<Transaction[]>(
    transactionsListArray
  );
  useEffect(() => {
    setTransactionsList(transactionsListArray);
  }, [transactionsListArray]);

<<<<<<< HEAD
  // const categoriesListarray: Category[] = useSelector(
  //   (state: Categorystate) => state.categories,
  //   shallowEqual
  // );
  // const [categoriesList, setCategoriesList] =
  //   useState<Category[]>(categoriesListarray);

  // const [currency, setCurrency] = useState("usd");
  // const value = { currency, setCurrency };

  return (
    <div>
      <BrowserRouter>
        <Header1 />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/History"
            element={<History transactionList={transactionsList} />}
          />
          <Route path="/AddNewCategories" element={<Categories />} />
          <Route path={`/AddEdit/:id`} element={<AddEdit />} />
          <Route path={`/View/:id`} element={<View />} />
          <Route path="/curr" element={<Change />} />
=======
  const categoriesListarray: Category[] = useSelector(
    (state: Categorystate) => state.categories,
    shallowEqual
  );
  const [categoriesList, setCategoriesList] =
    useState<Category[]>(categoriesListarray);

  return (
    <div>
      <Headerr />

      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Main/>}/>
        <Route path='/History' element={<History transactionList={transactionsList}/>}/> */}
          <Route path="/AddNewCategories" element={<Categories />} />
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Header;
<<<<<<< HEAD

// const Header: React.FC = () => {
//   return (
//     <div className='styles.headerContainer'>
//       <Router>
//         <nav className="navbar navbar-expand-lg sticky-top bg-primary">
//           <div className="container-fluid">
//             <ul className="nav">
//               <li className="nav-item">
//                 <Link className="nav-link active" aria-current="page" to="/">
//                   Dashboard
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/profile">
//                   History
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">
//                   About
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   className="nav-link disabled"
//                   to="/admin"
//                   aria-disabled="true"
//                 >
//                   Admin
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         <Route path="/" component={Main} exact />
//         <Route path="/History" component={Main}/>
//         <Route path="/AddNew" component={Main}/>

//       </Router>
//     </div>
//   )
// }

// export default Header
=======
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
