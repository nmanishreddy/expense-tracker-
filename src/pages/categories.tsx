import React, { useState, useCallback, useEffect } from "react";
import { Category } from "../redux-store/transaction";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Categorystate } from "../types/types";
import { addCategory, removeCategory } from "../redux-store/actionCreators";
import CategoryForm from "../components/Categories/newCategories";
import CategoriesList from "../components/Categories/categoriesList";
import { toast } from "react-toastify";

const Categories = () => {
  const defaultCategory: Category = {
    id: 0,
    name: "",
    type: "",
  };
  const [category, setcategory] = useState<Category>(defaultCategory);

  const savecategoryDetails = (categoryDetails: Category) => {
    if (!categoryDetails.name) {
      return;
    }

    addTransactionToStore(categoryDetails);
  };

  const removeCategoryDetails = (categoryDetails: Category) => {
    // using react redux
    deleteCategoryFromStore(categoryDetails);
  };
  /**
   * Redux implementation
   */
  const categoriesListArray = useSelector(
    (state: any) => state.category.categories,
    shallowEqual
  );

  const [categoriesList, setCategoriesList] =
    useState<Category[]>(categoriesListArray);

  const dispatch: Dispatch<any> = useDispatch();

  // redux operations
  const addTransactionToStore: any = useCallback(
    (category: Category) => {dispatch(addCategory(category));
    toast.success("Category added Successfully");},
    [dispatch]
  );
  const deleteCategoryFromStore: any = useCallback(
    (category: Category) => {dispatch(removeCategory(category));
    toast.success("Category deleted Successfully");},
    [dispatch]
  );
  useEffect(() => {
    setCategoriesList(categoriesListArray);
  }, [categoriesListArray]);

  return (
    <div>
      <CategoryForm
        categoryDetails={category}
        callBackcategory={savecategoryDetails}
      />
      <CategoriesList categoryList={categoriesList} removeCategory={removeCategoryDetails}/>
    </div>
  );
};

export default Categories;
