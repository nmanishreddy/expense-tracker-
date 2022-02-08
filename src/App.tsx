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

const Header: React.FC = (props) => {
  const transactionsListArray: Transaction[] = useSelector(
    (state: TransactionState) => state.transactions,
    shallowEqual
  );

  const [transactionsList, setTransactionsList] = useState<Transaction[]>(
    transactionsListArray
  );

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Header;
