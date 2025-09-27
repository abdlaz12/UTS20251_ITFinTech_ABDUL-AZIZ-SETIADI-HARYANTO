import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find(item => item._id === product._id);
      if (exist) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  // <-- TAMBAHKAN FUNGSI INI
  const clearCart = () => {
    setCartItems([]);
  };

  // <-- TAMBAHKAN clearCart KE DALAM VALUE
  const value = { cartItems, addToCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}