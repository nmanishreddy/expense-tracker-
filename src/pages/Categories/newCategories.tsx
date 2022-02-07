import React from 'react';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import '../../components/newTransaction.css'
import { Category, transactionType} from '../../redux-store/transaction'


type Props = {
    
  
    categoryDetails: Category;
  
    callBackcategory: (arg: Category) => void;
  };
  

const NewCategory = (props: Props) => {

  const [isEditing, setIsEditing] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

    const useFormField = (category: Category) => {
        const [formFields, setFormFields] = useState<Category>(category);
    
        const createChangeHandler =
          (key: keyof Category) =>
          (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const value = e.target.value;
            setFormFields((prev: Category) => ({ ...prev, [key]: value }));
          };
    
        const resetFormHandler = () => {
          for (const [key] of Object.entries(category)) {
            setFormFields((prev: Category) => ({
              ...prev,
              [key]: key !== "id" ? "" : 0,
            }));
          }
        //   setEnteredNameTouched(false)
        //   setEnteredAmountTouched(false)
        };
    
        if (Number(category.id) !== 0) {
        }
    
        return { formFields, setFormFields, createChangeHandler, resetFormHandler };
      };
    
      const initialCategory : Category| undefined = props.categoryDetails
      let { formFields, setFormFields, createChangeHandler, resetFormHandler } = useFormField(initialCategory);
        
    
      useEffect(() => {
        if (props.categoryDetails.id) {
          setFormFields(props.categoryDetails);
        }
      }, [props.categoryDetails]);
    
      const enteredNameIsValid = formFields.name.trim() !== ''
      const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched
    
      
      const startEditingHandler = () => {
        setIsEditing(true);
      };
    
      const nameInputBlurHandler = () =>{
          setEnteredNameTouched(true);
          
      }
      
    // console.log(enter)
      const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setEnteredNameTouched(true);
        
        if(!enteredNameIsValid){
          return ;}
        
    
    
        if (!formFields.type) {
          formFields.type = transactionType[1].type ?? formFields.type;
        }
        
    
        props.callBackcategory(formFields);
        setIsEditing(false);
        setEnteredNameTouched(false)
        resetFormHandler();
      };
    
      const handleReset = (e: FormEvent) => {
        e.preventDefault();
        resetFormHandler();
      };
      const nameInputClasses = nameInputIsInValid ? 'new-expense__control invalid' : 'new-expense__control '
  
    
      return(
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
            
  
            
  
            
            
           
            
          </div>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
          
            
          
        </form>
        )}
      </div>
      )

}


export default NewCategory;