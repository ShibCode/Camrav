import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

export const CART_ACTIONS = {
  SET_DEFAULT_CART: "set-default-cart",
  ADD_TO_CART: "add-to-cart",
  REMOVE_FROM_CART: "remove-from-cart",
  ADD_1: "add-1",
  REMOVE_1: "remove-1",
  CLEAR_CART: "clear-cart",
};

const reducer = (cart, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_DEFAULT_CART: {
      return action.payload.cart;
    }
    case CART_ACTIONS.ADD_TO_CART: {
      const {
        newProduct,
        newProduct: { availableQty, _id, selectedSize, quantity },
      } = action.payload;

      const newCart = [];
      let newItem = true;

      cart.forEach((item) => {
        if (item._id === _id && item.selectedSize === selectedSize) {
          newItem = false;
          item.quantity += quantity;
          item.quantity > availableQty && (item.quantity = availableQty);
        }

        newCart.push(item);
      });

      if (newItem) newCart.push(newProduct);

      updateLocalStorage(newCart);

      return newCart;
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
    }
    case CART_ACTIONS.ADD_1: {
      const newCart = cart.map((item) => {
        item._id === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize &&
          item.quantity++;

        return item;
      });

      updateLocalStorage(newCart);

      return newCart;
    }
    case CART_ACTIONS.REMOVE_1: {
      const newCart = cart.filter((item) => {
        item._id === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize &&
          item.quantity--;

        return item.quantity > 0;
      });

      updateLocalStorage(newCart);

      return newCart;
    }
    case CART_ACTIONS.CLEAR_CART:
      updateLocalStorage([]);

      return [];
  }
};

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function updateLocalStorage(cart) {
  localStorage.setItem("camrav-cart", JSON.stringify(cart));
}

const Cart = ({ children }) => {
  const [cart, cartDispatch] = useReducer(reducer);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("camrav-cart")) || [];
    cartDispatch({ type: CART_ACTIONS.SET_DEFAULT_CART, payload: { cart } });
  }, []);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce((a, b) => a + b.quantity * b.price, 0);
      setSubtotal(total);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch: cartDispatch, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default Cart;
