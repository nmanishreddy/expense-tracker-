import React, { useState, useEffect } from "react";
import { Category } from "../../redux-store/transaction";
import '../../components/transactionList.css'
type Props = {
  categoryList: Category[];
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
  ];

  useEffect(() => {
    setCategoryList(props.categoryList);
  }, [props.categoryList]);

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
            );
          })}
        </thead>

        <tbody>
          {categoryList?.map((category) => {
            return (
              <tr key={category.id}>
                <td title={category.name}>{category.name}</td>
                
                <td title={category.type}>{category.type}</td>
                
              </tr>
            );
          })}
        </tbody>
             </table>
          </div>
        );
      
    </div>
  );
};

export default CategoriesList;
