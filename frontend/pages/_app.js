// pages/_app.js
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css'; // Sesuaikan path jika berbeda

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;