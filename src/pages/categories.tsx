import React, { useState, useCallback, useEffect } from "react";
import { Category } from "../redux-store/transaction";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Categorystate } from "../types/types";
<<<<<<< HEAD
import { addCategory, removeCategory } from "../redux-store/actionCreators";
import CategoryForm from "../components/Categories/newCategories";
import CategoriesList from "../components/Categories/categoriesList";
import { toast } from "react-toastify";
=======
import { addCategory } from "../redux-store/actionCreators";
import CategoryForm from "../components/Categories/newCategories";
import CategoriesList from "../components/Categories/categoriesList";
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a

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

<<<<<<< HEAD
  const removeCategoryDetails = (categoryDetails: Category) => {
    // using react redux
    deleteCategoryFromStore(categoryDetails);
  };
=======
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
  /**
   * Redux implementation
   */
  const categoriesListArray = useSelector(
<<<<<<< HEAD
    (state: any) => state.category.categories,
=======
    (state: Categorystate) => state.categories,
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
    shallowEqual
  );

  const [categoriesList, setCategoriesList] =
    useState<Category[]>(categoriesListArray);

  const dispatch: Dispatch<any> = useDispatch();

  // redux operations
  const addTransactionToStore: any = useCallback(
<<<<<<< HEAD
    (category: Category) => {dispatch(addCategory(category));
    toast.success("Category added Successfully");},
    [dispatch]
  );
  const deleteCategoryFromStore: any = useCallback(
    (category: Category) => {dispatch(removeCategory(category));
    toast.success("Category deleted Successfully");},
    [dispatch]
  );
=======
    (category: Category) => dispatch(addCategory(category)),
    [dispatch]
  );

>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
  useEffect(() => {
    setCategoriesList(categoriesListArray);
  }, [categoriesListArray]);

  return (
    <div>
      <CategoryForm
        categoryDetails={category}
        callBackcategory={savecategoryDetails}
      />
<<<<<<< HEAD
      <CategoriesList categoryList={categoriesList} removeCategory={removeCategoryDetails}/>
=======
      <CategoriesList categoryList={categoriesList} />
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
    </div>
  );
};

export default Categories;
