import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./newTransaction.css";

import {
  Transaction,
  transactionType,
  transactionCategory,
  expenseCategory,
} from "../redux-store/transaction";

type Props = {
  transactionDetails: Transaction;

  callBackTransaction: (arg: Transaction) => void;
};

const TransactionForm = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredAmountTouched, setEnteredAmountTouched] = useState(false)
  
  
  const useFormField = (transaction: Transaction) => {
    const [formFields, setFormFields] = useState<Transaction>(transaction);

    const createChangeHandler =
      (key: keyof Transaction) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setFormFields((prev: Transaction) => ({ ...prev, [key]: value }));
      };

    const resetFormHandler = () => {
      for (const [key] of Object.entries(transaction)) {
        setFormFields((prev: Transaction) => ({
          ...prev,
          [key]: key !== "id" ? "" : 0,
        }));
      }
      setEnteredNameTouched(false)
      setEnteredAmountTouched(false)
    };

    if (Number(transaction.id) !== 0) {
    }

    return { formFields, setFormFields, createChangeHandler, resetFormHandler };
  };

  const initialTransaction: Transaction | undefined = props.transactionDetails;
  let { formFields, setFormFields, createChangeHandler, resetFormHandler } = useFormField(initialTransaction);
    

  useEffect(() => {
    if (props.transactionDetails.id) {
      setFormFields(props.transactionDetails);
    }
  }, [props.transactionDetails]);

  const enteredNameIsValid = formFields.name.trim() !== ''
  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched

  const enteredAmountIsValid = formFields.amount !== 0
  const amountInputIsInvalid = !enteredAmountIsValid && enteredAmountTouched
  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const nameInputBlurHandler = () =>{
      setEnteredNameTouched(true);
      
  }
  const amountInputBlurHandler = () => {
    setEnteredAmountTouched(true)
  }
// console.log(enter)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnteredNameTouched(true);
    setEnteredAmountTouched(true)
    if(!enteredNameIsValid){
      return ;}
    if(!enteredAmountIsValid){
      
      return ;
    }


    if (!formFields.type) {
      formFields.type = transactionType[1].type ?? formFields.type;
    }
    if(!formFields.category){
      formFields.category = transactionCategory[0].category ?? formFields.category
    }

    props.callBackTransaction(formFields);
    setIsEditing(false);
    setEnteredNameTouched(false)
    resetFormHandler();
  };

  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    resetFormHandler();
  };
  

  

  const nameInputClasses = nameInputIsInValid ? 'new-expense__control invalid' : 'new-expense__control '
  const amountInputClasses = amountInputIsInvalid ? 'new-expense__control invalid' : 'new-expense__control'


  return (
    <div  className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add/Edit Transaction</button>
      )}
      {isEditing && (
      <form onSubmit={handleSubmit} onReset={handleReset}>
          
        <div className="new-expense__controls">
          <div className={nameInputClasses}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={formFields.name}
              onChange={createChangeHandler("name")}
              onBlur={nameInputBlurHandler}
            ></input>
            {nameInputIsInValid&&<p>Name must not be empty</p>}
          </div>

          <div className="new-expense__control">
            <label htmlFor="type">Type</label>
            <select 
              value={formFields.type}
              onChange={createChangeHandler("type")}
            >
              {transactionType.map((item) => (
                <option value={item.type} key={item.id}>
                  {item.type}
                </option>
              ))}
            </select>
          </div>
          <div className="new-expense__control">
            <label htmlFor="category">Category</label>
            <select 
              value={formFields.category}
              onChange={createChangeHandler("category")}
            >
              {transactionCategory.filter(item =>{if(item.type==formFields.type){return item}}).map((item) => (
                <option value={item.category} key={item.id}>
                  {item.category}
                </option>
              ))}
            </select>
            <p>Select *Type* for categories</p>
          </div>

          

          <div className={amountInputClasses}>
            <label className="col-3" htmlFor="organization">
              Amount
            </label>
            <input
              className="col-6"
              type="number"
              placeholder="Enter Amount"
              value={formFields.amount}
              onChange={createChangeHandler("amount")}
              onBlur={amountInputBlurHandler}
            ></input>
            {amountInputIsInvalid&&<p>Amount Must not be Zero</p>}
          </div>
          
         
          
        </div>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
        
          
        
      </form>
      )}
    </div>
  );
};

export default TransactionForm;
