import { Route, Router, Switch, useHistory } from "react-router-dom";
import HomePage from "../pages/products";
import Login from "../pages/login";
import ProductDetails from "../pages/productdetails";
import SignUp from "../pages/signup";
import CartPpage from "../pages/cartpage";
import CheckOut from "../pages/checout";
import Navbar from "./navbar";
import { WishListProvider } from "../contexts/wishlistcontext";
import { ProductsProvider } from "../contexts/productscontext";
import { CartProvider } from "../contexts/cartcontext";
import { SearchProvider } from "../contexts/searchcontext";
import Home from "../pages/home";
import ErrorPage from "../pages/error404";
import Footer from "./footer";
import About from "../pages/about";
import Contact from "../pages/contact";
import WishList from "../pages/wishlist";

import OrdersPage from "../pages/orders";
import { auth } from "../config/config";
const Routing = () => {
  const history = useHistory();
  return (
    <div className="min-vh-100  bg-light d-flex flex-column">
      <SearchProvider>
        <WishListProvider>
          <ProductsProvider>
            <CartProvider>
              <Navbar />
              <div className="position-fixed w-100 " style={{ zIndex: 200 }}>
                <Navbar />
              </div>
              <div className="flex-grow-1 d-flex flex-column">
                <Switch>
                  <Route path="/home" exact component={Home} />
                  <Route path="/products" exact component={HomePage} />
                  <Route
                    path="/products/:id"
                    exact
                    component={ProductDetails}
                  />
                  <Route path="/" exact component={Home} />
                  <Route path="/signup" exact component={SignUp} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/cart" exact component={CartPpage} />
                  <Route path="/about" exact component={About} />
                  <Route path="/contact" exact component={Contact} />
                  <Route path="/wishlist" exact component={WishList} />

                  {auth.currentUser && (
                    <Route path="/orders" exact component={OrdersPage} />
                  )}
                  {auth.currentUser && (
                    <Route path="/checkout" exact component={CheckOut} />
                  )}
                  <Route path="/**" component={ErrorPage} />
                </Switch>
              </div>

              <Footer />
            </CartProvider>
          </ProductsProvider>
        </WishListProvider>
      </SearchProvider>
    </div>
  );
};

export default Routing;
