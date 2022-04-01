import React, { FormEvent, useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { changeCurrency } from "../../redux-store/actionCreators";
import { Currency } from "../../redux-store/transaction";

const Change = () => {
  const something = useSelector((state: any) => state.currency.currency);
  const dispatch: Dispatch<any> = useDispatch();

  const changeCurrencyinStore: any = useCallback(
    (currency: Currency) => dispatch(changeCurrency(currency)),
    [dispatch]
  );
  const changeCurrency1 = (e: any) => {
    const new1 = {
      id: e.target.value,
      name: e.target.value,
    };

    changeCurrencyinStore(new1);
  };
  console.log(something);
  

  // redux operations
  //   const addTransactionToStore: any = useCallback(
  //     (transaction: Transaction) => dispatch(addTransaction(transaction)),
  //     [dispatch]
  //   );
  return (
    <div>
      <form>
        <select onChange={changeCurrency1} defaultValue={something.name}>
          <option value="rupee">Rupee</option>
          <option value="usd">Usd</option>
          <option  value="pound">Pound</option>
          <option value="euro">Euro</option>
        </select>
      </form>
    </div>
  );
};

export default Change;
