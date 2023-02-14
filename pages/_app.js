import Header from "../layout/Header";
import Footer from "../layout/Footer";

import Cart from "../context/Cart";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Cart>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Cart>
  );
}

export default MyApp;
