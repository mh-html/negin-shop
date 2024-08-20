import { createContext, useEffect, useReducer } from "react";

const initialState = {
  basketCart: [],
  totalAll: 0,
  quantityAll: 0,
};

export const BascketCartContextProvider = createContext(null);

// Action Types
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const isItemForAdd = state.basketCart.some(
        (product) => product.id === action.payload.id
      );

      if (!isItemForAdd) {
        const newProduct = { ...action.payload, quantity: 1 };
        const updatedBasket = [...state.basketCart, newProduct];
        localStorage.setItem("basketCart", JSON.stringify(updatedBasket)); // Save to localStorage
        return {
          ...state,
          basketCart: updatedBasket,
        };
      } else return state;

    case REMOVE_ITEM:
      const updatedBasket = state.basketCart.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("basketCart", JSON.stringify(updatedBasket)); // Save to localStorage
      return { ...state, basketCart: updatedBasket };

    case INCREASE:
      const increasedCart = state.basketCart.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      localStorage.setItem("basketCart", JSON.stringify(increasedCart)); // Save to localStorage
      return { ...state, basketCart: increasedCart };

    case DECREASE:
      const decreasedCart = state.basketCart.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product
      );
      localStorage.setItem("basketCart", JSON.stringify(decreasedCart)); // Save to localStorage
      return { ...state, basketCart: decreasedCart };

    default:
      return state;
  }
};

export default function BasketContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    basketCart: JSON.parse(localStorage.getItem("basketCart")) || [],
  });
  useEffect(() => {
    localStorage.setItem("basketCart", JSON.stringify(state.basketCart));
  }, [state.basketCart]);

  return (
    <BascketCartContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </BascketCartContextProvider.Provider>
  );
}
