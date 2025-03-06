import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import Footer from "./components/layouts/Footer";
import Menu from "./components/layouts/Menu";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Cart from "./components/cart/Cart";
import store from "./store";
import { loaduser } from "./action/userAction";
import Profile from "./components/users/Profile";
import UpdateProfile from "./components/users/UpdateProfile";
import ForgotPassword from "./components/users/ForgotPassword";
import NewPassword from "./components/users/NewPassword";
import OrderSucess from "./components/cart/OrderSuccess"
import ListOrders from "./components/order/ListOrders"
import OrderDetails from "./components/order/OrderDetails"
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCartItems } from "./action/cartAction";
export default function App() {
  console.log(store);
  useEffect(() => {
    store.dispatch(loaduser());
  }, []);
  // const user=useSelector((state)=>state.auth)
  // // const dispatch=useDispatch()
  // // if(user){
  // //   dispatch(fetchCartItems())
  // // }
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eats/stores/:id/menus" element={<Menu />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Register />} />
            <Route path="/users/me" element={<Profile />} />
            <Route path="/users/me/update" element={<UpdateProfile />} />
            <Route path="/users/forgotPassword" element={<ForgotPassword />} />
            <Route
              path="/users/resetPassword/:token"
              element={<NewPassword />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<OrderSucess/>}/>
            <Route path="/eats/orders/me/myOrders" element={<ListOrders/>}/>
            <Route path="/eats/orders/:id" element={<OrderDetails/>}/>
            <Route path="*" element={<h1>The page doesn't exist</h1>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
