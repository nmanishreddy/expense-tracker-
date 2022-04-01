import { Currency } from "./transaction";
import { CurrencyAction, CurrencyState } from "../types/types";
import * as actionType from "./actiontypes";

const initialCurrency : CurrencyState  = {
    currency: {
        id:'rupee',
        name:'rupee'
    }

}

const currencyReducer = (state: CurrencyState = initialCurrency , action: CurrencyAction) => {
    switch(action.type) {
        case actionType.CHANGE_CURRENCY:
            const newCurrency: Currency = {
                id: action.currency.name,
                name: action.currency.name
            }
            return {
                currency: {...newCurrency}
            }
    }
    return state;
}

export default currencyReducer;