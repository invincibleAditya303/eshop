import React, {createContext, useReducer} from 'react'

const initialState = {
    cartList: JSON.parse(localStorage.getItem('cartList')) || [],
    isDarkModeOn: JSON.parse(localStorage.getItem('isDarkModeOn')) || false,
}

const CartContext = createContext()
  
  export const actionTypes = {
    ADD_ITEM: 'ADD_ITEM',
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  }
  
  const cartReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.ADD_ITEM:
        const existingItem = state.cartList.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity++;
          return { ...state, cartList: [...state.cartList] };
        }else {
          return { ...state, cartList: [...state.cartList, { ...action.payload, quantity: 1 }] };
        }
  
      case actionTypes.INCREMENT:
        const incrementItem = state.cartList.find(item => item.id === action.payload.id);
        if (incrementItem) incrementItem.quantity++;
        return { ...state, cartList: [...state.cartList] };
  
      case actionTypes.DECREMENT:
        const updatedCartList = state.cartList.map(item => {
          if (item.id === action.payload.id) {
            if (item.quantity === 1) {
              return null;
            } else {
              return { ...item, quantity: item.quantity - 1 }
            }
          }
          return item;
        }).filter(item => item !== null)
      
        return { ...state, cartList: updatedCartList }
      case actionTypes.TOGGLE_DARK_MODE:
        const newDarkModeStatus = !state.isDarkModeOn;
        return { ...state, isDarkModeOn: newDarkModeStatus }
  
      default:
        return state;
    }
  }

  export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{state, dispatch}}>
        {children}
    </CartContext.Provider>
  )
}

export {CartContext}