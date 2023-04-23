import { ADD_TO_CART } from './cartActions';

const initialState = {
  panier: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        panier: [...state.panier, action.payload]
      };
    default:
      return state;
  }
};

export default cartReducer;
