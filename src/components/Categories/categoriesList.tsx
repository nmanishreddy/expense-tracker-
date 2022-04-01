import React, { useState, useEffect } from "react";
import { Category } from "../../redux-store/transaction";
<<<<<<< HEAD
import { AiFillDelete } from "react-icons/ai";
import "../../components/transactionList.css";
import { Table } from "react-bootstrap";
type Props = {
  categoryList: Category[];
  removeCategory: (arg: Category) => void;
=======
import "../../components/transactionList.css";
type Props = {
  categoryList: Category[];
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
};

const CategoriesList = (props: Props) => {
  const [categoryList, setCategoryList] = useState<Category[] | undefined>(
    props.categoryList
  );
  const headers = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Category Type",
      accessor: "categorytype",
    },
<<<<<<< HEAD
    {
      Header: "Delete",
      accessor: "delete",
    }
  ];
  
=======
  ];
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a

  useEffect(() => {
    setCategoryList(props.categoryList);
  }, [props.categoryList]);

<<<<<<< HEAD
  const handleDeleteCategory = (selectedCategory: Category) => {
    props.removeCategory(selectedCategory);
  };

  return (
    <div className="my-custom-scrollbar">
      
      <table  className="transactions">
          <thead>
            {headers.map((row) => {
              return (
                <th key={row.accessor}>
                  <p>{row.Header}</p>
                </th>
=======
  return (
    <div>
      <div>
        <table className="transactions">
          <thead>
            {headers.map((row) => {
              return (
                <td key={row.accessor}>
                  <h4>{row.Header}</h4>
                </td>
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
              );
            })}
          </thead>

          <tbody>
            {categoryList?.map((category) => {
              return (
                <tr key={category.id}>
                  <td title={category.name}>{category.name}</td>

                  <td title={category.type}>{category.type}</td>
<<<<<<< HEAD
                  <td> <AiFillDelete
                        title="Delete"
                        onClick={() => handleDeleteCategory(category)}
                      /></td>
=======
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
                </tr>
              );
            })}
          </tbody>
        </table>
<<<<<<< HEAD
      
      
=======
      </div>
      );
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
    </div>
  );
};

export default CategoriesList;
