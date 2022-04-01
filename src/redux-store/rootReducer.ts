import { combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './userReducer'
import cartReducer from './categoryReducer'
import categoryReducer from './categoryReducer';
import currencyReducer from './currencyReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['user', 'category', 'currency']
}
const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    currency: currencyReducer
});

export default persistReducer(persistConfig, rootReducer)