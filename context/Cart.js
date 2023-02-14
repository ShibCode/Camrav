import { useReducer, useContext, createContext } from "react";

export const CART_ACTIONS = {
  ADD_TO_CART: "add-to-cart",
  REMOVE_FROM_CART: "remove-from-cart",
  ADD_1: "add-1",
  REMOVE_1: "remove-1",
  CLEAR_CART: "clear-cart",
};

const reducer = (cart, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART:
      const newProduct = action.payload.newProduct;
      const availableQty = newProduct.availableQty;

      const newCart = [];

      let newItem = true;

      for (let i = 0; i < cart.length; i++) {
        if (
          cart[i]._id === newProduct._id &&
          cart[i].selectedSize === newProduct.selectedSize
        ) {
          newItem = false;

          cart[i].quantity += newProduct.quantity;

          cart[i].quantity > availableQty
            ? (cart[i].quantity = availableQty)
            : "";
        }

        newCart.push(cart[i]);
      }

      if (newItem) {
        newCart.push(newProduct);
      }

      return newCart;
    case CART_ACTIONS.REMOVE_FROM_CART:
    case CART_ACTIONS.ADD_1:
      return cart.map((item) => {
        item._id === action.payload.productId &&
        item.selectedSize === action.payload.selectedSize
          ? item.quantity++
          : "";

        return item;
      });
    case CART_ACTIONS.REMOVE_1:
      return cart.filter((item) => {
        item._id === action.payload.productId &&
        item.selectedSize === action.payload.selectedSize
          ? item.quantity--
          : "";

        return item.quantity > 0;
      });
    case CART_ACTIONS.CLEAR_CART:
      return [];
  }
};

const CartContext = createContext();
const CartDispatchContext = createContext();

export const useCart = () => useContext(CartContext);

export const useCartDispatch = () => useContext(CartDispatchContext);

const Cart = ({ children }) => {
  const [cart, cartDispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={cartDispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export default Cart;
