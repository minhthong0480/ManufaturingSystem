import { ACTION_PRODUCTS_SUCCESS } from '../commons/enum'

const initialState = {
    listProducts: [],
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_PRODUCTS_SUCCESS:
            return {
                ...state,
                listProducts: action?.payload?.listProducts,
            };

        default:
            return state;
    }
};