import {Category} from './transaction'
import { CategoryAction, Categorystate } from "../types/types";
import * as actionType from "./actiontypes";

const initialTransactions: Categorystate = {

    categories : [
        {
            id:1,
            name: 'newcategory1',
            type: 'income'
        },
        {
            id:10,
            name: 'Salary',
            type: 'income'
        },
        {
            id:2,
            name: 'newcategory2',
            type: 'expense'
        },
        {
            id:3,
            name: 'Groceries',
            type: 'expense'
        },
        {
            id:4,
            name: 'Fuel',
            type: 'expense'
        },
        {
            id:5,
            name: 'Free Lance',
            type: 'income'
        },
        {
            id:6,
            name: 'YouTube',
            type: 'income'
        },
        {
            id:7,
            name: 'Rent',
            type: 'expense'
        },
        {
            id:8,
            name: 'Taxes',
            type: 'expense'
        },
        {
            id:9,
            name: 'Travel',
            type: 'expense'
        },
    ]

    
}

const categoryReducer = (state: Categorystate = initialTransactions, action: CategoryAction): Categorystate => {
    switch (action.type) {
        
        
        case actionType.ADD_CATEGORY: 
            const newCategory : Category ={
                id: Math.random(),
                name : action?.category.name,
                type: action?.category.type
            }
            return {
                ...state,
                categories: state.categories.concat(newCategory)
            }
        case actionType.REMOVE_CATEGORY:
            const updatedCategoryList = state.categories.filter(item => item.id !== action?.category?.id)
            return {
                ...state,
                categories: updatedCategoryList
            }
        
    }

    return state;
}

export default categoryReducer;

// case 'ADD_CATEGORY':
// return {...state, categories: [...list, {}]}