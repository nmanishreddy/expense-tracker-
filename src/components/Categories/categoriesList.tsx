import React, { useState, useEffect } from "react";
import { Category } from "../../redux-store/transaction";
import { AiFillDelete } from "react-icons/ai";
import "../../components/transactionList.css";
import { Table } from "react-bootstrap";
type Props = {
  categoryList: Category[];
  removeCategory: (arg: Category) => void;
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
    {
      Header: "Delete",
      accessor: "delete",
    }
  ];
  

  useEffect(() => {
    setCategoryList(props.categoryList);
  }, [props.categoryList]);

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
              );
            })}
          </thead>

          <tbody>
            {categoryList?.map((category) => {
              return (
                <tr key={category.id}>
                  <td title={category.name}>{category.name}</td>

                  <td title={category.type}>{category.type}</td>
                  <td> <AiFillDelete
                        title="Delete"
                        onClick={() => handleDeleteCategory(category)}
                      /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      
      
    </div>
  );
};

export default CategoriesList;
