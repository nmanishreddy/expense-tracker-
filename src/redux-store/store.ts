import * as React from "react"
import { TransactionAction, TransactionState } from "../types/types"
import { createStore, applyMiddleware, Store } from "redux"
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import userReducer from "./userReducer"
import rootReducer from "./rootReducer"
import categoryReducer from "./categoryReducer"



const store  = createStore(rootReducer, applyMiddleware(thunk))

 export const persistor = persistStore(store)


 
 
export default store;


// import * as React from "react"
// import { TransactionAction, TransactionState } from "../types/types"
// import { createStore, applyMiddleware, Store } from "redux"
// import thunk from 'redux-thunk'
// import { combineReducers } from 'redux'

// import userReducer from "./userReducer"
// import categoryReducer from "./categoryReducer"


// const rootReducer = combineReducers({user: userReducer, category: categoryReducer})



// const store  = createStore(rootReducer, applyMiddleware(thunk))




// export default store;