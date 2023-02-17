import Header from "../layout/Header";
import Footer from "../layout/Footer";

import Cart from "../context/Cart";
import LoggedIn from "../context/LoggedIn";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <LoggedIn>
      <Cart>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Cart>
    </LoggedIn>
  );
}

export default MyApp;
