import React, {useState, useCallback, useEffect} from 'react'
import { Category } from '../redux-store/transaction'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Categorystate } from '../types/types';
import { addCategory } from '../redux-store/actionCreators';
import CategoryForm from '../components/Categories/newCategories';
import CategoriesList from '../components/Categories/categoriesList';

const Categories = () => {

    const defaultCategory: Category = {
        id: 0,
        name: "",
        type: "",
    }
    const [category, setcategory] =
    useState<Category>(defaultCategory);

    
  const savecategoryDetails = (categoryDetails: Category) => {
    if (!categoryDetails.name ) {
      return;
    }

    // using react redux
    // if (categoryDetails.id !== 0) {
    //   updateTransactionInStore(categoryDetails);
    // } else {
      addTransactionToStore(categoryDetails);
    
  };

//   const updateTransactionDetails = (transactionDetails: Transaction) => {
//     setTransaction(
//       (transaction: Transaction) => (transaction = transactionDetails)
//     );
//   };

//   const removeTransactionDetails = (transactionDetails: Transaction) => {
//     // using react redux
//     deleteTransactionFromStore(transactionDetails);
//   };

  /**
   * Redux implementation
   */
  const categoriesListArray = useSelector(
    (state: Categorystate) => state.categories,
    shallowEqual
  );

  // useSelector(
  //   (state: TransactionState) => state.transactions,
  //   shallowEqual
  // );
  const [categoriesList, setCategoriesList] = useState<Category[]>(
    categoriesListArray
  );

  const dispatch: Dispatch<any> = useDispatch();

  // redux operations
  const addTransactionToStore: any = useCallback(
    (category: Category) => dispatch(addCategory(category)),
    [dispatch]
  );

//   const updatecategoryInStore: any = useCallback(
//     (category: Category) => dispatch(updateCategory(category)),
//     [dispatch]
//   );

//   const deleteTransactionFromStore: any = useCallback(
//     (transaction: Transaction) => dispatch(removeTransaction(transaction)),
//     [dispatch]
//   );

  useEffect(() => {
    setCategoriesList(categoriesListArray);
  }, [categoriesListArray]);


  
    


    return (
        <div>
            
            <CategoryForm categoryDetails={category}
          callBackcategory={savecategoryDetails}/>
          <CategoriesList categoryList = {categoriesList}/>
        </div>
    )
}

export default Categories