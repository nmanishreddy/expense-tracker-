import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
// import "./newTransaction.css";
import { toast } from "react-toastify";
import {
  Transaction,
  transactionType,
  Category,
} from "../../redux-store/transaction";

type Props = {
  transactionDetails: Transaction;

  callBackTransaction: (arg: Transaction) => void;
};
const options = [
  { value: "USD", label: "USD" },
  { value: "GBP", label: "GBP" },
  { value: "EUR", label: "EUR" }
];

const UpdateForm = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredAmountTouched, setEnteredAmountTouched] = useState(false);

  const transactionCategory = useSelector(
    (state: any) => state.category.categories,
    shallowEqual
  );

  const useFormField = (transaction: Transaction) => {
    const [formFields, setFormFields] = useState<Transaction>(transaction);

    const createChangeHandler =
      (key: keyof Transaction) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
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
      setEnteredNameTouched(false);
      setEnteredAmountTouched(false);
    };

    if (Number(transaction.id) !== 0) {
    }

    return { formFields, setFormFields, createChangeHandler, resetFormHandler };
  };

  const initialTransaction: Transaction | undefined = props.transactionDetails;
  let { formFields, setFormFields, createChangeHandler, resetFormHandler } =
    useFormField(initialTransaction);

  useEffect(() => {
    if (props.transactionDetails.id) {
      setFormFields(props.transactionDetails);
    }
  }, [props.transactionDetails]);

  useEffect(()=>{
    resetFormHandler();

  },[])

  const enteredNameIsValid = formFields.name.trim() !== "";
  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;

  const enteredAmountIsValid = formFields.amount !== 0;
  const amountInputIsInvalid = !enteredAmountIsValid && enteredAmountTouched;
  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };
  const amountInputBlurHandler = () => {
    setEnteredAmountTouched(true);
  };
  // console.log(enter)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEnteredNameTouched(true);
    setEnteredAmountTouched(true);
    if (!enteredNameIsValid) {
      toast.error("Please provide value in each input field");
      return;
    } else if (!enteredAmountIsValid) {
      toast.error("Please provide value in each input field");
      return;
    }

    if (!formFields.type) {
      formFields.type = transactionType[1].type ?? formFields.type;
    }
    if (!formFields.category) {
      formFields.category =
        transactionCategory[0].category ?? formFields.category;
    }

    props.callBackTransaction(formFields);
    setIsEditing(false);
    setEnteredNameTouched(false);
    resetFormHandler();
  };
  

  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    resetFormHandler();
  };

  const nameInputClasses = nameInputIsInValid
    ? "new-expense__control invalid"
    : "new-expense__control ";
  const amountInputClasses = amountInputIsInvalid
    ? "new-expense__control invalid"
    : "new-expense__control";

  return (
    
      <Form onSubmit={handleSubmit} onReset={handleReset} className="new-expense">
        <Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={formFields.name}
              onChange={createChangeHandler("name")}
              onBlur={nameInputBlurHandler}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Type</Form.Label>

            <Form.Select
              as={Col}
              md="4"
              value={formFields.type}
              onChange={createChangeHandler("type")}
              aria-label="Default select example"
            >
              {transactionType.map((item) => (
                <option value={item.type} key={item.id}>
                  {item.type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mt-2">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Category</Form.Label>
            <Form.Select
              as={Col}
              md="4"
              value={formFields.category}
              onChange={createChangeHandler("category")}
            >
              {transactionCategory
                .filter((item: Category) => {
                  if (item.type == formFields.type) {
                    return item;
                  }
                })
                .map((item: Category) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
            </Form.Select>
            {/* <p>Select *Type* for categories</p> */}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Amount</Form.Label>

            <Form.Control
              required
              placeholder="Enter Amount"
              type="number"
              value={formFields.amount}
              onChange={createChangeHandler("amount")}
              onBlur={amountInputBlurHandler}
            />
            {/* {amountInputIsInvalid && <p>Amount Must not be Zero</p>} */}
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-end mt-2">
          <div className="mr-2 mt-2">
            <Button type="submit" size="lg">
              Submit
            </Button>
          </div>

          <div className="mr-2 mt-2" >
           
            <Button variant="warning" type="reset" size="lg">
              Reset
            </Button>
          </div>
        </div>
      </Form>
    
  );
};

//     <div className="new-expense">

//         <form onSubmit={handleSubmit} onReset={handleReset}>
//           <div className="new-expense__controls">
//             <div className={nameInputClasses}>
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 value={formFields.name}
//                 onChange={createChangeHandler("name")}
//                 onBlur={nameInputBlurHandler}
//               ></input>
//               {nameInputIsInValid && <p>Name must not be empty</p>}
//             </div>

//             <div className="new-expense__control">
//               <label htmlFor="type">Type</label>
//               <select
//                 value={formFields.type}
//                 onChange={createChangeHandler("type")}
//               >
//                 {transactionType.map((item) => (
//                   <option value={item.type} key={item.id}>
//                     {item.type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="new-expense__control">
//               <label htmlFor="category">Category</label>
//               <select
//                 value={formFields.category}
//                 onChange={createChangeHandler("category")}
//               >
//                 {transactionCategory
//                   .filter((item: Category) => {
//                     if (item.type == formFields.type) {
//                       return item;
//                     }
//                   })
//                   .map((item: Category) => (
//                     <option value={item.name} key={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//               </select>
//               <p>Select *Type* for categories</p>
//             </div>

//             <div className={amountInputClasses}>
//               <label className="col-3" htmlFor="organization">
//                 Amount
//               </label>
//               <input
//                 className="col-6"
//                 type="number"
//                 placeholder="Enter Amount"
//                 value={formFields.amount}
//                 onChange={createChangeHandler("amount")}
//                 onBlur={amountInputBlurHandler}
//               ></input>
//               {amountInputIsInvalid && <p>Amount Must not be Zero</p>}
//             </div>
//           </div>
//           <div className="d-flex justify-content-end">

//           <button type="submit">Submit</button>
//           <button className="button-reset" type="reset">Reset</button>

//           </div>

//         </form>

//     </div>
//   );
// };

export default UpdateForm;
