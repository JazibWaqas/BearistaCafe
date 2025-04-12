import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(localCart);
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { 'x-auth-token': token }
      });
      setCart(response.data.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    setLoading(false);
  };

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...localCart, item];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/cart/add', item, {
        headers: { 'x-auth-token': token }
      });
      setCart(response.data.items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = localCart.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        return;
      }

      const response = await axios.put(`http://localhost:5000/api/cart/update/${itemId}`, 
        { quantity },
        { headers: { 'x-auth-token': token } }
      );
      setCart(response.data.items);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = localCart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        return;
      }

      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
        headers: { 'x-auth-token': token }
      });
      setCart(response.data.items);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.removeItem('cart');
        setCart([]);
        return;
      }

      await axios.delete('http://localhost:5000/api/cart/clear', {
        headers: { 'x-auth-token': token }
      });
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);