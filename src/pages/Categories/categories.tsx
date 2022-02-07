import React, {useState} from 'react'
import { Category } from '../../redux-store/transaction'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

const Categories = () => {

    const defaultCategory: Category = {
        id: 0,
        name: "",
        type: "",
    }
    const [category, setcategory] =
    useState<Category>(defaultCategory);



    return (
        <div>
            <h1>New Categories</h1>
        </div>
    )
}

export default Categories