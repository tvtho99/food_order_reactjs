import { useReducer } from 'react'

import CartContext from './cart-context'

const initialCartState = {
  items: [],
  totalPrice: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.amount

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    }
  }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )
    const existingCartItem = state.items[existingCartItemIndex]
    const updatedTotalPrice = state.totalPrice - existingCartItem.price
    let updatedItems
    if (existingCartItem.amount === 1) {
      updatedItems = [...state.items]
      updatedItems.splice(existingCartItemIndex, 1)
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    }
  }
  return initialCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  )

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item: item })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id })
  }

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
