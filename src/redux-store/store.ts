import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import rootReducer from "./rootReducer"



const store:any = createStore(rootReducer, applyMiddleware(thunk))

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